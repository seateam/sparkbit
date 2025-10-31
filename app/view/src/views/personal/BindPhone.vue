<template>
  <div class="bind-phone a-5-bg">
    <div class="m-title">{{ $t("personal.bindPhone.title") }}</div>
    <!--<p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.bindPhone.title')}}</p>-->
    <div class="user-management-center a-5-bg">
      <div class="center-input">
        <!-- 选择国家 -->
        <c-select
          :value="country"
          :promptText="promptText"
          @onChanges="countryChange"
          name="country"
          :errorHave="true"
          :errorFlag="countryErrorFlag"
          :errorText="errorText"
          :options="countryList"
          :filterable="true"
        />
        <c-inputLine
          name="phone"
          maxLength="20"
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
          name="phoneCode"
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
            name="phone"
            :autoStart="false"
            @click="getCodeClick('phone')"
            buttonName="loginGetcodeBtn"
          />
        </c-inputLine>
        <c-inputLine
          v-if="googleCode"
          maxLength="6"
          name="googleCode"
          inputType="text"
          :promptText="promptText3"
          :errorHave="true"
          :errorText="errorText3"
          :errorFlag="checkErrorFlag3"
          marginTop="0px"
          :value="checkValue3"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-button
          type="solid"
          :big="true"
          :loading="loading"
          className=""
          paddingW="0px"
          :disabled="disabled"
          marginTop="18px"
          height="40px"
          width="100%"
          @click="btnLink"
          >{{ this.$t("personal.tool.bind") }}</c-button
        >
      </div>
    </div>
    <!-- 安全提醒 -->
    <c-dialog
      :showFlag="dialogFlag"
      :titleText="$t('registerOptions.title')"
      :haveOption="true"
      :confirmText="$t('registerOptions.conf')"
      :closeText="$t('registerOptions.close')"
      @close="dialogClose"
      @confirm="dialogConfirm"
    >
      <div class="bindPhone-warn">
        {{ $t("registerOptions.text") }}
      </div>
    </c-dialog>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/BindPhone/BindPhone";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/BindPhone/BindPhone.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.bind-phone .user-management-center {
  height: auto;
  background-color: var(--bgColor);
  box-sizing: border-box;
  padding-top: 50px;
}
.m-title {
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  background: #1f2328;
  box-sizing: border-box;
  padding-left: 52px;
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-24) !important;
}

/deep/.common-getCode .common-button-slot {
  color: var(--mainColor);
  font-size: 14px;
}
/deep/.common-button.u-8-bg {
  background: var(--mainColor);
  color: #0c0e11;
}
</style>
