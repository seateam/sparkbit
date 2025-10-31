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
        <template v-for="(item, index) in typeTabList">
          <span
            class="tab"
            :key="index"
            v-if="item.isShow"
            @click="changeTypeTab(item.id)"
            :class="item.classes"
          >
            <i class="h">{{ item.text }}</i>
            <i class="s b-1-cl">{{ item.text }}</i>
          </span>
        </template>
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
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path class="active" d="M10 5L6 9H14L10 5Z" fill="#ffffff" />
              <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
            </svg>
            <svg
              v-else-if="sortName === 'close' && sortType === 'up'"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
              <path class="active" d="M10 15L6 11H14L10 15Z" fill="#ffffff" />
            </svg>
            <svg
              v-else
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
              <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
            </svg>
          </div>
        </span>
        <span class="td-rose" @click="sorteEvent('rose')">
          <!-- 涨跌幅 -->
          {{ $t("futures.market.text3") }}
          <div :class="{ selected: sortName === 'rose' }" class="sorte">
            <svg
              v-if="sortName === 'close' && sortType === 'down'"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path class="active" d="M10 5L6 9H14L10 5Z" fill="#ffffff" />
              <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
            </svg>
            <svg
              v-else-if="sortName === 'close' && sortType === 'up'"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
              <path class="active" d="M10 15L6 11H14L10 15Z" fill="#ffffff" />
            </svg>
            <svg
              v-else
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
              <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
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
                :class="{ 'active': item.contractName === contractName }"
              >
                <!--<div class="bg a-4-bg"></div>-->
                <span class="td-symbol">{{ item.symbol.split('/')[0] }}<span>/{{ item.symbol.split('/')[1] }}</span></span>
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
.co-market-box {
  border-radius: 8px;
  border: 1px solid var(--color-BTN-secondary-border);
  background: var(--color-BG);
  box-shadow: 60px 123px 83px 0 rgba(0, 0, 0, 0.08),
    43px 85px 47px 0 rgba(0, 0, 0, 0.04),
    32px 56px 34px 0 rgba(0, 0, 0, 0.04),
    8px 14px 15px 0 rgba(0, 0, 0, 0.04);
}
.co-market-box .co-market-symbol {
  background: transparent;
}
.co-market-box {
  padding: 24px 0 12px;
  border-radius: 12px;
  overflow: hidden;
}
.co-market-box .co-market-symbol .tbody .tr.active,
.co-market-box .co-market-symbol .tbody .tr:hover {
  background: var(--color-Hover) !important;
}
.co-market-box .market-tab .category-select-box .tab::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
}
.co-market-box .market-tab .category-select-box .tab.u-8-bg {
  color: var(--color-text-primary);
  background: transparent;
}
.co-market-box .market-tab .category-select-box .tab.u-8-bg::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.co-market-box .market-tab .search {
  width: 100%;
}
.co-market-box .market-tab .search /deep/.input-find-content {
  border-color: var(--color-Input-border);
  background: var(--color-Input-fill);
}
.co-market-box .b-1-cl {
  color: var(--color-1);
}
.co-market-box .market-tab .category-select-box .tab {
  position: relative;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
}
.co-market-symbol .thead span {
  color: var(--color-text-secondary);
}
</style>
