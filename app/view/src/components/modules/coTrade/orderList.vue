<template>
  <div class="order-list-box" :class="{ 'trigge-order-list': orderType === 2 }">
    <div class="tab-box a-3-bd e-2-cl">
      <span
        class="tab-item"
        v-for="(item, index) in tabTypeItem"
        :key="index + 'tab'"
        @click="switchType(index)"
        :class="{ 'selected b-1-cl a-12-bd': orderType === index }"
      >
        {{ item }}
      </span>
      <div style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%)">
        <c-button
          v-if="0 < orderType && orderType < 3 && dataList.length"
          height="26px"
          :disabled="!dataList || !dataList.length"
          paddingW="6px"
          marginTop="6px"
          @click="elementClick('cancelOrder', '{}')"
        >
          <!-- 全部取消 -->
          {{ $t("futures.orderList.allCancel") }}
        </c-button>
      </div>
      <div class="is-show-active" v-if="orderType === 0">
        <!--<c-switch :value="isShowCurPosition" @click="switchChange"/>-->
        <c-checkBox :value="isShowCurPosition" @click="switchChange"></c-checkBox>
        <span class="txt">
          <!-- 仅当前合约 -->
          {{ $t("futures.orderList.newText16") }}
        </span>
      </div>
    </div>
    <div class="sub-tab-box a-3-bd e-2-cl" v-if="orderType === 2">
      <span
        class="tab-item"
        v-for="(item, index) in subTabTypeItem"
        :key="index + 'tab'"
        @click="subSwitchType(index)"
        :class="{ active: triggeType === index }"
      >
        {{ item }}
      </span>
    </div>
    <div class="order-conent">
      <vue-scroll>
        <div class="not-login" v-if="!isLogin">
          <!-- 请 -->
          {{ $t("futures.orderList.tstext1") }}
          <span class="b-4-cl" @click="goPage('login')">
            <!-- 登录/注册 -->
            {{ $t("futures.orderList.tstext2") }}
          </span>
          <!-- 再进行操作 -->
          {{ $t("futures.orderList.tstext3") }}
        </div>
        <template v-else>
          <!-- 持仓列表 -->
          <positionLis v-if="orderType === 0" />
          <c-table
            v-else
            :columns="columns"
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList="dataList"
            :loading="tableLoading"
            :cellHeight="cellHeight"
            @elementClick="elementClick"
            :bodyClasses="bodyClasses"
          />
        </template>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/orderList/orderList";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/orderList/orderList.styl";
import positionLis from "./component/positionLis.vue";

export default {
  mixins: [mixin],
  components: { positionLis },
  mounted() {
    this.init();
  },
  // 组件离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
};
</script>
<style scoped>
.tab-box .tab-item {
  position: relative;
  height: 100%;
}
.tab-box .tab-item::after,
.order-list-box .sub-tab-box .tab-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
}
/* 2022.12.28 修改样式 */
.order-list-box .tab-box .tab-item.selected {
  border: none;
  font-weight: 600;
  color: var(--mainColor);
}
.tab-box .tab-item.selected::after,
.order-list-box .sub-tab-box .tab-item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 22px 100%
    no-repeat;
}
.order-list-box .tab-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-right: 100px;
  position: relative;
  height: 44px;
  gap: 20px;
  border-bottom: 1px solid var(--color-Input-border);
}

.order-list-box .tab-box .tab-item {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
  text-transform: capitalize;
  &:hover {
    color: var(--color-text-primary);
  }
}
.order-list-box .sub-tab-box .tab-item.active {
  color: var(--color-text-primary);
}
.order-list-box .tab-box .is-show-active {
  position: absolute;
  top: 0;
  right: 20px;
  height: 44px;
  float: unset;
}

.is-show-active > .txt {
  padding-left: 8px;
}
.order-list-box {
  background: var(--trade-color-1);
  border-radius: 8px;
}
.order-conent /deep/.h5Box {
  margin-top: 8px;
}
.order-list-box /deep/.table-body .no-data p {
  margin-top: 20px !important;
}
.order-list-box /deep/.table-body .no-data {
  padding-block: 40px;
}
.order-list-box .order-conent /deep/.__panel {
  margin-right: -16px !important;
}
</style>
