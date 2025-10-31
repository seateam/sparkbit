<template>
  <div>
    <span>
      {{ countDownTime }} S
    </span>
  </div>
</template>

<script>
import { cut, convertToLocaleTimeStamp } from "@/views/options/modules/tool";

export default {
  props: {
    endTime: {
      type: [String, Number],
      default: new Date().getTime(),
    },
    startTime: {
      type: [String, Number],
      default: new Date().getTime(),
    },
  },
  data() {
    return {
      countDownTime: 0,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.remainderTimeFn(this.startTime, this.endTime);
    }, 1000);
  },
  methods: {
    remainderTimeFn(startTime, endTime) {
      const startTimeStamp = convertToLocaleTimeStamp(startTime);
      const endTimeStamp = convertToLocaleTimeStamp(endTime);
      const nowDate = new Date().getTime();

      if (nowDate >= startTimeStamp && nowDate < endTimeStamp) {
        const timeDiff = cut(endTimeStamp, nowDate) / 1000;
        if (timeDiff > 0) {
          this.countDownTime = timeDiff.toFixed();
        }
      } else if (nowDate > endTimeStamp) {
        this.countDownTime = 0;
        clearInterval(this.timer);
        this.$emit("finishTwo");
      }
    },
  },
};
</script>

<style scoped></style>
