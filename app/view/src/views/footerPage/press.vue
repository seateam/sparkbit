<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-95b2">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Press</h2>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-2" id="sec-d490">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-valign-top u-container-layout-1">
                  <p class="u-text u-text-1"> Welcome to the <span class="u-text-palette-1-base" style="font-weight: 700;">{{ companyName }}</span> Media Page, your hub
                    for the latest news, press releases, and articles about {{ companyName }}. Here, you will
                    find a collection of featured articles and media coverage highlighting our
                    innovative solutions, industry insights, and successful partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-align-center u-black u-clearfix u-section-3" id="sec-be9d">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-list u-list-1">
          <div class="u-repeater u-repeater-1">
            <div class="u-border-1 u-border-grey-40 u-grey-90 u-list-item u-repeater-item u-list-item-1">
              <div class="u-container-layout u-similar-container u-valign-middle u-container-layout-1">
                <h2 class="u-text u-text-default u-text-1">01</h2>
                <p class="u-text u-text-default u-text-2">Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
              </div>
            </div>
            <div class="u-border-1 u-border-grey-40 u-grey-90 u-list-item u-repeater-item u-video-cover u-list-item-2">
              <div class="u-container-layout u-similar-container u-valign-middle u-container-layout-2">
                <h2 class="u-text u-text-default u-text-3">02</h2>
                <p class="u-text u-text-default u-text-4">Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
            <div class="u-border-1 u-border-grey-40 u-grey-90 u-list-item u-repeater-item u-video-cover u-list-item-3">
              <div class="u-container-layout u-similar-container u-valign-middle u-container-layout-3">
                <h2 class="u-text u-text-default u-text-5">03</h2>
                <p class="u-text u-text-default u-text-6">Sample text. Click to select the text box. Click again or double click to start editing the text. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-4" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <blockquote>
            <p style="text-align: left;">For more information and to stay updated on {{ companyName }}'s latest developments, please visit our Media Page regularly. For media inquiries or interview requests, please contact our PR team at <span class="u-text-palette-1-base">{{ contactEmail }}</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "press",
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
  min-height: 151px;
}

.u-section-2 .u-layout-wrap-1 {
  margin-top: 29px;
  margin-bottom: 29px;
}

.u-section-2 .u-layout-cell-1 {
  min-height: 104px;
}

.u-section-2 .u-container-layout-1 {
  padding: 30px 0 0;
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
  min-height: 752px;
}

.u-section-3 .u-list-1 {
  width: 942px;
  grid-template-rows: repeat(3, auto);
  margin: 50px auto;
}

.u-section-3 .u-repeater-1 {
  grid-template-columns: repeat(1, 100%);
  min-height: 652px;
  grid-gap: 24px;
}

.u-section-3 .u-list-item-1 {
  background-image: none;
}

.u-section-3 .u-container-layout-1 {
  padding: 20px 30px;
}

.u-section-3 .u-text-1 {
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
  font-weight: 700;
}

.u-section-3 .u-text-2 {
  margin: 20px 0 0;
}

.u-section-3 .u-list-item-2 {
  background-size: auto;
}

.u-section-3 .u-container-layout-2 {
  padding: 20px 30px;
}

.u-section-3 .u-text-3 {
  margin-top: 0;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 700;
}

.u-section-3 .u-text-4 {
  margin: 20px 0 0;
}

.u-section-3 .u-list-item-3 {
  background-size: auto;
}

.u-section-3 .u-container-layout-3 {
  padding: 20px 30px;
}

.u-section-3 .u-text-5 {
  margin-top: 0;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 700;
}

.u-section-3 .u-text-6 {
  margin: 20px 0 0;
}

@media (max-width: 1199px) {
  .u-section-3 .u-list-1 {
    height: auto;
  }
}

@media (max-width: 991px) {
  .u-section-3 .u-sheet-1 {
    min-height: 743px;
  }

  .u-section-3 .u-list-1 {
    width: 720px;
  }
}

@media (max-width: 767px) {
  .u-section-3 .u-sheet-1 {
    min-height: 676px;
  }

  .u-section-3 .u-list-1 {
    width: 540px;
  }

  .u-section-3 .u-container-layout-1 {
    padding-left: 20px;
    padding-right: 20px;
  }

  .u-section-3 .u-container-layout-2 {
    padding-left: 20px;
    padding-right: 20px;
  }

  .u-section-3 .u-container-layout-3 {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 575px) {
  .u-section-3 .u-sheet-1 {
    min-height: 781px;
  }

  .u-section-3 .u-list-1 {
    width: 340px;
  }
} .u-section-4 {
    background-image: none;
  }

.u-section-4 .u-sheet-1 {
  min-height: 262px;
}

.u-section-4 .u-text-1 {
  margin: 56px 0 49px;
}

@media (max-width: 1199px) {
  .u-section-4 .u-text-1 {
    width: 700px;
  }
}

@media (max-width: 767px) {
  .u-section-4 .u-text-1 {
    width: 540px;
  }
}

@media (max-width: 575px) {
  .u-section-4 .u-text-1 {
    width: 340px;
  }
}
</style>
