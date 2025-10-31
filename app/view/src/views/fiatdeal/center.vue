<template>
  <div class="fiatdeal-center">
    <div class="m-fiatdealHead">
      <!--<img class="img" :src="imgMap.otc_otc">-->
      <div class="title">{{ pageTitleText }}</div>
      <!--<div class="title" v-else>{{$t('fiatdeal.navList[0]')}}</div>-->
      <!--<div class="wrap">-->
      <!--  <div class="switchBox">-->
      <!--    &lt;!&ndash;<div class="item" @click="changeSide('BUY')" :class="{ active: side == 'BUY' }">购买</div>&ndash;&gt;-->
      <!--    &lt;!&ndash;<div class="item" @click="changeSide('SELL')" :class="{ active: side == 'SELL' }">出售</div>&ndash;&gt;-->
      <!--    <div class="item buy" @click="changeSide('BUY')" :class="{ active: side == 'SELL' }">{{ $t('fiatdeal.center.buy') }}</div>-->
      <!--    <div class="item sell" @click="changeSide('SELL')" :class="{ active: side == 'BUY' }">{{ $t('fiatdeal.center.sell') }}</div>-->
      <!--  </div>-->
      <!--  <div class="m-tab">-->
      <!--    <div-->
      <!--      class="item"-->
      <!--      :class="{ active: item.index ==  currentTab }"-->
      <!--      @click="currentType(item)"-->
      <!--      v-for="item in navTab"-->
      <!--      :key="item.index"-->
      <!--    >{{ item.name }}</div>-->
      <!--  </div>-->
      <!--</div>-->
      <div class="tabList">
        <div class="item buy" @click="changeSide('BUY')" :class="{ active: side == 'SELL' }">
          {{ $t("fiatdeal.center.buy") }}
        </div>
        <div class="item sell" @click="changeSide('SELL')" :class="{ active: side == 'BUY' }">
          {{ $t("fiatdeal.center.sell") }}
        </div>
      </div>
      <div class="m-tableHead">
        <!-- <div class="left">
          <div class="switchBox">
            <div class="item" :class="{ active: item.index ==  currentTab }" v-for="item in navTab" @click="currentType(item)">{{ item.name }}</div>
          </div>
        </div> -->
        <div class="right">
          <c-select
            :value="currentTab"
            :promptText="$t('order.otcOrder.hisOrderCoin')"
            @onChanges="currentType(item)"
            name="value0"
            :errorHave="true"
            :errorFlag="countryErrorFlag"
            errorText=""
            :options="navTab"
            height="48px"
            :styles="selectStyles"
          />
          <c-select
            :value="value1"
            :promptText="$t('fiatdeal.center.country')"
            @onChanges="listChange"
            name="value1"
            :errorHave="true"
            :errorFlag="countryErrorFlag"
            errorText=""
            :options="list1"
            height="48px"
            :styles="selectStyles"
          />
          <c-select
            :value="value3"
            :promptText="$t('fiatdeal.center.payment')"
            @onChanges="listChange"
            name="value3"
            :errorHave="true"
            :errorFlag="countryErrorFlag"
            errorText=""
            :options="list3"
            height="48px"
            :styles="selectStyles"
          />
          <c-select
            :value="value2"
            :promptText="
              !fiatTradeOpen ? $t('fiatdeal.center.fiat') : $t('assets.b2c.otcShow.lagel')
            "
            @onChanges="listChange"
            name="value2"
            :errorHave="true"
            :errorFlag="countryErrorFlag"
            errorText=""
            :options="list2"
            height="48px"
            :styles="selectStyles"
          />
        </div>
      </div>
    </div>
    <div class="m-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :classes="classes"
        :loading="loading"
        :headClasses="headClasses"
        :bodyClasses="bodyClasses"
        :lineClasses="lineClass"
        :columns="columns"
        :dataList="dataList"
        :lineNumber="lineNumber"
        :cellHeight="cellHeight"
        :headHeight="headHeight"
        @elementClick="operation"
      />
      <!-- 改，2022.08.28，a-5-bg -> h-1-bg -->
      <c-pagination
        v-show="count > 15"
        :total="count"
        :current-page="page"
        :display="pageSize"
        class="h-1-bg"
        @pagechange="pagechange"
      >
      </c-pagination>
    </div>
    <!--    <div class="center-management-header a-3-bd clearfix">-->
    <!--      <c-navTab-->
    <!--        activeClassName="b-1-cl"-->
    <!--        activeColor="a-12-bg"-->
    <!--        className="b-2-cl"-->
    <!--        :currentTab="currentTab"-->
    <!--        :navTab="navTab"-->
    <!--        :lineHeight="lineHeight"-->
    <!--        :marginRight="marginRight"-->
    <!--        @currentType="currentType"-->
    <!--      />-->
    <!--    </div>-->
    <div class="center-management-center" v-if="false">
      <!-- <div class="center-header a-3-bd clearfix">
          <div class="center-header-left clearfix">
            <span class="title b-1-cl">{{defaultCoin}}</span>
            <p class="data-main b-1-cl">{{lastPrice}}
              {{otcDefaultPaycoin}}
              <span v-show="roseColor === 0">{{rose | roseFilter}}%</span>
              <span v-show="roseColor === 1" class="b-5-cl">+{{rose | roseFilter}}%</span>
              <span v-show="roseColor === 2" class="b-6-cl">{{rose | roseFilter}}%</span>
            </p>
            <p class="text b-2-cl">{{$t('fiatdeal.center.header.text')}}
              {{avgPrice}} {{otcDefaultPaycoin}}</p>
          </div>
          <div class="center-header-right clearfix">
            <Charts key="klineDataList"
                    :dataList = "klineDataList"
                    name= "klineDataList"
                    height="94px"/>
          </div>
        </div> -->
      <mobilityTrade v-if="isShowMobility" :seach="side" :legal="value2" :coin="defaultCoin" />
      <div class="center-main clearfix">
        <div class="center-main-select clearfix">
          <!--          <div class="select">-->
          <!--            <c-select-->
          <!--              :value="value1"-->
          <!--              :promptText="$t('fiatdeal.center.country')"-->
          <!--              @onChanges="listChange"-->
          <!--              name="value1"-->
          <!--              :errorHave="true"-->
          <!--              :errorFlag="countryErrorFlag"-->
          <!--              errorText=""-->
          <!--              :options="list1"-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div class="select" :style="excheifFlag ? 'width:140px' : 'width:120px'">-->
          <!--            <c-select-->
          <!--              :value="value3"-->
          <!--              :promptText="$t('fiatdeal.center.payment')"-->
          <!--              @onChanges="listChange"-->
          <!--              name="value3"-->
          <!--              :errorHave="true"-->
          <!--              :errorFlag="countryErrorFlag"-->
          <!--              errorText=""-->
          <!--              :options="list3"-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div class="select" v-if="paycoinsType === 1">-->
          <!--            <c-select-->
          <!--              :value="value2"-->
          <!--              :promptText="-->
          <!--                !fiatTradeOpen ? $t('fiatdeal.center.fiat') : $t('assets.b2c.otcShow.lagel')-->
          <!--              "-->
          <!--              @onChanges="listChange"-->
          <!--              name="value2"-->
          <!--              :errorHave="true"-->
          <!--              :errorFlag="countryErrorFlag"-->
          <!--              errorText=""-->
          <!--              :options="list2"-->
          <!--            />-->
          <!--          </div>-->
          <div class="select select-pay" v-if="paycoinsType === 2">
            <div class="input_line_content a-2-bd">
              <label class="input_line_prompt b-2-cl">{{ $t("fiatdeal.center.fiat") }}</label>
              <p class="payTypeList">
                <template v-for="(v, key) in currencyListShow">
                  <span
                    @click="changKinde(v)"
                    class="u-11-cl"
                    :key="key + 'currencyShow'"
                    :class="{ 'u-12-bg': value2 === v.code }"
                  >
                    {{ v.value }}
                  </span>
                </template>
                <template v-for="(v, key) in currencyListHide">
                  <span
                    v-if="showMore"
                    @click="changKinde(v)"
                    class="u-11-cl"
                    :key="key + 'currencyHide'"
                    :class="{ 'u-12-bg': value2 === v.code }"
                  >
                    {{ v.value }}
                  </span>
                </template>
                <span @click="showKinde()" class="u-8-cl">
                  {{ openOTxt }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :classes="classes"
          :loading="loading"
          :headClasses="headClasses"
          :bodyClasses="bodyClasses"
          :lineClasses="lineClass"
          :columns="columns"
          :dataList="dataList"
          :lineNumber="lineNumber"
          :cellHeight="cellHeight"
          :headHeight="headHeight"
          @elementClick="operation"
        />
        <!-- 改，2022.08.28，a-5-bg -> h-1-bg -->
        <c-pagination
          v-show="count > 15"
          :total="count"
          :current-page="page"
          :display="pageSize"
          class="h-1-bg"
          @pagechange="pagechange"
        >
        </c-pagination>
      </div>
    </div>
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :buttonText="this.$t('personal.alert.buttonOpen')"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClose"
      @confirm="alertGo"
    >
      <div class="alertText">{{ tradeTypeErrorText }}</div>
    </c-alert>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/fiatdeal/center/center";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/fiatdeal/center/center.styl";
// import Charts from '@/views/home/charts/china.vue';
import { imgMap } from "@/utils";
import mobilityTrade from "./mobilityTrade.vue";

export default {
  mixins: [mixin],
  components: {
    // Charts,
    mobilityTrade,
  },
  data() {
    return {
      selectStyles: {},
      imgMap: {
        otc_otc: imgMap.otc_otc,
      },
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  methods: {
    // 2023.01.09 切换买卖
    changeSide(side) {
      let sideIsBlockTrade = this.sideIsBlockTrade || { side: "ordinary" };
      sideIsBlockTrade = sideIsBlockTrade.side;
      let typeMap = {};
      const ordinary = ["ordinary", "ordinaryBuy", "ordinarySell"]; // 普通交易模块
      const bulk = ["bulk", "bulkBuy", "bulkSell"]; // 大宗交易模块
      this.side = side;
      if (ordinary.includes(sideIsBlockTrade)) {
        typeMap = {
          BUY: "ordinaryBuy",
          SELL: "ordinarySell",
        };
      } else if (bulk.includes(sideIsBlockTrade)) {
        typeMap = {
          BUY: "bulkBuy",
          SELL: "bulkSell",
        };
      }

      const info = {
        side: typeMap[side],
      };
      console.log(info, "info--info");
      this.$store.dispatch("sideIsBlockTrade", info);
      this.$store.dispatch("setFlag", true);
      // this.init();
    },
  },
};
</script>
<style scoped>
.m-fiatdealHead {
  box-sizing: border-box;
  padding: 0 44px;
  position: relative;
  height: 265px;
}
.m-fiatdealHead > .img {
  width: 240px;
  height: 240px;
  position: absolute;
  top: 20px;
  right: 20px;
}
.m-fiatdealHead > .title {
  color: var(--color-text-primary);
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
}
.m-fiatdealHead .tabList {
  display: flex;
  height: 55px;
  border-bottom: 1px solid var(--color-Toggle);
  gap: 32px;
}

.m-fiatdealHead .tabList .item {
  position: relative;
  color: var(--color-text-secondary);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 55px;
  cursor: pointer;
}
.m-fiatdealHead .tabList .item:hover {
  color: var(--color-text-primary);
}

.m-fiatdealHead .tabList .item::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 3px;
}
.m-fiatdealHead .tabList .item.active {
  color: var(--color-text-primary);
}
.m-fiatdealHead .tabList .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 24px 100%
    no-repeat;
}
.m-fiatdealHead > .wrap > .switchBox {
  width: 168px;
  height: 45px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 6px;
}
.m-fiatdealHead > .wrap > .switchBox > .item {
  width: 78px;
  height: 33px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 33px;
  color: #ffffff;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}
.m-fiatdealHead > .wrap > .switchBox > .item.buy.active {
  background: var(--color-Positive);
}
.m-fiatdealHead > .wrap > .switchBox > .item.sell.active {
  background: var(--subRedColor);
}
.m-tableHead {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
/* .m-fiatdealHead /deep/.alertText {
  padding-right: 50px;
} */
.m-tab {
  display: flex;
  align-items: center;
}
.m-tab > .item {
  width: 73px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  user-select: none;
  position: relative;
  text-align: center;
  margin-right: 12px;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  position: absolute;
  height: 2px;
  background: var(--mainColor);
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
  width: 0px;
  transition: all 300ms ease;
}
.m-tab > .item.active {
  color: var(--mainColor);
}
.m-tab > .item.active::after {
  color: var(--mainColor);
  width: 73px;
}
.m-tableHead > .right {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-block: 20px;
}
.m-tableHead > .right > div {
  width: 25%;
}

/deep/.common-select .icon-triangle {
  border-color: var(--color-text-primary);
}
/* 2022.12.22 表格样式 */
.m-table {
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 44px;
  position: relative;
}
.m-table /deep/.table-head {
  height: 44px;
  border-radius: unset;
  line-height: 44px;
  box-sizing: border-box;
  margin: 0;
}
.m-table /deep/.table-body {
  min-height: 568px;
}
/deep/.common-table table {
  font-size: 14px;
}
/deep/.common-table .table-body-bar {
  padding: 0;
}

/deep/.common-table .table-body td .icon-btn {
  margin-left: 0;
  font-weight: 600;
}
/deep/.common-table .common-button.common-button-text {
  min-width: 113px;
  height: 40px !important;
  padding: 0 20px;
  border-radius: 100px;
}
/deep/.common-table .common-button.common-button-text .common-button-slot {
  color: var(--color-BTN-BUY-SELL-text);
  font-size: 16px;
  font-style: normal;
}
/deep/.common-table .common-button.common-button-text.sell {
  background: var(--color-Positive);
}
/deep/.common-table .common-button.common-button-text.buy {
  background: var(--color-Negative);
}

/deep/.common-table .common-button.common-button-text.sell,
/deep/.common-table .common-button.common-button-text.buy {
  border: none;
}
/deep/.common-table .table-body td .icon-btn.payments-ul {
  padding-inline: 10px;
  box-sizing: border-box;
  border: none;
  img {
    width: 18px;
    height: 18px;
  }
}
/deep/.common-table .table-body td .icon-btn:first-child {
  border: none;
}
.m-tableHead {
  height: auto;
  display: flex;
  align-items: center;
}
.m-tableHead > .left {
  display: flex;
  align-items: center;
}
.m-fiatdealHead > .wrap {
  display: flex;
  align-items: center;
  height: 66px;
  margin-top: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 20px;
}
.m-fiatdealHead > .title {
  padding-block: 40px;
}
.m-tableHead .switchBox {
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 6px;
  background: var(--color-14);
  overflow: hidden;
}
.m-tableHead .switchBox > .item {
  width: 76px;
  text-align: center;
  line-height: 38px;
  cursor: pointer;
  user-select: none;
  color: var(--color-19);
}
.m-tableHead .switchBox > .item.active {
  background: #1058de;
  color: #ffffff;
}

.m-tableHead .switchBox > .item.buy.active {
  background: var(--color-Positive);
  color: #ffffff;
}
.m-tableHead .switchBox > .item.sell.active {
  background: var(--subRedColor);
  color: #ffffff;
}
/deep/.table-body td span {
  color: var(--color-1);
}
.m-tableHead /deep/.common-select:not(.select-value, .select-visible) .input_line_prompt {
  /* transform: translateY(-10px); */
}
</style>
