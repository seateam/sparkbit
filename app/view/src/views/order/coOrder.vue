<template>
  <section class="page-otcOrder">
    <div class="m-title">{{ $t("order.coOrder.coOrder") }}</div>
    <div class="m-tab">
      <div
        class="item"
        :class="{ active: nowType === item.index }"
        v-for="item in navTab"
        @click="currentType(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!--<div class="otcOrder-nav a-3-bd">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="e-2-cl"-->
    <!--    :currentTab="nowType"-->
    <!--    :navTab="navTab"-->
    <!--    lineHeight="55"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--  &lt;!&ndash; <div class="otcOrder-nav-switchs" v-if="nowType === 2"> &ndash;&gt;-->
    <!--    &lt;!&ndash; 显示已撤单 &ndash;&gt;-->
    <!--    &lt;!&ndash; <c-switch-->
    <!--      :value="switchFlag"-->
    <!--      @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>-->
    <!--  </div> &ndash;&gt;-->
    <!--</div>-->
    <div class="otcOrder-options">
      <c-calendar
        v-if="nowType === 3 || nowType === 4 || nowType === 5"
        width="100%"
        name="calendar"
        :value="startTime"
        :promptText="$t('futures.order.startTime')"
        class="floatLeft"
        @onChanges="startTimeSelect"
      />
      <c-calendar
        v-if="nowType === 3 || nowType === 4 || nowType === 5"
        width="100%"
        name="calendar"
        :value="endTime"
        :promptText="$t('futures.order.endTime')"
        class="floatLeft"
        @onChanges="endTimeSelect"
      />
      <!-- 交割类型 -->
      <c-select
        :promptText="$t('futures.order.coType')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="100%"
        class="floatLeft"
        @onChanges="sideChange"
      />
      <!-- 合约类型 -->
      <c-select
        :promptText="$t('futures.order.coSide')"
        :value="contractType"
        :options="contractTypeList"
        :errorHave="true"
        :filterable="true"
        width="100%"
        class="floatLeft"
        @onChanges="contractTypeChange"
      />
      <!-- 合约 -->
      <c-select
        :promptText="$t('futures.order.contract')"
        :value="contract"
        :options="contractList"
        :errorHave="true"
        :filterable="true"
        width="100%"
        class="floatLeft"
        @onChanges="contractChange"
      />
      <!-- 订单类型 -->
      <c-select
        :promptText="$t('futures.order.orderType')"
        v-if="nowType === 1 || nowType === 3"
        :value="orderType"
        :options="orderTypeList"
        :errorHave="true"
        :filterable="true"
        width="100%"
        class="floatLeft"
        @onChanges="orderTypeChange"
      />

      <!-- <div style="float:left;height:70px;">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="search"
                  marginTop="20px">
                  搜索
          </c-button>
        </div> -->

      <div style="float: right; height: 70px" v-if="nowType === 1 || nowType === 2">
        <c-button
          paddingW="24px"
          height="50px"
          class="alert-button"
          @click="cancelAll"
          :disabled="!tabelList.length"
          marginTop="0px"
        >
          <!-- 撤销全部订单 -->
          {{ $t("futures.order.cancelAll") }}
        </c-button>
      </div>
      <!-- <div style="float:right;height:70px;" v-if="nowType === 4 || nowType === 5 ">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="exportCSV"
                  :disabled="!tabelList.length"
                  marginTop="20px">
                  导出CSV
          </c-button>
        </div>
        <div style="float:left;height:50px;" v-if="nowType === 3">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="exportCSV"
                  :disabled="!tabelList.length"
                  marginTop="0px">
                  导出CSV
          </c-button>
        </div> -->
    </div>
    <div class="otcOrder-table">
      <div class="title">{{ calCurType.name || "--" }}</div>
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :cellHeight="55"
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/order/coOrder/coOrder";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/order/coOrder/coOrder.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  computed: {
    // 当前类别
    calCurType() {
      const { navTab, nowType } = this;
      if (navTab && nowType) {
        return navTab.find((item) => nowType === item.index) || {};
      }
      return {};
    },
  },
};
</script>
<style scoped>
.page-otcOrder {
}
.m-title {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: var(--color-1);
  padding: 34px 0 0 44px;
  box-sizing: border-box;
}
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  margin-top: 25px;
  position: relative;
  margin: 36px 44px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-tab > .switchBtn {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
}
.m-tab > .switchBtn > .text {
  padding-left: 10px;
}
.m-tab > .item {
  /*width: 144px;*/
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
  font-weight: 600;
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
.otcOrder-table > .title {
  font-weight: 600;
  font-size: 18px;
  color: var(--color-1);
  margin-bottom: 18px;
}

/deep/.common-select .input_line_inp {
  width: 100%;
}
.page-otcOrder .otcOrder-table /deep/.table-head,
.page-otcOrder .otcOrder-table /deep/.table-body-bar,
.page-otcOrder .otcOrder-table /deep/.pagination {
  /* padding: 0 20px !important; */
}
.page-otcOrder .otcOrder-table /deep/.table-head {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background: var(--color-BG);
}
.page-otcOrder .otcOrder-table /deep/.button,
.link,
.icon-btn {
  font-weight: 600;
  background: var(--color-Input-fill);
  border: 1px solid var(--color-Input-fill);
}
/deep/.table-head th {
  font-size: 14px;
}
/deep/.table-body .sub-table-btn .view-icon {
  border-color: var(--mainColor) transparent transparent;
}
/deep/.table-body {
  min-height: unset;
}
/deep/.common-button.common-button-solid-disabled .common-button-slot {
  color: var(--color-BTN-disabled-text);
}
.page-otcOrder .otcOrder-options {
  display: flex;
  align-items: flex-start;
  min-height: 70px;
}
.page-otcOrder .otcOrder-options > * {
  flex: 1;
  min-width: 100px;
}
.page-otcOrder .otcOrder-table {
  box-sizing: border-box;
  padding-top: 20px;
  min-height: 600px;
}
</style>
