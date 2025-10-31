import { formatTime } from '@/utils';

export default {
  name: 'noticeInfo',
  components: {
  },
  data() {
    return {
      contentId: this.$route.params.id,
      sideList: [],
      notieContent: {},
      sidetion: {
        count: '',
        page: 1,
        pageSize: 10,
      },
      routes: [],
    };
  },
  watch: {
    $route(val) {
      this.contentId = val.params.id;
      this.getfile();
    },
  },
  methods: {
    init() {
      this.getData();
      this.contentId = this.$route.params.id;
      this.setRoute();
    },
    goPage(fileName) {
      this.$router.push(`${fileName}`);
    },
    getData() {
      this.axios({
        url: this.$store.state.url.common.footer,
        headers: {},
        params: {},
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          console.log("data.data", data.data);
          this.sideList = data.data;
          if (this.$route.params.id) {
            this.contentId = this.$route.params.id;
          } else {
            this.contentId = data.data[0].fileName;
            this.$router.push(`/cms/${data.data[0].fileName}`);
          }
          this.getfile();
        }
      });
    },
    getfile() {
      if (!['privacy', 'agreement', 'disclaimer'].includes(this.contentId)) {
        this.axios({
          url: this.$store.state.url.common.cmsInfo,
          headers: {},
          params: {
            fileName: this.contentId,
          },
          method: 'post',
        }).then((data) => {
          if (data.code === '0') {
            this.notieContent = data.data;
            this.notieContent.ctime = formatTime(data.data.ctimeLong);
          }
        });
      }
    },
    setRoute() {
      if (['privacy', 'agreement', 'disclaimer'].includes(this.contentId)) {
        let nowTxt = this.$t("home.footer.privacy");
        if (this.contentId === 'agreement') nowTxt = this.$t("home.footer.agreement");
        if (this.contentId === 'disclaimer') nowTxt = this.$t("replenish.footer.LegalNotice");
        this.routes = [
          {
            name: this.$t('home.home'),
            path: '/',
          },
          {
            name: nowTxt,
          },
        ];
      }
    },
  },
};
