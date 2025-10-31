<template>
  <div class="content-box cms-content-box">
    <div class="content-text c-4-bg">
      <h1 class="content-title">{{ $t("home.footer.privacy") }}</h1>
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
        "<h2>1.GENERAL</h2>",
        `<p>This notice describes how SparkBit and its affiliates (referred to as “SparkBit ”, “we” or “us” in this notice) will collect, make use of and share (i.e.”process”) your personal data in connection with the SparkBit website, apps and services (including API services). For the purposes of this notice, the term ”affiliate” shall mean any entity, individual, firm, or corporation, directly or indirectly, through one or more intermediaries, controlling, controlled by, or under common control with SparkBit.</p>`,
        "<p>This notice also describes data protection rights you may have (depending on applicable law), such as a right to object to some of the processing which the SparkBit carries out.</p>",
        "<p>SparkBit are committed to protecting and respecting your privacy. The purpose of this Privacy Policy is to describe:</p>",
        "&thinsp;•&nbsp; INFORMATION SPARKBIT COLLECTS",
        "&thinsp;•&nbsp; WHY DOES SPARKBIT COLLECT THIS INFORMATION",
        "&thinsp;•&nbsp; HOW DOES SPARKBIT PROTECT USER DATA",
        "&thinsp;•&nbsp; COOKIES AND TECHONOLOGY",
        "&thinsp;•&nbsp; DATA SHARING AND DISCLOSURE",
        "&thinsp;•&nbsp; DISCLOSURE TO LEGAL AUTHORITIES",
        "&thinsp;•&nbsp; INTERNATIONAL TRANSFERS OF PERSONAL DATA",
        "&thinsp;•&nbsp; RETENTION OF PERSONAL DATA",
        "&thinsp;•&nbsp; External LINK",
        "&thinsp;•&nbsp; CONTACT US",

        "<h2>2.INFORMATION DEEPCOIN COLLECTS</h2>",
        "<h3>1. Information you provide to us at registration</h3>",
        "<p>When you create a SparkBit Account, you provide us with personal information that includes your contact information (Email Address, name, and password). You can also choose to add a phone number for SMS or Google Authenticator account to be used for 2FA verification for improved security.</p>",
        "<h3>2. Information we collect when authenticating user identity</h3>",
        "<p>To comply with global regulatory standards such as Anti-Money Laundering (AML), Know Your Customer (KYC), and Counter-Terrorist Financing (CTF), SparkBit requires user accounts to be authenticated for both personal and business-level accounts. This requires the collection of official identification. In addition, we will need customers to upload images, and this information will be used to verify user identities to assist in completing KYC and unbinding Google authenticator-related operations and certifications. The platform will adopt strict security standards and measures to encrypt user data and protect user privacy, ensuring that only users themselves can access and change their own data; the platform will take all reasonable and feasible measures to protect users’ personal information, and will not share the uploaded image information with third parties other than the SparkBit platform.</p>",
        "<h3>3. Information we collect as you use our services</h3>",
        "<p>Through your use of the SparkBit platform, we also monitor and collect tracking information related to usages such as access date & time, device identification, operating system, browser type, and IP address. This information may be directly obtained by Deepcoin or through third party services. This service usage data helps us our systems to ensure that our interface is accessible for users across all platforms and can aid during criminal investigations.</p>",
        "<h3>4. Transaction Information</h3>",
        "<p>For all personal and enterprise user accounts, we collect transaction information including deposit snapshots, account balances, trade history, withdrawals, order activity, and distribution history. This transaction data is monitored for the suspicious trading activity for user fraud protection, and legal case resolution.</p>",

        "<h2>3.WHY DOES DEEPCOIN COLLECT THIS INFORMATION</h2>",
        "<h3>1. To provide and maintain our services</h3>",
        "<p>We use the information collected to deliver our services and verify user identity.</p>",
        "<p>We use the IP address and unique identifiers stored in your device’s cookies to help us authenticate your identity and provide our service. Given our legal obligations and system requirements, we cannot provide you with services without data like identification, contact information, and transaction-related information.</p>",
        "<h3>2. To protect our users</h3>",
        "<p>We use the information collected to protect our platform, users’ accounts, and archives.</p>",
        "<p>We use IP addresses and cookie data to protect against automated abuse such as spam, phishing, and Distributed Denial of Service (DDoS) attacks.</p>",
        "<p>We analyze trading activity with the goal of detecting suspicious behavior early to prevent potential fraud and loss of funds to bad actors.</p>",
        "<h3>3. To comply with legal and regulatory requirements</h3>",
        "<p>Respect for the privacy and security of data you store with SparkBit forms our approach to complying with regulations, governmental requests, and user-generated inquiries. We will not disclose or provide any personal information to third-party sources without review from our legal case team and/or prior consent from the user.</p>",
        "<h3>4. To measure site performance</h3>",
        "<p>We actively measure and analyze data to understand how our services are used. This review activity is conducted by our operations team to continually improve our platform’s performance and to resolve issues with the user experience.</p>",
        "<p>We continuously monitor our systems’ activity information and communications with users to look for and quickly fix problems.</p>",
        "<h3>5. To communicate with you</h3>",
        "<p>We use personal information collected, like an email address to interact with users directly when providing customer support on a ticket or to keep you informed on logins, transactions, and security. Without processing your personal information for confirming each communication, we will not be able to respond to your submitted requests, questions, and inquiries. All direct communications are kept confidential and reviewed internally for accuracy.</p>",
        "<h3>6. To enforce our Terms of Use and other agreements</h3>",
        "<p>It is very important for us and our customers that we continually review, investigate, and prevent any potentially prohibited or illegal activities that violate our Terms of Service. For the benefit of our entire user base, we carefully enforce our agreements with third parties and actively investigate violations of our posted Terms of Use. SparkBit reserves the right to terminate the provision of service to any user found engaging in activities that violate our Terms of Use.</p>",

        "<h2>4.HOW DOES DEEPCOIN PROTECT USER DATA</h2>",
        "<p>SparkBit has implemented a number of security measures to ensure that your information is not lost, abused, or altered. Our data security measures include, but are not limited to: PCI Scanning, Secured Sockets Layered encryption technology, pseudonymization, internal data access restrictions, and strict physical access controls to buildings & files. Please note that it is impossible to guarantee 100% secure transmission of data over the Internet nor method of electronic storage. As such, we request that you understand the responsibility to independently take safety precautions to protect your own personal information.</p>",
        "<p>If you suspect that your personal information has been compromised, especially account and/or password information, please lock your account and contact SparkBit customer service immediately.</p>",

        "<h2>5.COOKIES AND OTHER TECHNOLOGY</h2>",
        "<p>We use cookies (and local storage objects, but we refer to these collectively as “cookies” in this notice), web beacons/tags, and other related approaches to collect information about your use of our website. Cookies are small pieces of information sent by a web server to a web browser, to allow certain functionality or analytics.</p>",
        "<p>We use third-party service provider(s), to assist us in better understanding the use of our website. Our service provider(s) will place cookies on the hard drive of your computer and will receive information that we select that will educate us on such things as how visitors navigate around our site, what products are browsed, and general transaction information. Our service provider(s) analyses this information and provides us with aggregate reports. The information and analysis provided by our service provider(s) will be used to assist us in better understanding our visitors’ interests in our website and how to better serve those interests. The information collected by our service provider(s) may be linked to and combined with information that we collect about you while you are using the Platform. Our service provider(s) is/are contractually restricted from using information they receive from our website other than to assist us.</p>",
        "<p>If you want to avoid using cookies altogether, you can disable cookies in your browser. However, disabling cookies might make it impossible for you to use certain features of our website or services, such as logging into your SparkBit Account or making transactions. Your use of our website or service with a browser that is configured to accept cookies constitutes an acceptance of our and third-party cookies.</p>",

        "<h2>6.DISCLOSURES TO LEGAL AUTHORITIES</h2>",
        "<p>We may share your Personal Data with law enforcement, data protection authorities, government officials, and other authorities when:</p>",
        "&thinsp;•&nbsp; Compelled by court order, or other legal procedure;",
        "&thinsp;•&nbsp; Disclosure is necessary to report suspected illegal activity;",
        "&thinsp;•&nbsp; Disclosure is necessary to investigate violations of this Privacy Policy or our Terms of Service.",

        "<h2>7.INTERNATIONAL TRANSFERS OF PERSONAL DATA</h2>",
        "<p>We store and process your Personal Data in data centers around the world, wherever SparkBit facilities or service providers are located. As such, we may transfer your Personal Data outside of the European Union. Some of the countries to which your personal data may be transferred for these purposes that are located outside the EU do not benefit from an adequacy decision issued by the EU Commission regarding protection afforded to personal data in that country. Details of these specific countries can be found here:</p>",
        "<p>https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/adequacy-protection-personal-data-non-eu-countries_en</p>",
        "<p>Such transfers are undertaken in accordance with our legal and regulatory obligations and appropriate safeguards under Data Privacy Law will be implemented, such as standard data protection clauses with data recipients or processors approved by competent authorities. A copy may be requested at the address set out in the Contact Us section.</p>",

        "<h2>8.RETENTION OF PERSONAL DATA</h2>",
        "<p>We retain Personal Data for as long as necessary to fulfill purposes described in this Privacy Policy, subject to our own legal and regulatory obligations. The criteria we may use to determine the retention period for certain categories of data includes:</p>",
        "&thinsp;•&nbsp; How long you have been a SparkBit member;",
        "&thinsp;•&nbsp; Whether there are contractual or legal obligations existing that require us to retain the data for a certain period of time;",
        "&thinsp;•&nbsp; Whether there is any ongoing legal or financial claim that relates to your relationship with us;",
        "&thinsp;•&nbsp; Whether any applicable law, statute, or regulation allows for a specific retention period; and",
        "&thinsp;•&nbsp; What the expectation for retention was at the time the data was provided to us.",
        "<p>In accordance with our record keeping obligations, we will retain Account and other Personal Data for at least five years (and some up to ten years, as required by applicable law) after an Account is closed.</p>",
        "<p>Where we process personal data in connection with performing an agreement with you, we keep the data for 6 years from your last interaction with us.</p>",
        "<p>Where we process personal data for marketing purposes or with your consent, we process the data until you ask us to stop and for a short period after this (to allow us to implement your requests). We also keep a record of that request indefinitely, so that we can continue to respect your request in future.</p>",
        "<p>Where we process personal data for site security purposes, we retain it for 3 years.</p>",
        "<p>Longer retention periods may apply, such as where ongoing access to records continues to be important to our defence of legal claims or where we are required by law or regulation to retain information for specific periods.</p>",

        "<h2>9.EXTERNAL LINKS</h2>",
        "<p>Although our website and apps only look to include quality, safe and relevant external links, users should always adopt a policy of caution before clicking any links to non-SparkBit websites or apps. We cannot control, guarantee or verify their contents. They will have their own policies and practices, for example with regard to privacy and personal data, and you should acquaint yourselves with those before further engaging with those third party websites or apps.</p>",

        "<h2>10.CONTACT US</h2>",
        "<p>If you have any questions or concerns about how we process your data, please contact us with questions, comments, or concerns regarding our Privacy Policy and/or practices at support@service.sparkbit.io.</p>",
      ],
    };
  },
};
</script>
<style scoped></style>
