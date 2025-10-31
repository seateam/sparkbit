<template>
  <!-- 改，2022.12.20 修改背景色，删除a-8-bg -->
  <div class="marketPage ">

    <div class="m-head">
      <div class="title">{{ $t("replenish.market.Markets") }}</div>
      <!--<div class="subTxt">-->
      <!--  <span>All price information is in USD</span>-->
      <!--  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <path d="M9.86422 9.9733C8.66311 11.511 6.33689 11.511 5.13578 9.9733L1.3266 5.09675C-0.211941 3.12709 1.19148 0.25 3.69082 0.25H11.3092C13.8085 0.25 15.2119 3.12708 13.6734 5.09674L9.86422 9.9733Z" fill="#D9D9D9" fill-opacity="0.3"/>-->
      <!--  </svg>-->
      <!--</div>-->
      <div class="m-recommend">
        <div class="coinList">
          <div class="item">
            <div class="title">
              <img :src="imgMap.market_img1">
              {{ $t("replenish.market.HighlightCoin") }}
            </div>
            <template v-if="coinList(1).length">
              <div @click="linkTo(`/trade/${item.showSymbol.symbol}_${item.showSymbol.unit}`)" class="coin" v-for="item in coinList(1)">
                <img class="icon" :src="item.icon">
                <div class="name">{{item.showSymbol.symbol}}</div>
                <div class="price">${{ item.closes }}</div>
                <div class="percent" :class="item.rose.class">{{ item.roses }}</div>
              </div>
            </template>
          </div>
          <div class="item">
            <div class="title">
              <img :src="imgMap.market_img2">
              {{ $t("replenish.market.Gainers") }}
            </div>
            <template v-if="usdtGainersList(1).length">
              <div
                @click="linkTo(`/trade/${item.showSymbol.symbol}_${item.showSymbol.unit}`)"
                class="coin"
                v-for="(item, index) in usdtGainersList(1)"
                v-if="index < 3 && item"
              >
                <img class="icon" :src="calCoinIcon(item.showSymbol.symbol)">
                <div class="name">{{item.showSymbol.symbol}}</div>
                <div class="price">${{ item.closes }}</div>
                <div class="percent" :class="item.rose.class">{{ item.roses }}</div>
              </div>
            </template>
          </div>
          <div class="item">
            <div class="title">
              <img :src="imgMap.market_img3">
              {{ $t("replenish.market.NewListing") }}
            </div>
            <template v-if="calDataList(2).length">
              <div
                @click="linkTo(`/trade/${item.showSymbol.symbol}_${item.showSymbol.unit}`)"
                class="coin"
                v-for="(item, index) in calDataList(2)"
                v-if="index < 3 && item"
              >
                <img class="icon" :src="calCoinIcon(item.showSymbol.symbol)">
                <div class="name">{{item.showSymbol.symbol}}</div>
                <div class="price">${{ item.closes }}</div>
                <div class="percent" :class="item.rose.class">{{ item.roses }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>


    <!-- 推荐位 -->
    <!--<RecommendHome v-if="headerSymbol.length" :dataList="recommendDataList" />-->

    <!-- 推荐位 -->
    <!-- 改，2022.10.24，新增style -->
    <!--<div-->
    <!--  class="recommend-infor a-6-bg"-->
    <!--  style="margin-right: 5px; margin-top: 198px"-->
    <!--  v-show="isShowRecommend"-->
    <!--&gt;-->
    <!--  <vue-scroll>-->
    <!--    <Recommend />-->
    <!--  </vue-scroll>-->
    <!--  &lt;!&ndash; 改，2022.10.24，a-5-bg -> a-6-bg &ndash;&gt;-->
    <!--  <div class="close-recommend a-6-bg" @click="closeRecommend">-->
    <!--    <svg class="icon icon-16" aria-hidden="true">-->
    <!--      <use xlink:href="#icon-c_7"></use>-->
    <!--    </svg>-->
    <!--  </div>-->
    <!--</div>-->
    <!-- 24小时行情 -->
    <div class="market-block">
      <div class="wrap">
        <Market @showDetail="dialogFlag = true" :dataList="marketDataList" :marketCurrent="marketCurrent" @getCreateArea="getCreateArea"/>
      </div>
    </div>
    <!--详情弹窗-->
    <c-dialog
      :showFlag="dialogFlag"
      titleText="detail"
      @close="dialogFlag = false"
      @confirm="dialogFlag = false"
    >
      <Recommend v-if="dialogFlag"/>
    </c-dialog>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/market/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/market/index/index.styl";
import { imgMap } from "@/utils";
import Market from "./market/market.vue";
import Recommend from "./recommend/china.vue";

import RecommendHome from "../home/recommend/china.vue";

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Market,
    RecommendHome,
  },
  data() {
    return {
      createAreaList: [],
      dialogFlag: false,
      imgMap: {
        market_img1: imgMap.market_img1,
        market_img2: imgMap.market_img2,
        market_img3: imgMap.market_img3,
      },
    };
  },
  computed: {
    market() {
      return this.$store.state.baseData.market;
    },
    coinList() {
      return (type) => {
        const { headerSymbol } = this;
        const { marketDataObj } = this;
        const { coinList } = this.market;
        const list = [];
        const start = type === 1 ? 0 : 3;
        const end = type === 1 ? 3 : Math.min(7, headerSymbol.length);
        if (type === 2 && headerSymbol.length < 3) {
          return [];
        }
        for (let i = start; i < end; i++) {
          if (marketDataObj && marketDataObj[headerSymbol[i]]) {
            const item = marketDataObj[headerSymbol[i]];
            const symbol = (item.showSymbol.symbol).toUpperCase();
            item.icon = coinList[symbol] ? coinList[symbol].icon : "";
            list.push(marketDataObj[headerSymbol[i]]);
          }
        }
        return list;
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
    // 获取创新区数据
    getCreateArea(e) {
      let list = e || [];
      const { coinList } = this.market;
      list = list.map((item) => {
        item.showName = item.showName.split("/");
        item.showName = item.showName[0];
        const curI = coinList[item.showName];
        item.icon = curI.icon;
        item.price = item.data[1][0];
        item.range = item.data[2][0];
        return item;
      });
      this.createAreaList = list;
    },
  },
};
</script>
<style scoped>
.marketPage {
  background: linear-gradient(0, #000 0%, #000 100%) center top / 100% 396px no-repeat,
    var(--color-28);
}
.m-title {
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 24px;
  color: var(--color-1);
  padding: 28px 0 28px 28px;
  background: #181A1F;
  text-align: left;
}
/* 2022.12.20 修改推荐样式 */
/deep/.recommend .recommend-wrap .recommend-content {
  background: #181A1F;
  border-radius: 8px;
}
/* 2022.12.20 修改表格样式 */
/deep/.marketPage .market-block {
  background: #181A1F;
  overflow: hidden;
}
/deep/.a-6-bg {
  background: #181A1F;
}
/deep/.market-table .table-tbody .table-tbody-list .table-tbody-li {
  border-width: 0;
}


.m-head {
  width: 82.39vw;
  height: 396px;
  box-sizing: border-box;
  padding: 40px 0;
  margin: auto;
}
.m-head > .title {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #fff;
}
.m-head > .subTxt {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--color-2);
  display: flex;
  align-items: center;
  margin-top: 7px;
}
.m-head > .subTxt > span {
  padding-right: 6px;
}

.m-recommend {
  width: 100%;
  margin-top: 40px;
}
.m-recommend > .coinList {
  display: flex;
  justify-content: space-between;
}
.m-recommend > .coinList > .item {
  flex: 1;
  border-radius: 16px;
  background: #121212;
  border: 1px solid rgba(51, 51, 51, 1);
  box-sizing: border-box;
  padding: 8px 0;
}
.m-recommend > .coinList > .item:not(:last-child) {
  margin-right: 24px;
}
.m-recommend > .coinList > .item > .title {
  font-style: normal;
  height: 32px;
  padding: 16px 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #fff;
  display: flex;
  align-items: center;
}
.m-recommend > .coinList > .item > .title > img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.m-recommend > .coinList > .item > .coin {
  display: flex;
  align-items: center;
  height: 52px;
  font-style: normal;
  cursor: pointer;
  padding: 0 20px;
}
.m-recommend > .coinList > .item > .coin:hover {
  background: #ffffff14;
}

.m-recommend > .coinList > .item > .coin > .icon {
  width: 28px;
  height: 28px;
  margin-right: 12px;
}
.m-recommend > .coinList > .item > .coin > .name {
  width: 100px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
}
.m-recommend > .coinList > .item > .coin > .price {
  flex: 1;
  margin-block: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
}
.m-recommend > .coinList > .item > .coin > .percent {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}

.marketPage .market-block > .wrap{
  width: 82.39vw;
  margin: auto;
  padding-top: 8px;
}
@media screen and (min-width: 1560px) {
  .marketPage .market-block {
    padding-right: 0;
  }
}

.m-recommend > .coinList > .item > .coin > .icon {
  border-radius: 50%;
}
</style>
