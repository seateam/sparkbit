<template>
<section class="otcDetailOrder-pays  clearfix" v-if="isReady">
  <!-- 卖家支付方式 -->
  <span class="otcDetailOrder-pays-title">{{ $t('otcDetailOrder.SellersPaymentMethod') }}</span>
  <div class="otcDetailOrder-pays-body">
    <ul class="paysList" v-if="showPay">
      <li class="clearfix" v-for="(item, index) in pays" :key="index">
        <!-- 选择框 仅支付方 在未支付情况下展示 -->
        <div class="paysList-redio" v-if="commonData.side==='BUY'" @click="payClick(item)">
          <c-redio :value="payObj.payment === item.payment ? true : false"/>
        </div>
        <!-- 信息 支付宝/微信 -->
        <div class="paysList-message clearfix"
          v-if="item.payment === 'otc.payment.alipay' || item.payment === 'otc.payment.wxpay'">
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 账号 -->
          <div>
            <span class="paysList-message-text">{{item.userName}} {{item.account}}</span>
            <span class="paysList-message-ewm" v-if="commonData.side==='BUY'">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0 6.22222V0H6.22222V6.22222H0ZM1.55556 4.66667H4.66667V1.55556H1.55556V4.66667ZM0 14V7.77778H6.22222V14H0ZM1.55556 12.4444H4.66667V9.33333H1.55556V12.4444ZM7.77778 6.22222V0H14V6.22222H7.77778ZM9.33333 4.66667H12.4444V1.55556H9.33333V4.66667ZM12.4444 14V12.4444H14V14H12.4444ZM7.77778 9.33333V7.77778H9.33333V9.33333H7.77778ZM9.33333 10.8889V9.33333H10.8889V10.8889H9.33333ZM7.77778 12.4444V10.8889H9.33333V12.4444H7.77778ZM9.33333 14V12.4444H10.8889V14H9.33333ZM10.8889 12.4444V10.8889H12.4444V12.4444H10.8889ZM10.8889 9.33333V7.77778H12.4444V9.33333H10.8889ZM12.4444 10.8889V9.33333H14V10.8889H12.4444Z" fill="#928BFF"/>
              </svg>
              <div class="paysList-message-ewm-mark h-2-bg">
                <img :src="item.qrcodeImg"/>
              </div>
            </span>
          </div>
        </div>
        <!-- 信息 银行卡 -->
        <div class="paysList-message clearfix"
          v-else-if="item.payment === 'otc.payment.domestic.bank.transfer'">
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 卡号 银行 支行 -->
          <div class="paysList-message-bank">
            {{item.userName}} {{item.account}} {{item.bankName}} {{item.bankOfDeposit}}
          </div>
        </div>
        <!-- 其他 -->
        <div class="paysList-message clearfix"
          v-else>
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 账号 -->
          <div>
            <span class="paysList-message-text">{{item.userName}} {{item.account}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="b-1-cl text" v-if="showText.length">{{ showText }}</div>
  </div>
</section>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/pays/pays';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/pays/pays.styl';

export default {
  mixins: [mixin],
};
</script>
<style scoped>
.paysList-redio /deep/.common-redio > div {
  width: 15px;
  height: 15px;
}
.paysList-redio /deep/.checked span {
  width: 10px;
  height: 10px;
}
</style>