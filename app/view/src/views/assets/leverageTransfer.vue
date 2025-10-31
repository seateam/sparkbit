<template>
  <c-dialog
    class="leverageTransfer-container"
    :showFlag="transferFlag"
    :titleText="$t('assets.leverageTransfer.title')"
    :confirmLoading="transferConfirmLoading"
    :confirmDisabled="transferConfirmDisabled"
    @close="transferDialogClose"
    @confirm="transferDialogConfirm"
  >
    <div class="transfer-loadingBox" v-if="loading">
      <div class="transfer-loading"><c-loading size="50" /></div>
    </div>
    <section class="transfer-box" v-else>
      <c-select
        :promptText="$t('futures.transfer.coin')"
        :value="transferCoin"
        :options="calCoinList"
        :errorHave="true"
        width="100%"
        @onChanges="transferCoinChange"
      />
      <!-- <div class="transfer-mess a-4-bg">
        <div class="even">
          <c-redio
            :value="transferCoin === transferObj.baseCoin"
            :name="transferObj.baseCoin"
            @click="transferCoinChange"
          />
          <span class="key e-1-cl" @click="transferCoinChange(transferObj.baseCoin)">
            {{ getShowCoin(transferObj.baseCoin) }}
          </span>
        </div>
        <div class="even">
          <c-redio
            :value="transferCoin === transferObj.quoteCoin"
            :name="transferObj.quoteCoin"
            @click="transferCoinChange"
          />
          <span class="key e-1-cl" @click="transferCoinChange(transferObj.quoteCoin)">
            {{ getShowCoin(transferObj.quoteCoin) }}
          </span>
        </div>
      </div> -->
      <!-- 方向 -->
      <ul class="transfer-content">
        <li class="transfer-page">
          <!-- 从 -->
          <div class="transfer-page-side">{{ $t("assets.otcAccount.from") }}</div>
          <div class="transfer-page-name e-1-cl">{{ side.from }}</div>
        </li>
        <li class="transfer-icon" @click="setTransferSide">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 24 20" fill="none">
              <path d="M7.2 19.5L5.52 17.8078L8.61 14.75H0V12.375H8.61L5.52 9.31719L7.2 7.625L13.2 13.5625L7.2 19.5ZM16.8 12.375L10.8 6.4375L16.8 0.5L18.48 2.19219L15.39 5.25H24V7.625H15.39L18.48 10.6828L16.8 12.375Z" fill="#928BFF"/>
            </svg>
          </li>
        <li class="transfer-page">
          <!-- 划转到 -->
          <div class="transfer-page-side">{{ $t("assets.otcAccount.to") }}</div>
          <div class="transfer-page-name e-1-cl">{{ side.to }}</div>
        </li>
      </ul>
      <!-- 划转数量 -->
      <c-inputLine
        name="transferValue"
        :value="transferValue"
        :promptText="$t('assets.otcAccount.volume')"
        :errorHave="true"
        :errorFlag="transferError"
        :errorText="$t('assets.otcAccount.volumeError')"
        :warningText="transferWarningText"
        @onchanges="inputLineChange"
        class="transfer_input_class"
      >
        <!-- 全部 -->
        <c-button type="text" height="30px" @click="allTransfer">
          {{ $t("assets.otcAccount.all") }}
        </c-button>
      </c-inputLine>
    </section>
  </c-dialog>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/leverageTransfer/leverageTransfer";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/leverageTransfer/leverageTransfer.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.transfer_input_class /deep/.common-button-slot{
  color: var(--color-BTN-primary);
}
.transfer-box /deep/.input-line-content .input-line-errorStence {
  margin-top: 4px;
}
</style>
