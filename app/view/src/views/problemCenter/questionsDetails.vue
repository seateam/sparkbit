<template>
  <section class="questionsDetails">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl" />
    <div class="title f-1-cl a-3-bd">{{ $t("questions.details") }}</div>
    <div class="content">
      <div class="message clearfix">
        <div class="message-even">
          <!-- 提问时间 -->
          <div class="message-even-title">{{ $t("questions.list1") }}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.ctime | setTime }}</div>
        </div>
        <div class="message-even">
          <!-- 类型 -->
          <div class="message-even-title">{{ $t("questions.list3") }}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.rqTypeName || "--" }}</div>
        </div>
      </div>
      <div class="message clearfix">
        <div class="message-even">
          <!-- 编号 -->
          <div class="message-even-title">{{ $t("questions.list2") }}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.id || "--" }}</div>
        </div>
        <div class="message-even">
          <!-- 状态 -->
          <div class="message-even-title">{{ $t("questions.list5") }}</div>
          <div class="message-even-text f-1-cl">
            {{ rqInfoData.rqStatusName || "--" }}
          </div>
        </div>
      </div>
      <div class="message clearfix">
        <div class="message-even">
          <!-- 描述 -->
          <div class="message-even-title">{{ $t("questions.list4") }}</div>
          <div class="message-even-text message-even-mess f-1-cl">
            {{ rqInfoData.rqDescribe || "--" }}
          </div>
        </div>
      </div>
      <div class="message clearfix" v-if="rqInfoData.imageDataStr">
        <div class="message-even">
          <!-- 附件 -->
          <div class="message-even-title">{{ $t("questions.fj") }}</div>
          <div class="message-even-imgBox a-2-bd">
            <img :src="rqInfoData.imageDataStr" alt="" />
          </div>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in reInfoList" :key="index">
          <data class="label">
            {{ item.userType === 1 ? $t("questions.sendType1") : $t("questions.sendType2") }}
          </data>
          <c-textAreaLine
            marginTop="20px"
            :key="index"
            :disabled="true"
            :errorHave="true"
            :value="item.replayContent"
            :warningText="item.ctime | setTime"
          />
        </div>
        <div class="label">{{ $t("questions.typeSend") }}</div>
        <c-textAreaLine
          :value="sendText"
          maxLength="1000"
          marginTop="0px"
          @onchanges="inputLineChange"
          :errorHave="true"
          :warningText="`${sendText.length}/1000`"
        />
      </div>
      <div style="text-align: center">
        <c-button
          marginTop="20px"
          height="50px"
          @click="submit"
          :disabled="buttonDisabled"
          :loading="buttonLoading"
          paddingW="24px"
          >{{ $t("questions.summit") }}</c-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/questionsDetails/questionsDetails";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/problemCenter/questionsDetails/questionsDetails.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.questionsDetails .message {
  overflow: hidden;
}
.questionsDetails .message-even-imgBox {
  border-color: var(--color-BTN-primary);
}
.questionsDetails .message-even-imgBox img {
  object-fit: contain;
}
/deep/.area-line-content .input-line-baseStance {
  padding-top: 0;
  border: none;
}
/deep/.area-line-content .input_line_inp {
  height: 50px;
}
/deep/.area-line-content .input_line_inp textarea {
  /* height: 50px !important; */
  padding: 16px;
  border-radius: 8px;
  /* border: 1px solid var(--color-Input-border); */
  background: var(--color-input-fill-on-light-bg);
  box-sizing: border-box;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
}
/deep/.area-line-content .input_line_inp .area-icon,
/deep/.area-line-content .input-line-activeLine {
  display: none;
}
.questionsDetails .label {
  color: var(--color-text-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
}
.questionsDetails .uploadImg {
  border-color: var(--color-BTN-primary);
  background: var(--color-BG-Light-Purple);
}
.questionsDetails .common-button {
  margin-inline: auto;
  border-radius: 100px;
}
.questionsDetails .common-button.common-button-solid-disabled {
  background: var(--color-BTN-disabled-bg);
  border-radius: 100px;
  color: var(--color-BTN-disabled-text);
}
</style>
