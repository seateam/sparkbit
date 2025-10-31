<!-- 币币交易 实时成交 -->
<template>
  <div class="newTrade newTrade-index-container" :class="newTradeClass">
    <div class="block-header a-3-bd">
      <span class="h4" :class="{ actived: activeIndex === 0 }" @click="activeIndex = 0">
        <!-- 实时成交 -->
        {{ $t("trade.latestDeal") }}
      </span>
      <span
        v-if="isLogin"
        class="h4"
        :class="{ actived: activeIndex === 1 }"
        @click="activeIndex = 1"
      >
        {{ langTxt.txt1 }}
      </span>
    </div>
    <div class="block-content">
      <div v-if="theadList && theadList.length" class="thead a-3-bd b-2-cl">
        <span
          v-for="(item, index) in theadList"
          :key="'thead' + index"
          :class="'td-symbol' + index"
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
      <div v-else class="tbody newTrade-tbody" :class="showGridFlag ? 'grid-newTrade-tbody' : ''">
        <vue-scroll>
          <!-- 改，2022.09.22，b-2-cl -> b-1-cl -->
          <div
            class="symbol-item a-7-bg-h b-1-cl"
            v-for="(item, index) in calDataList"
            :key="kyes(item, index)"
          >
            <div v-if="flashSwitchs" class="change a-3-bg"></div>
            <div class="bg a-4-bg"></div>
            <!-- 价格 -->
            <span
              class="td-symbol"
              @click="handelPrice(item.price)"
              :class="item.side"
              :style="{ width: cellWidth[0] + 'px' }"
            >
              {{ item.price }}
              <!--<b class="hover_hide">{{ item.price }}</b>-->
              <!--<b class="hover_show">{{ item.rate }}</b>-->
            </span>
            <!-- 成交量 -->
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              {{ item.vol }}
            </span>
            <!-- 时间 -->
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              {{ item.time }}
            </span>
          </div>
          <div
            class="symbol-item a-7-bg-h b-1-cl"
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/newTrade/newTrade";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/newTrade/newTrade.styl";
import flickerAnimation from "@/assets/js/flicker-animation-mixin";
import axios from "@/api/http/axios";
import { fixD } from "@/utils";

export default {
  mixins: [mixin, flickerAnimation()],
  mounted() {
    this.init();
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.baseData.isLogin;
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
    calSymbol() {
      let { symbol } = this.$route.params;
      symbol = symbol ? symbol.replace("_", "").toLowerCase() : "";
      return symbol;
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
    langTxt() {
      return {
        txt1: this.$t('futures.newTrade.myTrades'),
      };
    },
  },
  data() {
    return {
      activeIndex: 0, // 活动tag
      historyOrder: [],
    };
  },
  created() {
    this.getOrderListData();
  },
  watch: {
    activeIndex(val) {
      if (val === 1) {
        this.getOrderListData();
      }
    },
    calSymbol() {
      this.getOrderListData();
    },
  },
  methods: {
    // 获取订单历史
    getOrderListData() {
      if (!this.calSymbol) {
        return;
      }
      let url = this.$store.state.url.ordercenter.historyNew;
      if (this.moduleType === "lever") {
        url = this.$store.state.url.lever.all;
      }
      axios({
        url,
        method: "post",
        params: {
          symbol: this.calSymbol,
          pageSize: 10,
        },
      }).then((rs) => {
        if (rs.code === "0") {
          let dataList = rs.data.orderList;
          // 将当前时间戳转换为当天零点的时间戳
          const today = new Date().setHours(0, 0, 0, 0);
          const symbol = this.symbolAll[this.symbolCurrent] || {};
          dataList = dataList
            .filter(
              (item) =>
                item.status === 2 &&
                item.time_long >= today &&
                item.time_long < today + 24 * 60 * 60 * 1000
            )
            .map((item) => ({
              price: fixD(item.avg_price, symbol.price),
              vol: fixD(item.deal_volume, symbol.volume),
              time: item.created_at.split(" ")[1],
              side: item.side === "BUY" ? "u-1-cl" : "u-4-cl",
            }));
          this.differNUmber = 51 - dataList.length > 0 ? 51 - dataList.length : 0;
          this.historyOrder = dataList;
        }
      });
    },
    goPage(path) {
      this.$router.push(`/${path}`);
    },
  },
};
</script>

<style>
.newTrade-index-container .grid-newTrade-tbody {
  /* 改，2022.10.23，760 -> 745 */
  height: 745px !important;
}
</style>
<style scoped>
@import "../../../../assets/css/flicker-animation.css";
</style>

<style scoped>
.tbody.newTrade-tbody {
  overflow: auto;
  height: auto !important;
}

.block-content {
  height: calc(100% - 39px);
  display: flex;
  flex-direction: column;
}
.newTrade.newTrade-index-container {
  height: 100%;
}
.depath-index-container .block-header > span {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
  color: var(--color-text-secondary);
}
.depath-index-container .block-header > span::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
.m-tab > .item.actived {
  color: var(--color-1);
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.depath-index-container .block-header > span.actived::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 22px 100%
    no-repeat;
}
.newTrade-index-container .tbody .symbol-item {
  display: flex;
  align-items: center;
}
.newTrade-index-container .tbody .symbol-item .td-price {
  color: var(--color-text-primary);
}
.newTrade-index-container .tbody .symbol-item .td-rose {
  color: var(--color-text-secondary);
}
.newTrade-index-container .thead {
  height: auto;
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

.newTrade-index-container .tbody .symbol-item,
.newTrade-index-container .thead {
}
</style>
