/*
* 2023.02.23 盘口列表闪烁动画Mixins
*  */
export default function flickerAnimation() {
  return {
    data() {
      return {
        randomNum: Math.floor(Math.random() * 10), // 2023.02.16 新增随机数(0-9)
        constNum: 1, // 常量，用于控制闪烁的频率，即 (0-9) > (0-9) + constNum, 增大-降低闪烁频率，范围必须在（1-8），否则没有意义
        timer: null, // 定时器
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        this.randomNum = Math.floor(Math.random() * 10);
      }, 2000);
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    computed: {
      // 返回动画类名，通过随机数控制显示哪一个动画
      calBgAnimation() {
        return function (num) {
          return num ? 'bgAnimation' : 'bgAnimation2';
        };
      },
    },
  };
}
