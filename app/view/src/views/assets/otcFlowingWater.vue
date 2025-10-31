<template>
  <section class="page-flowingWater m-page">
    <!-- 资金流水 -->
    <!--<div class="flowingWater-nav a-3-bd b-1-cl">-->
    <!--  {{ $t('assets.otcFlowingWater.title') }}-->
    <!--</div>-->
    <div class="m-title">{{ $t("assets.otcFlowingWater.title") }}</div>
    <div class="flowingWater-options">
      <c-select
        :promptText="$t('assets.otcFlowingWater.type')"
        :value="type"
        :options="typeList"
        :errorHave="true"
        width="250px"
        @onChanges="typeChange"
      />
      <c-select
        :promptText="$t('assets.otcFlowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="250px"
        :filterable="true"
        @onChanges="symbolChange"
      />
    </div>
    <div class="flowingWater-table m-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
      />
      <c-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/otcFlowingWater/otcFlowingWater";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/otcFlowingWater/otcFlowingWater.styl";
import "./modules/flowingWater.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.page-flowingWater .flowingWater-table /deep/.table-head {
  box-sizing: border-box;
  padding: 0 !important;
}
.page-flowingWater .flowingWater-table /deep/.table-body td:first-child {
  /* padding-left: 20px; */
  box-sizing: border-box;
}
.page-flowingWater .flowingWater-table /deep/.table-body td:last-child {
  /* padding-right: 20px; */
  box-sizing: border-box;
}

/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
/deep/.common-select .icon-triangle {
  border-color: #b2b2b2;
}
.page-flowingWater .flowingWater-table {
  width: auto;
}
/**************************************************/
/deep/.table-head thead {
  font-size: 14px;
}
/deep/.table-head {
  background: var(--color-BG);
}
</style>
