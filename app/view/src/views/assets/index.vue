<template>
  <div id="assets" class="assets m-account">
    <div class="assets-main">
      <div class="margin-left">
        <!-- 资产中心 -->
        <!--        <p v-if="templateLayoutType !== '2'" class="assets-title b-1-cl medium-fonts medium">-->
        <!--          {{ $t("assets.index.title") }}-->
        <!--        </p>-->
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
      <div class="margin-right clearfix">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/index/index.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.dark .m-account {
  --assets-color-1: rgba(12, 14, 17, 1);
  --assets-color-2: rgba(255, 255, 255, 0.08);
  --assets-color-3: rgba(34, 37, 44, 1);
  --assets-color-4: rgba(255, 255, 255, 0.08);
}
.light .m-account {
  --assets-color-1: rgba(255, 255, 255, 1);
  --assets-color-2: rgba(241, 241, 241, 1);
  --assets-color-3: rgba(238, 238, 238, 1);
  --assets-color-4: rgba(238, 238, 238, 1);
}

/* 2022.12.21 样式修改 */
.m-account {
  background: var(--color-BG);
}
.assets-main {
  padding-left: 280px;
}

.margin-left {
  border-right: 1px solid var(--color-Divider);
  z-index: 2;
}
/deep/.navMenu .navMenuList .listActive {
  background: var(--color-BG-Light);
  position: relative;
  color: var(--color-text-primary);
}
/deep/.navMenu .navMenuList .listActive:after {
  background: var(--color-BG-Light);
  border-radius: 19px;
  width: 4px;
  height: 56px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
