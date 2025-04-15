# ZXEI Icons

一个基于SVG的Vue图标组件库，提供了丰富的图标集合。

## 安装

```bash
npm install zxei-icons
```

或者

```bash
yarn add zxei-icons
```

## 使用方法

### 全局注册

```js
import { createApp } from 'vue';
import App from './App.vue';
import ZxeiIcons from 'zxei-icons';

const app = createApp(App);
app.use(ZxeiIcons);
app.mount('#app');
```

### 按需引入

```vue
<template>
  <div>
    <ArrowDownFill :size="24" color="red" />
  </div>
</template>

<script>
import { ArrowDownFill } from 'zxei-icons';

export default {
  components: {
    ArrowDownFill
  }
}
</script>
```

### 按类别引入

```vue
<template>
  <div>
    <ArrowDownFill :size="24" color="red" />
    <ArrowUpFill :size="24" color="blue" />
  </div>
</template>

<script>
import * as ArrowIcons from 'zxei-icons/src/components/arrow';

export default {
  components: {
    ...ArrowIcons
  }
}
</script>
```

## 组件属性

所有图标组件都接受以下属性：

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| size | Number, String | 24 | 图标大小，单位为像素 |
| color | String | 'currentColor' | 图标颜色，可以是任何有效的CSS颜色值 |

## 可用图标

本库包含以下类别的图标：

- arrow - 箭头类图标
- building - 建筑类图标
- business - 商业类图标
- contact - 联系类图标
- crypto - 加密货币类图标
- design - 设计类图标
- development - 开发类图标
- device - 设备类图标
- editor - 编辑器类图标
- education - 教育类图标
- emoji - 表情类图标
- file - 文件类图标
- food - 食物类图标
- logo - 商标类图标
- map - 地图类图标
- media - 媒体类图标
- nature - 自然类图标
- other - 其他类图标
- part - 部件类图标
- shape - 形状类图标
- sport - 运动类图标
- system - 系统类图标
- transport - 交通类图标
- user - 用户类图标
- weather - 天气类图标
- zodiac - 星座类图标

## 开发

```bash
# 生成图标组件
npm run generate

# 构建库
npm run build
```

## 如何贡献

1. Fork 该仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 添加新图标

1. 将SVG图标文件放入 `svg` 目录下对应的分类文件夹中
2. 运行 `npm run generate` 生成组件
3. 运行 `npm run build` 构建库
4. 提交你的更改

## 版本历史

### 1.0.0
- 初始版本发布
- 包含26个分类的图标库
- 支持Vue 2和Vue 3

## 发布流程

发布新版本到npm的步骤：

1. 更新版本号：`npm version [patch|minor|major]`
2. 构建项目：`npm run build`（prepublishOnly脚本会自动执行）
3. 发布到npm：`npm publish`

## 许可证

ISC 




