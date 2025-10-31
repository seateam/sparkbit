<template>
  <div class="user-management-close-google a-5-bg">
    <!--<p class="user-management-child-header b-2-cl a-3-bd">{{$t('personal.closeGoogle.title')}}</p>-->
    <div class="m-title">{{$t('personal.closeGoogle.title')}}</div>
    <div class="user-management-center a-5-bg">
      <div class="management-center">
        {{sendEmailCode}}
      <c-inputLine
        name="smsCode"
        maxLength="6"
        inputType="text"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="smsCode"
          @click="getCodeClick"
          :autoStart="false"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
        <c-inputLine
          name="googleCode"
          maxLength="6"
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
      <c-button type="solid"
              :big="true"
              :loading = "loading"
              className=""
              paddingW="0px"
              :disabled="disabled"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink">{{$t('personal.tool.submit')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/personal/CloseGoogle/CloseGoogle';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/personal/CloseGoogle/CloseGoogle.styl';

export default {
  mixins: [mixin],
};
</script>
<style scoped>
.user-management-close-google,
.user-management-center {
  background: var(--bgColor);
}
.m-title {
  font-weight: 600;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  background: #1F2328;
  box-sizing: border-box;
  padding-left: 52px;
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-24) !important;
}
</style>
