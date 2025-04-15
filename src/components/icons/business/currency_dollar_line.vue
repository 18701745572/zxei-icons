<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v1h2a1 1 0 0 1 .117 1.993L15 10h-5a.5.5 0 0 0-.09.992L10 11h4a2.5 2.5 0 0 1 .164 4.995L14 16h-1v1a1 1 0 0 1-1.993.117L11 17v-1H9a1 1 0 0 1-.117-1.993L9 14h5a.5.5 0 0 0 .09-.992L14 13h-4a2.5 2.5 0 0 1-.164-4.995L10 8h1V7a1 1 0 0 1 1-1"/></g></svg>
</template>

<script>
export default {
  name: 'Business_Currency_Dollar_line',
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