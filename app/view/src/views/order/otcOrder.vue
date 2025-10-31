<template>
  <section class="page-otcOrder m-page">
    <div class="m-title">
      {{ !fiatTradeOpen ? $t("order.index.otcOrder") : $t("assets.b2c.otcShow.otcOrder") }}
    </div>
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
    <div class="otcOrder-options">
      <c-select
        :promptText="$t('order.otcOrder.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="300px"
        :filterable="true"
        @onChanges="symbolChange"
      />
    </div>
    <!--<div class="otcOrder-nav a-3-bd">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-2-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="b-2-cl"-->
    <!--    :currentTab="nowType"-->
    <!--    :navTab="navTab"-->
    <!--    lineHeight="55"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--  <div class="otcOrder-nav-switchs" v-if="nowType === 2">-->
    <!--    &lt;!&ndash; 显示已撤单 &ndash;&gt;-->
    <!--    <c-switch-->
    <!--      :value="switchFlag"-->
    <!--      @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>-->
    <!--  </div>-->
    <!--</div>-->
    <div class="otcOrder-table">
      <div class="title">{{ calCurType.name || "--" }}</div>
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/order/otcOrder/otcOrder";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/order/otcOrder/otcOrder.styl";

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
    fiatTradeOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.fiat_trade_open === "1") {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
.m-page {
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
.page-otcOrder > .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 44px 0 44px;
  border-bottom: 1px solid var(--color-Toggle);
}
.page-otcOrder .otcOrder-options {
  width: auto;
}
.otcOrder-table > .title {
  font-weight: 600;
  font-size: 18px;
  color: var(--color-text-primary);
  margin-bottom: 18px;
}

/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
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
.link {
  font-weight: 600;
  background: var(--color-Input-fill);
  border: 1px solid var(--color-Input-fill);
}
/deep/.table-body td .icon-btn {
  border: none;
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
.page-otcOrder .otcOrder-table {
  box-sizing: border-box;
  padding-top: 20px;
  min-height: 600px;
}
.page-otcOrder /deep/tbody tr {
  border-top: 1px solid var(--color-Toggle);
  border-bottom: 1px solid var(--color-Toggle);
}
.page-otcOrder /deep/.button.trade-btn {
  background: var(--mainColor);
  float: right;
  display: flex;
  padding: 0 20px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 0;
  color: #fff;
}
.page-otcOrder /deep/.u-8-cl {
  color: var(--color-text-primary);
}

.page-otcOrder /deep/.html.user {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.page-otcOrder /deep/.subtext.sub-content {
  color: var(--color-text-primary);
}
</style>
