<!-- 合约交易 24小时行情 -->
<template>
  <div class="co-market-box">
    <div class="market-tab">
      <div class="search">
        <!-- 搜索 -->
        <c-inputFind
          :promptText="$t('futures.market.text8')"
          :value="listfilterVal"
          @onchanges="inputchanges"
          name="trade"
          ref="tradeFind"
          className="search-input"
        />
      </div>
      <div class="category-select-box">
        <div v-for="(item, index) in typeTabList" v-if="item.isShow" class="tab2 active">
          {{ item.text }}
        </div>
        <!--<template v-for="(item, index) in typeTabList">-->
        <!--  <span-->
        <!--    class="tab"-->
        <!--    :key="index"-->
        <!--    v-if="item.isShow"-->
        <!--    @click="changeTypeTab(item.id)"-->
        <!--    :class="item.classes"-->
        <!--  >-->
        <!--    <i class="h">{{ item.text }}</i>-->
        <!--    <i class="s b-1-cl">{{ item.text }}</i>-->
        <!--  </span>-->
        <!--</template>-->
      </div>
    </div>
    <!-- 改，2022.09.29，b-2-cl -> b-1-cl -->
    <div class="co-market-symbol a-6-bg b-1-cl">
      <div class="thead a-3-bd">
        <span class="td-symbol">
          <!-- 合约  -->
          {{ $t("futures.market.text1") }}
        </span>
        <span class="td-price" @click="sorteEvent('close')">
          <!-- 最新价 -->
          {{ $t("futures.market.text2") }}
          <div :class="{ selected: sortName === 'close' }" class="sorte">
            <svg
              v-if="sortName === 'close' && sortType === 'down'"
              class="icon icon-16"
              aria-hidden="true"
            >
              <use xlink:href="#icon-a_17_1"></use>
            </svg>
            <svg
              v-else-if="sortName === 'close' && sortType === 'up'"
              class="icon icon-16"
              aria-hidden="true"
            >
              <use xlink:href="#icon-a_17_2"></use>
            </svg>
            <svg v-else class="icon icon-16" aria-hidden="true">
              <use xlink:href="#icon-a_17"></use>
            </svg>
          </div>
        </span>
        <span class="td-rose" @click="sorteEvent('rose')">
          <!-- 涨跌幅 -->
          {{ $t("futures.market.text3") }}
          <div :class="{ selected: sortName === 'rose' }" class="sorte">
            <svg
              v-if="sortName === 'rose' && sortType === 'down'"
              class="icon icon-16"
              aria-hidden="true"
            >
              <use xlink:href="#icon-a_17_1"></use>
            </svg>
            <svg
              v-else-if="sortName === 'rose' && sortType === 'up'"
              class="icon icon-16"
              aria-hidden="true"
            >
              <use xlink:href="#icon-a_17_2"></use>
            </svg>
            <svg v-else class="icon icon-16" aria-hidden="true">
              <use xlink:href="#icon-a_17"></use>
            </svg>
          </div>
        </span>
      </div>
      <div class="tbody">
        <vue-scroll>
          <div>
            <template v-for="(item, index) in marketList">
              <div
                class="tr a-3-bd"
                v-if="item.type === contractSide"
                @click="switchSymbol(item.contractName)"
                :key="index"
                :class="{ active: item.contractName === contractName }"
              >
                <div class="bg a-4-bg"></div>
                <span class="td-symbol">
                  <span class="symbol_base">{{ item.base }}</span>
                  <span class="symbol_quote">/{{ item.quote }}</span>
                </span>
                <span class="td-price">
                  {{ fixPrice(item.close, item.priceFix) }}
                </span>
                <span class="td-rose" :class="roseClasses(item.rose)">
                  {{ item.rose | fixdRose }}%
                </span>
              </div>
            </template>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/market/market";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/market/market.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.co-market-box,
.co-market-box .co-market-symbol {
  background: #171a1e;
}
.co-market-box {
  border-radius: var(--borderRadius);
  overflow: hidden;
}
.co-market-box .co-market-symbol .tbody .tr.active {
  background: rgba(49, 106, 213, 0.31) !important;
}
.co-market-box .market-tab .search {
  width: 100%;
}
.co-market-box .market-tab .search /deep/.input-find-content {
  border-color: transparent;
  border-radius: 2px;
  background: rgba(44, 49, 56, 0.6);
}
.co-market-box .co-market-symbol {
  font-weight: 400;
}
.co-market-box .market-tab .category-select-box .tab {
  color: var(--mainColor);
  background: transparent;
}

.co-market-box .co-market-symbol .thead {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #868e9b;
}

.category-select-box {
  box-sizing: border-box;
  padding: 0 10px;
}
.category-select-box > .tab2 {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  color: #868e9b;
}
.category-select-box > .tab2.active {
  color: #528eff;
  cursor: pointer;
}
.co-market-box .co-market-symbol .thead span,
.co-market-box .co-market-symbol .tbody span {
  font-style: normal;
}
.co-market-box .co-market-symbol .tbody span.td-price {
  font-weight: 400;
  font-size: 10px;
  color: #b8bdc5;
}
.co-market-box .co-market-symbol .tbody span.td-rose {
  font-weight: 400;
  font-size: 10px;
}
.co-market-box .co-market-symbol .tbody .tr {
  height: 28px;
  line-height: 28px;
  border-bottom-width: 0;
}
.co-market-box .co-market-symbol {
  font-size: 12px;
}
.co-market-box .co-market-symbol .tbody {
  height: 300px;
}
.symbol_quote {
  color: #848e9c;
}
</style>
