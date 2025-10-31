const os = function os() {
  const ua = navigator.userAgent;
  // const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  console.log("userAgent", ua);
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian;
  console.log("isWindowsPhone", isWindowsPhone);
  console.log("isSymbian", isSymbian);
  console.log("isFireFox", isFireFox);
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
  };
};

const browser = os();

export default browser;
