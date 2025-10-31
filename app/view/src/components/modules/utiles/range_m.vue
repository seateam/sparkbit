<template>
  <div class="rangeBox">
    <input
      type="range"
      :min="0"
      :max="100"
      id="range_1"
      :value="rangeValue"
      @input="handlerInput"
      :title="rangeValue + '%'"
      :style="{ '--select-value': rangeValue + '%' }"
      :disabled="!isLogin || disabled"
    />
    <div class="scale">
      <span
        :class="{ pre: rangeValue >= 0, last: rangeValue >= 0 && rangeValue < 25 }"
        @click="stepHandle(0)"
      >
        <p>0%</p>
      </span>
      <span
        :class="{ pre: rangeValue >= 25, last: rangeValue >= 25 && rangeValue < 50 }"
        @click="stepHandle(25)"
      >
        <p>25%</p>
      </span>
      <span
        :class="{ pre: rangeValue >= 50, last: rangeValue >= 50 && rangeValue < 75 }"
        @click="stepHandle(50)"
      >
        <p>50%</p>
      </span>
      <span
        :class="{ pre: rangeValue >= 75, last: rangeValue >= 75 && rangeValue < 100 }"
        @click="stepHandle(75)"
      >
        <p>75%</p>
      </span>
      <span :class="{ pre: rangeValue == 100, last: rangeValue == 100 }" @click="stepHandle(100)">
        <p>100%</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    rangeV: {
      default: 0,
    },
  },
  data() {
    return {
      rangeValue: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
  },
  watch: {
    rangeV(newV) {
      if (newV > 100) {
        this.rangeValue = 100;
      } else {
        this.rangeValue = +newV || 0;
      }
    },
  },
  methods: {
    handlerInput(e) {
      const { value } = e.target;
      this.rangeValue = value;
      this.$emit("rangeValue", value);
    },
    stepHandle(value) {
      this.rangeValue = value;
      this.$emit("rangeValue", value);
    },
  },
};
</script>

<style scoped lang="stylus">
/* 隐藏默认的滑块条 */
input[type="range"] {
  -webkit-appearance: none;
  padding: 10px 0;
  width: 100%;
  position: relative;
  cursor pointer
  z-index: 2;
}

/* 定义滑块条的轨道样式 */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background-color: var(--color-Input-border);
  border-radius: 5px;
  border: none;
  pointer-events: auto;
}

/* input[type="range"]::-webkit-slider-container {
    height: 20px;
    overflow: hidden;
} */

/* 定义滑块条的滑块样式 */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background-size: contain;
  border-radius: 50%;
  border: none;
  margin-top: -8px;
  //transform translateY(-30%)
  z-index: 9;
  position: relative;
}

input[type="range"]::before {
  content: '';
  height: 2px;
  width: var(--select-value);
  background-color: rgba(106, 96, 255, 1);
  display: inline-block;
  position: absolute;
  left: 0;
  border-radius: 10px;
  z-index: 1;
}

/* 定义滑块条的滑块样式（Firefox） */
input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
  border: none;
}

.scale {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.rangeBox {
  position: relative;
}

.scale span, .scale p {
  pointer-events: auto;
}

span {
  position: relative;
  width: 8px;
  height: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--color-Input-border);
  display: inline-block;
  background: var(--trade-color-2);
  z-index: 2;
  margin: 7px 0;
  box-sizing: border-box;
  border-radius: 50%;
  position relative
  cursor: pointer;

  p{
    position: absolute;
    bottom: -21px;
    left: 50%;
    width: 28px;
    margin-left: -14px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-align: center;
    cursor: pointer;
  }

  &.pre {
    background: rgba(106, 96, 255, 1);
    border-color: rgba(106, 96, 255, 1);
  }
  &.last{
    background: rgba(255, 255, 255, 1);
    p{
      color: var(--color-1);
    }
  }

  //&::after {
  //  content: '';
  //  width: 5px;
  //  background-color:#1E2026;
  //  display: inline-block;
  //  height: 100%;
  //  left: 8px;
  //  position: absolute;
  //  top 0
  //}
  //&::before {
  //  content: '';
  //  width: 5px;
  //  background-color:#1E2026;
  //  display: inline-block;
  //  height: 100%;
  //  right: 8px;
  //  position: absolute;
  //  top 0
  //}
}
</style>
