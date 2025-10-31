import { myStorage } from "@/utils";

export default {
  name: "recommend",
  data() {
    return {
      dataList: {},
      klineDataList_recommend: {},
      mySymbolList: "",
      symbolCurrent: myStorage.get("sSymbolName"),
    };
  },
  computed: {
    // 全部币对列表
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    symbolCurrentCoinName() {
      return this.symbolCurrent.split("/")[0] || "";
    },
  },
  destroyed() {
    // 改，2022.10.24，RECOMMEEND_DATA -> RECOMMEEND_DATA_MARKET
    this.$bus.$off("RECOMMEEND_DATA_MARKET");
    // 改，2022.10.24，RECOMMEEND_KLINE_DATA -> RECOMMEEND_KLINE_DATA_MARKET
    this.$bus.$off("RECOMMEEND_KLINE_DATA_MARKET");
    this.$bus.$off("SWITCH-SYMBOL");
    this.$bus.$off("MYSYMBOL-LIST");
  },
  methods: {
    init() {
      // 监听 数据
      // 改，2022.10.24，RECOMMEEND_DATA -> RECOMMEEND_DATA_MARKET
      this.$bus.$on("RECOMMEEND_DATA_MARKET", (data) => {
        this.dataList = data;
      });
      // 改，2022.10.24，RECOMMEEND_KLINE_DATA -> RECOMMEEND_KLINE_DATA_MARKET
      this.$bus.$on("RECOMMEEND_KLINE_DATA_MARKET", (data) => {
        const keys = Object.keys(data);
        this.klineDataList_recommend = {};
        keys.forEach((item) => {
          if (this.symbolCurrent === item) {
            this.klineDataList_recommend[item] = data[item];
            this.$set(this.klineDataList_recommend, item, data[item]);
          }
        });
      });
      this.$bus.$on("SWITCH-SYMBOL", (data) => {
        this.symbolCurrent = data;
      });
      this.$bus.$on("MYSYMBOL-LIST", (data) => {
        this.mySymbolList = data;
      });
    },
    marketClick(symbol) {
      this.$bus.$emit("SWITCH-STORE", symbol);
    },
    bandLink(symbol) {
      const symbolArr = symbol.split("/");
      const sym = `${symbolArr[0]}_${symbolArr[1]}`;
      this.$router.push(`/trade/${sym}`);
    },
  },
};
