import { myStorage } from "@/utils";

export default {
  name: "index",
  watch: {
    otcPublicInfo: {
      immediate: true,
      handler(v) {
        if (!v) return;
        if (v.defaultSeach && v.defaultSeach.toUpperCase() === "BUY") {
          //todo：fix default active issue by One
          // this.navListActive = "ordinarySell";
          this.clickName = "ordinarySell";
        } else {
          // this.navListActive = "ordinaryBuy";
          this.clickName = "ordinaryBuy";
        }
      },
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
    otcPublicInfo() {
      return this.$store.state.baseData.otcPublicInfo;
    },
    templateLayoutType() {
      return this.$store.state.baseData.templateLayoutType;
    },
    userInfo() {
      return this.$store.state.baseData.userInfo || {};
    },
    userCompanyInfo() {
      return this.userInfo.userCompanyInfo || {};
    },
    otcCompanyInfo() {
      return this.userInfo.otcCompanyInfo || {};
    },
    companyStatus() {
      return Number(this.otcCompanyInfo.status);
    },
    applyStatus() {
      return Number(this.userCompanyInfo.applyStatus);
    },
    isBigDeal() {
      return Number(this.$store.state.baseData.is_open_bigDeal);
    },
    applyRuleStatus() {
      return Number(this.userCompanyInfo.status);
    },
    navList() {
      const arr = [
        {
          iconClass: "iconClass",
          navText: this.$t("fiatdeal.navList")[0],
          href: "",
          type: 1,
          activeIconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M4.83464 13.6667L0.667969 9.50004L4.83464 5.33337L6.0013 6.52087L3.85547 8.66671H9.83463V10.3334H3.85547L6.0013 12.4792L4.83464 13.6667ZM13.168 8.66671L12.0013 7.47921L14.1471 5.33337H8.16797V3.66671H14.1471L12.0013 1.52087L13.168 0.333374L17.3346 4.50004L13.168 8.66671Z" fill="#ffffff"/>
            </svg>
          `,
          iconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M4.83464 13.6667L0.667969 9.50004L4.83464 5.33337L6.0013 6.52087L3.85547 8.66671H9.83463V10.3334H3.85547L6.0013 12.4792L4.83464 13.6667ZM13.168 8.66671L12.0013 7.47921L14.1471 5.33337H8.16797V3.66671H14.1471L12.0013 1.52087L13.168 0.333374L17.3346 4.50004L13.168 8.66671Z" fill="#999999"/>
            </svg>
          `,
          id: "ordinary",
        },
        // {
        //   iconClass: 'iconClass',
        //   navText: this.$t('fiatdeal.navList')[1],
        //   href: '',
        //   type: 2,
        //   activeIconSvg: '',
        //   iconSvg: '',
        //   id: 'ordinaryBuy',
        // },
        // {
        //   iconClass: 'iconClass',
        //   navText: this.$t('fiatdeal.navList')[2],
        //   href: '',
        //   type: 2,
        //   activeIconSvg: '',
        //   iconSvg: '',
        //   id: 'ordinarySell',
        // },
      ];
      if (this.isBigDeal) {
        arr.push(
          {
            iconClass: "iconClass",
            navText: this.$t("fiatdeal.navList")[3],
            href: "",
            type: 1,
            activeIconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M7.16667 15.1875V9.47913L2.16667 6.58329V12.2916L7.16667 15.1875ZM8.83333 15.1875L13.8333 12.2916V6.58329L8.83333 9.47913V15.1875ZM8 8.04163L12.9375 5.18746L8 2.33329L3.0625 5.18746L8 8.04163ZM1.33333 13.75C1.06944 13.5972 0.864583 13.3958 0.71875 13.1458C0.572917 12.8958 0.5 12.618 0.5 12.3125V5.68746C0.5 5.3819 0.572917 5.10413 0.71875 4.85413C0.864583 4.60413 1.06944 4.40274 1.33333 4.24996L7.16667 0.895793C7.43056 0.743015 7.70833 0.666626 8 0.666626C8.29167 0.666626 8.56944 0.743015 8.83333 0.895793L14.6667 4.24996C14.9306 4.40274 15.1354 4.60413 15.2813 4.85413C15.4271 5.10413 15.5 5.3819 15.5 5.68746V12.3125C15.5 12.618 15.4271 12.8958 15.2813 13.1458C15.1354 13.3958 14.9306 13.5972 14.6667 13.75L8.83333 17.1041C8.56944 17.2569 8.29167 17.3333 8 17.3333C7.70833 17.3333 7.43056 17.2569 7.16667 17.1041L1.33333 13.75Z" fill="#ffffff"/>
              </svg>
            `,
            iconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M7.16667 15.1875V9.47913L2.16667 6.58329V12.2916L7.16667 15.1875ZM8.83333 15.1875L13.8333 12.2916V6.58329L8.83333 9.47913V15.1875ZM8 8.04163L12.9375 5.18746L8 2.33329L3.0625 5.18746L8 8.04163ZM1.33333 13.75C1.06944 13.5972 0.864583 13.3958 0.71875 13.1458C0.572917 12.8958 0.5 12.618 0.5 12.3125V5.68746C0.5 5.3819 0.572917 5.10413 0.71875 4.85413C0.864583 4.60413 1.06944 4.40274 1.33333 4.24996L7.16667 0.895793C7.43056 0.743015 7.70833 0.666626 8 0.666626C8.29167 0.666626 8.56944 0.743015 8.83333 0.895793L14.6667 4.24996C14.9306 4.40274 15.1354 4.60413 15.2813 4.85413C15.4271 5.10413 15.5 5.3819 15.5 5.68746V12.3125C15.5 12.618 15.4271 12.8958 15.2813 13.1458C15.1354 13.3958 14.9306 13.5972 14.6667 13.75L8.83333 17.1041C8.56944 17.2569 8.29167 17.3333 8 17.3333C7.70833 17.3333 7.43056 17.2569 7.16667 17.1041L1.33333 13.75Z" fill="#999999"/>
              </svg>
            `,
            id: "bulk",
          }
          // {
          //   iconClass: 'iconClass',
          //   navText: this.$t('fiatdeal.navList')[4],
          //   href: '',
          //   type: 2,
          //   activeIconSvg: '',
          //   iconSvg: '',
          //   id: 'bulkBuy',
          // },
          // {
          //   iconClass: 'iconClass',
          //   navText: this.$t('fiatdeal.navList')[5],
          //   href: '',
          //   type: 2,
          //   activeIconSvg: '',
          //   iconSvg: '',
          //   id: 'bulkSell',
          // },
        );
      }
      arr.push({
        iconClass: "iconClass",
        navText: this.$t("fiatdeal.navList")[6],
        href: "",
        type: 1,
        activeIconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M9.9987 6.49996L7.08203 3.58329L9.9987 0.666626L12.9154 3.58329L9.9987 6.49996ZM0.832031 15.6666V12.3333C0.832031 11.8611 0.995226 11.4652 1.32161 11.1458C1.648 10.8263 2.04036 10.6666 2.4987 10.6666H5.22786C5.50564 10.6666 5.76953 10.7361 6.01953 10.875C6.26953 11.0138 6.47092 11.2013 6.6237 11.4375C7.02648 11.9791 7.523 12.4027 8.11328 12.7083C8.70356 13.0138 9.33203 13.1666 9.9987 13.1666C10.6793 13.1666 11.3147 13.0138 11.9049 12.7083C12.4952 12.4027 12.9848 11.9791 13.3737 11.4375C13.5543 11.2013 13.7661 11.0138 14.0091 10.875C14.2522 10.7361 14.5056 10.6666 14.7695 10.6666H17.4987C17.9709 10.6666 18.3668 10.8263 18.6862 11.1458C19.0056 11.4652 19.1654 11.8611 19.1654 12.3333V15.6666H13.332V13.7708C12.8459 14.118 12.3216 14.3819 11.7591 14.5625C11.1966 14.743 10.6098 14.8333 9.9987 14.8333C9.40148 14.8333 8.81814 14.7395 8.2487 14.552C7.67925 14.3645 7.15148 14.0972 6.66536 13.75V15.6666H0.832031ZM3.33203 9.83329C2.63759 9.83329 2.04731 9.59024 1.5612 9.10413C1.07509 8.61801 0.832031 8.02774 0.832031 7.33329C0.832031 6.62496 1.07509 6.03121 1.5612 5.55204C2.04731 5.07288 2.63759 4.83329 3.33203 4.83329C4.04036 4.83329 4.63411 5.07288 5.11328 5.55204C5.59245 6.03121 5.83203 6.62496 5.83203 7.33329C5.83203 8.02774 5.59245 8.61801 5.11328 9.10413C4.63411 9.59024 4.04036 9.83329 3.33203 9.83329ZM16.6654 9.83329C15.9709 9.83329 15.3806 9.59024 14.8945 9.10413C14.4084 8.61801 14.1654 8.02774 14.1654 7.33329C14.1654 6.62496 14.4084 6.03121 14.8945 5.55204C15.3806 5.07288 15.9709 4.83329 16.6654 4.83329C17.3737 4.83329 17.9674 5.07288 18.4466 5.55204C18.9258 6.03121 19.1654 6.62496 19.1654 7.33329C19.1654 8.02774 18.9258 8.61801 18.4466 9.10413C17.9674 9.59024 17.3737 9.83329 16.6654 9.83329Z" fill="#ffffff"/>
            </svg>
          `,
        iconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M9.9987 6.49996L7.08203 3.58329L9.9987 0.666626L12.9154 3.58329L9.9987 6.49996ZM0.832031 15.6666V12.3333C0.832031 11.8611 0.995226 11.4652 1.32161 11.1458C1.648 10.8263 2.04036 10.6666 2.4987 10.6666H5.22786C5.50564 10.6666 5.76953 10.7361 6.01953 10.875C6.26953 11.0138 6.47092 11.2013 6.6237 11.4375C7.02648 11.9791 7.523 12.4027 8.11328 12.7083C8.70356 13.0138 9.33203 13.1666 9.9987 13.1666C10.6793 13.1666 11.3147 13.0138 11.9049 12.7083C12.4952 12.4027 12.9848 11.9791 13.3737 11.4375C13.5543 11.2013 13.7661 11.0138 14.0091 10.875C14.2522 10.7361 14.5056 10.6666 14.7695 10.6666H17.4987C17.9709 10.6666 18.3668 10.8263 18.6862 11.1458C19.0056 11.4652 19.1654 11.8611 19.1654 12.3333V15.6666H13.332V13.7708C12.8459 14.118 12.3216 14.3819 11.7591 14.5625C11.1966 14.743 10.6098 14.8333 9.9987 14.8333C9.40148 14.8333 8.81814 14.7395 8.2487 14.552C7.67925 14.3645 7.15148 14.0972 6.66536 13.75V15.6666H0.832031ZM3.33203 9.83329C2.63759 9.83329 2.04731 9.59024 1.5612 9.10413C1.07509 8.61801 0.832031 8.02774 0.832031 7.33329C0.832031 6.62496 1.07509 6.03121 1.5612 5.55204C2.04731 5.07288 2.63759 4.83329 3.33203 4.83329C4.04036 4.83329 4.63411 5.07288 5.11328 5.55204C5.59245 6.03121 5.83203 6.62496 5.83203 7.33329C5.83203 8.02774 5.59245 8.61801 5.11328 9.10413C4.63411 9.59024 4.04036 9.83329 3.33203 9.83329ZM16.6654 9.83329C15.9709 9.83329 15.3806 9.59024 14.8945 9.10413C14.4084 8.61801 14.1654 8.02774 14.1654 7.33329C14.1654 6.62496 14.4084 6.03121 14.8945 5.55204C15.3806 5.07288 15.9709 4.83329 16.6654 4.83329C17.3737 4.83329 17.9674 5.07288 18.4466 5.55204C18.9258 6.03121 19.1654 6.62496 19.1654 7.33329C19.1654 8.02774 18.9258 8.61801 18.4466 9.10413C17.9674 9.59024 17.3737 9.83329 16.6654 9.83329Z" fill="#999999"/>
            </svg>
          `,
        id: "advertising",
      });
      if (this.companyStatus) {
        arr.push({
          iconClass: "iconClass",
          navText: this.$t("fiatdeal.navList")[7],
          href: "",
          type: 1,
          activeIconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path d="M2.33464 13.8333H4.0013V7.16667H14.0013V13.8333H15.668V4.95833L9.0013 2.29167L2.33464 4.95833V13.8333ZM0.667969 15.5V3.83333L9.0013 0.5L17.3346 3.83333V15.5H12.3346V8.83333H5.66797V15.5H0.667969ZM6.5013 15.5V13.8333H8.16797V15.5H6.5013ZM8.16797 13V11.3333H9.83463V13H8.16797ZM9.83463 15.5V13.8333H11.5013V15.5H9.83463Z" fill="#ffffff"/>
              </svg>
            `,
          iconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path d="M2.33464 13.8333H4.0013V7.16667H14.0013V13.8333H15.668V4.95833L9.0013 2.29167L2.33464 4.95833V13.8333ZM0.667969 15.5V3.83333L9.0013 0.5L17.3346 3.83333V15.5H12.3346V8.83333H5.66797V15.5H0.667969ZM6.5013 15.5V13.8333H8.16797V15.5H6.5013ZM8.16797 13V11.3333H9.83463V13H8.16797ZM9.83463 15.5V13.8333H11.5013V15.5H9.83463Z" fill="#999999"/>
              </svg>
            `,
          id: "companyApplication",
        });
      }
      return arr;
    },
  },
  methods: {
    init() {
      if (this.navList.length) {
        this.navList.forEach((item) => {
          if (this.navListActive === item.id) {
            this.pageTitleText = item.navText;
          } else {
            this.pageTitleText = this.navList[0].navText;
          }
        });
      }
    },
    listChanges(data) {
      const { applyStatus } = this;
      console.log("listChanges", data);
      const companyAppling = myStorage.get("companyAppling");
      if (this.navListActive !== data.id && data.id !== this.clickName) {
        if (data.id === "ordinary") {
          this.navListActive = "ordinary";
        } else if (data.id === "bulk") {
          this.navListActive = "bulk";
        } else {
          if (data.id === "advertising") {
            this.$router.push("/otcRelease");
            return;
          }
          if (data.id === "companyApplication") {
            if (applyStatus === 1 && !companyAppling) {
              this.$router.push("/companyApplicationDetail");
              myStorage.set("companyAppling", true);
            } else {
              this.$router.push("/companyApplication");
            }
            return;
          }
          this.navListActive = data.id;
        }
        const info = {
          side: data.id,
        };
        this.$store.dispatch("sideIsBlockTrade", info);
        this.$store.dispatch("setFlag", true);
      }
      this.clickName = data.id;
      console.log(data.navText);
      this.pageTitleText = data.navText;
      // this.$router.push('/fiatdeal/center');
    },
  },
  data() {
    return {
      clickName: "",
      navListActive: "ordinary",
      pageTitleText: null,
    };
  },
};
