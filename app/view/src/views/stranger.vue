<template>
  <div class="strangerPage">
    <div class="stranger">
      <div class="stranger-header clearfix">
        <div class="strangerbar">
          <div class="stranger-top clearfix">
            <div class="user-logo clearfix a-12-bg b-1-cl">
              <span v-show="!imageUrl" style="color: #edf4f8">{{ name }}</span>
              <img :src="imageUrl" v-show="imageUrl" />
            </div>
            <div class="user-name clearfix b-1-cl">
              <p>
                {{ otcNickName }}
              </p>
              <div class="user-info">
                <i class="a-5-bd" :class="loginStatus === 1 ? 'a-18-bg' : 'a-1-bg'"></i>
                {{ loginStatus === 1 ? $t("stranger.online") : $t("stranger.offline") }}
                <hr/>
                <div class="certification clearfix">
                  <ul>
                    <!--<li class="b-1-cl clearfix">-->
                    <!--  <svg v-if="authLevel === 1" class="icon icon-24" aria-hidden="true">-->
                    <!--    <use xlink:href="#icon-e_13_1"></use>-->
                    <!--  </svg>-->
                    <!--  <svg v-else class="icon icon-24" aria-hidden="true">-->
                    <!--    <use xlink:href="#icon-e_13"></use>-->
                    <!--  </svg>-->
                    <!--  <span-->
                    <!--    >{{ $t("stranger.identity")-->
                    <!--    }}{{ authLevel === 1 ? $t("stranger.already") : $t("stranger.never")-->
                    <!--    }}{{ $t("stranger.certification") }}</span-->
                    <!--  >-->
                    <!--</li>-->
                    <!--{{ mobileAuthStatus === 1 ? 'KYC Verified' : 'KYC Unverified' }}-->
                    <li class="b-1-cl clearfix">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                        <path d="M6.90909 19L5.18182 16.1048L1.90909 15.381L2.22727 12.0333L0 9.5L2.22727 6.96667L1.90909 3.61905L5.18182 2.89524L6.90909 0L10 1.3119L13.0909 0L14.8182 2.89524L18.0909 3.61905L17.7727 6.96667L20 9.5L17.7727 12.0333L18.0909 15.381L14.8182 16.1048L13.0909 19L10 17.6881L6.90909 19ZM9.04545 12.7119L14.1818 7.6L12.9091 6.2881L9.04545 10.1333L7.09091 8.23333L5.81818 9.5L9.04545 12.7119Z" :fill="authLevel === 1 ? '#6A60FF' : '#999999'"/>
                      </svg>
                      <span>{{ mobileAuthStatus === 1 ? $t('stranger.kycVerified') : $t('stranger.kycUnverified') }}</span>
                    </li>
                  </ul>
                </div>
                <hr/>
                <c-button
                  v-show="blackList !== 0"
                  className="b-4-cl blackListButton"
                  type="text"
                  paddingW="0px"
                  @click="blackClick"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
                    <path d="M4 18V16.05C3.1 15.5167 2.375 14.8042 1.825 13.9125C1.275 13.0208 1 12.05 1 11C1 9.28333 1.64167 7.85417 2.925 6.7125C4.20833 5.57083 5.73333 5 7.5 5C9.26667 5 10.7917 5.57083 12.075 6.7125C13.3583 7.85417 14 9.28333 14 11C14 12.05 13.725 13.0208 13.175 13.9125C12.625 14.8042 11.9 15.5167 11 16.05V18H4ZM5.5 12C5.78333 12 6.02083 11.9042 6.2125 11.7125C6.40417 11.5208 6.5 11.2833 6.5 11C6.5 10.7167 6.40417 10.4792 6.2125 10.2875C6.02083 10.0958 5.78333 10 5.5 10C5.21667 10 4.97917 10.0958 4.7875 10.2875C4.59583 10.4792 4.5 10.7167 4.5 11C4.5 11.2833 4.59583 11.5208 4.7875 11.7125C4.97917 11.9042 5.21667 12 5.5 12ZM6.5 14H8.5L7.5 12L6.5 14ZM9.5 12C9.78333 12 10.0208 11.9042 10.2125 11.7125C10.4042 11.5208 10.5 11.2833 10.5 11C10.5 10.7167 10.4042 10.4792 10.2125 10.2875C10.0208 10.0958 9.78333 10 9.5 10C9.21667 10 8.97917 10.0958 8.7875 10.2875C8.59583 10.4792 8.5 10.7167 8.5 11C8.5 11.2833 8.59583 11.5208 8.7875 11.7125C8.97917 11.9042 9.21667 12 9.5 12ZM15 13V11H22V13H15ZM15 17V15H22V17H15ZM15 9V7H22V9H15Z" fill="#999999"/>
                  </svg>
                  {{
                    blackList === 0
                      ? ""
                      : blackList === 2
                      ? $t("stranger.addBlackList")
                      : $t("stranger.removeBlackList")
                  }}
                </c-button>
              </div>
            </div>
          </div>
          <div class="stranger-bottom clearfix">
            <ul class="b-1-cl">
              <li class="clearfix">
                <p class="b-2-cl">{{ $t("stranger.headerList")[0] }}</p>
                <p>{{ completeOrders }}</p>
              </li>
              <li class="clearfix">
                <p class="b-2-cl">{{ $t("stranger.headerList")[1] }}</p>
                <p>{{ complainNum }}</p>
              </li>
              <li class="clearfix">
                <p class="b-2-cl">{{ $t("stranger.headerList")[2] }}</p>
                <p>{{ sucComplainNum }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="stranger-center clearfix">
        <div class="strangerbar">
          <div class="nav-tab clearfix a-3-bd">
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
          <div class="tables clearfix">
            <c-table
              :loading="loading"
              :imgMap="imgMap"
              :colorMap="colorMap"
              :classes="classes"
              :headClasses="headClasses"
              :bodyClasses="bodyClasses"
              :lineClasses="lineClass"
              :columns="columns"
              :dataList="dataList"
              :lineNumber="lineNumber"
              :cellHeight="cellHeight"
              :headHeight="headHeight"
              @elementClick="operation"
            />
            <c-pagination
              v-show="count > 10"
              :total="count"
              :current-page="page"
              :display="pageSize"
              classes="a-5-bg"
              @pagechange="pagechange"
            >
            </c-pagination>
          </div>
        </div>
      </div>
      <c-dialog
        :showFlag="dialogFlag"
        paddingBottom="14px"
        :confirmLoading="dialogConfirmLoading"
        :confirmDisabled="dialogConfirmDisabled"
        @close="dialogClose"
        @confirm="dialogConfirm"
        :titleText="$t('personal.dialog.blackPrompt')"
      >
        <p class="dialog-p">
          {{
            blackList === 2 ? $t("stranger.blackListPrompt")[0] : $t("stranger.blackListPrompt")[1]
          }}
        </p>
      </c-dialog>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/stranger/stranger";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/stranger/stranger.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
