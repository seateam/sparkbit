import { myStorage, formatTime } from '@/utils';
import { imgMap } from '@/utils';

export default {
  name: 'faqInfo',
  data() {
    return {
      imgMap,
      contentId: null,
      sideList: [],
      faqContent: {},
      isshowLoading: true,
      pagination: {
        // 翻页数据
        count: 0, // 总数量
        pageSize: 9, // 每页显示条数
        page: 1, // 当前页数
      },
      faqSearchVal: '',
      cacheData: {
        sideList: [],
        pagination: [],
      },
      timer: null,
      searchLoaded: false,
      openSearch: false,
      faqList: [],
      routes: [],
    };
  },
  watch: {
    $route(val) {
      if (!val.params.Id) {
        this.contentId = null;
      }
    },
  },
  methods: {
    formatTime,
    init() {
      if (this.$route.params.Id) {
        this.contentId = parseFloat(this.$route.params.Id);
      }
      // 静态数据
      this.faqList = [{
        id: 1,
        title: this.$t('faq.qus')[0],
        content: this.$t('faq.ans')[0],
      }, {
        id: 2,
        title: this.$t('faq.qus')[1],
        content: this.$t('faq.ans')[1],
      }, {
        id: 3,
        title: this.$t('faq.qus')[2],
        content: this.$t('faq.ans')[2],
      }, {
        id: 4,
        title: this.$t('faq.qus')[3],
        content: this.$t('faq.ans')[3],
      }];
      // 获取列表书数据
      this.getListData();
      // 获取 内容
      this.getContentData();
    },
    clearSearchVal() {
      this.faqSearchVal = '';
      this.setCacheToData();
    },
    setDataToCache() {
      const { sideList, pagination } = this;
      this.cacheData = {
        cache: true,
        sideList,
        pagination,
      };

      this.sideList = [];
      this.pagination = {
        count: 0,
        pageSize: 10,
        page: 1,
      };
    },
    setCacheToData() {
      const { sideList, pagination } = this.cacheData;
      this.sideList = sideList;
      this.pagination = pagination;
      this.cacheData = {
        sideList: [],
        pagination: [],
        cache: false,
      };
    },
    postValToSearch() {
      this.searchLoaded = false;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        if (this.faqSearchVal !== '') {
          this.isshowLoading = true;
          this.searchNoticeToKey(this.faqSearchVal);
        }
      }, 300);
    },
    searchNoticeToKey() {
      // this.searchLoaded = true;
      //   this.isshowLoading = false;
      //   if (data.code === '0' && this.faqSearchVal !== '') {
      //     this.sideList = [];
      //   }
      if (this.faqSearchVal !== '') {
        this.getListData(true);
      }
    },
    setNoticeSearchVal(v) {
      this.faqSearchVal = v;
      if (this.faqSearchVal) {
        if (!this.cacheData.cache) {
          this.setDataToCache();
        }
        this.postValToSearch();
      }
      if (this.faqSearchVal === '' && this.cacheData.cache) {
        this.setCacheToData();
      }
    },
    // 翻页事件
    pagechange(num) {
      const isSearch = this.faqSearchVal !== '';
      this.pagination.page = num;
      this.getListData(isSearch);
    },
    // 获取列表书数据
    getListData(isSearch = false) {
      const keyword = isSearch ? this.faqSearchVal : '';
      this.getData({
        url: '',
        params: {
          keyword,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
        },
        callback: (data) => {
          this.isshowLoading = false;
          this.searchLoaded = true;
          this.openSearch = true;

          // 如果路由没有参数 默认显示第一条数据
          if (!isSearch || (isSearch && this.faqSearchVal !== '')) {
            this.sideList = data;
            this.pagination.count = data.length;
          }

          // if (!parseFloat(this.$route.params.Id)) {
          //   this.writing(data.data.faqInfoList[0].id);
          //   this.$router.push(`/faqInfo/${data.data.faqInfoList[0].id}`);
          // }
        },
      });
    },
    // 获取 内容
    getContentData() {
      if (!this.contentId) return;
      const { lan } = this.$store.state.baseData;
      this.getData({
        url: '',
        params: {
          id: this.contentId,
        },
        callback: (data) => {
          // eslint-disable-next-line prefer-destructuring
          this.faqContent = data[0];
          this.routes = [
            {
              name: this.$t("faq.assist"),
              path: `/ex/${lan}/faqInfo`,
            },
            {
              name: this.faqContent.title,
            },
          ];
        },
      });
    },
    writing(i) {
      if (i !== this.contentId) {
        myStorage.set('Id', i);
        this.contentId = i;
        this.$router.push(`/faqInfo/${i}`);
        this.getContentData();
      }
    },
    getData(datas) {
      this.isshowLoading = true;
      const { params, callback } = datas;
      let data;
      if (params.id) {
        data = this.faqList.filter(item => item.id === params.id);
      } else if (params.keyword) {
        data = this.faqList.filter(item => item.title.toLowerCase().includes(params.keyword));
      } else {
        data = this.faqList;
      }
      this.isshowLoading = false;
      callback(data);
    },
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
