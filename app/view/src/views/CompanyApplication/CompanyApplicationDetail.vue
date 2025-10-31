<template>
  <div v-if="moduleShow" class="company-application-page CompanyApplicationDetail">
    <div class="company-application a-5-bg">
      <c-Breadcrumb :routes="routes"/>
      <div class="title">{{ $t('fiatdeal.become') }}</div>
      <div class="company-application-bar">
        <div class="application-header a-3-bd">
          <div class="application-step b-2-cl">
            <template v-for="(item, inx) in stepProgress" >
              <span
                class="step-icon medium"
                :class="actived(item.status)"
                :key="`stepProgress${inx}`">
                {{inx + 1}}</span>
              <span class="step-text" :key="`text${inx}`" :class="actived(item.status)">{{item.text}}</span>
              <span
                class="setp-line a-3-bd"
                :key="`stepProgressLine${inx}`"></span>
                <!-- v-if="lineShow(inx, stepProgress.length)" -->
              </template>
              <span class="step-icon medium" :class="actived(3)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.55156 17.9996L3.85156 12.2996L5.27656 10.8746L9.55156 15.1496L18.7266 5.97461L20.1516 7.39961L9.55156 17.9996Z" :fill="actived(3) === 'a-12-bg' ? '#ffffff' : '#999999'"/>
                </svg>
              </span>
          </div>
          <!-- <h1 class="application-title b-1-cl">{{headerTitle}}
            <span class="b-2-cl title-desc" v-if="applyStatus !== 1">{{headerDesc}}</span>
          </h1> -->
        </div>
        <div v-if="companyStatus === 2 && (applyRuleStatus === 1 || applyRuleStatus === 3)">
          <template v-if="applyStatus === 0
          || (applyStatus === 3 && applyRuleStatus === 1)
          || (applyRuleStatus === 1 && applyStatus === 2 && companyStatus === 2)">
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{$t('application.companySuper.unApply.stepOne.title')}}
              </h2>
              <p class="b-1-cl step-desc">
                {{$t('application.companySuper.unApply.stepOne.desc')[0]}}
                {{normalCompanyMarginNum}}
                {{marginCoinSymbol}}
                {{$t('application.companySuper.unApply.stepOne.desc')[1]}}
              </p>
            </div>
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{$t('application.companySuper.unApply.stepTwo.title')}}
              </h2>
              <p class="b-1-cl step-desc">
                {{$t('application.companySuper.unApply.stepTwo.desc')[0]}}
              </p>
            </div>
          </template>
          <div class="step a-3-bd" v-if="applyStatus === 1">
            <p class="b-2-cl step-desc sort">
              {{$t('application.companySuper.applying.desc')[0]}}<br/><br/>
              {{$t('application.companySuper.applying.desc')[1]}} {{normalCompanyMarginNum}}
              {{marginCoinSymbol}}{{$t('application.companySuper.applying.desc')[2]}}<br/><br/>
              {{$t('application.companySuper.applying.desc')[3]}}
            </p>
          </div>
          <div class="step a-3-bd" v-if="applyStatus === 3 && applyRuleStatus === 3
          || applyStatus === 2 && applyRuleStatus === 3">
            <p class="b-2-cl step-desc sort" v-html="$t('application.companySuper.applied.desc')">
            </p>
          </div>
        </div>
        <div v-else-if="applyRuleStatus === 0 || companyStatus === 1">
          <template v-if="applyStatus === 0 || (applyRuleStatus === 0 && applyStatus !== 1)">
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{ $t("replenish.companyApplication.Step1") }}
              </h2>
              <p class="step-desc b-1-cl" v-html="$t('replenish.companyApplication.Step1Text')"></p>
            </div>
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{ $t("replenish.companyApplication.Step2") }}
              </h2>
              <p class="step-desc b-4-cl">
                <span class="b-1-cl">{{ $t("replenish.companyApplication.Step2Text1") }}  </span>
                <a href="javascript:;" class="b-4-cl" v-on:click="copyMail(serverEmail)">{{ serverEmail }}</a>
                <span class="b-1-cl">{{ $t("replenish.companyApplication.Step2Text2") }}</span>
              </p>
            </div>
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{ $t("replenish.companyApplication.Step3") }}
              </h2>
              <p class="b-1-cl step-desc">
                {{ $t("replenish.companyApplication.Step3Text1") }}
              </p>
            </div>
            <div class="step a-3-bd">
              <h2 class="b-2-cl step-title">
                {{ $t("replenish.companyApplication.Step4") }}
              </h2>
              <p class="b-1-cl step-desc" v-html="$t('replenish.companyApplication.Step4Text')"></p>
            </div>
          </template>
          <div class="step a-3-bd" v-if="applyStatus === 1">
            <p class="b-1-cl step-desc sort" v-html="$t('application.company.applying.desc')"></p>
          </div>
          <div class="step a-3-bd" v-if="(applyStatus === 3 && applyRuleStatus !== 0)
          || (applyRuleStatus === 1 && applyStatus === 2)">
            <p class="b-1-cl step-desc sort" v-html="$t('application.company.applied.desc')"></p>
          </div>
        </div>
        <div class="application-region">
          <p class="option-region e-2-c b-2-cl"
             v-if="btnShow">
            <c-checkBox :value="textFlag" @click="checkoutClick" style="margin-right: 12px;"/>
            {{$t('application.applyRegion.options')[0]}}
            <span class="b-4-cl">
              {{normalCompanyMarginNum}}
              {{marginCoinSymbol}}
            </span>
            {{$t('application.applyRegion.options')[1]}}
          </p>
          <div class="btn-region b-4-cl">
            <c-button
              v-if="(applyStatus === 3 && applyRuleStatus === 1 && companyStatus === 2)
              || (applyStatus === 2 && applyRuleStatus === 1 && companyStatus === 2)
              || (applyStatus === 1 && applyRuleStatus === 0)
              || (applyStatus === 1 && applyRuleStatus === 1)"
              :big="true"
              @click="back"
              type="text"
              className="back-btn"
              paddingW="24px"
              height="50px">{{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.goHall')
                : $t('application.applyRegion.appliedBtn')}}
            </c-button>
            <c-button
              v-if="applyRuleStatus === 0
              && (applyStatus === 2 || applyStatus === 0 || applyStatus === 3)"
              :big="true"
              @click="relieveClick"
              type="text"
              className="back-btn"
              paddingW="24px"
              height="50px">{{this.$t('application.applyRegion.cancelBtn')}}
            </c-button>
            <c-button
              v-if="btnShow"
              height="50px"
              :loading="submitLoading"
              :disabled="submitDisabled"
              @click="submit"
              paddingW="24px">{{$t('application.applyRegion.applyBtn')}}
            </c-button>
            <c-button
              v-if="applying"
              height="50px"
              :disabled="true"
              paddingW="24px">{{$t('application.applyRegion.applingBtn')}}
            </c-button>
            <c-button
              v-if="allPass"
              height="50px"
              @click="back"
              paddingW="24px">{{
                fiatTradeOpen
                ? $t('assets.b2c.otcShow.goHall')
                : $t('application.applyRegion.appliedBtn')}}
            </c-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/CompanyApplicationDetail/CompanyApplicationDetail';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/CompanyApplicationDetail/CompanyApplicationDetail.styl';

export default {
  mixins: [mixin],
  computed: {
    serverEmail() {
      return this.$store.state.systemConfig.serverEmail;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.company-application-page {
  min-height: 800px;
  background: var(--color-BG);
}
.company-application .breadcrumb-wrap {
  width: 82.4vw;
  margin-inline: auto;
}
.company-application .company-application-bar {
  width: 904px;
  padding: 28px 28px 40px;
  margin-inline: auto;
  border-radius: 12px;
  background: var(--color-BG-Light);
}
.btn-region {
  display: flex;
  justify-content: center;
}
.btn-region .common-button {
  min-width: 147px;
  border-radius: 100px;
}
.btn-region .common-button.common-button-solid-disabled {
  background: var(--color-BTN-disabled-bg);
  color: var(--color-BTN-disabled-text);
}
.btn-region .common-button.back-btn {
  border: 1px solid var(--color-BTN-secondary-border);
  color: var(--color-BTN-text-secondary-revert);
}
.company-application /deep/.common-checkout, .company-application /deep/.common-checkout img {
  width: 20px;
  height: 20px;
}
</style>
