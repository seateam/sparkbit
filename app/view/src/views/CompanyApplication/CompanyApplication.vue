<!-- 2023.01.07 商家申请页面 样式重构 -->
<template>
  <div
    v-if="viewShow"
    class="company-application-page company-application-container"
  >
    <!-- banner -->
    <div class="m-banner">
      <div class="wrap">
        <div class="info">
          <div class="title">{{ $t("application.applyCompany") }}</div>
          <div class="desc">{{ $t("application.applyCompanyDesc") }}</div>
        </div>
      </div>
    </div>
    <div class="m-channel">
      <div class="wrap">
        <div
          class="item"
          v-for="(item, inx) in serviceList"
          :key="`serviceList${inx}`"
        >
          <img class="icon dark-show" :src="imgList[inx]">
          <img class="icon light-show" :src="imgList_1[inx]">
          <div>
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <div class="btnBox">
        <div class="m-agreement">
          <p class="b-2-cl app-desc" v-if="applyPass">{{ congratulate }}</p>
          <p class="b-2-cl app-desc" v-if="btnShow">
            <c-checkBox style="margin-right: 12px;" :value="textFlag" @click="checkoutClick" />
            <span class="protocol">{{ $t("application.agree") }}
                <a class="link" href="/applicationPolicy" target="_blank">{{ $t("application.agreePolicy") }}</a>
            </span>
          </p>
        </div>
        <div v-if="relieving" @click="relieving" class="btn disabled">{{ $t("application.relieveing") }}</div>
        <div v-if="btnShow" @click="apply" class="btn" :class="{ disabled: submitDisabled }">{{ applyBtn }}</div>
        <div v-if="applyPass" @click="relieveClick" class="btn">{{ this.$t("application.relieve") }}</div>
      </div>
    </div>
    <!-- 提示框 -->
    <c-dialog
      :showFlag="alertFlag"
      buttonText="btnConfirm"
      :titleText="$t('application.relieve')"
      @close="alertClose"
      :confirmLoading="confirmLoading"
      @confirm="confirm"
    >
      <p class="b-2-cl dialog-text">{{ $t("application.dialogDesc") }}</p>
    </c-dialog>
  </div>
</template>

<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/CompanyApplication/CompanyApplication';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/CompanyApplication/CompanyApplication.styl';
import Title from "@/views/otcDetailOrder/title";

export default {
  components: { Title },
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.company-application-container {
  background: var(--color-BG);
}
.m-banner, .m-channel {
  width: 80.83vw;
  margin-inline: auto;
}
.m-banner {
  min-height: 130px;
  padding-block: 40px;
}
.m-banner > .wrap {
  display: flex;
  justify-content: space-between;
}
.m-banner > .wrap > .info {
  box-sizing: border-box;
}
.m-banner > .wrap > .info > .title {
  color: var(--color-text-primary);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 32px;
}
.m-banner > .wrap > .info > .desc {
  width: 782px;
  color: var(--color-text-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.m-banner > .wrap > .imgBg {
  width: 476px;
  height: 232px;
}

.m-channel {
  box-sizing: border-box;
  padding-bottom: 70px;
}
.m-channel > .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  gap: 24px;
}
.m-channel > .wrap > .item {
  width: calc((100% - 24px) / 2);
  height: 208px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 12px;
  background: var(--color-BG-Light);
}
.m-channel > .wrap > .item > .icon {
  width: 134px;
  min-width: 134px;
  height: 168px;
  min-height: 168px;
  object-fit: contain;
  margin-right: 20px;
}
.m-channel > .wrap > .item .title {
  color: var(--color-text-primary);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 12px;
}
.m-channel > .wrap > .item .desc {
  color: var(--color-text-secondary);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.m-channel > .btnBox {
  text-align: center;
}
.m-channel > .btnBox > .btn {
  display: inline-block;
  min-width: 147px;
  padding-inline: 24px;
  height: 50px;
  background: var(--color-BTN-primary);
  border-radius: 100px;
  margin: 24px auto auto;
  color: var(--color-BTN-primary-text);
  font-size: 20px;
  line-height: 50px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.m-channel > .btnBox > .btn.disabled {
  color: var(--color-BTN-disabled-text);
  background: var(--color-BTN-disabled-bg);
}

.m-agreement {
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin-top: 44px;
  color: var(--color-text-secondary);
}
.m-agreement .protocol {
  font-weight: 500;
}
.m-agreement .link {
  color: var(--color-Icon);
}

.m-agreement .app-desc {
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-agreement /deep/.common-checkout, .m-agreement /deep/.common-checkout img {
  height: 20px;
  width: 20px;
}
</style>
