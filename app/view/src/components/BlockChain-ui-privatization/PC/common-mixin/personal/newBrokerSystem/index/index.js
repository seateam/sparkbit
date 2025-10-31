import { imgMap } from '@/utils';

export default {
  data() {
    return {
      currentTab: 1,
      lineHeight: '55',
      marginRight: 50, // 距离右边的距离
      userName: '', // 用户名称
      scaleReturn: '--', // 直推返佣
      scaleSub: null, // 子经济分佣
      scaleSecond: null, // 二级返佣
      roleName: '--', // 角色名称
      reqData: {}, // 返回的数据
      reqReady: false, // 返回数据是否成功
      bonusInfo: {},
      coCommonPublic: {},
      inviteUrl: '', // 邀请链接
      inviteCode: '', // 邀请码
    };
  },
  computed: {
    navTab() {
      const arr = [
        {
          name: this.$t('brokerSystem.navTab[0]'),
          index: 1,
        },
        {
          name: this.$t('brokerSystem.navTab[1]'),
          index: 2,
        },
        {
          name: this.$t('brokerSystem.navTab[2]'),
          index: 3,
        },
        // {
        //   name: this.$t("brokerSystem.navTab[3]"),
        //   index: 4,
        // },
      ];
      if (this.coCommonPublic && this.coCommonPublic.isStudio === '1') {
        arr.push({
          name: this.$t('studio.studioText1'), // '工作室',
          index: 6,
        });
      }
      return arr;
    },
    customStyle() {
      return {
        background: `url(${imgMap['jingji-header-bg']}) no-repeat right bottom`,
        backgroundSize: '438px 116px',
      };
    },
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    coComminPublicData() {
      return this.$store.state.personal.coComminPublic;
    },
  },
  watch: {
    userInfo: {
      immediate: true,
      handler(v) {
        if (v) {
          this.userInfoReady();
        }
      },
    },
    coComminPublicData(val) {
      this.coCommonPublic = val;
    },
  },
  methods: {
    init() {
      this.coCommonPublic = this.coComminPublicData;
      this.$bus.$on('CO-COMMON-PUBLIC', (data) => {
        this.coCommonPublic = data;
      });
      this.getData();
    },
    currentType(data) {
      this.currentTab = data.index;
    },
    userInfoReady() {
      this.userName = this.userInfo.mobileNumber !== ''
        ? this.userInfo.mobileNumber
        : this.userInfo.email; // 有电话号码显示电话号码,无则显示邮箱
      this.inviteUrl = this.userInfo.inviteUrl; // 邀请链接
      this.inviteCode = this.userInfo.inviteCode; // 邀请码
    },
    getData() {
      // const data = {
      //   scale_info: {
      //     scale_return: '10',
      //     scale_sub: '100',
      //   },
      //   bonus_info: {
      //     amount_total: '1000',
      //     amount_yesterday: '1000',
      //     amount_yesterday_rate: '1',
      //     amount_b_yesterday: '100',
      //     amount_b_yesterday_rate: '0',
      //     amount_return: '100',
      //     amount_sub: '1000',
      //   },
      //   bonus_week: [
      //     { time: 1583020800000, amount: '1' },
      //     { time: 1583107200000, amount: '2' },
      //     { time: 1583193600000, amount: '3' },
      //     { time: 1583280000000, amount: '4' },
      //     { time: 1583366400000, amount: '5' },
      //     { time: 1583452800000, amount: '6' },
      //     { time: 1583539200000, amount: '7' },
      //   ],
      //   child_info: {
      //     count_total: '1',
      //     count_agent: '3',
      //     count_common: '2',
      //     count_bonus: '4',
      //   },
      //   user_return: [
      //     { username: '213123', amount: '1' },
      //     { username: '123', amount: '2' },
      //     { username: '12113', amount: '3' },
      //   ],
      //   user_sub: [
      //     { username: '213123', amount: '4' },
      //     { username: '123', amount: '5' },
      //     { username: '12113', amount: '6' },
      //   ],
      // };
      this.axios({
        url: 'co/agent/index',
        hostType: 'fe-increment-api',
      }).then((data) => {
        if (data.code.toString() === '0') {
          this.setData(data.data);
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    setData(data) {
      this.reqReady = true;
      this.reqData = data;
      this.bonusInfo = data.bonus_info;
      this.roleName = data.role_name;
      this.scaleReturn = `${data.scale_info.scale_return * 100}%`;
      this.scaleSecond = data.scale_info.scale_second * 100;
      this.scaleSub = data.scale_info.scale_sub * 100;
    },
    // 复制邀请链接
    copy(type) {
      // this.$bus.$emit('tip', { text: this.$t('personal.prompt.copySucces'), type: 'success' });
      let save;
      if (type === 'link') {
        save = (e) => {
          e.clipboardData.setData('text/plain', this.inviteUrl); // 下面会说到clipboardData对象
          e.preventDefault(); // 阻止默认行为
        };
      }
      if (type === 'code') {
        save = (e) => {
          e.clipboardData.setData('text/plain', this.inviteCode); // 下面会说到clipboardData对象
          e.preventDefault(); // 阻止默认行为
        };
      }
      document.addEventListener('copy', save);
      document.execCommand('copy'); // 使文档处于可编辑状态，否则无效
      document.removeEventListener('copy', save);
      this.$bus.$emit('tip', {
        text: this.$t('personal.prompt.copySucces'),
        type: 'success',
      });
    },
  },
};
