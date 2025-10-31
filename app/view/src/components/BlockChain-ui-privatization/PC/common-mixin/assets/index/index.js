export default {
  name: "assets",
  data() {
    return {
      navListActive: "exchangeAccount",
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
        (data.id === "coFlowingWater" || data.id === "coAccount") &&
        window.HOSTAPI !== "co" &&
        process.env.NODE_ENV !== "development"
      ) {
        const paths = this.$route.path.split("/");
        paths[paths.length - 1] = data.id;
        window.location.href = `${this.linkurl.coUrl}${paths.join("/")}`;
      } else {
        this.$router.push(data.id);
        this.navListActive = data.id;
        if (data.id === "flowingWater") {
          this.navListActive = "exchangeAccount";
        }
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
    templateLayoutType() {
      return this.$store.state.baseData.templateLayoutType;
    },
    fiatTradeOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.fiat_trade_open === "1") {
        return true;
      }
      return false;
    },
    isCoOpen() {
      const base = this.$store.state.baseData.publicInfo;
      if (base && base.switch && base.switch.indep_co_switch === "1") {
        return true;
      }
      return false;
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
    // 开启验证方式
    coinsKrwOpen() {
      return this.$store.state.baseData.fiat_open;
    },
    modalSwitch() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.switch;
      }
      return {};
    },
    navList() {
      const { modalSwitch } = this;

      // 改，2022.12.21 隐藏资金流水
      let arr = [
        // 币币账户
        {
          iconClass: "iconClass",
          navText: this.isCoOpen
            ? this.$t("assets.index.coExchangeAccount")
            : this.$t("assets.index.exchangeAccount"),
          href: "",
          type: 1,
          activeIconSvg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15317"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15317)">
      <path
        d="M7.5 17.5V15.8333H5V14.1667H6.66667V5.83333H5V4.16667H7.5V2.5H9.16667V4.16667H10.8333V2.5H12.5V4.27083C13.2222 4.46528 13.8194 4.85764 14.2917 5.44792C14.7639 6.03819 15 6.72222 15 7.5C15 7.90278 14.9306 8.28819 14.7917 8.65625C14.6528 9.02431 14.4583 9.35417 14.2083 9.64583C14.6944 9.9375 15.0868 10.3333 15.3854 10.8333C15.684 11.3333 15.8333 11.8889 15.8333 12.5C15.8333 13.4167 15.5069 14.2014 14.8542 14.8542C14.2014 15.5069 13.4167 15.8333 12.5 15.8333V17.5H10.8333V15.8333H9.16667V17.5H7.5ZM8.33333 9.16667H11.6667C12.125 9.16667 12.5174 9.00347 12.8438 8.67708C13.1701 8.35069 13.3333 7.95833 13.3333 7.5C13.3333 7.04167 13.1701 6.64931 12.8438 6.32292C12.5174 5.99653 12.125 5.83333 11.6667 5.83333H8.33333V9.16667ZM8.33333 14.1667H12.5C12.9583 14.1667 13.3507 14.0035 13.6771 13.6771C14.0035 13.3507 14.1667 12.9583 14.1667 12.5C14.1667 12.0417 14.0035 11.6493 13.6771 11.3229C13.3507 10.9965 12.9583 10.8333 12.5 10.8333H8.33333V14.1667Z"
        fill="#999999"
      />
    </g>
  </svg>
          `,
          iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15317"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15317)">
      <path
        d="M7.5 17.5V15.8333H5V14.1667H6.66667V5.83333H5V4.16667H7.5V2.5H9.16667V4.16667H10.8333V2.5H12.5V4.27083C13.2222 4.46528 13.8194 4.85764 14.2917 5.44792C14.7639 6.03819 15 6.72222 15 7.5C15 7.90278 14.9306 8.28819 14.7917 8.65625C14.6528 9.02431 14.4583 9.35417 14.2083 9.64583C14.6944 9.9375 15.0868 10.3333 15.3854 10.8333C15.684 11.3333 15.8333 11.8889 15.8333 12.5C15.8333 13.4167 15.5069 14.2014 14.8542 14.8542C14.2014 15.5069 13.4167 15.8333 12.5 15.8333V17.5H10.8333V15.8333H9.16667V17.5H7.5ZM8.33333 9.16667H11.6667C12.125 9.16667 12.5174 9.00347 12.8438 8.67708C13.1701 8.35069 13.3333 7.95833 13.3333 7.5C13.3333 7.04167 13.1701 6.64931 12.8438 6.32292C12.5174 5.99653 12.125 5.83333 11.6667 5.83333H8.33333V9.16667ZM8.33333 14.1667H12.5C12.9583 14.1667 13.3507 14.0035 13.6771 13.6771C14.0035 13.3507 14.1667 12.9583 14.1667 12.5C14.1667 12.0417 14.0035 11.6493 13.6771 11.3229C13.3507 10.9965 12.9583 10.8333 12.5 10.8333H8.33333V14.1667Z"
        fill="#999999"
      />
    </g>
  </svg>
          `,
          id: "exchangeAccount",
        },
        // 资金流水
        {
          iconClass: "iconClass",
          navText: this.$t("assets.index.flowingWater"),
          href: "",
          type: 2,
          id: "flowingWater",
        },
        // 地址管理
        {
          iconClass: "iconClass",
          navText: this.$t("assets.index.addressMent"),
          href: "",
          type: 2,
          id: "addressMent",
        },
      ];
      const otcArr = [
        // 法币账户
        {
          iconClass: "iconClass",
          navText: !this.fiatTradeOpen
            ? this.$t("assets.index.otcAccount")
            : this.$t("assets.b2c.otcShow.otcAccount"),
          href: "",
          type: 1,
          activeIconSvg: `
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15313"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15313)">
      <path
        d="M4.16797 14.1663V8.33301H5.83464V14.1663H4.16797ZM9.16797 14.1663V8.33301H10.8346V14.1663H9.16797ZM1.66797 17.4997V15.833H18.3346V17.4997H1.66797ZM14.168 14.1663V8.33301H15.8346V14.1663H14.168ZM1.66797 6.66634V4.99967L10.0013 0.833008L18.3346 4.99967V6.66634H1.66797ZM5.3763 4.99967H14.6263L10.0013 2.70801L5.3763 4.99967Z"
        fill="#999999"
      />
    </g>
  </svg>
           `,
          iconSvg: `
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15313"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15313)">
      <path
        d="M4.16797 14.1663V8.33301H5.83464V14.1663H4.16797ZM9.16797 14.1663V8.33301H10.8346V14.1663H9.16797ZM1.66797 17.4997V15.833H18.3346V17.4997H1.66797ZM14.168 14.1663V8.33301H15.8346V14.1663H14.168ZM1.66797 6.66634V4.99967L10.0013 0.833008L18.3346 4.99967V6.66634H1.66797ZM5.3763 4.99967H14.6263L10.0013 2.70801L5.3763 4.99967Z"
        fill="#999999"
      />
    </g>
  </svg>
           `,
          id: "otcAccount",
        },
        // 资金流水
        {
          iconClass: "iconClass",
          navText: this.$t("assets.index.otcFlowingWater"),
          href: "",
          type: 2,
          id: "otcFlowingWater",
        },
      ];
      // 韩国法币
      // const backOtcArr = [
      //   {
      //     iconClass: 'iconClass',
      //     navText: !this.fiatTradeOpen
      //       ? this.$t('assets.index.otcAccount')
      //       : this.$t('assets.b2c.otcShow.otcAccount'),
      //     href: '',
      //     type: 1,
      //     activeIconSvg: `<svg class="icon icon-18" aria-hidden="true">
      //       <use xlink:href="#icon-b_5_1"></use>
      //     </svg>`,
      //     iconSvg: `<svg class="icon icon-18" aria-hidden="true">
      //       <use xlink:href="#icon-b_5"></use>
      //     </svg>`,
      //     id: 'krwAccount',
      //   },
      //   // 资金流水
      //   {
      //     iconClass: 'iconClass',
      //     navText: this.$t('assets.index.otcFlowingWater'),
      //     href: '',
      //     type: 2,
      //     id: 'krwFlowingWater',
      //   },
      // ];
      // b2c法币
      const b2cOtcArr = [
        {
          iconClass: "iconClass",
          navText: this.$t("assets.index.otcAccount"),
          href: "",
          type: 1,
          activeIconSvg: `<svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_5_1"></use>
          </svg>`,
          iconSvg: `<svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_5"></use>
          </svg>`,
          id: "b2cAccount",
        },
        // 资金流水
        {
          iconClass: "iconClass",
          navText: this.$t("assets.index.otcFlowingWater"),
          href: "",
          type: 2,
          id: "b2cFlowingWater",
        },
      ];

      if (this.fiatTradeOpen) {
        arr = [...arr, ...b2cOtcArr];
      }
      // if (this.coinsKrwOpen === 1) {
      //   arr = [...arr, ...backOtcArr];
      // }
      if ((this.linkurl.otcUrl || this.saasOtcFlowConfig) && modalSwitch.otcIsOpen === "1") {
        arr = arr.concat(otcArr);
      }
      // 币宝账户
      if (this.is_deposit_open) {
        arr = [
          ...arr,
          ...[
            {
              iconClass: "iconClass",
              navText: this.$t("assets.index.bibaoAccount"),
              href: "",
              type: 1,
              activeIconSvg: `<svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_23_1"></use>
              </svg>`, // 更换图标
              iconSvg: `<svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_23"></use>
              </svg>`,
              id: "bibaoAccount",
            },
            // 查看详情
            {
              iconClass: "iconClass",
              navText: this.$t("assets.index.detail"),
              href: "",
              type: 2,
              id: "bibaoDetail",
            },
          ],
        ];
      }
      // 合约
      if (this.linkurl.coUrl && modalSwitch.contractOpen === "1") {
        arr = [
          ...arr,
          ...[
            {
              iconClass: "iconClass",
              navText: this.$t("assets.index.coAccount"),
              href: "",
              type: 1,
              activeIconSvg: `
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15309"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15309)">
      <path
        d="M5 18.3337C4.30556 18.3337 3.71528 18.0906 3.22917 17.6045C2.74306 17.1184 2.5 16.5281 2.5 15.8337V13.3337H5V1.66699H17.5V15.8337C17.5 16.5281 17.2569 17.1184 16.7708 17.6045C16.2847 18.0906 15.6944 18.3337 15 18.3337H5ZM15 16.667C15.2361 16.667 15.434 16.5871 15.5938 16.4274C15.7535 16.2677 15.8333 16.0698 15.8333 15.8337V3.33366H6.66667V13.3337H14.1667V15.8337C14.1667 16.0698 14.2465 16.2677 14.4062 16.4274C14.566 16.5871 14.7639 16.667 15 16.667ZM7.5 7.50033V5.83366H15V7.50033H7.5ZM7.5 10.0003V8.33366H15V10.0003H7.5ZM5 16.667H12.5V15.0003H4.16667V15.8337C4.16667 16.0698 4.24653 16.2677 4.40625 16.4274C4.56597 16.5871 4.76389 16.667 5 16.667ZM5 16.667H4.16667H12.5H5Z"
        fill="#999999"
      />
    </g>
  </svg>
               `,
              iconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15309"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15309)">
      <path
        d="M5 18.3337C4.30556 18.3337 3.71528 18.0906 3.22917 17.6045C2.74306 17.1184 2.5 16.5281 2.5 15.8337V13.3337H5V1.66699H17.5V15.8337C17.5 16.5281 17.2569 17.1184 16.7708 17.6045C16.2847 18.0906 15.6944 18.3337 15 18.3337H5ZM15 16.667C15.2361 16.667 15.434 16.5871 15.5938 16.4274C15.7535 16.2677 15.8333 16.0698 15.8333 15.8337V3.33366H6.66667V13.3337H14.1667V15.8337C14.1667 16.0698 14.2465 16.2677 14.4062 16.4274C14.566 16.5871 14.7639 16.667 15 16.667ZM7.5 7.50033V5.83366H15V7.50033H7.5ZM7.5 10.0003V8.33366H15V10.0003H7.5ZM5 16.667H12.5V15.0003H4.16667V15.8337C4.16667 16.0698 4.24653 16.2677 4.40625 16.4274C4.56597 16.5871 4.76389 16.667 5 16.667ZM5 16.667H4.16667H12.5H5Z"
        fill="#999999"
      />
    </g>
  </svg>
               `,
              id: "coAccount",
            },
            // 资金流水
            {
              iconClass: "iconClass",
              navText: this.$t("assets.index.otcFlowingWater"),
              href: "",
              type: 2,
              id: "coFlowingWater",
            },
          ],
        ];
      }
      if (this.leverOpen === 1) {
        const leverageArr = [
          {
            iconClass: "iconClass",
            navText: this.$t("assets.index.leverage"),
            href: "",
            type: 1,
            activeIconSvg: `
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15305"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15305)">
      <path
        d="M1.66797 17.5003V15.8337H9.16797V6.52116C8.80686 6.39616 8.49436 6.20171 8.23047 5.93783C7.96658 5.67394 7.77214 5.36144 7.64714 5.00033H5.0013L7.5013 10.8337C7.5013 11.5281 7.21658 12.1184 6.64714 12.6045C6.07769 13.0906 5.39019 13.3337 4.58464 13.3337C3.77908 13.3337 3.09158 13.0906 2.52214 12.6045C1.95269 12.1184 1.66797 11.5281 1.66797 10.8337L4.16797 5.00033H2.5013V3.33366H7.64714C7.8138 2.84755 8.11241 2.44824 8.54297 2.13574C8.97352 1.82324 9.45964 1.66699 10.0013 1.66699C10.543 1.66699 11.0291 1.82324 11.4596 2.13574C11.8902 2.44824 12.1888 2.84755 12.3555 3.33366H17.5013V5.00033H15.8346L18.3346 10.8337C18.3346 11.5281 18.0499 12.1184 17.4805 12.6045C16.911 13.0906 16.2235 13.3337 15.418 13.3337C14.6124 13.3337 13.9249 13.0906 13.3555 12.6045C12.786 12.1184 12.5013 11.5281 12.5013 10.8337L15.0013 5.00033H12.3555C12.2305 5.36144 12.036 5.67394 11.7721 5.93783C11.5082 6.20171 11.1957 6.39616 10.8346 6.52116V15.8337H18.3346V17.5003H1.66797ZM13.8555 10.8337H16.9805L15.418 7.20866L13.8555 10.8337ZM3.02214 10.8337H6.14714L4.58464 7.20866L3.02214 10.8337ZM10.0013 5.00033C10.2374 5.00033 10.4353 4.92046 10.5951 4.76074C10.7548 4.60102 10.8346 4.4031 10.8346 4.16699C10.8346 3.93088 10.7548 3.73296 10.5951 3.57324C10.4353 3.41352 10.2374 3.33366 10.0013 3.33366C9.76519 3.33366 9.56727 3.41352 9.40755 3.57324C9.24783 3.73296 9.16797 3.93088 9.16797 4.16699C9.16797 4.4031 9.24783 4.60102 9.40755 4.76074C9.56727 4.92046 9.76519 5.00033 10.0013 5.00033Z"
        fill="#999999"
      />
    </g>
  </svg>
            `,
            iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <mask
      id="mask0_829_15305"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_829_15305)">
      <path
        d="M1.66797 17.5003V15.8337H9.16797V6.52116C8.80686 6.39616 8.49436 6.20171 8.23047 5.93783C7.96658 5.67394 7.77214 5.36144 7.64714 5.00033H5.0013L7.5013 10.8337C7.5013 11.5281 7.21658 12.1184 6.64714 12.6045C6.07769 13.0906 5.39019 13.3337 4.58464 13.3337C3.77908 13.3337 3.09158 13.0906 2.52214 12.6045C1.95269 12.1184 1.66797 11.5281 1.66797 10.8337L4.16797 5.00033H2.5013V3.33366H7.64714C7.8138 2.84755 8.11241 2.44824 8.54297 2.13574C8.97352 1.82324 9.45964 1.66699 10.0013 1.66699C10.543 1.66699 11.0291 1.82324 11.4596 2.13574C11.8902 2.44824 12.1888 2.84755 12.3555 3.33366H17.5013V5.00033H15.8346L18.3346 10.8337C18.3346 11.5281 18.0499 12.1184 17.4805 12.6045C16.911 13.0906 16.2235 13.3337 15.418 13.3337C14.6124 13.3337 13.9249 13.0906 13.3555 12.6045C12.786 12.1184 12.5013 11.5281 12.5013 10.8337L15.0013 5.00033H12.3555C12.2305 5.36144 12.036 5.67394 11.7721 5.93783C11.5082 6.20171 11.1957 6.39616 10.8346 6.52116V15.8337H18.3346V17.5003H1.66797ZM13.8555 10.8337H16.9805L15.418 7.20866L13.8555 10.8337ZM3.02214 10.8337H6.14714L4.58464 7.20866L3.02214 10.8337ZM10.0013 5.00033C10.2374 5.00033 10.4353 4.92046 10.5951 4.76074C10.7548 4.60102 10.8346 4.4031 10.8346 4.16699C10.8346 3.93088 10.7548 3.73296 10.5951 3.57324C10.4353 3.41352 10.2374 3.33366 10.0013 3.33366C9.76519 3.33366 9.56727 3.41352 9.40755 3.57324C9.24783 3.73296 9.16797 3.93088 9.16797 4.16699C9.16797 4.4031 9.24783 4.60102 9.40755 4.76074C9.56727 4.92046 9.76519 5.00033 10.0013 5.00033Z"
        fill="#999999"
      />
    </g>
  </svg>
            `,
            id: "leverageAccount",
          },
          // 资金流水
          {
            iconClass: "iconClass",
            navText: this.$t("assets.index.otcFlowingWater"),
            href: "",
            type: 2,
            id: "lerverageFlowingWater",
          },
        ];
        arr = [...arr, ...leverageArr];
      }

      return arr;
    },
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    is_deposit_open() {
      return this.$store.state.baseData.is_deposit_open;
    },
    newcoinOpen() {
      return this.$store.state.baseData.newcoinOpen;
    },
    metaText() {
      return this.$route.meta.navName;
    },
    loginFlag() {
      const { isLogin, userInfoIsReady } = this.$store.state.baseData;
      if (isLogin && userInfoIsReady) {
        return false;
      }
      return true;
    },
    leverOpen() {
      return this.$store.state.baseData.lever_open;
    },
  },
};
