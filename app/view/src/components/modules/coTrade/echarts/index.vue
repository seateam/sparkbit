<template>
  <div style="height: 100%">
    <div id="myEcharts" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/echarts/echarts';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/echarts/echarts.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
