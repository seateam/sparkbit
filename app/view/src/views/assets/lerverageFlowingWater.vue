<template>
  <section class="page-flowingWater-margin m-page">
    <div class="m-title">
      {{ $t("assets.otcFlowingWater.title") }}
    </div>
    <div class="m-head">
      <div class="m-tab">
        <div
          class="item"
          v-for="item in navTab"
          @click="currentType(item)"
          :class="{ active: item.index == nowType }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="flowingWater-options">
      <!-- 方向 -->
      <c-select
        v-if="nowType === 3"
        :promptText="$t('assets.lerverageFlowingWater.direction')"
        :value="otherType"
        :options="otherTypeList"
        :errorHave="true"
        width="250px"
        @onChanges="otherTypeChange"
      />
      <!-- 交易对 -->
      <c-select
        :promptText="$t('assets.lerverageFlowingWater.symbol')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="250px"
        :filterable="true"
        @onChanges="symbolChange"
      />
    </div>
    <!--<div class="flowingWater-nav a-3-bd">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="b-2-cl"-->
    <!--    :currentTab="nowType"-->
    <!--    :navTab="navTab"-->
    <!--    lineHeight="55"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--</div>-->
    <div class="flowingWater-table-margin m-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :cellHeight="55"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :subContent="subContent"
        :subColumns="subColumns"
        :subContentId="subContentId"
        :subLoading="subLoading"
      />
      <c-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
    <leverageRepayment @success="repaymentSuccess" />
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/lerverageFlowingWater/lerverageFlowingWater";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/lerverageFlowingWater/lerverageFlowingWater.styl";
import leverageRepayment from "./leverageRepayment.vue";
import "./modules/flowingWater.styl";

export default {
  mixins: [mixin],
  components: {
    leverageRepayment,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.page-flowingWater-margin .flowingWater-table-margin /deep/.table-head {
  box-sizing: border-box;
}
.page-flowingWater-margin .flowingWater-table-margin /deep/.common-button {
  margin-left: 8px;
}
.m-title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  border-bottom: none;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
.flowingWater-table-margin.m-table {
  padding: 0 44px !important;
}
.m-tab {
  /* width: 100%; */
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  box-sizing: border-box;
  margin: 0 44px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-tab > .item {
  margin-right: 32px;
  position: relative;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item.active {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -0.5px;
  width: 0;
  height: 3px;
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.m-tab > .item.active::after {
  width: 100%;
}

/deep/.common-select .icon-triangle {
  border-color: #b2b2b2;
}
.page-flowingWater-margin .flowingWater-options {
  padding: 20px 0;
  margin: 0 44px;
}
/**************************************************/
/deep/.table-head thead {
  font-size: 14px;
}
/deep/.table-head {
  background: var(--color—BG);
}

/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
</style>
