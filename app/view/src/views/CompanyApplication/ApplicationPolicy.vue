<template>
  <div class="application-policy-container">
    <div class="company-application">
      <h1 class="b-1-cl title a-5-bg">{{ $t("application.policy.title") }}</h1>
      <div>
        <p class="b-1-cl desc a-5-bg">
          Global Fiat Currency Trading Service - OTC Platform
          <br>
          In order to protect the security of both parties and enhance the credibility of registered users on our OTC platform, {{ companyName }} provides you with merchant verification services.
          <br>
          You are required to provide the necessary personal information to complete the verification process. {{ companyName }} has the right to take all legal measures to verify the information you provide. However, due to the virtual nature of the network environment and the limitations of verification methods, {{ companyName }} does not guarantee the accuracy and authenticity of certified merchants' identity.
          <br>
          The provisions in this agreement are closely related to your rights and obligations. Please carefully read the entire contents of this agreement before applying for verification. By initiating the verification process, you acknowledge, understand, and agree to accept the entire contents of this agreement.
          <br>
          I. Definition and Change of Certification Services
          Verification service is provided to merchants who provide authentic and credible identity information and pay a security deposit. Unless otherwise agreed in this agreement or under statutory circumstances, once verification is completed on the platform, the corresponding identity information and certification results will not be modified or canceled for any reason. If your identity information changes after verification, you should provide the platform with a certificate issued by the corresponding department, and {{ companyName }} will assist you in updating your certification information. {{ companyName }} reserves the right to modify or adjust the contents of this agreement according to subjective and objective changes, and will announce the amended text without separate notification. By continuing to use the services provided by {{ companyName }} after modifications, you indicate that you have read, understood, and agreed to the contents of the amended agreement. If you disagree with the modified agreement, you should promptly apply to disable the verification service on the platform.
          <br>

          II. Merchant Rights of Verification
          The platform will provide a unique verification merchant mark to successfully verified merchants, distinguishing them from uncertified merchants on the platform.
          Verified merchants can publish transaction advertisements that meet the platform's requirements.
          <br>

          III. Required Information and Deposit for Verification
          Merchants are required to complete the provided business application information and upload their personal information. Verified merchants must pay a deposit to the platform, which will be transferred to the certified merchant's deposit account. During a specified period, the certified merchant may have restrictions on processing or transferring funds within the account.
          <br>

          IV. Use of Verification Materials Report of Verification Materials
          The verification materials submitted by you to the platform during the verification process are irrevocably authorized to be retained by {{ companyName }}. Except as required by law or as agreed upon in this agreement, {{ companyName }} promises not to edit or publish your certification materials to any third party or use them for commercial purposes, except in the following cases:
          <br>
          You authorize the publication of relevant information by the platform.
          <br>
          {{ companyName }} provides the information to national judicial and administrative organizations.
          <br>
          {{ companyName }} provides the information to affiliates of the platform.
          <br>
          When a third party and the platform jointly provide services to users, the third party may provide you with relevant information required for the service (excluding your bank account information).
          <br>
          Based on the need to resolve civil disputes with third parties, {{ companyName }} has the right to provide your identity information to the third party.
          <br>
          V. Use of Deposit
          The deposit is held to secure related transactions on the platform. If a dispute arises during a transaction and it is determined that you are responsible for the dispute and engaged in corresponding behaviors, and you fail to cooperate, {{ companyName }} has the right to handle the deposit, including but not limited to detention, freezing, or direct payment to the counterparty.
          <br>
          VI. Links to Third-Party Websites
          To conduct an identity information review, the platform may include links to third-party websites (such as online banking websites).

        </p>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/ApplicationPolicy/ApplicationPolicy';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/CompanyApplication/ApplicationPolicy/ApplicationPolicy.styl';

export default {
  mixins: [mixin],
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
  },
};
</script>
