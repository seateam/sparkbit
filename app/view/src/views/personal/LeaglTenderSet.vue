<template>
  <!--eslint-disable-->
  <div class="legal-tender-set m-page">
    <div class="title">{{ $t("personal.leaglTenderSet.title") }}</div>
    <div class="m-listBox">
      <!-- 收款方式设置 -->
      <div class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27" fill="none">
          <path d="M3 21V9V9.4875V3V21ZM3 6H27V3H3V6ZM14.3625 24H3C2.175 24 1.46875 23.7063 0.88125 23.1188C0.29375 22.5312 0 21.825 0 21V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1188 0.88125C29.7063 1.46875 30 2.175 30 3V10.9875C29.125 10.3625 28.1687 9.875 27.1312 9.525C26.0938 9.175 25 9 23.85 9C22.425 9 21.0813 9.26875 19.8188 9.80625C18.5563 10.3438 17.45 11.075 16.5 12H3V21H13.4625C13.5375 21.525 13.65 22.0375 13.8 22.5375C13.95 23.0375 14.1375 23.525 14.3625 24ZM22.35 27L21.9 24.75C21.6 24.625 21.3188 24.4938 21.0563 24.3563C20.7938 24.2188 20.525 24.05 20.25 23.85L18.075 24.525L16.575 21.975L18.3 20.475C18.25 20.15 18.225 19.825 18.225 19.5C18.225 19.175 18.25 18.85 18.3 18.525L16.575 17.025L18.075 14.475L20.25 15.15C20.525 14.95 20.7938 14.7812 21.0563 14.6437C21.3188 14.5062 21.6 14.375 21.9 14.25L22.35 12H25.35L25.8 14.25C26.1 14.375 26.3813 14.5062 26.6438 14.6437C26.9063 14.7812 27.175 14.95 27.45 15.15L29.625 14.475L31.125 17.025L29.4 18.525C29.45 18.85 29.475 19.175 29.475 19.5C29.475 19.825 29.45 20.15 29.4 20.475L31.125 21.975L29.625 24.525L27.45 23.85C27.175 24.05 26.9063 24.2188 26.6438 24.3563C26.3813 24.4938 26.1 24.625 25.8 24.75L25.35 27H22.35ZM23.85 22.5C24.675 22.5 25.3813 22.2063 25.9688 21.6188C26.5562 21.0312 26.85 20.325 26.85 19.5C26.85 18.675 26.5562 17.9688 25.9688 17.3813C25.3813 16.7938 24.675 16.5 23.85 16.5C23.025 16.5 22.3188 16.7938 21.7313 17.3813C21.1438 17.9688 20.85 18.675 20.85 19.5C20.85 20.325 21.1438 21.0312 21.7313 21.6188C22.3188 22.2063 23.025 22.5 23.85 22.5Z" fill="white"/>
        </svg>
        <div class="info">
          <div class="txt">{{ $t("personal.leaglTenderSet.titleList")[0].text }}</div>
          <div class="subTxt">{{ $t("personal.leaglTenderSet.titleList")[0].label }}</div>
        </div>
        <div class="btn" @click="btnLink('setUp')">
          {{ dataList.length === 0 ? $t("personal.tool.setUp") : $t("personal.tool.add") }}
        </div>
      </div>

      <!-- 遍历列表 -->
      <div class="item" v-for="obj in dataList" :key="obj.id">
        <div class="icon"></div>
        <div class="info">
          <div class="txt">
            {{ obj.title }}
            <span v-if="excheifFlag && obj.payment === 'otc.payment.domestic.bank.transfer'">{{
              obj.coinName
            }}</span>
          </div>
          <div class="subTxt" v-html="resloveText(obj)"></div>
        </div>
        <div class="btnList">
          <div class="btn" @click="click(`${obj.id}`, 'delete')">
            {{ $t("personal.tool.delete") }}
          </div>
          <div class="btn" @click="click(obj, 'modify')">{{ $t("personal.tool.modify") }}</div>
          <c-switch
            :value="Boolean(obj.isOpen)"
            @click="switchChange(`${obj.id}`, `${obj.isOpen}`)"
          />
        </div>
      </div>

      <!-- 资金密码 -->
      <div class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="19" viewBox="0 0 34 19" fill="none">
          <path d="M2 18.5V15.5H32V18.5H2ZM3.725 9.425L1.775 8.3L3.05 6.05H0.5V3.8H3.05L1.775 1.625L3.725 0.5L5 2.675L6.275 0.5L8.225 1.625L6.95 3.8H9.5V6.05H6.95L8.225 8.3L6.275 9.425L5 7.175L3.725 9.425ZM15.725 9.425L13.775 8.3L15.05 6.05H12.5V3.8H15.05L13.775 1.625L15.725 0.5L17 2.675L18.275 0.5L20.225 1.625L18.95 3.8H21.5V6.05H18.95L20.225 8.3L18.275 9.425L17 7.175L15.725 9.425ZM27.725 9.425L25.775 8.3L27.05 6.05H24.5V3.8H27.05L25.775 1.625L27.725 0.5L29 2.675L30.275 0.5L32.225 1.625L30.95 3.8H33.5V6.05H30.95L32.225 8.3L30.275 9.425L29 7.175L27.725 9.425Z" fill="white"/>
        </svg>
        <div class="info">
          <div class="txt">{{ $t("personal.leaglTenderSet.titleList")[1].text }}</div>
          <div class="subTxt">{{ $t("personal.leaglTenderSet.titleList")[1].label }}</div>
        </div>
        <div class="btn" @click="btnLink('modifySettings')" v-if="isCapitalPwordSet === 0">
          {{ $t("personal.tool.setUp") }}
        </div>
      </div>
    </div>
    <!--<p class="user-management-child-header b-1-cl a-3-bd">-->
    <!--  {{ $t("personal.leaglTenderSet.title") }}-->
    <!--</p>-->
    <!--<div class="user-management-main clearfix">-->
    <!--  <ul class="ul">-->
    <!--    <li class="li clearfix">-->
    <!--      &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--      <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--        <use xlink:href="#icon-e_7"></use>-->
    <!--      </svg>-->
    <!--      <div class="li-div li-divs a-3-bd b-1-cl clearfix">-->
    <!--        <p class="li-title">-->
    <!--          {{ $t("personal.leaglTenderSet.titleList")[0].text }}-->
    <!--        </p>-->
    <!--        <p class="li-text b-2-cl">-->
    <!--          {{ $t("personal.leaglTenderSet.titleList")[0].label }}-->
    <!--        </p>-->
    <!--        <div class="li-right clearfix">-->
    <!--          <c-button-->
    <!--            type="solid"-->
    <!--            :big="true"-->
    <!--            className="user-button"-->
    <!--            paddingW="18px"-->
    <!--            height="30px"-->
    <!--            @click="btnLink('setUp')"-->
    <!--            >{{-->
    <!--              dataList.length === 0-->
    <!--                ? $t("personal.tool.setUp")-->
    <!--                : $t("personal.tool.add")-->
    <!--            }}</c-button-->
    <!--          >-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </li>-->
    <!--    <li class="li clearfix" v-for="obj in dataList" :key="obj.id">-->
    <!--      <div class="li-div li-div-right a-3-bd b-1-cl clearfix">-->
    <!--        <p class="li-title">-->
    <!--          <c-otcPayIcon :imgUrl="obj.icon" />-->
    <!--          {{ obj.title }}-->
    <!--          <span-->
    <!--            class="carp-coin"-->
    <!--            v-if="-->
    <!--              excheifFlag &&-->
    <!--                obj.payment === 'otc.payment.domestic.bank.transfer'-->
    <!--            "-->
    <!--          >-->
    <!--            {{ obj.coinName }}</span-->
    <!--          >-->
    <!--        </p>-->
    <!--        <p class="li-text b-2-cl" v-html="resloveText(obj)"></p>-->
    <!--        <div class="li-right clearfix">-->
    <!--          <c-switch-->
    <!--            :value="Boolean(obj.isOpen)"-->
    <!--            @click="switchChange(`${obj.id}`, `${obj.isOpen}`)"-->
    <!--          />-->
    <!--          <c-button-->
    <!--            className="li-fun b-4-cl clearfix"-->
    <!--            type="text"-->
    <!--            @click="click(`${obj.id}`, 'delete')"-->
    <!--          >-->
    <!--            {{ $t("personal.tool.delete") }}-->
    <!--          </c-button>-->
    <!--          &lt;!&ndash;-->
    <!--          <span class="li-fun b-4-cl clearfix" @click="click(`${obj.id}`, 'delete')">-->
    <!--            {{$t('personal.tool.delete')}}</span>-->
    <!--            &ndash;&gt;-->
    <!--          <c-button-->
    <!--            className="li-fun b-4-cl clearfix"-->
    <!--            type="text"-->
    <!--            @click="click(obj, 'modify')"-->
    <!--          >-->
    <!--            {{ $t("personal.tool.modify") }}-->
    <!--          </c-button>-->
    <!--          &lt;!&ndash;-->
    <!--          <span class="li-fun b-4-cl clearfix" @click="click(obj, 'modify')">-->
    <!--            {{$t('personal.tool.modify')}}</span>-->
    <!--            &ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </li>-->
    <!--    <li class="li clearfix">-->
    <!--      &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--      <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--        <use xlink:href="#icon-e_8"></use>-->
    <!--      </svg>-->
    <!--      <div class="li-div li-divs a-3-bd b-1-cl clearfix">-->
    <!--        <p class="li-title">-->
    <!--          {{ $t("personal.leaglTenderSet.titleList")[1].text }}-->
    <!--        </p>-->
    <!--        <p class="li-text b-2-cl">-->
    <!--          {{ $t("personal.leaglTenderSet.titleList")[1].label }}-->
    <!--        </p>-->
    <!--        <div class="li-right clearfix">-->
    <!--          <c-button-->
    <!--            v-if="isCapitalPwordSet === 0"-->
    <!--            type="solid"-->
    <!--            :big="true"-->
    <!--            className="user-button"-->
    <!--            paddingW="18px"-->
    <!--            height="30px"-->
    <!--            @click="btnLink('modifySettings')"-->
    <!--            >{{ $t("personal.tool.setUp") }}</c-button-->
    <!--          >-->
    <!--          <c-button-->
    <!--            v-else-->
    <!--            className="li-fun b-4-cl clearfix"-->
    <!--            type="text"-->
    <!--            @click="btnLink('modifySettings')"-->
    <!--          >-->
    <!--            {{ $t("personal.tool.modify") }}-->
    <!--          </c-button>-->
    <!--          &lt;!&ndash;-->
    <!--          <span v-else class="li-fun b-4-cl clearfix"-->
    <!--                @click="btnLink('modifySettings')">{{$t('personal.tool.modify')}}</span>-->
    <!--                &ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </li>-->
    <!--  </ul>-->
    <!--</div>-->
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :buttonText="this.$t('personal.alert.certif')"
      imageType="1"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClose"
      @confirm="alertGo"
    >
      <div class="alertTitle">
        {{ fiatTradeOpen ? $t("assets.b2c.otcShow.fiatTitle") : $t("personal.alert.fiatTitle") }}
      </div>
      <div class="alertText">{{ authTitleText }}</div>
      <div class="alertError">
        <span class="alertError-text b-4-cl"> {{ this.$t("personal.alert.nickName") }}</span>
        <span v-if="!this.nickName">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#666666"
            />
          </svg>
        </span>
        <span v-else>
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#5CEEA0"
            />
          </svg>
        </span>
      </div>
      <div class="alertError">
        <span class="alertError-text b-4-cl"> {{ this.$t("personal.alert.id") }}</span>
        <span v-if="this.authLevel !== 1">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#666666"
            />
          </svg>
        </span>
        <span v-else>
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#5CEEA0"
            />
          </svg>
        </span>
      </div>
      <div class="alertError">
        <span class="alertError-text b-4-cl">
          {{ this.$t("personal.alert.alertErrorTextGoogle") }}</span
        >
        <span v-if="!this.google">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#666666"
            />
          </svg>
        </span>
        <span v-else>
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
          >
            <path
              d="M6.05512 12.3689L15.8468 2.57726L13.9023 0.632812L6.05512 8.48003L2.09679 4.5217L0.152344 6.46615L6.05512 12.3689Z"
              fill="#5CEEA0"
            />
          </svg>
        </span>
      </div>
      <!--<div class="alertError alertBot a-2-bd" v-if="!enforceGoogleAuth">-->
      <!--  <span class="alertError-text b-4-cl">-->
      <!--    {{ this.$t("personal.alert.alertErrorTextPhone") }}</span-->
      <!--  >-->
      <!--  <span v-if="!this.sms">-->
      <!--    <svg class="icon icon-14 alertError-icon" aria-hidden="true">-->
      <!--      <use xlink:href="#icon-a_14"></use>-->
      <!--    </svg>-->
      <!--  </span>-->
      <!--  <span v-else>-->
      <!--    <svg class="icon icon-14 alertError-icon" aria-hidden="true">-->
      <!--      <use xlink:href="#icon-a_14_1"></use>-->
      <!--    </svg>-->
      <!--  </span>-->
      <!--</div>-->
    </c-alert>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/LeaglTenderSet/LeaglTenderSet";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/LeaglTenderSet/LeaglTenderSet.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.m-page {
  box-sizing: border-box;
  font-family: Outfit;
}
.m-page > .title {
  font-weight: 700;
  color: var(--color-1);
  height: 120px;
  line-height: 120px;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 44px;
}
.m-listBox {
  box-sizing: border-box;
  padding: 0 44px;
}
.m-listBox > .item {
  height: 104px;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0;
}
.m-listBox > .item > svg path {
  fill: var(--color-text-primary);
}
.m-listBox > .item::before {
  content: "";
  width: 100%;
  height: 1px;
  background: var(--color-Toggle);
  position: absolute;
  left: 0;
  bottom: 0;
}
.m-listBox > .item > .info {
  box-sizing: border-box;
  padding-left: 20px;
  max-width: 90%;
}
.m-listBox > .item > .info > .txt {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-1);
}
.m-listBox > .item > .info > .subTxt {
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 16px;
  margin-top: 4px;
}
.m-listBox > .item .btn {
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
  padding: 8px 20px;
  white-space: nowrap;
  border-radius: 100px;
  color: var(--color-BTN-text-secondary-revert);
  border: 1px solid var(--color-BTN-secondary-border);
}
.alertTitle {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}
.m-listBox > .item > .btnList {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
}
.m-listBox > .item > .btnList .btn {
  position: relative;
  transform: none;
}
.alertError {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.alertError .b-4-cl {
  color: var(--color-text-secondary);
}
/deep/.common-button.u-8-cl .common-button-slot {
  color: var(--color-text-primary);
}
</style>
