<!-- // Created by 任泽阳 on 18/12/06.
// 登录页面 -->
<template>
  <!-- 样式重构 2023.04.17 -->
  <section class="page-login">
    <div class="m-pageContent">
      <div class="right" :style="{ backgroundImage: `url(${imgMap.spark_login})` }">
        <div class="box" :class="{'rulang': lang === 'ru_RU'}">
          <!-- <div class="txt">{{ calTxt.txt1 }}</div>
          <div class="subTxt">{{ calTxt.txt2 }}</div> -->
          {{ $t("login.tradingSlogan") }}
        </div>
      </div>
      <div class="left login">
        <div class="title">{{ loginPageTitle }} {{ $store.state.systemConfig.company_name }}</div>
        <div class="tab" @click="switchLogin">
          <div class="item" :class="{ active: loginType == 1 }" data-value="1">
            {{ $t("resetPass.email") }}
          </div>
          <div class="item" :class="{ active: loginType == 2 }" data-value="2">
            {{ $t("stranger.phone") }}
          </div>
        </div>
        <div class="formBody">
          <div class="field">
            {{ loginType == 1 ? $t("resetPass.email") : $t("stranger.phone") }}
          </div>
          <!-- 手机/邮箱 -->
          <c-inputLine
            maxLength="100"
            name="userValue"
            :promptText="$t('trade.pleaseInput')"
            :errorHave="true"
            :errorText="$t('login.formatIncorrect')"
            :errorFlag="userErrorFlag"
            :value="userValue"
            @onchanges="inputChanges"
            class="login_input_class"
          >
          </c-inputLine>
          <div class="field">{{ $t("login.password") }}</div>
          <div class="m-password" v-show="showPassword === 0">
            <c-inputLine
              maxLength="20"
              name="passValue"
              :promptText="$t('trade.pleaseInput')"
              :errorHave="true"
              :errorText="$t('login.passwordError')"
              :errorFlag="passErrorFlag"
              marginTop="0px"
              :value="passValue"
              inputType="password"
              @onchanges="inputChanges"
              :isLogin="true"
              class="login_input_class"
            />
            <svg
              @click="showPasswordFn"
              class="eye"
              t="1710319135381"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1445"
              width="32"
              height="32"
            >
              <path
                d="M253.6 679.2l109.6-109.6C356 552 352 532.8 352 512c0-88 72-160 160-160 20.8 0 40 4 57.6 11.2l82.4-82.4C607.2 264.8 560 256 512 256c-168 0-329.6 106.4-384 256 24 65.6 68.8 123.2 125.6 167.2z"
                p-id="1446"
                fill="#929292"
              ></path>
              <path
                d="M416 512v4.8L516.8 416H512c-52.8 0-96 43.2-96 96zM770.4 344.8l163.2-163.2L888 136l-753.6 753.6 45.6 45.6 192.8-192.8A390.4 390.4 0 0 0 512 768c167.2 0 330.4-106.4 384.8-256-24-65.6-69.6-123.2-126.4-167.2zM512 672c-20 0-40-4-57.6-11.2l53.6-53.6h4.8c52.8 0 96-43.2 96-96v-4.8l53.6-53.6C668 472 672 492 672 512c0 88-72 160-160 160z"
                p-id="1447"
                fill="#929292"
              ></path>
            </svg>
          </div>
          <div class="m-password" v-show="showPassword === 1">
            <c-inputLine
              maxLength="20"
              name="passValue"
              :promptText="$t('trade.pleaseInput')"
              :errorHave="true"
              :errorText="$t('login.passwordError')"
              :errorFlag="passErrorFlag"
              marginTop="0px"
              :value="passValue"
              @onchanges="inputChanges"
              :isLogin="true"
              class="login_input_class"
            />
            <svg
              @click="showPasswordFn"
              class="eye"
              t="1710317748969"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1562"
              width="32"
              height="32"
            >
              <path
                d="M512 256c-168 0-329.6 106.4-384 256 54.4 149.6 216 256 384 256 167.2 0 330.4-106.4 384.8-256-55.2-149.6-217.6-256-384.8-256z m0 416c-88 0-160-72-160-160s72-160 160-160 160 72 160 160-72 160-160 160z m96-160c0 52.8-43.2 96-96 96s-96-43.2-96-96 43.2-96 96-96 96 43.2 96 96z"
                p-id="1563"
                fill="#929292"
              ></path>
            </svg>
          </div>
          <!--<c-verify-->
          <!--  marginTop="0px"-->
          <!--  :errorHave="true"-->
          <!--  :colorMap="colorMap"-->
          <!--  @callback="verifyCallBack"-->
          <!--  class="login_input_class"-->
          <!--/>-->
          <!--滑动验证-->
          <VuePictureVerify
            @success="verifyHandler('success')"
            ref="VuePictureVerify"
          ></VuePictureVerify>
          <div class="footer">
            <c-button
              type="text"
              className="logBtn"
              @click="goUrl('/resetPass')"
              style="padding: 0px; font-size: 16px"
            >
              {{ $t("login.ForgetPassword") }}
            </c-button>
            <c-button
              type="text"
              className="goRegister logBtn"
              @click="goUrl('/register')"
              style="padding: 0px; font-size: 16px"
            >
              {{ $t("login.goRegister") }}
            </c-button>
          </div>
          <c-button
            type="solid"
            className="loginBtn"
            :disabled="submitDisabled"
            :loading="submitLoading"
            marginTop="0px"
            height="50px"
            width="440px"
            paddingW="0px"
            @click="submit"
            >{{ loginButtonText }}
          </c-button>
        </div>
      </div>
    </div>
    <!-- 对话框  38-24=14 -->
    <!-- 改，2022.10.01，新增一些内容，取消:titleText="$t('login.SecurityVerification')" -->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('login.SecurityVerification')"
      :mainStyle="{ width: '480px', height: '280px' }"
      :customBodyStyle="{ width: '422px', margin: '16px auto' }"
      :optionStyle="{
        position: 'unset',
        right: 'unset',
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }"
    >
      <!-- 验证框 -->
      <c-inputLine
        maxLength="6"
        name="checkValue"
        :promptText="checkOptions.text"
        :errorHave="true"
        :errorText="checkText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
        class="login_input_class"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"
          v-if="checkOptions.haveCode"
        />
      </c-inputLine>
    </c-dialog>
    <div class="spcpqr-a5c3" style="dispaly: none"></div>
    <singPassLogin :isShow="singPassDialogFlag" />
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/login/login";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/login/login.styl";
import singPassLogin from "./singPassLogin.vue";
import VuePictureVerify from "../components/vue-picture-verify.vue";
import { imgMap } from "../utils";

export default {
  mixins: [mixin],
  components: {
    singPassLogin,
    VuePictureVerify,
  },
  data() {
    return {
      // 改，2022.12.15 新增状态
      loginType: 1, // 登录账户类型 1-邮箱，2-手机
      showPassword: 0,
    };
  },
  mounted() {
    const app = document.querySelector("#app");
    app.classList.remove("a-7-bg");
    this.init();
  },
  computed: {
    lang() {
      return this.$store.state.baseData.lan;
    },
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    calTxt() {
      const { lang, companyName } = this;
      if (lang == "zh_CN") {
        return {
          txt1: "快速购买加密货币",
          txt2: "即刻开启您的全球领先区块链资产交易平台之旅",
        };
      }
      return {
        txt1: "Buy cryptocurrencies quickly",
        txt2: `Joining the ${companyName} platform is your gateway to a whole new level of crypto accessibility!`,
      };
    },
  },
  methods: {
    showPasswordFn() {
      this.showPassword = this.showPassword === 0 ? 1 : 0;
    },
    // 2022.12.15 新增switchLogin方法(事件委托)
    switchLogin(e) {
      const { value } = e.target.dataset;
      if (value) {
        this.loginType = e.target.dataset.value;
      }
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
      }
    },
  },
};
</script>

<style lang="stylus">
.dark {
  .geetest_holder.geetest_wind .geetest_radar_tip,
  .geetest_holder.geetest_wind .geetest_success_radar_tip {
    background: #222222 !important;
  }
  /* 验证 */
  .common-geetest-baseStance {
    background: #222222 !important;
  }
  .geetest_radar_btn {
    background: #222222 !important;
  }
  .geetest_success_btn {
    background: #222222 !important;
  }
}
.light {
  .geetest_holder.geetest_wind .geetest_radar_tip,
  .geetest_holder.geetest_wind .geetest_success_radar_tip {
    background: #e9e9e9 !important;
  }
}
.login_input_class {
  .common-button-text {
    color: #ffffff
  }


}

/* 选择器 */
.select_input_class {
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
body, body.a-7-bg {
  background-color: var(--color-4) !important;
}
.light .geetest_radar_tip {
  background-color: transparent !important;
}
//.login_input_class /deep/.geetest_radar_btn {
//  background: var(--color-14) !important;
//}
.geetest_holder.geetest_wind .geetest_radar_tip, .geetest_holder.geetest_wind .geetest_success_radar_tip {
  background: var(--login-color-1) !important;
}
#captchaBox .geetest_holder.geetest_wind .geetest_radar_btn, #captchaBox .geetest_holder.geetest_wind .geetest_radar_btn:hover {
  background: transparent !important;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0px 0px 0px 1000px rgba(34, 34, 34, 1) inset !important;
  //-webkit-text-fill-color: unset !important;
}

.light input:-webkit-autofill {
  -webkit-box-shadow: 0px 0px 0px 1000px rgba(40, 40, 40, 0.08) inset !important;
  //-webkit-text-fill-color: unset !important;
}
.geetest_holder.geetest_wind .geetest_success_btn .geetest_success_box,
#captchaBox .geetest_radar {
  z-index 2;
}
</style>

<style scoped>
.page-login .dark {
  --login-color-1: #000;
}
.page-login .light {
  --login-color-1: #fff;
}
.page-login {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 30px;
}
.m-pageContent {
  width: 1200px;
  /* background: red; */
  height: 730px;
  border-radius: 16px;
  display: flex;
  color: var(--color-BTN-primary-text);
  font-family: Outfit;
  font-style: normal;
}
.m-pageContent > .right,
.m-pageContent > .left {
  flex: 1;
  width: 50%;
  flex-shrink: 0;
}

.m-pageContent > .login > .title {
  font-weight: 700;
  font-size: 38px;
  color: var(--color-text-primary);
}
.m-pageContent > .left {
  box-sizing: border-box;
  padding-top: 50px;
  padding-left: 52px;
}
.m-pageContent > .login > .tab {
  display: flex;
  align-items: center;
  margin-top: 28px;
  margin-right: 130px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-pageContent > .login > .tab > .item {
  height: 38px;
  font-weight: 600;
  font-size: 18px;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 38px;
  transition: all 300ms ease;
  cursor: pointer;
  user-select: none;
  margin-right: 32px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
}
.m-pageContent > .login > .tab > .item.active {
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-text-primary);
}
.m-pageContent > .login > .formBody {
  margin-top: 18px;
}
.m-pageContent > .login > .formBody > .field {
  font-size: 16px;
  line-height: 24px;
  color: rgba(104, 104, 104, 1);
  margin-bottom: 10px;
}
/deep/#captchaBox {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: transparent;
  width: 100%;
}
.m-pageContent > .login > .formBody > .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  width: 440px;
  font-size: 16px;
}
/deep/.common-button.u-9-bg {
  background-color: transparent;
}

/deep/.common-button.u-8-bg {
  background-color: var(--mainColor);
}
/deep/.common-button-solid-disabled.u-11-bg {
  font-weight: 600;
  color: var(--color-BTN-disabled-text);
}
/deep/.common-button-solid-disabled.dialogConfirm {
  background-color: var(--color-BTN-disabled-bg);
}
.login_input_class /deep/.input-line-baseStance,
.login_input_class /deep/.common-geetest-baseStance {
  background: var(--color-14) !important;
  width: 444px;
  height: 51px;
}
.dialog-frame-body > .login_input_class /deep/.input-line-baseStance {
  width: 100%;
  height: 51px;
}
.m-pageContent > .right > .box {
  padding: 80px 0 120px;
  text-align: left;
  font-size: 42px;
  font-weight: 700;
  font-family: Outfit;
  width: 314px;
}

.m-pageContent > .right > .box.rulang {
  font-size: 34px;
}

.m-pageContent > .right > .box > .txt {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: var(--mainColor);
  margin-bottom: 12px;
  margin-top: 50px;
}

.m-pageContent > .right > .box > .subTxt {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: rgba(104, 104, 104, 1);
}

.m-pageContent > .right {
  display: flex;
  justify-content: center;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.m-ver {
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 42px;
}
.m-ver > .title {
  font-family: Outfit;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: var(--color-1);
}
.m-password {
  position: relative;
}
.m-password > .eye {
  position: absolute;
  right: 92px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
