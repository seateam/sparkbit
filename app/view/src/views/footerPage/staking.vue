<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Staking</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">
            <span class="u-text-palette-1-base" style="font-weight: 700;">&nbsp;</span>In this guide, we will provide you with step-by-step instructions on how to start staking with {{ companyName }}.<br>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Introduction to Crypto Staking with {{ companyName }} </span>
          </p>
          <p>{{ companyName }} offers a secure and user-friendly staking feature that allows you to earn passive income by staking cryptocurrencies. By staking with {{ companyName }}, you contribute to the security and consensus of blockchain networks while receiving staking rewards for your participation.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">How Does Crypto Staking Work?</span>
          </p>
          <p>Crypto staking on {{ companyName }} operates on a Proof of Stake (PoS) consensus mechanism. Validators are selected based on the number of coins they hold and are willing to lock up as collateral. Stakers have the opportunity to become validators and earn rewards based on their staked amount.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Choosing a Staking Asset</span>
          </p>
          <p>{{ companyName }} supports a variety of staking assets for you to choose from.</p>
          <p>A list will be updated very soon...</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Setting Up Your {{ companyName }} Account</span>
          </p>
          <p>To get started with staking on {{ companyName }}, follow these steps:</p>
          <ul>
            <li>On {{ companyName }} platform and click on the "Sign Up" button.</li>
            <li>Provide the necessary information to create your account.</li>
            <li>Complete the KYC (Know Your Customer) verification process, which ensures compliance with regulatory requirements.</li>
            <li>Set up two-factor authentication (2FA) to enhance the security of your account.</li>
          </ul>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Selecting a Staking Asset on {{ companyName }}</span>
          </p>
          <p>After setting up your {{ companyName }} account, you can select the staking asset of your choice. {{ companyName }} provides a user-friendly interface where you can explore the available staking assets and their respective details, such as expected staking rewards and lock-up periods.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Staking Process on {{ companyName }}</span>
          </p>
          <p>
            <span style="font-style: italic; font-weight: 700;">Once you have chosen a staking asset, follow these steps to start staking on {{ companyName }}:</span>
          </p>
          <ul>
            <li>
              <span style="font-style: italic;">Deposit the chosen staking asset into your deposit wallet.</span>
            </li>
            <li>Navigate to the staking section on the {{ companyName }} platform.</li>
            <li>Select the staking option or pool you wish to participate in. {{ companyName }} may offer independent staking or pooled staking options.</li>
            <li>Enter the desired amount of coins/tokens you wish to stake.</li>
            <li>Confirm your staking transaction and review the terms and conditions.</li>
            <li>Lock up your staked coins for the designated period, as specified by the staking asset.</li>
          </ul>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Staking Rewards on {{ companyName }}</span>
          </p>
          <p>As a staker on {{ companyName }}, you will earn rewards based on the number of coins/tokens you stake and the duration of your stake. {{ companyName }} provides transparency regarding estimated annual percentage yield (APY) or expected staking rewards. Rewards are usually distributed in the form of additional coins or tokens of the staked asset.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Risks and Considerations</span>
          </p>
          <p>
            <span style="font-style: italic;">Before engaging in crypto staking on {{ companyName }}, it's important to be aware of potential risks and considerations:</span>
          </p>
          <ul>
            <li>Market Risk: The value of your staked coins may fluctuate due to market conditions, affecting your overall investment. It's important to evaluate the potential risks and rewards associated with staking.</li>
            <li>Technical Risks: While {{ companyName }} takes precautions to ensure security and reliability, there are inherent technical risks associated with blockchain networks. These risks include network congestion, software bugs, or vulnerabilities that could impact staking rewards or the security of your funds. Stay updated with {{ companyName }}'s security practices and any network updates or announcements.</li>
            <li>Lock-Up Periods: Some staking assets on {{ companyName }} may have lock-up periods, during which your staked coins/tokens are locked and inaccessible. Understand the duration of the lock-up period before committing your assets to staking.</li>
            <li>Regulatory Considerations: Be aware of any legal or regulatory obligations related to crypto staking in your jurisdiction. Stay informed about tax implications and compliance requirements to ensure a smooth staking experience.</li>
          </ul>
          <p>
            <br>
          </p>
          <p>
            <br>
          </p>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-2">
          <blockquote>
            <p id="isPasted">Conclusion Crypto staking with {{ companyName }} provides an opportunity to earn passive income by participating in blockchain networks. By staking your chosen assets, you contribute to the network's security and consensus while receiving staking rewards in return. Follow the steps outlined in this guide, and always consider the risks and considerations associated with staking.</p>
            <p>{{ companyName }} aims to provide a secure and user-friendly staking experience, and we're here to support you on your staking journey. <span class="u-text-palette-1-base">Happy staking!</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "staking",
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
  min-height: 2197px;
}

.u-section-2 .u-text-1 {
  margin: 19px 0 0;
}

.u-section-2 .u-text-2 {
  margin: -8px 0 60px;
}
</style>
