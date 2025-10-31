<template>
  <section class="page-otcDetailOrder" ref="content">
    <vue-scroll>
      <div class="page-otcDetailOrder-bar">
        <div class="page-otcDetailOrder-content">
          <Title :isReady="isReady" :commonData="commonData" @getData="getData" ref="title" />
          <Message
            :isReady="isReady"
            @update:identificationShow="identificationShow = true"
            :commonData="commonData"
          />
          <div class="otcDetailOrder-options">
            <Pays
              :isReady="isReady"
              :commonData="commonData"
              :payObj="payObj"
              @setPayObj="setPayObj"
            />
            <div class="otcDetailOrder-buttons" v-if="orderIsReady">
              <!-- 买1 -->
              <div v-if="status === '1' && commonData.side === 'BUY'">
                <!-- 去支付 -->
                <c-button height="40px" paddingW="20px" :disabled="goPayDisabled" @click="goPayClick">{{
                  $t("otcDetailOrder.goPay")
                }}</c-button>
                <!-- 取消订单 -->
                <c-button
                  paddingW="20px"
                  type="text"
                  height="40px"
                  class="textButtonClass"
                  @click="cancelOrderClick"
                >
                  {{ $t("otcDetailOrder.CancellationOrder") }}
                </c-button>
              </div>
              <!-- 卖1 -->
              <div v-if="status === '1' && commonData.side === 'SELL'">
                <!-- 等待对方支付 -->
                <c-button height="40px" paddingW="20px" :disabled="true">
                  {{ $t("otcDetailOrder.WaitingPayment") }}
                </c-button>
              </div>
              <!-- 买2/卖2 -->
              <div v-if="status === '2'">
                <!-- 对方正在放币 -->
                <c-button height="40px" paddingW="20px" :disabled="true" v-if="commonData.side === 'BUY'">
                  {{ $t("otcDetailOrder.WaitingPuttingMoney") }}
                </c-button>
                <!-- 确认收款并放币 -->
                <c-button height="40px" paddingW="20px" @click="releaseClick" v-if="commonData.side === 'SELL'">
                  {{ $t("otcDetailOrder.ConfirmReleaseMoney") }}
                </c-button>
                <!-- 提交申诉 -->
                <c-button
                  paddingW="20px"
                  type="text"
                  height="40px"
                  class="textButtonClass"
                  @click="appealClick"
                >
                  {{ $t("otcDetailOrder.SubmitAcomplaint") }}
                </c-button>
              </div>
              <!-- 买3/卖3 买8/卖8 -->
              <div v-if="status === '3' || status === '8'">
                <!-- 返回法币大厅 -->
                <c-button height="40px" paddingW="20px" @click="goHall">
                  {{ $t("otcDetailOrder.goHall") }}
                </c-button>
              </div>
              <!-- 买4/卖4 -->
              <div v-if="status === '4' || status === '9'">
                <!-- 订单已关闭 -->
                <c-button height="40px" paddingW="20px" :disabled="true">
                  {{ $t("otcDetailOrder.OrderClosed") }}
                </c-button>
              </div>
              <!-- 买5/卖5 -->
              <div v-if="status === '5'">
                <!-- 订单申诉中 -->
                <c-button height="40px" paddingW="20px" :disabled="true">
                  {{ $t("otcDetailOrder.OrdersAppeal") }}
                </c-button>
                <!-- 取消申诉 -->
                <c-button
                  paddingW="20px"
                  type="text"
                  height="40px"
                  v-if="axiosData.isComplainUser.toString() === '1'"
                  class="textButtonClass"
                  @click="cancelAppealClick"
                >
                  {{ $t("otcDetailOrder.CancellationComplaint") }}
                </c-button>
              </div>
              <!-- 买7/卖7 -->
              <div v-if="status === '7'">
                <!-- 订单异常 -->
                <c-button height="40px" paddingW="20px" :disabled="true">
                  {{ $t("otcDetailOrder.OrderException") }}
                </c-button>
              </div>
            </div>
            <div class="otcReminder-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M7.5 12.5H9.16667V7.5H7.5V12.5ZM8.33333 5.83333C8.56944 5.83333 8.76736 5.75347 8.92708 5.59375C9.08681 5.43403 9.16667 5.23611 9.16667 5C9.16667 4.76389 9.08681 4.56597 8.92708 4.40625C8.76736 4.24653 8.56944 4.16667 8.33333 4.16667C8.09722 4.16667 7.89931 4.24653 7.73958 4.40625C7.57986 4.56597 7.5 4.76389 7.5 5C7.5 5.23611 7.57986 5.43403 7.73958 5.59375C7.89931 5.75347 8.09722 5.83333 8.33333 5.83333ZM8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667ZM8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15Z" fill="#999999"/>
              </svg>
              <c-otcReminder />
            </div>
          </div>
          <c-alert :showFlag="false" :imgMap="imgMap" />
          <div class="maxEvmAll u-7-bg" v-if="maxEvmFlag" @click="maxEvm(false)"></div>
          <div class="maxEvm h-2-bg" v-if="maxEvmFlag" @click="maxEvm(false)">
            <img :src="payObj.qrcodeImg" />
          </div>
          <!-- 确认付款弹窗 -->
          <c-dialog
            :showFlag="goPayFlag"
            :titleText="$t('otcDetailOrder.ConfirmPayment')"
            :confirmText="$t('otcDetailOrder.MarkedAsPaid')"
            :closeText="$t('otcDetailOrder.NotYetPaid')"
            @close="goPayClose"
            @confirm="gopayConfirm"
            :confirmLoading="gopayConfirmLoading"
            paddingTop="20px"
          >
            <div class="goPayDialog">
              <p class="text">
                <img :src="imgMap.pwd_info"/>
                <!-- 本平台不支持自动扣款，请您本人向以上账号自行转账 -->
                <span class="b-7-cl">{{ $t("otcDetailOrder.payWarning") }}</span>
              </p>
              <ul class="list">
                <!-- 支付金额 -->
                <li class="a-4-bg">
                  <div>
                    {{ $t("otcDetailOrder.PaymentAmount") }}
                  </div>
                  <div class="value b-1-cl">{{ goPayText.price }}</div>
                </li>
                <!-- 对方支付方式 -->
                <li class="a-4-bg">
                  <div>{{ $t("otcDetailOrder.Otherparty") }} {{ payObj.name }}</div>
                  <div
                    class="value b-1-cl"
                    :class="
                      payObj.payment === 'otc.payment.alipay' ||
                      payObj.payment === 'otc.payment.wxpay'
                        ? 'haveEvm'
                        : ''
                    "
                  >
                    <!-- 微信/支付宝 -->
                    <span
                      v-if="
                        payObj.payment === 'otc.payment.alipay' ||
                        payObj.payment === 'otc.payment.wxpay'
                      "
                    >
                      {{ payObj.userName }} {{ payObj.account }}
                      <div
                        class="payEvm"
                        @click="maxEvm(true)"
                        :style="{ backgroundImage: `url(${payObj.qrcodeImg})` }"
                      ></div>
                    </span>
                    <!-- 银行卡 -->
                    <span v-else-if="payObj.payment === 'otc.payment.domestic.bank.transfer'">
                      {{ payObj.userName }}
                      {{ payObj.account }}
                      {{ payObj.bankName }}
                      {{ payObj.bankOfDeposit }}
                    </span>
                    <!-- 其他 -->
                    <span v-else>
                      {{ payObj.userName }}
                      {{ payObj.account }}
                    </span>
                  </div>
                </li>
                <!-- 付款参考号 -->
                <li class="a-4-bg">
                  <div>{{ $t("otcDetailOrder.PaymentReference") }}</div>
                  <div class="value b-1-cl">{{ goPayText.id }}</div>
                </li>
              </ul>
            </div>
          </c-dialog>
          <!-- 确认收款并放币 弹窗 -->
          <c-dialog
            :showFlag="releaseFlag"
            :titleText="$t('otcDetailOrder.ConfirmReleaseMoney')"
            paddingTop="20px"
            @confirm="releaseConfirm"
            @close="releaseClose"
            :confirmDisabled="releaseConfirmDisbale"
            :confirmLoading="releaseConfirmLoading"
          >
            <div class="releaseDialog">
              <p class="text">
                <img :src="imgMap.pwd_info"/>
                <!-- 请务必登录账号确认收到该笔款项 -->
                <span class="b-7-cl">{{ $t("otcDetailOrder.ConfirmReleaseMoneyWarning") }}</span>
              </p>
              <!-- 资金密码 -->
              <c-inputLine
                :promptText="$t('otcDetailOrder.pass')"
                inputType="password"
                name="passValue"
                :value="passValue"
                marginTop="10px"
                :errorHave="true"
                :errorFlag="passErrorFlag"
                :errorText="$t('otcDetailOrder.passError')"
                @onchanges="inputLineChange"
              />
              <div class="passValueText">
                <c-checkBox :value="passCheck" @click="passCheckClick" />&nbsp;
                <!-- 我确认已登录收款账户，并核对收款无误 -->
                <span class="passValueText-text" @click="passCheckClick">
                  {{ $t("otcDetailOrder.ConfirmReleaseMoneyConfrim") }}</span
                >
              </div>
            </div>
          </c-dialog>
          <!-- 取消订单 弹窗 -->
          <c-dialog
            :showFlag="cancelOrderFlag"
            :titleText="$t('otcDetailOrder.CancellationOrderTitle')"
            paddingTop="20px"
            @close="cancelOrderClose"
            @confirm="cancelOrderConfirm"
            :confirmLoading="cancelOrderLoading"
            :confirmDisabled="cancelOrderConfirmDisabled"
          >
            <div class="cancelOrderDialog">
              <ul>
                <!-- 取消订单后不会退款，如您已付款，请勿取消订单。 -->
                <li>{{ $t("otcDetailOrder.CancellationOrderWarning1") }}</li>
                <!-- 取消规则：买方访日累计取消3笔订单，将会限制当日买入功能 -->
                <li>{{ $t("otcDetailOrder.CancellationOrderWarning2") }}</li>
              </ul>
              <div class="cancelOrderDialog-check">
                <!-- 我确定还没付款给对方 -->
                <c-checkBox :value="cancelOrderCheck" @click="cancelOrderCheckClick" />&nbsp;
                <span class="cancelOrderDialog-check-text" @click="cancelOrderCheckClick">
                  {{ $t("otcDetailOrder.CancellationOrderConfrim") }}</span
                >
              </div>
            </div>
          </c-dialog>
          <!-- 申诉 弹窗 -->
          <c-dialog
            :showFlag="appealFlag"
            :titleText="$t('otcDetailOrder.AppealTitle')"
            paddingTop="20px"
            @close="appealClose"
            @confirm="appealConfirm"
            :confirmLoading="appealLoading"
            :confirmDisabled="appealConfirmDisabled"
          >
            <div class="appealDialog">
              <p class="text">
                <img :src="imgMap.pwd_info"/>
                <!-- 如果订单遇到纠纷，可以通过申诉渠道解决。 -->
                <span class="b-7-cl">{{ $t("otcDetailOrder.AppealWarning") }}</span>
              </p>
              <!-- 申诉理由 -->
              <c-textAreaLine
                :promptText="$t('otcDetailOrder.ReasonsAppeal')"
                name="appealValue"
                :value="appealValue"
                marginTop="10px"
                @onchanges="inputLineChange"
                maxLength="200"
                :warningText="`${appealValue.length}/200`"
                :errorHave="true"
              />
            </div>
          </c-dialog>
          <!-- 取消申诉 弹窗 -->
          <c-dialog
            :showFlag="cancelAppealFlag"
            :titleText="$t('otcDetailOrder.CancellationComplaintTitle')"
            paddingTop="40px"
            @close="cancelAppealClose"
            @confirm="cancelAppealConfirm"
            :confirmLoading="cancelAppealLoading"
          >
            <div class="cancelAppealDialog">
              <!-- 取消申诉代表您对此订单无争议，您确定取消申诉吗？ -->
              {{ $t("otcDetailOrder.CancellationComplaintConfrim") }}
            </div>
          </c-dialog>
          <c-dialog
            :titleText="$t('otcDetailOrder.connection')"
            :showFlag="identificationShow"
            @close="identificationShow = false"
            @confirm="identificationShow = false"
            class="connection-dialog"
          >
            <ul class="connection-list" v-if="identificationInfo.isTwoMin">
              <li class="connection-li a-4-bg" v-if="identificationInfo.mobileNumber">
                <p class="connection-title b-2-cl">{{ $t("otcDetailOrder.phone") }}</p>
                <p class="connection-desc b-1-cl">{{ identificationInfo.mobileNumber }}</p>
              </li>
              <li class="connection-li a-4-bg" v-if="identificationInfo.email">
                <p class="connection-title b-2-cl">{{ $t("register.email") }}</p>
                <p class="connection-desc b-1-cl">{{ identificationInfo.email }}</p>
              </li>
            </ul>
            <p class="towMin" v-else>{{ $t("otcDetailOrder.twoMin") }}</p>
          </c-dialog>
        </div>
        <!-- 聊天 -->
        <chatVue :chatTop="chatTop" :isReady="isReady" :commonData="commonData" />
      </div>
    </vue-scroll>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/index/index.styl";
import Title from "./title.vue";
import Message from "./message.vue";
import Pays from "./pays.vue";
import chatVue from "./chat.vue";

export default {
  mixins: [mixin],
  components: {
    Title,
    Message,
    Pays,
    chatVue,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.otcDetailOrder-message.otcDetailOrder-message-container {
  overflow: hidden;
}
.page-otcDetailOrder {
  margin-bottom: 40px;
}
.otcReminder-wrap {
  display: flex;
  margin-top: 20px;
}
.otcReminder-wrap > svg {
  margin-top: 1px;
}
.otcReminder {
  margin-top: 0px;
  margin-left: 6px;
}
/deep/.otcReminder .otcReminder-list {
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}
/deep/.b-1-cl {
  color: var(--color-1);
}
</style>
