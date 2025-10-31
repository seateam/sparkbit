import cloneDeep from "lodash/cloneDeep";
import axios from "@/api/http/axios";
import {
  getComplexType,
  getCountryList,
  fixUrl,
  removeCookie,
  setCookie,
  getCookie,
  myStorage,
  setDefaultMarket,
  setLeverDefaultMarket,
} from "@/utils";

const SETISAPP = "SETISAPP";
const GETPUBLICINFO = "GETPUBLICINFO"; // 公共数据 public_info
const GETAPPDOWNLOAD = "GETAPPDOWNLOAD"; // app下载
const GETMARKET = "GETMARKET"; // 公共 币对 数据
const USERINFO = "USERINFO"; // userinfo数据
const USERINFOISREADY = "USERINFOISREADY"; // 修改userInfoIsReady
const SYMBOLALL = "SYMBOLALL"; // 全部币对列表对象 {}
const RATE = "RATE"; // 设置汇率单位
const DELETEISLOGIN = "DELETEISLOGIN"; // 清理登录状态
const GETFOOTERHEADERINFO = "GETFOOTERHEADERINFO"; // 自定义footer和header模板
const MESSAGECOUNT = "MESSAGECOUNT";
const GETOTCPUBLICINFO = "GETOTCPUBLICINFO";
const SETLAN = "SETLAN";
const GETCOPUBLICINFO = "GETCOPUBLICINFO"; // 合约公共数据 public_info
const OTCORDERLIST = "OTCORDERLIST"; // OTC订单列表
const IMGTOKEN = "IMGTOKEN";
const CLIENTUPLOAD = "CLIENTUPLOAD";
const IS_OPEN_BIGDEAL = "IS_OPEN_BIGDEAL";
const SETKRWFLAG = "SETKRWFLAG";
const TEMPLATELAYOUTTYPE = "TEMPLATELAYOUTTYPE"; // 模板类型 国际版 or 中国版
const SETLEVERMARKET = "SETLEVERMARKET";
const INDEXHEADERTITLE = "INDEXHEADERTITLE";
const COINSYMBOLINTRODUCE = "COINSYMBOLINTRODUCE";
const SYMBOLPROFILE = "SYMBOLPROFILE"; // trade页面 币种弹窗开关
const ENFORCE_GOOGLE_AUTH = "ENFORCE_GOOGLE_AUTH";
const ISMOREPOSITION = "ISMOREPOSITION"; // 合约分仓开关
const NEW_COIN_OPEN = "NEW_COIN_OPEN";
const IS_INVITE_OPEN = "IS_INVITE_OPEN";
const IS_DEPOSIT_OPEN = "IS_DEPOSIT_OPEN";
const TRADE_BOARD_IS_FOLD = "TRADE_BOARD_IS_FOLD";
const TRADE_DEPTH_IS_FLASH = "TRADE_DEPTH_IS_FLASH";
const INDEX_LAYER_OPEN = "INDEX_LAYER_OPEN";
const OPTIONAL_SYMBOL_SERVER_OPEN = "OPTIONAL_SYMBOL_SERVER_OPEN"; // 自选币对开关
const FIAT_OPEN = "FIAT_OPEN";
const LEVER_OPEN = "LEVER_OPEN";
const HAS_TRADE_LIMIT_OPEN = "HAS_TRADE_LIMIT_OPEN";
const IS_NEWCOIN_PROJECT_ENTRANCE = "IS_NEWCOIN_PROJECT_ENTRANCE";
const LIMIT_COUNTRY_LIST = "LIMIT_COUNTRY_LIST";
const SET_DEFAULT_COUNTRYCODE = "SET_DEFAULT_COUNTRY_CODE";
const SET_INTERFACES_WITCH = "SET_INTERFACES_WITCH";
const SET_COUNTRY_OBJ = "SET_COUNTRY_OBJ";
const SET_IS_OPEN_UPLOAD_IMG = "SET_IS_OPEN_UPLOAD_IMG";
const INCREMENT_CONFIG_STATUS = "INCREMENT_CONFIG_STATUS";
const SWIPERFLAG = "SWIPERFLAG";
const EXCHIEFPROJECTSWITCH = "EXCHIEFPROJECTSWITCH"; // 首页模板类型
const SET_EXCHIEF_REDIRECT = "SET_EXCHIEF_REDIRECT";
const HOMEbOARDtYPE = "HOMEbOARDtYPE";
const COIN_TAG_OPEN = "COIN_TAG_OPEN";
const COIN_TAG_LANGS = "COIN_TAG_LANGS";
const AGENT_USER_OPEN = "AGENT_USER_OPEN"; // 经纪人开关
const THIRD_PARTY_LOGIN_DATA = "THIRD_PARTY_LOGIN_DATA"; // 第三方登录请求数据
const APP_AUTH_OPEN = "APP_AUTH_OPEN"; // 比交所实名验证开关
const IS_INNER_TRANSFER_OPEN = "IS_INNER_TRANSFER_OPEN"; // 站内直转开关
const KYC_TYPE = "KYC_TYPE"; // 实名验证类型
let previewIndexInternationalOpen = null;
const IS_HIDEN = fixUrl("is_hiden");
if (fixUrl("homeBoard") && fixUrl("preview")) {
  // previewIndexInternationalOpen = fixUrl('homeBoard') > 8 ? 1 : fixUrl('homeBoard');
  previewIndexInternationalOpen = fixUrl("homeBoard");
} else {
  // eslint-disable-next-line no-console
}

const lanMap = {
  zh_CN: "cny",
  en_US: "usd",
  el_GR: "cny",
  ko_KR: "krw",
  mn_MN: "mnt",
  ru_RU: "rub",
  ja_JP: "jpy",
};

export default {
  state: {
    isApp: false, // 当前承载端是否为app
    // 公共 public Info 数据
    publicInfo: null,
    // 公共 public Info 数据
    otcPublicInfo: null,
    // 合约 公共 public Info 数据
    coPublicInfo: null,
    // 公共 市场币对数据
    market: null,
    // 全部 货币对
    symbolAll: null,
    // 公共 用户数据
    userInfo: null,
    // 公共 是否登录 userInfo请求成功 且返回code为0 会把该值变为true
    isLogin: false,
    // userInfo请求成功 不辨别code 会把该值变为true
    userInfoIsReady: false,
    // 汇率计算单位
    rate: null,
    // 自选比对
    worker: null,
    defaultFiatPrecision: "4",
    // 自定义四footer 模板
    footerTemplate: null,
    // 自定义hander 模板
    headerTemplate: null,
    // 未读消息数量
    messageCount: null,
    // 未读消息前4条
    userMessageList: null,
    // OTC订单列表
    otcOrderList: [],
    // OTC旧订单列表用于对比
    oldOtcOrderList: [],
    // OTC订单未读状态 - 用于头部导航栏小红点提示
    hasUnreadOtcOrder: false,
    // krw首页弹窗flag
    krwFlag: false,
    lan: "",
    app_download: null,
    storageClean: false,
    imgToken: {},
    client_img_upload_open: "0",
    // 杠杆market
    leverMarket: {},
    is_open_bigDeal: 0,
    // 首页模板
    // 0: china, 1:international, 2:biki, 3:momo,
    // 4:japanese, 5:korea, 6:europe, 7:bidesk, 8:bitWind,
    index_international_open: 0,
    templateLayoutType: "1",
    indexHeaderTitle: {},
    coinSymbolIntroduce: [], // trade页面 币种弹窗数据
    symbol_profile: 0, // trade页面 币种弹窗开关
    is_more_position: 0, // 合约分仓开关
    index_layer_open: 0,
    is_open_upload_img: 0,
    newcoinOpen: null,
    is_deposit_open: 0,
    trade_depth_is_flash: 0,
    fiat_open: 0,
    lever_open: 0,
    is_newcoin_project_entrance: 0,
    is_enforce_google_auth: 0, // 是否开启强制谷歌验证模式
    has_trade_limit_open: 0, // 是否开启买入卖出限制交易
    limitCountryList: [], // 限制不可注册 不可实名认证的国家
    phoneCodeGlobal: {},
    footerTemplateReceived: false,
    interfaceSwitch: false,
    defaultCountryCode: "",
    countryObj: {},
    defaultCountryCodeReal: "",
    trade_board_is_fold: 0, // 侧边栏不根据屏幕大小显示
    incrementConfigStatus: 0, // 新理财相关配置 0.关 1.开
    swiperFlag: false,
    exchief_project_switch: 0, // 是否显示全部支付方式
    exchief_arr_filter: [],
    coin_tag_open: 0, // 币种标签开关
    outSideIntertMethodscoinTagLangs: {}, // 币种标签名称
    is_invite_open: 0,
    agentUserOpen: null, // 经纪人开关
    thirdPartyLoginData: null,
    app_auth_open: 0, // 比交所实名验证开关
    is_inner_transfer_open: 0, // 站内划转开关
    nameVerifiedType: 10, // 比交所实名验证开关
  },
  actions: {
    setIsApp({ commit }, flag) {
      commit("SETISAPP", flag);
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: this.state.url.common.user_info,
          method: "post",
        }).then((data) => {
          commit("USERINFOISREADY");
          if (data.code === "0") {
            // data.data.googleStatus = 0;
            // data.data.isOpenMobileCheck = 0;
            commit("USERINFO", data.data);
            resolve(data.data);
          }
          reject(reject);
        }).catch(() => {
          commit("USERINFOISREADY");
          reject(reject);
        });
      });

      // 改，2022.08.17，新增
      // 取消更改，2022.07.17
      // commit("USERINFOISREADY");
    },
    // 获取app下载
    getAppDownload({ commit }) {
      const data = {
        ios_ipa_download_url: "",
        android_downlad_url: "",
        android_download_url: "此处填写Android下载路径",
        ios_download_url: "此处填写ios下载路径",
        company_name: "Sparkbit",
        app_store_url: "",
        app_page_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAADRUlEQVR42u3by3XcMBREQeaftBSD\nhPcF6m51NB6S5UUb9PcjJfS5BQJLYAksCSyBJbAksASWwJLAElgCSwJLYAksCSyBJbAksASWwJLA\nElgCSwJLD8D6qjr5c0+u6OSneVcUeCfBAgsssMACCyywwHoVVtkn5xk9ucC8rzHzGYEFFlhggQUW\nWGCBdRGsmTd65pdcfSfBAgsssMACCyywwALrv59cBivwEYIFFlhggQUWWGCBBdYbq7Bru3W9BwYW\nWGCBBRZYYIEFFljRsMo+uWzZfXHNvJNggQUWWGCBBRZYYD0DK6/AGbjip2V3EiywwAILLLDAAgus\nZ2B1lTcDyw6abgossMACCyywwAILrIWrMPCZBf7uzO2WR/bCf24ACyywwAILLLDAAuun2FnZhip7\nPatr53a92gUWWGCBBRZYYIEF1jOwyoZPHp28w6LAjwILLLDAAgsssMACC6xJ+6tsfna9njVkX4MF\nFlhggQUWWGCBde8qzNtQG1/tytt90wILLLDAAgsssMACayGsIccjXeO06z9TtCsECyywwAILLLDA\nAut2WCcftRHWEJRggQUWWGCBBRZYYIFVu926JlXXUdLwzQgWWGCBBRZYYIEF1mOr8EtryAws28j1\nIxEssMACCyywwAILrIWwAp9Z3oFP4JIdcgn3r0KwwAILLLDAAgsssGbNwMBPztubXTgCrwgssMAC\nCyywwAILrFdhdW3GMg1dL2/N/CsKFlhggQUWWGCBBdZFsAJvZRm7me+QDRmnYIEFFlhggQUWWGBZ\nha2C8x5S1wlPvSSwwAILLLDAAgsssBbCGrKDhljpOmgCCyywwAILLLDAAgus6LXStfu66HSdHTWM\ndLDAAgsssMACCyyw1sPKe95l5yGBT7RrI698HwsssMACCyywwAILrHtg5b3bNPOJBn5nsMACCyyw\nwAILLLDAaoU15P2kskObaZcPFlhggQUWWGCBBdZ+WF3nMIGjKfB3824OWGCBBRZYYIEFFlhg1W6Z\nwLOUE3aB19u1cy880gELLLDAAgsssMACSwJLYAksCSyBJbAksASWwJLAElgCSwJLYAksCSyBJbAk\nsASWwJLAElgCSwJLYAks6Q/9AurAgzYnblkWAAAAAElFTkSuQmCC",
        logo: "https://www.sparkbit.io/static/img/1/bc98444eb52979f002f41322a88f36be.svg",
        download_serve_url: "https://www.sparkbit.io/en_US/appDownload",
        title: "SparkBit App Download",
        google_play_url: "",
      };
      commit("GETAPPDOWNLOAD", data);
      // axios({
      //   url: this.state.url.common.app_download,
      //   method: "post",
      // }).then((data) => {
      //   if (!Number(data.code)) {
      //     commit("GETAPPDOWNLOAD", data.data);
      //   }
      // });
    },
    // 获取 public_info 数据
    getPublicInfo({ commit, state, dispatch }) {
      // 只需要Market的数据
      const setMarketInforData = (data) => {
        // 前market中的代码
        if (data.market) {
          const setSymbolAll = (result) => {
            const symbolAll = {};
            const marketKey = Object.keys(result.market);
            marketKey.forEach((item) => {
              const symbolKey = Object.keys(result.market[item]);
              symbolKey.forEach((symbol) => {
                symbolAll[symbol] = result.market[item][symbol];
                // 判断隐藏区开没开启 没有isShow默认都显示

                const { isShow } = result.market[item][symbol];
                if (typeof isShow === "undefined" || getComplexType(isShow) === "Null") {
                  symbolAll[symbol].isShow = 1;
                }
              });
            });

            return symbolAll;
          };
          const myCoinList = {};
          const { coinList } = data.market;
          const { website } = this.state;
          Object.keys(coinList).forEach((item) => {
            if (!coinList[item].fiatPrecision) {
              myCoinList[item] = {
                ...data.data.market.coinList[item],
                fiatPrecision: { cny: "2", usd: "2", krw: "2" },
              };
            } else {
              const coin = cloneDeep(coinList[item]);
              if (website === "ex" && coin.symbolPrecision) {
                coin.fiatPrecision = coin.symbolPrecision;
              }
              myCoinList[item] = { ...coin };
            }
          });
          const myMarket = { ...data.market, coinList: myCoinList };
          setDefaultMarket(myMarket);

          commit("GETMARKET", myMarket);
          commit("RATE", myMarket.rate);
          commit("SYMBOLALL", setSymbolAll(myMarket));
        }
      };
      // Market 和 Public 的数据都需要
      const setBaseDate = (data) => {
        const { lanList } = data.lan;
        const lan = {};
        lan.lanList = [];
        lan.defLan = data.lan.defLan;
        lanList.forEach((item) => {
          if (item.defaultFiat) {
            lan.lanList.push({ ...item });
          } else {
            lan.lanList.push({ ...item, defaultFiat: lanMap[item.id] });
          }
        });
        const myData = { ...data, lan };
        if (window.clientUrl) {
          const urls = {};
          const urlKeys = Object.keys(window.clientUrl);
          urlKeys.forEach((item) => {
            if (item) {
              urls[item] = window.clientUrl[item];
            }
          });
          myData.url = { ...myData.url, ...urls };
          myData.market.wsUrl = urls.wsUrl;
        }
        const leverMarket = {};
        if (data.switch && data.market) {
          if (data.switch.lever_open && data.switch.lever_open.toString() === "1") {
            const { market } = data.market;
            Object.keys(market).forEach((item) => {
              const obj = {};
              Object.keys(market[item]).forEach((citem) => {
                if (market[item][citem].is_open_lever) {
                  obj[citem] = market[item][citem];
                }
              });
              if (Object.keys(obj).length) {
                leverMarket[item] = obj;
              }
            });
          }
          if (data.switch.lever_open && data.switch.lever_open.toString() === "1") {
            setLeverDefaultMarket(leverMarket);
          }
        }
        commit("SETLEVERMARKET", leverMarket);
        commit("GETPUBLICINFO", myData);
      };
      // 只需要 Public 的数据
      const sloveData = (data) => {
        // data.switch.fiat_trade_open = '1';
        commit("GETPUBLICINFO", data);
        // 临时添加-结束 后续由服务器添加配置
        if (data.sKinData) {
          myStorage.set("skin", data.sKinData);
          myStorage.set("skinTyp", data.skinType);
        } else if (data.skin) {
          myStorage.set("skin", data.skin);
        }
        if (data.skin) {
          const defSkin = getCookie("defSkin");
          const cusSkin = getCookie("cusSkin");
          if (!cusSkin || cusSkin === "none") {
            setCookie("changeSkin", data.skin.changeSkin);
            setCookie("defSkin", data.skin.default);
            setCookie("cusSkin", data.skin.default);
            if (defSkin) {
              if (defSkin !== data.skin.default) {
                if (!window.name) {
                  window.location.reload();
                }
              }
            }
          }
        } else {
          myStorage.set("skin", "");
          myStorage.set("colorMap", "");
          myStorage.set("imgMap", "");
        }
        const cookieLan = getCookie("lan");
        const { defLan, lanList } = data.lan;
        let language = "";

        if (cookieLan && defLan && lanList) {
          lanList.forEach((item) => {
            if (item.id === cookieLan) {
              language = cookieLan;
            }
          });
        }
        if (!language) {
          language = defLan;
          setCookie("lan", language);
        }
        commit("SETLAN", language);
        commit("SWIPERFLAG", true);

        commit(LIMIT_COUNTRY_LIST, data.limitCountryList || []);
        commit(ENFORCE_GOOGLE_AUTH, Number(data.switch.is_enforce_google_auth) || 0);
        commit(LEVER_OPEN, Number(data.switch.lever_open));
        commit("NEW_COIN_OPEN", data.switch.newcoinOpen);
        commit("AGENT_USER_OPEN", data.switch.agentUserOpen);
        commit("IS_DEPOSIT_OPEN", Number(data.switch.is_deposit_open));
        commit("TRADE_BOARD_IS_FOLD", Number(data.switch.trade_board_is_fold));
        commit("TRADE_DEPTH_IS_FLASH", data.switch.trade_depth_is_flash);

        commit(APP_AUTH_OPEN, Number(data.switch.yskyc_is_open) || 0);
        commit(IS_INNER_TRANSFER_OPEN, Number(data.switch.is_inner_transfer_open) || 0);

        commit("IS_OPEN_BIGDEAL", data.switch.is_open_bigDeal);
        commit(INCREMENT_CONFIG_STATUS, Number(data.switch.incrementConfigStatus) || 0);
        if (data.switch.client_img_upload_open) {
          commit("CLIENTUPLOAD", data.switch.client_img_upload_open);
        }

        if (data.switch.is_open_upload_img) {
          commit(SET_IS_OPEN_UPLOAD_IMG, data.switch.is_open_upload_img);
        }

        if (data.indexHeaderTitle) {
          commit("INDEXHEADERTITLE", data.indexHeaderTitle);
        }
        if (data.switch.interfaceSwitch) {
          commit(SET_INTERFACES_WITCH, Number(data.switch.interfaceSwitch));
        }
        if (data.switch.index_layer_open) {
          commit(INDEX_LAYER_OPEN, Number(data.switch.index_layer_open));
        }
        if (data.switch.is_invite_open) {
          commit(IS_INVITE_OPEN, Number(data.switch.is_invite_open));
        }
        if (data.switch.optional_symbol_server_open) {
          commit(OPTIONAL_SYMBOL_SERVER_OPEN, Number(data.switch.optional_symbol_server_open));
        }
        if (data.switch.is_newcoin_project_entrance) {
          commit(IS_NEWCOIN_PROJECT_ENTRANCE, Number(data.switch.is_newcoin_project_entrance));
        }
        if (data.switch.index_international_open) {
          commit("TEMPLATELAYOUTTYPE", Number(data.switch.index_international_open));
        }
        // 设置首页模板
        if (previewIndexInternationalOpen && Number(previewIndexInternationalOpen)) {
          commit("HOMEbOARDtYPE", Number(previewIndexInternationalOpen));
        } else if (data.switch.index_temp_type) {
          commit("HOMEbOARDtYPE", Number(data.switch.index_temp_type));
        }

        if (data.switch.fiat_open) {
          commit(FIAT_OPEN, Number(data.switch.fiat_open));
        }

        if (data.switch.has_trade_limit_open) {
          commit(HAS_TRADE_LIMIT_OPEN, Number(data.switch.has_trade_limit_open));
        }
        // kyc类型
        // ”00“ face++
        // ”01“羽山kyc
        // “02”简版自动
        // ”10“ 人工
        if (data.switch.nameVerifiedType) {
          commit(KYC_TYPE, data.switch.nameVerifiedType);
        }

        if (data.msg.default_country_code || data.msg.default_country_code_real) {
          commit(SET_DEFAULT_COUNTRYCODE, {
            default_country_code: data.msg.default_country_code,
            default_country_code_real: data.msg.default_country_code_real
              ? `+${data.msg.default_country_code_real}`
              : "",
          });
        }
        // 如果是exchief商户检查otc/publicinfo接口是否比v4接口快一步加载；如果快则进行数据处理；
        if (Number(data.switch.Exchief_project_switch)) {
          commit(EXCHIEFPROJECTSWITCH, data.switch.Exchief_project_switch);
          if (
            state.otcPublicInfo &&
            state.otcPublicInfo.payments.length === 3 &&
            state.exchief_arr_filter.length
          ) {
            const exchiefObj = [];
            state.exchief_arr_filter.forEach((obj) => {
              if (
                obj.key === "otc.payment.paypal" ||
                obj.key === "otc.payment.MTNmobile" ||
                obj.key === "otc.payment.VodafoneCash" ||
                obj.key === "otc.payment.AirtelTigo"
              ) {
                exchiefObj.push(obj);
              }
            });
            commit("SET_EXCHIEF_REDIRECT", exchiefObj);
          }
        }
        const symbolProfile = Number(data.switch.symbol_profile);
        commit("SYMBOLPROFILE", symbolProfile);
        if (symbolProfile === 1) {
          dispatch("getCoinSymbolIntroduce");
        }
        if (state.storageClean) {
          if (!window.name) {
            window.location.reload();
          }
        }
        // 动态添加 js 比如 客服  和 统计的js
        const newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.innerHTML = data.msg.config_footer_js;
        document.getElementsByTagName("head")[0].appendChild(newScript);

        // 这个是给外部保留一个接口 外部可传入方法
        // eslint-disable-next-line
        if (this["_actions"].outSideIntertMethods) {
          dispatch("outSideIntertMethods", data);
        }
        const { coinTagLangs = {} } = data.market;
        const currentLan = getCookie("lan");
        commit(COIN_TAG_OPEN, Number(data.switch.coin_tag_open) || 0);
        commit(COIN_TAG_LANGS, coinTagLangs[currentLan] || {});
      };
      // 获取 public-info数据
      const getInfo = () =>
        new Promise((resolve) => {
          const params = {};
          if (IS_HIDEN) {
            params.is_hiden = IS_HIDEN;
          }

          axios({
            url: this.state.url.common.public_info,
            method: "post",
            params,
          }).then((data) => {
            if (data.code === "0") {
              const a = "11";
              const localClear = myStorage.get("localClear");
              if (a !== localClear) {
                myStorage.clear();
                myStorage.set("localClear", a);
                state.storageClean = true;
              }
              sloveData(data.data);
              setMarketInforData(data.data);
              setBaseDate(data.data);
              resolve(data.data);
            }
          });

          // 改，2022.08.17，直接引入publicInfo
          // 取消更改，2022.09.17
          // let _publicInfo = {
          //   msg: {
          //     footer_logo_path: "https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.png",
          //     default_country_code_real: "",
          //     index_international_logo:
          //       "https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.png",
          //     company_name: "Zedxion",
          //     company_hash: "0e0df545a8bb6d34576d074e102254b9",
          //     default_country_code: "+86",
          //     iconUrl: "https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.ico",
          //     h5LoginImg: "https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.png",
          //     contact_number: "",
          //     logoUrl: "https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.png",
          //     contact_email: "",
          //     config_footer_js: "",
          //   },
          //   open_api_url: "openapi.zedcex.com/exchange-open-api",
          //   skin: null,
          //   custom_config: "",
          //   futures_type: "0",
          //   indexHeaderTitle: {
          //     el_GR: "比特幣交易平臺",
          //     ru_RU: "Биткойнская торговая платформа",
          //     ko_KR: "비트코인 거래 플랫폼",
          //     en_US:
          //       "Zedcex-Cryptocurrency Exchange| Buy & sell Bitcoin, Ethereum, Tether instantly",
          //     vi_VN: "nền tảng giao dịch Bitcoin",
          //     zh_CN: "Zedcex-最受信赖的数字资产交易平台",
          //     mn_MN: "Вит мөнгөний арилжаа",
          //     ja_JP: "ビットコイン取引所",
          //   },
          //   url: {
          //     mcoUrl: "https://mco.zedcex.com",
          //     coUrl: "https://futures.zedcex.com",
          //     mexUrl: "https://m.zedcex.com",
          //     exUrl: "https://www.zedcex.com",
          //     otcUrl: "https://otc.zedcex.com",
          //     motcUrl: "https://motc.zedcex.com",
          //   },
          //   limitCountryList: [],
          //   switch: {
          //     is_return_open: "0",
          //     saas_otc_flow_config: "0",
          //     index_international_open: "0",
          //     nameVerifiedType: "",
          //     incrementConfigStatus: 1,
          //     newcoinOpen: "1",
          //     lever_open: "1",
          //     config_footer_open: "0",
          //     fiat_open: "0",
          //     is_inner_transfer_open: "1",
          //     openLoginVerificationMode: "0",
          //     symbol_profile: "0",
          //     indep_co_switch: "0",
          //     coin_tag_open: "0",
          //     is_open_upload_img: "0",
          //     index_kline_switch: "1",
          //     register_cms_style: "0",
          //     user_role_level_open: "0",
          //     interfaceSwitch: "1",
          //     fiat_trade_open: "0",
          //     optional_symbol_server_open: "1",
          //     is_deposit_open: "0",
          //     config_header_open: "0",
          //     etfNavigationSwitch: "0",
          //     lock_position_v2_status: "0",
          //     ui_change_open: "0",
          //     coins_krw_open: "0",
          //     login_regist_type: "1",
          //     is_invitationCode_required: "0",
          //     is_enforce_google_auth: "0",
          //     regist_must_check_open: "1",
          //     index_temp_type: "0",
          //     wind_control_switch: "0",
          //     yskyc_is_open: "0",
          //     client_img_upload_open: "0",
          //     is_invite_open: "0",
          //     agentUserOpen: "1",
          //     verificationType: "2",
          //     index_layer_open: "0",
          //     business_id: "",
          //     trade_depth_is_flash: "0",
          //     grid_trade_switch: "1",
          //     open_txid_addr: "0",
          //   },
          //   market: {
          //     market: {
          //       USDT: {
          //         "BTC/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "btcusdt",
          //           showName: "BTC/USDT",
          //           marketBuyMin: 5000,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 1,
          //           etfOpen: 0,
          //           quoteFeeRate: 0.001,
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 8,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "BTC/USDT",
          //           limitPriceMin: 5000,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ZEDXION1/USDT": {
          //           limitVolumeMin: 0.00001,
          //           symbol: "zedxion1usdt",
          //           showName: "ZEDXION/USDT",
          //           marketBuyMin: 0.00001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.00001,
          //           sort: 2,
          //           etfOpen: 0,
          //           quoteFeeRate: 0.001,
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "ZEDXION1/USDT",
          //           limitPriceMin: 0.00001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "OIL/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "oilusdt",
          //           showName: "OIL/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 3,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.0001,0.001,0.01",
          //           price: 4,
          //           IsMine: "0",
          //           name: "OIL/USDT",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "TOMAN/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "tomanusdt",
          //           showName: "TOMAN/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 4,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 1,
          //           isShow: 0,
          //           volume: 1,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "TOMAN/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "USDZ/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "usdzusdt",
          //           showName: "USDZ/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 5,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 1,
          //           depth: "0.0001,0.001,0.01",
          //           price: 4,
          //           IsMine: "0",
          //           name: "USDZ/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "BZD/USDT": {
          //           limitVolumeMin: 1,
          //           symbol: "bzdusdt",
          //           showName: "BZD/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 1,
          //           sort: 7,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "BZD/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "GOLD/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "goldusdt",
          //           showName: "GOLD/USDT",
          //           marketBuyMin: 10,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 8,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 6,
          //           depth: "0.001,0.01,0.1",
          //           price: 3,
          //           IsMine: "0",
          //           name: "GOLD/USDT",
          //           limitPriceMin: 1,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "RUB/USDT": {
          //           limitVolumeMin: 1,
          //           symbol: "rubusdt",
          //           showName: "RUB/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 1,
          //           sort: 9,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "RUB/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "SM/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "smusdt",
          //           showName: "SM/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 10,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "SM/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "EURT/USDT": {
          //           limitVolumeMin: 1,
          //           symbol: "eurtusdt",
          //           showName: "EURT/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 1,
          //           sort: 11,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "EURT/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "TEST/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "testusdt",
          //           showName: "TEST/USDT",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 22,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 2,
          //           isShow: 0,
          //           volume: 3,
          //           depth: "0.000001,0.00001,0.0001",
          //           price: 6,
          //           IsMine: "0",
          //           name: "TEST/USDT",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "ETH/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "ethusdt",
          //           showName: "ETH/USDT",
          //           marketBuyMin: 500,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 23,
          //           etfOpen: 0,
          //           quoteFeeRate: 0.002,
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "ETH/USDT",
          //           limitPriceMin: 500,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "LTC/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "ltcusdt",
          //           showName: "LTC/USDT",
          //           marketBuyMin: 0.01,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 29,
          //           etfOpen: 0,
          //           quoteFeeRate: 0.001,
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "LTC/USDT",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "BCH/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "bchusdt",
          //           showName: "BCH/USDT",
          //           marketBuyMin: 0.01,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 31,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "BCH/USDT",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ETC/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "etcusdt",
          //           showName: "ETC/USDT",
          //           marketBuyMin: 0.01,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 32,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "ETC/USDT",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "LINK/USDT": {
          //           limitVolumeMin: 0.0001,
          //           symbol: "linkusdt",
          //           showName: "LINK/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 33,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 0,
          //           volume: 4,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "LINK/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "TRX/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "trxusdt",
          //           showName: "TRX/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 34,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 6,
          //           depth: "0.00001,0.0001,0.01",
          //           price: 5,
          //           IsMine: "0",
          //           name: "TRX/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "DOT/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "dotusdt",
          //           showName: "DOT/USDT",
          //           marketBuyMin: 0.0001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 1,
          //           sort: 35,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "DOT/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "DOGE/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "dogeusdt",
          //           showName: "DOGE/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 36,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.00001,0.0001,0.001",
          //           price: 5,
          //           IsMine: "0",
          //           name: "DOGE/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "ADA/USDT": {
          //           limitVolumeMin: 0.0001,
          //           symbol: "adausdt",
          //           showName: "ADA/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.0001,
          //           sort: 37,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 1,
          //           depth: "0.0001,0.001,0.01",
          //           price: 4,
          //           IsMine: "0",
          //           name: "ADA/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "ATOM/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "atomusdt",
          //           showName: "ATOM/USDT",
          //           marketBuyMin: 0.01,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 38,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.001,0.1,1",
          //           price: 3,
          //           IsMine: "0",
          //           name: "ATOM/USDT",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "XRP/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "xrpusdt",
          //           showName: "XRP/USDT",
          //           marketBuyMin: 0.1,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 39,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.0001,0.01,1",
          //           price: 4,
          //           IsMine: "0",
          //           name: "XRP/USDT",
          //           limitPriceMin: 0.1,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "SHIB/USDT": {
          //           limitVolumeMin: 0.01,
          //           symbol: "shibusdt",
          //           showName: "SHIB/USDT",
          //           marketBuyMin: 1e-7,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 40,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 8,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "SHIB/USDT",
          //           limitPriceMin: 1e-7,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "MATIC/USDT": {
          //           limitVolumeMin: 0.001,
          //           symbol: "maticusdt",
          //           showName: "MATIC/USDT",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 41,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 1,
          //           depth: "0.0001,0.001,0.01",
          //           price: 4,
          //           IsMine: "0",
          //           name: "MATIC/USDT",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //       },
          //       USDZ: {
          //         "ZEDXION1/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "zedxion1usdz",
          //           showName: "ZEDXION/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 6,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "ZEDXION1/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ETH/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "ethusdz",
          //           showName: "ETH/USDZ",
          //           marketBuyMin: 10,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 12,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "ETH/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "LTC/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "ltcusdz",
          //           showName: "LTC/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 13,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "LTC/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "BCH/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "bchusdz",
          //           showName: "BCH/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 14,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "BCH/USDZ",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ETC/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "etcusdz",
          //           showName: "ETC/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 15,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "ETC/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "BZD/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "bzdusdz",
          //           showName: "BZD/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 16,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "BZD/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "GOLD/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "goldusdz",
          //           showName: "GOLD/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 17,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 6,
          //           depth: "0.001,0.01,0.1",
          //           price: 3,
          //           IsMine: "0",
          //           name: "GOLD/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "RUB/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "rubusdz",
          //           showName: "RUB/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 18,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "RUB/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "EURT/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "eurtusdz",
          //           showName: "EURT/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 19,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.00000001,0.000001,0.0001",
          //           price: 8,
          //           IsMine: "0",
          //           name: "EURT/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "OIL/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "oilusdz",
          //           showName: "OIL/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 20,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.0001,0.001,0.01",
          //           price: 4,
          //           IsMine: "0",
          //           name: "OIL/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 0,
          //           openQuoteFee: 0,
          //         },
          //         "BTC/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "btcusdz",
          //           showName: "BTC/USDZ",
          //           marketBuyMin: 5000,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 24,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 8,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "BTC/USDZ",
          //           limitPriceMin: 5000,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "TRX/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "trxusdz",
          //           showName: "TRX/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 25,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 6,
          //           depth: "0.00001,0.0001,0.001",
          //           price: 5,
          //           IsMine: "0",
          //           name: "TRX/USDZ",
          //           limitPriceMin: 0.01,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "LINK/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "linkusdz",
          //           showName: "LINK/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 26,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.001,0.1,1",
          //           price: 3,
          //           IsMine: "0",
          //           name: "LINK/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "DOT/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "dotusdz",
          //           showName: "DOT/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 27,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.01,0.1,1",
          //           price: 2,
          //           IsMine: "0",
          //           name: "DOT/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ATOM/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "atomusdz",
          //           showName: "ATOM/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 28,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 2,
          //           depth: "0.001,0.01,0.1",
          //           price: 3,
          //           IsMine: "0",
          //           name: "ATOM/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "DOGE/USDZ": {
          //           limitVolumeMin: 0.001,
          //           symbol: "dogeusdz",
          //           showName: "DOGE/USDZ",
          //           marketBuyMin: 0.001,
          //           is_grid_open: 0,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 30,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.00001,0.0001,0.001",
          //           price: 5,
          //           IsMine: "0",
          //           name: "DOGE/USDZ",
          //           limitPriceMin: 0.001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //       },
          //       BTC: {
          //         "BNB/BTC": {
          //           limitVolumeMin: 0.00001,
          //           symbol: "bnbbtc",
          //           showName: "BNB/BTC",
          //           marketBuyMin: 0.00001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.00001,
          //           sort: 21,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.000001,0.00001,0.0001",
          //           price: 6,
          //           IsMine: "0",
          //           name: "BNB/BTC",
          //           limitPriceMin: 0.00001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "ETH/BTC": {
          //           limitVolumeMin: 0.001,
          //           symbol: "ethbtc",
          //           showName: "ETH/BTC",
          //           marketBuyMin: 1e-8,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 1e-8,
          //           sort: 42,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 4,
          //           depth: "0.000001,0.00001,0.0001",
          //           price: 6,
          //           IsMine: "0",
          //           name: "ETH/BTC",
          //           limitPriceMin: 1e-8,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "LTC/BTC": {
          //           limitVolumeMin: 0.01,
          //           symbol: "ltcbtc",
          //           showName: "LTC/BTC",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.01,
          //           sort: 43,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.000001,0.00001,0.0001",
          //           price: 6,
          //           IsMine: "0",
          //           name: "LTC/BTC",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //         "BCH/BTC": {
          //           limitVolumeMin: 0.001,
          //           symbol: "bchbtc",
          //           showName: "BCH/BTC",
          //           marketBuyMin: 0.000001,
          //           is_grid_open: 1,
          //           multiple: 3,
          //           isOnlyHoldShow: 0,
          //           IsST: 0,
          //           marketSellMin: 0.001,
          //           sort: 44,
          //           etfOpen: 0,
          //           quoteFeeRate: "0",
          //           newcoinFlag: 0,
          //           isShow: 1,
          //           volume: 3,
          //           depth: "0.00001,0.0001,0.001",
          //           price: 5,
          //           IsMine: "0",
          //           name: "BCH/BTC",
          //           limitPriceMin: 0.000001,
          //           IsLimitPlat: "0",
          //           is_open_lever: 1,
          //           openQuoteFee: 0,
          //         },
          //       },
          //     },
          //     wsUrl: "wss://ws.zedcex.com/kline-api/ws",
          //     followCoinList: {
          //       ZEDXION1: {
          //         ZEDXION1: {
          //           showName: "ZEDXION",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "3",
          //           mainChainName: "Bep20",
          //           icon: "https://i.postimg.cc/P5G5yh2r/zedxion.png",
          //           sort: 1,
          //           tokenBase: "BSC",
          //           mainChainSymbol: "ZEDXION1",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "ZEDXION1",
          //           tagType: 0,
          //           mainChainType: 1,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //         ZEDXION2: {
          //           showName: "ZEDXION",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "Erc20",
          //           icon: "",
          //           sort: 1,
          //           tokenBase: "ZEDXION2",
          //           mainChainSymbol: "ZEDXION1",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "ZEDXION2",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //         ZEDXIONT: {
          //           showName: "ZEDXION",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "3",
          //           mainChainName: "Trc20",
          //           icon: "",
          //           sort: 1,
          //           tokenBase: "TRX",
          //           mainChainSymbol: "ZEDXION1",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "ZEDXIONT",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //       },
          //       USDT: {
          //         TUSDT: {
          //           showName: "TUSDT",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "TRC20",
          //           icon: "",
          //           sort: 96,
          //           tokenBase: "TRX",
          //           mainChainSymbol: "USDT",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "TUSDT",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //         EUSDT: {
          //           showName: "EUSDT",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "ERC20",
          //           icon: "",
          //           sort: 98,
          //           tokenBase: "ETH",
          //           mainChainSymbol: "USDT",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "EUSDT",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 2,
          //           isOverchargeMsg: {},
          //         },
          //         USDT: {
          //           showName: "USDT",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "OMNI",
          //           icon: "https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615162307781.png",
          //           sort: 99,
          //           tokenBase: "USDT",
          //           mainChainSymbol: "USDT",
          //           isOvercharge: 0,
          //           otcOpen: 1,
          //           name: "USDT",
          //           tagType: 0,
          //           mainChainType: 1,
          //           showPrecision: 2,
          //           isOverchargeMsg: {},
          //         },
          //         USDTBEP: {
          //           showName: "USDTBEP",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "BEP20",
          //           icon: "",
          //           sort: 999,
          //           tokenBase: "BSC",
          //           mainChainSymbol: "USDT",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "USDTBEP",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 2,
          //           isOverchargeMsg: {},
          //         },
          //       },
          //       BNB: {
          //         BNBBEP20: {
          //           showName: "BNBBEP20",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "BEP20",
          //           icon: "",
          //           sort: 111,
          //           tokenBase: "BSC",
          //           mainChainSymbol: "BNB",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "BNBBEP20",
          //           tagType: 0,
          //           mainChainType: 2,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //         BNB: {
          //           showName: "BNB",
          //           fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //           coinTag: "",
          //           mainChainName: "BNB",
          //           icon: "",
          //           sort: 121,
          //           tokenBase: "BNB",
          //           mainChainSymbol: "BNB",
          //           isOvercharge: 0,
          //           otcOpen: 0,
          //           name: "BNB",
          //           tagType: 0,
          //           mainChainType: 1,
          //           showPrecision: 8,
          //           isOverchargeMsg: {},
          //         },
          //       },
          //       ZEDXION: {},
          //     },
          //     rate: {
          //       ko_KR: {
          //         AGLD: 1101.11101,
          //         MATIC: 1236.683570786048,
          //         RARE: 550.555505,
          //         VET: 11.0111101,
          //         symbolPrecision: "0",
          //         lang_coin: "KRW",
          //         SHIB: 0.0179500821049088,
          //         IOTX: 11.0111101,
          //         USDT: 1376.54003872,
          //         DOGE: 88.09856247808,
          //         FRONT: 220.222202,
          //         HT: 1101.11101,
          //         CLV: 550.555505,
          //         CHR: 220.222202,
          //         BNX: 22022.2202,
          //         COMP: 110111.101,
          //         lang_logo: "₩",
          //         CHZ: 110.111101,
          //         SLP: 11.0111101,
          //         XRP: 487.432827710752,
          //         MBOX: 2202.22202,
          //         TRX: 87.8094890699488,
          //         MDX: 110.111101,
          //         coin_precision: "2",
          //         SAND: 2202.22202,
          //         GHST: 1101.11101,
          //         BCH: 180602.053080064,
          //         CAKE: 5505.55505,
          //         DOT: 10929.7279074368,
          //         OMG: 2202.22202,
          //         HOT: 0.220222202,
          //         "1INCH": 1101.11101,
          //         BTC: 30395270.47177322,
          //         VETHOR: 1.10111101,
          //         LTC: 84960.0511897984,
          //         USDC: 1101.11101,
          //         EGLD: 110111.101,
          //         CVP: 550.555505,
          //         FTM: 1101.11101,
          //         ENJ: 1101.11101,
          //         CRO: 110.111101,
          //         BTT: 1.10111101,
          //         YFII: 1101111.01,
          //         PLA: 1101.11101,
          //         CRV: 1101.11101,
          //         FTT: 38653.2442872576,
          //         DYDX: 5505.55505,
          //         SUSHI: 1829.834673470496,
          //         ALGO: 1101.11101,
          //         MASK: 5505.55505,
          //         ATOM: 22266.91166633472,
          //         SRM: 1101.11101,
          //         UNI: 9443.0646656192,
          //         AAVE: 129532.417643552,
          //         KRW: "1",
          //         TLM: 110.111101,
          //         QNT: 110111.101,
          //         ALICE: 5505.55505,
          //         XLM: 110.111101,
          //         LINK: 11108.6781124704,
          //         SNX: 3303.33303,
          //         YFI: 11011110.1,
          //         KSM: 110111.101,
          //         MANA: 1101.11101,
          //         FIL: 8933.7448512928,
          //         RNDR: 2202.22202,
          //         BIT: 1101.11101,
          //         DAI: 1101.11101,
          //         GALA: 110.111101,
          //         ETC: 53409.753502336,
          //         BAT: 1101.11101,
          //         DODO: 1101.11101,
          //         BNB: 220222.202,
          //         CELR: 22.0222202,
          //         ETH: 2394560.22435537,
          //         ZEC: 55055.5505,
          //         AXS: 20180.0769676352,
          //         LRC: 1101.11101,
          //         ADA: 703.41195978592,
          //       },
          //       en_US: {
          //         AGLD: 1.0001,
          //         MATIC: 0.89848984,
          //         RARE: 0.50005,
          //         VET: 0.010001,
          //         symbolPrecision: "2",
          //         lang_coin: "USD",
          //         SHIB: 0.000013041304,
          //         IOTX: 0.010001,
          //         USDT: 1.0001,
          //         DOGE: 0.0640064,
          //         FRONT: 0.20002,
          //         HT: 1.0001,
          //         CLV: 0.50005,
          //         CHR: 0.20002,
          //         BNX: 20.002,
          //         COMP: 100.01,
          //         lang_logo: "$",
          //         CHZ: 0.10001,
          //         SLP: 0.010001,
          //         XRP: 0.35413541,
          //         MBOX: 2.0002,
          //         TRX: 0.063796379,
          //         MDX: 0.10001,
          //         coin_precision: "2",
          //         SAND: 2.0002,
          //         GHST: 1.0001,
          //         BCH: 131.21312,
          //         CAKE: 5.0005,
          //         DOT: 7.940794,
          //         OMG: 2.0002,
          //         HOT: 0.00020002,
          //         "1INCH": 1.0001,
          //         BTC: 22085.564046,
          //         VETHOR: 0.0010001,
          //         LTC: 61.726172,
          //         USDC: 1.0001,
          //         EGLD: 100.01,
          //         CVP: 0.50005,
          //         FTM: 1.0001,
          //         ENJ: 1.0001,
          //         CRO: 0.10001,
          //         BTT: 0.0010001,
          //         YFII: 1000.1,
          //         PLA: 1.0001,
          //         CRV: 1.0001,
          //         FTT: 28.082808,
          //         DYDX: 5.0005,
          //         SUSHI: 1.32943293,
          //         ALGO: 1.0001,
          //         MASK: 5.0005,
          //         ATOM: 16.1776176,
          //         SRM: 1.0001,
          //         UNI: 6.860686,
          //         AAVE: 94.10941,
          //         TLM: 0.10001,
          //         QNT: 100.01,
          //         ALICE: 5.0005,
          //         XLM: 0.10001,
          //         LINK: 8.070807,
          //         SNX: 3.0003,
          //         YFI: 10001,
          //         KSM: 100.01,
          //         MANA: 1.0001,
          //         USD: "1",
          //         FIL: 6.490649,
          //         RNDR: 2.0002,
          //         BIT: 1.0001,
          //         DAI: 1.0001,
          //         GALA: 0.10001,
          //         ETC: 38.80388,
          //         BAT: 1.0001,
          //         DODO: 1.0001,
          //         BNB: 200.02,
          //         CELR: 0.020002,
          //         ETH: 1739.95821592,
          //         ZEC: 50.005,
          //         AXS: 14.661466,
          //         LRC: 1.0001,
          //         ADA: 0.5110511,
          //       },
          //       zh_CN: {
          //         AGLD: 6.06,
          //         MATIC: 6.2216066426,
          //         RARE: 3.03,
          //         VET: 0.0606,
          //         symbolPrecision: "2",
          //         lang_coin: "CNY",
          //         SHIB: 0.00009030470906,
          //         IOTX: 0.0606,
          //         USDT: 6.92520775,
          //         DOGE: 0.443213296,
          //         FRONT: 1.212,
          //         HT: 6.06,
          //         CLV: 3.03,
          //         CHR: 1.212,
          //         BNX: 121.2,
          //         COMP: 606,
          //         lang_logo: "￥",
          //         CHZ: 0.606,
          //         SLP: 0.0606,
          //         XRP: 2.452216064275,
          //         MBOX: 12.12,
          //         TRX: 0.4417590023725,
          //         EC: 1,
          //         MDX: 0.606,
          //         coin_precision: "2",
          //         SAND: 12.12,
          //         GHST: 6.06,
          //         BCH: 908.5872568,
          //         CAKE: 30.3,
          //         DOT: 54.986149535,
          //         OMG: 12.12,
          //         HOT: 0.001212,
          //         "1INCH": 6.06,
          //         BTC: 152914.95831113,
          //         VETHOR: 0.00606,
          //         LTC: 427.42382233,
          //         USDC: 6.06,
          //         EGLD: 606,
          //         CVP: 3.03,
          //         FTM: 6.06,
          //         ENJ: 6.06,
          //         CRO: 0.606,
          //         BTT: 0.00606,
          //         YFII: 6060,
          //         PLA: 6.06,
          //         CRV: 6.06,
          //         FTT: 194.45983362,
          //         DYDX: 30.3,
          //         SUSHI: 9.205678662075,
          //         ALGO: 6.06,
          //         MASK: 30.3,
          //         ATOM: 112.022160564,
          //         SRM: 6.06,
          //         CNY: "1",
          //         UNI: 47.506925165,
          //         AAVE: 651.662049275,
          //         TLM: 0.606,
          //         QNT: 606,
          //         ALICE: 30.3,
          //         XLM: 0.606,
          //         LINK: 55.8864265425,
          //         SNX: 18.18,
          //         YFI: 60600,
          //         KSM: 606,
          //         MANA: 6.06,
          //         USD: 6.92520775,
          //         FIL: 44.9445982975,
          //         RNDR: 12.12,
          //         BIT: 6.06,
          //         DAI: 6.06,
          //         GALA: 0.606,
          //         ETC: 268.6980607,
          //         BAT: 6.06,
          //         DODO: 6.06,
          //         BNB: 1212,
          //         CELR: 0.1212,
          //         ETH: 12046.74514151,
          //         ZEC: 303,
          //         AXS: 101.523545615,
          //         LRC: 6.06,
          //         ADA: 3.53878116025,
          //       },
          //       ja_JP: {
          //         AGLD: 109.31930692,
          //         MATIC: 128.055909640066,
          //         RARE: 54.65965346,
          //         VET: 1.0931930692,
          //         symbolPrecision: 2,
          //         lang_coin: "JPY",
          //         SHIB: 0.0018576583176176,
          //         IOTX: 1.0931930692,
          //         USDT: 142.45845994,
          //         DOGE: 9.131587282154,
          //         FRONT: 21.863861384,
          //         HT: 109.31930692,
          //         CLV: 54.65965346,
          //         CHR: 21.863861384,
          //         BNX: 2186.3861384,
          //         COMP: 10931.930692,
          //         lang_logo: "¥",
          //         CHZ: 10.931930692,
          //         SLP: 1.0931930692,
          //         XRP: 50.444540664754,
          //         MBOX: 218.63861384,
          //         TRX: 9.0902743287714,
          //         coin_precision: 2,
          //         MDX: 10.931930692,
          //         SAND: 218.63861384,
          //         GHST: 109.31930692,
          //         BCH: 18690.549944128,
          //         CAKE: 546.5965346,
          //         DOT: 1132.544756523,
          //         OMG: 218.63861384,
          //         HOT: 0.021863861384,
          //         "1INCH": 109.31930692,
          //         BTC: 3145613.85725834,
          //         VETHOR: 0.10931930692,
          //         LTC: 8799.6590704938,
          //         USDC: 109.31930692,
          //         EGLD: 10931.930692,
          //         CVP: 54.65965346,
          //         FTM: 109.31930692,
          //         ENJ: 109.31930692,
          //         CRO: 10.931930692,
          //         BTT: 0.10931930692,
          //         YFII: 109319.30692,
          //         PLA: 109.31930692,
          //         CRV: 109.31930692,
          //         FTT: 4001.6581397146,
          //         DYDX: 546.5965346,
          //         SUSHI: 189.284555722278,
          //         ALGO: 109.31930692,
          //         MASK: 546.5965346,
          //         ATOM: 2305.26279874908,
          //         SRM: 109.31930692,
          //         UNI: 977.2650351884,
          //         AAVE: 13419.586926348,
          //         JPY: "1",
          //         TLM: 10.931930692,
          //         QNT: 10931.930692,
          //         ALICE: 546.5965346,
          //         XLM: 10.931930692,
          //         LINK: 1149.6397717158,
          //         SNX: 327.95792076,
          //         YFI: 1093193.0692,
          //         KSM: 10931.930692,
          //         MANA: 109.31930692,
          //         FIL: 924.5554050106,
          //         RNDR: 218.63861384,
          //         BIT: 109.31930692,
          //         DAI: 109.31930692,
          //         GALA: 10.931930692,
          //         ETC: 5521.6899072744,
          //         BAT: 109.31930692,
          //         DODO: 109.31930692,
          //         BNB: 21863.861384,
          //         CELR: 2.1863861384,
          //         ETH: 247813.61398862,
          //         ZEC: 5465.965346,
          //         AXS: 2089.8656073198,
          //         LRC: 109.31930692,
          //         ADA: 72.93873148928,
          //       },
          //     },
          //     headerSymbol: [
          //       "BTC/USDT",
          //       "ETH/USDT",
          //       "ETC/USDT",
          //       "LTC/USDT",
          //       "TRX/USDT",
          //       "DOGE/USDT",
          //     ],
          //     maket_index: "BTC",
          //     coinList: {
          //       BTC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BTC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615161908108.png",
          //         sort: 1,
          //         tokenBase: "BTC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BTC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ZEDXION1: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ZEDXION",
          //         coinTag: "3",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "Bep20",
          //         icon: "https://i.postimg.cc/P5G5yh2r/zedxion.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "ZEDXION1",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ZEDXION1",
          //         tagType: 0,
          //         mainChainType: 1,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ZEDXION2: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ZEDXION",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "Erc20",
          //         icon: "",
          //         sort: 1,
          //         tokenBase: "ZEDXION2",
          //         mainChainSymbol: "ZEDXION1",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ZEDXION2",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ZEDXIONT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ZEDXION",
          //         coinTag: "3",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "Trc20",
          //         icon: "",
          //         sort: 1,
          //         tokenBase: "TRX",
          //         mainChainSymbol: "ZEDXION1",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ZEDXIONT",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       OIL: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "OIL",
          //         coinTag: "3",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/2SQrxKHs/oil.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "OIL",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       TOMAN: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "TOMAN",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/3rts3H6r/IRR.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "TOMAN",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       USDZ: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "USDZ",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/NjTWc2mm/usdz.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 1,
          //         name: "USDZ",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BZD: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BZD",
          //         coinTag: "3",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/T1LXby7Z/BZ-DIAMOND.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BZD",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       GOLD: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "GOLD",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/QM73rm3f/a-Pngtreea-gold-coin-3779125.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "GOLD",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       RUB: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "RUB",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/TPWZg3hq/RUB-Logo.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "RUB",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 2,
          //         isOverchargeMsg: {},
          //       },
          //       SM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/bY7f0XVm/Screenshot-2022-04-14-at-13-21-42.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 6,
          //         isOverchargeMsg: {},
          //       },
          //       EURT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "EURT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://i.postimg.cc/15Trrr8L/photo-2021-06-29-21-05-40.png",
          //         sort: 1,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "EURT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ETH: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ETH",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615162012466.png",
          //         sort: 2,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ETH",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       LTC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "LTC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "http://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615164004573.png",
          //         sort: 3,
          //         tokenBase: "LTC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "LTC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BCH: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BCH",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615161844174.png",
          //         sort: 4,
          //         tokenBase: "BCH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BCH",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ETC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ETC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "http://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180623112036400.png",
          //         sort: 5,
          //         tokenBase: "ETC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ETC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       LINK: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "LINK",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 6,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "LINK",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       TRX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "TRX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 7,
          //         tokenBase: "TRX",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "TRX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 6,
          //         isOverchargeMsg: {},
          //       },
          //       DOT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "DOT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 8,
          //         tokenBase: "DOT",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "DOT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       DOGE: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "DOGE",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 9,
          //         tokenBase: "DOGE",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "DOGE",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ADA: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ADA",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 10,
          //         tokenBase: "ADA",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ADA",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ATOM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ATOM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 11,
          //         tokenBase: "ATOM",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ATOM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       FIL: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "FIL",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 12,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "FIL",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       XRP: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "XRP",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 13,
          //         tokenBase: "XRP",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "XRP",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       AXS: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "AXS",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 14,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "AXS",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       FTT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "FTT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 15,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "FTT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       UNI: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "UNI",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 16,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "UNI",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SHIB: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SHIB",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 17,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SHIB",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       AAVE: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "AAVE",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 18,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "AAVE",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       MATIC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "MATIC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 19,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "MATIC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SUSHI: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SUSHI",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 20,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SUSHI",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       TUSDT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "TUSDT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "TRC20",
          //         icon: "",
          //         sort: 96,
          //         tokenBase: "TRX",
          //         mainChainSymbol: "USDT",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "TUSDT",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       EUSDT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "EUSDT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "ERC20",
          //         icon: "",
          //         sort: 98,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "USDT",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "EUSDT",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 2,
          //         isOverchargeMsg: {},
          //       },
          //       USDT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "USDT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "OMNI",
          //         icon: "https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20180615162307781.png",
          //         sort: 99,
          //         tokenBase: "USDT",
          //         mainChainSymbol: "USDT",
          //         isOvercharge: 0,
          //         otcOpen: 1,
          //         name: "USDT",
          //         tagType: 0,
          //         mainChainType: 1,
          //         showPrecision: 2,
          //         isOverchargeMsg: {},
          //       },
          //       HT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "HT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "HT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       YFI: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "YFI",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "YFI",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       COMP: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "COMP",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "COMP",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SNX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SNX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SNX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       USDC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "USDC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "USDC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       DAI: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "DAI",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "DAI",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BSC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BSC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BSC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BNBBEP20: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BNBBEP20",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "BEP20",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "BNB",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BNBBEP20",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       AGLD: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "AGLD",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "AGLD",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       RARE: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "RARE",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "RARE",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ERN: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ERN",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ERN",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CAKE: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CAKE",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CAKE",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       HECO: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "HECO",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "HECO",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "HECO",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       MDX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "MDX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "HECO",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "MDX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CLV: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CLV",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CLV",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ALICE: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ALICE",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ALICE",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       MASK: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "MASK",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "MASK",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       QNT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "QNT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "QNT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CRV: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CRV",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CRV",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       "1INCH": {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "1INCH",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "1INCH",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       DODO: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "DODO",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "DODO",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BTT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BTT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "TRX",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BTT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       DYDX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "DYDX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "DYDX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       MBOX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "MBOX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "MBOX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       XLM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "XLM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "XLM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CVP: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CVP",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CVP",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CRO: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CRO",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CRO",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       FRONT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "FRONT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "FRONT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       MANA: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "MANA",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "MANA",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SRM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SRM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SRM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       HOT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "HOT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "HOT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       FTM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "FTM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "FTM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       EGLD: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "EGLD",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "EGLD",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       KSM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "KSM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "KSM",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "KSM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BAT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BAT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BAT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ENJ: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ENJ",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ENJ",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SLP: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SLP",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SLP",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       OMG: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "OMG",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "OMG",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CHR: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CHR",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CHR",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       YFII: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "YFII",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "YFII",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       GALA: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "GALA",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "GALA",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CHZ: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CHZ",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CHZ",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       IOTX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "IOTX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "IOTX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       TLM: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "TLM",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "TLM",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       CELR: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "CELR",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "CELR",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       SAND: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "SAND",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "SAND",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       PLA: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "PLA",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "PLA",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       LRC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "LRC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "LRC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BNX: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BNX",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BNX",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       RNDR: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "RNDR",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "RNDR",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       GHST: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "GHST",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "GHST",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ALGO: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ALGO",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ALGO",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ALGO",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       VET: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "VET",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "VET",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "VET",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       VETHOR: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "VETHOR",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "VET",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "VETHOR",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BIT: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BIT",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 111,
          //         tokenBase: "ETH",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BIT",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       BNB: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "BNB",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "BNB",
          //         icon: "",
          //         sort: 121,
          //         tokenBase: "BNB",
          //         mainChainSymbol: "BNB",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "BNB",
          //         tagType: 0,
          //         mainChainType: 1,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       USDTBEP: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "USDTBEP",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "BEP20",
          //         icon: "",
          //         sort: 999,
          //         tokenBase: "BSC",
          //         mainChainSymbol: "USDT",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "USDTBEP",
          //         tagType: 0,
          //         mainChainType: 2,
          //         showPrecision: 2,
          //         isOverchargeMsg: {},
          //       },
          //       USDTBSC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "USDTBSC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "Bep20",
          //         icon: "",
          //         sort: 999,
          //         tokenBase: "USDTBSC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "USDTBSC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       TEST: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "TEST",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 999,
          //         tokenBase: "TEST",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "TEST",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //       ZEC: {
          //         isFiat: 0,
          //         fiatPrecision: { krw: "2", jpy: 2, usd: "2", cny: "2" },
          //         showName: "ZEC",
          //         coinTag: "",
          //         symbolPrecision: { krw: "0", jpy: 2, usd: "2", cny: "2" },
          //         mainChainName: "",
          //         icon: "",
          //         sort: 1111,
          //         tokenBase: "ZEC",
          //         mainChainSymbol: "",
          //         isOvercharge: 0,
          //         otcOpen: 0,
          //         name: "ZEC",
          //         tagType: 0,
          //         mainChainType: 0,
          //         showPrecision: 8,
          //         isOverchargeMsg: {},
          //       },
          //     },
          //     klineScale: [
          //       "1min",
          //       "5min",
          //       "15min",
          //       "30min",
          //       "60min",
          //       "4h",
          //       "1day",
          //       "1week",
          //       "1month",
          //     ],
          //     marketSort: ["USDT", "USDZ", "BTC"],
          //     coinTagLangs: {
          //       ko_KR: { 1: "Halve", 2: "New", 3: "Hot", 4: "ETF" },
          //       en_US: { 1: "Halve", 2: "New", 3: "Hot", 4: "ETF" },
          //       zh_CN: { 1: "减半", 2: "上新", 3: "热门", 4: "ETF" },
          //       vi_VN: { 1: "Halve", 2: "New", 3: "Hot", 4: "ETF" },
          //       ja_JP: { 1: "Halve", 2: "New", 3: "Hot", 4: "ETF" },
          //     },
          //   },
          //   HIT: "USDT",
          //   futuresType: "0",
          //   klineColor: { up: "#0BA83F", down: "#DF1A28" },
          //   nc: {
          //     nc_lang: "en",
          //     nc_appkey: "FFFF0000000001780E11",
          //     nc_prefix: "nc_",
          //   },
          //   coinsymbol_introduce_names: [],
          //   update_safe_withdraw: { hour: "48", is_open: "1" },
          //   skin_new: "",
          //   lan: {
          //     defLan: "en_US",
          //     lanList: [
          //       { name: "简体中文", id: "zh_CN" },
          //       { name: "한국어", id: "ko_KR" },
          //       { name: "English", id: "en_US" },
          //     ],
          //   },
          //   h5_mining_style: "0",
          //   seo: { keywords: "", description: "", pageContent: "", title: "" },
          //   footer_style: "0",
          //   skinType: [],
          // };

          // const a = "11";
          // const localClear = myStorage.get("localClear");
          // if (a !== localClear) {
          //   myStorage.clear();
          //   myStorage.set("localClear", a);
          //   state.storageClean = true;
          // }
          // sloveData(_publicInfo);
          // setMarketInforData(_publicInfo);
          // setBaseDate(_publicInfo);
          // resolve(_publicInfo);
        });
      if (!window.publicInfo || IS_HIDEN) {
        Promise.all([getInfo()]).then(() => {});
      } else {
        sloveData(window.publicInfo);
        setMarketInforData(window.publicInfo);
        setBaseDate(window.publicInfo);
      }
    },
    // 获取汇率计算单位
    getRateInfo({ commit }) {
      clearInterval(this.thisInterval);
      this.thisInterval = setInterval(() => {
        axios({
          url: this.state.url.common.rate,
          method: "post",
          headers: { "exchange-auto": "1" },
        }).then((data) => {
          if (data.code === "0") {
            commit("RATE", data.rate);
          }
        });
      }, 30000);
    },
    // 取消登录状态
    deleteIsLogin({ commit }) {
      removeCookie("token"); // 清理cookie
      commit("DELETEISLOGIN");
    },
    // 获取自定义你Footer 和 自定义 hander 的模板数据
    getFooterHeander_info({ commit, state }) {
      const data = {
        footer: "",
        header: "Please edit the HTML of the header here",
      };
      commit("GETFOOTERHEADERINFO", data);
      state.footerTemplateReceived = true;
      // axios({
      //   url: this.state.url.common.footerAndHeader,
      //   method: "post",
      // }).then((data) => {
      //   if (data.code.toString() === "0") {
      //     commit("GETFOOTERHEADERINFO", data.data);
      //   }
      //   state.footerTemplateReceived = true;
      // });

      // 改，2022.08.18，新增
      // 取消更改，2022.09.17
      // state.footerTemplateReceived = true;
    },
    getMessage_count({ commit }) {
      axios({
        url: this.state.url.mesage.message_count,
        headers: { "exchange-auto": "1" },
        method: "post",
      }).then((data) => {
        if (data.code.toString() === "0") {
          commit("MESSAGECOUNT", data.data);
        }
      });
    },
    // 获取OTC订单列表
    getOtcOrderList({ commit, state }) {
      axios({
        url: "/order/otc/unfinished",
        method: "post",
        params: {
          pageSize: 50, // 获取更多数据用于检测
          page: 1,
        },
      }).then((data) => {
        if (data.code.toString() === "0") {
          const newOrderList = data.data.orderList || [];
          const newOrderIds = newOrderList.map((item) => item.id);
          const oldOrderIds = state.oldOtcOrderList || [];

          // console.log("OTC订单数据比较:", {
          //   newOrderIds,
          //   oldOrderIds,
          //   newCount: newOrderIds.length,
          //   oldCount: oldOrderIds.length,
          // });
          // 检查是否有新订单
          // 1. 如果是首次加载且有订单，触发音频（表示有待处理订单）
          // 2. 如果有新的订单ID出现，触发音频
          let hasNewOrder = false;

          if (oldOrderIds.length === 0 && newOrderIds.length > 0) {
            // 首次加载且有订单
            hasNewOrder = true;
            // console.log("首次加载检测到OTC订单");
          } else if (oldOrderIds.length > 0 && newOrderIds.length > 0) {
            // 非首次加载，检查是否有新订单
            hasNewOrder = newOrderIds.some((id) => !oldOrderIds.includes(id));
            // if (hasNewOrder) {
            //   // console.log("检测到新增的OTC订单");
            // }
          }

          if (hasNewOrder) {
            // 设置未读状态为true，用于头部导航栏显示小红点
            commit("SET_UNREAD_OTC_ORDER", true);
          } else if (newOrderIds.length === 0) {
            // 如果没有订单，重置未读状态为false
            commit("SET_UNREAD_OTC_ORDER", false);
          }

          // 更新store中的订单数据
          commit("OTCORDERLIST", {
            orderList: newOrderList,
            orderIds: newOrderIds,
          });
        }
      });
    },
    // 获取 otcpublic_info 数据
    getOtcPublicInfo({ commit, state }) {
      axios({
        url: "otc/public_info",
        method: "post",
        hostType: "otc",
      }).then((data) => {
        if (Number(data.code) === 0) {
          const paymentsObj = [];
          const ExchiefObj = [];
          const paymentsArr = data.data.payments;
          paymentsArr.forEach((obj) => {
            if (
              obj.key === "otc.payment.alipay" ||
              obj.key === "otc.payment.wxpay" ||
              obj.key === "otc.payment.domestic.bank.transfer"
            ) {
              paymentsObj.push(obj);
              ExchiefObj.push(obj);
            }
            if (
              obj.key === "otc.payment.paypal" ||
              obj.key === "otc.payment.MTNmobile" ||
              obj.key === "otc.payment.VodafoneCash" ||
              obj.key === "otc.payment.AirtelTigo"
            ) {
              ExchiefObj.push(obj);
            }
          });
          const payments = {
            ...data.data,
            // payments: !Number(state.exchief_project_switch) ? paymentsObj : ExchiefObj,
            payments: paymentsArr,
          };
          commit("GETOTCPUBLICINFO", { payments, paymentsArr });
        }
      });
    },
    getImgToken({ commit }, imageType) {
      axios({
        method: "post",
        url: this.state.url.common.get_image_token,
        hostType: "ex",
        params: {
          operate_type: imageType,
        },
      }).then((result) => {
        if (!Number(result.code)) {
          const data = {};
          data[imageType] = result.data;
          commit("IMGTOKEN", data);
        }
      });
    },
    setKrwFlag({ commit }) {
      commit("SETKRWFLAG");
    },
    setPhoneCodeGlobal({ commit }, phoneCode) {
      commit(SET_COUNTRY_OBJ, getCountryList(phoneCode));
    },
    getCoinSymbolIntroduce({ commit }) {
      const data = [
        {
          publishTime: 1230912000000,
          currencyAmount: "19.80M",
          mtime: 1760954874000,
          publishAmount: "21.00M",
          officialUrl: "https://bitcoin.org/en/",
          publishTimeStr: "2009/01/03",
          coinSymbol: "BTC",
          langKey: "en_US",
          blockchainUrl: "https://www.blockchain.com/explorer/assets/btc",
          ctime: 1760954874000,
          id: 3,
          shortName: "bitcoin",
          introduction: "",
          longName: "bitcoin",
        },
        {
          publishTime: 1722441600000,
          currencyAmount: "21.93M",
          mtime: 1760956025000,
          publishAmount: "21.93M",
          officialUrl: "https://polygon.technology/",
          publishTimeStr: "2024/08/01",
          coinSymbol: "POL",
          langKey: "en_US",
          blockchainUrl: "https://bscscan.com/token/0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
          ctime: 1760956025000,
          id: 14,
          shortName: "polygon",
          introduction: "",
          longName: "polygon",
        },
        {
          publishTime: 1404403200000,
          currencyAmount: "120.47M",
          mtime: 1760956220000,
          publishAmount: "120.47M",
          officialUrl: "https://ethereum.org/zh/",
          publishTimeStr: "2014/07/04",
          coinSymbol: "ETH",
          langKey: "en_US",
          blockchainUrl: "https://etherscan.io/",
          ctime: 1760956220000,
          id: 20,
          shortName: "ethereum",
          introduction: "",
          longName: "ethereum",
        },
        {
          publishTime: 1504108800000,
          currencyAmount: "86.19B",
          mtime: 1760956417000,
          publishAmount: "86.19B",
          officialUrl: "https://trondao.org/",
          publishTimeStr: "2017/08/31",
          coinSymbol: "TRX",
          langKey: "en_US",
          blockchainUrl: "https://tronscan.org/#/",
          ctime: 1760956417000,
          id: 25,
          shortName: "tron",
          introduction: "",
          longName: "tron",
        },
        {
          publishTime: 1586793600000,
          currencyAmount: "479.72M",
          mtime: 1760956603000,
          publishAmount: "591.20M",
          officialUrl: "https://solana.com/",
          publishTimeStr: "2020/04/14",
          coinSymbol: "SOL",
          langKey: "en_US",
          blockchainUrl: "https://solscan.io/token/So11111111111111111111111111111111111111111",
          ctime: 1760956603000,
          id: 31,
          shortName: "solana",
          introduction: "",
          longName: "solana",
        },
        {
          publishTime: 1499443200000,
          currencyAmount: "144.00M",
          mtime: 1760956727000,
          publishAmount: "200.00M",
          officialUrl: "https://www.bnbchain.org/en",
          publishTimeStr: "2017/07/08",
          coinSymbol: "BNB",
          langKey: "en_US",
          blockchainUrl: "https://explorer.bnbchain.org/",
          ctime: 1760956727000,
          id: 37,
          shortName: "bnbchain",
          introduction: "",
          longName: "bnbchain",
        },
      ];
      commit("COINSYMBOLINTRODUCE", data);
      // axios({
      //   method: "post",
      //   url: "common/coinSymbol_introduce",
      //   hostType: "ex",
      //   params: {},
      // }).then((result) => {
      //   if (!Number(result.code)) {
      //     commit("COINSYMBOLINTRODUCE", result.data);
      //   }
      // });
    },
    thirdPartyLoginData({ commit }, param) {
      axios({
        url: param.url,
        method: "post",
        params: param.data,
      }).then((data) => {
        if (data.code === "0") {
          const Info = { msg: data.msg, text: "success", data: data.data };
          commit("THIRD_PARTY_LOGIN_DATA", Info);
        } else {
          const Info = { code: data.code, msg: data.msg, text: "error" };
          commit("THIRD_PARTY_LOGIN_DATA", Info);
        }
      });
    },
  },
  mutations: {
    [COIN_TAG_OPEN](state, result) {
      state.coin_tag_open = result;
    },
    [COIN_TAG_LANGS](state, result) {
      state.coinTagLangs = result;
    },
    [IS_INVITE_OPEN](state, result) {
      state.is_invite_open = result;
    },
    [SETISAPP](state, flag) {
      state.isApp = flag;
    },
    [INCREMENT_CONFIG_STATUS](state, result) {
      state.incrementConfigStatus = result;
    },
    [SET_IS_OPEN_UPLOAD_IMG](state, result) {
      state.is_open_upload_img = result;
    },
    [SET_COUNTRY_OBJ](state, result) {
      state.countryObj = result;
    },
    [SET_INTERFACES_WITCH](state, result) {
      state.interfaceSwitch = result;
    },
    [SET_DEFAULT_COUNTRYCODE](state, result) {
      state.defaultCountryCode = result.default_country_code || "";
      state.defaultCountryCodeReal = result.default_country_code_real || "";
    },
    [LIMIT_COUNTRY_LIST](state, result) {
      state.limitCountryList = result;
    },
    [IS_NEWCOIN_PROJECT_ENTRANCE](state, result) {
      state.is_newcoin_project_entrance = result;
    },
    [ENFORCE_GOOGLE_AUTH](state, result) {
      state.is_enforce_google_auth = result;
    },

    [APP_AUTH_OPEN](state, result) {
      state.app_auth_open = result;
    },

    [IS_INNER_TRANSFER_OPEN](state, result) {
      state.is_inner_transfer_open = result;
    },

    [LEVER_OPEN](state, result) {
      state.lever_open = result;
    },
    [FIAT_OPEN](state, result) {
      state.fiat_open = result;
    },
    [HAS_TRADE_LIMIT_OPEN](state, result) {
      state.has_trade_limit_open = result;
    },
    [INDEX_LAYER_OPEN](state, result) {
      state.index_layer_open = result;
    },
    [OPTIONAL_SYMBOL_SERVER_OPEN](state, result) {
      state.optional_symbol_server_open = result;
    },
    [NEW_COIN_OPEN](state, result) {
      state.newcoinOpen = result;
    },
    [AGENT_USER_OPEN](state, result) {
      state.agentUserOpen = result;
    },
    [IS_DEPOSIT_OPEN](state, result) {
      state.is_deposit_open = result;
    },
    [TRADE_BOARD_IS_FOLD](state, result) {
      state.trade_board_is_fold = result;
    },
    [TRADE_DEPTH_IS_FLASH](state, result) {
      state.trade_depth_is_flash = result;
    },
    [SYMBOLPROFILE](state, result) {
      state.symbol_profile = result;
    },
    [COINSYMBOLINTRODUCE](state, result) {
      state.coinSymbolIntroduce = result;
    },
    [INDEXHEADERTITLE](state, result) {
      state.indexHeaderTitle = result;
    },
    [SETLEVERMARKET](state, result) {
      state.leverMarket = result;
    },
    [IS_OPEN_BIGDEAL](state, result) {
      let isOpenBigdeal = false;
      if (typeof result === "undefined") {
        isOpenBigdeal = true;
      } else {
        isOpenBigdeal = result;
      }
      state.is_open_bigDeal = isOpenBigdeal;
    },
    [ISMOREPOSITION](state, result) {
      state.is_more_position = result;
    },
    [SETKRWFLAG](state) {
      state.krwFlag = false;
    },
    [CLIENTUPLOAD](state, result) {
      state.client_img_upload_open = result;
    },
    [IMGTOKEN](state, result) {
      state.imgToken = { ...state.imgToken, ...result };
    },
    // 公共数据 public_info
    [GETAPPDOWNLOAD](state, result) {
      state.app_download = result;
    },
    // 公共数据 public_info
    [GETPUBLICINFO](state, result) {
      state.publicInfo = result;
      // state.publicInfo.url.otcUrl = '';
    },
    // 公共 币对 数据
    [GETMARKET](state, result) {
      // result.coinList.BTC.showName = 'BTC123';
      state.market = result;
    },
    // 全部币对列表
    [SYMBOLALL](state, result) {
      state.symbolAll = result;
    },
    // userinfo
    [USERINFO](state, result) {
      state.userInfo = result;
      state.isLogin = true;
    },
    // userInfoIsReady
    [USERINFOISREADY](state) {
      state.userInfoIsReady = true;
    },
    [RATE](state, result) {
      state.rate = result;
    },
    [DELETEISLOGIN](state) {
      state.isLogin = false;
    },
    [GETFOOTERHEADERINFO](state, data) {
      if (data.footer) {
        state.footerTemplate = data.footer;
      }
      if (data.header) {
        state.headerTemplate = data.header;
      }
    },
    [MESSAGECOUNT](state, data) {
      state.messageCount = data.noReadMsgCount;
      state.userMessageList = data.userMessageList;
    },
    // OTC订单列表
    [OTCORDERLIST](state, data) {
      state.otcOrderList = data.orderList;
      state.oldOtcOrderList = data.orderIds;
    },
    // 设置OTC订单未读状态
    SET_UNREAD_OTC_ORDER(state, hasUnread) {
      state.hasUnreadOtcOrder = hasUnread;
    },
    // 公共数据 public_info
    [GETOTCPUBLICINFO](state, result) {
      state.otcPublicInfo = result.payments;
      state.exchief_arr_filter = result.paymentsArr;
    },
    // 合约 公共数据 public_info
    [GETCOPUBLICINFO](state, result) {
      state.coPublicInfo = result;
    },
    [SETLAN](state, result) {
      state.lan = result;
    },
    // 模板类型(中国版 国际版)
    [TEMPLATELAYOUTTYPE](state, result) {
      state.index_international_open = result;
      state.templateLayoutType = `${result + 1}`;
      // state.templateLayoutType = '2';
    },
    // 首页模板类型
    [HOMEbOARDtYPE](state, result) {
      state.index_international_open = result;
    },
    [SWIPERFLAG](state, result) {
      state.swiperFlag = result;
    },
    // otc支付方式是否显示全部
    [EXCHIEFPROJECTSWITCH](state, result) {
      state.exchief_project_switch = Number(result);
    },
    [SET_EXCHIEF_REDIRECT](state, result) {
      if (result.length) {
        result.forEach((item) => {
          state.otcPublicInfo.payments.push(item);
        });
      }
    },
    [THIRD_PARTY_LOGIN_DATA](state, result) {
      state.thirdPartyLoginData = result;
    },
    [KYC_TYPE](state, result) {
      state.nameVerifiedType = result;
    },
  },
};
