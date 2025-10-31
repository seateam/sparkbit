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
        :class="{ 'trade-shrinks': false }"
        :style="calTradeType == 'showMore' ? 'padding: 0px;min-width: 0px;' : ''"
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
          <div class="main-block" :style="calTradeType == 'showMore' ? 'width: 100%' : ''">
            <div
              class="center-block"
              :style="calTradeType == 'showMore' ? 'min-width: 850px;height: 550px' : ''"
            >
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
              <!-- 改，2022.12.05，多图状态不展示 -->
              <div
                class="left-block-new"
                @click="onClickOutside()"
                v-if="calTradeType != 'showMore'"
              >
                <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag" show-tab="0" />
              </div>

              <div class="chart-box a-5-bg" @click="onClickOutside()">
                <trading-view />
              </div>
              <!-- 改，2022.12.05，多图状态不展示 -->
              <div
                class="right-block-new"
                @click="onClickOutside()"
                v-if="calTradeType != 'showMore'"
              >
                <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag" show-tab="1" />
              </div>
            </div>
          </div>

          <!-- 改，2022.09.21，新增 -->
          <!-- 改，2022.12.05，多图状态不展示 -->
          <div class="right-block" @click="onClickOutside()" v-if="calTradeType != 'showMore'">
            <!--
              改，2022.09.21，注释此内容
              :style="
                showGridFlag && lan !== 'zh_CN'
                  ? 'height: 109px'
                  : showGridFlag && lan === 'zh_CN'
                  ? 'height: 384px'
                  : ''
              " -->
            <div class="transaction">
              <trade-form />
            </div>
          </div>
          <!-- 改，2022.12.05，多图状态不展示 -->
          <div
            v-if="isLogin && calTradeType != 'showMore'"
            class="order-list"
            @click="onClickOutside()"
          >
            <orderList />
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
import { mapGetters } from "vuex";

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
  },
  created() {
    this.createdInit();
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
    // 改，2022.09.21，新增，点击任意部位，关闭Market
    onClickOutside() {
      this.$refs.currentSymbol.onClickOutside();
    },
  },
};
</script>

<style scoped>
.trade-content {
  width: 100%;
  box-sizing: border-box;
}
.trade-content .main-block {
  height: 815px;
}
.trade-content .right-block-new {
  background: var(--bgColor);
}
.tradeModel-exchange {
  --borderRadius: 10px;
}
.right-block-new {
  border-radius: var(--borderRadius);
  height: 815px;
}
.right-block {
  border-radius: var(--borderRadius) 0 0 var(--borderRadius);
}
.center-block {
  border-radius: var(--borderRadius);
  overflow: hidden;
}

.left-block-new {
  position: relative;
  width: 645px;
  top: 5px;
  overflow: hidden;
}
</style>
