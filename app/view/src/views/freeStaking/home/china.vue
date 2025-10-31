<template>
  <div class="free-staking" v-if="homeData">
    <div class="banner header">
      <div>
        <div class="b-title">{{ $t("freeStaking.home.title") }}</div>
        <div class="b-desc">{{ $t("freeStaking.home.desc") }}</div>
        <div class="b-group">
          <c-button height="50px" paddingW="24px" @click="navToPosHistory()">{{
            $t("freeStaking.home.myholdings")
          }}</c-button>
          <c-button height="50px" paddingW="24px" className="closeBtnClass">{{
            $t("freeStaking.home.FQA")
          }}</c-button>
        </div>
      </div>
      <div class="banner-img">
        <img :src="imgMap.stake_icon" />
      </div>
    </div>
    <div class="free-staking-cont">
      <div class="nav-tab c-5-bd">
        <c-navTab
          minWidth="90px"
          activeClassName="f-1-cl"
          activeColor="mainTab"
          class="c-5-bd"
          :marginRight="32"
          :currentTab="currentType"
          :navTab="navTab"
          lineHeight="55"
          @currentType="selectType"
        />
        <div class="clearfix"></div>
      </div>
      <div class="min-tab">
        <div
          class="min-tab-item"
          :class="currentStyle(item)"
          v-for="item in statusTab"
          :key="item.index"
          @click="changeCurrentStatus(item)"
        >
          {{ item.name }}
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="project-list" v-if="filterProjectData.length">
        <div class="project-item c-4-bg" v-for="item in filterProjectData" :key="item.index">
          <div class="label-cont">
            <div class="label-type" v-if="showLabel(item, 2)">
              {{ projectLabel(item.labelType) }}
            </div>
            <div class="label-type hot f-6-cl" v-if="showLabel(item, 1)">
              {{ projectLabel(item.labelType) }}
            </div>
            <!-- <div
              class="label-type f-6-cl"
              :class="`status-label-${item.activeStatus}`"
              v-if="item.activeStatus < 6"
            >
              {{ statusText(item.activeStatus) }}
            </div> -->
          </div>
          <div class="project-itemw">
            <div class="project-iteml">
              <div class="logo-box">
                <img
                  class="logo"
                  :src="item.logo"
                  @error="$event.target.style.display = 'none'"
                  alt=""
                />
              </div>
              <div class="label-1">{{ item.baseCoin }}</div>
              <!-- <div class="label-cont">
                <div class="label-type" v-if="showLabel(item, 2)">
                  {{ projectLabel(item.labelType) }}
                </div>
                <div class="label-type hot f-6-cl" v-if="showLabel(item, 1)">
                  {{ projectLabel(item.labelType) }}
                </div>
              </div> -->
              <!-- <div class="short-name f-2-cl">{{ item.baseCoin }}</div> -->

              <div class="clearfix"></div>
            </div>
            <!-- <div class="project-title f-1-cl">{{ item.name }}</div> -->
            <div class="label">
              <div class="label-title f-4-cl">{{ item.gainRate }}%</div>
              <div class="label-value">{{ $t("freeStaking.home.gainRate") }}</div>
            </div>
            <div class="label" v-if="item.projectType === 3">
              <div class="label-title f-1-cl">{{ item.lockDay }} {{ langTxt.txt1 }}</div>
              <div class="label-value">
                {{ $t("freeStaking.home.lockDay") }}
              </div>
            </div>
            <div class="label" v-if="item.projectType === 3">
              <div class="label-title f-1-cl">{{ item.progress }}</div>
              <div class="label-value">
                {{ $t("freeStaking.home.lockProgress") }}
              </div>
            </div>
          </div>
          <div class="project-itemr">
            <!-- <div class="project-status">
              <svg class="icon icon-18" aria-hidden="true">
                <use :xlink:href="iconStyle[Number(item.status)]"></use>
              </svg>
              <span
                class="status-text"
                :class="countStatusIsOn(item)"
                >{{ countStatusText(item) }}</span
              >
            </div> -->
            <div class="nav-active">
              <c-button height="40px" @click="takeActivityDetail(item)">
                <div class="nav-active-text">
                  {{ $t("freeStaking.home.takeActivity") }}
                </div>
              </c-button>
            </div>
            <div class="clearfix"></div>
          </div>
          <!-- <div class="clearfix"></div> -->
        </div>
      </div>
      <div v-else class="no-data f-2-cl">
        <img class="dark-show" width="81px" height="120px" :src="imgMap.empty" />
        <img class="light-show" width="81px" height="120px" :src="imgMap.empty_1" />
        <p>
          <!-- 暂无数据 -->
          {{ $t("common.notData") }}
        </p>
      </div>
    </div>
    <!-- <div class="banner footer">
      <div class="banner-cont clearfix">
        <img class="banner-logo" :src="homeData.footBanner" />
        <div class="rich-cont">
          <div class="rich-title">{{ homeData.footTitle }}</div>
          <div class="rich-text" v-html="homeData.detail"></div>
          <div class="rich-line"></div>
          <div class="rich-faq" v-if="homeData.faqUrl">
            <a :href="homeData.faqUrl" target="_blank">{{ $t("freeStaking.home.FQA") }}</a>
          </div>
          <div class="rich-eamil" v-if="homeData.contact">
            {{ $t("freeStaking.home.contactUS") }}: {{ homeData.contact }}
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/home/home";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/home/home.styl";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  data() {
    return {
      imgMap,
    };
  },
  computed: {
    lan() {
      return this.$store.state.baseData.lan;
    },
    langTxt() {
      const { lan } = this;
      if (lan === "zh_CN" || lan === "el_GR") {
        return {
          txt1: "天",
        };
      }
      return {
        txt1: "Days",
      };
    },
  },
};
</script>
<style scoped>
.free-staking {
  background-color: var(--color-BG);
}
.free-staking .free-staking-cont .min-tab,
.free-staking .free-staking-cont .nav-tab,
.free-staking-cont > .title {
  overflow: hidden;
}
.free-staking .free-staking-cont .nav-tab /deep/.c_list_nav li span {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.free-staking .free-staking-cont .nav-tab /deep/.mainTab {
  background-color: var(--color-text-primary);
}
.free-staking .banner.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8.805vw;
  width: 100%;
  height: 336px;
  margin-inline: auto;
  background-color: #000;
  color: #ffffff;
}
.free-staking .b-title {
  font-size: 40px;
  font-weight: 700;
}
.free-staking .b-desc {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  margin-block: 12px 40px;
}
.free-staking .b-group {
  display: flex;
}
.free-staking .b-group .common-button {
  margin-right: 20px;
  border-radius: 100px;
}
.free-staking .b-group .common-button.closeBtnClass {
  background-color: transparent;
  border: 1px solid var(--color-BTN-secondary-border);
}
/deep/.c_list_nav li.f-1-cl,
.free-staking .free-staking-cont .title .titlel {
  color: var(--color-1);
}
.free-staking .banner .rich-cont .rich-title {
  color: var(--color-1);
}
.free-staking .project-list .project-item {
  background: var(--color-BG-Light);
  border-bottom: 1px solid var(--color-Toggle);
  border-radius: 12px;
  padding: 30px 28px;
  height: 42px;
}
.free-staking-cont > .title {
  font-size: 32px;
  line-height: 48px;
  font-weight: 700;
}
.free-staking .free-staking-cont .min-tab {
  display: flex;
  gap: 8px;
}
.free-staking .free-staking-cont .min-tab-item.c-5-bg {
  background-color: var(--color-BG-Light);
}
.free-staking .free-staking-cont .min-tab-item.f-1-cl {
  color: var(--color-text-primary);
}
.nav-tab {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-tab .item {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  line-height: 55px;
  color: var(--color-text-secondary);
  height: 55px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  white-space: nowrap;
}
.nav-tab .item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 3px;
}
.nav-tab .item.active {
  color: var(--color-text-primary);
}
.nav-tab .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 38px 100%
    no-repeat;
}
.free-staking .project-list .project-item .project-iteml .label-1,
.free-staking .project-list .project-item .label-title {
  font-size: 20px;
  line-height: 24px;
  color: var(--color-text-primary);
  font-weight: 600;
}
.free-staking .project-list .project-item .project-iteml .label-1 {
  margin-left: 20px;
}
.nav-active .common-button {
  border-radius: 100px;
}
.free-staking .project-list .project-item .project-iteml .logo,
.free-staking .project-list .project-item .project-iteml .logo-box {
  width: 40px;
  height: 40px;
}
.free-staking .project-list .project-item .project-iteml .logo {
  background: var(--color-BG-Light);
}
.free-staking .project-list .project-item .project-iteml .logo-box {
  position: relative;
  border-radius: 100px;
  background: var(--color-Img-bg);
  overflow: hidden;
}
.free-staking .project-list .project-item .project-itemw {
  flex: 1;
  display: flex;
  align-items: center;
}
.free-staking .project-list .project-item .project-itemw > div {
  width: 25%;
}
</style>
