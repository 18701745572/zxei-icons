const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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
  const innerSvg = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  return `<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
       :width="size" 
       :height="size" 
       :fill="color"
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

// 测试转换
async function testConvert() {
  if (process.argv.length < 3) {
    console.log('Usage: node test-convert.js <svg-file-path>');
    process.exit(1);
  }

  const svgFilePath = process.argv[2];
  const svgContent = await readFile(svgFilePath, 'utf8');
  const fileName = path.basename(svgFilePath);
  const componentName = toPascalCase(fileName);
  
  const vueContent = createVueComponent(svgContent, componentName);
  const outputPath = path.join(process.cwd(), 'test-output.vue');
  
  await writeFile(outputPath, vueContent);
  console.log(`转换成功！已将 ${fileName} 转换为 ${componentName}.vue 组件，输出到 test-output.vue`);
}

testConvert().catch(error => {
  console.error('转换失败:', error);
  process.exit(1);
}); 