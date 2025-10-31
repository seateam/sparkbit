const axios = require("axios");

function getRate(symbol) {
  return axios({
    url: `https://api3.binance.com/api/v3/avgPrice?symbol=${symbol}USDT`,
    method: "get",
    // timeout: 1000,
  })
    .then((res) => {
      if (res.status === 200) {
        const rate = res.data.price;
        return +rate;
      }
      return 0;
    });
}
function getRate2(symbol) {
  return axios({
    url: `https://api2.binance.com/api/v3/avgPrice?symbol=${symbol}USDT`,
    method: "get",
  })
    .then((res) => {
      if (res.status === 200) {
        const rate = res.data.price;
        return +rate;
      }
      return 0;
    });
}
function getRate3(symbol, openapi = "") {
  const opt = {
    url: `${openapi}/open/api/get_ticker?symbol=${symbol}USDT`,
    method: 'get',
    hostType: 'def',
  };
  // if (process.env.NODE_ENV === "development") {
  //   opt = {
  //     url: `open/api/get_ticker?symbol=${symbol}USDT`,
  //     method: 'get',
  //     hostType: 'openapi',
  //   }
  // }
  return axios(opt)
    .then((res) => {
      if (res.data.code === "0") {
        return res.data.data.last;
      }
      return 0;
    });
}
async function newFixRate(totalBalance, totalBalanceSymbol, openapi = "") {
  let symbolRate = 0;
  try {
    symbolRate = await getRate3(totalBalanceSymbol, openapi);
  } catch (e) {
    symbolRate = await getRate2(totalBalanceSymbol);
  }
  return (symbolRate * totalBalance).toFixed(2);
}
// 截取
function cutOut(val, num) {
  return Math.floor(Number(val) * Math.pow(10, num)) / Math.pow(10, num);
}

function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检测常见的移动设备标识
  const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
  const isH5 = mobileRegex.test(userAgent) ||
    ((/iPad|Android|Touch|Silk/i.test(userAgent)) && !/Windows Phone/i.test(userAgent));
  if (isH5) {
    document.body.classList.toggle('isH5', isMobile);
    document.querySelector('html').style.minWidth = 'unset';
    document.querySelector('body').style.minWidth = 'unset';
    document.querySelector('.common-header').style.display = 'none';
    document.querySelector('.footer-box').style.display = 'none';
    document.querySelector('.page-content').style.paddingTop = '0px';
  }
}
function isH5Check() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检测常见的移动设备标识
  const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
  const isH5 = mobileRegex.test(userAgent) ||
    ((/iPad|Android|Touch|Silk/i.test(userAgent)) && !/Windows Phone/i.test(userAgent));
  return isH5;
}
export { getRate, newFixRate, cutOut, isMobile, isH5Check };
