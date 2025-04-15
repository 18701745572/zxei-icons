const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

// 源SVG文件目录
const SVG_DIR = path.resolve(__dirname, '../svg');
// 目标Vue组件目录
const ICONS_DIR = path.resolve(__dirname, '../src/components/icons');

// 创建Vue组件模板
function createVueComponent(svgContent, componentName) {
  // 移除SVG中的宽高属性和填充色，以便通过props控制
  let cleanedSvg = svgContent
    .replace(/<svg[^>]*(width|height|fill)=["'][^"']*["']/g, '<svg') // 移除原始的宽高和填充属性
    .replace(/<svg([^>]*)>/, '<svg$1 :width="size" :height="size" :fill="color" aria-hidden="true" v-bind="$attrs">') // 添加响应式属性
    .replace(/fill="[^"]*"/g, ''); // 移除路径中的填充色

  return `<template>
  ${cleanedSvg}
</template>

<script>
export default {
  name: '${componentName}',
  props: {
    // 图标大小，默认24px
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标颜色，默认继承当前文本颜色
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>`;
}

// 将文件名转换为新的命名格式，保留下划线并且style部分保持小写
function formatComponentName(name) {
  // 首先将目录名转换为首字母大写
  return name
    .split('_')
    .map((part, index) => {
      // 如果是最后一部分，并且是 'line' 或 'fill'，保持小写
      if (index === name.split('_').length - 1 && (part === 'line' || part === 'fill')) {
        return part;
      }
      // 否则将首字母大写
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('_');
}

// 读取目录下的所有SVG文件
async function processDirectory(dir, relativePath = '') {
  const entries = await readdir(dir);
  const components = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      // 如果是目录，递归处理
      const subDirPath = path.join(relativePath, entry);
      const subComponents = await processDirectory(fullPath, subDirPath);
      components.push(...subComponents);
    } else if (entry.endsWith('.svg')) {
      // 如果是SVG文件，处理它
      const categoryDir = relativePath.replace(/\//g, '_');
      const fileName = entry.replace('.svg', '');
      
      // 生成组件名: Category_Name_style 格式
      let componentName = '';
      if (categoryDir) {
        // 提取类别和文件名
        const category = categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1);
        componentName = formatComponentName(category + '_' + fileName);
      } else {
        componentName = formatComponentName(fileName);
      }
      
      // 读取SVG内容
      const svgContent = await readFile(fullPath, 'utf8');
      
      // 创建Vue组件
      const vueComponent = createVueComponent(svgContent, componentName);
      
      // 确保目标目录存在
      const targetDir = path.join(ICONS_DIR, relativePath);
      try {
        await mkdir(targetDir, { recursive: true });
      } catch (error) {
        // 目录已存在，忽略错误
      }
      
      // 写入Vue组件文件
      const targetFile = path.join(targetDir, `${fileName}.vue`);
      await writeFile(targetFile, vueComponent, 'utf8');
      
      // 添加到组件列表
      components.push({
        name: componentName,
        importPath: `./icons/${relativePath ? relativePath + '/' : ''}${fileName}.vue`,
        category: relativePath || 'default'
      });
    }
  }
  
  return components;
}

// 生成index.js文件，导出所有组件
async function generateIndex(components) {
  const imports = components.map(c => `import ${c.name} from '${c.importPath}';`).join('\n');
  const exports = components.map(c => c.name).join(',\n  ');
  
  const content = `// 此文件由脚本自动生成，请勿手动修改
${imports}

// 导出所有图标组件
export {
  ${exports}
};

// 默认导出所有图标组件的对象
export default {
  ${exports}
};
`;

  await writeFile(path.join(path.dirname(ICONS_DIR), 'index.js'), content, 'utf8');
  
  // 按类别组织的导出
  const categoriesMap = {};
  for (const component of components) {
    if (!categoriesMap[component.category]) {
      categoriesMap[component.category] = [];
    }
    categoriesMap[component.category].push(component);
  }
  
  for (const [category, categoryComponents] of Object.entries(categoriesMap)) {
    const categoryImports = categoryComponents.map(c => `import ${c.name} from '${c.importPath}';`).join('\n');
    const categoryExports = categoryComponents.map(c => c.name).join(',\n  ');
    
    const categoryContent = `// 此文件由脚本自动生成，请勿手动修改
${categoryImports}

// 导出 ${category} 类别的图标组件
export {
  ${categoryExports}
};

// 默认导出 ${category} 类别的图标组件对象
export default {
  ${categoryExports}
};
`;

    const categoryFileName = category.replace(/\//g, '_');
    await writeFile(path.join(path.dirname(ICONS_DIR), `${categoryFileName}.js`), categoryContent, 'utf8');
  }
}

// 修复所有生成的Vue文件中的属性绑定问题
async function fixBrokenFiles() {
  // 递归处理目录
  async function processDir(dirPath) {
    try {
      const entries = await readdir(dirPath);
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          // 递归处理子目录
          await processDir(fullPath);
        } else if (entry.endsWith('.vue')) {
          // 处理Vue文件
          let content = await readFile(fullPath, 'utf8');
          
          // 修复错误的属性绑定，包括所有可能的空格问题
          let modified = false;
          
          // 修复 ": aria-hidden" 格式的错误 (有空格的冒号前缀)
          if (content.includes(' : aria-hidden')) {
            content = content.replace(/ : aria-hidden="true"/g, ' :aria-hidden="true"');
            modified = true;
          }
          
          // 修复缺少 :fill="color" 的问题
          if (!content.includes(':fill="color"') && (content.includes(':width="size"') || content.includes(':height="size"'))) {
            content = content.replace(/<svg :width="size" :height="size"/g, '<svg :width="size" :height="size" :fill="color"');
            modified = true;
          }
          
          if (modified) {
            await writeFile(fullPath, content, 'utf8');
            console.log(`已修复文件: ${fullPath}`);
          }
        }
      }
    } catch (error) {
      console.error(`处理目录 ${dirPath} 时出错:`, error);
    }
  }
  
  // 开始处理根目录
  await processDir(ICONS_DIR);
  console.log('完成所有Vue文件的修复');
}

async function main() {
  try {
    // 处理所有SVG文件
    const components = await processDirectory(SVG_DIR);
    
    // 生成索引文件
    await generateIndex(components);
    
    // 修复特定文件的问题
    await fixBrokenFiles();
    
    console.log(`成功生成了 ${components.length} 个图标组件。`);
  } catch (error) {
    console.error('生成组件时出错:', error);
  }
}

main(); 