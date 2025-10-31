import { imgMap, colorMap, fixD, getCoinShowName, myStorage } from "@/utils";

export default {
  name: "page-otcOrder",
  data() {
    return {
      imgMap,
      colorMap,
      switchFlag: false,
      tabelLoading: true,
      tabelList: [],
      nowType: 1, // 1为当前委托 2为历史委托
      symbol: "all", // 当前币种
      symbolList: [], // 币种选择列表
      side: "all", // 方向
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
    };
  },
  watch: {
    market(v) {
      if (v) {
        this.initSymbolList();
      }
    },
    // 监听store中的otcOrderList变化，自动刷新当前委托数据
    otcOrderList: {
      handler(newVal, oldVal) {
        // 只有在当前委托页面且数据确实发生变化时才刷新
        if (this.nowType === 1 && newVal !== oldVal) {
          this.getNowData();
        }
      },
      deep: true,
    },
  },
  computed: {
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    excheifFlag() {
      return this.$store.state.baseData.exchief_project_switch;
    },
    // 从store获取OTC订单列表
    otcOrderList() {
      return this.$store.state.baseData.otcOrderList || [];
    },
    navTab() {
      return [
        // 当前委托
        { name: this.$t("order.otcOrder.nowOrder"), index: 1 },
        // 历史委托
        { name: this.$t("order.otcOrder.hisOrder"), index: 2 },
      ];
    },
    sideList() {
      return [
        // 方向选择列表
        // 全部
        { code: "all", value: this.$t("order.otcOrder.all") },
        // 买入
        { code: "buy", value: this.$t("order.otcOrder.buy") },
        // 卖出
        { code: "sell", value: this.$t("order.otcOrder.sell") },
      ];
    },
    market() {
      return this.$store.state.baseData.market;
    },
    axiosSide() {
      if (this.side === "all") {
        return "";
      }
      return this.side;
    },
    axiosSymbol() {
      if (this.symbol === "all") {
        return undefined;
      }
      return this.symbol;
    },
    // 表格title
    columns() {
      let list = [];
      if (this.nowType === 1) {
        list = [
          { title: this.$t("order.otcOrder.nowOrderId") }, // 订单号
          { title: this.$t("order.otcOrder.nowOrderType") }, // 类别
          { title: this.$t("order.otcOrder.nowOrderCoin") }, // 币种
          { title: this.$t("order.otcOrder.nowOrderPirce") }, // 价格
          { title: this.$t("order.otcOrder.nowOrderVolume") }, // 数量
          { title: this.$t("order.otcOrder.nowOrderTotol") }, // 交易额
          { title: this.$t("order.otcOrder.service") }, // 手续费
          { title: this.$t("order.otcOrder.nowOrderStatus") }, // 状态
          { title: this.$t("order.otcOrder.nowOrderUser") }, // 交易方
          { title: this.$t("innov.operation") }, // 操作
        ];
      }
      if (this.nowType === 2) {
        list = [
          { title: this.$t("order.otcOrder.hisOrderId") }, // 订单号
          { title: this.$t("order.otcOrder.hisOrderType") }, // 类别
          { title: this.$t("order.otcOrder.hisOrderCoin") }, // 币种
          { title: this.$t("order.otcOrder.hisOrderPirce") }, // 价格
          { title: this.$t("order.otcOrder.hisOrderVolume") }, // 数量
          { title: this.$t("order.otcOrder.hisOrderTotol") }, // 交易额
          { title: this.$t("order.otcOrder.service") }, // 手续费
          { title: this.$t("order.otcOrder.hisOrderStatus") }, // 状态
          { title: this.$t("order.otcOrder.hisOrderUser") }, // 交易方
          { title: this.$t("innov.operation") }, // 操作
        ];
      }
      if (!this.excheifFlag) {
        list.forEach((item, i) => {
          if (item.title === this.$t("order.otcOrder.service")) {
            list.splice(i, 1);
          }
        });
      }
      // console.log(list);
      return list;
    },
    baseData() {
      return this.$store.state.baseData;
    },
    otcLinkUrl() {
      const obj = {
        url: "",
        type: "", // 1为push 2为herf
      };
      // 开发
      if (process.env.NODE_ENV === "development") {
        obj.url = "";
        obj.type = "1";
        // 线上
      } else if (window.HOSTAPI === "ex" && this.baseData.publicInfo) {
        obj.url = this.$store.state.baseData.publicInfo.url.otcUrl;
        obj.type = "2";
      } else if (window.HOSTAPI === "otc") {
        obj.url = "";
        obj.type = "1";
      }
      return obj;
    },
  },
  mounted() {
    this.getData();
    // this.getSymbolList();
  },
  beforeDestroy() {
    // 组件销毁前清理资源
  },
  methods: {
    getFix(coin) {
      return this.market.coinList[coin.toLocaleUpperCase()].showPrecision;
    },
    currentCoinPriceFix(price, coin, payCoin) {
      let fix = this.$store.state.baseData.defaultFiatPrecision;
      if (
        payCoin &&
        this.market &&
        this.market.coinList[coin] &&
        this.market.coinList[coin].fiatPrecision &&
        this.market.coinList[coin].fiatPrecision[payCoin.toLowerCase()]
      ) {
        fix = this.market.coinList[coin].fiatPrecision[payCoin.toLowerCase()];
        return fixD(price, fix) + payCoin;
      }
      return price;
    },
    init() {
      if (this.market) {
        this.initSymbolList();
      }
    },
    switchChange() {
      this.switchFlag = !this.switchFlag;
      this.getData();
    },
    initSymbolList() {
      const { coinList } = this.market;
      const list = [
        {
          code: "all",
          value: this.$t("order.otcOrder.allCoin"),
        },
      ];
      Object.keys(coinList).forEach((item) => {
        if (coinList[item].otcOpen) {
          list.push({ code: item, value: getCoinShowName(item, coinList) });
        }
      });
      this.symbol = "all";
      this.symbolList = list;
      // if (list.length) { this.symbol = list[0].code; }
      this.getData();
    },
    getData() {
      if (this.nowType === 1) {
        this.getNowData();
      } else if (this.nowType === 2) {
        this.getHisData();
      }
    },
    // 获取当前
    getNowData() {
      // 使用全局store中的数据
      if (this.nowType !== 1) return;
      this.tabelLoading = false;

      // 从store获取数据并进行筛选
      let orderList = this.otcOrderList || [];

      // 根据币种筛选
      if (this.axiosSymbol) {
        orderList = orderList.filter((item) => item.coinSymbol === this.axiosSymbol);
      }

      // 根据方向筛选
      if (this.axiosSide) {
        orderList = orderList.filter(
          (item) => item.side.toLowerCase() === this.axiosSide.toLowerCase()
        );
      }

      // 分页处理
      const startIndex = (this.paginationObj.currentPage - 1) * this.paginationObj.display;
      const endIndex = startIndex + this.paginationObj.display;
      const paginatedList = orderList.slice(startIndex, endIndex);

      const tableList = [];
      paginatedList.forEach((item) => {
        let Aurl = "";
        if (process.env.NODE_ENV === "development") {
          Aurl = `/otcDetailOrder?orderId=${item.sequence}`;
        } else {
          Aurl = `${this.linkurl.otcUrl}/otcDetailOrder?orderId=${item.sequence}`;
        }
        let block = "";
        if (item.orderType) {
          Aurl = item.url;
          block = 'target="view_frame"';
        }
        let Flist = [
          // 订单号
          [
            {
              // type: 'link', text: item.sequence, eventType: 'orderId', classes: ['orderId'],
              type: "icon", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
              iconSvg: `<a class="u-8-cl" ${block} href="${Aurl}">${item.sequence}</a>`,
            },
          ],
          [
            {
              text: item.type,
              classes: item.side === "BUY" ? "b-5-cl" : "b-6-cl",
            },
          ],
          getCoinShowName(item.coinSymbol, this.market.coinList), // 币种
          this.currentCoinPriceFix(item.price, item.coinSymbol, item.payCoin), // 价格
          fixD(item.volume, this.getFix(item.coinSymbol)), // 数量
          this.currentCoinPriceFix(item.totalPrice, item.coinSymbol, item.payCoin), // 交易额
        ];
        if (this.excheifFlag) {
          Flist.push(item.relativeFee);
        }
        const Vlist = [
          item.status_text, // 状态
          // 交易对方
          item.orderType
            ? item.realName
            : [
                {
                  type: "html",
                  text: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#6A60FF"/><path d="M9.00926 13.11C8.42926 13.11 7.91592 12.9867 7.46926 12.74C7.02926 12.4933 6.68259 12.1533 6.42926 11.72C6.18259 11.28 6.05926 10.78 6.05926 10.22V5.94H7.63926V10.31C7.63926 10.59 7.69926 10.8333 7.81926 11.04C7.93926 11.2467 8.10259 11.4067 8.30926 11.52C8.52259 11.6267 8.75592 11.68 9.00926 11.68C9.27592 11.68 9.50926 11.6267 9.70926 11.52C9.90926 11.4067 10.0659 11.25 10.1793 11.05C10.2993 10.8433 10.3593 10.6 10.3593 10.32V5.94H11.9393V10.23C11.9393 10.79 11.8159 11.2867 11.5693 11.72C11.3226 12.1533 10.9793 12.4933 10.5393 12.74C10.0993 12.9867 9.58926 13.11 9.00926 13.11Z" fill="white"/></svg><span class="user-nickName">${item.nickName}</span>`,
                  eventType: "userName",
                  classes: ["user"],
                  subContent: {
                    text: item.realName,
                    classes: ["e-2-cl", "sub-content"], // 默认没有
                  },
                },
              ],
          // 操作
          [
            {
              type: "html",
              text: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style="vertical-align: middle; margin-right: 6px;"><path d="M1.5 16.5V3C1.5 2.5875 1.64687 2.23438 1.94063 1.94063C2.23438 1.64687 2.5875 1.5 3 1.5H15C15.4125 1.5 15.7656 1.64687 16.0594 1.94063C16.3531 2.23438 16.5 2.5875 16.5 3V12C16.5 12.4125 16.3531 12.7656 16.0594 13.0594C15.7656 13.3531 15.4125 13.5 15 13.5H4.5L1.5 16.5ZM4.5 10.5H10.5V9H4.5V10.5ZM4.5 8.25H13.5V6.75H4.5V8.25ZM4.5 6H13.5V4.5H4.5V6Z" fill="white"/></svg> ${this.$t(
                "order.otcOrder.trade"
              )}`,
              eventType: "trade",
              classes: ["button", "trade-btn"],
            },
          ],
        ];
        Flist = Flist.concat(Vlist);
        tableList.push({
          id: JSON.stringify(item),
          data: Flist,
        });
      });
      this.tabelList = tableList;
      this.paginationObj.total = orderList.length; // 使用筛选后的总数
    },
    // 获取历史订单
    getHisData() {
      const url = "/order/otc/complete";
      this.axios({
        url,
        method: "post",
        params: {
          // side: this.axiosSide,
          isShowCanceled: this.switchFlag ? 1 : 0,
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
          coinSymbol: this.axiosSymbol,
        },
      }).then((data) => {
        if (this.nowType !== 2) return;
        this.tabelLoading = false;
        if (data.code.toString() === "0") {
          const list = [];
          data.data.orderList.forEach((item) => {
            let Aurl = "";
            if (process.env.NODE_ENV === "development") {
              Aurl = `/otcDetailOrder?orderId=${item.sequence}`;
            } else {
              Aurl = `${this.linkurl.otcUrl}/otcDetailOrder?orderId=${item.sequence}`;
            }
            let block = "";
            if (item.orderType) {
              Aurl = item.url;
              block = 'target="view_frame"';
            }
            let flist = [
              // 订单号
              [
                {
                  // type: 'link', text: item.sequence, eventType: 'orderId', classes: ['orderId'],
                  type: "icon", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                  iconSvg: `<a class="u-8-cl" ${block} href="${Aurl}">${item.sequence}</a>`,
                },
              ],
              [
                {
                  text: item.type,
                  classes: item.side === "BUY" ? "b-5-cl" : "b-6-cl",
                },
              ],
              getCoinShowName(item.coinSymbol, this.market.coinList), // 币种
              this.currentCoinPriceFix(item.price, item.coinSymbol, item.payCoin), // 价格
              fixD(item.volume, this.getFix(item.coinSymbol)), // 数量
              this.currentCoinPriceFix(item.totalPrice, item.coinSymbol, item.payCoin), // 交易额
            ];
            if (this.excheifFlag) {
              flist.push(item.relativeFee);
            }
            const Vlist = [
              item.status_text, // 状态
              // 交易对方
              item.orderType
                ? item.realName
                : [
                    {
                      type: "html",
                      text: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#6A60FF"/><path d="M9.00926 13.11C8.42926 13.11 7.91592 12.9867 7.46926 12.74C7.02926 12.4933 6.68259 12.1533 6.42926 11.72C6.18259 11.28 6.05926 10.78 6.05926 10.22V5.94H7.63926V10.31C7.63926 10.59 7.69926 10.8333 7.81926 11.04C7.93926 11.2467 8.10259 11.4067 8.30926 11.52C8.52259 11.6267 8.75592 11.68 9.00926 11.68C9.27592 11.68 9.50926 11.6267 9.70926 11.52C9.90926 11.4067 10.0659 11.25 10.1793 11.05C10.2993 10.8433 10.3593 10.6 10.3593 10.32V5.94H11.9393V10.23C11.9393 10.79 11.8159 11.2867 11.5693 11.72C11.3226 12.1533 10.9793 12.4933 10.5393 12.74C10.0993 12.9867 9.58926 13.11 9.00926 13.11Z" fill="white"/></svg><span class="user-nickName">${item.nickName}</span>`,
                      eventType: "userName",
                      classes: ["user"],
                      subContent: {
                        text: item.realName,
                        classes: ["e-2-cl", "sub-content"], // 默认没有
                      },
                    },
                  ],
              // 操作
              [
                {
                  type: "html",
                  text: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style="vertical-align: middle; margin-right: 6px;"><path d="M1.5 16.5V3C1.5 2.5875 1.64687 2.23438 1.94063 1.94063C2.23438 1.64687 2.5875 1.5 3 1.5H15C15.4125 1.5 15.7656 1.64687 16.0594 1.94063C16.3531 2.23438 16.5 2.5875 16.5 3V12C16.5 12.4125 16.3531 12.7656 16.0594 13.0594C15.7656 13.3531 15.4125 13.5 15 13.5H4.5L1.5 16.5ZM4.5 10.5H10.5V9H4.5V10.5ZM4.5 8.25H13.5V6.75H4.5V8.25ZM4.5 6H13.5V4.5H4.5V6Z" fill="white"/></svg> ${this.$t(
                    "freeStaking.home.takeActivity"
                  )}`,
                  eventType: "trade",
                  classes: ["button", "trade-btn"],
                },
              ],
            ];

            flist = flist.concat(Vlist);
            list.push({
              id: JSON.stringify(item),
              data: flist,
            });
          });
          this.tabelList = list;
          this.paginationObj.total = data.data.count;
        }
      });
    },
    // 切换委托
    currentType(item) {
      if (this.nowType === item.index) {
        return;
      }
      this.nowType = item.index;
      this.paginationObj.currentPage = 1; // 页码
      this.paginationObj.total = 0; // 总条数
      this.tabelList = [];
      this.tabelLoading = true;
      // 切换tab时触发全局轮询更新
      if (this.nowType === 1) {
        this.$store.dispatch("getOtcOrderList");
      }

      this.getData();
    },
    // 切换币种
    symbolChange(item) {
      if (this.symbol === item.code) {
        return;
      }
      this.symbol = item.code;
      this.paginationObj.currentPage = 1; // 页码
      this.paginationObj.total = 0; // 总条数
      this.tabelList = [];
      this.tabelLoading = true;
      this.getData();
    },
    // 切换方向
    sideChange(item) {
      if (this.side === item.code) {
        return;
      }
      this.side = item.code;
      this.paginationObj.currentPage = 1; // 页码
      this.paginationObj.total = 0; // 总条数
      this.tabelList = [];
      this.tabelLoading = true;
      this.getData();
    },
    tableClick(type, v) {
      const data = JSON.parse(v);
      if (type === "orderId") {
        if (this.otcLinkUrl.type === "1") {
          this.$router.push(`${this.otcLinkUrl.url}/otcDetailOrder?orderId=${data.sequence}`);
        } else if (this.otcLinkUrl.type === "2") {
          window.location.href = `${this.otcLinkUrl.url}/otcDetailOrder?orderId=${data.sequence}`;
        }
      } else if (type === "userName") {
        // let id = "";
        // if (data.side === "BUY") {
        //   id = data.sellerId;
        // } else if (data.side === "SELL") {
        //   id = data.buyerId;
        // }
        // if (this.otcLinkUrl.type === "1") {
        //   this.$router.push(`${this.otcLinkUrl.url}/stranger?uid=${id}`);
        // } else if (this.otcLinkUrl.type === "2") {
        //   window.location.href = `${this.otcLinkUrl.url}/stranger?uid=${id}`;
        // }
      } else if (type === "trade") {
        // 跳转到当前订单详情 Aurl
        let Aurl = "";
        if (process.env.NODE_ENV === "development") {
          Aurl = `/otcDetailOrder?orderId=${data.sequence}`;
        } else {
          Aurl = `${this.linkurl.otcUrl}/otcDetailOrder?orderId=${data.sequence}`;
        }
        if (data.orderType && data.url) {
          // 第三方链接，直接跳转
          window.location.href = data.url;
          return;
        }
        if (this.otcLinkUrl.type === "1") {
          this.$router.push(Aurl);
        } else if (this.otcLinkUrl.type === "2") {
          window.location.href = Aurl;
        }
      }
    },
    pagechange(v) {
      this.paginationObj.currentPage = v;
      this.getData();
    },
  },
};
