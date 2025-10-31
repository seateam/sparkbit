<template>
  <!-- <div id="footer-box" class="footer-box" v-if="true">
      <section v-html="index"></section>
    </div> -->

  <!-- 改，2022.08.18，新增style -->
  <!-- 改，2022.10.14，临时注释 -->

  <!-- v-if="footerTemplateReceived" -->
  <div id="footer-box" class="footer-box" style="background: rgba(20, 19, 22, 1)">
    <!-- 自定义 -->
    <!-- 改，2022.09.18，注释 -->
    <!-- <template v-if="footerTemplate && configFooterOpen === '1'">
      <div v-if="footerTemplate.indexOf('foot-min-top') !== -1">
        <section v-html="footerTemplate" v-if="footerTemplate"></section>
      </div>
      <div v-else class="footer-bar">
        <div class="footer-menu clearfix">
          <div class="footer-logo">
            <img :src="logoUrl" alt="" />
          </div>

          <div
            class="footer-template"
            v-if="footerTemplate && configFooterOpen === '1'"
            v-html="footerTemplate"
          ></div>
        </div>
      </div>
    </template>
    <section v-else-if="templateLayoutType === '2'">
      <div class="int-footer-bar">
        <div class="int-footer-left">
          <div class="int-footer-logo">
            <img :src="logoUrl" alt="" />
          </div>
        </div>
        <div class="int-footer-template">
          <ul class="menu-ul-int">
            <li class="item" v-for="(item, index) in sideList" :key="index">
              <router-link :to="'/cms/' + item.fileName">
                <span class="z-2-cl hoverHide">{{ item.title }}</span>
                <span class="z-1-cl hoverShow">{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <br style="clear: both" />
      </div>

      <div
        class="int-copy z-2-cl"
        style="border-color: #293448 !important"
        v-if="footerTemplateReceived"
      >
        Copyright © {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved
      </div>
    </section> -->

    <!-- 默认 -->
    <!-- 改，2022.10.14，临时注释 -->
    <!-- v-if="footerTemplateReceived && configFooterOpen !== '1' && templateLayoutType !== '2'" -->
    <section>
      <!-- 内容区域 -->
      <!-- 改，2022.09.18，注释 -->
      <!-- <div class="footer-bar footer-default">
        <div class="footer-menu clearfix">
          <div class="footer-logo">
            <img :src="logoUrl" alt="" />
          </div>
          <div class="footer-template">
            <ul class="menu-ul-default">
              <li class="item" v-for="(item, index) in sideList" :key="index">
                <router-link :to="'/cms/' + item.fileName">
                  <span class="z-2-cl hoverHide">{{ item.title }}</span>
                  <span class="z-1-cl hoverShow">{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div> -->

      <div style="width: 100%; min-height: 272px; background: rgba(20, 19, 22, 1); display: flex">
        <div
          style="
            width: 1128px;
            min-height: 152px;
            margin: 80px auto 40px auto;
            display: flex;
            justify-content: space-between;
          "
        >
          <div class="footer_div_item">
            <span class="footer_span_title"> ABOUT US </span>

            <a
              href="https://help.zedcex.com/en/collections/3688381-zedcex-exchange-api-doc"
              target="_blank"
            >
              <span class="footer_span_item"> API Doc </span>
            </a>

            <router-link to="/cms/privacy">
              <span class="footer_span_item"> Privacy Policy </span>
            </router-link>

            <router-link to="/cms/about">
              <span class="footer_span_item"> Who We Are </span>
            </router-link>

            <router-link to="/cms/agreement">
              <span class="footer_span_item"> User Agreement </span>
            </router-link>

            <router-link to="/cms/FEE STRUCTURE">
              <span class="footer_span_item"> Transaction Fee </span>
            </router-link>

            <router-link to="/cms/WHERE WE HAVE">
              <span class="footer_span_item"> Where We Have </span>
            </router-link>

            <router-link to="/cms/TO OUR TEAM STORY">
              <span class="footer_span_item"> Team Story </span>
            </router-link>

            <router-link to="/cms/disclaimer">
              <span class="footer_span_item"> Disclaimer </span>
            </router-link>

            <a href="https://www.botxion.net" target="_blank">
              <span class="footer_span_item"> Market Making </span>
            </a>

            <router-link to="/cms/REFERRAL HOW IT WORK">
              <span class="footer_span_item"> Referral How It Work </span>
            </router-link>

            <router-link to="/cms/OTC Fiat">
              <span class="footer_span_item"> OTC Fiat </span>
            </router-link>

            <router-link to="/cms/AirDrop Form">
              <span class="footer_span_item"> AirDrop Form </span>
            </router-link>

            <router-link to="/cms/TERMS OF USE">
              <span class="footer_span_item"> Terms Of Use </span>
            </router-link>

            <router-link to="/cms/WHITE PAPER">
              <span class="footer_span_item"> White Paper </span>
            </router-link>

            <router-link to="/cms/FEE STRUCTURE">
              <span class="footer_span_item"> Transaction Fee </span>
            </router-link>

            <router-link to="/cms/BUY CRYPTO TO DRAW A CARD">
              <span class="footer_span_item"> Draw A Card </span>
            </router-link>

            <router-link to="/cms/Apply Token Listing">
              <span class="footer_span_item"> Apply Token Listing </span>
            </router-link>

            <a href="/" target="_blank" style="margin-top: 45px">
              <img src="/static/img/new/ios_download.svg" style="width: 160px" />
            </a>

            <a href="/" target="_blank" style="margin-top: 18px">
              <img src="/static/img/new/google_download.svg" style="width: 160px" />
            </a>
          </div>

          <div class="footer_div_item">
            <span class="footer_span_title"> EXCHANGE PARTNER </span>

            <a href="https://www.binance.com/en-GB/price/zedxion" target="_blank">
              <span class="footer_span_item"> Binance Exchange </span>
            </a>

            <a href="https://vindax.com/exchange-base.html?symbol=ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> Vindax Exchange </span>
            </a>

            <a href="https://www.zedxion.io/en_US/trade/ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> ZEDXION Exchange </span>
            </a>

            <a href="https://bankcex.com/exchange-base.html?symbol=ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> Bankcex Exchange </span>
            </a>

            <a href="https://dex-trade.com/spot/trading/ZEDXIONUSDT" target="_blank">
              <span class="footer_span_item"> Dex-Trade Exchange </span>
            </a>

            <a
              href="https://app.zerion.io/explore/asset/ZEDXION-0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> Zerion Exchange </span>
            </a>

            <a href="https://trade.aaxmm.io/en-US/spot/ZEDXION:USDT" target="_blank">
              <span class="footer_span_item"> AAX Exchange </span>
            </a>

            <a
              href="https://pancakeswap.info/token/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341/"
              target="_blank"
            >
              <span class="footer_span_item"> Pancek Swap </span>
            </a>

            <a
              href="https://sunswap.com/#/scan/detail/TMNTn2uFAHhkGE3uuM84rhfRRjt6ry9xnL"
              target="_blank"
            >
              <span class="footer_span_item"> Sun Swap </span>
            </a>

            <a
              href="https://dex.guru/token/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341-bsc"
              target="_blank"
            >
              <span class="footer_span_item"> Dex Exchange </span>
            </a>

            <a
              href="https://ethplorer.io/address/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341#tab=tab-transfers"
              target="_blank"
            >
              <span class="footer_span_item"> EthPlorer </span>
            </a>

            <a href="https://azbit.com/exchange/ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> AzBit Ex </span>
            </a>

            <a href="https://coinsbit.io/trade_classic/ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> Coinbit Ex </span>
            </a>

            <a href="https://www.digifinex.com/en-ww/trade/USDT/ZEDXION" target="_blank">
              <span class="footer_span_item"> Digi Finex Ex </span>
            </a>

            <a href="https://p2pb2b.com/trade/ZEDXION_USDT" target="_blank">
              <span class="footer_span_item"> P2PB2B Ex Ex </span>
            </a>
          </div>

          <div class="footer_div_item">
            <span class="footer_span_title"> Important Links </span>

            <a href="https://www.zedcex.com/en_US/trade/BTC_USDT" target="_blank">
              <span class="footer_span_item"> All Markets </span>
            </a>

            <a
              href="https://etherscan.io/token/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> ERC20 Blockchain </span>
            </a>

            <a
              href="https://bscscan.com/token/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> BEP20 Blockchain </span>
            </a>

            <a
              href="https://tronscan.org/#/token20/TMNTn2uFAHhkGE3uuM84rhfRRjt6ry9xnL"
              target="_blank"
            >
              <span class="footer_span_item"> TRC20 Blockchain </span>
            </a>

            <a href="https://form.jotform.com/223020553418446" target="_blank">
              <span class="footer_span_item"> Listing Form </span>
            </a>

            <a href="https://coinmarketcap.com/currencies/zedxion/" target="_blank">
              <span class="footer_span_item"> CoinMarketcap Token </span>
            </a>

            <a href="https://www.coingecko.com/en/coins/zedxion" target="_blank">
              <span class="footer_span_item"> Coingiko Token </span>
            </a>

            <a href="https://coinpaprika.com/exchanges/zedxion-exchange/" target="_blank">
              <span class="footer_span_item"> Coinpaprika EX </span>
            </a>

            <a href="https://nomics.com/assets/zedxion-zedxion" target="_blank">
              <span class="footer_span_item"> Nomics Token </span>
            </a>

            <a href="https://coincodex.com/exchange/zedxion/" target="_blank">
              <span class="footer_span_item"> CoinCodex </span>
            </a>

            <a href="https://www.livecoinwatch.com/price/Zedxion-ZEDXION" target="_blank">
              <span class="footer_span_item"> Live Coin Token </span>
            </a>

            <a
              href="https://www.dextools.io/app/bsc/pair-explorer/0xd26c77880a371ff6d683e9716a7b684232927987"
              target="_blank"
            >
              <span class="footer_span_item"> Dex Tools </span>
            </a>

            <a href="https://cryptorank.io/price/zedxion" target="_blank">
              <span class="footer_span_item"> Crepto Rank </span>
            </a>

            <a href="https://dappradar.com/multichain/exchanges/zedxion" target="_blank">
              <span class="footer_span_item"> Dapp Radar </span>
            </a>

            <a
              href="https://youcrypto.org/token/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> You Crypto </span>
            </a>

            <a href="https://coincheckup.com/coins/zedxion" target="_blank">
              <span class="footer_span_item"> Coincheckup </span>
            </a>

            <a href="https://zedxion.zendesk.com/hc/en-gb" target="_blank">
              <span class="footer_span_item"> Help & Support </span>
            </a>

            <a href="https://www.binance.com/en-GB/price/zedxion" target="_blank">
              <span class="footer_span_item"> Binance ZEDXION </span>
            </a>

            <a href="https://www.binance.com/en-GB/price/usdz" target="_blank">
              <span class="footer_span_item"> Binance USDZ </span>
            </a>

            <a href="https://crypto.com/price/usdz" target="_blank">
              <span class="footer_span_item"> Crypto USDZ </span>
            </a>

            <a href="https://crypto.com/price/zedxion" target="_blank">
              <span class="footer_span_item"> Crypto ZEDXION </span>
            </a>

            <a
              href="https://infinitycrypto.com/trade/BNB/0xFbC4f3f645C4003a2E4F4e9b51077d2DaA9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> Infinity Dex </span>
            </a>

            <a
              href="https://poocoin.app/tokens/0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> Poo Dex </span>
            </a>

            <a href="https://nft.zedxion.com/" target="_blank">
              <span class="footer_span_item"> NFT Market Place </span>
            </a>

            <a href="https://www.digifinex.com/en-ww/trade/USDT/USDZ" target="_blank">
              <span class="footer_span_item"> USDZ Digifinex</span>
            </a>

            <a href="https://t.me/ZEDXION_EXCHANGE_BOT" target="_blank">
              <span class="footer_span_item"> Price Bot Telegram</span>
            </a>
          </div>

          <div class="footer_div_item">
            <span class="footer_span_title"> SOCIAL LINKS </span>

            <a href="https://t.me/zedxion_team" target="_blank">
              <span class="footer_span_item"> Telegram Chat Listing  </span>
            </a>

            <a href="https://t.me/zedcex" target="_blank">
              <span class="footer_span_item"> Telegram Channel </span>
            </a>

            <a href="https://t.me/zedxion_support" target="_blank">
              <span class="footer_span_item"> Telegram Chat </span>
            </a>

            <a
              href="https://coinbrain.com/coins/bnb-0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341"
              target="_blank"
            >
              <span class="footer_span_item"> Coin Brain </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> Facebook </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> Twitter </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> Github </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> YouTube </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> Linkedin </span>
            </a>

            <a href="https://linktr.ee/zedxion" target="_blank">
              <span class="footer_span_item"> Medium </span>
            </a>

            <span class="footer_span_title" style="margin-top: 64px">
              {{ $t("home.footer.sub_title") }}
            </span>

            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-bottom: 286px;
              "
              class="footer_input"
            >
              <div
                style="
                  width: 309px;
                  height: 48px;
                  background: rgba(255, 255, 255, 0.08);
                  border-radius: 1px;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  margin-right: 24px;
                "
              >
                <input
                  type="text"
                  :placeholder="$t('home.email')"
                  style="
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 22px;
                    text-align: left;
                    color: rgba(146, 146, 146, 1);
                    margin-left: 14px;
                    width: 260px;
                  "
                />
              </div>

              <div
                style="
                  width: 152px;
                  height: 48px;
                  background: rgba(34, 106, 253, 1);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  position: relative;
                "
              >
                <span
                  style="
                    font-family: Outfit;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 22px;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                  "
                >
                  {{ $t("home.footer.subscribe") }}
                </span>

                <a href="/" style="position: absolute; top: -406px; right: 0px">
                  <img :src="logoUrl" style="width: 160px" />

                  <!-- <img
                    src="https://zedcex.oss-accelerate.aliyuncs.com/files/zedcex.png"
                    style="width: 160px"
                  /> -->
                </a>

                <div style="position: absolute; top: -280px; right: -5px">
                  <div
                    class="livecoinwatch-widget-1"
                    lcw-coin="ZEDXION"
                    lcw-base="USD"
                    lcw-secondary="BTC"
                    lcw-period="d"
                    lcw-color-tx="#ffffff"
                    lcw-color-pr="#58c7c5"
                    lcw-color-bg="#141316"
                    lcw-border-w="0"
                  ></div>
                </div>

                <iframe
                  src="https://api.elasticemail.com/form?lid=1lpj-JzdAO09UlwRei1HWw2"
                  height="486"
                  width="504"
                  style="border: none; position: absolute; left: -342px; bottom: -380px"
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 改，2022.10.16，新增 -->
      <div
        style="
          width: 100%;
          min-height: 200px;
          background: rgba(20, 19, 22, 1);
          display: flex;
          border-color: rgb(38 38 40);
          border-top-width: 1px;
          border-top-style: solid;
        "
      >
        <div
          style="
            width: 1186px;
            height: 100px;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div style="width: 100%; display: flex; justify-content: space-between">
            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_bscscan.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_coincodex.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_coin.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_dextrade.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_Etherscan.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_linch.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_dappradar.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_dextools.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_coinMarketCap.png" style="height: 34px" />
            </a>
          </div>
          <div style="width: 960px; display: flex; justify-content: space-between">
            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_coinpaprika.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_cryptorank.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_coinZilla.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_nomics-1.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_tronscan.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_PancakeSwap.png" style="height: 34px" />
            </a>

            <a href="/" target="_blank">
              <img src="/static/img/new/zedxion_CoinGecko.png" style="height: 34px" />
            </a>
          </div>
        </div>
      </div>

      <!-- 底部区域 -->
      <!-- style="border-color: #293448 !important" -->
      <!-- 改，2022.08.28，style -->
      <div
        class="copy z-2-cl"
        style="border-color: rgba(146, 146, 146, 1) !important; color: rgba(146, 146, 146, 1)"
        v-if="footerTemplateReceived"
      >
        Copyright © {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved
      </div>
    </section>

    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-PXQDBGB"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe>
  </div>
</template>

<script>
import mixin from "../../common-mixin/modules/footer/footer";
import "../../common-mixin/modules/footer/footer.styl";

export default {
  name: "c-footer",
  mixins: [mixin],
  created() {
    this.getData();
  },
  mounted() {
    // console.log(this.sideList);

    setTimeout(() => {
      this.embedded_script();
    }, 2000);
  },
  methods: {
    embedded_script() {
      const recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute("src", "https://www.livecoinwatch.com/static/lcw-widget.js");
      document.head.appendChild(recaptchaScript);

      const recaptchaScript_googletagmanager = document.createElement("script");
      recaptchaScript_googletagmanager.setAttribute(
        "src",
        "https://www.googletagmanager.com/gtag/js?id=G-ZFJB3K7WDD"
      );
      document.head.appendChild(recaptchaScript_googletagmanager);

      // let recaptchaScript_zendesk = document.createElement("script");
      // recaptchaScript_zendesk.setAttribute("id", "ze-snippet");
      // recaptchaScript_zendesk.setAttribute(
      //   "src",
      //   "https://static.zdassets.com/ekr/snippet.js?key=8cb15d5c-c4f8-4fe8-bb7f-dae70b8de80d"
      // );
      // document.head.appendChild(recaptchaScript_zendesk);

      window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "hgs7jbgw",
      };
      const recaptchaScript_zendesk = document.createElement("script");
      recaptchaScript_zendesk.textContent = `
        // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/hgs7jbgw'
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hgs7jbgw';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      `;
      document.head.appendChild(recaptchaScript_zendesk);
    },
  },
};
</script>

<style>
.footer_div_item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer_span_title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 16px;
  cursor: pointer;
}
.footer_input input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(146, 146, 146, 1);
}
.footer_span_item {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #88888b;
  margin-bottom: 8px;
  cursor: pointer;
}
</style>
