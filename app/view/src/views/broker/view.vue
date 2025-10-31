<template>
  <div class="broker">
    <div class="top-content">
      <div>
        <div class="warp">
          <h2 class="page-title f-8-cl">
            <!-- 经纪人系统 -->
            {{ $t("broker.broker") }}
          </h2>
          <div class="wk-info">
            <div class="item-box item-box-lefts">
              <div class="box-bar c-9-bd">
                <p class="txt f-9-cl">
                  <!-- 本月总收入 -->
                  {{ $t("broker.revenue") }}
                </p>
                <p class="name f-8-cl">
                  {{ bonusAmount }}
                  <span class="dy">
                    {{ bonusCoinName | getCoinShowName(coinList) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <img class="imgBg" :src="imgMap.broker" />
      </div>
    </div>

    <div class="warp main-content">
      <div class="mining-data">
        <div class="mining-tit f-2-cl c-5-bd">
          <p class="viewTit f-1-cl">
            <!-- 返佣明细 -->
            {{ $t("broker.returnDetails") }}
            <em class="f-2-cl">UID{{ uid }}</em>
          </p>
          <div class="search">
            <!-- 导出文档 -->
            <!-- <c-buttons
              class="button"
              type = "text"
              marginTop= "2px"
              @click = "exportWord">
              {{$t('broker.export')}}
            </c-buttons> -->
            <c-calendar
              width="180px"
              height="36px"
              class="calendar"
              name="startTime"
              :value="startTime"
              :promptText="startTimeText"
              @onChanges="onChangeCalendar"
            />
            <c-calendar
              width="180px"
              height="36px"
              class="calendar"
              name="endTime"
              :value="endTime"
              :promptText="endTimeText"
              @onChanges="onChangeCalendar"
            />
          </div>
        </div>

        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns="columns"
          :dataList="dataList"
          :loading="tableLoading"
          :bodyClasses="bodyClasses"
          :headClasses="headClasses"
          :cellHeight="80"
        />
      </div>
      <c-pagination
        v-if="pagination.count / pagination.pageSize > 1"
        :total="pagination.count"
        classes="c-4-bg"
        :current-page="pagination.page"
        :display="pagination.pageSize"
        @pagechange="pagechange"
      >
      </c-pagination>
    </div>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/broker/view/view";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/broker/view/view.styl";
import { getCoinShowName } from "@/components/BlockChain-ui-privatization/utils";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      imgMap,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("broker.time"),
          width: "100px",
        },
        {
          title: this.$t("broker.scale"), // '返佣比例',
        },
        {
          title: `${this.$t("broker.fee")}`,
        },
        {
          title: `${this.$t("broker.amount")}${
            this.allBonusCoin ? `(${getCoinShowName(this.allBonusCoin, this.coinList)})` : ""
          }`,
        },
      ];
    },
  },
};
</script>
<style scoped>
.f-1-cl {
  color: var(--color-1);
}
.broker .mining-tit {
  padding: 0 !important;
  border-color: var(--color-Toggle);
}
.broker {
  padding-bottom: 50px;
}
/deep/.table-head,
/deep/.table-body {
  background: transparent;
}
/deep/.calendar.common-select {
  width: 180px !important;
  height: 55px !important;
}
/deep/.calendar .input_line_activeLine {
  display: none !important;
}
/deep/.calendar .icon-triangle.icon-triangle-down {
  bottom: 25px;
  border-color: var(--color-text-primary) !important;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}
/deep/.calendar .input_line_prompt,
/deep/.type-select .input_line_prompt {
  bottom: 11px;
  left: 8px;
}
/deep/.calendar.common-select .input_line_inp {
  bottom: 12px;
}

.main-content /deep/.table-head {
  height: 42px;
  line-height: 42px;
  padding: 0;
  border-bottom-width: 0;
}
.broker .wk-info .item-box .box-bar {
  border: none !important;
  padding: 0 !important;
}

.mining-tit .search {
  margin-top: 0 !important;
}
</style>
