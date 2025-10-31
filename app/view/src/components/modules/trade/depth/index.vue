<!-- 币币交易 盘口 -->
<template>
  <div class="trade-depth-block depath-index-container" :class="depthClass">
    <!-- 改，2022.10.19，注释，新增style -->
    <!-- :style="showGridFlag ? 'height: 830px;' : 'height: 815px;'" -->
    <div class="m-title" v-if="showTab === '0'">
      <div class="title">{{ $t("futures.depth.text1") }}</div>
    </div>
    <div v-if="showTab === '0'" class="depth" ref="depthBox" style="flex: 1">
      <div v-if="false" class="block-header a-3-bd b-2-cl">
        <span class="h4 b-1-cl">
          <!-- 盘口 -->
          {{ $t("trade.handicap") }}
        </span>
        <span
          class="title-tab a-12-bd"
          @click="switchBlock('D')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'D' }"
        >
          <!-- 盘口 -->
          {{ $t("trade.handicap") }}
        </span>
        <span
          class="title-tab title-new-tab a-12-bd"
          @click="switchBlock('T')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'T' }"
        >
          <!-- 实时成交 -->
          {{ $t("trade.latestDeal") }}
        </span>
      </div>

      <div class="block-header a-3-bd b-2-cl">
        <div class="layoutIcon-btn">
          <div
            class="layoutIcon"
            :class="{ active: depthType == 'center' }"
            @click="switchDepthType('center')"
          >
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.1543"
                y="1.23047"
                width="4.61539"
                height="6.15385"
                rx="0.265232"
                fill="#E35561"
              />
              <rect
                x="1.1543"
                y="8.61523"
                width="4.61539"
                height="6.15385"
                rx="0.265232"
                fill="#5DC787"
              />
              <rect
                x="13.8457"
                y="1.23047"
                width="2.46154"
                height="6.92308"
                rx="0.265232"
                transform="rotate(90 13.8457 1.23047)"
                fill="#868E9B"
              />
              <rect
                x="13.8457"
                y="4.92383"
                width="2.46154"
                height="6.92308"
                rx="0.265232"
                transform="rotate(90 13.8457 4.92383)"
                fill="#868E9B"
              />
              <rect
                x="13.8457"
                y="8.61523"
                width="2.46154"
                height="6.92308"
                rx="0.265232"
                transform="rotate(90 13.8457 8.61523)"
                fill="#868E9B"
              />
              <rect
                x="13.8457"
                y="12.3086"
                width="2.46154"
                height="6.92308"
                rx="0.265232"
                transform="rotate(90 13.8457 12.3086)"
                fill="#868E9B"
              />
            </svg>
          </div>
          <div
            class="layoutIcon"
            :class="{ active: depthType == 'sell' }"
            @click="switchDepthType('sell')"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.23047"
                y="1.23047"
                width="4.92308"
                height="13.5385"
                rx="0.256106"
                fill="#E35561"
              />
              <rect
                x="14.7695"
                y="1.23047"
                width="2.46154"
                height="7.38462"
                rx="0.256106"
                transform="rotate(90 14.7695 1.23047)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="4.92383"
                width="2.46154"
                height="7.38462"
                rx="0.256106"
                transform="rotate(90 14.7695 4.92383)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="8.61523"
                width="2.46154"
                height="7.38462"
                rx="0.256106"
                transform="rotate(90 14.7695 8.61523)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="12.3086"
                width="2.46154"
                height="7.38462"
                rx="0.256106"
                transform="rotate(90 14.7695 12.3086)"
                fill="#868E9B"
              />
            </svg>
          </div>
          <div
            class="layoutIcon"
            :class="{ active: depthType == 'buy' }"
            @click="switchDepthType('buy')"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.23047"
                y="1.23047"
                width="4.92308"
                height="13.5385"
                rx="0.246287"
                fill="#5DC787"
              />
              <rect
                x="14.7695"
                y="1.23047"
                width="2.46154"
                height="7.38462"
                rx="0.246287"
                transform="rotate(90 14.7695 1.23047)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="4.92383"
                width="2.46154"
                height="7.38462"
                rx="0.246287"
                transform="rotate(90 14.7695 4.92383)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="8.61523"
                width="2.46154"
                height="7.38462"
                rx="0.246287"
                transform="rotate(90 14.7695 8.61523)"
                fill="#868E9B"
              />
              <rect
                x="14.7695"
                y="12.3086"
                width="2.46154"
                height="7.38462"
                rx="0.246287"
                transform="rotate(90 14.7695 12.3086)"
                fill="#868E9B"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        :class="{ 'is-show': shrinksDdpthNewShow === 'D' }"
        class="block-content"
        style="width: 100%"
      >
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="sellLineNumber"
          :bodyHeight="sellHeight"
          :allData="dataList"
          :currentPrice="symbolsData.close.data"
        />
        <div class="current-price">
          <div class="price b-1-cl" :class="getShowEtf(symbolCurrent) ? 'etfPriceClass' : ''">
            <span
              class="sy-price"
              v-if="symbolsData.close.data !== '--'"
              :class="symbolsData.close.class"
            >
              {{ symbolsData.close.data }}
            </span>
            <span v-if="symbolsData.close.price !== '--'" class="otc-price b-2-cl">
              ≈ {{ symbolsData.close.price }}
            </span>
          </div>
          <div v-if="getShowEtf(symbolCurrent)" class="eftJz">
            <div class="eftJz-title">
              <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
                <use xlink:href="#icon-a_15"></use>
              </svg>
              {{ $t("etfAdd.jz") }}
            </div>
            <div class="eftJz-value b-1-cl">
              {{ etfPrice }}
            </div>
          </div>
          <div
            class="market-show a-4-bg b-1-cl"
            :style="depthType === 'sell' ? 'bottom: 40px' : 'top: 40px;'"
          >
            <div>{{ $t("etfAdd.jzText1") }}</div>
            <div>{{ $t("etfAdd.jzText2") }}</div>
          </div>
          <div class="depth-type">
            <span class="num b-1-cl">{{ deptValue }}</span>
            <span class="switch-type-btn b-2-cl b-1-bd">
              <i
                :class="{ noclick: currentdepthClass <= 0 }"
                @click="switchDepth(-1)"
                class="icon-switch icon-minus"
              >
                <svg class="icon icon-14 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-a_2"></use>
                </svg>
                <svg class="icon icon-14 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-a_2_1"></use>
                </svg>
              </i>
              <i
                :class="{
                  noclick: currentdepthClass >= depthOption.length - 1,
                }"
                @click="switchDepth(1)"
                class="icon-switch icon-add"
              >
                <svg class="icon icon-14 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-a_3"></use>
                </svg>
                <svg class="icon icon-14 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-a_3_1"></use>
                </svg>
              </i>
            </span>
          </div>
        </div>
        <tableList
          type="buy"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="buyLineNumber"
          :cellWidth="cellWidth"
          :bodyHeight="buyHeight"
          :allData="dataList"
          :currentPrice="symbolsData.close.data"
        />
      </div>
    </div>
    <!-- 实时成交 -->
    <div
      class="new-tradb"
      :class="{ 'is-show': shrinksDdpthNewShow === 'T' }"
      v-if="showTab === '1'"
    >
      <new-trade :moduleType="moduleType" :showGridFlag="showGridFlag" />
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/depath/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/depath/index/index.styl";
import { myStorage } from "@/components/BlockChain-ui-privatization/utils";
import tableList from "@/components/modules/trade/tableList/index.vue";
// 实时成交
import newTrade from "@/components/modules/trade/newTrade/index.vue";

export default {
  mixins: [mixin],
  components: {
    tableList,
    newTrade,
  },
  mounted() {
    this.init();
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
    showTab: {
      default: "1",
      type: String,
    },
  },
  data() {
    return {
      minHeight: 300,
      sellHeight: 300, // 卖盘 高度
      buyHeight: 300, // 买盘 高度
      maxHeeight: 735,
    };
  },
  watch: {
    showGridFlag(v) {
      // 改，2022.10.19，注释，新增
      // if (v) {
      //   this.buyHeight = 359;
      //   this.sellHeight = 359;
      //   this.sellLineNumber = 32;
      //   this.buyLineNumber = 32;
      // } else {
      //   this.buyHeight = 365;
      //   this.sellHeight = 365;
      //   this.sellLineNumber = 32;
      //   this.buyLineNumber = 32;
      // }
      // this.buyHeight = 365;
      // this.sellHeight = 365;
      // this.sellLineNumber = 32;
      // this.buyLineNumber = 32;
    },
  },
  methods: {
    init() {
      if (this.moduleType === "lever") {
        // // 改，2022.09.24，高度 416 -> 365; 840 -> 735
        // // 卖盘 高度
        // this.sellHeight = 365;
        // // 买盘 高度
        // this.buyHeight = 365;
        // // 显示条数
        // this.sellLineNumber = 26;
        // this.buyLineNumber = 26;
        // this.maxHeeight = 735;
        // 当前选中的货币对
        this.symbolCurrent = myStorage.get("leverSymbolName");
      }

      this.setBoxHeight();
      // 监听 深度数据
      this.$bus.$on("DEPTH_DATA", (data) => {
        if (data && this.symbolCurrent === data.symbol) {
          this.dataList = JSON.parse(JSON.stringify(data));
        } else {
          this.dataList = {
            asksData: [],
            buyData: [],
            depthMaxNumber: null,
          };
        }
      });
      // 监听 市场（最新价格） 数据
      this.$bus.$on("MARKET_DATA", (data) => {
        this.marketData = JSON.parse(JSON.stringify(data));
      });
      // 获取 当前选中的货币对
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        this.dataList = {
          asksData: [],
          buyData: [],
          depthMaxNumber: null,
        };
        this.symbolCurrent = val;
        this.currentdepthClass = 0;
      });
      // 监听 浏览器窗口大小改变
      this.$bus.$on("WINFOW_ON_RESIIZE", () => {
        // 设置国际版TV的高度
        if (document.body.clientWidth < 961) {
          this.sellHeight = 100;
          this.buyHeight = 100;
          this.sellLineNumber = 5;
          this.buyLineNumber = 5;
        } else if (this.moduleType === "lever") {
          // 改，2022.09.24，高度 416 -> 365
          this.sellHeight = 365;
          this.buyHeight = 365;
          this.sellLineNumber = 26;
          this.buyLineNumber = 26;
        } else {
          // this.buyHeight = 365;
          // if (this.showGridFlag) {
          //   this.buyHeight = 418;
          // }
          // this.sellHeight = 365;
          // this.sellLineNumber = 24;
          // this.buyLineNumber = 24;
        }
        this.setBoxHeight(false);
      });
    },
  },
};
</script>

<style>
.trade-table-list-container .tbody {
  /* padding: 0; */
}
.depath-index-container .depth {
  height: 815px;
  /*padding-left: 16px;*/
}
.newTrade-index-container .newTrade-tbody {
  height: 745px;
}
.depath-index-container .current-price {
  /*border-top: 1px solid rgba(255, 255, 255, 0.08);*/
  /*border-bottom: 1px solid rgba(255, 255, 255, 0.08);*/
}
</style>

<style scoped>
.depath-index-container .block-header {
  padding: 0 !important;
}

.Chainer .trade-shrinks .depath-index-container .switch-btn {
  display: block !important;
}
.Chainer .trade-shrinks .depath-index-container .new-tradb {
  transform: translate(0px, 0px);
  padding-bottom: 12px;
}

@media screen and (max-width: 1820px) {
  .Chainer .depath-index-container .new-tradb {
    position: static !important;
  }
}

.new-tradb {
  height: calc(100% - 12px);
  border-radius: 0;
}

.trade-depth-block.depath-index-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--trade-color-1);
  border-radius: 8px;
}

.switch-btn > .dtIcon svg {
  fill-opacity: 0.5;
}
.switch-btn > .dtIcon.active svg {
  fill-opacity: unset;
}
.layoutIcon-btn {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 12px;
}
.layoutIcon-btn > .layoutIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 26px;
  cursor: pointer;
  border-radius: 100px;
}
.layoutIcon-btn > .layoutIcon.active {
  background-color: var(--color-Input-fill);
}
.layoutIcon-btn > .layoutIcon > svg > rect {
  fill-opacity: 0.5;
}
.layoutIcon-btn > .layoutIcon.active > svg > rect {
  fill-opacity: 1;
}
.depath-index-container .current-price .price .otc-price {
}
.depath-index-container .current-price .price .sy-price {
  color: var(--color-1);
}
.m-title {
  height: 44px;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-title .title {
  height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-left: 20px;
  line-height: 44px;
  position: relative;
  display: inline-block;
}

.m-title .title::before {
  content: "";
  width: 22px;
  height: 2px;
  background: var(--color-text-primary);
  position: absolute;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
}
</style>
