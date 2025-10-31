<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-table-list-container">
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
    <div class="tbody" :class="{ 'no-padding': bodyHeight === 0 }" :style="tbodyStyle">
      <vue-scroll ref="vs" @handle-resize="handleResize">
        <!-- 改，2022.09.22，b-2-cl -> b-1-cl -->
        <div class="tbodyBar">
          <div :class="asksOPtion">
            <template v-if="differNUmber > 0 && type === 'asks'">
              <template v-for="(item, index) in differNUmber">
                <div v-if="index < 12" class="symbol-item a-7-bg-h b-1-cl" :key="index + 'diff'">
                  <span
                    class="td-symbol"
                    :class="priceClass"
                    :style="{ width: cellWidth[0] + 'px' }"
                  >
                    --
                  </span>
                  <span class="td-price" :style="{ width: cellWidth[1] + 'px' }"> -- </span>
                  <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }"> -- </span>
                </div>
              </template>
            </template>
            <template v-for="(item, index) in dataList">
              <div
                v-if="isShow(index) || index < 12"
                class="symbol-item a-7-bg-h b-1-cl"
                :key="index"
                :class="{
                  'change-item': item.diff,
                  [calBgAnimation(Math.floor(Math.random() * 10) > 5)]:
                    Math.floor(Math.random() * 10) > randomNum + constNum,
                }"
              >
                <!-- 价格 -->
                <span
                  class="td-symbol"
                  @click="handelPrice(item.price)"
                  :class="priceClass"
                  :style="{ width: cellWidth[0] + 'px' }"
                >
                  {{ item.price }}
                  <!--<b class="hover_hide">{{ item.price }}</b>-->
                  <!--<b class="hover_show">{{ item.rate }}</b>-->
                </span>
                <!-- 数量 -->
                <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
                  {{ formatPrice(item.vol) }}
                  <i v-if="flashSwitchs" class="change" :class="trBgClass(item.diff)"></i>
                </span>
                <!-- 累计 -->
                <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
                  {{ formatPrice(item.total) }}
                </span>
                <b class="tr-bg" :class="trBgClass_two" :style="setWidth(item.vol)"></b>
              </div>
            </template>
            <template v-if="differNUmber > 0 && type === 'buy'">
              <div
                class="symbol-item a-7-bg-h b-1-cl"
                v-for="(item, index) in differNUmber"
                :key="index + 'diff'"
              >
                <span class="td-symbol" :class="priceClass" :style="{ width: cellWidth[0] + 'px' }">
                  --
                </span>
                <span class="td-price" :style="{ width: cellWidth[1] + 'px' }"> -- </span>
                <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }"> -- </span>
              </div>
            </template>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tableList/tableList";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tableList/tableList.styl";
import flickerAnimation from "@/assets/js/flicker-animation-mixin";
import { myStorage } from "@/utils";

export default {
  mixins: [mixin, flickerAnimation()],
  props: {
    currentPrice: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      currentData: {},
      symbolCurrent: myStorage.get("sSymbolName"),
      randomNum: 0,
      calTableData: [],
      ops: {
        scrollPanel: {
          scrollingY: true,
          initialScrollY: 0,
        },
      },
      deptValue: 0,
    };
  },
  watch: {
    dataList(val, oldval) {
      // this.createTableData();
    },
    depthOption: {
      handler(val) {
        if (val) {
          this.deptValue = val[0];
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.type === "asks") {
      this.scrollTo();
    }
    // 监听 市场（最新价格） 数据
    this.init();
  },
  computed: {
    formatPrice() {
      return (price) => {
        let priceStr = +price;
        const fix = 3;
        if (priceStr >= 1000000000) {
          // 将价格除以十亿，并保留一位小数
          priceStr = `${(priceStr / 1000000000).toFixed(fix)}B`;
        } else if (priceStr >= 1000000) {
          // 将价格除以百万，并保留一位小数
          priceStr = `${(priceStr / 1000000).toFixed(fix)}M`;
        } else if (priceStr >= 1000) {
          // 将价格除以千，并保留一位小数
          priceStr = `${(priceStr / 1000).toFixed(fix)}K`;
        }
        // 返回格式化后的价格字符串
        return priceStr;
      };
    },
    // 全部币对列表
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    // 深度选项
    depthOption() {
      if (this.symbolAll && this.symbolCurrent) {
        const option = [];
        const arr = this.symbolAll[this.symbolCurrent].depth.split(",");
        arr.forEach((item) => {
          const opt = item.split(".")[1] ? item.split(".")[1].length : "0";
          option.push(opt);
        });
        return option;
      }
      return [];
    },
  },
  methods: {
    // 初始化
    init() {
      // 监听 市场（最新价格） 数据
      this.$bus.$on("MARKET_DATA", (data) => {
        this.currentData = data ? data[this.symbolCurrent] : {};
      });
      // 监听 当前货币对切换
      this.$bus.$on("ON_SYMBOL_SWITCH", (val) => {
        this.symbolCurrent = val;
      });
      // 深度
      this.$bus.$on("DEPTH_VALUE", (val) => {
        this.deptValue = val;
      });

      // 生成随机数
      // setInterval(() => {
      //   if (this.dataList.length) {
      //     this.createTableData();
      //   }
      // }, 1000);
    },
    createTableData() {
      const { dataList } = this;
      // 小于5，则无需插入
      // if (dataList.length < 5) {
      //   this.calTableData = dataList;
      //   return dataList;
      // }
      // 当前币对最新价
      const symbolCurrent = this.symbolAll ? this.symbolAll[this.symbolCurrent] : {};
      const asksData = this.allData.asksData || []; // 卖单
      const buyData = this.allData.buyData || []; // 买单
      const { type } = this; // 卖单/买单
      const { deptValue } = this; // 深度

      let temp = [];
      // 获取卖一买一
      const sell1 = asksData[asksData.length - 1] || {};
      const buy1 = buyData[0] || {};
      // const midPrice = ((+buy1.price + +sell1.price) / 2).toFixed(symbolCurrent.price); // 中间价：(买五 + 卖5)/2
      const midPrice = this.currentPrice; // 中间价：(买五 + 卖5)/2

      // 随机生成10条数据
      // 价格：(买一 + 卖一) / 2) ==> ((买一 + 卖一) / 2) - (10^symbolCurrent.price * 50)
      let targetPrice = 0; // 目标价
      if (type === "asks") {
        targetPrice = +midPrice + 10 ** (0 - symbolCurrent.price) * 50;
      } else {
        targetPrice = +midPrice - 10 ** (0 - symbolCurrent.price) * 50;
      }
      targetPrice = Number(targetPrice).toFixed(deptValue);
      for (let i = 0; i < 10; i++) {
        const price = this.generateRandomNumber(midPrice, targetPrice).toFixed(deptValue);
        const vol = this.generateRandomNumber(+sell1.vol, +buy1.vol).toFixed(symbolCurrent.volume);
        temp.push({
          price,
          rate: "--",
          total: 0,
          vol,
          flag: "*",
        });
      }
      // 买单最高价数量 * 10 / 卖单最低价的数量 * 10
      // let index = this.getPriceIndex(temp, type);
      // temp[index].vol = (temp[index].vol * 10).toFixed(symbolCurrent.volume);

      // 合并相同订单
      const priceMap = {};
      temp = dataList.concat(temp);
      temp.map((item) => {
        item.price = +item.price;
        if (priceMap[item.price]) {
          priceMap[item.price].vol = priceMap[item.price].vol + Number(item.vol);
        } else {
          priceMap[item.price] = item;
          priceMap[item.price].vol = Number(priceMap[item.price].vol);
        }
      });
      temp = Object.values(priceMap);
      temp.map((item) => {
        item.vol = Number(item.vol).toFixed(symbolCurrent.volume);
        return item;
      });
      temp = JSON.parse(JSON.stringify(temp));
      temp.sort((a, b) => b.price - a.price);
      // 计算总量
      if (type === "asks") {
        for (let i = temp.length - 1; i > 0; i--) {
          const item = temp[i];
          item.total = +item.price * +item.vol + (temp[i + 1] ? +temp[i + 1].total : 0);
          item.total = (+item.total).toFixed(symbolCurrent.price);
        }
      } else {
        for (let i = 0; i < temp.length; i++) {
          const item = temp[i];
          item.total = +item.price * +item.vol + +(temp[i - 1] ? temp[i - 1].total : 0);
          item.total = (+item.total).toFixed(symbolCurrent.price);
        }
      }
      this.calTableData = temp;
      return dataList;
    },
    // 范围内随机数
    generateRandomNumber(start, end) {
      start = Number(start);
      end = Number(end);
      if (start - end > 0) {
        [start, end] = [end, start];
      }
      return Math.random() * (end - start) + start;
    },
    // 获取数组中最大值/最小值的索引
    getPriceIndex(arr, type) {
      let price = 0;
      if (type === "asks") {
        price = Math.min(...arr.map((item) => item.price));
      } else {
        price = Math.max(...arr.map((item) => item.price));
      }
      return arr.findIndex((item) => item.price == price);
    },
  },
};
</script>
<style scoped>
@import "../../../../assets/css/flicker-animation.css";
.trade-table-list-container .tbody .symbol-item {
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.trade-table-list-container .tr-bg {
  height: 16px;
}
.trade-table-list-container .thead span {
  overflow: hidden;
  text-overflow: ellipsis;
}
.trade-table-list-container .tbody .symbol-item .td-rose,
.trade-table-list-container .tbody .symbol-item .td-price {
  color: var(--color-text-primary);
}
.trade-table-list-container .thead {
}
</style>
