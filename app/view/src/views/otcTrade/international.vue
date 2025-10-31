<template>
  <section class="page-otcTrade a-5-bg">
    <div class="otc-page-title a-5-bg a-7-bd">
      <div class="page-title-bar b-1-cl">
        <span v-if="axiosObj.side === 'BUY'">{{ $t("fiatdeal.navList")[2] }}</span>
        <span v-else>{{ $t("fiatdeal.navList")[1] }}</span>
      </div>
    </div>
    <div class="page-otcTrade-content">
      <vue-scroll>
        <div class="page-otcTrade-bar">
          <!-- 头部 -->
          <div class="otcTrade-header a-3-bd">
            <!-- 头像 -->
            <div class="otcTrade-page a-12-bg" @click="goUser" style="color: #edf4f8">
              <div v-if="axiosObj.imageUrl">
                <img :src="axiosObj.imageUrl" alt />
              </div>
              <div v-else-if="axiosObj.otcNickName">{{ axiosObj.otcNickName[0] }}</div>
            </div>
            <!-- 名称/在线状态 -->
            <div class="otcTrade-user">
              <div class="otcTrade-userName b-1-cl">
                {{ axiosObj.otcNickName }}
              </div>
              <div class="otcTrade-userStatus">
                <div
                  class="lineIcon"
                  :class="axiosObj.loginStatus === 1 ? 'online' : 'offline'"
                ></div>
                {{ axiosObj.loginStatus === 1 ? $t("otcTrade.inLine") : $t("otcTrade.outLine") }}
                <span v-html="userVip" style="margin-left: 10px"></span>
              </div>
            </div>
            <!-- 历史成交 -->
            <div class="otcTrade-header-even">
              <!-- 历史成交(折合BTC) -->
              <div class="otcTrade-header-even-key">{{ $t("otcTrade.his") }}</div>
              <div class="otcTrade-header-even-value b-1-cl">
                {{ axiosObj.turnover | BTCFixD(that) }} BTC
              </div>
            </div>
            <!-- 信用度 -->
            <div class="otcTrade-header-even otcTrade-header-even-credit">
              <div class="otcTrade-header-even-key">{{ $t("otcTrade.CreditDegree") }}</div>
              <div class="otcTrade-header-even-value b-1-cl">{{ credit }}</div>
            </div>
            <!-- 交易次数 -->
            <div class="otcTrade-header-even">
              <div class="otcTrade-header-even-key">{{ $t("otcTrade.TransactionTimes") }}</div>
              <div class="otcTrade-header-even-value b-1-cl">{{ axiosObj.dealVolume }}</div>
            </div>
          </div>
          <!-- 主体 -->
          <div class="otcTrade-message a-3-bd">
            <div class="otcTrade-message-title b-1-cl">{{ messageTitle }}</div>
            <div class="otcTrade-message-box clearfix">
              <ul class="otcTrade-message-keys">
                <!-- 单价 -->
                <li>{{ $t("otcTrade.price") }}</li>
                <!-- 数量 -->
                <li>{{ $t("otcTrade.volume") }}</li>
                <!-- 交易限额 -->
                <li>{{ $t("otcTrade.TradingLimit") }}</li>
                <!-- 付款时限 -->
                <li>{{ $t("otcTrade.TimeLimitPayment") }}</li>
                <li>{{ sidePay }}</li>
                <!-- 商家备注 -->
                <li>{{ $t("otcTrade.MerchantRemarks") }}</li>
              </ul>
              <ul class="otcTrade-message-values b-1-cl">
                <li>{{ axiosObj.price | payFixD(that) }} {{ axiosObj.payCoin }}</li>
                <li>{{ axiosObj.volumeBalance | coinFixD(that) }} {{ axiosObj.coin }}</li>
                <li>
                  {{ axiosObj.minTrade | payFixD(that) }} - {{ axiosObj.maxTrade | payFixD(that) }}
                  {{ axiosObj.payCoin }}
                </li>
                <!-- 分钟 -->
                <li>{{ axiosObj.limitTime }} {{ $t("otcTrade.min") }}</li>
                <li>
                  <c-otcPayIcon
                    class="otcTrade-otcPayIcon"
                    :imgUrl="item.icon"
                    v-for="(item, index) in payments"
                    :key="index"
                  />
                </li>
                <!-- 商家备注 -->
                <li v-if="isShowEscription">{{ axiosObj.description }}</li>
                <!-- 无 -->
                <li v-else>{{ $t("otcTrade.none") }}</li>
              </ul>
            </div>
          </div>
          <!-- 关闭广告弹窗 -->
          <c-dialog
            :showFlag="closeTradeFlag"
            :titleText="$t('otcTrade.closeTitle')"
            :confirmLoading="closeTradeConfirmLoading"
            @confirm="closeTradeConfirm"
            @close="closeTradeClose"
          >
            <div class="closeTrade-dialog">{{ $t("otcTrade.closeWarning") }}</div>
          </c-dialog>
          <!-- 操作 自己的订单 -->
          <div class="otcTrade-options-myself" v-if="optionsFlag === 'myself'">
            <div>
              <!-- 返回法币交易大厅 -->
              <c-button type="solid" paddingW="24px" height="40px" @click="goHall">
                {{ fiatTradeOpen ? $t("assets.b2c.otcShow.goHall") : $t("otcTrade.goHall") }}
              </c-button>
              <!-- 关闭广告 -->
              <c-button
                v-if="axiosObj.status && axiosObj.status !== 4"
                type="text"
                class="textButton"
                paddingW="24px"
                height="40px"
                @click="closeTrade"
                >{{ $t("otcTrade.close") }}</c-button
              >
            </div>
            <p class="myself-tip">{{ axiosObj.tip }}</p>
          </div>
          <!-- 操作 非自己的订单 -->
          <div class="otcTrade-options-trade" v-if="optionsFlag === 'even'">
            <div class="options-trade-title b-1-cl">
              {{
                axiosObj.side === "SELL" ? $t("otcTrade.PurchaseAmount") : $t("otcTrade.AmountSale")
              }}
            </div>
            <div class="options-trade-form clearfix">
              <div class="leftInp">
                <div style="margin-bottom: 6px; color: var(--color-text-primary)">
                  {{ leftInputOptions.promptText }}
                </div>
                <c-inputLine
                  :promptText="leftInputOptions.promptText"
                  name="leftInp"
                  :value="leftInp"
                  :errorHave="true"
                  :errorText="leftInpObj.errorText"
                  :errorFlag="leftInpObj.errorFlag"
                  :warningText="leftInputOptions.warningText"
                  @onchanges="inputLineChange"
                >
                  <!-- 全部 -->
                  <c-button
                    type="text"
                    height="30px"
                    v-if="axiosObj.side === 'BUY'"
                    @click="inputAll('left')"
                    >{{ $t("otcTrade.all") }}</c-button
                  >
                </c-inputLine>
              </div>
              <div class="tradeIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="19"
                  viewBox="0 0 24 19"
                  fill="none"
                >
                  <path
                    d="M7.2 19L5.52 17.3078L8.61 14.25H0V11.875H8.61L5.52 8.81719L7.2 7.125L13.2 13.0625L7.2 19ZM16.8 11.875L10.8 5.9375L16.8 0L18.48 1.69219L15.39 4.75H24V7.125H15.39L18.48 10.1828L16.8 11.875Z"
                    fill="#999999"
                  />
                </svg>
              </div>
              <div class="rightInp">
                <div style="margin-bottom: 6px; color: var(--color-text-primary)">
                  {{ rightInputOptions.promptText }}
                </div>
                <c-inputLine
                  :promptText="rightInputOptions.promptText"
                  name="rightInp"
                  :value="rightInp"
                  :errorHave="true"
                  :errorText="rightInpObj.errorText"
                  :errorFlag="rightInpObj.errorFlag"
                  :warningText="rightInputOptions.warningText"
                  @onchanges="inputLineChange"
                >
                  <c-button
                    type="text"
                    height="30px"
                    v-if="axiosObj.side === 'SELL'"
                    @click="inputAll('right')"
                    >{{ $t("otcTrade.all") }}</c-button
                  >
                </c-inputLine>
              </div>
            </div>
            <!-- 资金密码 buy时 -->
            <div class="options-trade-pass" v-if="axiosObj.side === 'BUY'">
              <c-inputLine
                :promptText="$t('otcTrade.pass')"
                name="passCode"
                inputType="password"
                :value="passCode"
                :errorHave="true"
                :errorText="$t('otcTrade.passError')"
                :errorFlag="passErrorFlag"
                @onchanges="inputLineChange"
              ></c-inputLine>
            </div>
            <!-- 提交BUtton -->
            <div class="options-trade-button">
              <!-- 立即出售 -->
              <c-button
                v-if="axiosObj.side === 'BUY'"
                paddingW="32px"
                marginTop="18px"
                :disabled="mySellBtnDisabled"
                :loading="btnLoading"
                class="otcTrade-ImmediateSell"
                @click="BtnClick"
                >{{ $t("otcTrade.ImmediateSale") }}</c-button
              >
              <!-- 立即购买 -->
              <c-button
                v-if="axiosObj.side === 'SELL'"
                paddingW="32px"
                marginTop="50px"
                :disabled="myBuyBtnDisabled"
                :loading="btnLoading"
                @click="BtnClick"
                class="otcTrade-ImmediatePurchase"
                >{{ $t("otcTrade.ImmediatePurchase") }}</c-button
              >
              <div class="buttonTimer">
                <!-- 倒计时 -->
                <span>{{ $t("otcTrade.CountDown") }}：</span>
                <span>{{ time }}s</span>
              </div>
            </div>
            <div class="b-7-cl warning" v-if="axiosObj.side === 'SELL' && windFlag">
              {{
                !fiatTradeOpen ? $t("otcTrade.warning") : $t("assets.b2c.otcShow.otcTradeWarning")
              }}
            </div>
            <c-otcReminder v-if="optionsFlag === 'even'" />
          </div>
        </div>
      </vue-scroll>
    </div>
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/otcTrade/otcTrade";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.page-otcTrade .otcTrade-message,
.page-otcTrade .otcTrade-options-trade,
.page-otcTrade .otcTrade-options-trade .options-trade-form {
  overflow: hidden;
}
.page-otcTrade {
  background: var(--color-BG-Light);
  border-radius: 12px;
  margin-bottom: 30px;
}
.page-otcTrade .otcTrade-header .otcTrade-user .otcTrade-userName,
.page-otcTrade .otcTrade-header .otcTrade-header-even .otcTrade-header-even-value,
.page-otcTrade .otcTrade-message .otcTrade-message-title,
.page-otcTrade .otcTrade-message .otcTrade-message-values,
.page-otcTrade .otcTrade-options-trade .options-trade-title {
  color: var(--color-text-primary);
  font-weight: 700;
}
.page-otcTrade .otcTrade-options-trade .buttonTimer {
  color: var(--color-text-primary);
  font-weight: 400;
}
.page-otcTrade .otcTrade-options-trade .buttonTimer span:last-child {
  color: var(--color-BTN-primary);
  font-size: 20px;
}
</style>
