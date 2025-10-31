export default {
  name: "order",
  data() {
    return {
      navListActive: "exchangeOrder",
      pageTitleText: null,
    };
  },
  methods: {
    init() {
      this.navListActive = this.$route.meta.navName;
      if (this.navList.length) {
        this.navList.forEach((item) => {
          if (this.navListActive === item.id) {
            this.pageTitleText = item.navText;
          }
        });
      }
    },
    listChanges(data) {
      if (
        data.id === "coOrder" &&
        window.HOSTAPI !== "co" &&
        process.env.NODE_ENV !== "development"
      ) {
        const paths = this.$route.path.split("/");
        paths[paths.length - 1] = data.id;
        window.location.href = `${this.linkurl.coUrl}${paths.join("/")}`;
      } else {
        this.$router.push(data.id);
        this.navListActive = data.id;
        this.pageTitleText = data.navText;
      }
    },
  },
  watch: {
    metaText(v) {
      this.navListActive = v;
    },
  },
  computed: {
    fiatTradeOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.fiat_trade_open === "1") {
        return true;
      }
      return false;
    },
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    saasOtcFlowConfig() {
      let flag = false;
      if (
        this.publicInfo &&
        this.publicInfo.switch &&
        this.publicInfo.switch.saas_otc_flow_config &&
        this.publicInfo.switch.saas_otc_flow_config.toString() === "1"
      ) {
        flag = true;
      }
      return flag;
    },
    lineHidth1() {
      if (this.templateLayoutType === "2") {
        return "80";
      }
      return "48";
    },
    subLineHidth() {
      if (this.templateLayoutType === "2") {
        return "60";
      }
      return "48";
    },
    templateLayoutType() {
      return this.$store.state.baseData.templateLayoutType;
    },
    modalSwitch() {
      return this.$store.state.baseData.publicInfo.switch;
    },
    navList() {
      const arr = [];
      const { modalSwitch } = this;

      if (this.linkurl.exUrl) {
        // 币币订单
        arr.push({
          iconClass: "iconClass",
          navText: this.$t("order.index.exOrder"),
          href: "",
          type: 1,
          activeIconSvg: `
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <mask id="mask0_829_14164" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <rect width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_829_14164)">
    <path d="M5.83464 16.6668L1.66797 12.5002L5.83464 8.3335L7.0013 9.521L4.85547 11.6668H10.8346V13.3335H4.85547L7.0013 15.4793L5.83464 16.6668ZM14.168 11.6668L13.0013 10.4793L15.1471 8.3335H9.16797V6.66683H15.1471L13.0013 4.521L14.168 3.3335L18.3346 7.50016L14.168 11.6668Z" fill="#999999"/>
  </g>
</svg>
          `,
          iconSvg: `
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <mask id="mask0_829_14164" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <rect width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_829_14164)">
    <path d="M5.83464 16.6668L1.66797 12.5002L5.83464 8.3335L7.0013 9.521L4.85547 11.6668H10.8346V13.3335H4.85547L7.0013 15.4793L5.83464 16.6668ZM14.168 11.6668L13.0013 10.4793L15.1471 8.3335H9.16797V6.66683H15.1471L13.0013 4.521L14.168 3.3335L18.3346 7.50016L14.168 11.6668Z" fill="#999999"/>
  </g>
</svg>
          `,
          id: "exchangeOrder",
        });
      }
      // 法币订单
      if ((this.linkurl.otcUrl || this.saasOtcFlowConfig) && modalSwitch.otcIsOpen === "1") {
        arr.push({
          iconClass: "iconClass",
          navText: !this.fiatTradeOpen
            ? this.$t("order.index.otcOrder")
            : this.$t("assets.b2c.otcShow.otcOrder"),
          href: "",
          type: 1,
          activeIconSvg: `
                    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <mask
              id="mask0_829_14171"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_829_14171)">
              <path
                d="M9.16667 16.1873V10.479L4.16667 7.58317V13.2915L9.16667 16.1873ZM10.8333 16.1873L15.8333 13.2915V7.58317L10.8333 10.479V16.1873ZM10 9.0415L14.9375 6.18734L10 3.33317L5.0625 6.18734L10 9.0415ZM3.33333 14.7498C3.06944 14.5971 2.86458 14.3957 2.71875 14.1457C2.57292 13.8957 2.5 13.6179 2.5 13.3123V6.68734C2.5 6.38178 2.57292 6.104 2.71875 5.854C2.86458 5.604 3.06944 5.40262 3.33333 5.24984L9.16667 1.89567C9.43056 1.74289 9.70833 1.6665 10 1.6665C10.2917 1.6665 10.5694 1.74289 10.8333 1.89567L16.6667 5.24984C16.9306 5.40262 17.1354 5.604 17.2813 5.854C17.4271 6.104 17.5 6.38178 17.5 6.68734V13.3123C17.5 13.6179 17.4271 13.8957 17.2813 14.1457C17.1354 14.3957 16.9306 14.5971 16.6667 14.7498L10.8333 18.104C10.5694 18.2568 10.2917 18.3332 10 18.3332C9.70833 18.3332 9.43056 18.2568 9.16667 18.104L3.33333 14.7498Z"
                fill="#999999"
              />
            </g>
          </svg>
           `,
          iconSvg: `
                    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <mask
              id="mask0_829_14171"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_829_14171)">
              <path
                d="M9.16667 16.1873V10.479L4.16667 7.58317V13.2915L9.16667 16.1873ZM10.8333 16.1873L15.8333 13.2915V7.58317L10.8333 10.479V16.1873ZM10 9.0415L14.9375 6.18734L10 3.33317L5.0625 6.18734L10 9.0415ZM3.33333 14.7498C3.06944 14.5971 2.86458 14.3957 2.71875 14.1457C2.57292 13.8957 2.5 13.6179 2.5 13.3123V6.68734C2.5 6.38178 2.57292 6.104 2.71875 5.854C2.86458 5.604 3.06944 5.40262 3.33333 5.24984L9.16667 1.89567C9.43056 1.74289 9.70833 1.6665 10 1.6665C10.2917 1.6665 10.5694 1.74289 10.8333 1.89567L16.6667 5.24984C16.9306 5.40262 17.1354 5.604 17.2813 5.854C17.4271 6.104 17.5 6.38178 17.5 6.68734V13.3123C17.5 13.6179 17.4271 13.8957 17.2813 14.1457C17.1354 14.3957 16.9306 14.5971 16.6667 14.7498L10.8333 18.104C10.5694 18.2568 10.2917 18.3332 10 18.3332C9.70833 18.3332 9.43056 18.2568 9.16667 18.104L3.33333 14.7498Z"
                fill="#999999"
              />
            </g>
          </svg>
           `,
          id: "otcOrder",
        });
      }
      // 合约订单',
      if (this.linkurl.coUrl && modalSwitch.contractOpen === "1") {
        arr.push({
          iconClass: "iconClass",
          navText: this.$t("order.coOrder.coOrder"),
          href: "",
          type: 1,
          activeIconSvg: `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <mask
            id="mask0_829_14178"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_829_14178)">
            <path
              d="M9.9987 7.49984L7.08203 4.58317L9.9987 1.6665L12.9154 4.58317L9.9987 7.49984ZM0.832031 16.6665V13.3332C0.832031 12.8609 0.995226 12.4651 1.32161 12.1457C1.648 11.8262 2.04036 11.6665 2.4987 11.6665H5.22786C5.50564 11.6665 5.76953 11.7359 6.01953 11.8748C6.26953 12.0137 6.47092 12.2012 6.6237 12.4373C7.02648 12.979 7.523 13.4026 8.11328 13.7082C8.70356 14.0137 9.33203 14.1665 9.9987 14.1665C10.6793 14.1665 11.3147 14.0137 11.9049 13.7082C12.4952 13.4026 12.9848 12.979 13.3737 12.4373C13.5543 12.2012 13.7661 12.0137 14.0091 11.8748C14.2522 11.7359 14.5056 11.6665 14.7695 11.6665H17.4987C17.9709 11.6665 18.3668 11.8262 18.6862 12.1457C19.0056 12.4651 19.1654 12.8609 19.1654 13.3332V16.6665H13.332V14.7707C12.8459 15.1179 12.3216 15.3818 11.7591 15.5623C11.1966 15.7429 10.6098 15.8332 9.9987 15.8332C9.40148 15.8332 8.81814 15.7394 8.2487 15.5519C7.67925 15.3644 7.15148 15.0971 6.66536 14.7498V16.6665H0.832031ZM3.33203 10.8332C2.63759 10.8332 2.04731 10.5901 1.5612 10.104C1.07509 9.61789 0.832031 9.02761 0.832031 8.33317C0.832031 7.62484 1.07509 7.03109 1.5612 6.55192C2.04731 6.07275 2.63759 5.83317 3.33203 5.83317C4.04036 5.83317 4.63411 6.07275 5.11328 6.55192C5.59245 7.03109 5.83203 7.62484 5.83203 8.33317C5.83203 9.02761 5.59245 9.61789 5.11328 10.104C4.63411 10.5901 4.04036 10.8332 3.33203 10.8332ZM16.6654 10.8332C15.9709 10.8332 15.3806 10.5901 14.8945 10.104C14.4084 9.61789 14.1654 9.02761 14.1654 8.33317C14.1654 7.62484 14.4084 7.03109 14.8945 6.55192C15.3806 6.07275 15.9709 5.83317 16.6654 5.83317C17.3737 5.83317 17.9674 6.07275 18.4466 6.55192C18.9258 7.03109 19.1654 7.62484 19.1654 8.33317C19.1654 9.02761 18.9258 9.61789 18.4466 10.104C17.9674 10.5901 17.3737 10.8332 16.6654 10.8332Z"
              fill="#999999"
            />
          </g>
        </svg>
           `,
          iconSvg: `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <mask
            id="mask0_829_14178"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_829_14178)">
            <path
              d="M9.9987 7.49984L7.08203 4.58317L9.9987 1.6665L12.9154 4.58317L9.9987 7.49984ZM0.832031 16.6665V13.3332C0.832031 12.8609 0.995226 12.4651 1.32161 12.1457C1.648 11.8262 2.04036 11.6665 2.4987 11.6665H5.22786C5.50564 11.6665 5.76953 11.7359 6.01953 11.8748C6.26953 12.0137 6.47092 12.2012 6.6237 12.4373C7.02648 12.979 7.523 13.4026 8.11328 13.7082C8.70356 14.0137 9.33203 14.1665 9.9987 14.1665C10.6793 14.1665 11.3147 14.0137 11.9049 13.7082C12.4952 13.4026 12.9848 12.979 13.3737 12.4373C13.5543 12.2012 13.7661 12.0137 14.0091 11.8748C14.2522 11.7359 14.5056 11.6665 14.7695 11.6665H17.4987C17.9709 11.6665 18.3668 11.8262 18.6862 12.1457C19.0056 12.4651 19.1654 12.8609 19.1654 13.3332V16.6665H13.332V14.7707C12.8459 15.1179 12.3216 15.3818 11.7591 15.5623C11.1966 15.7429 10.6098 15.8332 9.9987 15.8332C9.40148 15.8332 8.81814 15.7394 8.2487 15.5519C7.67925 15.3644 7.15148 15.0971 6.66536 14.7498V16.6665H0.832031ZM3.33203 10.8332C2.63759 10.8332 2.04731 10.5901 1.5612 10.104C1.07509 9.61789 0.832031 9.02761 0.832031 8.33317C0.832031 7.62484 1.07509 7.03109 1.5612 6.55192C2.04731 6.07275 2.63759 5.83317 3.33203 5.83317C4.04036 5.83317 4.63411 6.07275 5.11328 6.55192C5.59245 7.03109 5.83203 7.62484 5.83203 8.33317C5.83203 9.02761 5.59245 9.61789 5.11328 10.104C4.63411 10.5901 4.04036 10.8332 3.33203 10.8332ZM16.6654 10.8332C15.9709 10.8332 15.3806 10.5901 14.8945 10.104C14.4084 9.61789 14.1654 9.02761 14.1654 8.33317C14.1654 7.62484 14.4084 7.03109 14.8945 6.55192C15.3806 6.07275 15.9709 5.83317 16.6654 5.83317C17.3737 5.83317 17.9674 6.07275 18.4466 6.55192C18.9258 7.03109 19.1654 7.62484 19.1654 8.33317C19.1654 9.02761 18.9258 9.61789 18.4466 10.104C17.9674 10.5901 17.3737 10.8332 16.6654 10.8332Z"
              fill="#999999"
            />
          </g>
        </svg>
           `,
          id: "coOrder",
        });
      }

      // 杠杆订单
      if (this.leverOpen === 1) {
        arr.push({
          iconClass: "iconClass",
          navText: this.$t("order.index.leverage"),
          href: "",
          type: 1,
          activeIconSvg: `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <mask
                    id="mask0_829_14185"
                    style="mask-type: alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                  >
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_829_14185)">
                    <path
                      d="M3.33464 15.8333H5.0013V9.16667H15.0013V15.8333H16.668V6.95833L10.0013 4.29167L3.33464 6.95833V15.8333ZM1.66797 17.5V5.83333L10.0013 2.5L18.3346 5.83333V17.5H13.3346V10.8333H6.66797V17.5H1.66797ZM7.5013 17.5V15.8333H9.16797V17.5H7.5013ZM9.16797 15V13.3333H10.8346V15H9.16797ZM10.8346 17.5V15.8333H12.5013V17.5H10.8346Z"
                      fill="#999999"
                    />
                  </g>
                </svg>
          `,
          iconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <mask
            id="mask0_829_14185"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_829_14185)">
            <path
              d="M3.33464 15.8333H5.0013V9.16667H15.0013V15.8333H16.668V6.95833L10.0013 4.29167L3.33464 6.95833V15.8333ZM1.66797 17.5V5.83333L10.0013 2.5L18.3346 5.83333V17.5H13.3346V10.8333H6.66797V17.5H1.66797ZM7.5013 17.5V15.8333H9.16797V17.5H7.5013ZM9.16797 15V13.3333H10.8346V15H9.16797ZM10.8346 17.5V15.8333H12.5013V17.5H10.8346Z"
              fill="#999999"
            />
          </g>
        </svg>
          `,
          id: "leverageOrder",
        });
      }
      return arr;
    },
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    metaText() {
      return this.$route.meta.navName;
    },
    leverOpen() {
      return this.$store.state.baseData.lever_open;
    },
  },
};
