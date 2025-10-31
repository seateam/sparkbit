<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Terms of Service</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">These Terms of Service ("Terms") govern your use of our crypto exchange platform ("{{ companyName }}") and the services provided therein. By accessing or using the Platform, you agree to be bound by these Terms.</p>
          <p>
            <span style="font-weight: 700;">
              <span class="u-text-palette-1-base">Account Registration and Usage:</span>
            </span>
          </p>
          <p>You must be of legal age to create an account on the {{ companyName }}. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and up-to-date information during the registration process.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Platform Usage and Restrictions:</span>
          </p>
          <p>You may use the Platform for lawful purposes only. You agree not to engage in any activity that violates applicable laws, infringes intellectual property rights, disrupts the Platform's functionality, or compromises the security of the Platform or other users' accounts.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading:</span>
          </p>
          <p>The Platform allows you to engage in cryptocurrency trading. Trading involves risks, and you acknowledge that you are solely responsible for your trading decisions and outcomes. We do not provide financial advice or guarantee any specific results.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Fees and Payments:</span>
          </p>
          <p>Fees apply to certain actions on the Platform, such as trading transactions and withdrawals. The applicable fees are specified on our website and may be subject to change. You are responsible for any taxes or fees associated with your activities on the Platform.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Privacy and Data Protection:</span>
          </p>
          <p>We collect and process your personal information in accordance with our Privacy Policy. By using the Platform, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Intellectual Property:</span>
          </p>
          <p>All intellectual property rights related to the Platform, including trademarks, logos, and content, are owned by us or our licensors. You may not use, modify, or distribute our intellectual property without our prior written consent.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Limitation of Liability:</span>
          </p>
          <p>We strive to provide a reliable and secure Platform, but we do not guarantee its uninterrupted availability or freedom from errors. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the Platform.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Termination:</span>
          </p>
          <p>We may suspend or terminate your account or access to the Platform at any time and for any reason, including violation of these Terms. You may also terminate your account by contacting our support team.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Amendments:</span>
          </p>
          <p>We reserve the right to modify or update these Terms at any time. Any changes will be effective upon posting the revised Terms on our website. Your continued use of the Platform after the changes constitutes your acceptance of the updated Terms.</p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Governing Law and Jurisdiction:</span>
          </p>
          <p>These Terms are governed by the laws of Saint Vincent and the Grenadines. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in SVG.</p>
          <p>
            <br>
          </p>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-2">
          <p id="isPasted">If you have any questions or concerns, please contact our customer support team.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "termsOfService",
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
  min-height: 1365px;
}

.u-section-2 .u-text-1 {
  margin: 24px 0 0;
}

.u-section-2 .u-text-2 {
  margin: -8px 0 24px;
}
</style>
