<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-f850">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Charity</h2>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-2" id="sec-d490">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-valign-top u-container-layout-1">
                  <p class="u-text u-text-1"> At the forefront of this digital revolution, <span class="u-text-palette-1-base">BlueSparrow</span> is harnessing the power of cryptocurrency to drive meaningful
                    social change and empower communities worldwide.&nbsp;<br>
                    <span class="u-text-palette-1-base">{{ companyName }}</span> is proud to share the significant impact we have made in the Masai Mara region
                    of Kenya, Africa. With a donation of $30,000, we embarked on a mission to
                    construct classrooms and provide educational opportunities to children in need.&nbsp;<br>
                    <br>Our skilled workers and volunteers worked tirelessly to bring
                    the BlueSparrow school to life. In April 2022, the school opened its doors to
                    eager children, who enrolled for the new term and shared heartwarming pictures
                    of our iconic <span style="font-weight: 700;">Blue Bird</span>, representing hope and progress.&nbsp;<br>The
                    completion of this project fills us with immense pride and joy. Our commitment to
                    corporate social responsibility is reflected in the presence of our logo and
                    branding, symbolizing our dedication to making a lasting difference in the
                    lives of these children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-3" id="sec-93cc">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-container-layout-1" src="">
                  <div class="u-carousel u-gallery u-layout-thumbnails u-lightbox u-show-text-always u-gallery-1" id="carousel-e131" data-interval="5000" data-u-ride="carousel" data-pswp-uid="1">
                    <div class="u-carousel-inner u-gallery-inner" role="listbox">
                      <div class="u-carousel-item u-gallery-item u-carousel-item-2" :class="{'u-active': imgIndex === 1}" data-pswp-item-id="1" data-gallery-uid="1">
                        <div class="u-back-slide" data-image-width="940" data-image-height="788">
                          <img class="u-back-image u-expanded" src="./assets/img/img22.png">
                        </div>
                        <div class="u-over-slide u-over-slide-2">
                          <h3 class="u-gallery-heading">Sample Title</h3>
                          <p class="u-gallery-text">Sample Text</p>
                        </div>
                      </div>
                      <div class="u-carousel-item u-gallery-item u-carousel-item-1" :class="{'u-active': imgIndex === 2}" data-pswp-item-id="0" data-gallery-uid="1">
                        <div class="u-back-slide" data-image-width="1000" data-image-height="750">
                          <img class="u-back-image u-expanded" src="./assets/img/10.jpg">
                        </div>
                        <div class="u-over-slide u-over-slide-1">
                          <h3 class="u-gallery-heading">Sample Title</h3>
                          <p class="u-gallery-text">Sample Text</p>
                        </div>
                      </div>
                      <div class="u-carousel-item u-gallery-item u-carousel-item-3" :class="{'u-active': imgIndex === 3}" data-image-width="2836" data-image-height="1875" data-pswp-item-id="2" data-gallery-uid="1">
                        <div class="u-back-slide" data-image-width="1280" data-image-height="960">
                          <img class="u-back-image u-expanded" src="./assets/img/imag55.jpg">
                        </div>
                        <div class="u-over-slide u-over-slide-3">
                          <h3 class="u-gallery-heading">Sample Title</h3>
                          <p class="u-gallery-text">Sample Text</p>
                        </div>
                        <!--<style data-mode="XL" data-visited="true"></style>-->
                        <!--<style data-mode="LG"></style>-->
                        <!--<style data-mode="MD"></style>-->
                        <!--<style data-mode="SM"></style>-->
                        <!--<style data-mode="XS"></style>-->
                      </div>
                    </div>
                    <span @click="imgIndexFn('pre')" class="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-1" href="#carousel-e131" role="button" data-u-slide="prev">
                      <span aria-hidden="true">
                        <svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></svg>
                      </span>
                      <span class="sr-only">
                        <svg viewBox="0 0 451.847 451.847"><path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0
c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744
c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></svg>
                      </span>
                    </span>
                    <span @click="imgIndexFn('next')" class="u-absolute-vcenter u-carousel-control u-carousel-control-next u-grey-70 u-icon-circle u-opacity u-opacity-70 u-spacing-10 u-text-white u-carousel-control-2" href="#carousel-e131" role="button" data-u-slide="next">
                      <span aria-hidden="true">
                        <svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
                      </span>
                      <span class="sr-only">
                        <svg viewBox="0 0 451.846 451.847"><path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></svg>
                      </span>
                    </span>
                    <ol class="u-carousel-thumbnails u-spacing-10 u-carousel-thumbnails-1">
                      <li @click="imgIndex = 1" class="u-carousel-thumbnail u-carousel-thumbnail-1" data-u-target="#carousel-e131" data-u-slide-to="0">
                        <img class="u-carousel-thumbnail-image u-image" src="./assets/img/img22.png">
                      </li>
                      <li @click="imgIndex = 2" class="u-carousel-thumbnail u-carousel-thumbnail-2" data-u-target="#carousel-e131" data-u-slide-to="1">
                        <img class="u-carousel-thumbnail-image u-image" src="./assets/img/10.jpg">
                      </li>
                      <li @click="imgIndex = 3" class="u-carousel-thumbnail u-carousel-thumbnail-3" data-u-target="#carousel-e131" data-u-slide-to="2">
                        <img class="u-carousel-thumbnail-image u-image" src="./assets/img/imag55.jpg">
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div class="u-align-left u-black u-container-style u-layout-cell u-radius-2 u-right-cell u-shape-round u-size-30 u-size-xs-60 u-layout-cell-2">
                <div class="u-border-2 u-border-grey-80 u-container-layout u-container-layout-2">
                  <p class="u-align-left u-text u-text-1">Recognizing
                    the urgent need for clean water access in the Masai Mara region, we initiated
                    the Masai Water Tower Project. We are delighted to announce the successful
                    completion and operation of the BlueSparrow water tower.&nbsp;<br>
                    <br>This
                    achievement not only provides fresh, clean water to the community but also
                    liberates girls from the arduous task of water collection. By reducing their
                    responsibilities, we enable them to devote more time to education. This
                    milestone directly impacts over 5,000 people, transforming lives and fostering
                    progress.<br>
                    <br>The
                    impact of our work has been met with overwhelming gratitude from the local
                    community.
                    Become a part of our movement to leverage the potential of
                    cryptocurrency for social change. Together, let's create a more inclusive and
                    prosperous world that benefits everyone.<br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
let timer = null;
export default {
  name: "charity",
  data() {
    return {
      imgIndex: 1,
    };
  },
  mounted() {
    // this.autoPlay();
  },
  destroyed() {
    if (timer) {
      clearInterval(timer);
    }
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
  methods: {
    imgIndexFn(type) {
      const { imgIndex } = this;
      if (type === "pre" && imgIndex > 1) {
        this.imgIndex = imgIndex - 1;
      } else if (type === "next" && imgIndex < 3) {
        this.imgIndex = imgIndex + 1;
      }
    },
    autoPlay() {
      timer = setInterval(() => {
        const { imgIndex } = this;
        if (imgIndex < 3) {
          this.imgIndex = imgIndex + 1;
        } else {
          this.imgIndex = 1;
        }
      }, 3000);
    },
  },
};
</script>

<style scoped>
@import "./assets/css/charity.css";
.u-spacing-10.u-search-icon, .u-spacing-10.u-gallery-nav, .u-spacing-10.u-carousel-control {
  cursor: pointer;
}
</style>
