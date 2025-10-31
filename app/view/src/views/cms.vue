<template>
  <div class="notice-info home-bg">
    <!-- <c-pageBanner :title="$t('message.help_center')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <c-Breadcrumb v-if="contentId" :routes="routes" />
      <!--<div class="menu">-->
      <!--  <vue-scroll>-->
      <!--    <ul class="f-2-cl">-->
      <!--      <li-->
      <!--        v-for="(item, index) in sideList"-->
      <!--        :key="index"-->
      <!--        @click="goPage(item.fileName)"-->
      <!--        :class="{ 'f-2-cl c-4-bg': contentId === item.fileName }"-->
      <!--        class="menu-item"-->
      <!--      >-->
      <!--        {{ item.title }}-->
      <!--      </li>-->
      <!--    </ul>-->
      <!--  </vue-scroll>-->
      <!--  &lt;!&ndash; <div class="menu-tit f-2-cl">{{$t('message.help_center')}}</div> &ndash;&gt;-->
      <!--</div>-->
      <Privacy v-if="contentId === 'privacy'"/>
      <Agreement v-else-if="contentId === 'agreement'"/>
      <LegalNotice v-else-if="contentId === 'disclaimer'"/>
      <div v-else class="content-box">
        <div class="content-text c-4-bg">
          <h1 class="content-title">{{ notieContent.title }}</h1>
          <p class="time">{{ notieContent.ctime }}</p>
          <div class="main-text" v-html="notieContent.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/cms/cms";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/cms/cms.styl";
import Privacy from "@/views/cms/privacy.vue";
import Agreement from "@/views/cms/agreement.vue";
import LegalNotice from "@/views/cms/legalNotice.vue";
import { isMobile } from "@/utils/newUtils";

export default {
  mixins: [mixin],
  components: {
    Privacy,
    Agreement,
    LegalNotice,
  },
  mounted() {
    this.init();
    isMobile();
  },
};
</script>
<style scoped>
.notice-info .menu {
  height: 600px;
}
.notice-info .content-box {
  padding-left: 0;
  max-width: 1200px;
  margin: auto;
  color: var(--color-text-primary) !important;
}
.notice-info .content-text .time {
  width: auto;
}
.notice-info .content-text .content-title {
  color: var(--color-text-primary) !important;
}
/deep/strong {
  font-weight: bold;
}
/deep/.cms-content-box {
  font: 14px/1.25 Outfit, robotoregular, PingFang SC, Hiragino Sans GB, Heiti SC,
    Microsoft YaHei, WenQuanYi Micro Hei, serif;
}
/deep/.cms-content-box .content-title {
  margin-top: 20px;
}
/deep/.cms-content-box .main-text h2 {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  margin-block: 56px 16px;
}
/deep/.cms-content-box .main-text div,
/deep/.cms-content-box .main-text p {
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: 300;
}
/deep/.cms-content-box .main-text h3 {
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-block: 16px 12px;
}
/deep/.cms-content-box .main-text h4 {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  margin-block: 16px 4px;
}
/deep/.cms-content-box .main-text span {
  display: inline-block;
  width: 18px;
  text-align: right;
  text-indent: 0px;
  margin-left: -6px;
  margin-right: 4px;
}
/deep/.cms-content-box .main-text > div > div:not(:has(> p),:has(> h2),:has(> h3),:has(> h4)) {
  text-indent: -17px;
  padding-left: 24px;
}
</style>
<style lang="stylus" scoped>
.isH5 {
  .main-content {
    min-width: calc(100% - 40px);
    width: calc(100% - 40px);
    margin: 20px 20px 0;
  }
}
</style>
