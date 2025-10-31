<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1"> Privacy Policy</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">
            <span class="u-text-palette-1-base" style="font-weight: 700;">Privacy Policy</span>
          </p>
          <p>This Privacy Policy describes how we collect, use, store, and disclose your personal information when you use our crypto exchange platform ("{{ companyName }}"). By accessing or using the Platform, you consent to the practices outlined in this Privacy Policy.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Information Collection:</span>
          </p>
          <p>
            We collect personal information that you provide to us during the registration process or when using the Platform. This may include your name, email address, contact information, and identification documents. We may also collect information like Installed Applications （Not necessarily）through cookies and similar technologies.</p>
          <p><br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Use of Information:</span>
          </p>
          <p>We use the collected information to provide and improve our services, process transactions, verify your identity, communicate with you, customize your user experience, detect whether there is a security risk in the mobile phone app environment and comply with legal obligations. We may also use your information for marketing and promotional purposes with your consent.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Information Sharing:</span>
          </p>
          <p>We may share your personal information with trusted third parties, including service providers and regulatory authorities, as necessary to provide our services and comply with legal requirements. We do not sell, rent, or lease your personal information to third parties for their marketing purposes.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Data Security:</span>
          </p>
          <p>We implement security measures to protect your personal information from unauthorized access, use, or disclosure. These measures include encryption, access controls, regular system updates, and employee training.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Data Retention:</span>
          </p>
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. We will securely delete or anonymize your personal information when it is no longer needed.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Third-Party Links:</span>
          </p>
          <p>The Platform may contain links to third-party websites or services that are not operated or controlled by us. This Privacy Policy does not apply to those third-party sites. We recommend reviewing the privacy policies of those third parties before providing any personal information.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Children's Privacy:</span>
          </p>
          <p>The Platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us, and we will promptly delete the information.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Changes to the Privacy Policy:</span>
          </p>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on our website, and the revised policy will be effective immediately upon posting. We encourage you to review the Privacy Policy periodically for any updates.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Contact Us:</span>
          </p>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us through the designated channels provided on our website.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "privacyPolicy",
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
  min-height: 177px;
}

.u-section-1 .u-text-1 {
  font-weight: 700;
  margin: 101px auto 37px;
} .u-section-2 {
    background-image: none;
  }

.u-section-2 .u-sheet-1 {
  min-height: 1638px;
}

.u-section-2 .u-text-1 {
  margin: 30px 0;
}

@media (max-width: 1199px) {
  .u-section-2 .u-text-1 {
    width: 700px;
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
