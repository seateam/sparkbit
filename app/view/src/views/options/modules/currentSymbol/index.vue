<!-- 币币交易 24小时行情 -->
<template>
  <div class="currentSymbol a-3-bd m-currentSymbol">
    <!-- 改，2022.09.21，改样式 -->
    <div class="wrap">
      <!--   @click.stop="showMarket"-->
      <div class="symbol-total b-2-cl">
        <!--      <img class="coinImg" v-if="curCoinIcon" width="24" :src="curCoinIcon">-->
        <span class="symbol-name" style="cursor: pointer">
          <span>{{ symbolCurrent | getCoinShowName(symbolAll) }}</span>
        </span>
        <!-- 改，2022.09.21，新增 -->
        <!--        <span-->
        <!--          class="triangle-down b-2-bd"-->
        <!--          :class="{ 'b-4-bd': isShowMarket, 'b-2-bd': !isShowMarket }"-->
        <!--        >-->
        <!--        </span>-->

        <!--        <div class="coin-label" v-if="currentCoinLabel && coinTagOpen">-->
        <!--          <span class="coin-label a-12-cl">{{ currentCoinLabel }}</span>-->
        <!--          <span class="coin-bg a-12-bg"></span>-->
        <!--        </div>-->
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

        <div
          style="margin: 0 20px 0 30px"
          class="price-box"
          :class="getShowEtf(symbolCurrent) ? 'price-box-eft ' : ''"
        >
          <div
            v-show="symbolsData.close.data !== '--'"
            class="symbol-number"
            :class="[symbolsData.close.class, symbolsData.rose.class]"
          >
            {{ symbolsData.close.data }}
            <span class="vla" :class="symbolsData.rose.class">{{ symbolsData.rose.data }}</span>
          </div>
          <div
            v-show="symbolsData.close.price !== '--'"
            class="symbol-property b-2-cl"
            style="line-height: 18px"
          >
            ≈ {{ symbolsData.close.price }}
          </div>
        </div>
      </div>

      <div class="symbol-info" @click="onClickOutside()">
        <!--<div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">-->
        <!--  <span class="tit b-2-cl">-->
        <!--    &lt;!&ndash; 涨跌幅  &ndash;&gt;-->
        <!--    {{ $t("trade.applies") }}-->
        <!--  </span>-->
        <!--  <span class="vla" :class="symbolsData.rose.class">{{ symbolsData.rose.data }}</span>-->
        <!--</div>-->
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 最高价 -->
            24H High
          </span>
          <span class="vla b-1-cl">{{ symbolsData.high }}</span>
        </div>
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 最低价 -->
            24H Low
          </span>
          <span class="vla b-1-cl">{{ symbolsData.low }}</span>
        </div>
        <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
          <span class="tit b-2-cl">
            <!-- 24小时成交量 -->
            24H Vol
          </span>
          <span class="vla b-1-cl">
            {{ symbolsData.vol }}
          </span>
        </div>
      </div>

      <div class="m-btnG">
        <div class="btn" @click="navTo('/burningPool')">ORX Burning Pool</div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/index.styl";
import { mapGetters } from "vuex";

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
  data() {
    return {
      // 是否显示市场
      isShowMarket: false,
      lastPrice: {},
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    documentTitle(val) {
      document.title = `${this.companyName} Exchange-Option`;
    },
  },
  // 改，2022.12.05 新增 calTradeType linkurl lan 计算属性
  computed: {
    ...mapGetters(["calTradeType"]),
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
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
  },
  // 改，2022.09.21，新增
  methods: {
    navTo(path) {
      this.$router.push(path);
    },
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
    padding: 5px 16px 0 0!important;
    .vla {
      margin-top: 5px!important;
    }
  }
  .price-box {
    line-height: 14px;
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
  color: var(--color-1);
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
  padding-right: 10px;
}
.currentSymbol .symbol-total {
  white-space: nowrap;
}
.currentSymbol {
  height: 68px;
  display: flex;
  align-items: center;
}
.m-currentSymbol {
  background: var(--trade-color-1);
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
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
  color: var(--color-1);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.currentSymbol .symbol-total > .coinImg {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
}
.currentSymbol .activePrice {
  line-height: 22px;
}
.currentSymbol .symbol-info .info-item .percentage {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #eb3f25;
  text-align: left;
}
.currentSymbol .symbol-info .info-item {
  text-align: left;
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
.currentSymbol_right > div {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}
.currentSymbol .symbol-total .symbol-name {
  height: 100%;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 13px;
}
.symbol-name > span:nth-child(1) {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  color: var(--color-1);
  font-size: 15px;
  font-weight: 700;
}
.symbol-name > span:nth-child(2) {
  display: inline-block;
  height: 17px;
  line-height: 17px;
}
.symbol-name > span:nth-child(2) > a {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #848e9c;
}
.currentSymbol .symbol-info .info-item .tit {
  color: var(--trade-color-5);
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
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}
.currentSymbol .symbol-total {
  height: 69px;
  line-height: 20px;
}
.page-content-chain .tradeModel-exchange .symbol-number {
  font-size: 13px;
}
.page-content-chain .tradeModel-exchange .symbol-number .vla {
  font-size: 11px;
  padding-left: 4px;
}
.currentSymbol .symbol-total .symbol-number {
  color: var(--color-1);
  display: flex;
  align-items: center;
}
.currentSymbol .symbol-total .symbol-number .vla {
  padding-left: 4px;
  font-size: 14px;
}
.currentSymbol .price-box {
  min-width: 120px;
}
.m-btnG {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
.m-btnG > .btn {
  cursor: pointer;
  user-select: none;
  background: #1058de;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 16px;
  color: #ffffff;
}
</style>
