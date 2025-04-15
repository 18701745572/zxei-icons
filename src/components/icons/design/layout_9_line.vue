<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g  fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path  d="M19 3a2 2 0 0 1 1.995 1.85L21 5v14a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm0 2h-6v14h6zm-8 11H5v3h6zm0-6H5v4h6zm0-5H5v3h6z"/></g></svg>
</template>

<script>
export default {
  name: 'Design_Layout_9_line',
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