<!-- 改，2022.11.28 新增选择代币组件 -->
<template>
  <div class="a-21-bg">
    <!-- 改，2022.12.02 新增isAdd参数，标明是新增-->
    <Market :isAdd="true" :moduleType="moduleType" @onClickOutside="onClickOutside" />
  </div>
</template>

<script>
import Market from "../views/trade/modules/market/index.vue";

export default {
  name: "selectCoin",
  components: {
    Market,
  },
  props: {
    moduleType: {
      type: String,
      default: "ex",
    },
    currentItem: {
      type: Object,
      default: () => ({}),
    },
  },
  provide() {
    return {
      currentItem: this.currentItem,
    };
  },
  data() {
    return {};
  },
  methods: {
    // 关闭市场
    onClickOutside() {
      this.isShowMarket = false;
    },
  },
};
</script>

<style scoped>
/deep/.trade-market-index-container.trade-market .market-symbol .tbody {
  height: 400px;
}
.m-title {
  font-style: normal;
  font-weight: 600;
  font-size: 17.6px;
  line-height: 25px;
  letter-spacing: -0.33px;
  color: #ffffff;
  padding: 19px 0 10px 14px;
}
</style>
