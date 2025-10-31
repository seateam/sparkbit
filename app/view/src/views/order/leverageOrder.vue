<template>
  <section class="page-exchangeOrder">
    <div class="m-title">{{ $t("order.index.leverage") }}</div>
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

        <div class="switchBtn" v-if="nowType === 2">
          <!-- 显示已撤单 -->
          <c-switch :value="switchFlag" @click="switchChange" />
          <span class="text">{{ $t("order.otcOrder.haveCancel") }}</span>
        </div>
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
        :filterable="true"
        width="100%"
        @onChanges="symbolCoinChange"
      />
    </div>
    <!--<div class="exchangeOrder-nav a-3-bd">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="b-2-cl"-->
    <!--    :currentTab="nowType"-->
    <!--    :navTab="navTab"-->
    <!--    lineHeight="55"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--  <div class="exchangeOrder-nav-switchs" v-if="nowType === 2">-->
    <!--    &lt;!&ndash; 显示已撤单 &ndash;&gt;-->
    <!--    <c-switch-->
    <!--      :value="switchFlag"-->
    <!--      @click="switchChange"/>-->
    <!--    <span class="text">{{ $t('order.exchangeOrder.haveCancel') }}</span>-->
    <!--  </div>-->
    <!--</div>-->
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/order/leverageOrder/leverageOrder";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/order/leverageOrder/leverageOrder.styl";

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
  background: var(--color—BG);
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
}
.m-tab > .switchBtn {
  display: flex;
  align-items: center;
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
  margin: 0 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-Toggle);
}
.page-exchangeOrder .exchangeOrder-options {
  width: 100%;
  padding: 0 44px;
  display: inline-flex;
  gap: 20px;
  align-items: center;
}
.exchangeOrder-table > .title {
  font-weight: 400;
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
  background: var(--color-BG);
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
  padding: 20px 44px;
  min-height: 600px;
}
</style>
