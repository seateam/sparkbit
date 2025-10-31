<template>
  <!-- 改，2022.09.29，新增style -->
  <section class="mainChain" style="width: 100%">
    <div class="mainChain-title">
      {{ $t("assets.branchName") }}
      <!-- <div class="mainChain-page-icon">
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_15"></use>
        </svg>
        <ul class="mainChain-page-market a-4-bg">
          <li>
            {{ branchTip }}
          </li>
        </ul>
      </div> -->
    </div>
    <!-- {{ JSON.stringify(branchArr) }} -->
    <!-- 改，2022.09.29，新增style -->
    <c-select
      :options="branchArr"
      v-model="activeBranch"
      :value="branchArr[0] ? branchArr[0].code : ''"
      @onChanges="setActiveBranch"
    />
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/mainChain/mainChain";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/mainChain/mainChain.styl";

export default {
  mixins: [mixin],
  name: "mainChain",
};
</script>
<style scoped>
/* 2022.12.27 样式修改 */
.m-tab {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
.m-tab > .item {
  height: 40px;
  line-height: 40px;
  background: var(--color-Input-fill);
  border-radius: 100px;
  font-weight: 500;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-right: 12px;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item.active {
  background: var(--mainColor);
  color: #ffffff;
}
.mainChain > .mainChain-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}
</style>
