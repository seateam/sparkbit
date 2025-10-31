<!-- 2022.12.23 样式重构 -->
<template>
  <div class="broker m-page">
    <!-- :style="username? backgroundImg2 : backgroundImg"-->
    <div class="top-content">
      <div>
        <div class="warp">
          <h2 class="page-title f-8-cl">
            <!-- 经纪人系统 -->
            {{ $t("broker.broker") }}
          </h2>
          <div v-if="!isLogin" class="page-desc">{{ $t("broker.description") }}</div>
          <div v-else class="m-wkInfo">
            <!--我的角色-->
            <div class="item" v-if="username">
              <div class="txt">{{ $t("broker.myType") }}</div>
              <div class="num">{{ username || "-" }}</div>
            </div>
            <!--邀请总人数-->
            <div class="item">
              <div class="txt">{{ $t("broker.invitations") }}</div>
              <div class="num">{{ userCount }}</div>
            </div>
            <!--直接邀请人数-->
            <div class="item" v-if="isDiractShow">
              <div class="txt">{{ $t("broker.indirect") }}</div>
              <div class="num">{{ indirect }}</div>
            </div>
            <!-- 累计返佣 -->
            <div class="item">
              <div class="txt">{{ $t("broker.revenue") }}</div>
              <div class="num">
                {{ fixDFun(allBonusAmount, allBonusCoin)
                }}{{ allBonusCoin | getCoinShowName(coinList) }}
              </div>
            </div>
          </div>
          <c-button height="52px" paddingW="24px" type="hollow" className="closeBtnClass">{{
            $t("broker.referralbtn")
          }}</c-button>
        </div>
        <img class="imgBg" :src="brokerImg" />
      </div>
    </div>
    <!--推广码-->
    <div class="m-promoCode">
      <div class="item">
        <div class="title">{{ $t("personal.userManagement.inviteLink") }}</div>
        <div class="box">
          <span style="margin-right: 12px">{{ inviteCode }}</span>
          <svg
            @click="copy(inviteCode)"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
          >
            <path
              class="dark-show"
              d="M6 16.0176C5.45 16.0176 4.97917 15.8217 4.5875 15.4301C4.19583 15.0384 4 14.5676 4 14.0176V2.01758C4 1.46758 4.19583 0.996745 4.5875 0.605078C4.97917 0.213411 5.45 0.0175781 6 0.0175781H15C15.55 0.0175781 16.0208 0.213411 16.4125 0.605078C16.8042 0.996745 17 1.46758 17 2.01758V14.0176C17 14.5676 16.8042 15.0384 16.4125 15.4301C16.0208 15.8217 15.55 16.0176 15 16.0176H6ZM6 14.0176H15V2.01758H6V14.0176ZM2 20.0176C1.45 20.0176 0.979167 19.8217 0.5875 19.4301C0.195833 19.0384 0 18.5676 0 18.0176V4.01758H2V18.0176H13V20.0176H2Z"
              fill="white"
            />
            <path
              class="light-show"
              d="M6 16.0176C5.45 16.0176 4.97917 15.8217 4.5875 15.4301C4.19583 15.0384 4 14.5676 4 14.0176V2.01758C4 1.46758 4.19583 0.996745 4.5875 0.605078C4.97917 0.213411 5.45 0.0175781 6 0.0175781H15C15.55 0.0175781 16.0208 0.213411 16.4125 0.605078C16.8042 0.996745 17 1.46758 17 2.01758V14.0176C17 14.5676 16.8042 15.0384 16.4125 15.4301C16.0208 15.8217 15.55 16.0176 15 16.0176H6ZM6 14.0176H15V2.01758H6V14.0176ZM2 20.0176C1.45 20.0176 0.979167 19.8217 0.5875 19.4301C0.195833 19.0384 0 18.5676 0 18.0176V4.01758H2V18.0176H13V20.0176H2Z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>
      <div class="item" style="flex: 1">
        <div class="title">{{ $t("personal.label.inviteUrl") }}</div>
        <div class="box">
          <span style="font-size: 14px; margin-right: 12px">{{ inviteUrl }}</span>
          <svg
            @click="copy(inviteUrl)"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
          >
            <path
              class="dark-show"
              d="M6 16.0176C5.45 16.0176 4.97917 15.8217 4.5875 15.4301C4.19583 15.0384 4 14.5676 4 14.0176V2.01758C4 1.46758 4.19583 0.996745 4.5875 0.605078C4.97917 0.213411 5.45 0.0175781 6 0.0175781H15C15.55 0.0175781 16.0208 0.213411 16.4125 0.605078C16.8042 0.996745 17 1.46758 17 2.01758V14.0176C17 14.5676 16.8042 15.0384 16.4125 15.4301C16.0208 15.8217 15.55 16.0176 15 16.0176H6ZM6 14.0176H15V2.01758H6V14.0176ZM2 20.0176C1.45 20.0176 0.979167 19.8217 0.5875 19.4301C0.195833 19.0384 0 18.5676 0 18.0176V4.01758H2V18.0176H13V20.0176H2Z"
              fill="white"
            />
            <path
              class="light-show"
              d="M6 16.0176C5.45 16.0176 4.97917 15.8217 4.5875 15.4301C4.19583 15.0384 4 14.5676 4 14.0176V2.01758C4 1.46758 4.19583 0.996745 4.5875 0.605078C4.97917 0.213411 5.45 0.0175781 6 0.0175781H15C15.55 0.0175781 16.0208 0.213411 16.4125 0.605078C16.8042 0.996745 17 1.46758 17 2.01758V14.0176C17 14.5676 16.8042 15.0384 16.4125 15.4301C16.0208 15.8217 15.55 16.0176 15 16.0176H6ZM6 14.0176H15V2.01758H6V14.0176ZM2 20.0176C1.45 20.0176 0.979167 19.8217 0.5875 19.4301C0.195833 19.0384 0 18.5676 0 18.0176V4.01758H2V18.0176H13V20.0176H2Z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>
      <div class="item" style="margin-left: 32px">
        <div class="btn" @click="showInviteBox()">{{ langTxt.text1 }}</div>
      </div>
      <div class="item" v-if="inviteCode" style="margin-left: 32px">
        <div class="code">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              class="dark-show"
              d="M0 8.90647V0.0175781H8.88889V8.90647H0ZM2.22222 6.68425H6.66667V2.2398H2.22222V6.68425ZM0 20.0176V11.1287H8.88889V20.0176H0ZM2.22222 17.7954H6.66667V13.3509H2.22222V17.7954ZM11.1111 8.90647V0.0175781H20V8.90647H11.1111ZM13.3333 6.68425H17.7778V2.2398H13.3333V6.68425ZM17.7778 20.0176V17.7954H20V20.0176H17.7778ZM11.1111 13.3509V11.1287H13.3333V13.3509H11.1111ZM13.3333 15.5731V13.3509H15.5556V15.5731H13.3333ZM11.1111 17.7954V15.5731H13.3333V17.7954H11.1111ZM13.3333 20.0176V17.7954H15.5556V20.0176H13.3333ZM15.5556 17.7954V15.5731H17.7778V17.7954H15.5556ZM15.5556 13.3509V11.1287H17.7778V13.3509H15.5556ZM17.7778 15.5731V13.3509H20V15.5731H17.7778Z"
              fill="white"
            />
            <path
              class="light-show"
              d="M0 8.90647V0.0175781H8.88889V8.90647H0ZM2.22222 6.68425H6.66667V2.2398H2.22222V6.68425ZM0 20.0176V11.1287H8.88889V20.0176H0ZM2.22222 17.7954H6.66667V13.3509H2.22222V17.7954ZM11.1111 8.90647V0.0175781H20V8.90647H11.1111ZM13.3333 6.68425H17.7778V2.2398H13.3333V6.68425ZM17.7778 20.0176V17.7954H20V20.0176H17.7778ZM11.1111 13.3509V11.1287H13.3333V13.3509H11.1111ZM13.3333 15.5731V13.3509H15.5556V15.5731H13.3333ZM11.1111 17.7954V15.5731H13.3333V17.7954H11.1111ZM13.3333 20.0176V17.7954H15.5556V20.0176H13.3333ZM15.5556 17.7954V15.5731H17.7778V17.7954H15.5556ZM15.5556 13.3509V11.1287H17.7778V13.3509H15.5556ZM17.7778 15.5731V13.3509H20V15.5731H17.7778Z"
              fill="#000000"
            />
          </svg>

          <div class="imgBox">
            <img v-if="inviteQECode" :src="inviteQECode" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!--总览-->
    <!-- <div class="m-overview">
      <div class="title">{{ langTxt.text2 }}</div>
      <div class="ct">
        <div class="box">
          <div class="head">{{ $t("broker.invitations") }}</div>
          <div class="num">{{ userCount }}</div>
        </div>
        <div class="box">
          <div class="head">
            {{ $t("broker.revenue") }} ({{ allBonusCoin | getCoinShowName(coinList) }})≈
          </div>
          <div class="num">{{ fixDFun(allBonusAmount, allBonusCoin) }}</div>
        </div>
      </div>
    </div> -->
    <div class="ct">
      <div class="m-tabBox">
        <!--tab选择-->
        <div class="m-tab">
          <div
            class="item"
            :class="{ active: tableType === item.key }"
            v-for="(item, index) in tabList"
            :key="index"
            @click="switcherType(item.key)"
          >
            {{ item.text }}
          </div>
        </div>
        <div class="search">
          <!-- 合约/现货筛选 -->
          <c-select
            v-if="tableType === 'agent_data'"
            :value="tradeTypeValue"
            name="tradeTypeValue"
            :promptText="tradeTypeText"
            :options="tradeTypeOption"
            @onChanges="selectOnChange"
            height="50px"
            class="trade-type-select"
            :styles="selectStyles"
          />
          <!-- 币种 -->
          <!-- :promptText="symbolType" -->
          <c-select
            v-if="tradeTypeValue === 'spot'"
            :value="coinValue"
            name="coinValue"
            :promptText="symbolType"
            :options="coinOPtion"
            :filterable="true"
            @onChanges="selectOnChange"
            height="50px"
            class="coin-select"
            :styles="selectStyles"
          />
          <!-- 日期 -->
          <c-calendar
            className="calendar"
            :promptText="timeText"
            v-if="tableType === 'agent_account'"
            name="calendar"
            :value="calendarData"
            @onChanges="onChangeCalendar"
            width="180px"
            height="50px"
            class="calendar"
            :styles="selectStyles"
          />
          <!-- 类型 -->
          <c-select
            :value="typeValue"
            :promptText="type"
            name="typeValue"
            :options="typeOption"
            @onChanges="selectOnChange"
            height="50px"
            class="type-select"
            :styles="selectStyles"
          />
          <!-- 搜索输入框 -->
          <c-inputLine
            v-if="typeValue"
            name="searchValue"
            :value="searchValue"
            :promptText="promptText"
            :errorHave="errorHave"
            @onchanges="inputLineChange"
            width="180px"
            height="50px"
            class="text-select"
            :styles="selectStyles"
          >
          </c-inputLine>
        </div>
      </div>
      <!--表格内容-->
      <div class="m-tableBox">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="dataList"
          :loading="tableLoading"
          :headClasses="headClasses"
          :cellHeight="80"
          @elementClick="goViewPage"
        />
        <c-pagination
          v-if="pagination.count / pagination.pageSize > 1"
          :total="pagination.count"
          :current-page="pagination.page"
          :display="pagination.pageSize"
          @pagechange="pagechange"
        >
        </c-pagination>
      </div>
    </div>

    <c-dialog
      paddingBottom="14px"
      :showFlag="showInvite"
      @close="hideInviteBox"
      :haveOption="false"
      class="invite-dialog"
    >
      <div class="invite-box">
        <img class="logo dark-show" :src="imgMap.sparkbit" alt="" />
        <img class="logo light-show" :src="imgMap.sparkbit_1" alt="" />
        <div class="img-box" style="text-align: center">
          <img class="banner" :src="imgMap.join" alt="" />
          <div class="txt">{{ $t("broker.JoinSparkBit") }}</div>
          <div class="dec">{{ $t("broker.joindesc") }}</div>
        </div>
        <div class="content">
          <div>
            <div class="title">{{ userText() }}</div>
            <div class="desc" v-html="$t('broker.invitedesc')"></div>
          </div>
          <div class="QRcode">
            <img :src="inviteQECode" alt="" />
          </div>
        </div>
      </div>
    </c-dialog>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/broker/broker/broker";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/broker/broker/broker.styl";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      imgMap,
      // 2022.12.23 新增input样式
      selectStyles: {
        marginLeft: "12px",
      },
      // 邀请码信息
      inviteCode: "",
      inviteQECode: "",
      inviteUrl: "",
      showInvite: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    lang() {
      return this.$store.state.baseData.lan;
    },
    langTxt() {
      return {
        text1: this.$t("replenish.footer.InviteFriends"),
        text2: this.$t("replenish.footer.Overview"),
      };
    },
  },
  watch: {
    userInfo: {
      handler(val) {
        if (val) {
          // 邀请码信息
          this.inviteCode = this.userInfo.inviteCode;
          this.inviteQECode = this.userInfo.inviteQECode;
          this.inviteUrl = this.userInfo.inviteUrl;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    copy(str) {
      if (!str) {
        this.$bus.$emit("tip", { text: this.$t("trade.pleaseLogin"), type: "error" });
        return;
      }
      this.$bus.$emit("tip", { text: this.$t("personal.prompt.copySucces"), type: "success" });
      function save(e) {
        e.clipboardData.setData("text/plain", str); // 下面会说到clipboardData对象
        e.preventDefault(); // 阻止默认行为
      }
      document.addEventListener("copy", save);
      document.execCommand("copy"); // 使文档处于可编辑状态，否则无效
      document.removeEventListener("copy", save);
    },
    showInviteBox() {
      if (!this.isLogin) {
        this.$router.push("/login");
      } else {
        this.showInvite = true;
      }
    },
    hideInviteBox() {
      this.showInvite = false;
    },
    userText() {
      if (this.userInfo) {
        return this.userInfo.userAccount;
      }
      return "";
    },
  },
};
</script>
<style scoped>
.broker {
  --bgColor: #181a1f;
}
.broker .top-content {
  height: 240px;
  padding-block: 40px;
  margin-top: 64px;
  position: relative;
}
.broker .warp {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--color-text-primary);
}
.m-wkInfo {
  display: flex;
}
.m-wkInfo > .item:not(:last-child) {
  padding-right: 40px;
  margin-right: 40px;
  border-right: 1px solid #fff;
}
.m-wkInfo > .item > .num {
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
}
.m-wkInfo > .item > .txt {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 4px;
}
.m-tab {
  display: flex;
  gap: 40px;
}
.m-tab > .item {
  position: relative;
  font-style: normal;
  height: 55px;
  line-height: 55px;
  color: var(--color-text-secondary);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 3px;
}
.m-tab > .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 38px 100%
    no-repeat;
}
.dark .m-tab > .item.active,
.light .m-tab > .item.active {
  color: var(--color-text-primary);
}
.m-tabBox {
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  margin: auto;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-tableBox {
  width: 100%;
  height: 477px;
  border-radius: 12px;
  box-sizing: border-box;
  margin: auto;
}
/* 2022.12.23 深入选择器修改下拉框样式 */
/deep/.common-select.coin-select {
  width: 140px !important;
}
/deep/.common-select.coin-select .input_line_inp {
  /* margin-top: 0px; */
}
/deep/.calendar.common-select .input_line_inp {
  margin-top: 8px !important;
}
/deep/.common-select.type-select,
/deep/.common-select.type-select .input_line_content {
  width: 180px !important;
}
/deep/.common-select .input_line_inp {
  width: 84px !important;
}
/deep/.common-select .icon-triangle {
  border-color: var(--color-text-primary);
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-Input-fill) !important;
  border-color: var(--color-Input-border) !important;
}
/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}

.m-tableBox/deep/.table-head {
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border-bottom-width: 0;
  background: transparent;
}
/deep/.common-table.h-1-bg {
  background: var(--bgColor);
}
/deep/.table-body-bar {
  padding: 0;
}
/deep/.table-body.c-4-bg {
  background: var(--bgColor);
}
/deep/.common-table table {
  font-size: 14px;
}

.m-tableBox > .head /deep/.common-select {
  width: 180px !important;
  height: 35px;
}
.m-page > .top-content {
  position: relative;
  background: radial-gradient(69.61% 151.49% at 30.89% 40.88%, #737be3 11.73%, #3901a7 100%);
}
.m-page > .top-content > div {
  display: flex;
  align-items: center;
  width: 66.66vw;
  margin-inline: auto;
}
.m-page > .top-content .imgBg {
  width: 478px;
  height: 236px;
}
.m-page {
  background: var(--color-BG);
}
.m-tabBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  height: auto;
  margin-block: 52px 12px;
  box-sizing: border-box;
}
.m-tabBox > .search {
  display: flex;
  align-items: center;
}

/deep/.calendar .input_line_activeLine {
  display: none !important;
}
/deep/.calendar .icon-triangle.icon-triangle-down {
  bottom: 25px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}
/deep/.text-select {
  margin-left: 12px;
}
/deep/.text-select.input-line-content .input-line-baseStance .input_line_inp .input {
  color: var(--color-text-primary) !important;
}
/deep/.calendar .input_line_prompt,
/deep/.type-select .input_line_prompt {
  left: 8px;
}
/deep/.type-select .input_line_prompt {
  line-height: 36px;
}
/deep/.calendar.common-select .input_line_prompt {
  bottom: 13px;
}
/deep/.calendar.common-select .input_line_inp {
  margin-top: 19px;
}
/deep/.table-body td .common-button {
  width: 102px !important;
  height: 40px !important;
  padding: 0 20px;
  border-radius: 100px;
  background: var(--BTN-primary, #6a60ff);
}
/deep/.table-body td .common-button .common-button-slot {
  color: var(--color-BTN-primary-text);
  font-size: 16px;
  font-style: normal;
}
.broker .page-title {
  margin-top: 0;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  text-align: left;
}
.broker .page-desc {
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  max-width: 600px;
}
.broker .top-content /deep/.closeBtnClass {
  border-color: #fff;
  width: min-content;
}
.broker .top-content /deep/.closeBtnClass.u-8-cl .common-button-slot {
  color: rgba(255, 255, 255, 0.8);
}

.m-promoCode {
  width: 66.66vw;
  height: 124px;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid var(--color-Toggle);
  background: var(--color-BG-Light);
  margin: 40px auto;
  display: flex;
  box-sizing: border-box;
}
.m-promoCode > .item:first-child {
  padding-right: 2.08vw;
  border-right: 1px solid var(--color-Toggle);
  margin-right: 2.08vw;
}
.m-promoCode > .item > .title {
  margin-bottom: 8px;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
}

.m-promoCode > .item > .box {
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  white-space: nowrap;
}
.m-promoCode > .item > .box > svg,
.m-promoCode > .item > .btn {
  cursor: pointer;
}

.m-promoCode > .item > .btn {
  border-radius: 100px;
  background: var(--color-BTN-primary);
  height: 52px;
  margin-top: 4px;
  line-height: 52px;
  padding-inline: 24px;
  text-align: center;
  color: var(--color-BTN-primary-text);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  white-space: nowrap;
}
.m-promoCode > .item > .code {
  width: 52px;
  height: 52px;
  border-radius: 100px;
  border: 2px solid var(--color-BTN-secondary-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  cursor: pointer;
  position: relative;
}
.m-promoCode > .item > .code:hover .m-promoCode > .item > .code .imgBox {
  display: block;
}
.m-promoCode > .item > .code > .imgBox {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 3;
}
.m-promoCode > .item > .code > .imgBox > img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.m-promoCode > .item > .code:hover > .imgBox {
  display: block;
}

.m-overview {
  width: 1178px;
  height: 234px;
  border-radius: 8px;
  border: 1px solid var(--color-16);
  margin: 20px auto 36px;
  box-sizing: border-box;
  padding: 35px 26px 0;
}
.m-overview > .title {
  color: var(--color-1);
  font-size: 22px;
  font-weight: 600;
  line-height: 27px;
}
.m-overview > .ct {
  display: flex;
  align-items: center;
  margin-top: 23px;
}
.m-overview > .ct > .box {
  width: 556px;
  height: 114px;
  border-radius: 4px;
  background: var(--color-16);
  box-sizing: border-box;
  padding: 26px 28px;
}
.m-overview > .ct > .box:first-child {
  margin-right: 18px;
}
.m-overview > .ct > .box > .head {
  display: flex;
  align-items: center;
  color: var(--color-13);
  font-size: 16px;
  line-height: 22px;
}
.m-overview > .ct > .box > .num {
  color: var(--color-1);
  font-size: 27px;
  line-height: 33px;
  margin-top: 8px;
}
.m-page > .ct {
  width: 66.66vw;
  margin: 0 auto;
}
.light .m-page > .ct {
  border-width: 0;
}
/deep/.common-dialog.invite-dialog .dialog-frame {
  width: 29.16vw;
  height: auto !important;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body {
  width: 100%;
  padding: 0 1.25vw 1.25vw;
  box-sizing: border-box;
  margin: -3vw 0 0;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body .logo {
  width: 7.6vw;
  height: 1.6vw;
  margin: 0 auto;
}

/deep/.common-dialog.invite-dialog .dialog-frame-body .img-box {
  position: relative;
  width: 26.6vw;
  height: 21.09vw;
  margin-block: 1.25vw;
  color: var(--color-BTN-primary-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body .img-box .txt {
  position: relative;
  font-size: 2.9vw;
  font-weight: 700;
  line-height: 3.6vw;
  margin-bottom: 8px;
  width: 100%;
  white-space: nowrap;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body .img-box .dec {
  position: relative;
  font-size: 1.6vw;
  font-weight: 500;
  line-height: 1.875vw;
  width: 20.88vw;
  margin-inline: auto;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body .banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 26.6vw;
  height: 21.09vw;
}
/deep/.common-dialog.invite-dialog .dialog-frame-body .QRcode {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.25vw;
  min-width: 6.25vw;
  height: 6.25vw;
  border-radius: 8px;
  overflow: hidden;
}
.common-dialog.invite-dialog .dialog-frame-body .QRcode img {
  width: 120%;
  height: 120%;
}
.common-dialog.invite-dialog .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.common-dialog.invite-dialog .title {
  color: var(--color-text-primary);
  font-size: 1.66vw;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.common-dialog.invite-dialog .desc {
  padding-right: 12px;
  color: var(--color-text-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
/deep/.table-body td .common-button {
  border: 1px solid var(--color-BTN-primary);
}
</style>
