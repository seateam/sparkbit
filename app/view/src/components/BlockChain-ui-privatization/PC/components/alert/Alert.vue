// Created by 任泽阳 on 18/12/06. // 带图弹窗组件 // *****************************
<template>
  <section class="common-alert">
    <!-- 背景遮罩层 -->
    <div class="alert-markAll a-9-bg" v-if="showFlag"></div>
    <!-- 弹出框 -->
    <transition name="drop">
      <div class="alert-frame" :style="{ background: backgroundColor }" v-if="showFlag">
        <div class="alert-close">
          <c-iconButton @click="close" v-if="haveClose">
            <img :src="imgMap.cancel" class="icon-20px" alt="" />
          </c-iconButton>
        </div>
        <!-- 图片 -->
        <!-- <div class='alert-img' :style='imgClass'></div> -->
        <!-- 文本 -->
        <div class="alert-main">
          <slot></slot>
        </div>
        <!-- 文案 button -->
        <div class="alert-button-options">
          <c-button
            type="text"
            className="closeBtnClass"
            width="50%"
            height="50px"
            @click="close"
            >{{ $t("components.dialog.closeText") }}</c-button
          >
          <c-button
            type="text"
            paddingW="15px"
            width="50%"
            height="50px"
            @click="confirm"
            className="dialogConfirm"
            >{{ buttonTextProp }}</c-button
          >
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
export default {
  name: "c-alert",
  props: {
    imgMap: {
      type: Object,
      default: () => {},
      required: true,
    },
    // 展示变量
    showFlag: { default: false, type: Boolean },
    // button文案
    buttonText: { default: "", type: String },
    haveClose: { default: true, type: Boolean },
    // img
    imageType: {
      default: "2",
      type: String,
    },
    backgroundColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    imgClass() {
      const { imgMap } = this;
      const img = this.imageType === "1" ? imgMap.alert : imgMap.alert2;
      return {
        backgroundImage: `url(${img})`,
      };
    },
    buttonTextProp() {
      if (this.buttonText.length) {
        return this.buttonText;
      }
      // 我知道了
      return this.$t("components.alert.buttonText");
    },
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
<style lang="stylus">
.drop-enter-active {
  animation: drop-in .3s;
}
.drop-leave-active {
  animation: drop-in .3s reverse;
}
@keyframes drop-in {
  0% {
    top: 35%;
    opacity: 0.7
  }
  100% {
    opacity: 1;
  }
}
.common-alert {
  .closeBtnClass {
    font-size: 14px
  }
  .alert-markAll {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
  }
  .alert-frame {
    transform: 0.3s transition;
    position fixed;
    z-index: 101;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 480px;
    padding: 20px 28px 44px;
    box-sizing: border-box;
    border-radius: 12px;
    background: var(--color-BG);
    box-shadow: 0 166px 47px 0 rgba(0, 0, 0, 0.00), 0 106px 43px 0 rgba(0, 0, 0, 0.01),
      0 60px 36px 0 rgba(0, 0, 0, 0.03), 0 27px 27px 0 rgba(0, 0, 0, 0.05), 0 7px 15px 0 rgba(0, 0, 0, 0.06);
    .alert-close {
      position: absolute;
      right: 28px;
      top: 20px;
      cursor: pointer
    }
    .alert-img {
      position: absolute;
      width: 80px;
      height: 80px;
      left: 39px;
      top: 55px;
    }
    .alert-main {
      display: inline-block;
      width: 100%;
      min-height: 60px;
      padding-bottom: 16px;
      flex-direction: column;
      align-items: flex-start;
      word-wrap: break-word;
      word-break: normal;
      font-size: 14px;
    }
  .alertTitle {
    font-size:24px;
    margin-bottom :36px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  .alertError {
    display:flex;
    align-items :center;
    justify-content: space-between;
    height: 52px;
    border-radius: 8px;
    padding: 0 12px;
    background-color: var(--color-BG-Light);
    margin: 20px 0;
    .alertError-text {
      font-size :14px;
      line-height :18px;
      color: var(--color-text-error);
    }
  }
  .common-button.dialogConfirm.common-button-text{
    background: var(--mainColor);
    color:#fff
  }
    .alert-button-options {
    width :100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .common-button.closeBtnClass{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 100px;
      border: 1px solid var(--color-BTN-secondary-border);
      color: var(--color-BTN-text-secondary-revert);
      font-family: Outfit;
      }
    }
  }
}
</style>
