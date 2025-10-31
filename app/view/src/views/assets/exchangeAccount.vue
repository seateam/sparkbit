<template>
  <!-- 改，2022.12.07 整个页面修改样式 -->
  <section class="page-exchangeAccount page-account">
    <div class="m-head">
      <div class="title">
        {{
          $t("assets.index.exchangeAccount")
            ? $t("assets.index.exchangeAccount").replace("Spot", "Funding")
            : ""
        }}
      </div>
      <div class="m-btnGroup flex">
        <div class="btn flex deposit" @click="gotoDeposit()">
          <span class="txt">{{ $t("assets.exchangeAccount.Recharge") }}</span>
        </div>
        <div class="btn flex" @click="gotoWithdraw()">
          <span class="txt">{{ $t("assets.exchangeAccount.withdraw") }}</span>
        </div>
        <div class="btn flex" v-if="openContract" @click="showFlag = true">
          <span class="txt">{{ langTxt.txt1 }}</span>
        </div>
        <div class="btn flex" @click="$router.push('flowingWater')">
          <span class="txt">{{ $t("assets.index.flowingWater") }}</span>
        </div>
      </div>
    </div>
    <div class="m-account2">
      <div class="title">{{ langTxt.txt2 }}</div>
      <div class="priceWrap">
        <span class="price">
          <template v-if="!hideInfo">
            <template v-if="+totalRate > 0">
              <vue-count-to
                :decimals="calDecimalLen(calTotalRate)"
                :startVal="0"
                :endVal="+calTotalRate"
                :duration="3000"
              ></vue-count-to>
              USD
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
              v-if="totalBalance > 0"
              :startVal="0"
              :endVal="+totalBalance"
              :duration="3000"
            ></vue-count-to>
            <span class="totalRateTxt" v-else>{{ totalBalance }}</span>
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
            <span v-else class="num">{{ calCurCion.data ? calCurCion.data[2] : "0.000" }}</span>
          </div>
          <div class="m-info">
            <span class="txt">{{ langTxt.txt4 }}:</span>
            <span v-if="hideInfo">*****</span>
            <span v-else class="num">{{ calCurCion.data ? calCurCion.data[3] : "0.000" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-body">
      <div class="m-tableBox">
        <div class="m-tableHead flex">
          <div class="title">{{ $t("assets.exchangeAccount.ListOfFunds") }}</div>
          <div class="left flex">
            <c-inputFind
              :promptText="$t('assets.exchangeAccount.SearchCurrency')"
              :value="findValue"
              @onchanges="findChanges"
              className="findClass"
            />
            <c-checkBox class="checkbox" :value="switchFlag" @click="switchChange" />
            <label for="switchFlag" class="hodetext">{{ $t("assets.hideMinAssets") }}</label>
          </div>
        </div>
        <div
          class="m-tableWrap exchangeAccount-center"
          :class="{ 'hide-smaill-account': switchFlag }"
        >
          <c-table
            :loading="tabelLoading"
            :imgMap="imgMap"
            :colorMap="colorMap"
            :lineNumber="tabelLength"
            @elementClick="tableClick"
            :columns="columns"
            :dataList="tableData"
            class="exchangeAccount_table"
            bodyStyles="font-size: 14px;font-weight: bold;"
            :useDataWidth="switchFlag"
          />
        </div>
      </div>
    </div>
    <c-alert
      :showFlag="isShowDialog"
      :buttonText="$t('otcRelease.DeCertification')"
      :imgMap="imgMap"
      @close="dialogClose"
      @confirm="gotoAuth"
    >
      <div class="ts-content-text">
        {{ $t("personal.exccAuthForm.text19") }}
      </div>
    </c-alert>
    <exchange-transfer :symbol="symbol" :isShow="showFlag" :close="closeDialog">
    </exchange-transfer>
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/exchangeAccount/exchangeAccount";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/exchangeAccount/exchangeAccount.styl";
import Button from "@/components/BlockChain-ui-privatization/PC/components/button/Button.vue";
// 改，2022.11.14， 增加数字滚动动画组件
import vueCountTo from "@/components/countTo/vue-countTo.vue";
import Title from "@/views/otcDetailOrder/title";
import exchangeTransfer from "@/components/modules/coTrade/component/transfer.vue";
import "./modules/accountCommon.styl";
import { myStorage } from "@/components/BlockChain-ui-privatization/utils";

export default {
  mixins: [mixin],
  components: {
    Title,
    Button,
    vueCountTo,
    exchangeTransfer,
  },
  data() {
    return {
      hideInfo: false,
      dataListHide: [],
      searchListResultHide: [],
      curCoin: "USDT", // 当前稳定币
      // 改，2022.12.12 新增划转相关参数
      showFlag: false, // 是否显示弹窗
      symbol: "USDT", // 划转货币
      openContract: true,
    };
  },
  computed: {
    // 改，2022.12.07 获取USDT币种数据
    calCurCion() {
      const { curCoin } = this;
      return this.dataList.find((item) => item.id === curCoin) || {};
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
        txt1: this.$t("assets.leverageAccount.transfer"),
        txt2: this.$t("assets.otcAccount.total_asset"),
        txt3: this.$t(`assets.recharge.Available`),
        txt4: this.$t(`assets.recharge.freeze`),
      };
    },
    tableData() {
      if (this.search) {
        if (!this.hideInfo) {
          return this.searchListResult;
        }
        return this.searchListResultHide;
      }
      if (!this.hideInfo) {
        return this.dataList;
      }
      return this.dataListHide;
    },
    // 改，2022.11.14 计算小数点位数
    calDecimalLen() {
      return (num) => {
        num += "";
        return num.split(".")[1].length;
      };
    },
  },
  watch: {
    dataList(data) {
      if (data) {
        const dataListHide_temp = [];

        for (const item of data) {
          const tempData = JSON.parse(JSON.stringify(item));
          tempData.data[1] = "******";
          tempData.data[2] = "******";
          tempData.data[3] = "******";
          tempData.data[4] = "******";

          dataListHide_temp.push(tempData);
        }

        this.dataListHide = dataListHide_temp;
      }
    },
    searchListResult(data) {
      if (data) {
        const dataListHide_temp = [];

        for (const item of data) {
          const tempData = JSON.parse(JSON.stringify(item));
          tempData.data[1] = "******";
          tempData.data[2] = "******";
          tempData.data[3] = "******";
          tempData.data[4] = "******";

          dataListHide_temp.push(tempData);
        }

        this.searchListResultHide = dataListHide_temp;
      }
    },
    // 改，2022-11-14 侦听显示与隐藏，重启动画
    hideInfo(v) {
      const refArr = this.$refs.amountCount;
      if (!v && refArr && Array.isArray(refArr)) {
        for (let i = 0; i < refArr.length; i++) {
          refArr[i].start && refArr[i].start();
        }
      }
    },
  },
  mounted() {
    this.init();
    // this.getContractConfig();
    // 改，2022.12.13 需要获取合约模块数据
    this.$store.dispatch("getFutorePublicInfo");
    this.$store.dispatch("getUserConfig");
  },
  methods: {
    // 获取用户合约设置
    getContractConfig() {
      this.axios({
        url: "user/get_user_config",
        headers: {},
        params: {
          contractId: myStorage.get("contractId"),
        },
        method: "post",
        hostType: "co",
      }).then((res) => {
        this.openContract = res.data ? !!res.data.openContract : true;
      });
    },
    // 改，2022.12.12 新增关闭划转弹窗
    closeDialog(data) {
      if (data) {
        this.init();
      }
      // // 关闭开通合约交易弹框
      this.showFlag = false;
    },
    linkTo() {
      const link = this.linkUrl ? `${this.linkUrl}/${this.lan}/trade` : "";
      window.location.href = link;
    },
    gotoDeposit() {
      this.$router.push("/assets/recharge?symbol=USDT");
    },
    gotoWithdraw() {
      // 改，2022.11.16 少了 "/"
      this.$router.push("/assets/withdraw?symbol=USDT");
    },
    // 改，2022.12.07 新增跳转方法
    gotoTrade() {
      this.$router.push("/assets/flowingWater");
    },
  },
};
</script>

<style lang="stylus">
.exchangeAccount_table {
  .coinBox {
    margin-left: 0px !important;
    margin-right: 12px;
  }
  img {
    // 改，2022.12.02，36px -> 24px
    width: 24px;
    height: 24px;
  }
}
.goTrade {
  padding: 8px 10px;
  border-radius: 100px;
  background: var(--color-BTN-primary);
  white-space: nowrap;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: var(--color-text-secondary);
}
.page-exchangeAccount .tableNownStyle {
  background transparent;
}
.page-exchangeAccount .tableNownStyle.common-button,
.page-exchangeAccount .tableNownStyle.noTrade {
  // padding: 0 !important;
  cursor: not-allowed;
}
.page-exchangeAccount .tableNownStyle .common-button-slot {
    color: #929292 !important;
    cursor: default;
}
</style>
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
  background: var(--color-BG);
}
.page-account /deep/.table-head thead {
  font-size: 14px;
  font-weight: bold;
  background: var(--color-BG);
  border-radius: 4px;
}

/deep/.table-body .select-box {
  background: var(--color-BG-Light);
  color: var(--color-text-primary);
  padding: 6px;
  border-radius: 4px;
  margin-top: 10px;
}
/deep/.table-body .select-box .select-option:hover {
  background-color: var(--color-Input-border) !important;
}

/deep/.table-body .select-box .select-option {
  color: var(--color-text-primary);
  border-radius: 4px;
}

/*/deep/.table-body td:last-child > div {*/
/*  width: 100%;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  flex-wrap: nowrap;*/
/*}*/
/*/deep/.table-body td:last-child {*/
/*  width: 100%;*/

/*}*/
/deep/.table-body td:last-child {
  white-space: nowrap;
}
/deep/.common-button {
  padding: 0 20px;
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
}
/deep/.common-button .common-button-slot {
  color: var(--color-text-primary);
  text-align: right;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
}
/deep/.table-body .t-select .icon-btn {
  border: transparent !important;
}
</style>
