<template>
  <div class="notice-info clearfix">
    <!-- <c-pageBanner :title="$t('message.mesage')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <div class="menu">
        <!--<h3 class="menu-tit f-1-cl">{{ $t("message.mesage") }}</h3>-->
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class="{ active: messageType === item.tid }"
            @click="switchType(item.tid, item.title)"
            class="menu-item"
          >
            <img
              v-if="messageType === item.tid"
              class="imgBg dark-show"
              :src="imgMap[`msg${index}_1`]"
            />
            <img
              v-if="messageType === item.tid"
              class="imgBg light-show"
              :src="imgMap[`msg${index}_1`]"
            />
            <img v-else class="imgBg" :src="imgMap[`msg${index}`]" />
            <span class="name">{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-list">
          <div class="content-title f-1-cl c-5-bd">
            <span>{{ title }}</span>
          </div>
          <ul class="message-list" v-if="notieContent.length">
            <li class="all-select c-5-bd">
              <i class="status">
                <c-checkBox
                  :value="dataListId.length === selectArr.length"
                  @click="checkoutSelect('all')"
                />
              </i>
              <div class="message-text">
                <div class="main-text f-2-cl">
                  <!-- 全选 -->
                  {{ $t("message.selectAll") }}
                </div>
              </div>
              <c-button
                type="text"
                className="read-btn"
                marginTop="0"
                @click="onChangeRead(0, 'all')"
              >
                <!-- 全部标记为已读 -->
                {{ $t("message.readAll") }}
              </c-button>
              <c-button
                type="text"
                className="delete-btn"
                marginTop="0"
                @click="deleteMsg(selectArr, 'all')"
              >
                <!-- 删除 -->
                {{ $t("message.delete") }}
              </c-button>
            </li>
            <!-- notieContent -->
            <li :key="index" v-for="(item, index) in notieContent">
              <i class="status">
                <c-checkBox
                  :value="selectArr.indexOf(item.id) !== -1"
                  @click="checkoutSelect(item.id)"
                />
              </i>
              <div class="message-text">
                <div class="message-wrap">
                  <div class="message-icon" :class="{ noread: item.status === 1 }">
                    <img class="dark-show" :src="imgMap[`msg${getIcon(item.messageType)}_1`]" />
                    <img class="light-show" :src="imgMap[`msg${getIcon(item.messageType)}_1`]" />
                  </div>
                  <div
                    @click="onChangeRead(item.id, index)"
                    :class="item.status === 1 ? 'f-1-cl' : 'f-2-cl'"
                    v-html="item.messageContent"
                  ></div>
                </div>
                <p class="time f-2-cl">{{ formatTimeFn(item.ctime) }}</p>
              </div>
              <c-button
                type="text"
                marginTop="5px"
                className="delete-btn right"
                @click="deleteMsg(item.id, index)"
              >
                <!-- 删除 -->
                {{ $t("message.delete") }}
              </c-button>
            </li>
          </ul>
          <div v-else class="no-data f-2-cl">
            <img class="dark-show" width="81px" height="120px" :src="noData" />
            <img class="light-show" width="81px" height="120px" :src="noData_1" />
            <p>
              <!-- 暂无数据 -->
              {{ $t("common.notData") }}
            </p>
          </div>
          <transition name="fade">
            <div v-show="isshowLoading" class="loading">
              <c-loading size="50" />
            </div>
          </transition>
          <c-pagination
            v-if="pagination.count / pagination.pageSize > 1"
            :total="pagination.count"
            classes="c-3-bg"
            :current-page="pagination.page"
            :display="pagination.pageSize"
            @pagechange="pagechange"
          >
          </c-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/message/message";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/message/message.styl";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      noData: imgMap.empty,
      noData_1: imgMap.empty_1,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getIcon(tid) {
      return this.sideList.findIndex((side) => side.tid === tid);
    },
  },
};
</script>
<style scoped>
.notice-info {
  background: #181a1f;
}
.notice-info .menu {
  width: 280px;
  z-index: 2;
}
.notice-info .menu .menu-item {
  height: 56px;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  color: var(--color-text-secondary);
  position: relative;
}
.notice-info .menu .menu-item > .name {
  padding-left: 10px;
  white-space: nowrap;
}
.notice-info .menu .menu-item.active {
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: 16px;
  background: var(--color-BG-Light);
}
.notice-info .menu .menu-item svg > path:not(.otherPath),
.notice-info .menu .menu-item svg > circle {
  fill: #868e9b;
}
.notice-info .menu .menu-item.active svg > path:not(.otherPath),
.notice-info .menu .menu-item.active svg > circle {
  fill: var(--mainColor);
}

.m-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(135deg);
  width: 6px;
  height: 6px;
  border-top: 2px solid;
  border-right: 2px solid;
  border-color: #838f9f;
}
.notice-info .content-list .content-title {
  padding-block: 40px;
  color: var(--color-text-primary);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
}
.notice-info .content-box {
  padding-left: 280px;
  position: relative;
  background: var(--color-BG);
}
.notice-info .content-list {
  width: 960px;
  min-height: 800px;
  margin-inline: auto;
}
.message-text > div.f-2-cl {
  font-weight: 400;
  font-size: 14px;
  color: var(--color-text-primary);
}
.message-text .message-wrap > div:not(.message-icon) {
  padding-top: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.message-text .message-wrap div.f-1-cl {
  color: var(--color-text-primary);
}
.message-text .message-wrap div.f-2-cl {
  color: var(--color-text-secondary);
}
.notice-info .content-list .time {
  margin-top: 12px;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
}

/deep/.common-button.u-8-cl {
  color: var(--mainColor);
}
/deep/.common-button.u-9-bg {
  background: rgba(252, 213, 53, 0.3);
}
.notice-info .menu .menu-item > svg {
  flex-shrink: 0;
}
.message-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 100%;
  background-color: var(--color-BG-Light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.message-icon.noread {
  background-color: var(--color-Toggle);
}
.message-wrap {
  display: flex;
  color: var(--color-text-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
/deep/.delete-btn .common-button-slot,
/deep/.read-btn .common-button-slot {
  font-size: 14px;
  line-height: 16px;
}
img.light-show {
  filter: brightness(0);
}
</style>
