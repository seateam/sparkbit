<template>
  <section class="page-coflowingWater page-flowingWater">
    <!-- 资金流水 -->
    <div class="flowingWater-nav a-3-bd e-1-cl m-title">
      {{ $t("assets.otcFlowingWater.title") }}
    </div>
    <div class="flowingWater-options">
      <c-calendar
        width="25%"
        name="calendar"
        :value="startTime"
        :promptText="$t('futures.coFlowingWater.startTime')"
        :errorHave="true"
        @onChanges="startTimeSelect"
      />
      <c-calendar
        width="25%"
        name="calendar"
        :value="endTime"
        :promptText="$t('futures.coFlowingWater.endTime')"
        :errorHave="true"
        @onChanges="endTimeSelect"
      />
      <c-select
        :promptText="$t('futures.coFlowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="25%"
        :filterable="true"
        @onChanges="symbolChange"
      />
      <c-select
        :promptText="$t('futures.coFlowingWater.type')"
        :value="type"
        :options="typeList"
        :errorHave="true"
        :filterable="true"
        width="25%"
        @onChanges="typeChange"
      />
    </div>
    <div class="flowingWater-table m-table">
      <c-table
        :cellHeight="55"
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/coFlowingWater/coFlowingWater";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/coFlowingWater/coFlowingWater.styl";
import "./modules/flowingWater.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.page-coflowingWater .flowingWater-table /deep/.table-head {
  box-sizing: border-box;
}
.page-coflowingWater .flowingWater-table.m-table {
  padding: 0 44px !important;
}
.page-coflowingWater .flowingWater-nav.m-title {
  height: 120px;
  line-height: 55px;
  font-size: 32px;
  display: flex;
  align-items: center;
  padding: 0 44px;
}

/deep/.common-select .icon-triangle {
  /* border-color: #b2b2b2; */
}
/**************************************************/
/deep/.table-head thead {
  font-size: 14px;
}
/deep/.table-head {
  background: var(--color-BG);
}
/deep/.common-select .input_line_content {
  background: var(--color-Input-fill) !important;
}
/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
</style>
