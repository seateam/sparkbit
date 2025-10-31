<!-- 币币交易 实时成交 -->
<template>
  <div class="coNewTrade-container">
    <!--<div class="block-header a-3-bd a-21-bg">-->
    <!--  <span class="h4 b-1-cl">-->
    <!--    &lt;!&ndash; 实时成交 &ndash;&gt;-->
    <!--    {{ $t("futures.newTrade.text1") }}-->
    <!--  </span>-->
    <!--</div>-->
    <div class="block-content">
      <div v-if="theadList && theadList.length" class="thead a-3-bd e-2-cl">
        <span
          v-for="(item, index) in theadList"
          :key="'thead' + index"
          :style="{ width: cellWidth[index] + 'px' }"
        >
          {{ item }}
        </span>
      </div>
      <div class="m-noLogin" v-if="!isLogin && activeIndex === 1">
        <!-- 请 -->
        {{ $t("futures.orderList.tstext1") }}
        <span class="b-4-cl" @click="goPage('login')">
          <!-- 登录/注册 -->
          {{ $t("futures.orderList.tstext2") }}
        </span>
        <!-- 再进行操作 -->
        {{ $t("futures.orderList.tstext3") }}
      </div>
      <div v-else class="tbody">
        <vue-scroll>
          <!-- 改，2022.09.22，e-2-cl -> b-1-cl -->
          <div
            class="symbol-item a-21-bg-h b-1-cl"
            :class="{
              'change-item': item.change,
            }"
            v-for="(item, index) in calDataList"
            :key="kyes(item, index)"
          >
            <!--<div class="bg a-21-bg"></div>-->
            <!-- 价格 -->
            <span
              class="td-symbol"
              @click="handelPrice(item.price)"
              :class="item.side"
              :style="{ width: cellWidth[0] + 'px' }"
            >
              {{ thousandsComma(item.price) }}
              <!-- <b class="hover_show">{{item.rate}}</b> -->
            </span>
            <!-- 成交量 -->
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              {{ thousandsComma(item.vol) }}
            </span>
            <!-- 时间 -->
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              {{ item.time }}
            </span>
          </div>
          <div
            class="symbol-item a-21-bg-h b-1-cl"
            :key="index + 'diff'"
            v-for="index in differNUmber"
          >
            <span class="td-symbol" :style="{ width: cellWidth[0] + 'px' }"> -- </span>
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }"> -- </span>
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }"> -- </span>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/newTrade/newTrade";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/newTrade/newTrade.styl";
import axios from "@/api/http/axios";

export default {
  mixins: [mixin],
  data() {
    return {
      historyOrder: [],
    };
  },
  mounted() {
    this.init();
    this.getOrderListData();
  },
  props: {
    activeIndex: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    // 当前合约ID
    contractId() {
      return this.$store.state.future.contractId;
    },
    calDataList() {
      const { activeIndex } = this;
      if (activeIndex === 0) {
        return this.dataList;
      }
      if (activeIndex === 1) {
        return this.historyOrder;
      }
    },
  },
  watch: {
    contractId() {
      this.getOrderListData();
    },
    activeIndex(val) {
      if (val === 1) {
        this.getOrderListData();
      }
    },
  },
  methods: {
    // 获取订单历史
    getOrderListData() {
      const url = this.$store.state.url.futures.getTradeInfo;
      axios({
        url,
        method: "post",
        hostType: "co",
        params: {
          contractId: this.contractId,
        },
      }).then((rs) => {
        if (rs.code === "0") {
          let dataList = rs.data.tradeList;
          const today = new Date().setHours(0, 0, 0, 0);
          dataList = dataList
            .filter(
              (item) =>
                // return (item.status === 2) && (item.ctime >= today && item.ctime < today + 24 * 60 * 60 * 1000)
                true
            )
            .map((item) => {
              const date = new Date(item.ctime);
              let hh = date.getHours();
              let mm = date.getMinutes();
              let ss = date.getSeconds();
              hh = hh > 9 ? hh : `0${hh}`;
              mm = mm > 9 ? mm : `0${mm}`;
              ss = ss > 9 ? ss : `0${ss}`;
              return {
                price: item.price,
                vol: item.volume,
                time: `${hh}:${mm}:${ss}`,
                side: item.side === "BUY" ? "u-1-cl" : "u-4-cl",
              };
            });
          this.historyOrder = dataList;
          setTimeout(() => {
            this.differNUmber = 29 - dataList.length > 0 ? 29 - dataList.length : 0;
          });
        }
      });
    },
  },
};
</script>
<style scoped>
@import "../../../assets/css/flicker-animation.css";
.coNewTrade-container .block-header {
  border-top-width: 1px;
  border-top-style: solid;
}
.coNewTrade-container .thead {
  display: flex;
  align-items: center;
  border-color: transparent;
}
.coNewTrade-container .tbody .symbol-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.8;
}
.coNewTrade-container .tbody .symbol-item > .td-rose {
  box-sizing: border-box;
  /* padding-right: 6px; */
}
.coNewTrade-container .tbody .symbol-item > .td-price {
  text-align: center;
}

.coNewTrade-container .tbody {
  height: 270px;
}
.m-noLogin {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-noLogin > span {
  cursor: pointer;
  padding: 0 4px;
}
.coNewTrade-container {
  height: 250px;
  overflow: hidden;
}
.coNewTrade-container .tbody .symbol-item > .td-price,
.coNewTrade-container .tbody .symbol-item > .td-rose {
  color: var(--tr--color-text-primary);
}
.coNewTrade-container {
  height: auto;
  overflow: unset;
}
</style>
