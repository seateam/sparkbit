<!-- 币币交易 24小时行情 -->
<!-- 2023.01.03 重构样式 -->
<template>
  <!-- 改，2022.12.26 修改样式 -->
  <div
    class="trade-input trade-input-china-container"
    :class="{ disabledForm: content.disabled }"
    :style="styles"
  >
    <div class="input-item" @click="inputFocus" :class="ItemClass">
      <!--改，2022.11.22 新增样式配置-->
      <input
        class="inputs b-1-cl"
        v-if="!content.disabled"
        ref="inputs"
        @input="handleInput($event.target.value)"
        @focus="handle('focus', $event.target.value)"
        @blur="handle('blur', $event.target.value)"
        v-model="valueData"
        type="text"
        :style="inputStyle"
        :placeholder="content.title"
      />
      <p v-if="content.disabled" class="disabledText b-3-cl">{{ content.disabledText }}</p>
      <span v-if="showBtn" class="m-tab">
        <div class="item" :data-transactionType="1" :class="{ active: transactionType == 1 }">
          Limit
        </div>
        <div class="item" :data-transactionType="2" :class="{ active: transactionType == 2 }">
          Market
        </div>
      </span>

      <div v-if="!content.disabled && !showBtn" class="units m-units">
        <span>{{ content.units | getCoinShowName(coinList) }}</span>
        <div v-if="!hideAddBtn" @click.stop="addOrSub" class="tools">
          <div class="item add" data-type="add">+</div>
          <div class="item sub" data-type="sub"></div>
        </div>
      </div>
    </div>
    <div class="price-rate a-21-bg" v-if="content.subText && !content.disabled">
      ≈ {{ content.subText }} {{ content.units | getCoinShowName(coinList) }}
    </div>
    <transition name="slide-fade">
      <div class="error-msg a-19-bg" v-if="content.isError">
        <p style="color: #edf4f8">{{ content.errorText }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput.styl";

export default {
  mixins: [mixin],
  // 改，2022.11.22 新增样式配置
  props: {
    inputStyle: {
      type: [String, Object],
      default: "",
    },
    // 2023.01.03 新增组件根部样式
    styles: {
      type: [String, Object],
      default: "",
    },
    // 改，2022.12.26 新增，用于展示输入框左侧选择按钮
    showBtn: {
      type: Boolean,
      default: false,
    },
    // 改，2023.05.26
    hideAddBtn: {
      type: Boolean,
      default: false,
    },
    // 改，2022.12.26 新增
    transactionType: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 加减器
    addOrSub(e) {
      const { type } = e.target.dataset;
      this.$emit("addOrSub", { type });
    },
  },
};
</script>

<style lang="stylus">
  .trade-grid {
  .input-item {
    height: 34px!important;
    .tit {
      float: left
    }
    .inputs {
      height: 32px!important;
      line-height: 32px!important;
      font-size: 14px!important;
      width: 80%!important;
      margin-top: 1px!important;
      margin-left: 5px!important;
      position: absolute;
    }
    .units {
      top: 10px!important;
    }
    .disabledText {
      line-height: 34px;
      margin-left: 27px;
      white-space: nowrap;
    }
  }
}
</style>
<style scoped>
.trade-input.trade-input-china-container {
  height: 82px;
}
.trade-input.trade-input-china-container .input-item {
  position: relative;
  display: flex;
  align-items: center;
}
.trade-input.trade-input-china-container .input-item .inputs {
  line-height: 52px;
  height: 52px;
}
.trade-input.trade-input-china-container .input-item .units {
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
.m-units > .tools {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.m-units > .tools > .item {
  width: 30px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  font-size: 24px;
  font-weight: bold;
  position: relative;
}
.m-units > .tools > .item.sub::after {
  content: "";
  width: 11px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.m-units > .tools > .item:first-child {
  margin-right: 6px;
}
.m-tab {
  display: flex;
  align-items: center;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.m-tab > .item {
  width: 48px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  background: rgba(255, 255, 255, 0.12);
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item:first-child {
  margin-right: 8px;
}
.m-tab > .item.active {
  background: #226afd;
}
.trade-input.trade-input-china-container .input-item {
  background: unset;
  border-radius: 4px;
}
</style>
