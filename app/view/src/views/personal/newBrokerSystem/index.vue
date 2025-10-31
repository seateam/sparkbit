<template>
  <div class="broker-system">
    <div class="broker-system-header a-3-bd clearfix">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="currentTab"
        :navTab="navTab"
        :lineHeight="lineHeight"
        :marginRight="marginRight"
        @currentType="currentType"
      />
    </div>
    <div class="broker-user-info a-7-bd" :style="customStyle">
      <!-- 用户名称 -->
      <div class="user-name">
        <!-- <div class="top b-2-cl">{{$t('assets.coAccount.accountRight')}}</div> -->
        <div class="top b-1-cl a-12-bd">{{ roleName }}</div>
        <div class="phone b-1-cl">{{ userName }}</div>
        <!-- 推广助手 -->
        <!-- <c-button class="invite-help b-4-cl" @click="currentType({ index: 5 })" type="text">
          {{ $t("brokerSystem.navTab[4]") }}
        </c-button> -->
      </div>
      <div class="user-text-bar">
        <!-- 直推返佣 -->
        <div class="user-text a-4-bg">
          <span class="title b-2-cl">{{ $t("brokerSystem.homeText[1]") }}</span>
          <span class="info b-1-cl">{{ scaleReturn }}</span>
        </div>
        <!-- 子经济分佣 -->
        <div class="user-text a-4-bg" v-if="scaleSub">
          <span class="title b-2-cl">{{ $t("brokerSystem.homeText[2]") }}</span>
          <span class="info b-1-cl">{{ scaleSub }}%</span>
        </div>
        <!-- 二级返佣 -->
        <div class="user-text a-4-bg" v-if="scaleSecond">
          <span class="title b-2-cl">{{ $t("brokerSystem.homeText[3]") }}</span>
          <span class="info b-1-cl">{{ scaleSecond }}%</span>
        </div>
      </div>
      <!-- 邀请链接 -->
      <div class="invite-box a-4-bg">
        <div class="invite-left">
          <!-- 我的邀请码： -->
          {{ $t("personal.userManagement.otherList.myInviteCod.text") }}
          <span class="b-1-cl">{{ inviteCode }}</span>
          <!-- 复制邀请码 -->
          <c-button marginTop="-11px" class="b-4-cl copy" type="text" @click="copy('code')">
            {{ $t("brokerSystem.otherText[2]") }}
          </c-button>
        </div>
        <div class="invite-right">
          <c-button marginTop="-11px" class="b-4-cl copy" type="text" @click="copy('link')">
            <!-- 复制邀请链接 -->
            {{ $t("brokerSystem.otherText[3]") }}
          </c-button>
        </div>
      </div>
    </div>
    <div class="broker-content">
      <overview v-show="currentTab === 1" :reqData="reqData" :reqReady="reqReady" />
      <Commission v-if="currentTab === 2" />
      <Lower v-if="currentTab === 3" />
      <TradeSearch v-if="currentTab === 4" />
      <Invite v-if="currentTab === 5" />
      <Studio v-if="currentTab === 6" />
    </div>
  </div>
</template>

<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/personal/newBrokerSystem/index/index';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/personal/newBrokerSystem/index/index.styl';
import overview from './overview.vue';
import Commission from './commission.vue';
import Lower from './lower.vue';
import TradeSearch from './tradeSearch.vue';
import Invite from './invite.vue';
import Studio from './studio.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    Commission,
    Lower,
    TradeSearch,
    Invite,
    overview,
    Studio,
  },
};
</script>
