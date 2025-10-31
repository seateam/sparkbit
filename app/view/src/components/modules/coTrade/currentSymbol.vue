<!-- 币币交易 24小时行情 hdd -->
<!-- 2022.12.29 样式重构 -->
<template>
  <div class="currentSymbol a-3-bd m-currentSymbol">
    <div class="operations-btn a-8-bd">
      <div class="symbol-total b-1-cl" @mouseenter="showMarket(true)" @mouseleave="showMarket(false)">
        <img class="coinImg" v-if="curCoinIcon" width="24" :src="curCoinIcon" />
        <div class="name">
          {{ activeContractName }}
          <svg :class="{'opened': isShowMarket}" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path class="dark-light" d="M4.9987 5.08333L0.832031 0.916664H9.16536L4.9987 5.08333Z" fill="white"/>
            <path class="light-show" d="M4.9987 5.08333L0.832031 0.916664H9.16536L4.9987 5.08333Z" fill="#222222"/>
          </svg>
        </div>
        <!--<div class="subTxt">-->
        <!--  <svg width="14" height="12" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--    <path d="M1 8V2L1.5 2.22222L5.5 4V10L1 8Z" fill="#868E9B"/>-->
        <!--    <path d="M6 1L1 2M1 2V8L5.5 10V4L1.5 2.22222M1 2L1.5 2.22222M6.5 8V2.22222H1.5" stroke="#868E9B" stroke-width="0.8"/>-->
        <!--    <path d="M3.7998 4.9191C3.7998 4.95627 3.76069 4.98044 3.72744 4.96382L2.82744 4.51382C2.8105 4.50535 2.7998 4.48804 2.7998 4.4691L2.7998 3.5809C2.7998 3.54373 2.83892 3.51956 2.87217 3.53618L3.77217 3.98618C3.7891 3.99465 3.7998 4.01196 3.7998 4.0309L3.7998 4.9191Z" fill="#171A1E"/>-->
        <!--    <path d="M3.7998 7.9191C3.7998 7.95627 3.76069 7.98044 3.72744 7.96382L2.82744 7.51382C2.8105 7.50535 2.7998 7.48804 2.7998 7.4691L2.7998 5.5809C2.7998 5.54373 2.83892 5.51956 2.87217 5.53618L3.77217 5.98618C3.7891 5.99465 3.7998 6.01196 3.7998 6.0309L3.7998 7.9191Z" fill="#171A1E"/>-->
        <!--  </svg>-->
        <!--  <span v-if="contractInfo">{{ contractInfo.base }} Info</span>-->
        <!--</div>-->
      </div>

      <!--<div class="info-item activePrice-item">-->
      <!--  &lt;!&ndash; 当前价格 &ndash;&gt;-->
      <!--  <span class="tit activePrice" :class="activePriceClass">-->
      <!--    {{ thousandsComma(activeWsData.close) }}-->
      <!--    <i class="rose b-1-cl" :class="activeWsData.roseClass"> {{ activeWsData.rose }}% </i>-->
      <!--  </span>-->
      <!--</div>-->

      <!-- <div class="set-button">
        <span class="a-3-bd" @click="showDialog('depositDialogShow')"> {{ marginModel }}</span>
        <span class="a-3-bd" @click="showDialog('leverageDialogShow')"> {{nowLevel}}X </span>
      </div> -->
    </div>
    <div class="symbol-info">
      <div class="info-item">
        <!-- 当前价格 -->
        <div class="tit activePrice" :class="activePriceClass">
          {{ thousandsComma(activeWsData.close) }}
          <!--<i class="rose b-1-cl" :class="activeWsData.roseClass"> {{ activeWsData.rose }}% </i>-->
        </div>
        <div class="percentage" :class="activePriceClass">{{ activeWsData.rose }}%</div>
      </div>
      <div class="info-item">
        <!-- 标记价格 -->
        <span class="tit explain"> {{ $t("futures.currentSymbol.title1") }} </span>
        <span class="vla b-1-cl"> {{ thousandsComma(publicMarkertInfo.tagPrice) }} </span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p v-html="lantext.explain1">
            <!-- 标记价格用于结算盈亏和触发强制减仓。标记价格可能会偏离市场最新价格，以防因市场被恶意操纵造成损失。 -->
            <!-- {{ $t('futures.currentSymbol.explain1')}} -->
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 指数价格 -->
        <span class="tit explain"> {{ $t("futures.currentSymbol.title2") }} </span>
        <span class="vla b-1-cl"> {{ thousandsComma(publicMarkertInfo.indexPrice) }} </span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p>
            <!-- 标的货币的市场公允现货价格。 -->
            {{ $t("futures.currentSymbol.explain2") }}
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 本期资金费率 -->
        <span class="tit explain">
          {{ $t("futures.currentSymbol.title3") }}/{{ capitalFrequency }}H
        </span>
        <span class="vla b-1-cl">
          {{ publicMarkertInfo.currentFundRate }}% / {{ countDownTime }}
        </span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>

          <p>
            <!-- 本期结束资金费率时将以此值进行结算。 -->
            {{ activeTimer }}{{ $t("futures.currentSymbol.explain3") }}
          </p>
          <p v-html="lantext.explain4">
            <!-- 本期资金费率，由上一期的数据进行计算而得，
            在本期开始时已经确定，期内不会改变，并应用于本期结束时的资金费用结算。
            资金费率为正则多头支付空头资金费，资金费率为负则空头支付多头资金费。 -->
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 预测下期资金费率 -->
        <span class="tit explain">{{ $t("futures.currentSymbol.title4") }} </span>
        <span class="vla b-1-cl"> {{ publicMarkertInfo.nextFundRate }}%</span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p>
            <!-- 下期结算资金费时将以值进行结算。 -->
            {{ nextTimer }}{{ $t("futures.currentSymbol.explain5") }}
          </p>
          <p>
            <!-- 资金费率为正则多头支付空头资金费，资金费率为负则空头支付多头资金费。 -->
            {{ $t("futures.currentSymbol.explain6") }}
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 24H成交量 -->
        <span class="tit volume">{{ $t("futures.currentSymbol.title5") }}</span>
        <span class="vla b-1-cl"> {{ thousandsComma(activeWsData.vol) }} {{ coUnit }} </span>
      </div>

      <!--<div class="linkBox">-->
      <!--  <div class="item">-->
      <!--    <img :src="icon_play" alt="" class="icon">-->
      <!--    <span>Spot Tutorial</span>-->
      <!--  </div>-->
      <!--  <div class="item">-->
      <!--    <img :src="icon_spot" alt="" class="icon">-->
      <!--    <span>Spot Guidance</span>-->
      <!--  </div>-->
      <!--</div>-->
    </div>

    <!-- 市场 -->
    <!-- v-click-outside.capture="onClickOutside"
      v-click-outside:mousedown.capture="onClickOutside" -->
    <div class="market-shade u-7-bg" v-if="isShowMarket" @click="onClickOutside"></div>
    <div class="market-block" v-show="isShowMarket" @mouseenter="showMarket(true)" @mouseleave="showMarket(false)">
      <Market :isShow="isShowMarket" :close="closeDialog" />
    </div>
  </div>
</template>
<script>
import { directive as clickOutside } from "v-click-outside-x";
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol.styl";
// 24小时行情
import Market from "./market.vue";

export default {
  mixins: [mixin],
  components: { Market },
  directives: { clickOutside },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.currentSymbol .symbol-total {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.currentSymbol .operations-btn {
  position: relative;
  border-width: 0;
  margin-right: 16px;
}
.currentSymbol .symbol-total > .coinImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
.currentSymbol .activePrice {
  line-height: 14px;
}
.currentSymbol .symbol-info .info-item .percentage {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
}
.currentSymbol .symbol-info .info-item {
  text-align: left;
  margin-right: 20px;
}

.currentSymbol .symbol-total .symbol-name.b-4-cl {
  color: var(--mainColor);
}
.triangle-down.b-4-bd {
  border-color: var(--mainColor);
}
.currentSymbol .symbol-total .b-4-cl,
.currentSymbol .symbol-total:hover .hoverShow.b-4-cl {
  color: var(--mainColor);
}
</style>
<style scoped>
.currentSymbol {
  font-style: normal;
  height: 76px;
  position: relative;
  background-color: var(--trade-color-1);
  border-radius: 8px 8px 0 0;
  border-color: var(--color-Input-border);
}
.currentSymbol .symbol-total {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-text-primary);
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.currentSymbol .symbol-total .opened {
  transform: rotate(180deg);
}
.symbol-total .name {
  display: flex;
  align-items: center;
}
.symbol-total .name svg {
  margin-left: 6px;
}
.symbol-total > .subTxt {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #868e9b;
}
.operations-btn {
  position: relative;
}
.currentSymbol .activePrice {
  font-weight: 600;
  font-size: 20px;
  line-height: 14px;
  display: flex;
  align-items: center;
}
.currentSymbol .symbol-info .info-item .tit:not(.activePrice) {
  font-size: 12px;
}
.currentSymbol .symbol-info .info-item .vla {
  font-size: 14px;
}
.currentSymbol .symbol-info .info-item .tit,
.currentSymbol .symbol-info .info-item .vla {
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  border: none;
}
.currentSymbol .symbol-info .info-item .percentage {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.currentSymbol .symbol-info .info-item .tit:not(.activePrice) {
  color: var(--color-text-secondary);
}
.currentSymbol .symbol-info .info-item .vla {
  color: var(--color-text-primary);
}

.symbol-info > .linkBox {
  display: flex;
  align-items: center;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
.symbol-info > .linkBox > .item {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.symbol-info > .linkBox > .item:not(:last-child) {
  margin-right: 14px;
}
.symbol-info > .linkBox > .item > span {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  display: flex;
  align-items: center;
  color: #868e9b;
  padding-left: 6px;
}
.currentSymbol .market-block {
  top: 76px;
  left: 12px;
}
</style>
