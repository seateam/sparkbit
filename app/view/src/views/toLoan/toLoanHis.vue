<template>
    <section class="toLoanHis">
      <!-- 抵押借贷 -->
        <div class="toLoanHis-title b-1-cl a-5-bg">
          {{ $t('toLoan.his.t1') }}
        </div>
        <div class="toLoanHis-content a-5-bg">
          <!-- 我的借款 -->
            <div class="toLoanHis-content-tit b-1-cl a-3-bd">
              {{ $t('toLoan.his.t2') }}
            </div>
            <div class="exchangeOrder-table">
                <c-table
                    :imgMap="imgMap"
                    :colorMap="colorMap"
                    :loading="tabelLoading"
                    :columns="columns"
                    :dataList="tabelList"
                    @elementClick="tableClick"
                />
                <c-pagination
                    v-if="paginationObj.total > paginationObj.display"
                    :total="paginationObj.total"
                    :display="paginationObj.display"
                    :currentPage="paginationObj.currentPage"
                    @pagechange="pagechange"
                />
            </div>
        </div>
    <!-- 还款 /确认还款 -->
    <c-dialog
      :showFlag="repaymentFlag"
      :titleText="$t('toLoan.his.t3')"
      :confirmText="$t('toLoan.his.t4')"
      :confirmDisabled="!repaymentValueObjs.flag"
      :confirmLoading="repaymentDialogLoading"
      @close="repaymentDialogClose"
      @confirm="repaymentDialogConfirm"
    >
      <section class="toLoan-dialog-box">
        <div class="toLoan-dialog-repayment-text" style="margin-bottom: 20px">
          <!-- 抵押资产 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('toLoan.his.t5') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
            <!-- {{ borrowSymbolFixD(repObj.remainInserestAndPrincipal,
              repObj.borrowSymbol) }} -->

            {{ toFix(repObj.mortgageVol, getFix(repObj.mortgageCoinSymbol)) }}
            {{ repObj.mortgageCoinSymbol }}
              <!-- {{
                toFix(repObj.remainInserestAndPrincipal, 8)
              }}
            {{ getCoinName(repObj.borrowSymbol) }} -->
          </span>
        </div>
        <div class="toLoan-dialog-repayment-text" style="margin-bottom: 20px">
          <!-- 应还金额 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('toLoan.his.t6') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
            {{ toFix(repObj.currPayVol, getFix(repObj.borrowCoinSymbol)) }}
            {{ repObj.borrowCoinSymbol }}
            <!-- {{ borrowSymbolFixD(nowBanlance,
              repObj.borrowSymbol) }} {{ repObj.borrowSymbol }} -->
              <!-- {{
                (nowBanlance, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }} -->
          </span>
        </div>
        <!-- 还款金额 -->
        <c-inputLine
          name='repaymentValue'
          :value="repaymentValue"
          :promptText="$t('toLoan.his.t7')"
          :errorHave="true"
          :errorText="repaymentValueObjs.text"
          :errorFlag="repaymentValueObjs.error"
          @onchanges="inputLineChange">
          <div>
            <c-button type="text" height="30px" @click="maxClick">
              <!-- 最大 -->
              {{ $t('toLoan.his.t8') }}
            </c-button>
            <span style="vertical-align: middle;" class="b-1-cl">
              {{ getCoinName(repObj.borrowCoinSymbol) }}</span>
          </div>
        </c-inputLine>

        <div class="toLoan-dialog-repayment-spk clearfix">
          <div class="toLoan-dialog-repayment-spk-even"
            :class="activeSpk === item ? 'u-8-bd f-1-cl' : 'a-2-bd'"
            @click="setSpk(item)"
            v-for="(item, index) in spkList"
            :key="index">
            {{ item }}%
          </div>
        </div>
        <!-- 还款后风险值 -->
        <div style="margin-top: 20px">{{ $t('toLoan.his.t9') }}：{{repaymentRisk}}</div>
        <!-- 全部还款后抵押资产将实时解冻 -->
        <div class="b-7-cl" style="margin-top: 20px">{{ $t('toLoan.add.t1') }}</div>
      </section>
    </c-dialog>
    <!-- 补仓 / 确认补仓 -->
    <c-dialog
      :showFlag="coverFlag"
      :titleText="$t('toLoan.his.t10')"
      :confirmText="$t('toLoan.his.t11')"
      :confirmDisabled="!coverValueObjs.flag"
      :confirmLoading="coverDialogLoading"
      @close="coverDialogClose"
      @confirm="coverDialogConfirm"
    >
      <section class="toLoan-dialog-box">
        <div class="toLoan-dialog-repayment-text" style="margin-bottom: 20px">
          <!-- 抵押资产 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('toLoan.his.t5') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
            <!-- {{ borrowSymbolFixD(repObj.remainInserestAndPrincipal,
              repObj.borrowSymbol) }} -->

            {{ toFix(repObj.mortgageVol, getFix(repObj.mortgageCoinSymbol)) }}
            {{ repObj.mortgageCoinSymbol }}
              <!-- {{
                toFix(repObj.remainInserestAndPrincipal, 8)
              }}
            {{ getCoinName(repObj.borrowSymbol) }} -->
          </span>
        </div>
        <div class="toLoan-dialog-repayment-text" style="margin-bottom: 20px">
          <!-- 应还金额 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('toLoan.his.t6') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
            {{ toFix(repObj.currPayVol, getFix(repObj.borrowCoinSymbol)) }}
            {{ repObj.borrowCoinSymbol }}
            <!-- {{ borrowSymbolFixD(nowBanlance,
              repObj.borrowSymbol) }} {{ repObj.borrowSymbol }} -->
              <!-- {{
                (nowBanlance, 8)
              }}
              {{ getCoinName(repObj.borrowSymbol) }} -->
          </span>
        </div>
        <!-- 补仓金额 -->
        <c-inputLine
          name='coverValue'
          :value="coverValue"
          :promptText="$t('toLoan.his.t12')"
          :errorHave="true"
          :errorText="coverValueObjs.text"
          :errorFlag="coverValueObjs.error"
          @onchanges="inputLineChange">
          <div>
            <!-- 推荐 -->
            <c-button type="text" height="30px" @click="tjCoverClick">
              {{ $t('toLoan.his.t13') }}
            </c-button>
            <!-- 最大 -->
            <c-button type="text" height="30px" @click="maxCoverClick">
              {{ $t('toLoan.his.t8') }}
            </c-button>
            <span style="vertical-align: middle;" class="b-1-cl">
              {{ getCoinName(repObj.mortgageCoinSymbol) }}</span>
          </div>
        </c-inputLine>
        <div class="toLoan-dialog-repayment-text" style="margin-bottom: 20px">
          <!-- 可用余额 -->
          <span class="toLoan-dialog-repayment-textK">
            {{ $t('toLoan.his.t14') }}：</span>
          <span class="f-1-cl toLoan-dialog-repayment-textV">
            <!-- {{ borrowSymbolFixD(repObj.remainInserestAndPrincipal,
              repObj.borrowSymbol) }} -->
            {{ toFix(mortgageBanlance, getFix(repObj.mortgageCoinSymbol)) }}
            {{ repObj.mortgageCoinSymbol }}
              <!-- {{
                toFix(repObj.remainInserestAndPrincipal, 8)
              }}
            {{ getCoinName(repObj.borrowSymbol) }} -->
          </span>
        </div>
        <div class="toLoan-dialog-repayment-spk clearfix">
          <div class="toLoan-dialog-repayment-spk-even"
            :class="coverActiveSpk === item ? 'u-8-bd f-1-cl' : 'a-2-bd'"
            @click="setCoverSpk(item)"
            v-for="(item, index) in spkList"
            :key="index">
            {{ item }}%
          </div>
        </div>
        <!-- 补仓后风险值 -->
        <div style="margin-top: 20px">{{ $t('toLoan.his.t15') }}：{{coverRisk}}</div>
      </section>
    </c-dialog>
    <!-- 查看详情 -->
    <c-dialog
      :showFlag="seeRateFlag"
      :titleText="$t('toLoan.his.t16')"
      @close="seeRateClose"
      :haveOption="false"
    >
      <section class="toLoan-dialog-box">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="rateListLoading"
          :columns="rateColumns"
          :dataList="rateList"
        />
        <c-pagination
                    v-if="ratePaginationObj.total > ratePaginationObj.display"
                    :total="ratePaginationObj.total"
                    :display="ratePaginationObj.display"
                    :currentPage="ratePaginationObj.currentPage"
                    @pagechange="ratePagechange"
                />
      </section>
    </c-dialog>
    </section>
</template>

<script>
import {
  fixD,
  getCoinShowName,
  imgMap,
  colorMap,
  fixInput,
} from '@/utils';

export default {
  props: {
    borrowSymbolObj: {
      default: () => {},
      type: Object,
    },
    baseReady: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    repaymentValue: {
      immediate: false,
      handler(v) {
        this.repaymentValue = fixInput(v, this.getFix(this.repObj.borrowCoinSymbol));
        // this.borrowInput = fixInput(v, this.);
      },
    },
    coverValue: {
      immediate: false,
      handler(v) {
        this.coverValue = fixInput(v, this.getFix(this.repObj.mortgageCoinSymbol));
        // this.borrowInput = fixInput(v, this.);
      },
    },
  },
  data() {
    return {
      coverFlag: false,
      coverDialogLoading: false,
      coverValue: '',
      repaymentFlag: false,
      repaymentDialogLoading: false,
      repaymentValue: '',
      rateList: [],
      seeRateFlag: false,
      rateListLoading: false,
      spkList: [25, 50, 75, 100],
      activeSpk: '',
      coverActiveSpk: '',
      side: 'all', // 方向
      tabelList: [],
      tabelLoading: true,
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      ratePaginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      imgMap,
      colorMap,
      repObj: {},
      mortgageSymbolList: {},
      allBanlance: {},
      orderDetail: {},
    };
  },
  computed: {
    // 抵押币种余额
    mortgageBanlance() {
      // return '10000'
      if (this.repObj.mortgageCoinSymbol
        && this.allBanlance[this.repObj.mortgageCoinSymbol]) {
        return this.allBanlance[this.repObj.mortgageCoinSymbol].normal_balance;
      }
      return '--';
    },
    repaymentRisk() {
      let risk = '--';
      // 计算风险值
      if (this.repObj && this.repaymentValue * 1) {
        let priceVal = 0;
        if (this.mortgageSymbolList[this.repObj.mortgageCoinSymbol]) {
          priceVal = this.mortgageSymbolList[this.repObj.mortgageCoinSymbol].price;
        }
        // (应还数量(USDT)-还款数量(USDT)  /  抵押物数量  * 抵押物最新价格（USDT）)*100是还款后风险值
        risk = fixD((this.repObj.currPayVol - this.repaymentValue)
        / (Number(this.repObj.mortgageVol) * priceVal) * 100, 0);
        // console.log(this.repObj.borrowVol,this.repaymentValue,  priceVal)
        if (risk.toString().indexOf('-') !== -1 || risk.toString() === 'NaN') {
          risk = 0;
        }
      }
      return risk;
    },
    coverRisk() {
      let risk = '--';
      // 计算风险值
      if (this.repObj && this.coverValue * 1) {
        let priceVal = 0;
        if (this.mortgageSymbolList[this.repObj.mortgageCoinSymbol]) {
          priceVal = this.mortgageSymbolList[this.repObj.mortgageCoinSymbol].price;
        }
        //
        // (应还数量(USDT)  /  （抵押物数量 + 补仓数量）  * 抵押物最新价格（USDT）)*100是补仓后风险值
        risk = fixD(this.repObj.currPayVol
          / ((Number(this.repObj.mortgageVol) + Number(this.coverValue))
          * priceVal) * 100, 0);
        // console.log(this.repObj.currPayVol,
        // Number(this.repObj.mortgageVol),  Number(this.coverValue),price)
        if (risk.toString().indexOf('-') !== -1 || risk.toString() === 'NaN') {
          risk = 0;
        }
      }
      return risk;
    },
    rateColumns() {
      return [
      // 订单号
        {
          title: this.$t('toLoan.his.t17'),
          // width: '80px',
        },
        // 类型
        {
          title: this.$t('toLoan.his.t18'),
          // width: '80px',
        },
        // 金额
        {
          title: this.$t('toLoan.his.t19'),
          // width: '80px',
        },
      ];
    },
    coverValueObjs() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.coverValue.length && this.coverValue * 1) {
        const coverValue = this.coverValue * 1;
        const nowBanlance = this.nowBanlance * 1;
        const remainInserestAndPrincipal = this.repObj.remainInserestAndPrincipal * 1;
        if (coverValue > nowBanlance) {
          obj.flag = false;
          obj.error = true;
          // 币币可用余额不足
          obj.text = this.$t('broToloan.toLoanHis.t30');
        } else if (coverValue > remainInserestAndPrincipal) {
          obj.flag = false;
          obj.error = true;
          // 输入的还款金额不能大于应还本息最大值
          obj.text = this.$t('broToloan.toLoanHis.t31');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    repaymentValueObjs() {
      const obj = {
        flag: false,
        error: false,
        text: '',
      };
      if (this.repaymentValue.length && this.repaymentValue * 1) {
        const repaymentValue = this.repaymentValue * 1;
        const nowBanlance = this.nowBanlance * 1;
        const remainInserestAndPrincipal = this.repObj.remainInserestAndPrincipal * 1;
        if (repaymentValue > nowBanlance) {
          obj.flag = false;
          obj.error = true;
          // 币币可用余额不足
          obj.text = this.$t('broToloan.toLoanHis.t30');
        } else if (repaymentValue > remainInserestAndPrincipal) {
          obj.flag = false;
          obj.error = true;
          // 输入的还款金额不能大于应还本息最大值
          obj.text = this.$t('broToloan.toLoanHis.t31');
        } else {
          obj.flag = true;
          obj.error = false;
          obj.text = '';
        }
      }
      return obj;
    },
    market() {
      return this.$store.state.baseData.market || {};
    },
    // 表格title
    columns() {
      let list = [];
      list = [
        // 订单号
        {
          title: this.$t('toLoan.his.t20'),
          width: '60px',
        },
        // 借款时间
        {
          title: this.$t('toLoan.his.t21'),
          width: '90px',
        },
        // 借款金额
        {
          title: this.$t('toLoan.his.t22'),
          // width: '90px',
        },
        // 质押数量
        {
          title: this.$t('toLoan.his.t23'),
          // width: '90px',
        },
        // 风险值
        {
          title: this.$t('toLoan.his.t24'),
          width: '90px',
        },
        // 当前应还
        {
          title: this.$t('toLoan.his.t25'),
        },
        // 订单状态
        {
          title: this.$t('toLoan.his.t26'),
          width: '100px',
        },
        // 操作
        {
          title: this.$t('toLoan.his.t27'),
        },
      ];
      return list;
    },
  },
  created() {
    this.getMortgageSymbolList();
    this.getData();
    this.getBanlance();
  },
  methods: {
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
            mortgageSymbolList[item.coinSymbol] = item;
          });
          this.mortgageSymbolList = mortgageSymbolList;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    seeRateClose() {
      this.seeRateFlag = false;
    },
    toFix(v, fix) {
      return fixD(v, fix);
    },
    getFix(symbol) {
      let v = 0;
      const { market } = this.$store.state.baseData;
      if (market && market.coinList && market.coinList[symbol]) {
        v = market.coinList[symbol].showPrecision;
      }
      return v;
    },
    setSpk(v) {
      this.activeSpk = v;
      this.repaymentValue = `${this.repObj.currPayVol * (v / 100)}`;
    },
    setCoverSpk(v) {
      this.coverActiveSpk = v;
      this.coverValue = `${this.mortgageBanlance * (v / 100)}`;
    },
    getTj() {
      this.axios({
        url: 'recommend_cover',
        hostType: 'debit',
        headers: {},
        params: {
          orderId: this.repObj.orderId,
          // amount: this.coverValue || 0,
        },
        method: 'post',
      }).then((data) => {
        // this.coverDialogLoading = false;
        if (data.code === '0') {
          this.orderDetail = data.data;
          // this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          // this.coverDialogClose();
          // this.getData();
        //   this.getBanlance();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    tjCoverClick() {
      this.coverValue = this.orderDetail.is_recommend !== '0' ? `${this.orderDetail.recommendVol}` : '0';
      // 以一个订单的抵押率是60 计算
      // (应还数量(USDT)  /  （抵押物数量 + 补仓数量X）  * 抵押物最新价格（USDT）)*100 = 60
      // 解X
      // 应还数量(USDT)  除以 60 除以 100 除以 抵押物最新价格 - 抵押物数量，求得推荐补仓数量X
      // let risk = '--'
      // 计算风险值
      // if (this.repObj && this.coverValue * 1) {
      //   let price = 0
      //   if(this.mortgageSymbolList[this.repObj.mortgageCoinSymbol]) {
      //     price = this.mortgageSymbolList[this.repObj.mortgageCoinSymbol].price
      //   }
      //   //
      //   // (应还数量(USDT)  /  （抵押物数量 + 补仓数量）  * 抵押物最新价格（USDT）)*100是补仓后风险值
      //   risk = fixD(this.repObj.currPayVol /
      //     ((Number(this.repObj.mortgageVol) + Number(this.coverValue))
      //     * price) * 100,0)
      //   // console.log(this.repObj.borrowVol,this.repaymentValue,  price)
      //   if (risk.toString().indexOf('-') !== -1 || risk.toString() === 'NaN') {
      //     risk = 0;
      //   }
      // }
    },
    maxCoverClick() {
      this.activeSpk = '';
      this.coverValue = `${this.mortgageBanlance}`;
    },
    maxClick() {
      this.activeSpk = '';
      this.repaymentValue = `${this.repObj.currPayVol}`;
    },
    coverDialogClose() {
      this.coverFlag = false;
      this.coverValue = '';
    },
    coverDialogConfirm() {
      this.coverDialogLoading = true;
      this.axios({
        url: 'cover',
        hostType: 'debit',
        headers: {},
        params: {
          orderId: this.repObj.orderId,
          amount: this.coverValue || 0,
        },
        method: 'post',
      }).then((data) => {
        this.coverDialogLoading = false;
        if (data.code === '0') {
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.coverDialogClose();
          this.getData();
        //   this.getBanlance();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    repaymentDialogClose() {
      this.repaymentFlag = false;
      this.repaymentValue = '';
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
    repaymentDialogConfirm() {
      this.repaymentDialogLoading = true;
      this.axios({
        url: 'pay_back',
        hostType: 'debit',
        headers: {},
        params: {
          orderId: this.repObj.orderId,
          amount: this.repaymentValue || 0,
        },
        method: 'post',
      }).then((data) => {
        this.repaymentDialogLoading = false;
        if (data.code === '0') {
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.repaymentDialogClose();
          this.getData();
        //   this.getBanlance();
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    inputLineChange(value, name) {
      this[name] = value;
      this.coverActiveSpk = '';
      this.activeSpk = '';
    },
    getCoinName(coin) {
      return getCoinShowName(coin, this.market.coinList);
    },
    // 借贷
    getBorrowSymbolFix(symbol) {
      if (this.borrowSymbolObj[symbol]) {
        return this.borrowSymbolObj[symbol].showPrecision;
      }
      return 8;
    },
    getData() {
      this.axios({
        url: 'borrow_orders',
        hostType: 'debit',
        headers: {},
        params: {
          // borrowSymbol: this.borrowSymbol,
          // mortgageSymbol: this.mortgageSymbol,
          // status: this.side === 'all' ? '' : this.side,
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
          // mortgageSymbol: this.coin === 'all' ? '' : this.coin,
        },
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          const arr = [];
          data.data.list.forEach((item) => {
            // const borrowSymbolFix = this.getBorrowSymbolFix(item.borrowSymbol);
            const op = [
              {
                type: 'button', // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                text: this.$t('toLoan.his.t28'), // 查看详情
                iconClass: [''],
                eventType: 'dte',
              },
            ];
            if (item.status === 1) {
              op.push({
                type: 'button', // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                text: this.$t('toLoan.his.t29'), // 还款
                iconClass: [''],
                eventType: 'rep',
              });
              op.push({
                type: 'button', // 'link' ' button' ,'html', 'label', 'icon' ‘str’
                text: this.$t('toLoan.his.t30'), // 补仓
                iconClass: [''],
                eventType: 'pay',
              });
            }
            arr.push({
              id: JSON.stringify(item),
              data: [
                item.orderId, // 订单id
                item.ctime,
                `${fixD(item.borrowVol,
                  this.getFix(item.borrowCoinSymbol))} ${item.borrowCoinSymbol}`, // 借款数量
                `${fixD(item.mortgageVol,
                  this.getFix(item.mortgageCoinSymbol))} ${item.mortgageCoinSymbol}`, // 抵押数量
                item.risk, // 风险值
                `${fixD(item.currPayVol,
                  this.getFix(item.borrowCoinSymbol))} ${item.borrowCoinSymbol}`, // 当前应还
                item.status_text, // 状态
                op,
              ],
            });
          });
          this.tabelLoading = false;
          this.tabelList = arr;
          this.paginationObj.total = data.data.count;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    getSeeRate() {
      this.axios({
        url: 'borrow_order_handles_and_interests',
        hostType: 'debit',
        params: {
          pageSize: this.ratePaginationObj.display, // 每页条数
          page: this.ratePaginationObj.currentPage, // 页码
          orderId: this.repObj.orderId,
        },
        // params: {
        //   // borrowSymbol: this.borrowSymbol,
        //   // mortgageSymbol: this.mortgageSymbol,
        //   // status: this.side === 'all' ? '' : this.side,

        //   // mortgageSymbol: this.coin === 'all' ? '' : this.coin,
        // },
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          this.rateListLoading = false;
          const arr = [];
          data.data.list.forEach((item) => {
            // const borrowSymbolFix = this.getBorrowSymbolFix(item.borrowSymbol);
            arr.push({
              id: JSON.stringify(item),
              data: [
                item.orderId, // 订单id
                item.type_text,
                // item.volume + item.coin_symbol
                `${fixD(item.volume,
                  this.getFix(item.coin_symbol))} ${item.coin_symbol}`, // 金额
                // `${fixD(item.mortgageVol,
                //   this.getFix(item.mortgageCoinSymbol))} ${item.mortgageCoinSymbol}`, // 抵押数量
                // item.riskLevel, // 风险值
                // `${fixD(item.currPayVol,
                //   this.getFix(item.borrowCoinSymbol))} ${item.borrowCoinSymbol}`, // 当前应还
                // item.status_text, // 状态
                // op,
              ],
            });
          });
          this.rateList = arr;
          this.ratePaginationObj.total = data.data.count;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    tableClick(type, id) {
      if (type === 'dte') {
        this.repObj = JSON.parse(id);
        this.ratePaginationObj.currentPage = 1;
        this.rateListLoading = true;
        this.getSeeRate();
        this.seeRateFlag = true;
      } else if (type === 'rep') {
        this.getBanlance();
        this.repObj = JSON.parse(id);
        this.activeSpk = '';
        this.repaymentValue = '';
        this.repaymentFlag = true;
      } else if (type === 'pay') {
        this.getBanlance();
        this.repObj = JSON.parse(id);
        this.getTj();
        this.coverActiveSpk = '';
        this.coverValue = '';
        this.coverFlag = true;
      }
    },
    // 分页器
    // 分页器
    pagechange(v) {
      this.paginationObj.currentPage = v;
      // this.clearSub();
      this.getData();
    },
    ratePagechange(v) {
      this.ratePaginationObj.currentPage = v;
      // this.clearSub();
      this.getSeeRate();
    },
  },
};
</script>


<style lang="stylus" scoped>
.toLoanHis {
    width 100%;
    .toLoanHis-title {
        width: 980px;
        font-size 20px;
        padding: 30px 30px;
        box-sizing: border-box;
        margin 0 auto;
        margin-top 30px
    }
    .toLoanHis-content {
        width: 980px;
        margin 0 auto;
        margin-top 20px
    }
    .toLoanHis-content-tit {
        padding: 0 30px;
        line-height 55px
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }
    .toLoan-dialog-box {
    // padding-top: 10px;
    // padding-bottom: 16px;
    .toLoan-dialog-repayment-spk {
      margin-top: 10px;
      .toLoan-dialog-repayment-spk-even {
        width: 92px;
        margin-right: 10px;
        border-width: 1px;
        border-style: solid;
        box-sizing: border-box;
        float:left;
        text-align: center;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
        border-radius: 2px;
      }
       .toLoan-dialog-repayment-spk-even:last-child {
         margin-right: 0px;
       }
    }
    }
}
</style>
