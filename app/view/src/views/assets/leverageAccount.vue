<template>
  <!-- 改，2022.12.08 整个页面修改样式 -->
  <section class="page-leverAccount page-account">
    <div class="m-head">
      <div class="title">{{ this.$t("assets.index.leverage") }}</div>
      <div class="m-btnGroup flex">
        <!-- <div class="btn flex deposit" @click="gotoDeposit()">
          <span class="txt">{{ $t("assets.exchangeAccount.Recharge") }}</span>
        </div>
        <div class="btn flex" @click="gotoWithdraw()">
          <span class="txt">{{ $t("assets.exchangeAccount.withdraw") }}</span>
        </div> -->
        <div class="btn flex" @click="linkTo">
          <span class="txt">{{ langTxt.txt5 }}</span>
        </div>
        <!--<div class="btn flex" @click="leverAccountClick">-->
        <!--  &lt;!&ndash;              <img height="24" :src="imgMap.icon4">&ndash;&gt;-->
        <!--  <span class="txt">{{ $t("assets.withdraw.transfer") }}</span>-->
        <!--</div>-->
        <div class="btn flex" @click="gotoTrade()">
          <!--              <img height="24" :src="imgMap.icon5">-->
          <span class="txt">{{ $t("assets.index.flowingWater") }}</span>
        </div>
      </div>
    </div>
    <div class="m-account2">
      <div class="title">{{ langTxt.txt2 }}</div>
      <div class="priceWrap">
        <span class="price">
          <template v-if="!hideInfo">
            <template v-if="+calTotalRate > 0">
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
        <span class="price2">
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
      <!-- table -->
      <div class="m-tableBox">
        <div class="m-tableHead flex">
          <div class="title">{{ $t("assets.otcAccount.ListOfFunds") }}</div>
          <div class="left flex">
            <c-inputFind
              :promptText="$t('assets.leverageAccount.find')"
              :value="findValue"
              @onchanges="findChanges"
              className="findClass"
            />
            <c-checkBox class="checkbox" :value="switchFlag" @click="switchChange" />
            <div class="hodetext">{{ $t("assets.otcAccount.HideZeroAssets") }}</div>
          </div>
        </div>
        <div
          class="m-tableWrap leverageAccount-center"
          :class="{ 'hide-smaill-account': switchFlag }"
        >
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :loading="tabelLoading"
            @elementClick="tableClick"
            :columns="columns"
            :dataList="dataListFilter"
            :cellHeight="55"
            bodyStyles="font-size: 14px;font-weight: bold;"
            :tdStyles="{ lineHeight: 1.4 }"
          />
        </div>
      </div>
    </div>
    <leverageTransfer :customList="dataList" @success="transferSuccess" />
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/leverageAccount/leverageAccount";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/leverageAccount/leverageAccount.styl";
import { getCookie } from "@/utils";
import vueCountTo from "@/components/countTo/vue-countTo.vue";
import leverageTransfer from "./leverageTransfer.vue";
import "./modules/accountCommon.styl";

export default {
  mixins: [mixin],
  components: {
    leverageTransfer,
    vueCountTo,
  },
  data() {
    return {
      hideInfo: false,
      curCoin: "USDT", // 当前稳定币
    };
  },
  computed: {
    // 改，2022.12.07 获取USDT币种数据
    calCurCion() {
      const { curCoin } = this;
      return this.dataList.find((item) => item.id === curCoin) || {};
    },
    // 改，2022.12.08 获取货币符号
    calLangLogo() {
      const { rate } = this.market;
      const lang = getCookie("lan") || "en_US";
      return rate[lang].lang_logo;
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
    // 改，2022.12.08 计算小数点位数
    calDecimalLen() {
      return (num) => {
        num += "";
        return num.split(".")[1].length;
      };
    },
    // 改，2022.12.08，提取数字
    calTotalRate() {
      let temp = this.totalRate.replace("￥", " ");
      temp = temp.replace("$", " ");
      return temp;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
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
      this.$router.push("/assets/lerverageFlowingWater");
    },
    // 2022.12.13 新增点击划转按钮显示划转弹窗
    leverAccountClick() {
      const firstItem = JSON.parse(JSON.stringify(this.dataList[0]));
      let symbol = "atomusdz";
      if (firstItem) {
        firstItem.id = JSON.parse(firstItem.id);
        symbol = firstItem.symbol;
      }
      this.$bus.$emit("coTransfer", "atomusdz");
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
/deep/.table-body td:last-child {
  white-space: nowrap;
}
/deep/.table-body td:last-child .common-button:last-of-type {
  background: var(--color-BTN-primary);
  border: none;
  margin-right: 0;
}
/deep/.table-body td:last-child .common-button:last-of-type .common-button-slot {
  color: #ffffff;
}

.m-title {
  font-size: 32px;
}
</style>
