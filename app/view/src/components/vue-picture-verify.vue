<template>
  <div>
    <!-- 触发验证的按钮区域（保留原有交互与文案） -->
    <div class="m-verify" @click="handleOpen">
      <div v-if="verifyLoading" class="common-geetest-loading loading">
        <c-loading size="20" />
      </div>
      <div v-if="!verifyLoading && verifyStatus === 0" class="icon" aria-hidden="true">
        <svg
          width="23"
          height="23"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 10L7.37793 4.16113C5.15092 5.16286 3.59961 7.39986 3.59961 10C3.59961 13.5346 6.46538 16.4004 10 16.4004C13.5346 16.4004 16.4004 13.5346 16.4004 10C16.4004 7.39955 14.8485 5.16268 12.6211 4.16113L10 10Z"
            fill="#999999"
          />
        </svg>
      </div>
      <img
        v-if="verifyStatus === 1"
        :src="verifySuccess"
        alt="verified"
        style="width: 18.4px; height: 18.4px"
      />
      <div class="txt" :class="{ 's-green': verifyStatus === 1 }">{{ verifyTxt }}</div>
    </div>

    <!-- 滑块验证弹层 -->
    <div
      :class="['canvas-body', 'a-9-bg', { 'canvas-show': showVerify }]"
      role="dialog"
      aria-modal="true"
      aria-label="Slide Verification"
    >
      <div class="canvas-box" @mousedown.stop @touchstart.stop>
        <div class="slide-verify-container">
          <button class="close-btn" @click="closeVerify" aria-label="Close verification">×</button>

          <!-- 验证标题 -->
          <div class="verify-title">{{ language.finishVerify }}</div>

          <!-- 拼图验证区域 -->
          <div class="puzzle-container">
            <canvas
              ref="puzzleCanvas"
              class="puzzle-canvas"
              :width="canvasWidth"
              :height="canvasHeight"
            ></canvas>
            <canvas
              ref="blockCanvas"
              class="block-canvas"
              :width="canvasWidth"
              :height="canvasHeight"
              :style="{ left: blockLeft + 'px' }"
            ></canvas>
          </div>

          <!-- 滑块轨道 -->
          <div class="slider-track">
            <div class="slider-bg">
              <div class="slider-text">{{ sliderText }}</div>
              <div
                class="slider-btn"
                :class="{ 'slider-btn-success': isSuccess, 'slider-btn-fail': isFail }"
                :style="{ left: sliderLeft + 'px' }"
                @mousedown="onSliderMouseDown"
                @touchstart="onSliderTouchStart"
              >
                <div class="slider-icon">
                  <svg
                    v-if="!isSuccess && !isFail"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg v-if="isSuccess" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg v-if="isFail" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 刷新按钮 -->
          <div class="refresh-btn" @click="refreshPuzzle" :title="language.refresh || '刷新'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div v-if="isLoading" class="vue-picture-loading">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pictureVerify from "../assets/js/picture-verify";

export default {
  name: "VueSlideVerify",
  mixins: [pictureVerify],
  props: {
    // 验证难度：'easy' | 'medium' | 'hard'
    difficulty: { type: String, default: "medium" },
    // 主题：'light' | 'dark'
    theme: { type: String, default: "light" },
  },
  data() {
    return {
      // Canvas 尺寸
      canvasWidth: 320,
      canvasHeight: 160,

      // 拼图块相关
      blockSize: 42,
      blockRadius: 8,
      blockX: 0,
      blockY: 0,
      blockLeft: 0,

      // 滑块相关
      sliderLeft: 0,
      sliderText: "",
      isSliding: false,
      startX: 0,

      // 验证状态
      isSuccess: false,
      isFail: false,
      isLoading: false,

      // 背景图片
      backgroundImage: null,
      puzzleData: null,

      // 验证精度
      tolerance: 5,
    };
  },
  computed: {
    // 根据难度调整容错范围
    actualTolerance() {
      const toleranceMap = {
        easy: 10,
        medium: 5,
        hard: 3,
      };
      return toleranceMap[this.difficulty] || 5;
    },
  },
  watch: {
    showVerify(val) {
      if (val) {
        this.$nextTick(() => {
          this.initPuzzle();
        });
      }
    },
    // 监听语言变化，更新滑块文本
    "language.slideToComplete"() {
      if (!this.isSliding && !this.isSuccess && !this.isFail) {
        this.sliderText = this.language.slideToComplete;
      }
    },
  },
  methods: {
    // 统一入口：沿用旧交互（点击 -> loading -> 打开弹层）
    handleOpen() {
      this.openVerify();
    },

    // 初始化拼图验证
    async initPuzzle() {
      this.isLoading = true;
      // 初始化滑块文本
      this.sliderText = this.language.slideToComplete;
      try {
        await this.loadBackgroundImage();
        this.generatePuzzle();
        this.drawPuzzle();
        this.resetSlider();
      } catch (error) {
        console.error("Failed to initialize puzzle:", error);
        this.onVerifyError();
      } finally {
        this.isLoading = false;
      }
    },

    // 加载背景图片
    loadBackgroundImage() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        // 使用随机图片API或本地图片
        const imageUrls = [
          "https://picsum.photos/320/160?random=1",
          "https://picsum.photos/320/160?random=2",
          "https://picsum.photos/320/160?random=3",
          "https://picsum.photos/320/160?random=4",
          "https://picsum.photos/320/160?random=5",
        ];

        img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        img.onload = () => {
          this.backgroundImage = img;
          resolve();
        };

        img.onerror = () => {
          // 如果网络图片加载失败，使用纯色背景
          this.createFallbackImage();
          resolve();
        };
      });
    },

    // 创建备用图片
    createFallbackImage() {
      const canvas = document.createElement("canvas");
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      const ctx = canvas.getContext("2d");

      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
      gradient.addColorStop(0, "#667eea");
      gradient.addColorStop(1, "#764ba2");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 添加一些装饰性元素
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * this.canvasWidth;
        const y = Math.random() * this.canvasHeight;
        const radius = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      this.backgroundImage = canvas;
    },

    // 生成拼图位置
    generatePuzzle() {
      const padding = this.blockSize + 10;
      this.blockX = Math.random() * (this.canvasWidth - this.blockSize - padding) + padding;
      this.blockY = Math.random() * (this.canvasHeight - this.blockSize - 20) + 10;
    },

    // 绘制拼图
    drawPuzzle() {
      this.drawBackground();
      this.drawBlock();
    },

    // 绘制背景（带缺口）
    drawBackground() {
      const canvas = this.$refs.puzzleCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 绘制背景图片
      if (this.backgroundImage) {
        ctx.drawImage(this.backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);
      }

      // 创建拼图形状路径
      const blockPath = this.createBlockPath(this.blockX, this.blockY);

      // 绘制缺口（使用合成模式）
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill(blockPath);
      ctx.restore();

      // 绘制缺口边框
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke(blockPath);
      ctx.restore();
    },

    // 绘制拼图块
    drawBlock() {
      const canvas = this.$refs.blockCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      if (!this.backgroundImage) return;

      // 创建拼图块路径 - 始终在canvas左侧绘制（x=0）
      // 拼图块的移动通过CSS的left属性实现，而不是改变绘制位置
      const blockPath = this.createBlockPath(0, this.blockY);

      // 裁剪出拼图块
      ctx.save();
      ctx.clip(blockPath);
      // 绘制背景图片时需要偏移，使拼图块显示正确的图像部分
      ctx.drawImage(this.backgroundImage, -this.blockX, 0, this.canvasWidth, this.canvasHeight);
      ctx.restore();

      // 绘制拼图块边框
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke(blockPath);
      ctx.restore();

      // 添加阴影效果
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.stroke(blockPath);
      ctx.restore();
    },

    // 创建拼图块路径 - 星形logo形状
    createBlockPath(x, y) {
      const path = new Path2D();
      const size = this.blockSize;

      // 缩放比例，将logo适配到拼图块大小
      const scale = size / 43; // logo原始宽度为43
      const offsetY = (size - 40 * scale) / 2; // logo原始高度为40，居中对齐

      // 第一个路径 - logo的下半部分（紫色部分）
      const path1 = `M${23.0311 * scale + x} ${15.875 * scale + y + offsetY}C${
        23.054 * scale + x
      } ${15.875 * scale + y + offsetY} ${23.0765 * scale + x} ${15.8774 * scale + y + offsetY} ${
        23.0984 * scale + x
      } ${15.8811 * scale + y + offsetY}C${23.228 * scale + x} ${15.889 * scale + y + offsetY} ${
        23.3512 * scale + x
      } ${15.9597 * scale + y + offsetY} ${23.4211 * scale + x} ${16.0806 * scale + y + offsetY}L${
        34.7166 * scale + x
      } ${35.6427 * scale + y + offsetY}C${34.8272 * scale + x} ${35.8343 * scale + y + offsetY} ${
        34.7617 * scale + x
      } ${36.0794 * scale + y + offsetY} ${34.5701 * scale + x} ${36.19 * scale + y + offsetY}L${
        28.0631 * scale + x
      } ${39.9462 * scale + y + offsetY}C${27.8715 * scale + x} ${40.0568 * scale + y + offsetY} ${
        27.6265 * scale + x
      } ${39.9913 * scale + y + offsetY} ${27.5159 * scale + x} ${39.7997 * scale + y + offsetY}L${
        20.9226 * scale + x
      } ${28.3812 * scale + y + offsetY}L${14.3303 * scale + x} ${39.7982 * scale + y + offsetY}C${
        14.2197 * scale + x
      } ${39.9897 * scale + y + offsetY} ${13.9746 * scale + x} ${40.0554 * scale + y + offsetY} ${
        13.7831 * scale + x
      } ${39.9449 * scale + y + offsetY}L${7.27603 * scale + x} ${36.1884 * scale + y + offsetY}C${
        7.08453 * scale + x
      } ${36.0778 * scale + y + offsetY} ${7.01895 * scale + x} ${35.8329 * scale + y + offsetY} ${
        7.12955 * scale + x
      } ${35.6414 * scale + y + offsetY}L${13.5474 * scale + x} ${24.5267 * scale + y + offsetY}H${
        0.400541 * scale + x
      }C${0.179332 * scale + x} ${24.5267 * scale + y + offsetY} ${6.73369e-6 * scale + x} ${
        24.3474 * scale + y + offsetY
      } ${0 * scale + x} ${24.1262 * scale + y + offsetY}V${16.2755 * scale + y + offsetY}C${
        1.4612e-5 * scale + x
      } ${16.0543 * scale + y + offsetY} ${0.179337 * scale + x} ${15.875 * scale + y + offsetY} ${
        0.400541 * scale + x
      } ${15.875 * scale + y + offsetY}H${23.0311 * scale + x}Z`;

      // 第二个路径 - logo的上半部分（黑色部分）
      const path2 = `M${13.9944 * scale + x} ${0.0536853 * scale + y + offsetY}C${
        14.1859 * scale + x
      } ${-0.0568749 * scale + y + offsetY} ${14.431 * scale + x} ${
        0.0088127 * scale + y + offsetY
      } ${14.5416 * scale + x} ${0.200368 * scale + y + offsetY}L${21.1349 * scale + x} ${
        11.6187 * scale + y + offsetY
      }L${27.7277 * scale + x} ${0.200564 * scale + y + offsetY}C${27.8384 * scale + x} ${
        0.00899662 * scale + y + offsetY
      } ${28.0834 * scale + x} ${-0.056715 * scale + y + offsetY} ${28.275 * scale + x} ${
        0.0538809 * scale + y + offsetY
      }L${34.782 * scale + x} ${3.81033 * scale + y + offsetY}C${34.9734 * scale + x} ${
        3.92096 * scale + y + offsetY
      } ${35.039 * scale + x} ${4.16585 * scale + y + offsetY} ${34.9285 * scale + x} ${
        4.35736 * scale + y + offsetY
      }L${28.3436 * scale + x} ${15.7616 * scale + y + offsetY}H${41.6571 * scale + x}C${
        41.8783 * scale + x
      } ${15.7617 * scale + y + offsetY} ${42.0576 * scale + x} ${15.941 * scale + y + offsetY} ${
        42.0576 * scale + x
      } ${16.1622 * scale + y + offsetY}V${23.6749 * scale + y + offsetY}C${42.0576 * scale + x} ${
        23.896 * scale + y + offsetY
      } ${41.8782 * scale + x} ${24.0754 * scale + y + offsetY} ${41.6571 * scale + x} ${
        24.0754 * scale + y + offsetY
      }H${29.8188 * scale + x}L${24.3437 * scale + x} ${14.5933 * scale + y + offsetY}C${
        24.326 * scale + x
      } ${14.5626 * scale + y + offsetY} ${24.3062 * scale + x} ${14.5336 * scale + y + offsetY} ${
        24.2852 * scale + x
      } ${14.5062 * scale + y + offsetY}C${24.1401 * scale + x} ${14.3016 * scale + y + offsetY} ${
        23.9016 * scale + x
      } ${14.1677 * scale + y + offsetY} ${23.6316 * scale + x} ${14.1677 * scale + y + offsetY}H${
        13.0055 * scale + x
      }L${7.34085 * scale + x} ${4.35716 * scale + y + offsetY}C${7.23025 * scale + x} ${
        4.16562 * scale + y + offsetY
      } ${7.29583 * scale + x} ${3.92075 * scale + y + offsetY} ${7.48734 * scale + x} ${
        3.81013 * scale + y + offsetY
      }L${13.9944 * scale + x} ${0.0536853 * scale + y + offsetY}Z`;

      // 使用Path2D的addPath方法添加SVG路径
      const svgPath1 = new Path2D(path1);
      const svgPath2 = new Path2D(path2);

      path.addPath(svgPath1);
      path.addPath(svgPath2);

      return path;
    },

    // 滑块鼠标按下事件
    onSliderMouseDown(e) {
      if (this.isSuccess || this.isFail || this.isLoading) return;

      this.isSliding = true;
      this.startX = e.clientX;
      this.sliderText = this.language.verifying;

      document.addEventListener("mousemove", this.onSliderMouseMove);
      document.addEventListener("mouseup", this.onSliderMouseUp);

      e.preventDefault();
    },

    // 滑块触摸开始事件
    onSliderTouchStart(e) {
      if (this.isSuccess || this.isFail || this.isLoading) return;

      this.isSliding = true;
      this.startX = e.touches[0].clientX;
      this.sliderText = this.language.verifying;

      document.addEventListener("touchmove", this.onSliderTouchMove);
      document.addEventListener("touchend", this.onSliderTouchEnd);

      e.preventDefault();
    },

    // 滑块鼠标移动事件
    onSliderMouseMove(e) {
      if (!this.isSliding) return;

      const deltaX = e.clientX - this.startX;
      this.updateSliderPosition(deltaX);

      e.preventDefault();
    },

    // 滑块触摸移动事件
    onSliderTouchMove(e) {
      if (!this.isSliding) return;

      const deltaX = e.touches[0].clientX - this.startX;
      this.updateSliderPosition(deltaX);

      e.preventDefault();
    },

    // 更新滑块位置
    updateSliderPosition(deltaX) {
      const maxLeft = this.canvasWidth - 40; // 滑块按钮宽度
      this.sliderLeft = Math.max(0, Math.min(deltaX, maxLeft));
      // 拼图块跟随滑块移动，但从左侧开始
      this.blockLeft = this.sliderLeft;
    },

    // 滑块鼠标释放事件
    onSliderMouseUp() {
      document.removeEventListener("mousemove", this.onSliderMouseMove);
      document.removeEventListener("mouseup", this.onSliderMouseUp);
      this.onSliderEnd();
    },

    // 滑块触摸结束事件
    onSliderTouchEnd() {
      document.removeEventListener("touchmove", this.onSliderTouchMove);
      document.removeEventListener("touchend", this.onSliderTouchEnd);
      this.onSliderEnd();
    },

    // 滑块结束事件
    onSliderEnd() {
      if (!this.isSliding) return;

      this.isSliding = false;

      // 验证位置是否正确
      const targetX = this.blockX;
      const currentX = this.sliderLeft;
      const diff = Math.abs(targetX - currentX);

      if (diff <= this.actualTolerance) {
        this.onVerifySuccess();
      } else {
        this.onVerifyFail();
      }
    },

    // 验证成功
    onVerifySuccess() {
      this.isSuccess = true;
      this.isFail = false;
      this.sliderText = this.language.verifySuccess;

      // 生成验证token
      const token = this.generateToken();

      setTimeout(() => {
        this.verifyTxt = this.language.verifySuccess;
        this.verifyStatus = 1;
        this.showVerify = false;
        this.$emit("success", { token, type: "slide" });
      }, 800);
    },

    // 验证失败
    onVerifyFail() {
      this.isFail = true;
      this.isSuccess = false;
      this.sliderText = this.language.verifyFailed;

      setTimeout(() => {
        this.resetSlider();
        this.refreshPuzzle();
      }, 1000);

      this.$emit("fail");
    },

    // 验证错误
    onVerifyError() {
      this.verifyTxt = this.language.finishVerify;
      this.$emit("fail");
      this.showVerify = false;
    },

    // 重置滑块
    resetSlider() {
      this.sliderLeft = 0;
      this.blockLeft = 0; // 拼图块初始位置在最左侧
      this.isSuccess = false;
      this.isFail = false;
      this.isSliding = false;
      this.sliderText = this.language.slideToComplete;
    },

    // 刷新拼图
    refreshPuzzle() {
      this.resetSlider();
      this.initPuzzle();
    },

    // 生成验证token
    generateToken() {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2);
      return `slide_${timestamp}_${random}`;
    },

    // 关闭验证
    closeVerify() {
      this.showVerify = false;
      this.resetSlider();
      this.verifyTxt = this.language.clickVerify;
      this.$emit("cancel");
    },
  },

  beforeDestroy() {
    // 清理事件监听器
    document.removeEventListener("mousemove", this.onSliderMouseMove);
    document.removeEventListener("mouseup", this.onSliderMouseUp);
    document.removeEventListener("touchmove", this.onSliderTouchMove);
    document.removeEventListener("touchend", this.onSliderTouchEnd);
  },
};
</script>

<style scoped>
/* 弹层与加载样式（保留旧的基础视觉反馈） */
.canvas-body {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: none;
}
.canvas-show {
  display: flex;
}
.canvas-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  user-select: none;
  border-radius: 8px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.2);
}

/* 滑块验证容器 */
.slide-verify-container {
  position: relative;
  min-width: 360px;
  min-height: 280px;
}

/* 验证标题 */
.verify-title {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

/* 拼图容器 */
.puzzle-container {
  position: relative;
  width: 320px;
  height: 160px;
  margin: 0 auto 20px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.puzzle-canvas,
.block-canvas {
  position: absolute;
  top: 0;
  border-radius: 4px;
}

.puzzle-canvas {
  left: 0;
  z-index: 1;
}

.block-canvas {
  z-index: 2;
  transition: none;
}

/* 滑块轨道 */
.slider-track {
  width: 320px;
  height: 40px;
  margin: 0 auto;
  position: relative;
}

.slider-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f7f9fa 0%, #e4e7ed 100%);
  border-radius: 20px;
  position: relative;
  border: 1px solid #e4e7ed;
}

.slider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #909399;
  pointer-events: none;
  z-index: 1;
}

.slider-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  z-index: 2;
  border: 1px solid #e4e7ed;
}

.slider-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.slider-btn-success {
  background: #67c23a;
  border-color: #67c23a;
}

.slider-btn-success .slider-icon {
  color: #fff;
}

.slider-btn-fail {
  background: #f56c6c;
  border-color: #f56c6c;
}

.slider-btn-fail .slider-icon {
  color: #fff;
}

.slider-icon {
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 刷新按钮 */
.refresh-btn {
  position: absolute;
  bottom: 70px;
  right: 10px;
  z-index: 2;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(180deg);
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #333;
  color: #fff;
  cursor: pointer;
  line-height: 28px;
  text-align: center;
  font-size: 18px;
  z-index: 10;
}

.close-btn:hover {
  background: #555;
}

/* 加载动画 */
.vue-picture-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.loader {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
  z-index: 99999;
  animation: animate 2s linear infinite;
}

.loader::before {
  content: "";
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  background-color: #000;
  border-radius: 50%;
  z-index: 1000;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}

.loader::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
  border-radius: 50%;
  z-index: 1;
  filter: blur(30px);
}

/* 触发区样式（沿用旧风格） */
.m-verify {
  padding: 12px 12px 12px 16px;
  width: 444px;
  height: 51px;
  box-sizing: border-box;
  border: 1px solid var(--color-Input-border);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: var(--color-14);
}

.m-verify > .txt.s-green {
  color: var(--color-text-primary);
}

.m-verify > .txt {
  position: unset;
  height: unset;
  line-height: unset;
  bottom: unset;
  left: unset;
  font-size: 14px;
  color: rgb(146, 146, 146);
  padding-left: 10px;
}

.m-verify > .icon {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  transition: all ease;
  position: relative;
}

.m-verify:hover > .icon {
  animation: 1s ease breathe infinite;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .canvas-box {
    width: 90vw;
    padding: 15px;
  }

  .slide-verify-container {
    min-width: auto;
    width: 100%;
  }

  .puzzle-container,
  .slider-track {
    width: 280px;
  }

  .verify-title {
    font-size: 14px;
  }
}

/* 暗色主题支持 */
.theme-dark .canvas-box {
  background: #2d3748;
  color: #fff;
}

.theme-dark .verify-title {
  color: #fff;
}

.theme-dark .slider-bg {
  background: linear-gradient(90deg, #4a5568 0%, #2d3748 100%);
  border-color: #4a5568;
}

.theme-dark .slider-text {
  color: #a0aec0;
}

.theme-dark .slider-btn {
  background: #4a5568;
  border-color: #4a5568;
}

.theme-dark .slider-icon {
  color: #a0aec0;
}
</style>
