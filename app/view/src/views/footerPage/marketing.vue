<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1"> Marketing</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">
            <span class="u-text-palette-1-base" style="font-weight: 700;">Partnerships and Collaborations:</span>
          </p>
          <p>We are always looking for exciting partnerships and collaborations. If you would like to explore partnership opportunities with {{ companyName }}, please email us at
            {{ contactEmail }}. We are open to discussing joint ventures, integrations, and strategic alliances.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Media and Press Inquiries:</span>
          </p>
          <p>For media inquiries, interview requests, or press-related matters, please contact our media relations team at
            {{ contactEmail }}. We are available to provide information, interviews, and resources to journalists and media outlets.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Marketing Opportunities:</span>
          </p>
          <p>If you are interested in marketing opportunities, sponsorships, or advertising on our platform, please reach out to our marketing team at
            {{ contactEmail }}. We would be delighted to discuss potential collaborations and promotional activities.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Join Our Community:</span>
          </p>
          <p>Stay connected with us and join our vibrant community on social media. Follow us on Twitter, Instagram, and Facebook to stay updated with the latest news, announcements, and events.We look forward to hearing from you and serving you better at {{ companyName }}!<br>
            <br>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "marketing",
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
  min-height: 1000px;
}

.u-section-2 .u-text-1 {
  margin: 0 -3px 58px 3px;
}

@media (max-width: 1199px) {
  .u-section-2 .u-text-1 {
    width: 700px;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 767px) {
  .u-section-2 .u-text-1 {
    width: 540px;
  }
}

@media (max-width: 575px) {
  .u-section-2 .u-text-1 {
    width: 340px;
  }
}
</style>
