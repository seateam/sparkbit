<template>
  <div class="m-orxBurning">
    <div class="head">
      <div class="title">ORX Burning</div>
      <img :src="imgMap.burning_img" />
    </div>
    <div class="body">
      <div class="formBox">
        <div class="form">
          <div class="m-formItem">
            <div class="top">
              <div class="left">Burning</div>
              <div class="right">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4424_5633)">
                    <path
                      d="M14.8191 13.6785C14.9324 13.6005 15.0316 13.5037 15.1123 13.3923V13.6785H14.8191ZM0.888672 13.6785V13.403C0.96724 13.5103 1.06343 13.6035 1.17315 13.6785H0.888672ZM0.888672 2.31934H1.16565C1.05913 2.39428 0.965567 2.48614 0.888672 2.59126V2.31934ZM15.1123 2.58898C15.0362 2.48481 14.9436 2.39373 14.8381 2.31934L15.1123 2.31934V2.58898ZM1.84115 13.6587C1.332 13.6587 0.914415 13.2569 0.889161 12.7433V3.24933C0.899842 3.00374 1.00471 2.7717 1.18199 2.6014C1.35927 2.4311 1.59533 2.33563 1.84115 2.33481H14.1636C14.289 2.33506 14.4132 2.36021 14.5288 2.40879C14.6445 2.45738 14.7493 2.52845 14.8373 2.61786C14.9253 2.70728 14.9947 2.81328 15.0414 2.9297C15.0881 3.04612 15.1112 3.17066 15.1094 3.29609V12.6954C15.1094 13.2264 14.6812 13.6585 14.1548 13.6585L1.84115 13.6587ZM1.66568 12.8359H14.3303V10.4708H10.1611C8.73173 10.4708 7.5689 9.31581 7.5689 7.89654C7.5689 6.48167 8.73173 5.33058 10.1611 5.33058H14.3303V3.13105H1.66552L1.66568 12.8359ZM10.1523 6.13496C9.69467 6.135 9.2558 6.31681 8.93222 6.64042C8.60864 6.96402 8.42686 7.40291 8.42686 7.86054C8.42686 8.31816 8.60864 8.75705 8.93222 9.08065C9.2558 9.40426 9.69467 9.58607 10.1523 9.58611H14.2952V6.13496H10.1523Z"
                      fill="#999999"
                      stroke="#999999"
                      stroke-width="0.444444"
                    />
                    <path
                      d="M10.1527 8.55351C10.0159 8.55351 9.88214 8.51293 9.76838 8.43691C9.65461 8.36089 9.56594 8.25284 9.51358 8.12642C9.46123 8 9.44754 7.86089 9.47424 7.72669C9.50095 7.59249 9.56685 7.46923 9.66362 7.37249C9.76038 7.27574 9.88366 7.20987 10.0179 7.1832C10.1521 7.15652 10.2912 7.17024 10.4176 7.22263C10.544 7.27501 10.652 7.36371 10.728 7.47749C10.804 7.59128 10.8446 7.72505 10.8445 7.86188C10.8443 8.04527 10.7714 8.22109 10.6417 8.35076C10.512 8.48042 10.3361 8.55334 10.1527 8.55351Z"
                      fill="#999999"
                      stroke="#999999"
                      stroke-width="0.444444"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4424_5633">
                      <rect
                        width="14.2222"
                        height="14.2222"
                        fill="white"
                        transform="translate(0.888672 0.888672)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span class="txt1">{{ sideData.from.balance }}</span>
                <span class="txt2" @click="inputMax">MAX</span>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <img :src="sideData.from.icon" class="icon2" />
                <div class="name">{{ sideData.from.coin }}</div>
              </div>
              <div class="right">
                <input type="number" v-model="toValue" />
              </div>
            </div>
          </div>
          <div class="icon2" @click="changeSide">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="39.5"
                width="39"
                height="39"
                rx="19.5"
                transform="rotate(-90 0.5 39.5)"
                fill="#242424"
              />
              <rect
                x="0.5"
                y="39.5"
                width="39"
                height="39"
                rx="19.5"
                transform="rotate(-90 0.5 39.5)"
                stroke="#32363F"
              />
              <path
                d="M27.519 22.1406C27.7265 22.1303 27.932 22.1857 28.1062 22.299C28.3649 22.4644 28.5388 22.7323 28.6104 23.0295C28.6856 23.3341 28.6479 23.6556 28.5043 23.9345L25.2808 28.0078C24.9836 28.5814 24.3248 28.7786 23.8095 28.4488C23.2941 28.119 23.1162 27.3869 23.4124 26.8133L25.239 24.5048L12.5992 24.5275C12.2861 24.528 11.9857 24.4042 11.764 24.1832C11.5422 23.9622 11.4173 23.6621 11.4168 23.349C11.4162 23.0359 11.54 22.7354 11.761 22.5136C11.9819 22.2918 12.2819 22.1668 12.595 22.1663L27.4651 22.1397L27.519 22.1406ZM12.5312 17.8576C12.3237 17.868 12.1182 17.8125 11.944 17.6993C11.6878 17.5302 11.5071 17.2683 11.4398 16.9688C11.3646 16.6642 11.4023 16.3427 11.5459 16.0637L14.7704 11.9905C15.0666 11.4169 15.7254 11.2197 16.2407 11.5495C16.7561 11.8792 16.934 12.6114 16.6378 13.185L14.8112 15.4934L27.4521 15.4708C27.6071 15.4705 27.7606 15.5008 27.904 15.5599C28.0473 15.619 28.1775 15.7057 28.2873 15.8151C28.3971 15.9245 28.4843 16.0545 28.5439 16.1977C28.6035 16.3408 28.6343 16.4943 28.6345 16.6493C28.6348 16.8043 28.6046 16.9579 28.5455 17.1013C28.4864 17.2446 28.3997 17.3749 28.2903 17.4847C28.1809 17.5945 28.051 17.6817 27.9079 17.7413C27.7648 17.8009 27.6113 17.8317 27.4563 17.832L12.5862 17.8586L12.5312 17.8576Z"
                fill="#0D5EAF"
              />
            </svg>
          </div>
          <div class="m-formItem">
            <div class="top">
              <div class="left">Minting</div>
              <div class="right">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4424_5633)">
                    <path
                      d="M14.8191 13.6785C14.9324 13.6005 15.0316 13.5037 15.1123 13.3923V13.6785H14.8191ZM0.888672 13.6785V13.403C0.96724 13.5103 1.06343 13.6035 1.17315 13.6785H0.888672ZM0.888672 2.31934H1.16565C1.05913 2.39428 0.965567 2.48614 0.888672 2.59126V2.31934ZM15.1123 2.58898C15.0362 2.48481 14.9436 2.39373 14.8381 2.31934L15.1123 2.31934V2.58898ZM1.84115 13.6587C1.332 13.6587 0.914415 13.2569 0.889161 12.7433V3.24933C0.899842 3.00374 1.00471 2.7717 1.18199 2.6014C1.35927 2.4311 1.59533 2.33563 1.84115 2.33481H14.1636C14.289 2.33506 14.4132 2.36021 14.5288 2.40879C14.6445 2.45738 14.7493 2.52845 14.8373 2.61786C14.9253 2.70728 14.9947 2.81328 15.0414 2.9297C15.0881 3.04612 15.1112 3.17066 15.1094 3.29609V12.6954C15.1094 13.2264 14.6812 13.6585 14.1548 13.6585L1.84115 13.6587ZM1.66568 12.8359H14.3303V10.4708H10.1611C8.73173 10.4708 7.5689 9.31581 7.5689 7.89654C7.5689 6.48167 8.73173 5.33058 10.1611 5.33058H14.3303V3.13105H1.66552L1.66568 12.8359ZM10.1523 6.13496C9.69467 6.135 9.2558 6.31681 8.93222 6.64042C8.60864 6.96402 8.42686 7.40291 8.42686 7.86054C8.42686 8.31816 8.60864 8.75705 8.93222 9.08065C9.2558 9.40426 9.69467 9.58607 10.1523 9.58611H14.2952V6.13496H10.1523Z"
                      fill="#999999"
                      stroke="#999999"
                      stroke-width="0.444444"
                    />
                    <path
                      d="M10.1527 8.55351C10.0159 8.55351 9.88214 8.51293 9.76838 8.43691C9.65461 8.36089 9.56594 8.25284 9.51358 8.12642C9.46123 8 9.44754 7.86089 9.47424 7.72669C9.50095 7.59249 9.56685 7.46923 9.66362 7.37249C9.76038 7.27574 9.88366 7.20987 10.0179 7.1832C10.1521 7.15652 10.2912 7.17024 10.4176 7.22263C10.544 7.27501 10.652 7.36371 10.728 7.47749C10.804 7.59128 10.8446 7.72505 10.8445 7.86188C10.8443 8.04527 10.7714 8.22109 10.6417 8.35076C10.512 8.48042 10.3361 8.55334 10.1527 8.55351Z"
                      fill="#999999"
                      stroke="#999999"
                      stroke-width="0.444444"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4424_5633">
                      <rect
                        width="14.2222"
                        height="14.2222"
                        fill="white"
                        transform="translate(0.888672 0.888672)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span class="txt1">{{ sideData.to.balance }}</span>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <img :src="sideData.to.icon" alt="" class="icon2" />
                <div class="name">{{ sideData.to.coin }}</div>
              </div>
              <div class="right">{{ calToVal }}</div>
            </div>
          </div>
        </div>
        <div class="tips">
          *Due to market price fluctuations, there may be some slippage for what you receive.
        </div>
        <div class="btn" @click="createOrder">Burning and Minting</div>
      </div>
      <i v-if="baseInfo"></i>

      <div class="m-table">
        <div class="title">ORX Burning History</div>
        <c-table
          :imgMap="imgMap"
          :loading="tabelLoading"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="tabelList"
          @elementClick="tableClick"
          :subContent="subContent"
          :subColumns="subColumns"
          :subContentId="subContentId"
          :subLoading="subLoading"
        />
        <c-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total="paginationObj.total"
          :display="paginationObj.display"
          :currentPage="paginationObj.currentPage"
          @pagechange="pagechange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fixD, imgMap, colorMap, formatTime } from "@/utils";
import createSocket from "@/views/options/modules/createSocket";
import { cutOut } from "@/utils/newUtils";

export default {
  name: "orxBurning",
  mixins: [createSocket],
  data() {
    return {
      imgMap: {
        burning_img: imgMap.burning_img,
      },
      colorMap,
      side: 1, // 方向
      toValue: 0,
      dataList: {},
      lock: false,
      paginationObj: {
        total: 0, // 数据总条数
        display: 10, // 每页显示条数
        currentPage: 1, // 当前页码
      },
      tabelList: [],
      tabelLoading: false,
      subContent: [], // 展开的数据
      subColumns: [], // 展开的表头
      subContentId: 0, // 展开的id
      subLoading: false, // 展开的loading
      columns: [
        // 时间
        {
          title: "Time",
          width: "120px",
        },
        // 币对
        {
          title: "Burning",
          width: "70px",
        },
        // 类别
        {
          title: "Minting",
          width: "70px",
        },
      ],
    };
  },
  mounted() {
    this.$bus.$on("MARKET_DATA", (data) => {
      this.dataList = data;
    });
    this.getHisData();
  },
  computed: {
    // 是否Login
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    symbolAll() {
      return this.$store.state.baseData.symbolAll;
    },
    allCoinMap() {
      if (this.exchangeData) {
        return this.exchangeData.allCoinMap;
      }
      return {};
    },
    // 币币资产
    exchangeData() {
      if (this.$store.state.assets.exchangeData) {
        return this.$store.state.assets.exchangeData;
      }
      return null;
    },
    sideData() {
      const { side } = this;
      const coinList = this.coinList || {};
      const allCoinMap = this.allCoinMap || {};
      if (side == 1) {
        return {
          from: {
            coin: "OUDT",
            icon: coinList.OUDT ? coinList.OUDT.icon : "",
            balance: allCoinMap.OUDT ? cutOut(allCoinMap.OUDT.normal_balance, 4) : "",
          },
          to: {
            coin: "ORX",
            icon: coinList.ORX ? coinList.ORX.icon : "",
            balance: allCoinMap.ORX ? parseFloat(allCoinMap.ORX.normal_balance) : "",
          },
        };
      }
      return {
        from: {
          coin: "ORX",
          icon: coinList.ORX ? coinList.ORX.icon : "",
          balance: allCoinMap.ORX ? parseFloat(allCoinMap.ORX.normal_balance) : "",
        },
        to: {
          coin: "OUDT",
          icon: coinList.OUDT ? coinList.OUDT.icon : "",
          balance: allCoinMap.OUDT ? cutOut(allCoinMap.OUDT.normal_balance, 4) : "",
        },
      };

      return {
        to: {
          coin: "",
          icon: "",
          balance: 0,
        },
        from: {
          coin: "",
          icon: "",
          balance: 0,
        },
      };
    },
    calCurrent() {
      return this.dataList["ORX/USDT"] || {};
    },
    calToVal() {
      let price = this.calCurrent.closes || 0;
      price = parseFloat(price);
      if (this.side === 1) {
        return cutOut(this.toValue / price, 4);
      }
      return cutOut(this.toValue * price, 4);
    },
  },
  watch: {
    isLogin(val) {
      if (val) {
        this.$store.dispatch("assetsExchangeData");
      }
    },
  },
  methods: {
    tableClick(type, id) {
      // if (type === 'cancelOrder') {
      //   this.cancelOrder(id);
      // }
      // if (type === 'view') {
      //   this.getSubTableData(id);
      // }
    },
    fixNum(num) {
      return Math.floor(parseFloat(num) * 10000) / 10000;
    },
    // 分页器
    pagechange(v) {
      this.paginationObj.currentPage = v;
      this.clearSub();
      this.getHisData();
    },
    // 重置详情
    clearSub() {
      this.subContentId = null;
      this.subColumns = [];
      this.subContent = [];
      this.subLoading = false;
    },
    changeSide() {
      this.side = this.side === 1 ? 2 : 1;
    },
    inputMax() {
      // 截取四位小数
      this.toValue = Math.floor(parseFloat(this.sideData.from.balance) * 10000) / 10000;
    },
    // 获取历史
    getHisData() {
      this.axios({
        url: "/order/entrust_history",
        method: "post",
        params: {
          side: "",
          pageSize: this.paginationObj.display, // 每页条数
          page: this.paginationObj.currentPage, // 页码
          isShowCanceled: 0, // 是否展示已撤单
          symbol: "orxoudt",
        },
      }).then((data) => {
        if (data.code.toString() === "0") {
          const list = [];
          const { orderList } = data.data;
          orderList.forEach((item) => {
            const quoteCoin = item.quoteCoin || item.countCoin;
            const marketFix = 7;
            const coinFix = 4;
            if (item.side === "BUY") {
              list.push({
                id: item.id,
                data: [
                  formatTime(item.time_long),
                  `${this.fixNum(item.deal_money)} ${quoteCoin}`, // 平均成交价
                  `${this.fixNum(item.deal_volume)} ${item.baseCoin}`, // 数量
                ],
              });
            } else {
              list.push({
                id: item.id,
                data: [
                  formatTime(item.time_long),
                  `${this.fixNum(item.deal_volume)} ${item.baseCoin}`, // 数量
                  `${this.fixNum(item.deal_money)} ${quoteCoin}`, // 平均成交价
                ],
              });
            }
          });
          this.tabelLoading = false;
          this.tabelList = list;
          this.paginationObj.total = data.data.count;
        } else {
          this.tabelLoading = false;
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },

    // 改，2022.11.18 将submit方法中的发起请求抽离出来
    createOrder() {
      if (this.lock) {
        return;
      }
      this.lock = true;
      this.axios({
        url: this.$store.state.url.cointran.order_create,
        params: {
          side: this.side === 1 ? "BUY" : "SELL",
          volume: this.toValue,
          symbol: this.symbolCurrent.replace("/", "").toLowerCase(),
          type: 2, // 市价交易
        },
        method: "post",
      }).then((data) => {
        this.lock = false;
        if (data.code === "0") {
          this.toValue = 0;
          this.$store.dispatch("assetsExchangeData");
          this.$bus.$emit("tip", { text: "Minting Completed", type: "success" });
          this.getHisData();
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },
  },
};
</script>

<style scoped>
.dark .m-orxBurning {
  --bur-color-1: #0c0e11;
  --bur-color-2: #181a1f;
  --bur-color-3: #242424;
}
.light .m-orxBurning {
  --bur-color-1: #eeeeee;
  --bur-color-2: #ffffff;
  --bur-color-3: #f3f3f3;
}

.m-orxBurning {
  width: 100%;
  background: var(--bur-color-1);
}
.m-orxBurning > .head {
  width: 940px;
  height: 143px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-orxBurning > .head > .title {
  font-size: 32px;
  color: var(--color-1);
}
.m-orxBurning > .head > img {
  width: 114px;
  height: 114px;
  object-fit: contain;
}
.m-orxBurning > .body {
  width: 100%;
  min-height: 990px;
  background: var(--bur-color-2);
}
.m-orxBurning > .body > .formBox {
  width: 940px;
  margin: auto;
  padding-top: 45px;
}
.m-orxBurning > .body > .formBox > .form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-orxBurning > .body > .formBox > .form .icon2 {
  cursor: pointer;
}
.m-formItem {
  width: 430px;
  height: 118px;
  border-radius: 8px;
  background: var(--bur-color-3);
  box-sizing: border-box;
  padding: 16px;
}
.m-formItem > .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
}
.m-formItem > .top > .left {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-1);
}
.m-formItem > .top > .right {
  display: flex;
  align-items: center;
  text-align: right;
}
.m-formItem > .top > .right .txt1 {
  font-size: 13px;
  color: #989898;
  box-sizing: border-box;
  padding: 0 4px;
}
.m-formItem > .top > .right .txt2 {
  font-size: 13px;
  color: #0d5eaf;
  cursor: pointer;
}
.m-formItem > .bottom {
  margin-top: 20px;
  height: 36px;
}
.m-formItem > .bottom,
.m-formItem > .bottom > .left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-formItem > .bottom > .left {
  font-size: 16px;
  color: var(--color-1);
  font-weight: 500;
}
.m-formItem > .bottom > .left .icon2 {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin-right: 8px;
}
.m-formItem > .bottom > .right input {
  font-size: 18px;
  font-weight: 500;
  color: #989898;
  text-align: right;
}
.m-orxBurning > .body .tips {
  font-size: 14px;
  color: #989898;
  line-height: 20px;
  margin-top: 20px;
}
.m-orxBurning > .body .btn {
  width: 270px;
  height: 44px;
  border-radius: 6px;
  line-height: 44px;
  text-align: center;
  color: #ffffff;
  background: #1058de;
  margin: 60px auto auto;
  cursor: pointer;
  user-select: none;
}
.m-table {
  width: 940px;
  margin: auto;
}
.m-table > .title {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: var(--color-1);
  margin: 30px 0;
}
/deep/.table-body .table-body-bar {
  color: var(--color-1);
}
/deep/.table-head {
  background: var(--bur-color-3);
}
</style>
