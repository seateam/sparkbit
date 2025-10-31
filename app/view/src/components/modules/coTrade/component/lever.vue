<!-- 杠杆 -->
<template>
  <c-dialog
    paddingBottom="14px"
    :titleText="dialogTitle"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :confirmText="confirmText"
    @close="close"
    @confirm="submitLeverage">
    <div class="lever-box" :class="{ 'no-drop': !levelSwitch }">
      <label class="label">
        <!-- 杠杆倍数 -->
        {{lanText.text1}}
      </label>
      <div class="add-and-sub a-3-bd" :class="inputActiveClass">
        <div class="content">
          <input
            class="b-1-cl"
            type="text"
            v-model="leverage"
            :disabled="!levelSwitch"
            @focus="inputActiveClass = 'a-12-bd'"
            @blur="inputActiveClass = 'a-3-bd'"
          />
        </div>
        <div v-if="false" class="options">


          <a class="add a-3-bd" @click="add">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 9C3.5 8.58579 3.83579 8.25 4.25 8.25H14.75C15.1642 8.25 15.5 8.58579 15.5 9C15.5 9.41421 15.1642 9.75 14.75 9.75H4.25C3.83579 9.75 3.5 9.41421 3.5 9Z" fill="#686868"/>
            </svg>
            <!--<i>-->
            <!--  <svg class="icon icon-14 hover-show" aria-hidden="true">-->
            <!--    <use xlink:href="#icon-a_11" />-->
            <!--  </svg>-->
            <!--  <svg class="icon icon-14  hover-hide" aria-hidden="true">-->
            <!--    <use xlink:href="#icon-a_11_1" />-->
            <!--  </svg>-->
            <!--</i>-->
          </a>
          <a class="sub a-3-bd" @click="subtract">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49951 3C9.91372 3 10.2495 3.33579 10.2495 3.75V14.25C10.2495 14.6642 9.91372 15 9.49951 15C9.0853 15 8.74951 14.6642 8.74951 14.25V3.75C8.74951 3.33579 9.0853 3 9.49951 3Z" fill="#686868"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 9C3.5 8.58579 3.83579 8.25 4.25 8.25H14.75C15.1642 8.25 15.5 8.58579 15.5 9C15.5 9.41421 15.1642 9.75 14.75 9.75H4.25C3.83579 9.75 3.5 9.41421 3.5 9Z" fill="#686868"/>
            </svg>
            <!--<i>-->
            <!--  <svg class="icon icon-14  hover-show" aria-hidden="true">-->
            <!--    <use xlink:href="#icon-a_11" />-->
            <!--  </svg>-->
            <!--  <svg class="icon icon-14  hover-hide" aria-hidden="true">-->
            <!--    <use xlink:href="#icon-a_11_1" />-->
            <!--  </svg>-->
            <!--</i>-->
          </a>
        </div>
      </div>
      <div class="transaction-drag" ref="dragStepWrap" @click.stop="onmousedownCick">
        <!-- transition -->
        <span
          class="drag-step"
          @mousedown="onmousedown"
          ref="dragStep"
          :style="{ left: stepPosition + '%', marginLeft: stepPosition == 0 ? '0px': stepPosition == 100 ? '-12px':'0px'}">
        </span>
        <span class="drag-def a-3-bg">
          <em
            class="drag-bar c-8-bg" :style="{ width: stepPosition + '%' }">
          </em>
        </span>
        <i
          class="a-6-bd drag-step0"
          @click.stop="dragStep(0)" :style="{ left: '1%' }">
          <b class="mark">1X</b>
        </i>
        <i
          v-for="index in 5"
          :key="index"
          @click.stop="dragStep(index)"
          :style="{ left: parseInt(index * 20) + '%' }"
          :class="{'next-step': stepPosition > parseInt((index-1) * 20) && stepPosition <= parseInt(index * 20)}">
          <b class="mark">{{ nulFun(index, itemLvaue) }}X</b>
        </i>
      </div>
      <div class="max-can-open f-6-cl" v-if="isShowUserMaxLevel">
        <!-- 当前持仓最高支持杠杆 -->
        *{{lanText.text2}}
        {{userMaxLevel}}X
      </div>
      <!-- 当前杠杆最大可开多/开空 -->
      <div class="max-can-open">
        <div class="title">
          <!-- 当前杠杆最高可持有仓位上限约 -->
          {{lanText.text3}}
        </div>
        <span class="subTxt"> {{ thousandsComma(maxNumber) }} {{coUnit}} </span>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/lever/lever';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/lever/lever.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.b-1-cl {
  color: var(--color-1);
}
.lever-box .label {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--color-text-primary);
}
.lever-box .add-and-sub .options {
  display: flex;
  align-items: center;
  width: auto;
}
.lever-box .add-and-sub .options .add {
  margin-right: 6px;
}
.lever-box .add-and-sub {
  background: var(--color-Input-fill);
  box-sizing: border-box;
  padding: 0 16px;
}
.drag-def {
  background: var(--color-Input-border);
}
.drag-def .drag-bar {
  background: var(--color-BTN-primary);
}
.max-can-open {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.max-can-open>.label {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: var(--color-text-primary);
}
.max-can-open .title, .max-can-open .subTxt {
  font-size: 16px;
  color: var(--color-text-primary);
}
.lever-box .transaction-drag i .mark {
  font-size: 14px;
}
.lever-box .transaction-drag i.c-8-bg .mark {
  /* color: #226afd; */
}
</style>
