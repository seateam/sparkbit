// Created by 任泽阳 on 18/12/07. // 对话框
<template>
  <section class="common-dialog">
    <!-- 背景遮罩层 -->
    <div class="dialog-markAll u-7-bg" v-if="showFlag"></div>
    <!-- 弹出框 -->
    <transition name="drop">
      <div class="dialog-frame" :style="mainStyle" v-if="showFlag" ref="dialog">
        <div class="dialog-frame-head a-4-bg" :style="headerStyle">
          <span class="dialog-frame-head-text b-1-cl">{{ titleText }}</span>
          <span class="dialog-frame-head-close">
            <c-iconButton @click="close">
              <img :src="imgMap.cancel" class="icon-20px" alt="" />
            </c-iconButton>
          </span>
        </div>

        <div class="dialog-frame-body" :style="(bodyStyle, customBodyStyle)">
          <slot />
        </div>

        <div class="dialog-frame-bottom" v-if="haveOption">
          <div class="dialog-frame-options" :style="optionStyle">
            <c-button
              type="text"
              paddingW="24px"
              height="50px"
              @click="close"
              className="closeBtnClass"
              v-if="showCloseBtn"
            >
              {{ closeTextProps }}
            </c-button>
            <c-button
              type="solid"
              name="dialogConfirm"
              paddingW="24px"
              height="50px"
              @click="confirm"
              :loading="confirmLoading"
              :disabled="confirmDisabled"
              :style="confirmBtnStyle"
              className="dialogConfirm"
            >
              {{ confirmTextProps }}
            </c-button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
import { imgMap } from "@/utils";

// 按钮
export default {
  name: "c-dialog",
  props: {
    // 展示变量
    showFlag: { default: false, type: Boolean },
    // 上边距  有警告文字时为20px
    paddingTop: { default: "30px", type: String },
    // 下边距
    paddingBottom: { default: "30px", type: String },
    // 提示文案
    titleText: { default: "", type: String },
    // 确认按钮的文案
    confirmText: { default: "", type: String },
    // 取消按钮的文案
    closeText: { default: "", type: String },
    // 确认按钮的loading
    confirmLoading: { default: false, type: Boolean },
    // 确认按钮的disabled
    confirmDisabled: { default: false, type: Boolean },
    // 是否有下面option区域
    haveOption: { default: true, type: Boolean },
    // 改，2022.10.01，新增
    // 改，2022.11.17 修改默认值，引用类型的默认值必须要使用工厂函数 {} =》 ()=>({})
    mainStyle: { default: () => ({}), type: Object },
    headerStyle: { default: () => ({}), type: Object },
    customBodyStyle: { default: () => ({}), type: Object },
    showCloseBtn: { default: true, type: Boolean },
    optionStyle: { default: () => ({}), type: Object },
    confirmBtnStyle: { default: () => ({}), type: Object },
  },
  data() {
    return {
      imgMap,
    };
  },
  watch: {
    showFlag(v) {
      if (v) {
        this.$nextTick(() => {
          if (this.$refs.dialog.offsetHeight % 2 !== 0) {
            const str = `${this.$refs.dialog.offsetHeight + 1}px`;
            this.$refs.dialog.style.height = str;
          }
        });
      }
    },
  },
  computed: {
    confirmTextProps() {
      if (this.confirmText.length) {
        return this.confirmText;
      }
      // 确定
      return this.$t("components.dialog.confirmText");
    },
    closeTextProps() {
      if (this.closeText.length) {
        return this.closeText;
      }
      // 取消
      return this.$t("components.dialog.closeText");
    },
    bodyStyle() {
      return {
        paddingTop: this.paddingTop,
        paddingBottom: this.paddingBottom,
      };
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
    // transform: translateY(-100%);
    top: 35%;
    opacity: 0.7
  }
  100% {
    /* margin-top: 10px; */
    // transform: translateY(-50%);
    opacity: 1;
  }
}
.common-dialog {
  .btnClass {
    margin-right: 10px;
  }
  .dialog-markAll {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
  }
  .dialog-frame {
    transform: 0.3s transition;
    position fixed;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 480px;
    border-radius: 12px;
    background var(--color-BG);
    box-shadow: 0px 17px 38px 0px rgba(0, 0, 0, 0.2);
  }
  .dialog-frame-head {
    box-sizing: border-box;
    height: 72px;
    width: 100%;
    padding: 0 28px;
    line-height: 72px;
    background var(--color-BG);
    border-radius: 12px 12px 0 0;
  }
  .dialog-frame-head-text {
    font-size: 24px;
    font-weight: 700;
    color var(--color-1);
  }
  .dialog-frame-head-close {
    float: right;
    cursor: pointer;
    font-size: 20px;
    margin-top: 26px;
  }
  .dialog-frame-body {
    width: 424px;
    margin-left: 28px;
    margin-top: 16px;
  }
  .closeBtnClass {
    //margin-right: 20px;
    border-width: 1px;
    border-style: solid
    border-color: var(--color-BTN-secondary-border);
    background-color: none;
  }
  .closeBtnClass {
    color: var(--color-BTN-text-secondary-revert);
  }
  .closeBtnClass, .dialogConfirm {
    min-width: 154px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 100px;
  }
  .dialogConfirm {
    color: var(--color-BTN-primary-text);
    background-color: var(--color-BTN-primary);
  }
  .dialog-frame-bottom {
    width: 100%;
    padding: 0 28px 44px;
    height: 94px;
    position: relative;
    box-sizing: border-box;
    .dialog-frame-options {
    width :100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .common-button{
      width:100%;
    }
      .common-button.closeBtnClass{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 100px;
      border: 1px solid var(--color-BTN-secondary-border);
      color: var(--color-BTN-text-secondary-revert);
      font-family: Outfit;
      &:hover{
        background:none;
      }
      }
    }
  }
  .dialog-frame-bottom-z {
    display: flex;
    margin-bottom: 44px;
    height:50px;
    position: relative;
    .dialog-frame-options {
      margin: auto;
      display: flex;
      align-items: center;
      //position: absolute;
      //right: 40px;
    }
  }
}
</style>
