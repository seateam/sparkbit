<template>
  <div class="tradeModel-exchange">
    <!-- 国际版 -->
    <template v-if="templateLayoutType && templateLayoutType === '2'">
      <div class="Int-trade">
        <div
          v-on:dblclick="ondblclick"
          @click="onclickfun"
          class="trade-content a-8-bg trade-shrinks"
        >
          <div :class="leftClasses">
            <div ref="leftBox" class="left-block">
              <!-- 24小时行情 -->
              <Market @shrinkBlock="shrinkBlock" @serachShrinkBlock="serachShrinkBlock" />
            </div>
            <div class="main-block">
              <div class="center-block">
                <!-- 24小时 当前行情 -->
                <current-symbol
                  :etfUrl="etfUrl"
                  :etfPrice="etfPrice"
                  :marketShrink="marketShrink"
                />
                <div class="chart-box a-5-bg">
                  <trading-view />
                </div>
              </div>
              <div class="order-list">
                <orderList />
              </div>
            </div>
            <!-- 改，2022.12.05，多图状态不展示 -->
            <div class="right-block" v-if="calTradeType != 'showMore'">
              <International-depth :etfPrice="etfPrice" />
              <div class="transaction">
                <International-tradeForm />
              </div>
            </div>
          </div>
          <i v-if="!baseInfo"></i>
        </div>
      </div>
    </template>
    <!-- 中国版 -->
    <template v-else>
      <!-- 改，2022.09.22，新增onClickOutside()，注释onclickfun() -->
      <!-- onclickfun()用于控制遮罩 -->
      <!-- 改，2022.12.05，多图状态修改样式 -->
      <!--:class="{ 'trade-shrinks': shrink }"-->
      <div
        v-on:dblclick="ondblclick"
        class="trade-content a-8-bg"
        :class="{ 'trade-shrinks': shrink }"
      >
        <div :class="leftClasses">
          <!-- 改，2022.09.21，注释 -->
          <!-- 24小时行情 -->
          <!-- <div ref="leftBox" class="left-block">
            <Market
              @shrinkBlock="shrinkBlock"
              @serachShrinkBlock="serachShrinkBlock"
              :showGridFlag="showGridFlag"
              moduleType="ex"
            />
          </div> -->
          <!-- 改，2022.10.19，注释 -->
          <!-- :style="showGridFlag ? 'height: 830px' : ''" -->
          <!-- 改，2022.12.05，多图状态修改样式 -->
          <div class="main-block">
            <div class="center-block">
              <div class="left_center_box">
                <div class="bibi_trade_body">
                  <div class="left-block-new" @click="onClickOutside()">
                    <Market_blue></Market_blue>
                    <!--<Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag" show-tab="0" />-->
                  </div>
                  <div class="bibi_trade_view">
                    <!-- 24小时 当前行情 -->
                    <current-symbol
                      :etfUrl="etfUrl"
                      :etfPrice="etfPrice"
                      :marketShrink="marketShrink"
                      @shrinkBlock="shrinkBlock"
                      @serachShrinkBlock="serachShrinkBlock"
                      :showGridFlag="showGridFlag"
                      ref="currentSymbol"
                    >
                    </current-symbol>
                    <div class="chart-box" @click="onClickOutside()">
                      <trading-view />
                    </div>
                    <div class="right-block" style="display: flex" @click="onClickOutside()">
                      <div class="transaction">
                        <trade-form :showStopOrder="showStopOrder" />
                      </div>
                    </div>
                    <orderList :showStopOrder="showStopOrder" />
                  </div>
                </div>
              </div>
              <div class="right_center_box">
                <div style="height: 55%">
                  <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag" show-tab="0" />
                </div>
                <div style="height: 45%; padding-top: 8px; z-index: 2">
                  <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag" show-tab="1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <i v-if="!baseInfo"></i>
      </div>
    </template>
    <c-alert
      :showFlag="tradeAlertState"
      @close="hideTradeAlert"
      :imgMap="imgMap"
      @confirm="hideTradeAlert"
    >
      <!-- 交易限制提醒 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{ $t("tradeLimt.tradeLimit_text_instructions") }}
      </div>
      <div class="trade-limit-text b-2-cl">{{ tradeLimitAlertText }}</div>
    </c-alert>
    <!-- 免责声明 -->
    <c-noticeDialog
      :showFlag="etfDialog"
      :titleText="$t('etfAdd.dialogTitle')"
      :confirmText="$t('etfAdd.confirmText')"
      paddingTop="0px"
      @confirm="etfDialogConfirm"
    >
      <div class="trade-noticeDialog">
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText1") }}
        </div>
        <div class="trade-noticeDialog-even">
          <!-- {{$t('etfAdd.dText2')}} {{ etfName }} -->
          {{ $t("etfAdd.dText3") }}
        </div>
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText4") }}
          <a class="u-8-cl" :href="etfUrl" target="_blank">{{ $t("etfAdd.dText5") }}</a>
        </div>
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText6") }}
        </div>
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText7") }}
        </div>
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText8") }}
        </div>
        <div class="trade-noticeDialog-even">
          {{ $t("etfAdd.dText9") }}
        </div>
      </div>
    </c-noticeDialog>
    <!--<bottomTool v-if="calTradeType != 'showMore'"></bottomTool>-->
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/index/mixin";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/trade/index/index.styl";
// import Market from "@/components/modules/trade/market/index.vue";
// 当前币对信息
import currentSymbol from "@/components/modules/trade/currentSymbol/index.vue";
// 盘口 & 实时成交
import Depth from "@/components/modules/trade/depth/index.vue";
import InternationalDepth from "@/components/modules/trade/depth/internationalDepth.vue";
import InternationalTradeForm from "@/components/modules/trade/tradeForm/internationalTradeForm.vue";
// tradingView/ Echarts
import tradingView from "@/components/modules/trade/tradingView/index.vue";
// 下单交易
import tradeForm from "@/components/modules/trade/tradeForm/ex-tradeForm.vue";
// 订单列表
import orderList from "@/components/modules/trade/orderList/orderList.vue";
import Market_blue from "@/components/modules/trade/market/index_blue.vue";
// 市场异动
import marketActive from "@/components/modules/trade/marketActive";
import { mapGetters } from "vuex";
import noticeBoard from "@/components/modules/noticeBoard";
import bottomTool from "@/components/bottomTool";

export default {
  mixins: [mixin],
  components: {
    // Market,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
    InternationalDepth,
    InternationalTradeForm,
    Market_blue,
    marketActive,
    noticeBoard,
    bottomTool,
  },
  created() {
    this.createdInit();
  },
  data() {
    return {
      collapseStatus: false,
      showNoticeBoard: true,
      showStopOrder: true,
    };
  },
  computed: {
    // 改，2022.12.05 新增是否展示多图计算属性
    ...mapGetters(["calTradeType"]),
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
  methods: {
    // 判断是否显示条件单 2023.03.16
    checkStopOrder() {
      this.axios({
        url: `configSymbol/getisStopOrder/${this.symbolCurrent.replace("/", "").toLowerCase()}`,
        method: "get",
      }).then((res) => {
        if (res.data == 1) {
          this.showStopOrder = !!res.data;
        } else {
          this.showStopOrder = false;
        }
      });
    },
    // 改，2022.09.21，新增，点击任意部位，关闭Market
    onClickOutside() {
      this.$refs.currentSymbol.onClickOutside();
    },
  },
};
</script>

<style scoped>
.dark .tradeModel-exchange {
  --trade-color-1: rgba(0, 0, 0, 1);
  --trade-color-2: rgba(26, 26, 26, 1);
  --trade-color-3: rgba(12, 14, 17, 1);
  --trade-color-4: rgba(205, 206, 207, 1);
  --trade-color-5: rgba(115, 121, 127, 1);
  --trade-color-6: rgba(21, 22, 23, 1);
  --trade-color-7: rgba(24, 25, 28, 1);
}
.light .tradeModel-exchange {
  --trade-color-1: rgba(255, 255, 255, 1);
  --trade-color-2: rgba(247, 247, 247, 1);
  --trade-color-3: rgba(255, 255, 255, 1);
  --trade-color-4: rgba(104, 104, 104, 1);
  --trade-color-5: rgba(152, 152, 152, 1);
  --trade-color-6: rgba(238, 238, 238, 1);
  --trade-color-7: rgba(225, 225, 225, 1);
}
.trade-content {
  width: 100%;
  box-sizing: border-box;
}
.trade-content .main-block {
  height: 100%;
  background-color: var(--color-4);
}
.tradeModel-exchange {
  --borderRadius: 10px;
  max-width: 100%;
}
.chart-box {
  padding-bottom: 16px;
  border-radius: 0 0 8px 8px;
  background: var(--trade-color-1);
}
.right-block-new {
  border-radius: var(--borderRadius);
}
.right-block {
  margin-block: 8px;
  border-radius: 8px;
  position: relative !important;
  width: 100% !important;
  right: 0 !important;
  flex: auto;
  height: 440px;
}
.center-block {
  border-radius: var(--borderRadius);
  overflow: hidden;
}

.left-block-new {
  position: relative;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  width: 345px;
  min-width: 345px;
  background: var(--color-28);
  border-radius: 8px;
}

.main-block {
  padding: 0 !important;
}

.center-block {
  display: flex;
  height: 100%;
  padding: 8px;
  background-color: var(--color-BG-Light);
}
.left_center_box {
  flex: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: calc(100% - 353px);
}

.bibi_trade_body {
  display: flex;
  flex: auto;
  box-sizing: border-box;
  border-left: none;
}
.bibi_trade_view {
  display: flex;
  flex-direction: column;
  width: calc(100% - 353px);
  margin-left: 8px;
}

.right_center_box {
  height: 1420px;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.right-block-new {
  position: static;
  width: 320px;
  border-radius: 0 !important;
}

.trade-content .transaction {
  height: 100%;
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
.trade-content .transaction {
  flex: 1;
}
</style>
<style lang="stylus" scoped>
.light {
  .tradeModel-exchange {
    //border-color: transparent;
  }
  .bibi_trade_body{
    border-color: transparent;
  }
}
/deep/.b-1-cl {
  color: var(--color-1);
}
</style>
