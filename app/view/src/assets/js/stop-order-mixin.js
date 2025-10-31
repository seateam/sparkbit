import axios from "axios";
import { fixD } from "@/utils";
import systemConfig from "@/vuex/modules/systemConfig";

export default {
  data() {
    return {
      formData_7: {
        title: "触发价",
        units: "",
        fix: 4,
        isShow: true,
        errorText: null,
        value: null,
        promptText: "当该合约的最新成交价达到该价格时，系统将按照你设置的下单价格和下单数量为你下单。",
        percentageValue: null,
      },
      formData_8: {
        title: "委托价格",
        fix: 4,
        isShow: true,
        errorText: null,
        value: null,
      },
      formData_9: {
        title: "委托数量",
        units: "张",
        fix: 0,
        isShow: true,
        errorText: null,
        value: null,
        promptText: null,
        percentageValue: null,
      },
      formData_11: {
        title: "触发价",
        units: "",
        fix: 4,
        isShow: true,
        errorText: null,
        value: null,
        promptText: "当该合约的最新成交价达到该价格时，系统将按照你设置的下单价格和下单数量为你下单。",
        percentageValue: null,
      },
      formData_12: {
        title: "委托价格",
        fix: 4,
        isShow: true,
        errorText: null,
        value: null,
      },
      formData_13: {
        title: "委托数量",
        units: "张",
        fix: 0,
        isShow: true,
        errorText: null,
        value: null,
        promptText: null,
        percentageValue: null,
      },
      isMarketBuy: false, // 是否市价交易
      isMarketSell: false, // 是否市价交易
      percentageValue: null,
      marketPriceBuy: 0,
      marketPriceSell: 0,
    };
  },
  mounted() {
    this.getMarketPrice();
  },
  methods: {
    // 获取市场价格/实时的
    getMarketPrice() {
      const that = this;
      this.$bus.$on('ECHARTS_DATA', (data) => {
        if (data.asksArr && data.asksArr.length) {
          const f = data.asksArr[0];
          if (f) {
            const [d] = f;
            that.marketPriceSell = fixD(d, that.fixValue.priceFix);
          }
        }
        if (data.buysArr && data.buysArr.length) {
          const i = data.buysArr.length - 1;
          const f = data.buysArr[i];
          if (f) {
            const [d] = f;
            that.marketPriceBuy = fixD(d, that.fixValue.priceFix);
          }
        }
      });
    },
    // 表单输入
    changeInput(type, value) {
      let symbolAccoubt = +this.currenTaccount.symbolAccoubt; // 可用交易币
      let unitsAccoubt = +this.currenTaccount.unitsAccoubt; // 可用标准币
      if (type === "formData_9" && (value * this.formData_8.value) > unitsAccoubt) {
        this[type].value = unitsAccoubt;
        return
      }
      if (type === "formData_13" && +value > symbolAccoubt) {
        this[type].value = symbolAccoubt;
        return
      }
      this[type].value = value;
    },
    // 条件单切换 市价 and 限价
    selectMarket(type) {
      if (type === "buy") {
        this.changeInput("formData_8", this.marketPriceBuy);
      } else {
        this.changeInput("formData_12", this.marketPriceSell);
      }
    },
    // 清除表单数据
    clearFormData(type) {
      if (type === 'buy') {
        this.formData_8.value = null;
        this.formData_7.value = null;
        this.formData_7.errorText = null;
        this.formData_8.errorText = null;
        this.formData_9.errorText = null;
        this.formData_9.value = null;
        // 百分数
        this.formData_7.percentageValue = null;
        this.formData_9.percentageValue = null;
      } else {
        this.formData_12.value = null;
        this.formData_11.value = null;
        this.formData_11.errorText = null;
        this.formData_12.errorText = null;
        this.formData_13.errorText = null;
        this.formData_13.value = null;
        // 百分数
        this.formData_11.percentageValue = null;
        this.formData_13.percentageValue = null;
      }
    },
    // 清除百分比
    clearPercentage(type) {
      if (type === "buy") {
        this.formData_9.value = null;
        this.formData_9.percentageValue = null;
        this.formData_7.percentageValue = null;
      } else {
        this.formData_13.value = null;
        this.formData_13.percentageValue = null;
        this.formData_11.percentageValue = null;
      }
    },
    // 设置百分比
    setpercentageValue(value, type) {
      const that = this;
      const UA = +this.currenTaccount.unitsAccoubt;
      let SA = this.currenTaccount.symbolAccoubt; // 可用交易币

      if (type === "buy") {
        let val =  (UA / that.formData_8.value ) * (value * 0.01);
        this.formData_9.value = val;
        this.formData_9.errorText = null;
      } else {
        this.formData_13.value = SA * (value * 0.01);
        this.formData_13.errorText = null;
      }
    },
    submitStopOrder(type) {
      const that = this;
      type = type.toLowerCase();
      let isBuy = type === "buy";
      console.log("type", type);
      let postData = {
        triggerPrice: isBuy ? that.formData_7.value : that.formData_11.value,
        price: isBuy ? that.formData_8.value : that.formData_12.value,
        volume: isBuy ? that.formData_9.value : that.formData_13.value,
        symbol: that.symbolCurrent.replace("/", "")
          .toLowerCase(),
        type: "1",
        side: type.toUpperCase(),
        userId: that.userInfo.id,
      };
      if(!postData.triggerPrice){
        this.$bus.$emit("tip", {
          text: "The trigger price must not be empty",
          type: "error",
        });
        return;
      }
      // 如果使用百分比
      if (isBuy) {
        const unitsAccoubt = +this.currenTaccount.unitsAccoubt;
        const formData_9 = that.formData_9;
        // 可以余额不足
        if (unitsAccoubt <= 0) {
          this.$bus.$emit("tip", {
            text: this.$t("otcRelease.availableBalance"),
            type: "error",
          });
          return;
        }
        // 如果使用百分比：volume = unitsAccoubt / price * percentageValue * 0.01
        if (formData_9.percentageValue) {
          postData.volume = (unitsAccoubt / that.formData_8.value ) * (formData_9.percentageValue * 0.01);
        }
      } else if (type === "sell") {
        const symbolAccoubt = +this.currenTaccount.symbolAccoubt;
        const formData_13 = that.formData_13;
        // 可以余额不足
        if (symbolAccoubt <= 0) {
          this.$bus.$emit("tip", {
            text: this.$t("otcRelease.availableBalance"),
            type: "error",
          });
          return;
        }
        // 如果使用百分比：volume = unitsAccoubt * percentageValue * 0.01
        if (formData_13.percentageValue) {
          postData.volume = symbolAccoubt * formData_13.percentageValue * 0.01;
        }
      }
      postData.volume = (+postData.volume).toFixed(4);
      const stopOrderUrl = this.$store.state.systemConfig.stopOrderUrl;
      axios({
        method: 'post',
        url: `${stopOrderUrl}/stop-order/save`,
        data: postData,
      })
        .then(res => {
          if (res.data.code === "0") {
            let tipType = type == "buy" ? "info" : "error"
            this.$bus.$emit("tip", { text: this.$t("trade.dealCussess"), type: tipType });
            this.$bus.$emit("STOP_ORDER");
            this.clearFormData(type);
          }
        });
    },
  },
};
