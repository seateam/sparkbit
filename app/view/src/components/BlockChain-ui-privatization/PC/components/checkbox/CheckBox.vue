// Created by 任泽阳 on 18/12/17. // 复选框组件
<template>
  <section class="common-checkout" @click="handClick">
    <img v-if="value" :src="checked" class="icon-14px">
    <img v-else :src="uncheck" class="icon-14px">
    <!-- <span class='common-checkout-true'></span>
    <span class='common-checkout-false'</span> -->
  </section>
</template>

<script>
import { imgMap } from "@/utils";

export default {
  name: "c-checkBox",
  props: {
    value: { default: false, type: Boolean },
    // className: { default:  }
  },
  data() {
    return {
      uncheck: imgMap.uncheck,
      checked: imgMap.checked,
    };
  },
  methods: {
    handClick() {
      this.$emit("click", !this.value);
    },
  },
};
</script>
<style lang="stylus">
.common-checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor pointer;
  overflow: hidden;
  .common-checkout-true {
    border-radius: 2px;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align middle;
  }
  .common-checkout-false {
    display: inline-block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    vertical-align middle;
  }
}
</style>
