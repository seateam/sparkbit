import {
  imgMap, colorMap, formatTime, fixD,
} from '@/utils';

export default {
  data() {
    return {
      loading: true,
      imgMap,
      colorMap,
      dataList: [],
      cellHeight: 55,
      headHeight: 30,
      lineNumber: 10,
      classes: '',
      headClasses: '',
      bodyClasses: '',
      lineClass: '',
      // 数据相关
      // 数据相关
      listPage: {
        count: 0, // 总条数
        page: 1, // 当前page
        pageSize: 10, // 每页显示
      },
      startTime: '',
      endTime: '',
      uidValue: '',
      phoneValue: '',
      coinType: '',
      type: 'all',
      lowerType: 'all',
      findFlagLoad: false,
      levelType: 'all',
    };
  },
  computed: {
    levelTypeList() {
      return [
        // 全部
        { code: 'all', key: 'levelType', value: this.$t('order.otcOrder.all') },
        { code: '1', key: 'levelType', value: this.$t('coBroker.text8') },
        { code: '2', key: 'levelType', value: this.$t('coBroker.text9') },
      ];
    },
    levelTexr() {
      return ['--', this.$t('coBroker.text8'), this.$t('coBroker.text9')];
    },
    coinTypeList() {
      return [
        // 全部
        { code: 'all', key: 'coinType', value: this.$t('order.otcOrder.all') },
      ];
    },
    lowerTypeList() {
      return [
        // 全部
        { code: 'all', key: 'lowerType', value: this.$t('order.otcOrder.all') },
      ];
    },
    startTimeNum() {
      return (
        new Date(this.startTime.replace(/-/g, '/')).getTime() / 1000
      ).toString();
    },
    endTimeNum() {
      return (
        new Date(this.endTime.replace(/-/g, '/')).getTime() / 1000
      ).toString();
    },
    startTimeText() {
      return this.$t('broker.startTime');
    },
    endTimeText() {
      return this.$t('freeStaking.myPos.endTime');
    },
    navTab() {
      return [
        {
          name: this.$t('brokerSystem.commissionNavTab[0]'),
          index: 1,
        },
        {
          name: this.$t('brokerSystem.commissionNavTab[1]'),
          index: 2,
        },
      ];
    },
    usdtFix() {
      let fix = 0;
      if (this.market && this.market.coinList && this.market.coinList.USDT) {
        fix = this.market.coinList.USDT.showPrecision;
      }
      return fix;
    },
    market() {
      return this.$store.state.baseData.market;
    },
    columns() {
      return [
        {
          // 日期
          title: this.$t('coBroker.columns1'), // '日期',
          align: 'left',
          width: '100px',
          classes: '',
        },
        {
          title: this.$t('coBroker.columns2'), // '邀请人账号',
          align: 'left',
          width: '100px',
          classes: '',
        },
        {
          title: `${this.$t('coBroker.columns3')}(USDT)`, // '邀请人交易额',
          align: 'center',
          width: '150px',
        },
        {
          title: this.$t('coBroker.columns4'), // '币种',
          align: 'center',
          width: '80px',
        },
        {
          title: this.$t('coBroker.columns5'), // '返佣类型',
          align: 'center',
          width: '100px',
        },
        {
          title: `${this.$t('coBroker.columns6')}`, // '被邀请人账号',
          align: 'center',
          width: '100px',
        },
        {
          title: this.$t('coBroker.columns7'), // '被邀请人级别',
          align: 'center',
          width: '100px',
        },
        {
          title: `${this.$t('coBroker.columns8')}(USDT)`, // '被邀请人交易额',
          align: 'center',
          width: '150px',
        },
        // 返佣金额,
        {
          title: this.$t('brokerSystem.lowerTable1[3]'),
          align: 'center',
          width: '100px',
        },
        // 返佣比例
        {
          title: this.$t('brokerSystem.lowerTable1[4]'),
          align: 'right',
          width: '100px',
        },
      ];
    },
  },
  methods: {
    pagechange(v) {
      this.listPage.page = v;
      this.getDate();
    },
    init() {
      this.listPage.page = 1;
      const timestamp = new Date().getTime();
      const t = 60 * 60 * 24 * 1000 * 7;
      this.startTime = this.getNowTime(timestamp - t);
      this.endTime = this.getNowTime(timestamp);
      this.getDate();
    },
    getMonth(n) {
      const date = new Date();
      return date.setMonth(date.getMonth() + n);
    },
    getNowTime(time = '') {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    },
    setStartTime(time) {
      this.startTime = time;
      this.reducePost();
      this.getDate();
    },
    setEndTime(time) {
      this.endTime = time;
      this.reducePost();
      this.getDate();
    },
    currentType(data) {
      this.currentTab = data.index;
    },
    reducePost() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {}, 500);
    },
    inputChanges(value, name) {
      this[name] = value;
      const now = new Date().getTime();
      this.findFlagLoad = now;
      setTimeout(() => {
        if (this.findFlagLoad === now) {
          this.listPage.page = 1;
          this.getDate();
        }
      }, 800);
    },
    setSelect(item) {
      this.listPage.page = 1;
      this[item.key] = item.code;
      this.getDate();
    },
    getFix(v) {
      let fix = 2;
      if (this.market && this.market.coinList && this.market.coinList[v]) {
        fix = this.market.coinList[v].showPrecision;
      }
      return fix;
    },
    getDate() {
      this.loading = true;
      this.axios({
        url: 'co/agent/user_bonus_list',
        hostType: 'fe-increment-api',
        params: {
          page: this.listPage.page,
          pageSize: this.listPage.pageSize,
          start_time: formatTime(new Date(this.startTime).getTime()),
          end_time: formatTime(new Date(this.endTime).getTime()),
          level: this.levelType === 'all' ? '' : this.levelType,
          account: this.uidValue || undefined,
          sub_account: this.phoneValue || undefined,
          // coin: this.coin === 'all' ? undefined : this.coin,
        },
      }).then((data) => {
        this.loading = false;
        if (data.code.toString() === '0') {
          this.dataList = [];
          this.setDate(data.data.mapList);
          this.listPage.count = data.data.count;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    setDate(data) {
      // this.loading2 = false;
      const arr = [];
      data.forEach((item, index) => {
        const fix = this.getFix(item.coin.toUpperCase());
        let typeText = '';
        switch (item.bonus_type) {
          case 0:
            typeText = this.$t('brokerSystem.lowerTableList[4]'); // '返佣'
            break;
          case 1:
            typeText = this.$t('brokerSystem.lowerTableList[5]'); // '分佣'
            break;
          default:
            typeText = this.$t('brokerSystem.lowerTableList[6]'); // '二级返佣'
        }
        arr.push({
          id: index,
          data: [
            item.time ? formatTime(item.time) : '--', // 时间
            item.account ? item.account : '--', // 邀请人账号
            `${fixD(item.selfVolume, fix)}`, // 邀请人交易额
            item.coin, // 币种
            typeText,
            item.sub_account, // 被邀请人账号
            this.levelTexr[item.sub_level], // 邀请人级别
            fixD(item.sub_volume, fix), // 被邀请人交易额
            fixD(item.amount_return, 8), // 返佣金额
            `${item.amount_scale * 100} %`, // 返佣比例
          ],
        });
      });
      this.dataList = arr;
    },
  },
};
