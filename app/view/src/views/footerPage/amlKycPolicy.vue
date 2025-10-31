<template>
  <div class="m-pages">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">AML &amp; KYC Policy</h2>
      </div>
    </section>
    <section class="u-black u-clearfix u-section-2" id="sec-d490">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div class="u-clearfix u-expanded-width u-gutter-10 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout" style="">
            <div class="u-layout-row" style="">
              <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-60 u-size-xs-60 u-layout-cell-1" src="">
                <div class="u-container-layout u-valign-middle u-container-layout-1">
                  <p class="u-text u-text-1"> Our crypto exchange platform<span class="u-text-palette-1-base"> ("{{ companyName }}") </span>adheres to<span style="font-weight: 700;"> Anti-Money Laundering (AML)</span> and <span style="font-weight: 700;">Know Your Customer (KYC)</span> policies to maintain a
                    secure and compliant environment.
                    &nbsp;<br>
                    <br>These policies are in
                    place to prevent money laundering, terrorist financing, fraud, and other
                    illicit activities. By using our Platform, you agree to comply with these
                    policies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-3" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p>
            <span class="u-text-palette-1-base" style="font-size: 1rem; font-weight: 700;">Identification and Verification:</span>
          </p>
          <p>During the registration process, we require users to provide certain identification and verification documents. This may include a government-issued ID, proof of address, and other relevant information. We use this information to verify your identity and ensure compliance with regulatory requirements.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Customer Due Diligence:</span>
          </p>
          <p>We conduct customer due diligence (CDD) measures to assess the risks associated with our users and their transactions. This includes understanding the nature of your business, the source of funds, and the expected level of activity on the Platform. We may request additional information or documents to complete the CDD process.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Monitoring and Reporting:</span>
          </p>
          <p>We employ robust monitoring systems to detect and report suspicious activities. Our systems analyze transaction patterns, behavior, and other relevant factors to identify potential risks. If we identify any suspicious or unusual activity, we may report it to the appropriate regulatory authorities.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Ongoing Compliance:</span>
          </p>
          <p>We continuously monitor and update our AML and KYC policies to stay abreast of regulatory developments. This includes reviewing and enhancing our internal controls, training our staff, and conducting periodic risk assessments. We strive to ensure that our policies and procedures align with the latest legal and regulatory requirements.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Data Protection:</span>
          </p>
          <p>We handle your personal information in accordance with our Privacy Policy. We take appropriate measures to protect your data and maintain confidentiality. Your personal information is securely stored and accessed only by authorized personnel for legitimate purposes.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">Coperation with Authorities:</span>
          </p>
          <p>We cooperate fully with regulatory authorities and law enforcement agencies to combat financial crimes. This may involve sharing information, providing transaction records, and assisting in investigations when legally required.</p>
          <p>
            <br>
          </p>
          <p>
            <span class="u-text-palette-1-base" style="font-weight: 700;">User Responsibilities:</span>
          </p>
          <p>As a user of {{ companyName }}, you are responsible for providing accurate and up-to-date information during the registration and verification process. You must promptly inform us of any changes or updates to your information. You are also responsible for using the Platform in compliance with applicable laws and regulations.</p>
          <p>
            <br>
          </p>
          <p>
            <br>
          </p>
          <blockquote>
            <p style="text-align: left;">Our AML and KYC policies are designed to protect the integrity of our Platform and the broader financial system. By implementing these policies, we aim to create a safe and trustworthy environment for all users.</p>
            <p>If you have any questions or concerns about our AML and KYC policies, please contact our support team for assistance.</p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AmlKycPolicy",
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
</style>
