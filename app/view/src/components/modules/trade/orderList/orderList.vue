<!-- 杠杆交易 -->
<!-- 2022.12.30 样式重构 -->
<template>
  <div class="order-list-box">
    <div class="tab-box b-2-cl" :class="titleBlockClass">
      <span
        class="tab-item"
        v-for="(item, index) in tabTypeItem"
        :key="index + 'tab'"
        @click="switchType(index + 1)"
        :class="{ 'selected b-1-cl a-12-bd': orderType === index + 1 }"
      >
        {{ item }}
      </span>
      <span
        class="tab-item"
        :class="{ 'selected b-1-cl a-12-bd': orderType === 4 }"
        @click="switchType(4)"
        v-if="showStopOrder"
      >
        <!-- 条件单 -->
        {{ $t("futures.tradeForm.text24") }}
      </span>
      <span v-if="openOrderCollect === '1'" class="all-order-btn b-1-cl" @click="goOrderPage">
        <!-- 全部订单 -->
        {{ $t("trade.sellAll") }}
      </span>
    </div>
    <div class="order_type b-2-cl a-5-bg" v-if="orderType === 3">
      <div
        class="order_type_btn"
        :class="filterGridStatus === 1 ? 'u-16-bd b-1-cl' : 'a-3-bd'"
        @click="
          () => {
            this.filterGridStatus = 1;
            this.pagination.page = 1;
            this.tableLoading = true;
            this.getData();
          }
        "
      >
        <!-- 正在执行 -->
        {{ $t("gridTrade.orderType1") }}
      </div>
      <div
        class="order_type_btn"
        :class="filterGridStatus === 0 ? 'u-16-bd b-1-cl' : 'a-3-bd'"
        @click="
          () => {
            this.filterGridStatus = 0;
            this.pagination.page = 1;
            this.tableLoading = true;
            this.getData();
          }
        "
      >
        <!-- 已完成 -->
        {{ $t("gridTrade.orderType2") }}
      </div>
    </div>
    <div
      class="order-conent"
      :class="
        orderType === 3 && $store.state.baseData.templateLayoutType === '2'
          ? 'order-content_height'
          : orderType === 3 && $store.state.baseData.templateLayoutType != '2'
          ? 'pro-trade-order'
          : ''
      "
    >
      <vue-scroll>
        <div class="not-login" v-if="!isLogin">
          <!-- 请 -->
          {{ $t("futures.orderList.tstext1") }}
          <span style="cursor: pointer; padding: 0 6px" class="b-4-cl" @click="goPage('login')">
            <!-- 登录/注册 -->
            {{ $t("futures.orderList.tstext2") }}
          </span>
          <!-- 再进行操作 -->
          {{ $t("futures.orderList.tstext3") }}
        </div>
        <template v-else>
          <c-table
            :columns="columns"
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList="dataList"
            :subContent="subTableData"
            :subContentId="subTableDataId"
            :subColumns="subColumns"
            :loading="tableLoading"
            :subLoading="subLoading"
            :cellHeight="cellHeight"
            @elementClick="elementClick"
            :bodyClasses="orderType === 3 ? 'gridOrder a-7-bg' : 'a-7-bg'"
          />
          <c-pagination
            v-if="pagination.count / pagination.pageSize > 1"
            :total="pagination.count"
            classes="a-7-bg"
            :current-page="pagination.page"
            :display="pagination.pageSize"
            @pagechange="pagechange"
          >
          </c-pagination>
        </template>
      </vue-scroll>
    </div>
    <!--<div class="notData a-7-bg" v-if="!dataList.length && !tableLoading">-->
    <!--  <svg class="icon icon-50" aria-hidden="true">-->
    <!--    <use xlink:href="#icon-g_2"></use>-->
    <!--  </svg>-->
    <!--  <p>-->
    <!--    &lt;!&ndash; 暂无数据 &ndash;&gt;-->
    <!--    {{ $t("common.notData") }}-->
    <!--  </p>-->
    <!--</div>-->
    <grid-dialog
      :dataId="gridItemId"
      :type="filterGridStatus"
      :fixValue="fixValue"
      :gridShowFlag="gridDoliog"
      @gridDialogClose="gridClose"
    ></grid-dialog>
    <!-- 未认证 提示框 -->
    <c-alert
      :showFlag="gridCancelDoliog"
      :buttonText="$t('application.confirm')"
      :imgMap="imgMap"
      @close="() => (this.gridCancelDoliog = false)"
      :btnEventFlag="true"
      @confirm="gridCancelEvent"
    >
      <div class="tip_title b-1-cl">
        <!-- 交易须知 -->
        {{ $t("gridTrade.tip") }}
      </div>
      <!-- 终止网格后，会撤消所有未成交订单，确定要终止此网格交易？ -->
      <p class="tip_text">{{ $t("gridTrade.tipContent") }}</p>
    </c-alert>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/orderList/orderList";
import {
  getCoinShowName,
  formatTime,
  fixD,
  myStorage,
} from "@/components/BlockChain-ui-privatization/utils";
import GridDialog from "../gridDialog/GridDialog.vue";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/orderList/orderList.styl";
import axios from "axios";

export default {
  mixins: [mixin],
  components: {
    GridDialog,
  },
  props: {
    showStopOrder: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
  data() {
    return {
      gridType: 0, // 网格类型 0: 网格详情； 1: 正在执行(20)； 2: 已完成
      gridDoliog: false, // 网格弹窗
      gridItemId: null, // list单个的数据
      gridCancelDoliog: false,
      filterGridStatus: 1, // 策略状态 0:启动中  1:正在执行   2:停止中   3:已关闭
      timer: 15000,
      stopOrder: [], // 条件单
    };
  },
  watch: {
    filterGridStatus(v) {
      if (!v) {
        clearInterval(this.getDataInter);
        this.getDataInter = null;
      } else {
        this.intervalGet();
      }
    },
  },
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    // 条件单请求域名
    stopOrderUrl() {
      return this.$store.state.systemConfig.stopOrderUrl;
    },
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 1;
      if (publicInfo && publicInfo.switch && publicInfo.switch.grid_trade_switch) {
        str = Number(publicInfo.switch.grid_trade_switch);
      }
      return str;
    },
    // 该币对是否开启网格
    showGridFlag() {
      let flag = false;
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];

        if (symbol && symbol.is_grid_open) {
          flag = true;
        }
      }
      return flag;
    },
    // tab 项
    tabTypeItem() {
      const arr = [
        this.$t("trade.activeOrder"), // 当前委托
        this.$t("trade.historyOrder"), // 历史委托
      ];
      if (this.gridTradeFlag && this.showGridFlag) {
        arr.push(this.$t("gridTrade.title"));
      }
      return arr;
    },
    // 表头
    columns() {
      if (this.orderType === 2) {
        return [
          {
            title: this.$t("trade.time"), // '时间',
            width: "180px",
          },
          {
            title: this.$t("trade.class"), // '类别'
            width: "200px",
          },
          {
            title: this.$t("trade.transaction"), // '交易对'
            width: "226px",
          },
          {
            title: `${this.$t("trade.price")}
            (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
            width: "226px",
          },
          {
            title: `${this.$t("trade.number")}
            (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
            width: "226px",
          },
          {
            title: this.$t("trade.average"), // '成交均价'
            width: "226px",
          },
          {
            title: this.$t("trade.status"), // '状态'
            width: "226px",
          },
          {
            title: this.$t("trade.opera"), // '操作'
            width: "100px",
          },
        ];
      }
      if (this.orderType === 3) {
        return [
          {
            title: this.$t("trade.time"), // '时间',
            width: "100px",
          },
          {
            title: this.$t("trade.transaction"), // '交易对'
            width: "100px",
          },
          {
            title: this.$t("gridTrade.clounms1"), // '总投入',
            width: "200px",
          },
          {
            title: this.$t("gridTrade.clounms2"), // 已产生利润
            width: "200px",
          },
          {
            title: this.$t("gridTrade.clounms3"), // 持仓盈亏
            width: "200px",
          },
          {
            title: this.$t("gridTrade.clounms4"), // '年化收益率'
            width: "200px",
          },
          {
            title: this.$t("gridTrade.clounms5"), // '运行时长'
            width: "200px",
          },
          {
            title: this.$t("trade.opera"), // '操作'
            width: "150px",
          },
        ];
      }
      if (this.orderType === 4) {
        return [
          {
            title: this.$t("trade.time"), // '时间',
            width: "226px",
          },
          {
            title: this.$t("futures.tradeForm.text12"), // 触发价
            width: "226px",
          },
          {
            title: `${this.$t("futures.tradeForm.text11")}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 委托价格
            width: "226px",
          },
          {
            title: `${this.$t("trade.number")}
          (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
            width: "226px",
          },
          {
            title: this.$t("trade.class"), // 类别
            width: "226px",
          },
          {
            title: this.$t("trade.status"), // 状态
            width: "226px",
          },
          {
            title: this.$t("trade.opera"), // '操作'
            width: "226px",
            classes: "opera",
          },
        ];
      }
      return [
        {
          title: this.$t("trade.time"), // '时间',
          width: "100px",
        },
        {
          title: this.$t("trade.class"), // '类别'
          width: "150px",
        },
        {
          title: `${this.$t("trade.price")}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
          width: "200px",
        },
        {
          title: `${this.$t("trade.number")}
          (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
          width: "200px",
        },
        {
          title: `${this.$t("trade.dealMoney")}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 交易额
          width: "200px",
        },
        {
          title: this.$t("trade.average"), // '成交均价'
          width: "200px",
        },
        {
          title: `${this.$t("trade.deal")}/${this.$t("trade.noDeal")}`, // 已成交/未成交
          width: "200px",
        },
        {
          title: this.$t("trade.opera"), // '操作'
          width: "100px",
          classes: "opera",
        },
      ];
    },
    dataList() {
      // 条件单
      if (this.orderType === 4) {
        return this.formStopOrder(this.stopOrder);
      }
      if (this.orderData && this.orderData.orderType === this.orderType) {
        if (this.orderType === 1) {
          return this.formData(this.orderData.orderList, this.cancelOrderId);
        }
        if (this.orderType === 3) {
          return this.formGridData(this.orderData.strategyVoList);
        }
        return this.formHistoryData(this.orderData.orderList);
      }
      return [];
    },
  },
  methods: {
    init() {
      const that = this;
      this.getStopOrderList();
      // 侦听数据条件订单变化
      that.$bus.$on("STOP_ORDER", (val) => {
        that.getStopOrderList();
      });
      // 获取 当前选中的货币对
      this.symbolCurrent = myStorage.get("sSymbolName");
      if (this.moduleType === "lever") {
        this.symbolCurrent = myStorage.get("leverSymbolName");
      }
      if (this.isLogin) {
        this.getData();
        // 轮训请求数据
        this.intervalGet();
      }
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        this.symbolCurrent = val;
        if (this.isLogin) {
          this.pagination.page = 1;
          this.subTableDataId = null;
          this.tableLoading = true;
          this.getData();
        }
        if (this.orderType === 3 && (!this.showGridFlag || !this.gridTradeFlag)) {
          this.orderType = 1;
        }
      });
      // 监听下单成功
      this.$bus.$on("ORDER_CREATE", () => {
        this.pagination.page = 1;
        this.getData();
      });
    },
    goPage(path) {
      this.$router.push(`/${path}`);
    },
    gridClose() {
      this.gridDoliog = false;
    },
    // 请求订单数据
    getData(auto) {
      if (this.symbolCurrent && this.isLogin) {
        if (this.orderType === 4) {
          this.getStopOrderList();
          return;
        }

        let url = this.$store.state.url.cointran.orderNew;

        if (this.orderType === 2) {
          url = this.$store.state.url.ordercenter.historyNew;
        } else if (this.orderType === 3) {
          // 如果是网格直接请求网格接口
          url = "quant/getStrategyList";
        }

        if (this.moduleType === "lever") {
          url = this.$store.state.url.lever.new;
          if (this.orderType === 2) {
            url = this.$store.state.url.lever.all;
          }
        }
        const symbolArr = this.symbolCurrent.split("/");
        const symbol = symbolArr[0].toLowerCase() + symbolArr[1].toLowerCase();
        const data = {
          url,
          orderType: this.orderType,
          params: {
            symbol,
            pageSize: this.pagination.pageSize,
          },
        };
        if (this.orderType === 3) {
          data.hostType = "quant";
          data.params.symbol = this.symbolCurrent;
          data.params.status = this.filterGridStatus;
        }
        if (this.orderIdArrar.length && this.orderType === 2) {
          data.params.idList = this.orderIdArrar;
        } else {
          data.params.page = this.pagination.page;
        }
        if (auto) {
          data.auto = true;
        }
        this.$store.dispatch("getOrderListData", data);
      }
    },
    // 轮训请求数据
    intervalGet() {
      if (this.filterGridStatus) {
        clearInterval(this.getDataInter);
        this.getDataInter = setInterval(() => {
          this.getData(true);
        }, this.timer);
      } else {
        clearInterval(this.getDataInter);
        this.getDataInter = null;
      }
    },
    // 网格交易数据格式化
    formGridData(data) {
      const dataArray = data || [];
      const newData = [];
      if (dataArray.length) {
        dataArray.forEach((item) => {
          let tableData = null;
          const symbolArr = item.symbol.split("/");
          // 网格状态 0:启动中 1:正在执行 2:停止中 3:已关闭
          if (this.filterGridStatus.toString() === "0") {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(
                      symbolArr[1],
                      this.coinList
                    )}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(
                      item.configParamMap.totalBaseAmount,
                      this.fixValue.priceFix
                    )}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(
                      item.totalProfitRate,
                      2
                    )}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime, item.endTime),
                  },
                ],
                [
                  {
                    type: "link",
                    text: this.$t("trade.view"), // 详情
                    eventType: "gridDetail",
                  },
                ],
              ],
            };
          } else if (this.filterGridStatus.toString() === "1") {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(
                      symbolArr[1],
                      this.coinList
                    )}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(
                      item.configParamMap.totalBaseAmount,
                      this.fixValue.priceFix
                    )}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(
                      item.totalProfitRate,
                      2
                    )}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime),
                  },
                ],
                [
                  {
                    type: "link",
                    text: this.$t("trade.view"), // 详情
                    eventType: "gridDetail",
                  },
                  {
                    type: "link",
                    text: this.$t("gridTrade.close"), // 终止网格
                    eventType: "gridCancel",
                    classes: "grid_btn",
                  },
                ],
              ],
            };
          }
          if (tableData) {
            newData.push(tableData);
          }
        });
        return newData;
      }
      return [];
    },
    setTime(startTime, endTime) {
      if (!Number(startTime)) {
        return `0${this.$t("otcDetailOrder.day")}0${this.$t("gridTrade.hours")}0${this.$t(
          "otcDetailOrder.min"
        )}`;
      }
      let dateEnd = new Date().getTime();
      if (endTime) {
        dateEnd = endTime;
      }
      const dateDiff = dateEnd - startTime; // 时间差的毫秒数
      const day = Math.floor(dateDiff / (24 * 3600 * 1000)); // 计算出相差天数\
      const leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000)); // 计算出小时数
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000)); // 计算相差分钟数
      function s(t) {
        return t < 10 && t > 0 ? `0${t}` : t;
      }
      return `${s(day)}${this.$t("otcDetailOrder.day")}${s(hours)}${this.$t("gridTrade.hours")}${s(
        minutes
      )}${this.$t("otcDetailOrder.min")}`;
    },
    elementClick(type, data) {
      if (type === "cancel") {
        this.cancelOrderEvent(data);
      } else if (type === "gridDetail") {
        this.gridItemId = data;
        this.gridDoliog = true;
      } else if (type === "gridCancel") {
        this.gridItemId = data;
        this.gridCancelDoliog = true;
      } else if (type === "cancelStopOrder") {
        this.cancelStopOrder(data);
      } else {
        this.getSubTableData(data);
      }
    },
    // 格式化条件单数据 2023.03.15
    formStopOrder(list) {
      const statue = ["To be triggered", "Success", "Failed", "Canceled"];
      return list.map((item) => {
        const dataList = [
          item.createTime,
          item.triggerPrice,
          item.price,
          item.volume,
          [
            {
              text: item.side === "BUY" ? this.$t("trade.buy") : this.$t("trade.sell"),
              classes: item.side === "BUY" ? "u-1-cl" : "u-4-cl",
            },
          ],
          statue[+item.status],
          [
            {
              text: this.$t("otcDetailOrder.CancellationOrder"),
              type: "link",
              eventType: "cancelStopOrder",
            },
          ],
        ];
        return {
          data: dataList,
          id: item.id,
        };
      });
    },
    // 获取条件单列表 2023.03.15
    getStopOrderList() {
      const that = this;
      if (!that.userInfo) {
        return;
      }
      const symbolArr = this.symbolCurrent.split("/");
      const symbol = symbolArr[0].toLowerCase() + symbolArr[1].toLowerCase();
      const postData = {
        userId: that.userInfo.id,
        symbol,
      };
      axios({
        method: "post",
        url: `${this.stopOrderUrl}/stop-order/list`,
        data: postData,
      }).then((res) => {
        const { data } = res;
        if (data.code === "0") {
          that.stopOrder = data.data;
        }
        this.tableLoading = false;
      });
    },
    // 取消订单
    cancelStopOrder(id) {
      const that = this;
      const curItem = this.stopOrder.find((item) => item.id == id);
      // 已取消订单不执行
      if (curItem && curItem.status == "3") {
        this.$bus.$emit("tip", {
          text: this.$t('contract.order_cancelled'),
          type: "error",
        });
        return;
      }
      const postData = {
        id,
      };
      axios({
        method: "post",
        url: `${this.stopOrderUrl}/stop-order/cancel`,
        data: postData,
      }).then((res) => {
        if (res.data.code === "0") {
          this.$bus.$emit("tip", { text: this.$t("contract.cancel_success"), type: "success" });
        } else {
          this.$bus.$emit("tip", { text: this.$t("contract.c_error"), type: "error" });
        }
        that.getStopOrderList();
      });
    },
    // 终止网格
    gridCancelEvent() {
      this.axios({
        url: "quant/stopStrategy",
        hostType: "quant",
        method: "post",
        params: { strategyId: this.gridItemId },
      }).then((rep) => {
        if (rep.code.toString() === "0") {
          this.getData();
          // 重新请求资产
          this.$store.dispatch("assetsExchangeData", {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          // 撤单成功 提示
          this.$bus.$emit("tip", { text: rep.msg, type: "success" });
        } else {
          this.$bus.$emit("tip", { text: rep.msg, type: "error" });
        }
        this.gridCancelDoliog = false;
      });
    },
  },
};
</script>

<style lang="stylus">
.trade-market-index-container.trade-market .market-symbol .tbody {
  // 原
  // height: 710px;
  // 改，2022.09.21，market中的列表
  overflow: auto !important;
  height: 1240px;

}
.trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 723px;
}
  .order_type {
    display flex;
    align-items center;
    padding 6px 26px;
        border-bottom-width: 1px;
    border-bottom-style: solid;
    border-color: var(--color-Input-border);
  }
  .tip_title {
    line-height 16px;
    margin-bottom 15px;
  }
  .tip_text {
    font-size 12px;
    line-height 18px;
  }
  .order_type_btn {
    box-sizing border-box;
    border-width: 1px;
    border-style: solid;
    padding 4px 20px;
    cursor pointer;
    font-size 12px;
    line-height 14px;
  }
  .order_type_btn:nth-child(1) {
    // border-right none;
  }
  .order_list-top .notData {
    top 107px;
  }
  .table-body td .grid_btn {
    margin-left 0;
  }
  .pro-trade .order-list-box .gridOrder {
    min-height 218px;
  }
  .Int-trade .order-list-box .order-conent.order-content_height {
    height 313px;
    .table-body {
      min-height 280px;
    }
  }
  .pro-trade .order-list-box .order-conent.pro-trade-order {
    height 250px;
  }
</style>

<style scoped>
/* 2022.12.30 样式修改 */
.tab-box {
  background: var(--trade-color-1);
  height: 44px;
  border-color: var(--color-Input-border);
  border-radius: 8px 8px 0 0;
}
/deep/.table-head {
  height: 40px;
  line-height: 40px;
  background: var(--trade-color-1);
  border-radius: 0;
}
/deep/.table-body.a-7-bg {
  background-color: var(--trade-color-1);
  border-radius: 0 0 8px 8px;
}
/deep/.table-body .no-data {
  height: 220px;
  padding-block: 40px;
}
.tab-box .tab-item {
  position: relative;
  height: 100%;
  &:hover {
    color: var(--color-text-primary);
  }
}

.tab-box .tab-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
}
.tab-box .tab-item.selected {
  border-color: transparent;
  color: var(--mainColor);
}
.tab-box .tab-item.selected::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 22px 100%
    no-repeat;
}
/deep/.common-button .common-button-slot {
  color: var(--mainColor);
}
.not-login {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--trade-color-1);
  border-radius: 0 0 8px 8px;
}
.order-list-box {
  background: var(--trade-color-1);
  border-radius: 8px;
}
/deep/.b-1-cl {
  color: var(--color-1);
}
.order-conent {
  /*width: 1200px;*/
  padding-top: 8px;
}
/deep/.a-5-bg {
  background: var(--color-28);
}

.order-list-box .order-conent /deep/.common-table,
.order-list-box .order-conent .tab-box {
  min-width: unset;
}
.order-list-box .order-conent /deep/.common-table .table-head {
  word-break: break-all;
  white-space: normal;
  line-height: normal;
}
.order-list-box .order-conent /deep/.common-table .table-head {
  word-break: break-all;
  white-space: normal;
  line-height: normal;
}
.order-list-box .order-conent /deep/.common-table table td {
  padding-right: 4px;
}
</style>
