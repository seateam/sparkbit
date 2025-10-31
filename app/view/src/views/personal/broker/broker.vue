<template>
  <!--eslint-disable-->
  <div class="ex-broker m-page">
    <div class="title">{{ $t("brokerSystem.overviewTitle[2]") }}</div>
    <div class="m-head">
      <div class="m-tab">
        <div
          class="item"
          v-for="(item, index) in tabList"
          :key="index"
          @click="switcherType(item.key)"
          :class="{ active: tableType === item.key }"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="m-user">
        <div class="user">
          <div class="avatar">
            <img :src="headImg" />
          </div>
          <div class="info">
            <div class="email">{{ vuserName }}</div>
            <div class="msg">
              <!--邀请总人数-->
              <div style="margin-right: 40px">
                {{ $t("broker.invitations") }} <span>{{ userCount }}</span>
              </div>
              <!--累计返佣-->
              <div>
                {{ $t("broker.revenue") }}
                <span
                  >{{ fixDFun(allBonusAmount, allBonusCoin) }}
                  {{ allBonusCoin | getCoinShowName(coinList) }}</span
                >
              </div>
            </div>
            <div class="msg">
              <!--我的角色-->
              <div v-if="username" style="margin-right: 40px">
                {{ $t("broker.myType") }} <span>{{ username }}</span>
              </div>
              <!--直接邀请人数-->
              <div v-if="isDiractShow">
                {{ $t("broker.indirect") }} <span>{{ indirect }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="warp main-content">
      <div class="m-selectBox">
        <!-- 合约/现货筛选 -->
        <c-select
          v-if="tableType === 'agent_data'"
          :value="tradeTypeValue"
          name="tradeTypeValue"
          :promptText="tradeTypeText"
          :options="tradeTypeOption"
          @onChanges="selectOnChange"
          width="230px"
        />
        <!-- 币种 -->
        <c-select
          v-if="tradeTypeValue === 'spot'"
          :value="coinValue"
          :promptText="symbolType"
          width="230px"
          name="coinValue"
          :options="coinOPtion"
          :filterable="true"
          @onChanges="selectOnChange"
        />
        <!-- 日期 -->
        <c-calendar
          v-if="tableType === 'agent_account'"
          width="230px"
          name="calendar"
          :value="calendarData"
          :promptText="timeText"
          @onChanges="onChangeCalendar"
        />
        <!-- 类型 -->
        <c-select
          :value="typeValue"
          :promptText="type"
          width="230px"
          name="typeValue"
          :options="typeOption"
          @onChanges="selectOnChange"
        />
        <!-- 搜索输入框 -->
        <c-inputLine
          v-if="typeValue"
          name="searchValue"
          :value="searchValue"
          width="220px"
          :promptText="promptText"
          :errorHave="errorHave"
          @onchanges="inputLineChange"
        >
        </c-inputLine>
      </div>
      <div class="mining-data">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="dataList"
          :loading="tableLoading"
          :bodyClasses="bodyClasses"
          :headClasses="headClasses"
          @elementClick="goViewPage"
        />
      </div>
      <c-pagination
        v-if="pagination.count / pagination.pageSize > 1"
        :total="pagination.count"
        classes="c-4-bg"
        :current-page="pagination.page"
        :display="pagination.pageSize"
        @pagechange="pagechange"
      >
      </c-pagination>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/broker/broker/broker";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/broker/broker/broker.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
.m-tab {
  height: 70px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  box-sizing: border-box;
  padding-top: 30px;
  margin: 0 44px 0 44px;
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
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #929292;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item.active {
  color: var(--color-1);
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
  color: rgba(255, 255, 255, 0.6);
}

.m-user {
  position: relative;
  box-sizing: border-box;
  padding: 43px 44px 0 44px;
}
.m-user > .user {
  display: flex;
  align-items: center;
}
.m-user > .user > .avatar {
  width: 80px;
  height: 80px;
  background: #f3f3f3;
  border-radius: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-user > .user > .avatar img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.m-user > .user > .info {
  padding-left: 24px;
}
.m-user > .user > .info > .email {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-1);
}
.m-user > .user > .info > .msg {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-7);
  margin-top: 12px;
}
.m-user > .user > .info > .msg span {
  color: var(--mainColor);
  font-weight: 600;
}
.m-selectBox {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.ex-broker /deep/.common-select,
.ex-broker /deep/.input-line-content {
  margin-right: 20px;
  /* background: var(--color-BG-Light); */
}
/deep/.common-button {
  padding: 0 20px;
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
}
/deep/.common-button .common-button-slot {
  font-size: 14px;
  color: var(--color-text-primary);
}
/deep/.common-select .input_line_content,
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-BG-Light) !important;
}

.main-content {
  margin-top: 28px !important;
  padding: 0px 44px;
  box-sizing: border-box;
}
.m-page /deep/.table-head {
  background: var(--color-BG);
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}
.m-page /deep/.table-head tr {
  height: 40px !important;
  font-size: 14px;
  color: var(--color-13);
}
.m-page /deep/.table-body-bar {
  padding: 0;
}
.m-head {
  height: 226px;
  position: relative;
}
.m-head > .img {
  position: absolute;
  bottom: 40px;
  right: 98px;
}
/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
</style>
