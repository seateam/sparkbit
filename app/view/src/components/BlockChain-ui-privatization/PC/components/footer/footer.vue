<!-- 改，2022.12.19 新增 -->
<template>
  <div id="footer-box" class="footer-box" :class="{ 'home-footer': router === 'home' }">
    <section class="pc-footer">
      <div class="m-body">
        <div class="m-linkBox">
          <!-- 第一列 -->
          <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.AboutUs") }} </span>
            <template v-for="item in col1DataList">
              <a v-if="item.linkType == 1" :href="item.link" target="_blank">
                <span class="footer_span_item"> {{ item.linkText }} </span>
              </a>
              <router-link v-else :to="item.link">
                <span class="footer_span_item"> {{ item.linkText }} </span>
              </router-link>
            </template>
          </div>
          <!-- 第二列 -->
          <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.Product") }} </span>
            <a v-for="item in col2DataList" :href="item.link" target="_blank">
              <span class="footer_span_item"> {{ item.linkText }} </span>
            </a>
          </div>
          <!-- 第三列 -->
          <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.Service") }} </span>
            <template v-for="item in col3DataList">
              <a v-if="item.link" :key="item.linkText" :href="item.link" target="_blank">
                <span class="footer_span_item"> {{ item.linkText }} </span>
              </a>
              <span v-else :key="item.linkText" class="footer_span_item" @click="openZE">{{
                item.linkText
              }}</span>
            </template>
          </div>
          <!-- 第四列 -->
          <!-- <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.UserSupport") }} </span>
            <a v-for="item in col4DataList" :href="item.link" target="_blank">
              <span class="footer_span_item"> {{ item.linkText }} </span>
            </a>
          </div> -->
          <!--第五列-->
          <!-- <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.Enterprise") }} </span>
            <a v-for="item in col5DataList" :href="item.link" target="_blank">
              <span class="footer_span_item"> {{ item.linkText }} </span>
            </a>
          </div> -->
          <!--第六列-->
          <div class="footer_div_item">
            <span class="footer_span_title"> {{ $t("replenish.footer.BuyCrypto") }} </span>
            <a v-for="item in col6DataList" :href="item.link" target="_blank">
              <span class="footer_span_item"> {{ item.linkText }} </span>
            </a>
          </div>
        </div>
      </div>

      <!-- 改，2022.10.16，新增 -->
      <div class="m-logoGrid" v-if="false">
        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_bscscan.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_coincodex.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_coin.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_dextrade.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_Etherscan.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_linch.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_dappradar.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_dextools.png" />
        </a>
        <!--这个空标签是用来处理换行之后背景色问题-->
        <a class="empty"></a>
        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_coinMarketCap.png" />
        </a>
        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_coinpaprika.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_cryptorank.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_coinZilla.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_nomics-1.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_tronscan.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_PancakeSwap.png" />
        </a>

        <a href="/" target="_blank">
          <img src="/static/img/new/zedxion_CoinGecko.png" />
        </a>
      </div>

      <div class="m-bottom">
        <img class="logo dark-show" :src="sparkbit" />
        <img class="logo light-show" :src="sparkbit_1" />
        <div
          class="copy2 z-2-cl"
          style="border-color: rgba(146, 146, 146, 1) !important; color: rgba(146, 146, 146, 1)"
          v-if="footerTemplateReceived"
        >
          Copyright © {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved
        </div>
        <div class="m-relation">
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M16.7695 3.24613C16.5528 3.25569 16.3509 3.31882 16.1732 3.39067C16.0067 3.45764 15.3705 3.73049 14.3685 4.1602C13.3656 4.59028 12.0377 5.1604 10.6211 5.76957C7.78798 6.98791 4.60281 8.35933 2.97135 9.06124C2.91001 9.08762 2.69595 9.15601 2.46875 9.33337C2.24155 9.51074 2 9.87827 2 10.2878C2 10.618 2.15738 10.9461 2.35547 11.142C2.55356 11.3378 2.76316 11.4346 2.94271 11.5079C3.59415 11.7737 5.61457 12.6005 5.99609 12.7566C6.13036 13.1679 6.86166 15.4049 7.03125 15.9532C7.14305 16.315 7.24947 16.5416 7.38802 16.7214C7.4573 16.8113 7.53783 16.8901 7.63542 16.9519C7.67442 16.9765 7.71719 16.9956 7.76042 17.0131L7.76302 17.0144C7.77298 17.0184 7.78157 17.0252 7.79167 17.0287C7.81072 17.0354 7.82347 17.0362 7.84896 17.0417C7.95051 17.0745 8.05303 17.0951 8.14453 17.0951C8.53464 17.0951 8.77344 16.8802 8.77344 16.8802L8.78776 16.8698L10.7943 15.1342L13.2279 17.4362C13.2621 17.4847 13.5817 17.9232 14.2865 17.9232C14.7049 17.9232 15.0369 17.7132 15.25 17.4896C15.4631 17.266 15.5959 17.0311 15.6523 16.7357V16.7344C15.7051 16.4553 17.9479 4.94145 17.9479 4.94145L17.944 4.95707C18.0097 4.6574 18.0269 4.37831 17.9544 4.10291C17.882 3.8275 17.6911 3.56381 17.4544 3.42192C17.2178 3.28005 16.9862 3.23657 16.7695 3.24613ZM16.6445 4.63936C16.6413 4.65882 16.6469 4.64904 16.6419 4.67192L16.6406 4.67973L16.6393 4.68754C16.6393 4.68754 14.4243 16.0541 14.3424 16.487C14.3484 16.4543 14.3211 16.5193 14.293 16.5586C14.2533 16.5313 14.1719 16.4961 14.1719 16.4961L14.1589 16.4818L10.8346 13.3373L8.48438 15.3685L9.18359 12.5691C9.18359 12.5691 13.5544 8.04462 13.8177 7.78129C14.0297 7.57062 14.0742 7.49719 14.0742 7.42452C14.0742 7.32719 14.0235 7.25655 13.9102 7.25655C13.8082 7.25655 13.671 7.35572 13.5977 7.40238C12.6423 8.01141 8.44788 10.456 6.56771 11.5495C6.26892 11.4272 4.19311 10.5775 3.48958 10.2904C3.49491 10.2881 3.49316 10.2889 3.4987 10.2865C5.13058 9.58441 8.31442 8.213 11.1471 6.99483C12.5635 6.38575 13.8924 5.81519 14.8945 5.38546C15.8812 4.96234 16.5668 4.67114 16.6445 4.63936Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M16.7695 3.24613C16.5528 3.25569 16.3509 3.31882 16.1732 3.39067C16.0067 3.45764 15.3705 3.73049 14.3685 4.1602C13.3656 4.59028 12.0377 5.1604 10.6211 5.76957C7.78798 6.98791 4.60281 8.35933 2.97135 9.06124C2.91001 9.08762 2.69595 9.15601 2.46875 9.33337C2.24155 9.51074 2 9.87827 2 10.2878C2 10.618 2.15738 10.9461 2.35547 11.142C2.55356 11.3378 2.76316 11.4346 2.94271 11.5079C3.59415 11.7737 5.61457 12.6005 5.99609 12.7566C6.13036 13.1679 6.86166 15.4049 7.03125 15.9532C7.14305 16.315 7.24947 16.5416 7.38802 16.7214C7.4573 16.8113 7.53783 16.8901 7.63542 16.9519C7.67442 16.9765 7.71719 16.9956 7.76042 17.0131L7.76302 17.0144C7.77298 17.0184 7.78157 17.0252 7.79167 17.0287C7.81072 17.0354 7.82347 17.0362 7.84896 17.0417C7.95051 17.0745 8.05303 17.0951 8.14453 17.0951C8.53464 17.0951 8.77344 16.8802 8.77344 16.8802L8.78776 16.8698L10.7943 15.1342L13.2279 17.4362C13.2621 17.4847 13.5817 17.9232 14.2865 17.9232C14.7049 17.9232 15.0369 17.7132 15.25 17.4896C15.4631 17.266 15.5959 17.0311 15.6523 16.7357V16.7344C15.7051 16.4553 17.9479 4.94145 17.9479 4.94145L17.944 4.95707C18.0097 4.6574 18.0269 4.37831 17.9544 4.10291C17.882 3.8275 17.6911 3.56381 17.4544 3.42192C17.2178 3.28005 16.9862 3.23657 16.7695 3.24613ZM16.6445 4.63936C16.6413 4.65882 16.6469 4.64904 16.6419 4.67192L16.6406 4.67973L16.6393 4.68754C16.6393 4.68754 14.4243 16.0541 14.3424 16.487C14.3484 16.4543 14.3211 16.5193 14.293 16.5586C14.2533 16.5313 14.1719 16.4961 14.1719 16.4961L14.1589 16.4818L10.8346 13.3373L8.48438 15.3685L9.18359 12.5691C9.18359 12.5691 13.5544 8.04462 13.8177 7.78129C14.0297 7.57062 14.0742 7.49719 14.0742 7.42452C14.0742 7.32719 14.0235 7.25655 13.9102 7.25655C13.8082 7.25655 13.671 7.35572 13.5977 7.40238C12.6423 8.01141 8.44788 10.456 6.56771 11.5495C6.26892 11.4272 4.19311 10.5775 3.48958 10.2904C3.49491 10.2881 3.49316 10.2889 3.4987 10.2865C5.13058 9.58441 8.31442 8.213 11.1471 6.99483C12.5635 6.38575 13.8924 5.81519 14.8945 5.38546C15.8812 4.96234 16.5668 4.67114 16.6445 4.63936Z"
                fill="#222222"
              />
            </svg>
          </a>
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M16.746 5.2204C15.13 3.92173 12.5747 3.70173 12.4667 3.6924C12.296 3.67773 12.134 3.7744 12.064 3.9304C12.0613 3.93573 11.9187 4.34973 11.7807 4.74906C13.6587 5.07773 14.9347 5.80706 15.0027 5.84706C15.3213 6.0324 15.428 6.44106 15.242 6.75906C15.1187 6.97106 14.8953 7.08973 14.666 7.08973C14.552 7.08973 14.4373 7.06106 14.332 6.99973C14.3133 6.9884 12.4413 5.92306 10.0007 5.92306C7.55935 5.92306 5.68668 6.98906 5.66802 6.99973C5.35002 7.1844 4.94202 7.07573 4.75735 6.75706C4.57268 6.43973 4.68002 6.0324 4.99735 5.84706C5.06535 5.80706 6.34602 5.07506 8.22935 4.74706C8.08402 4.34306 7.93735 3.93573 7.93468 3.9304C7.86468 3.77373 7.70268 3.67506 7.53201 3.6924C7.42402 3.70106 4.86868 3.92106 3.23135 5.23773C2.37535 6.0284 0.666016 10.6511 0.666016 14.6477C0.666016 14.7184 0.684016 14.7871 0.719349 14.8484C1.90002 16.9217 5.11868 17.4644 5.85202 17.4877C5.85668 17.4884 5.86068 17.4884 5.86468 17.4884C5.99402 17.4884 6.11602 17.4264 6.19268 17.3217L6.98601 16.2471C5.24602 15.8277 4.32602 15.1684 4.27068 15.1277C3.97468 14.9097 3.91068 14.4924 4.12868 14.1957C4.34602 13.9004 4.76202 13.8351 5.05802 14.0517C5.08268 14.0677 6.78068 15.2564 9.99935 15.2564C13.2307 15.2564 14.924 14.0631 14.9407 14.0511C15.2367 13.8364 15.654 13.9011 15.8707 14.1984C16.0867 14.4944 16.024 14.9091 15.7293 15.1264C15.674 15.1671 14.7587 15.8251 13.0227 16.2444L13.806 17.3211C13.8827 17.4264 14.0047 17.4877 14.134 17.4877C14.1387 17.4877 14.1427 17.4877 14.1467 17.4871C14.8807 17.4637 18.0993 16.9211 19.2793 14.8477C19.3147 14.7864 19.3327 14.7177 19.3327 14.6471C19.3327 10.6511 17.6233 6.0284 16.746 5.2204ZM7.33268 13.2564C6.59602 13.2564 5.99935 12.5104 5.99935 11.5897C5.99935 10.6691 6.59602 9.92306 7.33268 9.92306C8.06935 9.92306 8.66602 10.6691 8.66602 11.5897C8.66602 12.5104 8.06935 13.2564 7.33268 13.2564ZM12.666 13.2564C11.9293 13.2564 11.3327 12.5104 11.3327 11.5897C11.3327 10.6691 11.9293 9.92306 12.666 9.92306C13.4027 9.92306 13.9993 10.6691 13.9993 11.5897C13.9993 12.5104 13.4027 13.2564 12.666 13.2564Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M16.746 5.2204C15.13 3.92173 12.5747 3.70173 12.4667 3.6924C12.296 3.67773 12.134 3.7744 12.064 3.9304C12.0613 3.93573 11.9187 4.34973 11.7807 4.74906C13.6587 5.07773 14.9347 5.80706 15.0027 5.84706C15.3213 6.0324 15.428 6.44106 15.242 6.75906C15.1187 6.97106 14.8953 7.08973 14.666 7.08973C14.552 7.08973 14.4373 7.06106 14.332 6.99973C14.3133 6.9884 12.4413 5.92306 10.0007 5.92306C7.55935 5.92306 5.68668 6.98906 5.66802 6.99973C5.35002 7.1844 4.94202 7.07573 4.75735 6.75706C4.57268 6.43973 4.68002 6.0324 4.99735 5.84706C5.06535 5.80706 6.34602 5.07506 8.22935 4.74706C8.08402 4.34306 7.93735 3.93573 7.93468 3.9304C7.86468 3.77373 7.70268 3.67506 7.53201 3.6924C7.42402 3.70106 4.86868 3.92106 3.23135 5.23773C2.37535 6.0284 0.666016 10.6511 0.666016 14.6477C0.666016 14.7184 0.684016 14.7871 0.719349 14.8484C1.90002 16.9217 5.11868 17.4644 5.85202 17.4877C5.85668 17.4884 5.86068 17.4884 5.86468 17.4884C5.99402 17.4884 6.11602 17.4264 6.19268 17.3217L6.98601 16.2471C5.24602 15.8277 4.32602 15.1684 4.27068 15.1277C3.97468 14.9097 3.91068 14.4924 4.12868 14.1957C4.34602 13.9004 4.76202 13.8351 5.05802 14.0517C5.08268 14.0677 6.78068 15.2564 9.99935 15.2564C13.2307 15.2564 14.924 14.0631 14.9407 14.0511C15.2367 13.8364 15.654 13.9011 15.8707 14.1984C16.0867 14.4944 16.024 14.9091 15.7293 15.1264C15.674 15.1671 14.7587 15.8251 13.0227 16.2444L13.806 17.3211C13.8827 17.4264 14.0047 17.4877 14.134 17.4877C14.1387 17.4877 14.1427 17.4877 14.1467 17.4871C14.8807 17.4637 18.0993 16.9211 19.2793 14.8477C19.3147 14.7864 19.3327 14.7177 19.3327 14.6471C19.3327 10.6511 17.6233 6.0284 16.746 5.2204ZM7.33268 13.2564C6.59602 13.2564 5.99935 12.5104 5.99935 11.5897C5.99935 10.6691 6.59602 9.92306 7.33268 9.92306C8.06935 9.92306 8.66602 10.6691 8.66602 11.5897C8.66602 12.5104 8.06935 13.2564 7.33268 13.2564ZM12.666 13.2564C11.9293 13.2564 11.3327 12.5104 11.3327 11.5897C11.3327 10.6691 11.9293 9.92306 12.666 9.92306C13.4027 9.92306 13.9993 10.6691 13.9993 11.5897C13.9993 12.5104 13.4027 13.2564 12.666 13.2564Z"
                fill="#222222"
              />
            </svg>
          </a>
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M17.5793 17.9233L11.7159 9.37526L11.7259 9.38326L17.0126 3.25659H15.2459L10.9393 8.24326L7.51927 3.25659H2.88594L8.35994 11.2373L8.35927 11.2366L2.58594 17.9233H4.3526L9.1406 12.3753L12.9459 17.9233H17.5793ZM6.81927 4.58993L15.0459 16.5899H13.6459L5.4126 4.58993H6.81927Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M17.5793 17.9233L11.7159 9.37526L11.7259 9.38326L17.0126 3.25659H15.2459L10.9393 8.24326L7.51927 3.25659H2.88594L8.35994 11.2373L8.35927 11.2366L2.58594 17.9233H4.3526L9.1406 12.3753L12.9459 17.9233H17.5793ZM6.81927 4.58993L15.0459 16.5899H13.6459L5.4126 4.58993H6.81927Z"
                fill="#222222"
              />
            </svg>
          </a>
          <!-- <a class="item" href="/" target="_blank">
            <img :src="icon.medium" />
          </a>
          <a class="item" href="/" target="_blank">
            <img :src="icon.youtube" />
          </a> -->
        </div>
      </div>
    </section>
    <section class="mo-footer">
      <div class="m_list">
        <div class="footer_div_item" @click="toggleShow(4)">
          <span class="footer_span_title" :class="{ expand: mofooterFlag[4] }">
            {{ $t("footer.language") }}
          </span>
          <transition name="footerbox-fade">
            <div v-show="mofooterFlag[4]" class="footer_div_option">
              <div v-for="item in langArr" :class="lan === item.id ? 'active-lan' : ''">
                <span class="footer_span_item" @click="lanClick(item.id)"> {{ item.name }} </span>
              </div>
            </div>
          </transition>
        </div>
        <!-- 第一列 -->
        <div class="footer_div_item" @click="toggleShow(0)">
          <span class="footer_span_title" :class="{ expand: mofooterFlag[0] }">
            {{ $t("replenish.footer.AboutUs") }}
          </span>
          <transition name="footerbox-fade">
            <div v-show="mofooterFlag[0]" class="footer_div_option">
              <template v-for="item in col1DataList">
                <a v-if="item.linkType == 1" :href="item.link" target="_blank">
                  <span class="footer_span_item"> {{ item.linkText }} </span>
                </a>
                <router-link v-else :to="item.link">
                  <span class="footer_span_item"> {{ item.linkText }} </span>
                </router-link>
              </template>
            </div>
          </transition>
        </div>
        <!-- 第二列 -->
        <div class="footer_div_item" @click="toggleShow(1)">
          <span class="footer_span_title" :class="{ expand: mofooterFlag[1] }">
            {{ $t("replenish.footer.Product") }}
          </span>
          <transition name="footerbox-fade">
            <div v-show="mofooterFlag[1]" class="footer_div_option">
              <a v-for="item in col2DataList" :href="item.link" target="_blank">
                <span class="footer_span_item"> {{ item.linkText }} </span>
              </a>
            </div>
          </transition>
        </div>
        <!-- 第三列 -->
        <div class="footer_div_item" @click="toggleShow(2)">
          <span class="footer_span_title" :class="{ expand: mofooterFlag[2] }">
            {{ $t("replenish.footer.Service") }}
          </span>
          <transition name="footerbox-fade">
            <div v-show="mofooterFlag[2]" class="footer_div_option">
              <template v-for="item in col3DataList">
                <a
                  v-if="item.link"
                  :key="item.linkText"
                  :href="item.link"
                  target="_blank"
                  @click="
                    () => {
                      console.log(item.link);
                    }
                  "
                >
                  sssss
                  <span class="footer_span_item"> {{ item.linkText }} </span>
                </a>
                <span v-else :key="item.linkText" class="footer_span_item" @click="openZE">{{
                  item.linkText
                }}</span>
              </template>
            </div>
          </transition>
        </div>
        <!-- 第四列 -->
        <!-- <div class="footer_div_item">
          <span class="footer_span_title"> {{ $t("replenish.footer.UserSupport") }} </span>
          <a v-for="item in col4DataList" :href="item.link" target="_blank">
            <span class="footer_span_item"> {{ item.linkText }} </span>
          </a>
        </div> -->
        <!--第五列-->
        <!-- <div class="footer_div_item">
          <span class="footer_span_title"> {{ $t("replenish.footer.Enterprise") }} </span>
          <a v-for="item in col5DataList" :href="item.link" target="_blank">
            <span class="footer_span_item"> {{ item.linkText }} </span>
          </a>
        </div> -->
        <!--第六列-->
        <div class="footer_div_item" @click="toggleShow(3)">
          <span class="footer_span_title"> {{ $t("replenish.footer.BuyCrypto") }} </span>
          <transition name="footerbox-fade" :class="{ expand: mofooterFlag[3] }">
            <div v-show="mofooterFlag[3]" class="footer_div_option">
              <a v-for="item in col6DataList" :href="item.link" target="_blank">
                <span class="footer_span_item"> {{ item.linkText }} </span>
              </a>
            </div>
          </transition>
        </div>
      </div>
      <div class="m-bottom">
        <img class="logo dark-show" :src="sparkbit" />
        <img class="logo light-show" :src="sparkbit_1" />
        <div class="m-relation">
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M16.7695 3.24613C16.5528 3.25569 16.3509 3.31882 16.1732 3.39067C16.0067 3.45764 15.3705 3.73049 14.3685 4.1602C13.3656 4.59028 12.0377 5.1604 10.6211 5.76957C7.78798 6.98791 4.60281 8.35933 2.97135 9.06124C2.91001 9.08762 2.69595 9.15601 2.46875 9.33337C2.24155 9.51074 2 9.87827 2 10.2878C2 10.618 2.15738 10.9461 2.35547 11.142C2.55356 11.3378 2.76316 11.4346 2.94271 11.5079C3.59415 11.7737 5.61457 12.6005 5.99609 12.7566C6.13036 13.1679 6.86166 15.4049 7.03125 15.9532C7.14305 16.315 7.24947 16.5416 7.38802 16.7214C7.4573 16.8113 7.53783 16.8901 7.63542 16.9519C7.67442 16.9765 7.71719 16.9956 7.76042 17.0131L7.76302 17.0144C7.77298 17.0184 7.78157 17.0252 7.79167 17.0287C7.81072 17.0354 7.82347 17.0362 7.84896 17.0417C7.95051 17.0745 8.05303 17.0951 8.14453 17.0951C8.53464 17.0951 8.77344 16.8802 8.77344 16.8802L8.78776 16.8698L10.7943 15.1342L13.2279 17.4362C13.2621 17.4847 13.5817 17.9232 14.2865 17.9232C14.7049 17.9232 15.0369 17.7132 15.25 17.4896C15.4631 17.266 15.5959 17.0311 15.6523 16.7357V16.7344C15.7051 16.4553 17.9479 4.94145 17.9479 4.94145L17.944 4.95707C18.0097 4.6574 18.0269 4.37831 17.9544 4.10291C17.882 3.8275 17.6911 3.56381 17.4544 3.42192C17.2178 3.28005 16.9862 3.23657 16.7695 3.24613ZM16.6445 4.63936C16.6413 4.65882 16.6469 4.64904 16.6419 4.67192L16.6406 4.67973L16.6393 4.68754C16.6393 4.68754 14.4243 16.0541 14.3424 16.487C14.3484 16.4543 14.3211 16.5193 14.293 16.5586C14.2533 16.5313 14.1719 16.4961 14.1719 16.4961L14.1589 16.4818L10.8346 13.3373L8.48438 15.3685L9.18359 12.5691C9.18359 12.5691 13.5544 8.04462 13.8177 7.78129C14.0297 7.57062 14.0742 7.49719 14.0742 7.42452C14.0742 7.32719 14.0235 7.25655 13.9102 7.25655C13.8082 7.25655 13.671 7.35572 13.5977 7.40238C12.6423 8.01141 8.44788 10.456 6.56771 11.5495C6.26892 11.4272 4.19311 10.5775 3.48958 10.2904C3.49491 10.2881 3.49316 10.2889 3.4987 10.2865C5.13058 9.58441 8.31442 8.213 11.1471 6.99483C12.5635 6.38575 13.8924 5.81519 14.8945 5.38546C15.8812 4.96234 16.5668 4.67114 16.6445 4.63936Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M16.7695 3.24613C16.5528 3.25569 16.3509 3.31882 16.1732 3.39067C16.0067 3.45764 15.3705 3.73049 14.3685 4.1602C13.3656 4.59028 12.0377 5.1604 10.6211 5.76957C7.78798 6.98791 4.60281 8.35933 2.97135 9.06124C2.91001 9.08762 2.69595 9.15601 2.46875 9.33337C2.24155 9.51074 2 9.87827 2 10.2878C2 10.618 2.15738 10.9461 2.35547 11.142C2.55356 11.3378 2.76316 11.4346 2.94271 11.5079C3.59415 11.7737 5.61457 12.6005 5.99609 12.7566C6.13036 13.1679 6.86166 15.4049 7.03125 15.9532C7.14305 16.315 7.24947 16.5416 7.38802 16.7214C7.4573 16.8113 7.53783 16.8901 7.63542 16.9519C7.67442 16.9765 7.71719 16.9956 7.76042 17.0131L7.76302 17.0144C7.77298 17.0184 7.78157 17.0252 7.79167 17.0287C7.81072 17.0354 7.82347 17.0362 7.84896 17.0417C7.95051 17.0745 8.05303 17.0951 8.14453 17.0951C8.53464 17.0951 8.77344 16.8802 8.77344 16.8802L8.78776 16.8698L10.7943 15.1342L13.2279 17.4362C13.2621 17.4847 13.5817 17.9232 14.2865 17.9232C14.7049 17.9232 15.0369 17.7132 15.25 17.4896C15.4631 17.266 15.5959 17.0311 15.6523 16.7357V16.7344C15.7051 16.4553 17.9479 4.94145 17.9479 4.94145L17.944 4.95707C18.0097 4.6574 18.0269 4.37831 17.9544 4.10291C17.882 3.8275 17.6911 3.56381 17.4544 3.42192C17.2178 3.28005 16.9862 3.23657 16.7695 3.24613ZM16.6445 4.63936C16.6413 4.65882 16.6469 4.64904 16.6419 4.67192L16.6406 4.67973L16.6393 4.68754C16.6393 4.68754 14.4243 16.0541 14.3424 16.487C14.3484 16.4543 14.3211 16.5193 14.293 16.5586C14.2533 16.5313 14.1719 16.4961 14.1719 16.4961L14.1589 16.4818L10.8346 13.3373L8.48438 15.3685L9.18359 12.5691C9.18359 12.5691 13.5544 8.04462 13.8177 7.78129C14.0297 7.57062 14.0742 7.49719 14.0742 7.42452C14.0742 7.32719 14.0235 7.25655 13.9102 7.25655C13.8082 7.25655 13.671 7.35572 13.5977 7.40238C12.6423 8.01141 8.44788 10.456 6.56771 11.5495C6.26892 11.4272 4.19311 10.5775 3.48958 10.2904C3.49491 10.2881 3.49316 10.2889 3.4987 10.2865C5.13058 9.58441 8.31442 8.213 11.1471 6.99483C12.5635 6.38575 13.8924 5.81519 14.8945 5.38546C15.8812 4.96234 16.5668 4.67114 16.6445 4.63936Z"
                fill="#222222"
              />
            </svg>
          </a>
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M16.746 5.2204C15.13 3.92173 12.5747 3.70173 12.4667 3.6924C12.296 3.67773 12.134 3.7744 12.064 3.9304C12.0613 3.93573 11.9187 4.34973 11.7807 4.74906C13.6587 5.07773 14.9347 5.80706 15.0027 5.84706C15.3213 6.0324 15.428 6.44106 15.242 6.75906C15.1187 6.97106 14.8953 7.08973 14.666 7.08973C14.552 7.08973 14.4373 7.06106 14.332 6.99973C14.3133 6.9884 12.4413 5.92306 10.0007 5.92306C7.55935 5.92306 5.68668 6.98906 5.66802 6.99973C5.35002 7.1844 4.94202 7.07573 4.75735 6.75706C4.57268 6.43973 4.68002 6.0324 4.99735 5.84706C5.06535 5.80706 6.34602 5.07506 8.22935 4.74706C8.08402 4.34306 7.93735 3.93573 7.93468 3.9304C7.86468 3.77373 7.70268 3.67506 7.53201 3.6924C7.42402 3.70106 4.86868 3.92106 3.23135 5.23773C2.37535 6.0284 0.666016 10.6511 0.666016 14.6477C0.666016 14.7184 0.684016 14.7871 0.719349 14.8484C1.90002 16.9217 5.11868 17.4644 5.85202 17.4877C5.85668 17.4884 5.86068 17.4884 5.86468 17.4884C5.99402 17.4884 6.11602 17.4264 6.19268 17.3217L6.98601 16.2471C5.24602 15.8277 4.32602 15.1684 4.27068 15.1277C3.97468 14.9097 3.91068 14.4924 4.12868 14.1957C4.34602 13.9004 4.76202 13.8351 5.05802 14.0517C5.08268 14.0677 6.78068 15.2564 9.99935 15.2564C13.2307 15.2564 14.924 14.0631 14.9407 14.0511C15.2367 13.8364 15.654 13.9011 15.8707 14.1984C16.0867 14.4944 16.024 14.9091 15.7293 15.1264C15.674 15.1671 14.7587 15.8251 13.0227 16.2444L13.806 17.3211C13.8827 17.4264 14.0047 17.4877 14.134 17.4877C14.1387 17.4877 14.1427 17.4877 14.1467 17.4871C14.8807 17.4637 18.0993 16.9211 19.2793 14.8477C19.3147 14.7864 19.3327 14.7177 19.3327 14.6471C19.3327 10.6511 17.6233 6.0284 16.746 5.2204ZM7.33268 13.2564C6.59602 13.2564 5.99935 12.5104 5.99935 11.5897C5.99935 10.6691 6.59602 9.92306 7.33268 9.92306C8.06935 9.92306 8.66602 10.6691 8.66602 11.5897C8.66602 12.5104 8.06935 13.2564 7.33268 13.2564ZM12.666 13.2564C11.9293 13.2564 11.3327 12.5104 11.3327 11.5897C11.3327 10.6691 11.9293 9.92306 12.666 9.92306C13.4027 9.92306 13.9993 10.6691 13.9993 11.5897C13.9993 12.5104 13.4027 13.2564 12.666 13.2564Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M16.746 5.2204C15.13 3.92173 12.5747 3.70173 12.4667 3.6924C12.296 3.67773 12.134 3.7744 12.064 3.9304C12.0613 3.93573 11.9187 4.34973 11.7807 4.74906C13.6587 5.07773 14.9347 5.80706 15.0027 5.84706C15.3213 6.0324 15.428 6.44106 15.242 6.75906C15.1187 6.97106 14.8953 7.08973 14.666 7.08973C14.552 7.08973 14.4373 7.06106 14.332 6.99973C14.3133 6.9884 12.4413 5.92306 10.0007 5.92306C7.55935 5.92306 5.68668 6.98906 5.66802 6.99973C5.35002 7.1844 4.94202 7.07573 4.75735 6.75706C4.57268 6.43973 4.68002 6.0324 4.99735 5.84706C5.06535 5.80706 6.34602 5.07506 8.22935 4.74706C8.08402 4.34306 7.93735 3.93573 7.93468 3.9304C7.86468 3.77373 7.70268 3.67506 7.53201 3.6924C7.42402 3.70106 4.86868 3.92106 3.23135 5.23773C2.37535 6.0284 0.666016 10.6511 0.666016 14.6477C0.666016 14.7184 0.684016 14.7871 0.719349 14.8484C1.90002 16.9217 5.11868 17.4644 5.85202 17.4877C5.85668 17.4884 5.86068 17.4884 5.86468 17.4884C5.99402 17.4884 6.11602 17.4264 6.19268 17.3217L6.98601 16.2471C5.24602 15.8277 4.32602 15.1684 4.27068 15.1277C3.97468 14.9097 3.91068 14.4924 4.12868 14.1957C4.34602 13.9004 4.76202 13.8351 5.05802 14.0517C5.08268 14.0677 6.78068 15.2564 9.99935 15.2564C13.2307 15.2564 14.924 14.0631 14.9407 14.0511C15.2367 13.8364 15.654 13.9011 15.8707 14.1984C16.0867 14.4944 16.024 14.9091 15.7293 15.1264C15.674 15.1671 14.7587 15.8251 13.0227 16.2444L13.806 17.3211C13.8827 17.4264 14.0047 17.4877 14.134 17.4877C14.1387 17.4877 14.1427 17.4877 14.1467 17.4871C14.8807 17.4637 18.0993 16.9211 19.2793 14.8477C19.3147 14.7864 19.3327 14.7177 19.3327 14.6471C19.3327 10.6511 17.6233 6.0284 16.746 5.2204ZM7.33268 13.2564C6.59602 13.2564 5.99935 12.5104 5.99935 11.5897C5.99935 10.6691 6.59602 9.92306 7.33268 9.92306C8.06935 9.92306 8.66602 10.6691 8.66602 11.5897C8.66602 12.5104 8.06935 13.2564 7.33268 13.2564ZM12.666 13.2564C11.9293 13.2564 11.3327 12.5104 11.3327 11.5897C11.3327 10.6691 11.9293 9.92306 12.666 9.92306C13.4027 9.92306 13.9993 10.6691 13.9993 11.5897C13.9993 12.5104 13.4027 13.2564 12.666 13.2564Z"
                fill="#222222"
              />
            </svg>
          </a>
          <a class="item" href="/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                class="dark-show"
                d="M17.5793 17.9233L11.7159 9.37526L11.7259 9.38326L17.0126 3.25659H15.2459L10.9393 8.24326L7.51927 3.25659H2.88594L8.35994 11.2373L8.35927 11.2366L2.58594 17.9233H4.3526L9.1406 12.3753L12.9459 17.9233H17.5793ZM6.81927 4.58993L15.0459 16.5899H13.6459L5.4126 4.58993H6.81927Z"
                fill="white"
              />
              <path
                class="light-show"
                d="M17.5793 17.9233L11.7159 9.37526L11.7259 9.38326L17.0126 3.25659H15.2459L10.9393 8.24326L7.51927 3.25659H2.88594L8.35994 11.2373L8.35927 11.2366L2.58594 17.9233H4.3526L9.1406 12.3753L12.9459 17.9233H17.5793ZM6.81927 4.58993L15.0459 16.5899H13.6459L5.4126 4.58993H6.81927Z"
                fill="#222222"
              />
            </svg>
          </a>
        </div>
        <div
          class="copy2 z-2-cl"
          style="border-color: rgba(146, 146, 146, 1) !important; color: rgba(146, 146, 146, 1)"
          v-if="footerTemplateReceived"
        >
          Copyright © {{ new Date().getFullYear() }} {{ companyName }}. All rights reserved
        </div>
      </div>
    </section>

    <!--<iframe-->
    <!--  src="https://www.googletagmanager.com/ns.html?id=GTM-PXQDBGB"-->
    <!--  height="0"-->
    <!--  width="0"-->
    <!--  style="display: none; visibility: hidden"-->
    <!--&gt;</iframe>-->
  </div>
</template>

<script>
import mixin from "../../common-mixin/modules/footer/footer";
import "../../common-mixin/modules/footer/footer.styl";
import { imgMap } from "@/utils";
import { mapGetters } from "vuex";

export default {
  name: "c-footer",
  mixins: [mixin],
  created() {
    // this.getData();
  },
  data() {
    return {
      logo: imgMap.logo2,
      icon: {
        telegram: imgMap.icon_telegram,
        twitter: imgMap.icon_twitter,
        discord: imgMap.icon_discord,
        medium: imgMap.icon_medium,
        youtube: imgMap.icon_youtube,
      },
      sparkbit: imgMap.sparkbit,
      sparkbit_1: imgMap.sparkbit_1,
      imgMap: {
        logo: imgMap.spark_logo,
      },
      mofooterFlag: [false, false, false, false, false],
    };
  },
  computed: {
    apiDocument() {
      return this.$store.state.systemConfig.apiDocument;
    },
    exUrl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.exUrl;
      }
      return "";
    },
    coUrl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.coUrl;
      }
      return "";
    },
    otcUrl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url.otcUrl;
      }
      return "";
    },
    serverEmail() {
      return this.$store.state.systemConfig.serverEmail;
    },
    logoUrl() {
      let url = "";
      if (this.publicInfo && this.publicInfo.msg && this.publicInfo.msg.logoUrl) {
        url = this.publicInfo.msg.logoUrl || imgMap.logo3;
      }
      return url;
    },
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    lang() {
      return this.$store.state.baseData.lan;
    },
    col1DataList() {
      const { exUrl, lang } = this;
      const lanTxtList = [
        this.$t("home.footer.privacy"),
        this.$t("home.footer.agreement"),
        this.$t("replenish.footer.LegalNotice"),
        this.$t("replenish.footer.BrandToolkit"),
      ];
      const linkList = [
        `${exUrl}/${lang}/cms/privacy`,
        `${exUrl}/${lang}/cms/agreement`,
        `${exUrl}/${lang}/cms/disclaimer`,
        "https://oss.sparkbit.io/common/download/Brandkit.zip",
      ];
      const list = [];
      for (let i = 0; i < 4; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },
    col2DataList() {
      const { exUrl, lang } = this;
      const lanTxtList = [
        this.$t("replenish.footer.Spot"),
        this.$t("header.co"),
        this.$t("replenish.footer.API"),
        this.$t("replenish.footer.Bitcoinprice"),
        this.$t("replenish.footer.Ethereumprice"),
      ];
      const linkList = [
        `${exUrl}/${lang}/trade`,
        `${this.coUrl}/${lang}/trade`,
        this.apiDocument,
        `${exUrl}/${lang}/market`,
        `${exUrl}/${lang}/market`,
      ];
      const list = [];
      for (let i = 0; i < 5; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },
    // 将本地 lang（如 zh_CN、en_US）映射为客服支持站需要的简写（如 zh、en）
    supportLangShort() {
      const full = this.lang || "";
      const map = {
        zh_CN: "zh-cn",
        en_US: "en-001",
        ru_RU: "ru",
        vi_VN: "vi",
        ko_KR: "ko",
        es_ES: "es",
        ja_JP: "ja",
        el_GR: "zh-hk",
      };
      if (map[full]) return map[full];
      // 兜底 en
      return "en-001";
    },
    col3DataList() {
      const { exUrl, lang } = this;
      const lanTxtList = [
        this.$t("header.appDownLoad"),
        this.$t("replenish.footer.customerService"),
        this.$t("pageTitle.cms"),
        this.$t("replenish.footer.busApplication"),
        this.$t("replenish.footer.otc"),
        this.$t("korea.noticeInfo"),
      ];
      const linkList = [
        `${exUrl}/${lang}/appDownload`,
        "",
        `https://support.sparkbit.io/hc/${this.supportLangShort}`,
        exUrl,
        exUrl,
        `${exUrl}/${lang}/noticeInfo`,
      ];
      const list = [];
      for (let i = 0; i < 6; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },

    col4DataList() {
      const { exUrl } = this;
      const lanTxtList = [
        this.$t("replenish.footer.APIDOCS"),
        this.$t("replenish.footer.Feerates"),
        this.$t("replenish.footer.UserSupport"),
        this.$t("replenish.footer.Blog"),
        this.$t("replenish.footer.Official"),
        this.$t("replenish.footer.CryptoAffiliates"),
      ];
      const linkList = [exUrl, exUrl, exUrl, exUrl, exUrl, exUrl];
      const list = [];
      for (let i = 0; i < 6; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },
    col5DataList() {
      const { exUrl } = this;
      const lanTxtList = [
        this.$t("replenish.footer.Business"),
        this.$t("replenish.footer.Announcement"),
      ];
      const linkList = [exUrl, exUrl];
      const list = [];
      for (let i = 0; i < 2; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },
    col6DataList() {
      const { exUrl, lang } = this;
      const lanTxtList = [
        this.$t("replenish.footer.BuyBTC"),
        this.$t("replenish.footer.BuyETH"),
        this.$t("replenish.footer.BuyBNB"),
        this.$t("replenish.footer.BuySOL"),
      ];
      const linkList = [
        `${exUrl}/${lang}/trade/BTC_USDT`,
        `${exUrl}/${lang}/trade/ETH_USDT`,
        `${exUrl}/${lang}/trade/BNB_USDT`,
        `${exUrl}/${lang}/trade/SOL_USDT`,
      ];
      const list = [];
      for (let i = 0; i < 4; i++) {
        const temp = {
          link: "",
          linkText: "",
          linkType: 1,
        };
        temp.linkText = lanTxtList[i];
        temp.link = linkList[i];
        list.push(temp);
      }
      return list;
    },
    appDownload() {
      return this.$store.state.baseData.app_download || "";
    },
  },
  mounted() {},
  methods: {
    openZE() {
      window.zE("messenger", "open");
    },
    // 复制文案
    copyText(text) {
      // 创建一个textarea元素
      const textarea = document.createElement("textarea");
      // 将需要复制的文本赋值给textarea元素的value属性
      textarea.value = text;
      // 将textarea元素添加到当前页面中
      document.body.appendChild(textarea);
      // 选中textarea元素中的文本
      textarea.select();
      // 执行浏览器复制命令
      document.execCommand("copy");
      // 删除textarea元素
      document.body.removeChild(textarea);
    },
    embedded_script() {
      const recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute("src", "https://www.livecoinwatch.com/static/lcw-widget.js");
      document.head.appendChild(recaptchaScript);

      const recaptchaScript_googletagmanager = document.createElement("script");
      recaptchaScript_googletagmanager.setAttribute(
        "src",
        "https://www.googletagmanager.com/gtag/js?id=G-ZFJB3K7WDD"
      );
      document.head.appendChild(recaptchaScript_googletagmanager);

      // const recaptchaScript_zendesk = document.createElement("script");
      // recaptchaScript_zendesk.setAttribute("id", "ze-snippet");
      // recaptchaScript_zendesk.setAttribute(
      //   "src",
      //   "https://static.zdassets.com/ekr/snippet.js?key=806c4ec0-fe89-4821-8f85-7d765eafc4cd"
      // );
      // document.head.appendChild(recaptchaScript_zendesk);

      // window.intercomSettings = {
      //   api_base: "https://api-iam.intercom.io",
      //   app_id: "hgs7jbgw"
      // };
      // let recaptchaScript_zendesk = document.createElement("script");
      // recaptchaScript_zendesk.textContent = `
      //   // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/hgs7jbgw'
      //   (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hgs7jbgw';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      // `;
      // document.head.appendChild(recaptchaScript_zendesk);
    },
    toggleShow(index) {
      this.mofooterFlag.splice(index, 1, !this.mofooterFlag[index]);
    },
  },
};
</script>

<style>
.footer_div_item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 184px;
}
.footer_div_item:last-child {
  width: auto;
  max-width: 184px;
}
.footer_span_title {
  color: var(--color-text-primary);
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px;
}
.footer_input input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(146, 146, 146, 1);
}
.footer_span_item {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
}
.footer_span_item:hover {
  color: var(--color-text-primary);
}
.footer_span_item.small {
  font-size: 12px;
  color: #7f7f7f;
}
</style>
<style scoped>
.m-linkBox {
  display: flex;
  justify-content: space-between;
}
.m-logoGrid {
  width: 1440px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 70px;
}
.m-logoGrid > a {
  width: 180px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 40px;
}
.m-logoGrid > a.empty {
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}
.m-logoGrid > a:nth-child(even) {
  background: rgba(255, 255, 255, 0.1);
}
.m-logoGrid > a > img {
  width: 100%;
}

.footer-box .copy2 {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}

.m-relation {
  display: flex;
  align-items: center;
  gap: 16px;
}
.m-relation > .item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-Toggle);
}

.m-relation > .item:hover {
  background: var(--color-BG-Light);
}
.m-relation > .item > img {
  width: 100%;
  height: 100%;
}
.footer-box {
  background: var(--color-BG);
  margin-top: 0;
  border-top: 1px solid var(--color-Divider);
}
.footer-box section {
  width: 82.39vw;
  margin-inline: auto;
}
.footer-box .m-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  margin-top: 40px;
}
.footer-box .m-bottom > .logo {
  width: 130px;
  height: 28px;
}
@keyframes drop-in {
  0% {
    height: 0;
    opacity: 0;
  }
  90% {
    height: min-content;
    opacity: 1;
    padding-bottom: 10px;
  }
  100% {
    height: min-content;
    opacity: 1;
    padding-bottom: 0px;
  }
}
.footerbox-fade-enter-active {
  transform-origin: center top;
  animation: drop-in 0.4s ease;
}
.footerbox-fade-leave-active {
  transform-origin: center top;
  animation: drop-in 0.4s reverse ease;
}
/* .footerbox-fade-enter, .footerbox-fade-leave-to {
  transform: translateY(-100%);
} */
.mo-footer {
  display: none;
}
</style>
<style lang="stylus" scoped>
@media (min-width: 810px) and (max-width: 1439.98px) {
  .footer-box {
    box-sizing: border-box;
    padding: 64px 40px 28px;
    section {
      width: 100%;
    }
  }
}
@media (max-width: 809.98px) {
  .pc-footer {
    display: none;
  }
  .mo-footer {
    display: block;
  }
  .footer-box {
    padding: 40px 24px 20px;
    box-sizing: border-box;
    section {
      width: 100%;
      margin: 0;
    }
    .m_list{
      .footer_div_item {
        width: 100%;
        height: min-content;
        padding: 8px 0;
        display: flex;
        overflow: hidden;
        gap: 7px;
      }
      .footer_span_title {
        width: 100%;
        height: 44px;
        display: flex;
        font-size: 20px;
        font-weight: 700;
        line-height: 44px;
        //color: var(--color-text-primary);
        color: #ffffff;
        position: relative;
        &::after {
          position: absolute;
          top: 21px;
          right: 5px;
          margin-left: auto;
          content: '';
          display: block;
          width: 14px;
          height: 2px;
          //background: var(--color-text-primary);
          background: #ffffff;
        }
        &::before {
          position: absolute;
          top: 15px;
          right: 11px;
          margin-left: auto;
          content: '';
          display: block;
          width: 2px;
          height: 14px;
          //background: var(--color-text-primary);
          background: #ffffff;
        }
        &.expand::before {
          display: none;
        }
      }
      .footer_div_option {
        display: flex;
        flex-direction: column;
        gap: 7px;
        overflow: hidden;
      }
      .footer_div_option div, .footer_div_option a, .footer_div_option span {
        display: block;
        height: 40px;
        min-height: 40px;
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      .active-lan .footer_span_item {
        color: var(--color-BTN-primary);
      }
    }
    .m-bottom {
      height: auto;
      flex-direction: column;
      gap: 32px;
      margin-top: 60px;
      .logo {
        width: 147px;
        height: 32px;
      }
      .copy2 {
        font-weight: 500;
        text-align: center;
      }
    }
  }
}
.home-footer.footer-box {
  background: #000000;
  border-top: 1px solid #1a1a1a;
  .footer_span_title {
    color: #ffffff;
  }
  .footer_span_item {
    color: #999999;
    &:hover {
      color: #ffffff;
    }
  }
  .copy2 {
    color: #999999;
  }
  .m-relation > .item {
    border: 1px solid #333333;
    &:hover {
      background: #121212;
    }
  }
  .dark-show {
    display: block;
  }
  .light-show {
    display: none;
  }
}
</style>
