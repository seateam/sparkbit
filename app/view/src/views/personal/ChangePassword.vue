<template>
  <div class="user-management-change-password">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl"/>
    <div class="m-title">{{ $t("personal.changePassword.title") }}</div>
    <div class="user-management-center">
      <div class="center-input">
        <c-inputLine
          maxLength="20"
          name="oldPassword"
          inputType="password"
          :promptText="promptText1"
          :errorHave="true"
          :errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
          @focus="checkFocus(1)"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="20"
          name="newPassword"
          inputType="password"
          :promptText="promptText2"
          :errorHave="true"
          :errorText="errorText2"
          :errorFlag="checkErrorFlag2"
          marginTop="0px"
          :value="checkValue2"
          @onchanges="inputChanges"
          @focus="checkFocus(2)"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="20"
          name="newPasswordAgain"
          inputType="password"
          :promptText="promptText3"
          :errorHave="true"
          :errorText="errorText3"
          :errorFlag="checkErrorFlag3"
          marginTop="0px"
          :value="checkValue3"
          @onchanges="inputChanges"
          @focus="checkFocus(3)"
        >
        </c-inputLine>
        <c-inputLine
          v-if="smsCode"
          maxLength="6"
          name="smsCode"
          inputType="text"
          :promptText="promptText4"
          :errorHave="true"
          :errorText="errorText4"
          :errorFlag="checkErrorFlag4"
          marginTop="0px"
          :value="checkValue4"
          @onchanges="inputChanges"
          @focus="checkFocus(4)"
        >
          <!-- 获取验证码 -->
          <c-getCode name="loginGetcode" @click="getCodeClick" buttonName="loginGetcodeBtn" />
        </c-inputLine>
        <c-inputLine
          v-if="googleCode"
          maxLength="6"
          name="googleCode"
          inputType="text"
          :promptText="promptText5"
          :errorHave="true"
          :errorText="errorText5"
          :errorFlag="checkErrorFlag5"
          marginTop="0px"
          :value="checkValue5"
          @onchanges="inputChanges"
          @focus="checkFocus(5)"
        >
        </c-inputLine>
        <div class="warn-info">
          <img :src="imgMap.pwd_info" class="info-icon" />
          <span style="padding-left: 5px">{{ $t("personal.prompt.warningChangePassword") }}</span>
        </div>
        <c-button
          type="solid"
          :big="true"
          className=""
          paddingW="0px"
          :disabled="disabled"
          :loading="loading"
          marginTop="18px"
          height="50px"
          width="100%"
          @click="btnLink"
          >{{ $t("personal.tool.modify") }}</c-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/ChangePassword/ChangePassword";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/ChangePassword/ChangePassword.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.user-management-change-password .user-management-center {
  height: auto;
  box-sizing: border-box;
  margin-top: 60px;
}
.m-title {
  font-weight: 700;
  color: var(--color-1);
  height: 120px;
  line-height: 120px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
/deep/.input-line-content {
  margin-bottom: 4px;
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-Input-fill) !important;
}
/deep/.common-button.common-button-solid-disabled {
  color: var(--color-text-disabled);
}
.warn-info {
  padding: 0 0 10px 0;
  display: flex;
}
.warn-info img {
  width: 12px;
  height: 12px;
  padding: 2px;
}
.warn-info span {
  color: #9F99FF;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
</style>
