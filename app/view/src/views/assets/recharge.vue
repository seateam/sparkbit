<template>
  <section class="page-recharge m-page">
    <c-Breadcrumb :routes="routes" breadcrumbClass="space-tl" />
    <div class="m-title">
      {{ $t("assets.recharge.recharge") }}
    </div>

    <div class="m-ct">
      <div class="left">
        <!-- <div
          style="
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px;
            color: var(--color-text-primary);
          "
        >
          Coin
        </div> -->
        <div class="select">
          <div v-if="calCoinIcon" class="m-coinIcon">
            <img :src="calCoinIcon" />
          </div>
          <!-- 币种 -->
          <!-- 改，2022.11.14，新增下拉选择币种(原： <div class="symbol b-1-cl">{{ showSymbol }}</div>) -->
          <c-select
            :promptText="$t('assets.flowingWater.coin')"
            :value="symbol"
            :options="calCoinList"
            :errorHave="true"
            :filterable="true"
            @onChanges="symbolChange"
            height="46px"
            width="400px"
            :styles="{
              borderRadius: '8px',
              background: 'transparent',
            }"
            class="m-selectCoin"
          />
        </div>

        <div class="m-showInfo">
          <!-- 总额 -->
          <div class="txt">{{ $t("assets.recharge.lumpSum") }}</div>
          <div class="txt2">{{ detailsList[0].value || "-" }}</div>
        </div>
        <div class="m-showInfo">
          <!-- 可用 -->
          <div class="txt">{{ $t("assets.recharge.Available") }}</div>
          <div class="txt2">{{ detailsList[1].value || "-" }}</div>
        </div>
        <div class="m-showInfo">
          <!-- 冻结 -->
          <div class="txt">{{ $t("assets.recharge.freeze") }}</div>
          <div class="txt2">{{ detailsList[2].value || "-" }}</div>
        </div>
        <div class="m-showInfo">
          <!-- 冻结 -->
          <div class="txt">{{ $t("assets.recharge.minDeposit") }}</div>
          <div class="txt2">
            {{ calCurrentCoin ? calCurrentCoin.depositMin : "-" }} {{ symbol }}
          </div>
        </div>
        <div class="details-warking b-7-cl">
          <svg
            aria-hidden="true"
            style="margin-right: 6px"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M6 9.33333C6.18889 9.33333 6.34722 9.26945 6.475 9.14167C6.60278 9.01389 6.66667 8.85556 6.66667 8.66667C6.66667 8.47778 6.60278 8.31944 6.475 8.19167C6.34722 8.06389 6.18889 8 6 8C5.81111 8 5.65278 8.06389 5.525 8.19167C5.39722 8.31944 5.33333 8.47778 5.33333 8.66667C5.33333 8.85556 5.39722 9.01389 5.525 9.14167C5.65278 9.26945 5.81111 9.33333 6 9.33333ZM5.33333 6.66667H6.66667V2.66667H5.33333V6.66667ZM3.5 12L0 8.5V3.5L3.5 0H8.5L12 3.5V8.5L8.5 12H3.5Z"
              fill="#FFC642"
            />
          </svg>
          <span class="text" style="line-height: 16px; color: var(--color-Favorite)">
            <!-- 请勿向上述地址充值任何非本币种资产，否则资产将不可找回 -->
            {{ $t("assets.recharge.rechargeError") }}
          </span>
        </div>
      </div>
      <div class="right recharge-details">
        <mainChain
          v-if="haveBranch"
          :branchArr="branchArr"
          :activeBranch="activeBranch"
          :branchTip="branchTip"
          @setActiveBranch="setActiveBranch"
        />
        <!-- 改，2022.09.29，b-1-cl -> b-2-cl -->
        <div class="details-title b-2-cl">
          <span>{{ showSymbol }}</span>
          <!-- 充值地址 -->
          {{ $t("assets.recharge.rechargeAddress") }}
        </div>
        <!-- 地址 -->
        <!-- 改，2022.09.29，增加style -->
        <div
          class="address"
          style="
            margin-top: 12px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
          "
        >
          <span class="text b-1-cl">{{ address }}</span>
          <input :value="address" ref="address" />
          <span
            class="copy"
            @click="copy('address')"
            @mouseenter="handMouseenter('address')"
            @mouseleave="handMouseleave('address')"
          >
            <span v-if="addressShow">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.1665 0.666748H12.1665C12.4759 0.666748 12.7727 0.789664 12.9915 1.00846C13.2103 1.22725 13.3332 1.524 13.3332 1.83341V8.83342C13.3332 9.14283 13.2103 9.43958 12.9915 9.65837C12.7727 9.87717 12.4759 10.0001 12.1665 10.0001H5.1665C4.85709 10.0001 4.56034 9.87717 4.34155 9.65837C4.12275 9.43958 3.99984 9.14283 3.99984 8.83342V1.83341C3.99984 1.524 4.12275 1.22725 4.34155 1.00846C4.56034 0.789664 4.85709 0.666748 5.1665 0.666748ZM5.1665 1.66675C5.1223 1.66675 5.07991 1.68431 5.04865 1.71556C5.0174 1.74682 4.99984 1.78921 4.99984 1.83341V8.83342C4.99984 8.8553 5.00415 8.87698 5.01252 8.8972C5.0209 8.91742 5.03318 8.93579 5.04865 8.95127C5.06413 8.96674 5.0825 8.97902 5.10272 8.9874C5.12294 8.99577 5.14462 9.00008 5.1665 9.00008H12.1665C12.2107 9.00008 12.2531 8.98252 12.2844 8.95127C12.3156 8.92001 12.3332 8.87762 12.3332 8.83342V1.83341C12.3332 1.78921 12.3156 1.74682 12.2844 1.71556C12.2531 1.68431 12.2107 1.66675 12.1665 1.66675H5.1665ZM8.99984 11.0001C8.99984 10.8675 9.05252 10.7403 9.14628 10.6465C9.24005 10.5528 9.36723 10.5001 9.49984 10.5001C9.63245 10.5001 9.75962 10.5528 9.85339 10.6465C9.94716 10.7403 9.99984 10.8675 9.99984 11.0001V12.1667C9.99984 12.4762 9.87692 12.7729 9.65813 12.9917C9.43934 13.2105 9.14259 13.3334 8.83317 13.3334H1.83317C1.52375 13.3334 1.22701 13.2105 1.00821 12.9917C0.78942 12.7729 0.666504 12.4762 0.666504 12.1667V5.16675C0.666504 4.85733 0.78942 4.56058 1.00821 4.34179C1.22701 4.123 1.52375 4.00008 1.83317 4.00008H2.99984C3.13245 4.00008 3.25962 4.05276 3.35339 4.14653C3.44716 4.2403 3.49984 4.36747 3.49984 4.50008C3.49984 4.63269 3.44716 4.75987 3.35339 4.85364C3.25962 4.9474 3.13245 5.00008 2.99984 5.00008H1.83317C1.78897 5.00008 1.74658 5.01764 1.71532 5.0489C1.68406 5.08015 1.6665 5.12255 1.6665 5.16675V12.1667C1.6665 12.211 1.68406 12.2533 1.71532 12.2846C1.74658 12.3159 1.78897 12.3334 1.83317 12.3334H8.83317C8.87737 12.3334 8.91977 12.3159 8.95102 12.2846C8.98228 12.2533 8.99984 12.211 8.99984 12.1667V11.0001Z"
                  fill="#828ea1"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.1665 0.666748H12.1665C12.4759 0.666748 12.7727 0.789664 12.9915 1.00846C13.2103 1.22725 13.3332 1.524 13.3332 1.83341V8.83342C13.3332 9.14283 13.2103 9.43958 12.9915 9.65837C12.7727 9.87717 12.4759 10.0001 12.1665 10.0001H5.1665C4.85709 10.0001 4.56034 9.87717 4.34155 9.65837C4.12275 9.43958 3.99984 9.14283 3.99984 8.83342V1.83341C3.99984 1.524 4.12275 1.22725 4.34155 1.00846C4.56034 0.789664 4.85709 0.666748 5.1665 0.666748ZM5.1665 1.66675C5.1223 1.66675 5.07991 1.68431 5.04865 1.71556C5.0174 1.74682 4.99984 1.78921 4.99984 1.83341V8.83342C4.99984 8.8553 5.00415 8.87698 5.01252 8.8972C5.0209 8.91742 5.03318 8.93579 5.04865 8.95127C5.06413 8.96674 5.0825 8.97902 5.10272 8.9874C5.12294 8.99577 5.14462 9.00008 5.1665 9.00008H12.1665C12.2107 9.00008 12.2531 8.98252 12.2844 8.95127C12.3156 8.92001 12.3332 8.87762 12.3332 8.83342V1.83341C12.3332 1.78921 12.3156 1.74682 12.2844 1.71556C12.2531 1.68431 12.2107 1.66675 12.1665 1.66675H5.1665ZM8.99984 11.0001C8.99984 10.8675 9.05252 10.7403 9.14628 10.6465C9.24005 10.5528 9.36723 10.5001 9.49984 10.5001C9.63245 10.5001 9.75962 10.5528 9.85339 10.6465C9.94716 10.7403 9.99984 10.8675 9.99984 11.0001V12.1667C9.99984 12.4762 9.87692 12.7729 9.65813 12.9917C9.43934 13.2105 9.14259 13.3334 8.83317 13.3334H1.83317C1.52375 13.3334 1.22701 13.2105 1.00821 12.9917C0.78942 12.7729 0.666504 12.4762 0.666504 12.1667V5.16675C0.666504 4.85733 0.78942 4.56058 1.00821 4.34179C1.22701 4.123 1.52375 4.00008 1.83317 4.00008H2.99984C3.13245 4.00008 3.25962 4.05276 3.35339 4.14653C3.44716 4.2403 3.49984 4.36747 3.49984 4.50008C3.49984 4.63269 3.44716 4.75987 3.35339 4.85364C3.25962 4.9474 3.13245 5.00008 2.99984 5.00008H1.83317C1.78897 5.00008 1.74658 5.01764 1.71532 5.0489C1.68406 5.08015 1.6665 5.12255 1.6665 5.16675V12.1667C1.6665 12.211 1.68406 12.2533 1.71532 12.2846C1.74658 12.3159 1.78897 12.3334 1.83317 12.3334H8.83317C8.87737 12.3334 8.91977 12.3159 8.95102 12.2846C8.98228 12.2533 8.99984 12.211 8.99984 12.1667V11.0001Z"
                  fill="#316AD5"
                />
              </svg>
            </span>
          </span>
        </div>
        <!-- 标签 -->
        <div class="addressPage a-4-bg" v-if="isHavePage">
          <!-- 标签 -->
          <span class="page">{{ $t("assets.recharge.label") }}</span>
          <span class="text b-1-cl">{{ addressPage }}</span>
          <input :value="addressPage" ref="addressPage" />
          <span
            class="copy"
            @click="copy('addressPage')"
            @mouseenter="handMouseenter('addressPage')"
            @mouseleave="handMouseleave('addressPage')"
          >
            <span v-if="addressPageShow">
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9"></use>
              </svg>
            </span>
            <span v-else>
              <svg class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-a_9_1"></use>
              </svg>
            </span>
          </span>
          <span class="iconPage">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            <div class="iconPage-market a-4-bg">
              {{ $t("assets.recharge.pageText") }}
            </div>
          </span>
        </div>
      </div>
      <div class="codeImg">
        <!-- 改，2022.09.29，b-1-cl -> b-2-cl -->
        <div class="details-title b-2-cl">
          <span>{{ showSymbol }}</span>
          <!-- 充值地址 -->
          {{ $t("assets.recharge.rechargeAddress") }}
        </div>
        <!-- 二维码 -->
        <!-- 改，2022.09.29，新增style -->
        <div class="addressQRCode">
          <img v-if="addressQRCode" :src="addressQRCode" alt="" />
        </div>
      </div>
    </div>

    <div class="m-table">
      <div class="m-tab">
        <div class="item">{{ $t("assets.recharge.RecentRechargeRecord") }}</div>
      </div>
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
      />
      <c-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClone"
      @confirm="alertClone"
    >
      <!-- 充值提醒 -->
      <div class="alertTitle b-2-cl">
        {{ $t("assets.recharge.RechargeReminder") }}
      </div>
      <!-- 充值时必须要填写充值地址和标签，这是您账户的唯一标识，不填或填错将导致您的资产丢失。-->
      <div class="alertText">{{ $t("assets.recharge.rechargeWarning") }}</div>
    </c-alert>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/recharge/recharge";
import mainChainMixins from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/mainChainMixins";
import mainChain from "./mainChain.vue";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/recharge/recharge.styl";
import { getCoinShowName } from "@/components/BlockChain-ui-privatization/utils";

export default {
  mixins: [mixin, mainChainMixins],
  components: { mainChain },
  data() {
    return {
      symbolList: [],
      search: "",
      showLoading: false,
      routes: [],
    };
  },
  mounted() {
    this.init();
    this.routes = [
      {
        name: this.$t("assets.index.exchangeAccount"),
        path: `/otc/${this.lan}/assets/exchangeAccount`,
      },
      {
        name: this.$t("assets.recharge.recharge"),
      },
    ];
  },
  computed: {
    // 改，2022.11.16 获取所有的币种列表
    calCoinList() {
      const { coinList } = this.market;
      let { search } = this;
      const list = [];
      const exchangeData = this.exchangeData || {};
      const allCoinMap = exchangeData.allCoinMap || {};
      Object.keys(allCoinMap).forEach((item) => {
        if (allCoinMap[item].isFiat) {
          return;
        }
        if (allCoinMap[item].depositOpen !== 0) {
          const showCoin = getCoinShowName(item, coinList);
          list.push({ code: item, value: showCoin, icon: coinList[item].icon });
        }
      });
      // 搜索功能
      if (search) {
        search = search.toUpperCase();
        return list.filter((item) => {
          const name = item.value.toUpperCase();
          return name.includes(search.toUpperCase());
        });
      }
      return list;
    },
    // 改，2022.11.16 获取币种icon
    calCoinIcon() {
      const coinList = this.calCoinList || [];
      const symbol = this.$route.query.symbol || "";
      if (symbol) {
        const cur = coinList.find((item) => item.code == symbol) || {};
        return cur.icon || "";
      }
      return "";
    },
    // 当前币种数据
    calCurrentCoin() {
      const { symbol } = this;
      const allCoinMap = this.exchangeData.allCoinMap || {};
      if (allCoinMap[symbol] && allCoinMap[symbol].depositOpen === 0) {
        this.$router.push("/assets/exchangeAccount");
      }
      return allCoinMap[symbol];
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
  },
  methods: {
    // 改，2022.11.14，新增切换币种change事件
    symbolChange(item) {
      this.symbol = item.code;
      const { pathname } = location;
      this.$router.replace(`${pathname}?symbol=${item.code}`);
      this.$nextTick(() => {
        this.init();
      });
    },
  },
};
</script>
<style scoped>
.m-coinIcon {
  display: inline-block;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  flex-shrink: 0;
}
.m-coinIcon > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.m-tab {
  display: flex;
  align-items: center;
  height: 55px;
  padding-top: 14px;
}
.m-tab > .item {
  margin-right: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: var(--color-1);
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-ct {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
  margin: 0 44px 28px 44px;
  border-radius: 16px;
  border: 1px solid var(--color-Toggle);
  padding: 28px 24px;
}
.m-ct > .left {
  width: 28%;
}
.m-ct > .left > .select {
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 25px;
}
.m-ct > .right {
  width: 35%;
  box-sizing: border-box;
  /* margin-top: 24px; */
  margin-right: 60px;
  margin-left: 60px;
}

/deep/.m-selectCoin.common-select .icon-triangle {
  border-color: #b2b2b2;
}
.m-subTitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
}
.m-showInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.m-showInfo > .txt {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--text-secondary, #999);
}
.m-showInfo > .txt2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-1);
}
.m-tips {
  margin-top: 25px;
}
.m-tips > .title {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  margin-bottom: 10px;
}
.m-ct > .left > .details-warking {
  margin-top: 8px;
  font-size: 12px;
}

.m-selectTit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.m-selectTit > .tit {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
}
.m-selectTit > .link {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: var(--mainColor);
  cursor: pointer;
  user-select: none;
}
/deep/.withdraw-btn.common-button {
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
/deep/.withdraw-btn.common-button-solid-disabled {
  background: rgba(255, 255, 255, 0.1);
}
.m-table {
  min-height: 427px;
  box-sizing: border-box;
  padding: 0 32px 28px;
  position: relative;
}

.page-recharge .recharge-details {
  border-bottom-width: 0;
  padding: 0;
}
.m-ct > .codeImg {
  margin-right: 20px;
}
.m-ct > .codeImg .details-title {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text-primary);
}
.m-ct > .codeImg .addressQRCode {
  margin-top: 8px;
  width: 156px;
  height: 156px;
  background-color: #fff;
  border-radius: 8px;
}
.m-ct > .codeImg .addressQRCode img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8px;
}

.m-ct > .right > .details-title {
  margin-top: 28px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text-primary);
}
.page-recharge .recharge-table {
  padding: 0;
}

/* 2023.04.18 样式重构 */
.m-title {
  height: 120px;
  line-height: 115px;
  font-weight: 600;
  font-size: 32px;
  color: var(--color-1);
  box-sizing: border-box;
  padding-left: 44px;
}
.page-recharge .recharge-details .address {
  background: var(--color-Input-fill);
  border-radius: 8px;
  color: var(--color-text-primary);
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.page-recharge .recharge-details .address .text {
  /* color: var(--color-6); */
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 400;
  line-height: 18px;
}

/deep/.table-head {
  background: var(--color-BG);
  color: var(--color-13);
  padding: 0;
}
.page-recharge /deep/.mainChain .common-select .input_line_inp {
  margin-top: 0;
}
</style>
