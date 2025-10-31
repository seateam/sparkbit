<template>
  <div class="free-staking">
    <China></China>
  </div>
</template>
<script>
import China from './china.vue';

export default {
  components: {
    China,
  },
};
</script>
<style lang="stylus" scoped>
.free-staking {
  background-color: var(--color-BG);
  min-height: 800px;
}
</style>
