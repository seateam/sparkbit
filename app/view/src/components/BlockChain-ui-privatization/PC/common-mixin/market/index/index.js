import { mapState } from "vuex";
import worker from "@/utils/webWorker";
import worker_new from "@/utils/webWorker_new";

import { myStorage, getCoinShowName, imgMap } from "@/utils";

// 改，2022.11.02，新增
const defaultIcon = imgMap.f_1;

export default {
  data() {
    return {
      // 市场数据
      marketData: null,
      // MywebSocket
      MywebSocket: null,
      // 当前市场
      marketCurrent: null,
      // 当前币对
      symbolCurrent: null,
      // 当前币对列表
      symbolCurrentList: [],
      // 筛选 货币对
      listfilter: null,
      // 表格加载LOADING
      tableLoading: false,
      // 表格 超过 20条出现滚动条
      lineNumber: 20,
      // 24小时行情WS数据
      marketDataObj: [],
      marketDataList: [],
      // 推荐位数据
      recommendDataList: {},
      klineDataList: {},
      klineDataList2: {}, // 改，2022.11.23 冗余一个变量存储列表echart数据
      // 自选币对
      mySymbolList: myStorage.get("mySymbol") || [],
      setMyMarketSwitch: true,
      // 是否显示左侧数据栏
      isShowRecommend: true,

      // 改，2022.10.24，新增
      // 市场数据
      marketData: null,
      // 当前市场
      marketCurrent: null,
      // 当前币对
      symbolCurrent: null,
      klineDataList_new: {},
      // MywebSocket
      MywebSocket_new: null,

      om_icon1: imgMap.om_icon1,
    };
  },
  computed: {
    coinTagLangs() {
      return this.$store.state.baseData.coinTagLangs;
    },
    coinTagOpen() {
      return this.$store.state.baseData.coin_tag_open;
    },
    ...mapState({
      baseInfo({ baseData }) {
        this.marketData = baseData.market;
        // 获取当前市场
        this.marketCurrent = myStorage.get("homeMarkTitle");
        // 获取当前币对
        this.symbolCurrent = myStorage.get("sSymbolName");
        return baseData;
      },
    }),
    // WS worker
    worker() {
      return worker();
    },
    // 全部 货币对
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    // 当前市场列表
    currentMarketList() {
      return this.marketData ? this.marketData.market : null;
    },
    coinList() {
      if (this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    // 页面标题title
    documentTitle() {
      const lang = getCookie("lan");
      let str = "";
      if (this.publicInfo) {
        const { indexHeaderTitle, seo } = this.publicInfo;
        let title = "";
        if (indexHeaderTitle) {
          if (lang) {
            title = seo.title || indexHeaderTitle[lang];
          } else {
            const lan = this.publicInfo.lan.defLan;
            title = seo.title || indexHeaderTitle[lan];
          }
        }
        // 这里可以根据market页面的需求自定义标题格式
        str = `${title}-${this.$t("header.market")}`;
      }
      document.title = str;
      return str;
    },
    // USDT币对市场
    usdtGainersList() {
      return (type) => {
        if (this.currentMarketList) {
          const dataList = Object.keys(this.currentMarketList.USDT);
          const { marketDataObj } = this;
          const temp = [];
          for (let i = 0; i < dataList.length; i++) {
            temp.push(marketDataObj[dataList[i]]);
          }
          if (type === 1) {
            temp.sort((a, b) => parseFloat(b.roses) - parseFloat(a.roses));
          }
          return temp;
        }
        return [];
      };
    },
    // 当前币对列表
    symbolList() {
      // 如果 当前市场 是 自选市场
      if (this.marketCurrent === "myMarket") {
        const mySymbol = myStorage.get("mySymbol") || [];
        const marketList = {};
        if (mySymbol.length) {
          mySymbol.forEach((item) => {
            if (item && this.symbolAll[item]) {
              marketList[item] = this.symbolAll[item];
            }
          });
        }
        return marketList;
      }
      if (this.currentMarketList && this.marketCurrent) {
        return this.currentMarketList[this.marketCurrent];
      }
      return null;
    },
    // 汇率单位
    rateData() {
      return this.$store.state.baseData.rate;
    },
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    optionalSymbolServerOpen() {
      return this.$store.state.baseData.optional_symbol_server_open;
    },

    // 改，2022.10.24，新增
    ...mapState({
      baseInfo({ baseData }) {
        this.marketData = baseData.market;
        // 获取当前市场
        this.marketCurrent = myStorage.get("homeMarkTitle");
        // 获取当前币对
        this.symbolCurrent = myStorage.get("sSymbolName");
        return baseData;
      },
    }),
    // 推荐位 币对
    headerSymbol() {
      if (this.marketData) {
        return this.marketData.headerSymbol;
      }
      return [];
    },
    // WS worker
    worker_new() {
      return worker_new();
    },
    // 改，2022.11.02，新增
    // market 接口
    market() {
      return this.$store.state.baseData.market;
    },
    // 获取币种icon
    calCoinIcon() {
      return (coinName) => {
        const { coinList } = this.market;
        coinName = coinName.toUpperCase();
        return coinList[coinName] ? coinList[coinName].icon : "";
      };
    },
    // 展示头部信息
    calDataList() {
      return (coinTag) => {
        let dataList = this.usdtGainersList();
        const { coinList } = this.market;
        dataList = dataList.filter((item) => item);
        return dataList.filter((item) => {
          const idArr = item.name.split("/");
          return coinList[idArr[0]] && coinList[idArr[0]].coinTag == coinTag;
        });
      };
    },
  },
  watch: {
    symbolList(val, oldVal) {
      if (oldVal) {
        this.webSocketSend("Market", "unsub", this.symbolCurrent, oldVal);
        this.webSocketSend("Market", "sub", this.symbolCurrent, val);
        // 改，2022.11.23 获取列表chart数据
        this.getTableChart();
      }
    },
    documentTitle(val) {
      document.title = val;
    },
    // 监听 是否登录
    isLogin(val) {
      if (val) {
        this.mySymbolList = myStorage.get("mySymbol") || [];
      }
    },
    // 监听获取到 market 接口的数据
    marketData(val) {
      if (val.wsUrl) {
        // 创建WS
        this.worker.postMessage({
          type: "CREAT_WEBSOCKET",
          data: {
            wsUrl: val.wsUrl,
            lan: this.$store.state.baseData.lan,
            rate: this.rateData,
            symbolAll: this.symbolAll,
          },
        });

        this.worker_new.postMessage({
          type: "CREAT_WEBSOCKET",
          data: {
            wsUrl: val.wsUrl,
            lan: this.$store.state.baseData.lan,
            rate: this.rateData,
            symbolAll: this.symbolAll,
          },
        });
      }
    },
    // 监听 webSocket 创建成功
    MywebSocket(val) {
      if (val) {
        // 发送 24小时行情历史数据 Send
        this.webSocketSend("Review", null, this.symbolCurrent, this.symbolAll);
        // 发送 24小时行情实时数据 Send
        this.webSocketSend("Market", "sub", this.symbolCurrent, this.symbolList);
        // 改，2022.11.23 获取列表chart数据
        this.getTableChart();
        // 发送 推荐位 kline数据 Send
        if (this.symbolCurrent) {
          this.klneSend();
        }
      }
    },
    // 监听 webSocket 创建成功
    MywebSocket_new(val) {
      if (val) {
        // 发送 24小时行情历史数据 Send
        this.webSocketSend("Review", null, this.symbolCurrent, this.symbolAll);
        // 发送 24小时行情实时数据 Send
        this.webSocketSend("Market", "sub", this.symbolCurrent, this.symbolList);
        // 发送 推荐位 kline数据 Send
        this.klneSend_new();
      }
    },
    symbolCurrent(val, oldVal) {
      if (val && this.MywebSocket) {
        this.isShowRecommend = true;
        this.klneSend(oldVal);
      }
    },
    mySymbolList(val) {
      if (val) {
        this.$bus.$emit("MYSYMBOL-LIST", val);
      }
    },
  },
  beforeDestroy() {
    this.webSocketSend("Market", "unsub", this.symbolCurrent, this.symbolList);
    window.onscroll = null;
  },
  methods: {
    init() {
      this.onmessageWorker();
      // 监听 市场切换
      this.$bus.$on("SWITCH-MARKET", (data) => {
        this.marketCurrent = data;
        this.setMarketData();
      });
      this.$bus.$on("SWITCH-STORE", (data) => {
        this.setMyMarket(data);
        this.setMarketData();
      });
      this.$bus.$on("SWITCH-SYMBOL", (data) => {
        this.symbolCurrent = data;
        this.setRecommendData();
      });
      this.$bus.$emit("MYSYMBOL-LIST", this.mySymbolList);
      // 监听 窗口的大小改变
      this.$bus.$on("WINFOW_ON_RESIIZE", () => {
        this.isShowRecommend = true;
      });
    },
    klneSend(oldVal) {
      const symbolArr = this.symbolCurrent.toLowerCase().split("/");
      const symbol = symbolArr[0] + symbolArr[1];
      if (oldVal) {
        const oldSymbolArr = oldVal.toLowerCase().split("/");
        const oldSsymbol = oldSymbolArr[0] + oldSymbolArr[1];
        this.worker.postMessage({
          type: "WEBSOCKET_KLINE_SEND",
          data: {
            symbol: oldSsymbol,
            type: "unsub",
            lastTimeS: "1min",
          },
        });
      }
      this.worker.postMessage({
        type: "WEBSOCKET_KLINE_SEND",
        data: {
          symbol,
          type: "req",
          lastTimeS: "1min",
          lTime: false,
          number: 100,
          symbolCurrent: this.symbolCurrent,
        },
      });
      this.worker.postMessage({
        type: "WEBSOCKET_KLINE_SEND",
        data: {
          symbol,
          type: "sub",
          lastTimeS: "1min",
          lTime: false,
          symbolCurrent: this.symbolCurrent,
        },
      });
    },
    // 改，2022.11.23 从socket中请求列表中的数据统计数据
    getTableChart() {
      let { symbolList } = this;
      symbolList = Object.keys(symbolList);
      for (let i = 0; i < symbolList.length; i++) {
        const symbolArr = symbolList[i].toLowerCase().split("/");
        const symbol = symbolArr[0] + symbolArr[1];
        this.worker.postMessage({
          type: "WEBSOCKET_KLINE_SEND",
          data: {
            symbol,
            type: "req",
            lastTimeS: "1min",
            lTime: false,
            number: 100,
            symbolCurrent: this.symbolCurrent,
          },
        });
      }
    },
    // 改，2022.10.24，新增
    klneSend_new() {
      // 改，2022.10.24，新增
      if (this.headerSymbol.length) {
        this.headerSymbol.forEach((item) => {
          const symbolArr = item.toLowerCase().split("/");
          const symbol = symbolArr[0] + symbolArr[1];
          this.worker_new.postMessage({
            type: "WEBSOCKET_KLINE_SEND",
            data: {
              symbol,
              type: "req",
              lastTimeS: "1min",
              lTime: false,
              number: 100,
              symbolCurrent: item,
            },
          });
          this.worker_new.postMessage({
            type: "WEBSOCKET_KLINE_SEND",
            data: {
              symbol,
              type: "sub",
              lastTimeS: "1min",
              lTime: false,
              symbolCurrent: item,
            },
          });
        });
      }
    },
    onmessageWorker() {
      this.worker.onmessage = (event) => {
        const { data } = event;
        // 监听 WebSocket 链接成功
        if (data.type === "WEBSOCKET_ON_OPEN") {
          this.MywebSocket = data.data.type;
        }
        // 监听 WS 数据
        if (data.type === "WEBSOCKET_DATA") {
          this.listenWSData(data.data);
          // 改，2022.11.23 新增一个获取WS数据-用于列表 echart 图
          this.listenWSData2(data.data);
        }
      };

      // 改，2022.10.24，新增
      this.worker_new.onmessage = (event) => {
        const { data } = event;
        // 监听 WebSocket 链接成功
        if (data.type === "WEBSOCKET_ON_OPEN") {
          this.MywebSocket_new = data.data.type;
        }
        // 监听 WS 数据
        if (data.type === "WEBSOCKET_DATA") {
          this.listenWSData_new(data.data);
        }
      };
    },
    // 监听 WS 返回的数据
    listenWSData(data) {
      const { type, WsData } = data;
      // 24小时行情数据
      if (type === "MARKET_DATA") {
        this.marketDataObj = WsData;
        this.setMarketData();
        this.setRecommendData();
      }
      if (type.indexOf("KLINE_DATA") > -1) {
        const [, symbolType] = WsData.channel.split("_");
        const key = this.symbolCurrent;
        const symbolArr = this.symbolCurrent.toLowerCase().split("/");
        const symbol = symbolArr[0] + symbolArr[1];
        if (symbol === symbolType) {
          if (WsData.event_rep === "rep") {
            const kData = WsData.data;
            this.klineDataList[key] = [];
            const lengthNumber = kData.slice(-20);
            lengthNumber.forEach((item) => {
              this.klineDataList[key].push([item.id, item.close]);
            });
          } else {
            const kData = WsData.tick;
            const keyYs = this.klineDataList[key] || [];
            const lengths = keyYs.length;
            if (this.klineDataList[key].length) {
              const lastId = this.klineDataList[key][lengths - 1][0];
              if (lastId === kData.id) {
                this.klineDataList[key].pop();
              }
              if (this.klineDataList[key].length > 20) {
                this.klineDataList[key].shift();
              }
              if (lastId <= kData.id) {
                this.klineDataList[key].push([kData.id, kData.close]);
              }
            }
          }
        }
        this.$bus.$emit("RECOMMEEND_KLINE_DATA_MARKET", this.klineDataList);
      }
    },
    // 改，2022.11.23 新增一个获取WS数据-用于列表 echart 图
    listenWSData2(data) {
      const { type, WsData } = data;
      // if(this.klineDataList2[key]){
      //   return
      // }
      if (type.indexOf("KLINE_DATA") > -1) {
        const [, symbolType] = WsData.channel.split("_");
        let newdata = [];
        const newList = {};
        let { symbolList } = this;
        symbolList = Object.keys(symbolList);
        const key = symbolList.find((item) => symbolType == item.replace("/", "").toLowerCase());
        const lengthNumber = Array.isArray(WsData.data) ? WsData.data.slice(-20) : [];
        newdata = lengthNumber.map((item) => [item.id, item.close]);
        if (!this.klineDataList2[key]) {
          this.$set(this.klineDataList2, key, newdata);
        }
        this.$bus.$emit("RECOMMEEND_KLINE_DATA_MARKET2", this.klineDataList2);
      }
    },
    // 改，2022.10.24，新增
    // 监听 WS 返回的数据
    listenWSData_new(data) {
      const { type, WsData } = data;
      // 24小时行情数据
      if (type === "MARKET_DATA") {
        this.marketDataObj = WsData;
        this.setMarketData();
        this.setRecommendData_new();
      }
      if (type.indexOf("KLINE_DATA") > -1) {
        if (this.headerSymbol.length && !this.isCoOpen) {
          this.headerSymbol.forEach((key) => {
            const [, symbolType] = WsData.channel.split("_");
            const symbolArr = key.toLowerCase().split("/");
            const symbol = symbolArr[0] + symbolArr[1];
            if (symbol === symbolType) {
              if (WsData.event_rep === "rep") {
                const kData = WsData.data;
                this.klineDataList_new[key] = [];
                const lengthNumber = kData.slice(-20);
                lengthNumber.forEach((item) => {
                  this.klineDataList_new[key].push([item.id, item.close]);
                });
              } else {
                const kData = WsData.tick;
                const keyYs = this.klineDataList_new[key] || [];
                const lengths = keyYs.length;
                if (this.klineDataList_new[key].length) {
                  const lastId = this.klineDataList_new[key][lengths - 1][0];
                  if (lastId === kData.id) {
                    this.klineDataList_new[key].pop();
                  }
                  if (this.klineDataList_new[key].length > 20) {
                    this.klineDataList_new[key].shift();
                  }
                  this.klineDataList_new[key].push([kData.id, kData.close]);
                }
              }
            }
          });
          this.$bus.$emit("RECOMMEEND_KLINE_DATA", this.klineDataList_new);
        }
      }
    },
    // 发送 Send
    webSocketSend(type, sendType, symbolData, symbolList) {
      this.worker.postMessage({
        type: "WEBSOCKET_SEND",
        data: {
          type,
          sendType,
          symbolData,
          symbolList,
        },
      });

      // 改，2022.10.24，新增
      this.worker_new.postMessage({
        type: "WEBSOCKET_SEND",
        data: {
          type,
          sendType,
          symbolData,
          symbolList,
        },
      });
    },
    // 格式化 推荐位的 K线数据
    setRecommendData() {
      if (this.marketDataObj && this.marketDataObj[this.symbolCurrent]) {
        // 改，2022.10.24，RECOMMEEND_DATA -> RECOMMEEND_DATA_MARKET
        this.$bus.$emit("RECOMMEEND_DATA_MARKET", this.marketDataObj[this.symbolCurrent]);
      }
    },
    // 改，2022.10.24，新增
    // 格式化 推荐位的 K线数据
    setRecommendData_new() {
      if (this.headerSymbol.length && !this.isCoOpen) {
        this.headerSymbol.forEach((item) => {
          this.recommendDataList[item] = {};
          if (this.marketDataObj && this.marketDataObj[item]) {
            this.recommendDataList[item] = this.marketDataObj[item];
          }
        });
        this.$bus.$emit("RECOMMEEND_DATA", this.recommendDataList);
      }
    },
    getCoinLabel(name, coinList = {}) {
      if (coinList && coinList[name.toUpperCase()]) {
        const { coinTag = "" } = coinList[name.toUpperCase()];
        return coinTag ? this.coinTagLangs[coinTag] : "";
      }

      return "";
    },
    // 格式化 推荐位的24小时行情数据
    setMarketData() {
      if (!this.symbolList) return;
      const marketDataList = [];
      const keyarr = Object.keys(this.symbolList);

      // 改，2022.11.02，新增
      const { coinList } = this.market;

      keyarr.forEach((item) => {
        if (this.symbolList[item].newcoinFlag) {
          this.newcoinFlag = true;
        }
        const itemData = this.marketDataObj[item];
        if (itemData) {
          const showName = getCoinShowName(itemData.name, this.symbolAll);
          const coinLabel = this.getCoinLabel(itemData.symbol.symbol, this.coinList);

          // 改，2022.08.27
          // let iconSvg = `<span>${showName}</span>`;
          let iconSvg = `<span style="font-family: Outfit; font-style: normal; font-weight: 600; font-size: 16px; line-height: 20px; color: var(--color-1);">${
            showName.split("/")[0]
          }</span><span style="font-family: Outfit; font-style: normal; font-weight: 500; font-size: 12px; line-height: 16px; color: #999;"> /${
            showName.split("/")[1]
          }</span>`;

          if (coinLabel && this.coinTagOpen) {
            const str = `<div class="coin-label">
              <span class="coin-text a-12-cl">${coinLabel}</span>
              <span class="coin-bg a-12-bg"></span>
            </div>`;
            iconSvg = `${iconSvg}${str}`;
          }

          // 改，2022.11.02，新增
          const coin_left = item.split("/")[0];
          let coinSymbolImg = defaultIcon;
          if (coinList[coin_left] && coinList[coin_left].icon.length) {
            coinSymbolImg = coinList[coin_left].icon;
          }
          const coinStmbol = `<div class="coinIcon" style="width:28px;height:28px;display:flex;margin-right:12px"><img style="border-radius: 50%;" src="${coinSymbolImg}"/></div>`;
          iconSvg = `${coinStmbol}${iconSvg}`;

          if (coinLabel && this.coinTagOpen) {
            const str = `<div class="coin-label">
            <span class="coin-text a-12-cl">${coinLabel}</span>
            <span class="coin-bg a-12-bg"></span>
          </div>`;
            iconSvg = `${iconSvg}${str}`;
          }

          marketDataList.push({
            isShow: this.symbolList[item].isShow,
            id: itemData.name,
            showName,
            data: [
              [
                {
                  iconSvg: this.myMarketIcon(itemData.name),
                  type: "icon",
                  eventType: "store",
                },
                {
                  iconSvg,
                  type: "icon",
                  eventType: "symbol",
                  classes: "symbolName",
                  sortVal: itemData.sort,
                  key: "sort",
                },
              ],
              [
                {
                  text: itemData.close.data,
                  classes: ["fontSize14"],
                  sortVal: itemData.closes,
                  key: "closes",
                  subContent: {
                    text:
                      itemData.close.price !== "--"
                        ? `≈ ${itemData.close.price}`
                        : itemData.close.price,
                    classes: ["b-2-cl"], // 默认没有
                  },
                },
              ],
              [
                {
                  type: "label",
                  text: itemData.rose.data,
                  sortVal: itemData.roses,
                  key: "roses",
                  classes: this.itemRoseClass(itemData.rose),
                },
              ],
              [
                {
                  text: itemData.high,
                },
              ],
              [
                {
                  text: itemData.low,
                },
              ],
              [
                {
                  text: itemData.vol,
                },
              ],
              [
                {
                  text: itemData.amount,
                },
              ],
            ],
          });
        }
      });
      this.marketDataList = marketDataList.sort((a, b) => a.sort - b.sort);
    },
    // 设置币对是否收藏的ICON
    myMarketIcon(symbol) {
      if (this.mySymbolList.indexOf(symbol) === -1) {
        return `<img src="${imgMap.star}" class="icon-24px" onmouseover="this.src='${imgMap.star_hover}'" onmouseout="this.src='${imgMap.star}'">`;
      }
      return `<img src="${imgMap.stared}" class="icon-24px">`;
    },
    // 设置 自选币对
    setMyMarket(symbol) {
      let url = this.$store.state.url.common.optional_symbol;
      if (this.optionalSymbolServerOpen === 1) {
        url = this.$store.state.url.common.optional_symbols;
      }
      // 防止重复点击
      if (!this.setMyMarketSwitch) return;
      this.setMyMarketSwitch = false;

      let mySymbol = myStorage.get("mySymbol") || [];
      let addOrDelete = true;
      if (mySymbol.length && mySymbol.indexOf(symbol) > -1) {
        mySymbol = mySymbol.filter((item) => item !== symbol);
        addOrDelete = false;
      } else {
        mySymbol.push(symbol);
        addOrDelete = true;
      }
      if (this.optionalSymbolServerOpen === 1 && this.isLogin) {
        this.axios({
          url,
          headers: {},
          params: {
            operationType: addOrDelete === true ? "1" : "2", // 0批量添加 1单个添加 2单个删除
            symbols: symbol,
          },
          method: "post",
        }).then((data) => {
          if (data.code === "0") {
            this.setMyMarketSwitch = true;
            this.mySymbolList = mySymbol;
            myStorage.set("mySymbol", mySymbol);
          } else {
            this.$bus.$emit("tip", { text: data.msg, type: "error" });
          }
        });
      } else {
        this.setMyMarketSwitch = true;
        this.mySymbolList = mySymbol;
        myStorage.set("mySymbol", mySymbol);
      }
    },
    // 24小时行情 涨跌幅 的背景、样色的class
    itemRoseClass(rose) {
      let bgClass = null;
      if (rose.class === "u-1-cl") {
        // bgClass = "rose-label u-3-bg";
        bgClass = "t-1-g";
      } else if (rose.class === "u-4-cl") {
        // bgClass = "rose-label u-6-bg";
        bgClass = "t-1-r";
      }
      return [rose.class, bgClass];
    },
    closeRecommend() {
      this.isShowRecommend = false;
    },
  },
};
