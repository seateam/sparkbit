<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-market trade-market-index-container" :class="marketClass">
    <div class="market-header a-21-bg a-3-bd">
      <div class="search">
        <i class="icon-serach b-1-cl" @click="serachShrinkBlock">
          <img v-if="theme === 'Dark'" class="icon-18px" :src="imgMap.search" />
          <img v-if="theme === 'Light'" class="icon-18px" :src="imgMap.search_1" />
        </i>
        <!-- 搜索 -->
        <c-inputFind
          :promptText="$t('trade.searchSy')"
          :value="listfilterVal"
          @onchanges="inputchanges"
          name="trade"
          ref="tradeFind"
          className="search-input findClass"
        />
      </div>
      <!-- 改，2022.09.21，注释 -->
      <!-- <button @click="shrinkBlock" class="kg a-4-bg-h">
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_8"></use>
        </svg>
      </button> -->
      <!-- 改，2022.09.21，新增 -->
      <button @click="onClickOutside" class="kg a-4-bg-h">
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_8"></use>
        </svg>
      </button>

      <div class="market-title-box">
        <vue-scroll>
          <div class="market-title-bar" ref="marketBar">
            <i
              class="slide-btn icon-left a-21-bg"
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
            <ul class="market-title b-2-cl" :style="{ left: slidePosition }" ref="marketUl">
              <li
                class="a-12-bd"
                :class="{ 'selected b-1-cl': 'myMarket' === marketCurrent }"
                @click="switchMarket('myMarket')"
              >
                {{ $t("trade.marketSet") }}
              </li>
              <li
                v-for="(item, index) in marketList"
                :key="index"
                :class="{ 'selected b-1-cl': marketCurrent === item }"
                @click="switchMarket(item)"
                class="a-12-bd"
              >
                {{ item | getCoinShowName(coinList) }}
              </li>
            </ul>
            <i
              class="slide-btn icon-right a-21-bg"
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
        </vue-scroll>
      </div>
    </div>
    <div class="market-symbol">
      <div class="thead b-2-cl a-3-bd">
        <span class="td-symbol">
          <!-- 市场 -->
          {{ $t("trade.market") }}
        </span>
        <span @click="sorteEvent('closes')" class="td-price">
          <!-- 最新价 -->
          {{ $t("trade.close") }}
          <div :class="{ selected: sortName === 'closes' }" class="sorte">
            <svg
              v-if="sortName === 'closes' && sortType === 'down'"
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
              v-else-if="sortName === 'closes' && sortType === 'up'"
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
        <span @click="sorteEvent('roses')" class="td-rose">
          <!-- 涨跌幅 -->
          {{ $t("trade.applies") }}
          <div :class="{ selected: sortName === 'roses' }" class="sorte">
            <svg
              v-if="sortName === 'roses' && sortType === 'down'"
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
              v-else-if="sortName === 'roses' && sortType === 'up'"
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
      <div class="tbody" :class="showGridFlag ? 'grid_tbody' : ''">
        <template v-if="dataList.length">
          <vue-scroll>
            <!-- 减半区 -->
            <div
              v-if="(newcoinFlag || seecoinFlag || maincoinFlag) && halvecoinFlag && !listfilterVal"
              class="block-title a-3-bd b-2-cl"
            >
              {{ $t("trade.halving") }}
              <!-- 减半区 -->
            </div>
            <template v-for="(item, index) in dataList">
              <!-- <template v-if="cancelStoreSymbol.indexOf(item.name) === -1"> -->
              <div
                class="symbol-item a-7-bg-h"
                v-if="countSymbolItemState(item, 3) && !unsealCountSymbolItemState(item)"
                @click="switchSymbol(item.name)"
                :key="index + 'new'"
                :class="{ active: item.name === symbolCurrent }"
              >
                <span class="td-symbol b-1-cl" :title="symbolTitle(item.symbol)">
                  <i @click.stop="setMyMarket(item.name)" class="iconMy">
                    <img
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      :src="imgMap.star"
                      class="icon-20px"
                    />
                    <img v-else :src="imgMap.stared" class="icon-20px" />
                  </i>
                  {{ item.symbol.symbol | getCoinShowName(coinList) }}
                  <span class="unit_b">/{{ item.symbol.unit | getCoinShowName(coinList) }}</span>
                  <!--                  <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">-->
                  <!--                    /{{ item.symbol.unit | getCoinShowName(coinList) }}-->
                  <!--                  </template>-->
                  <span
                    class="st u-4-cl"
                    v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'"
                  >
                    (ST)
                  </span>
                  <span
                    class="multiple b-7-cl"
                    v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'"
                  >
                    {{ item.multiple }}x
                  </span>
                </span>
                <!-- 最新价 -->
                <span class="td-price b-2-cl" :class="item.close.class">
                  <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                  <b class="hover_hide" v-else>{{ item.close.data }}</b>
                  <b class="hover_show" v-if="item.close.price === -999999">--</b>
                  <b class="hover_show" v-else>{{ item.close.price }}</b>
                </span>
                <!-- 涨跌幅 -->
                <span class="td-rose b-2-cl" :class="item.rose.class">
                  <template v-if="item.rose.data === -999999"> -- </template>
                  <template v-else>
                    {{ item.rose.data }}
                  </template>
                </span>
              </div>
              <!-- </template> -->
            </template>
            <!-- 主区 -->
            <div
              v-if="(newcoinFlag || seecoinFlag || halvecoinFlag) && maincoinFlag && !listfilterVal"
              class="block-title a-3-bd b-2-cl"
            >
              {{ $t("trade.maincon") }}
            </div>
            <template v-for="(item, index) in dataList">
              <template v-if="cancelStoreSymbol.indexOf(item.name) === -1">
                <div
                  class="symbol-item a-7-bg-h"
                  v-if="countSymbolItemState(item, 0) && !unsealCountSymbolItemState(item)"
                  @click="switchSymbol(item.name)"
                  :key="index"
                  :class="{ active: item.name === symbolCurrent }"
                >
                  <span class="td-symbol b-1-cl" :title="symbolTitle(item.symbol)">
                    <i @click.stop="setMyMarket(item.name)" class="iconMy">
                      <img
                        v-if="mySymbolList.indexOf(item.name) === -1"
                        :src="imgMap.star"
                        class="icon-20px"
                      />
                      <img v-else :src="imgMap.stared" class="icon-20px" />
                    </i>
                    {{ item.symbol.symbol | getCoinShowName(coinList) }}
                    <span class="unit_b">/{{ item.symbol.unit | getCoinShowName(coinList) }}</span>
                    <!--                    <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">-->
                    <!--                      /{{ item.symbol.unit | getCoinShowName(coinList) }}-->
                    <!--                    </template>-->
                    <span
                      class="st u-4-cl"
                      v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'"
                    >
                      (ST)
                    </span>
                    <span
                      class="multiple b-7-cl"
                      v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'"
                    >
                      {{ item.multiple }}x
                    </span>
                  </span>
                  <!-- 最新价 -->
                  <span class="td-price b-2-cl" :class="item.close.class">
                    <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                    <b class="hover_hide" v-else>{{ item.close.data }}</b>
                    <b class="hover_show" v-if="item.close.price === -999999">--</b>
                    <b class="hover_show" v-else>{{ item.close.price }}</b>
                  </span>
                  <!-- 涨跌幅 -->
                  <span class="td-rose b-2-cl" :class="item.rose.class">
                    <template v-if="item.rose.data === -999999"> -- </template>
                    <template v-else>
                      {{ item.rose.data }}
                    </template>
                  </span>
                </div>
              </template>
            </template>
            <!-- 创新区 -->
            <div
              v-if="(maincoinFlag || seecoinFlag || halvecoinFlag) && newcoinFlag && !listfilterVal"
              class="block-title a-3-bd b-2-cl"
            >
              {{ $t("trade.newcon") }}
            </div>
            <template v-for="(item, index) in dataList">
              <div
                class="symbol-item a-7-bg-h"
                v-if="countSymbolItemState(item, 1) && !unsealCountSymbolItemState(item)"
                @click="switchSymbol(item.name)"
                :key="index + 'new'"
                :class="{ active: item.name === symbolCurrent }"
              >
                <span :title="symbolTitle(item.symbol)" class="td-symbol b-1-cl">
                  <i @click.stop="setMyMarket(item.name)" class="iconMy">
                    <img
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      :src="imgMap.star"
                      class="icon-20px"
                    />
                    <img v-else :src="imgMap.stared" class="icon-20px" />
                  </i>
                  {{ item.symbol.symbol | getCoinShowName(coinList) }}
                  <span class="unit_b">/{{ item.symbol.unit | getCoinShowName(coinList) }}</span>
                  <!--                  <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">-->
                  <!--                    /{{ item.symbol.unit | getCoinShowName(coinList) }}-->
                  <!--                  </template>-->
                  <span
                    class="st u-4-cl"
                    v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'"
                  >
                    (ST)
                  </span>
                  <span
                    class="multiple b-7-cl"
                    v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'"
                  >
                    {{ item.multiple }}x
                  </span>
                </span>
                <!-- 最新价 -->
                <span class="td-price b-2-cl" :class="item.close.class">
                  <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                  <b class="hover_hide" v-else>{{ item.close.data }}</b>
                  <b class="hover_show" v-if="item.close.price === -999999">--</b>
                  <b class="hover_show" v-else>{{ item.close.price }}</b>
                </span>
                <!-- 涨跌幅 -->
                <span class="td-rose b-1-cl" :class="item.rose.class">
                  <template v-if="item.rose.data === -999999"> -- </template>
                  <template v-else>
                    {{ item.rose.data }}
                  </template>
                </span>
              </div>
            </template>
            <!-- 观察区 -->
            <div
              v-if="(maincoinFlag || newcoinFlag || halvecoinFlag) && seecoinFlag && !listfilterVal"
              class="block-title a-3-bd b-2-cl"
            >
              {{ $t("trade.seecon") }}
            </div>
            <template v-for="(item, index) in dataList">
              <div
                class="symbol-item a-7-bg-h"
                v-if="countSymbolItemState(item, 2) && !unsealCountSymbolItemState(item)"
                @click="switchSymbol(item.name)"
                :key="index + 'new'"
                :class="{ active: item.name === symbolCurrent }"
              >
                <span :title="symbolTitle(item.symbol)" class="td-symbol b-1-cl">
                  <i @click.stop="setMyMarket(item.name)" class="iconMy">
                    <img
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      :src="imgMap.star"
                      class="icon-20px"
                    />
                    <img v-else :src="imgMap.stared" class="icon-20px" />
                  </i>
                  {{ item.symbol.symbol | getCoinShowName(coinList) }}
                  <span class="unit_b">/{{ item.symbol.unit | getCoinShowName(coinList) }}</span>
                  <!--                  <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">-->
                  <!--                    /{{ item.symbol.unit | getCoinShowName(coinList) }}-->
                  <!--                  </template>-->
                  <span
                    class="st u-4-cl"
                    v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'"
                  >
                    (ST)
                  </span>
                  <span
                    class="multiple b-7-cl"
                    v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'"
                  >
                    {{ item.multiple }}x
                  </span>
                </span>
                <!-- 最新价 -->
                <span class="td-price b-2-cl" :class="item.close.class">
                  <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                  <b class="hover_hide" v-else>{{ item.close.data }}</b>
                  <b class="hover_show" v-if="item.close.price === -999999">--</b>
                  <b class="hover_show" v-else>{{ item.close.price }}</b>
                </span>
                <!-- 涨跌幅 -->
                <span class="td-rose b-1-cl" :class="item.rose.class">
                  <template v-if="item.rose.data === -999999"> -- </template>
                  <template v-else>
                    {{ item.rose.data }}
                  </template>
                </span>
              </div>
            </template>
            <!-- 解封区 -->
            <div
              v-if="
                (maincoinFlag || seecoinFlag || halvecoinFlag) && unsealcoinFlag && !listfilterVal
              "
              class="block-title a-3-bd b-2-cl"
            >
              <!-- 解封区 -->
              {{ $t("trade.unseal") }}
            </div>
            <template v-for="(item, index) in dataList">
              <div
                class="symbol-item a-7-bg-h"
                v-if="unsealCountSymbolItemState(item)"
                @click="switchSymbol(item.name)"
                :key="index + 'new'"
                :class="{ active: item.name === symbolCurrent }"
              >
                <span :title="symbolTitle(item.symbol)" class="td-symbol b-1-cl">
                  <i @click.stop="setMyMarket(item.name)" class="iconMy">
                    <img
                      v-if="mySymbolList.indexOf(item.name) === -1"
                      :src="imgMap.star"
                      class="icon-20px"
                    />
                    <img v-else :src="imgMap.stared" class="icon-20px" />
                  </i>
                  {{ item.symbol.symbol | getCoinShowName(coinList) }}
                  <span class="unit_b">/{{ item.symbol.unit | getCoinShowName(coinList) }}</span>
                  <!--                  <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">-->
                  <!--                    /{{ item.symbol.unit | getCoinShowName(coinList) }}-->
                  <!--                  </template>-->
                  <span
                    class="st u-4-cl"
                    v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'"
                  >
                    (ST)
                  </span>
                  <span
                    class="multiple b-7-cl"
                    v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'"
                  >
                    {{ item.multiple }}x
                  </span>
                </span>
                <!-- 最新价 -->
                <span class="td-price b-2-cl" :class="item.close.class">
                  <b class="hover_hide" v-if="item.close.data === -999999">--</b>
                  <b class="hover_hide" v-else>{{ item.close.data }}</b>
                  <b class="hover_show" v-if="item.close.price === -999999">--</b>
                  <b class="hover_show" v-else>{{ item.close.price }}</b>
                </span>
                <!-- 涨跌幅 -->
                <span class="td-rose b-1-cl" :class="item.rose.class">
                  <template v-if="item.rose.data === -999999"> -- </template>
                  <template v-else>
                    {{ item.rose.data }}
                  </template>
                </span>
              </div>
            </template>
          </vue-scroll>
        </template>
        <!-- 暂无数据 -->
        <div v-else class="not-data">
          <img class="dark-show" width="81px" height="120px" :src="imgMap.empty" />
          <img class="light-show" width="81px" height="120px" :src="imgMap.empty_1" />
          <p>
            <!-- 暂无数据 -->
            {{ $t("trade.notData") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/market/market";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/market/market.styl";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      imgMap,
      theme: "Dark",
    };
  },
  mounted() {
    this.init();
    this.getPublicInfo();
    // 判断主题
    let bodyClass = document.querySelector("body");
    bodyClass = bodyClass.getAttribute("class");
    this.theme = bodyClass.includes("light") ? "Light" : "Dark";
    this.$bus.$on("switchTheme", (th) => {
      this.theme = th === "light" ? "Light" : "Dark";
    });
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    onClickOutside() {
      this.$emit("onClickOutside");
    },
    // 获取公共数据
    getPublicInfo() {
      this.axios({
        url: this.$store.state.url.common.public_info,
      }).then((res) => {
        const data = res.data.market;
        this.$bus.$emit("PublicInfoV4", data);
      });
    },
  },
};
</script>

<style scoped>
.trade-market-index-container.trade-market .market-symbol .grid_tbody {
  height: 723px;
}
.en_US .trade-market-index-container.trade-market .market-symbol .grid_tbody {
  height: 735px;
}
.a-21-bg {
  background-color: var(--trade-color-1);
}
.market-symbol {
  background-color: var(--trade-color-1);
}
.trade-market.trade-market-index-container {
  /*blueswap 样式修改*/
  /*border-radius: var(--borderRadius);*/
  overflow: hidden;
}
.trade-market-index-container.trade-market .market-symbol .tbody .symbol-item.active,
.trade-market-index-container.trade-market .market-symbol .tbody .symbol-item:hover {
  background: var(--color-Hover) !important;
}

.market-header /deep/.a-2-bd {
  border-color: var(--color-Input-border);
  border-radius: 4px;
}
.market-header /deep/.input-find-content {
  width: 305px;
  background: var(--trade-color-2);
}
.trade-market-index-container.trade-market .market-title li.selected {
  /*border-color: var(--mainColor);*/
  color: #528eff;
  /* border: 1px solid transparent; */
}
.trade-market-index-container.trade-market .market-title li:hover {
  color: var(--color-text-primary);
}

/*blueswap 样式修改*/
.trade-market-index-container.trade-market {
  width: 100%;
}

.unit_b {
  color: #848e9c;
}

.td-symbol {
  white-space: nowrap;
}
.trade-market-index-container.trade-market .market-header {
  padding-top: 24px;
  margin-bottom: 12px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(0, var(--color-Input-border) 0%, var(--color-Input-border) 100%)
    center bottom / 100% 1px no-repeat;
}
.trade-market-index-container.trade-market .market-symbol .tbody .symbol-item {
  display: flex;
  box-sizing: border-box;
  padding: 16px 20px;
}
.trade-market-index-container.trade-market .market-symbol .td-symbol {
  width: 130px;
  white-space: inherit;
}
.trade-market-index-container.trade-market .market-symbol .tbody .symbol-item span {
  line-height: 16px;
}
.trade-market-index-container.trade-market .market-symbol .thead {
  display: flex;
  align-items: center;
}
.trade-market-index-container.trade-market .market-symbol .thead span {
  display: flex;
  align-items: center;
}
.trade-market-index-container.trade-market .market-symbol .thead .td-price {
  justify-content: flex-start;
  padding-left: 20px;
}
.trade-market-index-container.trade-market .market-symbol .thead .td-rose {
  justify-content: flex-end;
}
.not-data p {
  margin-top: 20px;
}
.sorte path.active {
  fill: var(--color-text-primary);
}
</style>
