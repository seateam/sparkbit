const getDefaultLocale = require("../utils/getDefaultLocale");

module.exports = {
  schedule: {
    interval: "600s", // 1 分钟间隔
    immediate: true,
    type: "all", // 指定所有的 worker 都需要执行
    env: "prod",
  },
  async task(ctx) {
    // 改，2022.08.10，注释此内容
    // 取消更改，2022.09.17
    // getDefaultLocale(this.schedule, ctx.app.config.localesPath, ctx.logger);
  },
};
