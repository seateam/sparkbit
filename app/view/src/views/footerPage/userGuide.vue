<template>
  <div class="m-pages">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">User Guide</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-3" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading UI</span>
          </p>
          <p>The guides in this section provide detailed information about the use of the trading UI:<p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Get started</span>
          </p>
          <p>Learn how to sign up to the exchange and verify your profile to begin trading on the platform.</p>

          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading interface overview</span>
          </p>
          <p>Find out details about various elements of the exchange user interface.</p>

          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Widgets</span>
          </p>
          <p>Configure your trading board by choosing which widgets you use for quick and efficient trading.</p>

          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading charts</span>
          </p>
          <p>Discover the powerful tools enabling you to monitor markets of interest using the trading chart.</p>

          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading basics</span>
          </p>
          <p>Learn more about the available order types and various options for placing new orders.</p>

          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Trading API</span>
          </p>
          <p>The documents in this section provide exhaustive information about the trading API that is used for authentication on the exchange as well as placing new orders and monitoring their status:</p>
          <p>General information</p>
          <p>REST API</p>
          <p>WebSocket API</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "userGuide",
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
@media (min-width: 1400px){
  .u-sheet {
    width: var(--theme-sheet-width-xl) !important;
  }
}

</style>
