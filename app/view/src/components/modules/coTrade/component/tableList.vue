<!-- 币币交易 24小时行情 -->
<template>
  <div class="tableList-container">
    <div class="thead a-3-bd b-2-cl" v-if="theadList && theadList.length">
      <span
        v-for="(item, index) in theadList"
        :key="'thead' + index"
        :style="{ width: cellWidth[index] + 'px' }"
      >
        {{ item }}
      </span>
    </div>
    <div class="tbody" :style="tbodyStyle">
      <vue-scroll :ops="ops" ref="vs" @handle-resize="handleResize">
        <!-- 改，2022.09.22，b-2-cl -> b-1-cl -->
        <div class="tbodyBar" :style="tbodyStyle">
          <template v-if="differNUmber > 0 && type === 'asks'">
            <div
              class="symbol-item a-5-bg-h b-1-cl"
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
          <template v-for="(item, index) in dataList">
            <div
              v-if="isShow(index)"
              :class="{
                'change-item': item.diff,
                [calBgAnimation(Math.floor(Math.random() * 10) > 5)]:
                  Math.floor(Math.random() * 10) > randomNum + constNum,
              }"
              class="symbol-item a-5-bg-h b-1-cl"
              :key="index + 'item'"
            >
              <!-- 价格 -->
              <!--<div class="bg a-21-bg"></div>-->
              <span
                class="td-symbol"
                @click="handelPrice(item.price)"
                :class="priceClass"
                :style="{ width: cellWidth[0] + 'px' }"
              >
                {{ thousandsComma(+item.price) }}
              </span>
              <!-- 数量 -->
              <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
                {{ thousandsComma(item.vol) }}
                <div v-if="flashSwitchs" class="change" :class="trBgClass(item.diff)"></div>
              </span>
              <!-- 累计 -->
              <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
                {{ thousandsComma(item.total) }}
                <b class="tr-bg" :class="trBgClass_two" :style="setWidth(item.total)"></b>
              </span>
            </div>
          </template>
          <template v-if="differNUmber > 0 && type === 'buy'">
            <div
              class="symbol-item a-5-bg-h b-1-cl"
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
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/tableList/tableList";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/tableList/tableList.styl";
import { myStorage } from "@/utils";
import flickerAnimation from "@/assets/js/flicker-animation-mixin";

export default {
  mixins: [mixin, flickerAnimation()],
  data() {
    return {
      randomNum: 0,
      calTableData: [],
      ops: {
        scrollPanel: {
          scrollingY: true,
          initialScrollY: 0,
        },
      },
      activePrice: 0,
      activeDepth: 0,
    };
  },
  watch: {
    // dataList(val, oldval) {
    //   this.createTableData();
    // },
  },
  mounted() {
    this.init();
    this.init2();
  },
  computed: {
    formatPrice() {
      return (price) => {
        let priceStr = Number(price);
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
    // 当前合约信息
    contractInfo() {
      return this.$store.state.future.contractInfo;
    },
    // 深度级别列表
    depthList() {
      let depth = [];
      if (this.contractInfo) {
        depth = this.contractInfo.coinResultVo.depth;
        if (depth === ["0", "0", "0"]) {
          depth = ["0"];
        }
      } else {
        depth = ["3", "2", "1"];
      }
      return depth;
    },
  },
  methods: {
    // 初始化
    init2() {
      this.$bus.$on("activeWsData", (data) => {
        if (data.close && data.close !== "--") {
          this.activePrice = Number(data.close);
        } else {
          this.activePrice = 0;
        }
      });
      this.$bus.$on("DEPTH_VALUE", (data) => {
        this.activeDepth = data;
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
      const contractInfo = this.contractInfo || {};
      const asksData = this.allData.asksData || []; // 卖单
      const buyData = this.allData.buyData || []; // 买单
      const depth = this.depthList[this.activeDepth];
      const { type } = this; // 卖单/买单
      let temp = [];
      // 获取卖一买一
      const sell1 = asksData[asksData.length - 1];
      const buy1 = buyData[0];
      // const midPrice = ((+buy1.price + +sell1.price) / 2).toFixed(contractInfo.priceFix); // 中间价：(买五 + 卖5)/2
      let midPrice = this.activePrice || 0; // 中间价：(买五 + 卖5)/2
      if (!midPrice) {
        this.calTableData = dataList;
        return dataList;
      }

      // 随机生成10条数据
      // 价格：(买一 + 卖一) / 2) ==> ((买一 + 卖一) / 2) - (10^contractInfo.priceFix * 50)
      let targetPrice = 0; // 目标价
      if (type === "asks") {
        targetPrice = +midPrice + 10 ** (0 - contractInfo.priceFix) * 100;
      } else {
        targetPrice = +midPrice - 10 ** (0 - contractInfo.priceFix) * 100;
      }
      targetPrice = Number(targetPrice).toFixed(depth);
      midPrice = Number(midPrice);
      for (let i = 0; i < 10; i++) {
        const price = this.generateRandomNumber(midPrice, targetPrice).toFixed(depth);
        const vol = this.generateRandomNumber(+sell1.vol, +buy1.vol).toFixed(contractInfo.volfix);
        temp.push({
          price,
          rate: "--",
          total: 0,
          vol,
          flag: "*",
        });
      }

      // 买单最高价数量 * 10 / 卖单最低价的数量 * 10
      const index = this.getPriceIndex(temp, type);
      temp[index].vol = (temp[index].vol * 10).toFixed(contractInfo.volfix);

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
        item.vol = Number(item.vol).toFixed(contractInfo.volfix);
        return item;
      });

      temp.sort((a, b) => b.price - a.price);
      // 计算总量
      if (type === "asks") {
        for (let i = temp.length - 1; i > 0; i--) {
          const item = temp[i];
          item.total = +item.price * +item.vol + (temp[i + 1] ? +temp[i + 1].total : 0);
          item.total = (+item.total).toFixed(contractInfo.priceFix);
        }
      } else {
        for (let i = 0; i < temp.length; i++) {
          const item = temp[i];
          item.total = +item.price * +item.vol + +(temp[i - 1] ? temp[i - 1].total : 0);
          item.total = (+item.total).toFixed(contractInfo.priceFix);
        }
      }
      // this.calTableData = temp
      this.calTableData = temp.map((item) => {
        item.total = this.formatPrice(item.total);
        // item.vol = this.formatPrice(item.vol);
        return item;
      });
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
.tableList-container > .thead {
  border-color: transparent;
  position: relative;
  z-index: 0;
}

.tableList-container .tbody .symbol-item .td-rose,
.tableList-container .tbody .symbol-item .td-price {
  color: var(--color-text-primary);
}
.tableList-container .tbody .symbol-item {
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 16px;
  z-index: 0;
}
.tableList-container {
}
</style>
