export default {
  data() {
    return {
      hideInfo: false,
      curCoin: 'USDT', // 当前稳定币
    };
  },
  computed: {
    // 改，2022.12.07 新增跳转路劲获取
    linkUrl() {
      if (process.env.NODE_ENV === "development") {
        return "http://localhost:8080/ex";
      }
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.exUrl;
      }
      return {};
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
  },
  methods: {
    linkTo() {
      const link = this.linkUrl ? `${this.linkUrl}/${this.lan}/trade` : "";
      window.location.href = link;
    },
    gotoDeposit() {
      this.$router.push("/assets/recharge?symbol=USDT");
    },
    gotoWithdraw() {
      // 改，2022.11.16 少了 "/"
      this.$router.push("/assets/withdraw?symbol=USDT");
    },
  },
};
