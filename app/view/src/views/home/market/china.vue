<template>
  <div class="tableContent">
    <!-- 改，2022.08.28，style -->
    <div class="market-title-box c-3-bg c-5-bd" style="display: flex; align-items: center">
      <ul class="market-title" ref="marketUl">
        <template v-if="!isCoOpen">
          <li
            class="c-8-bd"
            :class="{ 'selected f-1-cl': 'myMarket' === marketCurrent }"
            @click="switchMarket('myMarket')"
          >
            {{ $t("home.marketSet") }}
          </li>

          <li
            v-for="(item, index) in marketAllList"
            :key="index"
            :class="{ 'selected f-1-cl': marketCurrent === item }"
            @click="switchMarket(item)"
            class="a-12-bd"
          >
            {{ item | getCoinShowName(coinList) }}
          </li>
        </template>

        <template v-else>
          <li
            v-for="(item, index) in coMmarketAllList"
            :key="index"
            :class="{ 'selected f-1-cl': marketCurrent === item.type }"
            @click="switchMarket(item)"
            class="a-12-bd"
          >
            {{ item.name }}
          </li>
        </template>
      </ul>

      <!-- 搜索框 -->
      <div class="search c-5-bd">
        <i class="icon-serach f-2-cl">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_12"></use>
          </svg>
        </i>
        <input
          v-model="listfilter"
          ref="serachInp"
          class="search-input f-2-cl"
          type="text"
          :placeholder="$t('home.searchSy')"
        />
      </div>
    </div>

    <div class="home-table">
      <ul class="home-thead">
        <li v-for="(item, index) in columns" :key="index">
          <span class="thead-label" :class="item.sortable ? 'sortable' : ''" @click="sort(item)">
            {{ item.title }}
            <svg v-if="item.sortable" aria-hidden="true" class="icon icon-14">
              <!-- #icon-a_17 -->
              <use xlink :href="item.key | sortIcon(sortValue, sortSell)"></use>
            </svg>
          </span>
        </li>
      </ul>

      <div class="home-loading" v-if="tableLoading">
        <div class="loading-page"><c-loading size="45" /></div>
      </div>

      <div v-else>
        <div class="home-nodata" v-if="!tableData.length">
          <svg class="icon icon-50" aria-hidden="true">
            <use xlink:href="#icon-g_2"></use>
          </svg>
          <p>
            <!-- 暂无数据 -->
            {{ $t("common.notData") }}
          </p>
        </div>

        <div class="home-tbody" v-for="(Fitem, Findex) in tableData" :key="Findex" v-if="Findex < 1">
          <div>
            <div
              class="home-tbody-title c-5-bd"
              v-if="Object.keys(tableData).length > 1 && !listfilter && false"
            >
              <span class="lable c-5-bd">{{ Fitem.title }}</span>
            </div>
            <ul class="home-tbody-list">
              <!-- 改，2022.08.28，market_hover -->
              <!-- 改，2022.11.02，移动click从evenSymbol至li，新增style -->
              <li
                class="market_hover home-tbody-li c-5-bd f-1-cl"
                style="cursor: pointer"
                v-for="(item, index) in Fitem.data"
                :class="lineClassesH(`${Findex}-${index}`)"
                :key="index"
                @mouseenter="enter(`${Findex}-${index}`)"
                @mouseleave="leave"
                @click="bandLink(item.id, isCoOpen ? item.id : item.etfOpen)"
                v-if="index < 3"
              >
                <!-- 币对 -->
                <!-- 改，2022.11.02，新增style -->
                <div class="even" style="height: 80px; display: flex; align-items: center">
                      <span
                        v-html="item.data[0][0].iconSvg"
                        class="marketIcon"
                        @click.stop="marketClick(item.id)"
                      >
                      </span>
                  <span
                    v-html="item.data[0][1].iconSvg"
                    class="evenSymbol"
                    style="display: flex; align-items: center; cursor: unset"
                  >
                      </span>
                  <span
                    v-if="item.etfOpen && marketCurrent !== 'ETF'"
                    class="eft-class u-8-bd u-8-cl"
                  >
                        ETF
                      </span>
                </div>
                <!-- 最新价 -->
                <!-- 改，2022.11.02，新增style -->
                <!-- 改，2022.11.08，注释 -->
                <!-- <div
                  class="even newPrice"
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 80px;
                    padding-top: 0px;
                  "
                >
                  <p class="price">{{ item.data[1][0].text }}</p>
                  <p class="b-2-cl" style="font-size: 12px">
                    {{ item.data[1][0].subContent.text }}
                  </p>
                </div> -->
                <!-- 改，2022.11.08，新增 -->
                <div class="even">{{ item.data[1][0].text }}</div>
                <!-- 涨跌幅 -->
                <div class="even">
                  <div :class="[...item.data[2][0].classes]">{{ item.data[2][0].text }}</div>
                </div>
                <div class="even">{{ item.data[3][0].text }}</div>
                <!-- 改，2022.11.24 展示24H交易额展示为chart图-->
                <!--<div class="even">{{ item.data[4][0].text }}</div>-->
                <!--改，2022.12.16 新增类名 class="chart" -->
                <!--<div class="even chart">-->
                <!--  &lt;!&ndash;{{chartData[item.id]}}&ndash;&gt;-->
                <!--  <charts-->
                <!--    ref="charts"-->
                <!--    style="width: 100px"-->
                <!--    :key="item.id + 'recommend'"-->
                <!--    height="40px"-->
                <!--    :dataList="chartData[item.id]"-->
                <!--    :name="item.id + 'recommend'"-->
                <!--    :style-object="{-->
                <!--        height: '40px',-->
                <!--        width: '80px',-->
                <!--     }"-->
                <!--    :haveBg="false"-->
                <!--    :klineColor="calKlineColor(item.data[2][0].text)"-->
                <!--  />-->
                <!--</div>-->
                <!-- 改，2022.11.08，注释 -->
                <!-- <div class="even">{{ item.data[5][0].text }}</div>
                <div class="even">{{ item.data[6][0].text }}</div> -->
                <div
                  class="even"
                  style="
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                  "
                >
                  <!--改，2022.11.24 修改样式＋box-sizing: border-box;margin-right: 10%;-->
                  <!--改，2022.12.16 新增类名 class="btn" -->
                  <div class="btn">{{ $t('h5Add.tradeList1') }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/market/market";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/home/market/market.styl";
import Charts from "../charts/china.vue";

export default {
  mixins: [commonMixin],
  components: {
    Charts, // 改，2022.11.23 新增chart引用
  },
  data() {
    return {
      // 改，2022.11.23 新增 chartData 存放chart数据
      chartData: {},
    };
  },
  created() {
    this.init();
    // 改， 2022.11.23 调用getChartData
    this.getChartData();
  },
  computed: {
    calKlineColor() {
      return (val) => {
        val = +val.replace("%", "") || 0;
        if (val > 0) {
          return "#05C984";
        }
        return "#EC2747";
      };
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  methods: {
    // 改， 2022.11.23 新增 getChartData 监听获取chart数据
    getChartData() {
      this.$bus.$on("RECOMMEEND_KLINE_DATA_MARKET2", (data) => {
        if (this.chartData && Object.values(this.chartData).length === 0) {
          this.chartData = data;
        }
      });
    },
  },
};
</script>

<style>
.market_hover:hover {
  background: #232222;
}
</style>
<style scoped>
/* 改，2022.11.24 表格修改样式 */
.home-table {
  border-radius: 12px;
  background: var(--color-3);
  overflow: hidden;
}
.home-table .home-tbody {
  background: var(--color-3);
}
.home-table .home-thead {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-7);
  height: 40px;
  display: flex;
  align-items: center;
}
.home-table .home-thead li {
  line-height: 40px;
  text-align: center;
}
.home-table .home-tbody .home-tbody-list .home-tbody-li {
  background: var(--color-3);
}
.home-table .home-tbody .home-tbody-list .home-tbody-li .even{
  text-align: center;
}
/* 改，2022.12.16 修改样式 */
.home-table .home-tbody .home-tbody-list .home-tbody-li .even > .btn {
  background-color: var(--color-8);
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
  box-sizing: border-box;
  margin-right: 10%;
}
.home-table .home-tbody .home-tbody-list .home-tbody-li .even.chart {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0;
}
.tableContent .search {
  width: 240px;
  height: 38px;
  line-height: 38px;
  border: 1px solid var(--color-7);
}
.tableContent .market-title-box {
  padding-bottom: 24px;
  background-color: var(--color-4);
  border-width: 0;
  padding-left: 0;
}
.home-table .home-thead,
.home-table .home-tbody .home-tbody-list .home-tbody-li{
  border-width: 0;
  display: flex;
  align-items: center;
}
.home-table .home-tbody .home-tbody-list .home-tbody-li .even {
  font-size: 16px;
  color: var(--color-1);
}
.home-table .home-tbody .home-tbody-list .home-tbody-li .even:nth-child(1),
.home-table .home-thead li:nth-child(1) {
  width: 20%;
}
.home-table .home-tbody .home-tbody-list .home-tbody-li .even:nth-child(2),
.home-table .home-thead li:nth-child(2) {
  width: 20%;
}
.home-table .home-thead li:nth-child(3),
.home-table .home-tbody .home-tbody-list .home-tbody-li .even:nth-child(3) {
  width: 20%;
}
.home-table .home-thead li:nth-child(4),
.home-table .home-tbody .home-tbody-list .home-tbody-li .even:nth-child(4) {
  width: 20%;
}
.home-table .home-thead li:first-child {
  text-align: left !important;
}

.tableContent .market-title li.selected {
  border-color: var(--mainColor);
  color: var(--mainColor);
}
.tableContent .market-title {
  font-size: 20px;
  color: rgba(86, 86, 86, 1);
}
</style>
