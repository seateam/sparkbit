<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1"> IEO
          - Initial Exchange Offering</h2>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-2" id="sec-d490">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-valign-middle u-container-layout-1">
                  <p class="u-text u-text-1"> IEO stands for Initial Exchange Offering.
                    It is a fundraising method in the cryptocurrency industry where a token sale is
                    conducted on a cryptocurrency exchange platform. Unlike Initial Coin Offerings
                    (ICOs), where tokens are directly sold to investors, an IEO involves the
                    exchange acting as an intermediary, hosting the token sale on its platform.
                    &nbsp;&nbsp;<br>
                    <br>During an Initial Exchange Offering (IEO),
                    we conduct the token sale on behalf of your project team or issuer. We
                    prioritize credibility and compliance, which is why we have a vetting process
                    in place to ensure the legitimacy of your project. Once approved, we take care
                    of various aspects of the token sale, including marketing, token distribution,
                    and listing on our platform.
                    &nbsp;&nbsp;<br>
                    <br>As the exchange, we act as the facilitator,
                    enabling investors to purchase your tokens directly from your project team at a
                    predetermined price. By leveraging our platform for your IEO, you gain access
                    to our wide user base, which includes cryptocurrency enthusiasts, traders, and
                    investors who are actively seeking new opportunities.
                    &nbsp;&nbsp;<br>
                    <br>Our goal is to streamline the token sale
                    process for you and provide a secure and transparent environment for investors.
                    With our expertise and established infrastructure, you can focus on developing
                    your project while we handle the technical and operational aspects of the IEO.
                    This includes managing the marketing efforts to promote your project, ensuring
                    token distribution is smooth and efficient, and facilitating the listing of
                    your tokens on our exchange.
                    &nbsp;&nbsp;<br>
                    <br>By choosing our exchange for your IEO, you
                    benefit from our reputation and credibility, gaining the trust of potential
                    investors. Additionally, our user base provides you with immediate exposure,
                    increasing the visibility of your project and attracting a wider audience.
                    &nbsp;<br>&nbsp;<br>IEOs have gained popularity as they offer a
                    streamlined and regulated approach to token sales, providing a more secure
                    environment for both projects and investors. They have become an effective way
                    for blockchain projects to raise funds and gain exposure to a wide investor
                    base through the established user base of the hosting exchange.
                    &nbsp;<br>&nbsp;It's important for investors to conduct
                    their own research and due diligence before participating in any IEO, as the
                    success and viability of the project may vary.<br>
                    <br>{{ companyName }} is the ideal platform to host an
                    Initial Exchange Offering (IEO) due to our strong reputation, extensive user
                    base, and commitment to providing a secure and transparent environment for
                    token sales. Here's why {{ companyName }} is the right choice for launching your IEO:<br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-3" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trust and Credibility: <br>
            </span>{{ companyName }} is a well-established and trusted cryptocurrency exchange with a proven track record. Our platform adheres to rigorous compliance standards and regulatory requirements, instilling confidence in investors and project teams alike. By conducting your IEO on {{ companyName }}, you leverage our reputation and credibility, which can significantly enhance the perception of your project and attract a larger pool of potential investors.
          </p>
          <p>
            <br>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Broad User Base:</span>
            <br>With a large and diverse user base, {{ companyName }} provides unparalleled access to a wide range of cryptocurrency enthusiasts, traders, and investors. By launching your IEO on our platform, you can tap into our extensive network and benefit from increased exposure, ultimately maximizing your chances of reaching your fundraising goals.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Streamlined Token Sale Process:&nbsp;</span>
            <br>{{ companyName }} handles the entire token sale process, from marketing and promotion to token distribution and listing. Our experienced team guides you through every step, ensuring a smooth and hassle-free experience. By leveraging our platform and expertise, you can focus on developing your project while we take care of the technical and operational aspects of your IEO.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Enhanced Liquidity:</span>
            <br>Listing your tokens on {{ companyName }} immediately after the IEO provides instant liquidity for your investors. Once the tokens are listed on our exchange, they become tradable assets within our vibrant marketplace, allowing investors to buy, sell, and trade with ease. This liquidity not only benefits your project's token holders but also attracts new investors who are drawn to the potential for liquidity and market accessibility.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Ongoing Support and Exposure:</span>
            <br>Beyond the IEO, {{ companyName }} continues to support projects by offering additional exposure and marketing opportunities. We understand the importance of ongoing visibility and engagement for the success of your project. Through our various marketing channels and community engagement initiatives, we help amplify your project's presence and connect you with potential users and investors.
          </p>
          <p>
            <br>
          </p>
          <blockquote>
            <p id="isPasted">Launching your IEO on {{ companyName }} not only provides you with a trusted and secure platform but also grants you access to our extensive user base, streamlined token sale process, enhanced liquidity, and ongoing support.</p>
            <p>We are committed to facilitating successful token sales and helping projects thrive in the dynamic world of blockchain and cryptocurrency.</p>
            <p>Contact our team at <span class="u-text-palette-1-base" style="font-weight: 700;">{{ contactEmail }}</span> to discuss how {{ companyName }} can support your IEO and help you achieve your fundraising objectives.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "IEO",
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    contactEmail() {
      return this.$store.state.systemConfig.contactEmail;
    },
  },
};
</script>

<style scoped>
.u-section-1 {
  background-image: none;
}

.u-section-1 .u-sheet-1 {
  min-height: 177px;
}

.u-section-1 .u-text-1 {
  font-weight: 700;
  margin: 101px auto 37px;
} .u-section-2 {
    background-image: none;
  }

.u-section-2 .u-sheet-1 {
  min-height: 230px;
}

.u-section-2 .u-layout-wrap-1 {
  margin-top: 36px;
  margin-bottom: 36px;
}

.u-section-2 .u-layout-cell-1 {
  min-height: 168px;
}

.u-section-2 .u-container-layout-1 {
  padding: 15px 0;
}

.u-section-2 .u-text-1 {
  margin: 0;
}

@media (max-width: 1199px) {
  .u-section-2 .u-text-1 {
    margin-right: 625px;
  }
}

@media (max-width: 991px) {
  .u-section-2 .u-sheet-1 {
    min-height: 110px;
  }

  .u-section-2 .u-layout-cell-1 {
    min-height: 100px;
  }

  .u-section-2 .u-text-1 {
    margin-right: 386px;
  }
}

@media (max-width: 575px) {
  .u-section-2 .u-text-1 {
    margin-right: 186px;
  }
} .u-section-3 {
    background-image: none;
  }

.u-section-3 .u-sheet-1 {
  min-height: 1000px;
}

.u-section-3 .u-text-1 {
  margin: 0 -3px 58px 3px;
}

@media (max-width: 1199px) {
  .u-section-3 .u-text-1 {
    width: 700px;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 767px) {
  .u-section-3 .u-text-1 {
    width: 540px;
  }
}

@media (max-width: 575px) {
  .u-section-3 .u-text-1 {
    width: 340px;
  }
}
</style>
