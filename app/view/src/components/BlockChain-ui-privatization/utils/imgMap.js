export default function (defMap, baseUrl = '') {
  const defaultMap = defMap;
  // 2023.02.27 修改imgMap的赋值，不清楚window预设的图片列表，但是影响了正常使用图片资源
  // const imgMap = window.previewImgMap || window.imgMap;
  const imgMap = null;
  const url = baseUrl === '/' ? '' : baseUrl;

  if (!imgMap) {
    Object.keys(defaultMap).forEach((key) => {
      if (!/^(http|https)/.test(defaultMap[key])) {
        defaultMap[key] = url + defaultMap[key];
      }
    });
  }

  const imgs = imgMap || defaultMap;
  // return defaultMap;
  return imgs;
}
