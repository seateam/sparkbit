<!--2022.12.30 修改样式-->
<template>
  <!-- 改，2022.12.05 新增条件判断，用于适应多图展示的情况 -->
  <div
    class="ex-canter-echart-box"
    :style="{ height: calTradeType == 'showMore' ? '510px' : TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container"
  >
    <div class="top-menu b-3-cl" :class="{ hide: chartType === 2, lefts: chartType === 3 }">
      <div class="top-menu-bar" ref="topMenuBar">
        <i
          class="slide-btn icon-left"
          :class="{ 'slide-btn-cur': parseFloat(slidePosition) < 0 }"
          @click="slideMarket('left')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_10_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_10"></use>
          </svg>
        </i>
        <div class="top-menu-box" :style="{ left: slidePosition }" ref="topMenuBox">
          <span
            @click="timeClike('Line')"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === 'Line' }"
            class="time-line a-4-cl-h"
          >
            <i class="hoverHide">Line</i>
            <i class="b-1-cl hoverShow">Line</i>
          </span>
          <span
            v-for="item in baseTimeArry"
            @click="timeClike(item)"
            :key="item"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === item }"
            class="time-line a-4-cl-h"
          >
            <i class="hoverHide">{{ item }}</i>
            <i class="b-1-cl hoverShow">{{ item }}</i>
          </span>
          <span class="time-line full-btn a-8-bd a-4-cl-h" @click="fullTv">
            <template v-if="!isfullTv">
              <i class="hoverHide">{{ $t("trade.full") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.full") }}</i>
            </template>
            <template v-else>
              <i class="hoverHide">{{ $t("trade.outFull") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.outFull") }}</i>
            </template>
          </span>
        </div>
        <i
          class="slide-btn icon-right"
          :class="{
            'slide-btn-cur': maxPosition > 0 && parseFloat(slidePosition) > -maxPosition,
          }"
          @click="slideMarket('right')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_11_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_11"></use>
          </svg>
        </i>
      </div>
    </div>
    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>
    <p class="a-8-bg inline"></p>
    <div class="top-tab">
      <!-- <span class="switch-chart-type"
        @mouseenter="enter(3)"
        @mouseleave="leave()"
        @click="switchChartType(3)"
        :class="{'u-8-cl':chartTypeShow(3) }">
        {{$t('trade.dataType1')}}
      </span> -->
      <span
        style="padding-right: 6px"
        @click="switchChartType(1)"
        @mouseenter="enter(1)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{ 'u-8-cl': chartTypeShow(1) }"
      >
        <!-- {{$t('trade.dataType2')}} -->
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_2501)">
            <path d="M0.81508 12.4446V0.700195H0.0388184V13.1446H14.0115V12.4446H0.81508Z" :fill="chartTypeShow(1) ? '#316AD5' : '#66666A'" :stroke="chartTypeShow(1) ? '#316AD5' : '#66666A'" stroke-width="0.6"/>
            <path d="M4.375 6.63547H4.27734V6.73313V7.89793H3.59766V6.73313V6.63547H3.5H2.72266V3.46422H3.5H3.59766V3.36656V2.62258H4.27734V3.36656V3.46422H4.375H5.15234V6.63547H4.375ZM8.3125 6.63547H8.21484V6.73313V10.4229H7.53516V6.73313V6.63547H7.4375H6.66016V1.78094H7.4375H7.53516V1.68328V0.0976562H8.21484V1.68328V1.78094H8.3125H9.08984V6.63547H8.3125ZM12.25 7.05629H12.1523V7.15395V9.16039H11.4727V7.15395V7.05629H11.375H10.5977V4.30586H11.375H11.4727V4.2082V2.20176H12.1523V4.2082V4.30586H12.25H13.0273V7.05629H12.25Z" :fill="chartTypeShow(1) ? '#316AD5' : '#66666A'" :stroke="chartTypeShow(1) ? '#316AD5' : '#66666A'" stroke-width="0.195312"/>
          </g>
          <defs>
            <clipPath id="clip0_1_2501">
              <rect width="14" height="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </span>
      <span
        @click="switchChartType(2)"
        @mouseenter="enter(2)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{ 'u-8-cl': chartTypeShow(2) }"
      >
        <!-- 深度图 -->
        <!-- {{$t('trade.dataType3')}} -->
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_2504)">
            <path d="M0.81508 12.4446V0.700195H0.0388184V13.1446H14.0115V12.4446H0.81508Z" :fill="chartTypeShow(2) ? '#316AD5' : '#66666A'" :stroke="chartTypeShow(2) ? '#316AD5' : '#66666A'" stroke-width="0.6"/>
            <path d="M2 5.77831V11.2999C2 11.4104 2.08954 11.4999 2.2 11.4999L13.3 11.4999C13.4105 11.4999 13.5 11.4121 13.5 11.3016V2.20574C13.5 1.97708 13.0495 1.83616 12.5275 1.75303C11.714 1.62348 10.9731 2.15214 10.6652 2.9162C9.54026 5.70773 7.75743 9.64972 6.5 8.49988C5.33707 7.43645 3.70145 6.09321 2.66769 5.39675C2.36571 5.1933 2 5.41418 2 5.77831Z" :fill="chartTypeShow(2) ? '#316AD5' : '#66666A'"/>
          </g>
          <defs>
            <clipPath id="clip0_1_2504">
              <rect width="14" height="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>
    <div class="kline-bg" v-if="klineLogo">
      <img :src="klineLogo" class="kline-img" alt="" />
    </div>
    <!-- 改，2022.09.22，取消遮罩 -->
    <!-- <div class="coverKlineBox"></div> -->
    <div class="slide" :class="{ selected: chartType === 1 }">
      <div id="tv_chart_container" class="tv_chart_container"></div>
    </div>
    <div class="slide" :class="{ selected: chartType === 2 }">
      <div class="echarts" style="height: 100%">
        <Echarts />
      </div>
    </div>
    <div class="slide" v-if="{ selected: chartType === 3 }" :class="{ selected: chartType === 3 }">
      <div class="echarts" style="height: 100%">
        <!-- <EchartsKline /> -->
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradingView";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradingView.styl";
import { myStorage, getCookie } from "@/components/BlockChain-ui-privatization/utils";
import { mapGetters } from "vuex";
import Echarts from "../echarts/index.vue";
// import EchartsKline from '../echartsKline/index.vue';

export default {
  mixins: [mixin],
  components: {
    Echarts,
    // EchartsKline,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      TvBoxHeight: "400px",
      intervalTimer: null,
    };
  },
  destroyed() {
    this.$bus.$off("SYMBOL_LIST_ALL");
    // 监听 WebSocket 链接成功
    this.$bus.$off("WEBSOCKET_ON_OPEN");
    // 获取 当前选中的货币对
    this.$bus.$off("SYMBOL_CURRENT");
  },
  beforeDestroy() {
    this.MywebSocket = false;
    clearInterval(this.intervalTimer);
  },
  computed: {
    // 改，2022.12.05 新增是否展示多图计算属性
    ...mapGetters(['calTradeType']),
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 0;
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
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
  },
  watch: {
    showGridFlag() {
      this.setTvBoxHeight();
    },
  },
  methods: {
    init() {
      // 杠杆当前选中的币对
      if (this.moduleType === "lever") {
        this.symbolCurrent = myStorage.get("leverSymbolName");
      }
      // 合约当前选中的币对
      if (this.moduleType === "co") {
        this.TvBoxHeight = "710px";
        this.symbolCurrent = myStorage.get("coNowSymbol");
      }
      // 监听TV 是否是全屏状态
      document.removeEventListener("fullscreenchange", this.quitfullTv);
      document.addEventListener("fullscreenchange", this.quitfullTv);
      this.$bus.$on("SYMBOL_LIST_ALL", (data) => {
        this.coSymbolAll = data;
      });
      // 设置国际版TV的高度
      this.setTvBoxHeight();
      this.$bus.$on("WINFOW_ON_RESIIZE", () => {
        const { topMenuBox = null, topMenuBar = null } = this.$refs;

        // 监听TV 是否是全屏状态
        this.quitfullTv();
        // 设置国际版TV的高度
        this.setTvBoxHeight();
        // 市场 个数的超出宽度

        if (topMenuBox && topMenuBar) {
          this.maxPosition = topMenuBox.offsetWidth - topMenuBar.offsetWidth;
        }

        this.slideMarket("left");
      });
      if (this.lanArry.indexOf(this.language) <= -1) {
        this.language = "en";
      }
      if (getCookie("lan") === "el_GR") {
        this.language = "zh_TW";
      }
      if (!myStorage.get("lastTimeS")) {
        myStorage.set("lastTimeS", "30min");
        this.lastTimeS = "30min";
      }
      // 监听 WebSocket 链接成功
      this.$bus.$on("WEBSOCKET_ON_OPEN", (val) => {
        this.MywebSocket = val;
        if (this.MywebSocket) {
          this.isCreateWidget = false;
          this.initTradingView();
        }
      });
      // 获取 当前选中的货币对
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        if (this.symbolCurrent !== val) {
          if (this.chartType === 1) {
            this.isshowLoading = true;
          }
          this.symbolCurrent = val;
          if (window.tvWidget) {
            let { showSymbol } = this.symbolName;
            if (this.moduleType === "co") {
              showSymbol = this.symbolName.symbol;
            }
            window.tvWidget.setSymbol(showSymbol, this.getTimeMin(true, this.lastTimeS), () => {
              this.widget.chart().executeActionById("chartReset");
            });
          }
        }
        this.setTvBoxHeight();
      });
      this.$bus.$on("HIDE_LOADING", () => {
        this.isshowLoading = false;
      });
      const screenWidth = document.body.clientWidth;
      const screenHeight = document.documentElement.clientHeight;
      if (screenWidth < 961) {
        this.isMobile = true;
        this.TvBoxHeight = `${screenHeight - 180}px`;
        this.disabled_features_arr.push("header_settings");
      }
      // 市场 个数的超出宽度
      this.maxPosition = this.$refs.topMenuBox.offsetWidth - this.$refs.topMenuBar.offsetWidth;
      // 修改K线设置弹窗遮挡样式
      // this.intervalTimer = setInterval(() => {
      //   const element = document
      //     .getElementsByTagName('iframe')[0]
      //     .contentWindow.document.getElementById('overlap-manager-root');
      //   if (element) {
      //     element.style.top = '30px';
      //   }
      // }, 500);
    },
    setTvBoxHeight() {
      let bodyH = document.documentElement.clientHeight;
      const { activeName } = this.$route.meta;

      if (bodyH < 800) bodyH = 800;
      if (this.templateLayoutType === "2") {
        if (this.moduleType === "co") {
          this.TvBoxHeight = "100%";
        } else {
          this.TvBoxHeight = `${bodyH - 475}px`;
        }
      } else if (this.showGridFlag && this.lan !== "zh_CN") {
        // 改，2022.10.19，注释，新增
        // 改，2023.02.28
        this.TvBoxHeight = "762px";
        // this.TvBoxHeight = "375px";
      } else {
        // 原 this.TvBoxHeight = "400px";
        // 改，2022.09.21
        // 改，2023.02.28
        this.TvBoxHeight = "470px";
      }
      // 如果是专业版交易页面 则设置 TV的高度为响应式（包含币币和杠杆）
      if (activeName && activeName.indexOf("proTrade") > -1) {
        this.TvBoxHeight = `${bodyH - 398}px`;
      }
    },
  },
};
</script>
<style scoped>
.ex-canter-echart-box {
  background: var(--trade-color-1);
}
.ex-canter-echart-box .top-menu .time-line .b-1-cl,
.ex-canter-echart-box .top-menu .time-line.b-1-cl {
  color: var(--color-text-primary) !important;
}
.ex-canter-echart-box .top-menu .time-line.a-4-bg {
  /*background: var(--mainColor);*/
}
.ex-canter-echart-box .top-menu .time-line:hover .hoverShow{
  color: var(--color-BTN-BUY-SELL-text) !important;
}
.ex-canter-echart-box .top-menu .full-btn {
  border-width: 0px;
}
</style>
