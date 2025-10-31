export default {
  name: "Charts",
  computed: {
    styleObject() {
      return { height: this.height };
    },
  },
  components: {},
  data() {
    return {
      isshowLoading: true,
      myEcharts: {},
      echartsData: {},
    };
  },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
    },
    height: {
      type: String,
      default: "50px",
    },
    haveBg: {
      type: Boolean,
      default: true,
    },
    // 改，2022.11.02，改颜色
    klineColor: {
      type: String,
      default: "#226afd",
    },
    lineWidth: {
      type: String,
      default: "2",
    },
    // 改，2022.12.16，曲线平滑程度
    smooth: {
      type: [Boolean, Number],
      default: false,
    }
  },
  watch: {
    dataList(value) {
      this.echartsData = value;
      this.eachart();
      this.$forceUpdate();
    },
  },
  beforeDestroy() {
    // 销毁实例
    this.myEcharts[this.name].dispose();
  },
  methods: {
    // 2023.04.26 重新初始化
    reSetChart() {
      this.echartsData = this.dataList;
      this.initEachart();
      this.eachart();
    },
    init() {
      this.initEachart();
    },
    eachart() {
      this.myEcharts[this.name].resize();
      this.myEcharts[this.name].setOption({
        series: [
          {
            data: this.echartsData,
            type: "line",
            lineStyle: {
              normal: {
                color: this.klineColor,
                width: this.lineWidth,
              },
            },
            smooth: this.smooth,
          },
        ],
      });
    },
    initEachart() {
      // 改，2022.11.02，改颜色
      let bg;
      if (this.haveBg) {
        bg = {
          normal: {
            color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(49, 106, 213, 0.85)" },
              { offset: 1, color: "rgba(49, 106, 213, 0)" },
            ]),
          },
        };
      }
      // 基于准备好的dom，初始化echarts实例
      this.myEcharts[this.name] = window.echarts.init(
        document.getElementById(`myEcharts${this.name}`)
      );
      // 绘制图表
      this.myEcharts[this.name].setOption({
        grid: {
          left: -10,
          bottom: 0,
          top: 0,
          right: -10,
        },
        xAxis: {
          show: false,
          type: "category",
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          show: false,
          type: "value",
          min: "dataMin",
          max: "dataMax",
        },
        series: [
          {
            data: [],
            type: "line",
            symbol: "none",
            lineStyle: {
              normal: {
                color: this.klineColor,
                width: 2,
              },
            },
            areaStyle: bg,
            smooth: this.smooth, // 2022.12.16 平滑曲线
          },
        ],
      });
    },
  },
};
