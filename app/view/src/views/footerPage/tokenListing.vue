<template>
  <div class="m-page">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Token Listing</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">Welcome to our Token Listing Page. If you are interested in listing your token on {{ companyName }}, please review the following information.</p>
          <p>&nbsp;</p>
          <p>
            <span style="font-weight: 700;">
              <span class="u-text-palette-1-base">Listing Process:</span>
            </span>
          </p>
          <p>To initiate the listing process, please submit a token listing application through our website. The application will require you to provide relevant details about your token, such as its name, symbol, smart contract address, and any additional documentation or materials.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Review and Evaluation:</span>
          </p>
          <p>Our team will carefully review and evaluate your token listing application. This process may involve technical assessments, due diligence, and market analysis. We aim to ensure the credibility and quality of the tokens listed on our exchange.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Communication:</span>
          </p>
          <p>We will maintain communication with you throughout the listing process. If additional information or clarifications are required, our team will reach out to you for prompt resolution.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Listing Decision:</span>
          </p>
          <p>Based on the evaluation, we will make a decision regarding the listing of your token on our exchange. Please note that meeting the eligibility criteria does not guarantee automatic listing. We reserve the right to accept or reject any listing application at our discretion.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Listing Fees:</span>
          </p>
          <p>There may be listing fees associated with the token listing process. The specific fees and payment terms will be communicated to you once your application has been reviewed and approved.<br>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Ongoing Compliance:</span>
          </p>
          <p>Once your token is listed, you are responsible for ensuring ongoing compliance with our platform's terms of service and any relevant regulations. Failure to comply with these requirements may result in the delisting of your token from our exchange.</p>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-2">
          <blockquote>
            <p id="isPasted">Please note that the token listing process may take time, as we prioritize thorough evaluation and maintain the integrity of our platform. We appreciate your patience and understanding.</p>
            <p>If you have any further questions or wish to begin the token listing process, please visit our website and access the Token Listing section. Our team is here to assist you throughout the listing process.</p>
          </blockquote>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-3"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "tokenListing",
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
  min-height: 1231px;
}

.u-section-2 .u-text-1 {
  margin: 13px 0 0;
}

.u-section-2 .u-text-2 {
  margin: 0;
}

.u-section-2 .u-text-3 {
  margin: 0;
}
</style>
