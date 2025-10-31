<template>
  <!-- 改，2022.12.08 整个页面修改样式 -->
  <section class="page-otcAccount page-account">
    <div class="m-head">
      <div class="title">{{ $t("assets.index.otcAccount") }}</div>
      <div class="m-btnGroup flex">
        <!-- <div class="btn flex deposit" @click="gotoDeposit()">
          <span class="txt">{{ $t("assets.exchangeAccount.Recharge") }}</span>
        </div>
        <div class="btn flex" @click="gotoWithdraw()">
          <span class="txt">{{ $t("assets.exchangeAccount.withdraw") }}</span>
        </div> -->
        <div class="btn flex" @click="dialogFlag = true">
          <span class="txt">{{ langTxt.txt1 }}</span>
        </div>
        <div class="btn flex" @click="linkTo">
          <span class="txt">{{ langTxt.txt5 }}</span>
        </div>
      </div>
    </div>
    <div class="m-account2">
      <div class="title">{{ $t("assets.otcAccount.total_asset") }}</div>
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
            <span class="totalRateTxt" v-else>{{ totalRate }} USD </span>
          </template>
          <span v-else>******</span>
        </span>
        <span class="price2"
          >≈
          <template v-if="!hideInfo">
            <vue-count-to
              :decimals="8"
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
            <span v-else class="num">{{ calCurCion.data ? calCurCion.data[1] : "0.000" }}</span>
          </div>
          <div class="m-info">
            <span class="txt">{{ langTxt.txt4 }}:</span>
            <span v-if="hideInfo">*****</span>
            <span v-else class="num">{{ calCurCion.data ? calCurCion.data[2] : "0.000" }}</span>
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
              :promptText="$t('assets.otcAccount.SearchCurrency')"
              :value="findValue"
              @onchanges="findChanges"
              className="findClass"
            />
            <c-checkBox class="checkbox" :value="switchFlag" @click="switchChange" />
            <div class="hodetext">{{ $t("assets.hideMinAssets") }}</div>
          </div>
        </div>
        <div class="m-tableWrap otcAccount-center">
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :loading="tabelLoading"
            @elementClick="tableClick"
            :columns="columns"
            :dataList="dataListFilter"
            :cellHeight="55"
            bodyStyles="font-size: 14px;font-weight: bold;"
          />
        </div>
      </div>
    </div>
    <!-- 资金划转弹窗 -->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('assets.otcAccount.CapitalTransfer')"
    >
      <section class="transfer-box">
        <c-select
          :promptText="$t('futures.transfer.coin')"
          :value="symbol"
          :options="calCoinList"
          :errorHave="true"
          width="100%"
          @onChanges="symbolChange"
        />
        <!-- 方向 -->
        <ul class="transfer-content">
          <li class="transfer-page">
            <!-- 从 -->
            <div class="transfer-page-side">{{ $t("assets.otcAccount.from") }}</div>
            <div class="transfer-page-name b-1-cl">{{ side.from }}</div>
          </li>
          <li class="transfer-icon" @click="setTransferSide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
            >
              <path
                d="M7.2 19.5L5.52 17.8078L8.61 14.75H0V12.375H8.61L5.52 9.31719L7.2 7.625L13.2 13.5625L7.2 19.5ZM16.8 12.375L10.8 6.4375L16.8 0.5L18.48 2.19219L15.39 5.25H24V7.625H15.39L18.48 10.6828L16.8 12.375Z"
                fill="#928BFF"
              />
            </svg>
          </li>
          <li class="transfer-page">
            <!-- 划转到 -->
            <div class="transfer-page-side">{{ $t("assets.otcAccount.to") }}</div>
            <div class="transfer-page-name b-1-cl">{{ side.to }}</div>
          </li>
        </ul>
        <!-- 划转数量 -->
        <c-inputLine
          name="transferValue"
          :value="transferValue"
          :promptText="$t('assets.otcAccount.volume')"
          :errorHave="true"
          :errorFlag="transferError"
          :errorText="$t('assets.otcAccount.volumeError')"
          :warningText="transferWarningText"
          @onchanges="inputLineChange"
          class="transfer_input_class"
        >
          <!-- 全部 -->
          <c-button class="btn-all" type="text" height="30px" @click="allTransfer">
            {{ $t("assets.otcAccount.all") }}
          </c-button>
        </c-inputLine>
      </section>
    </c-dialog>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/otcAccount/otcAccount";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/otcAccount/otcAccount.styl";
import vueCountTo from "@/components/countTo/vue-countTo.vue";
import { getCoinShowName } from "@/utils";
import "./modules/accountCommon.styl";

export default {
  mixins: [mixin],
  components: { vueCountTo },
  data() {
    return {
      hideInfo: false,
      curCoin: "USDT",
      // 改，2022.12.12 新增划转相关
      symbol: "",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    // 改，2022.12.12 新增下拉数据转换
    calCoinList() {
      //  let dataList = this.dataListFilter;
      let dataList = this.dataList; // 使用原始数据而非过滤后的数据
      dataList = dataList
        .map((item) => JSON.parse(item.id))
        .map((item) => ({
          value: item.coinSymbol,
          code: item.coinSymbol,
          data: JSON.stringify(item),
        }));
      return dataList || [];
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
      const { curCoin } = this;
      return this.dataList.find((item) => item.data[0][1].text === curCoin) || {};
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
        txt5: this.$t("assets.otcAccount.buy_sell"),
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
      let temp = this.totalRate.replace("￥", " ");
      temp = temp.replace("$", " ");
      return temp;
    },
  },
  methods: {
    symbolChange(e) {
      this.transferObj = JSON.parse(e.data);
      this.symbol = e.value;
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
      // 改，2022.11.16 少了 "/"
      this.$router.push("/assets/withdraw?symbol=USDT");
    },
    gotoTrade() {
      this.$router.push("/assets/otcFlowingWater");
    },
  },
};
</script>

<style lang="stylus">
.transfer_input_class {
  .input-line-baseStance {
    background: var(--color-Input-fill) !important;
  }
  .input {
    color: var(--color-1) !important
  }
  .input::placeholder {
    color: var(--color-1) !important
  }
  .common-button-text {
    color: var(--color-1)
  }

  /* 验证 */
  .common-geetest-baseStance {
    background: var(--color-Input-fill) !important;
  }
  .geetest_radar_btn {
    background: var(--color-Input-fill) !important;
  }
  .geetest_success_btn {
    background: var(--color-Input-fill) !important;
  }
}

/* 选择器 */
.transfer_select_class {
  .input_line_content {
    background: var(--color-Input-fill) !important;
  }
  .input_line_prompt {
    color: var(--color-1) !important
  }
  .icon-triangle-down {
    border-color: #ffffff !important
  }
  .input_line_inp {
    color: var(--color-1) !important
  }
}
</style>
<style scoped>
/*********************************************/
.page-otcAccount .otcAccount-center /deep/.table-head {
  background: transparent;
}
.page-otcAccount .otcAccount-center /deep/.table-head thead {
  font-size: 14px;
  font-weight: bold;
  background: var(--color-BG);
  border-radius: 4px;
}
.m-tableWrap /deep/.common-button .common-button-slot {
  /* color: var(--mainColor); */
}
/deep/.table-body-bar {
  color: #ffffff;
}
/deep/.table-body .select-box {
  background: #ffffff;
}
/deep/.table-body .select-box .select-option:hover {
  background: rgba(252, 213, 53, 0.08);
}
.transfer-box /deep/.input-line-content .input-line-errorStence {
  margin-top: 4px;
}
/deep/.common-button.btn-all .common-button-slot {
  color: var(--color-Icon);
  font-size: 14px;
  font-style: normal;
  line-height: 18px;
}
</style>
