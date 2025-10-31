<template>
  <div class="download-container f-2-cl" v-if="flag">
    <div class="download-options c-5-bd">
      <div class="download-options-logo">
        <img v-if="theme === 'Dark'" :src="imgMap.logo" alt="" style="object-fit: contain" />
        <img v-if="theme === 'Light'" :src="imgMap.logo_light" alt="" style="object-fit: contain" />
      </div>
      <p class="download-options-name f-8-cl">
        {{ $t("appDownLoad.title") }}
      </p>
      <!-- 随时随地 多平台终端交易 -->
      <p class="download-options-text">{{ $t("appDownLoad.desc") }}</p>
      <div class="download-options-buttons">
        <!-- PC端显示两个按钮 -->
        <template v-if="!isH5">
          <c-button height="50px" className="download-button" @click="download('ios_ipa')">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_13"></use>
            </svg>
            &nbsp;
            {{ $t("appDownLoad.platform")[0] }}
          </c-button>
          <c-button height="50px" className="download-button" @click="download('android')">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_14"></use>
            </svg>
            &nbsp;
            {{ $t("appDownLoad.platform")[1] }}
          </c-button>
        </template>
      </div>
      <!-- 扫描二维码下载 -->
      <div class="download-options-rq">
        <img :src="appDownload.app_page_url" alt="" />
        <div class="download-options-subtitle">
          <p class="download-options-reText">
            {{ $t("appDownLoad.twoDimension") }}
          </p>
          <p class="download-options-appText">iOS & Android APP</p>
        </div>
      </div>
      <!-- 移动端根据设备类型显示对应按钮 -->
      <template v-if="isH5">
        <c-button
          v-if="isIOS"
          height="50px"
          className="download-button mobile-download-btn"
          @click="download('ios_ipa')"
        >
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_13"></use>
          </svg>
          &nbsp;
          {{ $t("appDownLoad.platform")[0] }}
        </c-button>
        <c-button
          v-else
          height="50px"
          className="download-button mobile-download-btn"
          @click="download('android')"
        >
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_14"></use>
          </svg>
          &nbsp;
          {{ $t("appDownLoad.platform")[1] }}
        </c-button>
      </template>
    </div>
    <img v-if="theme === 'Dark'" class="download-banner" :src="imgMap.banner" alt="" />
    <img v-if="theme === 'Light'" class="download-banner light" :src="imgMap.light_banner" alt="" />
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/appDownload/appDownload";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/appDownload/appDownload.styl";
import { isMobile } from "@/utils/newUtils";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      imgMap: {
        logo: imgMap.spark_logo,
        logo_light: imgMap.spark_logo_dark,
        banner: imgMap.download_banner,
        light_banner: imgMap.download_banner_light,
      },
      theme: "Dark",
      isH5: false,
      isIOS: false,
    };
  },
  mounted() {
    this.init();
    let bodyClass = document.querySelector("body");
    bodyClass = bodyClass.getAttribute("class");
    this.theme = bodyClass.includes("light") ? "Light" : "Dark";
    this.$bus.$on("switchTheme", (th) => {
      this.theme = th === "light" ? "Light" : "Dark";
    });

    // 检测设备类型
    this.detectDevice();
    isMobile();
  },
  methods: {
    detectDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // 检测是否为移动设备
      this.isH5 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      // 检测是否为iOS设备
      this.isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    },
  },
};
</script>
<style lang="stylus" scoped>
.download-nav {
  overflow: hidden;
}

.isH5 {
  .download-container{
    width: 100vw;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    position: relative;
    background:var(--color-BG)

    .download-options {
      width:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      max-width: 400px;
      padding: 80px 20px 0 20px;
      z-index: 2;
    }

    .download-banner{
      width: 300px;
      height: auto;
      margin-bottom: 80px;
    }

    .download-options-logo {
      margin-bottom: 20px;
      img {
        width: 200px;
        height: auto;
      }
    }

    .download-options-name {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 10px 0;
      line-height: 1.2;
    }

    .download-options-text {
      font-size: 16px;
      line-height: 1.4;
      margin: 0;
      text-align: center;
    }

    .download-options-rq {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;

      img {
        border-radius: 16px;
        width: 160px;
        height: 160px;
      }
    }



       .download-button {
        width: 300px;
        height: 50px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;

        .icon {
          margin-right: 8px;
        }
    }

    .download-options-reText {
      display: none;
    }

    .download-options-appText {
      display: none;
    }
  }
}
</style>
