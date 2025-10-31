<template>
  <div class="m-pages">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">API</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-3" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p>{{ companyName }}'s API allows you to connect to its servers through several programming languages.
            It is possible to pull data from {{ companyName }} and integrate it with external applications. You can view your wallet data, make trades, and deposit and withdraw funds in third-party programs.<p>
            <br>
          </p>
          <p>Creating an API is a simple process that can be completed in just few minutes.<p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">How to create your own {{ companyName }} API?</span>
          </p>
          <p>1. After logging into your {{ companyName }} account, click [API Management] from the user center icon.</p>
          <p>2. Enter a label/name for your API key and click [Create API].</p>
          <p>3. Complete the security verification with your registered 2FA devices.</p>
          <p>4. Your API has now been created. You will not see your secret key again, so please keep it secure. Do not share this key with anyone. In the event that you lose your Secret Key, you will have to create a new API and delete the old one.
            <br>
          </p>
          <blockquote>
            <p>Security tip: Before creating an API, you need to enable two-factor authentication (2FA) on your account. Please be aware of the IP access restrictions. From a security perspective, we recommend selecting [Restrict access to trusted IP addresses only].</p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "apiPage.vue",
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
};
</script>

<style scoped>
@import "./assets/css/aml-kyc-policy.css";
.m-pages {
  max-width: 1440px;
  margin: 0 auto;
}
.u-section-3 .u-sheet-1 {
  min-height: unset;
}
</style>
