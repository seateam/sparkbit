<!-- 2022.12.28 样式重构 -->
<template>
  <section class="page-flowingWater m-page">
    <div class="m-title">{{ $t("assets.index.flowingWater") }}</div>
    <div class="m-head">
      <div class="m-tab">
        <div
          class="item"
          v-for="item in navTab"
          @click="currentType(item)"
          :class="{ active: item.index == nowType }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-if="nowType !== 4" class="m-selectBox">
      <!-- 币种 -->
      <c-select
        :promptText="$t('assets.flowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        :filterable="true"
        @onChanges="symbolChange"
        height="46px"
        :width="selectWidth"
        :styles="selectStyle"
        class="m-select"
      />
      <!-- 类型 -->
      <c-select
        v-if="nowType === 2 && isInnerTransferOpen"
        :promptText="$t('assets.flowingWater.type')"
        :value="otherTypeInner"
        :options="otherTypeListInner"
        :errorHave="true"
        @onChanges="otherTypeChangeInner"
        height="46px"
        :width="selectWidth"
        :styles="selectStyle"
        class="m-select"
      />
      <!-- 类型 -->
      <c-select
        v-if="nowType === 1 && isInnerTransferOpen"
        :promptText="$t('assets.flowingWater.type')"
        :value="topUpTypeInner"
        :options="topUpTypeList"
        :errorHave="true"
        @onChanges="topUpTypeChange"
        height="46px"
        :width="selectWidth"
        :styles="selectStyle"
        class="m-select"
      />
      <!-- 类型 -->
      <c-select
        v-if="nowType === 3"
        :promptText="$t('assets.flowingWater.type')"
        :value="otherType"
        :options="otherTypeList"
        :errorHave="true"
        @onChanges="otherTypeChange"
        height="46px"
        width="250px"
        :styles="selectStyle"
        class="m-select"
      />
      <!-- 类型 -->
      <c-select
        v-if="nowType === 5"
        :promptText="$t('assets.flowingWater.type')"
        :value="currentIncomeType"
        :options="incomeType"
        :errorHave="true"
        @onChanges="setIncomeType"
        height="46px"
        :width="selectWidth"
        :styles="selectStyle"
        class="m-select"
      />
    </div>
    <div class="m-table" v-if="nowType !== 4">
      <c-table
        :cellHeight="55"
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :subContent="subTableData"
        :subContentId="subTableDataId"
        :subColumns="subColumns"
        :columns="columns"
        :dataList="tabelList"
        bodyClasses="bodyClasses"
        @elementClick="tableClick"
      />
      <c-pagination
        v-if="paginationObj.total > paginationObj.display"
        :total="paginationObj.total"
        :display="paginationObj.display"
        :currentPage="paginationObj.currentPage"
        @pagechange="pagechange"
      />
    </div>
    <template v-if="nowType === 4">
      <innovations />
    </template>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/flowingWater/flowingWater";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/assets/flowingWater/flowingWater.styl";
import { formatTime } from "@/components/BlockChain-ui-privatization/utils";
import innovations from "./innovations.vue";
import "./modules/flowingWater.styl";

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  data() {
    return {
      selectStyle: {
        borderRadius: "8px",
        background: "transparent",
        marginRight: "22px",
      },
      selectWidth: "250px",
    };
  },
  components: {
    innovations,
  },
  methods: {
    // 撤销操作
    tableClick(type, id) {
      if (type === "revoke") {
        let even = {};
        this.tabelList.forEach((item) => {
          if (item.id === id) {
            even = item;
          }
        });
        if (this.revokeList.indexOf(even.id) === -1) {
          this.revokeList.push(even.id);
          this.axios({
            url: "/finance/cancel_withdraw",
            headers: {},
            params: {
              withdrawId: even.id,
            },
            method: "post",
          }).then((data) => {
            const ind = this.revokeList.indexOf(even.id);
            this.revokeList.splice(ind, 1);
            if (data.code.toString() === "0") {
              this.getData();
              this.$bus.$emit("tip", { text: data.msg, type: "success" });
            } else {
              this.$bus.$emit("tip", { text: data.msg, type: "error" });
            }
          });
        }
      }
      if (type === "subView") {
        this.subTableDataId = id.id;
        this.subTableData = [];
        this.financeListData.forEach((item) => {
          if (item.id === this.subTableDataId) {
            let address = item.addressTo;
            const txidadd = item.txid;
            if (this.isHavePage) {
              const [newAddress] = address.split("_");
              address = newAddress;
            }
            // if (
            //   this.publicInfo.switch.open_txid_addr
            //   && this.publicInfo.switch.open_txid_addr === '1'
            // ) {
            // const txid = `<a href='${item.txidAddr}' target='_blank' class='b-4-cl'>
            // ${item.txid}</a>`;
            //   txidadd = txid;
            // }
            this.subTableData.push([
              address, // 地址
              item.walletTime ? formatTime(item.walletTime) : "---",
              txidadd || "---",
            ]);
          }
        });
      }
    },
  },
};
</script>
<style scoped>
/deep/.common-select .input_line_inp {
  color: var(--color-1) !important;
}
/deep/.common-select .icon-triangle {
  border-color: #b2b2b2;
}
/deep/.m-select.common-select:last-child {
  margin-right: 0 !important;
}
/deep/.table-head thead {
  font-size: 14px;
}
/deep/.table-head {
  background: var(--color-BG);
  padding: 0;
}
</style>
