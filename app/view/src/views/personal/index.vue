<template>
  <div class="main personalPage">
    <div class="margin-left clearfix">
      <!--2023.02.27 隐藏-->
      <!--<div v-if="templateLayoutType !== '2'" class="title b-1-cl medium-fonts medium">-->
      <!--  {{ this.$t("personal.navMenu.title") }}-->
      <!--</div>-->
      <c-navMenu
        :width="280"
        :lineHidth1="lineHidth1"
        :subLineHidth="subLineHidth"
        activeColor="b-1-cl"
        :navList="navList"
        :navListActive="navListActive"
        @listChange="listChanges"
      />
    </div>
    <div class="page-title" v-if="templateLayoutType === '2'">
      <div class="page-title-bar b-1-cl">
        {{ pageTitleText }}
      </div>
    </div>
    <div class="margin-right clearfix">
      <vue-scroll v-if="templateLayoutType === '2'">
        <!-- 改，2022.10.17，新增style -->
        <div class="margin-right-bar" style="min-height: 900px">
          <router-view />
        </div>
      </vue-scroll>
      <div class="margin-right-bar" v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/index/index.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.main {
  padding-left: 280px;
  background: var(--color-BG);
}
.personalPage {
  --borderRadius: 10px;
}
.margin-right {
  min-height: unset;
}
.margin-left {
  background: var(--color-BG);
  border-right: 1px solid var(--color-Divider);
}
/deep/.user-management-header {
  border-bottom-left-radius: var(--borderRadius);
}
/deep/.user-management .user-management-content {
}
/deep/.navMenu .navMenuList {
  /* margin: 0 12px; */
}
/deep/.navMenu .navMenuList li span {
  font-family: Outfit !important;
}
/deep/.navMenu .navMenuList .listActive {
  background: var(--color-BG-Light);
  position: relative;
  color: var(--color-text-primary);
  border-radius: 8px;
}

/deep/.navMenu .navMenuList path {
  fill: var(--color-text-secondary);
}
/deep/.navMenu .navMenuList .listActive path {
  fill: var(--color-text-primary);
}
</style>
