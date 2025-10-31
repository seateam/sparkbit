<template>
  <!--eslint-disable-->
  <div class="black-list m-page">
    <!--<p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.blackList.title')}}</p>-->
    <div class="title">{{ $t("personal.blackList.title") }}</div>
    <div class="center clearfix">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="loading"
        :classes="classes"
        :headClasses="headClasses"
        :bodyClasses="bodyClasses"
        :lineClasses="lineClass"
        :columns="columns"
        :dataList="dataList"
        :lineNumber="lineNumber"
        :cellHeight="cellHeight"
        :headHeight="headHeight"
        @elementClick="closeData"
      />
      <c-pagination
        v-show="count > 10"
        :total="count"
        :current-page="page"
        :display="pageSize"
        @pagechange="pagechange"
      >
      </c-pagination>
    </div>
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="titleText"
    >
      <p class="dialog-p">{{ $t("personal.dialog.blackPromptText") }}</p>
    </c-dialog>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/blackList/blackList";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/blackList/blackList.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.m-page {
  box-sizing: border-box;
  font-family: Outfit;
}
.m-page > .title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
.m-page /deep/.table-head {
  margin: 0;
  box-sizing: border-box;
  padding: 0 24px;
}
.m-page /deep/.table-head tr {
  height: 40px !important;
  font-size: 14px;
  color: var(--color-13);
}
/deep/.pagination.a-5-bg {
  background: var(--bgColor);
}
.m-page > .center {
  margin: 26px 20px 0;
}
</style>
