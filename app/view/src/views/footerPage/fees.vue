<template>
  <div class="m-page">
    <div class="title">Deposit, Withdrawal and Trading Fees</div>
    <div class="desc">
      <div class="text">
        Supercharge your profits by leveraging fee deductions for the following transactions:
      </div>
      <div class="li">
        <svg
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="7" y1="7" x2="17" y2="17"></line>
          <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
        <span>BlueSparrow/USDT:</span>
        <span class="link" @click="linkTo('/trade/BlueSparrow_USDT')"
          >Enjoy a generous 10% discount on fees for spot trading</span
        >
      </div>
      <div class="li">
        <svg
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="7" y1="7" x2="17" y2="17"></line>
          <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
        <span>BlueSparrow/BTC: </span>
        <span class="link" @click="linkTo('/trade/BlueSparrow_BTC')"
          >Experience fee-free transactions, with a 0% fee deduction.</span
        >
      </div>
      <div class="li">
        <svg
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="7" y1="7" x2="17" y2="17"></line>
          <polyline points="17 7 17 17 7 17"></polyline>
        </svg>
        <span>BlueSparrow/ETH: </span>
        <span class="link" @click="linkTo('/trade/BlueSparrow_ETH')"
          >Benefit from fee-free transactions as well, with 0% fees deducted.</span
        >
      </div>
    </div>
    <br /><br />
    <div class="m-tab">
      <div class="item" :class="{ active: activeIndex === 0 }" @click="changeIndex(0)">
        Spot Trading
      </div>
      <div class="item" :class="{ active: activeIndex === 1 }" @click="changeIndex(1)">
        USD-M Futures
      </div>
      <div class="item" :class="{ active: activeIndex === 2 }" @click="changeIndex(2)">
        Margin Borrow Interest
      </div>
      <div class="item" :class="{ active: activeIndex === 3 }" @click="changeIndex(3)">
        Deposit & Withdrawal Fees
      </div>
    </div>
    <div class="m-table">
      <!--<div class="other" v-if="activeIndex === 2">-->
      <!--  <br>-->
      <!--  <div>-->
      <!--    <span>Maker Fee = 0.080 %</span>-->
      <!--    <span>Taker Fee = 0.100%</span>-->
      <!--  </div>-->
      <!--</div>-->
      <div class="other" v-if="activeIndex === 3">
        <br />
        <br />
        <div class="m-info">
          <div class="title">Deposits</div>
          <div class="tips">
            {{ companyName }} guarantees a fee-free deposit process for depositing crypto, ensuring
            no charges are applied for {{ companyName }} crypto deposits.
          </div>
        </div>
        <div class="m-info">
          <div class="title">Withdrawals</div>
          <div class="tips">
            Users are obligated to pay a flat fee that covers the transaction costs associated with
            transferring their cryptocurrency out of their {{ companyName }} account. It's essential
            to understand that withdrawal rates are determined by the blockchain network and can
            fluctuate unexpectedly due to factors like network congestion.
          </div>
        </div>
        <div class="m-info">
          <div class="tips">
            To obtain the most recent data regarding withdrawal fees, please refer to the specific
            withdrawal page for up-to-date information and real-time quotes.
          </div>
        </div>
        <!--<div class="input">-->
        <!--  <input v-model="searchCoin" type="text" placeholder="Search Coin">-->
        <!--</div>-->
      </div>
      <table v-if="activeIndex === 0">
        <thead>
          <tr>
            <th>Markets</th>
            <th>Maker Fee</th>
            <th>Taker Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in calFeeList">
            <td>{{ item.symbol }}</td>
            <td>{{ item.TRADE_MAKER_VIP0 || "" }}</td>
            <td>{{ item.TRADE_TAKER_VIP0 || "" }}</td>
          </tr>
        </tbody>
      </table>
      <table v-if="activeIndex === 1">
        <thead>
          <tr>
            <th>Markets</th>
            <th>Maker Fee</th>
            <th>Taker Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in futureList">
            <td>{{ `${item.multiplierCoin}/${item.marginCoin}` }}</td>
            <td>{{ item.openMakerFee }}</td>
            <td>{{ item.openTakerFee }}</td>
          </tr>
        </tbody>
      </table>
      <table v-if="activeIndex === 2">
        <thead>
          <tr>
            <th>Markets</th>
            <th>Borrow Daily Interest Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in calBorrowRuleList">
            <td>{{ item.symbol }}</td>
            <td>{{ item.rate }}%</td>
          </tr>
        </tbody>
      </table>
      <table v-if="activeIndex === 3">
        <thead>
          <tr>
            <th></th>
            <th>Coin / Token</th>
            <th>Network</th>
            <th>Minimum Withdrawal</th>
            <th>Minimum Deposit</th>
            <th>Deposit Fees</th>
            <th>Withdrawal Fees</th>
          </tr>
        </thead>
        <tbody ref="coinList" id="coinList">
          <tr v-for="item in coinsInfo">
            <td style="width: 46px">
              <div class="image">
                <img style="margin-bottom: -6px" :src="item.icon" width="25" height="25" />
              </div>
            </td>
            <td>{{ item.name || item.coinSymbol }}</td>
            <td>{{ item.mainChainName }}</td>
            <td>{{ item.withdrawMin }}</td>
            <td>{{ item.depositMin }}</td>
            <td>{{ item.depositFees }}</td>
            <td>{{ item.withdrawalFees }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    {{ contractList }}
  </div>
</template>

<script>
export default {
  name: "fees",
  data() {
    return {
      activeIndex: 0,
      searchCoin: "",
      feeList: [],
      borrowRuleList: [],
      coinsInfo: [],
      futureList: [],
    };
  },
  mounted() {
    this.getFeesList();
    this.getBorrowRule();
    this.getCoinsInfo();
    this.getMakerAndTaker();
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    calSymbolAll() {
      const symbolAll = this.symbolAll || {};
      const symbolAll2 = {};
      for (const symbolAllKey in symbolAll) {
        symbolAll2[symbolAllKey.replace("/", "")] = symbolAll[symbolAllKey];
      }
      return symbolAll2;
    },
    // 显示可交易币种
    calFeeList() {
      const { feeList } = this;
      const symbolAll = this.calSymbolAll || {};
      return feeList.filter((item) => !!symbolAll[item.symbol]);
    },
    calBorrowRuleList() {
      const feeList = this.borrowRuleList;
      const symbolAll = this.calSymbolAll || {};
      return feeList.filter(
        (item) => !!symbolAll[item.symbol] && !!symbolAll[item.symbol].is_open_lever
      );
    },
  },
  methods: {
    // 获取费率列表
    getFeesList() {
      this.axios({
        url: "fee_info",
        headers: {},
        params: {},
        method: "post",
      }).then((res) => {
        if (res.code == 0) {
          let list = res.data.pairMapList || [];
          list = list.map((item) => {
            item.symbol = item.symbol.toUpperCase();
            item.TRADE_MAKER_VIP0 = item.TRADE_MAKER_VIP0
              ? `${(item.TRADE_MAKER_VIP0 * 100).toFixed(3)}%`
              : "0%";
            item.TRADE_TAKER_VIP0 = item.TRADE_TAKER_VIP0
              ? `${(item.TRADE_TAKER_VIP0 * 100).toFixed(3)}%`
              : "0%";
            return item;
          });
          this.feeList = list;
        }
      });
    },
    getBorrowRule() {
      this.axios({
        url: "borrow_rule",
        headers: {},
        params: {},
        method: "post",
      }).then((res) => {
        if (res.code == 0) {
          let list = res.data || [];
          list = list.map((item) => {
            item.openMakerFee = `${(item.openMakerFee * 100).toFixed(3)}%`;
            item.openTakerFee = `${(item.openTakerFee * 100).toFixed(3)}%`;
            return item;
          });
          this.borrowRuleList = list;
        }
      });
    },
    getCoinsInfo() {
      this.axios({
        url: "coins_info",
        headers: {},
        params: {},
        method: "post",
      }).then((res) => {
        if (res.code == 0) {
          const list = res.data || [];
          this.coinsInfo = list;
          this.getCoinsFee();
        }
      });
    },
    getCoinsFee() {
      this.axios({
        url: "coins_fee",
        headers: {},
        params: {},
        method: "post",
      }).then((res) => {
        if (res.code == 0) {
          const { coinsInfo } = this;
          const coinFee = res.data;
          for (let i = 0; i < coinsInfo.length; i++) {
            const item = coinsInfo[i];
            const coinSymbol = item.coinSymbol || item.name;
            item.depositFees = coinFee[coinSymbol].depositRate;
            item.withdrawalFees = coinFee[coinSymbol].defaultWithdrawFee;
          }
        }
      });
    },
    getMakerAndTaker() {
      this.axios({
        url: "common/getMakerAndTaker",
        method: "get",
        hostType: "co",
      }).then((res) => {
        if (res.code == 0) {
          let list = res.data || [];
          list = list.map((item) => {
            item.openMakerFee = `${(item.openMakerFee * 100).toFixed(3)}%`;
            item.openTakerFee = `${(item.openTakerFee * 100).toFixed(3)}%`;
            return item;
          });
          this.futureList = list;
        }
      });
    },
    linkTo(path) {
      this.$router.push(path);
    },
    changeIndex(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style scoped>
.m-page {
  color: #ffffff;
  max-width: 1320px;
  margin: auto;
  padding-bottom: 100px;
}
.m-page > .title {
  font-size: 44px;
  font-weight: 600;
  text-align: center;
  padding-top: 120px;
  color: #ffffff;
  margin-bottom: 40px;
}
.m-page > .desc {
  color: #acacac;
}
.m-page > .desc > .text {
  margin-bottom: 30px;
}
.m-page > .desc > .li > svg {
  color: #306eff !important;
  margin-right: 4px;
}
.m-page > .desc > .li {
  display: flex;
  align-items: center;
  height: 26px;
  line-height: 26px;
  margin-bottom: 2px;
}
.m-page > .desc > .li > .link {
  color: #acacac;
  font-weight: bold;
  padding-left: 6px;
  cursor: pointer;
}
.m-page > .desc > .li > .link:hover {
  color: #306eff;
}
.m-tab {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.m-tab > .item {
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item.active {
  background: #1e1e1e;
}
.m-table .other {
  font-size: 16px;
  font-weight: 700;
  color: #acacac;
  margin-bottom: 20px;
}
.m-table .other span {
  padding-left: 20px;
}

.m-table .other .input > input {
  border: 2px solid #1a1a1a;
  border-radius: 1%;
  font-size: 16px;
  width: 292px;
  height: 44px;
  padding: 0 15px;
  color: #acacac;
  font-weight: 500;
}
.m-table .other .input > input:focus {
  border-color: #306eff;
}

.m-table table {
  width: 100%;
}
.m-table table thead {
  background: #1e1e1e;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
}
.m-table table thead th:first-child,
.m-table table tbody tr > td:first-child {
  padding-left: 10px;
}
.m-table table tbody tr {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #1a1a1a;
}
.m-info {
  font-size: 16px;
  margin-bottom: 20px;
  padding-left: 20px;
}
.m-info > .title {
  font-weight: 700;
}
.m-info > .tips {
  font-weight: 500;
}
</style>
