
export default {
  state: {
    kLineData: {
      0: {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: 'BTC/USDT', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: 0,
      },
      1: {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: '', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: 1,

      },
      2: {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: '', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: 2,
      },
      3: {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: '', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: 3,
      },
    },
    // 改，2022.12.05 新增tradeType变量表示是否展示多图
    tradeType: "showOne", // showMore | showOne
    curKLine: 0, // 当前操作的K线图索引
  },
  getters: {
    calKLineData: state => state.kLineData,
    calKLineDataItem(state) {
      return index => state.kLineData[index];
    },
    calTradeType: state => state.tradeType,
    calCurKLine: state => state.curKLine,
    calMarketCurrent(state) {
      return index => state.kLineData[index].marketCurrent;
    },
  },
  mutations: {
    // 改，2022.12.05 新增 changeTradeType 方法
    changeTradeType(state, { type }) {
      if (type === "showMore") {
        window.document.getElementsByTagName("html")[0].style.minWidth = '100%';
        window.document.getElementsByTagName("body")[0].style.minWidth = '100%';
        // 改，2022.12.06 删除底部第三方插件
        const intercomFrame = document.getElementById("intercom-frame");
        const intercomContainer = document.getElementById("intercom-container");
        const intercomCssContainer = document.getElementById("intercom-css-container");
        if (intercomFrame) {
          intercomFrame.parentNode.removeChild(intercomFrame);
        }
        if (intercomContainer) {
          intercomContainer.parentNode.removeChild(intercomContainer);
        }
        if (intercomCssContainer) {
          intercomCssContainer.parentNode.removeChild(intercomCssContainer);
        }
      }
      state.tradeType = type;
    },
    // 更新单个kline数据
    updateKline(state, { index, data }) {
      state.kLineData[index] = data;
    },
    // 更新选择代币的状态，每次只打开一个选择组件
    updateShowMarket(state, { index, isShow }) {
      const { kLineData } = state;
      for (const kLineDataKey in kLineData) {
        if (+kLineDataKey === +index) {
          kLineData[kLineDataKey].isShowMarket = !isShow;
        } else {
          kLineData[kLineDataKey].isShowMarket = false;
        }
      }
    },
    // 更新当前市场数据
    updateMarket(state, { index, market }) {
      const { kLineData } = state;
      kLineData[index].marketCurrent = market;
    },
    // 按键更新
    updateKey2Val(state, { index, key, value }) {
      const { kLineData } = state;
      kLineData[index][key] = value;
    },
    // 删除
    delKLine(state, index) {
      const { kLineData } = state;
      kLineData[index] = {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: '', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: index,
      };
    },
    // 改，2022.12.6 更新当前操作的索引
    updateCurKLine(state, { index }) {
      state.curKLine = +index;
    },
  },
};
