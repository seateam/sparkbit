<template>
  <div class="free-staking-detail" v-if="projectDetail">
    <c-Breadcrumb :routes="routes" />
    <div class="free-staking-detail-wrap">
      <div class="m-head">
        <div class="free-staking-header">
          <div class="project-logo-wrap">
            <div
              class="project-logo"
              @mouseover="showCurrencyModal"
              @mouseleave="hideCurrencyModal"
            >
              <div class="logo-box">
                <img
                  class="logo"
                  :src="projectDetail.logo"
                  @error="$event.target.style.display = 'none'"
                  alt=""
                />
              </div>
              <transition name="fade">
                <div class="popup-cont" v-show="currencyModalState">
                  <Popup :coinSymbolIntroduce="projectDetail"></Popup>
                </div>
              </transition>
            </div>
            <div class="project-info">
              <div class="project-title">
                {{ projectDetail.name }}
                <span class="f-2-cl">{{ projectDetail.title }}</span>
              </div>
            </div>
          </div>
          <div class="project-range">{{ projectDetail.gainRate }}%</div>
          <div class="project-range-text f-2-cl">
            {{ $t("freeStaking.home.gainRate") }}
          </div>
          <div class="nav-active">
            <c-button height="40px" @click="navMyPos()">
              <div class="nav-active-text">{{ $t("freeStaking.home.myholdings") }}</div>
            </c-button>
            <c-button width="150px" height="40px" @click="goBackHome" v-if="projectDetail.url">
              <div class="nav-active-text">{{ $t("freeStaking.home.notice") }}</div>
            </c-button>
          </div>
          <div v-if="projectDetail.projectType === 3">
            <div class="m-processLine">
              <div
                class="item"
                v-for="(item, index) in projectStatus"
                :key="item.title"
                :class="{ active: item.active }"
              >
                <div class="num">{{ index + 1 }}</div>
                <div class="info">
                  <div class="process-line-text">{{ item.title }}</div>
                  <div class="process-line-date">{{ item.datetime }}</div>
                </div>
                <img v-if="item.active" :src="imgMap.process" />
                <img v-else :src="imgMap.no_process" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-content">
        <!--projectDetail.projectType === 3-->
        <div class="project-status-cont" v-if="projectDetail.projectType === 3">
          <!--<div class="process-line-cont" v-if="false">-->
          <!--  <div-->
          <!--    class="process-line"-->
          <!--    v-for="(item, index) in projectStatus"-->
          <!--    :key="item.title"-->
          <!--  >-->
          <!--    <div class="process-linel">-->
          <!--      <div-->
          <!--        class="process-line-circle f-8-cl"-->
          <!--        :class="item.active ? 'f-4-bg' : 'c-5-bg'"-->
          <!--      >-->
          <!--        {{ index + 1 }}-->
          <!--      </div>-->
          <!--      <div class="process-line-text f-2-cl">{{ item.title }}</div>-->
          <!--      <div class="process-line-date f-2-cl">{{ item.datetime }}</div>-->
          <!--    </div>-->
          <!--    <div-->
          <!--      class="process-liner c-5-bg"-->
          <!--      v-if="projectStatus.length !== index + 1"-->
          <!--    >-->
          <!--      <div-->
          <!--        v-if="item.active"-->
          <!--        :style="lineStatusStyle(index, item)"-->
          <!--        class="process-liner-fill c-8-bg"-->
          <!--      ></div>-->
          <!--    </div>-->
          <!--    <div class="clearfix"></div>-->
          <!--  </div>-->
          <!--</div>-->
          <!-- 隐藏 -->
          <!--<div class="process-rate">-->
          <!--  <div class="process-title">-->
          <!--    <div class="titlel f-2-cl">-->
          <!--      {{ $t("freeStaking.home.lockProgress") }}-->
          <!--    </div>-->
          <!--    <div class="titler f-2-cl">-->
          <!--      {{ $t("freeStaking.detail.lockAllNum") }}-->
          <!--    </div>-->
          <!--    <div class="clearfix"></div>-->
          <!--  </div>-->
          <!--  <div class="process-rate-line c-5-bg">-->
          <!--    <div-->
          <!--      class="process-rate-line-fill c-8-bg"-->
          <!--      :style="`width:${projectDetail.progress}`"-->
          <!--    ></div>-->
          <!--  </div>-->
          <!--  <div class="process-value">-->
          <!--    <div class="valuel">{{ projectDetail.progress }}</div>-->
          <!--    <div class="valuer">-->
          <!--      {{ projectDetail.raiseAmount }} {{ projectDetail.shortName }}-->
          <!--    </div>-->
          <!--    <div class="clearfix"></div>-->
          <!--  </div>-->
          <!--</div>-->
          <div class="user-buyed-income" v-if="isShowBlock([3, 4, 5])">
            <div class="user-income-item">
              <div class="user-income-title f-2-cl">
                {{ $t("freeStaking.detail.userLocked") }}
              </div>
              <div class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{ totalAmount }}</div>
              <div class="f-1-cl coin">{{ projectDetail.shortName }}</div>
            </div>
            <div class="user-income-item">
              <div class="user-income-title f-2-cl">
                {{ $t("freeStaking.detail.totalGainAmount") }}
              </div>
              <div class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">
                {{ totalGainAmount }}
              </div>
              <div class="f-1-cl coin">{{ projectDetail.gainCoin }}</div>
            </div>
            <div class="user-income-item noborder">
              <div class="user-income-title f-2-cl">
                {{ $t("freeStaking.detail.totalUserGainAmount") }}
              </div>
              <div class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">
                {{ totalUserGainAmount }}
              </div>
              <div class="f-1-cl coin">{{ projectDetail.gainCoin }}</div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="user-buy" v-if="isShowBlock([1, 2])">
            <!-- <div class="user-buy-title f-2-cl">
              {{ $t("freeStaking.detail.userLocked") }}
            </div>
            <div class="user-lock-account">
              <span class="num" :class="isLogin ? 'f-4-cl' : 'f-2-cl'">{{ projectDetail.userCurrentAmount }}</span>
              <span class="f-1-cl">{{ projectDetail.shortName }}</span>
            </div> -->
            <div class="user-lock-input" v-if="isShowBlock([1]) && projectDetail.isShowBuy">
              <div class="title-wrap">
                <div class="user-lock-title">
                  {{ lockMinNumText }}
                </div>
                <div class="user-account-num">
                  <span>{{ $t("trade.balance") }}&nbsp;</span>
                  <span>
                    {{ userBalance }}
                    {{ projectDetail.shortName }}
                  </span>
                </div>
              </div>
              <div class="user-input">
                <c-inputLine
                  marginTop="0px"
                  name="lockNumber"
                  :value="lockNumber | userInputLockFix"
                  @onchanges="inputChanges"
                  :disabled="!isLogin"
                ></c-inputLine>
                <div class="user-account-coin">{{ projectDetail.shortName }}</div>
                <div class="user-account-all" @click="autoFillCoin">MAX</div>
              </div>
            </div>
            <div class="user-income">
              <div class="user-name">
                {{ userIncomeTitle }}
              </div>
              <div style="margin-top: 8px">
                <span class="num">
                  <!--{{ userFeatureIncome }}-->
                  {{ projectDetail.almostUserGainAmount || 0 }}
                </span>
                <span class="coin">{{ projectDetail.gainCoin }}</span>
              </div>
            </div>
          </div>
          <div class="project-warning" v-html="projectDetail.details"></div>
          <div class="user-submit" v-if="isShowBlock([1]) && projectDetail.isShowBuy">
            <div class="check-wrap">
              <c-checkBox :value="userAgress" @click="checkoutHandle" />
              <span class="text f-2-cl" @click="changeUserAgreeState">{{
                $t("freeStaking.detail.rulesDangers")
              }}</span>
            </div>
            <div class="submit-btn">
              <c-button
                :disabled="!userAgress"
                width="165px"
                height="50px"
                @click="submitUserPos"
                >{{ isLogin ? $t("freeStaking.detail.agreePOS") : $t("trade.loginReg") }}</c-button
              >
            </div>
          </div>
        </div>
        <div class="project-status-cont" v-else>
          <div class="user-buyed-income">
            <div class="user-income-item">
              <div class="user-income-title f-2-cl">
                {{ $t("freeStaking.detail.totalGainAmount") }}
              </div>
              <div class="f-2-cl num">
                {{ totalGainAmount }}
              </div>
              <div class="f-2-cl coin">{{ projectDetail.gainCoin }}</div>
            </div>
            <div class="user-income-item noborder">
              <div class="user-income-title f-2-cl">
                {{ $t("freeStaking.detail.totalUserGainAmount") }}
              </div>
              <div class="f-2-cl num">
                {{ totalUserGainAmount }}
              </div>
              <div class="f-2-cl coin">{{ projectDetail.gainCoin }}</div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="project-warning" v-html="projectDetail.details"></div>
        </div>
      </div>
    </div>
    <div class="project-content c-4-bg mart-20" v-if="showActivityTable">
      <div class="project-content-title f-1-cl c-5-bd">
        <div class="titlel">{{ $t("freeStaking.detail.incomeDetail") }}</div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          class="c-4-bg"
          :loading="false"
          :columns="columns"
          :dataList="tableList"
          @elementClick="tableClick"
        />
      </div>
    </div>

    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmDisabled="confirmBtnFlag"
      :titleText="$t('login.SecurityVerification')"
    >
      <!-- 谷歌验证框 -->
      <c-inputLine
        v-if="userInfo && googleStatus === 1"
        max-length="6"
        name="googleVlaue"
        :promptText="googleVlaueForm.text"
        :errorHave="true"
        :errorFlag="googleErrorFlag"
        marginTop="0px"
        :value="googleVlaue"
        @onchanges="inputChanges"
      />
      <!-- 短信验证框 -->
      <c-inputLine
        v-if="userInfo && isOpenMobileCheck === 1"
        max-length="6"
        name="phoneCode"
        :promptText="checkPhione.text"
        :errorHave="true"
        :errorFlag="phoneErrorFlag"
        marginTop="0px"
        :value="phoneCode"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="checkPhione.haveCode"
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
    </c-dialog>
    <c-verify
      style="display: none"
      :colorMap="colorMap"
      v-if="verificationType === '2'"
      marginTop="6px"
      :errorHave="true"
      product="bind"
      @getCaptchaObj="getCaptchaObj"
      @callback="verifyCallBack"
    />
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/detail/detail";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/freeStaking/detail/detail.styl";
import { imgMap } from "@/utils";
import Popup from "./popup.vue";

export default {
  mixins: [mixin],
  components: {
    Popup,
  },
  data() {
    return {
      imgMap,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    calProcessWidth() {
      const projectStatus = this.projectStatus || [];
      let len = 0;
      len = projectStatus.filter((item) => item.active).length;
      if (len === 1) {
        return "10%";
      }
      if (len === projectStatus.length) {
        return "100%";
      }
      return `${10 + len * 20}%`;

      return "0%";
    },
  },
};
</script>
<style scoped>
.free-staking-detail {
  padding-top: 20px;
  width: 82.4vw;
  margin-inline: auto;
}
.free-staking-detail-wrap {
  /* margin: 20px 376px 100px; */
  width: 60.88vw;
  margin: 20px auto 100px;
  background: var(--color-BG-Light);
  border-radius: 12px;
}
.free-staking-detail-wrap,
.free-staking-detail .project-logo-wrap,
.user-lock-input .title-wrap {
  display: flex;
}
.free-staking-detail .project-logo-wrap {
  align-items: center;
}

.free-staking-detail .project-content .project-content-title,
.free-staking-detail .process-rate,
.free-staking-detail .process-rate .process-title,
.free-staking-detail .process-rate .process-value,
.free-staking-detail .user-buy .user-lock-input,
.free-staking-detail .user-buy .user-account {
  overflow: hidden;
}
.free-staking-detail .user-buy .user-lock-input .title-wrap {
  margin-block: 12px;
}
.free-staking-detail .process-line-cont .process-line .process-linel .process-line-circle {
  border-radius: 4px;
}
.free-staking-detail .user-buyed-income {
  overflow: hidden;
}
.free-staking-detail .project-content .project-content-title .titlel {
  color: var(--color-1);
  font-size: 32px;
  font-weight: 700;
}
.free-staking-detail {
  overflow: hidden;
  background: var(--color-BG);
}
.m-head {
  width: 368px;
  padding: 40px;
  border-right: 1px solid var(--color-Divider);
}
.free-staking-detail .project-content .project-status-cont {
}
.m-processLine {
  width: 32px;
  height: 304px;
  position: relative;
}

.m-processLine > .item {
  position: relative;
  z-index: 2;
  margin-bottom: 36px;
}
.m-processLine > .item img {
  position: absolute;
  left: 50%;
  top: -26px;
  transform: translateX(-50%);
  width: 3px;
  height: 18px;
}

.m-processLine > .item:first-child img {
  display: none;
}

.m-processLine > .item .num {
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-Toggle);
  line-height: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-processLine > .item .info {
  position: absolute;
  left: 44px;
  top: 50%;
  transform: translateY(-50%);
}
.m-processLine > .item.active .num {
  background: var(--mainColor);
  color: var(--color-BTN-primary-text);
}
.m-processLine > .item.active .process-line-text {
  color: var(--color-text-primary);
}
.free-staking-detail .process-rate .process-rate-line {
  width: 100%;
}
.free-staking-detail .process-rate .process-value,
.free-staking-detail .free-staking-header .project-info .project-title {
  color: var(--color-1);
}
.free-staking-detail .free-staking-header .project-info .project-title .f-2-cl {
  display: block;
}
.free-staking-detail .free-staking-header .project-range {
  margin-top: 24px;
  color: var(--color-text-primary);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}
.nav-active {
  border-radius: 6px;
}
.nav-active .common-button:first-child {
  min-width: 130px;
}
.free-staking-detail .project-content .project-content-title {
  border-color: var(--color-2);
}
.user-lock-account .f-1-cl {
  color: var(--color-1);
}
.process-line-text {
  width: auto;
  color: var(--color-text-secondary);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
}
.process-line-date {
  width: auto;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  margin-top: 4px;
  white-space: nowrap;
}

.free-staking-detail .user-input /deep/.input-line-content .input-line-baseStance {
  border: none !important;
}
.free-staking-detail
  .user-input
  /deep/.input-line-content
  .input-line-baseStance
  .input_line_inp
  .input {
  color: var(--color-text-primary) !important;
}

.submit-btn .common-button {
  border-radius: 100px;
}
</style>
