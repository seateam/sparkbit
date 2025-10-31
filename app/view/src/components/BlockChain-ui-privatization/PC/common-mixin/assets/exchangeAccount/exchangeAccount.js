import { myStorage, fixD, fixRate, getCoinShowName, colorMap, imgMap } from "@/utils";
import { newFixRate } from "@/utils/newUtils";

const defaultIcon = imgMap.f_1;

export default {
  name: "page-exchangeAccount",
  data() {
    return {
      tabelLoading: true,
      // 原
      // exchangeHeader: `background: url(${imgMap.zc_ex})`,
      // https://ossexchange.oss-cn-hongkong.aliyuncs.com/upload/20220925134507084.png
      // 改，2022.09.28
      exchangeHeader:
        "background: url(https://ossexchange.oss-cn-hongkong.aliyuncs.com/upload/20220925134507084.png)",
      tabelLength: 20,
      imgMap,
      colorMap,
      switchFlag: false, // 是否隐藏零资产
      findValue: "", // 搜索框内容
      dataList: [],
      totalBalance: "--", // 总资产折合
      totalRate: "--", // 折合法币
      totalBalanceSymbol: "", // 总资产折合单位
      // colors: [
      //   "rgba(255, 255, 255, 1)",
      //   "rgba(255, 255, 255, 0.8)",
      //   "rgba(255, 255, 255, 0.6)",
      //   "rgba(255, 255, 255, 0.4)",
      //   "rgba(255, 255, 255, 0.25)",
      //   "rgba(255, 255, 255, 0.1)",
      // ],
      // 改，2022.11.01
      colors: ["#74B6B2", "#9AC7B0", "#3F4A42", "#3A2E3A", "#fff", "#226afd"],
      canvasPages: [],
      havePosition: false, // 平台锁仓
      positionV2: false, // 代币锁仓
      positionV3: false, // 理财锁仓
      searchTimer: null,
      searchListResult: [],
      search: false,
      isShowDialog: false,
    };
  },
  computed: {
    baseData() {
      return this.$store.state.baseData.publicInfo;
    },
    isCoOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.indep_co_switch === "1") {
        return true;
      }
      return false;
    },
    // 提现是否开启了必须实名认证
    withdrawKycOpen() {
      let isOpen = 0;
      if (this.baseData && this.baseData.kycLimitConfig) {
        isOpen = this.baseData.kycLimitConfig.withdraw_kyc_open;
      }
      return Number(isOpen);
    },
    // 充值是否开启了必须实名认证
    depositeKycOpen() {
      let isOpen = 0;
      if (this.baseData && this.baseData.kycLimitConfig) {
        isOpen = this.baseData.kycLimitConfig.deposite_kyc_open;
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
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    tradeLinkUrl() {
      if (process.env.NODE_ENV === "development") {
        return this.isCoOpen ? "/co/trade" : "/ex/trade";
      }
      if (this.$store.state.baseData && this.$store.state.baseData.publicInfo) {
        return this.isCoOpen ? `${this.linkurl.coUrl}/trade` : `${this.linkurl.exUrl}/trade`;
      }
      return "";
    },
    // 表格title
    columns() {
      let arr = [];
      if (this.havePosition || this.positionV2 || this.positionV3) {
        arr = [{ title: this.$t("assets.exchangeAccount.position"), width: "200px" }];
      }
      return [
        { title: this.$t("assets.exchangeAccount.coin"), width: "126px" }, // 币种
        { title: this.$t("assets.exchangeAccount.lumpSum"), width: "200px" }, // 总额
        { title: this.$t("assets.exchangeAccount.Available"), width: "200px" }, // 可用
        { title: this.$t("assets.exchangeAccount.freeze"), width: "200px" }, // 冻结
        ...arr,
        { title: this.$t("replenish.ieo.SubscriptionFreeze"), width: "200px" }, // 申购冻结
        {
          title: `${this.$t("assets.exchangeAccount.AssetFolding")}(${
            this.showTotalBalanceSymbol
          })`,
          width: "200px",
        }, // 资产折合
        { title: this.$t("assets.exchangeAccount.options"), width: "280px" }, // 操作
      ];
    },
    // finance/account_balance 接口返回成功的数据
    exchangeData() {
      return this.$store.state.assets.exchangeData;
    },
    // market 接口
    market() {
      return this.$store.state.baseData.market;
    },
    // 饼图 数据（包含饼图 和 指标）
    canvasPagesFilter() {
      const arr = [];
      // 去除零资产
      const list = this.canvasPages.filter((item) => parseFloat(item.spk) > 0);
      // 排序
      list.sort(this.compare("spk"));

      const { coinList } = this.market;

      // 改，2022.11.02，6 -> 5
      // 非0资产的币种少于6种时
      if (list.length < 5) {
        list.forEach((item, index) => {
          const coinName = getCoinShowName(item.symbol, coinList);
          // const fix = (coinList[item] && coinList[item].showPrecision) || 0;
          arr.push({
            ...item,
            symbol: coinName,
            color: this.colors[index],
            amount: item.amount,
          });
        });
        // 非0资产的币种多于等于6种时
      } else if (list.length >= 5) {
        let evenSum = 0;
        // 选出前五个
        list.forEach((item, index) => {
          if (index < 4) {
            const coinName = getCoinShowName(item.symbol, coinList);
            // const fix = (coinList[item] && coinList[item].showPrecision) || 0;
            arr.push({
              ...item,
              symbol: coinName,
              color: this.colors[index],
              amount: item.amount,
            });
          } else {
            evenSum += item.spk;
          }
        });
        // 剩余币种归纳为其他
        arr.push({
          symbol: this.$t("assets.exchangeAccount.other"), // 其他
          spk: evenSum,
          color: this.colors[5],
        });
      }
      return arr;
    },
    showTotalBalanceSymbol() {
      let str = this.totalBalanceSymbol;
      if (this.market && this.market.coinList && this.market.coinList[this.totalBalanceSymbol]) {
        str = getCoinShowName(this.totalBalanceSymbol, this.market.coinList);
      }
      return str;
    },
    // 改，2022.11.14，提取数字
    calTotalRate() {
      let temp = this.totalRate.replace("￥", " ");
      temp = temp.replace("$", " ");
      return temp;
    },
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    openapiUrl() {
      return this.$store.state.systemConfig.openapiUrl;
    },
  },
  watch: {
    exchangeData(v) {
      if (v && this.market) {
        this.setData();
      }
    },
    market(v) {
      if (v && this.exchangeData) {
        this.setData();
      }
    },
  },
  methods: {
    init() {
      this.switchFlag = myStorage.get("assetsSwitch");
      // if (myStorage.get("assetsSwitch")) {
      //   this.switchFlag = myStorage.get("assetsSwitch");
      // }
      this.$store.dispatch("assetsExchangeData");
      if (this.exchangeData && this.market) {
        this.setData();
      }
    },
    async setData() {
      const { totalBalance, totalBalanceSymbol, platformCoin, allCoinMap } = this.exchangeData;
      this.positionV3 = Object.keys(allCoinMap).some(
        (key) => Number(allCoinMap[key].lock_increment_amount) > 0
      );
      const { coinList, rate } = this.market;
      const fix = (coinList[totalBalanceSymbol] && coinList[totalBalanceSymbol].showPrecision) || 0;
      this.totalBalance = fixD(totalBalance, fix); // 折合资产
      this.totalBalanceSymbol = totalBalanceSymbol; // 折合币种
      if (platformCoin && platformCoin.length) {
        const obj = allCoinMap[platformCoin];
        if (obj && Number(obj.lock_position_balance)) {
          this.havePosition = true;
        }
      }
      if (
        this.baseData.switch.lock_position_v2_status &&
        this.baseData.switch.lock_position_v2_status.toString() === "1"
      ) {
        this.positionV2 = true;
      }
      this.setDataList(allCoinMap, totalBalance);
      this.totalRate = await newFixRate(totalBalance, totalBalanceSymbol, this.openapiUrl); // 折合法币
    },
    compare(property) {
      return function fn(a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    },
    switchChange() {
      this.switchFlag = !this.switchFlag;
      myStorage.set("assetsSwitch", this.switchFlag);
      this.findChanges(this.findValue);
    },
    canvasMap() {
      const ctx = this.$refs.canvas.getContext("2d");
      this.$refs.canvas.width = 100;
      this.$refs.canvas.height = 100;
      let start = 0;
      this.canvasPagesFilter.forEach((item) => {
        let spk = start + item.spk * 2;
        if (start >= 2) {
          return;
        } // 防止 2-xx的值
        if (spk > 2) {
          spk = 2;
        } // 防止 1.x - 2.x的值
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.fillStyle = item.color;
        ctx.arc(50, 50, 50, Math.PI * start, Math.PI * spk);
        ctx.closePath();
        ctx.fill();
        start = spk;
      });
      ctx.beginPath();
      ctx.moveTo(50, 50);
      // 改，2022.09.29，#294EBB -> #279b74 -> #000
      ctx.fillStyle = "#000";
      ctx.arc(50, 50, 35, Math.PI * 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    },
    canvasInit() {
      const ctx = this.$refs.canvas.getContext("2d");
      this.$refs.canvas.width = 100;
      this.$refs.canvas.height = 100;
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.fillStyle = "#e0e0e0";
      ctx.arc(50, 50, 50, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(50, 50);
      // 改，2022.09.28，#294EBB -> #279b74 -> #000
      ctx.fillStyle = "#000";
      ctx.arc(50, 50, 35, Math.PI * 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    },
    findChanges(v) {
      // console.log(this.dataList);
      this.findValue = v;
      if (this.searchTimer) clearTimeout(this.searchTimer);
      if (v !== "") {
        this.searchTimer = setTimeout(() => {
          const result = this.dataList.filter((item) => {
            const isSamll =
              !this.switchFlag || (this.switchFlag && item.classes !== "smail-account");
            // 改，2022.10.14，[0] -> [0][1].text
            const isSearch =
              isSamll && item.data[0][1].text.toUpperCase().indexOf(v.toUpperCase()) !== -1;
            return isSearch;
          });
          this.searchListResult = result;
          this.search = true;
        }, 400);
      } else {
        this.search = false;
      }
    },
    tableClick(type, symbol) {
      // 提现
      if (type === "withdraw") {
        // 如果开启了必须认证 并且 未认证成功 禁止提现
        if (this.withdrawKycOpen && this.idAuth !== 1) {
          this.isShowDialog = true;
        } else {
          this.$router.push(`withdraw?symbol=${symbol}`);
        }
      }
      // 充值
      if (type === "recharge") {
        if (this.depositeKycOpen && this.idAuth !== 1) {
          this.isShowDialog = true;
        } else {
          this.$router.push(`recharge?symbol=${symbol}`);
        }
      }
      console.log("type, symbol", type, symbol);
      return;
      if (type === "goTrade") {
        const mSymbol = symbol.code;
        if (mSymbol.toString().indexOf("/") === -1) {
          return;
        }
        myStorage.set("markTitle", mSymbol.split("/")[1]);
        myStorage.set("sSymbolName", mSymbol);
        // this.$router.push('/trade');
        window.location.href = this.tradeLinkUrl;
      } else if (type === "goTradeIn") {
        // this.$router.push('/trade');
        // 原
        // window.location.href = this.tradeLinkUrl
        // 改，2022.10.06
        if (symbol != "USDT") {
          window.location.href = this.tradeLinkUrl + "/" + symbol + "_USDT";
        } else {
          window.location.href = this.tradeLinkUrl;
        }
      }
    },
    // 弹框取消
    dialogClose() {
      this.isShowDialog = false;
    },
    // 去认证
    gotoAuth() {
      this.$router.push("/personal/userManagement");
    },
    setDataList(data, sum) {
      const list = [];
      const canvasList = [];
      Object.keys(data).forEach((item) => {
        if (data[item].isFiat) {
          return;
        }

        // 该币种精度
        const { coinList, market } = this.market;
        const fix = (coinList[item] && coinList[item].showPrecision) || 0;
        // 资产折合精度
        const totle = this.totalBalanceSymbol;
        const btcFix = (coinList[totle] && coinList[totle].showPrecision) || 0;
        // 逻辑 1 如果 优先找出交易币种为当前货币的
        //     2 如果 1条件未筛选出，则去看当前货币是否为计价货币 把以该货币为计价货币的币对都加进去
        let selectOption = [];
        const by = [];

        canvasList.push({
          symbol: item,
          spk: data[item].allBtcValuatin / sum,
          amount: fixD(data[item].total_balance, fix),
        });

        Object.keys(market).forEach((v) => {
          Object.keys(market[v]).forEach((cv) => {
            const showSymbol = market[v][cv].showName || market[v][cv].name;
            if (cv.split("/")[0] === item) {
              selectOption.push({
                value: showSymbol,
                code: market[v][cv].name,
              });
            }
            if (v === item) {
              by.push({ value: showSymbol, code: market[v][cv].name });
            }
          });
        });
        if (selectOption.length === 0) {
          selectOption = by;
        }
        let arr = [];

        // 平台币锁仓数量
        const lockPositionBalance = data[item].lock_position_balance || "0";
        // 代币锁仓数量
        const lockPositionV2Amount = data[item].lock_position_v2_amount || "0";
        // 理财锁仓数量
        const lockIncrementAmount = data[item].lock_increment_amount || "0";
        // // 判断当前锁仓类型大于一个的时候
        if (this.havePosition || this.positionV2 || this.positionV3) {
          const num =
            Number(lockPositionBalance) +
            Number(lockPositionV2Amount) +
            Number(lockIncrementAmount);

          const selectList = [];
          if (Number(lockPositionBalance)) {
            selectList.push(
              `${this.$t("assets.exchangeAccount.positionBalance")}：
                    ${fixD(lockPositionBalance, fix)}`
            );
          }
          if (Number(lockPositionV2Amount)) {
            selectList.push(
              `${this.$t("assets.exchangeAccount.positionV2Amount")}：
                  ${fixD(lockPositionV2Amount, fix)}`
            );
          }
          if (Number(lockIncrementAmount)) {
            selectList.push(
              `${this.$t("assets.exchangeAccount.incomeLock")}：${fixD(lockIncrementAmount, fix)}`
            );
          }

          arr = [
            num
              ? [
                  {
                    type: "select",
                    iconSvg: `<span class="position">${fixD(num, fix)}</span>`,
                    selectOption: selectList,
                    iconClass: ["aaa"],
                    eventType: "",
                    selectWidth: "150",
                  },
                ]
              : fixD(num, fix),
          ];
        }

        const coinName = getCoinShowName(item, coinList);
        let showUnlockSell = false;
        if (
          coinList[item] &&
          coinList[item].isOvercharge &&
          coinList[item].isOvercharge.toString() === "1"
        ) {
          showUnlockSell = true;
        }
        const btcValuation = fixD(data[item].allBtcValuatin, btcFix);

        let coinImg = defaultIcon;
        if (coinList[item] && coinList[item].icon.length) {
          coinImg = coinList[item].icon;
        }
        const svgList = {
          zh_CN: `
            <svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.812 2.228H6.594C6.342 1.654 6.062 1.136 5.754 0.659999L6.874 0.463999C7.154 0.996 7.434 1.584 7.686 2.228H13.202V3.194H0.812V2.228ZM9.212 3.614C10.766 4.846 12.068 6.064 13.118 7.296L12.376 8.038C11.452 6.862 10.164 5.616 8.526 4.272L9.212 3.614ZM9.352 6.232L10.276 6.638C9.604 7.926 8.792 9.032 7.826 9.97C9.338 11.062 11.172 11.874 13.356 12.434L12.726 13.372C10.458 12.728 8.568 11.832 7.056 10.656C5.488 11.916 3.584 12.84 1.344 13.428L0.728 12.504C2.94 11.944 4.774 11.104 6.244 9.984C5.222 9.06 4.382 7.996 3.724 6.82L4.592 6.33C5.208 7.478 6.02 8.472 7.014 9.326C7.966 8.43 8.75 7.408 9.352 6.232ZM4.704 3.628L5.432 4.272C4.368 5.658 3.052 6.876 1.484 7.912L0.84 7.058C2.366 6.078 3.654 4.944 4.704 3.628ZM18.69 6.008H16.744V1.08H25.326V6.008H19.824C19.572 6.4 19.264 6.778 18.928 7.142H26.348C26.306 8.64 26.222 9.858 26.096 10.782C25.956 11.692 25.746 12.336 25.452 12.7C25.158 13.036 24.682 13.232 24.01 13.26H22.204L21.938 12.322C22.498 12.35 23.03 12.364 23.534 12.364C24.22 12.364 24.668 12.098 24.892 11.566C25.116 11.006 25.256 9.83 25.326 8.038H23.982C22.778 10.726 20.86 12.49 18.214 13.358L17.64 12.518C20.104 11.734 21.882 10.25 22.96 8.038H21.112C20.132 9.606 18.55 10.824 16.352 11.692L15.722 10.922C17.738 10.18 19.18 9.214 20.062 8.038H17.92C17.234 8.556 16.436 9.032 15.512 9.452L14.966 8.556C16.66 7.884 17.906 7.044 18.69 6.008ZM24.332 5.154V3.95H17.738V5.154H24.332ZM17.738 3.138H24.332V1.948H17.738V3.138Z" fill="#1058DE"/>
            </svg>
          `,
          en_US: `
            <svg width="42" height="18" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.667688 1.004H8.85769V1.998H5.32969V11H4.19569V1.998H0.667688V1.004ZM13.1437 3.566C13.5357 3.566 13.8717 3.622 14.1377 3.734V4.854C13.7737 4.742 13.4097 4.7 13.0597 4.7C12.4997 4.7 12.0237 4.938 11.6457 5.442C11.2537 5.918 11.0717 6.492 11.0717 7.164V11H9.96566V3.762H11.0717V5.022C11.2677 4.602 11.5197 4.266 11.8277 4.028C12.2057 3.72 12.6397 3.566 13.1437 3.566ZM18.2289 3.566C19.2649 3.566 20.0209 3.832 20.5249 4.378C20.9449 4.854 21.1689 5.512 21.1689 6.352V11H20.1189V9.782C19.8389 10.174 19.4609 10.496 19.0129 10.748C18.4809 11.042 17.8789 11.196 17.2069 11.196C16.4789 11.196 15.9049 11.014 15.4709 10.65C15.0229 10.272 14.7989 9.782 14.7989 9.194C14.7989 8.368 15.1209 7.752 15.7929 7.332C16.3809 6.94 17.2209 6.73 18.3129 6.716L20.0489 6.688V6.31C20.0489 5.092 19.4189 4.49 18.1589 4.49C17.6269 4.49 17.1929 4.588 16.8569 4.812C16.4789 5.036 16.2409 5.386 16.1289 5.848L15.0229 5.764C15.1769 5.008 15.5549 4.434 16.1429 4.07C16.6749 3.734 17.3609 3.566 18.2289 3.566ZM20.0489 7.528L18.3829 7.556C16.7589 7.584 15.9469 8.116 15.9469 9.166C15.9469 9.502 16.0729 9.768 16.3529 9.992C16.6329 10.202 16.9969 10.314 17.4449 10.314C18.1309 10.314 18.7329 10.09 19.2649 9.642C19.7829 9.208 20.0489 8.704 20.0489 8.144V7.528ZM28.2473 0.807999H29.3673V11H28.3173V9.81C27.8133 10.734 27.0013 11.196 25.9093 11.196C24.8453 11.196 24.0193 10.804 23.4313 10.048C22.8853 9.348 22.6193 8.452 22.6193 7.36C22.6193 6.296 22.8853 5.428 23.4313 4.728C24.0193 3.944 24.8173 3.566 25.8533 3.566C26.8893 3.566 27.6873 4.07 28.2473 5.092V0.807999ZM26.0913 4.49C25.2933 4.49 24.6913 4.77 24.2993 5.33C23.9353 5.82 23.7673 6.492 23.7673 7.36C23.7673 8.228 23.9353 8.914 24.2853 9.418C24.6773 9.978 25.2653 10.272 26.0493 10.272C26.7773 10.272 27.3373 9.992 27.7433 9.432C28.0933 8.928 28.2753 8.27 28.2753 7.458V7.318C28.2753 6.478 28.0653 5.792 27.6733 5.274C27.2673 4.742 26.7353 4.49 26.0913 4.49ZM34.0844 3.566C35.2464 3.566 36.1284 3.958 36.7164 4.742C37.2484 5.442 37.5284 6.436 37.5564 7.696H31.8444C31.9004 8.508 32.1104 9.138 32.5024 9.586C32.8944 10.034 33.4404 10.258 34.1264 10.258C34.7144 10.258 35.2044 10.104 35.5684 9.81C35.8764 9.558 36.1144 9.18 36.2964 8.676H37.4164C37.2484 9.376 36.9264 9.936 36.4364 10.384C35.8344 10.916 35.0644 11.196 34.1264 11.196C33.0904 11.196 32.2504 10.846 31.6344 10.174C30.9904 9.474 30.6824 8.55 30.6824 7.374C30.6824 6.31 30.9764 5.414 31.5924 4.7C32.2084 3.944 33.0344 3.566 34.0844 3.566ZM34.1124 4.504C33.4684 4.504 32.9504 4.714 32.5584 5.134C32.1664 5.554 31.9424 6.114 31.8724 6.828H36.3944C36.2544 5.274 35.4844 4.504 34.1124 4.504Z" fill="#1058DE"/>
            </svg>
          `,
          ko_KR: `
            <svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1822 0.436H11.3442V13.092H10.1822V0.436ZM7.22819 5.504H10.7002V6.47H7.22819V5.504ZM6.12219 1.794H7.27019C7.27019 5.406 5.77219 8.598 1.57219 10.698L0.928188 9.788C4.61019 7.982 6.12219 5.294 6.12219 1.99V1.794ZM1.47419 1.794H6.73819V2.746H1.47419V1.794ZM14.2271 9.102H15.0671C16.6071 9.102 18.0071 9.046 19.7151 8.752L19.8131 9.718C18.0631 10.026 16.6351 10.068 15.0671 10.068H14.2271V9.102ZM14.1991 1.808H18.9451V6.26H15.3611V9.466H14.2271V5.308H17.8111V2.76H14.1991V1.808ZM23.4391 0.436H24.5591V13.092H23.4391V0.436ZM21.2971 5.434H23.7331V6.386H21.2971V5.434ZM20.5691 0.715999H21.6611V12.448H20.5691V0.715999Z" fill="#1058DE"/>
            </svg>
          `,
        };
        const tradeStr = {
          zh_CN: "交易",
          en_US: "Trade",
          ko_KR: "거래",
        };

        list.push({
          // id: data[item].sort,
          id: item,
          btcValuation,
          classes: btcValuation >= 0.0001 ? "" : "smail-account",
          data: [
            // 原
            // coinName,
            // 改，2022.10.06
            [
              {
                type: "icon", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                iconSvg: `<div class="coinIcon"><img src="${coinImg}"/></div>`,
                eventType: "goTradeIn",
                classes: ["coinBox"],
              },
              {
                text: coinName,
              },
            ],
            fixD(data[item].total_balance, fix),
            showUnlockSell
              ? [
                  {
                    text: fixD(data[item].normal_balance, fix),
                    subContent: {
                      text: `${fixD(data[item].overcharge_balance || 0, fix)} (${this.$t(
                        "assets.exchangeAccount.limit"
                      )})`,
                      classes: "showUnlockSell",
                    },
                  },
                ]
              : fixD(data[item].normal_balance, fix),
            fixD(data[item].lock_balance, fix),
            ...arr,
            fixD(data[item].nc_lock_balance, fix), // 申购冻结
            fixD(data[item].allBtcValuatin, btcFix),
            [
              data[item].coinName === this.baseData.financing_symbol
                ? {
                    type: data[item].coinName === this.baseData.financing_symbol ? "link" : "label", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                    text: "去理财", // 去理财
                    links: "/manageFinances",
                    classes: [
                      data[item].coinName === this.baseData.financing_symbol
                        ? ""
                        : "tableNownStyle b-2-cl",
                    ],
                  }
                : "",
              {
                type: "button", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                text: this.$t("assets.exchangeAccount.Recharge"), // 充值
                links: `recharge?symbol=${item}`,
                eventType: "recharge",
                classes: [data[item].depositOpen ? "" : "tableNownStyle b-2-cl"],
                disabled: !data[item].depositOpen,
              },
              {
                type: data[item].withdrawOpen ? "button" : "label", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                text: this.$t("assets.exchangeAccount.withdraw"), // 提现
                links: `withdraw?symbol=${item}`,
                eventType: "withdraw",
                classes: [data[item].withdrawOpen ? "" : "tableNownStyle tableTithDraw b-2-cl"],
              },
              selectOption.length
                ? {
                    type: "select", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                    iconSvg: `<span class="goTrade" style="color: var(--color-BTN-primary-text);">${
                      tradeStr[this.lan]
                    }</span>`,
                    selectOption,
                    iconClass: [""],
                    eventType: "goTrade",
                  }
                : {
                    type: "button", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                    text: tradeStr[this.lan], // 充值
                    classes: ["tableNownStyle b-2-cl noTrade"],
                  },
            ],
          ],
        });
      });
      this.canvasPages = canvasList;
      this.tabelLoading = false;
      this.tabelLength = list.length;
      this.dataList = list.sort((a, b) => a.id - b.id);

      // 改，2022.10.06.临时
      // console.log("data", data);
      // console.log("dataList", this.dataList);

      // this.smailData = this.dataList.filter(item => parseFloat(item.btcValuation) >= 0.0001);
    },
  },
};
