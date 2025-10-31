<template>
  <div class="advertising-management m-page">
    <div class="title">{{ $t("personal.navMenu.list.advertisingManagement") }}</div>
    <div class="m-tab" style="margin-bottom: 22px">
      <div
        class="item"
        v-for="(item, index) in navTab"
        :key="index"
        @click="currentType(item)"
        :class="{ active: item.index == currentTab }"
      >
        {{ item.name }}
      </div>
    </div>
    <!--<div class="advertising-management-header a-3-bd clearfix">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    className="b-2-cl"-->
    <!--    :currentTab="currentTab"-->
    <!--    :navTab="navTab"-->
    <!--    :lineHeight="lineHeight"-->
    <!--    :marginRight="marginRight"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--</div>-->
    <div class="advertising-management-center">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :classes="classes"
        :loading="loading"
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
      <p class="dialog-p">{{ $t("personal.dialog.closeAdPrompt") }}</p>
    </c-dialog>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/advertisingManagement/advertisingManagement";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/advertisingManagement/advertisingManagement.styl";

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
.m-tab {
  margin: 0 44px;
}
.advertising-management-center {
  margin: 0 20px;
}
.advertising-management .advertising-management-center {
  width: auto;
}
.m-page > .title {
  font-weight: 600;
  color: var(--color-text-primary);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  border-bottom: 1px solid var(--color-26);
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
  font-size: 16px;
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

.m-page /deep/.table-head {
  background: var(--color-BG);
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
</style>
