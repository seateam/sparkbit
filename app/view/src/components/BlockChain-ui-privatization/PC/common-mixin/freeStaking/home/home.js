import { colorMap, imgMap, myStorage } from "@/utils";

export default {
  data() {
    return {
      currentType: "all",
      currentStatus: 9,
      projectList: [],
      homeData: null,
      imgMap,
      colorMap,
      iconStyle: {
        0: "#icon-a_20",
        1: "#icon-a_21",
        2: "#icon-a_21",
        3: "#icon-a_21",
        4: "#icon-a_19",
        5: "#icon-a_19",
        6: "#icon-a_21",
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    filterProjectData() {
      return this.projectList.filter((item) => {
        const type = Boolean(
          this.currentType === "all" || item.configTypes.indexOf(this.currentType) > -1
        );
        const status = this.currentStatus === 9 || this.currentStatus === item.activeStatus;

        return type && status;
      });
    },
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    // 页面标题title
    documentTitle() {
      const lang = getCookie("lan");
      let str = "";
      if (this.publicInfo) {
        const { indexHeaderTitle, seo } = this.publicInfo;
        let title = "";
        if (indexHeaderTitle) {
          if (lang) {
            title = seo.title || indexHeaderTitle[lang];
          } else {
            const lan = this.publicInfo.lan.defLan;
            title = seo.title || indexHeaderTitle[lan];
          }
        }
        // 这里可以根据market页面的需求自定义标题格式
        str = `${title}-${this.$t("freeStaking.home.staking")}`;
      }
      document.title = str;
      return str;
    },
    statusTab() {
      // return [
      //   { name: this.$t("innov.whole"), index: 9 }, // 全部
      //   { name: this.$t("freeStaking.home.status[0]"), index: 0 }, // 待开始
      //   { name: this.$t("innov.status2"), index: 1 }, // 进行中
      //   // { name: this.$t('freeStaking.home.status[1]'), index: 2 }, // 募集中
      //   { name: this.$t("freeStaking.home.status[2]"), index: 3 }, // 待计息
      //   { name: this.$t("freeStaking.home.status[3]"), index: 4 }, // 计息中
      //   { name: this.$t("freeStaking.home.status[6]"), index: 5 }, // 已满额
      //   { name: this.$t("freeStaking.home.status[4]"), index: 6 }, // 计息结束
      //   { name: this.$t("freeStaking.home.status[5]"), index: 7 }, // 本金释放
      //   { name: this.$t("freeStaking.home.status[7]"), index: 8 }, // 已结束
      // ];
      // return [
      //   { name: this.$t('innov.whole'), index: 0 }, // 全部
      //   { name: this.$t('freeStaking.home.status[0]'), index: 1 }, // 待开始
      //   { name: this.$t('freeStaking.home.status[1]'), index: 2 }, // 募集中
      //   { name: this.$t('freeStaking.home.status[2]'), index: 3 }, // 待计息
      //   { name: this.$t('freeStaking.home.status[3]'), index: 4 }, // 计息中
      //   { name: this.$t('freeStaking.home.status[4]'), index: 5 }, // 计息结束
      // ];
      return [
        { name: this.$t("innov.whole"), index: 9 }, // 全部
        { name: this.$t("freeStaking.home.status[0]"), index: 0 }, // 待开始
        { name: this.$t("innov.status2"), index: 1 }, // 进行中
        { name: this.$t("freeStaking.home.status[7]"), index: 8 }, // 已结束
      ];
    },
    navTab() {
      if (!this.homeData) return [];

      const navTabList = this.homeData.typeConfig.map((item) => ({
        name: item.typeName,
        index: item.typeSn,
      }));

      return [{ name: this.$t("innov.whole"), index: "all" }].concat(navTabList);
    },
  },
  watch: {
    documentTitle(val) {
      document.title = val;
    },
  },
  methods: {
    init() {
      this.getHomeData();
      this.getProjectList();
    },
    countStatusIsOn(item) {
      const lock = item.status === 1 && item.projectType === 3;
      const unLock = item.status === 2 && item.projectType !== 3;

      return lock || unLock ? "f-4-cl" : "f-2-cl";
    },
    countStatusText(item) {
      return item.projectType === 3
        ? this.statusText(item.status)
        : this.unLockStatusText(item.status);
    },
    statusText(status) {
      const text = {
        0: this.$t("freeStaking.home.status[0]"),
        1: this.$t("freeStaking.home.status[1]"),
        2: this.$t("freeStaking.home.status[2]"),
        3: this.$t("freeStaking.home.status[3]"),
        4: this.$t("freeStaking.home.status[4]"),
        5: this.$t("freeStaking.home.status[5]"),
        6: this.$t("freeStaking.home.status[6]"),
      };
      return text[status];
    },
    unLockStatusText(status) {
      const text = {
        1: this.$t("freeStaking.home.status[0]"),
        2: this.$t("innov.status2"),
        3: this.$t("freeStaking.home.status[7]"),
      };
      return text[status];
    },
    projectLabel(type) {
      const label = {
        0: "",
        1: "HOT",
        2: "NEW",
      };
      return label[type];
    },
    navToPosHistory() {
      this.$router.push("/myPos");
    },
    navToFaq() {
      this.$router.push("/faqInfo");
    },
    getHomeData() {
      this.axios({
        url: this.$store.state.url.freeStaking.index,
        headers: {},
        params: {},
        method: "post",
      }).then((data) => {
        if (data.code === "0") {
          const homeData = data.data;
          homeData.detail = homeData.detail.replace(/\n/g, "<br/>");
          this.homeData = homeData;
        }
      });
    },
    getProjectList() {
      this.axios({
        url: this.$store.state.url.freeStaking.project_list,
        headers: {},
        params: {},
        method: "post",
      }).then((data) => {
        if (data.code === "0") {
          this.projectList = data.data;
        }
      });
    },
    selectType(item) {
      this.currentType = item.index;
    },
    changeCurrentStatus(item) {
      this.currentStatus = item.index;
    },
    currentStyle(item) {
      return item.index === this.currentStatus ? ["f-1-cl", "c-5-bg"] : ["f-2-cl"];
    },
    takeActivityDetail(item) {
      myStorage.set("takeActivityDetail", item);
      this.$router.push(`/freeStaking/${item.id}`);
    },
    navToConfigUrl(url) {
      window.location.href = url;
    },
    showLabel(item, status) {
      return item.labelType === status;
    },
  },
};
