<template>
  <div class="m-pool">
    <div class="head">
      <div class="title" @click="navTo(-1)">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="28" height="28" rx="3" stroke="#989898" stroke-width="2"/>
          <path d="M18.4829 8.03418L11.5168 15.0006L18.4829 21.9667" stroke="#989898" stroke-width="2"/>
        </svg>

        ORX Mining
      </div>
      <img :src="imgMap.mining_img" >
    </div>
    <div class="body">
      <div class="wrap">
        <div class="tabBox">
          <div class="tab" :class="{active: tabIndex === 1}" @click="changeTab(1)">ORX Mining</div>
          <div class="tab" :class="{active: tabIndex === 2}" @click="changeTab(2)">My commission</div>
          <div class="tab" :class="{active: tabIndex === 3}" @click="changeTab(3)">Commission Detail</div>
        </div>
      </div>
      <div class="pool" v-if="tabIndex == 1">
        <div class="item">
          <div class="tit">ORX Burning Pool</div>
          <div class="num">{{ formatPrice(flowData.burnPoolOrx) }}</div>
        </div>
        <div class="item">
          <div class="tit">OUDT Minting Pool</div>
          <div class="num">{{ formatPrice(flowData.mintOudt) }}</div>
        </div>
        <div class="item">
          <div class="tit">Total Hashrate</div>
          <div class="num">{{ formatPrice(flowData.totalHashRate) }}</div>
        </div>
        <div class="item">
          <div class="tit">My Hashrate</div>
          <div class="num">{{ formatPrice2(flowData.myHashRate) }}</div>
        </div>
        <div class="item">
          <div class="tit">Per HashRate Earn/D</div>
          <div class="num">{{ formatPrice2(flowData.perHash) }}</div>
        </div>
        <div class="item">
          <div class="tit">Today`s Earn <div class="link" @click="navTo('/earnDetail')">detail > </div></div>
          <div class="num">{{ formatPrice2(flowData.todayEarn) }}</div>
        </div>
        <div class="item">
          <div class="tit">Total Mining</div>
          <div class="num">{{ formatPrice2(flowData.totalMini) }}</div>
        </div>
        <div class="item">
          <div class="tit">Rest Mine Days</div>
          <div class="num">{{ flowData.restDays }}</div>
        </div>
      </div>
      <div class="pool" v-if="tabIndex == 2">
        <div class="item">
          <div class="tit">Number of Invitee</div>
          <div class="num">{{ commissionInfo.inviters }}</div>
        </div>
        <div class="item">
          <div class="tit">Today's Commission</div>
          <div class="num">{{ commissionInfo.todayCommission }}</div>
        </div>
        <div class="item">
          <div class="tit">Total Commission</div>
          <div class="num">{{ commissionInfo.totalCommission}}</div>
        </div>
        <div class="item">
          <div class="tit">Turnover of Directly Promoted User.</div>
          <div class="num">{{ commissionInfo.turnOverOfInvite }}</div>
        </div>
      </div>
      <div class="pool2" v-if="tabIndex == 3">
        <div class="item" v-for="item in rebaseDescInfo">
          <div class="top">
            <div>Time: {{ calLocalDate(item.rebateTime) }}</div>
            <div>Direct Promote UID: {{ item.orderUid }}</div>
          </div>
          <div class="bottom">
            <div class="info">
              <div class="txt">Turnover</div>
              <div class="num">{{ item.orderAmount }} OUDT</div>
            </div>
            <div class="info">
              <div class="txt">Commission</div>
              <div class="num">{{ item.rebateAmount }} OUDT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgMap } from "@/utils";
import { cutOut } from "@/utils/newUtils";

export default {
  name: "burningPool",
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
    };
  },
  mounted() {
    if (this.userInfo) {
      this.getFlowList();
    }
    // this.getRebateDesc();
    // this.getCommission();
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
        if (price === undefined) {
          return "-";
        }
        return priceStr;
      };
    },
    formatPrice2() {
      return (price) => {
        let priceStr = +price;
        priceStr = cutOut(price, 4);
        if (isNaN(priceStr)) {
          return "-";
        }
        return priceStr;
      };
    },

  },
  watch: {
    userInfo(val, oval) {
      if (val) {
        this.getFlowList();
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
    changeTab(tab) {
      this.tabIndex = tab;
      if (tab === 1) {
        this.getFlowList();
      } else if (tab === 2) {
        this.getCommission();
      } else if (tab === 3) {
        this.getRebateDesc();
      }
    },
    getFlowList() {
      const { id } = this.userInfo;
      this.axios({
        fullUrl: `${this.opUrl}/flow/rebate?uid=${id}`,
        method: 'get',
      })
        .then((res) => {
          this.flowData = res.data;
        });
    },
    async getRebateDesc() {
      const { id } = this.userInfo;
      const res = await this.axios({
        url: `${this.opUrl}/flow/rebate_desc?uid=${id}`,
        hostType: "def",
        method: "get",
      });
      if (res.code === "0") {
        this.rebaseDescInfo = res.data;
      }
    },

    async getCommission() {
      const { id } = this.userInfo;
      const res = await this.axios({
        url: `${this.opUrl}/flow/commission?uid=${id}`,
        hostType: "def",
        method: "get",
      });
      if (res.code === "0") {
        this.commissionInfo = res.data;
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
}
.m-pool > .head > .title svg {
  cursor: pointer;
  user-select: none;
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
.m-pool > .body > .wrap {
  width: 940px;
  margin: auto;
  padding-top: 36px;
  box-sizing: border-box;
  display: flex;
}

.m-pool > .body > .wrap > .tabBox {
  display: flex;
  align-items: center;
  height: 44px;
  background: var(--bur-color-3);
  color: var(--bur-color-4);
  border-radius: 6px;
  font-size: 17px;
}
.m-pool > .body > .wrap > .tabBox > .tab {
  box-sizing: border-box;
  height: 44px;
  padding: 0 24px;
  text-align: center;
  line-height: 44px;
  border-radius: 6px;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
}
.m-pool > .body > .wrap > .tabBox > .tab.active {
  background: rgba(16, 88, 222, 1);
  color: #FFFFFF;
}
.m-pool > .body > .pool {
  width: 940px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin: 30px auto auto;
}
.m-pool > .body > .pool > .item {
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
  color: #FFFFFF;
  background: rgba(22, 38, 71, 1);
  border-radius: 4px;
  width: 217px;
  height: 156px;
}
.m-pool > .body > .pool > .item > .tit {
  font-size: 15px;
  line-height: 1.4;
  display: flex;
  align-items: center;
}
.m-pool > .body > .pool > .item > .tit > .link {
  font-size: 16px;
  color: #1058DE;
  margin-left: 6px;
  cursor: pointer;
  user-select: none;
}
.m-pool > .body > .pool > .item > .num {
  font-size: 18px;
  margin-top: 40px;
}

.m-pool > .body > .pool2 {
  width: 940px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin: 30px auto auto;
}
.m-pool > .body > .pool2 > .item {
  box-sizing: border-box;
  padding: 16px;
  width: 458px;
  height: 120px;
  border-radius: 8px;
  background: #242424;
}
.m-pool > .body > .pool2 > .item .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFFFFF;
  font-size: 13px;
}
.m-pool > .body > .pool2 > .item .bottom {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.6;
}
.m-pool > .body > .pool2 > .item .bottom .info .txt {
  font-size: 13px;
  color: #666666;
}
.m-pool > .body > .pool2 > .item .bottom .info .num {
  font-size: 16px;
  color: #FFFFFF;
  font-weight: 600;
}
</style>
