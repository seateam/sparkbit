<!--2022.12.23 样式重构-->
<template>
  <div class="innovation m-page">
    <!--banner-->
    <div class="m-banner">
      <div class="ct">
        <!--<div class="longTxt">{{ $store.state.systemConfig.company_name }} users' one-stop service channel to get high quality projects with low cost</div>-->
        <div>
          <div class="longTxt">{{ companyName }} {{ $t("replenish.ieo.title") }}</div>
          <c-button
            class="my-btn"
            height="50px"
            paddingW="24px"
            style="margin-top: 40px"
            @click="gotoTrade()"
            >{{ $t("freeStaking.home.myholdings") }}</c-button
          >
        </div>
        <!--<div class="btn">{{ $t("replenish.ieo.MarketPlace") }}</div>-->
        <img class="imgBg dark-show" :src="imgMap.ieo_b" />
        <img class="imgBg light-show" :src="imgMap.ieo_b_1" />
      </div>
    </div>

    <!--tab选择-->
    <div class="m-tabBox">
      <div class="m-tab">
        <div
          class="item"
          :class="{ active: nowType === item.index }"
          v-for="(item, index) in navTab"
          :key="index"
          @click="currentType(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!--列表-->
    <div class="m-list">
      <template v-if="dataList.length">
        <div class="item" v-for="(item, index) in sortedDataList" :key="index">
          <img class="img pc" :src="item.logo" />
          <div class="info">
            <div class="name">
              <img class="img h5" :src="item.logo" />
              <span>{{ item.name }}</span>
              <span :class="`label ${disabledClass(item)}`">{{ setStatusText(item) }}</span>
            </div>
            <div class="m-progress">
              <div class="topInfo">
                <div>
                  <div>{{ $t("innov.rz_total") }}</div>
                  <div class="coin">
                    {{ fixDFun(item.money, item.coinSymbol)
                    }}{{ item.coinSymbol | getCoinShowName(coinList) }}
                  </div>
                </div>
                <div>
                  <div>{{ $t("innov.progress") }}</div>
                  <div class="percent">{{ countScale(item.speed, 100) }}%</div>
                </div>
              </div>
              <div class="progressBar" :class="{ pending: item.status == 3 }">
                <div :style="{ width: countScale(item.speed, 100) + '%' }"></div>
              </div>
            </div>
            <div class="time">
              <div>
                <div class="start">{{ $t("innov.start") }}</div>
                <div class="value">
                  {{ formatTimeFn(item.startTime) }} ～ {{ formatTimeFn(item.endTime) }}
                </div>
              </div>
              <button
                v-if="item.status == 3 || item.status == 2"
                class="btn"
                :disabled="submitDisabled(item)"
                :class="{ active: !isBetweenNow(item.startTime, item.endTime) }"
                @click="submit(item.projectId)"
              >
                {{
                  isBetweenNow(item.startTime, item.endTime)
                    ? $t("innov.immediate")
                    : $t("innov.willStart")
                }}
              </button>
            </div>
          </div>
        </div>
      </template>
      <div class="no-data" v-else>
        <img class="dark-show" width="81px" height="120px" :src="imgMap.empty" />
        <img class="light-show" width="81px" height="120px" :src="imgMap.empty_1" />
        <p style="margin-top: 10px; color: var(--color-1)">
          <!-- 暂无数据 -->
          {{ $t("common.notData") }}
        </p>
      </div>
    </div>

    <ViewDetail
      v-if="viewDialogShow"
      :projectId="nowProjectId"
      :isShow="viewDialogShow"
      :close="closeDialog"
    />
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/innovation/list/list";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/innovation/list/list.styl";
import { isMobile } from "@/utils/newUtils";
import ViewDetail from "./view.vue";

export default {
  mixins: [mixin],
  components: {
    ViewDetail,
  },
  data() {
    return {
      // 响应式当前时间，用于驱动文案在时间边界自动更新
      nowTs: Date.now(),
      _nowTimer: null,
    };
  },
  mounted() {
    this.init();
    isMobile();
    this._nowTimer = setInterval(() => {
      this.nowTs = Date.now();
    }, 1000);
  },
  beforeDestroy() {
    if (this._nowTimer) {
      clearInterval(this._nowTimer);
      this._nowTimer = null;
    }
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    // 按开始时间倒序（最新在上）排序后的列表
    sortedDataList() {
      const list = Array.isArray(this.dataList) ? this.dataList.slice() : [];
      const toTs = (t) => {
        if (t === undefined || t === null) return -Infinity;
        const n = typeof t === "string" ? Number(t) : t;
        if (!Number.isNaN(n) && isFinite(n)) return n;
        const d = new Date(t).getTime();
        return Number.isNaN(d) ? -Infinity : d;
      };
      return list.sort((a, b) => toTs(b.startTime) - toTs(a.startTime));
    },
  },
  methods: {
    // 判断当前时间是否在 startTime 和 endTime 之间（含边界）
    isBetweenNow(startTime, endTime) {
      const now = this.nowTs;
      const toMs = (t) => {
        if (t === undefined || t === null) return NaN;
        // 数字或数字字符串
        const n = typeof t === "string" ? Number(t) : t;
        if (!isNaN(n) && isFinite(n)) {
          // 小于 1e12 认为是秒级时间戳，转换为毫秒
          return n < 1e12 ? n * 1000 : n;
        }
        // 非数字字符串，尝试 Date 解析
        const d = new Date(t).getTime();
        return isNaN(d) ? NaN : d;
      };
      const start = toMs(startTime);
      const end = toMs(endTime);
      if (isNaN(start) || isNaN(end)) return false;
      return now >= start && now <= end;
    },
    // submitDisabled(item) {
    //   if (item.status === 2) {
    //     return false;
    //   }
    //   return true;
    // },
    disabledClass(item) {
      if (item.status === 2) {
        return "s-white";
      }
      if (item.status === 3) {
        return "s-blue";
      }
      if (item.status === 4) {
        return "s-border";
      }
      if (item.status === 5) {
        return "s-green";
      }
      return "s-gray";
    },
    gotoTrade() {
      this.$router.push("/assets/flowingWater?id=4");
    },
    // submit(data) {
    //   this.$router.push(`/innovation/${data}`);
    // },
  },
};
</script>
<style scoped>
.m-page {
  font-style: normal;
  background: var(--color-BG);
  min-height: 1000px;
  padding-bottom: 60px;
}
.m-banner {
  height: 336px;
  position: relative;
}
.m-banner > .ct {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.m-banner > .ct .imgBg {
  width: 462px;
  height: 240px;
}
.m-banner > .ct .longTxt {
  width: 644px;
  color: var(--color-text-primary);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.m-banner > .ct > .btn {
  height: 58px;
  line-height: 58px;
  background: var(--mainColor);
  border-radius: 11px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 0 18px;
  cursor: pointer;
  user-select: none;
  margin-top: 16px;
  display: inline-block;
}
.m-tab {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  gap: 32px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-tab > .item {
  position: relative;
  cursor: pointer;
  user-select: none;
  color: var(--color-text-secondary);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 55px;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
}
.m-tab > .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 38px 100%
    no-repeat;
}
.m-tab > .item.active {
  color: var(--color-text-primary);
  font-weight: 600;
}
.m-tabBox {
  height: 55px;
  display: flex;
  align-items: center;
}
.m-tableBox > .head {
  height: 75px;
  display: flex;
  align-items: center;
}
.m-list {
  width: 1200px;
  padding-top: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  color: var(--color-text-primary);
  overflow: hidden;
}
.m-list > .item {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 210px;
  background: var(--color-BG-Light);
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-Toggle);
  gap: 10px;
}
.m-list > .item > .img {
  width: 136px;
  height: 136px;
  border-radius: 12px;
  flex-shrink: 0;
}
.m-list > .item > .info {
  box-sizing: border-box;
  height: 100%;
  flex: 1;
}
.m-list > .item > .info > .name > .img.h5 {
  display: none;
}
.m-list > .item > .info > .name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-primary);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}
.m-list > .item > .info > .name > .label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--color-tag-bg);
  color: var(--color-Icon);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}
.m-list > .item > .info > .name > .label.s-white {
  background: var(--color-Input-fill);
  color: var(--color-text-primary);
}
.m-list > .item > .info > .name > .label.s-border {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-text-primary);
}
.m-list > .item > .info > .name > .label.s-blue {
  background: var(--color-tag-bg);
  color: var(--color-Icon);
}
.m-list > .item > .info > .name > .label.s-green {
  background: var(--color-Positive-20);
  color: var(--color-Positive);
}
.m-list > .item > .info > .name > .label.s-gray {
  background: var(--color-Input-fill);
  color: var(--color-text-secondary);
}
.m-list > .item > .info > .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
}
.m-list > .item > .info > .time .start {
  color: var(--color-text-secondary);
}
.m-list > .item > .info > .time .value {
  color: var(--color-text-primary);
}
.m-progress {
  margin-block: 16px 18px;
  width: 100%;
}
.m-progress > .topInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
}
.m-progress > .topInfo > div:last-child {
  text-align: right;
}
.m-progress > .topInfo .coin,
.m-progress > .topInfo .percent {
  color: var(--color-text-primary);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.m-progress > .topInfo .percent {
  text-align: right;
}
.m-progress > .progressBar {
  width: 100%;
  height: 8px;
  border-radius: 100px;
  margin-top: 8px;
  position: relative;
  background: var(--color-Input-border);
}
.m-progress > .progressBar div {
  width: 100%;
  height: 8px;
  border-radius: 100px;
  background: var(--color-text-secondary);
}
.m-progress > .progressBar.pending div {
  background: rgba(106, 96, 255, 1);
}
.m-list > .item .btn {
  unset: all;
  min-width: 145px;
  height: 40px;
  padding-inline: 20px;
  border-radius: 100px;
  background: var(--color-BTN-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  color: var(--color-BTN-primary-text);
  text-align: center;
  cursor: pointer;
}
.m-list > .item .btn.active {
  background: var(--color-Input-border);
  color: var(--color-text-secondary);
}
</style>
<style lang="stylus" scoped>
html, body {
  min-height unset;
}
.isH5 {
  .m-page {
    min-height unset;
    padding 0 12px 50px;
    box-sizing border-box;
  }
  .m-banner,
  .my-btn{
    display:none;
  }
  .m-banner > .ct .longTxt {
    width 100%;
    text-align center;
    font-size 24px;
  }
  .m-banner > .ct .imgBg {
   width: 162px;
   height: auto;
  }
  .m-banner > .ct {
    width 100%;
  }

  .m-list {
    width 100%;
  }
  .m-list > .item {
    width 100%;
    padding: 16px;
    box-sizing border-box;
    height: auto;
  }
  .m-list > .item > .info {
    padding-left: 0;
    height auto;
  }
  .m-list > .item > .img {
    width 50px;
    height unset;
  }
  .m-list > .item > .info > .name {
    font-size 16px;
    justify-content:unset;
  }
  .m-list > .item  > .img.pc {
    display: none;
  }
  .m-list > .item > .info > .name > .img.h5 {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: block;
     float: left;
  }
    .m-list > .item > .info > .name > span {
      float: left;
     margin-left: 8px;
    }
   .m-list > .item > .info > .name > .label.s-border {
    float: right;
    margin-top: 0;
   }
  .m-list > .item > .btn {
    display none;
  }
  .m-progress {
    margin-top: 10px;
  }
  .m-progress > .topInfo {
    line-height: 1.6;
  }
  .m-progress > .progressBar::after {
    width 100%;
  }
  .m-tabBox {
    height auto;
  }
  .m-tab {
    width 100%;
    box-sizing border-box;
    flex-wrap wrap;
    gap 12px;
  }
  .m-tab > .item {
    font-size 12px;
    white-space nowrap;
    margin-right: 0;
    padding 0 10px;
  }
}
</style>
