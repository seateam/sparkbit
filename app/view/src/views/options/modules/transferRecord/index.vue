<template>
  <div class="m-pool">
    <div class="head">
      <div class="title" @click="navTo(-1)">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="28" height="28" rx="3" stroke="#989898" stroke-width="2"/>
          <path d="M18.4829 8.03418L11.5168 15.0006L18.4829 21.9667" stroke="#989898" stroke-width="2"/>
        </svg>
        <div>OUDT Options Transfer Record</div>
      </div>
      <img :src="imgMap.mining_img" >
    </div>
    <div class="body">
      <div class="table">
        <div class="tr th">
          <div class="td">Time</div>
          <div class="td">Direction</div>
          <div class="td right">Amount</div>
        </div>
        <div class="tr" v-if="detailList.length" v-for="item in detailList">
          <div class="td">{{ item.timeStr }}</div>
          <div class="td">{{ item.desc }}</div>
          <div class="td right">{{ item.balance }}</div>
        </div>
        <div class="noData" v-else>no Data</div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgMap } from "@/utils";
import { convertToLocaleTimeStamp } from "@/views/options/modules/tool";
import { cutOut } from "@/utils/newUtils";

export default {
  name: "transferRecord",
  data() {
    return {
      imgMap: {
        mining_img: imgMap.mining_img,
      },
      tabIndex: 1,
      list1: [],
      flowData: {},
      rebaseDescInfo: [],
      commissionInfo: {},
      detailList: [],
    };
  },
  mounted() {
    if (this.userInfo) {
      this.getMintDetail();
    }
  },
  computed: {
    opUrl() {
      return this.$store.state.systemConfig.opUrl;
    },
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    calLocalDate() {
      return (str) => {
        const date = new Date(str);
        return date.toLocaleString();
      };
    },
    formatPrice() {
      return (price) => {
        let priceStr = +price;
        const fix = 5;
        if (priceStr >= 1000000000 || priceStr <= -1000000000) {
          // 将价格除以十亿，并保留一位小数
          priceStr = `${(priceStr / 1000000000).toFixed(fix)}B`;
        } else if (priceStr >= 1000000 || priceStr <= -1000000) {
          // 将价格除以百万，并保留一位小数
          priceStr = `${(priceStr / 1000000).toFixed(fix)}M`;
        } else if (priceStr >= 1000 || priceStr <= -1000) {
          // 将价格除以千，并保留一位小数
          priceStr = `${(priceStr / 1000).toFixed(fix)}K`;
        }
        // 返回格式化后的价格字符串
        return priceStr;
      };
    },
  },
  watch: {
    userInfo(val, oval) {
      if (val) {
        this.getMintDetail();
      }
    },
  },
  methods: {
    navTo(path) {
      if (path === -1) {
        history.go(-1);
      } else {
        this.$router.push(path);
      }
    },
    async getMintDetail() {
      const { id } = this.userInfo;
      // ${id}
      const res = await this.axios({
        url: `${this.opUrl}/transfer/flow?uid=${id}`,
        // url: `http://192.168.1.11:8237/transfer/flow?uid=34105`,
        hostType: "def",
        method: "get",
      });
      if (res.code == "0") {
        const list = res.data;
        this.detailList = list.map((item) => {
          item.timeStr = convertToLocaleTimeStamp(item.ctime);
          item.timeStr = new Date(item.timeStr).toLocaleString();
          item.desc = item.type === "100" ? "To Options" : "To Spot";
          item.balance = cutOut(item.balance, 4);
          return item;
        });
      }
    },

  },
};
</script>

<style scoped>
.dark .m-pool {
  --bur-color-1: #0C0E11;
  --bur-color-2: #181A1F;
  --bur-color-3: #242424;
  --bur-color-4: rgba(255, 255, 255, 0.6);
}
.light .m-pool {
  --bur-color-1: #EEEEEE;
  --bur-color-2: #FFFFFF;
  --bur-color-3: #F3F3F3;
  --bur-color-4: #000000;
}
.m-pool {
  width: 100%;
  background: var(--bur-color-1);
}
.m-pool > .head {
  width: 940px;
  height: 140px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-pool > .head > .title {
  font-size: 32px;
  color: var(--color-1);
  display: flex;
  align-items: center;
}
.m-pool > .head > .title svg {
  cursor: pointer;
  user-select: none;
  margin-right: 20px;
}

.m-pool > .head > img {
  width: 140px;
  height: 140px;
}
.m-pool > .body {
  width: 100%;
  background: var(--bur-color-2);
  min-height: 660px;
}
.m-pool > .body > .table {
  width: 940px;
  margin: auto;
  padding-top: 25px;
}
.m-pool > .body > .table > .tr {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: var(--color-1);
  font-size: 14px;
}
.m-pool > .body > .table > .tr.th {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
  color: #666666;
  border-bottom: 1px solid #2E2E2E;
}
.m-pool > .body > .table > .tr .td.right {
  text-align: right;
}

.m-pool > .body > .table > .tr .td {
  width: 50%;
}
.m-pool > .body > .table > .noData {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

</style>
