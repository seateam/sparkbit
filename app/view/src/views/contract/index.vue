<template>
  <!-- 中国版 -->
  <div class="m-contract">
    <div class="m-ct">
      <div class="m-leftCt">
        <current-symbol />
        <div class="ct">
          <div class="trade">
            <trading-view moduleType="co" />
          </div>
          <orderList />
        </div>
      </div>
      <div class="m-rightCt">
        <depth />
        <div class="m-tab">
          <div class="item" :class="{ active: activeIndex === 0 }" @click="activeIndex = 0">
            {{ $t("futures.newTrade.text1") }}
          </div>
          <div class="item" :class="{ active: activeIndex === 1 }" @click="activeIndex = 1">
            {{ $t("futures.newTrade.myTrades") }}
          </div>
        </div>
        <depth :onlyShowNew="true" :activeIndex="activeIndex" />
      </div>

      <div class="m-formBox">
        <!--<div class="msg" v-if="showNoticeBoard">-->
        <!--  <div class="icon">-->
        <!--    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--      <ellipse cx="6.16628" cy="5.73331" rx="5.31862" ry="5.36222" fill="#326AD5"/>-->
        <!--      <rect x="5.68262" y="2.32031" width="0.967023" height="4.87475" rx="0.0487475" fill="#261B04"/>-->
        <!--      <rect x="5.68262" y="8.6582" width="0.967023" height="0.974949" rx="0.0487475" fill="#261B04"/>-->
        <!--    </svg>-->
        <!--  </div>-->
        <!--  <div class="txt">-->
        <!--    0% trading fee on this BTC pair  <span>More Details</span>-->
        <!--  </div>-->
        <!--  <div class="del" @click="showNoticeBoard = false">-->
        <!--    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--      <path d="M7.39515 1.29492L4.01056 4.70724M0.625977 8.11957L4.01056 4.70724M4.01056 4.70724L0.625977 1.29492L7.23088 7.95396L7.39515 8.11957" stroke="#EAECEF" stroke-width="0.974949"/>-->
        <!--    </svg>-->
        <!--  </div>-->
        <!--</div>-->
        <trade-form />
        <assets />
      </div>
    </div>
    <!--<div class="m-orderCt">-->
    <!--  <orderList />-->
    <!--</div>-->
    <!-- 开通合约弹框 -->
    <openFutures :isShow="openFuturesDialogShow" :close="closeDialog" />
    <!-- 交易喜好设置 -->
    <setFutures :isShow="setFuturesDialogShow" :close="closeDialog" />
    <!-- 计算器 -->
    <calculator :isShow="calculatorDialogShow" :close="closeDialog" />
    <div
      v-if="false"
      v-on:dblclick="ondblclick"
      @click="onclickfun"
      class="contract-content a-8-bg"
    >
      <template>
        <div class="layout-block-Klinw">
          <current-symbol />
          <!--<trading-view moduleType="co" />-->
        </div>
        <div class="layout-block-depth">
          <!-- 深度盘口  和 实时成交 -->
          <depth />
        </div>
        <!-- 2022.12.29 删除类名  a-6-bg -->
        <div class="layout-block-trade" id="layoutBlockTrade">
          <trade-form />
          <assets />
        </div>
        <div class="layout-block-order">
          <orderList />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import "@/components/BlockChain-ui-privatization/PC/common-mixin/contract/index/index.styl";
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/contract/index/index";
// 当前币对信息
import currentSymbol from "@/components/modules/coTrade/currentSymbol.vue";
// 盘口 && 实时成交
import depth from "@/components/modules/coTrade/depth.vue";
// tradingView && Echarts
import tradingView from "@/components/modules/coTrade/tradingView/index.vue";
// 下单交易
import tradeForm from "@/components/modules/coTrade/tradeForm2.vue";
// 订单列表
import orderList from "@/components/modules/coTrade/orderList.vue";
// 资产
import assets from "@/components/modules/coTrade/assets.vue";
// 开通合约交易弹框
import openFutures from "@/components/modules/coTrade/component/openFutures.vue";
// 交易喜好设置弹框
import setFutures from "@/components/modules/coTrade/component/setFutures.vue";
// 计算器弹框
import calculator from "@/components/modules/coTrade/component/calculator.vue";
import market from "@/components/modules/coTrade/market2.vue";
import bottomTool from "@/components/bottomTool";
import marketActive from "@/components/modules/trade/marketActive";

export default {
  mixins: [mixin],
  components: {
    currentSymbol,
    depth,
    tradingView,
    tradeForm,
    orderList,
    assets,
    openFutures,
    setFutures,
    calculator,
    market,
    bottomTool,
    marketActive,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      collapseStatus: false,
      showNoticeBoard: true,
      activeIndex: 0, // 实时交易/我的交易
    };
  },
};
</script>
<style scoped>
.dark .m-contract {
  --trade-color-1: rgba(0, 0, 0, 1);
  --trade-color-2: rgba(180, 191, 214, 0.12);
  --trade-color-3: rgba(12, 14, 17, 1);
  --trade-color-4: rgba(205, 206, 207, 1);
  --trade-color-5: rgba(115, 121, 127, 1);
  --trade-color-6: rgba(21, 22, 23, 1);
  --trade-color-7: rgba(24, 25, 28, 1);
  --trade-color-8: rgba(24, 25, 28, 1);
  --trade-color-9: rgba(255, 255, 255, 0.06);
  --trade-color-10: rgba(17, 18, 20, 1);
  --trade-color-11: rgba(255, 255, 255, 1);
  --trade-color-12: rgba(255, 255, 255, 0.6);
  --trade-color-13: rgba(44, 45, 46, 1);
}
.light .m-contract {
  --trade-color-1: rgba(255, 255, 255, 1);
  --trade-color-2: rgba(238, 238, 238, 1);
  --trade-color-3: rgba(255, 255, 255, 1);
  --trade-color-4: rgba(104, 104, 104, 1);
  --trade-color-5: rgba(152, 152, 152, 1);
  --trade-color-6: rgba(238, 238, 238, 1);
  --trade-color-7: rgba(225, 225, 225, 1);
  --trade-color-8: rgba(238, 238, 238, 1);
  --trade-color-9: rgba(40, 40, 40, 0.06);
  --trade-color-10: rgba(16, 88, 222, 0.3);
  --trade-color-11: rgba(16, 88, 222, 1);
  --trade-color-12: rgba(104, 104, 104, 1);
  --trade-color-13: rgba(238, 238, 238, 1);
}
/* 2022.12.20 修改样式 */
/*.contract-content .layout-block-depth,*/
/*.contract-content .layout-block-trade {*/
/*  top: 75px;*/
/*}*/
/*.contract-content .layout-block-Klinw {*/
/*  height: 617px;*/
/*}*/
.layout-block-trade {
  background: #181a1f;
}

/* 2023.02.24 新增圆角 */
.contract-content {
  --borderRadius: 10px;
}
.layout-block-Klinw,
.layout-block-order {
  overflow: hidden;
  border-radius: var(--borderRadius);
}
.layout-block-Klinw /deep/.m-currentSymbol {
  border-top-right-radius: var(--borderRadius);
}
.layout-block-Klinw /deep/.future-canter-echart-box {
  border-bottom-right-radius: var(--borderRadius);
}
.layout-block-order /deep/.order-list-box {
  border-radius: var(--borderRadius);
  overflow: hidden;
}
.layout-block-order /deep/.order-list-box .tab-box {
  border-top-right-radius: var(--borderRadius);
}
.layout-block-depth {
  border-radius: var(--borderRadius);
  height: 842px;
}
.layout-block-trade {
  border-radius: var(--borderRadius);
}
</style>
<style scoped>
.m-ct {
  /* max-width: 1582px; */
  /* max-width: 1566px; */
  margin: auto;
  display: flex;
  box-sizing: border-box;
  padding: 8px;
}
.m-leftCt {
  width: calc(100% - 656px);
  min-width: 850px;
}
.m-leftCt > .ct {
  width: 100%;
  position: relative;
  z-index: 1;
}
.m-leftCt > .ct > .depth {
  width: 300px;
  border: 1px solid #26292f;
}
.m-leftCt > .ct > .trade {
  width: 100%;
  margin-bottom: 8px;
  background-color: var(--trade-color-1);
  border-radius: 0 0 8px 8px;
}
.m-rightCt {
  width: 320px;
  margin-inline: 8px;
  position: relative;
  z-index: 0;
}
.light .m-rightCt {
  border-color: transparent;
}
.m-rightCt > .line {
  width: 100%;
  height: 1px;
  background: #26292f;
  margin: 12px auto;
}
.m-rightCt > .title {
  height: 42px;
  line-height: 42px;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: var(--mainColor);
  box-sizing: border-box;
  padding: 0 14px;
}
/deep/.future-canter-echart-box .coverKlineBox {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.m-orderCt {
  width: 1520px;
  margin: auto auto 50px;
}
.m-tab {
  display: flex;
  align-content: center;
}
.m-tab {
  height: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 8px;
  border-radius: 8px 8px 0 0;
  background-color: var(--trade-color-1);
  border-bottom: 1px solid var(--color-Toggle);
}
.m-tab > .item {
  position: relative;
  font-weight: 700;
  font-size: 14px;
  line-height: 44px;
  color: var(--color-text-secondary);
  cursor: pointer;
  user-select: none;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
}
.m-tab > .item.active {
  color: var(--color-1);
}
.m-tab > .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 22px 100%
    no-repeat;
}
.m-tab > .item:not(:last-child) {
  margin-right: 20px;
}

.right-market-active {
  height: 146px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all ease-in-out 0.3s;
  background-color: #161a1e;
  box-sizing: border-box;
}

.collapse.right-market-active {
  height: 230px;
}
.right-market-active_icon {
  padding: 5px 16px 0;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
.m-formBox {
  width: 320px;
  background: var(--trade-color-1);
  border-radius: 8px;
}
.m-formBox > .msg {
  width: 100%;
  height: 47px;
  background: rgba(50, 106, 213, 0.21);
  box-sizing: border-box;
  padding-left: 24px;
  position: relative;
  padding-top: 8px;
}
.m-formBox > .msg > .icon {
  position: absolute;
  left: 8px;
  top: 11px;
}
.m-formBox > .msg > .txt {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  line-height: 1.4;
  width: 142px;
}
.m-formBox > .msg > .txt > span {
  color: #326ad5;
  padding-left: 10px;
}
.m-formBox > .msg > .del {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
}
.m-contract {
  background: var(--color-BG-Light);
}
</style>
