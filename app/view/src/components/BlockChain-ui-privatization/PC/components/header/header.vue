<!-- // Created by 任泽阳 on 18/12/05.// 头部组件 -->
<template>
  <!-- 改，2022.10.01，新增style -->
  <header
    ref="commonHeader"
    class="common-header h-3-bd x-2-cl"
    @mouseout="handMouseleave('')"
    :class="`
      ${navigationType === '1' ? 'top-common-header' : 'left-common-header'}
      ${windowTop ? 'scroll-header' : ''}
    `"
    :data-aos="router === 'home' ? 'fade-down' : ''" :data-aos-delay="router === 'home' ? 1000 : 0"
    style="position: fixed; background-color: #000"
  >
    <!-- PC -->
    <div class="common-header-wrap">
      <!-- 中国版 -->
      <i v-if="!logoUrl"></i>
      <template v-if="navigationType === '1' && headerTemplateReceived">
        <!-- 主流板块 -->
        <ul class="common-header-linkList">
          <!-- logo -->
          <li class="linkList-logo-li">
            <a class="linkList-logo" @click="btnHref(headerLink.home)">
              <img class="normal" :src="imgMap.logo" />
              <img class="light" :src="imgMap.logo_d" />
            </a>
          </li>
          <li class="header-nav-ifl" v-if="subNavisShow && false">
            <svg
              class="svgIcon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0H5.04V5.04H0V0ZM0 6.48H5.04V11.52H0V6.48ZM5.04 12.96H0V18H5.04V12.96ZM6.48 0H11.52V5.04H6.48V0ZM11.52 6.48H6.48V11.52H11.52V6.48ZM6.48 12.96H11.52V18H6.48V12.96ZM18 0H12.96V5.04H18V0ZM12.96 6.48H18V11.52H12.96V6.48ZM18 12.96H12.96V18H18V12.96Z"
              />
            </svg>
            <svg
              class="svgIcon2"
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.36029 4.62558C4.16359 4.82999 3.83641 4.82999 3.63971 4.62558L0.484598 1.34669C0.178938 1.02904 0.404057 0.5 0.844886 0.5L7.15511 0.5C7.59594 0.5 7.82106 1.02904 7.5154 1.34669L4.36029 4.62558Z"
              />
            </svg>
            <!--菜单弹窗-->
            <div class="drawer">
              <template v-for="item in systemMenu">
                <a
                  v-if="item.link.includes('https') || item.link.includes('http')"
                  class="item"
                  target="_blank"
                  :href="item.link"
                >
                  <div class="icon">
                    <img :src="item.icon" />
                  </div>
                  <div class="name">{{ item.title }}</div>
                  <div class="subTxt" v-if="item.subTitle">{{ item.subTitle }}</div>
                </a>
                <div v-else class="item" @click="linkTo(item.link)">
                  <div class="icon">
                    <img :src="item.icon" />
                  </div>
                  <div class="name">{{ item.title }}</div>
                  <div class="subTxt" v-if="item.subTitle">
                    {{ item.subTitle }}
                  </div>
                </div>
              </template>
            </div>
          </li>
          <!--改，2022.11.28 新增showSubMenu字段，存在二级不直接跳转-->
          <li
            v-for="(item, index) in tradesList"
            :key="index"
            class="header-navEven test"
            :ref="item.activeId"
            :class="getClass(item.activeId)"
            @mouseenter="evenHandMouseenter(item.activeId)"
            @mouseleave="evenHandMouseleave"
            @click="
              btnHref(item.link, false, {
                trades: true,
                id: item.activeId,
                showSubMenu: item.selectList && item.selectList.length,
              })
            "
          >
            <a :href="item.link">{{ item.title }}</a>
            <!--改，2022.11.28 新增二级菜单展示-->
            <!-- <svg
              class="icon m-subMenuIcon"
              style="font-size: 8px"
              aria-hidden="true"
              :class="{ up: hoverHeader == item.activeId }"
              v-if="item.selectList && item.selectList.length"
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.39714 5.08317L0.230469 0.916504H8.5638L4.39714 5.08317Z" fill="white" />
            </svg>
  
            <div
              class="m-subMenu"
              :class="{ show: hoverHeader == item.activeId }"
              v-if="item.selectList && item.selectList.length"
            >
              <div
                class="item"
                v-for="subItem in item.selectList"
                @click.stop="
                  btnHref(subItem.link, false, {
                    trades: true,
                    id: subItem.activeId,
                  })
                "
              >
                <div class="icon2" v-html="subItem.icon"></div>
                <div class="title">{{ subItem.title }}</div>
                <div class="subtxt" v-if="subItem.subtxt">{{ subItem.subtxt }}</div>
              </div>
            </div> -->
          </li>
          <!--  自定义导航 -->
          <!-- <template v-if="headerTemplate.length">
            <li
              class="header-navEven"
              :key="'info' + index"
              v-for="(item, index) in headerTemplate"
              :class="getClass(item.activeId)"
              @mouseenter="evenHandMouseenter(item.activeId)"
              @mouseleave="evenHandMouseleave"
              @click="btnHref(item.link, item.target)"
            >
              {{ item.text }}
              <div v-if="item.new" class="new-label x-3-cl h-5-bg">NEW</div>
            </li>
          </template> -->
        </ul>
        <!-- 公共版款 -->
        <div class="common-header-optionList">
          <!-- 未登录时 -->
          <div class="header-guide h-2-bd" v-if="!isLogin && userInfoIsReady">
            <c-button
              type="text"
              :kind="true"
              paddingW="22px"
              height="40px"
              @click="btnLink('/login')"
              class="header-login-button"
            >
              <!-- 登录 -->
              {{ $t("header.login") }}
            </c-button>
            <!-- 改，2022.08.17，style -->
            <c-button
              class="header-reg-button"
              height="40px"
              :big="true"
              @click="btnLink('/register')"
              style="color: rgba(34, 106, 253, 1); border-color: rgba(34, 106, 253, 1)"
            >
              <!-- 注册 -->
              {{ $t("header.register") }}
            </c-button>
          </div>
          <div class="header-isLogin" v-if="isLogin && userInfoIsReady">
            <!-- 订单 -->
            <div
              class="header-isLogin-navEven"
              :class="getClass('assets')"
              @mouseenter="evenHandMouseenter('assets')"
              @mouseleave="evenHandMouseleave"
            >
              <div class="header-isLogin-navEven-title" @click="btnLink('/order/exchangeOrder')">
                <!--{{ $t("header.assets") }}-->
                <div class="messageCount otc-order" v-if="hasUnreadOtcOrder"></div>
                <span>{{ $t("header.order") }}</span>
                <svg
                  style="font-size: 8px"
                  aria-hidden="true"
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.39714 5.08317L0.230469 0.916504H8.5638L4.39714 5.08317Z"
                    fill="white"
                  />
                </svg>
              </div>
              <!-- 改，2022.11.06，新增style -->
              <ul class="lang-list h-1-bg" style="width: 200px">
                <!--  || activeMark === item.link -->
                <li
                  v-for="(item, index) in orderList"
                  class="b-2-cl"
                  :class="hoverMark === item.link ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="markMouseenter(item.link)"
                  @mouseleave="markMouseleave"
                  @click="btnLink(item.link)"
                  :key="index"
                  style="font-size: 16px"
                >
                  <a :href="item.link">{{ item.title }}</a>
                  <div
                    v-if="item.title === $t('order.index.otcOrder') && hasUnreadOtcOrder"
                    class="messageCount otc-order-list"
                  ></div>
                </li>
              </ul>
            </div>
            <!-- 资产 -->
            <div
              class="header-isLogin-navEven"
              :class="getClass('order')"
              @mouseenter="evenHandMouseenter('order')"
              @mouseleave="evenHandMouseleave"
            >
              <div class="header-isLogin-navEven-title" @click="btnLink('/assets/exchangeAccount')">
                <span>{{ langTxt.txt3 }}</span>
                <svg
                  style="font-size: 8px"
                  aria-hidden="true"
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.39714 5.08317L0.230469 0.916504H8.5638L4.39714 5.08317Z"
                    fill="white"
                  />
                </svg>
              </div>
              <!-- 改，2022.11.06，新增style -->
              <ul class="lang-list h-1-bg" style="width: 200px">
                <!--  || activeMark === item.link -->
                <li
                  v-for="(item, index) in assetsList"
                  class="b-2-cl"
                  :class="hoverMark === item.link ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="markMouseenter(item.link)"
                  @mouseleave="markMouseleave"
                  @click="btnLink(item.link)"
                  :key="index"
                  style="font-size: 16px"
                >
                  <a :href="item.link">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 个人中心 -->
          <div class="header-user h-2-bd" v-if="isLogin && userInfoIsReady">
            <div
              @click="btnLink('/personal/userManagement')"
              class="header-user-icon icon-info user-box"
            >
              <img :src="headImg" />
            </div>
            <div
              @click="btnLink('/personal/userManagement')"
              class="header-user-icon icon-active user-box"
            >
              <img :src="headImg" />
            </div>
            <!-- <div class="arrows">
              <svg
                style="font-size: 8px"
                aria-hidden="true"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.9987 5.08317L0.832031 0.916504H9.16536L4.9987 5.08317Z" fill="white" />
              </svg>
            </div> -->

            <div class="header-user-market h-1-bg">
              <ul class="header-user-text">
                <li class="x-3-cl userText" @click="btnLink('/personal/userManagement')">
                  {{ userText }}
                </li>
                <li class="x-2-cl userStatus">
                  <!-- 账户状态 -->
                  {{ $t("header.userStatus") }}：{{ userStatus }}
                </li>
              </ul>
              <ul class="lang-list m-userMenu h-1-bg">
                <!--  || activeMark === item.link -->
                <li
                  v-for="(item, index) in userMenu"
                  class="menuItem x-2-cl"
                  @mouseenter="markMouseenter(item.link)"
                  @mouseleave="markMouseleave"
                  @click="btnLink(item.link)"
                  :key="index + 'order'"
                  style="font-size: 16px"
                >
                  {{ item.title }}
                </li>
              </ul>
              <div class="header-user-out" @click="out">
                <!-- 退出 -->
                {{ $t("header.out") }}
              </div>
            </div>
          </div>
          <hr class="b-line" />
          <!-- app下载 -->
          <div class="header-user h-2-bd">
            <div class="header-user-apphove" @click="btnLink('/appDownload')">
              <div class="header-user-icon icon-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                >
                  <path
                    d="M0 18.2676V16.2676H16V18.2676H0ZM8 14.2676L3 9.26758L4.4 7.86758L7 10.4676V0.267578H9V10.4676L11.6 7.86758L13 9.26758L8 14.2676Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div class="header-user-icon icon-active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                >
                  <path
                    d="M0 18.2676V16.2676H16V18.2676H0ZM8 14.2676L3 9.26758L4.4 7.86758L7 10.4676V0.267578H9V10.4676L11.6 7.86758L13 9.26758L8 14.2676Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div class="header-user-appdown h-1-bg">
              <div class="code-box">
                <div class="download-options-code">
                  <img :src="appDownload.app_page_url" alt="" />
                </div>
                <!-- 扫描二维码下载 -->
                <p class="download-options-codeText">
                  {{ $t("appDownLoad.headerCode") }}
                </p>
              </div>

              <div class="download-options-buttons">
                <c-button className="download-button" @click="download('ios')">
                  <svg class="icon icon-18" aria-hidden="true">
                    <use xlink:href="#icon-b_13"></use>
                  </svg>
                  &nbsp;
                  {{ $t("appDownLoad.platform")[0] }}
                </c-button>
                <c-button className="download-button" @click="download('android')">
                  <svg class="icon icon-18" aria-hidden="true">
                    <use xlink:href="#icon-b_14"></use>
                  </svg>
                  &nbsp;
                  {{ $t("appDownLoad.platform")[1] }}
                </c-button>
              </div>
            </div>
          </div>
          <!-- 消息中心 -->
          <div class="header-user h-2-bd" v-if="isLogin && userInfoIsReady">
            <div class="messageCount" v-if="messageCount"></div>
            <div @click="btnLink('/mesage')" class="header-user-icon icon-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path
                  d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
                  fill="white"
                />
              </svg>
            </div>
            <div @click="btnLink('/mesage')" class="header-user-icon icon-active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path
                  d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
                  fill="white"
                />
              </svg>
            </div>
            <div v-if="messageCount" class="header-user-message h-1-bg">
              <ul class="header-user-text">
                <li
                  class="x-2-cl mesageNav"
                  @click="btnLink('/mesage')"
                  :key="index"
                  v-for="(item, index) in userMessageList"
                >
                  <div class="message-icon">
                    <img class="dark-show" :src="imgMapAll[`msg${getIcon(item.messageType)}_1`]" />
                    <img class="light-show" :src="imgMapAll[`msg${getIcon(item.messageType)}_1`]" />
                  </div>
                  <span>{{ item.messageContent }}</span>
                </li>
                <!-- <li class="x-2-cl">账户状态：{{userStatus}}</li> -->
              </ul>
              <div class="header-user-out x-3-cl" @click="btnLink('/mesage')">
                <!-- 查看更多 -->
                {{ $t("header.more") }}
              </div>
            </div>
          </div>
          <!-- 设置 -->
          <!-- 改，2022.10.02，注释 -->
          <!-- <div class="header-user h-2-bd" v-if="colorList.length > 1">
            <div @click="setAlert" class="header-user-icon icon-info">
              <svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_2"></use>
              </svg>
            </div>
            <div @click="setAlert" class="header-user-icon icon-active">
              <svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_2_1"></use>
              </svg>
            </div>
          </div> -->
          <!-- 语言 -->
          <div class="h-2-bd header-lang x-2-cl">
            <div class="show-lang">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.2625 7.32083 0.7875 6.1125C1.3125 4.90417 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3833 0 12.6792 0.2625 13.8875 0.7875C15.0958 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90417 19.2125 6.1125C19.7375 7.32083 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0958 18.6875 13.8875 19.2125C12.6792 19.7375 11.3833 20 10 20ZM10 17.95C10.4333 17.35 10.8083 16.725 11.125 16.075C11.4417 15.425 11.7 14.7333 11.9 14H8.1C8.3 14.7333 8.55833 15.425 8.875 16.075C9.19167 16.725 9.56667 17.35 10 17.95ZM7.4 17.55C7.1 17 6.8375 16.4292 6.6125 15.8375C6.3875 15.2458 6.2 14.6333 6.05 14H3.1C3.58333 14.8333 4.1875 15.5583 4.9125 16.175C5.6375 16.7917 6.46667 17.25 7.4 17.55ZM12.6 17.55C13.5333 17.25 14.3625 16.7917 15.0875 16.175C15.8125 15.5583 16.4167 14.8333 16.9 14H13.95C13.8 14.6333 13.6125 15.2458 13.3875 15.8375C13.1625 16.4292 12.9 17 12.6 17.55ZM2.25 12H5.65C5.6 11.6667 5.5625 11.3375 5.5375 11.0125C5.5125 10.6875 5.5 10.35 5.5 10C5.5 9.65 5.5125 9.3125 5.5375 8.9875C5.5625 8.6625 5.6 8.33333 5.65 8H2.25C2.16667 8.33333 2.10417 8.6625 2.0625 8.9875C2.02083 9.3125 2 9.65 2 10C2 10.35 2.02083 10.6875 2.0625 11.0125C2.10417 11.3375 2.16667 11.6667 2.25 12ZM7.65 12H12.35C12.4 11.6667 12.4375 11.3375 12.4625 11.0125C12.4875 10.6875 12.5 10.35 12.5 10C12.5 9.65 12.4875 9.3125 12.4625 8.9875C12.4375 8.6625 12.4 8.33333 12.35 8H7.65C7.6 8.33333 7.5625 8.6625 7.5375 8.9875C7.5125 9.3125 7.5 9.65 7.5 10C7.5 10.35 7.5125 10.6875 7.5375 11.0125C7.5625 11.3375 7.6 11.6667 7.65 12ZM14.35 12H17.75C17.8333 11.6667 17.8958 11.3375 17.9375 11.0125C17.9792 10.6875 18 10.35 18 10C18 9.65 17.9792 9.3125 17.9375 8.9875C17.8958 8.6625 17.8333 8.33333 17.75 8H14.35C14.4 8.33333 14.4375 8.6625 14.4625 8.9875C14.4875 9.3125 14.5 9.65 14.5 10C14.5 10.35 14.4875 10.6875 14.4625 11.0125C14.4375 11.3375 14.4 11.6667 14.35 12ZM13.95 6H16.9C16.4167 5.16667 15.8125 4.44167 15.0875 3.825C14.3625 3.20833 13.5333 2.75 12.6 2.45C12.9 3 13.1625 3.57083 13.3875 4.1625C13.6125 4.75417 13.8 5.36667 13.95 6ZM8.1 6H11.9C11.7 5.26667 11.4417 4.575 11.125 3.925C10.8083 3.275 10.4333 2.65 10 2.05C9.56667 2.65 9.19167 3.275 8.875 3.925C8.55833 4.575 8.3 5.26667 8.1 6ZM3.1 6H6.05C6.2 5.36667 6.3875 4.75417 6.6125 4.1625C6.8375 3.57083 7.1 3 7.4 2.45C6.46667 2.75 5.6375 3.20833 4.9125 3.825C4.1875 4.44167 3.58333 5.16667 3.1 6Z"
                  fill="white"
                />
              </svg>
            </div>
            <!-- 改，2022.11.06，新增style -->
            <ul class="lang-list h-1-bg">
              <li
                v-for="(item, index) in langArr"
                :class="lan === item.id || langHover === item.id ? 'h-4-bg x-3-cl' : ''"
                @mouseenter="handMouseenter(item.id)"
                @mouseout="handMouseleave(item.id)"
                @click="lanClick(item.id)"
                :key="index"
                style="font-size: 16px"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="header-user h-2-bd dl-icon"
            style="display: flex; align-items: center; justify-content: center; cursor: pointer"
          >
            <img v-if="theme === 'light'" :src="imgMap.sun" @click="switchTheme('dark')" />
            <img v-if="theme === 'dark'" :src="imgMap.moon" @click="switchTheme('light')" />
          </div>
        </div>
      </template>

      <!-- 国际版 -->
      <template v-else-if="headerTemplateReceived">
        <!-- 主流板块 -->
        <ul class="int-header-linkList">
          <!-- logo -->
          <li @mouseover="handMouseenter('logo')" @mouseleave="handMouseleave('logo')">
            <a class="button-logo" @click="btnHref(headerLink.home)">
              <img :src="intLogoUrl" />
            </a>
          </li>
          <!-- 行情 -->
          <li
            v-if="publicInfo && publicInfo.switch.index_kline_switch === '1'"
            class="button-li"
            :class="langHover === 'market' || router === 'market' ? 'h-4-bg x-3-cl' : ''"
            @click="btnLink('/market')"
            @mouseover="handMouseenter('market')"
            @mouseleave="handMouseleave('market')"
          >
            <svg
              v-if="langHover === 'market' || router === 'market'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_30_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_30"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("header.market") }}
            </span>
          </li>
          <!-- 币币交易 -->
          <li
            v-if="headerLink.trade"
            class="button-li"
            :class="langHover === 'trade' || router === 'trade' ? 'h-4-bg x-3-cl' : ''"
            @click="btnHref(headerLink.trade)"
            @mouseover="handMouseenter('trade')"
            @mouseleave="handMouseleave('trade')"
            ref="bibiRef"
          >
            <svg
              v-if="langHover === 'trade' || router === 'trade'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_5_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_5"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("header.trade") }}
            </span>
          </li>
          <!-- 法币交易 -->
          <li
            v-if="headerLink.otc"
            class="button-li"
            :class="langHover === 'otc' || router === 'fiatdeal' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('otc')"
            @mouseleave="handMouseleave('otc')"
            @click="btnHref(headerLink.otc)"
          >
            <svg
              v-if="langHover === 'otc' || router === 'fiatdeal'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_6_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_6"></use>
            </svg>
            <span class="header-button-links">
              <!-- 一键买币 -->
              {{ $t("header.otc") }}
            </span>
          </li>
          <!-- 法币交易 -->
          <li
            v-if="!headerLink.otc && saasOtcFlowConfig"
            class="button-li"
            :class="langHover === 'otc' || router === 'fiatdeal' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('otc')"
            @mouseleave="handMouseleave('otc')"
            @click="btnHref('/mobility')"
          >
            <svg
              v-if="langHover === 'otc' || router === 'fiatdeal'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_6_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_6"></use>
            </svg>
            <span class="header-button-links">
              <!-- 一键买币 -->
              {{ $t("mobilityTrade.immediately") }}
            </span>
          </li>
          <!-- 合约交易 -->
          <li
            v-if="headerLink.co"
            class="button-li"
            :class="langHover === 'co' || router === 'cotrade' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('co')"
            @mouseleave="handMouseleave('co')"
            @click="btnHref(headerLink.co)"
          >
            <svg
              v-if="langHover === 'co' || router === 'cotrade'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_23_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_23"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("header.co") }}
            </span>
          </li>
          <!-- 杠杆交易 -->
          <li
            v-if="
              publicInfo &&
              publicInfo.switch &&
              publicInfo.switch.lever_open &&
              publicInfo.switch.lever_open.toString() === '1'
            "
            class="button-li"
            :class="langHover === 'lever' || router === 'margin' ? 'h-4-bg x-3-cl' : ''"
            ref="leverRef"
            @mouseover="handMouseenter('lever')"
            @mouseleave="handMouseleave('lever')"
            @click="btnHref(headerLink.lever)"
          >
            <svg class="icon icon-18 hover-hide" aria-hidden="true">
              <use xlink:href="#icon-b_24"></use>
            </svg>
            <svg class="icon icon-18 hover-show" aria-hidden="true">
              <use xlink:href="#icon-b_24_1"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("header.lever") }}
            </span>
          </li>
          <!-- etf -->
          <li
            v-if="etfOpen"
            class="button-li"
            :class="langHover === 'etf' || activeHeader === 'etf' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('etf')"
            @mouseleave="handMouseleave('etf')"
            @click="btnHref(etfUrl)"
          >
            <svg class="icon icon-18 hover-hide" aria-hidden="true">
              <use xlink:href="#icon-b_24"></use>
            </svg>
            <svg class="icon icon-18 hover-show" aria-hidden="true">
              <use xlink:href="#icon-b_24_1"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("etfAdd.title") }}
            </span>
          </li>
          <!-- 资产 -->
          <li
            v-if="isLogin && userInfoIsReady"
            class="button-li"
            :class="langHover === 'assets' || router === 'assets' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('assets')"
            @mouseleave="handMouseleave('assets')"
            @click="btnLink('/assets/exchangeAccount')"
          >
            <svg
              v-if="langHover === 'assets' || router === 'assets'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_27_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_27"></use>
            </svg>
            <span class="header-button-links">
              {{ $t("header.assets") }}
            </span>
          </li>
          <!-- 订单 -->
          <li
            v-if="isLogin && userInfoIsReady"
            class="button-li"
            :class="langHover === 'order' || router === 'order' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('order')"
            @mouseleave="handMouseleave('order')"
            @click="btnLink('/order/exchangeOrder')"
          >
            <svg
              v-if="langHover === 'order' || router === 'order'"
              class="icon icon-18"
              aria-hidden="true"
            >
              <use xlink:href="#icon-b_27_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_27"></use>
            </svg>
            <span class="header-button-links"> {{ $t("header.order") }} </span>
          </li>
          <!-- 个人中心 -->
          <li
            class="button-li header-user"
            :class="langHover === 'Account' || router === 'personal' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('Account')"
            @mouseleave="handMouseleave('Account')"
            @click="btnLink('/personal/userManagement')"
          >
            <i class="iconClass" style="top: 19px">
              <svg
                v-if="langHover === 'Account' || router === 'personal'"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_226_4855)">
                  <path
                    d="M8 0C3.58182 0 0 3.58182 0 8C0 12.4182 3.58182 16 8 16C12.4182 16 16 12.4184 16 8C16 3.58164 12.4184 0 8 0ZM7.89931 2.98128C9.37871 2.98128 10.5823 4.16701 10.5823 5.6248C10.5823 7.08259 9.37871 8.26867 7.89931 8.26867C6.41992 8.26867 5.21652 7.08259 5.21652 5.62515C5.21652 4.16772 6.4201 2.98128 7.89931 2.98128ZM12.3928 12.0569C12.3928 13.0184 10.8229 13.0184 9.00507 13.0184H6.99476C5.10245 13.0184 3.60735 13.0184 3.60735 12.0569V11.8589C3.60735 10.0201 5.12673 8.52324 6.99476 8.52324H9.00507C10.8731 8.52324 12.3928 10.0198 12.3928 11.8589V12.0569Z"
                    fill="white"
                  />
                  <path
                    d="M9.00514 8.52316H6.99483C5.1268 8.52316 3.60742 10.0193 3.60742 11.8588V12.0568C3.60742 13.0183 5.10252 13.0183 6.99483 13.0183H9.00514C10.823 13.0183 12.3929 13.0183 12.3929 12.0568V11.8588C12.3929 10.0197 10.8732 8.52316 9.00514 8.52316ZM7.89939 8.2686C9.37878 8.2686 10.5824 7.08305 10.5824 5.62508C10.5824 4.16711 9.37878 2.9812 7.89939 2.9812C6.42 2.9812 5.2166 4.16764 5.2166 5.62508C5.2166 7.08251 6.42018 8.2686 7.89939 8.2686Z"
                    fill="#0C0E11"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_226_4855">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_226_4855)">
                  <path
                    d="M8 0C3.58182 0 0 3.58182 0 8C0 12.4182 3.58182 16 8 16C12.4182 16 16 12.4184 16 8C16 3.58164 12.4184 0 8 0ZM7.89931 2.98128C9.37871 2.98128 10.5823 4.16701 10.5823 5.6248C10.5823 7.08259 9.37871 8.26867 7.89931 8.26867C6.41992 8.26867 5.21652 7.08259 5.21652 5.62515C5.21652 4.16772 6.4201 2.98128 7.89931 2.98128ZM12.3928 12.0569C12.3928 13.0184 10.8229 13.0184 9.00507 13.0184H6.99476C5.10245 13.0184 3.60735 13.0184 3.60735 12.0569V11.8589C3.60735 10.0201 5.12673 8.52324 6.99476 8.52324H9.00507C10.8731 8.52324 12.3928 10.0198 12.3928 11.8589V12.0569Z"
                    fill="#FCD535"
                  />
                  <path
                    d="M9.00514 8.52316H6.99483C5.1268 8.52316 3.60742 10.0193 3.60742 11.8588V12.0568C3.60742 13.0183 5.10252 13.0183 6.99483 13.0183H9.00514C10.823 13.0183 12.3929 13.0183 12.3929 12.0568V11.8588C12.3929 10.0197 10.8732 8.52316 9.00514 8.52316ZM7.89939 8.2686C9.37878 8.2686 10.5824 7.08305 10.5824 5.62508C10.5824 4.16711 9.37878 2.9812 7.89939 2.9812C6.42 2.9812 5.2166 4.16764 5.2166 5.62508C5.2166 7.08251 6.42018 8.2686 7.89939 8.2686Z"
                    fill="#0C0E11"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_226_4855">
                    <rect width="16" height="16" fill="#FCD535" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <span class="header-button-links">
              <!-- 用户中心 -->
              {{ $t("header.account") }}
            </span>
            <div v-if="isLogin && userInfoIsReady" class="header-user-market h-1-bg">
              <ul class="header-user-text">
                <li class="userText" @click="btnLink('/personal/userManagement')">
                  {{ userText }}
                </li>
                <li class="x-2-cl userStatus">
                  <!-- 账户状态 -->
                  {{ $t("header.userStatus") }}：{{ userStatus }}
                </li>
              </ul>
              <div class="header-user-out h-4-bg x-3-cl" @click="out">
                <!-- 退出 -->
                {{ $t("header.out") }}
              </div>
            </div>
          </li>
          <!-- 更多功能 -->
          <li
            v-if="subNavisShow"
            class="button-li"
            ref="extension"
            :class="langHover === 'extension' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('extension')"
          >
            <svg v-if="langHover === 'extension'" class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_1_1"></use>
            </svg>
            <svg v-else class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_1"></use>
            </svg>
            <span class="header-button-links">
              <!-- 更多 -->
              {{ $t("header.moreText") }}
            </span>
          </li>
        </ul>
        <!-- 公共版款 -->
        <ul class="int-header-linkList nav-bottom">
          <!-- 消息 -->
          <li
            v-if="isLogin && userInfoIsReady"
            class="button-li"
            :class="langHover === 'Message' ? 'h-4-bg x-3-cl' : ''"
            @click="btnLink('/mesage')"
            @mouseover="handMouseenter('Message')"
            @mouseleave="handMouseleave('Message')"
          >
            <div class="messageCount" v-if="messageCount"></div>
            <svg
              class="icon icon-18 hover-hide"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9871 13.125H1.90044C1.50348 13.125 1.23884 13 1.10652 12.75C0.841887 12.375 1.10652 11.875 1.50348 11.75C1.90044 11.625 2.16508 11.375 2.16508 11C2.29739 10.25 2.42971 9.625 2.42971 8.875C2.42971 7.875 2.42971 6.875 2.56203 5.875C2.95899 4 4.28218 2.625 6.13464 1.75C6.39928 1.75 6.39928 1.625 6.39928 1.375C6.39928 0.625 7.06087 0 7.9871 0C8.78102 0 9.44261 0.625 9.57493 1.375C9.57493 1.625 9.57493 1.75 9.83957 1.75C12.089 2.625 13.2799 4.25 13.4122 6.5C13.5445 7.625 13.4122 8.625 13.5445 9.75C13.5445 10.25 13.6768 10.75 13.8091 11.25C13.8091 11.5 14.0738 11.625 14.3384 11.75C14.7354 11.875 15 12.125 15 12.5C15 12.875 14.603 13.125 14.2061 13.125H7.9871V13.125ZM5.73768 13.875H10.3688C10.3688 14.625 9.97188 15.25 9.31029 15.625C8.51638 16.125 7.59015 16.125 6.79623 15.625C6.00232 15.25 5.73768 14.625 5.73768 13.875Z"
                fill="white"
              />
            </svg>

            <svg
              class="icon icon-18 hover-show"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9871 13.125H1.90044C1.50348 13.125 1.23884 13 1.10652 12.75C0.841887 12.375 1.10652 11.875 1.50348 11.75C1.90044 11.625 2.16508 11.375 2.16508 11C2.29739 10.25 2.42971 9.625 2.42971 8.875C2.42971 7.875 2.42971 6.875 2.56203 5.875C2.95899 4 4.28218 2.625 6.13464 1.75C6.39928 1.75 6.39928 1.625 6.39928 1.375C6.39928 0.625 7.06087 0 7.9871 0C8.78102 0 9.44261 0.625 9.57493 1.375C9.57493 1.625 9.57493 1.75 9.83957 1.75C12.089 2.625 13.2799 4.25 13.4122 6.5C13.5445 7.625 13.4122 8.625 13.5445 9.75C13.5445 10.25 13.6768 10.75 13.8091 11.25C13.8091 11.5 14.0738 11.625 14.3384 11.75C14.7354 11.875 15 12.125 15 12.5C15 12.875 14.603 13.125 14.2061 13.125H7.9871V13.125ZM5.73768 13.875H10.3688C10.3688 14.625 9.97188 15.25 9.31029 15.625C8.51638 16.125 7.59015 16.125 6.79623 15.625C6.00232 15.25 5.73768 14.625 5.73768 13.875Z"
                fill="#528EFF"
              />
            </svg>

            <!--<svg class="icon icon-18 hover-hide" aria-hidden="true">-->
            <!--  <use xlink:href="#icon-b_3"></use>-->
            <!--</svg>-->
            <!--<svg class="icon icon-18 hover-show" aria-hidden="true">-->
            <!--  <use xlink:href="#icon-b_3_1"></use>-->
            <!--</svg>-->
            <span class="header-button-links">
              <!-- 消息 -->
              {{ $t("header.message") }}
            </span>
          </li>
          <!-- 设置 -->
          <li
            v-if="colorList.length > 1"
            class="button-li"
            :class="langHover === 'Setting' ? 'h-4-bg x-3-cl' : ''"
            @click="setAlert"
            @mouseover="handMouseenter('Setting')"
            @mouseleave="handMouseleave('Setting')"
          >
            <svg class="icon icon-18 hover-hide" aria-hidden="true">
              <use xlink:href="#icon-b_2"></use>
            </svg>
            <svg class="icon icon-18 hover-show" aria-hidden="true">
              <use xlink:href="#icon-b_2_1"></use>
            </svg>
            <span class="header-button-links">
              <!-- 设置 -->
              {{ $t("header.set") }}
            </span>
          </li>
          <!-- 国际化 切换语言 -->
          <li
            class="button-li showLan"
            :class="langHover === 'showLan' ? 'h-4-bg x-3-cl' : ''"
            @mouseover="handMouseenter('showLan')"
            @mouseleave="handMouseleave('showLan')"
          >
            <span class="header-button-links">
              <!--{{ showLan }}-->
              Language
            </span>
            <div class="header-user-showLan h-1-bg x-2-cl">
              <ul class="lang-list h-1-bg">
                <li
                  v-for="(item, index) in langArr"
                  :class="lan === item.id || langHoverSub === item.id ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter(item.id, 'sub')"
                  @mouseout="handMouseleave(item.id, 'sub')"
                  @click="lanClick(item.id)"
                  :key="index"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 扩展功能二级菜单 -->
        <div :style="extensionPosition" class="header-sub-nav" v-show="langHover === 'extension'">
          <vue-scroll>
            <ul
              v-if="publicInfo"
              @mouseover="handMouseenter('extension')"
              @mouseleave="handMouseleave('extension')"
              class="header-user-text x-2-cl h-1-bg"
            >
              <li
                v-if="
                  userInfo && userInfo.agentStatus === 1 && publicInfo.switch.agentUserOpen === '1'
                "
                class="g-3-cl-h"
              >
                <span
                  @click="btnLink('/broker')"
                  :class="langHoverSub === 'broker' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('broker', 'sub')"
                  @mouseout="handMouseleave('broker', 'sub')"
                >
                  <!-- 经纪人系统 -->
                  {{ $t("header.broker") }}
                </span>
              </li>
              <li v-if="publicInfo && publicInfo.switch.is_return_open === '1'" class="g-3-cl-h">
                <span
                  @click="btnLink('/mining')"
                  :class="langHoverSub === 'minings' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('minings', 'sub')"
                  @mouseout="handMouseleave('minings', 'sub')"
                >
                  <!-- 交易挖矿 -->
                  {{ $t("header.minings") }}
                </span>
              </li>
              <li
                v-if="publicInfo && publicInfo.switch.newcoinOpen === '1'"
                class="x-2-cl g-3-cl-h"
              >
                <span
                  @click="btnLink('/innovation')"
                  :class="langHoverSub === 'innov_tit' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('innov_tit', 'sub')"
                  @mouseout="handMouseleave('innov_tit', 'sub')"
                >
                  <!-- 创新试验区 -->
                  {{ $t("header.innov_tit") }}
                </span>
              </li>
              <li
                v-if="publicInfo && publicInfo.switch.is_financing_open === '1'"
                class="x-2-cl g-3-cl-h"
              >
                <span
                  @click="btnLink('/manageFinances')"
                  :class="langHoverSub === 'manageFinances' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('manageFinances', 'sub')"
                  @mouseout="handMouseleave('manageFinances', 'sub')"
                >
                  <!-- 理财宝 -->
                  {{ $t("manageFinances.manage_finances") }}
                </span>
              </li>
              <li v-if="appDownload.app_page_url" class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/appDownload')"
                  :class="langHoverSub === 'appDownload' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('appDownload', 'sub')"
                  @mouseout="handMouseleave('appDownload', 'sub')"
                >
                  <!-- app 下载 -->
                  {{ $t("header.appDownLoad") }}
                </span>
              </li>
              <li class="x-2-cl g-3-cl-h">
                <span
                  @click="btnLink('/questions/init')"
                  :class="langHoverSub === '/questions/init' ? 'h-4-bg x-3-cl' : ''"
                  @mouseenter="handMouseenter('/questions/init', 'sub')"
                  @mouseout="handMouseleave('/questions/init', 'sub')"
                >
                  <!-- 问题中心 -->
                  {{ $t("questions.title") }}
                </span>
              </li>
              <!--  自定义导航 -->
              <template v-if="headerTemplate.length">
                <li class="x-2-cl g-3-cl-h" :key="index" v-for="(item, index) in headerTemplate">
                  <span
                    @click="btnHref(item.link, item.target)"
                    :class="langHoverSub === item.link ? 'h-4-bg x-3-cl' : ''"
                    @mouseenter="handMouseenter(item.link, 'sub')"
                    @mouseout="handMouseleave(item.link, 'sub')"
                  >
                    {{ item.text }}
                  </span>
                </li>
              </template>
            </ul>
          </vue-scroll>
        </div>
      </template>

      <c-dialog
        v-if="headerTemplateReceived"
        :showFlag="showFlag"
        :titleText="$t('header.set')"
        @confirm="setConfirm"
        @close="setClose"
      >
        <div class="setBox">
          <!-- 改，2022.10.02，新增 -->
          <div class="setColor clearfix" style="height: 60px; margin-top: 24px">
            <div class="setColor-key x-2-cl">{{ $t("header.color") }}</div>
            <ul class="setColor-value">
              <li v-for="(item, i) in colorList" :key="i">
                <c-redio @click="setSkin(item.skinId)" :value="Dskin === item.skinId" />
                <template v-if="item.skinName && item.skinName[lan]">
                  <span @click="setSkin(item.skinId)" class="b-1-cl">
                    {{ item.skinName[lan] }}
                  </span>
                </template>
                <template v-else>
                  <span @click="setSkin(item.skinId)" class="b-1-cl">
                    {{ item.mainClor }}
                  </span>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </c-dialog>
    </div>
    <!-- mobile -->
    <div class="common-menu-wrap" :class="{ 'expand-menu': isShowHeader }">
      <div class="common-header-wrap">
        <a class="linkList-logo" @click="btnHref(headerLink.home)">
          <img :src="imgMap.logo" />
        </a>
        <span class="button-menu" @click="showHeader">
          <svg
            v-if="!isShowHeader"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4466"
            width="24"
            height="24"
          >
            <path
              d="M128 768l768 0 0-85.333333L128 682.666667 128 768zM128 554.666667l768 0 0-85.333333L128 469.333333 128 554.666667zM128 256l0 85.333333 768 0L896 256 128 256z"
              p-id="4467"
              fill="#ffffff"
            ></path>
          </svg>
          <svg
            v-else
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5627"
            width="24"
            height="24"
          >
            <path
              d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z"
              p-id="5628"
              fill="#ffffff"
            ></path>
          </svg>
        </span>
      </div>
      <transition name="headerbox-fade">
        <div class="mobile-menu-box" v-show="isShowHeader">
          <div class="mobile-menu-content">
            <ul class="common-header-linkList" v-show="isShowHeader">
              <li
                v-for="(item, index) in tradesList"
                :key="index"
                class="header-navEven"
                :ref="item.activeId"
                @click="btnLink('/appDownload')"
              >
                <a :href="item.link">{{ item.title }}</a>
              </li>
            </ul>
            <div v-show="isShowHeader" class="common-header-optionList">
              <div class="h-2-bd header-lang x-2-cl" @click="showMoLan(!moLanShow)">
                <div class="show-lang">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style="margin-right: 5px"
                  >
                    <path
                      d="M10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.2625 7.32083 0.7875 6.1125C1.3125 4.90417 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3833 0 12.6792 0.2625 13.8875 0.7875C15.0958 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90417 19.2125 6.1125C19.7375 7.32083 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0958 18.6875 13.8875 19.2125C12.6792 19.7375 11.3833 20 10 20ZM10 17.95C10.4333 17.35 10.8083 16.725 11.125 16.075C11.4417 15.425 11.7 14.7333 11.9 14H8.1C8.3 14.7333 8.55833 15.425 8.875 16.075C9.19167 16.725 9.56667 17.35 10 17.95ZM7.4 17.55C7.1 17 6.8375 16.4292 6.6125 15.8375C6.3875 15.2458 6.2 14.6333 6.05 14H3.1C3.58333 14.8333 4.1875 15.5583 4.9125 16.175C5.6375 16.7917 6.46667 17.25 7.4 17.55ZM12.6 17.55C13.5333 17.25 14.3625 16.7917 15.0875 16.175C15.8125 15.5583 16.4167 14.8333 16.9 14H13.95C13.8 14.6333 13.6125 15.2458 13.3875 15.8375C13.1625 16.4292 12.9 17 12.6 17.55ZM2.25 12H5.65C5.6 11.6667 5.5625 11.3375 5.5375 11.0125C5.5125 10.6875 5.5 10.35 5.5 10C5.5 9.65 5.5125 9.3125 5.5375 8.9875C5.5625 8.6625 5.6 8.33333 5.65 8H2.25C2.16667 8.33333 2.10417 8.6625 2.0625 8.9875C2.02083 9.3125 2 9.65 2 10C2 10.35 2.02083 10.6875 2.0625 11.0125C2.10417 11.3375 2.16667 11.6667 2.25 12ZM7.65 12H12.35C12.4 11.6667 12.4375 11.3375 12.4625 11.0125C12.4875 10.6875 12.5 10.35 12.5 10C12.5 9.65 12.4875 9.3125 12.4625 8.9875C12.4375 8.6625 12.4 8.33333 12.35 8H7.65C7.6 8.33333 7.5625 8.6625 7.5375 8.9875C7.5125 9.3125 7.5 9.65 7.5 10C7.5 10.35 7.5125 10.6875 7.5375 11.0125C7.5625 11.3375 7.6 11.6667 7.65 12ZM14.35 12H17.75C17.8333 11.6667 17.8958 11.3375 17.9375 11.0125C17.9792 10.6875 18 10.35 18 10C18 9.65 17.9792 9.3125 17.9375 8.9875C17.8958 8.6625 17.8333 8.33333 17.75 8H14.35C14.4 8.33333 14.4375 8.6625 14.4625 8.9875C14.4875 9.3125 14.5 9.65 14.5 10C14.5 10.35 14.4875 10.6875 14.4625 11.0125C14.4375 11.3375 14.4 11.6667 14.35 12ZM13.95 6H16.9C16.4167 5.16667 15.8125 4.44167 15.0875 3.825C14.3625 3.20833 13.5333 2.75 12.6 2.45C12.9 3 13.1625 3.57083 13.3875 4.1625C13.6125 4.75417 13.8 5.36667 13.95 6ZM8.1 6H11.9C11.7 5.26667 11.4417 4.575 11.125 3.925C10.8083 3.275 10.4333 2.65 10 2.05C9.56667 2.65 9.19167 3.275 8.875 3.925C8.55833 4.575 8.3 5.26667 8.1 6ZM3.1 6H6.05C6.2 5.36667 6.3875 4.75417 6.6125 4.1625C6.8375 3.57083 7.1 3 7.4 2.45C6.46667 2.75 5.6375 3.20833 4.9125 3.825C4.1875 4.44167 3.58333 5.16667 3.1 6Z"
                      fill="white"
                    />
                  </svg>
                  {{ useLanText }}
                </div>
                <!-- 改，2022.11.06，新增style -->
                <ul v-show="moLanShow" class="lang-list h-1-bg">
                  <li
                    v-for="(item, index) in langArr"
                    :class="lan === item.id || langHover === item.id ? 'h-4-bg x-3-cl' : ''"
                    @mouseenter="handMouseenter(item.id)"
                    @mouseout="handMouseleave(item.id)"
                    @click="lanClick(item.id)"
                    :key="index"
                    style="font-size: 16px"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <c-button
                class="header-reg-button"
                height="46px"
                :big="true"
                @click="btnLink('/appDownload')"
              >
                {{ $t("h5Add.tradeList1") }}
              </c-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import mixin from "../../common-mixin/modules/header/header";
import "../../common-mixin/modules/header/header.styl";
import { imgMap, myStorage } from "@/utils";
import { isH5Check } from "@/utils/newUtils";

export default {
  name: "c-header",
  mixins: [mixin],
  data() {
    return {
      systemMenu: [
        // {
        //   title: "Exchange",
        //   subTitle: "Blockchain and digital currency exchanges",
        //   icon: imgMap.icon_7,
        //   link: "/trade/BlueSparrow_ETH",
        // },
        // {
        //   title: "OREX Charity",
        //   subTitle: "Blockchain for Charity",
        //   icon: imgMap.icon_8,
        //   link: "/footerPage/charity"
        // },
        // {
        //   title: "BlueSparrow Token",
        //   subTitle: "",
        //   icon: imgMap.icon_9,
        //   link: "/footerPage/bluesparrowToken"
        // },
        // {
        //   title: "OREX Blog",
        //   subTitle: "",
        //   icon: imgMap.icon_10,
        //   link: "/footerPage/blog"
        // },{
        //   title: "NFT",
        //   subTitle: "",
        //   icon: imgMap.icon_11,
        //   link: "/footerPage/blueVinci"
        // },
      ],
      imgMap: {
        logo: imgMap.sparkbit,
        logo_d: imgMap.sparkbit_1,
        sun: imgMap.sun,
        moon: imgMap.moon,
        avatar: imgMap.user_avatar,
      },
      imgMapAll: imgMap,
      theme: "dark",
      windowTop: false,
      isShowHeader: false,
      moLanShow: false,
      sideList: [0, 1, 2, 3, 4, 7], // 全部 系统 充值 安全 认证 场外
    };
  },
  mounted() {
    this.modifyTilte();
    this.$bus.$on("tag_toggle", (index) => {
      if (index === 0) {
        this.$refs.exTrade[0].click();
      } else if (index === 1) {
        this.$refs.marginTrade[0].click();
      } else if (index === 2) {
        this.$refs.coTrade[0].click();
      }
    });

    const screenWidth = document.body.clientWidth;
    if (!this.isH5Check() && screenWidth > 1439.98 && this.$route.name === 'home') {
      document.addEventListener('mousewheel', this.setHeaderPos, false);
    }

    if (window.AOS) {
      window.AOS.init({
        offset: 100,
        once: true,
        easing: "ease-out",
      });
    }
  },
  computed: {
    appDownload() {
      return this.$store.state.baseData.app_download || "";
    },
    userMenu() {
      return [
        {
          title: this.$t("personal.userManagement.securityList.password.text"),
          link: "/personal/changePassword",
        },
        {
          title: this.$t("personal.userManagement.securityList.idAuth.text"),
          link: "/personal/userManagement?verification=1", // 弹窗
        },
        {
          title: this.$t("personal.userManagement.securityList.email.text"),
          link: "/personal/changeEmail",
        },
        // {
        //   title: this.$t("personal.userManagement.securityList.phone.text"),
        //   link: "/personal/bindPhone"
        // },
        // {
        //   title: this.$t("personal.userManagement.securityList.google.text"),
        //   link: "/personal/bindGoogle"
        // },
        {
          title: this.fiatTradeOpen
            ? this.$t("assets.b2c.otcShow.leaglTenderSet")
            : this.$t("personal.navMenu.list.leaglTenderSet"),
          link: "/personal/leaglTenderSet",
        },
        {
          title: this.$t("personal.navMenu.list.advertisingManagement"),
          link: "/personal/advertisingManagement",
        },
        {
          title: this.$t("personal.navMenu.list.apiManagement"),
          link: "/personal/apiManagement",
        },
        {
          title: this.$t("brokerSystem.overviewTitle[2]"),
          link: "/personal/exBroker",
        },
      ];
    },
  },
  beforeDestroy() {
    this.$bus.$off("tag_toggle");
  },
  created() {
    this.setActive();
    this.setMarkActive();
    this.initTheme();
  },
  methods: {
    initTheme() {
      const theme = getCookie("theme") || "dark";
      this.theme = theme;
      document.querySelector("body").classList.add(theme);
      setCookie("theme", theme);
    },
    switchTheme(th) {
      this.theme = th;
      const body = document.querySelector("body");
      if (th === "light") {
        body.classList.remove("dark");
        body.classList.add("light");
      } else {
        body.classList.remove("light");
        body.classList.add("dark");
      }
      // myStorage.set("theme", th);
      setCookie("theme", th);
      this.$bus.$emit("switchTheme", th);
    },
    linkTo(path) {
      if (path.includes("trade")) {
        this.$bus.$emit("tag_toggle", 0);
        return;
      }
      this.$router.push(path);
    },
    showHeader() {
      this.isShowHeader = !this.isShowHeader;
    },
    showMoLan(bol) {
      this.moLanShow = bol;
    },
    setHeaderPos() {
      this.windowTop = window.pageYOffset >= window.innerHeight;
    },
    getIcon(tid) {
      return this.sideList.findIndex(side => side === tid);
    },
    isH5Check,
  },
};
</script>
<style scoped>
.top-common-header {
  min-width: 1366px;
}
.m-subMenu {
  position: absolute;
  left: 0;
  width: 212px;
  display: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
}
.m-subMenu.show {
  display: block;
}
.m-subMenu > .item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 212px;
  background: var(--color-BG-Light);
  position: relative;
  padding: 16px 16px 16px 40px;
}

.m-subMenu > .item > .icon2 {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  display: flex;
}
.m-subMenu > .item > .icon2 > img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.m-subMenu > .item > .title {
  font-size: 14px;
  line-height: 22px;
  color: var(--color-text-primary);
}
.m-subMenu > .item > .subtxt {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}
.m-subMenu > .item:hover > .title,
.m-subMenu > .item:hover > .subtxt {
  /* color: var(--mainColor); */
}
.m-subMenuIcon {
  transition: all 500ms ease;
}
.m-subMenuIcon.up {
  transform: rotate(180deg);
  /* fill: var(--mainColor); */
}
/* 2022.12.20 修改logo样式 */
.top-common-header .common-header-linkList .linkList-logo {
  padding-inline: 0 28px;
}
.top-common-header .common-header-linkList .linkList-logo img {
  /* width: 100px; */
}
.top-common-header .common-header-linkList .header-navEven.x-3-cl {
  /* color: var(--color-text-primary) !important; */
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.25);
}

.top-common-header .common-header-linkList .header-navEven.active a {
  color: var(--color-Header-active) !important;
}

.top-common-header .common-header-optionList .header-lang .lang-list li.x-3-cl,
.top-common-header .common-header-optionList .header-isLogin-navEven .lang-list li.x-3-cl {
  color: var(--color-text-primary);
}
.download-options-buttons /deep/button.u-8-bg {
  background: var(--mainColor);
}
.header-user-out {
  color: var(--color-text-primary);
}
.top-common-header .common-header-optionList .header-guide /deep/.header-reg-button {
  border-color: var(--mainColor) !important;
  color: #ffffff !important;
  background: var(--mainColor);
  border-radius: 100px;
}
.top-common-header .common-header-optionList .header-user {
  width: 40px;
  height: 64px;
  line-height: 64px;
}
.top-common-header .common-header-optionList .header-user .header-user-icon {
  height: 100%;
}
.top-common-header .common-header-optionList .header-user .header-user-icon svg {
  margin-top: 22px;
}

.top-common-header .common-header-optionList .header-user .header-user-icon.user-box img {
  width: 24px;
  height: 24px;
  margin-top: 20px;
  border-radius: 50%;
}
.top-common-header .common-header-optionList .header-user .header-user-text .userText {
  color: var(--mainColor);
}
</style>
<style scoped>
.header-nav-ifl {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}
.header-nav-ifl > .svgIcon {
  margin-right: 6px;
  fill: #d9d9d9;
  cursor: pointer;
}
.header-nav-ifl:hover > .svgIcon {
  /* fill: var(--mainColor) !important; */
}
.header-nav-ifl > .svgIcon2 {
  transition: all 0.3s ease-in;
  fill: #d9d9d9;
}
.header-nav-ifl:hover > .svgIcon2 {
  transform: rotate(180deg);
  /* fill: var(--mainColor) !important; */
}

.header-nav-ifl > .drawer {
  position: absolute;
  top: 64px;
  left: -20px;
  box-sizing: border-box;
  margin: 0px;
  overflow: hidden;
  border-radius: 0px 0px 8px 8px;
  background: var(--color-BG-Light);
  box-sizing: border-box;
  padding: 16px;
  display: none;
}
.header-nav-ifl:hover > .drawer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.header-nav-ifl > .drawer > .item {
  box-sizing: border-box;
  min-width: 0px;
  cursor: pointer;
  color: var(--color-text-primary);
  position: relative;
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  line-height: 1;
  padding: 16px 16px 16px 50px;
  margin: 0px 20px 0px 0px;
  display: inline-block;
  height: auto;
  width: 360px;
}
.header-nav-ifl > .drawer > .item:hover {
  background: var(--color-Input-border);
}

.header-nav-ifl > .drawer > .item > .icon {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-nav-ifl > .drawer > .item > .name {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  color: rgb(234, 236, 239);
}
.header-nav-ifl > .drawer > .item > .subTxt {
  box-sizing: border-box;
  min-width: 0px;
  font-size: 12px;
  color: rgb(132, 142, 156);
  margin: 8px 0px 0px;
}

.top-common-header .common-header-linkList .header-navEven {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #ffffff !important;
  margin-right: 10px;
}
.top-common-header .common-header-linkList .header-navEven > a {
  color: #ffffff !important;
}
.top-common-header .common-header-optionList .header-isLogin-navEven {
  padding: 0 14px 0 8px;
}
.top-common-header .common-header-optionList .header-isLogin-navEven .header-isLogin-navEven-title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-common-header
  .common-header-optionList
  .header-isLogin-navEven
  .header-isLogin-navEven-title
  > span {
  padding-right: 6px;
}
.header-user > .arrows {
  position: absolute;
  right: 0;
  top: 46%;
  transform: translateY(-50%);
}
.top-common-header .common-header-optionList .header-lang .show-lang {
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
}
.top-common-header .common-header-optionList .header-lang .show-lang > .arrows {
  margin-left: 6px;
  margin-top: -5px;
}
.m-userMenu > .menuItem {
  cursor: pointer;
  text-align: left;
  min-width: 160px;
  border-radius: 6px;
}
.m-userMenu > .menuItem:hover {
  color: var(--color-text-primary);
  background-color: var(--color-Input-border);
}
.m-userMenu > .menuItem,
.top-common-header .common-header-optionList .header-user .header-user-out {
  height: 50px;
  padding: 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  box-sizing: border-box;
  color: var(--color-text-primary);
}

.top-common-header .common-header-optionList .header-user-message .header-user-out {
  height: 40px;
  padding: 0 10px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-BTN-text-secondary-revert);
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
}

.top-common-header .common-header-linkList .header-nav-ifl {
  padding-right: 28px !important;
  margin-left: 20px;
}

@media (max-width: 1590px) {
  .top-common-header .common-header-linkList .header-navEven {
    margin-right: 0;
  }
}

.top-common-header .common-header-optionList .header-isLogin-navEven .lang-list li > a {
  color: var(--color-text-primary);
}
.top-common-header .common-header-optionList .header-isLogin-navEven .lang-list li:hover > a {
  /* color: var(--mainColor); */
}
.b-line {
  height: 20px;
  margin-top: 22px;
  border: none;
  border-left: 1px solid var(--color-text-secondary);
}

/* landingpage */
.common-header {
  display: flex;
  justify-content: center;
}
.common-header .linkList-logo .light {
  display: none;
}
.common-header > .common-header-wrap {
  position: relative;
  width: calc(100% - 40px);
  height: 100%;
  min-width: 1366px;
  padding: 0 20px;
  border-bottom: 1px solid var(--color-header-border) !important;
  transition: all 0.3s ease;
  transform-origin: 50% 50% 0px;
  will-change: auto;
}
/* .dark:not(.light) .scroll-header .linkList-logo .normal {
  display: none;
}
.dark:not(.light) .scroll-header .linkList-logo .light {
  display: inline-block;
} */
.scroll-header > .common-header-wrap .linkList-logo .normal {
  display: none
}
.scroll-header > .common-header-wrap .linkList-logo .light {
  display: inline-block;
}

.scroll-header > .common-header-wrap {
  top: 28px;
  width: min-content;
  /* background-color: var(--color-Header-bg) !important; */
  background-color: #fffffff2 !important;
  border-radius: 42px;
  transition: all 0.3s ease;
  transform-origin: 50% 50% 0px;
  will-change: auto;
}
/* .dark:not(.light) .scroll-header /deep/.header-login-button .common-button-slot, */
.scroll-header > .common-header-wrap .common-header-linkList .header-navEven > a,
.scroll-header > .common-header-wrap .common-header-optionList .header-isLogin-navEven .header-isLogin-navEven-title {
  /* color: var(--color-BTN-BUY-SELL-text) !important; */
  color: #222222 !important;
  font-weight: 600;
}
.scroll-header  > .common-header-wrap /deep/.header-login-button .common-button-slot {
  color: #222222 !important;
}

.scroll-header  > .common-header-wrap path {
  /* fill: var(--color-BG); */
  fill: #000000;
}
/* .dark:not(.light) .scroll-header .dl-icon img {
  filter: invert(100%);
} */
.scroll-header  > .common-header-wrap .dl-icon img {
  filter: invert(100%);
}
.scroll-header  > .common-header-wrap .common-header-linkList .header-navEven.x-3-cl {
  /* background: var(--color-Hover-bg); */
  background: #00000040;
}
.headerbox-fade-enter-active {
  transition: all 0.4s ease;
}
.headerbox-fade-leave-active {
  transition: all 0.4s ease;
}
.headerbox-fade-enter,
.headerbox-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.common-menu-wrap {
  display: none;
}
</style>
<style lang="stylus" scoped>
@media (max-width: 1439.98px) {
  .top-common-header {
    min-width: 100vw;
    max-width: 100vw;
    width: 100vw;
    &>.common-header-wrap {
      display: none;
    }
    .common-menu-wrap {
      display: block;
      width: 100%;
      height: min-content;
      .common-header-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: auto;
        height: 64px;
        padding: 0 20px;

        .linkList-logo {
          padding: 0;
        }
        .linkList-logo img {
          width: 129px;
          position: relative;
          z-index: 2;
        }
        .button-menu {
          cursor: pointer;
        }
      }
    }
    .expand-menu {
      height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .common-header-wrap {
        padding: 16px 28px 0;
        height: 48px;
        position: relative;
        //background-color: var(--color-BG);
        background-color: #000000;
        z-index: 2;
      }
      .mobile-menu-box {
        flex: 1;
        //background-color: var(--color-BG);
        background-color: #000000;
        .mobile-menu-content {
          width: 100%;
          height: 100%;
          padding: 24px 28px 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .common-header-linkList {
          float: none;
          display: block;
          width: 100%;
          height: min-content;
          .header-navEven {
            float: none;
            text-align: left;
            a {
              padding: 8px 0;
              line-height: 32px;
              height: 32px;
              font-size: 16px;
              //color: var(--color-text-primary) !important;
              color: #ffffff !important;
            }
          }
        }
        .common-header-optionList {
          float: left;
          gap: 10px;
          padding-right: 0;
          margin-top: auto;
          height: 46px;
          &>div, &>button {
            flex: 1;
          }
          .header-lang {
            height: 46px;
            border-radius: 100px;
            //background: var(--color-Hover);
            background: #ffffff14;
            .lang-list {
              display: block
              position: absolute;
              bottom: 52px;
              left: 0;
              right: auto;
              top: auto;
            }
          }
        }
      }
    }
  }
}
</style>
