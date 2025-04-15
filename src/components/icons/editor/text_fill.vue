<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M5 3.5a1.5 1.5 0 1 0 0 3h5.5V20a1.5 1.5 0 0 0 3 0V6.5H19a1.5 1.5 0 0 0 0-3z"/></g></svg>
</template>

<script>
export default {
  name: 'Editor_Text_fill',
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