<template>
  <div class="notice-info home-bg">
    <!-- <c-pageBanner :title="$t('message.noticeInfo')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content clearfix">
      <c-Breadcrumb v-if="contentId" :routes="routes" />
      <div v-if="!contentId" class="menu" ref="menuBox">
        <div class="menu-tit medium f-1-cl">{{ $t("message.noticeInfo") }}</div>
        <div class="search" v-if="openSearch">
          <!-- 搜索 -->
          <c-inputFind
            :promptText="$t('trade.searchSy')"
            :value="noticeSearchVal"
            @onchanges="setNoticeSearchVal"
            name="trade"
            ref="tradeFind"
            className="search-input findClass"
          />
        </div>
      </div>
      <div v-if="!contentId" class="content-box">
        <ul ref="menuBar" class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class="{ 'f-1-cl': contentId === item.id }"
            @click="writing(item.id)"
            class="menu-item"
          >
            <h1 class="content-title f-1-cl">{{ item.title }}</h1>
            <div class="content-desc" v-html="item.content"></div>
            <p class="time f-2-cl">{{ formatTime(item.timeLong) }}</p>
          </li>
        </ul>
        <div class="empty-box" v-if="!sideList.length && searchLoaded">
          <div class="home-nodata">
            <img class="dark-show" width="81px" height="120px" :src="imgMap.empty" />
            <img class="light-show" width="81px" height="120px" :src="imgMap.empty_1" />
            <p class="notice-empty-text">
              <!-- 暂无数据 -->
              {{ $t("common.notData") }}
            </p>
          </div>
        </div>
        <c-pagination
          v-if="pagination.count / pagination.pageSize > 1"
          :total="pagination.count"
          :current-page="pagination.page"
          :display="pagination.pageSize"
          @pagechange="pagechange"
          class="no-paddleft"
        >
        </c-pagination>
        <transition name="fade">
          <div v-show="isshowLoading" class="loading">
            <c-loading size="50" />
          </div>
        </transition>
      </div>
      <div v-else class="content-box" style="margin-top: 20px;">
        <h1 class="content-id-title">{{ notieContent.title }}</h1>
        <p class="id-time">{{ notieContent.ctime }}</p>
        <!-- <p class="time f-2-cl">{{ notieContent.ctime }}</p> -->
        <!-- <div class="ql-container ql-snow">
          <div class="ql-editor">
            <div class="main-text f-2-cl" v-html="notieContent.content"></div>
          </div>
        </div> -->
        <div class="ql-editor" v-html="notieContent.content"></div>
        <transition name="fade">
          <div v-show="isshowLoading" class="loading">
            <c-loading size="50" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/noticeInfo/noticeInfo";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/noticeInfo/noticeInfo.styl";
import "@/components/BlockChain-ui-privatization/static/css/quill.core.styl";
import "@/components/BlockChain-ui-privatization/static/css/quill.snow.styl";
import "@/components/BlockChain-ui-privatization/static/css/quill.bubble.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus">
.notice-info
  position relative

  img{
    max-width: 90%;
    max-height: 90%;
  }
  .no-paddleft
    padding-left 0

  .empty-box
    margin 80px auto 0 auto
    text-align center

    .notice-empty-text
      margin-top 10px

  .main-content
    width 50%
    margin 20px auto 0

  .menu
    display: flex;
    align-items: center;
    justify-content: space-between;
    // max-height: 860px;
    border-bottom: 1px solid var(--color-Toggle);
    padding-block: 20px 40px;

    .menu-tit
      color: var(--color-text-primary);
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

  .menu-item
    padding 28px 0
    cursor pointer
    user-select none
    border-bottom: 1px solid var(--color-Toggle);

  .pagination
    background none !important
    border none !important

  .pagination-bar
    border none !important
    line-height 50px

    .num
      margin 0

    .pagination-btn
      height 30px
      width 30px
      line-height 30px

  .content-box
    min-height 680px
    position relative

    .content-title
      color: var(--color-text-primary);
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 12px;

    .time
      margin-top 12px
      color: var(--color-text-secondary);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;

    .main-text
      margin-top 30px
      line-height 24px
      font-size 14px
      p
        word-break break-all
    .mmd-loading-circle-right, .mmd-loading-circle-left
      border-color #1baaec

  // 页面动画
  .fade-enter-active, .fade-leave-active
    transition opacity 0.8s

  .fade-enter, .fade-leave-to
    opacity 0

  .loading
    position absolute
    top 50%
    left 50%
    z-index 999
    margin -25px 0 0 -25px

  .search-notice-box
    .clones{
      font-size 13px
      padding: 0 4px
      vertical-align middle;
      cursor: pointer;
    }
    border-width 1px
    border-style solid
    height 28px
    line-height 26px
    margin-bottom 15px

    .iconfont-cont
      text-align center
      display inline-block
      width 30px
      vertical-align middle

    .search-notice-input
      width 140px
      vertical-align middle
</style>
<style scoped>
.content-desc {
  padding: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.content-desc {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.content-id-title{
  color: var(--color-text-primary);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.id-time {
  margin-block: 20px 35px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.ql-editor {
  padding: 0;
  color: var(--color-text-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  overflow: visible;
}
</style>
