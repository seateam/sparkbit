<template>
  <section class="initQuestions">
    <div class="title f-1-cl a-3-bd">{{ $t("questions.send") }}</div>
    <div class="content">
      <!-- 问题类型 -->
      <div class="label">{{ $t("questions.type") }}</div>
      <c-select
        :promptText="$t('questions.type')"
        :options="typeList"
        @onChanges="changeType"
        :value="type"
      />
      <!-- 问题描述 -->
      <div class="label" style="margin-top: 20px">{{ $t("questions.mess") }}</div>
      <c-textAreaLine
        name="leavingText"
        maxLength="500"
        marginTop="0"
        width="602px"
        :value="leavingText"
        :errorHave="true"
        @onchanges="inputLineChange"
        :warningText="`${leavingText.length}/500`"
      />
      <div class="uploadImg a-4-bg">
        <div class="uploadMark" v-if="!imgLoading">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M3.33333 30C2.41667 30 1.63194 29.6736 0.979167 29.0208C0.326389 28.3681 0 27.5833 0 26.6667V3.33333C0 2.41667 0.326389 1.63194 0.979167 0.979167C1.63194 0.326389 2.41667 0 3.33333 0H18.3333C17.7778 0.722222 17.3611 1.51389 17.0833 2.375C16.8056 3.23611 16.6667 4.11111 16.6667 5C16.6667 7.30556 17.4792 9.27083 19.1042 10.8958C20.7292 12.5208 22.6944 13.3333 25 13.3333C25.8889 13.3333 26.7639 13.1944 27.625 12.9167C28.4861 12.6389 29.2778 12.2222 30 11.6667V26.6667C30 27.5833 29.6736 28.3681 29.0208 29.0208C28.3681 29.6736 27.5833 30 26.6667 30H3.33333ZM5 23.3333H25L18.75 15L13.75 21.6667L10 16.6667L5 23.3333ZM23.3333 10V6.66667H20V3.33333H23.3333V0H26.6667V3.33333H30V6.66667H26.6667V10H23.3333Z"
                fill="#6A60FF"
              />
            </svg>
          </div>
          <p class="uploadMark-text u-8-cl">
            {{ imgUrl ? $t("questions.upload1") : $t("questions.upload2") }}
          </p>
          <p class="uploadMark-mess">{{ $t("questions.upload3") }}</p>
        </div>
        <div class="uploadLoading" v-else>
          <c-loading size="34" />
          <p class="uploadMark-text u-8-cl">{{ $t("questions.upload4") }}</p>
        </div>
        <c-oldUploadFile
          className="upload_file"
          name="questionsImg"
          url="common/upload_img"
          :isOpenUploadImg="isOpenUploadImg"
          :expand="[]"
          :imageType="imageType"
          @tellMessage="onChangeFileFun"
          @uploadFinish="uploadFinish"
        >
        </c-oldUploadFile>
        <div class="b-2-bg imgmk" v-if="imgUrl.length"></div>
        <img v-if="imgUrl.length" :src="imgUrl" alt="" class="upload-image" />
      </div>
      <div style="text-align: center">
        <c-button
          marginTop="20px"
          height="50px"
          @click="submit"
          :disabled="buttonDisabled"
          :loading="buttonLoading"
          paddingW="24px"
          >{{ $t("questions.summit") }}</c-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/initQuestions/initQuestions";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/initQuestions/initQuestions.styl";

export default {
  mixins: [mixin],

  mounted() {
    this.init();
  },
};
</script>
<style scoped>
/deep/.common-select .input_line_content {
  background: var(--color-input-fill-on-light-bg) !important;
}
/deep/.common-select .icon-triangle {
  border-color: var(--color-text-primary);
}
/deep/.area-line-content .input-line-baseStance {
  padding-top: 0;
  /* border: none; */
}
/deep/.area-line-content .input_line_inp {
  height: 50px;
}
/deep/.area-line-content:hover {
  border-color: var(--color-BTN-secondary-border);
}
/deep/.area-line-content .input_line_inp textarea {
  /* height: 50px !important; */
  padding: 16px;
  border-radius: 8px;
  /* border: 1px solid var(--color-Input-border); */
  background: var(--color-input-fill-on-light-bg);
  box-sizing: border-box;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  font-family: Outfit;
}
/deep/.area-line-content .input_line_inp .area-icon,
/deep/.area-line-content .input-line-activeLine {
  display: none;
}
.initQuestions .title {
  color: var(--color-1);
}
.initQuestions .label {
  color: var(--color-text-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
}
.initQuestions .uploadImg {
  border-color: var(--color-BTN-primary);
  background: var(--color-BG-Light-Purple);
}
.initQuestions .common-button {
  margin-inline: auto;
  border-radius: 100px;
}
.initQuestions .common-button.common-button-solid-disabled {
  background: var(--color-BTN-disabled-bg);
  border-radius: 100px;
  color: var(--color-BTN-disabled-text);
}
.initQuestions /deep/.common-select:not(.select-value, .select-visible) .input_line_prompt {
  /* transform: translateY(-10px); */
}
.initQuestions /deep/.common-select .input_line_prompt {
  color: var(--color-text-secondary) !important;
  display: none;
}
.initQuestions /deep/.common-select .input_line_inp {
  margin: 0;
}
</style>
