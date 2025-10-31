<template>
  <div class="m-option">
    <div class="leftBox">
      <current-symbol></current-symbol>
      <trading-view></trading-view>
    </div>
    <div class="rightBox">
      <div class="head">
        <div class="item" :class="{active: headTab === 1}" @click="headTab = 1">Bet</div>
        <div class="item" :class="{active: headTab === 2}" @click="headTab = 2">Option Record</div>
      </div>
      <trade-form v-show="headTab === 1"></trade-form>
      <transRecords v-if="headTab === 2" :symbol="currentSymbol" :coinData="coinInfo"></transRecords>
    </div>
    <i v-if="!baseInfo"></i>
  </div>
</template>

<script>
import tradeForm from "@/views/options/modules/tradeForm";
import transRecords from "@/views/options/modules/transRecords";
import tradingView from "@/views/options/modules/tradingView";
import currentSymbol from "@/views/options/modules/currentSymbol";
import runSocket from "@/views/options/modules/runSocket";
import { myStorage } from "@/utils";
import tradeMixin from "./mixin";

export default {
  name: "options",
  mixins: [runSocket, tradeMixin],
  components: {
    tradeForm,
    transRecords,
    tradingView,
    currentSymbol,
  },
  data() {
    return {
      currentSymbol: "",
      headTab: 1,
      coinInfo: {},
    };
  },
  mounted() {
    this.$bus.$on("SYMBOL_CURRENT", (val) => {
      this.currentSymbol = val;
    });
    this.$bus.$on("COIN_CHANGE", (val) => {
      this.coinInfo = val;
    });
  },
  computed: {
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    opUrl() {
      return this.$store.state.systemConfig.opUrl;
    },
  },
  watch: {
    userInfo: {
      handler(val) {
        if (val) {
          this.checkAccount();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async checkAccount() {
      const uid = this.userInfo.id;
      const res = await this.axios({
        url: `${this.opUrl}/account/check?uid=${uid}`,
        hostType: "def",
        method: "get",
      });
      // if (res.code === '0') {
      //   this.createOrder();
      // } else {
      //   this.$bus.$emit('tip', {
      //     text: res.msg,
      //     type: 'error'
      //   });
      // }
    },
  },
};
</script>

<style scoped>
.dark .m-option {
  --option-color-1: #181818;
  --option-color-2: #18191C;
}
.light .m-option {
  --option-color-1: #EEEEEE;
  --option-color-2: #EEEEEE;
}

.m-option {
  display: flex;
  min-height: 753px;
  max-width: 1582px;
  min-width: 1280px;
  margin: 10px auto auto;
}

.m-option > .leftBox {
  flex: 1;
}
.m-option > .rightBox {
  width: 290px;
}
.m-option > .rightBox > .head {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: var(--option-color-2);
}
.m-option > .rightBox > .head > .item {
  width: 50%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  border: 1px solid transparent;
  color: var(--color-1);
}
.m-option > .rightBox > .head > .item.active {
  border-color: var(--mainColor);
}

</style>
