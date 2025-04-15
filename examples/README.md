# ZXEI Icons 使用示例

本目录包含了 ZXEI Icons 的使用示例。

## 运行示例

1. 首先构建图标库：

```bash
# 在项目根目录下
npm install
npm run generate
npm run build
```

2. 安装示例依赖项：

```bash
# 在examples目录下
npm install
```

3. 运行示例：

```bash
npm run serve
```

4. 在浏览器中打开 http://localhost:8080 查看示例。

## 示例说明

- `IconDemo.vue` - 展示了图标的基本用法、自定义大小和颜色
- `CategoryDemo.vue` - 展示了如何按类别导入和使用图标
- `App.vue` - 示例应用的入口组件 