function cut(arg1, arg2) {
  let r1;
  let r2;
  let m = 0;
  let n = 0;
  try {
    r1 = arg1.toString()
      .split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString()
      .split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = 10 ** Math.max(r1, r2);
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function convertToLocaleTimeStamp(eastEightTimeString) {
  // 创建一个日期对象，传入东八区时间字符串
  const eastEightDate = new Date(eastEightTimeString);

  // 获取本地时区与 UTC 时间的分钟差值
  const offsetMinutes = new Date().getTimezoneOffset();

  // 计算东八区时间与本地时间的时间差值（毫秒数）
  const offsetMilliseconds = (offsetMinutes + 8 * 60) * 60 * 1000;

  // 根据时间差值调整时间
  const localeTimeStamp = eastEightDate.getTime() - offsetMilliseconds;
  return localeTimeStamp;
}

export {
  cut,
  convertToLocaleTimeStamp,
};
