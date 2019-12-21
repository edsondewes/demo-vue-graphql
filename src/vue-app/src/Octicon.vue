<template>
  <!-- eslint-disable vue/no-v-html -->
  <span
    class="octicon"
    v-html="icoSvg"
  />
</template>

<script>
import octicons from '@primer/octicons';
export default {
  name: 'Octicon',
  props: {
    ico: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    icoSvg () {
      return octicons[this.ico].toSVG(this.width ? { "width": this.width } : {});
    },
  },
};
</script>

<style scoped>
.octicon {
  display: inline-block;
  fill: currentColor;
}
</style>