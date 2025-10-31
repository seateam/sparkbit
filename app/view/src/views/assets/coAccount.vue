<template>
  <!-- 改，2022.12.08 整个页面修改样式 -->
  <div class="page-coAccount page-account">
    <div class="m-head">
      <div class="title">{{ $t("assets.index.coAccount") }}</div>
      <div class="m-btnGroup flex">
        <!-- <div class="btn flex deposit" @click="gotoDeposit()">
          <span class="txt">{{ $t("assets.exchangeAccount.Recharge") }}</span>
        </div>
        <div class="btn flex" @click="gotoWithdraw()">
          <span class="txt">{{ $t("assets.exchangeAccount.withdraw") }}</span>
        </div> -->
        <div class="btn flex" v-if="transStatus" @click="showFlag = true">
          <span class="txt">{{ langTxt.txt1 }}</span>
        </div>
        <div class="btn flex" @click="linkTo">
          <span class="txt">{{ langTxt.txt5 }}</span>
        </div>
      </div>
    </div>
    <div class="m-account2">
      <div class="title">{{ langTxt.txt2 }}</div>
      <div class="priceWrap">
        <span class="price">
          <template v-if="!hideInfo">
            <template v-if="+calCurCion.totalAmount > 0">
              <vue-count-to
                :decimals="6"
                :startVal="0"
                :endVal="+calCurCion.totalAmount || 0"
                :duration="3000"
              ></vue-count-to
              >USD
            </template>
            <span class="totalRateTxt" v-else>{{ totalRate }} USD</span>
          </template>
          <span v-else>******</span>
        </span>
        <span class="price2"
          >≈
          <template v-if="!hideInfo">
            <vue-count-to
              :decimals="4"
              v-if="calBTCVal(calCurCion.totalAmount) > 0"
              :startVal="0"
              :endVal="+calBTCVal(calCurCion.totalAmount)"
              :duration="3000"
            ></vue-count-to>
            <span class="totalRateTxt" v-else>{{ totalBalance }}</span> BTC
          </template>
          <span v-else>******</span>
          {{ showTotalBalanceSymbol }}
        </span>
      </div>
      <div class="wrap4 flex">
        <div class="txt flex">
          <div class="m-info">
            <span class="txt">{{ langTxt.txt3 }} USDT:</span>
            <span v-if="hideInfo">*****</span>
            <span v-else class="num">{{
              calCurCion.canUseAmount ? calFixD(calCurCion, calCurCion.canUseAmount) : "0.000"
            }}</span>
          </div>
          <div class="m-info">
            <span class="txt">{{ langTxt.txt4 }}:</span>
            <span v-if="hideInfo">*****</span>
            <span v-else class="num">{{
              calCurCion.lockAmount ? calFixD(calCurCion, calCurCion.lockAmount) : "0.000"
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="m-body">
      <div class="m-tableBox">
        <div class="m-tableHead flex">
          <div class="title">{{ $t("assets.otcAccount.ListOfFunds") }}</div>
          <div class="left flex">
            <!--<input type="checkbox" class="checkbox" v-model:value="switchFlag" @click="switchChange">-->
            <!--<div class="hodetext">{{ $t("assets.hideMinAssets") }}</div>-->
          </div>
        </div>
        <div class="m-tableWrap coAccount-center">
          <c-table
            :cellHeight="55"
            :imgMap="imgMap"
            :colorMap="colorMap"
            :loading="tabelLoading"
            :lineNumber="tableData.length"
            @elementClick="tableClick"
            :columns="columns"
            :dataList="tableData"
            bodyStyles="font-size: 14px;font-weight: bold;"
          />
        </div>
      </div>
    </div>
    <!-- 开通合约弹框 -->
    <openFutures :isShow="openFuturesDialogShow" :close="closeDialog" />
    <!--    <div class="a-7-bd">-->
    <!--      <div class="exchangeAccount-title a-3-bd">-->
    <!--        &lt;!&ndash; 合约账户 &ndash;&gt;-->
    <!--        <div class="text b-1-cl medium">{{$t('futures.coAccount.coAccount')}}</div>-->
    <!--      </div>-->
    <!--      <div class="exchangeAccount-center">-->
    <!--        &lt;!&ndash; 改，2022.11.15 修改表格字体 12 => 18 &ndash;&gt;-->
    <!--        <c-table-->
    <!--          :cellHeight='55'-->
    <!--          :imgMap="imgMap"-->
    <!--          :colorMap="colorMap"-->
    <!--          :loading="tabelLoading"-->
    <!--          :lineNumber="tableData.length"-->
    <!--          @elementClick="tableClick"-->
    <!--          :columns="columns"-->
    <!--          :dataList="tableData"-->
    <!--          bodyStyles="font-size: 14px;font-weight: bold;"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <common-transfer :symbol="symbol" :isShow="showFlag" :close="closeDialog"> </common-transfer>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/coAccount/coAccount";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/coAccount/coAccount.styl";
import vueCountTo from "@/components/countTo/vue-countTo.vue";
// 开通合约交易弹框
import openFutures from "@/components/modules/coTrade/component/openFutures.vue";
// 划转
import commonTransfer from "@/components/modules/coTrade/component/transfer.vue";
import { getCoinShowName, getCookie, fixD } from "@/utils";
import { getRate } from "@/utils/newUtils";
import "./modules/accountCommon.styl";

export default {
  mixins: [mixin],
  components: {
    openFutures,
    commonTransfer,
    vueCountTo,
  },
  data() {
    return {
      hideInfo: false,
      totalRate: "0.00", // 资产折合汇率
      totalBalance: "0.00", // 资产折合
      curCoin: "USDT", // 当前稳定币
      rate: 0, // 币对汇率
    };
  },
  mounted() {
    this.init();
    this.getRate();
  },
  computed: {
    // 改，2022.12.08 将法币转为BTC
    calBTCVal() {
      return (val) => {
        if (!val || val <= 0 || rate === 0) {
          return "0.00";
        }
        const { rate } = this; // 将返回BTC对USDT的汇率
        return (val / rate).toFixed(4);
      };
    },
    // 改，2022.12.08 获取货币符号
    calLangLogo() {
      const { rate } = this.market;
      const lang = getCookie("lan") || "en_US";
      return rate[lang].lang_logo;
    },
    showTotalBalanceSymbol() {
      let str = this.totalBalanceSymbol;
      if (this.market && this.market.coinList && this.market.coinList[this.totalBalanceSymbol]) {
        str = getCoinShowName(this.totalBalanceSymbol, this.market.coinList);
      }
      return str;
    },
    // 改，2022.12.08 获取USDT币种数据
    calCurCion() {
      return this.tabelInfoData[0] || {};
    },
    // 改，2022.12.07 新增跳转路劲获取
    linkUrl() {
      if (process.env.NODE_ENV === "development") {
        return "http://localhost:8080/ex";
      }
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.exUrl;
      }
      return {};
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
    langTxt() {
      return {
        txt1: this.$t('assets.leverageAccount.transfer'),
        txt2: this.$t('assets.otcAccount.total_asset'),
        txt3: this.$t(`assets.recharge.Available`),
        txt4: this.$t(`assets.recharge.freeze`),
        txt5: this.$t('assets.otcAccount.buy_sell'),
      };
    },
    // 改，2022.11.14 计算小数点位数
    calDecimalLen() {
      return (num) => {
        num += "";
        return num.split(".")[1].length;
      };
    },
    // 改，2022.11.14，提取数字
    calTotalRate() {
      return "0.00";
    },
    // 改，2022.12.08 处理小数点
    calFixD() {
      return (item, value) => {
        const precision = this.marginCoinInfor[item.symbol]
          ? this.marginCoinInfor[item.symbol].marginCoinPrecision
          : 0;
        return fixD(value, precision);
      };
    },
  },
  methods: {
    // 获取汇率
    async getRate() {
      this.rate = await getRate("BTC");
    },
    // 改，2022.12.07 新增跳转方法
    linkTo() {
      const link = this.linkUrl ? `${this.linkUrl}/${this.lan}/trade` : "";
      window.location.href = link;
    },
    gotoDeposit() {
      this.$router.push("/assets/recharge?symbol=USDT");
    },
    gotoWithdraw() {
      this.$router.push("/assets/withdraw?symbol=USDT");
    },
    gotoTrade() {
      this.$router.push("/assets/coFlowingWater");
    },
  },
};
</script>
<style scoped>
/* table style */
/deep/.table-body td:first-child {
  position: relative;
}
/deep/.table-body td:first-child .icon-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
}
/deep/.table-body td:first-child .icon-btn > .coinIcon > img {
  width: 28px;
  height: 28px;
}
/deep/.table-body td:first-child .text {
  margin-left: 36px;
}
/deep/.table-body td:first-child .sub-text {
  padding-left: 36px;
  margin-top: 4px;
  white-space: nowrap;
  color: #929292;
}
/deep/.table-body-bar {
  color: var(--color-1);
}
.page-account /deep/.table-head {
  background: transparent;
  padding: 0;
}
.page-account /deep/.table-head thead {
  font-size: 14px;
  font-weight: bold;
  background: var(--color-BG);
  border-radius: 4px;
}

/deep/.table-body .select-box {
  background: #ffffff;
  padding: 0;
}
/deep/.table-body .select-box .select-option:hover {
  background: rgba(252, 213, 53, 0.08);
  color: #ffffff;
}

/deep/.table-body .select-box .select-option {
  color: #000000;
}
</style>
