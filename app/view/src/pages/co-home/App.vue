<template>
  <div id="app" :class="pageTheme" class="b-2-cl" style="position: relative; min-height: 800px">
    <c-tip />
    <c-header :class="headClass" v-if="!hideheade" />
    <!-- 改，2022.10.01，新增style -->
    <div
      class="page-content"
      :class="{ 'page-content-chain': hideheade || navigationType === '1' }"
      style="position: relative; min-height: 800px; padding-top: 60px"
    >
      <router-view />
    </div>
    <c-footer :class="footerClass" v-if="!hideFooter" />
  </div>
</template>

<script>
import commonMixin from "@/components/BlockChain-ui-privatization/PC/pages/pages";
import mixin from "@/components/BlockChain-ui-privatization/PC/pages/co-home/co-home";
import "@/components/BlockChain-ui-privatization/PC/pages/co-home/co-home.styl";
import "../../assets/js/encrypt";

export default {
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();

    // setTimeout(() => {
    //   this.embedded_script();
    // }, 2000);
  },

  methods: {
    // 改，2022.10.29，新增
    // embedded_script() {
    //   let recaptchaScript = document.createElement("script");
    //   recaptchaScript.setAttribute("src", "https://widget.intercom.io/widget/hgs7jbgw");
    //   document.head.appendChild(recaptchaScript);
    // },
  },
};
</script>
<style>
/* 改，2022.12.30 使用主题色方案 */
@import "../../assets/css/theme.css";
@import "../../assets/css/common.css";

header.top-common-header {
  z-index: 13;
}

</style>
