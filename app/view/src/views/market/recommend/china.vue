<template>
  <!-- 改，2022.12.20 删除 a-6-bg -->
  <div class="symbol-info">
    <div class="block-title-tab a-3-bd">
      <ul class="block-title-ul b-1-cl">
        <li class="block-title-item">
          <!-- 概况 -->
          {{ $t("market.text1") }}
        </li>
        <li class="block-title-item marketIcon" @click="marketClick(dataList.name)">
          <svg
            v-if="mySymbolList.indexOf(dataList.name) === -1"
            class="icon icon-16"
            aria-hidden="true"
          >
            <use xlink:href="#icon-c_11"></use>
          </svg>
          <svg v-else class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-c_11_1"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="symbol-info-main">
      <div class="symbol-info-content b-1-cl">
        <!-- <div class="coinIcon" style="width: 36px; height: 36px; display: flex; margin-right: 8px">
          <img :src="dataList.coinSymbolImg" />
        </div> -->
        <p class="symbol-name">{{ dataList.name | getCoinShowName(symbolAll) }}</p>
        <p class="symbol-price">
          <span>{{ dataList.close ? dataList.close.data : "" }}</span>
          <span :class="dataList.rose && dataList.rose.class">
            {{ dataList.rose ? dataList.rose.data : "" }}
          </span>
        </p>
        <p class="symbol-vol b-2-cl">
          <span class="price">≈ {{ dataList.close ? dataList.close.price : "" }}</span>
          <span>24H {{ $t("market.vol") }} {{ dataList.vol }}</span>
        </p>
        <p>
          <c-button
            paddingW="20px"
            height="30px"
            @click="bandLink(dataList.name)"
            class="alert-button"
            marginTop="16px"
          >
            <!-- 去交易 -->
            {{ $t("market.text2") }}
          </c-button>
        </p>
      </div>
      <!-- 改，2022.10.24，加上recommend -->
      <!-- 改，2022.12.20 修改echart颜色和平滑度-->
      <charts
        :key="dataList.name + 'recommend'"
        height="70px"
        :dataList="klineDataList_recommend[dataList.name]"
        :name="dataList.name + 'recommend'"
        klineColor="#316AD5"
        :smooth="true"
      />
    </div>
    <!-- 改，2022.12.20 删除 a-6-bg -->
    <div class="block-title-tab a-3-bd">
      <ul class="block-title-ul b-1-cl">
        <li class="block-title-item">
          <!-- 基本信息 -->
          {{ $t("market.text3") }}
        </li>
      </ul>
    </div>
    <div class="s">
      <currencyNotes :coinName="symbolCurrentCoinName"> </currencyNotes>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/market/recommend/recommend/recommend";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/market/recommend/recommend/recommend.styl";
import Charts from "../charts/china.vue";
import currencyNotes from "./currencyNotes.vue";

export default {
  name: "info",
  mixins: [mixin],
  components: {
    currencyNotes,
    Charts,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
/* 改，2022.12.20 修改样式 */
.symbol-info-main .alert-button {
  background: var(--mainColor);
  border-radius: 1px;
  color: var(--btnColor);
}
</style>
