import { fixD, fixInput, getCoinShowName, colorMap, imgMap, formatTime } from "@/utils";

export default {
  name: "page-withdraw",
  data() {
    return {
      tabelLoading: true,
      imgMap,
      colorMap,
      alertFlag: false, // alert变量
      detailsList: [
        { key: "sum", value: "--" },
        { key: "normal", value: "--" },
        { key: "lock", value: "--" },
      ],
      withdrawMin: "--", // 最小提币额度
      withdrawMax: "--", // 最大提币额度
      daywithdrawMax: "--", // 最大提币额度
      feeMin: "--", // 最小手续费
      feeMax: "--", // 最大手续费
      tabelList: [], // 提现记录
      subTableData: [], // 提现记录详情
      financeListData: [],
      subTableDataId: null, // 提现记录详情ID
      symbol: "",
      addressValue: "", // 提现地址
      detailsAddressList: {}, // axios返回的地址列表对象
      pagesValue: "", // 地址标签
      numberValue: "", // 提币数量
      proceduresValue: "", // 手续费
      addressList: [], // 提现地址列表
      havePageArr: ["XRP", "EOS"], // 含有标签的币种
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      dialogFlag: false, // 弹窗开关
      dialogConfirmLoading: false, // 弹窗按钮loading
      googleValue: "", // 谷歌
      phoneValue: "", // 手机
      emailValidCode: "", // 邮箱
      revokeList: [], // 撤销队列
      defaultFeeFlag: true,
      defaultFee: null,
      symbol_withdraw_msg: null,
      branchTip: "", // 多主链提示
      notIdShowDialog: false,
      nowType: 1, // 1为站外提现2为站内提现
      nowTypeTable: 1, //
      addressLoading: false,
    };
  },
  filters: {
    fixDFn(v, that) {
      return fixD(v, that.showPrecision);
    },
  },
  watch: {
    userInfoIsReady() {
      this.canAlert();
    },
    exchangeData(v) {
      if (v) {
        this.initDetails();
      }
      if (v && this.market) {
        this.initSelectData();
      }
    },
    paginationObjCurrentPage() {
      this.getTableList();
    },
    symbol(v) {
      if (v && this.market) {
        this.branchInit(this.market);
        this.addressInit();
        this.defInit();
      }
    },
    market: {
      immediate: true,
      handler(v) {
        if (v && this.symbol) {
          this.branchInit(v);
          this.addressInit();
          this.defInit();
        }
        // 改，2022.10.01，新增
        if (v && this.exchangeData) {
          this.initSelectData();
        }
      },
    },
    proceduresValue(v) {
      this.proceduresValue = fixInput(v, this.showPrecision);
    },
    numberValue(v) {
      this.numberValue = fixInput(v, this.showPrecision);
    },
  },
  computed: {
    exchangeUrl() {
      return this.$store.state.systemConfig.exchangeUrl;
    },
    isHavePage() {
      let flag = false;
      // 判断market是否请求下来
      if (this.market && this.market.coinList) {
        if (!this.haveBranch) {
          // 判断market.coinList是否有当前币种
          if (this.market.coinList[this.symbol]) {
            const { tagType } = this.market.coinList[this.symbol];
            flag = tagType;
          }
        } else if (this.market.followCoinList[this.symbol][this.activeBranch]) {
          const { tagType } = this.market.followCoinList[this.symbol][this.activeBranch];
          flag = tagType;
        }
      }
      return flag;
    },
    showSymbol() {
      let str = this.symbol;
      if (this.market && this.market.coinList && this.market.coinList[this.symbol]) {
        str = getCoinShowName(this.symbol, this.market.coinList);
      }
      return str;
    },
    enforceGoogleAuth() {
      return this.$store.state.baseData.is_enforce_google_auth || 0;
    },
    authTitleText() {
      const text = this.enforceGoogleAuth
        ? "assets.withdraw.enforceGoogleAuth"
        : "assets.withdraw.safetyWarningError";
      return this.$t(text);
    },
    switchadd() {
      const { publicInfo } = this.$store.state.baseData;
      let switchopen = 0;
      if (publicInfo && publicInfo.switch.open_txid_addr) {
        switchopen = Number(publicInfo.switch.open_txid_addr);
      }
      return switchopen;
    },
    authLevel() {
      // 身份/实名认证状态，0、未审核，1、通过，2、未通过  3未认证
      return this.userInfo.authLevel || 3;
    },
    alertData() {
      const arr = [
        // 绑定谷歌验证
        { text: this.$t("assets.withdraw.bindGoogle"), flag: this.OpenGoogle },
      ];
      if (!this.enforceGoogleAuth) {
        // 绑定手机验证
        arr.push({ text: this.$t("assets.withdraw.bindPhone"), flag: this.OpenMobile });
      }
      return arr;
    },
    paginationObjCurrentPage() {
      return this.paginationObj.currentPage;
    },
    // 当前币种精度
    showPrecision() {
      let v = 0;
      const { market } = this.$store.state.baseData;
      if (market && market.coinList && market.coinList[this.symbol]) {
        v = market.coinList[this.symbol].showPrecision;
      }
      return v;
    },
    // 当前币种精度
    branchShowPrecision() {
      let v = 0;
      const { market } = this.$store.state.baseData;
      if (
        market &&
        market.followCoinList &&
        market.followCoinList[this.symbol] &&
        market.followCoinList[this.symbol][this.activeBranch]
      ) {
        v = market.followCoinList[this.symbol][this.activeBranch].showPrecision;
      }
      return v;
    },
    // finance/account_balance 接口返回成功的数据
    exchangeData() {
      return this.$store.state.assets.exchangeData;
    },
    // market 接口
    market() {
      return this.$store.state.baseData.market;
    },
    // 提现按钮禁用状态
    btnDisabled() {
      let flag = true;
      if (
        (this.addressValue.length || this.selectVal.length) &&
        this.numberOptions.flag &&
        this.proceduresFlag
      ) {
        flag = false;
      }
      return flag;
    },
    // 表格title
    columns() {
      let list = [];
      if (this.nowTypeTable === 1) {
        list = [
          { title: this.$t("assets.withdraw.withdrawTime"), width: "15%" }, // 提现时间
          { title: this.$t("assets.withdraw.withdrawVolume"), width: "10%" }, // 提币数量
          { title: this.$t("assets.withdraw.withdrawFee"), width: "10%" }, // 网络手续费
          { title: this.$t("assets.flowingWater.withdrawRemarks"), width: "15%" }, // 标签
          { title: this.$t("assets.withdraw.withdrawStatus"), width: "10%" }, // 状态
          { title: this.$t("assets.withdraw.withdrawOptions"), width: "15%" }, // 操作
        ];
      } else if (this.nowTypeTable === 2) {
        list = [
          { title: this.$t("assets.withdraw.transferTime"), width: "15%" }, // 转账时间
          { title: this.$t("assets.withdraw.sideAccount"), width: "10%" }, // 对方账号
          { title: this.$t("assets.withdraw.transferNumber"), width: "10%" }, // 转账数量
          { title: this.$t("assets.withdraw.withdrawFee"), width: "15%" }, // 手续费
          { title: this.$t("assets.withdraw.withdrawStatus"), width: "10%" }, // 状态
        ];
      }
      return list;
    },
    subColumns() {
      return [
        this.$t("assets.flowingWater.withdrawAddress"), // 提币地址
        this.$t("assets.flowingWater.updataAt"), // 钱包处理时间
        this.$t("assets.flowingWater.txid"), // 区块链交易ID
      ];
    },
    userInfoIsReady() {
      return this.$store.state.baseData.userInfoIsReady;
    },
    // 用户是否开启手机
    OpenMobile() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.isOpenMobileCheck.toString() === "1") {
        flag = true;
      }
      return flag;
    },
    idAuth() {
      const { userInfo } = this.$store.state.baseData;
      let idAuth = 0;
      if (userInfo) {
        idAuth = Number(userInfo.authLevel);
      }
      return idAuth;
    },
    // 用户是否开启谷歌
    OpenGoogle() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.googleStatus.toString() === "1") {
        flag = true;
      }
      return flag;
    },
    // phoneValue 是否复合正则验证
    phoneValueFlag() {
      return this.$store.state.regExp.verification.test(this.phoneValue);
    },
    // googleValue 是否复合正则验证
    googleValueFlag() {
      return this.$store.state.regExp.verification.test(this.googleValue);
    },
    phoneError() {
      if (this.phoneValue.length !== 0 && !this.phoneValueFlag) return true;
      return false;
    },
    googleError() {
      if (this.googleValue.length !== 0 && !this.googleValueFlag) return true;
      return false;
    },
    hasEmail() {
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.email) {
        return true;
      }
      return false;
    },
    emailError() {
      if (this.emailValidCode.length !== 0 && !this.emailValidCode) return true;
      return false;
    },
    // 弹窗确认按钮
    dialogConfirmDisabled() {
      let phone = true;
      let google = true;
      let email = true;
      if (this.OpenMobile && !this.hasEmail) {
        phone = this.phoneValueFlag;
      }
      if (this.hasEmail) {
        email = this.emailValidCode.length === 6;
      }
      if (this.OpenGoogle) {
        google = this.googleValueFlag;
      }
      if ((phone && google && email) || this.dialogConfirmLoading) {
        return false;
      }
      return true;
    },
    that() {
      return this;
    },
    // 提币数量的校验
    // 提现条件：
    // 1. 提现数量 > 手续费
    // 2. 提现数量 <= 可用余额 （提现数量包含手续费）
    // 3. 提现最小限额 =< (提现数量 -手续费) =<提现最大限额
    numberOptions() {
      const obj = {
        text: "", // 错误提示文案
        flag: null, // 是否通过校验
        error: null, // 是否展示文案
      };
      const haveNum = parseFloat(this.detailsList[1].value) || 0; // 可用
      const minNum = parseFloat(this.withdrawMin) || 0; // 最小提币额
      const maxNum = parseFloat(this.withdrawMax) || 0; // 最大提币额
      const daymaxNum = parseFloat(this.daywithdrawMax) || 0; // 单日最大提币额
      const spk = fixD(this.numberValue - this.proceduresValue, this.showPrecision); // 提币数量减手续费
      if (this.numberValue.length === 0 || parseFloat(this.numberValue) === 0) {
        // 请输入提币数量
        obj.text = this.$t("assets.withdraw.NumberOfCoinsError");
        obj.flag = false;
        obj.error = false;
        return obj;
      }
      if (parseFloat(this.numberValue) <= parseFloat(this.proceduresValue)) {
        // 提币数量需大于矿工手续费
        obj.text = this.$t("assets.withdraw.NumberOfCoinsError2");
        obj.flag = false;
        obj.error = true;
        return obj;
      }
      if (parseFloat(this.numberValue) > haveNum) {
        // 提币数量不得大于可用余额
        obj.text = this.$t("assets.withdraw.NumberOfCoinsError3");
        obj.flag = false;
        obj.error = true;
        return obj;
      }
      if (parseFloat(minNum) > spk || parseFloat(maxNum) < spk) {
        // （提币数量-矿工手续费）需要大于最小提币额且小于最大提币额
        obj.text = this.$t("assets.withdraw.NumberOfCoinsError4");
        obj.flag = false;
        obj.error = true;
        return obj;
      }
      if (this.switchadd === 1) {
        if (parseFloat(daymaxNum) < spk) {
          // （提币数量-矿工手续费）需要小于单日最大提币额
          obj.text = this.$t("assets.withdraw.NumberOfCoinsError5");
          obj.flag = false;
          obj.error = true;
          return obj;
        }
      }
      obj.flag = true;
      obj.error = false;
      return obj;
    },
    // 手续费的校验
    proceduresFlag() {
      let flag = null;
      if (this.feeMin !== "--" && this.feeMax !== "--") {
        if (parseFloat(this.feeMin) > parseFloat(this.proceduresValue)) {
          flag = false;
        } else if (parseFloat(this.feeMax) < parseFloat(this.proceduresValue)) {
          flag = false;
        } else if (this.proceduresValue.length <= 0) {
          flag = false;
        } else {
          flag = true;
        }
      }
      return flag;
    },
    // 手续费框是否展示为错误
    proceduresError() {
      if (this.proceduresValue.length && !this.proceduresFlag) return true;
      return false;
    },
    baseData() {
      return this.$store.state.baseData.publicInfo;
    },
    // 提现是否开启了必须实名认证
    withdrawKycOpen() {
      let isOpen = 0;
      if (this.baseData && this.baseData.kycLimitConfig) {
        isOpen = this.baseData.kycLimitConfig.withdraw_kyc_open;
      }
      return Number(isOpen);
    },
    navTab() {
      const arr = [{ name: this.$t("assets.withdraw.withdraw"), index: 1 }]; // 站内
      if (this.exchangeData && this.symbol) {
        if (
          this.exchangeData.allCoinMap[this.symbol].innerTransferOpen &&
          this.$store.state.baseData.is_inner_transfer_open
        ) {
          arr.push({ name: this.$t("assets.withdraw.innerTranfer"), index: 2 });
        }
      }
      return arr;
    },
    navTabTable() {
      const arr = [{ name: this.$t("assets.withdraw.RecentWithdrawalRecords"), index: 1 }]; // 站内];
      if (this.exchangeData && this.symbol) {
        if (
          this.exchangeData.allCoinMap[this.symbol].innerTransferOpen &&
          this.$store.state.baseData.is_inner_transfer_open
        ) {
          arr.push({ name: this.$t("assets.withdraw.innerList"), index: 2 });
        }
      }
      return arr;
    },
  },
  methods: {
    defInit() {
      if (!this.exchangeData) {
        this.$store.dispatch("assetsExchangeData");
      } else {
        this.initDetails();
      }
    },
    // tab切换
    currentType(item) {
      this.nowType = item.index;
      if (this.nowType === 1) {
        // this.branchInit(this.market);
        this.nowTypeTable = 1;
        this.paginationObj.currentPage = 1; // 页码
        this.paginationObj.total = 0; // 总条数
        this.tabelList = [];
        this.canAlert();
        this.addressInit();
      } else if (this.nowType === 2) {
        this.nowTypeTable = 2;
        this.paginationObj.currentPage = 1; // 页码
        this.paginationObj.total = 0; // 总条数
        this.tabelList = [];
        this.getTableList();
      }
      // this.symbol = 'all'
      // this.paginationObj.currentPage = 1; // 页码
      // this.paginationObj.total = 0; // 总条数
      // this.tabelList = [];
    },
    // LIST tab切换
    currentTypeTable(item) {
      this.nowTypeTable = item.index;
      if (this.nowTypeTable === 1) {
        this.paginationObj.currentPage = 1; // 页码
        this.paginationObj.total = 0; // 总条数
        this.tabelList = [];
        this.getTableList();
      } else if (this.nowTypeTable === 2) {
        this.paginationObj.currentPage = 1; // 页码
        this.paginationObj.total = 0; // 总条数
        this.tabelList = [];
        this.getTableList();
      }
    },
    setActiveBranch(v) {
      console.log("v", v);
      this.addressValue = ""; // 提现地址
      this.pagesValue = ""; // 地址标签
      this.numberValue = ""; // 提币数量
      this.defaultFee = "";
      this.defaultFeeFlag = true;
      this.proceduresValue = ""; // 手续费
      this.feeMin = "--";
      this.feeMax = "--";
      this.activeBranch = typeof v === "string" ? v : v.code;
      this.addressList = [];
      this.detailsAddressList = {};
      this.getAddress();
    },
    init() {
      // 优先从URL参数获取币种
      if (this.$route.query.symbol) {
        this.symbol = this.$route.query.symbol.toUpperCase();
      } else {
        // 如果URL中没有symbol参数，尝试设置默认币种
        this.setDefaultSymbol();
      }

      // 改，2022.10.01，新增
      // 如果没有 finance/account_balance 接口返回成功的数据
      if (!this.exchangeData) {
        this.$store.dispatch("assetsExchangeData");
      } else if (this.market) {
        this.initSelectData();
        // 如果还没有设置symbol，在数据加载完成后设置默认值
        if (!this.symbol) {
          this.setDefaultSymbol();
        }
      }

      if (this.userInfoIsReady) {
        this.canAlert();
      }
      this.$bus.$on("innerList", () => {
        this.nowTypeTable = 2;
        this.paginationObj.currentPage = 1; // 页码
        this.paginationObj.total = 0; // 总条数
        this.tabelList = [];
        this.getTableList();
      });
    },
    canAlert() {
      if (this.OpenGoogle || (!this.enforceGoogleAuth && this.OpenMobile)) {
        this.alertFlag = false;
      } else {
        setTimeout(() => {
          this.alertFlag = true;
        }, 100);
      }
    },
    alertClone() {
      this.alertFlag = false;
      this.notIdShowDialog = false;
    },
    alertGo() {
      this.$router.push("/personal/userManagement");
    },
    goAddress() {
      this.$router.push("/assets/addressMent");
    },
    inputChange(v, name) {
      this[name] = v;
    },
    addressInit() {
      // 该币种是否有标签
      // const { tokenBase } = this.market.coinList[this.symbol];
      // const { tagType } = this.market.coinList[this.symbol];
      // if (tagType === 1 || tagType === 2) {
      //   this.isHavePage = true;
      // }
      /*  if (this.havePageArr.indexOf(tokenBase) !== -1) {
        this.isHavePage = true;
      } */
      // 重置默认手续费标志，确保切换币种时能更新默认手续费
      this.defaultFeeFlag = true;
      // 获取table表数据
      this.getTableList();
      this.getAddress();
    },
    // 上半部分 左侧数据
    initDetails() {
      const obj = this.exchangeData.allCoinMap[this.symbol];
      const normalBalance = Number(obj.normal_balance) || Number(obj.overcharge_balance);
      this.detailsList = [
        { key: "sum", value: fixD(obj.total_balance, this.showPrecision) }, // 总额
        { key: "normal", value: fixD(normalBalance, this.showPrecision) }, // 可用
        { key: "lock", value: fixD(obj.lock_balance, this.showPrecision) }, // 冻结
      ];
      // this.symbol_withdraw_msg = obj.symbol_withdraw_msg || null; // 注意事项
      // this.withdrawMin = fixD(obj.withdraw_min, this.showPrecision); // 最小提币额
      // this.withdrawMax = fixD(obj.withdraw_max, this.showPrecision);// 最大提币额
      // this.daywithdrawMax = fixD(obj.withdraw_max_day, this.showPrecision);// 单日最大提币额
      // if (!this.haveBranch) {
      //   this.feeMin = fixD(obj.feeMin, this.showPrecision);// 最大手续费
      //   this.feeMax = fixD(obj.feeMax, this.showPrecision);// 最大手续费
      //   if (this.defaultFeeFlag) {
      //     this.defaultFeeFlag = false;
      //     this.defaultFee = `${obj.defaultFee}`;
      //     this.proceduresValue = `${obj.defaultFee}`; // 默认手续费
      //   }
      // }
    },
    // 提现select框 change
    addressChange(item) {
      this.addressValue = item.code;
      this.selectVal = item.value;
      if (this.isHavePage) {
        const [, pagesValue] = this.detailsAddressList[item.code].address.split("_");
        this.pagesValue = pagesValue;
      }
    },
    // 全部提现
    allWithDraw() {
      if (this.detailsList[1].value === "--") return;
      this.numberValue = this.detailsList[1].value;
    },
    // 分页器
    pagechange(v) {
      this.paginationObj.currentPage = v;
    },
    getBranchAddress() {
      if (this.addressLoading) {
        return;
      }
      this.addressLoading = true;
      return this.axios({
        url: "cost/Getcost",
        params: {
          symbol: this.haveBranch ? this.activeBranch : this.symbol,
        },
      })
        .then((data) => {
          if (data.code.toString() === "0") {
            const list = [];
            const detailsList = {};
            const { userWithdrawAddrList } = data.data;
            userWithdrawAddrList.forEach((item) => {
              let value = item.address;
              if (this.isHavePage) {
                [value] = item.address.split("_");
              }
              list.push({ code: `${item.id}`, value, label: item.label });
              detailsList[item.id] = item;
            });
            const vf = this.haveBranch ? this.branchShowPrecision : this.showPrecision;
            this.feeMin = fixD(data.data.feeMin, vf); // 最大手续费
            this.feeMax = fixD(data.data.feeMax, vf); // 最大手续费
            this.withdrawMin = fixD(data.data.withdraw_min, vf); // 最小提币额
            this.withdrawMax = fixD(data.data.withdraw_max, vf); // 最大提币额
            if (this.defaultFeeFlag) {
              this.defaultFeeFlag = false;
              this.defaultFee = `${data.data.defaultFee}`;
              this.proceduresValue = `${data.data.defaultFee}`; // 默认手续费
            }
            this.branchTip = data.data.mainChainNameTip;
            this.tabelLoading = false;
            this.addressList = list;
            this.detailsAddressList = detailsList;
          }
        })
        .finally(() => {
          this.addressLoading = false;
        });
    },
    // 获取提现地址
    getAddress() {
      const flag = true;
      // this.haveBranch ||
      if (flag) {
        this.getBranchAddress();
        return;
      }
      this.axios({
        url: "addr/address_list",
        params: {
          coinSymbol: this.haveBranch ? this.activeBranch : this.symbol,
        },
      }).then((data) => {
        if (data.code.toString() === "0") {
          const list = [];
          const detailsList = {};
          const { addressList } = data.data;
          addressList.forEach((item) => {
            let value = item.address;
            if (this.isHavePage) {
              [value] = item.address.split("_");
            }
            list.push({ code: `${item.id}`, value, label: item.label });
            detailsList[item.id] = item;
          });
          this.tabelLoading = false;
          this.addressList = list;
          this.detailsAddressList = detailsList;
        }
      });
    },
    // 获取验证码
    getCodeClick(checkType) {
      if (checkType === "emailCode") {
        this.axios({
          url: `${this.exchangeUrl}/web/validCode/sendEmailCode`,
          hostType: "def",
          method: "post",
          header: {},
          params: {
            token: getCookie("token"),
            operationType: "5",
          },
        }).then((info) => {
          if (info.code.toString() !== "0") {
            // 倒计时重置
            this.$bus.$emit("getCode-clear", "loginGetcode");
            // tip框提示错误
            this.$bus.$emit("tip", { text: info.msg, type: "error" });
          } else {
            // 邮件已发送，请注意查收
            this.$bus.$emit("tip", {
              text: this.$t("login.emailSendSuccess"),
              type: "success",
            });
          }
        });
        return;
      }
      this.sendSmsCode();
    },
    // 发送验证码
    sendSmsCode() {
      this.axios({
        url: "v4/common/smsValidCode",
        params: { operationType: "10" },
      }).then((data) => {
        if (data.code.toString() !== "0") {
          setTimeout(() => {
            // 倒计时重置
            this.$bus.$emit("getCode-clear", "withdrawGetcode");
            // tip框提示错误
            this.$bus.$emit("tip", { text: data.msg, type: "error" });
          }, 2000);
        } else {
          this.$bus.$emit("tip", {
            text: this.$t("assets.withdraw.phoneSendSuccess"),
            type: "success",
          });
        }
      });
    },
    withdrawClick() {
      const p = Promise.resolve()
        .then(() => {
          // 检查是否是已存在的地址
          const existingAddress = this.addressList.find((item) => item.value == this.selectVal);
          console.log("existingAddress", existingAddress);
          if (this.addressValue && existingAddress) {
            // 如果是已存在的地址，直接使用
            return Promise.resolve(this.addressValue);
          } else {
            // 如果是手动输入的新地址，需要先添加到地址列表
            return this.addDialogConfirm();
          }
        })
        .then(async (res) => await this.getBranchAddress())
        .then((res) => {
          const address = this.addressList.find((item) => item.value == this.selectVal);
          if (address) {
            this.addressValue = address.code;
          } else {
            // 如果在addressList中找不到匹配项，说明是手动输入的地址
            // 直接使用selectVal作为addressValue
            console.log("手动输入的地址:", this.selectVal);
            this.addressValue = this.selectVal;
          }
          return Promise.resolve();
        })
        .then((res) => {
          if (this.OpenGoogle || (!this.enforceGoogleAuth && this.OpenMobile)) {
            if (this.withdrawKycOpen && this.idAuth !== 1) {
              this.notIdShowDialog = true;
              return;
            }
            this.dialogFlag = true;
            return;
          }
          this.alertFlag = true;
        });
    },
    // 弹窗关闭
    dialogClose() {
      this.phoneValue = "";
      this.googleValue = "";
      this.dialogFlag = false;
    },
    // 弹窗确认
    dialogConfirm() {
      this.dialogConfirmLoading = true;
      const pv = this.haveBranch ? this.branchShowPrecision : this.showPrecision;
      // const amount = fixD(this.numberValue - this.proceduresValue, pv);
      const params = {
        // addressId: this.addressValue, // 提现地址id
        address: this.selectVal,
        fee: this.proceduresValue, // 手续费
        amount: this.numberValue, // 提现金额（不包含手续费
        googleCode: this.googleValue,
        symbol: this.haveBranch ? this.activeBranch : this.symbol,
        label: this.addressRemark || this.selectVal.slice(-4),
      };
      console.log("params:", params);
      if (this.phoneValue) {
        params.smsAuthCode = this.phoneValue;
      }
      if (this.emailValidCode) {
        params.emailValidCode = this.emailValidCode;
      }
      this.axios({
        url: `${this.exchangeUrl}/web/account/withdraw`,
        hostType: "def",
        params,
        signParams: true,
      }).then((data) => {
        this.dialogConfirmLoading = false;
        if (data.code.toString() === "0") {
          this.getTableList(); // 获取列表
          this.$store.dispatch("assetsExchangeData"); // 更新额度
          this.$bus.$emit("tip", { text: data.msg, type: "success" });
          this.addressValue = "";
          this.pagesValue = "";
          this.numberValue = "";
          this.proceduresValue = this.defaultFee;
          this.phoneValue = "";
          this.googleValue = "";
          this.dialogFlag = false;
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },
    // 撤销操作
    tableClick(type, id) {
      if (type === "revoke") {
        let even = {};
        this.tabelList.forEach((item) => {
          if (item.id === id) {
            even = item;
          }
        });
        if (this.revokeList.indexOf(even.id) === -1) {
          this.revokeList.push(even.id);
          this.axios({
            url: "/finance/cancel_withdraw",
            headers: {},
            params: {
              withdrawId: even.id,
            },
            method: "post",
          }).then((data) => {
            const ind = this.revokeList.indexOf(even.id);
            this.revokeList.splice(ind, 1);
            if (data.code.toString() === "0") {
              this.getTableList();
              this.$store.dispatch("assetsExchangeData"); // 更新额度
              this.$bus.$emit("tip", { text: data.msg, type: "success" });
            } else {
              this.$bus.$emit("tip", { text: data.msg, type: "error" });
            }
          });
        }
      }
      if (type === "subView") {
        this.subTableDataId = id.id;
        this.subTableData = [];
        this.financeListData.forEach((item) => {
          if (item.id === this.subTableDataId) {
            let address = item.addressTo;
            if (this.isHavePage) {
              const [newAddress] = address.split("_");
              address = newAddress;
            }
            this.subTableData.push([
              address, // 地址
              item.walletTime ? formatTime(item.walletTime) : "---",
              item.txid || "---",
            ]);
          }
        });
      }
    },
    // 获取提现记录数据
    getTableList() {
      this.axios({
        url: `${this.exchangeUrl}/web/account/withdrawList`,
        hostType: "def",
        params: {
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
          coinSymbol: this.symbol,
          type: this.nowTypeTable,
        },
      }).then((data) => {
        if (data.code.toString() === "0") {
          const list = [];
          this.financeListData = data.data.financeList;
          data.data.financeList.forEach((item) => {
            if (this.nowTypeTable === 1) {
              list.push({
                id: item.id,
                data: [
                  item.createdAt, // 时间
                  fixD(item.amount, this.showPrecision), // 充值数量
                  fixD(item.fee, this.showPrecision), // 手续费
                  item.label, // 备注
                  item.status_text, // 状态
                  this.handleButton(item),
                ],
              });
            } else if (this.nowTypeTable === 2) {
              list.push({
                id: item.id,
                data: [
                  item.createdAt, // 时间
                  item.addressTo, // 对方账号
                  fixD(item.amount, this.showPrecision), // 充值数量
                  fixD(item.fee, this.showPrecision), // 手续费
                  item.status_text, // 状态
                ],
              });
            }
          });
          this.tabelList = list;
          this.paginationObj.total = data.data.count > 30 ? 30 : data.data.count;
        }
      });
    },
    handleButton(item) {
      const arr = [];
      if (item.status === 0) {
        arr.push({
          type: "button", // 'link' ' button' ,'html', 'label', 'icon' ‘str’
          text: this.$t("assets.flowingWater.Cancel"),
          iconClass: [""],
          eventType: "revoke",
        });
      }
      arr.push({
        type: "subTable",
        text: this.$t("trade.view"), // 详情
        eventType: "subView",
      });
      return arr;
    },
    // 去认证
    gotoAuth() {
      this.$router.push("/personal/userManagement");
    },
    // 改，2022.10.01，新增
    // 添加地址 -- select数据
    initSelectData() {
      const list = [];
      Object.keys(this.exchangeData.allCoinMap).forEach((item) => {
        if (this.exchangeData.allCoinMap[item].isFiat) {
          return;
        }
        const { coinList } = this.market;
        const showCoin = getCoinShowName(item, coinList);
        list.push({ value: showCoin, code: item });
      });
      this.selectList = list;
    },
    // 设置默认币种
    setDefaultSymbol() {
      if (this.exchangeData && this.market) {
        const { allCoinMap } = this.exchangeData;
        // 优先选择USDT，如果没有则选择第一个可提现的币种
        const defaultSymbols = ["USDT", "BTC", "ETH"];
        let selectedSymbol = null;

        // 尝试从默认币种列表中选择
        for (const symbol of defaultSymbols) {
          if (
            allCoinMap[symbol] &&
            !allCoinMap[symbol].isFiat &&
            allCoinMap[symbol].withdrawOpen !== 0
          ) {
            selectedSymbol = symbol;
            break;
          }
        }

        // 如果默认币种都不可用，选择第一个可提现的币种
        if (!selectedSymbol) {
          const availableSymbols = Object.keys(allCoinMap).filter(
            (symbol) => !allCoinMap[symbol].isFiat && allCoinMap[symbol].withdrawOpen !== 0
          );
          if (availableSymbols.length > 0) {
            selectedSymbol = availableSymbols[0];
          }
        }

        if (selectedSymbol) {
          this.symbol = selectedSymbol;
          // 更新URL参数
          const { pathname } = location;
          this.$router.replace(`${pathname}?symbol=${selectedSymbol}`);
        } else {
          // 如果没有可提现的币种，跳转到资产页面
          this.$router.push("/assets/exchangeAccount");
        }
      }
    },
  },
};
