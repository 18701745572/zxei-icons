<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M13 4a1 1 0 1 0-2 0v1H9.5a4 4 0 1 0 0 8h5a2 2 0 1 1 0 4H7a1 1 0 1 0 0 2h4v1a1 1 0 1 0 2 0v-1h1.5a4 4 0 0 0 0-8h-5a2 2 0 1 1 0-4H17a1 1 0 1 0 0-2h-4z"/></g></svg>
</template>

<script>
export default {
  name: 'Business_Currency_Dollar_2_line',
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