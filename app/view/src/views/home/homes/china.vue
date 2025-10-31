<template>
  <div class="homes">
    <div class="home-alert" v-if="krwFlag">
      <div class="home-alert-all c-6-bg"></div>
      <div class="home-alert-content a-4-bg">
        <div class="alert-close">
          <c-iconButton @click="krwClose">
            <img :src="imgMap.cancel" class="icon-20px" alt="" />
          </c-iconButton>
        </div>
        <div class="home-alert-bg" :style="krwBg">
          <!-- 加密货币交易所 投资注意事项 -->
          <p class="home-alert-title f-8-cl">{{ $t("krwAdd.hometitle") }}</p>
        </div>
        <div class="home-alert-body">
          <!-- BITZON用户在投资数字资产前，请熟知一下注意事项，并慎重进行交易。 -->
          <p class="home-alert-body-title">{{ $t("krwAdd.hometext1") }}</p>
          <p class="home-alert-body-text">
            {{ $t("krwAdd.hometext2") }}
          </p>
          <p class="home-alert-body-text">
            {{ $t("krwAdd.hometext3") }}
          </p>
          <p class="home-alert-body-text">
            {{ $t("krwAdd.hometext4") }}
          </p>
          <p class="home-alert-body-text">
            {{ $t("krwAdd.hometext5") }}
          </p>
          <div class="home-alert-body-warning">
            <svg class="icon icon-16" aria-hidden="true" style="marginright: 10px">
              <use xlink:href="#icon-c_2"></use>
            </svg>
            <span class="f-7-cl">{{ $t("krwAdd.hometext6") }}</span>
          </div>
          <div class="noclick">
            <c-checkBox :value="krwCheck" @click="krwCheckClick" />
            <span class="noclick-text" @click="krwCheckClick">{{ $t("krwAdd.hometext7") }}</span>
          </div>
          <c-button paddingW="46px" class="alert-button" @click="krwConfrim" marginTop="20px"
            >{{ $t("krwAdd.hometext8") }}
          </c-button>
        </div>
      </div>
    </div>

    <div class="m-head">
      <div class="wrap">
        <div class="titleBox">
          <!--{{ $t("home.sub_title") }}-->
          <div class="title">{{ $t("home.sub_title") }}</div>
          <div class="subTxt">{{ $t("home.title_content") }}</div>
        </div>
        <div class="otherLogin">
          <div v-if="isLogin" class="item active" @click="navTo('/trade')">
            <span class="txt">{{ langTxt.txt14 }}</span>
          </div>
          <template v-if="!isLogin">
            <div class="item active" @click="navTo('/register?nowType=email')">
              <span class="txt">{{ langTxt.txt10 }}</span>
            </div>
            <!--<div class="item" @click="navTo('/register?nowType=phone')">-->
            <!--  <span class="txt">{{ langTxt.txt11 }}</span>-->
            <!--</div>-->
          </template>
        </div>
      </div>
      <img class="img1 dark-show" :src="imgMap.index_img1_dark" />
      <img class="img1 light-show" :src="imgMap.index_img1_light" />
    </div>

    <!--国家限制通知-->
    <div class="m-inform" v-if="limitCountry">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          opacity="0.2"
          d="M20.199 20.2501H3.80023C2.61711 20.2501 1.87461 19.0117 2.44929 18.0086L10.6487 3.77075C11.2393 2.7395 12.7599 2.7395 13.3505 3.77075L21.5499 18.0086C22.1246 19.0117 21.3821 20.2501 20.199 20.2501Z"
          fill="#C70606"
        />
        <path
          d="M22.2 17.6335L14.0016 3.39569C13.7967 3.04687 13.5042 2.75764 13.1532 2.55668C12.8021 2.35572 12.4046 2.25 12 2.25C11.5955 2.25 11.198 2.35572 10.8469 2.55668C10.4958 2.75764 10.2033 3.04687 9.99847 3.39569L1.80003 17.6335C1.60291 17.9709 1.49902 18.3546 1.49902 18.7454C1.49902 19.1361 1.60291 19.5199 1.80003 19.8572C2.00228 20.2082 2.29425 20.499 2.64599 20.6998C2.99773 20.9006 3.39658 21.0043 3.80159 21.0001H20.1985C20.6032 21.0039 21.0016 20.9001 21.353 20.6993C21.7044 20.4985 21.9961 20.2079 22.1982 19.8572C22.3956 19.52 22.4998 19.1364 22.5001 18.7456C22.5004 18.3549 22.3969 17.9711 22.2 17.6335ZM20.8997 19.1063C20.8282 19.2282 20.7256 19.3289 20.6024 19.3981C20.4792 19.4673 20.3398 19.5025 20.1985 19.5001H3.80159C3.66029 19.5025 3.52088 19.4673 3.39765 19.3981C3.27442 19.3289 3.17181 19.2282 3.10034 19.1063C3.0356 18.9967 3.00145 18.8717 3.00145 18.7444C3.00145 18.6171 3.0356 18.4922 3.10034 18.3826L11.2988 4.14475C11.3717 4.02341 11.4748 3.92301 11.598 3.8533C11.7212 3.7836 11.8603 3.74696 12.0019 3.74696C12.1435 3.74696 12.2826 3.7836 12.4058 3.8533C12.529 3.92301 12.6321 4.02341 12.705 4.14475L20.9035 18.3826C20.9676 18.4925 21.0011 18.6176 21.0005 18.7449C20.9998 18.8722 20.965 18.997 20.8997 19.1063ZM11.25 13.5001V9.75006C11.25 9.55115 11.329 9.36038 11.4697 9.21973C11.6104 9.07908 11.8011 9.00006 12 9.00006C12.1989 9.00006 12.3897 9.07908 12.5304 9.21973C12.671 9.36038 12.75 9.55115 12.75 9.75006V13.5001C12.75 13.699 12.671 13.8897 12.5304 14.0304C12.3897 14.171 12.1989 14.2501 12 14.2501C11.8011 14.2501 11.6104 14.171 11.4697 14.0304C11.329 13.8897 11.25 13.699 11.25 13.5001ZM13.125 16.8751C13.125 17.0976 13.059 17.3151 12.9354 17.5001C12.8118 17.6851 12.6361 17.8293 12.4305 17.9144C12.225 17.9996 11.9988 18.0219 11.7806 17.9784C11.5623 17.935 11.3619 17.8279 11.2045 17.6706C11.0472 17.5132 10.9401 17.3128 10.8966 17.0945C10.8532 16.8763 10.8755 16.6501 10.9607 16.4445C11.0458 16.239 11.19 16.0633 11.375 15.9397C11.56 15.816 11.7775 15.7501 12 15.7501C12.2984 15.7501 12.5845 15.8686 12.7955 16.0796C13.0065 16.2905 13.125 16.5767 13.125 16.8751Z"
          fill="#C70606"
        />
      </svg>
      <div class="txt">{{ langTxt.txt13 }}</div>
    </div>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList" />

    <!-- 市场 -->
    <div class="m-market">
      <div class="title">
        <span>{{ langTxt.txt16 }}</span>
        <!--<div class="more" @click="navTo('/market')">-->
        <!--  <span class="txt">View More</span>-->
        <!--  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.71967 0.96967C1.01256 0.676777 1.48744 0.676777 1.78033 0.96967L6.28033 5.46967C6.57322 5.76256 6.57322 6.23744 6.28033 6.53033L1.78033 11.0303C1.48744 11.3232 1.01256 11.3232 0.71967 11.0303C0.426777 10.7374 0.426777 10.2626 0.71967 9.96967L4.68934 6L0.71967 2.03033C0.426777 1.73744 0.426777 1.26256 0.71967 0.96967Z" fill="#E7E6E6"/>-->
        <!--  </svg>-->
        <!--</div>-->
      </div>
      <div class="m-table">
        <!-- 应用计算属性，使里面的逻辑执行 -->
        <div style="display: none">{{ baseInfo }}</div>
        <Market :dataList="marketDataList" :marketCurrent="marketCurrent" />
      </div>
    </div>
    <!--为什么选择我们 ？-->
    <div class="m-whyMe">
      <img class="dark-show" :src="imgMap.index_img2_dark" alt="" />
      <img class="light-show" :src="imgMap.index_img2_light" alt="" />
      <div class="ct">
        <div class="title">{{ langTxt.txt1 }}</div>
        <div class="txt">{{ langTxt.txt2 }}</div>
        <div class="btn">{{ langTxt.txt3 }}</div>
      </div>
    </div>

    <!-- 改，2022.12.16，样式改版 -->
    <div class="m-wrap">
      <div class="m-menu">
        <div class="left">
          <div class="content">
            <div class="item" v-for="item in 6" :key="item">
              <img class="img" :src="imgMap[`advantage${item}`]" />
              <div class="wrap">
                <div class="txt">{{ $t(`home.grid_icon.icon_title_${item}`) }}</div>
                <div class="subtxt">{{ $t(`home.grid_icon.icon_sub_title_${item}`) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <!--{{ $t("home.grid_icon.title") }}-->
          <div class="title">{{ langTxt.txt4 }}</div>
          <div class="subtitle">{{ langTxt.txt5 }}</div>
        </div>
      </div>
    </div>

    <!--随时随地开启交易-->
    <div class="m-openTrade">
      <div class="title">{{ langTxt.txt6 }}</div>
      <div class="subTxt">{{ langTxt.txt7 }}</div>
      <div class="ct">
        <img class="dark-show" :src="imgMap.download_img_dark" />
        <img class="light-show" :src="imgMap.download_img_light" />
        <div class="left">
          <div class="title">{{ langTxt.txt8 }}</div>
          <div class="txt">{{ langTxt.txt9 }}</div>
          <div class="btn" @click="download('google')">
            <img :src="imgMap.icon_googleplay" />
            <span class="txt">Google Play</span>
          </div>
          <div class="btn" @click="download('ios')">
            <img :src="imgMap.icon_appstore" />
            <span class="txt">App Store</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 开启数字之旅 -->
    <div class="m-wrap">
      <div class="m-startNum">
        <div class="title">{{ langTxt.txt15 }}</div>
        <div class="list" style="margin-bottom: 67px">
          <div class="item" v-for="item in 3">
            <img class="icon" :src="imgMap[`knowMore${item}`]" />
            <div class="txt">{{ $t(`home.three_button.button_${item}`) }}</div>
            <div class="subTxt">{{ moreText[item - 1] }}</div>
          </div>
          <!--<img style="margin-left: 110px;" class="img" :src="imgMap.index_img4">-->
        </div>
        <div class="list">
          <!--<img style="margin-right: 110px;" class="img" :src="imgMap.index_img5_1">-->
          <div class="item" v-for="item in 3" :key="item">
            <img class="icon" :src="imgMap[`knowMore${item + 3}`]" />
            <div class="txt">{{ $t(`home.three_block.title_${item}`) }}</div>
            <div class="subTxt">{{ $t(`home.three_block.sub_title_${item}`) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-start">
      <div class="title">{{ langTxt.txt12 }}</div>
      <div class="search">
        <input type="text" v-model="registerEmail" :placeholder="$t('home.email')" />
        <div class="btn" @click="navToRegister" data-type="register">{{ $t("home.start") }}</div>
      </div>
    </div>

    <div v-if="showOld" class="home-bg" style="background-color: #181a1f; padding-top: 0px">
      <!-- 公告 -->
      <div v-if="showOld" class="bulletinBoard">
        <template v-if="noticeList.length > 0">
          <div class="backgrounds"></div>
          <div class="bull-bar">
            <template v-for="(item, index) in noticeList">
              <p :key="index" v-if="index < 4" class="notice-item">
                <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                  {{ item.noticeText }}
                </router-link>
                <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                  {{ item.noticeText }}
                </router-link>
                <i class="x-2-cl">/</i>
              </p>
            </template>
          </div>
          <router-link class="more x-3-cl" to="noticeInfo"></router-link>
          <!-- 更多 -->
          <c-button class="button more" type="text" @click="btnLink">
            <!-- 更多 -->
            {{ $t("home.more") }}
          </c-button>
        </template>
      </div>

      <div v-if="showOld" class="m-banner" :style="{ backgroundImage: `url(${indexBg})` }">
        <div class="china_banner">
          <div class="m-infoBody">
            <div class="title">{{ $t("home.sub_title") }}</div>
            <div class="subtitle">{{ $t("home.title") }}{{ $t("home.title_content") }}</div>
            <div class="m-btn" @click="navToRegister">
              <div v-if="!isLogin" class="item active" data-type="email">{{ btnText[0] }}</div>
              <!--<div class="item active" data-type="verify">{{ btnText[1] }}</div>-->
              <div v-if="!isLogin" class="item" data-type="phone">{{ btnText[2] }}</div>
            </div>
          </div>
          <div class="recommend">
            <!-- 推荐位 -->
            <Recommend v-if="headerSymbol.length" :dataList="recommendDataList" />
          </div>
        </div>
      </div>
      <!-- 自定义模板结束 -->
      <i v-if="!baseInfo"></i>
      <!-- 改，2022.12.16 样式改版 -->
      <div v-if="showOld" class="m-market">
        <div class="title">{{ $t("home.spot_market") }}</div>
        <div class="content">
          <Market :dataList="marketDataList" :marketCurrent="marketCurrent" />
        </div>
      </div>
      <!-- 改，2022.12.16，样式改版 -->
      <div v-if="showOld" class="m-menu">
        <div class="title">{{ $t("home.grid_icon.title") }}</div>
        <div class="subtitle">{{ $t("home.grid_icon.sub_title") }}</div>
        <div class="content">
          <div class="item" v-for="item in 6" :key="item">
            <img class="img" :src="imgMap[`advantage${item}`]" />
            <div class="txt">{{ $t(`home.grid_icon.icon_title_${item}`) }}</div>
            <div class="subtxt">{{ $t(`home.grid_icon.icon_sub_title_${item}`) }}</div>
          </div>
        </div>
      </div>

      <!-- 视频 -->
      <div v-if="showOld" style="height: 800px">
        <div style="margin: 80px auto 0; width: 1440px; height: 100%">
          <video width="100%" loop="" muted="" autoplay="" playsinline="" class="">
            <!-- https://cdn.aaxvip.com/res/videos/home.mp4 -->
            <source
              data-src="https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex_main_page.mp4"
              src="https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex_main_page.mp4"
            />
          </video>
        </div>
      </div>

      <!-- 开启数字之旅 -->
      <div class="m-startNum">
        <div class="title">{{ calTxt.txt1 }}</div>
        <div class="list" style="margin-bottom: 106px">
          <div class="item" v-for="item in 3">
            <img class="icon" :src="imgMap[`knowMore${item}`]" />
            <div class="txt">{{ $t(`home.three_button.button_${item}`) }}</div>
            <div class="subTxt">{{ moreText[item - 1] }}</div>
          </div>
          <img style="margin-left: 110px" class="img" :src="imgMap.index_img4" />
        </div>
        <div class="list">
          <img style="margin-right: 110px" class="img" :src="imgMap.index_img5" />
          <div class="item" v-for="item in 3" :key="item">
            <img class="icon" :src="imgMap[`knowMore${item + 3}`]" />
            <div class="txt">{{ $t(`home.three_block.title_${item}`) }}</div>
            <div class="subTxt">{{ $t(`home.three_block.sub_title_${item}`) }}</div>
          </div>
        </div>
      </div>

      <!-- 改，2022.12.16 删掉了解更多旧代码 -->
      <div class="m-start" :style="{ backgroundImage: `url(${imgMap.banner6})` }">
        <div class="title">{{ langTxt.txt12 }}</div>
        <div class="search">
          <input type="text" v-model="registerEmail" :placeholder="$t('home.email')" />
          <div class="btn" @click="navToRegister" data-type="register">{{ $t("home.start") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/home/home";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/home/home/home.styl";
import { imgMap } from "@/utils";
import Market from "../market/china.vue";
import Recommend from "../recommend/china.vue";
import Custom from "../custom/china.vue";
import "../../../utils/swiper-element-bundle.min";

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Custom,
    Market,
  },
  created() {
    this.getVisitStatus();
    this.init();
  },
  data() {
    return {
      imgMap,
      registerEmail: "", // 注册邮箱
      showOld: false,
      limitCountry: false,
    };
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    calCoinIcon() {
      return (coinName) => {
        const coinList = this.marketData ? this.marketData.coinList : {};
        const coinSymbol = coinName.split("/")[0].toUpperCase();
        return coinList[coinSymbol] ? coinList[coinSymbol].icon : "";
      };
    },
    // 从币对中获取币种名称
    calSymbolName() {
      return (coinName) => {
        const coin = coinName.split("/") || [];
        return coin[0] || "";
      };
    },
    calTxt() {
      return {
        txt1: this.$t('home.startJourney'),
      };
    },
    langTxt() {
      const { lan, companyName } = this;
      if (lan === "zh_CN") {
        return {
          txt1: "为什么选择我们？",
          txt2: `我们提供全球范围内的多种数字货币交易对，交易手续费低且竞争力强。24/7的在线客户服务团队将确保您在交易过程中获得及时的支持。我们不仅遵循最高的法规合规标准，还致力于提供丰富的教育资源，助您更好地了解和参与数字货币市场。选择${companyName}，选择卓越、创新和可持续的交易体验。`,
          txt3: "查看更多",
          txt4: "一站式数字资产服务平台",
          txt5: `根据您的喜好，在${companyName}交易各类产业`,
          txt6: "随时随地开启交易",
          txt7: "全面支持iOS、Android ",
          txt8: "我们的优势",
          txt9: `我们专注于提供安全、高效和多元化的数字资产交易服务。作为一家持有美国MSB牌照的合规平台，我们致力于满足用户对卓越交易体验的需求。${companyName}以其强大的交易引擎、多样的交易对和专业的客户支持而著称，为用户提供一站式的数字资产服务。我们的平台以透明度、可信度和创新性为基石，助力用户在数字金融领域取得成功。选择${companyName}，选择可信赖的数字资产交易伙伴。`,
          txt10: "通过电子邮件注册",
          txt11: "通过手机号注册",
          txt12: `和百万用户一起，在${companyName}投资、交易及成长`,
          txt13: `您的IP/國籍顯示您處於${companyName}服務限制的國家/地區，根據${companyName}服務條款，${companyName}不會向您所在的國家/地區提供服務，如有疑問，請聯絡${companyName}線上客服。`,
          txt14: "立即交易",
          txt15: "开启您的数字货币之旅",
          txt16: "现货行情",
        };
      } if (lan === "ko_KR") {
        return {
          txt1: "선택해야 하는 이유",
          txt2: "저희는 저렴하고 경쟁력 있는 거래 수수료로 다양한 글로벌 암호화폐 거래 쌍을 제공합니다. 연중무휴 24시간 온라인 고객 서비스 팀이 거래 여정 내내 적시에 지원을 제공합니다. 최고의 규제 준수 기준을 지키기 위해 최선을 다하고 있으며, 암호화폐 시장을 더 잘 이해하고 참여할 수 있도록 풍부한 교육 리소스도 제공합니다. 탁월하고 혁신적이며 지속 가능한 거래 경험을 원하신다면 오렉스를 선택하세요.",
          txt3: "자세히 보기",
          txt4: "올인원 자산 서비스 플랫폼",
          txt5: `선호도에 따라 ${companyName} 에서 모든 유형의 산업을 거래하세요.`,
          txt6: "언제 어디서나 거래 시작",
          txt7: "iOS, Android 완벽 지원",
          txt8: "당사의 장점",
          txt9: `우리는 안전하고 효율적이며 다양화된 디지털 자산 거래 서비스를 제공하는 데 중점을 두고 있습니다. 미국 MSB 라이선스를 보유한 규정 준수 플랫폼으로서, 우수한 거래 경험에 대한 사용자의 요구를 충족시키기 위해 노력합니다. ${companyName}은 강력한 거래 엔진, 다양한 거래 쌍, 전문적인 고객 지원으로 유명하며, 사용자에게 올인원 디지털 자산 서비스를 제공합니다. 우리 플랫폼은 투명성, 신뢰성, 혁신을 기반으로 구축되어 사용자가 디지털 금융 영역에서 성공할 수 있도록 지원합니다. 암호화폐 거래에서 믿을 수 있는 파트너를 원한다면 ${companyName}을 선택하세요.`,
          txt10: "이메일로 가입하기",
          txt11: "전화로 가입하기",
          txt12: `${companyName} 에서 수백만 명의 사용자와 함께 투자하고, 거래하고, 성장하세요!`,
          txt13: `귀하의 IP/국적은 귀하가 ${companyName} 서비스가 제한되는 국가에 있음을 나타냅니다. ${companyName} 의 서비스 약관에 따라 ${companyName} 는 귀하의 국가에 서비스를 제공하지 않으므로 질문이 있는 경우 ${companyName} 온라인 고객 서비스에 문의하시기 바랍니다.`,
          txt14: "즉시거래",
          txt15: "디지털 화폐 여정을 시작하세요",
          txt16: "현물 시장",
        };
      } if (lan === "el_GR") {
        return {
          txt1: "為什麼選擇我們？",
          txt2: `我們提供全球範圍內的多種數位貨幣交易對，交易手續費低且競爭力強。24/7的線上客戶服務團隊將確保您在交易過程中獲得即時的支援。我們不僅遵循最高的法規合規標準，還致力於提供豐富的教育資源，協助您更好地了解和參與數位貨幣市場。選擇${companyName}，選擇卓越、創新且可持續的交易體驗。`,
          txt3: "查看更多",
          txt4: "一站式數位資產服務平台",
          txt5: `根據您的喜好，在${companyName}交易各類產業`,
          txt6: "隨時隨地開啟交易",
          txt7: "全面支援iOS、Android ",
          txt8: "我們的優勢",
          txt9: `我們專注於提供安全、高效且多元化的數位資產交易服務。作為一家持有美國MSB執照的合規平台，我們致力於满足用戶對卓越交易體驗的需求。${companyName}以其強大的交易引擎、多樣的交易對及專業的客戶支援而聞名，為用戶提供一站式的數位資產服務。我們的平台以透明度、可信度及創新性為基石，協助用戶在數位金融領域取得成功。選擇${companyName}，選擇可信賴的數位資產交易夥伴。`,
          txt10: "透過電子郵件註冊",
          txt11: "透過手機號註冊",
          txt12: `和百萬用戶一起，在${companyName}投資、交易及成長`,
          txt13: `您的IP/國籍顯示您處於${companyName}服務限制的國家/地區，根據${companyName}服務條款，${companyName}不會向您所在的國家/地區提供服務，如有疑問，請聯絡${companyName}線上客服。`,
          txt14: "立即交易",
          txt15: "開啟您的數位貨幣之旅",
          txt16: "現貨行情",
        };
      } if (lan === "ja_JP") {
        return {
          txt1: "なぜ私たちを選ぶのですか？",
          txt2: `${companyName}では、世界規模で多様なデジタル通貨取引ペアを提供し、取引手数料は低く競争力に富んでいます。24時間365日対応のオンラインカスタマーサービスチームが、您の取引プロセス全体でタイムリーなサポートを提供することを保証します。私たちは最高レベルの法規制遵守基準を順守するだけでなく、豊富な教育リソースも提供し、您がデジタル通貨市場をより深く理解して参加できるよう支援します。${companyName}を選ぶことは、卓越した、革新的で持続可能な取引体験を選ぶことです。`,
          txt3: "詳細を見る",
          txt4: "ワンストップデジタル資産サービスプラットフォーム",
          txt5: `您のご喜好に応じて、${companyName}で様々な分野の取引を行えます`,
          txt6: "いつでもどこでも取引を開始",
          txt7: "iOS、Androidに完全対応 ",
          txt8: "私たちの強み",
          txt9: `私たちは安全、高効率かつ多様化されたデジタル資産取引サービスの提供に注力しています。米国MSBライセンスを保有する合規プラットフォームとして、ユーザーの卓越した取引体験に対するニーズを満たすことを目指しています。${companyName}は、高性能な取引エンジン、多様な取引ペア、専門的なカスタマーサポートで知られ、ユーザーにワンストップのデジタル資産サービスを提供します。私たちのプラットフォームは透明性、信頼性、革新性を基盤として構築され、ユーザーがデジタル金融分野で成功を収めるための支援を行います。${companyName}を選ぶことは、信頼できるデジタル資産取引パートナーを選ぶことです。`,
          txt10: "メールアドレスで登録",
          txt11: "電話番号で登録",
          txt12: `数百万のユーザーと共に、${companyName}で投資、取引を行い、成長しましょう`,
          txt13: `您のIPアドレス/国籍に基づき、${companyName}のサービスが制限されている国/地域に在住していることが確認されました。${companyName}のサービス利用規約に基づき、${companyName}は您の所在する国/地域にサービスを提供しません。ご質問がある場合は、${companyName}のオンラインカスタマーサービスにお問い合わせください。`,
          txt14: "すぐに取引を開始",
          txt15: "您のデジタル通貨の旅をスタート",
          txt16: "スポット市場相場",
        };
      } if (lan === "ru_RU") {
        return {
          txt1: "Почему выбирать нас",
          txt2: `Мы предлагаем широкий ассортимент пар для торговли криптовалютами на глобальном рынке с низкими и конкурентоспособными комиссиями за транзакции. Наша круглосуточная онлайн-команда поддержки клиентов гарантирует своевременную помощь на всем пути вашей торговли. Мы придерживаемся высших стандартов соответствия регулированию, а также предоставляем обширные образовательные ресурсы, чтобы помочь вам лучше понять и участвовать в рынке криптовалют. Выбирайте ${companyName} для получения выдающегося, инновационного и устойчивого опыта торговли.`,
          txt3: "Подробнее",
          txt4: "Универсальная платформа услуг по работе с активами (All-in-One)",
          txt5: `Торгуйте всеми видами активов на платформе ${companyName} в соответствии с вашими предпочтениями`,
          txt6: "Начинайте торговлю в любое время и в любом месте",
          txt7: "Полная поддержка для систем iOS, Android ",
          txt8: "Наши преимущества",
          txt9: `Мы сосредоточены на предоставлении безопасных, эффективных и диверсифицированных услуг по торговле цифровыми активами. Как платформа, соответствующая требованиям регулирования и владеющая лицензией MSB США, мы стремимся удовлетворить потребности пользователей в выдающемся опыте торговли. ${companyName} известна своими надежными торговыми движками, разнообразием пар для торговли и профессиональной поддержкой клиентов, предоставляя пользователям универсальные услуги по работе с цифровыми активами (All-in-One). Наша платформа основана на прозрачности, надежности и инновациях, помогая пользователям добиваться успеха в сфере цифровых финансов. Выбирайте ${companyName} как надежного партнера для торговли криптовалютами.`,
          txt10: "Регистрация по электронной почте",
          txt11: "Регистрация по номеру телефона",
          txt12: `Инвестируйте, торгуйте и развивайтесь вместе с миллионами пользователей на платформе ${companyName}!`,
          txt13: `Ваш IP-адрес указывает на то, что вы находитесь в стране/регионе, где услуги ${companyName} ограничены. В соответствии с Условиями обслуживания ${companyName}, мы не предоставляем услуги в вашей стране/регионе. При возникновении вопросов свяжитесь с нашей службой поддержки клиентов.`,
          txt14: "Начать торговлю сейчас",
          txt15: "Начните свою поездку в мир цифровых валют",
          txt16: "Рыночные условия спотовой торговли",
        };
      } if (lan === "vi_VN") {
        return {
          txt1: "Tại sao Chọn Chúng Tôi",
          txt2: `Chúng tôi cung cấp nhiều cặp giao dịch tiền điện tử toàn cầu với phí giao dịch thấp và cạnh tranh mạnh. Đội ngũ dịch vụ khách hàng trực tuyến 24/7 của chúng tôi đảm bảo hỗ trợ kịp thời trong suốt hành trình giao dịch của bạn. Cam kết tuân thủ các tiêu chuẩn tuân thủ quy định cao nhất, chúng tôi cũng cung cấp nguồn giáo dục phong phú để giúp bạn hiểu rõ và tham gia thị trường tiền điện tử tốt hơn. Chọn ${companyName} để có trải nghiệm giao dịch xuất sắc, đổi mới và bền vững.`,
          txt3: "Xem Thêm",
          txt4: "Nền Tảng Dịch Vụ Tài Sản Toàn Diện (All-in-One)",
          txt5: `Giao dịch tất cả các loại ngành nghề trên ${companyName} theo sở thích của bạn`,
          txt6: "Bắt đầu giao dịch mọi lúc, mọi nơi",
          txt7: "Hỗ trợ đầy đủ cho iOS, Android ",
          txt8: "Ưu Điểm Của Chúng Tôi",
          txt9: `Chúng tôi tập trung cung cấp dịch vụ giao dịch tài sản số an toàn, hiệu quả và đa dạng. Là một nền tảng tuân thủ sở hữu giấy phép MSB Mỹ, chúng tôi nỗ lực đáp ứng nhu cầu của người dùng về trải nghiệm giao dịch xuất sắc. ${companyName} nổi tiếng với động cơ giao dịch mạnh mẽ, nhiều cặp giao dịch và hỗ trợ khách hàng chuyên nghiệp, cung cấp cho người dùng dịch vụ tài sản số toàn diện (all-in-one). Nền tảng của chúng tôi được xây dựng trên nền tảng minh bạch, độ tin cậy và đổi mới, hỗ trợ người dùng đạt thành công trong lĩnh vực tài chính số. Chọn ${companyName} để có một đối tác đáng tin cậy trong giao dịch tiền điện tử.`,
          txt10: "Đăng ký qua Email",
          txt11: "Đăng ký qua Điện thoại",
          txt12: `Đầu tư, giao dịch và phát triển cùng hàng triệu người dùng trên ${companyName}!`,
          txt13: `IP của bạn cho thấy bạn đang ở các quốc gia/khu vực mà dịch vụ ${companyName} bị hạn chế. Theo Điều khoản Dịch vụ của ${companyName}, chúng tôi sẽ không cung cấp dịch vụ cho quốc gia/khu vực của bạn. Vui lòng liên hệ dịch vụ khách hàng của chúng tôi nếu bạn có bất kỳ câu hỏi nào.`,
          txt14: "Giao Dịch Ngay",
          txt15: "Bắt đầu hành trình tiền điện tử của bạn",
          txt16: "Thị trường hiện 貨",
        };
      }
      return {
        txt1: "Why Choose Us",
        txt2: `We offer a variety of global cryptocurrency trading pairs with low and competitive transaction fees. Our 24/7 online customer service team ensures timely support throughout your trading journey. Committed to the highest regulatory compliance standards, we also provide rich educational resources to help you better understand and participate in the cryptocurrency market. Choose ${companyName} for an exceptional, innovative, and sustainable trading experience.`,
        txt3: "View More",
        txt4: "All-in-One Asset Service Platform",
        txt5: `Trade all types of industries at ${companyName} according to your preferences`,
        txt6: "Start trading anytime, anywhere",
        txt7: "Full support for iOS, Android ",
        txt8: "Our Advantages",
        txt9: `We focus on delivering secure, efficient, and diversified digital asset trading services. As a compliant platform holding a US MSB license, we strive to meet users' demands for an outstanding trading experience. ${companyName} is renowned for its robust trading engine, diverse trading pairs, and professional customer support, providing users with an all-in-one digital asset service. Our platform is built on transparency, trustworthiness, and innovation, empowering users to succeed in the digital finance realm. Choose ${companyName} for a reliable partner in cryptocurrency trading.`,
        txt10: "Sign up by Email",
        txt11: "Sign up by Phone",
        txt12: `Invest, trade and grow with millions of users at ${companyName}!`,
        txt13: `Your IP indicates that you are located in countries/regions where ${companyName} service is restricted. According to ${companyName} Terms of Service, we will not provide service to your country/region. Please contact our customer service if you have any question.`,
        txt14: "Trade Now",
        txt15: "Start your digital currency journey",
        txt16: "Spot Market",
      };
    },
    // 了解更多文案
    moreText() {
      const { lan } = this;
      if (lan === "zh_CN") {
        return [
          "我们提供一键式数字货币服务，让您的每一次交易都变得异常简单。",
          "利用先进的加密技术，我们为您提供坚不可摧的安全防线，让您的数字货币之旅始终安心无忧。",
          "定制化服务，根据您的需求打造个性化的数字货币体验。",
        ];
      } if (lan === "ko_KR") {
        return [
          "저희는 원클릭 디지털 통화 서비스를 제공하여 모든 거래가 매우 간편합니다. 디지털 통화 여정을 원활하고 편리한 경험으로 전환하세요.",
          "고급 암호화 기술을 활용하여 난공불락의 보안 인프라를 제공함으로써 디지털 화폐로의 여정이 항상 걱정 없이 안전하게 유지되도록 보장합니다.",
          "고객의 필요에 따라 개인화된 디지털 통화 경험을 제공하도록 설계된 맞춤형 서비스입니다. 회원님의 여정은 저마다 다르며, 저희는 회원님께 맞는 경험을 만들어 드리기 위해 최선을 다하고 있습니다.",
        ];
      } if (lan === "el_GR") {
        return [
          "我們提供一鍵式數位貨幣服務，讓您的每一次交易都變得異常簡單。",
          "運用先進的加密技術，我們為您提供堅不可摧的安全防線，讓您的數位貨幣之旅始終安心無憂。",
          "客製化服務，依據您的需求打造個人化的數位貨幣體驗。",
        ];
      } if (lan === "ja_JP") {
        return [
          "私たちはワンクリック式のデジタル通貨サービスを提供し、您の毎回の取引を非常に簡単にします。",
          "先進的な暗号化技術を活用し、您に破れない安全防衛線を提供し、您のデジタル通貨の旅を常に安心かつ心配なくさせます。",
          "カスタマイズサービス — 您のニーズに基づいてパーソナライズされたデジタル通貨体験を構築します。",
        ];
      } if (lan === "ru_RU") {
        return [
          "Мы предлагаем одноклавишные услуги по работе с цифровыми валютами, благодаря которым каждая ваша транзакция становится исключительно простой.",
          "С помощью передовых крипто-технологий мы предоставляем вам неразрушимую защитную стену, позволяющую вам всегда чувствовать себя спокойно и без забот на вашем пути с цифровыми валютами.",
          "Индивидуальные услуги — мы создаем персональный опыт работы с цифровыми валютами в соответствии с вашими потребностями.",
        ];
      } if (lan === "vi_VN") {
        return [
          "Chúng tôi cung cấp dịch vụ tiền điện tử với một cú click, giúp mỗi giao dịch của bạn trở nên cực kỳ đơn giản.",
          "Sử dụng công nghệ mã hóa tiên tiến, chúng tôi cung cấp cho bạn hàng rào an ninh không thể phá vỡ, khiến hành trình tiền điện tử của bạn luôn yên tâm và không lo lắng.",
          "Dịch vụ tùy chỉnh — xây dựng trải nghiệm tiền điện tử cá nhân hóa theo nhu cầu của bạn.",
        ];
      }
      return [
        "We offer a one-click digital currency service, making each of your transactions exceptionally simple. Transform your digital currency journey into a seamless and convenient experience.",
        "Utilizing advanced encryption technology, we provide an impregnable security infrastructure, ensuring that your journey into digital currency remains worry-free and secure at all times.",
        "Tailored services designed to create a personalized digital currency experience based on your needs. Your journey is unique, and we are committed to crafting an experience that suits you.",
      ];
    },
    // btnText 文案
    btnText() {
      const { lan } = this;
      if (lan === "zh_CN") {
        return ["通过电子邮件注册", "官方验证", "通过手机号注册"];
      } if (lan === "el_GR") {
        return ["通過電子郵件註冊", "官方驗證", "通過手機號註冊"];
      } if (lan === "ko_KR") {
        return ["이메일로 회원가입", "공식 인증", "휴대폰 번호로 회원가입"];
      } if (lan === "el_GR") {
        return ["透過電子郵件註冊", "官方驗證", "透過手機號註冊"];
      } if (lan === "ja_JP") {
        return ["メールアドレスで登録", "公式認証", "電話番号で登録"];
      } if (lan === "ru_RU") {
        return ["Регистрация по электронной почте", "Официальная проверка", "Регистрация по номеру телефона"];
      } if (lan === "vi_VN") {
        return ["Đăng ký qua email", "Xác minh chính thức", "Đăng ký qua số điện thoại"];
      }
      return ["Sign up via email", "Official Verify", "Sign up via cell-phone"];
    },
    // 2023.02.24 新增登录状态
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  methods: {
    // 区域IP访问限制 0 不限 1 限制
    getVisitStatus() {
      if (process.env.NODE_ENV === "development") {
        return;
      }
      this.axios({
        // url: '/common/checkVisitStatus',
        url: "limit_ip_login",
      }).then((data) => {
        if (data.code === "109109") {
          window.sessionStorage.setItem("LimitCountryNames", true);
          this.limitCountry = true;
        }
      });
    },
    joinIn() {
      if (this.isLogin) {
        this.navTo("/trade");
      } else {
        this.navTo("/login");
      }
    },
    navTo(path) {
      if (path) {
        this.$router.push(path);
      }
    },
    // App 下载
    download(type) {
      if (type === "google") {
        window.open(this.appDownload.google_play_url);
        return;
      }
      window.open(this.appDownload[`${type}_download_url`]);
    },
    // 2022.12.16 跳转方法
    navToRegister(type) {
      if (type === "verify") {
        this.$router.push("/verify");
        return;
      }
      // 跳转注册
      if (type === "register") {
        if (this.registerEmail) {
          localStorage.setItem("registerEmail", this.registerEmail);
        }
        this.$router.push("/register");
        return;
      }
      if (type) {
        this.$router.push(`/register?nowType=${type}`);
      }
    },
    linkTo(index) {
      const url = [
        "",
        "https://help.zedcex.com/en/collections/3688381-zedcex-api-doc",
        "https://help.zedcex.com/en/",
        "https://help.zedcex.com/en/collections/3731712-announcement",
      ];
      window.open(url[index]);
    },
  },
};
</script>

<style>
.lijikaishi {
  background: linear-gradient(178.6deg, rgba(0, 0, 0, 0.76) 42.69%, rgba(255, 255, 255, 0) 185.36%),
    url("/static/img/new/lijikaishi.png");
}
.lijikaishi input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #929292;
}
.swiper_input input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #929292;
}

@media only screen and (min-width: 0px) {
  .china_banner {
    background-size: auto;
    max-width: 1920px;
    margin: 0 auto;
    height: 100%;
    /*background-image: url("https://zedcex.oss-accelerate.aliyuncs.com/files/banner_small.jpg");*/
  }
}
@media only screen and (min-width: 1560px) {
  .china_banner {
    /*background-image: url("https://zedcex.oss-accelerate.aliyuncs.com/files/banner_big.jpg");*/
  }
}
</style>
<style scoped>
.homes {
  background: var(--color-4);
}
.m-banner {
  width: 100%;
  height: 800px;
  background-repeat: no-repeat;
  position: relative;
  background-position: 100% 0;
  background-color: #0b0a0b;
}
.m-banner > .china_banner {
  background-repeat: no-repeat;
}
.m-infoBody {
  margin: 0px auto;
  max-width: 1284px;
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 178px;
  padding-left: 54px;
}
.m-infoBody > .title {
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  text-transform: capitalize;
  color: #ffffff;
  text-align: left;
}
.m-infoBody > .subtitle {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-top: 16px;
  text-align: left;
}
.m-btn {
  display: flex;
  align-items: center;
  margin-top: 48px;
}
.m-btn > .item {
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  padding: 0 24px;
  height: 48px;
  border: 2px solid var(--mainColor);
  line-height: 48px;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--mainColor);
}
.m-btn > .item:not(:last-child) {
  margin-right: 24px;
}
.m-btn > .item.active {
  background: var(--mainColor);
  border: unset;
  color: #0c0e11;
}
.m-banner > .china_banner > .recommend {
  margin-top: 148px;
}

/* 2022.12.16 行情样式 */
.m-market {
  width: 1440px;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-4);
  margin: auto;
}
.m-market > .title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  box-sizing: border-box;
  padding-left: 78px;
  margin-bottom: 16px;
}
/deep/.tableContent {
  box-shadow: unset;
}
/* 2022.12.16 六个图标 */
.m-menu {
  width: 1440px;
  margin: 60px auto auto;
  box-sizing: border-box;
  padding: 0 77px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-menu > .left {
  width: 678px;
}
.m-menu > .right > .title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: var(--color-1);
}
.m-menu > .right > .subtitle {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--color-text-secondary);
  margin-top: 18px;
}
.m-menu > .left > .content {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1285px;
  margin: 62px auto 40px;
}
.m-menu > .left > .content > .item {
  width: 178px;
  min-height: 136px;
  display: flex;
  flex-direction: column;
  font-style: normal;
  margin-bottom: 72px;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}
.m-menu > .left > .content > .item > .wrap {
  width: 100%;
}

.m-menu > .left > .content > .item:not(:nth-child(3n)) {
  margin-right: 24px;
}
.m-menu > .left > .content > .item > .img {
  width: 104px;
  height: 104px;
  object-fit: contain;
}
.m-menu > .left > .content > .item .txt {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-1);
  margin-top: 16px;
  text-align: center;
}
.m-menu > .left > .content > .item .subtxt {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  text-align: left;
}
.m-menu > .right {
  width: 411px;
}

.m-threeBlock {
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 40px auto auto;
}
.m-threeBlock > .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 384px;
  height: 508px;
  background: #0c0e11;
  border-radius: 16px;
  font-style: normal;
  box-sizing: border-box;
  padding: 48px 0px 40px;
}
.m-threeBlock > .item:not(:last-child) {
  margin-right: 24px;
}
.m-threeBlock > .item > .icon {
  width: 290px;
  height: 220px;
}
.m-threeBlock > .item > .txt {
  width: 308px;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
  margin-top: 40px;
  text-align: center;
}
.m-threeBlock > .item > .subTxt {
  width: 308px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 16px;
}
/* 2022.12.16 了解更多样式 */
.m-more {
  width: 1200px;
  margin: 40px auto 75px;
}
.m-more > .title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
}
.m-more > .content {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 64px;
}
.m-more > .content > .item {
  position: relative;
  width: 33.3%;
  box-sizing: border-box;
  padding-left: 78px;
  font-style: normal;
  color: #ffffff;
  cursor: pointer;
}
.m-more > .content > .item > .icon {
  width: 64px;
  height: 64px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.m-more > .content > .item > .txt {
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
}
.m-more > .content > .item > .subTxt {
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
}

/* 2022.12.16 立即开始样式 */
.m-start {
  min-width: 1440px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--color-10);
}
.m-start > .title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: var(--color-1);
}
.m-start > .search {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.m-start > .search > input {
  width: 309px;
  height: 48px;
  line-height: 48px;
  background: var(--color-3);
  border-radius: 2px;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 18px;
  color: #ffffff;
}

.light .m-start > .search > input {
  border: 1px solid rgba(204, 204, 204, 1);
}

.m-start > .search > .btn {
  height: 48px;
  background: var(--mainColor);
  line-height: 48px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff;
  margin-left: 20px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  padding: 0 24px;
  box-sizing: border-box;
  border-radius: 6px;
}
.bulletinBoard {
  background: rgba(255, 255, 255, 0.01);
  top: 810px;
  height: 48px;
}
.homes .bulletinBoard .backgrounds {
  top: 4px;
}
/deep/.common-button .common-button-slot {
  color: var(--mainColor);
}

/* 开启数字之旅 */
.m-startNum {
  width: 1440px;
  margin: auto;
  box-sizing: border-box;
  padding: 100px 120px;
  text-align: center;
}
.m-startNum > .title {
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: var(--color-1);
  margin-bottom: 82px;
}
.m-startNum > .list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.m-startNum > .list > .item {
  width: 383px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.m-startNum > .list > .item > .icon {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
}
.m-startNum > .list > .item > .txt {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: var(--color-1);
  margin-bottom: 12px;
}
.m-startNum > .list > .item > .subTxt {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-secondary);
  width: 237px;
}
.m-startNum > .list > .img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
<style scoped>
.m-head {
  height: 550px;
  background: var(--color-3);
  position: relative;
}
.m-head > .wrap {
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 76px;
  padding-top: 168px;
  position: relative;
  z-index: 2;
}
.m-head > .img1 {
  position: absolute;
  right: 140px;
  top: 50%;
  transform: translateY(-50%);
}
.m-head > .wrap > .titleBox {
  font-style: normal;
  font-weight: 400;
}
.m-head > .wrap > .titleBox > .title {
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 58px;
  text-transform: capitalize;
  color: var(--color-1);
  max-width: 600px;
}
.m-head > .wrap > .titleBox > .title > span {
  color: var(--mainColor);
}
.m-head > .wrap > .titleBox > .subTxt {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 51px;
  color: var(--color-2);
  height: 51px;
}
.m-head > .wrap > .otherLogin {
  margin-top: 26px;
}
.m-head > .wrap > .otherLogin,
.m-head > .wrap > .otherLogin > .item {
  display: flex;
  align-items: center;
}
.m-head > .wrap > .otherLogin > .item {
  width: 165px;
  height: 56px;
  border-radius: 8px;
  margin-right: 24px;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  color: var(--color-5);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  border: 1px solid var(--color-5);
}

.m-head > .wrap > .otherLogin > .item.active {
  color: #ffffff;
  background: var(--mainColor);
  border-width: 0;
}
.m-head > .wrap > .introduce > .item {
  text-align: center;
}
.m-head > .wrap > .introduce > .item > .title {
  font-style: normal;
  font-weight: 400;
  font-size: 39px;
  line-height: 70px;
  text-transform: capitalize;
  color: #e7e6e6;
}
.m-head > .wrap > .introduce > .item > .info {
  width: 262px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}
.m-market {
  width: 1440px;
  margin: 0 auto;
  padding-top: 80px;
}

.m-market > .title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: var(--color-1);
}
.m-market > .title > .more {
  font-weight: 400;
  font-size: 14px;
  color: #e7e6e6;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.m-market > .title > .more > .txt {
  box-sizing: border-box;
  padding-right: 6px;
}
.m-market > .loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
}

.m-table {
  width: 1284px;
  font-weight: 500;
  margin: 40px auto 0;
}
.m-table > .tr {
  width: 100%;
  height: 80px;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
}
.m-table > .tr.th {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  color: rgba(255, 255, 255, 0.6);
}
.m-table > .tr > .td {
  display: flex;
  align-items: center;
  width: 25%;
}

.m-banner2 {
  width: 1440px;
  margin: auto;
  position: relative;
  box-sizing: border-box;
  padding-left: 100px;
  padding-bottom: 50px;
}
.m-banner2 > .imgBg {
  width: 556px;
  height: 402px;
  position: absolute;
  right: 46px;
  bottom: 84px;
  object-fit: contain;
}
.m-banner2 > .title {
  font-weight: 700;
  font-size: 36px;
  color: #ffffff;
  line-height: 44px;
  box-sizing: border-box;
  padding-top: 72px;
}
.m-banner2 > .subTitle {
  font-weight: 400;
  font-size: 19px;
  color: #e7e6e6;
  line-height: 44px;
  margin: 19px 0;
}
.m-banner2 .btn {
  width: 257px;
  height: 52px;
  background: #316ad5;
  border-radius: 8px;
  font-weight: 400;
  font-size: 19px;
  text-align: center;
  line-height: 52px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
}
.m-banner2 > .signUp {
  width: 1085px;
  height: 159px;
}
.m-banner2 > .signUp > .title {
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
  margin-bottom: 19px;
}

.m-finance {
  width: 1440px;
  margin: auto;
  height: 792px;
  position: relative;
  box-sizing: border-box;
  padding-left: 100px;
}
.m-finance > .title {
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.035em;
  color: #ffffff;
}
.m-finance > .subTitle {
  width: 401px;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 18px;
}
.m-finance > .list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
}
.m-finance > .list > .item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 226px;
  height: 248px;
  background: #2b3139;
  border-radius: 30px;
  margin-bottom: 34px;
}
.m-finance > .list > .item:not(:nth-child(5n)) {
  margin-right: 34px;
}
.m-finance > .list > .item > .icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: contain;
}
.m-finance > .list > .item > .name {
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  margin-top: 14px;
  margin-bottom: 24px;
}
.m-finance > .list > .item > .info {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
}
.m-finance > .list > .item > .info > .txt {
  color: #d9d9d9;
}
.m-finance > .list > .item > .info > .num {
  padding-left: 4px;
}
.m-finance > .list > .item > .more {
  background: #474d57;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
}
.m-trading {
  width: 1440px;
  position: relative;
  box-sizing: border-box;
  padding-left: 110px;
  padding-bottom: 100px;
  margin: auto;
}
.m-trading > .title {
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
}
.m-trading > .info {
  display: flex;
}
.m-trading > .info > .img {
  width: 468px;
  height: 291px;
  margin-top: 92px;
}
.m-trading > .info > .desc {
  margin-left: 180px;
}
.m-trading > .info > .desc > .downloadBox {
  width: 565px;
  height: 159px;
  background: #0b0e11;
  border-radius: 23px;
  box-sizing: border-box;
  padding-left: 180px;
  position: relative;
}
.m-trading > .info > .desc > .downloadBox > .img {
  width: 122px;
  height: 122px;
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
}
.m-trading > .info > .desc > .downloadBox > .subTitle {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #d9d9d9;
  padding-top: 48px;
}
.m-trading > .info > .desc > .downloadBox > .title {
  font-weight: 400;
  font-size: 33px;
  line-height: 28px;
  color: #ffffff;
  margin-top: 4px;
}
.m-trading > .info > .desc > .platform {
  display: flex;
  align-items: center;
  margin-top: 43px;
}
.m-trading > .info > .desc > .platform > .item {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
}
.m-trading > .info > .desc > .platform > .item > .icon {
  width: 55px;
  height: 55px;
  object-fit: contain;
}
.m-trading > .info > .desc > .platform > .item > .name {
  font-weight: 400;
  font-size: 22px;
  color: #e7e6e6;
}
.m-trading > .info > .desc > .platform > .item:not(:last-child) {
  margin-right: 77px;
}
.m-ad {
  width: 1440px;
  margin: auto;
  padding-top: 18px;
  display: flex;
  align-items: center;
}
.m-ad > .img {
  width: 1312px;
  height: 338px;
  object-fit: contain;
  margin: auto;
}

.m-join {
  width: 100%;
  height: 280px;
  background: #020106;
}
.m-join > .wrap {
  width: 1440px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.m-join > .wrap > .title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
  width: 825px;
  text-align: center;
}
.m-join > .wrap > .btn {
  width: 235px;
  height: 48px;
  background: var(--mainColor);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
}
.m-join > .wrap > .btn > span {
  padding-left: 10px;
}

.m-swiper {
  width: 1312px;
  height: 338px;
  margin: auto;
  padding: 30px 0;
}
.m-swiper a {
  width: 1312px;
  height: 338px;
  display: inline-block;
}
.m-swiper a img {
  width: 100%;
  height: 100%;
}

/deep/.swiper-backface-hidden swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-head > .wrap > .introduce > .item > .title > .sf {
  font-size: 15px;
  padding: 0 8px;
  margin-bottom: -6px;
}

.m-whyMe {
  width: 1260px;
  margin: 46px auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-whyMe > img {
  width: 425px;
  height: 472px;
}
.m-whyMe > .ct {
  width: 500px;
  margin-left: 213px;
}
.m-whyMe > .ct > .title {
  color: var(--color-1);
  font-size: 44px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.m-whyMe > .ct > .txt {
  color: var(--color-text-secondary);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-top: 20px;
}
.m-whyMe > .ct > .btn {
  width: 176px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 40px;
  border-radius: 6px;
  background: #1058de;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
}
.m-openTrade {
  background: var(--color-10);
  width: 100%;
  font-style: normal;
  padding-top: 60px;
}
.m-openTrade > .title {
  text-align: center;
  color: var(--color-1);
  font-size: 44px;
  font-style: normal;
  line-height: 60px;
}
.m-openTrade > .subTxt {
  color: var(--color-text-secondary);
  text-align: center;
  font-size: 19px;
  line-height: 30px;
  margin-top: 20px;
}
.m-openTrade > .ct {
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px auto auto;
  padding-bottom: 60px;
}
.m-openTrade > .ct > img {
  width: 523px;
  height: 471px;
}
.m-openTrade > .ct > .left {
  width: 403px;
}
.m-openTrade > .ct > .left > .title {
  color: var(--color-1);
  font-size: 44px;
  line-height: normal;
}
.m-openTrade > .ct > .left > .txt {
  color: var(--color-text-secondary);
  font-size: 16px;
  line-height: 1.5;
  margin-top: 20px;
  margin-bottom: 60px;
}
.m-openTrade > .ct > .left .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 56px;
  background: rgba(37, 37, 37, 1);
  border-radius: 100px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
}
.m-openTrade > .ct > .left .btn > .txt {
  padding-left: 15px;
}
.m-wrap {
  width: 100%;
  background: var(--color-11);
}
.m-inform {
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 0, 0, 0.64);
  background: rgba(255, 0, 0, 0.16);
}
.m-inform .txt {
  padding-left: 11px;
  white-space: nowrap;
}
</style>
