<template>
  <section class="page-exchangeOrder">
    <div class="m-title">{{ $t("order.index.exOrder") }}</div>
    <div class="wrap">
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
      <div class="switchBtn" v-if="nowType === 2">
        <!-- 显示已撤单 -->
        <c-switch :value="switchFlag" @click="switchChange" />
        <span class="text">{{ $t("order.exchangeOrder.haveCancel") }}</span>
      </div>
    </div>
    <div class="exchangeOrder-options">
      <!-- 类别 -->
      <c-select
        :promptText="$t('order.exchangeOrder.type')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="100%"
        @onChanges="sideChange"
      />
      <!-- 市场 -->
      <c-select
        :promptText="$t('order.exchangeOrder.market')"
        :value="symbolMarket"
        :options="symbolMarketList"
        :errorHave="true"
        width="100%"
        :filterable="true"
        @onChanges="symbolMarketChange"
      />
      <!-- 币种 -->
      <c-select
        :promptText="$t('order.exchangeOrder.coin')"
        :value="symbolCoin"
        :options="symbolCoinList"
        :errorHave="true"
        width="100%"
        :filterable="true"
        @onChanges="symbolCoinChange"
      />
    </div>
    <div class="exchangeOrder-table">
      <div class="title">{{ calCurType.name || "--" }}</div>
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
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
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/order/exchangeOrder/exchangeOrder";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/order/exchangeOrder/exchangeOrder.styl";

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
.page-exchangeOrder {
  background: var(--color-BG);
  margin: 0 44px;
}
.m-title {
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: var(--color-1);
  padding: 34px 0 0 0;
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
}
.switchBtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-left: 20px;
}
.m-tab > .switchBtn > .text {
  padding-left: 10px;
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
  /* background: #316ad5; */
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
.page-exchangeOrder > .wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-Toggle);
}
.page-exchangeOrder .exchangeOrder-options {
  display: inline-flex;
  width: 100%;
  gap: 20px;
}

.exchangeOrder-table > .title {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: var(--color-1);
  margin-bottom: 18px;
}
/* 修改内部组件 */
.exchangeOrder-options /deep/.common-select .input_line_content {
  border-radius: 6px !important;
}
/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
.page-exchangeOrder .exchangeOrder-table /deep/.table-head,
.page-exchangeOrder .exchangeOrder-table /deep/.table-body-bar,
.page-exchangeOrder .exchangeOrder-table /deep/.pagination {
  /* padding: 0 20px !important; */
}
.page-exchangeOrder .exchangeOrder-table /deep/.table-head {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  /* background: var(--order-color-3); */
}
.page-exchangeOrder .exchangeOrder-table /deep/.button,
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

.page-exchangeOrder .exchangeOrder-table {
  box-sizing: border-box;
  min-height: 600px;
  padding: 0;
}
</style>
