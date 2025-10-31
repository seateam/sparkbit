<template>
  <div class="recommend">
    <vue-scroll :ops="ops" ref="vs" @handle-scroll="handleScroll">
      <div class="recommend-wrap" :style="{ width: itemWidth + 'px' }">
        <template v-if="!isCoOpen">
          <div
            class="recommend-content c-4-bg c-3-cl-h"
            v-for="(item, idx) in headerSymbol"
            :key="idx"
          >
            <div @click="bandLink(item)" v-if="dataList[item]" class="hvol links f-2-cl">
              <p class="recommendTop">
                <img class="icon" :src="calCoinIcon(dataList[item].symbol.symbol)">
                <span class="recommendType">
                  {{ item | getCoinShowName(symbolAll) }}(24H)
                  <!--标签-->
                  <!--<div class="coin-label" v-if="dataList[item].coinLabel">-->
                  <!--  <span class="coin-text a-12-cl">{{ dataList[item].coinLabel }}</span>-->
                  <!--  <span class="coin-bg a-12-bg"></span>-->
                  <!--</div>-->
                </span>
              </p>
              <p class="recommendPrice">
                <!-- <span :class="dataList[item].close.class"> -->
                <span>
                  {{ dataList[item].close ? dataList[item].close.data : "" }}
                </span>
              </p>
              <!--<p class="recommendTime">-->
              <!--  24H Vol {{ dataList[item].vol }}{{ isCoOpen ? $t("common.zhang") : "" }}-->
              <!--</p>-->
              <span
                class="percentage"
                :class="dataList[item].rose ? dataList[item].rose.class : ''"
              >
                  <img style="transform: rotate(-45deg);margin-bottom: -8px;" v-if="calCoinRose(dataList[item].rose.data)" class="icon1" :src="imgMap.icon_rise">
                  <img v-else class="icon1" :src="imgMap.icon_fall">
                  <span>{{ dataList[item].rose ? dataList[item].rose.data : "" }}</span>
                </span>
            </div>
            <div v-else class="hvol f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{ item | getCoinShowName(symbolAll) }}
                </span>
                <!--<span class="percentage"> &#45;&#45; </span>-->
              </p>
              <p class="recommendPrice">--</p>
              <p class="recommendTime">--</p>
            </div>
            <charts :key="item" :dataList="klineDataList[item]" :smooth="true" klineColor="#316AD5" :name="item" />
          </div>
        </template>
        <template v-if="isCoOpen">
          <div
            class="recommend-content c-4-bg c-3-cl-h"
            v-for="(item, idx) in coHeaderSymbol"
            :key="idx"
          >
            <div
              @click="bandLink(item.symbol)"
              v-if="dataList[item.symbol]"
              class="hvol links f-2-cl"
            >
              <p class="recommendTop">
                <img class="icon" :src="calCoinIcon(dataList[item].symbol.symbol)">
                <span class="recommendType">
                  {{ item.symbol | getCoinShowName(symbolAll) }}
                  <div class="coin-label" v-if="dataList[item.symbol].coinLabel">
                    <span class="coin-text a-12-cl">{{ dataList[item.symbol].coinLabel }} (24h)</span>
                    <span class="coin-bg a-12-bg"></span>
                  </div>
                </span>
                <span
                  class="percentage"
                  :class="dataList[item.symbol].rose ? dataList[item.symbol].rose.class : ''"
                >
                  {{ dataList[item.symbol].rose ? dataList[item.symbol].rose.data : "" }}
                </span>
              </p>
              <p class="recommendPrice">
                <span>
                  {{ dataList[item.symbol].close ? dataList[item.symbol].close.data : "" }}
                </span>
              </p>
              <p class="recommendTime">
                24H Vol {{ dataList[item.symbol].vol }}{{ isCoOpen ? $t("common.zhang") : "" }}
              </p>
            </div>
            <div v-else class="hvol f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{ item.symbol | getCoinShowName(symbolAll) }}
                </span>
                <span class="percentage"> -- </span>
              </p>
              <p class="recommendPrice">--</p>
              <p class="recommendTime">--</p>
            </div>
            <charts :key="item.symbol" :smooth="true" klineColor="#316AD5" :dataList="klineDataList[item.symbol]" :name="item.symbol" />
          </div>
        </template>
      </div>
    </vue-scroll>
    <span v-if="process > 0" @click="scrollRecommend('prev')" class="scroll-btn prev">
      <em>
        <svg class="icon icon-24" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      </em>
      <i class="bg c-1-bg"></i>
    </span>
    <span
      v-if="process < 1 && itemWidth > clientWidths"
      @click="scrollRecommend('next')"
      class="scroll-btn next"
    >
      <em>
        <svg class="icon icon-24" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      </em>
      <i class="bg c-1-bg"></i>
    </span>
  </div>
</template>

<script>
import commonMixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/recommend/recommend";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/home/recommend/recommend.styl";
import Charts from "../charts/china.vue";

export default {
  name: "info",
  mixins: [commonMixin],
  components: {
    Charts,
  },
  computed: {
    // 改，2022.12.19 新增判断涨跌
    calCoinRose() {
      return (data = "") => data.includes("+");
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.recommend {
  overflow: unset;
  background: var(--color-4);
  padding: 30px 0;
  margin-top: 0;
  height: 152px;
}
/* 2022.12.16 修改样式 */
.recommend .recommendType {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-6);
}
.recommend .recommend-wrap .recommend-content .recommendPrice {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-5);
  margin-top: 4px;
}
.recommend .recommend-wrap .recommend-content .recommendTop {
  justify-content: flex-start;
}
.recommend .recommend-wrap .recommend-content .recommendTop > .percentage {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  margin-top: -10px;
}
.recommend .recommend-wrap .recommend-content .recommendTop > .percentage > .icon1 {
  margin-top: 8px;
  padding-right: 2px;
}

.recommend .recommend-wrap .recommend-content .recommendTop > .icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.recommend .recommend-wrap .recommend-content .recommendTime {
  font-size: 12px;
  color: var(--color-5);
}
.recommend .recommendType .coin-label {
  transform: unset;
  right: -106px;
  top: 0;
}
.recommend .recommend-wrap .recommend-content {
  background: var(--color-4);
  border-radius: 12px;
  margin-right: 18px;
}
.dark .recommend .recommend-wrap .recommend-content {
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.light .recommend .recommend-wrap .recommend-content {
  background: linear-gradient(181deg, rgba(251, 252, 252, 0.50) 0.67%, rgba(255, 255, 255, 0.00) 125.36%);
}
.recommend .recommend-wrap .recommend-content .percentage {

}
</style>
