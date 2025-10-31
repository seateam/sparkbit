import { myStorage, nul, getCoinShowName, fixRate, fixD, imgMap } from "@/utils";

let timer = null;
export default {
  name: "ex-tradeForm",
  data() {
    return {
      formData_1: {
        title: this.$t("trade.price"), // 价格
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        value: "",
      },
      formData_2: {
        title: this.$t("trade.number"), // '数量',
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[0] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        value: null,
      },
      formData_3: {
        title: this.$t("trade.price"), // '价格',
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        value: null,
      },
      formData_4: {
        title: this.$t("trade.number"), // '数量',
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[0] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        value: null,
      },
      formData_5: {
        title: this.$t("trade.noUnlock"), // '充值未解锁',
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[0] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: true,
        disabledText: "",
        isShowUnit: true,
        value: null,
      },
      formData_6: {
        title: this.$t("trade.ySellVol"), // '可卖出数量',
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[0] : "USDT",
        subText: "",
        errorText: "",
        isError: false,
        disabled: true,
        disabledText: "",
        isShowUnit: true,
        value: null,
      },
      // 交易类型 1限价 2 市价
      transactionType: 1,
      // 当前切换的货币对
      symbolCurrent: myStorage.get("sSymbolName"),
      // 百分比
      perArr: [0, 25, 50, 75, 100],
      perBuy: null,
      perSell: null,
      // 防止多次提交
      fal: true,
      assetsInter: null,
      totalBalancesHide: false,
      unlockSellFlag: true, // 解锁卖出
      isShowDialog: false,
      imgMap,
      tsTexttype: 1,
      // 改，2022.11.18 新增一个submitData字段缓存提交参数
      submitData: {},
      showLoginTips: false,
    };
  },
  props: {},
  computed: {
    localText() {
      return {
        title1: this.$t("trade.price"), // 价格
        title2: this.$t("trade.number"), // '数量',
        title3: this.$t("trade.price"), // '价格',
        title4: this.$t("trade.number"), // '数量',
        title5: this.$t("trade.noUnlock"), // '充值未解锁',
        title6: this.$t("trade.ySellVol"), // '可卖出数量',
      };
    },
    coinSymbols() {
      if (this.symbolCurrent) {
        return this.symbolCurrent.replace("/", ",");
      }
      return "";
    },
    // 全部币种列表
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    overchargeMsg() {
      const symbolInfo = this.coinList[this.symbolUnit.symbol];
      return symbolInfo ? symbolInfo.isOverchargeMsg : "";
    },
    // 是否展示解锁卖出
    showUnlockSell() {
      const { symbol } = this.symbolUnit;
      const { publicInfo } = this.$store.state.baseData;
      let flag = false;
      if (publicInfo && symbol && this.isLogin && publicInfo.market) {
        const { coinList } = publicInfo.market;
        if (
          coinList[symbol] &&
          coinList[symbol].isOvercharge &&
          coinList[symbol].isOvercharge.toString() === "1"
        ) {
          flag = true;
        }
      }
      return flag;
    },
    // 是否为计价货币手续费币对
    openQuoteFee() {
      const { units, symbol } = this.symbolUnit;
      const { publicInfo } = this.$store.state.baseData;
      let flag = false;
      if (publicInfo && units && symbol && publicInfo.market) {
        const { market } = publicInfo.market;
        if (
          market[units] &&
          market[units][`${symbol}/${units}`] &&
          market[units][`${symbol}/${units}`].openQuoteFee &&
          market[units][`${symbol}/${units}`].openQuoteFee.toString() === "1"
        ) {
          flag = true;
        }
      }
      return flag;
    },
    // 计价货币手续费率
    quoteFeeRate() {
      const { units, symbol } = this.symbolUnit;
      const { publicInfo } = this.$store.state.baseData;
      let quoteFeeRate = 0;
      if (publicInfo && symbol && units && publicInfo.market && this.openQuoteFee) {
        const { market } = publicInfo.market;
        quoteFeeRate = market[units][`${symbol}/${units}`].quoteFeeRate;
      }
      return quoteFeeRate;
    },
    isLogin() {
      if (this.$store.state.baseData.isLogin) {
        return this.$store.state.baseData.isLogin;
      }
      return false;
    },
    // 按钮信息
    buttosContent() {
      return {
        buyButton: {
          text: this.isLogin
            ? `${this.$t("trade.buy")} ${getCoinShowName(this.symbolUnit.symbol, this.coinList)}`
            : this.$t("trade.loginReg4"), // '登录/注册',
          // 改，2022.09.22，颜色 u-1-bg -> u-8-bg
          class: this.isLogin ? "u-8-bg buyBtn u-16-cl" : "u-8-bg buyBtn u-16-cl notLogin",
        },
        sellButton: {
          text: this.isLogin
            ? `${this.$t("trade.sell")} ${getCoinShowName(this.symbolUnit.symbol, this.coinList)}`
            : this.$t("trade.loginReg4"), // '登录/注册',
          class: this.isLogin ? "u-4-bg sellBtn u-16-cl" : "u-8-bg sellBtn u-16-cl notLogin",
        },
        unlockSellButton: {
          text: this.isLogin ? "一键解锁卖出" : this.$t("trade.loginReg4"), // '登录/注册',
          class: this.isLogin ? "u-4-bg sellBtn u-16-cl" : "u-8-bg sellBtn u-16-cl",
        },
      };
    },
    // 账户资产
    accountBalance() {
      if (this.$store.state.assets) {
        return this.$store.state.assets.assetsCoinData;
      }
      return null;
    },
    // 当前币对的资产
    currenTaccount() {
      if (this.accountBalance && this.symbolUnit && this.fixValue) {
        const { allCoinMap } = this.accountBalance;
        const { symbol, units } = this.symbolUnit;
        return {
          symbolAccoubt: allCoinMap[symbol]
            ? fixD(allCoinMap[symbol].normal_balance, this.fixValue.volumeFix)
            : "0",
          unitsAccoubt: allCoinMap[units]
            ? fixD(allCoinMap[units].normal_balance, this.fixValue.priceFix)
            : "0",
          symbolOpen: allCoinMap[symbol] ? allCoinMap[symbol].depositOpen : "0",
          unitsOpen: allCoinMap[units] ? allCoinMap[units].depositOpen : "0",
          // 可卖出数量
          overcharge: allCoinMap[symbol]
            ? fixD(allCoinMap[symbol].overcharge_balance, this.fixValue.volumeFix)
            : "0",
          // 充值未解锁
          lockPositionV2Amount: allCoinMap[symbol]
            ? fixD(allCoinMap[symbol].lock_position_v2_amount, this.fixValue.volumeFix)
            : "0",
        };
      }
      return {
        symbolAccoubt: "0",
        unitsAccoubt: "0",
        symbolOpen: "0",
        unitsOpen: "0",
        overcharge: "0",
        lockPositionV2Amount: "0",
      };
    },
    // 折合总资产
    totalBalances() {
      if (this.accountBalance) {
        const { totalBalance, totalBalanceSymbol } = this.accountBalance;
        return {
          totalBalance,
          totalBalanceSymbol,
          totalRater: fixRate(totalBalance, this.rateData, totalBalanceSymbol),
        };
      }
      return {
        totalBalance: "0.0000",
        totalBalanceSymbol: "BTC",
        totalRater: "0.00",
      };
    },
    // 当前币对
    symbolUnit() {
      if (this.symbolCurrent) {
        const { publicInfo } = this.$store.state.baseData;
        const [symbol, units] = this.symbolCurrent.split("/");
        const showPrecision =
          publicInfo && publicInfo.market ? publicInfo.market.coinList[units].showPrecision : 0;
        return {
          symbol,
          units,
          showPrecision,
        };
      }
      return {};
    },
    // 汇率单位
    rateData() {
      return this.$store.state.baseData.rate;
    },
    // 全部币对列表
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    // 当前币对精度计算的值
    fixValue() {
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];
        return {
          priceFix: symbol.price,
          volumeFix: symbol.volume,
        };
      }
      return {
        priceFix: 2,
        volumeFix: 8,
      };
    },
    formData2Fix() {
      if (this.transactionType === 2) {
        return this.fixValue.priceFix;
      }
      return this.fixValue.volumeFix;
    },
    // 买入交易额
    tradeVolumeBuy() {
      const count = nul(
        fixD(this.formData_1.value, this.fixValue.priceFix),
        fixD(this.formData_2.value, this.fixValue.volumeFix)
      );
      return fixD(count, this.fixValue.priceFix);
    },
    tradeVolumeSell() {
      const count = nul(
        fixD(this.formData_3.value, this.fixValue.priceFix),
        fixD(this.formData_4.value, this.fixValue.volumeFix)
      );

      return fixD(count, this.fixValue.priceFix);
    },
    // 买入交易额
    tradeVolumeBuy2() {
      const count = nul(
        fixD(this.formData_8.value, this.fixValue.priceFix),
        fixD(this.formData_9.value, this.fixValue.volumeFix)
      );
      return fixD(count, this.fixValue.priceFix);
    },
    tradeVolumeSell2() {
      const count = nul(
        fixD(this.formData_12.value, this.fixValue.priceFix),
        fixD(this.formData_13.value, this.fixValue.volumeFix)
      );
      return fixD(count, this.fixValue.priceFix);
    },
    baseData() {
      return this.$store.state.baseData.publicInfo;
    },
    // 交易是否开启了必须实名认证
    exchangeTradeKycOpen() {
      let isOpen = 0;
      if (this.baseData && this.baseData.kycLimitConfig) {
        isOpen = this.baseData.kycLimitConfig.exchange_trade_kyc_open;
      }
      return Number(isOpen);
    },
    // 用户信息
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    // 认证信息
    idAuth() {
      let idAuth = 0;
      if (this.userInfo) {
        idAuth = Number(this.userInfo.authLevel);
      }
      return idAuth;
    },
  },
  watch: {
    localText(localText) {
      this.formData_1.title = localText.title1;
      this.formData_2.title = localText.title2;
      this.formData_3.title = localText.title3;
      this.formData_4.title = localText.title4;
      this.formData_5.title = localText.title5;
      this.formData_6.title = localText.title6;
    },
    currenTaccount(value) {
      if (value) {
        this.formData_5.disabledText = value.lockPositionV2Amount;
        this.formData_6.disabledText = value.overcharge;
      }
    },
    isLogin(val) {
      if (val) {
        this.$store.dispatch("assetsExchangeData", {
          auto: false,
          coinSymbols: this.coinSymbols,
        });
        clearInterval(this.assetsInter);
        this.assetsInter = setInterval(() => {
          this.$store.dispatch("assetsExchangeData", {
            auto: true,
            coinSymbols: this.symbolUnit.symbol,
          });
        }, 10000);
      }
    },
    // 切换 限价交易 和 市价交易
    transactionType(val) {
      // 2 市价交易
      if (val === 2) {
        this.formData_1.disabled = true;
        this.formData_1.disabledText = this.$t("trade.mPriceBuy"); // 以市场最优价买入
        this.formData_2.title = this.$t("trade.dealMoney"); // '交易额';
        this.formData_2.units = this.symbolUnit.units;
        this.formData_3.disabled = true;
        this.formData_3.disabledText = this.$t("trade.mPriceSell"); // 以市场最优价卖出
      } else {
        this.formData_1.disabled = false;
        this.formData_1.disabledText = "";
        this.formData_2.title = this.$t("trade.number"); // '数量';
        this.formData_2.units = this.symbolUnit.symbol;
        this.formData_3.disabled = false;
        this.formData_3.disabledText = "";
      }
    },
    // 各个输入框的 单位
    symbolUnit(val) {
      this.formData_1.units = val.units;
      // this.formData_2.units = val.symbol;
      this.formData_3.units = val.units;
      this.formData_4.units = val.symbol;
      this.formData_5.units = val.symbol;
      this.formData_6.units = val.symbol;
    },
  },
  methods: {
    init() {
      // 监听 当前货币对切换
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        this.clearValue();
        this.symbolCurrent = val;
        if (this.transactionType === 3) {
          this.transactionType = 1;
        }
        this.transactionType = 1;
      });
      if (this.isLogin) {
        this.$store.dispatch("assetsExchangeData", {
          auto: false,
          coinSymbols: this.coinSymbols,
        });
        clearInterval(this.assetsInter);
        this.assetsInter = setInterval(() => {
          this.$store.dispatch("assetsExchangeData", {
            auto: true,
            coinSymbols: this.symbolUnit.symbol,
          });
        }, 10000);
      }
      // 监听 价格点击
      this.$bus.$on("HANDEL_PRICE", (data) => {
        if (data) {
          // const obj = {name: 'formData_1', data };
          const arr = ["formData_1", "formData_3"];
          arr.forEach((item) => {
            this.onChaneForm({ name: item, value: data });
          });
          // onChaneForm
          // this.formData_1.value = data;
          // this.formData_3.value = data;
        }
      });
    },
    unlockSell() {
      if (!this.unlockSellFlag) return;
      this.unlockSellFlag = false;
      if (this.exchangeTradeKycOpen && this.idAuth !== 1) {
        this.isShowDialog = true;
      } else {
        this.axios({
          url: "order/create_overcharge_onekey",
          headers: {},
          params: { symbol: this.symbolCurrent },
          method: "post",
        }).then((data) => {
          this.unlockSellFlag = true;
          if (data.code === "0") {
            // 重新请求资产
            this.$store.dispatch("assetsExchangeData", {
              auto: false,
              coinSymbols: this.coinSymbols,
            });
            // 提示成功 下单成功
            this.$bus.$emit("tip", { text: this.$t("trade.dealCussess"), type: "success" });
          } else {
            this.$bus.$emit("tip", { text: data.msg, type: "error" });
          }
        });
      }
    },
    goCz(v) {
      if (this.exchangeTradeKycOpen && this.idAuth !== 1) {
        this.tsTexttype = 2;
        this.isShowDialog = true;
      } else if (v) {
        if (process.env.NODE_ENV === "development") {
          window.location.href = `assets/recharge?symbol=${v}`;
        } else {
          window.location.href = `/assets/recharge?symbol=${v}`;
        }
      }
    },
    // 切换 限价交易 和 市价交易
    switchTradeType(type) {
      this.clearValue();
      this.transactionType = type;
    },
    // 显示隐藏折合资产
    handelTotal() {
      this.totalBalancesHide = !this.totalBalancesHide;
    },
    // input 框 输入事件
    onChaneForm(data) {
      const UA = +this.currenTaccount.unitsAccoubt;
      const SA = +this.currenTaccount.symbolAccoubt;

      this[data.name].value = data.value;
      if (data.value) {
        this[data.name].isError = false;
      }
      // 不得超过可用余额
      if (
        data.name === "formData_2" &&
        this.transactionType === 1 &&
        data.value * this.formData_1.value > UA
      ) {
        this[data.name].value = UA / this.formData_1.value;
      }
      if (data.name === "formData_2" && this.transactionType === 2 && +data.value > UA) {
        this[data.name].value = UA;
      }
      if (data.name === "formData_4" && +data.value > SA) {
        this[data.name].value = SA;
      }
      // 比例换算
      if (data.name === "formData_3" || data.name === "formData_1") {
        // this[data.name].subText = fixRate(
        //   fixD(data.value, this.fixValue.priceFix),
        //   this.rateData,
        //   this.symbolUnit.units
        // );
        this[data.name].subText = null;
      }
      if (data.name === "formData_2" || data.name === "formData_1") {
        const V1 = this.formData_1.value;
        const V2 = this.formData_2.value;
        this.perBuy = ((V1 * V2) / UA) * 100 || 0;
      }
      if (data.name === "formData_4" || data.name === "formData_3") {
        const V3 = parseFloat(this.formData_3.value);
        const V4 = parseFloat(this.formData_4.value);
        this.perSell = ((V3 * V4) / SA) * 100 || 0;
      }
      if (!data.value) {
        this[data.name].subText = null;
      }
    },
    // 点击百分之 事件
    setPerNumber(type, num) {
      if (!this.isLogin) {
        // 请先登录账号
        if (!this.showLoginTips) {
          this.showLoginTips = true;
          this.$bus.$emit("tip", { text: this.$t("trade.pleaseLogin"), type: "error" });
        }
      } else if (type === "buy") {
        this.showLoginTips = false;
        if (!this.formData_1.value && this.transactionType === 1) {
          // 请输入价格
          this.$bus.$emit("tip", { text: this.$t("trade.pleasePrice"), type: "error" });
        } else if (this.transactionType === 1) {
          this.perBuy = num;
          // (可用余额 * 百分比) / 单价
          const data = (this.currenTaccount.unitsAccoubt * (num / 100)) / this.formData_1.value;
          // 可用余额 / (价格*(1+手续费比例)）* 百分比
          const dataFee =
            (this.currenTaccount.unitsAccoubt / (this.formData_1.value * (1 + this.quoteFeeRate))) *
            (num / 100);
          const numberVol = this.openQuoteFee ? dataFee : data;
          this.formData_2.value = fixD(numberVol, this.fixValue.volumeFix);
        } else {
          this.perBuy = num;
          const data = this.currenTaccount.unitsAccoubt * (num / 100);
          this.formData_2.value = fixD(data, this.fixValue.priceFix);
        }
      } else if (type === "sell") {
        this.perSell = num;
        // 可用余额 * 百分比
        const data = this.currenTaccount.symbolAccoubt * (num / 100);
        this.formData_4.value = fixD(data, this.fixValue.volumeFix);
      }
    },
    // 百分比按钮class
    // 改，2022.11.07，a-3-bd -> a-3-bd-c
    perSellClass(num) {
      if (this.perSell === num) {
        return ["a-12-bd", "b-4-cl"];
      }
      return "a-3-bd-c";
    },
    perBuyClass(num) {
      if (this.perBuy === num) {
        return ["a-12-bd", "b-4-cl"];
      }
      return "a-3-bd-c";
    },
    // 交易额 文字颜色Class
    volumeTradeClass(num, total) {
      if (parseFloat(num) > parseFloat(total)) {
        return "u-4-cl";
      }
      return "b-1-cl";
    },
    submitFormKey(type) {
      let formKey = [];
      let price = null;
      let volume = null;
      if (this.transactionType === 1) {
        if (type === "BUY") {
          formKey = ["formData_1", "formData_2"];
          price = fixD(this.formData_1.value, this.fixValue.priceFix);
          volume = fixD(this.formData_2.value, this.fixValue.volumeFix);
        } else {
          formKey = ["formData_3", "formData_4"];
          price = fixD(this.formData_3.value, this.fixValue.priceFix);
          volume = fixD(this.formData_4.value, this.fixValue.volumeFix);
        }
      } else {
        if (type === "BUY") {
          formKey = ["formData_2"];
          volume = fixD(this.formData_2.value, this.fixValue.priceFix);
        } else {
          formKey = ["formData_4"];
          volume = fixD(this.formData_4.value, this.fixValue.volumeFix);
        }
      }
      return { formKey, price, volume };
    },
    // 清空 表单数据
    clearValue() {
      const formKey = ["formData_1", "formData_2", "formData_3", "formData_4"];
      formKey.forEach((item) => {
        this[item].value = "";
        this[item].isError = false;
        this[item].subText = null;
      });
      this.perSell = 0;
      this.perBuy = 0;
    },
    submit(side) {
      if (!this.isLogin) {
        this.$router.push("/login");
      } else if (this.exchangeTradeKycOpen && this.idAuth !== 1) {
        this.tsTexttype = 1;
        this.isShowDialog = true;
      } else {
        const { formKey, price, volume } = this.submitFormKey(side);
        let fal = true;
        if (formKey.length) {
          formKey.forEach((item) => {
            const { value } = this[item];
            if (!value) {
              // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
              // this[item].errorText = `${this.$t("trade.pleaseInput")}${this[item].title}`;
              // this[item].isError = true;
              this.$bus.$emit("tip", {
                text: `${this.$t("trade.pleaseInput")}${this[item].title}`,
                type: "error",
              });
              fal = false;
            }
            if (parseFloat(value) <= 0) {
              // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
              // this[item].errorText = `${this[item].title}${this.$t("trade.inputError")}`; // 输入有误
              // this[item].isError = true;
              this.$bus.$emit("tip", {
                text: `${this[item].title}${this.$t("trade.inputError")}`,
                type: "error",
              });
              fal = false;
            }
          });
          if (this.fal && fal) {
            const symbolArr = this.symbolCurrent.split("/");
            const symbol = symbolArr[0].toLowerCase() + symbolArr[1].toLowerCase();
            this.fal = false;
            let submitData = {
              side,
              volume,
              symbol,
              type: this.transactionType,
            };
            if (price > 0) {
              submitData.price = price;
            }
            // 改，2022.11.18 保存提交信息用于提交
            this.submitData = submitData;

            // 改，2022.11.18 保存提交信息用于二次确认弹窗
            let dialogContent = JSON.parse(JSON.stringify(submitData));
            dialogContent.symbol = dialogContent.symbol.toUpperCase();
            dialogContent.symbolCurrent = this.symbolCurrent.toUpperCase();
            dialogContent.amount = (+dialogContent.volume * dialogContent.price).toFixed(
              this.fixValue.priceFix
            );
            dialogContent.volume = dialogContent.volume;
            dialogContent.type =
              dialogContent.type == 1
                ? this.$t("trade.limitPriceTrade")
                : this.$t("trade.marketPriceTrade");

            dialogContent.text3 = this.$t("futures.coFlowingWater.amount"); // 金额
            this.dialogContent = dialogContent;
            this.isShowConfirmDialog = true;
          }
        }
      }
    },
    // 改，2022.11.18 将submit方法中的发起请求抽离出来
    createOrder() {
      this.axios({
        url: this.$store.state.url.cointran.order_create,
        headers: {},
        params: this.submitData,
        method: "post",
      }).then((data) => {
        if (data.code === "0") {
          // 清空表单
          this.clearValue();
          // 重新请求资产
          this.$store.dispatch("assetsExchangeData", {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          // 发送下单成功的事件
          this.$bus.$emit("ORDER_CREATE", { type: "success" });
          // 提示成功 下单成功
          // 改，2022.11.17 根据买入/卖出区分提示颜色
          //todo 改，2025.10.10 卖出提示为成功
          let tipType = this.dialogContent.side == "BUY" ? "info" : "info";
          // let tipType = this.dialogContent.side == "BUY" ? "info" : "error"
          this.$bus.$emit("tip", { text: this.$t("trade.dealCussess"), type: tipType });
          this.fal = true;
          // 改，2022.11.18 关闭弹窗，停止loading
          this.isShowConfirmDialog = false;
          this.confirmLoading = false;
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
          this.fal = true;
          // 改，2022.11.18 关闭弹窗，停止loading
          this.isShowConfirmDialog = false;
          this.confirmLoading = false;
        }
      });
    },
    // 改，2022.11.18 新增二次确认弹窗关闭事件
    handlerClose() {
      this.isShowConfirmDialog = false;
      this.fal = true;
    },
    // 改，2022.11.18 新增二次确认弹窗关闭事件
    handlerConfirm() {
      if (this.confirmLoading) {
        return;
      }
      this.confirmLoading = true;
      this.createOrder();
    },
    // 改，2022.11.18 新增二次确认弹窗确认事件
    dialogClose() {
      this.isShowDialog = false;
    },
    // 去认证
    gotoAuth() {
      this.$router.push("/personal/userManagement");
    },
  },
};
