const fs = require('fs');
const path = require('path');

// 组件目录
const componentsDir = path.resolve(__dirname, 'components');

// 输出文件路径
const outputFile = path.resolve(__dirname, '列出全部3102个组件名称.md');

// 获取所有类别
const categories = fs.readdirSync(componentsDir)
  .filter(category => fs.statSync(path.join(componentsDir, category)).isDirectory())
  .sort();

// 准备输出内容
let output = `# zxei-icons 全部3102个组件名称列表

本文档按类别列出了zxei-icons库中所有3102个组件的名称。

## 目录\n\n`;

// 添加目录
categories.forEach(category => {
  const categoryNameMap = {
    'arrow': '箭头类 (Arrow)',
    'building': '建筑类 (Building)',
    'business': '商业类 (Business)',
    'contact': '联系人类 (Contact)',
    'crypto': '加密货币类 (Crypto)',
    'design': '设计类 (Design)',
    'development': '开发类 (Development)',
    'device': '设备类 (Device)',
    'editor': '编辑器类 (Editor)',
    'education': '教育类 (Education)',
    'emoji': '表情类 (Emoji)',
    'file': '文件类 (File)',
    'food': '食物类 (Food)',
    'logo': '标志类 (Logo)',
    'map': '地图类 (Map)',
    'media': '媒体类 (Media)',
    'nature': '自然类 (Nature)',
    'other': '其他类 (Other)',
    'part': '部件类 (Part)',
    'shape': '形状类 (Shape)',
    'sport': '运动类 (Sport)',
    'system': '系统类 (System)',
    'transport': '交通类 (Transport)',
    'user': '用户类 (User)',
    'weather': '天气类 (Weather)',
    'zodiac': '星座类 (Zodiac)'
  };
  
  const categoryName = categoryNameMap[category] || category;
  const anchor = categoryName.split(' ')[0];
  output += `- [${categoryName}](#${anchor})\n`;
});

output += '\n';

// 添加每个分类的组件列表
categories.forEach(category => {
  const categoryNameMap = {
    'arrow': '箭头类 (Arrow)',
    'building': '建筑类 (Building)',
    'business': '商业类 (Business)',
    'contact': '联系人类 (Contact)',
    'crypto': '加密货币类 (Crypto)',
    'design': '设计类 (Design)',
    'development': '开发类 (Development)',
    'device': '设备类 (Device)',
    'editor': '编辑器类 (Editor)',
    'education': '教育类 (Education)',
    'emoji': '表情类 (Emoji)',
    'file': '文件类 (File)',
    'food': '食物类 (Food)',
    'logo': '标志类 (Logo)',
    'map': '地图类 (Map)',
    'media': '媒体类 (Media)',
    'nature': '自然类 (Nature)',
    'other': '其他类 (Other)',
    'part': '部件类 (Part)',
    'shape': '形状类 (Shape)',
    'sport': '运动类 (Sport)',
    'system': '系统类 (System)',
    'transport': '交通类 (Transport)',
    'user': '用户类 (User)',
    'weather': '天气类 (Weather)',
    'zodiac': '星座类 (Zodiac)'
  };
  
  const categoryName = categoryNameMap[category] || category;
  output += `## ${categoryName}\n\n`;
  
  // 获取该类别的所有组件
  const categoryDir = path.join(componentsDir, category);
  const components = fs.readdirSync(categoryDir)
    .filter(file => file.endsWith('.vue'))
    .map(file => file.replace('.vue', ''))
    .sort();
  
  // 计算每行显示的组件数
  const componentsPerRow = 3;
  let table = '| 组件名称 | 组件名称 | 组件名称 |\n';
  table += '|----------|----------|----------|\n';
  
  // 生成表格
  for (let i = 0; i < components.length; i += componentsPerRow) {
    const row = [];
    for (let j = 0; j < componentsPerRow; j++) {
      if (i + j < components.length) {
        row.push(components[i + j]);
      } else {
        row.push('');
      }
    }
    table += `| ${row.join(' | ')} |\n`;
  }
  
  output += table + '\n';
});

// 写入文件
fs.writeFileSync(outputFile, output);

console.log(`组件列表已保存到 ${outputFile}`); 