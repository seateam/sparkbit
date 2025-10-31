<template>
  <section class="questionsList">
    <div class="title f-1-cl a-3-bd">{{ $t("questions.list") }}</div>
    <div class="content">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        :cellHeight="70"
        @elementClick="tableClick"
        classes="nobg"
        headClasses="nobg"
        bodyClasses="nobg"
      />
      <c-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        classes="nobg"
        @pagechange="pagechange"
      />
    </div>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/questionsList/questionsList";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/questionsList/questionsList.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.questionsList .title {
  color: var(--color-1);
}
.questionsList /deep/.common-table .common-button.common-button-text {
  min-width: 60px;
  padding: 0px 10px;
  height: 32px;
  border-radius: 100px;
}
.questionsList /deep/.common-table .common-button:last-of-type {
  border: 1px solid var(--color-BTN-primary);
}
.questionsList /deep/.common-table .common-button:last-of-type .common-button-slot {
  color: #ffffff;
}
.questionsList /deep/.common-table .common-button.common-button-text .common-button-slot {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}
.questionsList /deep/.common-table .common-button.common-button-text:first-child {
  border: 1px solid var(--color-BTN-secondary-border);
  color: var(--color-BTN-text-secondary-revert);
}
.questionsList /deep/.common-table .common-button.common-button-text:last-child {
  color: var(--color-BTN-primary-text);
  background: var(--color-BTN-primary);
  margin-left: 12px;
}
.questionsList /deep/.common-table .table-head {
  padding-inline: 24px !important;
}
.questionsList /deep/.common-table .table-body {
  padding-inline: 24px !important;
}
</style>
