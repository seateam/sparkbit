<template>
  <div class="order-page-box m-orderPage">
    <div class="order-main">
      <div class="margin-left">
        <!-- 订单中心 -->
        <!--2023.02.28 注释标题-->
        <!--<p v-if="templateLayoutType !== '2'" class="order-title b-1-cl medium-fonts medium">-->
        <!--  {{ $t("order.index.title") }}-->
        <!--</p>-->
        <c-navMenu
          :width="280"
          :lineHidth1="lineHidth1"
          :subLineHidth="subLineHidth"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
      <div class="assets-page-title" v-if="templateLayoutType === '2'">
        <div class="page-title-bar b-1-cl">
          {{ pageTitleText }}
        </div>
      </div>
      <div class="margin-right">
        <vue-scroll>
          <div class="margin-right-bar">
            <router-view />
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/order/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/order/index/index.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.dark .m-orderPage {
  --order-color-1: rgba(24, 26, 31, 1);
  --order-color-2: rgba(31, 35, 40, 1);
  --order-color-3: rgba(34, 37, 44, 1);
  --order-color-4: rgba(255, 255, 255, 0.08);
  --order-color-5: rgba(255, 255, 255, 0.6);
}
.light .m-orderPage {
  --order-color-1: rgba(255, 255, 255, 1);
  --order-color-2: rgba(255, 255, 255, 1);
  --order-color-3: rgba(238, 238, 238, 1);
  --order-color-4: rgba(238, 238, 238, 1);
  --order-color-5: rgba(152, 152, 152, 1);
}
.m-orderPage {
  background: var(--order-color-1);
}
/deep/.navMenu .navMenuList .listActive {
  color: var(--mainColor);
  background: rgba(49, 106, 213, 0.31);
  position: relative;
}
/deep/.navMenu .navMenuList li {
  /*background: #181A1F;*/
}
.margin-left {
  background: var(--color-BG);
  border-right: 1px solid var(--color-Divider);
  z-index: 2;
}
.light .margin-left {
  border-color: #f1f1f1;
}
.order-page-box {
  background: var(--color-BG);
}
.order-main {
  padding-left: 280px;
}
.margin-right {
  background: var(--color-BG);
}
</style>
