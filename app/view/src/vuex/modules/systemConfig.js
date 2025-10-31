export default {
  state: {
    companyName: "SparkBit", // 公司名称 company_name
    showOtc: false, // 是否显示法币交易模块
    opUrl: "https://options.sparkbit.io", // 期权交易地址
    opWsUrl: "wss://wsop.sparkbit.io/ws", // 期权交易地址
    exchangeUrl: "https://exchange.sparkbit.io", // 充值提现交易
    stopOrderUrl: "https://stoporderapi.sparkbit.io", // 条件单
    openapiUrl: "https://openapi.sparkbit.io", // openapi
    serverEmail: "service@sparkbit.io", // 服务邮箱
    contactEmail: "contact@sparkbit.io", // 服务邮箱
    apiDocument: "https://sparkbitdocs.gitbook.io/sparkbit-official-api-docs/#getting-started", // api文档
  },
};
