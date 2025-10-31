import { imgMap } from "@/utils";

export default {
  name: "c-banner",
  data() {
    return {
      spark: imgMap.spark,
      spark_d: imgMap.spark_d,
      poster: imgMap.banner_poster,
      banner: imgMap.home_banner,
      popularList: [],
      sparkbit: imgMap.qrcode_sparkbit,
    };
  },
  computed: {
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  methods: {
    init() {
    },
    // 路由跳转
    btnLink(link) {
      if (link.indexOf("http") > -1) {
        window.location.href = link;
      } else {
        this.$router.push(link);
      }
    },
  },
};
