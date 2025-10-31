<template>
  <div class="user-management-bind-google">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl" />
    <div class="m-title">{{ $t("personal.bindGoogle.title") }}</div>
    <div class="user-management-center a-5-bg">
      <div class="center-one a-3-bd">
        <p class="center-one-title b-1-cl">
          {{ $t("personal.bindGoogle.step1") }}
          {{ $t("personal.bindGoogle.downloadGoogle")[0] }}
        </p>
        <p class="center-text b-2-cl">{{ $t("personal.bindGoogle.downloadGoogle")[1] }}</p>
        <div>
          <c-button
            type="solid"
            :big="true"
            className="center-one-button"
            paddingW="0px"
            :disabled="false"
            marginTop="0px"
            height="40px"
            width="180px"
            @click="btnLink('appstore')"
          >
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_13"></use>
            </svg>
            {{ $t("personal.bindGoogle.appStore") }}</c-button
          >
          <c-button
            type="solid"
            :big="true"
            className="center-one-button"
            paddingW="0px"
            :disabled="false"
            marginTop="0px"
            height="40px"
            width="180px"
            @click="btnLink('googleplay')"
          >
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_15"></use>
            </svg>
            {{ $t("personal.bindGoogle.googlePlay") }}</c-button
          >
          <c-button
            type="solid"
            :big="true"
            className=""
            paddingW="0px"
            :disabled="false"
            marginTop="0"
            height="40px"
            width="180px"
            @click="btnLink('android')"
          >
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_14"></use>
            </svg>
            {{ $t("personal.bindGoogle.android") }}</c-button
          >
        </div>
      </div>
      <div class="center-two a-3-bd">
        <p class="center-two-title b-1-cl">
          {{ $t("personal.bindGoogle.step2") }}{{ $t("personal.bindGoogle.useGoogle")[0] }}
        </p>
        <p class="center-text b-2-cl">{{ $t("personal.bindGoogle.useGoogle")[1] }}</p>
        <div class="center-two-ewm">
          <img :src="googleImg" />
          <p class="a-4-bg b-1-cl clearfix">
            {{ googleKey }}
            <svg
              @click="copyClick"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
            >
              <path
                class="dark-show"
                d="M4.75 12.5C4.3375 12.5 3.98438 12.3531 3.69063 12.0594C3.39688 11.7656 3.25 11.4125 3.25 11V2C3.25 1.5875 3.39688 1.23438 3.69063 0.940625C3.98438 0.646875 4.3375 0.5 4.75 0.5H11.5C11.9125 0.5 12.2656 0.646875 12.5594 0.940625C12.8531 1.23438 13 1.5875 13 2V11C13 11.4125 12.8531 11.7656 12.5594 12.0594C12.2656 12.3531 11.9125 12.5 11.5 12.5H4.75ZM4.75 11H11.5V2H4.75V11ZM1.75 15.5C1.3375 15.5 0.984375 15.3531 0.690625 15.0594C0.396875 14.7656 0.25 14.4125 0.25 14V3.5H1.75V14H10V15.5H1.75Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M4.75 12.5C4.3375 12.5 3.98438 12.3531 3.69063 12.0594C3.39688 11.7656 3.25 11.4125 3.25 11V2C3.25 1.5875 3.39688 1.23438 3.69063 0.940625C3.98438 0.646875 4.3375 0.5 4.75 0.5H11.5C11.9125 0.5 12.2656 0.646875 12.5594 0.940625C12.8531 1.23438 13 1.5875 13 2V11C13 11.4125 12.8531 11.7656 12.5594 12.0594C12.2656 12.3531 11.9125 12.5 11.5 12.5H4.75ZM4.75 11H11.5V2H4.75V11ZM1.75 15.5C1.3375 15.5 0.984375 15.3531 0.690625 15.0594C0.396875 14.7656 0.25 14.4125 0.25 14V3.5H1.75V14H10V15.5H1.75Z"
                fill="#222222"
              />
            </svg>
          </p>
        </div>
        <div class="btn-box">
          <c-button
            type="solid"
            className="center-two-button"
            paddingW="10px"
            marginTop="12px"
            height="30px"
            @click="reload"
          >
            {{ $t("common.reload") }}</c-button
          >
        </div>
      </div>
      <div class="center-three a-3-bd">
        <p class="center-three-title b-1-cl">
          {{ $t("personal.bindGoogle.step3") }}
          {{ $t("personal.bindGoogle.bindGoogle")[0] }}
        </p>
        <p class="center-three-y-title b-7-cl">
          <!-- <svg class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-c_2"></use>
          </svg> -->
          <span>{{ $t("personal.bindGoogle.bindGoogle")[1] }}</span>
        </p>
        <div class="center-three-form">
          <div class="center-three-input">
            <c-inputLine
              name="password"
              maxLength="20"
              inputType="password"
              :promptText="promptText4"
              :errorHave="true"
              :errorText="errorText4"
              :errorFlag="checkErrorFlag4"
              marginTop="0px"
              :value="checkValue4"
              @onchanges="inputChanges"
            >
            </c-inputLine>
            <c-inputLine
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
          </div>
          <div style="text-align: center">
            <c-button
              type="solid"
              :big="true"
              className=""
              paddingW="24px"
              :loading="loading"
              :disabled="disabled"
              marginTop="0"
              height="50px"
              @click="btnLink"
              >{{ $t("personal.tool.bind") }}</c-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/BindGoogle/BindGoogle";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/BindGoogle/BindGoogle.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.user-management-bind-google {
  padding-bottom: 90px;
}
.user-management-bind-google .user-management-center {
  width: 820px;
  height: auto;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: var(--color-Input-fill);
  margin-inline: auto;
  padding: 28px 28px 40px;
}
.m-title {
  font-weight: 600;
  color: var(--color-1);
  height: 118px;
  line-height: 118px;
  font-size: 32px;
  background: var(--color-BG);
  box-sizing: border-box;
  padding-left: 52px;
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-24) !important;
}
.user-management-bind-google /deep/.common-button.u-8-bg {
  background: var(--mainColor);
}
.user-management-bind-google span {
  color: var(--mainColor);
}
/deep/.common-button.u-8-cl .common-button-slot {
  color: var(--mainColor);
}
.user-management-bind-google .center-two div p {
  background: var(--color-24);
}
.user-management-bind-google .center-three-y-title span {
  color: var(--color-1) !important;
}
.center-one,
.center-two,
.center-three {
  padding: 24px;
  border-radius: 12px;
  background: var(--color-BG);
}
.center-one-title,
.center-two-title,
.center-three-title {
  margin-bottom: 12px;
  color: var(--color-text-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.center-two .btn-box {
  width: 180px;
  text-align: center;
}
.center-two-button /deep/.common-button-slot {
  font-size: 14px;
}
.center-three-input {
  display: flex;
  gap: 20px;
  margin-block: 40px 16px;
}
.center-three-form /deep/.common-button-solid-disabled {
  color: var(--color-BTN-disabled-text) !important;
}

</style>
<style scoped lang="stylus">
.light {
  .a-3-bd {
    border-color: var(--color-2);
  }
}
</style>
