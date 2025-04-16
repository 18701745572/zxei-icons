# zxei-icons 演示

此目录包含 zxei-icons 的使用示例。

## 运行演示

要在本地运行演示，您可以按照以下步骤操作：

### 使用Vite

1. 创建一个新的Vue3项目：

```bash
npm create vite@latest my-icons-demo -- --template vue
cd my-icons-demo
```

2. 安装依赖：

```bash
npm install
npm install zxei-icons
```

3. 将 `Demo.vue` 文件复制到您的项目的 `src/components/` 目录下。

4. 修改 `src/App.vue` 文件以引入演示组件：

```vue
<template>
  <div>
    <Demo />
  </div>
</template>

<script setup>
import Demo from './components/Demo.vue'
</script>
```

5. 启动开发服务器：

```bash
npm run dev
```

### 直接在现有Vue3项目中使用

只需将 `Demo.vue` 复制到您的项目中，然后导入并使用它。

## 重要事项

- 确保您的项目使用Vue 3
- 确保您已经安装了 `zxei-icons` 包：`npm install zxei-icons`

## 自定义演示

您可以修改 `Demo.vue` 文件来尝试不同的图标和配置。 