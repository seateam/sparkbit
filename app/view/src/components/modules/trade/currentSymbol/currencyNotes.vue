<template>
  <!-- 改，2022.11.22 修改背景色 -->
  <div class="currency-notes currency-notes-contianer">
    <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.coinType") }}</div>
      <div class="val b-1-cl">{{ coinSymbolIntroduce.shortName }}</div>
    </div>
    <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.fullNameCurrency") }}</div>
      <div class="val b-1-cl">{{ coinSymbolIntroduce.longName }}</div>
    </div>
    <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.issueTime") }}</div>
      <div class="val b-1-cl">{{ coinSymbolIntroduce.publishTimeStr }}</div>
    </div>
    <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.totalIssueAmount") }}</div>
      <div class="val b-1-cl">{{ coinSymbolIntroduce.publishAmount }}</div>
    </div>
    <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.totalCirculation") }}</div>
      <div class="val b-1-cl">{{ coinSymbolIntroduce.currencyAmount }}</div>
    </div>
    <div class="link-box">
      <a :href="coinSymbolIntroduce.officialUrl" target="_blank" class="link-label">
        {{ $t("trade.currencyNotesModal.officialWebsite") }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
        >
          <path
            d="M1.33366 11.0003L0.166992 9.83366L8.16699 1.83366H1.00033V0.166992H11.0003V10.167H9.33366V3.00033L1.33366 11.0003Z"
            fill="#999999"
          />
        </svg>
      </a>
    </div>
    <div class="link-box">
      <a :href="coinSymbolIntroduce.blockchainUrl" target="_blank" class="link-label">
        {{ $t("trade.currencyNotesModal.blockQuery") }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
        >
          <path
            d="M1.33366 11.0003L0.166992 9.83366L8.16699 1.83366H1.00033V0.166992H11.0003V10.167H9.33366V3.00033L1.33366 11.0003Z"
            fill="#999999"
          />
        </svg>
      </a>
    </div>
    <!-- <div class="flex-row">
      <div class="key b-2-cl">{{ $t("trade.currencyNotesModal.Introduction") }}</div>
    </div>
    <div class="content">
      <vue-scroll>
        <div class="text b-1-cl">{{ coinSymbolIntroduce.introduction }}</div>
      </vue-scroll>
    </div> -->
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/currencyNotes/currencyNotes";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/currencyNotes/currencyNotes.styl";

export default {
  mixins: [mixin],
};
</script>
<style scoped>
.currency-notes.currency-notes-contianer {
  height: 334px;
  width: 300px;
  padding: 12px;
  border-radius: 8px;
  background: var(--color-BG-Light);
  border-radius: 8px;
  box-shadow: 0 166px 47px 0 rgba(0, 0, 0, 0), 0 106px 43px 0 rgba(0, 0, 0, 0.01),
    0 60px 36px 0 rgba(0, 0, 0, 0.03), 0 27px 27px 0 rgba(0, 0, 0, 0.05),
    0 7px 15px 0 rgba(0, 0, 0, 0.06);
}
.currency-notes.currency-notes-contianer .link-label {
  color: var(--color-text-primary);
}
.currency-notes.currency-notes-contianer .content .text {
  white-space: pre-wrap;
  word-break: break-word;
}
.currency-notes.currency-notes-contianer .content {
  width: 380px;
}
.link-box path {
  fill: var(--color-text-secondary);
}
</style>
