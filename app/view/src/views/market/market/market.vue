<template>
  <!-- 改，2022.10.24，a-5-bg -> -->
  <div class="market-component">
    <div class="market-tab a-3-bd">
      <ul class="marketUl" ref="marketUl">
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
      </ul>
      <!--改，2022.12.20 删除类名 c-4-bg a-2-bd-->
      <div class="search">
        <img v-if="theme === 'Dark'" class="icon-serach" :src="imgMap.search" />
        <img v-if="theme === 'Light'" class="icon-serach" :src="imgMap.search_1" />
        <input
          v-model="listfilter"
          ref="serachInp"
          class="search-input b-1-cl"
          type="text"
          :placeholder="$t('home.searchSy')"
        />
      </div>
    </div>
    <div class="market-sub-tab a-3-bd" v-if="false">
      <span
        class="market-tab-item"
        :class="{ 'active f-1-cl a-4-bg': blockKey === 'all' }"
        @click="switchKey('all')"
      >
        <!-- 全部行情 -->
        {{ $t("market.allMarket") }}
      </span>
      <template v-for="(item, nindex) in tableData">
        <span
          class="market-tab-item"
          :class="{ 'active f-1-cl a-4-bg': blockKey === item.titleIndex }"
          @click="switchKey(item.titleIndex)"
          v-if="Object.keys(tableData).length > 1"
          :key="nindex"
        >
          {{ item.title }}
        </span>
      </template>
    </div>

    <div class="market-table">
      <ul class="table-thead a-3-bd">
        <li :style="`width: ${item.width}`" v-for="(item, index) in columns" :key="index">
          <span class="thead-label" :class="item.sortable ? 'sortable' : ''" @click="sort(item)">
            {{ item.title }}
            <div v-if="item.sortable && item.key">
              <svg
                v-if="item.key === sortValue && sortSell"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path class="active" d="M10 5L6 9H14L10 5Z" fill="#ffffff" />
                <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
              </svg>
              <svg
                v-else-if="item.key === sortValue && !sortSell"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
                <path class="active" d="M10 15L6 11H14L10 15Z" fill="#ffffff" />
              </svg>
              <svg
                v-else
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 5L6 9H14L10 5Z" fill="#999999" />
                <path d="M10 15L6 11H14L10 15Z" fill="#999999" />
              </svg>
            </div>
          </span>
        </li>
      </ul>
      <div class="home-loading" v-if="tableLoading">
        <div class="loading-page">
          <c-loading size="45" />
        </div>
      </div>
      <div v-else>
        <div class="home-nodata" v-if="!tableData.length">
          <img class="dark-show" width="81px" height="120px" :src="imgMap.empty" />
          <img class="light-show" width="81px" height="120px" :src="imgMap.empty_1" />
          <p>
            <!-- 暂无数据 -->
            {{ $t("common.notData") }}
          </p>
        </div>
        <div v-else class="table-tbody-box">
          <template v-for="(Fitem, Findex) in tableData">
            <div
              class="table-tbody"
              v-if="Fitem.titleIndex === blockKey || blockKey === 'all'"
              :key="Findex"
            >
              <div>
                <!-- 2023.05.24 去掉分区-->
                <!--<div-->
                <!--  class="table-tbody-title a-3-bd"-->
                <!--  v-if="Object.keys(tableData).length > 1 && !listfilter"-->
                <!--&gt;-->
                <!--  <span class="lable a-3-bd">{{ Fitem.title }}</span>-->
                <!--</div>-->

                <ul class="table-tbody-list">
                  <li
                    class="table-tbody-li a-3-bd f-1-cl"
                    v-for="(item, index) in Fitem.data"
                    :key="index"
                    @click.stop="bandLink(item.id)"
                  >
                    <!-- 币对 -->
                    <div
                      class="even"
                      :style="`width: ${columns[0].width}`"
                      style="height: 57px; display: flex; align-items: center"
                    >
                      <span
                        v-html="item.data[0][0].iconSvg"
                        class="marketIcon"
                        @click.stop="marketClick(item.id)"
                      ></span>
                      <span
                        v-html="item.data[0][1].iconSvg"
                        class="evenSymbol"
                        style="display: flex; align-items: center; cursor: unset"
                      ></span>
                      <span
                        v-if="item.etfOpen && marketCurrent !== 'ETF'"
                        class="eft-class u-8-bd u-8-cl"
                      >
                        ETF
                      </span>
                    </div>
                    <div class="even" :style="`width: ${columns[1].width}`">
                      {{ item.data[1][0].text }}
                    </div>
                    <!-- 涨跌幅 -->
                    <div class="even" :style="`width: ${columns[2].width}`">
                      <div :class="[...item.data[2][0].classes]">{{ item.data[2][0].text }}</div>
                    </div>
                    <div class="even" :style="`width: ${columns[3].width}`">
                      {{ item.data[3][0].text }}
                    </div>
                    <div class="even" :style="`width: ${columns[4].width}`">
                      {{ item.data[4][0].text }}
                    </div>
                    <div class="even" :style="`width: ${columns[5].width}`">
                      {{ item.data[5][0].text }}
                    </div>
                    <div class="even ctrlList" :style="`width: ${columns[6].width}`">
                      <!--<div class="ctrl" @click="showDetail(item.id)">Detail</div>-->
                      <div class="ctrl" @click.stop="linkToTrade(item.showName)">
                        {{ $t("h5Add.tradeList1") }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <!--<div class="m-showMore" @click="linkToTrade()">-->
          <!--  <span>view more</span>-->
          <!--  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.71967 0.96967C1.01256 0.676777 1.48744 0.676777 1.78033 0.96967L6.28033 5.46967C6.57322 5.76256 6.57322 6.23744 6.28033 6.53033L1.78033 11.0303C1.48744 11.3232 1.01256 11.3232 0.71967 11.0303C0.426777 10.7374 0.426777 10.2626 0.71967 9.96967L4.68934 6L0.71967 2.03033C0.426777 1.73744 0.426777 1.26256 0.71967 0.96967Z" fill="#316AD5"/>-->
          <!--  </svg>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/market/market/market";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/market/market/market.styl";
import { imgMap } from "@/utils";
import Charts from "../charts/china.vue";

export default {
  mixins: [mixin],
  components: {
    Charts, // 改，2022.11.23 新增chart引用
  },
  data() {
    return {
      imgMap,
      // 改，2022.11.23 新增 chartData 存放chart数据
      chartData: {},
      theme: "Dark",
    };
  },
  mounted() {
    this.init();
    // 改， 2022.11.23 调用getChartData
    // this.getChartData();
    // 判断主题
    let bodyClass = document.querySelector("body");
    bodyClass = bodyClass.getAttribute("class");
    this.theme = bodyClass.includes("light") ? "Light" : "Dark";
    this.$bus.$on("switchTheme", (th) => {
      this.theme = th === "light" ? "Light" : "Dark";
    });
  },
  methods: {
    showDetail(id) {
      this.bandLink(id);
      this.$emit("showDetail", "");
    },
    // 改， 2022.11.23 新增 getChartData 监听获取chart数据
    getChartData() {
      this.$bus.$on("RECOMMEEND_KLINE_DATA_MARKET2", (data) => {
        this.chartData = data;
      });
    },
    linkToTrade(name) {
      if (!name) {
        this.$router.push(`/trade`);
        return;
      }
      const symbol = name.replace("/", "_");
      this.$router.push(`/trade/${symbol}`);
    },
  },
};
</script>

<style scoped lang="stylus">
  .common-table {
    background: none;
  }

  .search {
    display: flex;
    align-items: center;
    margin-left: auto;
    height: 40px;
    line-height: 40px;
    width: 292px;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    .icon-serach {
      margin: auto 12px auto 16px;
    }

    .search-input {
      flex: 1;
      font-size: 14px
      font-weight: 500;
      line-height: 18px;
      border: none;
    }

    input::-webkit-input-placeholder {
      color: #999;
      font-weight: 500;
    }
  }

  .table-body td .rose-label {
    display: inline-block;
    width: 70px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    padding: 0;
  }
  .table-body td .symbolName, .table-body td .icon-btn {
    padding: 0;
    vertical-align: inherit;
    margin: 0;
    display: inline-block;
    font-weight: 600;
  }
  .table-body td .symbolName {
    width: 80%;
    margin-left: 10px;
  }

  .fontSize14 {
    font-size: 14px;
  }

.inter-tableContent{
  width: 1180px;
  margin: 0 auto 0 auto;
}
// 改，2022.11.24 表格修改样式
.market-table .table-thead {
  font-size: 14px;
  font-weight: 500;
  height: 44px;
}
.market-table .table-thead li {
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.market-table .table-thead li div {
  display: flex;
  align-items: center;
}
.market-table .table-thead li div path.active {
  fill: var(--color-text-primary);
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even{
  text-align: center;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even:last-child,
.market-table .table-thead li:last-child
{
  width: 10%;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even:first-child{
  width: 19%;

}
.market-table .table-thead li:first-child{
  width: 16%;
}
</style>
<style scoped>
/* 改，2022.12.20 修改样式 */
.market-component .market-tab .marketUl li.selected::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.market-component .market-tab .search {
  border-color: var(--color-Input-border);
}
.market-component .market-tab .search:hover {
  border-color: var(--color-BTN-secondary-border);
}
.market-component .market-tab {
  border-color: var(--color-Input-border);
  height: 55px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}
.market-component .market-tab .marketUl li {
  box-sizing: border-box;
  height: 55px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 55px;
  text-align: center;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
}

.market-component .market-tab .marketUl li.selected {
  color: var(--color-1);
  border: none;
}
.market-component .market-tab .marketUl li:hover {
  color: var(--color-text-primary);
}
.market-table .table-thead {
  height: 44px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-text-secondary);
  border-color: var(--color-14);
}
.market-table .table-thead li span {
  display: flex;
  align-items: center;
}

.market-table .table-thead li:first-child {
  text-align: left;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-1);
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even .t-1-g {
  color: var(--color-Positive);
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even .t-1-r {
  color: var(--color-Negative);
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even.ctrlList {
  display: flex;
  align-items: center;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even > .ctrl {
  display: flex;
  height: 40px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  border-radius: 100px;
  background: var(--BTN-primary, #6a60ff);
}
.market-table .table-tbody .table-tbody-list .table-tbody-li {
  height: 70px;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li:hover {
  background: var(--color-Hover);
}

.m-showMore {
  width: 131px;
  height: 36px;
  border: 1px solid #316ad5;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  text-transform: capitalize;
  color: #316ad5;
  margin: 21px auto auto;
  cursor: pointer;
  user-select: none;
}
.m-showMore > span {
  padding-right: 10px;
}
.market-table {
  padding-bottom: 42px;
}

.market-table .table-tbody-box {
  transition: unset;
  box-sizing: border-box;
}
.table-tbody-box .table-tbody {
  padding: 0;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li {
  padding-right: 0;
  display: flex;
  align-items: center;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even {
  text-align: left;
}
.market-table .table-tbody .table-tbody-list .table-tbody-li .even.ctrlList {
  justify-content: flex-end;
}
.market-table .table-thead {
  padding: 0;
  display: flex;
  align-items: center;
}
.market-table .table-thead > li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.market-table .table-thead li:first-child {
  justify-content: flex-start;
}
</style>
