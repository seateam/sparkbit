<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Countries and Regions</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <div class="fr-wrapper" dir="auto">
            <div class="fr-element fr-view" dir="auto" spellcheck="true">
              <p id="isPasted">
                <span class="u-text-palette-1-base" style="font-weight: 700;">&nbsp;</span>
              </p>
              <p id="isPasted">{{ companyName }} is available in multiple countries and regions around the world. Here is a list of supported countries:</p>
              <p>
                <br>
              </p>
              <p>
                <span class="u-text-palette-1-base" style="font-weight: 700;">All Of Africa</span>
              </p>
              <p>
                <span class="u-text-palette-1-base" style="font-weight: 700;">Americas:</span>
              </p>
              <p style="padding-left: 20px;">Argentina<br>Brazil<br>Canada<br>Chile<br>Colombia<br>Mexico<br>Peru<br>United States
              </p>
              <p>
                <br>
              </p>
              <p>
                <span class="u-text-palette-1-base" style="font-weight: 700;">Asia &amp; Pacific:</span>
              </p>
              <ul>
                <li>Afghanistan</li>
                <li>Australia</li>
                <li>Bangladesh</li>
                <li>Cambodia</li>
                <li>India - English</li>
                <li>India - Hindi</li>
                <li>Indonesia</li>
                <li>Japan</li>
                <li>Kazakhstan</li>
                <li>Mongolia</li>
                <li>Myanmar</li>
                <li>New Zealand</li>
                <li>Pakistan</li>
                <li>Philippines</li>
                <li>Taiwan</li>
                <li>Vietnam</li>
              </ul>
              <p>
                <br>
                <span class="u-text-palette-1-base" style="font-weight: 700;">Europe:</span>
              </p>
              <ul>
                <li>Bulgaria</li>
                <li>Czech Republic</li>
                <li>France</li>
                <li>Greece</li>
                <li>Hungary</li>
                <li>Italy</li>
                <li>Latvia</li>
                <li>Poland</li>
                <li>Portugal</li>
                <li>Romania</li>
                <li>Russia</li>
                <li>Slovakia - Slova</li>
                <li>kSlovenia - Slovenian</li>
                <li>Spain</li>
                <li>Switzerland</li>
                <li>Turkey</li>
                <li>Ukraine - Russian</li>
                <li>Ukraine - Ukrainian</li>
                <li>United Kingdom</li>
              </ul>
              <p>
                <br>
                <span class="u-text-palette-1-base" style="font-weight: 700;">Middle East:</span>
              </p>
              <ul>
                <li>Egypt</li>
                <li>Israel</li>
                <li>Iran</li>
                <li>Saudi Arabia</li>
                <li>United Arab Emirates</li>
              </ul>
              <p>
                <br>
              </p>
            </div>
          </div>
          <div class="fr-second-toolbar">
            <br>
          </div>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-2">
          <blockquote>
            <p style="text-align: left;">Please note that this list is subject to change.</p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "siteMap",
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
};
</script>

<style scoped>
.u-section-1 {
  background-image: none;
}

.u-section-1 .u-sheet-1 {
  min-height: 252px;
}

.u-section-1 .u-text-1 {
  font-weight: 700;
  margin: 101px auto 60px;
} .u-section-2 {
    background-image: none;
  }

.u-section-2 .u-sheet-1 {
  min-height: 1920px;
}

.u-section-2 .u-text-1 {
  margin: 19px 0 0;
}

.u-section-2 .u-text-2 {
  margin: -8px 0 53px;
}
</style>
