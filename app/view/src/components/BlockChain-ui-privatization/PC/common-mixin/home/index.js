import { templateConfig, imgMap } from "@/utils";

export default {
  data() {
    return {
      userName: "", // 用户名称
      PAIRS: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "POLUSDT", "TRXUSDT", "USDCUSDT"],
      stateInfo: {},
      coinWs: null,
      coinReady: false,
      coinHtml: "",
      logoInfo: [],
      video1: imgMap.spark_bit_animation_safe,
      sparkbit: imgMap.qrcode_sparkbit,
      icons: {
        bnb: imgMap.bnb_logo,
        sol: imgMap.sol_logo,
        usdc: imgMap.usdc_logo,
        pol: imgMap.pol_logo,
        btc: imgMap.btc_logo,
        eth: imgMap.eth_logo,
        trx: imgMap.trx_logo,
      },
    };
  },
  computed: {
    index_international_open() {
      // 0: 'china',
      // 1: 'international',
      // 2: 'biki',
      // 3: 'momo',
      // 4: 'japanese',
      // 5: 'korea',
      // 6: 'europe',
      // 7: 'bidesk',
      // 8: 'bitWind',
      let templates = this.$store.state.baseData.index_international_open;
      if (templates === 7) {
        templates = 1;
      }
      return templateConfig[templates];
    },
    swiperFlag() {
      return this.$store.state.baseData.swiperFlag;
    },
  },
  beforeDestroy() {
    if (this.coinReady) { this.coinWs.close(); }
    this.coinWs = null;
  },
  methods: {
    init() {
      try {
        this.coinWs = null;
        const streams = this.PAIRS.map(s => `${s.toLowerCase()}@miniTicker`).join('/');
        this.coinWs = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        this.coinWs.onopen = (() => {
          this.coinReady = true;
        });
        // 接收数据
        this.coinWs.onmessage = ((ev) => {
          if (ev.data) {
            const d = JSON.parse(ev.data);
            if (d && d.data && d.data.s) {
              const { s, c, o } = d.data; // symbol, close, open
              this.stateInfo[s] = { c: Number(c), o: Number(o) };
              this.render();
            }
          }
        });
        // 一旦发现错误就关闭
        this.coinWs.onerror = (() => {
          this.coinWs.close();
          this.coinReady = false;
        });
      } catch (error) {
        console.log(error, 'error');
      }
    },
    pct(o) {
      const p = ((o.c - o.o) / o.o) * 100;
      // eslint-disable-next-line no-nested-ternary
      const c = p > 0 ? "#5ceea0" : p < 0 ? "#ff5f5f" : "white";
      const sign = p > 0 ? "+" : "";
      return `<span style="color:${c};">${sign}${p.toFixed(2)}%</span>`;
    },
    render() {
      const entries = Object.entries(this.stateInfo).sort((a, b) => this.PAIRS.indexOf(a[0]) - this.PAIRS.indexOf(b[0]));
      this.coinHtml = entries.map(([sym, o]) => `
        <div class="p-item">
          <div class="p-coin">${sym.replace('USDT', '/USDT')}</div>
          <div>
            <div class="p-price">$${Number(o.c).toLocaleString()}</div>
            <span class="td-rose">${this.pct(o)}</span>
          </div>
        </div>
      `).join("");
      this.logoInfo = entries;
    },
    btnLink(link) {
      if (link.indexOf("http") > -1) {
        window.location.href = link;
      } else {
        this.$router.push(link);
      }
    },
  },
};
