<!--改， 2022.11.28 新增综合交易页面-->
<template>
  <div class="m-viewbody">
    <template v-for="(item, index) in klineList">
      <div class="item" v-if="item.symbolCurrent">
        <!-- 改，2022.12.05，使用iframe方案 -->
        <div class="item" @mouseenter="tabOne(index)">
          <iframe
            :src="`${linkUrl}/${lan}/trade/${item.symbolCurrent.replace('/', '_')}?type=showMore`"
            width="100%"
            height="550px"
            scrolling="no"
            style="border-width: 0;"
          ></iframe>
        </div>
      </div>
      <div class="item add" v-else>
        <div class="icon" @click.stop="updateShowMarket({index, isShow: item.isShowMarket})">
          <img :src="iconAdd">
        </div>
        <div class="select" @click.stop>
          <select-coin :currentItem="item" v-show="item.isShowMarket"></select-coin>
        </div>
      </div>
    </template>
    <!-- 改，2022.12.06 不显示，但是起到发起一个socket的作用，否则行情会没有数据 -->
    <k-line-chart
      :currentItem="myKLine"
      :symbolCurrent="myKLine.symbolCurrent"
      v-show="false"
    ></k-line-chart>
  </div>
</template>

<script>
import selectCoin from "@/components/selectCoin.vue";
import { imgMap } from '@/utils';
import worker from "@/utils/webWorker";
import { mapGetters, mapMutations } from "vuex";
import kLineChart from "./modules/kLineChart.vue";

export default {
  components: {
    kLineChart,
    selectCoin,
  },
  provide() {
    return {
      worker: this.worker,
    };
  },
  name: "more",
  data() {
    return {
      iconAdd: imgMap.icon_add,
      // 改，2022.12.06 写死一个币对，用于初始化一个socket
      myKLine: {
        marketCurrent: 'USDT', // 当前市场
        symbolCurrent: 'MATIC/USDT', // 当前币对
        lastTimeS: "",
        mySymbol: "",
        isShowMarket: false,
        kLineIndex: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["calKLineData", "calCurKLine"]),
    worker() {
      return worker();
    },
    klineList() {
      return Object.values(this.calKLineData);
    },
    // 改，2022.12.06 新增 linkUrl
    linkUrl() {
      if (process.env.NODE_ENV === "development") {
        return "http://localhost:8080/ex";
      }
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.exUrl;
      }
      return {};
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
  },
  mounted() {
    const vm = this;
    // 改，2022.12.06 监听iframe事件（将时间侦听放到最外层）
    window.addEventListener('message', (e) => {
      // 获取消息内容 data
      const { data } = e;
      if (data.type === 'linkTo') {
        if (data.data) {
          const link = vm.linkUrl ? `${vm.linkUrl}/${vm.lan}/trade/${data.data}` : "";
          window.open(link);
        }
      } else if (data.type === 'del') {
        vm.del(vm.calCurKLine);
      }
    });
  },
  methods: {
    ...mapMutations(["updateShowMarket", "updateCurKLine"]),
    // 删除
    del(index) {
      this.$store.commit("delKLine", index);
    },
    // 改，2022.12.05 获取当前操作项
    tabOne(index) {
      this.updateCurKLine({ index });
    },
  },
};
</script>

<style scoped>
.m-viewbody {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 18px 0;
  min-width: 1730px;
}
.m-viewbody > .item {
  width: 49%;
  min-width: 850px;
  margin-bottom: 10px;
  position: relative;
  height: 550px;
}
.m-viewbody > .item:nth-child(odd){
  margin-right: 10px;
}
.m-viewbody > .item.add {
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-viewbody > .item > .icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.36);
  cursor: pointer;
}
.m-viewbody > .item > .icon > img {
  width: 100%;
  height: 100%;
}
.m-viewbody > .item > .select {
  position: absolute;
  left: 60%;
  top: 25%;
}
/deep/.ex-canter-echart-box {
  height: 500px !important;
}
/deep/.trade-market-index-container.trade-market {
  width: 310px;
}
</style>
