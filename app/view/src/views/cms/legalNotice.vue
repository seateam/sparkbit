<template>
  <div class="content-box cms-content-box">
    <div class="content-text c-4-bg">
      <h1 class="content-title">{{ $t("replenish.footer.LegalNotice") }}</h1>
      <div class="main-text">
        <div v-for="(text, index) in data" :key="index">
          <div v-html="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        "<h2>Clause 1</h2>",
        "<p>The purpose of this Website is to provide professional, secure, and reliable digital asset trading and asset management services to digital asset enthusiasts and users worldwide to the greatest extent possible, provided that such services do not violate the relevant laws and regulations of the Republic of Seychelles. However, if the country or region where you are located is a jurisdiction where digital asset trading is explicitly prohibited by regulatory authorities or is included in the list of relevant sanctioned countries, you shall be prohibited from using the services provided on this Website.</p>",
        "<h2>Clause 2</h2>",
        "<p>This Platform is committed to creating a compliant, secure, and reliable digital asset trading environment for users. It strictly prohibits users from engaging in money laundering, smuggling, commercial bribery, malicious market manipulation, or any other illegal trading activities or unlawful acts through this Website. To this end, we make every effort to formulate strict anti-money laundering and anti-terrorism programs and adopt effective security risk control measures. These measures are designed to maximize the protection of users' legitimate rights and interests and maintain a good brand reputation for the Platform itself.</p>",
        "<h2>Clause 3</h2>",
        "<p>When a competent authority presents corresponding investigation documents and requests this Website to cooperate in investigating a designated user, or to take measures such as sealing up, freezing, or transferring the user's account, this Website will, after verifying the validity and authenticity of the judicial documents, assist in providing the corresponding user data or conduct relevant operations in accordance with the requirements of the competent authority as determined by the Platform. This Website shall not bear any liability for any user privacy leakage, account inoperability, or other losses incurred by the user as a result of such actions.</p>",
        "<h2>Clause 4</h2>",
        "<p>All users who use the services of this Website shall acknowledge, prior to conducting any transactions, that digital assets are not backed by any government or central bank. Digital asset prices are highly volatile, and holding or using digital assets involves significant risks. Before making any trading decisions, you shall rationally and carefully assess your financial situation to determine whether such transactions are suitable for you.</p>",
        "<h2>Clause 5</h2>",
        "<p>If a user of this Website violates the provisions of this Statement and thereby violates the relevant laws of the Republic of Seychelles, this Website, as the service provider, has the obligation to improve the Platform's rules and services. However, this Website has no intent or factual basis to violate the relevant laws of the Republic of Seychelles and shall not bear any joint and several liability for the user's acts.</p>",
        "<h2>Clause 6</h2>",
        "<p>Any person who accesses this Website in any manner or uses the services of this Website directly or indirectly shall be deemed to have voluntarily accepted the binding force of this Statement.</p>",
        "<h2>Clause 7</h2>",
        "<p>For matters not covered by this Statement, reference shall be made to the relevant laws and regulations of the Republic of Seychelles. In the event of a conflict between this Statement and the relevant laws and regulations of the Republic of Seychelles, the relevant laws and regulations of the Republic of Seychelles shall prevail.</p>",
      ],
    };
  },
};
</script>
<style scoped></style>
