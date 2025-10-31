<!-- 2022.12.27 样式重构 -->
<template>
  <section class="page-withdraw">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl" />
    <div class="m-title">
      {{ $t("assets.withdraw.buttonWithdraw") }}
    </div>
    <!-- 提现 -->
    <!--<header class="withdraw-header b-1-cl a-3-bd">-->
    <!--  <div class="flowingWater-nav a-3-bd">-->
    <!--    <c-navTab-->
    <!--      activeClassName="b-1-cl"-->
    <!--      activeColor="a-12-bg"-->
    <!--      className="b-2-cl"-->
    <!--      :currentTab="nowType"-->
    <!--      :navTab="navTab"-->
    <!--      lineHeight="55"-->
    <!--      @currentType="currentType"-->
    <!--    />-->
    <!--  </div>-->
    <!--</header>-->

    <template v-if="nowType === 2">
      <innerTransfer />
    </template>

    <template v-else>
      <div class="withdraw-details clearfix a-7-bd">
        <!-- 改，2022.10.01，取消外层div -->
        <!-- 改，2022.10.01，取消class="details-left"，增加style -->
        <div class="details details-1">
          <!-- 改， 2022.11.16 新增头像 -->
          <div class="details-coin">
            <div v-if="calCoinIcon" class="m-coinIcon">
              <img :src="calCoinIcon" />
            </div>
            <!-- 币种 -->
            <!-- 改，2022.11.14，新增下拉选择币种(原： <div class="symbol b-1-cl">{{ showSymbol }}</div>) -->
            <c-select
              :promptText="$t('assets.flowingWater.coin')"
              :value="symbol"
              :options="calCoinList"
              :errorHave="true"
              height="46px"
              width="100%"
              :filterable="true"
              @onChanges="symbolChange"
              :styles="{
                borderRadius: '8px',
                background: 'transparent',
              }"
            />
          </div>
          <div
            class="numberList clearfix"
            style="
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            "
          >
            <ul class="numberList-key">
              <!-- 总额 -->
              <li>{{ $t("assets.withdraw.lumpSum") }}</li>
              <!-- 可用 -->
              <li>{{ $t("assets.withdraw.Available") }}</li>
              <!-- 冻结 -->
              <li>{{ $t("assets.withdraw.freeze") }}</li>
            </ul>
            <ul class="numberList-value b-1-cl">
              <li v-for="(item, index) in detailsList" :key="index">
                {{ item.value }}
              </li>
            </ul>
          </div>
          <div class="details-warking">
            <svg class="icon icon-16" aria-hidden="true" style="marginright: 10px">
              <use xlink:href="#icon-c_2"></use>
            </svg>
            <!-- 最小提币限额 -->
            <template style="margin-left: 8px" v-if="idAuth === 1">
              {{ $t("assets.withdraw.MinimumCoinLimit") }} {{ withdrawMin }}，
            </template>
            <!-- 最大提币限额 -->
            {{ $t("assets.withdraw.MaximumCoinLimit") }} {{ withdrawMax }}
            <br />
            <div class="dayMax" style="margin-left: 8px" v-if="switchadd === 1">
              <!-- 今日提现剩余 -->
              {{ $t("assets.withdraw.dayMaximumCoinLimit") }} {{ daywithdrawMax }}
            </div>
            <!-- <span></span>小时限额 0.0000 BTC -->
          </div>
        </div>
        <div class="details details-2">
          <!-- 改，2022.10.01，取消外层div，新增style -->
          <mainChain
            :branchTip="branchTip"
            :branchArr="branchArr"
            :activeBranch="activeBranch"
            @setActiveBranch="setActiveBranch"
            style="margin-bottom: 24px"
            v-if="haveBranch"
          />
          <!-- 提币地址 -->
          <div class="address-title">
            {{ $t("assets.addressMent.listAddress") }}
          </div>
          <h-select
            :placeholder="$t('assets.withdraw.CoinAddress')"
            :value="selectVal"
            :options="addressList"
            showKey="value"
            :isFilter="true"
            :canAdded="true"
            @selectChange="optionSelected"
            style="min-width: 370px"
            class="withdraw-select"
          />
          <!-- 标签 -->
          <c-inputLine
            v-if="isHavePage"
            :errorHave="true"
            :promptText="$t('assets.withdraw.label')"
            :disabled="true"
            :value="pagesValue"
          >
            <div class="addressBox-page-icon">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_15"></use>
              </svg>
              <div class="addressBox-page-market a-4-bg">
                {{ $t("assets.withdraw.pageText") }}
              </div>
            </div>
          </c-inputLine>
          <div style="display: flex; width: 100%; justify-content: flex-end; align-items: center">
            <!-- 添加提币地址 -->
            <span class="goAddress" @click="goAddress">
              {{ $t("assets.withdraw.addAddrss") }}
            </span>
          </div>
        </div>
        <div class="details details-3">
          <!-- 提币数量 -->
          <c-inputLine
            name="numberValue"
            :errorHave="true"
            :promptText="$t('assets.withdraw.NumberOfCoins')"
            @onchanges="inputChange"
            :value="numberValue"
            :errorFlag="numberOptions.error"
            :errorText="numberOptions.text"
            class="withdraw_input_1_class"
          >
            <!-- 全部提现 -->
            <c-button type="text" height="30px" @click="allWithDraw">
              {{ $t("assets.withdraw.allWithdraw") }}
            </c-button>
          </c-inputLine>
          <!-- 矿工手续费 -->
          <c-inputLine
            name="proceduresValue"
            :errorHave="true"
            :promptText="$t('assets.withdraw.fee')"
            @onchanges="inputChange"
            :value="proceduresValue"
            :errorFlag="proceduresError"
            :errorText="$t('assets.withdraw.feeError')"
            class="withdraw_input_2_class"
          >
            <!-- 范围 -->
            <div class="ServiceSpk">
              ({{ $t("assets.withdraw.range") }}{{ feeMin }}-{{ feeMax }})
            </div>
          </c-inputLine>

          <!-- 提现按钮 -->
          <!-- 改，2022.10.01，取消marginTop -->
          <c-button
            width="100%"
            marginTop="0px"
            height="40px"
            @click="withdrawClick"
            :disabled="btnDisabled"
            >{{ $t("assets.withdraw.buttonWithdraw") }}</c-button
          >
          <!-- 改，2022.10.01，新增 -->
          <!-- 添加提币地址 -->
          <!-- <div
            style="
              display: flex;
              width: 100%;
              justify-content: flex-end;
              align-items: center;
              margin-top: 12px;
            "
          >
            <span class="goAddress" @click="goAddress">
              {{ $t("assets.withdraw.addAddrss") }}
            </span>
          </div> -->
        </div>

        <div v-if="symbol_withdraw_msg" class="withdrawMsg b-2-cl">
          <p>{{ $t("application.applyRegion.focus") }}</p>
          <p>{{ symbol_withdraw_msg }}</p>
        </div>
      </div>
    </template>
    <!-- 最近提现记录 -->
    <!--<header class="withdraw-header b-1-cl a-3-bd">-->
    <!--  &lt;!&ndash; {{ $t('assets.withdraw.RecentWithdrawalRecords') }} &ndash;&gt;-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="b-2-cl"-->
    <!--    :currentTab="nowTypeTable"-->
    <!--    :navTab="navTabTable"-->
    <!--    lineHeight="55"-->
    <!--    @currentType="currentTypeTable"-->
    <!--  />-->
    <!--</header>-->
    <div class="withdraw-table">
      <div class="m-tab">
        <div class="item">{{ $t("assets.flowingWater.WithdrawalsRecord") }}</div>
      </div>
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :subContent="subTableData"
        :subContentId="subTableDataId"
        :subColumns="subColumns"
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
    <!-- 提示框 -->
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"
    />
    <!-- 对话框  38-24=14 -->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('assets.withdraw.safetyVerification')"
    >
      <!--邮箱验证码-->
      <c-inputLine
        v-if="hasEmail"
        maxLength="6"
        name="emailValidCode"
        :value="emailValidCode"
        :promptText="$t('login.emailCode')"
        :errorHave="true"
        :errorFlag="emailError"
        :errorText="$t('login.emailCodeError')"
        @onchanges="inputChange"
      >
        <!-- 获取验证码 -->
        <c-getCode name="withdrawGetcode" @click="getCodeClick('emailCode')" />
      </c-inputLine>

      <!-- 手机号验证框 -->
      <c-inputLine
        v-if="OpenMobile && !hasEmail"
        maxLength="6"
        name="phoneValue"
        :value="phoneValue"
        :promptText="$t('assets.withdraw.phoneCode')"
        :errorHave="true"
        :errorFlag="phoneError"
        :errorText="$t('assets.withdraw.phoneCodeError')"
        @onchanges="inputChange"
      >
        <!-- 获取验证码 -->
        <c-getCode name="withdrawGetcode" @click="getCodeClick" />
      </c-inputLine>
      <!-- 谷歌验证码 -->
      <c-inputLine
        v-if="OpenGoogle"
        maxLength="6"
        name="googleValue"
        :value="googleValue"
        :promptText="$t('assets.withdraw.googleCode')"
        :errorHave="true"
        :errorFlag="googleError"
        :errorText="$t('assets.withdraw.googleCodeError')"
        @onchanges="inputChange"
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-alert
      :showFlag="notIdShowDialog"
      :buttonText="$t('otcRelease.DeCertification')"
      :imgMap="imgMap"
      @close="alertClone"
      @confirm="gotoAuth"
    >
      <div class="ts-content-text">
        {{ $t("personal.exccAuthForm.text19") }}
      </div>
    </c-alert>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/withdraw/withdraw";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/withdraw/withdraw.styl";
import mainChainMixins from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/mainChainMixins";
import { fixD, getCoinShowName } from "@/components/BlockChain-ui-privatization/utils";
import mainChain from "./mainChain.vue";
import innerTransfer from "./innerTransfer.vue";
import hSelect from "@/components/h-select.vue";

export default {
  mixins: [mixin, mainChainMixins],
  components: {
    mainChain,
    innerTransfer,
    hSelect,
    vSelect: VueSelect.VueSelect,
  },
  data() {
    return {
      symbolList: [
        // { "value": "USDZ", "code": "USDZ" },
        // { "value": "USDT", "code": "USDT" }
      ],
      selectVal: "", // 地址下拉
      addressRemark: "", // 地址备注
      routes: [],
    };
  },
  mounted() {
    this.init();
    // if (this.market) { this.addressInit(); }
    // this.setData();
    const { lan } = this.$store.state.baseData;
    this.routes = [
      {
        name: this.$t("assets.index.exchangeAccount"),
        path: `/otc/${lan}/assets/exchangeAccount`,
      },
      {
        name: this.$t("assets.withdraw.buttonWithdraw"),
      },
    ];
  },
  computed: {
    // finance/account_balance 接口返回成功的数据
    exchangeData() {
      return this.$store.state.assets.exchangeData;
    },
    // 改，2022.11.16 获取所有的币种列表
    calCoinList() {
      const { coinList } = this.market;
      const list = [];
      const exchangeData = this.exchangeData || {};
      const allCoinMap = exchangeData.allCoinMap || {};
      Object.keys(allCoinMap).forEach((item) => {
        if (allCoinMap[item].isFiat) {
          return;
        }
        if (allCoinMap[item].withdrawOpen !== 0) {
          const showCoin = getCoinShowName(item, coinList);
          list.push({ code: item, value: showCoin, icon: coinList[item].icon });
        }
      });
      return list;
    },
    // 改，2022.11.16 获取币种icon
    calCoinIcon() {
      const coinList = this.calCoinList || [];
      const symbol = this.$route.query.symbol || "";
      if (symbol) {
        const cur = coinList.find((item) => item.code == symbol) || {};
        return cur.icon || "";
      }
      return "";
    },
    // 地址标签是否可输入
    calDisablePageValue() {
      return !(!this.addressValue && this.selectVal);
    },
  },
  methods: {
    handlerChange(e) {
      this.pagesValue = e;
    },
    submitConfirm() {
      this.showConfirm = false;
      this.withdrawClick();
    },
    // 输入地址备注
    addressRemarkChange(e) {
      this.addressRemark = e;
    },
    // 选择地址
    optionSelected(e) {
      if (typeof e === "string") {
        e = { value: e };
      }
      // 确保 itemData 存在
      if (!e.itemData) {
        console.error("optionSelected: itemData is undefined", e);
        return;
      }

      // 对于手动输入的地址，如果没有code，使用value作为code
      const code = e.itemData.code || e.itemData.value || "";
      const value = e.itemData.value || "";

      this.addressValue = code;
      this.selectVal = value;
      this.pagesValue = e.itemData.pagesValue || "";

      if (code) {
        this.addressRemark = "";
      }
    },
    // 新增地址
    createOption(e) {
      if (typeof e === "string") {
        e = { value: e };
      }
      this.addressList.unshift(e);
    },
    deselected(e) {},
    // 添加提现地址
    addDialogConfirm() {
      let address = this.selectVal;
      if (this.isHavePage) {
        address += `_${this.pagesValue}`;
      }
      return this.axios({
        url: "addr/add_withdraw_addr",
        params: {
          coinSymbol: this.haveBranch ? this.activeBranch : this.symbol, // 币种
          address, // 地址
          label: this.addressRemark || this.selectVal.slice(-4), // 备注

          skip: "0", // 跳过验证
        },
      }).then((data) => {
        if (data.code.toString() !== "0") {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
          return Promise.reject();
        }
        return Promise.resolve();
      });
    },
    // 改，2022.11.14，新增切换币种change事件
    symbolChange(item) {
      this.symbol = item.code;
      const { pathname } = location;
      this.$router.replace(`${pathname}?symbol=${item.code}`);
    },
    // 上半部分 左侧数据
    initDetails() {
      const obj = this.exchangeData.allCoinMap[this.symbol];
      const normalBalance = Number(obj.normal_balance) || Number(obj.overcharge_balance);
      this.detailsList = [
        { key: "sum", value: fixD(obj.total_balance, this.showPrecision) }, // 总额
        { key: "normal", value: fixD(normalBalance, this.showPrecision) }, // 可用
        { key: "lock", value: fixD(obj.lock_balance, this.showPrecision) }, // 冻结
      ];
      this.symbol_withdraw_msg = obj.symbol_withdraw_msg || null; // 注意事项
      this.withdrawMin = fixD(obj.withdraw_min, this.showPrecision); // 最小提币额
      this.withdrawMax = fixD(obj.withdraw_max, this.showPrecision); // 最大提币额
      this.daywithdrawMax = fixD(obj.withdraw_max_day, this.showPrecision); // 单日最大提币额
      if (!this.haveBranch) {
        this.feeMin = fixD(obj.feeMin, this.showPrecision); // 最大手续费
        this.feeMax = fixD(obj.feeMax, this.showPrecision); // 最大手续费
        if (this.defaultFeeFlag) {
          this.defaultFeeFlag = false;
          this.defaultFee = `${obj.defaultFee}`;
          this.proceduresValue = `${obj.defaultFee}`; // 默认手续费
        }
      }
    },
    getBranchAddress() {
      if (this.addressLoading) {
        return;
      }
      this.addressLoading = true;
      return this.axios({
        url: "cost/Getcost",
        params: {
          symbol: this.activeBranch,
        },
      })
        .then((data) => {
          if (data.code.toString() === "0") {
            const list = [];
            const detailsList = {};
            const { userWithdrawAddrList } = data.data;
            userWithdrawAddrList.forEach((item) => {
              let value = item.address;
              let pagesValue = ""; // 新增获取标签
              if (this.isHavePage) {
                [value, pagesValue] = item.address.split("_");
              }
              list.push({
                code: `${item.id}`,
                value,
                label: item.label,
                pagesValue,
              });
              detailsList[item.id] = item;
            });
            this.feeMin = fixD(data.data.feeMin, this.branchShowPrecision); // 最大手续费
            this.feeMax = fixD(data.data.feeMax, this.branchShowPrecision); // 最大手续费
            if (this.defaultFeeFlag) {
              this.defaultFeeFlag = false;
              this.defaultFee = `${data.data.defaultFee}`;
              this.proceduresValue = `${data.data.defaultFee}`; // 默认手续费
            }
            this.branchTip = data.data.mainChainNameTip;
            this.tabelLoading = false;
            this.addressList = list;
            this.detailsAddressList = detailsList;
            return Promise.resolve();
          }
        })
        .finally(() => {
          this.addressLoading = false;
        });
    },
    // 获取提现地址
    getAddress() {
      if (this.haveBranch) {
        this.getBranchAddress();
        return;
      }
      this.axios({
        url: "addr/address_list",
        params: {
          coinSymbol: this.haveBranch ? this.activeBranch : this.symbol,
        },
      }).then((data) => {
        if (data.code.toString() === "0") {
          const list = [];
          const detailsList = {};
          const { addressList } = data.data;
          addressList.forEach((item) => {
            let value = item.address;
            if (this.isHavePage) {
              [value] = item.address.split("_");
            }
            list.push({ code: `${item.id}`, value, label: item.label });
            detailsList[item.id] = item;
          });
          this.tabelLoading = false;
          this.addressList = list;
          this.detailsAddressList = detailsList;
        }
      });
    },
  },
};
</script>

<style lang="stylus">
.withdraw_select_class {
  .input_line_content {
    background: var(--color-Input-fill) !important;
    border-radius: 8px !important;
  }
  .input_line_prompt {
    color: var(--color-2) !important
  }
  .icon-triangle-down {
    border-color: var(--color-1) !important
  }
  .input_line_inp {
    color: var(--color-1) !important
  }
}

.withdraw_input_1_class {
  .input {
    color: var(--color-1) !important
  }
  .input::placeholder {
    color: var(--color-text-secondary) !important
  }
  .common-button-text {
    color: var(--color-text-primary)
  }
}

.withdraw_input_2_class {
  .input {
    color: var(--color-1) !important
  }
  .input::placeholder {
    color: var(--color-13) !important
}
  .ServiceSpk {
    color: var(--color-13) !important
  }
}
.withdraw-select .select-options-box {
  width: 116%;
}
</style>
<style scoped>
.m-coinIcon {
  flex-shrink: 0;
  display: inline-block;
  width: 46px;
  height: 46px;
  margin-right: 10px;
}
.m-coinIcon > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.m-page {
  padding: 18px 0 0;
}
.m-info {
  min-height: 400px;
  background: #181a1f;
  box-sizing: border-box;
  padding: 0 32px 28px;
}
.withdraw-table {
  padding: 0 44px;
}
.m-tab {
  display: flex;
  align-items: center;
  height: 55px;
  padding-top: 14px;
}
.m-tab > .item {
  margin-right: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: var(--color-1);
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-ct {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 24px 82px 28px 36px;
  background: #181a1f;
}
.m-ct > .left {
  min-width: 360px;
}
.m-ct > .left > .select {
  display: flex;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 25px;
}
.m-ct > .right {
  min-width: 340px;
  margin-left: 100px;
  box-sizing: border-box;
  margin-top: 24px;
}
.m-ct > .left > .details-warking {
  margin-top: 22px;
  color: var(--color-Favorite);
}

/deep/.m-selectCoin.common-select .icon-triangle {
  border-color: #b2b2b2;
}
.m-subTitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
}
.m-showInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.m-showInfo > .txt {
  font-weight: 400;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.m-showInfo > .txt2 {
  font-weight: 400;
  font-size: 12px;
  color: var(--color-text-primary);
}
.m-tips {
  margin-top: 25px;
}
.m-tips > .title {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: var(--color-1);
  margin-bottom: 10px;
}

.m-selectTit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.m-selectTit > .tit {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
}
.m-selectTit > .link {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: var(--mainColor);
  cursor: pointer;
  user-select: none;
}
/deep/.withdraw-btn.common-button {
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
/deep/.withdraw-btn.common-button-solid-disabled .common-button-slot {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-BTN-disabled-text);
}
/deep/.withdraw-btn.common-button-solid-disabled {
  background: rgba(255, 255, 255, 0.1);
}
.m-table {
  min-height: 427px;
  background: #181a1f;
  box-sizing: border-box;
  padding: 0 32px 28px;
  position: relative;
}
.m-table::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  height: 1px;
  width: 96%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.page-recharge .recharge-details .address {
  background: #22252c;
  border-radius: 8px;
}
</style>
<style scoped>
/* 2023年5月19日 */
.m-withdraw {
  padding-top: 18px;
  position: relative;
}
.m-withdraw > .title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #e7e6e6;
  margin-bottom: 10px;
}
.m-withdraw > .title:not(:first-child) {
  margin-top: 20px;
}
.m-withdraw > .select {
  width: 400px;
  display: flex;
  align-items: center;
}
.m-withdraw > .info {
  position: absolute;
  left: 450px;
  top: 72px;
}
.m-withdraw > .info > .item {
  margin-bottom: 30px;
}
.m-withdraw > .info > .item > .txt {
  font-weight: 500;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 2;
}
.m-withdraw > .info > .item > .num {
  font-weight: 500;
  font-size: 15px;
  color: #e7e6e6;
}
/deep/.vs__dropdown-toggle {
  height: 100%;
  margin-bottom: 24px;
  background: #181a1f !important;
  border-radius: 8px;
}
/deep/.v-select:hover {
  border-color: var(--mainColor);
}
/deep/.v-select {
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
/deep/.vs__selected {
  height: 44px;
  line-height: 1;
  color: #ffffff;
  width: 358px;
  white-space: break-spaces;
  word-break: break-all;
}
/deep/.vs__search,
.vs__search:focus {
  height: 44px;
  line-height: 44px;
}
/deep/.vs__open-indicator {
  fill: #ffffff !important;
}
/deep/#vs1__listbox {
  background: #232222;
}

.m-fee /deep/.input-line-content .input-line-baseStance .input_line_inp .input-line-slot {
  top: 50%;
  transform: translateY(-50%);
}
.m-branchTip {
  color: #ffffff;
  margin-top: 14px;
  max-width: 386px;
  word-break: break-word;
  line-height: 1.4;
}
.m-title {
  margin: 0 44px;
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  padding: 40px 0;
  color: var(--color-text-primary);
}
.page-withdraw .withdraw-details .numberList .numberList-key li {
  color: var(--color-2);
}
.page-withdraw .withdraw-details .numberList .numberList-value {
  color: var(--color-1);
}
.page-withdraw .withdraw-details {
  margin: 0 44px;
  padding: 28px 24px;
  display: flex;
  gap: 60px;
  border-radius: 16px;
  border: 1px solid var(--color-Toggle);
  background: var(--color-BG);
}
.page-withdraw .withdraw-details .details {
  width: 461px;
}
.page-withdraw .withdraw-details .details.details-1 {
}
.page-withdraw .withdraw-details .details.details-1 .details-coin {
  display: flex;
}
.page-withdraw .withdraw-details .details.details-2 {
}
.page-withdraw .withdraw-details .details.details-3 {
}
/deep/.common-select .input_line_content {
  background: var(--color-Input-fill);
}
/deep/.table-head {
  color: var(--color-13);
}
.page-withdraw .withdraw-details .ServiceSpk {
  white-space: nowrap;
}
.page-withdraw /deep/.mainChain .common-select .input_line_inp {
  margin-top: 0;
}
</style>
