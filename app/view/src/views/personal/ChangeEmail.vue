<template>
  <div class="user-management-change-email">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl"/>
    <div class="m-title">{{ $t("personal.changeEmail.title") }}</div>
    <!--<p class="user-management-child-header b-1-cl a-3-bd a-5-bg">-->
    <!--  {{$t('personal.changeEmail.title')}}</p>-->
    <div class="user-management-center">
      <!--<p class="center-title b-7-cl">-->
      <!--  <svg class="icon icon-16" aria-hidden="true">-->
      <!--    <use xlink:href="#icon-c_2"></use>-->
      <!--  </svg>{{$t('personal.prompt.warningChangeEmail')}}</p>-->
      <div class="center-input">
        <c-inputLine
          name="oldEmail"
          inputType="text"
          :promptText="promptText1"
          :errorHave="true"
          :disabled="true"
          errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-inputLine
          maxLength="6"
          name="oldEmailCode"
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
            name="oldEmailCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"
          />
        </c-inputLine>
        <c-inputLine
          maxLength="100"
          name="newEmail"
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
          maxLength="6"
          name="newEmailCode"
          inputType="text"
          :promptText="promptText6"
          :errorHave="true"
          :errorText="errorText6"
          :errorFlag="checkErrorFlag6"
          marginTop="0px"
          :value="checkValue6"
          @onchanges="inputChanges"
        >
          <!-- 获取验证码 -->
          <c-getCode
            name="newEmailCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"
          />
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
        >
          <!-- 获取验证码 -->
          <c-getCode
            name="smsCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"
          />
        </c-inputLine>
        <c-inputLine
          v-if="googleCode"
          name="googleCode"
          maxLength="6"
          inputType="text"
          :promptText="promptText5"
          :errorHave="true"
          :errorText="errorText5"
          :errorFlag="checkErrorFlag5"
          marginTop="0px"
          :value="checkValue5"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <!--<div>-->
        <!--  <svg class="icon icon-16" aria-hidden="true">-->
        <!--    <use xlink:href="#icon-c_2"></use>-->
        <!--  </svg>-->
        <!--  <span style="padding-left: 10px" class="b-7-cl">{{$t('personal.prompt.warningChangeEmail')}}</span>-->
        <!--</div>-->
        <c-button
          type="solid"
          :loading="loading"
          :big="true"
          className=""
          paddingW="0px"
          :disabled="disabled"
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
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/ChangeEmail/ChangeEmail";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/ChangeEmail/ChangeEmail.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.user-management-change-email .user-management-center {
  height: auto;
  box-sizing: border-box;
  padding-top: 50px;
}
.m-title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  box-sizing: border-box;
  margin: 0 44px;
  /* border-bottom: 1px solid var(--color-Toggle); */
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-Input-fill) !important;
}
/deep/.common-getCode .common-button-slot {
  color: var(--color-text-primary);
  font-weight: 400;
  font-size: 14px;
}
/deep/.common-button.u-8-bg {
  background: var(--mainColor);
}
/deep/.common-button.common-button-solid-disabled {
  color: var(--color-text-disabled);
}
</style>
