<template>
  <div style="height: 100%">
    <div :id="echartsId" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from './echarts';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/echarts/echarts.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
