# zxei-icons

Vue3 SVG 图标组件库

[![npm version](https://img.shields.io/npm/v/zxei-icons.svg)](https://www.npmjs.com/package/zxei-icons)
[![npm downloads](https://img.shields.io/npm/dm/zxei-icons.svg)](https://www.npmjs.com/package/zxei-icons)
[![license](https://img.shields.io/npm/l/zxei-icons.svg)](https://github.com/jianghuizhong/zxei-icons/blob/main/LICENSE)
[![CI](https://github.com/18701745572/zxei-icons/actions/workflows/ci.yml/badge.svg)](https://github.com/18701745572/zxei-icons/actions/workflows/ci.yml)

一个简洁、易用的Vue3 SVG图标组件库，支持按需引入和全局注册。

## 特性

- 🚀 **按需引入**: 只打包你需要的图标
- 🎨 **自定义样式**: 可以自定义颜色、大小等属性
- 💪 **TypeScript支持**: 包含完整的类型定义
- 🔍 **组件化**: 每个图标都是一个独立的Vue组件
- 📦 **零依赖**: 没有额外的依赖
- 🌐 **SSR支持**: 支持服务端渲染

## 安装

```bash
# 使用npm
npm install zxei-icons

# 使用yarn
yarn add zxei-icons

# 使用pnpm
pnpm add zxei-icons
```

## 使用方法

### 全局注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import ZxeiIcons from 'zxei-icons'

const app = createApp(App)
app.use(ZxeiIcons)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <div>
    <ArrowRightFill />
    <ArrowLeftFill :size="32" color="red" />
  </div>
</template>

<script>
import { ArrowRightFill, ArrowLeftFill } from 'zxei-icons'

export default {
  components: {
    ArrowRightFill,
    ArrowLeftFill
  }
}
</script>
```

### 在 Vue3 Composition API 中使用

```vue
<template>
  <div>
    <ArrowRightFill />
    <component :is="dynamicIcon" :size="32" color="blue" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowRightFill, ArrowLeftFill } from 'zxei-icons';

const dynamicIcon = ref(ArrowLeftFill);

// 动态更改图标
const changeIcon = () => {
  dynamicIcon.value = ArrowRightFill;
};
</script>
```

### 自定义主题

你可以创建一个图标包装组件来实现统一的样式设置：

```vue
<!-- IconWrapper.vue -->
<template>
  <component 
    :is="icon" 
    :size="size" 
    :color="theme[colorType]" 
    v-bind="$attrs"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: Object,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  colorType: {
    type: String,
    default: 'primary'
  }
});

// 定义主题颜色
const theme = {
  primary: '#3498db',
  success: '#2ecc71',
  warning: '#f1c40f',
  danger: '#e74c3c',
  info: '#1abc9c'
};
</script>
```

然后这样使用：

```vue
<template>
  <div>
    <IconWrapper :icon="ArrowRightFill" colorType="primary" />
    <IconWrapper :icon="AlertFill" colorType="danger" size="32" />
  </div>
</template>

<script setup>
import { ArrowRightFill, AlertFill } from 'zxei-icons';
import IconWrapper from './IconWrapper.vue';
</script>
```

## 组件属性

所有图标组件都接受以下属性：

- `size`: 图标大小，默认为 24px
- `color`: 图标颜色，默认为 currentColor
- `stroke`: 描边颜色，默认为 none
- `strokeWidth`: 描边宽度，默认为 0

## 组件列表

该库包含以下类别的图标：

- arrow
- building
- business
- contact
- crypto
- design
- development
- device
- editor
- education
- emoji
- file
- food
- logo
- map
- media
- nature
- other
- part
- shape
- sport
- system
- transport
- user
- weather
- zodiac

## 生成组件

执行以下命令以从SVG文件生成Vue组件：

```bash
npm run generate
```

## 贡献

我们欢迎各种形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解如何参与。

如果你想添加新图标，请遵循以下步骤：

1. Fork该仓库
2. 添加SVG图标到相应的类别目录
3. 运行`npm run generate`生成Vue组件
4. 提交Pull Request

请确保遵循我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 发布

如果你是维护者，可以按照以下步骤发布新版本：

1. 更新`package.json`中的版本号
2. 运行测试(如果有)
3. 运行构建
   ```bash
   npm run build
   ```
4. 提交变更并创建标签
   ```bash
   git add .
   git commit -m "release: v1.x.x"
   git tag v1.x.x
   git push && git push --tags
   ```
5. 发布到npm
   ```bash
   npm login
   npm publish
   ```

## 浏览器兼容性

支持所有现代浏览器，包括：

- Chrome
- Firefox
- Safari
- Edge

## 许可证

ISC 

## 支持

如果你在使用过程中遇到任何问题，可以通过以下方式获取支持：

- 创建 [GitHub Issue](https://github.com/18701745572/zxei-icons/issues/new/choose)
- 查看 [常见问题解答](https://github.com/18701745572/zxei-icons/wiki/FAQ)（建议创建Wiki页面）

## 星星历史

[![Star History Chart](https://api.star-history.com/svg?repos=18701745572/zxei-icons&type=Date)](https://star-history.com/#18701745572/zxei-icons&Date) 