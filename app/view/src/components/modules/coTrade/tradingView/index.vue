<template>
  <div
    class="future-canter-echart-box"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container">
    <div class="top-menu b-3-cl" :class="{hide: chartType === 2, lefts: chartType === 3 }">
      <div class="top-menu-bar" ref="topMenuBar">
        <!-- <i
          class="slide-btn icon-left a-6-bg"
          :class="{ 'slide-btn-cur': parseFloat(slidePosition) < 0 }"
          @click="slideMarket('left')">
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_10_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_10"></use>
          </svg>
        </i> -->
        <div
          class="top-menu-box"
          :style="{ left: slidePosition }"
          ref="topMenuBox">
          <span
            @click="timeClike('Line')"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === 'Line' }"
            class="time-line  a-4-cl-h">
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
        <!-- <i
          class="slide-btn icon-right a-6-bg"
          :class="{
            'slide-btn-cur':
              maxPosition > 0 && parseFloat(slidePosition) > -maxPosition
          }"
          @click="slideMarket('right')">
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_11_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_11"></use>
          </svg>
        </i> -->
      </div>
    </div>
    <div class="mask-bg" v-show="isshowLoading && maskBg"></div>
    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>
    <p class="a-8-bg inline"></p>
    <div class="top-tab">
      <span
        style="padding-right: 6px"
        @click="switchChartType(1)"
        @mouseenter="enter(1)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{'u-8-cl':chartTypeShow(1) }">
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
        :class="{'u-8-cl':chartTypeShow(2) }">
        <!-- 深度图 -->
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
    <!--2023.5.24 隐藏遮罩-->
    <!--<div class="coverKlineBox"></div>-->
    <div class="slide" :class="{ selected: chartType === 1 }">
      <div id="tv_chart_container" class="tv_chart_container"></div>
    </div>
    <div class="slide" :class="{ selected: chartType === 2 }">
      <div class="echarts" style="height: 100%">
        <Echarts :chartType="chartType" />
      </div>
    </div>


  </div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradingView/tradingView';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradingView/tradingView.styl';
import Echarts from '../echarts/index.vue';


export default {
  mixins: [mixin],
  components: {
    Echarts,
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.$bus.$off('SYMBOL_LIST_ALL');
    // 监听 WebSocket 链接成功
    this.$bus.$off('WEBSOCKET_ON_OPEN');
    // 获取 当前选中的货币对
    this.$bus.$off('SYMBOL_CURRENT');
  },
  beforeDestroy() {
    this.MywebSocket = false;
  },
};
</script>
<style scoped>
.future-canter-echart-box .top-menu .time-line.b-1-cl {
  color: var(--color-text-primary) !important;
}
.future-canter-echart-box .top-menu .time-line:hover .hoverShow{
  color: var(--color-BTN-BUY-SELL-text) !important;
}
</style>
