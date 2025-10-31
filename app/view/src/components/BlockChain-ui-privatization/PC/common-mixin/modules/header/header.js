import { imgMap, setCookie, getCookie, myStorage } from "@/utils";

// 按钮
export default {
  name: "c-header",
  data() {
    return {
      outFlag: true,
      // langArr: [], // 语言数组
      langHover: "", // 语言滑过
      langHoverSub: null,
      showFlag: false, // 设置主题弹窗变量
      userSkin: getCookie("cusSkin") || getCookie("defSkin"), // 用户选择的skin
      hoverHeader: "", //
      activeHeader: "",
      hoverMark: "",
      activeMark: "",
      extensionPosition: {},
      icon_header_menu_1: imgMap.icon_header_menu_1,
      icon_down_arrows: imgMap.icon_down_arrows,
    };
  },
  computed: {
    lang() {
      return this.$store.state.baseData.lan;
    },
    langTxt() {
      return {
        txt1: this.$t("freeStaking.home.staking"),
        txt2: this.$t("otcDetailOrder.chatServer"),
        txt3: this.$t("header.assets2"),
      };
    },
    fiatTradeOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.fiat_trade_open === "1") {
        return true;
      }
      return false;
    },
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    // 全部币种列表
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    // market 接口
    market() {
      return this.$store.state.baseData.market;
    },
    saasOtcFlowConfig() {
      let flag = false;
      if (
        this.publicInfo &&
        this.publicInfo.switch &&
        this.publicInfo.switch.saas_otc_flow_config &&
        this.publicInfo.switch.saas_otc_flow_config.toString() === "1"
      ) {
        flag = true;
      }
      return flag;
    },
    headerTemplateReceived() {
      return this.$store.state.baseData.swiperFlag;
    },
    headImg() {
      // 改，2022.11.18 默认使用个人信息中的头像
      let avatar = this.userInfo ? this.userInfo.avatar : "";
      return avatar || imgMap.avatar_default;
    },
    optionalSymbolServerOpen() {
      return this.$store.state.baseData.optional_symbol_server_open;
    },
    leverFlag() {
      let leverFlag = false;
      if (
        this.publicInfo &&
        this.publicInfo.switch &&
        this.publicInfo.switch.lever_open &&
        this.publicInfo.switch.lever_open.toString() === "1"
      ) {
        leverFlag = true;
      }
      return leverFlag;
    },
    etfNavigationSwitch() {
      let flag = false;
      if (
        this.publicInfo &&
        this.publicInfo.switch &&
        this.publicInfo.switch.etfNavigationSwitch &&
        this.publicInfo.switch.etfNavigationSwitch.toString() === "1"
      ) {
        flag = true;
      }
      return flag;
    },
    etfHave() {
      let flag = false;
      if (this.market && this.market.market.ETF && Object.keys(this.market.market.ETF).length) {
        flag = true;
      }
      return flag;
    },
    etfOpen() {
      if (this.etfNavigationSwitch && this.etfHave) {
        return true;
      }
      return false;
    },
    hasUnreadOtcOrder() {
      return this.$store.state.baseData.hasUnreadOtcOrder;
    },
    tradesList() {
      const arr = [];
      const { lan } = this.$store.state.baseData;
      const { showOtc } = this.$store.state.systemConfig;
      const { modalSwitch } = this;

      // 改，2022.09.28，改排序

      // 行情
      // 2023.02.28 找不到配置行情的地方，所以让他默认显示
      if ((this.publicInfo && this.publicInfo.switch.index_kline_switch === "1") || true) {
        arr.push({
          title: this.$t("header.market"),
          activeId: "market",
          link: this.headerLink.market,
        });
      }

      // 币币交易
      // 改，2022.11.28 新增展示二级菜单
      if (this.headerLink.trade) {
        arr.push({
          title: this.$t("header.trade"),
          activeId: "exTrade",
          link: this.headerLink.trade,
          selectList: [
            {
              title: this.$t("header.trade"),
              activeId: "exTrade",
              link: this.headerLink.trade,
              icon: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M5.66797 13.6663L4.5013 12.4788L6.64714 10.333H0.667969V8.66634H6.64714L4.5013 6.52051L5.66797 5.33301L9.83463 9.49967L5.66797 13.6663ZM12.3346 8.66634L8.16797 4.49967L12.3346 0.333008L13.5013 1.52051L11.3555 3.66634H17.3346V5.33301H11.3555L13.5013 7.47884L12.3346 8.66634Z" fill="var(--color-text-primary)"/>
                  </svg>
              `,
            },
            // {
            //   // 改，2022.12.19 判断语言
            //   title: this.lan == 'zh_CN' ? "综合交易" : 'Multi Chart',
            //   // subtxt: "综合交易",
            //   activeId: "exTrade2",
            //   link: this.headerLink.tradeMore,
            //   icon: `
            //     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
            //       <path d="M7.04619 1.56626C8.47291 0.988681 10.0777 0.848842 11.5867 1.16562C13.0972 1.47889 14.5078 2.24328 15.5786 3.33609C16.6429 4.41441 17.3637 5.80731 17.6531 7.28012C17.974 8.88552 17.7523 10.5873 17.0386 12.0647C16.7189 12.7316 16.303 13.3536 15.8099 13.909C15.6517 14.0912 15.4725 14.2536 15.3015 14.4238C14.8866 14.2637 14.466 14.1191 14.0471 13.9696C13.3767 13.7252 12.7019 13.4923 12.0266 13.2614C11.8025 13.1878 11.5793 13.0985 11.3409 13.0855C11.2086 13.0787 11.0792 13.1143 10.9557 13.1569C10.8122 13.2065 10.6683 13.2614 10.5398 13.3422C10.2355 13.5759 9.97248 13.8776 9.84221 14.2391C9.7278 14.5482 9.72646 14.8903 9.80869 15.207C9.90321 15.5796 10.1133 15.9075 10.2782 16.2515C9.39821 16.2026 8.51894 16.0768 7.67363 15.8272C7.49309 15.7881 7.31969 15.7249 7.14987 15.6542C6.89938 15.5484 6.64666 15.4446 6.41249 15.3063C5.11872 14.6154 4.02717 13.5781 3.25135 12.351C3.09159 12.0849 2.93763 11.8147 2.81272 11.5308C2.50503 10.748 2.32448 9.91686 2.28404 9.07871C2.20069 7.44213 2.66078 5.78448 3.57915 4.4166C4.41619 3.15871 5.63935 2.15569 7.04619 1.56626ZM7.37131 4.63503C7.24774 4.77246 7.21534 4.98254 7.30003 5.14741C7.34717 5.24927 7.43767 5.3204 7.52079 5.39284C8.17773 5.96866 8.83423 6.54514 9.49139 7.12074C9.52223 7.15038 9.56245 7.17387 9.58345 7.21163C9.58993 7.31019 9.58323 7.4092 9.58547 7.50777C9.00115 7.50865 8.41683 7.50711 7.83251 7.50865C7.63408 7.50799 7.43209 7.60129 7.32438 7.76813C7.22472 7.91543 7.22316 8.11893 7.32036 8.26777C7.42717 8.43835 7.63207 8.5345 7.83318 8.5334C8.41727 8.5345 9.00137 8.53362 9.58547 8.53406V9.55838C9.00182 9.5586 8.41839 9.55816 7.83474 9.5586C7.62157 9.55596 7.40304 9.66529 7.30293 9.85408C7.22294 9.99919 7.2321 10.1856 7.32416 10.3234C7.43186 10.4905 7.63453 10.5849 7.8334 10.5829C8.4175 10.5829 9.00137 10.5827 9.58547 10.5829C9.58547 11.0477 9.58569 11.5126 9.58547 11.9773C9.58591 12.077 9.57809 12.1798 9.6134 12.2755C9.66903 12.4309 9.80757 12.5486 9.96444 12.5999C10.206 12.6818 10.5014 12.6089 10.656 12.4041C10.7208 12.32 10.7557 12.2147 10.7541 12.1093C10.7541 11.6006 10.7541 11.0918 10.7539 10.5831C11.3373 10.5825 11.9207 10.5831 12.5044 10.5829C12.7126 10.5853 12.9258 10.481 13.0288 10.2995C13.1137 10.1557 13.1099 9.96714 13.0194 9.82664C12.9128 9.65387 12.7059 9.5564 12.5033 9.5586C11.9203 9.55816 11.3371 9.5586 10.7541 9.55838C10.7539 9.21679 10.7539 8.87543 10.7541 8.53384C11.3375 8.53362 11.9207 8.53428 12.5042 8.53362C12.716 8.53538 12.933 8.42759 13.0342 8.24055C13.1157 8.09435 13.1072 7.90467 13.013 7.76615C12.9044 7.60019 12.7026 7.50733 12.5046 7.50865C11.9212 7.50711 11.3375 7.50865 10.7541 7.50777C10.7539 7.40832 10.7541 7.30888 10.7539 7.20943C11.4741 6.57653 12.1956 5.94495 12.9162 5.31249C13.0033 5.23676 13.0675 5.13336 13.0847 5.01943C13.1122 4.86466 13.0485 4.70265 12.9327 4.59662C12.7122 4.38806 12.3314 4.38126 12.1013 4.57861C11.458 5.14148 10.8156 5.70567 10.1729 6.26941C9.52759 5.70457 8.88383 5.13819 8.23851 4.57357C7.99384 4.36589 7.58113 4.39004 7.37131 4.63503Z" fill="#306eff"/>
            //       <path d="M0.262156 12.312C0.438681 12.0569 0.786815 11.9628 1.08534 12.013C1.31237 12.0567 1.53515 12.1388 1.72351 12.2725C1.99568 12.4874 2.22851 12.7445 2.47475 12.9866C3.04499 13.56 3.6235 14.1255 4.21475 14.6779C4.54657 14.9549 4.87951 15.2317 5.22988 15.486C5.54427 15.7182 5.879 15.9226 6.22222 16.111C6.90418 16.4736 7.65654 16.6881 8.4147 16.8332C9.36414 17.0104 10.3317 17.0753 11.297 17.0806C11.4565 17.078 11.6223 17.0598 11.7651 16.9845C11.8621 16.9346 11.9338 16.8339 11.9291 16.7237C11.9235 16.5913 11.8688 16.4593 11.7783 16.3612C11.6252 16.2165 11.4987 16.0486 11.3584 15.8927C11.0807 15.5771 10.8007 15.2513 10.6394 14.8603C10.5924 14.7374 10.5732 14.6024 10.598 14.4724C10.6414 14.2476 10.8025 14.0683 10.9725 13.922C11.1135 13.7993 11.3195 13.7469 11.5012 13.8015C12.1199 14.0483 12.7579 14.2454 13.3815 14.479C14.5553 14.936 15.742 15.36 16.9198 15.8067C17.2816 15.9536 17.6525 16.0822 18 16.2605V19.9143H8.81713C8.33627 19.9112 7.85205 19.9334 7.37544 19.8557C6.57996 19.7369 5.81688 19.4577 5.10341 19.0974C4.43284 18.7578 3.80271 18.3436 3.21504 17.8793C2.6077 17.3978 2.04394 16.862 1.54096 16.2754C1.09875 15.7566 0.698776 15.1982 0.396896 14.5883C0.202272 14.1883 0.0449636 13.7627 0.00720067 13.3181C-0.0234119 12.9686 0.0402711 12.5954 0.262156 12.312Z" fill="#aaacb0"/>
            //       <circle cx="10" cy="8" r="5" fill="#306eff"/>
            //       <path d="M9.56 11.12C8.76667 11.0867 8.05667 10.9233 7.43 10.63L7.84 9.25C8.10667 9.39 8.39333 9.49667 8.7 9.57C9.01333 9.64333 9.3 9.69 9.56 9.71V8.31L9.41 8.27C8.76333 8.09 8.26667 7.82 7.92 7.46C7.57333 7.09333 7.4 6.66333 7.4 6.17C7.4 5.62333 7.59 5.17667 7.97 4.83C8.35667 4.48333 8.88667 4.28 9.56 4.22V3.27H10.41V4.22C11.05 4.27333 11.6667 4.43667 12.26 4.71L11.74 6.05C11.4067 5.83 10.9633 5.69 10.41 5.63V6.97L10.53 7C11.1567 7.16 11.64 7.42 11.98 7.78C12.3267 8.13333 12.5 8.55667 12.5 9.05C12.5 9.63 12.3167 10.0967 11.95 10.45C11.59 10.8033 11.0767 11.02 10.41 11.1V11.85H9.56V11.12ZM9.56 5.63C9.21333 5.70333 9.04 5.88 9.04 6.16C9.04 6.28667 9.07667 6.39333 9.15 6.48C9.22333 6.56 9.36 6.64 9.56 6.72V5.63ZM10.41 9.65C10.7233 9.57 10.88 9.41 10.88 9.17C10.88 9.03 10.8467 8.91667 10.78 8.83C10.72 8.74333 10.5967 8.66333 10.41 8.59V9.65Z" fill="#181A1F"/>
            //     </svg>
            //   `
            // },
          ],
        });
      }
      // 期货
      // arr.push({
      //   title: "Options",
      //   activeId: "Options",
      //   link: this.headerLink.options,
      //   selectList: [
      //     {
      //       activeId: "orxBurning",
      //       link: this.headerLink.orxBurning,
      //       title: "ORX Burning",
      //     },
      //   ]
      // });

      // 合约
      if (this.headerLink.co && modalSwitch.contractOpen === "1") {
        arr.push({
          title: this.$t("header.co"),
          activeId: "coTrade",
          link: this.headerLink.co,
          // 改，2022.11.28 原本逻辑不支持二级菜单，现在新增了二级菜单，把这个之前不生效的代码注释掉，防止新增的逻辑污染
          // selectList: [
          //   {
          //     activeId: "coTrade",
          //     link: this.headerLink.co,
          //     title: this.$t("header.co"),
          //   },
          //   {
          //     activeId: "futuresData",
          //     link: this.headerLink.futuresData,
          //     title: "合约数据", // '合约数据',
          //   },
          // ],
        });
      }

      // 杠杆
      if (this.leverFlag) {
        arr.push({
          title: this.$t("header.lever"),
          activeId: "marginTrade",
          link: this.headerLink.lever,
        });
      }

      // staking
      if (modalSwitch.stakingOpen === "1") {
        arr.push({
          title: this.langTxt.txt1,
          activeId: "staking",
          link: this.headerLink.staking,
        });
      }

      if (modalSwitch.ieoOpen === "1") {
        // IEO
        arr.push({
          title: this.$t("header.ieo"),
          activeId: "ieo",
          // link: `/ex/${lan}/innovation`, // 改，2022.12.23 修改跳转路径
          link: `${this.headerLink.home}/innovation`,
        });
      }

      // 法币
      if (this.headerLink.otc && modalSwitch.otcIsOpen === "1") {
        arr.push({
          title: this.fiatTradeOpen ? this.$t("assets.b2c.otcShow.header") : this.$t("header.otc"),
          activeId: "otcTrade",
          link: this.headerLink.otc,
        });
      }

      // 经纪人系统
      arr.push({
        title: this.$t("header.broker"),
        activeId: "broker",
        // link: `/ex/${lan}/broker`, // 改，2022.12.23 修改跳转路径
        link: `${this.headerLink.home}/broker`,
      });

      // 一键买币
      if (!this.headerLink.otc && this.saasOtcFlowConfig) {
        arr.push({
          title: this.$t("mobilityTrade.immediately"),
          activeId: "otcTrade",
          link: `/ex/${lan}/mobility`, // 改，2023.01.09 修改跳转路径
        });
      }

      // etf
      // 币币交易
      if (this.etfOpen) {
        arr.push({
          title: this.$t("etfAdd.title"),
          activeId: "etf",
          link: this.etfUrl,
        });
      }

      // 改，2022.09.28，新增
      // arr.push({
      //   title: this.$t("questions.title"),
      //   activeId: "questions",
      //   link: `/ex/${lan}/questions/init`, // 改，2023.01.09 修改跳转路径
      // });

      // support
      arr.push({
        title: this.langTxt.txt2,
        activeId: "support",
        // link: `/ex/${lan}/questions/init`,
        link: `${this.headerLink.home}/questions/init`,
      });

      return arr;
    },
    etfUrl() {
      let str = "";
      if (this.market) {
        const etfArr = [];
        Object.keys(this.market.market.ETF).forEach((ci) => {
          etfArr.push(this.market.market.ETF[ci]);
        });
        const symbol = etfArr.sort(this.compare("sort"))[0];
        const name = symbol.showName || symbol.name;
        str = name.replace("/", "_");
      }
      return `${this.headerLink.trade}/${str}`;
    },
    isCoOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.indep_co_switch === "1") {
        return true;
      }
      return false;
    },
    assetsList() {
      const arr = [];
      let { linkurl } = this;
      const { lan } = this;
      const { modalSwitch } = this;
      if (process.env.NODE_ENV === "development") {
        linkurl = {};
      }
      if (!this.isCoOpen && this.headerLink.trade) {
        arr.push({
          title: this.isCoOpen
            ? this.$t("assets.index.coExchangeAccount")
            : this.$t("assets.index.exchangeAccount"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/assets/exchangeAccount`
            : `/ex/${lan}/assets/exchangeAccount`,
        });
      } else if (this.isCoOpen) {
        arr.push({
          title: this.isCoOpen
            ? this.$t("assets.index.coExchangeAccount")
            : this.$t("assets.index.exchangeAccount"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/assets/exchangeAccount`
            : `/ex/${lan}/assets/exchangeAccount`,
        });
      }

      const otcTitle = !this.fiatTradeOpen
        ? this.$t("assets.index.otcAccount")
        : this.$t("assets.b2c.otcShow.otcAccount");

      if (this.headerLink.otc && modalSwitch.otcIsOpen === "1") {
        arr.push({
          title: otcTitle,
          link: linkurl.otcUrl
            ? `${linkurl.otcUrl}/assets/otcAccount`
            : `/otc/${lan}/assets/otcAccount`,
        });
      }
      if (this.fiatTradeOpen) {
        arr.push({
          title: this.$t("assets.index.otcAccount"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/assets/b2cAccount`
            : `/ex/${lan}/assets/b2cAccount`,
        });
      }
      if (!this.headerLink.otc && this.saasOtcFlowConfig && modalSwitch.otcIsOpen === "1") {
        arr.push({
          title: otcTitle,
          link: linkurl.otcUrl
            ? `${linkurl.otcUrl}/assets/otcAccount`
            : `/otc/${lan}/assets/otcAccount`,
        });
      }
      if (this.headerLink.co && modalSwitch.contractOpen === "1") {
        let url = `${this.headerLink.co}/assets/coAccount`;
        if (window.HOSTAPI === "co") {
          url = linkurl.coUrl ? `${linkurl.coUrl}/assets/coAccount` : `/co/${lan}/assets/coAccount`;
        }
        arr.push({
          title: this.$t("assets.index.coAccount"),
          link: url,
        });
      }
      if (this.leverFlag) {
        arr.push({
          title: this.$t("assets.index.leverage"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/assets/leverageAccount`
            : `/ex/${lan}/assets/leverageAccount`,
        });
      }
      return arr;
    },
    orderList() {
      const arr = [];
      const { lan } = this;
      let { linkurl } = this;
      const { modalSwitch } = this;

      if (process.env.NODE_ENV === "development") {
        linkurl = {};
      }
      if (this.headerLink.trade) {
        arr.push({
          title: this.$t("order.index.exOrder"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/order/exchangeOrder`
            : `/ex/${lan}/order/exchangeOrder`,
        });
      }
      const otcTitle = !this.fiatTradeOpen
        ? this.$t("order.index.otcOrder")
        : this.$t("assets.b2c.otcShow.otcOrder");

      if (this.headerLink.otc && modalSwitch.otcIsOpen === "1") {
        arr.push({
          title: otcTitle,
          link: linkurl.otcUrl ? `${linkurl.otcUrl}/order/otcOrder` : `/otc/${lan}/order/otcOrder`,
        });
      }
      if (!this.headerLink.otc && this.saasOtcFlowConfig && modalSwitch.otcIsOpen === "1") {
        arr.push({
          title: otcTitle,
          link: linkurl.otcUrl ? `${linkurl.otcUrl}/order/otcOrder` : `/otc/${lan}/order/otcOrder`,
        });
      }
      if (this.headerLink.co && modalSwitch.contractOpen === "1") {
        let url = `${this.headerLink.co}/order/coOrder`;
        if (window.HOSTAPI === "co") {
          url = linkurl.coUrl ? `${linkurl.coUrl}/order/coOrder` : `/co/${lan}/order/coOrder`;
        }
        arr.push({
          title: this.$t("order.coOrder.coOrder"),
          link: url,
        });
      }
      if (this.leverFlag) {
        arr.push({
          title: this.$t("order.index.leverage"),
          link: linkurl.exUrl
            ? `${linkurl.exUrl}/order/leverageOrder`
            : `/ex/${lan}/order/leverageOrder`,
        });
      }
      return arr;
    },
    title() {
      let seo = {};
      if (this.publicInfo) {
        seo = this.publicInfo.seo;
      }
      const { indexHeaderTitle, lan } = this.$store.state.baseData;
      let title = "";
      if (getCookie("lan")) {
        const language = getCookie("lan");
        title = indexHeaderTitle[language] || "";
      } else {
        const language = lan ? lan.defLan : "";
        title = language ? indexHeaderTitle[language] : "";
      }
      return seo.title || title;
    },
    templateLayoutType() {
      return this.$store.state.baseData.templateLayoutType;
    },
    navigationType() {
      if (this.templateLayoutType === "2" && this.$route.meta.navigation !== "1") {
        return "2";
      }
      return "1";
    },
    appDownload() {
      return this.$store.state.baseData.app_download || "";
    },
    Dskin() {
      let str = "";
      if (this.userSkin) {
        str = this.userSkin;
      } else if (getCookie("defSkin") || getCookie("cusSkin")) {
        if (getCookie("cusSkin")) {
          str = getCookie("cusSkin");
        } else {
          str = getCookie("defSkin");
        }
      }
      return str;
    },
    colorList() {
      let arr = [];
      const { skinType = [] } = this.publicInfo;

      if (this.publicInfo && skinType.length) {
        arr = skinType;
      } else if (this.publicInfo && this.publicInfo.skin && this.publicInfo.skin.listist) {
        arr = this.publicInfo.skin.listist;
      }
      return arr;
    },
    chanSkin() {
      let sw = "1";
      if (this.publicInfo && this.publicInfo.skin && this.publicInfo.skin.changeSkin) {
        sw = this.publicInfo.skin.changeSkin;
      }
      return sw;
    },
    subNavisShow() {
      if (this.publicInfo && this.publicInfo.switch.newcoinOpen === "1") {
        return true;
      }
      if (this.publicInfo && this.publicInfo.switch.is_return_open === "1") {
        return true;
      }
      if (this.appDownload && this.appDownload.app_page_url) {
        return true;
      }
      if (this.publicInfo && this.publicInfo.switch.is_financing_open) {
        return true;
      }
      if (
        this.userInfo &&
        this.userInfo.agentStatus &&
        this.publicInfo &&
        this.publicInfo.switch.agentUserOpen
      ) {
        return true;
      }
      return false;
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
    showLan() {
      let str = "";
      if (this.langArr.length) {
        this.langArr.forEach((item) => {
          if (this.lan === item.id) {
            str = item.name;
          }
        });
      }
      return str;
    },
    messageCount() {
      if (this.$store.state.baseData.messageCount) {
        return this.$store.state.baseData.messageCount;
      }
      return null;
    },
    userMessageList() {
      if (this.$store.state.baseData.userMessageList) {
        return this.$store.state.baseData.userMessageList;
      }
      return null;
    },
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    // 改，2022.11.28 新增综合交易导航-tradeMore
    headerLink() {
      if (process.env.NODE_ENV === "development") {
        return {
          home: `/ex/${this.lan}`,
          trade: `/ex/${this.lan}/trade`,
          tradeMore: `/ex/${this.lan}/tradeMore`,
          market: `/ex/${this.lan}/market`,
          lever: `/ex/${this.lan}/margin`,
          otc: `/otc/${this.lan}/`,
          co: `/co/${this.lan}/trade`,
          staking: `/ex/${this.lan}/freeStaking`,
          options: `/ex/${this.lan}/options`,
          orxBurning: `/ex/${this.lan}/orxBurning`,
        };
      }
      if (this.$store.state.baseData && this.$store.state.baseData.publicInfo) {
        return {
          home: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}` : "",
          trade: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/trade` : "",
          tradeMore: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/tradeMore` : "",
          market: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/market` : "",
          otc: this.linkurl.otcUrl ? `${this.linkurl.otcUrl}/${this.lan}/` : "",
          lever: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/margin` : "",
          co: this.linkurl.coUrl ? `${this.linkurl.coUrl}/${this.lan}/trade` : "",
          staking: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/freeStaking` : "",
          options: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/options` : "",
          orxBurning: this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.lan}/orxBurning` : "",
        };
      }
      return "";
    },
    router() {
      return this.$route.name;
    },
    routerPath() {
      return this.$route.path;
    },
    headerTemplate() {
      let arr = [];
      try {
        arr = JSON.parse(this.$store.state.baseData.headerTemplate) || [];
      } catch (w) {
        arr = [];
      }
      const newArr = [];
      arr.forEach((item) => {
        let str = "";
        const first = item.link.split("//");
        if (first && first.length === 2) {
          const fid = first[1].indexOf("/");
          if (fid !== -1) {
            const ac = first[1].slice(fid + 1, first[1].length);
            if (ac && ac.length) {
              str = ac;
            }
          }
        }
        if (str.length === 0) {
          str = item.link;
        }
        newArr.push({ ...{}, ...item, ...{ activeId: str } });
      });
      return newArr;
    },
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    userInfoIsReady() {
      return this.$store.state.baseData.userInfoIsReady;
    },
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    langArr() {
      if (this.publicInfo && this.publicInfo.lan) {
        return this.publicInfo.lan.lanList;
      }
      return [];
    },
    useLanText() {
      const [nlan] = this.langArr.filter((item) => item.id === this.lan);
      return nlan ? nlan.name : "-";
    },
    userText() {
      if (this.userInfo) {
        return this.userInfo.userAccount;
      }
      return "";
    },
    logoUrl() {
      let url = "";
      if (this.publicInfo && this.publicInfo.msg && this.publicInfo.msg.logoUrl) {
        // 改，2022.12.20 修改logo
        url = this.publicInfo.msg.logoUrl || imgMap.logo3;
        // 设置 标题栏的 icon 图标
        // const link = document.querySelector
        // ("link[rel*='icon']") || document.createElement('link');
        // link.type = 'image/x-icon';
        // link.rel = 'shortcut icon';
        // link.href = this.publicInfo.msg.iconUrl;
        // document.getElementsByTagName('head')[0].appendChild(link);
      }
      return url;
    },
    intLogoUrl() {
      let url = "";
      if (this.publicInfo && this.publicInfo.msg && this.publicInfo.msg.logoUrl) {
        url = this.publicInfo.msg.index_international_logo || imgMap.int_logo;
      }
      return url;
    },
    userStatus() {
      let str = "";
      if (this.userInfo && this.userInfo.accountStatus.toString()) {
        switch (this.userInfo.accountStatus.toString()) {
          case "0":
            str = this.$t("header.userStatus1"); // '正常';
            break;
          case "1":
            str = this.$t("header.userStatus2"); // '冻结交易，冻结提现';
            break;
          case "2":
            str = this.$t("header.userStatus3"); // '冻结交易 3冻结提现';
            break;
          default:
            break;
        }
      }
      return str;
    },
    modalSwitch() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.switch;
      }
      return {};
    },
  },
  watch: {
    title() {
      this.modifyTilte();
    },
    $route: {
      handler() {
        document.removeEventListener('mousewheel', this.setHeaderPos);
        this.windowTop = false;
        const screenWidth = document.body.clientWidth;
        if (!this.isH5Check() && screenWidth > 1439.98 && this.$route.name === 'home') {
          document.addEventListener('mousewheel', this.setHeaderPos, false);
        }
        this.setActive();
        this.setMarkActive();
      },
      // 深度观察监听
      deep: true,
    },
    market: {
      handler(v) {
        if (v) {
          this.setActive();
        }
      },
      // 深度观察监听
      deep: true,
    },
    router(router) {
      if (router !== null) {
        this.modifyTilte();
      }
    },
  },
  methods: {
    init() {
      this.setMarkActive();
      this.modifyTilte();
    },
    setAlert() {
      this.showFlag = true;
    },
    setClose() {
      this.userSkin = "";
      this.showFlag = false;
    },
    lanClick(id) {
      // this.
      if (id === this.lan) {
        return;
      }
      if (this.isLogin) {
        this.axios({
          url: this.$store.state.url.common.change_language,
          params: { language: id },
          method: "post",
        }).then((res) => {
          if (Number(res.code) === 0) {
            // setCookie('lan', id);
            const { fullPath } = this.$route;
            const str = fullPath.replace(this.lan, id);
            window.location.href = str;
          }
        });
      } else {
        // setCookie('lan', id);
        const { fullPath } = this.$route;
        const str = fullPath.replace(this.lan, id);
        window.location.href = str;
      }
    },
    // 获取服务端自选币对
    getMySymbol() {
      return this.axios({
        url: "optional/list_symbol",
        params: {},
        method: "post",
      }).then((data) => {
        if (data.code === "0") {
          const mySymbol = data.data.symbols.filter((x) => x !== "");
          myStorage.set("mySymbol", mySymbol);
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },
    handMouseenter(id, sub) {
      if (sub === "sub") {
        this.langHoverSub = id;
      } else {
        this.langHover = id;
      }
      if (id === "extension" && this.$refs.commonHeader) {
        const top = this.$refs.extension.offsetTop;
        const { height } = this.$refs.commonHeader.getBoundingClientRect();
        if (height - top > 350) {
          this.extensionPosition = { top: `${top + 20}px` };
        } else {
          this.extensionPosition = { bottom: `${height - top - 40}px` };
        }
      }
    },
    handMouseleave(sub) {
      if (sub === "sub") {
        this.langHoverSub = "";
      } else {
        this.langHover = "";
      }
    },
    // 路由跳转
    btnLink(link) {
      if (link.indexOf("http") > -1) {
        window.location.href = link;
      } else {
        this.$router.push(link);
      }
    },
    // 改，2022.11.28 options新增showSubMenu字段，存在二级不直接跳转
    btnHref(link, target, options) {
      // 改，2022.12.02 会影响logo跳转 取消跳转限制
      // if (options.showSubMenu) {
      //   return;
      // }
      if (options && options.trades) {
        if (options.id === this.activeHeader) {
          return;
        }
        if (options.id === "exTrade" && this.etfOpen) {
          this.marketCurrent = myStorage.set("markTitle", "");
          // 获取当前币对
          this.symbolCurrent = myStorage.set("sSymbolName", "");
        }
      }
      const headerTitleList = Object.keys(this.headerLink);
      const currentTitle = headerTitleList
        .filter((x) => (this.headerLink[x] === link ? x : ""))
        .join();
      // 点击首页行情和币币交易时拉取最新自选币对
      if (
        this.optionalSymbolServerOpen === 1 &&
        this.isLogin &&
        (currentTitle === "home" || currentTitle === "trade")
      ) {
        this.getMySymbol().finally(() => {
          if (target && target === "black") {
            window.open(link);
          } else {
            window.location.href = link;
          }
        });
      } else if (target && target === "black") {
        window.open(link);
      } else {
        window.location.href = link;
      }
    },
    // 退出登录
    out() {
      if (!this.outFlag) {
        return;
      }
      this.outFlag = false;
      this.axios({
        url: "/user/login_out",
      }).then((data) => {
        this.outFlag = true;
        if (data.code.toString() === "0") {
          this.$bus.$emit("tip", { text: data.msg, type: "success" });
          this.$bus.$emit("outUserIsLogin");
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },
    getClass(v) {
      let str = "";
      if (v === this.activeHeader) {
        str = "active";
      } else if (v === this.hoverHeader) {
        str = "x-3-cl";
      }
      return str;
    },
    setActive() {
      const { meta } = this.$route;
      const arr = [
        "exTrade",
        "otcTrade",
        "coTrade",
        "marginTrade",
        "assets",
        "order",
        "broker",
        "support",
        "ieo",
        "market",
        "staking",
      ];
      let active = "";
      if (meta && meta.activeName && arr.indexOf(meta.activeName) !== -1) {
        active = meta.activeName;
      } else {
        const reg = /\/ex\/|\/otc\/|\/co\//g;
        let myPath = "";
        if (this.$route.path.match(reg)) {
          const Brr = this.$route.path.match(reg);

          myPath = `${this.$route.path.split(Brr[0])[1]}`;
        } else {
          myPath = this.$route.path.slice(1, this.$route.path.length);
        }
        active = myPath;
      }
      if (active === "exTrade") {
        if (this.market && this.etfOpen && this.$route.params && this.$route.params.symbol) {
          const routeSymbol = this.$route.params.symbol;
          let symbolNameClassCion = routeSymbol.split("_")[0];
          let markTitleClassCion = routeSymbol.split("_")[1];
          const symbolNameClass = routeSymbol.split("_")[0];
          const markTitleClass = routeSymbol.split("_")[1];
          const coinLisArr = Object.keys(this.coinList);
          coinLisArr.forEach((item) => {
            const { showName } = this.coinList[item];
            if (showName === markTitleClass) {
              markTitleClassCion = item;
            }
            if (showName === symbolNameClass) {
              symbolNameClassCion = item;
            }
          });
          const symbol = `${symbolNameClassCion}/${markTitleClassCion}`;
          if (this.symbolAll[symbol] && this.symbolAll[symbol].etfOpen) {
            active = "etf";
          }
        }
      }

      this.activeHeader = active;
    },
    setMarkActive() {
      const reg = /\/ex\/|\/otc\/|\/co\//g;
      let myPath = "";
      if (this.$route.path.match(reg)) {
        const arr = this.$route.path.match(reg);
        myPath = `/${this.$route.path.split(arr[0])[1]}`;
      } else {
        myPath = this.$route.path.slice(0, this.$route.path.length);
      }
      this.activeMark = myPath;
    },
    // title
    modifyTilte() {
      let routerName = this.$route.name;
      if (this.fiatTradeOpen && routerName === "fiatdeal") {
        routerName = "b2cFiatdeal";
      }
      let title = `${this.$t("pageTitle")[routerName] ? this.$t("pageTitle")[routerName] : ""}`;
      if (this.title !== "") title = `${this.title}-${title}`;
      document.title = title;
    },
    setConfirm() {
      setCookie("cusSkin", this.userSkin);
      window.location.reload();
    },
    setSkin(id) {
      this.userSkin = id;
    },
    evenHandMouseenter(v) {
      this.hoverHeader = v;
    },
    evenHandMouseleave() {
      this.hoverHeader = "";
    },
    markMouseenter(v) {
      this.hoverMark = v;
    },
    markMouseleave() {
      this.hoverMark = "";
    },
    // App 下载
    download(type) {
      window.open(this.appDownload[`${type}_download_url`]);
    },
    compare(property) {
      return function short(a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
      };
    },
  },
};
