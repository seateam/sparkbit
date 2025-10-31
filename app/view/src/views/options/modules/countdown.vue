<template>
  <div class="item_box">
    <div class="item item_3">
      <div class="progress_bar txt-29-bg " :style="{ '--inp-width': inpWidth }"></div>
    </div>

    <div class="item_4">
      <span class="txt-27-cl txt-27-cl key">Remaining Time</span>
      <!--                <span class="txt-8-cl val"> {{remainderTimeFn(1708608743362) }}</span>-->
      <span class="txt-8-cl val">&nbsp;&nbsp;<span class="txt-8-cl">{{ remainderTime }} </span></span>
    </div>
  </div>
</template>

<script>
import { cut, convertToLocaleTimeStamp } from "@/views/options/modules/tool";

export default {
  data() {
    return {
      remainderTime: "00:00:00",
      inpWidth: "0%",
    };
  },
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
  mounted() {
    setInterval(() => {
      this.remainderTimeFn(this.startTime, this.endTime);
    });
  },
  methods: {
    remainderTimeFn(startTime, endTime) {
      const startTimeStamp = convertToLocaleTimeStamp(startTime);
      const endTimeStamp = convertToLocaleTimeStamp(endTime);
      const nowDate = new Date().getTime();
      const allTimeRange = cut(endTimeStamp, startTimeStamp) / 1000;
      // const timeDiff = (new Date(endTime).getTime()- new Date().getTime())/1000;
      if (nowDate >= startTimeStamp) {
        const timeDiff = cut(endTimeStamp, new Date().getTime()) / 1000;
        if (timeDiff >= 0) {
          this.remainderTime = this.formatCountdown(timeDiff.toFixed());
          this.inpWidth = `${(timeDiff / allTimeRange * 100).toFixed(2)}%`;
        } else {
          this.$emit("finish");
        }
      } else {
        const timeDiff = cut(endTimeStamp, startTimeStamp) / 1000;
        if (timeDiff >= 0) {
          this.remainderTime = this.formatCountdown(timeDiff.toFixed());
          this.inpWidth = `100%`;
        }
      }
    },
    formatCountdown(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },

    convertToLocaleTime(eastEightTimeString) {
      // 创建一个日期对象，传入东八区时间字符串
      const eastEightDate = new Date(eastEightTimeString);

      // 获取本地时区与 UTC 时间的分钟差值
      const offsetMinutes = new Date().getTimezoneOffset();

      // 计算东八区时间与本地时间的时间差值（毫秒数）
      const offsetMilliseconds = (offsetMinutes + 8 * 60) * 60 * 1000;

      // 根据时间差值调整时间
      const localeDate = new Date(eastEightDate.getTime() - offsetMilliseconds);

      // 获取年、月、日、时、分、秒
      const year = localeDate.getFullYear();
      const month = String(localeDate.getMonth() + 1).padStart(2, '0');
      const day = String(localeDate.getDate()).padStart(2, '0');
      const hours = String(localeDate.getHours()).padStart(2, '0');
      const minutes = String(localeDate.getMinutes()).padStart(2, '0');
      const seconds = String(localeDate.getSeconds()).padStart(2, '0');

      // 返回格式化后的时间字符串
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style scoped>
.item_box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item_3 {
  height: 8px;
}

.progress_bar {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  position: relative;
}

.progress_bar:before {
  content: "";
  height: 100%;
  width: var(--inp-width);
  position: absolute;
  background-color: rgba(16, 88, 222, 1);
  border-radius: 28px;
}
.txt-27-cl {
   color: rgba(102, 102, 102, 1)
}
.txt-8-cl {
  color: var(--color-1)
}
.txt-29-bg {
  background-color: rgba(255, 255, 255, 0.08)
}
</style>
