<template>
  <svg :width="size" :height="size" :fill="color" :aria-hidden="true" v-bind="$attrs"><g ><path d="M0 0h24v24H0z"/><path  d="M14.62 2.662a1.5 1.5 0 0 1 1.04 1.85l-4.431 15.787a1.5 1.5 0 0 1-2.889-.81L12.771 3.7a1.5 1.5 0 0 1 1.85-1.039ZM7.56 6.697a1.5 1.5 0 0 1 0 2.12L4.38 12l3.182 3.182a1.5 1.5 0 1 1-2.122 2.121L1.197 13.06a1.5 1.5 0 0 1 0-2.12l4.242-4.243a1.5 1.5 0 0 1 2.122 0Zm8.88 2.12a1.5 1.5 0 1 1 2.12-2.12l4.243 4.242a1.5 1.5 0 0 1 0 2.121l-4.242 4.243a1.5 1.5 0 1 1-2.122-2.121L19.621 12z"/></g></svg>
</template>

<script>
export default {
  name: 'Development_Code_fill',
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