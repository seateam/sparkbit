<template>
  <div class="m-leverPage">
    <template v-if="templateLayoutType && templateLayoutType === '2'">
      <div class="Int-trade">
        <div v-on:dblclick="ondblclick" @click="onclickfun" class="trade-content a-8-bg">
          <div :class="leftClasses">
            <div ref="leftBox" class="left-block">
              <!-- 24小时行情 -->
              <Market
                @shrinkBlock="shrinkBlock"
                @serachShrinkBlock="serachShrinkBlock"
                moduleType="lever"
              />
            </div>
            <div class="lever-main-block">
              <div class="center-block">
                <!-- 24小时 当前行情 -->
                <current-symbol moduleType="lever" />
                <div class="chart-box a-5-bg">
                  <trading-view moduleType="lever" />
                </div>
              </div>
              <div class="order-list">
                <orderList moduleType="lever" />
              </div>
            </div>
            <div class="right-block">
              <Depth moduleType="lever" />
              <div class="lever-transaction">
                <trade-form />
              </div>
            </div>
          </div>
          <i v-if="!baseInfo"></i>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 改，2022.09.24，新增onClickOutside()，注释onclickfun() -->
      <!-- onclickfun()用于控制遮罩 -->
      <div
        v-on:dblclick="ondblclick"
        @click="onClickOutside()"
        class="trade-content a-8-bg"
        :class="{ 'trade-shrinks': shrink }"
      >
        <!--<noticeBoard v-show="showNoticeBoard" @close="showNoticeBoard = false"></noticeBoard>-->
        <div :class="leftClasses" class="lever-center-box">
          <!--          <div ref="leftBox" class="left-block">-->
          <!-- 改，2022.09.24，注释 -->
          <!-- 24小时行情 -->
          <!-- <Market @shrinkBlock="shrinkBlock"
              @serachShrinkBlock="serachShrinkBlock"
              moduleType="lever"/> -->
          <!--          </div>-->
          <div class="center-block2">
            <div class="left_center_box">
              <div class="bibi_trade_body">
                <div class="left-block-new">
                  <Market_blue moduleType="lever"></Market_blue>
                  <!-- <Depth moduleType="lever" showTab="0" /> -->
                </div>
                <div class="bibi_trade_view">
                  <current-symbol
                    @shrinkBlock="shrinkBlock"
                    @serachShrinkBlock="serachShrinkBlock"
                    moduleType="lever"
                    ref="currentSymbol"
                  />
                  <div class="chart-box a-5-bg">
                    <trading-view moduleType="lever" />
                  </div>
                  <!-- 改，2022.09.21，新增 -->
                  <div class="right-block" style="display: flex">
                    <!-- 改，2022.09.21，新增style -->
                    <div class="transaction m-transaction" style="height: 815px">
                      <trade-form @leverFinance="getLeverFinance" />
                    </div>
                    <!-- <Depth moduleType="lever" showTab="1" /> -->
                  </div>
                  <div class="order-list">
                    <orderList moduleType="lever" />
                  </div>
                </div>
              </div>
            </div>
            <div class="right_center_box2">
              <div style="height: 55%">
                <Depth moduleType="lever" showTab="0" />
              </div>
              <div style="height: calc(45% - 8px); padding-top: 8px">
                <Depth moduleType="lever" showTab="1" />
              </div>
            </div>
          </div>

          <!--          <div class="lever-main-block">-->
          <!--            <div class="center-block">-->

          <!--              &lt;!&ndash; 改，2022.09.21，注释此内容 &ndash;&gt;-->
          <!--              &lt;!&ndash; <div class="lever-transaction a-6-bg">-->
          <!--                <trade-form />-->
          <!--              </div> &ndash;&gt;-->
          <!--            </div>-->
          <!--          </div>-->

          <div class="right_center_box">
            <!--<div class="right-block-new">-->
            <!--</div>-->
            <div class="right-market-active" :class="{ collapse: collapseStatus }">
              <div @click="collapseStatus = !collapseStatus" class="right-market-active_icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_304_31600)">
                    <path
                      d="M15.9312 17.8027L13.0742 14.9457L10.2172 17.8027L9.07422 16.6597L13.0742 12.6597L17.0742 16.6597L15.9312 17.8027Z"
                      fill="#5E6673"
                    />
                    <path
                      d="M15.9312 13.2305L13.0742 10.3735L10.2172 13.2305L9.07422 12.0875L13.0742 8.08747L17.0742 12.0875L15.9312 13.2305Z"
                      fill="#5E6673"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_304_31600">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="matrix(-1 0 0 -1 24.9316 24.9453)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="m-financeData" v-if="financeData">
                <div class="info">
                  {{ $t("lever.leverAccount") }}
                  ({{ symbolCurrent | getCoinShowName(symbolAll) }})
                  <svg class="sjicon icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_13"></use>
                  </svg>
                  <div class="infoBox">
                    <div class="item">
                      <div class="txt">
                        <!-- 可用 -->
                        {{ $t("lever.leverKy") }}
                      </div>
                      <div class="num">
                        {{ financeData.baseNormalBalance }}
                        {{ financeData.baseCoin | getCoinShowName(coinList) }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="txt">
                        <!-- 可借 -->
                        {{ $t("lever.leverKj") }}
                      </div>
                      <div class="num">
                        {{ financeData.baseCanBorrow }}
                        {{ financeData.baseCoin | getCoinShowName(coinList) }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="txt">
                        <!-- 已借 -->
                        {{ $t("lever.leverYj") }}
                      </div>
                      <div class="num">
                        {{ financeData.baseBorrowBalance }}
                        {{ financeData.baseCoin | getCoinShowName(coinList) }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="txt">
                        <!-- 可用 -->
                        {{ $t("lever.leverKy") }}
                      </div>
                      <div class="num">
                        {{ financeData.quoteNormalBalance }}
                        {{ financeData.quoteCoin | getCoinShowName(coinList) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <!-- 爆仓价 -->
                  {{ $t("lever.bcj") }}
                  <span class="b-1-cl">
                    {{ financeData.burstPrice }}
                    {{ financeData.quoteCoin | getCoinShowName(coinList) }}
                  </span>
                </div>
                <div class="info">
                  <!-- 风险率 -->
                  {{ $t("lever.fxl") }}
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_15"></use>
                  </svg>
                  <div class="riskRate">
                    {{ financeData.riskRate ? financeData.riskRate + "%" : "--" }}
                  </div>
                  <div class="m-line"></div>

                  <div class="infoBox">
                    <div class="item">
                      <div class="txt">
                        <!-- 总资产/借贷资产*100% -->
                        {{ $t("lever.leverText1") }}
                      </div>
                    </div>
                    <div class="item">
                      <div class="txt">
                        <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
                        {{ $t("lever.leverText2") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="order-list">-->
        <!--  <orderList moduleType="lever" />-->
        <!--</div>-->
        <i v-if="!baseInfo"></i>
        <!-- <bottomTool></bottomTool> -->
      </div>
    </template>
  </div>
</template>
<script>
import commonMixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/index/mixin";
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/lever/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/lever/index/index.styl";
// 下单交易
import tradeForm from "@/components/modules/trade/tradeForm/lever-tradeForm.vue";
import Market from "@/components/modules/trade/market/index.vue";
import Market_blue from "@/components/modules/trade/market/index_blue.vue";

// 当前币对信息
import currentSymbol from "@/components/modules/trade/currentSymbol/index.vue";
// 盘口 & 实时成交
import Depth from "@/components/modules/trade/depth/index.vue";
// tradingView/ Echarts
import tradingView from "@/components/modules/trade/tradingView/index.vue";
// 订单列表
import orderList from "@/components/modules/trade/orderList/orderList.vue";
import marketActive from "@/components/modules/trade/marketActive";
import noticeBoard from "@/components/modules/noticeBoard";
import bottomTool from "@/components/bottomTool";

export default {
  mixins: [commonMixin, mixin],
  components: {
    Market,
    Market_blue,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
    marketActive,
    noticeBoard,
    bottomTool,
  },
  created() {
    this.leverInit();
    this.init();
  },
  data() {
    return {
      collapseStatus: false,
      showNoticeBoard: true,
      financeData: null,
    };
  },
  mounted() {
    this.leverMounted();
  },
  methods: {
    getLeverFinance(e) {
      this.financeData = e;
    },
    // 改，2022.09.21，新增，点击任意部位，关闭Market
    onClickOutside() {
      this.$refs.currentSymbol.onClickOutside();
    },
  },
};
</script>
<style scoped>
.dark .m-leverPage {
  --trade-color-1: rgba(0, 0, 0, 1);
  --trade-color-2: rgba(180, 191, 214, 0.12);
  --trade-color-3: rgba(12, 14, 17, 1);
  --trade-color-4: rgba(205, 206, 207, 1);
  --trade-color-5: rgba(115, 121, 127, 1);
  --trade-color-6: rgba(21, 22, 23, 1);
  --trade-color-7: rgba(24, 25, 28, 1);
}
.light .m-leverPage {
  --trade-color-1: rgba(255, 255, 255, 1);
  --trade-color-2: rgba(238, 238, 238, 1);
  --trade-color-3: rgba(255, 255, 255, 1);
  --trade-color-4: rgba(104, 104, 104, 1);
  --trade-color-5: rgba(152, 152, 152, 1);
  --trade-color-6: rgba(238, 238, 238, 1);
  --trade-color-7: rgba(225, 225, 225, 1);
}
/* 2022.12.30 样式修改 */
.lever-main-block {
  height: auto;
}
.a-8-bg {
  /*background: var(--bgColor);*/
}
.right-block-new {
  border-bottom: 1px solid #252930;
  /*border-right: 2px solid rgba(255, 255, 255, 0.08);*/
}
</style>
<style scoped>
.left-block-new {
  position: relative;
  width: 345px;
  height: 100%;
  overflow: hidden;
  background: var(--color-BG);
  border-radius: 8px;
}
.main-block {
  padding: 0 !important;
}

.center-block,
.center-block2 {
  display: flex;
  height: 100%;
}
.center-block2 {
  width: 100%;
  padding: 8px;
}
.left_center_box {
  flex: auto;
  display: flex;
  flex-direction: column;
  width: calc(100% - 353px);
}
.bibi_trade_body {
  display: flex;
  flex: auto;
}
.bibi_trade_view {
  display: flex;
  flex-direction: column;
  width: calc(100% - 353px);
  margin-inline: 8px;
}
.chart-box {
  padding-bottom: 16px;
  border-radius: 0 0 8px 8px;
  background: var(--trade-color-1);
}
.right_center_box2 {
  height: 1440px;
}

.right_center_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.right-block-new {
  position: static;
  width: 320px;
}

.trade-content {
  /* max-width: 1582px; */
  margin: auto;
  border-left: solid 1px #252930;
  /*border-right: solid 1px #252930;*/
}

.trade-content .transaction {
  height: 100% !important;
  flex: 1;
}

.lever-center-box {
  display: flex;
  background: var(--color-BG-Light);
}

.right-block {
  width: 100% !important;
  flex: auto;
  height: 440px;
  margin-block: 8px;
  border-radius: 8px;
}

.order-list {
  /*margin-top: 5px;*/
}

.right-market-active {
  height: 146px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all ease-in-out 0.3s;
  background-color: #161a1e;
}

.collapse.right-market-active {
  height: 230px;
}
.right-market-active_icon {
  padding: 0 16px 0;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.m-financeData {
  box-sizing: border-box;
  padding: 0 12px;
  line-height: 1.4;
}
.m-financeData > .info {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #ffffff;
  position: relative;
  margin-top: 6px;
}
.m-financeData > .info:hover .infoBox {
  display: block;
}
.m-financeData > .info > .infoBox {
  box-sizing: border-box;
  padding: 10px 10px 10px 6px;
  position: absolute;
  top: 20px;
  left: 0;
  background: #2a2d35;
  z-index: 2;
  display: none;
}
.m-financeData > .info > .infoBox > .item {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #929292;
  line-height: 1.6;
}
.m-financeData > .info:first-child:hover {
  color: var(--mainColor);
  cursor: pointer;
}
.m-financeData > .info svg {
  margin-left: 4px;
  transition: all 0.3s ease-in;
}
.m-financeData > .info:first-child:hover svg {
  transform: rotate(180deg);
}
.m-financeData > .info > .riskRate {
  padding-left: 6px;
}
.m-line {
  width: 90px;
  height: 7px;
  margin-left: 14px;
  float: right;
  background: linear-gradient(90deg, #04bc8b, #eb4d5c);
}
</style>
