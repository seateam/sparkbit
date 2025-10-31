<template>
  <div class="pos-history" v-if="pageData">
    <!-- <div class="pos-history-title f-1-cl">{{pageData.tipMine}}</div> -->
    <c-Breadcrumb :routes="routes" />
    <div class="pos-history-title f-1-cl">{{ $t("freeStaking.home.myholdings") }}</div>
    <div class="nav-tab c-5-bd">
      <c-navTab
        activeClassName="f-1-cl"
        activeColor="c-8-bg"
        class="c-5-bd"
        :currentTab="currentType"
        :navTab="navTabList"
        lineHeight="55"
        @currentType="selectType"
      />
      <div class="clearfix"></div>
    </div>
    <!--<div class="date-select-cont">-->
    <!--  <c-calendar-->
    <!--    v-if="startTime"-->
    <!--    class="date-selecter"-->
    <!--    width="120px"-->
    <!--    name="start-time"-->
    <!--    :value="startTime"-->
    <!--    :futureDayHide="endTimeNum"-->
    <!--    :promptText="startTimeText"-->
    <!--    @onChanges="setStartTime"-->
    <!--    inputLineStyle="c-1-bd"-->
    <!--    :showDateInfo="true"-->
    <!--    dateInfoTilteClass="f-8-cl"-->
    <!--  />-->
    <!--  <c-calendar-->
    <!--    v-if="endTime"-->
    <!--    class="date-selecter"-->
    <!--    width="120px"-->
    <!--    name="end-time"-->
    <!--    :value="endTime"-->
    <!--    :agoDayHide="startTimeNum"-->
    <!--    :promptText="endTimeText"-->
    <!--    @onChanges="setEndTime"-->
    <!--    inputLineStyle="c-1-bd"-->
    <!--    :showDateInfo="true"-->
    <!--    dateInfoTilteClass="f-8-cl"-->
    <!--  />-->
    <!--  <div class="clearfix"></div>-->
    <!--</div>-->
    <div class="date-table-cont">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="loading"
        :columns="columns"
        :dataList="posData"
        :subColumns="subColumns"
        :subContent="subTableData"
        :subContentId="subTableDataId"
        cellHeight="88"
        @elementClick="tableClick"
        subClass="c-5-bg"
      />
      <c-pagination
        v-if="paginationData.total > paginationData.display"
        :total="paginationData.total"
        :display="paginationData.display"
        :currentPage="paginationData.currentPage"
        @pagechange="pagechange"
      />
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/myPos/myPos";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/myPos/myPos.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.pos-history .nav-tab {
  overflow: hidden;
  border-color: var(--color-Toggle);
}
.pos-history .date-select-cont {
  height: 50px;
}
.f-1-cl,
/deep/.c_list_nav .f-1-cl {
  color: var(--color-text-primary);
}
</style>
