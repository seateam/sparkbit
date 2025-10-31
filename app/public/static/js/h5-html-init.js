// 改，2022.09.17，新增
// 改，2022.10.12
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
  "a-4-bg": "rgba(38,48,67,1)",
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
  "a-7-bg": "rgba(0,0,0,1)",

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

  "u-12-bg": "rgba(130,142,161,0.3)",
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

window.previewSkin = null;
try {
  previewSkin = JSON.parse(window.name).skin;
} catch (e) {}
(function (window, document) {
  if (window.location.href.indexOf("isapp=1") !== -1) {
    window.isApp = true;
  } else {
    window.isApp = false;
  }
  try {
    JSON.parse(localStorage.myStorage);
  } catch (e) {
    localStorage.clear();
    localStorage.myStorage = "{}";
  }
  const localTime = Number(localStorage.localTime);
  if (
    !localTime
    || (localTime !== new Date(window.updateDate).getTime() && window.evn !== "development")
  ) {
    localStorage.clear();
    localStorage.myStorage = "{}";
    localStorage.localTime = new Date(window.updateDate).getTime();
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
  const getCookie = function (name) {
    let arrd = null;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if (document.cookie.match(reg)) {
      arrd = document.cookie.match(reg);
      return unescape(arrd[2]);
    }
    return null;
  };
  let defLan = "";
  if (window.publicInfo) {
    defLan = window.publicInfo.lan.defLan;
  }
  const lan = getCookie("lan") || defLan || "zh_CN";
  var className = window.location.href.match(/[a-z]+_[A-Z]+/)[0];
  // 函数：获取尺寸

  const { publicInfo } = window;
  const setLan = function setLan() {
    const body = document.querySelector("body");
    let bodyClass = body.className;
    if (className) {
      bodyClass = `${bodyClass} ${className}`;
    }
    body.className = bodyClass;
    window.htmlInitLan = true;
  };
  if (lan) {
    setLan();
  }
  const myStorage = JSON.parse(localStorage.myStorage);
  let themeList = null;
  let theme = null;
  const createTheme = function createTheme(skinData) {
    const createStyle = function createStyle(theme) {
      const { colorList } = theme;
      const style = "";
      const colorsMap = {};
      // 注：若要保留多主题，需要在管理端修改颜色配置文件
      // 改，2022.10.12，注释此内容
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
      //   myStorage.colorMap = colorsMap;
      // }

      // 改，2022.10.12，修改此内容
      if (previewSkin) {
        window.previewColorsMap = _colorsMap;
      } else {
        window.colorMap = _colorsMap;
        myStorage.colorMap = _colorsMap;
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
        myStorage.imgMap = theme.imgList;
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
      if (localStorage.setItem) {
        localStorage.setItem("myStorage", JSON.stringify(myStorage));
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
}(window, document));
