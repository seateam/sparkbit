<template>
  <div class="m-tool">
    <!--<div style="display: none;">{{symbolList}}</div>-->
    <div class="wrap">
      <div class="item">
        <img :src="imgMap.icon_1" class="icon" />
        <span class="txt" style="color: #0ecb81">Stable connection</span>
      </div>
      <div
        v-if="index < 3"
        v-for="(item, index) in headerSymbol"
        @click="navToTrading(item)"
        class="item"
        style="cursor: pointer"
      >
        <img :src="imgMap.icon_2" class="icon" />
        <!-- <div style="position: fixed; top: 400px; left: 10px; width: 1200px">
          {{ JSON.stringify(headerSymbol) }}
        </div> -->
        <!-- <div style="position: fixed; top: 400px; left: 10px; width: 1200px">
          {{ JSON.stringify(marketDataObj) }}
        </div> -->
        <template v-if="marketDataObj && marketDataObj[item]">
          <span class="name">{{ marketDataObj[item].name }}</span>
          <div class="percent" :class="marketDataObj[item].rose.class">
            {{ marketDataObj[item].roses }}
          </div>
          <div class="num">{{ marketDataObj[item].closes }}</div>
        </template>
        <template v-else>
          <span class="name">{{ item }}</span>
          <div class="percent">--</div>
          <div class="num">--</div>
        </template>
      </div>
    </div>
    <div class="wrap">
      <div @click="linkTo('/mesage')" class="item announcements btn">
        <img :src="imgMap.icon_3" class="icon" />
        <span class="txt2">Announcements</span>
      </div>
      <!--<div class="item cookie btn">-->
      <!--  <img :src="imgMap.icon_4" class="icon2">-->
      <!--  <span>Cookie Preferences</span>-->
      <!--</div>-->
      <div @click="linkTo('/appDownload')" class="item download btn">
        <img :src="imgMap.icon_5" class="icon2" />
        <span>Download</span>
      </div>
      <div @click="linkTo('/questions/init')" class="item online btn">
        <img :src="imgMap.icon_5" class="icon2" />
        <span>Online Support</span>
      </div>
    </div>
  </div>
</template>

<script>
import { imgMap, myStorage } from "@/utils";
import worker from "@/utils/webWorker";

export default {
  name: "bottomTool",
  data() {
    return {
      imgMap,
      // 24小时行情WS数据
      marketDataObj: null,
      MyWebSocket: null,
      symbolCurrent: myStorage.get("sSymbolName"),
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // this.webSocketSend("Market", "unsub", this.symbolCurrent, this.symbolList);
    this.$bus.$off("MARKET_DATA");
  },
  computed: {
    // 推荐位 币对
    headerSymbol() {
      return this.$store.state.baseData.market.headerSymbol || [];
    },
    // WS worker
    worker() {
      // return worker();
    },
    // 全部 货币对
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    // 当前币对列表
    symbolList() {
      const marketList = {};
      const { headerSymbol } = this;
      const { symbolAll } = this;
      for (const key in symbolAll) {
        if (headerSymbol.includes(key)) {
          marketList[key] = symbolAll[key];
        }
      }
      return marketList;
    },
  },
  watch: {
    // 监听 webSocket 创建成功
    MyWebSocket(val) {
      if (val) {
        // 发送 24小时行情实时数据 Send
        this.webSocketSend("Market", "sub", this.symbolCurrent, this.symbolList);
      }
    },
  },
  methods: {
    navToTrading(item) {
      if (this.$route.name === "trade") {
        this.$bus.$emit("ON_SYMBOL_SWITCH", item);
        return;
      }
      const symbol = item ? item.replace("/", "_") : "";
      this.$router.push(`/trade/${symbol}`);
    },
    // 初始化
    init() {
      // 接收24小时行情数据
      this.$bus.$on("MARKET_DATA", (data) => {
        this.marketDataObj = data;
      });
      // this.onmessageWorker();
    },
    // socket事件侦听
    onmessageWorker() {
      this.worker.onmessage = (event) => {
        const { data } = event;
        // 监听 WebSocket 链接成功
        if (data.type === "WEBSOCKET_ON_OPEN") {
          this.MyWebSocket = data.data.type;
        }
        // 监听 WS 数据
        if (data.type === "WEBSOCKET_DATA") {
          this.listenWSData(data.data);
        }
      };
    },
    // 发送 Send
    webSocketSend(type, sendType, symbolData, symbolList) {
      this.worker.postMessage({
        type: "WEBSOCKET_SEND",
        data: {
          type,
          sendType,
          symbolData,
          symbolList,
        },
      });
    },
    linkTo(path) {
      this.$router.push(path);
    },
    listenWSData(data) {
      const { type, WsData } = data;
      // 24小时行情数据
      if (type === "MARKET_DATA") {
        this.marketDataObj = WsData;
      }
    },
  },
};
</script>

<style scoped>
.m-tool {
  min-width: 1500px;
  width: 100%;
  height: 33px;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: #171a1e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  z-index: 99;
  box-sizing: border-box;
  padding: 0 40px;
}

.m-tool > .wrap {
  display: flex;
  align-items: center;
}

.m-tool > .wrap > .item {
  font-style: normal;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 12px;
}

.m-tool > .wrap > .item:not(:last-child)::after {
  content: "";
  width: 1px;
  height: 10px;
  background: #474d57;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.m-tool > .wrap > .item:nth-child(1) {
  width: 180px;
}

.m-tool > .wrap > .item > .txt {
  font-weight: 400;
  font-size: 12px;
}

.m-tool > .wrap > .item > .icon {
  margin-right: 11px;
}

.m-tool > .wrap > .item > .name {
  font-size: 11px;
  color: #b7bdc6;
}

.m-tool > .wrap > .item > .percent {
  font-size: 11px;
  box-sizing: border-box;
  padding: 0 8px;
}

.m-tool > .wrap > .item > .num {
  font-size: 11px;
  color: #848e9c;
  margin-right: 12px;
}

.m-tool > .wrap > .item.btn {
  cursor: pointer;
  user-select: none;
}

.m-tool .announcements {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #b7bdc6;
}

.m-tool .announcements > .icon {
  padding: 0 6px;
  margin: 0;
}

.m-tool .announcements > .txt2 {
  margin-right: 16px;
}

.m-tool .download {
  width: 110px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #b7bdc6;
}

.m-tool .online {
  width: 136px;
  font-weight: 400;
  font-size: 12px;
  color: #b7bdc6;
}

.m-tool > .wrap > .item > .icon2 {
  margin-right: 12px;
}
</style>
