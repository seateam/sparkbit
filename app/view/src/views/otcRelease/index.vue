<template>
  <section class="page-otcRelease">
    <c-Breadcrumb :routes="routes"/>
    <!-- <div class="otc-page-title a-5-bg a-7-bd">
      <div class="page-title-bar b-1-cl">
        {{ $t("fiatdeal.navList")[6] }}
      </div>
    </div> -->
    <div class="page-otcRelease-coneent m-ct">
      <vue-scroll>
        <div class="page-otcRelease-bar">
          <!-- 选择币种 -->
          <div class="otcRelease-symbolNav">
            <!-- 2023.01.06 修改tab样式 -->
            <div class="m-tab">
              <div
                class="item"
                v-for="item in navSymbolList"
                :key="item.index"
                @click="symbolChange(item)"
                :class="{ active: item.index == symbol }"
              >
                {{ item.name }}
              </div>
            </div>
            <!--<c-navTab-->
            <!--  activeClassName="b-1-cl"-->
            <!--  activeColor="a-12-bg"-->
            <!--  className="b-2-cl"-->
            <!--  :currentTab="symbol"-->
            <!--  :navTab="navSymbolList"-->
            <!--  lineHeight="40"-->
            <!--  marginRight="64"-->
            <!--  @currentType="symbolChange"-->
            <!--/>-->
          </div>
          <!-- 介绍 -->
          <div class="otcRelease-message">
            <!-- 发布一个交易广告 -->
            <div class="otcRelease-message-title b-1-cl">
              {{ $t("otcRelease.title") }}
              -
              {{ showCoin }}
            </div>
            <div class="otcRelease-message-text">
              <div>{{ $t("otcRelease.text1") }}</div>
              <div>{{ $t("otcRelease.text2") }}</div>
              <div>{{ $t("otcRelease.text3") }}</div>
              <div>{{ $t("otcRelease.text4") }}</div>
              <!--{{ $t("otcRelease.text5") }}-->
            </div>
            <!--<img class="img" :src="otcReleaseBg" />-->
          </div>
          <!-- 主体 -->
          <div class="otcRelease-main">
            <!-- 广告类型  出售/购买 -->
            <div class="otcRelease-side">
              <span
                class="otcRelease-side-even otcRelease-side-first"
                :class="{ active: side === 'SELL' }"
              >
                <!-- 出售 -->
                <span class="text" @click="sideChange('SELL')">
                  {{ $t("otcRelease.sell") }}
                </span>
              </span>
              <span class="otcRelease-side-even" :class="{ active: side === 'BUY' }">
                <!-- 购买 -->
                <span class="text" @click="sideChange('BUY')">
                  {{ $t("otcRelease.buy") }}
                </span>
              </span>
            </div>
            <!-- 法币类型 -->
            <div class="otcRelease-legalCurrency">
              <div class="otcRelease-label">{{ $t("otcRelease.currency") }}</div>
              <c-select
                :value="legalCurrency"
                :promptText="$t('otcRelease.currency')"
                @onChanges="legalCurrencyChange"
                name="legalCurrency"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.currencyError')"
                :options="legalCurrencyList"
              />
            </div>
            <!-- 数量 -->
            <div class="otcRelease-number">
              <div class="otcRelease-label">{{ $t("otcRelease.volume") }}</div>
              <c-inputLine
                name="number"
                :value="number"
                :promptText="$t('otcRelease.volume')"
                :errorHave="true"
                :errorText="numberObj.errorText"
                :errorFlag="numberObj.errorFlag"
                @onchanges="inputLineChange"
              >
                <span class="otcRelease-input-page b-1-cl">{{ showCoin }}</span>
              </c-inputLine>
              <div class="m-referencePrice">
                <div class="price">
                  <span class="txt">{{ $t("otcRelease.CurrentUnitPrice") }}:</span>
                  <span class="num">{{ nowPrice }} {{ legalCurrency }}</span>
                </div>
                <div class="price">
                  <span class="txt">{{
                    side === "SELL" ? $t("otcRelease.Surplus") + ":" : ""
                  }}</span>
                  <span class="num"
                    >{{ side === "SELL" ? (otcRateFlag ? blance : numberValue) + showCoin : "" }}
                    {{ legalCurrency }}</span
                  >
                </div>
              </div>
            </div>
            <!-- 当前单价 -->
            <!--<div class="otcRelease-NowPrice">-->
            <!--  <div class="otcRelease-page otcRelease-NowPrice-side">-->
            <!--    {{ $t("otcRelease.CurrentUnitPrice") }}-->
            <!--    <a class="des-icon" href="javascript:;">-->
            <!--      <svg class="icon icon-14" aria-hidden="true">-->
            <!--        <use xlink:href="#icon-a_15"></use>-->
            <!--      </svg>-->
            <!--      <span class="a-8-bg b-2-cl">-->
            <!--        {{ $t("otcRelease.des") }}-->
            <!--      </span>-->
            <!--    </a>-->
            <!--  </div>-->
            <!--  <div class="otcRelease-NowPrice-message">-->
            <!--    <span class="price b-1-cl">{{ nowPrice }} {{ legalCurrency }}</span>-->
            <!--    &lt;!&ndash; 参考网址 &ndash;&gt;-->
            <!--    &lt;!&ndash;                <span class="address">-->
            <!--      ({{ $t('otcRelease.ReferenceWebSite') }}-->
            <!--      <a class="b-4-cl" target="_blank" :href="rateUrl">{{rateUrl}}</a>)-->
            <!--    </span>&ndash;&gt;-->
            <!--  </div>-->
            <!--</div>-->
            <!-- 定价方式 -->
            <div class="otcRelease-pricingMethod">
              <div class="otcRelease-label">{{ $t("otcRelease.PricingMethod") }}</div>
              <c-select
                :value="pricingMethod"
                :promptText="$t('otcRelease.PricingMethod')"
                @onChanges="pricingMethodChange"
                name="pricingMethod"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.PricingMethodError')"
                :options="pricingMethodList"
              />
            </div>
            <!--溢价方向-->
            <div class="otcRelease-pricingMethod precent" v-if="pricingMethod === '1'">
              <div class="otcRelease-label">{{ $t("otcRelease.precentWay") }}</div>
              <c-select
                :value="pricentMethod"
                :promptText="$t('otcRelease.precentWay')"
                @onChanges="precentMethodChange"
                name="precentMethod"
                :errorHave="false"
                :errorFlag="false"
                :options="pricentMethodList"
              />
            </div>
            <!--溢价百分比-->
            <div class="otcRelease-minPrice precentInput" v-if="pricingMethod === '1'">
              <div class="otcRelease-label">{{ $t("otcRelease.precent") }}</div>
              <c-inputLine
                name="precent"
                :value="precent"
                :errorHave="true"
                :errorFlag="precentObj.errorFlag"
                :errorText="precentObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.precent')"
              >
                <span class="otcRelease-input-page">%</span>
              </c-inputLine>
            </div>

            <!-- 自定义价格 -->
            <div class="otcRelease-autoPrice" v-if="pricingMethod === '2'">
              <div class="otcRelease-label">{{ $t("otcRelease.CustomPrice") }}</div>
              <c-inputLine
                name="autoPrice"
                :value="autoPrice"
                :errorHave="true"
                :errorFlag="autoPriceObj.errorFlag"
                :errorText="autoPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.CustomPrice')"
              >
                <span class="otcRelease-input-page">{{ legalCurrency }}</span>
              </c-inputLine>
            </div>

            <div>
              <!-- 单价 -->
              <div class="otcRelease-sum MessPrice" v-if="pricingMethod === '1'">
                <div class="otcRelease-page">{{ $t("otcDetailOrder.MessPrice") }}:</div>
                <div class="otcRelease-sum-price b-1-cl">
                  {{ precentPrice }} {{ legalCurrency }}
                </div>
              </div>
              <!-- 总金额 -->
              <div class="otcRelease-sum">
                <div class="otcRelease-page">{{ $t("otcRelease.TotalSum") }}:</div>
                <div class="otcRelease-sum-price b-1-cl">{{ sum }} {{ legalCurrency }}</div>
              </div>
            </div>
            <!-- 最小限额 -->
            <div class="otcRelease-minPrice">
              <div class="otcRelease-label">{{ $t("otcRelease.MinimumQuota") }}</div>
              <c-inputLine
                name="minPrice"
                :value="minPrice"
                :errorHave="true"
                :errorFlag="minPriceObj.errorFlag"
                :errorText="minPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MinimumQuota')"
              >
                <span class="otcRelease-input-page">{{ legalCurrency }}</span>
              </c-inputLine>
            </div>
            <!-- 最大限额 -->
            <div class="otcRelease-maxPrice">
              <div class="otcRelease-label">{{ $t("otcRelease.MaximumQuota") }}</div>
              <c-inputLine
                name="maxPrice"
                :value="maxPrice"
                :errorHave="true"
                :errorFlag="maxPriceObj.errorFlag"
                :errorText="maxPriceObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MaximumQuota')"
              >
                <span class="otcRelease-input-page">{{ legalCurrency }}</span>
              </c-inputLine>
            </div>
            <!-- 付款时限 -->
            <div class="otcRelease-tradeTime">
              <div class="otcRelease-label">{{ $t("otcRelease.TimeLimitForPayment") }}</div>
              <c-inputLine
                name="tradeTime"
                :value="tradeTime"
                :errorHave="true"
                :errorFlag="tradeTimeObj.errorFlag"
                :errorText="tradeTimeObj.errorText"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.TimeLimitForPayment')"
              >
                <!-- 分钟 -->
                <span class="otcRelease-input-page">{{ $t("otcRelease.min") }}</span>
              </c-inputLine>
            </div>
            <!-- 对方最少交易次数 -->
            <div class="otcRelease-frequency">
              <div class="otcRelease-label">{{ $t("otcRelease.MinimumNumber") }}</div>
              <c-inputLine
                name="frequency"
                :value="frequency"
                :errorHave="true"
                @onchanges="inputLineChange"
                :promptText="$t('otcRelease.MinimumNumber')"
              >
                <!-- 次 -->
                <span class="otcRelease-input-page">{{ $t("otcRelease.frequency") }}</span>
              </c-inputLine>
            </div>
            <!-- 失效时间 -->
            <div class="otcRelease-days">
              <div class="otcRelease-label">{{ $t("otcRelease.FailureTime") }}</div>
              <c-select
                :value="days"
                :promptText="$t('otcRelease.FailureTime')"
                @onChanges="daysChange"
                name="days"
                :errorHave="true"
                :errorFlag="false"
                :errorText="$t('otcRelease.FailureTimeError')"
                :options="daysList"
              />
            </div>
            <!-- 支付方式 -->
            <div class="otcRelease-pays" v-if="side === 'BUY'">
              <div class="otcRelease-page">
                <!-- 支付方式 -->
                {{ $t("otcRelease.PaymentMethod") }}
                <!-- 最多可选择3种付款方式 -->
                ({{ $t("otcRelease.PaymentMethodWarning") }})
              </div>
              <ul class="otcRelease-paysList">
                <li v-for="(item, index) in buyPaysList" :key="index">
                  <c-checkBox
                    @click="buyPayClick(item)"
                    :value="myBuyPaysList.indexOf(item.key) !== -1"
                  />
                  <!-- <span class="paysList-icon" @click="buyPayClick(item)">
                    <img :src="item.icon">
                  </span> -->
                  <c-otcPayIcon @click="buyPayClick(item)" :imgUrl="item.icon" />
                  <span class="paysList-text" @click="buyPayClick(item)">{{ item.title }}</span>
                </li>
              </ul>
            </div>
            <!-- 收款方式 -->
            <div class="otcRelease-pays" v-if="side === 'SELL'">
              <!-- 收款方式 -->
              <div class="otcRelease-page">
                {{ $t("otcRelease.Receivables") }}
                <!-- 可选择多种收款方式 -->
                ({{ $t("otcRelease.ReceivablesWarning") }})
              </div>
              <ul class="otcRelease-paysList" v-if="sellPaysList.length">
                <li v-for="(item, index) in sellPaysList" :key="index">
                  <c-checkBox
                    @click="sellPayClick(item)"
                    :value="mySellPaysList.indexOf(item.payment) !== -1"
                  />
                  <!-- <span class="paysList-icon" @click="sellPayClick(item)">
                    <img :src="item.icon">
                  </span> -->
                  <c-otcPayIcon @click="sellPayClick(item)" :imgUrl="item.icon" />
                  <span @click="sellPayClick(item)" class="paysList-text">{{ item.title }}</span>
                </li>
              </ul>
              <!-- 您还没有收款方式，请前往个人中心设置 -->
              <div class="noPay b-4-cl" @click="goNoPay" v-else>
                {{ $t("otcRelease.PaymentError") }}
              </div>
            </div>
            <!-- 自动回复 -->
            <!--<c-textAreaLine-->
            <!--  name="reply"-->
            <!--  maxLength="500"-->
            <!--  marginTop="20px"-->
            <!--  width="380px"-->
            <!--  :value="reply"-->
            <!--  :errorHave="true"-->
            <!--  @onchanges="inputLineChange"-->
            <!--  :warningText="`${reply.length}/500`"-->
            <!--  :promptText="$t('otcRelease.AutomaticRecovery')"-->
            <!--/>-->
            <c-inputLine
              name="reply"
              :value="reply"
              max-length="500"
              :errorHave="true"
              @onchanges="inputLineChange"
              :promptText="$t('otcRelease.AutomaticRecovery')"
              style="margin-top: 12px"
            >
              <span class="m-inputTips">{{ `${reply.length}/500` }}</span>
            </c-inputLine>
            <!-- 广告留言 -->
            <c-inputLine
              name="leavingText"
              :value="leavingText"
              max-length="500"
              :errorHave="true"
              @onchanges="inputLineChange"
              :promptText="$t('otcRelease.AdvertisingMessage')"
              style="margin-top: 12px"
            >
              <span class="m-inputTips">{{ `${leavingText.length}/500` }}</span>
            </c-inputLine>
            <!-- 广告留言 -->
            <!--<c-textAreaLine-->
            <!--  name="leavingText"-->
            <!--  maxLength="500"-->
            <!--  marginTop="30px"-->
            <!--  width="380px"-->
            <!--  :value="leavingText"-->
            <!--  :errorHave="true"-->
            <!--  @onchanges="inputLineChange"-->
            <!--  :warningText="`${leavingText.length}/500`"-->
            <!--  :promptText="$t('otcRelease.AdvertisingMessage')"-->
            <!--/>-->
            <c-otcReminder />
            <div class="m-center">
              <c-button
                type="solid"
                paddingW="24px"
                height="52px"
                width="184px"
                @click="confirm"
                :loading="confirmLoading"
                :disabled="confirmDisabled"
                marginTop="20px"
                class-name="m-submit"
              >
                {{ $t("replenish.otcRelease.PlaceOrder") }}
              </c-button>
            </div>
            <c-dialog
              :showFlag="successDialogFlag"
              :titleText="$t('otcRelease.Reminder')"
              @confirm="successDialogConfirm"
              @close="successDialogClose"
              :confirmText="$t('otcRelease.AnotherOne')"
              :closeText="$t('otcRelease.goHall')"
            >
              <!-- 恭喜您，广告发布成功。 -->
              <div class="success-dialog">{{ $t("otcRelease.success") }}</div>
            </c-dialog>
          </div>
          <c-verifyCationc-alert
            :showFlag="jurisdictionObj.flag"
            :imgMap="imgMap"
            :titleText="$t('otcRelease.SafetyTips')"
            :detaText="jurisdictionObj.str"
            :dataList="jurisdictionObj.data"
            :buttonText="jurisdictionObj.btnText"
            @confirm="alertConfirm"
            @close="alertClose"
          />
        </div>
      </vue-scroll>
    </div>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/otcRelease/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/otcRelease/index/index.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  computed: {
    // 当前类别
    calCurType() {
      const { navTab, nowType } = this;
      if (navTab && nowType) {
        return navTab.find((item) => nowType === item.index) || {};
      }
      return {};
    },
  },
};
</script>
<style scoped>
.page-otcRelease {
  background: var(--color-BG);
  overflow: hidden;
  padding: 20px 280px 40px;
}
/* 2022.12.28 样式修改 */
.page-otcRelease .otcRelease-path {
  display: flex;
  align-items: center;
  width: 82.39vw;
  margin-inline: auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--color-text-secondary);
}
.page-otcRelease .otcRelease-path .arrow {
  display: block;
  width: 5px;
  height: 5px;
  margin-inline: 4px 6px;
  border: 2px solid var(--color-text-secondary);
  border-left: transparent;
  border-top: transparent;
  transform: rotate(-45deg);
}
.page-otcRelease .otcRelease-path span:last-child {
  color: var(--color-text-primary);
}
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  color: var(--color-text-secondary);
}
.m-tab > .item {
  margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  height: 55px;
  line-height: 55px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}

.m-tab > .item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -0.5px;
  width: 0;
  height: 3px;
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.m-tab > .item.active {
  color: var(--color-text-primary);
}
.m-tab > .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 24px 100%
    no-repeat;
}
.otcRelease-label {
  color: var(--color-text-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 12px;
}

.page-otcRelease .otcRelease-message {
  border-bottom-width: 0;
  position: relative;
}
.page-otcRelease .otcRelease-message .otcRelease-message-title {
  color: var(--color-text-primary);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.page-otcRelease .otcRelease-message .otcRelease-message-text {
  color: var(--color-text-secondary);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.page-otcRelease .otcRelease-message > .img {
  width: 191px;
  height: 168px;
  position: absolute;
  right: 78px;
  top: 50%;
  transform: translateY(-50%);
}
.page-otcRelease .otcRelease-main {
  padding: 28px 28px 40px;
  width: 680px;
  margin: auto;
  border-radius: 12px;
  background: var(--color-BG-Light, #121212);
}
.page-otcRelease .otcRelease-main > div,
.page-otcRelease .otcRelease-main > section {
  margin-inline: 20px;
}
.page-otcRelease .otcRelease-main > section {
  width: calc(100% - 40px) !important;
}
/* 修改表单样式 */
/deep/.common-select .input_line_content,
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-input-fill-on-light-bg) !important;
  border-radius: 8px !important;
  border-color: var(--color-Input-border) !important;
}

/deep/.common-select .icon-triangle {
  border-color: var(--color-text-primary) !important;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}
.page-otcRelease .noPay {
  color: var(--mainColor);
}
/deep/.m-submit.common-button {
  width: 184px !important;
  height: 52px !important;
  line-height: 52px;
  margin: auto;
  font-weight: 600;
  border-radius: 100px;
  background: var(--color-BTN-primary);
  color: var(--color-BTN-primary-text);
}
/deep/.m-submit.common-button.common-button-solid-disabled {
  background: var(--color-BTN-disabled-bg);
  color: var(--color-BTN-disabled-text);
}
.m-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.otcRelease-pays {
  margin-bottom: 12px;
}
.m-inputTips {
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
}
/deep/.input-line-content .input-line-baseStance .input_line_inp .input {
  padding-right: 90px;
  box-sizing: border-box;
  font-size: 14px !important;
}

.m-referencePrice {
  width: 100%;
  margin-top: 16px;
}
.m-referencePrice > .price {
  font-weight: 400;
  font-size: 14px;
}
.otcRelease-sum {
  display: flex;
  align-items: center;
}
.otcRelease-sum > .otcRelease-page,
.otcRelease-sum > .otcRelease-sum-price,
.m-referencePrice > .price > .txt .m-referencePrice > .price > .num {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}

.m-referencePrice > .price > .num {
  color: var(--color-text-primary);
  margin-left: 12px;
}
.otcRelease-sum > .otcRelease-page,
.m-referencePrice > .price > .txt {
  color: var(--color-text-secondary);
}
.page-otcRelease .otcRelease-main .otcRelease-sum .otcRelease-sum-price {
  margin-left: 12px;
}
.page-otcRelease .otcRelease-main .MessPrice {
  margin-bottom: 0;
}
/deep/.common-select .input_line_inp {
  font-size: 14px !important;
}
.page-otcRelease /deep/.input-line-content .input-line-baseStance .input_line_inp .input {
  color: var(--color-text-primary);
}
.page-otcRelease /deep/.input-line-content .input-line-errorStence,
.page-otcRelease /deep/.common-select .input_line_errorStence {
  height: auto;
}

.page-otcRelease /deep/.input-line-content .input-line-baseStance .input_line_inp .input,
.page-otcRelease .otcRelease-main .otcRelease-input-page {
  color: var(--color-text-primary) !important;
}
.page-otcRelease /deep/.common-alert .alert-frame .alert-close {
  top: 24px;
  right: 28px;
}
.page-otcRelease /deep/.common-alert .alert-frame .alert-main {
  width: 100%;
}
.page-otcRelease /deep/.common-alert .alert-frame .alert-button {
  text-align: center;
  position: relative;
  bottom: 0;
  right: 0;
  margin-top: 20px;
}
.page-otcRelease /deep/.common-alert .alert-frame .alert-button .common-button {
  min-width: 154px;
  height: 50px !important;
  padding: 0 24px;
  border-radius: 100px;
  background: var(--color-BTN-primary);
  color: var(--color-BTN-primary-text);
}
.page-otcRelease /deep/.common-alert .alert-frame .alert-button .common-button .common-button-slot {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.page-otcRelease /deep/.common-select .select-options-box {
  background: var(--color-input-fill-on-light-bg) !important;
}
.page-otcRelease /deep/.common-select .select-options-box .__panel {
  margin-right: -16px !important;
}
.page-otcRelease /deep/.input_line_prompt {
  display: none;
}
.page-otcRelease .common-select /deep/.input_line_inp {
  margin-top: 0;
}
</style>
