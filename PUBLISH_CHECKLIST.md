# NPM发布检查清单

在发布到npm之前，请确保完成以下检查项：

## 基本信息
- [ ] package.json中的版本号已更新
- [ ] package.json中的作者、仓库、许可证等信息已填写完整
- [ ] CHANGELOG.md已更新，记录当前版本的变更内容
- [ ] README.md内容完整，包括安装、使用方法等文档

## 代码准备
- [ ] 所有代码变更已提交到版本控制系统
- [ ] 执行 `npm run build` 确保构建成功
- [ ] 移除所有console.log调试信息
- [ ] 检查dist目录下的构建文件是否正确

## 测试
- [ ] 在本地测试包是否可以正常工作
- [ ] 用 `npm pack` 创建tarball并在其他项目中测试
- [ ] 在不同环境下测试（浏览器兼容性）

## npm账号
- [ ] 已登录npm账号 (`npm login`)
- [ ] 确认npm账号有权限发布该包
- [ ] 如果是组织包，确认组织权限设置

## 发布
- [ ] 执行 `npm publish --dry-run` 检查将要发布的文件
- [ ] 确认.npmignore正确排除了不需要发布的文件
- [ ] 发布: `npm publish`

## 发布后
- [ ] 在GitHub上创建对应版本的tag和release
- [ ] 检查npm网站上包的信息和文档是否正确显示
- [ ] 安装已发布的包并验证功能

## 注意事项
- 使用 `npm version patch|minor|major` 自动更新版本号
- 确保包名在npm上是唯一的，否则会发布失败
- 首次发布使用 `npm publish --access=public`（如果是作用域包） 