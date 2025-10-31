<template>
  <div class="SafetyRecord m-safetyRecord">
    <div class="title">{{ $t("personal.navMenu.list.safetyRecord") }}</div>
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

    <!--<p class="user-management-child-header a-3-bd b-2-cl">-->
    <!--  <c-navTab-->
    <!--    activeClassName="b-1-cl"-->
    <!--    activeColor="a-12-bg"-->
    <!--    class="b-2-cl"-->
    <!--    :currentTab="currentTab"-->
    <!--    :navTab="navTab"-->
    <!--    :lineHeight="lineHeight"-->
    <!--    :marginRight="marginRight"-->
    <!--    @currentType="currentType"-->
    <!--  />-->
    <!--</p>-->
    <div style="border-radius: 12px; overflow: hidden; margin: 0px 44px">
      <div class="user-management-center">
        <c-table
          class="login-history"
          :imgMap="imgMap"
          :colorMap="colorMap"
          v-show="currentTab === 1"
          :loading="loading1"
          :classes="classes"
          :headClasses="headClasses"
          :bodyClasses="bodyClasses"
          :lineClasses="lineClass"
          :columns="columns"
          :dataList="dataList"
          :lineNumber="lineNumber"
          :cellHeight="cellHeight"
          :headHeight="headHeight"
        />
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          v-show="currentTab === 2"
          :classes="classes"
          :loading="loading2"
          :headClasses="headClasses"
          :bodyClasses="bodyClasses"
          :lineClasses="lineClass"
          :columns="columns2"
          :dataList="dataList2"
          :lineNumber="lineNumber"
          :cellHeight="cellHeight"
          :headHeight="headHeight"
        />
      </div>
      <div class="pagination">
        <div v-show="currentTab === 1">
          <c-pagination
            v-if="count / pageSize > 1"
            :total="count"
            :current-page="page"
            :display="pageSize"
            @pagechange="pagechange"
          />
        </div>
        <div v-show="currentTab === 2">
          <c-pagination
            v-if="count2 / pageSize2 > 1"
            :total="count2"
            :current-page="page2"
            :display="pageSize2"
            @pagechange="pagechange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/SafetyRecord/SafetyRecord";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/SafetyRecord/SafetyRecord.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.m-safetyRecord {
  box-sizing: border-box;
  font-family: Outfit;
}
.m-tab {
  margin: 0 20px 0 44px;
}
.m-safetyRecord > .title {
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 32px;
  box-sizing: border-box;
  padding: 44px 0 44px 44px;
}
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  border-bottom: 1px solid var(--color-Toggle);
  font-size: 16px;
}
.m-tab > .item {
  margin-right: 40px;
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
.SafetyRecord /deep/.table-head {
  background: var(--color-BG);
  margin: 0;
  box-sizing: border-box;
}
.SafetyRecord /deep/.table-head tr {
  height: 40px !important;
  font-size: 14px;
  color: var(--color-13);
}
/deep/.pagination.a-5-bg {
  background: var(--bgColor);
}
/deep/.table-body .table-body-bar {
  color: var(--color-1);
}
</style>
