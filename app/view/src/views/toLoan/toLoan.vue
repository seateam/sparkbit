<template>
  <section class="toLoan-content">
    <div class="toLoan-content-img"
      :style="{backgroundImage: `url(${banner})`}">
    </div>
    <div class="toLoan-box c-4-bg">
      <!-- 查看我的借款 -->
      <div class="toLoan-box-goOrder u-8-cl"
        @click="goOrder" v-if="loginFlag">{{ $t('toLoan.home.t1') }}</div>
      <!-- 借款金额 -->
      <div class="toLoan-box-tit b-1-cl">{{ $t('toLoan.home.t2') }}</div>
      <div class="toLoan-box-line clearfix">
        <div class="toLoan-box-input">
          <c-inputLine
            :activeHideTitle="true"
            name="borrowInput"
            :value="borrowInput"
            :promptText="borrowInputWarn"
            :errorFlag="borrowInputFlags.error"
            :errorText="borrowInputFlags.text"
            :errorHave="true"
            @onchanges="inputChanges"
          >
          <div></div>
          </c-inputLine>
        </div>
        <div class="toLoan-box-select">
          <c-select
            :value="borrowSymbol"
            name="loginType"
            :options="borrowSymbolList"
            @onChanges="borrowSymbolChange"
          />
        </div>
      </div>
      <!-- 质押资产 -->
      <div class="toLoan-box-tit b-1-cl" style="margin-top: 56px">
        {{ $t('toLoan.home.t3') }}
        <!-- 币币可用 -->
        <span style="font-size: 12px; margin-left: 10px" class="b-2-cl" v-if="loginFlag">
          {{ $t('toLoan.home.t4') }}：{{ getFix(mortgageBanlance, mortgageSymbolFix)  }}
          {{ getCoinName(showMortgageSymbol) }}</span
        >
      </div>
      <div class="toLoan-box-line clearfix">
        <div class="toLoan-box-input">
          <c-inputLine
            :activeHideTitle="true"
            name="mortgageInput"
            :value="mortgageInput"
            :disabled="false"
            :errorHave="true"
            :errorText="mortgageInputFlags.text"
            :errorFlag="mortgageInputFlags.error"
             @onchanges="inputChanges"
          >
          <div></div>
          </c-inputLine>
        </div>
        <div class="toLoan-box-select">
          <c-select
            :value="mortgageSymbol"
            name="loginType"
            :options="mortgageSymbolList"
            @onChanges="mortgageSymbolChange"
          />
        </div>
      </div>
      <div class="toLoan-box-numbers">
        <div class="toLoan-box-numbers-even clearfix">
          <div class="toLoan-box-numbers-key">
            <!-- 借款结算价 -->
            <div class="toLoan-box-numbers-key-ev">{{ $t('toLoan.home.t5') }}</div>
            <!-- 日利率 -->
            <div class="toLoan-box-numbers-key-ev">{{ $t('toLoan.home.t6') }}</div>
            <!-- 实际到账 -->
            <div class="toLoan-box-numbers-key-ev">{{ $t('toLoan.home.t7') }}</div>
          </div>
          <div class="toLoan-box-numbers-value b-1-cl">
            <div class="toLoan-box-numbers-value-ev">
              1 {{ showMortgageSymbol }} =
              {{ getFix(activeMortgageSymbolDte.price, borrowSymbolFix) }}
              {{ showBorrowSymbol }}
            </div>
            <div class="toLoan-box-numbers-value-ev">
              {{ activeBorrowSymbolDte ? activeBorrowSymbolDte.dailyInterestRate * 100 :''  }}%
            </div>
            <div class="toLoan-box-numbers-value-ev">
              {{ getFix(totalInserest, 8) }} {{ getCoinName(showBorrowSymbol) }}</div>
          </div>
          <div class="toLoan-box-numbers-text">
            <div class="toLoan-box-numbers-text-ev" style="height: 20px">
              <!-- 到账币种 -->
              <!-- （{{ $t('toLoan.home.t8') }}:{{ getCoinName(showBorrowSymbol) }}, -->
              <!-- 实时到账 -->
              <!-- {{ $t('toLoan.home.t9') }}） -->
            </div>
            <div class="toLoan-box-numbers-text-ev">（{{ $t('toLoan.home.t10') }}
              {{ activeBorrowSymbolDte.dailyInterestRate * 365 * 100 }}%）</div>
            <div class="toLoan-box-numbers-text-ev">
              <!-- （{{ expireTime }} 应还 {{ getFix(totalReturn, borrowSymbolFix) }}  -->
              <!-- （{{ expireTime }} 应还 {{ getFix(totalReturn, 8) }}
              {{ getCoinName(showBorrowSymbol)}}） -->
              </div>
          </div>
        </div>
      </div>
      <!-- 开始抵押借贷 / 登录 -->
      <c-button
        type="solid"
        marginTop="40px"
        height="40px"
        width="100%"
        paddingW="0px"
        @click="buttonClick"
        :disabled="loginFlag ? buttonDisabled : false"
        >  {{ loginFlag ? $t('toLoan.home.t11') : $t('toLoan.home.t12') }}
      </c-button>
      <!-- 借贷规则说明 -->
      <div class="u-8-cl" style="margin-top: 40px;
          display: inline-block;
          cursor: pointer;"
          @click="goUrl">{{ $t('toLoan.add.t2') }}</div>
      <!-- linkUrl -->
    </div>
    <!-- 订单确认 / 确认 -->
    <c-dialog
      :showFlag="dialogFlag"
      :titleText="$t('toLoan.home.t13')"
      :confirmText="$t('toLoan.home.t14')"
      :confirmDisabled="!passCheck"
      :confirmLoading="confirmLoading"
      @close="dialogDialogClose"
      @confirm="submit"
    >
      <section class="toLoan-dialog-box">
        <ul class="toLoan-dialog-list">
          <!-- 借币数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('toLoan.home.t15') }}</span>
            <span class="value b-1-cl">
              {{ getFix(borrowInput, borrowSymbolFix) }} {{ getCoinName(showBorrowSymbol) }}
              </span>
          </li>
          <!-- 抵押数量 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('toLoan.home.t16') }}</span>
            <span class="value b-1-cl">
              {{ mortgageInput }} {{ getCoinName(showMortgageSymbol) }}
            </span>
          </li>
          <!-- 手续费 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('toLoan.home.t17') }}</span>
            <span class="value b-1-cl">
              {{ getFix(fee, 8) }} {{ getCoinName(showBorrowSymbol) }}
            </span>
          </li>
          <!-- 实际到账 -->
          <li class="a-4-bg">
            <span class="key">{{ $t('toLoan.home.t18') }}</span>
            <span class="value b-1-cl">
              {{ getFix(totalInserest, 8) }} {{ getCoinName(showBorrowSymbol) }}
            </span>
          </li>
        </ul>
      </section>
    </c-dialog>
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      titleText="温馨提示"
      detaText="请您先完成实名认证，谷歌和手机验证至少绑定一个；"
      :dataList="alertData"
      :buttonText="$t('assets.addressMent.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <c-dialog
      :showFlag="cfmFlag"
      titleText="安全验证"
      @close="cfmFlagClose"
      @confirm="cfmFlagConfirm"
      :confirmDisabled="cfmDisabled"
      :confirmLoading="cfmLoading"
      paddingTop="10px"
    >
      <section class="ylbCard-dialog-box">
        <c-inputLine
          v-if="OpenMobile"
          name='smsCode'
          :value="smsCode"
          :promptText="$t('assets.withdraw.phoneCode')"
          maxLength="6"
          :errorHave="true"
          marginTop="20px"
          :errorFlag="phoneError"
          :errorText="$t('assets.withdraw.phoneCodeError')"
          @onchanges="inputLineChange">
          <!-- 获取验证码 -->
          <c-getCode
            name="withdrawGetcode"
            @click="getCodeClick"/>
        </c-inputLine>
        <c-inputLine
           v-if="OpenGoogle"
          name='googleCode'
          :value="googleCode"
          :promptText="$t('assets.withdraw.googleCode')"
          maxLength="6"
          :errorHave="true"
          :errorFlag="googleError"
          :errorText="$t('assets.withdraw.googleCodeError')"
          @onchanges="inputLineChange">
        </c-inputLine>
      </section>
    </c-dialog>
  </section>
</template>

<script>
import {
  fixInput,
  fixD,
  imgMap,
  getCoinShowName,
} from '@/utils';
import banner from './banner.png';

export default {
  name: 'toLoan',
  data() {
    return {
      banner,
      cfmLoading: false,
      googleCode: '',
      smsCode: '',
      cfmFlag: false,
      alertFlag: false,
      imgMap,
      borrowInput: '', // 借款
      mortgageInput: '', // 抵押
      dialogFlag: false,
      dialogConfirmDisabled: false,
      passCheck: true,
      borrowSymbol: '', // 借贷币种
      borrowSymbolList: [], // 借贷币种列表
      projectList: [], // 项目列表
      mortgageSymbol: '', // 抵押币种
      mortgageSymbolList: [], // 抵押币种列表
      topBannerImg: '', // 顶部banner图片链接
      middleAdvantageImg: '', // 中间产品展示图片链接
      bottomStepImg: '', // 底部借贷步骤展示图片链接
      initBorrowRate: '--', // 初始质押率
      alarmBorrowRate: '--', // 补仓提醒质押率
      explosionBorrowRate: '--', // 平仓质押率
      expireTime: '--', // 应还 时间戳
      projectId: '', // 项目 id
      projectReady: false, // 项目请求成功
      totalReturn: '--', // 到期还款数量
      confirmLoading: false,
      allBanlance: {},
      inputTimer: null,
      qaContent: '',
      qaUrl: '',
      linkUrl: '',
      // base
    };
  },
  watch: {
    borrowInput: {
      immediate: false,
      handler(v) {
        // if (!this.projectReady) {
        //   this.borrowInput = '';
        //   return;
        // }
        this.borrowInput = fixInput(v, 8);
        // clearTimeout(this.inputTimer);
      },
    },
    mortgageInput(v) {
      // if (fixD(v, this.mortgageSymbolFix) * 1) {
      this.mortgageInput = fixInput(v, this.mortgageSymbolFix);
      // } else {
      //   this.mortgageInput = '';
      // }
    },
    userInfoIsReady: {
      immediate: true,
      handler(v) {
        if (v && this.$store.state.baseData.isLogin) {
          this.getBanlance();
        }
      },
    },
  },
  created() {
    this.init();
  },
  computed: {
    fee() {
      const feeRate = this.activeBorrowSymbolDte.feeRate || 0;
      return `${this.borrowInput * feeRate}`;
      // let spk = this.activeBorrowSymbolDte
    },
    // 实际到账
    totalInserest() {
      const feeRate = this.activeBorrowSymbolDte.feeRate || 0;
      return `${this.borrowInput * (1 - feeRate)}`;
      // let spk = this.activeBorrowSymbolDte
    },

    activeBorrowSymbolDte() {
      let obj = {};
      this.borrowSymbolList.forEach((item) => {
        if (item.code === this.borrowSymbol) {
          obj = item.item;
        }
      });
      return obj;
    },
    activeMortgageSymbolDte() {
      let obj = {};
      this.mortgageSymbolList.forEach((item) => {
        if (item.code === this.mortgageSymbol) {
          obj = item.item;
        }
      });
      return obj;
    },
    // market 接口
    market() {
      return this.$store.state.baseData.market || {};
    },
    // phoneValue 是否复合正则验证
    phoneValueFlag() { return this.$store.state.regExp.verification.test(this.smsCode); },
    // googleValue 是否复合正则验证
    googleValueFlag() { return this.$store.state.regExp.verification.test(this.googleCode); },
    phoneError() {
      if (this.smsCode.length !== 0 && !this.phoneValueFlag) return true;
      return false;
    },
    googleError() {
      if (this.googleCode.length !== 0 && !this.googleValueFlag) return true;
      return false;
    },
    // 弹窗确认按钮
    cfmDisabled() {
      let phone = true;
      let google = true;
      if (this.OpenMobile) { phone = this.phoneValueFlag; }
      if (this.OpenGoogle) { google = this.googleValueFlag; }
      if ((phone && google) || this.cfmLoading) {
        return false;
      }
      return true;
    },
    alertData() {
      return [
        { text: this.$t('otcRelease.authentication'), flag: this.idAuth === 1 },
        { text: this.$t('assets.withdraw.bindGoogle'), flag: this.OpenGoogle },
        { text: this.$t('assets.withdraw.bindPhone'), flag: this.OpenMobile },
      ];
    },
    // 用户是否开启手机
    OpenMobile() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.isOpenMobileCheck.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    idAuth() {
      // return 1;
      const { userInfo } = this.$store.state.baseData;
      let idAuth = 0;
      if (userInfo) {
        idAuth = Number(userInfo.authLevel);
      }
      return idAuth;
    },
    // 用户是否开启谷歌
    OpenGoogle() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.googleStatus.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    borrowSymbolFixAll() {
      const obj = {};
      this.projectList.forEach((item) => {
        obj[item.borrowSymbol] = item.borrowSymbolScale;
      });
      return obj;
    },
    // 借贷币种 精度
    borrowSymbolFix() {
      return this.borrowSymbolFixAll[this.borrowSymbol] || 8;
    },
    // 借贷币种 错误提示
    borrowInputFlags() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.borrowInput.length) {
        const borrowInput = this.borrowInput * 1;
        const maxLimitAmount = this.activeBorrowSymbolDte.borrowMaxVol * 1;
        const minLimitAmount = this.activeBorrowSymbolDte.borrowMinVol * 1;
        if (minLimitAmount > borrowInput || borrowInput > maxLimitAmount) {
          obj.flag = false;
          obj.error = true;
          obj.text = this.borrowInputWarn;
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    // 抵押币种 精度
    mortgageSymbolFix() {
      let v = 8;
      const { market } = this.$store.state.baseData;
      if (market && market.coinList && market.coinList[this.mortgageSymbol]) {
        v = market.coinList[this.mortgageSymbol].showPrecision;
      }
      return v;
    },
    // 抵押币种 错误提示
    mortgageInputFlags() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.mortgageInput.length && this.loginFlag) {
        const mortgageInput = this.mortgageInput * 1;
        const mortgageBanlance = this.mortgageBanlance * 1;
        if (mortgageInput > mortgageBanlance) {
          obj.flag = false;
          obj.error = true;
          // 币币可用余额不足
          obj.text = this.$t('toLoan.home.t19');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    borrowInputWarn() {
      // 可借金额
      return `${this.$t('toLoan.home.t20')}
      ${fixD(this.activeBorrowSymbolDte.borrowMinVol)} ${this.getCoinName(this.showBorrowSymbol)}
      ~ ${fixD(this.activeBorrowSymbolDte.borrowMaxVol)} ${this.getCoinName(this.showBorrowSymbol)} `;
    },
    loginFlag() {
      const { isLogin, userInfoIsReady } = this.$store.state.baseData;
      if (isLogin && userInfoIsReady) {
        return true;
      }
      return false;
    },
    userInfoIsReady() {
      return this.$store.state.baseData.userInfoIsReady;
    },
    buttonDisabled() {
      if (this.mortgageInputFlags.flag && this.borrowInputFlags.flag) {
        return false;
      }
      return true;
    },
    // 展示借贷币种
    showBorrowSymbol() {
      let symbol = '';
      this.borrowSymbolList.forEach((item) => {
        if (item.code === this.borrowSymbol) {
          symbol = item.code;
        }
      });
      return symbol;
    },
    // 展示抵押币种
    showMortgageSymbol() {
      let symbol = '';
      this.mortgageSymbolList.forEach((item) => {
        if (item.code === this.mortgageSymbol) {
          symbol = item.code;
        }
      });
      return symbol;
    },
    // 抵押币种余额
    mortgageBanlance() {
      // return '10000'
      if (this.mortgageSymbol
        && this.allBanlance[this.mortgageSymbol]) {
        return this.allBanlance[this.mortgageSymbol].normal_balance;
      }
      return '--';
    },
  },
  methods: {
    getCoinName(coin) {
      return getCoinShowName(coin, this.market.coinList);
    },
    // 获取验证码
    getCodeClick() {
      this.sendSmsCode();
    },
    sendSmsCode() {
      this.axios({
        url: 'v4/common/smsValidCode',
        params: { operationType: '210' },
      }).then((data) => {
        if (data.code.toString() !== '0') {
          setTimeout(() => {
            // 倒计时重置
            this.$bus.$emit('getCode-clear', 'withdrawGetcode');
            // tip框提示错误
            this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          }, 2000);
        } else {
          this.$bus.$emit('tip', { text: this.$t('assets.withdraw.phoneSendSuccess'), type: 'success' });
        }
      });
    },
    initBase() {
      this.axios({
        url: 'config_base',
        hostType: 'debit',
      }).then((data) => {
        if (data.code.toString() !== '0') {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        } else {
          this.linkUrl = data.data.announceId;
          // this.$bus.$emit('tip',
          // { text: this.$t('assets.withdraw.phoneSendSuccess'), type: 'success' });
        }
      });
    },
    goUrl() {
      window.open(this.linkUrl);
    },
    inputLineChange(value, name) {
      this[name] = value;
    },
    alertClone() {
      this.alertFlag = false;
    },
    alertGo() {
      this.$router.push('/personal/userManagement');
    },
    goOrder() {
      this.$router.push('/toLoanHis');
    },
    getFix(v, fix) {
      return fixD(v, fix);
    },
    getBanlance() {
      this.axios({
        url: 'finance/v5/account_balance',
        // headers,
        // params: { coinSymbols },
      }).then((data) => {
        if (data.code.toString() === '0') {
          this.allBanlance = data.data.allCoinMap;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    buttonClick() {
      // if (!this.$store.state.baseData.isLogin) {
      //   this.$router.push('/login');
      //   return;
      // }
      // if (this.OpenGoogle || this.OpenMobile) {
      //   if (this.idAuth === 1) {
      //     // this.activeObj = v;
      //     this.dialogFlag = true;
      //     this.smsCode = '';
      //     this.googleCode = '';
      //     return;
      //   }
      // }
      this.dialogFlag = true;
      // if (this.loginFlag) {
      //   this.dialogFlag = true;
      // } else {
      //   this.$router.push('/login');
      // }
    },
    // 获取借贷币种
    getBorrowSymbolList() {
      this.axios({
        url: 'borrow_coin_symbols',
        hostType: 'debit',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
        },
        // hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          const borrowSymbolList = [];
          data.data.list.forEach((item) => {
            borrowSymbolList.push({
              value: item.coinSymbol,
              code: item.coinSymbol,
              item,
            });
          });
          this.borrowSymbolList = borrowSymbolList;
          if (borrowSymbolList.length) {
            this.borrowSymbol = borrowSymbolList[0].code;
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 获取抵押币种
    getMortgageSymbolList() {
      this.axios({
        url: 'mortgage_coin_symbols',
        headers: {},
        hostType: 'debit',
        params: {
          // borrowSymbol: this.borrowSymbol,
        },
        // hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          const mortgageSymbolList = [];
          data.data.list.forEach((item) => {
            mortgageSymbolList.push({
              value: item.showName || item.coinSymbol,
              code: item.coinSymbol,
              item,
            });
          });
          this.mortgageSymbolList = mortgageSymbolList;
          if (mortgageSymbolList.length) {
            this.mortgageSymbol = mortgageSymbolList[0].code;
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    goQaUrl() {
      window.location.href = this.qaUrl;
    },
    cfmFlagClose() {
      this.cfmFlag = false;
    },
    submit() {
      this.cfmFlagConfirm();
      // this.dialogFlag = false;
      // this.cfmFlag = true;
    },
    cfmFlagConfirm() {
      this.confirmLoading = true;
      this.axios({
        url: 'save_order',
        headers: {},
        hostType: 'debit',
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          // borrowVolume: this.borrowInput || 0,
          borrow_coin_symbol: this.borrowSymbol, // 借贷币种
          mortgage_coin_symbol: this.mortgageSymbol, // 抵押币种
          borrow_amount: this.borrowInput,
        },
        method: 'post',
      }).then((data) => {
        this.confirmLoading = false;
        if (data.code === '0') {
          this.dialogFlag = false;
          this.borrowInput = '';
          this.mortgageInput = '';
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.getBanlance();
          // this.mortgageInput = data.data.mortgageVolume + '' // 抵押数量
          // this.totalReturn = data.data.totalReturn // 到期还款数量
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    dialogDialogClose() {
      this.dialogFlag = false;
    },
    dialogDialogConfirm() {
      this.dialogFlag = false;
    },
    // 切换抵押币种
    mortgageSymbolChange({ code }) {
      if (this.mortgageSymbol === code) return;
      this.mortgageSymbol = code;
      this.borrowInput = '';
      this.mortgageInput = '';
    },
    // 切换借贷币种
    borrowSymbolChange({ code }) {
      if (this.borrowSymbol === code) return;
      this.borrowSymbol = code;
      this.borrowInput = '';
      this.mortgageInput = '';
    },
    inputChanges(value, name) {
      const price = this.activeMortgageSymbolDte.price || 0;
      const pledgeRate = this.activeMortgageSymbolDte.pledgeRate || 0;
      if (name === 'borrowInput') {
        this.mortgageInput = `${value / price / (pledgeRate / 100)}`;
      } else if (name === 'mortgageInput') {
        this.borrowInput = `${value * price * (pledgeRate / 100)}`;
      }
      this[name] = value;
    },
    init() {
      this.getBorrowSymbolList();
      this.getMortgageSymbolList();
      this.initBase();
    },
  },
};
</script>

<style lang="stylus">
// 确认收款并放币Dialog{
.toLoan-passValueText {
  font-size: 14px;
  // cursor: pointer;
  user-select: none;
  margin-top: 15px;
  .common-checkout {
    vertical-align: middle;
  }
  .passValueText-text {
    vertical-align: middle;
    font-size: 12px;
    line-height: 16px
  }
}
.toLoan-box-select {
  input {
    text-align: center;
  }
}

.toLoan-content {
  .toLoan-warn-title {
    text-align: center;
    margin-top: 80px;
    font-size: 36px;
    line-height: 60px;
    margin-bottom: 50px;
    // font-weight: 500
  }
  .toLoan-warn-btn{
    text-align: center;
    cursor pointer
  }
  .toLoan-warn-text {
    width: 750px;
    padding: 20px;
    line-height: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    font-size:12px;
    text-indent: 25px;
    margin-bottom: 50px;
    word-wrap: break-word;
    // box-shadow: 0 2px 10px 0 rgba(227,227,227,0.50);
  }
  .toLoan-dialog-box {
    // padding-top: 10px;
    // padding-bottom: 16px;
    .toLoan-dialog-list {
      li {
        margin-bottom: 2px;
        padding: 15px 20px;
      }
      .key {
        display: block;
        font-size: 12px;
      }
      .value {
        display: block;
        margin-top: 4px;
      }
    }
  }
  .toLoan-box-numbers {
    .toLoan-box-numbers-key {
      float: left;
      line-height: 20px;

      .toLoan-box-numbers-key-ev {
        margin-bottom: 20px;
      }
    }

    .toLoan-box-numbers-value {
      float: left;
      line-height: 20px;
      margin-left: 30px;

      .toLoan-box-numbers-value-ev {
        margin-bottom: 20px;
      }
    }

    .toLoan-box-numbers-text {
      float: right;
      line-height: 20px;

      .toLoan-box-numbers-text-ev {
        margin-bottom: 20px;
        text-align: right;
      }
    }
  }

  .toLoan-box-warns {
    margin-bottom: 50px;
  }

  .toLoan-box-warns-even {
    margin-right: 40px;
    float: left;

    .toLoan-box-warns-key {
      border-bottom-style: dashed;
      border-bottom-width: 1px;
      cursor: pointer;
      position: relative;
    }

    .toLoan-box-warns-market {
      position: absolute;
      box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.28);
      top: 20px;
      width: 300px;
      box-sizing: border-box;
      padding: 15px;
      font-size: 12px;
      line-height: 20px;
      border-radius: 4px;
      display: none;
      left: 0;
    }

    &:hover {
      .toLoan-box-warns-market {
        display: block;
      }
    }
  }

  .toLoan-content-img {
    width: 100%;
    height: 280px
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
    img {
      // width: 100%;
      height: 280px;
      max-width: 100%
    }
  }

  .toLoan-box-times {
    margin-top: 24px;

    .toLoan-box-times-even {
      cursor: pointer;
      margin-right: 60px;
    }

    .toLoan-box-times-text {
      margin-left: 10px;
    }
  }

  .toLoan-box {
    width: 750px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 50px;
    margin-top: 70px;
    margin-bottom: 70px
    position: relative
  }
  .toLoan-box-goOrder {
    position: absolute;
    right: 50px;
    top: 25px;
    cursor: pointer;
  }

  .toLoan-box-tit {
    font-size: 16px;
    line-height: 30px;
  }

  .toLoan-box-line {
    margin-top: -12px;

    .toLoan-box-input {
      width: 560px;
      float: left;
    }

    .toLoan-box-select {
      width: 90px;
      float: left;

      .input_line_inp input {
        text-align: center;
      }
    }
  }
}
</style>
