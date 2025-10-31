// Created by 任泽阳 on 18/12/05. // 搜索输入框
<template>
  <section
    class="input-find-content"
    :class="`${className}`"
    @mouseenter="handMouseenter"
    @mouseleave="handMouseleave"
  >
    <!-- <div v-if='solidBcClass' class='solidBc' :class='solidBcClass'></div> -->
    <div class="content">
      <span class="iconbox" v-if="!iconHide">
        <img v-if="theme === 'Dark'" class="icon-18px" :src="imgMap.search" />
        <img v-if="theme === 'Light'" class="icon-18px" :src="imgMap.search_1" />
      </span>
      <input
        v-model="curValue"
        :disabled="disabled"
        :style="inputStyle"
        ref="inputFind"
        autocomplete="off"
        class="b-1-cl"
        :placeholder="promptText"
        @focus="handFocus"
        @blur="handBlur"
      />
      <svg
        class="clones"
        @click="clones"
        v-if="curValue && curValue.length && !iconHide"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M5.3 11.75L8 9.05L10.7 11.75L11.75 10.7L9.05 8L11.75 5.3L10.7 4.25L8 6.95L5.3 4.25L4.25 5.3L6.95 8L4.25 10.7L5.3 11.75ZM8 15.5C6.9625 15.5 5.9875 15.3031 5.075 14.9094C4.1625 14.5156 3.36875 13.9812 2.69375 13.3062C2.01875 12.6312 1.48437 11.8375 1.09062 10.925C0.696875 10.0125 0.5 9.0375 0.5 8C0.5 6.9625 0.696875 5.9875 1.09062 5.075C1.48437 4.1625 2.01875 3.36875 2.69375 2.69375C3.36875 2.01875 4.1625 1.48437 5.075 1.09062C5.9875 0.696875 6.9625 0.5 8 0.5C9.0375 0.5 10.0125 0.696875 10.925 1.09062C11.8375 1.48437 12.6312 2.01875 13.3062 2.69375C13.9812 3.36875 14.5156 4.1625 14.9094 5.075C15.3031 5.9875 15.5 6.9625 15.5 8C15.5 9.0375 15.3031 10.0125 14.9094 10.925C14.5156 11.8375 13.9812 12.6312 13.3062 13.3062C12.6312 13.9812 11.8375 14.5156 10.925 14.9094C10.0125 15.3031 9.0375 15.5 8 15.5Z"
          fill="#898989"
        />
      </svg>
    </div>
  </section>
</template>
<script>
import { imgMap } from "@/utils";

export default {
  name: "c-inputFind",
  data() {
    return {
      imgMap,
      theme: "Dark",
      nowValue: "", // 内部双向数据绑定
      maxLength: 100, // 最长长度
      isHover: false,
      isFocus: false,
    };
  },
  props: {
    name: { default: "", type: String }, // 名称标识
    className: { default: "", type: String }, // class根容器
    disabled: { default: false, type: Boolean }, // 是否为只读
    promptText: { default: "", type: String }, // 提示文案
    value: { default: "", type: String }, // 外部 v-model 传入的植
    lightColour: { default: false, type: Boolean }, // 是否为浅色版
    iconHide: { default: false, type: Boolean },
    inputStyle: { default: "", type: String },
  },
  mounted() {
    // 判断主题
    let bodyClass = document.querySelector("body");
    bodyClass = bodyClass.getAttribute("class");
    this.theme = bodyClass.includes("light") ? "Light" : "Dark";
    this.$bus.$on("switchTheme", (th) => {
      this.theme = th === "light" ? "Light" : "Dark";
    });
  },
  watch: {
    nowValue(v) {
      // 限制最长长度
      if (v.length > this.maxLength) {
        this.nowValue = v.substring(0, this.maxLength);
      }
      // 限制空格
      if (v.indexOf(" ") !== -1) {
        const arr = this.nowValue.split(" ");
        let str = "";
        arr.forEach((item) => {
          str += item;
        });
        this.nowValue = str;
      }
      this.$emit("onchanges", v, this.name);
    },
  },
  created() {
    this.$bus.$off("inputFind-focus");
    this.$bus.$on("inputFind-focus", (name) => {
      if (name === this.name) {
        this.focusFn();
      }
    });
  },
  computed: {
    curValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.nowValue = value;
      },
    },
    contentClass() {
      if (this.isHover || this.isFocus) {
        // return "a-12-bd";
        return "a-2-bd";
      }
      return "a-2-bd";
    },
    solidBcClass() {
      let className = null;
      if (this.isHover) {
        className = "solidBc-hover";
      }
      if (this.isFocus) {
        className = "solidBc-active";
      }
      return className;
    },
  },
  methods: {
    focusFn() {
      this.$nextTick(() => {
        this.$refs.inputFind.focus();
      });
    },
    clones() {
      this.$emit("onchanges", "", this.name);
    },
    // input 鼠标划入
    handMouseenter() {
      this.isHover = true;
    },
    // input 鼠标划出
    handMouseleave() {
      this.isHover = false;
    },
    // input 获取焦点
    handFocus() {
      this.$emit("focus");
      this.isFocus = true;
    },
    // input 失去焦点
    handBlur() {
      this.$emit("blur");
      this.isFocus = false;
    },
  },
};
</script>
<style lang="stylus">
.input-find-content {
  width: 200px;
  height: 40px;
  position: relative;
  // 改，2022.10.02，2px -> 20px
  border-radius: 8px;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  transition: all 0.3s;
  .clones {
    position: absolute;
    right: 10px;
    line-height: 28px;
    cursor: pointer;
  }
  .solidBc {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .content {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
  }
  .solidBc-hover {
    opacity: 0.05
  }
  .solidBc-active {
    opacity: 0.05
  }
  .iconbox {
    width: 30px;
    height: 40px;
    padding-left: 16px;
    display: flex;
    align-items: center;
  }
  input {
    width: 168px;
    height: 20px;
    margin-top: -1px;
    line-height: 20px;
    vertical-align: middle
  }
}
.input-find-content.findClass {
  width 294px
  border-radius 8px
  border 1px solid var(--color-Input-border)
}
.input-find-content.findClass:hover {
  border 1px solid var(--color-BTN-secondary-border)
}
</style>
