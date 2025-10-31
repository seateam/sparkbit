<!-- 合约交易 盘口 -->
<!-- 2022.12.29 样式重构 -->
<template>
  <div class="codepath-container">
    <div v-if="!onlyShowNew" class="m-title">
      <div class="title">{{ $t("futures.depth.text1") }}</div>
    </div>
    <div class="m-head" v-if="!onlyShowNew">
      <div class="layoutIcon" :class="{ active: showTypeNum === 1 }" @click="showType(1)">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.1543"
            y="1.23047"
            width="4.61539"
            height="6.15385"
            rx="0.265232"
            fill="#E35561"
          />
          <rect
            x="1.1543"
            y="8.61523"
            width="4.61539"
            height="6.15385"
            rx="0.265232"
            fill="#5DC787"
          />
          <rect
            x="13.8457"
            y="1.23047"
            width="2.46154"
            height="6.92308"
            rx="0.265232"
            transform="rotate(90 13.8457 1.23047)"
            fill="#868E9B"
          />
          <rect
            x="13.8457"
            y="4.92383"
            width="2.46154"
            height="6.92308"
            rx="0.265232"
            transform="rotate(90 13.8457 4.92383)"
            fill="#868E9B"
          />
          <rect
            x="13.8457"
            y="8.61523"
            width="2.46154"
            height="6.92308"
            rx="0.265232"
            transform="rotate(90 13.8457 8.61523)"
            fill="#868E9B"
          />
          <rect
            x="13.8457"
            y="12.3086"
            width="2.46154"
            height="6.92308"
            rx="0.265232"
            transform="rotate(90 13.8457 12.3086)"
            fill="#868E9B"
          />
        </svg>
      </div>
      <div class="layoutIcon" :class="{ active: showTypeNum === 2 }" @click="showType(2)">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.23047"
            y="1.23047"
            width="4.92308"
            height="13.5385"
            rx="0.256106"
            fill="#E35561"
          />
          <rect
            x="14.7695"
            y="1.23047"
            width="2.46154"
            height="7.38462"
            rx="0.256106"
            transform="rotate(90 14.7695 1.23047)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="4.92383"
            width="2.46154"
            height="7.38462"
            rx="0.256106"
            transform="rotate(90 14.7695 4.92383)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="8.61523"
            width="2.46154"
            height="7.38462"
            rx="0.256106"
            transform="rotate(90 14.7695 8.61523)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="12.3086"
            width="2.46154"
            height="7.38462"
            rx="0.256106"
            transform="rotate(90 14.7695 12.3086)"
            fill="#868E9B"
          />
        </svg>
      </div>
      <div class="layoutIcon" :class="{ active: showTypeNum === 3 }" @click="showType(3)">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.23047"
            y="1.23047"
            width="4.92308"
            height="13.5385"
            rx="0.246287"
            fill="#5DC787"
          />
          <rect
            x="14.7695"
            y="1.23047"
            width="2.46154"
            height="7.38462"
            rx="0.246287"
            transform="rotate(90 14.7695 1.23047)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="4.92383"
            width="2.46154"
            height="7.38462"
            rx="0.246287"
            transform="rotate(90 14.7695 4.92383)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="8.61523"
            width="2.46154"
            height="7.38462"
            rx="0.246287"
            transform="rotate(90 14.7695 8.61523)"
            fill="#868E9B"
          />
          <rect
            x="14.7695"
            y="12.3086"
            width="2.46154"
            height="7.38462"
            rx="0.246287"
            transform="rotate(90 14.7695 12.3086)"
            fill="#868E9B"
          />
        </svg>
      </div>

      <!--<div class="depth">-->
      <!--  <span>0.01</span>-->
      <!--  <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <path d="M3.00001 3L1.27146e-07 6.31821e-07L6 4.76837e-07L3.00001 3Z" fill="#868E9B"/>-->
      <!--  </svg>-->
      <!--</div>-->
      <div class="depth depath-class h-2-bd">
        <span class="hoverHide">
          <!-- 深度 -->
          <!-- {{ $t("futures.depth.text4") }} -->
          {{ fixDepthNumber(depathList[activeDepat]) }}
          <span class="triangle-down"></span>
        </span>
        <span class="hoverShow b-4-cl">
          <!-- 深度 -->
          <!-- {{ $t("futures.depth.text4") }} -->
          {{ fixDepthNumber(depathList[activeDepat]) }}
          <span class="triangle-down b-4-bd"></span>
        </span>
        <ul class="type-item2">
          <li
            v-for="(item, index) in depathList"
            :key="index"
            :class="activeDepat === index ? 'actived b-1-cl' : ''"
            @click.stop="switchDepat(index)"
          >
            {{ fixDepthNumber(item) }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block-header title-tab a-3-bd" v-if="false">
      <span
        class="tab"
        @click="switchBlock('D')"
        :class="{ 'a-12-bd b-1-cl': shrinksDdpthNewShow === 'D' }"
      >
        <!-- 委托列表 -->
        {{ $t("futures.depth.text1") }}
      </span>
      <span
        class="tab tab-rtwo"
        @click="switchBlock('T')"
        :class="{ 'a-12-bd b-1-cl': shrinksDdpthNewShow === 'T' }"
      >
        <!-- 实时成交 -->
        {{ $t("futures.depth.text2") }}
      </span>
      <div class="depath-class h-2-bd" v-if="shrinksDdpthNewShow === 'D'">
        <span class="hoverHide">
          <!-- 深度 -->
          <!-- {{ $t("futures.depth.text4") }} -->
          {{ fixDepthNumber(depathList[activeDepat]) }}
          <span class="triangle-down"></span>
        </span>
        <span class="hoverShow b-4-cl">
          <!-- 深度 -->
          <!-- {{ $t("futures.depth.text4") }} -->
          {{ fixDepthNumber(depathList[activeDepat]) }}
          <span class="triangle-down b-4-bd"></span>
        </span>
        <ul class="type-item">
          <template>
            <li
              v-for="(item, index) in depathList"
              :key="index"
              :class="activeDepat === index || depatHover === index ? 'actived b-1-cl' : ''"
              @mouseenter="handMouseenter(index)"
              @mouseout="handMouseleave(index)"
              @click.stop="switchDepat(index)"
            >
              {{ fixDepthNumber(item) }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="tab-item" v-if="!onlyShowNew" :class="{ 'is-show': !onlyShowNew }">
      <div v-if="false" class="block-header a-3-bd e-2-cl">
        <span class="h4 b-1-cl">
          <!-- 委托列表 -->
          {{ $t("futures.depth.text1") }}
        </span>
        <div
          class="depath-class h-2-bd"
          v-if="shrinksDdpthNewShow === 'D'"
          @click.stop="isShowDepat = !isShowDepat"
        >
          <span class="hoverHide">
            <!-- 深度 -->
            <!-- {{ $t("futures.depth.text4") }} -->
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down"></span>
          </span>
          <span class="hoverShow b-4-cl">
            <!-- 深度 -->
            <!-- {{ $t("futures.depth.text4") }} -->
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down b-4-bd"></span>
          </span>
          <ul class="type-item" v-if="isShowDepat">
            <template>
              <li
                v-for="(item, index) in depathList"
                :key="index"
                :class="activeDepat === index || depatHover === index ? 'actived b-1-cl' : ''"
                @mouseenter="handMouseenter(index)"
                @mouseout="handMouseleave(index)"
                @click.stop="switchDepat(index)"
              >
                {{ fixDepthNumber(item) }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="block-content">
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="showLineNum"
          :bodyHeight="plateHeight"
          v-if="showTypeNum != 3"
          :allData="dataList"
        />
        <div
          class="m-thead a-3-bd b-2-cl"
          v-if="theadList && theadList.length && showTypeNum === 3"
        >
          <span
            v-for="(item, index) in theadList"
            :key="'thead' + index"
            :style="{ width: cellWidth[index] + 'px' }"
          >
            {{ item }}
          </span>
        </div>
        <div class="current-price m-currentPrice">
          <div class="price-box">
            <span class="indexPrice" :class="priceClsss"
              >{{ thousandsComma(activePrice) }}
              <i v-if="priceClsss === 'u-1-cl'">
                <svg
                  width="12"
                  height="13"
                  style="transform: scaleY(-1)"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25 0.730469V9.51052L1.05 5.47206L0 6.4997L6 12.2689L12 6.4997L10.95 5.47206L6.75 9.51052V0.730469H5.25Z"
                    fill="#5CEEA0"
                  />
                </svg>
              </i>
              <i v-if="priceClsss === 'u-4-cl'">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25 0.730469V9.51052L1.05 5.47206L0 6.4997L6 12.2689L12 6.4997L10.95 5.47206L6.75 9.51052V0.730469H5.25Z"
                    fill="#FF5F5F"
                  />
                </svg>
              </i>
            </span>
            <span class="tagPrice">
              <i>
                {{ thousandsComma(publicMarkertInfo.tagPrice) }}
              </i>
              <!-- 标价价格 -->
              {{ $t("futures.currentSymbol.title1") }}
            </span>
          </div>
        </div>
        <tableList
          type="buy"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="showLineNum"
          :cellWidth="cellWidth"
          :bodyHeight="plateHeight"
          :allData="dataList"
          v-if="showTypeNum != 2"
        />
      </div>
    </div>
    <!-- 实时成交 -->
    <div class="tab-item" v-if="onlyShowNew" :class="{ 'is-show': onlyShowNew }">
      <new-trade :activeIndex="activeIndex" />
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/depth/depth";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/depth/depth.styl";
import tableList from "./component/tableList.vue";
// 实时成交
import newTrade from "./newTrade.vue";

export default {
  mixins: [mixin],
  components: {
    tableList,
    newTrade,
  },
  props: {
    activeIndex: {
      default: 0,
      type: Number,
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.codepath-container {
  background-color: var(--trade-color-1);
  border-radius: 8px;
}
.codepath-container .block-header {
  padding: 0;
}
.codepath-container .title-tab .tab.a-12-bd {
  border-color: var(--mainColor);
}
.codepath-container .title-tab .tab {
  box-sizing: border-box;
  padding: 0 8px;
  margin-right: 0;
}
.codepath-container .title-tab .tab:first-child {
  margin-right: 10px;
}
/*.m-currentPrice {*/
/*  border-top: 1px solid rgba(255, 255, 255, 0.08);*/
/*  border-bottom: 1px solid rgba(255, 255, 255, 0.08);*/
/*}*/
.m-currentPrice > .price-box > .indexPrice {
  font-size: 20px;
  font-weight: 700;
}
.a-6-bg {
  background: #181a1f;
}
.codepath-container .depath-class {
  /* padding-right: 10px; */
}

.codepath-container .depath-class ul {
  padding: 12px;
  background-color: var(--color-BG-Light);
  border-radius: 8px;
}
.codepath-container .depath-class li {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  border-radius: 6px;
}
.codepath-container .depath-class span.b-4-cl {
  color: var(--mainColor);
}
.codepath-container .triangle-down.b-4-bd {
  border-color: var(--mainColor);
}

.codepath-container .depath-class li.actived {
  background-color: var(--color-Input-fill);
}
</style>
<style scoped>
.m-head {
  height: 34px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 12px;
  position: relative;
}
.m-head > .depth {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-primary);
}
.codepath-container .depath-class ul {
  z-index: 2;
  top: 18px;
  opacity: 1;
}
.m-head > .layoutIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 26px;
  cursor: pointer;
  border-radius: 100px;
}

.m-head > .layoutIcon.active {
  background-color: var(--color-Input-fill);
}
.m-head > .layoutIcon > svg > rect {
  fill-opacity: 0.5;
}
.m-head > .layoutIcon.active > svg > rect {
  fill-opacity: 1;
}
/deep/.tableList-container .tr-bg {
  right: 0px;
}

/deep/.tableList-container .tbody {
  font-size: 12px;
}
.m-thead {
  height: 29px;
  line-height: 29px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.m-thead > span:first-child {
  text-align: left;
  box-sizing: border-box;
  padding-left: 15px;
}
.m-thead > span {
  font-size: 12px;
  color: #929292;
  text-align: right;
}
.m-head {
  z-index: 1;
}
.m-head > .depth {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.codepath-container .depath-class ul {
  top: 34px;
}
.codepath-container .current-price .price-box .tagPrice {
  color: var(--color-text-secondary);
  font-weight: 500;
}
.codepath-container .depath-class ul li.b-1-cl {
  color: #ffffff !important;
}
.m-title {
  height: 44px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-title .title {
  height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-left: 20px;
  line-height: 44px;
  position: relative;
  display: inline-block;
}

.m-title .title::before {
  content: "";
  width: 22px;
  height: 2px;
  background: var(--color-text-primary);
  position: absolute;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
}
.tab-item {
  padding-bottom: 12px;
}
</style>
