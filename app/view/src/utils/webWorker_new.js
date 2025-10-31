// 改，2022.10.24，新增，本文件用在/@/components/BlockChain-ui-privatization/PC/common-mixin/market/index/index.js中，用于区分两个worker
import webworkerMap from "@/assets/js/webworker-map";

let workers_new = null;

webworkerMap.baseUrl = process.env.BASE_URL;

function worker_new() {
  if (!workers_new) {
    workers_new = new Worker(
      `/static/web-worker/${webworkerMap.websocket}?fileMap=${JSON.stringify(webworkerMap)}`,
    );
  }
  return workers_new;
}

export default worker_new;
