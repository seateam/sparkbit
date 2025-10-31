<template>
  <!-- 改，2022.10.01，a-3-bd -> a-3-bd-c -->
  <div class="select-price" :class="{ haveMarket: haveMarket }">
    <div
      class="form-control a-3-bd-c"
      v-if="!isMarket"
      @click="focusInput"
      :style="{ width: haveMarket ? '210px' : '100%' }"
      :class="inputClass"
    >
      <span class="title a-1-bd" v-if="title" :class="{ promptText: promptText }">
        {{ title }}
        <p v-if="promptText" class="tip-text2 a-5-bg a-3-bd-c" v-html="promptText"></p>
      </span>
      <!--<span class="title b-1-cl" v-else>{{ placeHolder }}</span>-->
      <span class="unit b-1-cl">{{ unit }}</span>
      <div class="percentage-vol a-3-bd-c" v-if="isPercentage" @click="clearPercentage">
        {{ isPercentage }}%
      </div>
      <input
        v-show="!isPercentage"
        type="text"
        class="b-1-cl"
        v-model="value"
        ref="formInput"
        @mouseenter="focusInputClass(false)"
        @mouseout="mouseoutInputClass"
        @input="handleInput($event.target.value)"
        @focus="focusInputClass(true)"
        @blur="blurinputClass"
        :placeholder="placeHolder"
      />
    </div>
    <!-- 当时市场价格 -->
    <div class="market-price a-3-bd-c" v-if="isMarket && haveMarket" @click="selectMarket">
      <!-- 当时市场价格 -->
      {{ this.$t("futures.tradeForm.text52") }}
    </div>
    <a
      class="a-3-bd-c market-price-btn"
      v-if="haveMarket"
      :class="isMarket ? 'a-12-bd b-4-cl' : 'a-3-bd-c'"
      @click="selectMarket"
    >
      <!-- 市价 -->
      {{ this.$t("futures.tradeForm.mPrice") }}
    </a>
  </div>
</template>
<script>
import { fixInput } from "@/utils";
// import Utils from '@/utils/coUtils.js';

export default {
  name: "form-input",
  props: {
    isMarket: {
      default: false,
      type: Boolean,
    },
    fix: {
      default: 2,
      type: [Number, String],
    },
    default: {
      default: "",
      type: [Number, String],
    },
    unit: {
      default: "",
      type: String,
    },
    title: {
      default: "",
      type: String,
    },
    placeHolder: {
      default: "",
      type: String,
    },
    haveMarket: {
      default: false,
      type: Boolean,
    },
    isVol: {
      default: false,
      type: Boolean,
    },
    isPercentage: {
      default: "",
      type: [Number, String],
    },
    isError: {
      default: null,
      type: [Number, String],
    },
    promptText: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      value: "",
      inputClass: "",
      isFocus: false,
    };
  },
  computed: {
    coinList() {
      if (this.$store.state.baseData && this.$store.state.baseData.market) {
        return this.$store.state.baseData.market.coinList;
      }
      return null;
    },
    coinUnit() {
      return this.$store.state.swap.coinUnit;
    },
    valueUnit() {
      return this.$store.state.swap.valueUnit;
    },
  },
  watch: {
    default(val) {
      this.value = val;
    },
    isError(val) {
      this.inputClass = val ? "a-19-bd" : "a-3-bd-c";
    },
    isMarket(val) {
      if (!val) {
        setTimeout(() => {
          this.$refs.formInput.focus();
        });
      }
    },
  },
  mounted() {
    this.value = this.default;
    this.inputClass = this.isError ? "a-19-bd" : "a-3-bd-c";
  },
  methods: {
    focusInputClass(flag) {
      if (!this.isError) {
        this.inputClass = "a-12-bd";
        if (flag) {
          this.isFocus = flag;
        }
      }
    },
    blurinputClass() {
      if (!this.isError) {
        this.isFocus = false;
        this.inputClass = "a-3-bd-c";
      }
    },
    mouseoutInputClass() {
      if (!this.isError && !this.isFocus) {
        this.inputClass = "a-3-bd-c";
      }
    },
    selectMarket() {
      this.$emit("selectMarket");
    },
    focusInput() {
      setTimeout(() => {
        this.$refs.formInput.focus();
      });
    },
    clearPercentage() {
      this.$emit("clearPercentage");
      setTimeout(() => {
        this.$refs.formInput.focus();
      });
    },
    newFixInput(val, fix) {
      return fixInput(val, fix);
      // if (fix > 0) {
      //   return r
      // } else {
      //   return Utils.retainDecimals(val, { decimal: 0 })
      // }
    },
    handleInput(val) {
      let data;
      let valus = val;
      const str = val;
      if (str.length >= 10) {
        valus = str.substring(0, 12);
      }
      if (!this.isVol) {
        data = this.newFixInput(valus, this.fix);
      } else {
        data = this.volChange(valus);
      }
      this.value = data;
      this.$emit("tradeChangeValue", data);
    },
    // 量改变事件
    volChange(val) {
      if (val) {
        return this.newFixInput(val, this.fix);
      }
      return "";
    },
  },
};
</script>
<style scoped lang="stylus">
.select-price {
  display: flex;
  margin-top: 12px;
  .form-control {
    height: 34px;
    line-height 34px;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    font-size: 12px;
    font-weight: 500;
    position: relative;
    //box-sizing: border-box;
    border-color: var(--color-Input-border);

    // 改，2022.12.04，新增
    background: var(--color-Input-fill);
    // display: flex;
    input {
      padding: 0px 8px 0 16px;
      width: 200px;
      height: 100%;
      // 改，2022.11.06，14 -> 18
      font-size: 14px;
      font-weight: 500;
      float: right;
      text-align: right;
      color: var(--color-text-primary);
    }
    .percentage-vol {
      padding: 0px 8px;
      width: 220px;
      height: 100%;
      font-size: 12px;
      float: right;
      text-align: right;
    }

    .unit,
    input::-webkit-input-placeholder,
    input:-moz-placeholder,
    input::-moz-placeholder, input:-ms-input-placeholder {
      font-size: 14px;
    }

    .unit {
      float: right;
      padding-right:10px;
    }
    span.title {
      position: absolute;
      left: 10px;
    }
  }
  .market-price {
    width: 210px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    font-size: 14px;
    padding: 0px 8px;
    cursor: not-allowed;
    box-sizing: border-box;
  }


  .market-price-btn {
    display: block;
    width: 68px;
    height: 34px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 34px;
    margin-left: 10px;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-Input-border);
    text-align: center;
    user-select: none;
    background: var(--color-Input-fill);
    white-space: nowrap;
  }
  .tip-text2 {
    display: none;
    width: 200px;
    padding: 20px;
    position: absolute;
    left: 0px;
    top: 18px;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
    line-height: 1.5;
    //border-width: 1px;
    //border-style: solid;
    border-radius: 12px;
    background-color: var(--color-BG-Light);
  }
  .promptText {
    //border-bottom-style: dashed;
    //border-bottom-width: 1px;
    position: relative;
    line-height: 18px;
    cursor: pointer;
    top: 8px;
    &:hover {
      .tip-text2 {
        display: block;
      }
    }
  }
}
.haveMarket .form-control {
 input {
   width: 120px;
 }
}
</style>
<style scoped>
/* 2022.12.28 修改样式 */
.select-price .form-control {
  background: var(--color-Input-fill);
  border-radius: 6px;
  height: 34px;
  border-color: var(--color-Input-border);
}
.select-price .form-control span.title {
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
}
.select-price .form-control .unit {
  font-weight: 500;
  font-size: 14px;
  color: var(--color-text-primary);
  height: 34px;
  line-height: 34px;
}
</style>
