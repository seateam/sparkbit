<template>
  <section class="home-container">
    <Banner :coinHtml="coinHtml"/>
    <div class="home-p1">
      <div class="p1-content content-w">
        <div data-aos="fade-up">
          <h3>{{ $t("landingPage.p1.title") }}</h3>
          <div class="subtitle">{{ $t("landingPage.p1.desc") }}</div>
        </div>
        <ul>
          <li
            v-for="(item, index) in p1List"
            :key="index"
            class="item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
            @mouseenter="playAnimation(index)"
            @mouseleave="pauseAnimation(index)"
            @click="btnLink('/register')"
          >
            <div class="logos">
              <lottie-player
                :ref="'lottiePlayer'+index"
                class="active"
                :src="`/static/json/arrow${index + 1}.json`"
                background="transparent"
                speed="1"
                style="width: 100%; height: 100%"
                loop
                autoplay="false"
              >
              </lottie-player>
              <img class="normal" :src="item.logo" alt="" />
              <!-- <img class="normal light-show" :src="item.logo_1" alt="" /> -->
            </div>
            <div>
              <div class="item-name">{{ $t("landingPage.p1.steps_n")[index] }}</div>
              <div class="item-desc">{{ $t("landingPage.p1.steps_d")[index] }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-p2">
      <div class="p2-content content-w">
        <div class="top" data-aos="fade-up">
          <div>
            <h3>{{ $t("landingPage.p2.title") }}</h3>
            <div class="subtitle">{{ $t("landingPage.p2.desc") }}</div>
          </div>
          <c-button height="64px" @click="btnLink('/register')">
            <div>
              <span>{{ $t("landingPage.register") }}</span>
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
              <span>{{ $t("landingPage.register") }}</span>
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
        </div>
        <ul>
          <li
            v-for="(item, index) in p2List"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
            class="item"
          >
            <div class="logo">
              <img :src="item" alt="" />
            </div>
            <div>
              <div class="item-name">{{ $t("landingPage.p2.cards_n")[index] }}</div>
              <div class="item-desc">{{ $t("landingPage.p2.cards_d")[index] }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-p3">
      <div class="p3-content content-w">
        <div data-aos="fade-up">
          <h3>{{ $t("landingPage.p3.title") }}</h3>
          <div class="subtitle">{{ $t("landingPage.p3.desc") }}</div>
        </div>
        <div class="video-wrap">
          <video muted :src="video1" loop="true" preload="auto" autoplay="true"></video>
        </div>
        <ul>
          <li v-for="item in 3" :key="item" class="item">
            <div class="item-name">{{ $t("landingPage.p3.cards_n")[item - 1] }}</div>
            <div class="item-desc">{{ $t("landingPage.p3.cards_d")[item - 1] }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-p4">
      <div class="p4-content content-w">
        <div data-aos="fade-up">
          <h3>{{ $t("landingPage.p4.title") }}</h3>
          <div class="subtitle">
            <span v-for="item in 4" :key="item"
              >{{ $t("landingPage.p4.desc")[item - 1] }}
              <hr v-if="item < 4"
            /></span>
          </div>
        </div>
        <div>
          <div class="wrapper">
            <template v-for="item in 7">
              <div class="item" :key="item" :style="{'--count': item}">
                <div class="coin">
                  <img v-if="logoInfo[item-1]" :src="icons[logoInfo[item-1][0].replace('USDT', '').toLowerCase()]" alt="" />
                </div>
                <div v-html="coinItem(logoInfo[item-1])"></div>
              </div>
            </template>
          </div>
          <div class="wrapper" data-direction="reverse">
            <template v-for="item in 7">
              <div class="item" :key="item" :style="{'--count': item}">
                <div class="coin">
                  <img v-if="logoInfo[item-1]" :src="icons[logoInfo[item-1][0].replace('USDT', '').toLowerCase()]" alt="" />
                </div>
                <div v-html="coinItem(logoInfo[item-1])"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="home-p5">
      <div class="p5-content content-w">
        <h3 data-aos="fade-up">{{ $t("landingPage.p5.title") }}</h3>
        <div class="image-wrap">
          <div class="image1" data-aos="fade-up">
            <img :src="p5Img1" alt="" />
          </div>
          <div class="image2" data-aos="fade-up">
            <img :src="p5Img2" alt="" />
          </div>
        </div>
        <div class="down-wrap">
          <c-button
            class="common-button-hollow common-button-text downapp-btn"
            height="64px"
            @click="btnLink('/appDownload')"
          >
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
    <div class="home-p6">
      <div class="p6-content content-w">
        <h3 data-aos="fade-up">{{ $t("landingPage.p6.title") }}</h3>
        <div class="faq-lists">
          <div
            v-for="item in 6"
            :key="item"
            class="faq-item"
            :class="{ expand: faqFlag[item - 1] }"
            @click="toggleShow(item - 1)"
          >
            <span class="faq-title">{{ $t("landingPage.p6.qus")[item - 1] }}</span>
            <transition name="faqbox-fade">
              <div v-show="faqFlag[item - 1]" class="option">
                {{ $t("landingPage.p6.ans")[item - 1] }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <c-homeDialog></c-homeDialog>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/index";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/home/index.styl";
import { isH5Check } from "@/utils/newUtils";
import Banner from "./banner/banner";
import { imgMap } from "@/utils";

export default {
  mixins: [mixin],
  components: { Banner },
  data() {
    return {
      p1List: [
        {
          logo: imgMap.home_p1_1,
          // logo_1: imgMap.home_p1_1,
        },
        {
          logo: imgMap.home_p1_2,
          // logo_1: imgMap.home_p1_2,
        },
        {
          logo: imgMap.home_p1_3,
          // logo_1: imgMap.home_p1_3,
        },
        {
          logo: imgMap.home_p1_4,
          // logo_1: imgMap.home_p1_4,
        },
      ],
      p2List: [imgMap.simplicity, imgMap.service, imgMap.security],
      p5Img1: imgMap.landing_img1,
      p5Img2: imgMap.landing_img2,
      faqFlag: [false, false, false, false, false, false],
    };
  },
  computed: {
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  // watch: {
  //   lan: {
  //     immediate: true,
  //     handler() {
  //       const dict = {
  //         zh_CN: "zh-cn",
  //         ko_KR: "ko-kr",
  //         en_US: "",
  //       };
  //       const lang = dict[this.lan] || "";
  //       window.location.replace(`https://home.sparkbit.io/${lang}`);
  //       // this.$router.push('/notfound');
  //     },
  //   },
  // },
  mounted() {
    if (isH5Check()) {
      document.body.classList.add("isH5");
      document.querySelector("html").style.minWidth = "unset";
      document.querySelector("body").style.minWidth = "unset";
      document.querySelector(".common-header").style.display = "block";
      document.querySelector(".footer-box").style.display = "block";
    }

    this.init();
    AOS.init({
      offset: 100,
      once: true,
      easing: "ease-out",
    });
  },
  methods: {
    toggleShow(index) {
      this.faqFlag.splice(index, 1, !this.faqFlag[index]);
    },
    coinItem(item) {
      if (item) {
        return `
        <div class="c-name">${item[0].replace('USDT', '')}</div>
        <div class="c-info">
          <span>$${Number(item[1].c).toLocaleString()}</span>
          <span>${this.pct(item[1])}</span>
        </div>`;
      }
      return '';
    },
    playAnimation(index) {
      const player = this.$refs[`lottiePlayer${index}`];
      if (player) {
        player[0].stop();
        player[0].play();
      }
    },
    pauseAnimation(index) {
      const player = this.$refs[`lottiePlayer${index}`];
      if (player) {
        player[0].stop();
      }
    },
  },
};
</script>
<style scoped>
.home-container {
  font: 14px/1.25 Outfit, robotoregular, PingFang SC, Hiragino Sans GB, Heiti SC,
    Microsoft YaHei, WenQuanYi Micro Hei, serif;
}
.home-container /deep/.common-button {
  min-width: 200px;
  overflow: hidden;
}
.home-container /deep/.downapp-btn {
  background: transparent;
  /* border-color: var(--color-BTN-nutrual-bg); */
  /* color: var(--color-text-primary); */
  border-color: #ffffff;
  color: #ffffff;
  min-width: 254px;
}
.home-container /deep/.common-button .common-button-slot {
  display: block;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  height: calc(100% - 20px);
  margin-block: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.home-container /deep/.common-button .common-button-slot div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5px;
  transition: top 0.5s ease;
  position: absolute;
  left: 0;
}
.home-container /deep/.downapp-btn .common-button-slot div {
  gap: 10px;
}
.home-container /deep/.downapp-btn .common-button-slot div svg {
  margin-top: 4px;
}
.home-container /deep/.common-button .common-button-slot div:first-child {
  top: 50%;
  transform: translateY(-50%);
}
.home-container /deep/.common-button .common-button-slot div:last-child {
  top: 150%;
  transform: translateY(-50%);
}
.home-container /deep/.common-button:hover .common-button-slot > div:first-child {
  top: -100%;
}
.home-container /deep/.common-button:hover .common-button-slot > div:last-child {
  top: 50%;
}
.home-container /deep/.downapp-btn:hover {
  /* background: var(--color-BTN-nutrual-bg); */
  background: #ffffff;
}
.home-container /deep/.downapp-btn:hover .common-button-slot > div:last-child {
  /* color: var(--color-BG); */
  color: #000000;
}
.home-container /deep/.downapp-btn:hover .common-button-slot > div:last-child path {
  /* fill: var(--color-BG); */
  color: #000000;
}
.home-container /deep/.down-wrap {
  width: min-content;
  position: relative;
}
.home-container .home-p5 .down-wrap {
  margin-inline: auto;
}
.home-container /deep/.down-wrap:hover .qrcode {
  opacity: 1;
  transform: scale(1);
}
.home-container /deep/.qrcode {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  padding-top: 10px;
  transform: scale(0.7);
  opacity: 0;
  transition: transform 0.2s ease;
}
.home-container /deep/.qrcode > div {
  padding: 17px 16px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}
.home-container /deep/.qrcode p {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  text-align: center;
}

/* home-p4 */
@keyframes scrollLeft {
  to {
    left: calc(var(--logo-width) * -1);
  }
}
.home-p4 .wrapper {
  --logo-width: 240px;
  --logo-height: 88px;
  --logo-count: 7;
  --duration: 42s;
  width: 100%;
  max-width: 100%;
  position: relative;
  height: var(--logo-height);
  margin-top: 22px;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );
}
.home-p4 /deep/.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  width: var(--logo-width);
  height: var(--logo-height);
  color: #ffffff;
  text-align: left;
  box-sizing: border-box;
  /* background-color: var(--color-Hover); */
  background-color: #ffffff14;
  border-radius: 16px;
  position: absolute;
  will-change: auto;
  left: calc(var(--logo-width) * (var(--logo-count) - 0.5));
  transition: all linear;
  animation-name: scrollLeft;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  /* 动态计算出每个logo的动画延时 */
  animation-delay: calc(
    var(--duration) / var(--logo-count) * (var(--logo-count) - var(--count)) * -1
  );
}
.home-p4 /deep/.item .coin {
  width: 48px;
  height: 48px;
}
.home-p4 /deep/.item img {
  width: 100%;
  height: auto;
}
.home-p4 /deep/.item .c-name {
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
}
.home-p4 /deep/.item .c-info {
  display: flex;
  gap: 8px;
  font-size: 15px;
  line-height: 18px;
  font-weight: 600;
}
.home-p4 .wrapper[data-direction="reverse"] .item {
  animation-direction: reverse;
}
@media (max-width: 302px) {
  .home-container /deep/.downapp-btn {
    min-width: calc(100vw - 48px);
  }
}
@media (max-width: 302px) {
  .home-container /deep/.downapp-btn {
    min-width: calc(100vw - 48px);
  }
}
@media (max-width: 809.98px) {
  .home-p4 .wrapper {
    --logo-width: 120px;
    --logo-height: 44px;
    margin-top: 11px;
  }
  .home-p4 /deep/.item {
    gap: 6px;
    padding: 10px;
    border-radius: 8px;
  }
  .home-p4 /deep/.item .coin {
    width: 24px;
    min-width: 24px;
    height: 24px;
  }
  .home-p4 /deep/.item .c-name {
    transform: scale(.5);
    line-height: 14px;
    transform-origin: left center;
  }
  .home-p4 /deep/.item .c-info {
    gap: 8px;
    transform: scale(.5);
    line-height: 9px;
    transform-origin: left center;
  }
}
@media (min-width: 1439.98px) {
  .home-p4 .wrapper:has(.item:hover) .item {
    animation-play-state: paused;
  }
}
</style>
