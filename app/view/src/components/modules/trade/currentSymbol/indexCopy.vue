<!-- 币币交易 24小时行情 -->
<template>
  <div class="currentSymbol a-3-bd m-currentSymbol">
    <!-- 改，2022.09.21，改样式 -->
    <div class="symbol-total b-2-cl" @click.stop="showMarket">
      <img class="coinImg" v-if="curCoinIcon" width="24" :src="curCoinIcon" />
      <span
        class="symbol-name"
        :class="{ 'b-4-cl': isShowMarket, 'b-1-cl': !isShowMarket }"
        @mouseover="showCurrencyModal"
        @mouseleave="hideCurrencyModal"
        style="cursor: pointer"
      >
        {{ symbolCurrent | getCoinShowName(symbolAll) }}

        <!-- 改，2022.09.21，新增 -->
        <span
          class="triangle-down b-2-bd"
          :class="{ 'b-4-bd': isShowMarket, 'b-2-bd': !isShowMarket }"
        >
        </span>

        <div class="coin-label" v-if="currentCoinLabel && coinTagOpen">
          <span class="coin-label a-12-cl">{{ currentCoinLabel }}</span>
          <span class="coin-bg a-12-bg"></span>
        </div>

        <transition name="fade">
          <!-- 改，2022.11.18，新增 style="left: 175%; -->
          <div
            v-if="symbol_profile"
            style="left: 255px; border-radius: 10px"
            class="currency-notes-modal"
            v-show="currencyModalState"
          >
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
        <span
          v-show="symbolsData.close.data !== '--'"
          class="symbol-number"
          :class="symbolsData.close.class"
          >{{ symbolsData.close.data }}</span
        >
        <span v-show="symbolsData.close.price !== '--'" class="symbol-property b-2-cl"
          >≈ {{ symbolsData.close.price }}</span
        >
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
      <div class="info-item" :style="!marketShrink ? 'margin-left: 10px' : ''">
        <span class="tit b-2-cl">
          <!-- 涨跌幅  -->
          {{ $t("trade.applies") }}
        </span>
        <span class="vla" :class="symbolsData.rose.class">{{ symbolsData.rose.data }}</span>
      </div>
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
          {{ $t("trade.H_volume") }}
        </span>
        <span class="vla b-1-cl">
          {{ symbolsData.vol }}
          {{ symbolsData.symbol.symbol | getCoinShowName(coinList) }}
        </span>
      </div>
      <!--  <div class="info-item">
          <span class="tit b-2-cl">24小时成交额</span>
          <span class="vla b-1-cl">
            {{symbolsData.amount}}
            {{symbolsData.symbol.unit}}
          </span>
      </div>-->
      <!-- 改，2022.12.05，新增按钮操作 -->
      <div class="m-btn" v-if="calTradeType == 'showMore'">
        <div class="item s-red" @click="del">Delete</div>
        <div class="item s-blue" @click="linkTo">Trade Now</div>
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
    };
  },
  mounted() {
    this.init();
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
    top: 36px!important;
  }
  .currentSymbol {
    height: 50px!important;
  }
  .symbol-total {
    height: 38px!important;
    line-height: 38px!important;
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
  padding-right: 10px;
}
.currentSymbol .symbol-total {
  white-space: nowrap;
}
.currentSymbol {
  height: 50px;
  display: flex;
  align-items: center;
}
.m-currentSymbol {
  background: #161a1e;
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
</style>
