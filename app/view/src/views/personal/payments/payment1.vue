<template>
  <div class="payment1">
    <c-inputLine
      name="userName"
      maxLength="50"
      :promptText="promptText1"
      :errorHave="true"
      :errorText="errorText1"
      :errorFlag="checkErrorFlag1"
      marginTop="0px"
      :disabled="excheifFlag ? false : isCanModifyName"
      :value="checkValue1"
      @onchanges="inputChanges"
    >
    </c-inputLine>
    <c-inputLine
      name="account"
      maxLength="50"
      :promptText="promptText2"
      :errorHave="true"
      :errorText="errorText2"
      :errorFlag="checkErrorFlag2"
      marginTop="0px"
      :value="checkValue2"
      @onchanges="inputChanges"
    >
    </c-inputLine>
    <div class="upload_div a-4-bg a-2-bd">
      <div v-if="imgLoading">
        <c-loading size="26" className="common-button-loading a-12-bd" />
        <p class="b-4-cl loading-text">{{ $t("personal.prompt.uploading") }}</p>
      </div>
      <div v-else>
        <div class="loading-mc" v-if="imgSrc !== ''">
          <img :src="imgSrc" class="loading-img" />
          <div class="b-2-bg"></div>
        </div>
        <div class="loading-text2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
          >
            <path
              d="M3.33333 30.8633C2.41667 30.8633 1.63194 30.5369 0.979167 29.8841C0.326389 29.2313 0 28.4466 0 27.5299V4.19661C0 3.27995 0.326389 2.49523 0.979167 1.84245C1.63194 1.18967 2.41667 0.863281 3.33333 0.863281H18.3333C17.7778 1.5855 17.3611 2.37717 17.0833 3.23828C16.8056 4.09939 16.6667 4.97439 16.6667 5.86328C16.6667 8.16884 17.4792 10.1341 19.1042 11.7591C20.7292 13.3841 22.6944 14.1966 25 14.1966C25.8889 14.1966 26.7639 14.0577 27.625 13.7799C28.4861 13.5022 29.2778 13.0855 30 12.5299V27.5299C30 28.4466 29.6736 29.2313 29.0208 29.8841C28.3681 30.5369 27.5833 30.8633 26.6667 30.8633H3.33333ZM5 24.1966H25L18.75 15.8633L13.75 22.5299L10 17.5299L5 24.1966ZM23.3333 10.8633V7.52995H20V4.19661H23.3333V0.863281H26.6667V4.19661H30V7.52995H26.6667V10.8633H23.3333Z"
              fill="var(--color-BTN-primary)"
            />
          </svg>
          <p>
            {{
              imgSrc ? $t("personal.prompt.uploadQrCodAgain") : $t("personal.prompt.uploadQrCod")
            }}
          </p>
        </div>
      </div>
      <c-oldUploadFile
        className="upload_file"
        maxSize="8"
        name="qrCode"
        url="common/upload_qrcode"
        :isOpenUploadImg="isOpenUploadImg"
        imageType="2"
        :expand="[]"
        :isWaterMark="true"
        @tellMessage="onChangeFileFun"
        @uploadFinish="uploadFinish"
      >
      </c-oldUploadFile>
    </div>
    <p class="upload_p">{{ $t("personal.prompt.uploadType") }}</p>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/payments/payments1/payments1";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/payments/payments1/payments1.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
