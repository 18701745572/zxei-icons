<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11"/></g></svg>
</template>

<script>
export default {
  name: 'File_Search_fill',
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