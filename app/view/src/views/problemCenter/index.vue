<template>
  <div class="initiateQuestions home-bg">
    <!-- <c-pageBanner :title="$t('message.help_center')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <div class="menu">
        <!-- <div class="menu-tit f-1-cl">{{ $t('questions.title') }}</div> -->
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class="{ active: contentId === item.fileName || hoverId == item.fileName}"
            @click="pushRouter(item.fileName)"
            @mouseenter="handMouseenter(item)"
            @mouseleave="handMouseleave"
            class="menu-item"
          >
            <i
              v-html="
                contentId === item.fileName || hoverId == item.fileName
                  ? item.activeIconSvg
                  : item.iconSvg
              "
            ></i>
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-text">
          <!-- <h1 class="content-title f-1-cl">{{notieContent.title}}</h1>
          <p class="time f-2-cl">{{notieContent.ctime}}</p>
          <div class="main-text f-2-cl" v-html ="notieContent.content">
          </div> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/index/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/index/index.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.initiateQuestions .menu .menu-tit,
.f-1-cl {
  color: var(--color-1);
}
.light .initiateQuestions .menu .menu-item.c-4-bg {
  background: rgba(49, 106, 213, 0.31);
}
.initiateQuestions .content-text {
  background: var(--color-BG);
}
.initiateQuestions .menu i {
  height: 16px;
  margin-right: 10px;
}
.initiateQuestions /deep/.menu-item.active path {
  fill: var(--color-text-primary);
}
</style>
