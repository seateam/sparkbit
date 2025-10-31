<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-input trade-input-china-container" :class="{'disabledForm' : content.disabled}">
    <div class="input-item"
        @click="inputFocus"
        :class="ItemClass">
      <div class="tit">{{content.title}}</div>
      <!--改，2022.11.22 新增样式配置-->
      <input
          class="inputs b-1-cl"
          v-if="!content.disabled"
          ref="inputs"
          @input="handleInput($event.target.value)"
          @focus="handle('focus',$event.target.value)"
          @blur="handle('blur', $event.target.value)"
          v-model="valueData"
          type="text"
          :style="inputStyle"
      />
      <p v-if="content.disabled" class="disabledText">{{content.disabledText}}</p>
      <span class="units">
        {{content.units | getCoinShowName(coinList)}}
      </span>
    </div>
    <div class="price-rate"
          v-if="content.subText && !content.disabled">
          ≈ {{content.subText}}
    </div>
    <transition name="slide-fade">
      <div class="error-msg a-19-bg"
            v-if="content.isError">
        <p style="color:#EDF4F8">{{content.errorText}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput.styl';

export default {
  mixins: [mixin],
  // 改，2022.11.22 新增样式配置
  props: {
    inputStyle: {
      type: [String, Object],
      default: "",
    },
  },
  mounted() {
    this.init();
  },
};

</script>

<style lang="stylus">
  .trade-grid {
  .input-item {
    height: 38px!important;
    .tit {
      float: left
    }
    .inputs {
      height: 38px!important;
      line-height: 38px!important;
      font-size: 14px!important;
      width: 80%!important;
      margin-top: 1px!important;
      margin-left: 5px!important;
      position: absolute;
      font-weight: 500;
    }
    .units {
      top: 10px!important;
    }
    .disabledText {
      line-height: 38px;
      margin-left: 27px;
      white-space: nowrap;
      color: var(--color-1);
      font-weight: 500;
    }
  }
  .trade-input-china-container {
    height: 64px!important;

  }
}
.disabledForm {
  .disabledText {
    margin-left: auto;
    color: var(--color-1);
  }
  .units {
    padding-left: 20px;
  }
  &.trade-input.trade-input-china-container .input-item .tit {
    color: var(--color-text-secondary);
  }
}
</style>
