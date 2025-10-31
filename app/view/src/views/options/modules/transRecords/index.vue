<template>
  <div class="box_g">
    <!--<div class="selBox">-->
    <!--  <select_g :sel-list="selList" :default-sel="0"></select_g>-->
    <!--</div>-->

    <div class="tab_box">
      <div class="tabItem" :class="{ actived: tabIndex == 1 }" @click="handleTab(1)">Opened</div>
      <div class="tabItem" :class="{ actived: tabIndex == 3 }" @click="handleTab(3)">Closed</div>
    </div>

    <div class="tradeRecord_box">
      <div class="noData" v-if="!orderList.length">
        <div class="noData_tip">No Option Record</div>
      </div>
      <div class="wrap" style="height: 550px" v-else>
        <vue-scroll>
          <div class="tradeItem" v-for="(item, index) in orderList" :key="index">
            <div class="item item_1">
              <div class="symbol_box">
                <img :src="coinInfo.baseIcon" />
                <span class="symbolCoin">{{ currentSymbol }}</span>
                <!--<span class="percent_g" v-if="coinInfo">+{{ coinInfo.rewardRatio * 100 }}%</span>-->
              </div>
              <div class="key time">
                Your Forecast
                <span :class="item.side === 1 ? 'greCl' : 'redCl'">{{
                  item.side === 1 ? "Call Option " : "Put Option"
                }}</span>
              </div>
            </div>

            <div class="item item_6">
              <div>
                <div class="key">Bet</div>
                <div class="val">{{ item.amount }} OUDT</div>
              </div>
              <div class="right">
                <div class="key">Profit</div>
                <div class="val rightAl" v-if="tabIndex === 3">{{ calProfit(item) }} OUDT</div>
                <div class="val rightAl" v-else>--</div>
              </div>
            </div>

            <div class="item item_6">
              <div>
                <div class="key">Open price</div>
                <div class="val">{{ item.price || 0 }}</div>
              </div>
              <div v-if="tabIndex === 1">
                <div class="key">Current price</div>
                <div class="val rightAl">{{ lastPrice || "--" }}</div>
              </div>
              <div v-if="tabIndex === 3">
                <div class="key">Closed price</div>
                <div class="val rightAl">{{ item.settlementPrice || 0 }}</div>
              </div>
            </div>

            <div class="item item_6">
              <div v-if="tabIndex === 1">
                <div class="key">Countdown</div>
                <div class="val">
                  <countdown2
                    :endTime="item.confirmTime"
                    :start-time="item.startTime"
                    @finishTwo="handlerFinish2"
                  ></countdown2>
                </div>
              </div>
              <div v-if="tabIndex === 3">
                <div class="key">Closing Time</div>
                <div class="val">{{ item.completeTimeStr }}</div>
              </div>
              <div>
                <div class="key">Transaction Fee</div>
                <div class="val rightAl">{{ calFee(item) }}</div>
              </div>
            </div>

            <!--<div class=" item item_2">-->
            <!--  <div class="box_1">-->
            <!--    <div class="key">Start Time</div>-->
            <!--    <div class="val">{{ item.confirmTimeStr }}</div>-->
            <!--  </div>-->
            <!--  <div class="box_2">-->
            <!--    &lt;!&ndash;<div class="val">M5</div>&ndash;&gt;-->
            <!--  </div>-->
            <!--  <div class="box_3">-->
            <!--    <div class="key" style="text-align: right;">End Time</div>-->
            <!--    <div class="val rightAl">{{ item.completeTimeStr }}</div>-->
            <!--  </div>-->
            <!--</div>-->

            <!--<div class="item item_2_1">-->
            <!--  <div class="haveIcon_box">-->
            <!--    <img src="@/assets/images/1/arrIcon_g.svg" alt="" srcset="">-->
            <!--    <span class="val">${{ item.price || 0 }}</span>-->
            <!--  </div>-->
            <!--  &lt;!&ndash;<div class="val">$200</div>&ndash;&gt;-->
            <!--  <div>-->
            <!--    <span class="val">${{ item.settlementPrice || lastPrice }}</span>-->
            <!--  </div>-->
            <!--</div>-->

            <countdown
              v-if="tabIndex === 1"
              :end-time="item.completeTime"
              :start-time="item.confirmTime"
              @finish="handlerFinish(item)"
            ></countdown>
            <!--<div class="item item_3">-->
            <!--  <div class="progress_bar" :style="{'&#45;&#45;inp-width':inpWidth}"></div>-->
            <!--</div>-->

            <!--<div class="item_4">-->
            <!--  <span class="key">Remainder Time</span>-->
            <!--  <span class="val">&nbsp;23:46:43</span>-->
            <!--</div>-->

            <!--<div class="item_5">-->
            <!--  <div class="item">-->
            <!--    <span class="key">Your prediction</span>-->
            <!--    <span class="val" :class="item.side === 1 ? 'greCl' : 'redCl'">{{ item.side === 1 ? "Call Option " : "Put Option" }}</span>-->
            <!--  </div>-->
            <!--  <div  class="item">-->
            <!--    <span class="key">Payout</span>-->
            <!--    <span class="val">{{ item.amount }} OUDT</span>-->
            <!--  </div>-->

            <!--  <div  class="item">-->
            <!--    <span class="key">Profit</span>-->
            <!--    <span class="val" v-if="tabIndex === 3">{{ calProfit(item) }} OUDT</span>-->
            <!--    <span class="val" v-else>&#45;&#45;</span>-->
            <!--  </div>-->
            <!--</div>-->
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import countdown from "@/views/options/modules/countdown";
import countdown2 from "@/views/options/modules/countdown2";
import { cutOut } from "@/utils/newUtils";

export default {
  components: {
    countdown,
    countdown2,
  },
  props: {
    symbol: {
      type: String,
      default: "",
    },
    coinData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selList: [
        {
          name: "Trade0",
          id: "0",
        },
        {
          name: "Trade1",
          id: "1",
        },
      ],
      tabIndex: 1,
      inpWidth: "30%",
      isOrder: false,
      currentSymbol: "",
      orderList: [],
      coinInfo: {},
      lastPrice: 0,
      currentTime: 0,
      precision: 4, // 精度
    };
  },
  mounted() {
    this.init();
    this.currentTime = Math.floor(new Date().getTime() / 1000);
  },
  computed: {
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    opUrl() {
      return this.$store.state.systemConfig.opUrl;
    },
    // 支出
    calExpenditure() {
      return (item) => item.amount.toFixed(2);
    },
    // 利润
    calProfit() {
      return (item) => {
        const coinInfo = this.coinInfo || {};
        return item.settlementResult === 1
          ? cutOut(item.amount * (1 + coinInfo.rewardRatio), 4)
          : 0;
      };
    },
    calFee() {
      return (item) => {
        if (item.feeRate) {
          return `${item.feeRate * 100}%`;
        }
        return this.coinInfo.feeRate ? `${this.coinInfo.feeRate * 100}%` : "-";
      };
    },
  },
  watch: {
    tabIndex() {
      this.orderList = [];
      this.getOrderList();
    },
  },
  methods: {
    handlerFinish2() {
      setTimeout(() => {
        this.getOrderList();
      }, 4000);
    },
    handlerFinish(data) {
      this.orderList = this.orderList.filter((item) => item.id != data.id);
      this.$bus.$emit("settleFinish", data);
    },
    init() {
      this.currentSymbol = this.symbol;
      this.coinInfo = this.coinData;
      setTimeout(() => {
        this.getOrderList();
      }, 1000);
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        this.currentSymbol = val;
        setTimeout(() => {
          this.getOrderList();
        }, 1000);
      });
      this.$bus.$on("COIN_CHANGE", (val) => {
        this.coinInfo = val;
      });
      this.$bus.$on("LAST_PRICE", (val) => {
        this.lastPrice = val.close.data;
      });
      this.$bus.$on("orderCreate", (val) => {
        this.getOrderList();
      });
    },
    handleTab(index) {
      this.tabIndex = index;
    },
    async getOrderList() {
      const uid = this.userInfo ? this.userInfo.id : "";
      const currentSymbol = this.currentSymbol.replace("/", "").toLowerCase();
      const res = await this.axios({
        url: `${this.opUrl}/order/list?uid=${uid}&status=${this.tabIndex}&symbol=${currentSymbol}`,
        hostType: "def",
        method: "get",
      });
      if (res.code === "0") {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        this.orderList = [];
        this.orderList = res.data.map((item) => {
          item.startTimeStr = this.changeLocaleDate(item.startTime);
          item.completeTimeStr = this.changeLocaleDate(item.completeTime);
          item.confirmTimeStr = this.changeLocaleDate(item.confirmTime);
          item.countdownNum = Math.floor(new Date(item.confirmTime).getTime() / 1000) - currentTime;
          item.countdownNum = item.countdownNum > 0 ? item.countdownNum : 0;
          item.price = cutOut(item.price, this.precision);
          return item;
        });
      }
      this.isOrder = true;
    },
    // 转为本机时间
    changeLocaleDate(str) {
      const date = new Date(str);
      const time = date.toLocaleTimeString();
      return time;
    },
  },
};
</script>

<style scoped>
.box_g {
  width: 290px;
  box-sizing: border-box;
  padding: 0 10px;
}
.selBox {
  margin-bottom: 10px;
}
.tab_box {
  width: 250px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: auto auto 10px;
  border-radius: 4px;
  overflow: hidden;
}

.tradeItem {
  padding: 10px;
}

.tabItem {
  background: var(--option-color-2);
  width: 125px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-1);
}

.tabItem.actived {
  background: var(--mainColor);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.key {
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(102, 102, 102, 1);
}

.val {
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;

  color: var(--color-1);
}

.item_1 {
  height: 33px;
  margin-bottom: 10px;
}

.symbol_box {
  display: flex;
  align-items: center;
  gap: 5px;
}
.symbol_box > img {
  width: 16px;
  height: 16px;
}

.symbolCoin {
  font-size: 14px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: var(--color-1);
}

.percent_g {
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: right;
  color: #ffffff;
}

.item_2 {
  height: 36px;
  margin-bottom: 4px;
}
.item_2_1 {
  height: 18px;
  margin-bottom: 10px;
}

.haveIcon_box {
  display: flex;
  align-items: center;
}
.item_3 {
  height: 8px;
  margin-bottom: 4px;
}

.progress_bar {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  position: relative;
}
.progress_bar:before {
  content: "";
  height: 100%;
  width: var(--inp-width);
  position: absolute;
  background-color: rgba(16, 88, 222, 1);
  border-radius: 28px;
}
.item_6 {
  margin-bottom: 10px;
}
.item_4 {
  height: 18px;
  margin-bottom: 10px;
}

.item_5 {
  margin-bottom: 10px;
}

.item_5 .item {
  height: 19px;
}

/*.leftAl:{*/
/*  text-align: left;*/
/*}*/
.rightAl {
  text-align: right;
}

.greCl {
  color: rgba(11, 186, 116, 1);
}
.redCl {
  color: #fd4661;
}

.noData {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.noData_tip {
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  color: rgba(104, 104, 104, 1);
  text-align: center;
}
.right > .key {
  text-align: right;
}
</style>
