<!-- 改，2022.11.28 新增K线图组件 -->
<template>
  <div>
    <!-- 24小时 当前行情 -->
    <current-symbol
      :etfUrl="etfUrl"
      :etfPrice="etfPrice"
      :marketShrink="marketShrink"
      @shrinkBlock="shrinkBlock"
      @serachShrinkBlock="serachShrinkBlock"
      :showGridFlag="showGridFlag"
      ref="currentSymbol"
      @del="del"
    >
    </current-symbol>
    <div class="chart-box a-5-bg" @click="onClickOutside()">
      <trading-view />
    </div>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import currentSymbol from "./currentSymbol/index.vue";
import tradingView from "./tradingView/index.vue";
import kLineChart from "./kLineChart";

export default {
  name: "kLineChart",
  components: {
    currentSymbol,
    tradingView,
  },
  mixins: [kLineChart],
  provide() {
    return {
      currentItem: this.currentItem,
    };
  },
  props: {
    currentItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    this.createdInit();
  },
  computed: {
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 1;
      if (publicInfo && publicInfo.switch && publicInfo.switch.grid_trade_switch) {
        str = Number(publicInfo.switch.grid_trade_switch);
      }
      return str;
    },
    // 该币对是否开启网格
    showGridFlag() {
      let flag = false;
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];
        if (symbol && symbol.is_grid_open && this.gridTradeFlag) {
          flag = true;
        }
      }
      return flag;
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  watch: {
  },
  methods: {
    // 删除
    del() {
      this.$emit("del", {});
    },
    shrinkBlock() {
      this.marketShrink = !this.marketShrink;
    },
    serachShrinkBlock() {
      this.marketShrink = false;
    },
    onClickOutside() {
      this.$refs.currentSymbol.onClickOutside();
    },
  },
};
</script>

<style scoped>
/deep/.trade-market-index-container.trade-market .market-symbol .tbody {
  overflow: auto !important;
  height: 400px;
}
/deep/.currentSymbol{
  position: relative;
}
</style>
