<template>
  <div class="m-page">
    <div class="m-title">{{ $t("personal.navMenu.list.apiManagement") }}</div>
    <ModifyApi v-if="modifyApiShow" :getApiList="getApiList"></ModifyApi>
    <div class="api-management" v-if="!modifyApiShow">
      <div class="m-tab">
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
      <div v-show="currentTab === 1">
        <div class="m-search">
          <c-inputLine
            name="ip"
            inputType="text"
            :promptText="promptText1"
            :errorHave="true"
            :errorText="errorText1"
            :errorFlag="checkErrorFlag1"
            marginTop="0px"
            :value="checkValue1"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          <c-inputLine
            name="note"
            maxLength="25"
            inputType="text"
            :promptText="promptText2"
            :errorHave="true"
            :errorText="errorText2"
            :errorFlag="checkErrorFlag2"
            marginTop="0px"
            :value="checkValue2"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          <c-inputLine
            v-show="smsCode"
            maxLength="6"
            name="phoneCode"
            inputType="text"
            :promptText="promptText3"
            :errorHave="true"
            :errorText="errorText3"
            :errorFlag="checkErrorFlag3"
            marginTop="0px"
            :value="checkValue3"
            @onchanges="inputChanges"
          >
            <!-- 获取验证码 -->
            <c-getCode
              name="phone"
              :autoStart="autoStart"
              @click="getCodeClick"
              buttonName="loginGetcodeBtn"
            />
          </c-inputLine>
          <c-inputLine
            v-show="googleCode"
            name="googleCode"
            maxLength="6"
            inputType="text"
            :promptText="promptText4"
            :errorHave="true"
            :errorText="errorText4"
            :errorFlag="checkErrorFlag4"
            marginTop="0px"
            :value="checkValue4"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          <c-button
            type="solid"
            :big="true"
            className=""
            :loading="loading2"
            paddingW="0px"
            :disabled="disabled"
            height="46px"
            width="96px"
            @click="btnLink"
            >{{ $t("personal.tool.create") }}</c-button
          >

          <!--<div class="img">-->
          <!--  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--    <path d="M40 32.0001C42.68 32.0001 44.84 29.8401 44.84 27.1601C44.84 24.4801 42.68 22.3201 40 22.3201C37.32 22.3201 35.16 24.4801 35.16 27.1601C35 29.6801 37.16 32.0001 40 32.0001Z" fill="#AAACB0"/>-->
          <!--    <path d="M27.8401 34.6801L24.4801 38.0001L28.9601 42.4801L32.2801 39.1601C33.6001 40.0001 35.1201 40.6401 36.7601 41.0001V45.6801H43.0801V41.0001C44.7601 40.6801 46.2401 40.0001 47.5601 39.1601L50.8801 42.4801L55.5201 38.0001L52.2001 34.6801C53.0401 33.3601 53.7201 31.8401 54.0401 30.2001H58.7201V23.8401H54.0001C53.6801 22.1601 53.0001 20.6801 52.1601 19.3601L55.4801 16.0401L51.0001 11.5601L47.6801 14.8801C46.3601 14.0401 44.8401 13.3601 43.2001 13.0401V8.32007H36.8401V13.0001C35.1601 13.3201 33.6801 14.0001 32.3601 14.8401L29.0401 11.5201L24.4801 16.0001L27.8001 19.3201C26.9601 20.6401 26.2801 22.1601 25.9601 23.8001H21.3201V30.1201H26.0001C26.3201 31.8401 26.8401 33.3201 27.8401 34.6801ZM40.0001 17.6801C45.1601 17.6801 49.4801 21.8401 49.4801 27.1601C49.4801 32.3201 45.3201 36.6801 39.9601 36.6801C34.6001 36.6801 30.4801 32.4801 30.4801 27.1601C30.4801 21.8401 34.6801 17.6801 40.0001 17.6801Z" fill="#316AD5"/>-->
          <!--    <path d="M71.6801 54.16C71.5201 53.32 71.3601 53.0001 71.3601 53.0001L63.6801 32.3201C63.3601 31.3201 62.5201 30.8 61.2001 30.8H58.8801L60.4001 34.8L66.4001 51.28H13.3201L19.3201 34.8L20.8401 30.8H18.6801C17.3601 30.8 16.6801 31.2801 16.2001 32.3201L8.52011 53.0001C8.52011 53.1601 8.36011 53.5201 8.36011 53.68V69.2001C8.36011 70.5201 9.36011 71.6801 10.8401 71.6801H69.0001C70.3201 71.6801 71.4801 70.5201 71.4801 69.2001C71.6801 69.16 71.5201 55 71.6801 54.16ZM38.8401 65.68C36.6801 65.68 34.8401 63.8401 34.8401 61.6801C34.8401 59.5201 36.6801 57.68 38.8401 57.68C41.0001 57.68 42.8401 59.5201 42.8401 61.6801C42.8401 63.8401 41.0001 65.68 38.8401 65.68ZM50.1601 65.68C48.0001 65.68 46.1601 63.8401 46.1601 61.6801C46.1601 59.5201 48.0001 57.68 50.1601 57.68C52.3201 57.68 54.1601 59.5201 54.1601 61.6801C54.1601 63.8401 52.4801 65.68 50.1601 65.68ZM61.6801 65.68C59.5201 65.68 57.6801 63.8401 57.6801 61.6801C57.6801 59.5201 59.5201 57.68 61.6801 57.68C63.8401 57.68 65.6801 59.5201 65.6801 61.6801C65.6801 63.8401 63.8401 65.68 61.6801 65.68Z" fill="#AAACB0"/>-->
          <!--  </svg>-->
          <!--</div>-->
        </div>
        <div class="m-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
          >
            <path
              d="M0 19L11 0L22 19H0ZM3.45 17H18.55L11 4L3.45 17ZM11 16C11.2833 16 11.5208 15.9042 11.7125 15.7125C11.9042 15.5208 12 15.2833 12 15C12 14.7167 11.9042 14.4792 11.7125 14.2875C11.5208 14.0958 11.2833 14 11 14C10.7167 14 10.4792 14.0958 10.2875 14.2875C10.0958 14.4792 10 14.7167 10 15C10 15.2833 10.0958 15.5208 10.2875 15.7125C10.4792 15.9042 10.7167 16 11 16ZM10 13H12V8H10V13Z"
              fill="#222222"
            />
          </svg>
          <span class="clearfix">{{ $t("personal.prompt.warningApi") }}</span>
        </div>
        <div class="m-table">
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :loading="loading"
            :classes="classes"
            :headClasses="headClasses"
            :bodyClasses="bodyClasses"
            :lineClasses="lineClass"
            :columns="columns"
            :dataList="apiList"
            :lineNumber="lineNumber"
            :cellHeight="cellHeight"
            :headHeight="headHeight"
            @elementClick="deleteData"
          />
          <c-pagination
            v-show="count !== 0"
            :total="count"
            :current-page="page"
            :display="pageSize"
            @pagechange="pagechange"
          ></c-pagination>
        </div>
      </div>

      <div class="api-management-center">
        <div class="center2 clearfix" v-show="currentTab === 2">
          <a
            :href="apiDocument"
            @mouseenter="handMouseenter"
            @mouseleave="handMouseleave"
            target="_blank"
            class="api-down b-2-cl"
            >{{ $t("personal.APImanagement.viewDocumen") }}</a
          >
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes="classes"
            :headClasses="headClasses"
            :bodyClasses="bodyClasses"
            :lineClasses="lineClass"
            :columns="columns2"
            :dataList="apiList2"
            :lineNumber="lineNumber"
            :cellHeight="cellHeight"
            :headHeight="headHeight"
            @elementClick="deleteData"
          />
        </div>
        <div class="center3 clearfix" v-show="currentTab === 3">
          <a
            :href="apiDocument"
            target="_blank"
            @mouseenter="handMouseenter"
            @mouseleave="handMouseleave"
            class="api-down b-2-cl"
            >{{ $t("personal.APImanagement.viewDocumen") }}</a
          >
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes="classes"
            :headClasses="headClasses"
            :bodyClasses="bodyClasses"
            :lineClasses="lineClass"
            :columns="columns2"
            :dataList="apiList3"
            :lineNumber="lineNumber"
            :cellHeight="cellHeight"
            :headHeight="headHeight"
            @elementClick="deleteData"
          />
        </div>
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
        <div class="dialog-div a-4-bg">
          <ul>
            <li class="a-5-bd">
              <p class="b-2-cl">{{ $t("personal.APImanagement.secretKey") }}</p>
              <p class="b-2-cl">
                {{ secretKey }}
                <span
                  @click="copyClick('secretKey')"
                  @mouseenter="handMouseenters('secretKey')"
                  @mouseleave="handMouseleaves('secretKey')"
                  >>
                  <span v-if="secretKeyShow">
                    <svg class="icon icon-14" aria-hidden="true">
                      <use xlink:href="#icon-a_9"></use>
                    </svg>
                  </span>
                  <span v-else>
                    <svg class="icon icon-14" aria-hidden="true">
                      <use xlink:href="#icon-a_9_1"></use>
                    </svg>
                  </span>
                </span>
              </p>
            </li>
            <li class="a-5-bd">
              <p class="b-2-cl">{{ $t("personal.APImanagement.APIKye") }}</p>
              <p class="b-2-cl">
                {{ apiKey }}
                <span
                  @click="copyClick('apiKey')"
                  @mouseenter="handMouseenters('apiKey')"
                  @mouseleave="handMouseleaves('apiKey')"
                >
                  <span v-if="apiKeyShow">
                    <svg class="icon icon-14" aria-hidden="true">
                      <use xlink:href="#icon-a_9"></use>
                    </svg>
                  </span>
                  <span v-else>
                    <svg class="icon icon-14" aria-hidden="true">
                      <use xlink:href="#icon-a_9_1"></use>
                    </svg>
                  </span>
                </span>
              </p>
            </li>
            <li class="b-4-bd">
              <p class="b-2-cl">{{ $t("personal.APImanagement.ip") }}</p>
              <p class="b-2-cl">{{ checkValue1 }}</p>
            </li>
          </ul>
        </div>
      </c-dialog>
      <!-- 提示框 -->
      <c-alert
        :showFlag="alertFlag"
        :buttonText="$t('assets.addressMent.GotoOpen')"
        :imgMap="imgMap"
        @close="alertClose"
        @confirm="alertGo"
      >
        <div class="alertTitle b-2-cl">{{ $t("personal.alert.title") }}</div>
        <div class="alertText">{{ $t("personal.alert.text") }}</div>
        <div class="alertError a-2-bd" @click="linkTo('/personal/BindGoogle')">
          <span class="alertError-text b-4-cl">{{
            $t("personal.alert.alertErrorTextGoogle")
          }}</span>
          <span class="alertError-icon">+</span>
        </div>
        <!-- 2023.05.29 反馈文档要求去掉 -->
        <!--<div class="alertError alertBot a-2-bd">-->
        <!--  <span class="alertError-text b-4-cl">{{$t('personal.alert.alertErrorTextPhone')}}</span>-->
        <!--  <span class="alertError-icon">+</span>-->
        <!--</div>-->
      </c-alert>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/APImanagement/APImanagement";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/APImanagement/APImanagement.styl";
import ModifyApi from "./modifyApi.vue";

export default {
  mixins: [mixin],
  components: {
    ModifyApi,
  },
  mounted() {
    this.init();
  },
  computed: {
    apiDocument() {
      return this.$store.state.systemConfig.apiDocument;
    },
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped>
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  box-sizing: border-box;
  margin: 0 44px;
  border-bottom: 1px solid var(--color-Toggle);
  padding-top: 20px;
}
.m-title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
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
.m-page /deep/.table-body-bar {
  padding: 0 24px;
}

.m-search {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  padding: 50px 44px 20px 44px;
}
.m-search /deep/.input-line-content .input-line-baseStance {
  background: var(--color-24) !important;
}
.m-search /deep/.input-line-content {
  width: 240px !important;
  margin-right: 20px;
}
.m-search /deep/.input-line-content .input-line-baseStance .input_line_inp .input {
  width: 100%;
}
.m-search /deep/button.u-8-bg {
  background: var(--mainColor);
}
.m-search /deep/button {
  margin-bottom: 24px;
}
.m-search > .img {
  position: absolute;
  bottom: 32px;
  right: 98px;
}
.m-warning {
  background: var(--color-Favorite);
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #222;
  font-weight: 600;
  margin: 0 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 12px 10px;
  position: relative;
}
.m-warning > span {
  padding-left: 8px;
}
.m-table {
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 28px;
}
.api-management-center {
  box-sizing: border-box;
  padding: 0 20px;
}
.api-management .api-management-center .center2 .api-down,
.api-management .api-management-center .center3 .api-down {
  width: auto;
  max-width: 200px;
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
  box-sizing: border-box;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.api-management .api-management-center .center2 .api-down:hover,
.api-management .api-management-center .center3 .api-down:hover {
  color: var(--color-text-primary);
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
}
.api-management-center /deep/.table-head th:first-child {
  width: 50%;
}
.alertError {
  cursor: pointer;
}
/deep/.table-body .table-body-bar.b-1-cl {
  color: var(--color-1);
}
/deep/.common-button.common-button-solid-disabled {
  color: var(--color-BTN-disabled-text);
}
</style>
