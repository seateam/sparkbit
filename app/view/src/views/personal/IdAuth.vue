<template>
  <div class="user-management-id-auth">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl"/>
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{ $t("personal.idAuth.title") }}
    </p>
    <div v-if="kycType === '1' && appAuthOpen" class="goAppAuth a-5-bg">
      <div class="goAppAuthNote">{{ $t("personal.idAuth.step1") }}</div>
      <div class="qrCode" v-if="appDownload.app_page_url">
        <img :src="appDownload.app_page_url" alt="" />
        <div>{{ $t("personal.idAuth.appDownLoad") }}</div>
      </div>
      <div class="goAppAuthNote">{{ $t("personal.idAuth.step2") }}</div>
      <div class="exImg">
        <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200805194924641.png" />
      </div>
    </div>
    <div class="user-management-center" v-else>
      <div class="certification-process">
        <div class="div-line a-3-bd clearfix">
          <div
            class="div-progress"
            :class="`${this.activeP1}${this.activeP2}${this.activeP3}`"
          ></div>
        </div>
        <div class="step-left">
          <p :class="this.activeP1">
            <span class="span-mark b-8-cl clearfix a-12-bg">1</span>
            {{ $t("personal.idAuth.info") }}
          </p>
        </div>
        <div class="step-center">
          <p :class="this.activeP2">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS2">2</span>
            {{ $t("personal.idAuth.uploadDocuments") }}
          </p>
        </div>
        <div class="step-right">
          <p :class="this.activeP3">
            <span class="span-mark b-8-cl clearfix" :class="this.activeS3">3</span>
            {{ $t("personal.idAuth.submitted") }}
          </p>
        </div>
      </div>
      <div class="idAuth-center clearfix">
        <div v-if="active === '1'">
          <!-- 国家或地区 -->
          <c-inputLine
            :promptText="$t('personal.kyc.areaTitle')"
            :value="kycNationality"
            :disabled="true"
            :errorHave="true"
          />
          <!-- 证件类型 -- 中国 -->
          <c-inputLine
            v-if="kycType === '1'"
            :promptText="$t('personal.kyc.type')"
            :value="$t('personal.label.idCard')"
            :disabled="true"
            :errorHave="true"
          />
          <!-- 证件类型 -- 外国 -->
          <c-select
            v-if="kycType === '2'"
            :value="certificateType"
            :promptText="$t('personal.kyc.type')"
            @onChanges="idAuthTypeChange"
            name="certificateType"
            :errorHave="true"
            :errorFlag="certificateTypeErrorFlag"
            :options="idAuthType"
          />

          <!-- 中国 - 姓名 -->
          <c-inputLine
            v-if="kycType === '1'"
            maxLength="50"
            name="name"
            inputType="text"
            :promptText="promptText2"
            :errorHave="true"
            marginTop="0px"
            :value="checkValue2"
            @onchanges="inputChanges"
          />
          <!-- 外国 - 名 -->
          <c-inputLine
            maxLength="50"
            v-if="kycType === '2'"
            name="kycName"
            :promptText="$t('personal.kyc.name')"
            :errorHave="true"
            :value="kycName"
            @onchanges="inputChanges"
          />
          <!-- 外国 - 姓 -->
          <c-inputLine
            maxLength="50"
            v-if="kycType === '2'"
            name="kycFamilyName"
            :promptText="$t('personal.kyc.fName')"
            :errorHave="true"
            :value="kycFamilyName"
            @onchanges="inputChanges"
          />
          <c-inputLine
            name="idNo"
            maxLength="35"
            inputType="text"
            :promptText="promptText1"
            :errorHave="true"
            :errorText="errorText1"
            :errorFlag="checkErrorFlag1"
            marginTop="0px"
            :value="checkValue1"
            @onchanges="inputChanges"
          />
          <div class="upload-text clearfix">
            <!-- 1、认证信息一经验证不可修改，请务必如实填写 -->
            <p>1、{{ $t("personal.kyc.text1") }}</p>
            <!-- 2、被认证的实名信息不能重复认证 -->
            <p>2、{{ $t("personal.kyc.text2") }}</p>
            <!--<p>-->
            <!--  For the safety of your funds, your identity needs to be verified before other operations can be performed: Once verified, the authentication information cannot be modified, please be sure to fill in accurately.-->
            <!--</p>-->
          </div>
          <c-button
            type="solid"
            :big="true"
            :disabled="kycStep1Disabled"
            marginTop="18px"
            height="40px"
            width="100%"
            @click="btnLink(1)"
            >{{ $t("personal.idAuth.next") }}
          </c-button>
        </div>
        <div v-if="active === '2'">
          <div>
            <div class="upload1 clearfix">
              <div class="upload1-left a-4-bg a-2-bd clearfix">
                <div v-if="firstPhotoLoading">
                  <c-loading size="34" className="common-button-loading a-12-bd" />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M3.33333 30.8633C2.41667 30.8633 1.63194 30.5369 0.979167 29.8841C0.326389 29.2313 0 28.4466 0 27.5299V4.19661C0 3.27995 0.326389 2.49523 0.979167 1.84245C1.63194 1.18967 2.41667 0.863281 3.33333 0.863281H18.3333C17.7778 1.5855 17.3611 2.37717 17.0833 3.23828C16.8056 4.09939 16.6667 4.97439 16.6667 5.86328C16.6667 8.16884 17.4792 10.1341 19.1042 11.7591C20.7292 13.3841 22.6944 14.1966 25 14.1966C25.8889 14.1966 26.7639 14.0577 27.625 13.7799C28.4861 13.5022 29.2778 13.0855 30 12.5299V27.5299C30 28.4466 29.6736 29.2313 29.0208 29.8841C28.3681 30.5369 27.5833 30.8633 26.6667 30.8633H3.33333ZM5 24.1966H25L18.75 15.8633L13.75 22.5299L10 17.5299L5 24.1966ZM23.3333 10.8633V7.52995H20V4.19661H23.3333V0.863281H26.6667V4.19661H30V7.52995H26.6667V10.8633H23.3333Z"
                      fill="#6A60FF"
                    />
                  </svg>
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      firstPhoto
                        ? $t("personal.idAuth.uploadIdCardPositiveAgain")
                        : $t("personal.idAuth.uploadIdCardPositive")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      firstPhoto
                        ? $t("personal.idAuth.uploadPassportPositiveAgain")
                        : $t("personal.idAuth.uploadPassportPositive")
                    }}
                  </p>
                </div>
                <div class="loading-mc b-2-bg" v-if="firstPhotoImg !== ''">
                  <img :src="firstPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="firstPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload1-right clearfix" :style="bg1"></div>
            </div>
            <div class="upload2 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="secondPhotoLoading">
                  <c-loading size="34" className="common-button-loading a-12-bd" />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M3.33333 30.8633C2.41667 30.8633 1.63194 30.5369 0.979167 29.8841C0.326389 29.2313 0 28.4466 0 27.5299V4.19661C0 3.27995 0.326389 2.49523 0.979167 1.84245C1.63194 1.18967 2.41667 0.863281 3.33333 0.863281H18.3333C17.7778 1.5855 17.3611 2.37717 17.0833 3.23828C16.8056 4.09939 16.6667 4.97439 16.6667 5.86328C16.6667 8.16884 17.4792 10.1341 19.1042 11.7591C20.7292 13.3841 22.6944 14.1966 25 14.1966C25.8889 14.1966 26.7639 14.0577 27.625 13.7799C28.4861 13.5022 29.2778 13.0855 30 12.5299V27.5299C30 28.4466 29.6736 29.2313 29.0208 29.8841C28.3681 30.5369 27.5833 30.8633 26.6667 30.8633H3.33333ZM5 24.1966H25L18.75 15.8633L13.75 22.5299L10 17.5299L5 24.1966ZM23.3333 10.8633V7.52995H20V4.19661H23.3333V0.863281H26.6667V4.19661H30V7.52995H26.6667V10.8633H23.3333Z"
                      fill="#6A60FF"
                    />
                  </svg>
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      secondPhoto
                        ? $t("personal.idAuth.uploadIdCardBackAgain")
                        : $t("personal.idAuth.uploadIdCardBack")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      secondPhoto
                        ? $t("personal.idAuth.uploadPassportBackAgain")
                        : $t("personal.idAuth.uploadPassportBack")
                    }}
                  </p>
                </div>
                <div class="loading-mc b-2-bg" v-if="secondPhotoImg !== ''">
                  <img :src="secondPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="secondPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg2"></div>
            </div>
            <!--手持身份证-->
            <div class="upload3 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="thirdPhotoLoading">
                  <c-loading size="34" className="common-button-loading a-12-bd" />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M3.33333 30.8633C2.41667 30.8633 1.63194 30.5369 0.979167 29.8841C0.326389 29.2313 0 28.4466 0 27.5299V4.19661C0 3.27995 0.326389 2.49523 0.979167 1.84245C1.63194 1.18967 2.41667 0.863281 3.33333 0.863281H18.3333C17.7778 1.5855 17.3611 2.37717 17.0833 3.23828C16.8056 4.09939 16.6667 4.97439 16.6667 5.86328C16.6667 8.16884 17.4792 10.1341 19.1042 11.7591C20.7292 13.3841 22.6944 14.1966 25 14.1966C25.8889 14.1966 26.7639 14.0577 27.625 13.7799C28.4861 13.5022 29.2778 13.0855 30 12.5299V27.5299C30 28.4466 29.6736 29.2313 29.0208 29.8841C28.3681 30.5369 27.5833 30.8633 26.6667 30.8633H3.33333ZM5 24.1966H25L18.75 15.8633L13.75 22.5299L10 17.5299L5 24.1966ZM23.3333 10.8633V7.52995H20V4.19661H23.3333V0.863281H26.6667V4.19661H30V7.52995H26.6667V10.8633H23.3333Z"
                      fill="#6A60FF"
                    />
                  </svg>
                  <p v-if="kycType === '1'" class="b-4-cl">
                    {{
                      thirdPhoto
                        ? $t("personal.idAuth.uploadIdCardPersonalPositivAgain")
                        : $t("personal.idAuth.uploadIdCardPersonalPositiv")
                    }}
                  </p>
                  <p v-else class="b-4-cl">
                    {{
                      thirdPhoto
                        ? $t("personal.idAuth.uploadPassportPersonalPositivAgain")
                        : $t("personal.idAuth.uploadPassportPersonalPositiv")
                    }}
                  </p>
                </div>
                <div class="loading-mc" v-if="thirdPhotoImg !== ''">
                  <img :src="thirdPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="thirdPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  :isWaterMark="true"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg3"></div>
            </div>
            <!--地址证明-->
            <div class="upload3 clearfix">
              <div class="upload2-left a-4-bg a-2-bd clearfix">
                <div v-if="fourthPhotoLoading">
                  <c-loading size="34" className="common-button-loading a-12-bd" />
                  <p class="b-4-cl loading-text">
                    {{ $t("personal.prompt.uploading") }}
                  </p>
                </div>
                <div class="loading-Img" v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M3.33333 30.8633C2.41667 30.8633 1.63194 30.5369 0.979167 29.8841C0.326389 29.2313 0 28.4466 0 27.5299V4.19661C0 3.27995 0.326389 2.49523 0.979167 1.84245C1.63194 1.18967 2.41667 0.863281 3.33333 0.863281H18.3333C17.7778 1.5855 17.3611 2.37717 17.0833 3.23828C16.8056 4.09939 16.6667 4.97439 16.6667 5.86328C16.6667 8.16884 17.4792 10.1341 19.1042 11.7591C20.7292 13.3841 22.6944 14.1966 25 14.1966C25.8889 14.1966 26.7639 14.0577 27.625 13.7799C28.4861 13.5022 29.2778 13.0855 30 12.5299V27.5299C30 28.4466 29.6736 29.2313 29.0208 29.8841C28.3681 30.5369 27.5833 30.8633 26.6667 30.8633H3.33333ZM5 24.1966H25L18.75 15.8633L13.75 22.5299L10 17.5299L5 24.1966ZM23.3333 10.8633V7.52995H20V4.19661H23.3333V0.863281H26.6667V4.19661H30V7.52995H26.6667V10.8633H23.3333Z"
                      fill="#6A60FF"
                    />
                  </svg>
                  <p class="b-4-cl">
                    {{
                      fourthPhoto ? "Upload the proof of address" : "Upload the proof of address"
                    }}
                  </p>
                </div>
                <div class="loading-mc" v-if="fourthPhotoImg !== ''">
                  <img :src="fourthPhotoImg" class="loading-img" />
                  <div class="b-2-bg"></div>
                </div>
                <c-oldUploadFile
                  className="upload_file"
                  maxSize="8"
                  name="fourthPhoto"
                  url="common/upload_img"
                  :isOpenUploadImg="isOpenUploadImg"
                  :expand="[]"
                  :isWaterMark="true"
                  imageType="1"
                  @tellMessage="onChangeFileFun"
                  @uploadFinish="uploadFinish"
                >
                </c-oldUploadFile>
              </div>
              <div class="upload2-right clearfix" :style="bg4"></div>
            </div>
            <div class="upload-text clearfix">
              <p>1、{{ $t("personal.idAuth.uploadText")[0] }}</p>
              <p>2、{{ $t("personal.idAuth.uploadText")[1] }}</p>
              <p>3、{{ $t("personal.idAuth.uploadText")[2] }}</p>
              <p v-if="kycMetaText.length">4、{{ kycMetaText }}</p>
              <p v-else>4、{{ $t("personal.idAuth.uploadText")[3] }}</p>
            </div>
            <c-button
              type="solid"
              :big="true"
              className=""
              paddingW="0px"
              :loading="loading"
              :disabled="disabled2"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink(2)"
              >{{ $t("personal.tool.submit") }}</c-button
            >
          </div>
        </div>
        <div v-if="active === '3'">
          <div class="audit-information">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_3"></use>
            </svg>
            <p>{{ $t("personal.idAuth.wait")[0] }} <br />{{ $t("personal.idAuth.wait")[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/IdAuth/IdAuth";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/IdAuth/IdAuth.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.user-management-id-auth {
  overflow: hidden;
  background: var(--color-BG);
}
.user-management-center {
  margin: 0 auto;
  width: 660px;
  padding: 28px 28px 40px 28px;
  border-radius: 12px;
  border-bottom: 1px solid var(--color-Toggle);
  background: var(--color-BG-Light);
}
/deep/.input-line-content .input-line-baseStance {
  background: var(--color-Input-fill) !important;
}

.user-management-id-auth .idAuth-center {
  float: unset;
  margin: 0 auto;
}
.m-tips > .title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}
.m-tips > .ct {
  font-size: 1.8;
}
.user-management-id-auth .user-management-child-header {
  color: var(--color-text-primary);
}
.user-management-id-auth .certification-process .div-line {
  border-color: var(--mainColor);
}
.common-button.common-button-solid-disabled {
  color: var(--color-text-disabled);
}
</style>
