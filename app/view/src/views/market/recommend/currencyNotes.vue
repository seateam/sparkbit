<template>
  <div class="currency-notes currency-notes-container">
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.coinType')}}</div>
      <div class="val b-1-cl">{{coinSymbolIntroduce.shortName}}</div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.fullNameCurrency')}}</div>
      <div class="val b-1-cl">{{coinSymbolIntroduce.longName}}</div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.issueTime')}}</div>
      <div class="val b-1-cl">{{coinSymbolIntroduce.publishTimeStr}}</div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.totalIssueAmount')}}</div>
      <div class="val b-1-cl">{{coinSymbolIntroduce.publishAmount}}</div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.totalCirculation')}}</div>
      <div class="val b-1-cl">{{coinSymbolIntroduce.currencyAmount}}</div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.relatedLinks')}}</div>
      <div class="val b-1-cl">
        <a
          :href="coinSymbolIntroduce.officialUrl"
          v-if="coinSymbolIntroduce.officialUrl"
          target="_blank"
          class="link-label"
        >{{$t('trade.currencyNotesModal.officialWebsite')}}</a>
        <a
          :href="coinSymbolIntroduce.blockchainUrl"
          v-if="coinSymbolIntroduce.blockchainUrl"
          target="_blank"
          class="link-label"
        >{{$t('trade.currencyNotesModal.blockQuery')}}</a>
      </div>
    </div>
    <div class="flex-row clearfix">
      <div class="key b-2-cl">{{$t('trade.currencyNotesModal.Introduction')}}</div>
    </div>
    <div class="content">
        <div class="text b-1-cl">{{coinSymbolIntroduce.introduction}}</div>
    </div>
  </div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/market/recommend/currencyNotes/currencyNotes';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/market/recommend/currencyNotes/currencyNotes.styl';

export default {
  mixins: [mixin],
};
</script>
<style scoped>
.flex-row.clearfix{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.currency-notes.currency-notes-container .flex-row .val{
  max-width: 275px;
  width: auto;
}
/* 改，2022.12.20 修改样式 */
.currency-notes.currency-notes-container .flex-row .link-label {
  color: var(--mainColor);
}
</style>
