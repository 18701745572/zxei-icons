<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M5 4a1 1 0 0 0 0 2h6v14a1 1 0 1 0 2 0V6h6a1 1 0 1 0 0-2z"/></g></svg>
</template>

<script>
export default {
  name: 'Editor_Text_line',
  props: {
    // 图标大小，默认24px
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标颜色，默认继承当前文本颜色
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>