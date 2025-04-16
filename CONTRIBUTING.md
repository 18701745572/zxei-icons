# 贡献指南

感谢您对zxei-icons的贡献兴趣！这个文档会指导您如何为项目做出贡献。

## 开始之前

请确保您已经：

1. 阅读并同意我们的[行为准则](CODE_OF_CONDUCT.md)
2. 在提交新功能或更改前，先检查是否有相关的issues或pull requests

## 如何贡献

### 提交Bug

1. 在提交bug之前，请先检查是否已经有相同的bug报告
2. 使用issue模板创建一个新的bug报告
3. 提供尽可能详细的信息，包括：
   - 复现步骤
   - 期望行为
   - 实际行为
   - 截图（如果可能）
   - 环境信息（操作系统、浏览器等）

### 添加新图标

1. Fork该仓库
2. 将SVG文件添加到相应的类别目录下（`svg/[category]/`）
3. SVG文件命名应遵循下划线命名法（例如：`file_name.svg`）
4. SVG文件应该是24x24大小，保持简洁
5. 运行`npm run generate`生成Vue组件
6. 提交更改和Pull Request

#### SVG文件命名规则

- 使用小写字母
- 单词间使用下划线分隔
- 填充图标名称以`_fill`结尾
- 线条图标名称以`_line`结尾

例如：`arrow_right_fill.svg`, `arrow_right_line.svg`

### 提交Pull Request

1. 确保您的代码符合项目风格
2. 更新文档（如有必要）
3. 提交前在本地测试您的更改
4. 创建一个描述清晰的Pull Request，包括：
   - 要解决的问题
   - 更改内容
   - 任何依赖更改

## 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/18701745572/zxei-icons.git
cd zxei-icons

# 安装依赖
npm install

# 生成Vue组件
npm run generate
```

## 发布流程（仅限维护者）

1. 更新`package.json`中的版本号
2. 更新`CHANGELOG.md`
3. 提交更改并创建标签
   ```bash
   git add .
   git commit -m "release: v1.x.x"
   git tag v1.x.x
   git push && git push --tags
   ```
4. 发布到npm
   ```bash
   npm login
   npm publish
   ```

## 代码审查流程

所有的提交都需要通过代码审查后才能合并到主分支。维护者会审查您的更改，并可能要求进行修改。 