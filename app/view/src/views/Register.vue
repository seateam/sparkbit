// Created by 任泽阳 on 18/12/06. // 注册页面
<template>
  <div class="page-register">
    <!--  改，2022.12.15 隐藏-->
    <!--    <div class="go-home-btn a-3-bd" @click="goUrl('/')">-->
    <!--      <svg class="icon icon-18" aria-hidden="true">-->
    <!--        <use xlink:href="#icon-e_11"></use>-->
    <!--      </svg>-->
    <!--      {{ $t("pageTitle.home") }}-->
    <!--    </div>-->

    <!-- 引导
    <c-intoGuide :imgMap="imgMap">
      <div class="guide-center">
        欢迎注册
        <p :class="isInternationTem ? 'b-1-cl' : 'b-8-cl'">
          {{ registerPageTitle }}
        </p>
        <div class="guide-text b-2-cl">
          已经是注册用户
          <span class="guide-ht">{{ $t("register.AlreadyAregisteredUser") }} </span>
          立即登录
          <c-button type="text" className="goLogin logBtn" @click="goUrl('/login')">
            {{ $t("register.logInImmediately") }}
          </c-button>
        </div>
      </div>
    </c-intoGuide> -->
    <!-- 改，2022.12.15 重构页面-->
    <div class="left" :style="{ backgroundImage: `url(${imgMap.spark_register})` }">
      <div class="box" :class="{'rulang': lang === 'ru_RU'}">{{ $t("login.tradingSlogan") }}</div>
    </div>
    <div class="m-register">
      <div class="title">{{ $t("pageTitle.register") }}</div>
      <div class="tab">
        <div
          v-for="item in tabList"
          class="item"
          :class="{ active: nowType == item.key }"
          @click="setNowType(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="formBody">
        <!-- 选择国家 -->
        <c-select
          v-if="nowType === 'phone'"
          :value="country"
          :filterable="true"
          :promptText="$t('register.location')"
          @onChanges="countryChange"
          @opent-chang="countryFocus"
          name="country"
          :errorHave="true"
          :errorFlag="countryErrorFlag"
          :errorText="$t('register.PleaseSelectAcountry')"
          :options="countryList"
          :customInputStyle="{ width: '352px' }"
          class="select_input_class"
        />
        <!-- 手机号/邮箱 -->
        <c-inputLine
          :maxLength="maxLength"
          :key="domKeys.userKey"
          name="userValue"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @focus="userFocus"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <!-- 密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.passKey"
          inputType="password"
          name="passValue"
          :value="passValue"
          :promptText="$t('register.password')"
          :errorHave="true"
          :errorText="$t('register.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <div class="m-tips">{{ passValue.length }}/20</div>
        </c-inputLine>
        <!-- 确认密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.comfirmKey"
          inputType="password"
          name="comfirmValue"
          :value="comfirmValue"
          :promptText="$t('register.confirmPassword')"
          :errorHave="true"
          :errorText="$t('register.confirmPasswordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <div class="m-tips">{{ comfirmValue.length }}/20</div>
        </c-inputLine>
        <!-- 邀请码 -->
        <c-inputLine
          v-if="templateType !== '3' || !urlHasinvitedCode"
          :key="domKeys.invitedKey"
          name="invitedValue"
          :value="invitedValue"
          :promptText="invitedText"
          :errorHave="true"
          :errorText="$t('register.InvitationCodeError')"
          :errorFlag="invitedErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <div class="resgister-opions" v-if="coinsKrwOpen !== '1'">
          <c-checkBox :value="textFlag" @click="checkoutClick" />
          <span class="text" @click="checkoutClick(!textFlag)">
            <!-- 我已阅读并同意 -->
            {{ $t("register.IHaveReadAndAgreed") }}
            {{ $store.state.systemConfig.company_name }}
          </span>
          <!-- <a>服务条款</a> <a>隐私保护</a> -->
          <!-- 用户协议 -->
          <!-- <router-link to="cms/agreement"
            target="_blank"
            class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
          <c-button type="text" className="goLogin" @click="goUrl('cms/agreement')">
            {{ $t("register.UserAgreement") }}
          </c-button>
        </div>
        <div v-else>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag" @click="checkoutClick" />
            <span class="text" @click="checkoutClick(!textFlag)">
              <!-- 我已阅读并同意 -->
              {{ $t("krwAdd.regstmust") }}
              {{ $t("register.IHaveReadAndAgreed") }}
              {{ $store.state.systemConfig.company_name }}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text" className="goLogin" @click="goUrl('cms/ystk1')">
              <!-- 隐私条款 -->
              {{ $t("krwAdd.regst1") }}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag2" @click="checkoutClick2" />
            <span class="text" @click="checkoutClick2(!textFlag2)">
              <!-- 我已阅读并同意 -->
              {{ $t("krwAdd.regstmust") }}
              {{ $t("register.IHaveReadAndAgreed") }}
              {{ $store.state.systemConfig.company_name }}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text" className="goLogin" @click="goUrl('cms/agreement1')">
              <!-- 用户协议 -->
              {{ $t("krwAdd.regst2") }}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag3" @click="checkoutClick3" />
            <span class="text" @click="checkoutClick3(!textFlag3)">
              <!-- 我已阅读并同意 -->
              {{ $t("krwAdd.regstother") }}
              {{ $t("register.IHaveReadAndAgreed") }}
              {{ $store.state.systemConfig.company_name }}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text" className="goLogin" @click="goUrl('cms/yxgg')">
              <!-- 营销广告使用同意书 -->
              {{ $t("krwAdd.regst3") }}
            </c-button>
          </div>
        </div>

        <!-- 注册 -->
        <c-button
          marginTop="20px"
          height="49px"
          width="100%"
          :disabled="submitDisabled"
          :loading="submitLoading"
          @click="buttonClick"
          paddingW="0px"
        >
          {{ submitButtonText }}
        </c-button>

        <!-- 改，2022.09.28，并新返回登录页 -->
        <div
          class="m-loginBtn"
          style="display: flex; align-items: center; justify-content: center; margin-top: 24px"
        >
          <c-button
            type="text"
            className="logBtn"
            @click="goUrl('/login')"
            style="padding: 0px; font-size: 16px"
            width="100%"
            class="backToLogin"
          >
            {{ $t("resetPass.backToLogin") }}
          </c-button>
        </div>
        <!--  跳转下载APP-->
        <div class="m-downApp">
          {{ $t('register.AlreadyAregisteredUser') }}
          <span @click="linkTo('/appDownload')">{{ $t('register.gotoDown') }}</span>
        </div>
      </div>
    </div>
    <c-dialog
      :showFlag="dialogFlag"
      :titleText="$t('login.SecurityVerification')"
      :haveOption="haveOption"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
    >
      <!--<c-verify-->
      <!--  :key="domKeys.verifyKey"-->
      <!--  :colorMap="colorMap"-->
      <!--  marginTop="6px"-->
      <!--  :errorHave="true"-->
      <!--  v-if="!haveOption"-->
      <!--  geetestBg="a-5-bg"-->
      <!--  @callback="verifyCallBack"-->
      <!--  class="login_input_class"-->
      <!--/>-->
      <!--滑动验证-->
      <VuePictureVerify
        v-if="!haveOption"
        @success="verifyHandler('success')"
        ref="VuePictureVerify"
      ></VuePictureVerify>

      <c-inputLine
        v-else
        maxLength="6"
        :key="domKeys.checkKey"
        name="checkValue"
        :value="checkValue"
        :promptText="domTexts.codeText"
        :errorHave="true"
        :errorText="domTexts.codeError"
        :errorFlag="checkErrorFlag"
        @onchanges="inputChanges"
        class="login_input_class"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="registerGetcode"
          @click="getCodeClick"
          @clear="getCodeClear"
          :autoStart="false"
          buttonName="registerGetcodeBtn"
        />
      </c-inputLine>
    </c-dialog>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/register/register";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/register/register.styl";
import "../assets/js/encrypt.js";
import { isMobile } from "@/utils/newUtils";
import VuePictureVerify from "../components/vue-picture-verify.vue";

// 滑动验证
export default {
  mixins: [mixin],
  components: { VuePictureVerify },
  mounted() {
    this.init();
    isMobile();
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
    // 校验回调
    verifyHandler(type) {
      if (type === "success") {
        this.verifyFlag = true;
        this.verifyObj = {
          geetest_challenge: "43c606f5d77dac0a5eda4261b75d001cjx",
          geetest_seccode: "7a1ba8dc7453a6deabd8ae7b45bb42d5|jordan",
          geetest_validate: "7a1ba8dc7453a6deabd8ae7b45bb42d5",
          token: true,
          verificationType: "2",
        };
        this.submit();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.backToLogin {
  .common-button-slot {
    color: #ffffff
  }
}

.login_input_class {
  .input-line-baseStance {
    background: var(--color-14) !important;
  }
  .input {
    color: #ffffff !important
  }
  .input::placeholder {
    color: #fff9 !important
  }
  .common-button-text {
    color: #ffffff
  }

  /* 验证 */
  .common-geetest-baseStance {
    background: var(--color-14) !important;
  }
  .geetest_radar_btn {
    background: var(--color-14) !important;
  }
  .geetest_success_btn {
    background: var(--color-14) !important;
  }
}

/* 选择器 */
.select_input_class {
  .input_line_content {
    background: var(--color-14) !important;
  }
  .input_line_prompt {
    color: var(--color-text-secondary) !important
  }
  .icon-triangle-down {
    border-color: #ffffff !important
  }
  .input_line_inp {
    color: #ffffff !important
  }
}
</style>
<style>
#captchaBox .geetest_holder.geetest_wind .geetest_radar_btn,
#captchaBox .geetest_holder.geetest_wind .geetest_radar_btn:hover,
#captchaBox .geetest_holder.geetest_wind .geetest_success_btn,
#captchaBox .geetest_holder.geetest_wind .geetest_success_btn:hover {
  background: #262628 !important;
}
.isH5 .common-dialog .dialog-frame {
  zoom: 0.75;
}
</style>
<style scoped>
/deep/#captchaBox {
  background: var(--color-14) !important;
  border-color: transparent;
  width: 100%;
}
/deep/.common-button .common-button-slot {
  color: var(--color-13);
}
/deep/.common-button.u-9-bg {
  background-color: transparent;
}
.formBody .login_input_class /deep/.input-line-baseStance,
.login_input_class /deep/.common-geetest-baseStance {
  background: var(--color-14) !important;
  width: 444px;
  height: 51px;
  border-radius: 6px !important;
}
.login_input_class /deep/.common-geetest-baseStance {
  width: 400px;
}
.login_input_class /deep/.geetest_radar_btn {
  background: var(--color-14) !important;
}
/deep/#captchaBox .geetest_holder.geetest_wind .geetest_success_btn {
  background: #555557 !important;
}
/deep/.common-button.u-10-bg {
  background-color: transparent;
}
/deep/.common-select .input_line_content {
  border-radius: 6px !important;
}
.page-register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 730px;
  gap: 100px;
  font-family: Outfit;
  font-style: normal;
}
.page-register > .left {
  margin-top: 50px;
  display: flex;
  width: 380px;
  aspect-ratio: 500 / 920;
  color: var(--color-BTN-primary-text);
  font-family: Outfit;
  font-size: 42px;
  font-weight: 700;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.page-register > .left > .box {
  margin: 70px 50px 0 40px;
}
.page-register > .left > .box.rulang {
  font-size: 34px;
}

.m-register {
  width: 444px;
  height: 730px;
  padding-top: 148px;
}
.m-register > .title {
  font-size: 34px;
  color: var(--color-text-primary);
  font-weight: 700;
  text-align: left;
}
.m-register > .tab {
  display: flex;
  align-items: center;
  margin-top: 28px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-register > .tab > .item {
  min-width: 76px;
  height: 38px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 38px;
  transition: all 300ms ease;
  cursor: pointer;
  user-select: none;
  margin-right: 32px;
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 2px solid transparent;
}
.m-register > .tab > .item.active {
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-text-primary);
  border-radius: 2px;
}
.m-register > .formBody {
  margin-top: 18px;
}
.m-register > .formBody > .field {
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
}

.resgister-opions {
  width: 440px;
  display: flex;
  align-items: center;
}
.text {
  font-size: 16px;
  padding-left: 6px;
}
/deep/.common-button.u-8-bg {
  background: var(--mainColor);
}
/deep/.common-button > .common-button-slot {
  color: var(--color-BTN-primary-text) !important;
  font-weight: 400;
}
/deep/.resgister-opions > .common-button > .common-button-slot:hover {
  text-decoration: underline;
}

/deep/.common-button.common-button-solid-disabled > .common-button-slot {
  color: var(--color-BTN-disabled-text) !important;
}
/deep/.common-button.backToLogin > .common-button-slot {
  color: var(--color-text-primary) !important;
}
/deep/.common-button.backToLogin > .common-button-slot:hover {
  text-decoration: underline;
}

/deep/.common-button.common-button-solid-disabled.dialogConfirm {
  background-color: var(--color-BTN-disabled-bg);
}
/deep/.common-dialog .dialog-frame {
  height: auto !important;
}
/deep/.m-verify {
  width: 100%;
}
.m-downApp {
  display: none;
}
</style>
<style lang="stylus" scoped>
.isH5 {
  .left{
    display none;
  }
  .page-register {
    width calc(100% - 48px);
    height 100vh;
    box-sizing border-box;
    //padding 0 24px;
    margin: 0 24px;
    gap 0;
   -webkit-text-size-adjust: 100%;
   -ms-text-size-adjust: 100%;
   text-size-adjust: 100%;
  }
  .resgister-opions {
    width 100%
  }
  .m-register {
    width 100%;
    max-width 100%;
    padding-top: 104px;
  }
  .m-loginBtn {
    display none !important;
  }
  .m-downApp {
    display: block;
    color: #929292;
    font-size 14px;
    margin-top: 24px;
    text-align: center;
    span {
      color var(--color-primary);
      cursor: pointer;
    }
  }
}
.isH5 .formBody .login_input_class /deep/.input-line-baseStance,
.isH5 .login_input_class /deep/.common-geetest-baseStance {
  width: 100%;
  max-width: 100%;
}

// 防止 iOS/Safari 在输入框聚焦时自动放大页面（font-size < 16px 会触发放大）
.isH5 input,
.isH5 textarea,
.isH5 .input,
.isH5 .input_line_inp,
.isH5 .input-line-baseStance,
.isH5 .common-geetest-baseStance,
.isH5 .login_input_class .input,
.isH5 .select_input_class .input_line_inp {
  font-size: 16px !important;
  -webkit-text-size-adjust: 100% !important;
  -ms-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}
// 兼容某些 Android 浏览器，确保控件不缩放
@media (max-width: 767px) {
  input, textarea, .input, .input_line_inp {
    font-size: 16px !important;
    -webkit-text-size-adjust: 100% !important;
    -ms-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }
}
</style>
