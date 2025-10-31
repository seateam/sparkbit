// Created by 任泽阳. // 基于带图弹窗封装的组件 // *****************************
<template>
  <c-alert
    @close="close"
    :imgMap="imgMap"
    @confirm="confirm"
    :buttonText="buttonText"
    :showFlag="showFlag"
    imageType="1"
    :haveClose="haveClose"
  >
    <section class="verificationc-alert">
      <div class="alertTitle b-1-cl">{{ titleText }}</div>
      <div class="alertText">{{ detaText }}</div>
      <div class="alertError a-2-bd" v-for="(item, index) in dataList" :key="index">
        <span class="alertError-text">{{ item.text }}</span>
        <span class="alertError-icon">
          <svg
            v-if="item.flag"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#5CEEA0"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#999999"
            />
          </svg>
        </span>
      </div>
    </section>
  </c-alert>
</template>
<script>
export default {
  name: "c-verifyCationc-alert",
  props: {
    imgMap: {
      type: Object,
      default: () => {},
      required: true,
    },
    // 数据列表
    dataList: {
      type: Array,
      default: () => [],
    },
    titleText: { default: "", type: String },
    detaText: { default: "", type: String },
    // 展示变量
    showFlag: { default: false, type: Boolean },
    // button文案
    buttonText: { default: "", type: String },
    haveClose: { default: true, type: Boolean },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
<style lang="stylus" scoped>
.verificationc-alert {
  .alertTitle {
    margin-bottom: 36px;
    color: var(--color-text-primary);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
  }
  .alertText {
    margin-bottom: 28px;
    color: var(--color-text-secondary);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
  .alertError {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 16px;
    margin-bottom: 20px;
    border-radius: 8px;
    background: var(--color-BG-Light);
    .alertError-text {
      color: var(--color-text-secondary);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
    }
    .alertError-icon {
      margin-left: auto;
    }
  }
  .alertBot {
    margin-bottom: 10px
  }
}
</style>
