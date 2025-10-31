import { mapGetters, mapState } from "vuex";
import worker from "@/utils/webWorker";
import {
  fixD, myStorage, imgMap, colorMap, setCookie, getCookie,
} from "@/utils";

export default {
  data() {
    return {
      markTitleClass: "markTitle",
      symbolNameClass: "sSymbolName",
      // MywebSocket
      MywebSocket: null,
      // 当前市场
      marketCurrent: null,
      marketData: null,
      // 当前币对
      symbolCurrent: "ORX/OUDT",
      // 当前币对列表
      symbolCurrentList: [],
      // 深度级别
      depthClasses: "0",
      // 深度值
      depthValue: null,
      lTime: null,
      lastTimeS: myStorage.get("lastTimeS"),
      routeSymbol: this.$route.params.symbol,
    };
  },
  computed: {
    ...mapState({
      baseInfo({ baseData }) {
        this.marketData = baseData.market;
        // 获取当前市场
        this.marketCurrent = myStorage.get(this.markTitleClass);
        return baseData;
      },
    }),
    worker() {
      return worker();
    },
    // 是否Login
    isLogin() {
      const { baseInfo } = this;
      return this.$store.state.baseData.isLogin;
    },
    // market 接口
    market() {
      return this.$store.state.baseData.market;
    },
    // Market 数据
    marketList() {
      return this.marketData ? this.marketData.market : null;
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
      if (this.marketList && this.marketCurrent) {
        return this.marketList[this.marketCurrent];
      }
      return null;
    },
    // 全部币种列表
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
  },
  watch: {
    market: {
      immediate: true,
      handler(v) {
        console.log("market", v);
        if (v) {
          this.init();
        }
      },
    },
    // 监听 获取到数据
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
      }
    },
    // 监听 webSocket 创建成功
    MywebSocket(val) {
      if (val) {
        // 发送 24小时行情历史数据 Send
        this.webSocketSend("Review", null, this.symbolCurrent, this.symbolList);
        // 发送 24小时行情实时数据 Send
        this.webSocketSend("Market", "sub", this.symbolCurrent, this.symbolList);
        // 发送 实时成交 数据 Send
        this.webSocketSend("Trade", "req", this.symbolCurrent);
        this.webSocketSend("Trade", "sub", this.symbolCurrent);
        // 发送 盘口深度数据 Send
        this.webSocketSend("Depth", "sub", this.symbolCurrent, this.depthClasses);
      }
    },
  },
  methods: {
    init() {
      this.listenBusEvent();
      this.worker.onmessage = (event) => {
        const { data } = event;
        // 监听 WebSocket 链接成功
        if (data.type === "WEBSOCKET_ON_OPEN") {
          this.MywebSocket = data.data.type;
          this.$bus.$emit("WEBSOCKET_ON_OPEN", this.MywebSocket);
        }
        // 监听 WS 数据
        if (data.type === "WEBSOCKET_DATA") {
          this.listenWSData(data.data);
        }
      };
    },
    listenBusEvent() {
      // 监听 kline 发送Send
      this.$bus.$off("WEBSOCKET_KLINE_SEND");
      this.$bus.$on("WEBSOCKET_KLINE_SEND", (data) => {
        this.worker.postMessage({
          type: "WEBSOCKET_KLINE_SEND",
          data,
        });
      });
    },
    listenWSData(data) {
      const { type, WsData } = data;
      this.$bus.$emit(type, WsData);

      if (type === "KLINE_DATA_REQ") {
        this.$store.dispatch("kLinwReqData", WsData);
      }
      if (type === "KLINE_DATA_SUB") {
        this.$store.dispatch("kLinwSubData", WsData);
      }

      if (type === "TRADE_DATA") {
        this.worker.postMessage({
          type: "TRADE_QUEUE_DATA",
          data: WsData.queueDataList,
        });
      }
    },
    webSocketSend(type, sendType, symbolData, symbolList) {
      this.worker.postMessage({
        type: "WEBSOCKET_SEND",
        data: {
          type,
          sendType,
          symbolData,
          symbolList,
          depthValue: this.depthValue,
        },
      });
    },
  },
};
