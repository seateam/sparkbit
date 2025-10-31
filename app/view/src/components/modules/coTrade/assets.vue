<!-- 币币交易 24小时行情 -->
<!-- 2022.12.29 样式重构 -->
<template>
  <!-- 改，2022.10.01，a-3-bd -> a-3-bd-c -->
  <div class="sl-swap-assets a-8-bd" :style="{ height: boxHeight + 'px' }">
    <div class="block-header title a-3-bd-c">
      <!-- 资产 -->
      <span
        class="tab"
        v-if="isLogin && openContract"
        @click="switchBlock(1)"
        :class="{ 'active': blockType === 1 }"
      >
        <!-- 资产 -->
        {{ lanText.text1 }}
      </span>
      <span class="tab" @click="switchBlock(2)" :class="{ 'active': blockType === 2 }">
        <!-- 合约信息 -->
        {{ lanText.text2 }}
      </span>
      <!--&lt;!&ndash; 立即划转 &ndash;&gt;-->
      <!--<a class="b-4-cl" v-if="blockType === 1 && openContract" @click="openTransfer">-->
      <!--  &lt;!&ndash; 立即划转 &ndash;&gt;-->
      <!--  {{ lanText.text3 }}-->
      <!--</a>-->
      <!--<a class="b-4-cl" v-else @click="goFuturesData">-->
      <!--  &lt;!&ndash; 合约数据 &ndash;&gt;-->
      <!--  {{ lanText.text25 }}-->
      <!--</a>-->
    </div>
    <div class="m-transferBtn" v-if="blockType === 1 && openContract" @click="openTransfer">{{ lanText.text3 }}</div>
    <div class="m-transferBtn" v-else @click="goFuturesData">{{ lanText.text25 }}</div>

    <div :style="{ height: boxHeight - 90 + 'px' }">
      <vue-scroll>
        <template v-if="blockType === 1">
          <!-- 2022.12.29 隐藏环形图 -->
          <!--<div-->
          <!--  v-if="balanceInfor.totalAmount && Number(balanceInfor.totalAmount) !== 0"-->
          <!--  class="assetsChart"-->
          <!--&gt;-->
          <!--  &lt;!&ndash;<assetsChart :balanceInfor="balanceInfor" />&ndash;&gt;-->
          <!--  <div class="total-rate">-->
          <!--    <p class="text-il">-->
          <!--      <span class="b-1-cl"> {{ balanceInfor.totalMarginRate }} % </span>-->
          <!--    </p>-->
          <!--    <div class="hint-father text-il">-->
          <!--      <a class="b-2-cl a-1-bd">-->
          <!--        &lt;!&ndash; 账户保证金率 &ndash;&gt;-->
          <!--        {{ lanText.text5 }}-->
          <!--      </a>-->
          <!--      <p class="hint b-1-cl a-3-bd-c" :class="hintClass" v-html="lanText.text6">-->
          <!--        &lt;!&ndash; 账户保证金率=该币种总资产/该币种担保的仓位总价值。此值用来表示担保资产的大致水平。保证金率越低，仓位被强制减仓的风险越大。 &ndash;&gt;-->
          <!--      </p>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--</div>-->
          <!-- 总资产 -->
          <!--<div class="m-list">-->
          <!--  <div class="left">-->
          <!--    {{ lanText.text7 }}-->
          <!--    <p class="hint b-1-cl a-3-bd-c" :class="hintClass">-->
          <!--      {{ marginCoin }}-->
          <!--      &lt;!&ndash; 合约账户总权益。账户总权益=全仓总权益+逐仓总权益+冻结保证金。 &ndash;&gt;-->
          <!--      <span v-html="lanText.text8"></span>-->
          <!--    </p>-->
          <!--  </div>-->
          <!--  <div class="right">{{ marginCoin }}<span v-html="lanText.text8"></span></div>-->
          <!--</div>-->


          <ul class="assets-list">
            <li class="total-amount">
              <!-- 总资产 -->
              <div class="hint-father">
                <a class="b-2-cl txt">
                  <!-- 总资产 -->
                  {{ lanText.text7 }}
                </a>
                <p class="hint b-1-cl a-3-bd-c" :class="hintClass">
                  {{ marginCoin }}
                  <!-- 合约账户总权益。账户总权益=全仓总权益+逐仓总权益+冻结保证金。 -->
                  <span v-html="lanText.text8"></span>
                </p>
              </div>
              <span class="b-1-cl num">{{ thousandsComma(balanceInfor.totalAmount) }} {{ marginCoin }}</span
              >
            </li>
            <li>
              <!-- 仓位保证金 -->
              <div class="hint-father">
                <a class="b-2-cl a-1-bd txt">
                  <!--<i class="clole-style clole-style_1"></i>-->
                  <!-- 全仓保证金 -->
                  {{ lanText.text9 }}
                </a>
                <p class="hint b-1-cl a-3-bd-c" :class="hintClass" v-html="lanText.text10">
                  <!-- 所有用来担保全仓仓位的保证金。当全仓仓位被强制平仓时，会损失这些资产。
                  请注意：转入合约账户的资产会自动作为全仓保证金。 -->
                  <!-- {{}} -->
                </p>
              </div>
              <span class="b-1-cl num">{{ thousandsComma(balanceInfor.totalMargin) }} {{ marginCoin }}</span>
            </li>
            <li>
              <!-- 未实现盈亏 -->
              <div class="hint-father">
                <a class="b-2-cl a-1-bd txt">
                  <!--<i class="clole-style clole-style_2"></i>-->
                  <!-- 逐仓保证金 -->
                  {{ lanText.text11 }}
                </a>
                <p class="hint b-1-cl a-3-bd-c" :class="hintClass" v-html="lanText.text12">
                  <!-- 所有用来担保逐仓仓位的保证金。
                  逐仓保证金和全仓分开，全仓仓位被强制平仓不会影响到这部分资产。 -->
                </p>
              </div>
              <span class="b-1-cl num">{{ thousandsComma(balanceInfor.isolateMargin) }} {{ marginCoin }}</span>
            </li>
            <li>
              <!-- 冻结保证金 -->
              <div class="hint-father">
                <a class="b-2-cl txt">
                  <!--<i class="clole-style clole-style_3"></i>-->
                  <!-- 冻结保证金 -->
                  {{ lanText.text13 }}
                </a>
                <p class="hint b-1-cl a-3-bd-c" :class="hintClass">
                  <!-- 提交委托时冻结的委托保证金总和。 -->
                  {{ lanText.text14 }}
                </p>
              </div>
              <span class="b-1-cl num">{{ thousandsComma(balanceInfor.lockAmount) }} {{ marginCoin }}</span>
            </li>
          </ul>
        </template>
        <div class="futures-info-list" v-else>
          <div class="info-item a-3-bd-c">
            <span class="th">
              <!-- 合约代号 -->
              {{ lanText.text15 }}
            </span>
            <span class="td">{{ contractNames(contractInfo.symbol) }}</span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 交割日期  -->
            <span class="th"> {{ lanText.text16 }}</span>
            <span class="td"> {{ contractShowType }} </span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 合约标的  -->
            <span class="th"> {{ lanText.text17 }}</span>
            <span class="td"
              >{{ contractInfo.symbol | setSymbolNumer }}
              <!-- 指数 -->
              {{ lanText.text18 }}
            </span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 保证金币种  -->
            <span class="th"> {{ lanText.text19 }}</span>
            <span class="td">{{ marginCoin }}</span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 合约面值  -->
            <span class="th"> {{ lanText.text20 }}</span>
            <span class="td"
              >{{ thousandsComma(contractInfo.multiplier) }} {{ contractInfo.multiplierCoin }}</span
            >
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 最小价格变动单位  -->
            <span class="th"> {{ lanText.text21 }}</span>
            <span class="td">{{ pricefix | setfixNumer }} {{ priceUnit }}</span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 最低维持保证金率  -->
            <span class="th"> {{ lanText.text22 }}</span>
            <span class="td">{{ minMarginRate }}%</span>
          </div>
          <div class="info-item a-3-bd-c">
            <!-- 结算周期  -->
            <span class="th"> {{ lanText.text23 }}</span>
            <span class="td">{{ contractInfo.settlementFrequency }}min</span>
          </div>
        </div>
      </vue-scroll>
    </div>

    <common-transfer :symbol="marginCoin" :isShow="transferIsShow" :close="closeDialog">
    </common-transfer>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/assets/assets";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/assets/assets.styl";
import commonTransfer from "./component/transfer.vue";
import assetsChart from "./echarts/assetsChart.vue";

export default {
  mixins: [mixin],
  components: { commonTransfer, assetsChart },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.sl-swap-assets .title a {
  color: var(--mainColor);
  position: relative;
  padding-right: 10px;
}
/*.sl-swap-assets .title a::after {*/
/*  content: "";*/
/*  width: 6px;*/
/*  height: 6px;*/
/*  border-top: 1px solid var(--mainColor);*/
/*  border-right: 1px solid var(--mainColor);*/
/*  transform: translateY(-50%) rotate(45deg);*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  right: 0;*/
/*}*/
.sl-swap-assets .assets-list li {
  border-bottom-width: 0;
  height: 20px;
  line-height: 20px;
  padding: 0 20px;
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 12px;
}
.sl-swap-assets .assets-list li .txt {
  color: var(--color-text-secondary);
}
.sl-swap-assets .assets-list li .num {
  color: var(--color-text-primary);
}
.assets-list {
  padding: 16px 0;
}
.sl-swap-assets .title {
  padding: 0;
  display: flex;
  align-items: center;
  border-width: 0;
  border-bottom: 1px solid var(--color-Input-border);
}
.sl-swap-assets > .block-header > .tab {
  position: relative;
  flex: 1;
  text-align: center;
  margin-right: 0;
  color: var(--color-text-secondary);
}
.sl-swap-assets > .block-header > .tab::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
}
.sl-swap-assets > .block-header > .tab.active {
  color: var(--color-text-primary);
}
.sl-swap-assets > .block-header > .tab.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 22px 100% no-repeat;
}
.sl-swap-assets {
  border-width: 0;
}
.sl-swap-assets .futures-info-list .info-item {
  border-width: 0;
}
.sl-swap-assets .futures-info-list .info-item span.td {
  color: var(--color-1);
}
.m-transferBtn {
  width: calc(100% - 40px);
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: var(--trade-color-13);
  border-radius: 100px;
  color: var(--color-text-primary);
  margin: 12px 20px;
  cursor: pointer;
}
.sl-swap-assets .hint {
  background: var(--color-29);
}
</style>
