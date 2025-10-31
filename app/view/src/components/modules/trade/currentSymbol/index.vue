<!-- 币币交易 24小时行情 -->
<template>
  <div class="currentSymbol m-currentSymbol">
    <!-- 改，2022.09.21，改样式 -->
    <div class="wrap">
      <!--   @click.stop="showMarket"-->
      <div class="symbol-total b-2-cl">
        <img class="coinImg" v-if="curCoinIcon" width="24" :src="curCoinIcon" />
        <span class="symbol-name" style="cursor: pointer">
          <span>{{ symbolCurrent | getCoinShowName(symbolAll) }}</span>
          <span @mouseover="showCurrencyModal" @mouseleave="hideCurrencyModal">
            <span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_304_31096)">
                  <path
                    d="M11.005 4.44799L4.93164 5.28799L11.005 3.36133V4.44799ZM12.6716 5.28799V12.7547H11.8383V6.24799L4.93164 5.28799H12.6716Z"
                    fill="#848E9C"
                  />
                  <path
                    d="M4.93164 5.28906V12.7291L4.99831 12.7357L5.04497 12.7424L5.15831 12.7624H4.97831L11.005 14.6691V7.20906L4.93164 5.28906ZM7.19831 7.4224L8.44497 7.8224V9.04906L7.19831 8.65573V7.4224ZM8.44497 12.5291L7.19831 12.1357L7.21831 9.56906L8.47164 9.9624L8.44497 12.5291Z"
                    fill="#848E9C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_304_31096">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.931641 0.695312)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <a>{{ calCoinName }} Info</a>
          </span>

          <!-- 改，2022.09.21，新增 -->
          <!--        <span-->
          <!--          class="triangle-down b-2-bd"-->
          <!--          :class="{ 'b-4-bd': isShowMarket, 'b-2-bd': !isShowMarket }"-->
          <!--        >-->
          <!--        </span>-->

          <div class="coin-label" v-if="currentCoinLabel && coinTagOpen">
            <span class="coin-label a-12-cl">{{ currentCoinLabel }}</span>
            <span class="coin-bg a-12-bg"></span>
          </div>

          <transition name="fade">
            <!-- 改，2022.11.18，新增 style="left: 175%;             v-if="symbol_profile || true"-->
            <div style="left: -17px; border-radius: 10px" class="currency-notes-modal">
              <currencyNotes :coinName="symbolCurrentCoinName"> </currencyNotes>
            </div>
          </transition>
        </span>
        <div class="eft-box" v-if="getShowEtf(symbolCurrent)">
          <span class="eft-class u-8-bd u-8-cl"> ETF </span>
          <div class="eft-box-icon-box">
            <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            <div class="page-market a-4-bg b-1-cl">
              <div class="page-market-even">{{ $t("etfAdd.sbyText1") }}</div>
              <div class="page-market-even">{{ $t("etfAdd.sbyText2") }}</div>
              <div class="page-market-even">{{ $t("etfAdd.sbyText3") }}</div>
              <div class="page-market-even">{{ $t("etfAdd.sbyText4") }}</div>
              <div class="page-market-even">{{ $t("etfAdd.sbyText5") }}</div>
              <div class="page-market-click">
                <a :href="etfUrl" class="u-8-cl" target="_block">{{ $t("etfAdd.sbyText6") }}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="price-box" :class="getShowEtf(symbolCurrent) ? 'price-box-eft ' : ''">
          <div
            v-show="symbolsData.close.data !== '--'"
            class="symbol-number"
            :class="[symbolsData.close.class, symbolsData.rose.class]"
          >
            {{ symbolsData.close.data }}
          </div>
          <div
            v-show="symbolsData.close.price !== '--'"
            class="symbol-property b-2-cl"
            :class="[symbolsData.close.class, symbolsData.rose.class]"
            style="line-height: 18px"
          >
            {{ symbolsData.close.price }}
          </div>
        </div>
      </div>

      <div class="symbol-info" @click="onClickOutside()">
        <div class="info-item" v-if="getShowEtf(symbolCurrent)" style="margin-left: 0">
          <!-- 净值 -->
          <span class="tit b-2-cl jzTit">
            <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            {{ $t("etfAdd.jz") }}
          </span>
          <span class="vla b-1-cl">{{ etfPrice }}</span>
          <div class="page-market-jz a-4-bg b-1-cl">
            <div>{{ $t("etfAdd.jzText1") }}</div>
            <div>{{ $t("etfAdd.jzText2") }}</div>
          </div>
        </div>
        <!--<div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">-->
        <!--  <span class="tit b-2-cl">-->
        <!--    &lt;!&ndash; 涨跌幅  &ndash;&gt;-->
        <!--    {{ $t("trade.applies") }}-->
        <!--  </span>-->
        <!--  <span class="vla" :class="symbolsData.rose.class">{{ symbolsData.rose.data }}</span>-->
        <!--</div>-->
        <!-- <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            {{ $t("futures.market.text3") }} %
          </span>
          <span class="vla" :class="symbolsData.rose.class">{{ symbolsData.rose.data }}</span>
        </div> -->
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 最高价 -->
            {{ $t("trade.height") }}
          </span>
          <span class="vla b-1-cl">{{ symbolsData.high }}</span>
        </div>
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 最低价 -->
            {{ $t("trade.low") }}
          </span>
          <span class="vla b-1-cl">{{ symbolsData.low }}</span>
        </div>
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 24小时成交量 -->
            {{ $t("trade.H_volume") }}({{ symbolsData.symbol.symbol | getCoinShowName(coinList) }})
          </span>
          <span class="vla b-1-cl">
            {{ symbolsData.vol }}
          </span>
        </div>
        <div class="info-item">
          <span class="tit b-2-cl">{{ $t("trade.H_volume") }}({{ symbolsData.symbol.unit }})</span>
          <span class="vla b-1-cl">
            {{ symbolsData.amount }}
          </span>
        </div>
        <!-- 改，2022.12.05，新增按钮操作 -->
        <div class="m-btn" v-if="calTradeType == 'showMore'">
          <div class="item s-red" @click="del">Delete</div>
          <div class="item s-blue" @click="linkTo">Trade Now</div>
        </div>
      </div>
    </div>
    <div class="currentSymbol_right" v-if="false && isLogin && moduleType === 'lever'">
      <div class="m-dataItem">
        <div class="tit b-2-cl">
          <!-- 爆仓价 -->
          {{ $t("lever.bcj") }}
        </div>
        <div class="vla b-1-cl">
          {{ financeData.burstPrice }} {{ financeData.quoteCoin | getCoinShowName(coinList) }}
        </div>
      </div>
      <div class="m-dataItem">
        <div class="tit b-2-cl">
          <!-- 风险率 -->
          {{ $t("lever.fxl") }}
        </div>
        <div class="vla b-1-cl">{{ financeData.riskRate }}%</div>
      </div>
    </div>

    <!-- 改，2022.09.21，新增 -->
    <!-- 24小时行情 -->
    <div style="position: absolute; z-index: 10; top: 40px" v-show="isShowMarket">
      <Market :moduleType="moduleType" @onClickOutside="onClickOutside" />
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/index.styl";
import Market from "@/components/modules/trade/market/index.vue";
import { mapGetters } from "vuex";
import currencyNotes from "./currencyNotes.vue";

export default {
  mixins: [mixin],
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
    moduleType: {
      type: String,
      default: "ex",
    },
  },
  components: {
    currencyNotes,
    Market,
  },
  data() {
    return {
      // 是否显示市场
      isShowMarket: false,
      financeData: {},
    };
  },
  mounted() {
    this.init();
    this.$bus.$on("financeData", (val) => {
      this.financeData = val;
    });
  },
  // 改，2022.12.05 新增 calTradeType linkurl lan 计算属性
  computed: {
    ...mapGetters(["calTradeType"]),
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
  },
  // 改，2022.09.21，新增
  methods: {
    // 改，2022.12.05 新增 与父页面通信方法
    // 跳转
    linkTo() {
      window.parent.postMessage({
        type: "linkTo",
        data: this.symbolCurrent.replace("/", "_"),
      });
    },
    // 删除
    del() {
      // 改，2022.12.06 删除功能，触发父页面的删除事件
      window.parent.postMessage({
        type: "del",
        data: null,
      });
    },
    // 显示 市场
    showMarket() {
      this.isShowMarket = !this.isShowMarket;
    },
    // 关闭市场
    onClickOutside() {
      this.isShowMarket = false;
    },
  },
};
</script>

<style lang="stylus">
  .page-content-chain .tradeModel-exchange, .page-content-chain #tradeModel-lever{
  .currency-notes-modal {
    top: 65px!important;
    left: -17px;
  }
  .currentSymbol {
    //height: 50px!important;
  }
  .symbol-total {
    //height: 38px!important;
    //line-height: 38px!important;
  }
  .coin-label {
    margin-top: 3px!important;
  }
  .symbol-info {
    padding: 0 16px 0 0!important;
    .vla {
      margin-top: 5px!important;
    }
  }
  .price-box {
    line-height: 14px;
    font-weight: 600;
    margin-left: 10px;
    vertical-align: middle;
  }
  .symbol-number {
    // font-size: 12px!important;
    display: block;
    margin-left: 0!important;
  }
}

// 改，2022.09.21，新增
.symbol-name:hover {
    color: var(--mainColor) !important;

    .triangle-down {
      border-color: var(--mainColor);
    }
  }
</style>

<style scoped>
/** 改，2022.12.05 新增样式 **/
.m-btn {
  display: flex;
  align-items: center;
  padding-left: 18px;
}
.m-btn > .item {
  padding: 7px 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #ffffff;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
}
.m-btn > .item.s-red {
  background: #ff2500;
  margin-right: 8px;
}
.m-btn > .item.s-blue {
  background: #226afd;
}
.currentSymbol .symbol-info {
  flex: 1;
  padding-right: 10px;
}
.currentSymbol .symbol-total {
  white-space: nowrap;
}
.currentSymbol {
  height: 76px;
  display: flex;
  align-items: center;
  border-color: var(--color-Input-border);
}
.m-currentSymbol {
  background: var(--color-28);
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
}
.currentSymbol .symbol-total {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.currentSymbol .operations-btn {
  position: relative;
}
.currentSymbol .operations-btn::after {
  content: "";
  width: 2px;
  height: 30px;
  color: #ffffff;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.currentSymbol .symbol-total > .coinImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
.currentSymbol .activePrice {
  line-height: 22px;
}
.currentSymbol .symbol-info .info-item .percentage {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #eb3f25;
  text-align: left;
}
.currentSymbol .symbol-info .info-item {
  text-align: left;
}
.currentSymbol .symbol-info .info-item .via {
  font-size: 14px;
  margin-top: 3px !important;
}

.currentSymbol .symbol-total .symbol-name.b-4-cl {
  color: var(--mainColor);
}
.triangle-down.b-4-bd {
  border-color: var(--mainColor);
}
span.tit {
  color: #848e9c;
}

span.vla {
  /*color: #EAECEF;*/
}
.currentSymbol_right {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #848e9c;
  display: flex;
}
.currentSymbol .symbol-total .symbol-name {
  height: 100%;
  margin-right: 28px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 13px;
}
.symbol-name > span:nth-child(1) {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  color: var(--color-1);
  font-size: 24px;
  font-weight: 700;
}
.symbol-name > span:nth-child(2) {
  display: inline-block;
  height: 17px;
  line-height: 17px;
}
.symbol-name > span:nth-child(2) > a {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #848e9c;
}
.currentSymbol .symbol-info .info-item .tit {
  color: var(--color-text-secondary);
}
.currentSymbol .symbol-info .info-item .b-1-cl {
  color: var(--color-1);
}
.currentSymbol .symbol-total .symbol-name .currency-notes-modal {
  display: none;
}
.currentSymbol .symbol-total .symbol-name:hover .currency-notes-modal {
  display: block;
}
.currentSymbol .symbol-total .symbol-name .currency-notes-modal:hover {
  display: block;
}
.m-currentSymbol > .wrap {
  width: 100%;
  display: flex;
  align-items: center;
}
.currentSymbol .symbol-total {
  height: 76px;
}
.page-content-chain .tradeModel-exchange .symbol-number {
  font-size: 20px;
  line-height: 24px;
}

.page-content-chain .tradeModel-exchange .symbol-number {
}
.page-content-chain .tradeModel-exchange .symbol-number .vla {
  font-size: 14px;
  padding-left: 1px;
}

.m-dataItem {
  color: var(---color-text-secondary);
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  margin-right: 20px;
}
.m-dataItem > .vla {
  color: var(--color-1);
  margin-top: 5px;
}
</style>
