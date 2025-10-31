<!--// Created by 任泽阳 on 18/12/18. // 重置密码页面-->
<template>
  <section class="page-resetPass">
    <!--  改，2022.12.15 隐藏-->
    <!--    <div class="go-home-btn a-3-bd" @click="goUrl('/login')">-->
    <!--      <svg class="icon icon-18" aria-hidden="true">-->
    <!--        <use xlink:href="#icon-e_11"></use>-->
    <!--      </svg>-->
    <!--      Sign In-->
    <!--    </div>-->

    <!-- 引导
    <c-intoGuide :imgMap="imgMap">
      <div class="guide-center">
        重置登录密码
        <p :class="isInternationTem ? 'b-1-cl' : 'b-8-cl'">
          {{ $t("resetPass.ResetLoginPassword") }}
        </p>
        重置登录密码后24小时内禁止提币
        <div class="guide-text b-2-cl">{{ $t("resetPass.ResetLoginPasswordError") }}</div>
      </div>
    </c-intoGuide> -->
    <!-- 改，2022.12.15 重构页面-->
    <div class="m-resetPass">
      <div class="title">{{ $t("resetPass.ResetLoginPassword") }}</div>
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
        <div class="field">{{ domTexts.userText }}</div>
        <!-- user框 步骤1时展示可输入 步骤2时展示不可输入 -->
        <c-inputLine
          name="userValue"
          :maxLength="maxLength"
          :key="domKeys.userKey"
          v-if="nowStep !== '3'"
          :disabled="nowStep === '2'"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        />
        <!-- 滑动验证 仅步骤1展示 -->
        <!--<c-verify-->
        <!--  name="phone"-->
        <!--  :colorMap="colorMap"-->
        <!--  :key="domKeys.verifyKey"-->
        <!--  v-if="nowStep === '1'"-->
        <!--  marginTop="6px"-->
        <!--  :errorHave="true"-->
        <!--  @callback="verifyCallBack"-->
        <!--  class="login_input_class"-->
        <!--/>-->
        <vue-picture-verify
          v-if="nowStep === '1'"
          @success="verifyHandler('success')"
          ref="VuePictureVerify"
        ></vue-picture-verify>
        <!-- 验证码框 仅在步骤2展示 -->
        <c-inputLine
          maxLength="6"
          name="checkValue"
          :key="domKeys.checkKey"
          v-if="nowStep === '2'"
          :value="checkValue"
          :promptText="domTexts.codeText"
          :errorHave="true"
          :errorText="domTexts.codeError"
          :errorFlag="checkErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <!-- 获取验证码 -->
          <c-getCode name="resetPassGetcode" @click="getCodeClick" />
        </c-inputLine>
        <!-- 谷歌 -->
        <c-inputLine
          maxLength="6"
          name="googleValue"
          :key="domKeys.googleKey"
          v-if="nowStep === '2' && haveGoogle"
          :value="googleValue"
          :promptText="$t('resetPass.googleCode')"
          :errorHave="true"
          :errorText="$t('resetPass.googleError')"
          :errorFlag="googleErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <!-- 身份证 -->
        <c-inputLine
          maxLength="100"
          name="IDValue"
          :key="domKeys.IDKey"
          v-if="nowStep === '2' && haveID"
          :value="IDValue"
          :promptText="$t('resetPass.IDCode')"
          :errorHave="true"
          :errorText="$t('resetPass.IDError')"
          :errorFlag="IDErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <!-- 密码框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="passValue"
          inputType="password"
          :key="domKeys.passKey"
          v-if="nowStep === '3'"
          :value="passValue"
          :promptText="$t('resetPass.password')"
          :errorHave="true"
          :errorText="$t('resetPass.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <div class="m-tips">{{ passValue.length }}/20</div>
        </c-inputLine>
        <!-- 确认秘密框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="comfirmValue"
          inputType="password"
          :key="domKeys.comfirmKey"
          v-if="nowStep === '3'"
          :value="comfirmValue"
          :promptText="$t('resetPass.confrimPassWord')"
          :errorHave="true"
          :errorText="$t('resetPass.confrimPassWordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <div class="m-tips">{{ comfirmValue.length }}/20</div>
        </c-inputLine>
        <!-- 提交按钮 -->
        <!-- 改，2022.09.28，marginTop 46px -> 0px -->
        <c-button
          marginTop="0px"
          height="40px"
          width="440px"
          :disabled="submitStatus.disabled"
          :loading="submitLoading"
          @click="submit"
          paddingW="0px"
          >{{ submitStatus.text }}</c-button
        >

        <!-- 改，2022.09.28，并新返回登录页 -->
        <div style="display: flex; align-items: center; justify-content: center; margin-top: 24px">
          <c-button
            type="text"
            className="logBtn"
            @click="goUrl('/login')"
            style="padding: 0px; font-size: 16px"
            width="440px"
            class="backToLogin"
          >
            {{ $t("resetPass.backToLogin") }}
          </c-button>
        </div>
      </div>
    </div>

    <div
      v-if="false"
      class="page-resetPass-content"
      style="
        padding: 120px 0px 249px;
        background: #000;
        display: flex;
        align-items: center;
        flex-direction: column;
      "
    >
      <div style="width: 100%; display: flex; align-items: center; justify-content: center">
        <span
          style="
            font-style: normal;
            font-weight: 500;
            font-size: 32px;
            line-height: 45px;
            color: #ffffff;
            position: relative;
          "
        >
          {{ $t("resetPass.ResetLoginPassword") }}

          <!-- 改，2022.09.28，新增 -->
          <img
            src="/static/img/new/login_doll_1.svg"
            style="position: absolute; right: -292px; top: 86px; z-index: 0"
          />
        </span>
      </div>

      <div class="guide-text b-2-cl" style="margin: 8px 0px 32px">
        {{ $t("resetPass.ResetLoginPasswordError") }}
      </div>

      <div
        class="content-center"
        style="
          background: #15171c;
          border-radius: 2px;
          padding: 28px 40px;
          z-index: 1;
          margin: unset;
        "
      >
        <!-- tab -->
        <c-intoTab
          v-if="tabFlag && nowStep !== '3'"
          :list="tabList"
          :nowKey="nowType"
          :disabled="submitLoading"
          className="resetPassTab"
          @onchenges="setNowType"
        />
        <!-- user框 步骤1时展示可输入 步骤2时展示不可输入 -->
        <c-inputLine
          name="userValue"
          :maxLength="maxLength"
          :key="domKeys.userKey"
          v-if="nowStep !== '3'"
          :disabled="nowStep === '2'"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        />
        <!-- 滑动验证 仅步骤1展示 -->
        <c-verify
          name="phone"
          :colorMap="colorMap"
          :key="domKeys.verifyKey"
          v-if="nowStep === '1'"
          marginTop="6px"
          :errorHave="true"
          @callback="verifyCallBack"
          class="login_input_class"
        />
        <!-- 验证码框 仅在步骤2展示 -->
        <c-inputLine
          maxLength="6"
          name="checkValue"
          :key="domKeys.checkKey"
          v-if="nowStep === '2'"
          :value="checkValue"
          :promptText="domTexts.codeText"
          :errorHave="true"
          :errorText="domTexts.codeError"
          :errorFlag="checkErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
          <!-- 获取验证码 -->
          <c-getCode name="resetPassGetcode" @click="getCodeClick" />
        </c-inputLine>
        <!-- 谷歌 -->
        <c-inputLine
          maxLength="6"
          name="googleValue"
          :key="domKeys.googleKey"
          v-if="nowStep === '2' && haveGoogle"
          :value="googleValue"
          :promptText="$t('resetPass.googleCode')"
          :errorHave="true"
          :errorText="$t('resetPass.googleError')"
          :errorFlag="googleErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <!-- 身份证 -->
        <c-inputLine
          maxLength="100"
          name="IDValue"
          :key="domKeys.IDKey"
          v-if="nowStep === '2' && haveID"
          :value="IDValue"
          :promptText="$t('resetPass.IDCode')"
          :errorHave="true"
          :errorText="$t('resetPass.IDError')"
          :errorFlag="IDErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        >
        </c-inputLine>
        <!-- 密码框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="passValue"
          inputType="password"
          :key="domKeys.passKey"
          v-if="nowStep === '3'"
          :value="passValue"
          :promptText="$t('resetPass.password')"
          :errorHave="true"
          :errorText="$t('resetPass.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        />
        <!-- 确认秘密框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="comfirmValue"
          inputType="password"
          :key="domKeys.comfirmKey"
          v-if="nowStep === '3'"
          :value="comfirmValue"
          :promptText="$t('resetPass.confrimPassWord')"
          :errorHave="true"
          :errorText="$t('resetPass.confrimPassWordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges"
          class="login_input_class"
        />
        <!-- 提交按钮 -->
        <!-- 改，2022.09.28，marginTop 46px -> 0px -->
        <c-button
          marginTop="0px"
          height="40px"
          width="380px"
          :disabled="submitStatus.disabled"
          :loading="submitLoading"
          @click="submit"
          paddingW="0px"
          >{{ submitStatus.text }}</c-button
        >

        <!-- 改，2022.09.28，并新返回登录页 -->
        <div style="display: flex; align-items: center; justify-content: center; margin-top: 24px">
          <c-button
            type="text"
            className="logBtn"
            @click="goUrl('/login')"
            style="padding: 0px; font-size: 16px"
            class="backToLogin"
          >
            {{ $t("resetPass.backToLogin") }}
          </c-button>
        </div>
      </div>
      <!-- 底部区域 -->
      <div class="copy z-2-cl" style="border-color: #293448 !important">
        Copyright © 2019 {{ companyName }}. All rights reserve
      </div>
    </div>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/resetPass/resetPass";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/resetPass/resetPass.styl";
import "../assets/js/encrypt.js";
import vuePictureVerify from "@/components/vue-picture-verify";

// 获取验证码
export default {
  mixins: [mixin],
  components: { vuePictureVerify },
  data() {
    return {};
  },
  mounted() {
    const app = document.querySelector("#app");
    app.classList.remove("a-7-bg");
    this.init();
  },
  methods: {
    verifyHandler() {
      this.verifyObj = {
        geetest_challenge: "43c606f5d77dac0a5eda4261b75d001cjx",
        geetest_seccode: "7a1ba8dc7453a6deabd8ae7b45bb42d5|jordan",
        geetest_validate: "7a1ba8dc7453a6deabd8ae7b45bb42d5",
        token: true,
        verificationType: "2",
      };
      this.verifyFlag = true;
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
    background: #1f2124  !important;
  }
  .geetest_radar_btn {
    background: #1f2124  !important;
  }
  .geetest_success_btn {
    background: #1f2124  !important;
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
</style>
<style scoped>
/deep/#captchaBox {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: transparent;
  width: 100%;
}
/deep/.common-button .common-button-slot {
  font-size: 18px;
}
/deep/.common-button.u-9-bg {
  background-color: transparent;
}
.login_input_class /deep/.input-line-baseStance,
.login_input_class /deep/.common-geetest-baseStance {
  background: var(--color-14) !important;
  width: 444px;
  height: 51px;
}
.login_input_class /deep/.geetest_radar_btn {
  background: var(--color-14) !important;
}
/*/deep/#captchaBox .geetest_holder.geetest_wind .geetest_success_btn {*/
/*  background: #555557 !important;*/
/*}*/
/deep/.common-button.u-10-bg {
  background-color: transparent;
}
.page-resetPass {
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
}
.m-resetPass {
  width: 444px;
  padding-top: 177px;
}
.m-resetPass > .title {
  font-size: 34px;
  color: var(--color-1);
  text-align: center;
}
.m-resetPass > .tab {
  display: flex;
  align-items: center;
  margin-top: 28px;
}
.m-resetPass > .tab > .item {
  min-width: 76px;
  height: 38px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 18px;
  color: var(--color-1);
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
.m-resetPass > .tab > .item.active {
  /*background: rgba(130, 128, 245, 0.16);*/
  color: var(--mainColor);
  border-color: var(--mainColor);
  border-radius: 2px;
}
.m-resetPass > .formBody {
  margin-top: 18px;
}
.m-resetPass > .formBody > .field {
  font-size: 16px;
  line-height: 24px;
  color: rgba(104, 104, 104, 1);
  margin-bottom: 10px;
}
/deep/.common-button.u-8-bg {
  background: var(--mainColor);
}
</style>
<style lang="stylus" scoped>
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
</style>
