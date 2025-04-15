<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M13.5 4a1.5 1.5 0 0 0-3 0v.5h-1a4.5 4.5 0 0 0 0 9h5a1.5 1.5 0 0 1 0 3H7a1.5 1.5 0 0 0 0 3h3.5v.5a1.5 1.5 0 0 0 3 0v-.5h1a4.5 4.5 0 1 0 0-9h-5a1.5 1.5 0 1 1 0-3H17a1.5 1.5 0 0 0 0-3h-3.5z"/></g></svg>
</template>

<script>
export default {
  name: 'Business_Currency_Dollar_2_fill',
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