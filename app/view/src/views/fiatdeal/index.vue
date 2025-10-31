<template>
  <div class="main m-page">
    <!-- 改，2022.08.28，a-5-bg -> h-1-bg  -->
    <div class="margin-left clearfix m-nav">
      <!-- 改，2022.12.21，隐藏主标题  -->
      <!--        <div class="title b-1-cl medium-fonts medium">-->
      <!--          {{ fiatTradeOpen ? $t("assets.b2c.otcShow.fiatdealTitle") : $t("fiatdeal.title") }}-->
      <!--        </div>-->
      <c-navMenu
        :width="280"
        :lineHidth1="48"
        :navList="navList"
        :navListActive="navListActive"
        @listChange="listChanges"
      />
    </div>
    <div
      class="otc-page-title"
      style="background-color: #000"
      v-if="templateLayoutType === '2'"
    >
      <div class="page-title-bar b-1-cl">
        {{ pageTitleText }}
      </div>
    </div>
    <div class="margin-right clearfix">
      <vue-scroll>
        <Center :pageTitleText="pageTitleText"/>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/fiatdeal/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/fiatdeal/index/index.styl";
import Center from "@/views/fiatdeal/center.vue";

export default {
  mixins: [mixin],
  components: {
    Center,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.m-page {
  background: var(--color-BG);
  padding-bottom: 20px;
}
/deep/.navMenu .navMenuList .listActive {
  background: rgba(16, 88, 222, 0.10);
  position: relative;
  color: var(--mainColor);
}
/deep/.navMenu .navMenuList .listActive:after {
  background: var(--mainColor);
  border-radius: 19px;
  width: 4px;
  height: 56px;
  position: absolute;
  left: 0;
  top: 0;
}
/deep/.common-select .input_line_inp {
  color: var(--color-19) !important;
}
.margin-left {
  border-right: 1px solid var(--color-Divider);
  z-index: 2;
  height: 100%;
  background: var(--color-BG);
  box-sizing: border-box;
}
.light .margin-left {
  border-color: #f1f1f1;
}
.main {
  padding-left: 0px;
}
.main > .margin-right {
  box-sizing: border-box;
  padding: 0 0 0 280px;
}
.m-nav {
  overflow: hidden;
  height: 100%;
}
/deep/.navMenuList {
  border-top-right-radius: 10px;
}
.margin-right {
  min-height: unset;
}
</style>
