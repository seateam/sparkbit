<!-- 改，2022.12.20 样式重构 -->
<template>
  <!-- 改，2022.10.01，a-3-bd -> a-3-bd-c -->
  <div class="co-trade-box e-2-cl" id="coTradeBox">
    <div class="title-block a-3-bd-c">
      <span
        class="show-dialog-btn"
        :class="showClassType === 'depositDialogShow' ? 'a-12-bd' : ''"
        @mouseenter="evenHandMouseenter('showClassType', 'depositDialogShow')"
        @mouseleave="evenHandMouseleave('showClassType')"
        @click="setShowDialog('depositDialogShow')"
      >
        {{ marginModelText }}
      </span>
      <span
        class="show-dialog-btn"
        :class="showClassType === 'leverageDialogShow' ? 'a-12-bd' : ''"
        @mouseenter="evenHandMouseenter('showClassType', 'leverageDialogShow')"
        @mouseleave="evenHandMouseleave('showClassType')"
        @click="setShowDialog('leverageDialogShow')"
      >
        {{ nowLevel }}X
      </span>
      <div class="counter-and-set">
        <!-- 合约计算器按钮 -->
        <i class="set-btn-icon" @click="showDialog('OPEN_CALCULATOR_DIALOG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_39_1"></use>
          </svg>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_39"></use>
          </svg>
        </i>
        <!-- 合约设置按钮 -->
        <i class="set-btn-icon" @click="showDialog('SET_FUTURE_CONFIG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_2_1"></use>
          </svg>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_2"></use>
          </svg>
        </i>
      </div>
    </div>
    <div class="trade-form">
      <!-- 开仓 平仓 (双向持仓可开启)-->
      <div class="category-select-box" v-if="positionModel === 2">
        <span
          class="tab"
          v-for="(item, index) in switchTradeTypeList"
          :key="index"
          @click="switchTradeType(item.id)"
          :class="item.classes"
        >
          <i class="h">{{ item.text }}</i>
          <i class="s b-1-cl">{{ item.text }}</i>
        </span>
      </div>
      <!-- 价格类型 限价单、市价单、条件单  -->
      <!-- 改，2022.12.28 修改tab样式 -->
      <!--<div class="category-select-box">-->
      <!--  &lt;!&ndash; style="background-color: #226afd" &ndash;&gt;-->
      <!--  <span-->
      <!--    class="tab"-->
      <!--    v-for="(item, index) in categoryList"-->
      <!--    :key="index"-->
      <!--    @click="selectCategory(item.id)"-->
      <!--    :class="item.classes"-->
      <!--  >-->
      <!--    <i class="h">{{ item.text }}</i>-->
      <!--    <i class="s b-1-cl">{{ item.text }}</i>-->
      <!--  </span>-->
      <!--</div>-->
      <div class="m-tab">
        <div
          class="item"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="selectCategory(item.id)"
          :class="{ active: item.id == currentCategory }"
        >
          {{ item.text }}
        </div>
      </div>
      <!-- 价格 -->
      <form-input
        :promptText="formData_1.promptText"
        v-if="formData_1.isShow"
        :fix="formData_1.fix"
        :unit="formData_1.units"
        :title="formData_1.title"
        :default="formData_1.value"
        :isPercentage="formData_1.percentageVlaue"
        :isError="formData_1.errorText"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_1', $event)"
      >
      </form-input>
      <div v-if="formData_1.errorText" class="form-error b-6-cl">{{ formData_1.errorText }}</div>
      <!-- 数量 -->
      <form-input
        :promptText="formData_2.promptText"
        v-if="formData_2.isShow"
        :isMarket="isMarket"
        :fix="formData_2.fix"
        :unit="formData_2.units"
        :default="formData_2.value"
        :title="formData_2.title"
        :haveMarket="true"
        :isError="formData_2.errorText"
        :percentageVlaue="percentageVlaue"
        @selectMarket="selectMarket"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_2', $event)"
      >
      </form-input>
      <div v-if="formData_2.errorText" class="form-error b-6-cl">{{ formData_2.errorText }}</div>

      <form-input
        :promptText="formData_3.promptText"
        v-if="formData_3.isShow"
        :fix="formData_3.fix"
        :unit="formData_3.units"
        :title="formData_3.title"
        :default="formData_3.value"
        :isError="formData_3.errorText"
        :isPercentage="formData_3.percentageVlaue"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_3', $event)"
      >
      </form-input>
      <div v-if="formData_3.errorText" class="form-error b-6-cl">{{ formData_3.errorText }}</div>
      <!-- 仓位价值  只有 （开仓 || 非只减仓） && 市价 显示 -->
      <p class="convert b-1-cl" v-if="isOpenAndIsMarket && !percentageVlaue">
        ≈ {{ worthRate }} <span> {{ multiplierCoin }}</span>
      </p>
      <p
        class="convert b-1-cl"
        v-if="currentCategory !== 2 && !isMarket && worthValue && !percentageVlaue"
      >
        <!-- 价值 -->
        {{ lanText.textjz }}
        {{ worthValue }}
        <template v-if="contractSide === 1">{{ priceUnit }}</template>
        <template v-else>{{ baseCoin }}</template>
      </p>
      <!--<div class="percentage a-3-bd-c">-->
      <!--  <span-->
      <!--    v-for="item in percentageList"-->
      <!--    :key="item"-->
      <!--    @mouseenter="evenHandMouseenter('percentageVlaueHover', item)"-->
      <!--    @mouseout="evenHandMouseenter('percentageVlaueHover', null)"-->
      <!--    @click="setPercentageVlaue(item)"-->
      <!--    :class="-->
      <!--      percentageVlaue === item || percentageVlaueHover === item-->
      <!--        ? 'a-12-bd b-4-cl'-->
      <!--        : 'a-3-bd-c'-->
      <!--    "-->
      <!--  >-->
      <!--    {{ item }}%-->
      <!--  </span>-->
      <!--</div>-->
      <div
        class="m-percentage"
        style="margin-top: 14px"
        :style="{ '--width': `${330 / percentageList.length}px` }"
      >
        <span
          v-for="item in percentageList"
          :key="item"
          :class="{
            active: percentageVlaue === item || percentageVlaueHover === item,
            prevItem: item < percentageVlaue,
          }"
          @mouseenter="evenHandMouseenter('percentageVlaueHover', item)"
          @mouseout="evenHandMouseenter('percentageVlaueHover', null)"
          @click="setPercentageVlaue(item)"
          class="item"
          :title="`${item}%`"
        ></span>
      </div>
      <!-- 可买  可卖 -->
      <div class="openable m-openable">
        <div class="left">
          <label class="txt">{{ openableData.buyText }}</label>
          <span class="num s-green"> {{ thousandsComma(maxCanBuyNumber) }} {{ volUnit }}</span>
        </div>
        <div class="right">
          <label class="txt">{{ openableData.sellText }}</label>
          <span class="num s-red"> {{ thousandsComma(maxCanSellNumber) }} {{ volUnit }} </span>
        </div>
      </div>
      <!-- 选项 -->
      <div class="option" v-if="currentCategory !== 2 || positionModel === 1">
        <template v-if="currentCategory !== 2 && !isMarket">
          <div class="select-order-type">
            <c-checkBox :value="isCheckedOrdeType" @click="checkedOrdeTypeclick" />
            <label class="ac-type">
              <div class="h-show">
                <span class="tit a-1-bd">{{ ordeType.title }}</span>
                <span @click="ordeTypePtions = !ordeTypePtions" class="triangle-down b-4-bd"></span>
              </div>
              <div class="h-hide">
                <span class="tit a-1-bd">{{ ordeType.title }}</span>
                <span @click="ordeTypePtions = !ordeTypePtions" class="triangle-down"></span>
              </div>
              <p class="tip-text a-5-bg a-3-bd-c b-1-cl">
                {{ ordeType.text }}
              </p>
            </label>
            <!-- @mouseout="evenHandMouseenter('ordeTypePtions', false)" -->
            <div class="orde-type-ptions" v-show="ordeTypePtions">
              <p
                v-for="item in ordeTypeList"
                :key="item.id"
                :class="
                  ordeType.id === item.id || hoverOrdeType.id === item.id ? 'a-3-bg b-1-cl' : ''
                "
                @mouseenter.stop="evenHandMouseenter('hoverOrdeType', item)"
                @mouseout.stop="evenHandMouseenter('hoverOrdeType', {})"
                @click.stop="radioClick(item)"
              >
                {{ item.title }}
              </p>
            </div>
          </div>
        </template>
        <!-- 只减仓（只要单向持仓会显示只减仓） -->
        <span v-if="positionModel === 1">
          <c-checkBox :value="zhiJianCang" @click="checkoutClick" />
          <!-- 只减仓 -->
          <label class="rt-label a-1-bd"
            >{{ lanText.text6 }}
            <p class="tip-text rt-label-zjc a-5-bg a-3-bd-c b-1-cl">
              <!-- 只减仓订单只会减少仓位，不会增加仓位。 -->
              {{ lanText.text7 }}
            </p>
          </label>
        </span>
      </div>
      <!-- 到期时间  有效期-->
      <!-- <form-select
        class="expireTime"
        v-if="currentCategory === 3"
        :label="lanText.text4"
        :list="planTypeList"
        :current="expireTime"
        @selectList="selectPlanType">
      </form-select> -->
      <!-- 买入 卖出 按钮 -->
      <div class="submit-button">
        <c-button
          v-if="!isLogin || !openContract"
          :defaultColorClass="loginButton.class"
          :hoverColorClass="loginButton.class"
          :activeColorClass="loginButton.class"
          @click="loginButtonClick()"
          width="100%"
        >
          {{ loginButton.text }}
        </c-button>
        <template v-if="isLogin && openContract">
          <c-button
            :defaultColorClass="buttosContent.buyButton.class"
            :hoverColorClass="buttosContent.buyButton.class"
            :activeColorClass="buttosContent.buyButton.class"
            @click="submitForm('BUY')"
            :disabled="isSubmitDisbled"
            paddingW="10px"
            width="140px"
          >
            {{ buttosContent.buyButton.text }}
          </c-button>
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="submitForm('SELL')"
            :disabled="isSubmitDisbled"
            paddingW="10px"
            width="140px"
          >
            {{ buttosContent.sellButton.text }}
          </c-button>
        </template>
      </div>

      <!-- 分割线 -->
      <div class="m-line"></div>
      <!-- 成本 -->
      <div class="hold-position">
        <label class="txt"> {{ lanText.text5 }} </label>
        <span class="num">{{ thousandsComma(canBuyCostNumber) }} {{ marginCoin }}</span>
      </div>
      <!-- 成本 -->
      <div class="hold-position">
        <label class="txt"> {{ lanText.text5 }} </label>
        <span class="num">{{ thousandsComma(canSellCostNumber) }} {{ marginCoin }}</span>
      </div>
      <div class="available a-3-bd-c">
        <div class="info">
          <span class="rt-label a-1-bd">
            <!-- 可用 -->
            {{ lanText.text2 }}
            <p class="tip-text a-5-bg a-3-bd-c b-1-cl" v-html="lanText.text3">
              <!-- 可用余额为用户可自由支配的资金。可用余额会优先作为全仓保证金，当全仓仓位亏损时，可用就会减少。 -->
            </p>
          </span>
          <span class="num">{{ thousandsComma(canUseAmount) }} {{ marginCoin }}</span>
        </div>
      </div>
    </div>
    <!-- 强制提醒(二次确认) -->
    <forcedReminder
      :dataInfo="confirmData"
      :isShow="forcedReminderShow"
      :close="closeDialog"
      @submitOrder="submitOrder"
    />
    <!-- 设置杠杆 -->
    <lever-component v-if="leverageDialogShow" :isShow="leverageDialogShow" :close="closeDialog" />
    <!-- 切换 保证金模式 -->
    <depositMode v-if="depositDialogShow" :isShow="depositDialogShow" :close="closeDialog" />
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm";
import calculateVolumeMixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/calculateVolume";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm.styl";

import formInput from "./component/form-input.vue";
import forcedReminder from "./component/forced-reminder.vue";
// 调整杠杆弹框
import leverComponent from "./component/lever.vue";
// 保证金模式 全仓 逐仓 切换
import depositMode from "./component/depositMode.vue";

export default {
  mixins: [mixin, calculateVolumeMixin],
  components: {
    formInput,
    forcedReminder,
    leverComponent,
    depositMode,
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};
</script>
<style scoped>
.co-trade-box .title-block .show-dialog-btn {
  width: 52px;
  height: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 25px;
  color: #ffffff;
  text-align: center;
  border-width: 0;
}
.u-8-bg {
  background-color: var(--mainColor);
}
/* 2022.12.28 样式修改 */
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  text-transform: capitalize;
  color: #929292;
  margin-top: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.m-tab > .item {
  margin-right: 32px;
  position: relative;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item.active {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -0.5px;
  width: 0;
  height: 3px;
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.m-tab > .item.active::after {
  width: 100%;
}
/* 进度条 */
.m-percentage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  cursor: pointer;
  user-select: none;
}
.m-percentage > .item {
  width: 8px;
  height: 8px;
  background: #2a2c31;
  border: 1px solid #202123;
  border-radius: 50%;
}
.m-percentage > .item.active {
  width: 12px;
  height: 12px;
  background: #ffffff;
  border: 2px solid var(--mainColor);
  z-index: 10;
}

.m-percentage > .item {
  position: relative;
}
/* 未选中 */
.m-percentage > .item:not(:last-child):after {
  content: "";
  width: var(--width);
  height: 5px;
  background: #2a2c31;
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
/* 选中 */
.m-percentage > .item.active:not(:last-child):after {
  left: 14px;
}
.m-percentage > .item.prevItem {
  width: 8px;
  height: 8px;
  background: #ffffff;
}
.m-percentage > .item.prevItem:not(:last-child):after {
  background: var(--mainColor);
  left: 8px;
  width: calc(var(--width) - 6px);
}

.co-trade-box .trade-form .openable {
  margin-top: 0;
}

.m-openable {
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
}
.m-openable .num.s-green {
  color: var(--color-Positive);
}
.m-openable .num.s-red {
  color: var(--subRedColor);
}
.co-trade-box .trade-form .submit-button /deep/.common-button {
  border-radius: 5px;
  height: 44px !important;
  line-height: 44px !important;
}
.co-trade-box .trade-form .submit-button /deep/.buyBtn {
  background: var(--color-Positive);
}
.co-trade-box .trade-form .submit-button /deep/.sellBtn {
  background: var(--subRedColor);
}
.co-trade-box .trade-form .submit-button {
  height: 44px;
}
.co-trade-box .trade-form .triangle-down {
  margin: 10px 0 0 4px;
}
.co-trade-box .trade-form .option {
  margin-top: 12px;
}
.co-trade-box .trade-form .select-order-type .ac-type .tit {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.6);
}
.co-trade-box .trade-form .select-order-type {
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  margin: 16px 0;
}
.co-trade-box .trade-form .hold-position,
.co-trade-box .trade-form .available {
  height: 20px;
  line-height: 20px;
  margi-top: 0;
  margin-bottom: 12px;
}
.hold-position {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
}
.hold-position > .txt {
  color: #929292;
}
.hold-position > .num {
  color: #ffffff;
}
.co-trade-box .trade-form .available > .info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.co-trade-box .trade-form .available > .info > .num {
  color: #ffffff;
}
.co-trade-box .trade-form .category-select-box .tab:hover {
  color: #0c0e11;
}
.co-trade-box .trade-form .category-select-box .tab {
  color: #ffffff;
}
.co-trade-box .trade-form .category-select-box .tab.a-8-bg {
  background: rgba(255, 255, 255, 0.08);
}
.co-trade-box .trade-form .category-select-box .tab.b-1-cl {
  color: #0c0e11;
}
</style>
