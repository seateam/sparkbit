<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-d490">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-container-layout-1">
                  <h2 class="u-align-left u-text u-text-1"><b><b>
                    <span class="u-text-palette-1-base">BlueSparrow</span> - {{ companyName }}’s Native Token</b></b>
                  </h2>
                  <img class="u-image u-image-contain u-image-default u-image-1" src="./assets/img/BlueSparrowNEWLOGOwithtransparentbackground1.png" alt="" data-image-width="2048" data-image-height="2048">
                  <p class="u-align-center u-text u-text-2">&nbsp;"We are excited to provide you
                    with an understanding of the importance of our native token, BlueSparrow, and
                    the multitude of benefits it brings to our platform. BlueSparrow serves as the
                    cornerstone of our platform, offering unique advantages to our users. Let's
                    dive deeper into the details."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-3">
          <p>
            <span class="u-text-palette-1-base" style="font-size: 1rem; font-weight: 700;">Enhanced Trading Experience:</span>
          </p>
          <p>We are excited to provide you with an understanding of the importance of our native token, BlueSparrow, and the multitude of benefits it brings to our platform. BlueSparrow serves as the cornerstone of our platform, offering unique advantages to our users. Let's dive deeper into the details.&nbsp;</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Reduced Trading Fees:</span>
          </p>
          <p>
            As a BlueSparrow holder, you enjoy the privilege of reduced trading fees on the {{ companyName }} platform. This reduction in fees translates into significant cost savings, allowing you to trade more efficiently and maximize your returns. By using BlueSparrow, you can avail a discount of 10% on trading fees. Furthermore, when you pair BlueSparrow with Ethereum or Bitcoin, you can trade those cryptocurrencies for free on our platform!</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Staking Rewards:</span>
          </p>
          <p>BlueSparrow offers staking opportunities on the {{ companyName }} platform. By staking your BlueSparrow tokens, you can earn additional rewards, these activities allow you to generate passive income while actively contributing to the growth and stability of the BlueSparrow community.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">BlueVinci:</span>
          </p>
          <p>
            BlueVinci, our very own NFT marketplace! Explore a world of digital art, collectibles, and unique creations from talented artists and creators. Discover, buy, sell, and trade NFTs with ease on BlueVinci.
          </p>
          <p>
            By utilizing BlueSparrow, you can seamlessly purchase and trade NFTs on our BlueVinci.
          </p>
          <p>
            BlueSparrow serves as a convenient and efficient medium of exchange, simplifying the process of acquiring unique digital assets and engaging in the vibrant NFT ecosystem. Please see our BlueVinci page for more details…or visit BlueVinci.io
          </p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Token Utility and Long-term Potential:</span>
          </p>
          <p>BlueSparrow serves as a utility token within the {{ companyName }} platform. As our service continues to expand and attract a growing user base, the demand for BlueSparrow is expected to rise, potentially leading to long-term value appreciation. Holding BlueSparrow allows you to be a part of the platform's success and benefit from its evolving business model.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Join the BlueSparrow Community:</span>
          </p>
          <p>By becoming a BlueSparrow token holder, you join a vibrant and supportive community of like-minded individuals. Engage in discussions, share insights, and stay updated on the latest developments through our dedicated communication channels. The BlueSparrow community fosters collaboration and knowledge-sharing, allowing you to connect with fellow traders and industry enthusiasts.</p>
          <p>BlueSparrow is not merely a token; it is the lifeblood of the {{ companyName }} platform. By holding BlueSparrow, you unlock a world of benefits, including an enhanced trading experience, reduced fees, staking opportunities, governance participation, and long-term potential.</p>
          <p>Join us today and harness the power of BlueSparrow to embark on a transformative trading journey.</p>
          <p>
            <br>
          </p>
          <blockquote>
            <p style="text-align: left;">
              <span style="font-size: 0.875rem;">Disclaimer: BlueSparrow, like any cryptocurrency, is subject to market risks and volatility. It is essential to conduct thorough research and exercise caution when engaging in token-related activities.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "blueSparrowToken",
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
};
</script>

<style scoped>
@import "./assets/css/bluesparrow-token.css";
.u-disable-duration * {
  transition-duration: 0s !important;
}
.u-section-1 .u-text-1 {
  min-width: 700px;
  width: auto;
  text-align: center;
}
</style>
