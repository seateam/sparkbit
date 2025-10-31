<template>
  <c-dialog
    :titleText="`${$t('components.dialog.confirmText')}${$t('header.order')}`"
    :confirmText="$t('components.dialog.confirmText')"
    :closeText="$t('components.dialog.closeText')"
    :showFlag="isShowConfirmDialog"
    :confirmLoading="confirmLoading"
    @close="handlerClose"
    @confirm="handlerConfirm"
    class="m-confirmDialog"
    :haveOption="false"
  >
    <div class="m-info">
      <div class="item">Spot</div>
      <div class="item">
        {{ dialogContent.symbolCurrent
        }}<span
          class="type"
          :class="{ buy: dialogContent.side == 'BUY', sell: dialogContent.side == 'SELL' }"
          >({{ dialogContent.side }})</span
        >
      </div>
    </div>
    <div class="m-info">
      <!--类型-->
      <div class="item">{{ $t("broker.type") }}</div>
      <div class="item">{{ dialogContent.type }}</div>
    </div>
    <div class="m-info">
      <!--价格-->
      <div class="item">{{ $t("trade.price") }}</div>
      <div class="item" style="color: #ff0000">
        {{
          transactionType === 2
            ? $t("trade.mPriceBuy")
            : dialogContent.price + " " + symbolUnit.units
        }}
      </div>
    </div>
    <div class="m-info" v-if="transactionType === 1">
      <!--数量-->
      <div class="item">{{ $t("futures.coFlowingWater.amount") }}</div>
      <div class="item" style="color: #ff0000">
        {{ dialogContent.volume }} {{ symbolUnit.symbol }}
      </div>
    </div>
    <!--市价-->
    <div class="m-info" v-if="transactionType === 2">
      <!--数量-->
      <div class="item">{{ $t("trade.dealMoney") }}</div>
      <div class="item" style="color: #ff0000">
        {{ dialogContent.volume }}
        {{ dialogContent.side == "BUY" ? symbolUnit.units : symbolUnit.symbol }}
      </div>
    </div>
    <div class="m-info" v-if="transactionType === 1">
      <!--金额-->
      <div class="item">{{ $t("trade.dealMoney") }}</div>
      <div class="item" style="color: #ff0000">
        {{ dialogContent.amount }} {{ symbolUnit.units }}
      </div>
    </div>
    <div class="m-btnGroup">
      <div class="btn" style="margin-right: 20px" @click="handlerClose">
        {{ $t("components.dialog.closeText") }}
      </div>
      <div class="btn active" :class="{ confirmLoading: confirmLoading }" @click="handlerConfirm">
        {{ $t("components.dialog.confirmText") }}
      </div>
    </div>
  </c-dialog>
</template>

<script>
export default {
  name: "confirmDialog",
  props: {
    transactionType: {},
    dialogContent: {}, // 二次确认信息
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/deep/.m-confirmDialog {
  border-radius: 2px;
}

/deep/.m-confirmDialog .dialog-frame {
  background: #161925;
}
/deep/.m-confirmDialog .dialog-frame-head {
  background: #161925;
}
.m-btnGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px;
  padding-bottom: 44px;
}
.m-btnGroup > .btn {
  width: 202px;
  height: 50px;
  line-height: 50px;
  border: 2px solid var(--mainColor);
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: var(--mainColor);
  text-align: center;
  cursor: pointer;
}
.m-btnGroup > .btn.active {
  background: var(--mainColor);
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}
.m-btnGroup > .btn.confirmLoading {
  cursor: wait;
}
.m-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 16px;
}
.m-info:last-child {
  margin-bottom: 40px;
}
.m-info > .item > .type.sell {
  color: #ff2500;
}
.m-info > .item > .type.buy {
  color: rgb(0, 204, 153);
}
/* 改，2022.11.22 修改弹窗按钮样式 */
/deep/.common-dialog .closeBtnClass {
  background-color: transparent;
  color: #ffffff;
}
</style>
