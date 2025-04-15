#!/usr/bin/env node

/**
 * 该脚本用于帮助发布npm包
 * 功能：
 * 1. 验证package.json
 * 2. 运行构建
 * 3. 执行发布前检查
 * 4. 提示发布
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// 定义颜色
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 创建命令行交互
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 路径定义
const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');

// 检查package.json文件
function checkPackageJson() {
  console.log(`${colors.blue}检查 package.json...${colors.reset}`);
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`${colors.red}错误: package.json文件不存在${colors.reset}`);
    process.exit(1);
  }
  
  const pkg = require(packageJsonPath);
  
  // 检查必要字段
  const requiredFields = ['name', 'version', 'description', 'main', 'author', 'license'];
  const missingFields = requiredFields.filter(field => !pkg[field]);
  
  if (missingFields.length > 0) {
    console.error(`${colors.red}错误: package.json缺少必要字段: ${missingFields.join(', ')}${colors.reset}`);
    process.exit(1);
  }
  
  // 检查仓库信息
  if (!pkg.repository) {
    console.warn(`${colors.yellow}警告: 缺少repository字段${colors.reset}`);
  }
  
  // 检查关键字
  if (!pkg.keywords || pkg.keywords.length === 0) {
    console.warn(`${colors.yellow}警告: 缺少关键字${colors.reset}`);
  }
  
  console.log(`${colors.green}package.json检查通过${colors.reset}`);
  console.log(`准备发布版本: ${colors.cyan}${pkg.version}${colors.reset}\n`);
  
  return pkg;
}

// 运行构建
function runBuild() {
  try {
    console.log(`${colors.blue}执行构建...${colors.reset}`);
    execSync('npm run build', { stdio: 'inherit' });
    console.log(`${colors.green}构建成功${colors.reset}\n`);
  } catch (error) {
    console.error(`${colors.red}构建失败${colors.reset}`);
    process.exit(1);
  }
}

// 发布前检查
function runPublishChecks() {
  try {
    console.log(`${colors.blue}执行发布前检查...${colors.reset}`);
    // 检查是否有未提交的变更
    try {
      execSync('git diff --exit-code', { stdio: 'ignore' });
    } catch (error) {
      console.warn(`${colors.yellow}警告: 有未提交的变更${colors.reset}`);
    }

    // 运行一次npm包检查
    console.log(`${colors.blue}执行npm包检查...${colors.reset}`);
    const output = execSync('npm publish --dry-run', { encoding: 'utf-8' });
    console.log(`${colors.green}发布检查通过${colors.reset}\n`);
    console.log(`以下文件将被发布:`);
    console.log(output);
    
  } catch (error) {
    console.error(`${colors.red}发布检查失败: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// 发布包
function publishPackage() {
  rl.question(`${colors.magenta}确认发布? (y/n) ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() === 'y') {
      try {
        console.log(`${colors.blue}正在发布...${colors.reset}`);
        execSync('npm publish', { stdio: 'inherit' });
        console.log(`${colors.green}发布成功!${colors.reset}`);
        
        // 提示创建git标签
        const pkg = require(packageJsonPath);
        console.log(`\n${colors.yellow}别忘了创建Git标签:${colors.reset}`);
        console.log(`git tag v${pkg.version}`);
        console.log(`git push origin v${pkg.version}\n`);
        
      } catch (error) {
        console.error(`${colors.red}发布失败: ${error.message}${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}发布已取消${colors.reset}`);
    }
    rl.close();
  });
}

// 主函数
function main() {
  console.log(`${colors.cyan}=== NPM发布助手 ===${colors.reset}\n`);
  
  checkPackageJson();
  runBuild();
  runPublishChecks();
  publishPackage();
}

main(); 