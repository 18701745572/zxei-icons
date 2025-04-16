const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

// SVG目录
const svgDir = path.resolve(__dirname, '../svg');
// 组件输出目录
const componentDir = path.resolve(__dirname, '../components');
// 类型输出目录
const typesDir = path.resolve(__dirname, '../types');

console.log('SVG目录路径:', svgDir);
console.log('组件输出目录路径:', componentDir);
console.log('类型输出目录路径:', typesDir);

// 确保目录存在
async function ensureDir(dir) {
  try {
    await stat(dir);
    console.log(`目录已存在: ${dir}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`创建目录: ${dir}`);
      await mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
}

// 将SVG文件名转换为PascalCase组件名
function toPascalCase(name) {
  return name
    .replace(/\.svg$/, '')
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// 创建Vue组件内容
function createVueComponent(svgContent, componentName) {
  // 从SVG内容中提取viewBox属性（如果存在）
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // 移除SVG标签，只保留内部内容
  let innerSvg = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();
    
  // 处理SVG内容，使fill属性能够通过color属性控制
  
  // 首先将内容分割成数组，以便单独处理第一个path
  const svgParts = innerSvg.match(/<path[^>]*>|<g[^>]*>|<\/g>|[^<]+/g) || [];
  let firstPathProcessed = false;
  
  for (let i = 0; i < svgParts.length; i++) {
    const part = svgParts[i];
    // 检查是否为path标签
    if (part.startsWith('<path') && !firstPathProcessed) {
      // 第一个path标签使用透明色
      svgParts[i] = part.replace(/fill="([^"]+)"/g, 'fill="transparent"');
      // 如果没有fill属性，添加transparent
      if (!svgParts[i].includes('fill=')) {
        svgParts[i] = svgParts[i].replace(/<path/, '<path fill="transparent"');
      }
      firstPathProcessed = true;
    } else if (part.startsWith('<path')) {
      // 其他path标签使用动态颜色
      let processed = part.replace(/fill="(#[0-9A-Fa-f]+|rgb\([^)]+\)|[a-zA-Z]+)"/g, ':fill="color"');
      // 处理没有fill属性的path元素
      if (!processed.includes('fill=')) {
        processed = processed.replace(/<path/, '<path :fill="color"');
      }
      svgParts[i] = processed;
    } else if (part.startsWith('<g')) {
      // 处理group元素上的fill属性
      svgParts[i] = part.replace(/fill="(#[0-9A-Fa-f]+|rgb\([^)]+\)|[a-zA-Z]+)"/g, ':fill="color"');
    }
  }
  
  // 重新组合SVG内容
  innerSvg = svgParts.join('');
  
  // 针对特殊的fill="none"情况单独处理（这些通常是背景或轮廓，不应该被替换）
  innerSvg = innerSvg.replace(/:fill="color"([^>]*?)fill="none"/g, 'fill="none"$1');

  return `<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
       :width="size" 
       :height="size" 
       :stroke="stroke"
       :stroke-width="strokeWidth"
       viewBox="${viewBox}"
       v-bind="$attrs">
    ${innerSvg}
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  stroke: {
    type: String,
    default: 'none'
  },
  strokeWidth: {
    type: [Number, String],
    default: 0
  }
});
</script>`;
}

// 递归处理目录
async function processDirectory(dir, relativeDir = '') {
  console.log(`处理目录: ${dir}`);
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    console.log(`目录 ${dir} 中有 ${entries.length} 个条目`);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(relativeDir, entry.name);
      
      if (entry.isDirectory()) {
        // 递归处理子目录
        console.log(`发现子目录: ${entry.name}`);
        await processDirectory(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        // 处理SVG文件
        console.log(`处理SVG文件: ${entry.name}`);
        
        // 获取基本文件名（不包含目录路径）
        const baseName = entry.name;
        // 转换为PascalCase格式
        const componentName = toPascalCase(baseName);
        
        // 创建组件目录（如有必要）
        const categoryDir = relativeDir;
        const componentOutputDir = path.join(componentDir, categoryDir);
        await ensureDir(componentOutputDir);
        
        // 创建并写入Vue组件
        const svgContent = await readFile(fullPath, 'utf8');
        const vueContent = createVueComponent(svgContent, componentName);
        const componentOutputPath = path.join(componentOutputDir, `${componentName}.vue`);
        
        console.log(`生成组件: ${componentName} => ${componentOutputPath}`);
        await writeFile(componentOutputPath, vueContent);
      }
    }
  } catch (error) {
    console.error(`处理目录 ${dir} 时出错:`, error);
    throw error;
  }
}

// 生成组件索引文件
async function generateIndex() {
  console.log('开始生成索引文件...');
  const indexPath = path.resolve(__dirname, '../index.js');
  const components = [];
  
  async function scanComponentDir(dir, relativeDir = '') {
    console.log(`扫描组件目录: ${dir}`);
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(relativeDir, entry.name);
      
      if (entry.isDirectory()) {
        // 递归扫描子目录
        await scanComponentDir(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.vue')) {
        // 收集组件
        const componentName = entry.name.replace(/\.vue$/, '');
        const importPath = `./${path.join('components', relativePath).replace(/\\/g, '/')}`;
        components.push({ name: componentName, path: importPath });
        console.log(`找到组件: ${componentName}`);
      }
    }
  }
  
  await scanComponentDir(componentDir);
  
  // 按字母顺序排序组件
  components.sort((a, b) => a.name.localeCompare(b.name));
  
  console.log(`共找到 ${components.length} 个组件`);
  
  // 生成索引文件内容
  const imports = components.map(comp => `import ${comp.name} from '${comp.path}';`).join('\n');
  const exports = `export {\n  ${components.map(comp => comp.name).join(',\n  ')}\n};\n\nexport default {\n  install(app) {\n    ${components.map(comp => `app.component('${comp.name}', ${comp.name});`).join('\n    ')}\n  }\n};`;
  
  // 写入索引文件
  await writeFile(indexPath, `${imports}\n\n${exports}`);
  
  console.log('Generated index.js');
  
  // 生成类型定义文件
  await ensureDir(typesDir);
  const dtsContent = `import { App, DefineComponent } from 'vue';

declare const install: (app: App) => void;
export default { install };

${components.map(comp => `export const ${comp.name}: DefineComponent<{
  size?: number | string;
  color?: string;
  stroke?: string;
  strokeWidth?: number | string;
}, {}, {}>;\n`).join('\n')}
`;
  
  await writeFile(path.resolve(typesDir, 'index.d.ts'), dtsContent);
  console.log('Generated type definitions');
}

// 主函数
async function main() {
  try {
    console.log('开始生成Vue组件...');
    
    // 确保输出目录存在
    await ensureDir(componentDir);
    await ensureDir(typesDir);
    
    // 处理SVG文件
    await processDirectory(svgDir);
    
    // 生成索引文件
    await generateIndex();
    
    console.log('All components generated successfully');
  } catch (error) {
    console.error('Error generating components:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

main(); 