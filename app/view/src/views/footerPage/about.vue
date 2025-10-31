<template>
  <div class="m-pages u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-d490">
      <div class="u-clearfix u-sheet">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-container-layout-1">
                  <h2 class="u-text u-text-1"><b>Welcome to <span class="u-text-palette-1-base">{{ companyName }} 2.0</span>&nbsp;New and Improved ! </b>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="m-desc">
      <p class="u-text u-text-2"> "At <span class="u-text-palette-1-base">{{ companyName }}</span>, we are driven by our passion for
        cryptocurrencies and our dedication to providing a secure, efficient, and
        user-friendly trading platform. At {{ companyName }}, we are driven by our passion for
        cryptocurrencies and our dedication to providing a secure, efficient, and
        user-friendly trading platform. "
      </p>
      <p class="u-text u-text-3"> With offices in the dynamic cities of Saint Vincent and
        the Grenadines and Dubai, we embrace a global mindset, ensuring that users
        worldwide can benefit from our services. And now, we are excited to announce
        the launch of {{ companyName }} 2.0, marking a new chapter in our journey.
        {{ companyName }} 2.0 represents a significant milestone as we have
        upgraded our entire core infrastructure, taking the user experience to
        unprecedented heights. </p>
    </div>
    <section class="u-align-center u-black u-clearfix u-section-2" id="sec-da3c">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h3 class="u-text u-text-default u-text-1"> Here's what you can expect from {{ companyName }} 2.0</h3>
        <div class="u-accordion u-spacing-10 u-accordion-1">
          <div class="u-accordion-item" @click="selectItem(1)">
            <a :class="{ 'active': activeIndex === 1 }" class="u-accordion-link u-active-grey-80 u-button-style u-grey-80 u-hover-grey-70 u-text-active-white u-text-grey-30 u-text-hover-white u-accordion-link-1" id="link-accordion-0781" aria-controls="accordion-0781" aria-selected="false">
              <span class="u-accordion-link-text"><b>Enhanced Performance</b>
              </span><span class="u-accordion-link-icon u-icon u-text-grey-40 u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 42 42" style=""><use xlink:href="#svg-3644"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 42 42" x="0px" y="0px" id="svg-3644" style="enable-background:new 0 0 42 42;"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "></polygon></svg></span>
            </a>
            <div :class="{ 'u-accordion-active': activeIndex === 1 }" class="u-accordion-pane u-container-style u-grey-90 u-accordion-pane-1" id="accordion-0781" aria-labelledby="link-accordion-0781">
              <div class="u-container-layout u-valign-middle u-container-layout-1">
                <p class="u-text u-text-2"> Our upgraded infrastructure ensures lightning-fast speeds
                  and seamless execution of trades, enabling you to capitalize on market
                  opportunities quickly and efficiently.<br>
                </p>
              </div>
            </div>
          </div>
          <div class="u-accordion-item" @click="selectItem(2)">
            <a :class="{ 'active': activeIndex === 2 }" class="u-accordion-link u-active-grey-80 u-button-style u-grey-80 u-hover-grey-70 u-text-active-white u-text-grey-30 u-text-hover-white u-accordion-link-2" id="link-accordion-4c47" aria-controls="accordion-4c47" aria-selected="true">
              <span class="u-accordion-link-text"><b>Uncompromised Security</b>
              </span><span class="u-accordion-link-icon u-icon u-text-grey-40 u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 42 42" style=""><use xlink:href="#svg-9d52"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 42 42" x="0px" y="0px" id="svg-9d52" style="enable-background:new 0 0 42 42;"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "></polygon></svg></span>
            </a>
            <div :class="{ 'u-accordion-active': activeIndex === 2 }" class="u-accordion-pane u-container-style u-grey-90 u-accordion-pane-2" id="accordion-4c47" aria-labelledby="link-accordion-4c47">
              <div class="u-container-layout u-valign-middle u-container-layout-2">
                <p class="u-text u-text-3"> Safeguarding your assets and personal information is our
                  utmost priority. {{ companyName }} 2.0 is fortified with advanced security measures,
                  providing you with peace of mind while trading.</p>
              </div>
            </div>
          </div>
          <div class="u-accordion-item u-accordion-item-3" @click="selectItem(3)">
            <a :class="{ 'active': activeIndex === 3 }" class="u-accordion-link u-active-grey-80 u-button-style u-grey-80 u-hover-grey-70 u-text-active-white u-text-grey-30 u-text-hover-white u-accordion-link-3" id="link-accordion-a910" aria-controls="accordion-a910" aria-selected="false">
              <span class="u-accordion-link-text"><b>Streamlined User Interface</b>
              </span><span class="u-accordion-link-icon u-icon u-text-grey-40 u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 42 42" style=""><use xlink:href="#svg-a2e5"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 42 42" x="0px" y="0px" id="svg-a2e5" style="enable-background:new 0 0 42 42;"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "></polygon></svg></span>
            </a>
            <div :class="{ 'u-accordion-active': activeIndex === 3 }" class="u-accordion-pane u-container-style u-grey-90 u-accordion-pane-3" id="accordion-a910" aria-labelledby="link-accordion-a910">
              <div class="u-container-layout u-valign-middle u-container-layout-3">
                <p class="u-text u-text-4"> We have revamped our user interface, making it more
                  intuitive and user-friendly. Experience a seamless navigation and an enhanced
                  trading environment that simplifies your crypto journey.</p>
              </div>
            </div>
          </div>
          <div class="u-accordion-item u-accordion-item-4" @click="selectItem(4)">
            <a :class="{ 'active': activeIndex === 4 }" class="u-accordion-link u-active-grey-80 u-button-style u-grey-80 u-hover-grey-70 u-text-active-white u-text-grey-30 u-text-hover-white u-accordion-link-4" id="link-accordion-a910" aria-controls="accordion-a910" aria-selected="false">
              <span class="u-accordion-link-text"><b>Expanded Features</b>
              </span><span class="u-accordion-link-icon u-icon u-text-grey-40 u-icon-4"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 42 42" style=""><use xlink:href="#svg-1fed"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 42 42" x="0px" y="0px" id="svg-1fed" style="enable-background:new 0 0 42 42;"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "></polygon></svg></span>
            </a>
            <div :class="{ 'u-accordion-active': activeIndex === 4 }" class="u-accordion-pane u-container-style u-grey-90 u-accordion-pane-4" id="accordion-a910" aria-labelledby="link-accordion-a910">
              <div class="u-container-layout u-valign-middle u-container-layout-4">
                <p class="u-text u-text-5"> {{ companyName }} introduces new features and tools designed to
                  empower your trading decisions. From advanced charting options to customizable
                  alerts, we provide you with the tools to stay ahead in the ever-evolving crypto
                  market.</p>
              </div>
            </div>
          </div>
          <div class="u-accordion-item" @click="selectItem(5)">
            <a :class="{ 'active': activeIndex === 5 }" class="u-accordion-link u-active-grey-80 u-button-style u-grey-80 u-hover-grey-70 u-text-active-white u-text-grey-30 u-text-hover-white u-accordion-link-5" id="link-accordion-a910" aria-controls="accordion-a910" aria-selected="false">
              <span class="u-accordion-link-text"><b>Dedicated Support</b>
              </span><span class="u-accordion-link-icon u-icon u-text-grey-40 u-icon-5"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 42 42" style=""><use xlink:href="#svg-33c3"></use></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" class="u-svg-content" viewBox="0 0 42 42" x="0px" y="0px" id="svg-33c3" style="enable-background:new 0 0 42 42;"><polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "></polygon></svg></span>
            </a>
            <div :class="{ 'u-accordion-active': activeIndex === 5 }" class="u-accordion-pane u-container-style u-grey-90 u-accordion-pane-5" id="accordion-a910" aria-labelledby="link-accordion-a910">
              <div class="u-container-layout u-valign-middle u-container-layout-5">
                <p class="u-text u-text-6"> Our commitment to exceptional customer service remains
                  unwavering. Our support team is readily available to assist you on your crypto
                  journey, ensuring a smooth and hassle-free experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-3" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p style="text-align: left;">Join us at {{ companyName }} and discover a world of possibilities in the realm of cryptocurrencies. Embrace our upgraded platform, built on cutting-edge technology and fueled by our passion for innovation.</p>
          <blockquote>
            <span style="font-weight: 700; font-style: normal; font-size: 1.875rem;">Our Mission</span>
            <br>
            <p style="text-align: left;">At {{ companyName }}, we simplify cryptocurrency adoption by empowering individuals and businesses. We believe that cryptocurrencies have the potential to reshape traditional financial systems, offering greater accessibility, transparency, and financial freedom.<br>We aim to be at the forefront of this revolution, providing a reliable and innovative platform that enables our users to navigate the crypto market with ease and confidence.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
  methods: {
    selectItem(index) {
      if (index == this.activeIndex) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>

<style scoped>
@import "./assets/css/about.css";
.u-disable-duration * {
  transition-duration: 0s !important;
}
.m-desc {
  background: #000000;
  color: #FFFFFF;
  width: 1200px;
  margin: 50px auto auto;
}
.u-section-1 .u-layout-cell-1 {
  min-height: unset;
}
.u-body {
  background: #000000;
}
</style>
