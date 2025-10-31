<!--
// *author: hdd
// *date：2020-09-10
// *des：资金划转
// */
 -->
<template>
  <div>
    <c-dialog
      :showFlag="isShow"
      :titleText="$t('futures.transfer.transfer')"
      @close="close"
      @confirm="dialogConfirm"
      :confirmLoading="dialogConfirmLoading"
      :confirmText="confirmText"
      :confirmDisabled="dialogConfirmDisabled"
    >
      <c-select
        :promptText="$t('futures.transfer.coin')"
        :value="axiosSymbol"
        :options="symbolList"
        :errorHave="true"
        width="100%"
        :filterable="true"
        @onChanges="symbolChange"
        class="transfer_select_class"
      />
      <section class="transfer-box">
        <!-- 方向 -->
        <ul class="transfer-content">
          <li class="transfer-page">
            <!-- 从 -->
            <div class="transfer-page-side">{{ $t("futures.transfer.from") }}</div>
            <div class="transfer-page-name b-1-cl">{{ side.from }}</div>
          </li>
          <li class="transfer-icon" @click="setTransferSide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
            >
              <path
                d="M7.2 19.5L5.52 17.8078L8.61 14.75H0V12.375H8.61L5.52 9.31719L7.2 7.625L13.2 13.5625L7.2 19.5ZM16.8 12.375L10.8 6.4375L16.8 0.5L18.48 2.19219L15.39 5.25H24V7.625H15.39L18.48 10.6828L16.8 12.375Z"
                fill="#928BFF"
              />
            </svg>
          </li>
          <li class="transfer-page">
            <!-- 划转到 -->
            <div class="transfer-page-side">{{ $t("futures.transfer.to") }}</div>
            <div class="transfer-page-name b-1-cl">{{ side.to }}</div>
          </li>
        </ul>
        <!-- 划转数量 -->
        <c-inputLine
          name="transferValue"
          :value="transferValue"
          :promptText="$t('futures.transfer.volume')"
          :errorHave="true"
          :errorFlag="transferError"
          :errorText="$t('futures.transfer.volumeError')"
          :warningText="transferWarningText"
          @onchanges="inputLineChange"
          class="transfer_input_class"
        >
          <!-- 全部 -->
          <c-button class="btn-all" type="text" height="30px" @click="allTransfer">
            {{ $t("futures.transfer.all") }}
          </c-button>
        </c-inputLine>
      </section>
    </c-dialog>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/transfer/transfer";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/components/transfer/transfer.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus" scoped>
.transfer-box {
    padding-bottom: 40px;
    .transfer-content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      margin-bottom: 24px;
      user-select: none;
      li {
        float: left;
      }
      .transfer-page {
        flex: 1;
        padding: 10px 16px;
        height: 50px;
        border-radius: 8px;
        border: 1px solid var(--color-Input-border);
        background: var(--color-Input-fill);
        box-sizing: border-box;
      }
      .transfer-page-side {
        color: var(--color-text-secondary);
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: 10px;
        margin-bottom: 4px
      }
      .transfer-page-name {
        color: var(--color-text-primary);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
      }
      .transfer-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-inline: 8px;
        border-radius: 100%;
        cursor: pointer;
        &:hover {
          background: var(--color-Hover);
        }
      }
    }
  }
</style>

<style lang="stylus">
.transfer_input_class {
  .input-line-baseStance {
    background: var(--color-Input-fill) !important;
  }
  .input {
    color: var(--color-1) !important
  }
  .input::placeholder {
    color: var(--color-1) !important
  }
  .common-button-text {
    color: var(--color-1)
  }

  /* 验证 */
  .common-geetest-baseStance {
    background: var(--color-Input-fill) !important;
  }
  .geetest_radar_btn {
    background: var(--color-Input-fill) !important;
  }
  .geetest_success_btn {
    background: var(--color-Input-fill) !important;
  }
}

/* 选择器 */
.transfer_select_class {
  .input_line_content {
    background: var(--color-Input-fill) !important;
  }
  .input_line_prompt {
    color: var(--color-1) !important
  }
  .icon-triangle-down {
    border-color: #ffffff !important
  }
  .input_line_inp {
    color: var(--color-1) !important
  }
}
</style>
<style scoped>
.transfer-box /deep/.input-line-content .input-line-errorStence {
  margin-top: 4px;
}
.transfer-box .transfer-content .transfer-page-name {
  color: var(--color-1);
}
/deep/.common-button.btn-all .common-button-slot {
  color: var(--color-Icon);
  font-size: 14px;
  font-style: normal;
  line-height: 18px;
}
</style>
