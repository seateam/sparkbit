<template>
  <div class="m-page u-body u-xl-mode">
    <section class="u-black u-clearfix u-section-1" id="sec-75cc">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-1">Support</h2>
      </div>
    </section>
    <section class="u-align-left u-black u-clearfix u-section-2" id="sec-a681">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="fr-view u-clearfix u-rich-text u-text u-text-1">
          <p id="isPasted">
            <span class="u-text-palette-1-base" style="font-weight: 700;">&nbsp;</span>We value your feedback and are here to assist you. If you have any questions, concerns, or feedback regarding {{ companyName }} exchange, please don't hesitate to reach out to us. Here are the various ways you can contact us:
          </p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Customer Support Email:</span>
          </p>
          <p>Send us an email at <span class="u-text-palette-1-base">{{ serverEmail }}</span> with your inquiry or feedback. Our dedicated customer support team will respond to you as soon as possible.
          </p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Live Chat:</span>
          </p>
          <p>
            You can speak with our team directly with our live chat option. Click on the Zendesk icon (bottom right), and a member of our support team will be available to assist you in real time.
          <p>
          <p>Live chat is typically available during our designated support hours.</p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Support Ticket:</span>
          </p>
          <p>For specific issues or inquiries that require a detailed response, you can submit a support ticket through your account. Log in to your account, navigate to the support section, and create a new ticket. Provide a clear description of your question or problem, and our support team will address it accordingly.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Social Media:</span>
          </p>
          <p>Reach out to us through our official social media channels, such as Twitter or LinkedIn. Send us a direct message and we'll respond to you as soon as possible.</p>
          <p>
            <br>
          </p>
          <p>
            <span style="font-weight: 700;">Knowledge Base and FAQs:</span>
          </p>
          <p>Before contacting us, consider checking our comprehensive Knowledge Base and FAQs section. You may find answers to your questions or solutions to common issues.</p>
          <p>
            <br>
          </p>
        </div>
        <div class="fr-view u-clearfix u-rich-text u-text u-text-2">
          <p id="isPasted">We strive to provide timely and helpful support to all our users. Depending on the complexity of your inquiry, our response time may vary, but we aim to address all inquiries as quickly as possible. For urgent matters or account-related issues, please mention the urgency in your communication so that we can prioritize your request.</p>
          <p>Your satisfaction and trust are important to us, and we appreciate your patience and cooperation. We look forward to assisting you and providing you with the best possible support experience. Thank you for choosing our <span class="u-text-palette-1-base">{{ companyName }}!</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "support",
  data() {
    return {};
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    serverEmail() {
      return this.$store.state.systemConfig.serverEmail;
    },
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.m-link {
  color: #478ac9;
  cursor: pointer;
  user-select: none;
}
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

.u-section-2 .u-text-1 {
  margin: 19px 0 0;
}

.u-section-2 .u-text-2 {
  margin: -8px 0 60px;
}
</style>
