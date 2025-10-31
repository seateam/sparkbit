<template>
  <section class="banner-container">
    <div class="banner-content">
      <div class="left">
        <div class="title" :class="{'long-lan': ['en_US','ru_RU','vi_VN'].includes(lan)}" data-aos="fade-up">
          <img class="logo" :src="spark" />
          <!-- <img class="light-show logo" :src="spark_d" /> -->
          <span>{{ $t("landingPage.title") }}</span>
        </div>
        <div class="btn-wrap">
          <c-button height="64px" data-aos="zoom-out" data-aos-delay="1000" style="margin-right: 20px" @click="btnLink('/register')">
            <div>
              <span>{{ $t("landingPage.trySparkbit") }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 24px; height: 24px"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
            <div>
              <span>{{ $t("landingPage.trySparkbit") }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 24px; height: 24px"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </c-button>
          <div class="down-wrap" data-aos="zoom-out" data-aos-delay="800">
            <c-button class="common-button-hollow common-button-text downapp-btn" height="64px" @click="btnLink('/appDownload')">
              <div v-for="item in 2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="22"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    v-show="item == 1"
                    d="M0 8.90647V0.0175781H8.88889V8.90647H0ZM2.22222 6.68425H6.66667V2.2398H2.22222V6.68425ZM0 20.0176V11.1287H8.88889V20.0176H0ZM2.22222 17.7954H6.66667V13.3509H2.22222V17.7954ZM11.1111 8.90647V0.0175781H20V8.90647H11.1111ZM13.3333 6.68425H17.7778V2.2398H13.3333V6.68425ZM17.7778 20.0176V17.7954H20V20.0176H17.7778ZM11.1111 13.3509V11.1287H13.3333V13.3509H11.1111ZM13.3333 15.5731V13.3509H15.5556V15.5731H13.3333ZM11.1111 17.7954V15.5731H13.3333V17.7954H11.1111ZM13.3333 20.0176V17.7954H15.5556V20.0176H13.3333ZM15.5556 17.7954V15.5731H17.7778V17.7954H15.5556ZM15.5556 13.3509V11.1287H17.7778V13.3509H15.5556ZM17.7778 15.5731V13.3509H20V15.5731H17.7778Z"
                    fill="white"
                  />
                  <path
                    v-show="item == 2"
                    d="M0 8.90647V0.0175781H8.88889V8.90647H0ZM2.22222 6.68425H6.66667V2.2398H2.22222V6.68425ZM0 20.0176V11.1287H8.88889V20.0176H0ZM2.22222 17.7954H6.66667V13.3509H2.22222V17.7954ZM11.1111 8.90647V0.0175781H20V8.90647H11.1111ZM13.3333 6.68425H17.7778V2.2398H13.3333V6.68425ZM17.7778 20.0176V17.7954H20V20.0176H17.7778ZM11.1111 13.3509V11.1287H13.3333V13.3509H11.1111ZM13.3333 15.5731V13.3509H15.5556V15.5731H13.3333ZM11.1111 17.7954V15.5731H13.3333V17.7954H11.1111ZM13.3333 20.0176V17.7954H15.5556V20.0176H13.3333ZM15.5556 17.7954V15.5731H17.7778V17.7954H15.5556ZM15.5556 13.3509V11.1287H17.7778V13.3509H15.5556ZM17.7778 15.5731V13.3509H20V15.5731H17.7778Z"
                    fill="#000000"
                  />
                </svg>
                <span>{{ $t("landingPage.downApp") }}</span>
              </div>
            </c-button>
            <div class="qrcode">
              <div>
                <div>
                  <img
                    decoding="auto"
                    :src="sparkbit"
                    alt=""
                    style="
                      display: block;
                      width: 100%;
                      height: 100%;
                      border-radius: inherit;
                      object-position: center center;
                      object-fit: cover;
                    "
                  />
                </div>
                <p>{{ $t("landingPage.scanDown") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="video-wrap" data-aos="fade-up" data-aos-delay="200">
          <video
            muted
            :src="banner"
            :poster="poster"
            loop="true"
            preload="auto"
            autoplay="true"
          ></video>
        </div>
        <div class="data-info" data-aos="fade-up" data-aos-delay="400">
          <div class="volume">
            <div class="name">{{ $t("landingPage.volume24") }}</div>
            <div class="value">2.46M</div>
          </div>
          <div class="popular">
            <div class="name">{{ $t("landingPage.popular") }}</div>
            <div class="p-list" v-html="coinHtml">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/banner/banner";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/home/banner/banner.styl";

export default {
  mixins: [mixin],
  props: {
    coinHtml: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.banner-container .btn-wrap {
  margin-top: 40px;
  display: flex;
}
</style>
<style lang="stylus" scoped>
@media (min-width: 810px) and (max-width: 1439.98px) {
  .banner-container {
    height: min-content;
    padding: 56px 80px 100px;
    box-sizing: border-box;
    .banner-content {
      justify-content: flex-end;
      height: 100%;
      flex-direction: column-reverse;
      gap: 0;
    }
    .left {
      width: 100%;
      .title {
        font-size: 44px;
        line-height: 120%;
        text-align: center;
        .logo {
            width: 48px;
            height: 45px;
            margin-bottom: -8px;
            margin-right: 10px;
        }
        &.long-lan {
            width: 100%;
        }
      }
      .btn-wrap {
        justify-content: center;
      }
    }
    .right {
      height: 523px;
      margin-bottom: 32px;
      &::after {
          height: 42%;
      }
      .video-wrap {
        width: 357px;
        height: 700px;
        margin-right: 20px;
        border-radius: 36px;
        video {
          border-radius: 28px;
        }
      }
      .volume {
        margin-bottom: 20px;
      }
      .data-info > div {
        width: 273px;
      }
    }
  }
}
@media (max-width: 809.98px) {
  .banner-container {
    height: min-content;
    padding: 40px 16px 64px;
    box-sizing: border-box;
    .banner-content {
      justify-content: flex-end;
      height: 100%;
      flex-direction: column-reverse;
      gap: 0;
    }
    .left {
      width: 100%;
      .title {
        font-size: 44px;
        line-height: 120%;
        text-align: center;
        .logo {
            width: 48px;
            height: 45px;
            margin-bottom: -8px;
            margin-right: 10px;
        }
        &.long-lan {
            width: 100%;
        }
      }
      /deep/.common-button {
        margin-right: 0 !important;
        width: 100%;
      }
    }
    .right {
      height: 402px;
      margin-bottom: 32px;
      .video-wrap {
        width: 285px;
        height: 525px;
        margin-inline: auto;
        border-radius: 36px;
        video {
          border-radius: 28px;
        }
      }
    }
    .data-info, .down-wrap {
      display: none;
    }
  }
}
</style>
