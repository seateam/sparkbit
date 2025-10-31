<!-- 计算器 -->
<!-- 2022.12.30 样式重构 -->
<template>
  <c-dialog
    class="calculator-mode"
    paddingBottom="20px"
    :titleText="lanText.text1"
    :showFlag="isShow"
    :haveOption="haveOption"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    @close="close"
    @confirm="submit"
  >
    <div class="calculatorMode-box">
      <div class="m-tab">
        <div
          class="item"
          v-for="(item, index) in categoryTypeList"
          :key="index"
          @click="switchType('categoryType', item.id)"
          :class="{ active: categoryType === item.id }"
        >
          {{ item.text }}
        </div>
      </div>

      <!--<div class="category-select-box">-->
      <!--  <span class="tab b-1-cl"-->
      <!--    v-for="(item, index) in categoryTypeList"-->
      <!--    :key="index"-->
      <!--    @click="switchType('categoryType', item.id)"-->
      <!--    :class="item.classes">-->
      <!--    {{item.text}}-->
      <!--  </span>-->
      <!--</div>-->
      <div class="block-box clearfix">
        <div class="form-block">
          <div class="category-select-box">
            <span
              class="tab"
              v-for="(item, index) in sideTypeList"
              :key="index"
              @click="switchType('sideType', item.id)"
              :class="item.classes"
            >
              {{ item.text }}
            </span>
          </div>
          <!-- 杠杆倍数 -->
          <div class="m-addSub">
            <div class="title">{{ lanText.text2 }}</div>
            <div class="ct">
              <input
                class="input"
                type="text"
                v-model="leverage"
                @focus="inputActiveClass = 'a-12-bd'"
                @blur="inputActiveClass = 'a-3-bd'"
              />
              <!-- <div class="btn">
                <div class="item sub" @click="subtract">-</div>
                <div class="item add" @click="add">+</div>
              </div> -->
            </div>
          </div>
          <!--<div class="add-and-sub a-3-bd" :class="inputActiveClass">-->
          <!--  <div class="content">-->
          <!--    <input-->
          <!--      class="b-1-cl"-->
          <!--      type="text"-->
          <!--      v-model="leverage"-->
          <!--      @focus="inputActiveClass = 'a-12-bd'"-->
          <!--      @blur="inputActiveClass = 'a-3-bd'"-->
          <!--    />-->
          <!--  </div>-->
          <!--  <div class="options">-->
          <!--    <a class="add a-3-bd" @click="add">-->
          <!--      <i>-->
          <!--        <svg class="icon icon-14 hover-show" aria-hidden="true">-->
          <!--          <use xlink:href="#icon-a_11" />-->
          <!--        </svg>-->
          <!--        <svg class="icon icon-14  hover-hide" aria-hidden="true">-->
          <!--          <use xlink:href="#icon-a_11_1" />-->
          <!--        </svg>-->
          <!--      </i>-->
          <!--    </a>-->
          <!--    <a class="sub a-3-bd" @click="subtract">-->
          <!--      <i>-->
          <!--        <svg class="icon icon-14  hover-show" aria-hidden="true">-->
          <!--          <use xlink:href="#icon-a_11" />-->
          <!--        </svg>-->
          <!--        <svg class="icon icon-14  hover-hide" aria-hidden="true">-->
          <!--          <use xlink:href="#icon-a_11_1" />-->
          <!--        </svg>-->
          <!--      </i>-->
          <!--    </a>-->
          <!--  </div>-->
          <!--</div>-->

          <div class="transaction-drag" ref="dragStepWrap" @click.stop="onmousedownCick">
            <!-- transition -->
            <span
              class="drag-step"
              @mousedown="onmousedown"
              ref="dragStep"
              :style="{
                left: stepPosition + '%',
                marginLeft: stepPosition == 0 ? '0px' : stepPosition == 100 ? '-12px' : '0px',
              }"
            >
            </span>
            <span class="drag-def a-3-bg">
              <em class="drag-bar c-8-bg" :style="{ width: stepPosition + '%' }"> </em>
            </span>
            <i class="drag-step0" @click.stop="dragStep(0)" :style="{ left: '1%' }">
              <b class="mark">1X</b>
            </i>
            <i
              v-for="index in 5"
              :key="index"
              @click.stop="dragStep(index)"
              :style="{ left: parseInt(index * 20) + '%' }"
              :class="[
                'drag-step' + index,
                stepPosition > parseInt((index - 1) * 20) && stepPosition <= parseInt(index * 20)
                  ? 'next-step'
                  : '',
              ]"
            >
              <b class="mark">{{ nulFun(index, itemLvaue) }}X</b>
            </i>
          </div>
          <!--<div class="max-can-open">-->
          <!--  &lt;!&ndash; 当前杠杆最高可持有头寸数  &ndash;&gt;-->
          <!--  {{lanText.text3}}-->
          <!--  <span> {{ maxNumber }} {{volUnit}} </span>-->
          <!--</div>-->
          <form-input
            class="m-input"
            :title="formData_1.title"
            v-if="formData_1.isShow"
            :fix="formData_1.fix"
            :unit="formData_1.units"
            :default="formData_1.value"
            :isError="formData_1.errorText"
            @tradeChangeValue="changeInput('formData_1', $event)"
          >
          </form-input>
          <form-input
            class="m-input"
            v-if="formData_2.isShow"
            :fix="formData_2.fix"
            :unit="formData_2.units"
            :default="formData_2.value"
            :title="formData_2.title"
            :isError="formData_2.errorText"
            @tradeChangeValue="changeInput('formData_2', $event)"
          >
          </form-input>
          <form-input
            class="m-input"
            v-if="formData_3.isShow"
            :fix="formData_3.fix"
            :unit="formData_3.units"
            :title="formData_3.title"
            :default="formData_3.value"
            :isError="formData_3.errorText"
            @tradeChangeValue="changeInput('formData_3', $event)"
          >
          </form-input>
          <c-button
            height="50px"
            :disabled="dialogConfirmDisabled"
            paddingW="6px"
            width="100%"
            @click="submit"
            class-name="m-calculatorBtn"
          >
            <!-- 计算 -->
            {{ lanText.text4 }}
          </c-button>
        </div>
        <div class="form-info">
          <!-- 计算结果 -->
          <div class="title">{{ lanText.text5 }}</div>
          <template v-if="categoryType === 1">
            <div class="m-list">
              <!-- 开仓保证金 -->
              <div class="left">{{ lanText.text6 }}</div>
              <div class="right">{{ thousandsComma(openMargin) }} {{ marginCoin }}</div>
            </div>
            <div class="m-list">
              <!-- 收益额 -->
              <div class="left">{{ lanText.text7 }}</div>
              <div class="right">{{ thousandsComma(revenue) }} {{ marginCoin }}</div>
            </div>
            <div class="m-list">
              <!-- 回报率 -->
              <div class="left">{{ lanText.text8 }}</div>
              <div class="right">{{ thousandsComma(reportRate) }} %</div>
            </div>
          </template>
          <div class="m-list" v-if="categoryType === 2">
            <!-- 平仓价格 -->
            <div class="left">{{ lanText.text9 }}</div>
            <!-- 无法达到该收益率 -->
            <div class="right" v-if="closePrice === 'none'">{{ lanText.text10 }}</div>
            <div class="right" v-else>{{ thousandsComma(closePrice) }} {{ priceUnit }}</div>
          </div>
          <div class="m-list" v-if="categoryType === 3">
            <!-- 强平价格 -->
            <div class="left">{{ lanText.text11 }}</div>
            <div class="right">
              {{ forceClosePrice }}
              <template v-if="forceClosePriceNUm"> {{ priceUnit }} </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/calculator/calculator";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/calculator/calculator.styl";
import formInput from "./form-input.vue";

export default {
  mixins: [mixin],
  components: {
    formInput,
  },
  mounted() {
    // this.init();
  },
};
</script>
<style scoped>
/* 2022.12.28 样式修改 */
.m-tab {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  padding: 12px 28px;
  text-transform: capitalize;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-Divider);
  margin-bottom: 12px;
}
.m-tab > .item {
  margin-right: 20px;
  position: relative;
  box-sizing: border-box;
  height: 18px;
  line-height: 18px;
  cursor: pointer;
  user-select: none;
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
  bottom: -12px;
  width: 0;
  height: 3px;
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 14px) 100% no-repeat;
}
.m-tab > .item.active::after {
  width: 100%;
}

.calculatorMode-box {
  padding-bottom: 28px;
  box-sizing: border-box;
  min-height: 500px;
  height: auto;
}
/deep/.dialog-frame-head {
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
}
.category-select-box {
  overflow: hidden;
}
.calculatorMode-box .category-select-box .tab {
  font-size: 14px;
  text-align: center;
}
.calculatorMode-box .category-select-box .tab.u-1-bg,
.calculatorMode-box .category-select-box .tab.u-4-bg {
  font-weight: 600;
  color: #ffffff;
}
.calculatorMode-box .category-select-box .tab.a-3-bg {
  /* background: var(--color-14); */
}

.m-addSub > .title {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
  color: var(--color-text-primary);
  margin-block: 16px 8px;
}
.m-addSub > .ct {
  height: 38px;
  background: var(--color-Input-fill);
  border: 1px solid var(--color-Input-border);
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.m-addSub > .ct > .input {
  width: calc(100% - 66px);
  color: var(--color-1);
  box-sizing: border-box;
  padding-left: 12px;
  font-size: 16px;
}
.m-addSub > .ct > .btn {
  width: 66px;
  display: flex;
  align-items: center;
}
.m-addSub > .ct > .btn > .item {
  width: 26px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-1);
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.m-addSub > .ct > .btn > .item:first-child {
  margin-right: 2px;
}

.drag-def {
  background: var(--color-Input-border);
}
.drag-def .drag-bar {
  background: var(--color-BTN-primary);
}
/deep/.select-price.m-input {
  margin-bottom: 16px;
}
/deep/.select-price.m-input .form-control {
  width: 284px;
  height: 40px;
  background: var(--color-Input-fill);
  border: 1px solid var(--color-Input-border);
  border-radius: 8px;
}
.calculatorMode-box .form-block {
  box-sizing: border-box;
}
/deep/.m-calculatorBtn {
  width: 288px;
  height: 50px;
  line-height: 50px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 20px;
  color: var(--color-BTN-disabled-text);
  background-color: var(--color-BTN-disabled-bg);
}
/deep/.m-calculatorBtn.u-8-bg {
  background-color: var(--color-BTN-primary);
  color: var(--color-BTN-primary-text);
}
/* /deep/.common-dialog .dialog-frame-body {
  margin: 0 18px;
} */
/deep/.m-input.select-price .form-control .unit {
  height: 38px;
  line-height: 38px;
  color: var(--color-text-primary);
}
/deep/.select-price .form-control span.title {
  color: var(--color-text-secondary);
}
.form-info {
  width: 264px;
  height: 422px;
  background: var(--color-BG-Light);
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
}
.form-info > .title {
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  color: var(--color-text-primary);
}
.m-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
}
.m-list > .left {
  color: var(--color-text-secondary);
}
.m-list > .right {
  color: var(--color-text-primary);
}
.b-1-cl {
  color: var(--color-1);
}

.lever-box .drag-step.a-5-bg {
  background-color: #226afd;
}
.max-can-open {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.transaction-drag i .mark {
  font-size: 14px;
}
.transaction-drag i.c-8-bg .mark {
  /* color: #226afd; */
}
</style>
