<template>
<div class="otcDetailOrder-message otcDetailOrder-message-container a-3-bd clearfix" v-if="isReady">
  <ul class="otcDetailOrder-keys">
    <li v-if="identificationInfo.otcAuthnameOpen">{{ $t('otcDetailOrder.identification') }}</li>
    <!-- 单价 -->
    <li>{{ $t('otcDetailOrder.MessPrice') }}</li>
    <!-- 数量 -->
    <li>{{ $t('otcDetailOrder.MessVolume') }}</li>
    <!-- 总价 -->
    <li>{{ $t('otcDetailOrder.MessTotol') }}</li>
    <!-- 商家备注 -->
    <li>{{ $t('otcDetailOrder.MessMerchantRemarks') }}</li>
  </ul>
  <ul class="otcDetailOrder-values b-1-cl">
    <li v-if="identificationInfo.otcAuthnameOpen">{{identificationInfo.realName }}
      <a class="identification-icon" href="javascript:;"
         @click="identificationShow">
         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1.2 10C0.87 10 0.5875 9.8776 0.3525 9.63281C0.1175 9.38802 0 9.09375 0 8.75V1.25C0 0.90625 0.1175 0.611979 0.3525 0.367188C0.5875 0.122396 0.87 0 1.2 0H10.8C11.13 0 11.4125 0.122396 11.6475 0.367188C11.8825 0.611979 12 0.90625 12 1.25V8.75C12 9.09375 11.8825 9.38802 11.6475 9.63281C11.4125 9.8776 11.13 10 10.8 10H1.2ZM6 5.625L1.2 2.5V8.75H10.8V2.5L6 5.625ZM6 4.375L10.8 1.25H1.2L6 4.375ZM1.2 2.5V1.25V8.75V2.5Z" fill="white"/>
          </svg>
      </a>
    </li>
    <li>{{ commonData.price }} {{ commonData.paycoin }}</li>
    <li>{{ commonData.volume }} {{ commonData.coin }}</li>
    <li class="b-7-cl">{{ commonData.totalPrice }} {{ commonData.paycoin }}</li>
    <li v-if="showDescription">{{ commonData.description }}</li>
    <li v-else>{{ $t('otcDetailOrder.none') }}</li>
  </ul>
</div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/message/message';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/otcDetailOrder/message/message.styl';

export default {
  mixins: [mixin],
};
</script>
