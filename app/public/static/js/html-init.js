// 改，2022.09.17，新增
// 改，2022.09.18
// rgba(36, 160, 245, 1) -> rgba(34,106,253,1)
// rgba(237,244,248, 1) -> rgba(255,255,255,1)
// rgba(235, 77, 92, 1) -> rgba(255, 37, 0, 1)
// rgba(19, 184, 135, 1) -> rgba(0, 204, 153, 1)

const _colorsMap = {
  "a-1-bg": "rgba(130,142,161,1)",
  "a-1-bd": "rgba(130,142,161,1)",
  "a-1-cl": "rgba(130,142,161,1)",
  "a-2-bg": "rgba(63,77,102,1)",

  // "a-2-bd": "rgba(63,77,102,1)",
  "a-2-bd": "rgba(34,106,253,1)",

  "a-2-cl": "rgba(63,77,102,1)",
  "a-3-bg": "rgba(41,52,72,1)",

  // "a-3-bd": "rgba(41,52,72,1)",
  "a-3-bd": "rgba(255,255,255,0.08)",

  "a-3-cl": "rgba(41,52,72,1)",
  "a-4-bg": "rgba(51,51,51,1)",
  "a-4-bd": "rgba(38,48,67,1)",
  "a-4-cl": "rgba(38,48,67,1)",

  // "a-5-bg": "rgba(29,38,53,1)",
  "a-5-bg": "rgba(35,34,34,1)",

  "a-5-bd": "rgba(29,38,53,1)",
  "a-5-cl": "rgba(29,38,53,1)",

  // "a-6-bg": "rgba(26,31,42,1)",
  // "a-6-bg": "rgba(20,20,22,1)",
  "a-6-bg": "rgba(0,0,0,1)",

  "a-6-bd": "rgba(26,31,42,1)",
  "a-6-cl": "rgba(26,31,42,1)",

  // "a-7-bg": "rgba(26,31,42,1)",
  "a-7-bg": "rgba(20,20,22,1)",

  "a-7-bd": "rgba(26,31,42,1)",
  "a-7-cl": "rgba(26,31,42,1)",

  // "a-8-bg": "rgba(23,26,33,1)",
  // "a-8-bg": "rgba(0,0,0,1)",
  "a-8-bg": "rgba(20,20,22,1)",

  "a-8-bd": "rgba(23,26,33,1)",
  "a-8-cl": "rgba(23,26,33,1)",
  "a-9-bg": "rgba(0,0,0,0.5)",
  "a-9-bd": "rgba(0,0,0,0.5)",
  "a-9-cl": "rgba(0,0,0,0.5)",
  "a-10-bg": "rgba(130,142,161,0.3)",
  "a-10-bd": "rgba(130,142,161,0.3)",
  "a-10-cl": "rgba(130,142,161,0.3)",
  "a-11-bg": "rgba(130,142,161,0.15)",
  "a-11-bd": "rgba(130,142,161,0.15)",
  "a-11-cl": "rgba(130,142,161,0.15)",
  "a-12-bg": "rgba(34,106,253,1)",

  // "a-12-bd": "rgba(34,106,253,1)",
  "a-12-bd": "rgba(34,106,253,1)",

  "a-12-cl": "rgba(34,106,253,1)",
  "a-13-bg": "rgba(36,160,245,0.5)",
  "a-13-bd": "rgba(36,160,245,0.5)",
  "a-13-cl": "rgba(36,160,245,0.5)",
  "a-14-bg": "rgba(36,160,245,0.3)",
  "a-14-bd": "rgba(36,160,245,0.3)",
  "a-14-cl": "rgba(36,160,245,0.3)",
  "a-15-bg": "rgba(36,160,245,0.20)",
  "a-15-bd": "rgba(36,160,245,0.20)",
  "a-15-cl": "rgba(36,160,245,0.20)",
  "a-16-bg": "rgba(36,160,245,0.15)",
  "a-16-bd": "rgba(36,160,245,0.15)",
  "a-16-cl": "rgba(36,160,245,0.15)",
  "a-17-bg": "rgba(36,160,245,0.05)",
  "a-17-bd": "rgba(36,160,245,0.05)",
  "a-17-cl": "rgba(36,160,245,0.05)",
  "a-18-bg": "rgba(0,204,153,1)",
  "a-18-bd": "rgba(0,204,153,1)",
  "a-18-cl": "rgba(0,204,153,1)",
  "a-19-bg": "rgba(255,37,0,1)",
  "a-19-bd": "rgba(255,37,0,1)",
  "a-19-cl": "rgba(255,37,0,1)",
  "a-20-bg": "rgba(250,173,20,1)",
  "a-20-bd": "rgba(250,173,20,1)",
  "a-20-cl": "rgba(250,173,20,1)",

  // "a-21-bg": "rgba(29,38,53,0.99)",
  // "a-21-bg": "rgba(20,20,22,1)",
  "a-21-bg": "rgba(0,0,0,1)",

  "a-21-bd": "rgba(29,38,53,0.99)",
  "a-21-cl": "rgba(29,38,53,0.99)",
  "a-22-bg": "rgba(255,255,255,0.2)",
  "a-22-bd": "rgba(255,255,255,0.2)",
  "a-22-cl": "rgba(255,255,255,0.2)",
  "b-1-bg": "rgba(255,255,255,1)",
  "b-1-bd": "rgba(255,255,255,1)",
  "b-1-cl": "rgba(255,255,255,1)",
  "b-2-bg": "rgba(130,142,161,1)",
  "b-2-bd": "rgba(130,142,161,1)",

  // "b-2-cl": "rgba(130,142,161,1)",
  "b-2-cl": "rgba(146,146,146,1)",

  "b-3-bg": "rgba(90,102,121,1)",
  "b-3-bd": "rgba(90,102,121,1)",
  "b-3-cl": "rgba(90,102,121,1)",
  "b-4-bg": "rgba(34,106,253,1)",
  "b-4-bd": "rgba(34,106,253,1)",

  // "b-4-cl": "rgba(34,106,253,1)",
  "b-4-cl": "rgba(34,106,253,1)",

  "b-5-bg": "rgba(0,204,153,1)",
  "b-5-bd": "rgba(0,204,153,1)",
  "b-5-cl": "rgba(0,204,153,1)",
  "b-6-bg": "rgba(255,37,0,1)",
  "b-6-bd": "rgba(255,37,0,1)",
  "b-6-cl": "rgba(255,37,0,1)",
  "b-7-bg": "rgba(250,173,20,1)",
  "b-7-bd": "rgba(250,173,20,1)",
  "b-7-cl": "rgba(250,173,20,1)",
  "b-8-bg": "rgba(255,255,255,1)",
  "b-8-bd": "rgba(255,255,255,1)",
  "b-8-cl": "rgba(255,255,255,1)",
  "b-9-bg": "rgba(255,255,255,0.6)",
  "b-9-bd": "rgba(255,255,255,0.6)",
  "b-9-cl": "rgba(255,255,255,0.6)",
  "c-1-bg": "rgba(50,66,91,1)",
  "c-1-bd": "rgba(50,66,91,1)",
  "c-1-cl": "rgba(50,66,91,1)",

  // "c-2-bg": "rgba(14,26,46,1)",
  "c-2-bg": "rgba(0,0,0,1)",

  "c-2-bd": "rgba(14,26,46,1)",
  "c-2-cl": "rgba(14,26,46,1)",
  "c-3-bg": "rgba(26,39,60,1)",
  "c-3-bd": "rgba(26,39,60,1)",
  "c-3-cl": "rgba(26,39,60,1)",

  // "c-4-bg": "rgba(26,39,60,0.5)",
  "c-4-bg": "rgba(0,0,0,1)",

  "c-4-bd": "rgba(26,39,60,0.5)",
  "c-4-cl": "rgba(26,39,60,0.5)",
  "c-5-bg": "rgba(32,47,71,1)",

  // "c-5-bd": "rgba(32,47,71,1)",
  "c-5-bd": "rgba(255, 255, 255, 0.08)",

  "c-5-cl": "rgba(32,47,71,1)",
  "c-6-bg": "rgba(0,0,0,0.5)",
  "c-6-bd": "rgba(0,0,0,0.5)",
  "c-6-cl": "rgba(0,0,0,0.5)",
  "c-7-bg": "rgba(50,66,91,0.8)",
  "c-7-bd": "rgba(50,66,91,0.8)",
  "c-7-cl": "rgba(50,66,91,0.8)",
  "c-8-bg": "rgba(34,106,253,1)",

  // "c-8-bd": "rgba(34,106,253,1)",
  "c-8-bd": "rgba(34,106,253,1)",

  "c-8-cl": "rgba(34,106,253,1)",
  "c-9-bg": "rgba(255,255,255,0.2)",
  "c-9-bd": "rgba(255,255,255,0.2)",
  "c-9-cl": "rgba(255,255,255,0.2)",
  "c-10-bg": "rgba(255,255,255,0.1)",
  "c-10-bd": "rgba(255,255,255,0.1)",
  "c-10-cl": "rgba(255,255,255,0.1)",
  "f-1-bg": "rgba(255,255,255,1)",
  "f-1-bd": "rgba(255,255,255,1)",
  "f-1-cl": "rgba(255,255,255,1)",
  "f-2-bg": "rgba(130,142,161,1)",
  "f-2-bd": "rgba(130,142,161,1)",

  // "f-2-cl": "rgba(130,142,161,1)",
  "f-2-cl": "rgba(146,146,146,1)",

  "f-3-bg": "rgba(90,102,121,1)",
  "f-3-bd": "rgba(90,102,121,1)",
  "f-3-cl": "rgba(90,102,121,1)",
  "f-4-bg": "rgba(34,106,253,1)",
  "f-4-bd": "rgba(34,106,253,1)",
  "f-4-cl": "rgba(34,106,253,1)",
  "f-5-bg": "rgba(0,204,153,1)",
  "f-5-bd": "rgba(0,204,153,1)",
  "f-5-cl": "rgba(0,204,153,1)",
  "f-6-bg": "rgba(255,37,0,1)",
  "f-6-bd": "rgba(255,37,0,1)",
  "f-6-cl": "rgba(255,37,0,1)",
  "f-7-bg": "rgba(250,173,20,1)",
  "f-7-bd": "rgba(250,173,20,1)",
  "f-7-cl": "rgba(250,173,20,1)",
  "f-8-bg": "rgba(255,255,255,1)",
  "f-8-bd": "rgba(255,255,255,1)",
  "f-8-cl": "rgba(255,255,255,1)",
  "f-9-bg": "rgba(255,255,255,0.6)",
  "f-9-bd": "rgba(255,255,255,0.6)",
  "f-9-cl": "rgba(255,255,255,0.6)",

  // "h-1-bg": "rgba(29,38,53,1)",
  "h-1-bg": "rgba(0,0,0,1)",

  "h-1-bd": "rgba(29,38,53,1)",
  "h-1-cl": "rgba(29,38,53,1)",

  // "h-2-bg": "rgba(29,38,53,1)",
  "h-2-bg": "rgba(0,0,0,1)",

  "h-2-bd": "rgba(29,38,53,1)",
  "h-2-cl": "rgba(29,38,53,1)",
  "h-3-bg": "rgba(41,52,72,1)",

  // "h-3-bd": "rgba(41,52,72,1)",
  "h-3-bd": "rgba(0,0,0,1)",

  "h-3-cl": "rgba(41,52,72,1)",
  "h-4-bg": "rgba(38,48,67,1)",
  "h-4-bd": "rgba(38,48,67,1)",
  "h-4-cl": "rgba(38,48,67,1)",
  "h-5-bg": "rgba(36,160,245,0.2)",
  "h-5-bd": "rgba(36,160,245,0.2)",
  "h-5-cl": "rgba(36,160,245,0.2)",
  "x-1-bg": "rgba(255,255,255,1)",
  "x-1-bd": "rgba(255,255,255,1)",
  "x-1-cl": "rgba(255,255,255,1)",
  "x-2-bg": "rgba(130,142,161,1)",
  "x-2-bd": "rgba(130,142,161,1)",

  // "x-2-cl": "rgba(130,142,161,1)",
  "x-2-cl": "rgba(255,255,255,1)",

  "x-3-bg": "rgba(34,106,253,1)",
  "x-3-bd": "rgba(34,106,253,1)",

  // "x-3-cl": "rgba(34,106,253,1)",
  "x-3-cl": "rgba(34,106,253,1)",

  "y-1-bg": "rgba(29,38,53,1)",
  "y-1-bd": "rgba(29,38,53,1)",
  "y-1-cl": "rgba(29,38,53,1)",
  "y-2-bg": "rgba(41,52,72,1)",
  "y-2-bd": "rgba(41,52,72,1)",
  "y-2-cl": "rgba(41,52,72,1)",
  "y-3-bg": "rgba(11,20,35,1)",
  "y-3-bd": "rgba(11,20,35,1)",
  "y-3-cl": "rgba(11,20,35,1)",
  "y-4-bg": "rgba(26,39,60,1)",
  "y-4-bd": "rgba(26,39,60,1)",
  "y-4-cl": "rgba(26,39,60,1)",
  "y-5-bg": "rgba(34,106,253,1)",
  "y-5-bd": "rgba(34,106,253,1)",
  "y-5-cl": "rgba(34,106,253,1)",
  "z-1-bg": "rgba(255,255,255,1)",
  "z-1-bd": "rgba(255,255,255,1)",
  "z-1-cl": "rgba(255,255,255,1)",
  "z-2-bg": "rgba(90,102,121,1)",
  "z-2-bd": "rgba(90,102,121,1)",
  "z-2-cl": "rgba(90,102,121,1)",
  "u-1-bg": "rgba(0,204,153,1)",
  "u-1-bd": "rgba(0,204,153,1)",
  "u-1-cl": "rgba(0,204,153,1)",
  "u-2-bg": "rgba(19,184,135,0.3)",
  "u-2-bd": "rgba(19,184,135,0.3)",
  "u-2-cl": "rgba(19,184,135,0.3)",
  "u-3-bg": "rgba(19,184,135,0.15)",
  "u-3-bd": "rgba(19,184,135,0.15)",
  "u-3-cl": "rgba(19,184,135,0.15)",
  "u-4-bg": "rgba(255,37,0,1)",
  "u-4-bd": "rgba(255,37,0,1)",
  "u-4-cl": "rgba(255,37,0,1)",
  "u-5-bg": "rgba(235,77,92,0.3)",
  "u-5-bd": "rgba(235,77,92,0.3)",
  "u-5-cl": "rgba(235,77,92,0.3)",
  "u-6-bg": "rgba(235,77,92,0.15)",
  "u-6-bd": "rgba(235,77,92,0.15)",
  "u-6-cl": "rgba(235,77,92,0.15)",
  "u-7-bg": "rgba(0,0,0,0.5)",
  "u-7-bd": "rgba(0,0,0,0.5)",
  "u-7-cl": "rgba(0,0,0,0.5)",

  // "u-8-bg": "rgba(34,106,253,1)",
  "u-8-bg": "rgba(34,106,253,1)",

  "u-8-bd": "rgba(34,106,253,1)",

  // "u-8-cl": "rgba(34,106,253,1)",
  "u-8-cl": "rgba(34,106,253,1)",

  "u-9-bg": "rgba(36,160,245,0.3)",
  "u-9-bd": "rgba(36,160,245,0.3)",
  "u-9-cl": "rgba(36,160,245,0.3)",
  "u-10-bg": "rgba(36,160,245,0.15)",
  "u-10-bd": "rgba(36,160,245,0.15)",
  "u-10-cl": "rgba(36,160,245,0.15)",
  "u-11-bg": "rgba(130,142,161,1)",
  "u-11-bd": "rgba(130,142,161,1)",

  // "u-11-cl": "rgba(130,142,161,1)",
  "u-11-cl": "rgba(255,255,255,1)",

  "u-12-bg": "rgba(255, 255, 255, 0.25)",
  "u-12-bd": "rgba(130,142,161,0.3)",
  "u-12-cl": "rgba(130,142,161,0.3)",
  "u-13-bg": "rgba(130,142,161,0.15)",
  "u-13-bd": "rgba(130,142,161,0.15)",
  "u-13-cl": "rgba(130,142,161,0.15)",
  "u-14-bg": "rgba(255,255,255,0.15)",
  "u-14-bd": "rgba(255,255,255,0.15)",
  "u-14-cl": "rgba(255,255,255,0.15)",
  "u-15-bg": "rgba(0,0,0,0.15)",
  "u-15-bd": "rgba(0,0,0,0.15)",
  "u-15-cl": "rgba(0,0,0,0.15)",
  "u-16-bg": "rgba(255,255,255,1)",
  "u-16-bd": "rgba(255,255,255,1)",
  "u-16-cl": "rgba(255,255,255,1)",
};

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength >>= 0; // floor if number or convert non-number to 0;
    padString = String(typeof padString !== "undefined" ? padString : "");
    if (this.length > targetLength) {
      return String(this);
    }
    targetLength -= this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return String(this) + padString.slice(0, targetLength);
  };
}
window.previewSkin = null;
try {
  previewSkin = JSON.parse(window.name).skin;
} catch (e) {}
(function (window, document) {
  try {
    JSON.parse(localStorage.myStorage);
  } catch (e) {
    localStorage.clear();
    localStorage.myStorage = "{}";
  }
  function xssCheck(str, reg) {
    return str
      ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, (a, b) => {
          if (b) {
            return a;
          }
          return {
            "<": "&lt;",
            "&": "&amp;",
            '"': "&quot;",
            ">": "&gt;",
            "'": "&#39;",
          }[a];
        })
      : "";
  }

  const setCookie = function (name, value) {
    const exp = new Date();
    exp.setTime(exp.getTime() + 36500 * 24 * 60 * 60 * 1000);
    const domain = ".".concat(location.host.split(".")[1], ".").concat(location.host.split(".")[2]);

    if (location.host.split(".")[3]) {
      document.cookie = ""
        .concat(name, "=")
        .concat(escape(value), ";expires=")
        .concat(exp.toGMTString(), ";path=")
        .concat(escape("/"));
    } else if (location.host.split(".")[2]) {
      document.cookie = ""
        .concat(name, "=")
        .concat(escape(value), ";expires=")
        .concat(exp.toGMTString(), ";domain=")
        .concat(domain, ";path=")
        .concat(escape("/"));
    } else if (!location.host.split(".")[2] && !location.host.split(".")[1]) {
      // 本地环境存储
      document.cookie = ""
        .concat(name, "=")
        .concat(escape(value), ";expires=")
        .concat(exp.toGMTString(), ";path=")
        .concat(escape("/"));
    } else {
      // 当线上读取不到www时
      document.cookie = ""
        .concat(name, "=")
        .concat(escape(value), ";expires=")
        .concat(exp.toGMTString(), ";domain=.")
        .concat(location.host, ";path=")
        .concat(escape("/"));
    }
  };

  const getCookie = function (name) {
    let arrd = null;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if (document.cookie.match(reg)) {
      arrd = document.cookie.match(reg);
      return unescape(arrd[2]);
    }
    return null;
  };
  const lan = window.location.href.match(/[a-z]+_[A-Z]+/)[0];
  setCookie("lan", lan);
  // 函数：获取尺寸
  function findDimensions() {
    let winWidth = 0;
    let winHeight = 0;
    // 获取窗口宽度
    if (window.innerWidth) {
      winWidth = window.innerWidth;
    } else if (document.body && document.body.clientWidth) {
      winWidth = document.body.clientWidth;
    }

    // 获取窗口高度
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if (document.body && document.body.clientHeight) {
      winHeight = document.body.clientHeight;
    }

    // 通过深入Document内部对body进行检测，获取窗口大小
    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      winHeight = document.documentElement.clientHeight;
      winWidth = document.documentElement.clientWidth;
    }
    return {
      winHeight,
      winWidth,
    };
  }

  const locales = {
    zh_CN:
      "您当前的浏览器版本过低，可能导致网站不能正常访问！<br/><br/><br/>推荐下载最新版Google Chrome浏览器。",
    en_US:
      "Your current browser version is too low, which may result in the website not being accessed properly! <br/><br/><br/>Recommend to download the latest version of Google Chrome.\n",
    ja_JP:
      "現在のブラウザのバージョンが低すぎるため、Webサイトが正しくアクセスされていない可能性があります。 <br/><br/><br/>最新バージョンのGoogle Chromeをダウンロードすることをお勧めします。",
    ko_KR:
      "현재 브라우저 버전이 너무 낮아서 웹 사이트가 제대로 액세스되지 않을 수 있습니다! <br/><br/><br/>Chrome 최신 버전을 다운로드하는 것이 좋습니다.",
    el_GR:
      "您當前的瀏覽器版本過低，可能導致網站不能正常訪問！<br/><br/><br/>推薦下載最新版Google Chrome瀏覽器。",
    ru_RU: 
      "Текущая версия вашего браузера слишком старая и может привести к неправильной работе сайта!<br/><br/><br/>Рекомендуем скачать последнюю версию браузера Google Chrome.",
    vi_VN: 
      "Phiên bản trình duyệt của bạn hiện tại quá cũ, có thể khiến trang web không truy cập được bình thường!<br/><br/><br/>Khuyến nghị tải phiên bản mới nhất của trình duyệt Google Chrome.",
  };
  const browserTip = document.getElementById("browser-tip");
  const browserDesc = document.getElementById("browser-desc");
  const browserMp = document.getElementById("browser-mp");
  const winSize = findDimensions();
  const browser = navigator.userAgent.toLowerCase();
  // IE
  const IE_DEFAULT = 11.0;
  if (browser.match(/msie ([\d.]+)/) !== null && browserTip) {
    if (browser.indexOf("msie") > -1) {
      const isIE = parseInt(browser.match(/msie ([\d.]+)/)[1]);
      if (isIE < IE_DEFAULT) {
        browserTip.style.display = "block";
        browserMp.style.display = "block";
        var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
        browserTip.style.left = `${avWidth}px`;
        browserDesc.innerHTML = locales[lan];
      }
    }
  }
  // Chrome
  const CHROM_DEFAULT = 49;
  if (browser.indexOf("chrome") > -1 && browserTip) {
    const chrome = parseInt(browser.match(/chrome\/([\d.]+)/));
    if (chrome < CHROM_DEFAULT) {
      browserTip.style.display = "block";
      browserMp.style.display = "block";
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = `${avWidth}px`;
      browserDesc.innerHTML = locales[lan];
    }
  }
  // Firefox
  const FIREFOX_DEFAULT = 61;
  if (browser.indexOf("firefox") > -1 && browserTip) {
    const Firefox = parseInt(browser.match(/firefox\/([\d.]+)/)[1]);
    if (Firefox < FIREFOX_DEFAULT) {
      browserTip.style.display = "block";
      browserMp.style.display = "block";
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = `${avWidth}px`;
      browserDesc.innerHTML = locales[lan];
    }
  }
  // Safari
  const SAFARI_DEFAULT = 11.1;
  if (browser.indexOf("safari") > -1 && browser.indexOf("chrome") < 0 && browserTip) {
    const Safari = parseInt(browser.match(/version\/([\d.]+)/)[1]);
    if (Safari < SAFARI_DEFAULT) {
      browserTip.style.display = "block";
      browserMp.style.display = "block";
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = `${avWidth}px`;
      browserDesc.innerHTML = locales[lan];
    }
  }
  const { publicInfo } = window;
  const setLan = function setLan() {
    const body = document.querySelector("html");
    let bodyClass = body.className;
    if (className) {
      bodyClass = `${bodyClass} ${className}`;
    } else {
      bodyClass = lan;
    }
    body.className = bodyClass;
    window.htmlInitLan = true;
  };
  if (lan) {
    setLan();
  }
  let themeList = null;
  let theme = null;
  const createTheme = function createTheme(skinData) {
    const createStyle = function createStyle(theme) {
      if (!theme) {
        return;
      }
      const { colorList } = theme;
      const style = "";
      const colorsMap = {};
      // 注：若要保留多主题，需要在管理端修改颜色配置文件
      // 改，2022.09.17，注释此内容
      // for (var i = 0, len = colorList.length; i < len; i++) {
      //   var li = colorList[i];
      //   var colors = li.rgba;
      //   for (var j = 0, jlen = colors.length; j < jlen; j++) {
      //     var color = xssCheck(colors[j]);
      //     colorsMap[li.type + "-" + (j + 1) + "-bg"] = "rgba(" + color + ")";
      //     colorsMap[li.type + "-" + (j + 1) + "-bd"] = "rgba(" + color + ")";
      //     colorsMap[li.type + "-" + (j + 1) + "-cl"] = "rgba(" + color + ")";

      //     style +=
      //       "." +
      //       li.type +
      //       "-" +
      //       (j + 1) +
      //       "-" +
      //       "bg{background-color:rgba(" +
      //       color +
      //       ") !important;}";

      //     style +=
      //       "." +
      //       li.type +
      //       "-" +
      //       (j + 1) +
      //       "-" +
      //       "bd{border-color:rgba(" +
      //       color +
      //       ") !important;}";

      //     style +=
      //       "." + li.type + "-" + (j + 1) + "-" + "cl{color:rgba(" + color + ") !important;}";

      //     style +=
      //       "." +
      //       li.type +
      //       "-" +
      //       (j + 1) +
      //       "-" +
      //       "cl-h:hover{background-color:rgba(" +
      //       color +
      //       ") !important;}";

      //     style +=
      //       "." +
      //       li.type +
      //       "-" +
      //       (j + 1) +
      //       "-" +
      //       "f-h:hover{color:rgba(" +
      //       color +
      //       ") !important;}";
      //   }
      // }

      console.log(_colorsMap);

      // 原
      // if (previewSkin) {
      //   window.previewColorsMap = colorsMap;
      // } else {
      //   window.colorMap = colorsMap;
      // }

      // 改，2022.09.17，修改此内容
      if (previewSkin) {
        window.previewColorsMap = _colorsMap;
      } else {
        window.colorMap = _colorsMap;
      }
      const { imgList } = theme;
      for (const key in imgList) {
        imgList[key] = xssCheck(imgList[key]);
        const result = /^(https|http)/.test(imgList[key]);
        imgList[key] = result ? imgList[key] : theme.imgPath + imgList[key];
      }
      if (previewSkin) {
        window.previewImgMap = imgList;
      } else {
        window.imgMap = theme.imgList;
      }
      const iconUrl = xssCheck(theme.iconUrl);
      if (iconUrl) {
        const oldIconfont = document.querySelector("#iconfont");
        var head = document.querySelector("head");
        head.removeChild(oldIconfont);
        const iconfont = document.createElement("script");
        iconfont.src = iconUrl;
        head.appendChild(iconfont);
      }
      const styleEle = document.createElement("style");
      var head = document.querySelector("head");
      styleEle.innerHTML = style;
      head.appendChild(styleEle);
    };
    if (previewSkin) {
      createStyle(skinData);
      if (skinData.othersCss) {
        createCss(skinData.othersCss);
      }
    } else if (skinData) {
      themeList = skinData.listist;
      if (Object.prototype.toString.call(themeList) === "[object Array]") {
        for (let i = 0, len = themeList.length; i < len; i++) {
          if (themeList[i].skinId === defSkin) {
            theme = themeList[i];
          }
        }
        createStyle(theme);
        if (theme.othersCss) {
          createCss(theme.othersCss);
        }
      }
    }
  };
  var createCss = function createCss(url) {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = url;
    const headDom = document.getElementsByTagName("head")[0];
    headDom.appendChild(cssLink);
  };
  if (previewSkin) {
    createTheme(previewSkin);

    if (previewSkin.othersCss) {
      createCss(previewSkin.othersCss);
    }
  } else if (publicInfo) {
    const skin = publicInfo.skin || {};
    var className = lan;
    var defSkin = skin.default || "1";
    const cusSkin = getCookie("cusSkin");
    if (cusSkin) {
      defSkin = cusSkin;
    }
    createTheme(skin);
  }
})(window, document);
