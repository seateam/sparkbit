<template>
  <div class="user-management m-page">
    <p class="user-management-child-header b-1-cl a-3-bd h-1-bg" v-if="templateLayoutType === '2'">
      <!-- 账号管理 -->
      {{ $t("personal.navMenu.list.userManagement") }}
    </p>
    <div class="m-userHeader-Box">
      <div class="m-userHeader">
        <div class="avatar">
          <img :src="headImg" />
          <div class="upload">
            <c-oldUploadFile
              url="user/uploadAvatar"
              name="file"
              @uploadFinish="uploadFinish"
            ></c-oldUploadFile>
          </div>
        </div>
        <div class="info">
          <div class="userName">
            <div>{{ nickName }}</div>
            <div class="edit" @click="modify(1)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill="none"
              >
                <path
                  d="M0 24V20.5253H21V24H0ZM4.2 15.2727H5.67L13.86 6.79091L12.3638 5.23636L4.2 13.7455V15.2727ZM2.1 17.4545V12.8182L13.86 0.627273C14.0525 0.427273 14.2756 0.272727 14.5294 0.163636C14.7831 0.0545455 15.05 0 15.33 0C15.61 0 15.8813 0.0545455 16.1438 0.163636C16.4062 0.272727 16.6425 0.436364 16.8525 0.654545L18.2963 2.18182C18.5063 2.38182 18.6594 2.61818 18.7556 2.89091C18.8519 3.16364 18.9 3.44545 18.9 3.73636C18.9 4.00909 18.8519 4.27727 18.7556 4.54091C18.6594 4.80455 18.5063 5.04545 18.2963 5.26364L6.5625 17.4545H2.1Z"
                  fill="var(--color-text-primary)"
                />
              </svg>
            </div>
          </div>
          <div class="msg">
            <div class="userNum">
              <div class="key">{{ $t("personal.krw.account") }}</div>
              <div class="val">{{ userName }}</div>
            </div>
            <div class="userMail">
              <div class="key">{{ this.$t("personal.userManagement.id") }}</div>
              <div class="val">{{ id }}</div>
            </div>
          </div>
        </div>
        <!-- <img class="bg" :src="imgMap.darkimg2" /> -->
      </div>
    </div>

    <!-- 2023.03.01 更新UI，用新的 -->
    <!--<div class="user-management-header">-->
    <!--  &lt;!&ndash; 改，2022.11.15 新增图片上传方式 &ndash;&gt;-->
    <!--  <div class="user-management-header-img">-->
    <!--    <img :src="headImg" class="user-img"/>-->
    <!--    <div style="position: absolute;top: 0;width: 100%;height: 100%;">-->
    <!--      <c-oldUploadFile-->
    <!--        url="user/uploadAvatar"-->
    <!--        name="file"-->
    <!--        @uploadFinish="uploadFinish"-->
    <!--      ></c-oldUploadFile>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--  <div class="user-management-header-message b-1-cl">-->
    <!--    &lt;!&ndash; 改，2022.11.22 居中对齐样式 &ndash;&gt;-->
    <!--    <p style="display: flex;align-items: center;">-->
    <!--      <span>{{ nickName }}</span>-->
    <!--      <c-button @click="modify(1)" type="text">-->
    <!--        {{ this.$t("personal.tool.modify") }}-->
    <!--      </c-button>-->
    <!--      <span class="m-greenDot" :class="{'active': authLevel === 1}"></span>-->
    <!--    </p>-->
    <!--    <p>{{ userName }}</p>-->
    <!--    <p class="b-2-cl">{{ this.$t("personal.userManagement.id") }}: {{ id }}</p>-->
    <!--  </div>-->
    <!--  <img :src="photo" class="user-management-header-img2" />-->
    <!--</div>-->
    <!--<div style="height: 10px;width: 100%;background: #141416;"></div>-->
    <!-- 2023.03.01 重构 -->
    <div class="m-userContent">
      <div class="userContent">
        <!--登录密码-->
        <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <mask
              id="mask0_846_11288"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <rect width="36" height="36" fill="var(--color-text-primary)" />
            </mask>
            <g mask="url(#mask0_846_11288)">
              <path
                d="M10.5 27C8 27 5.875 26.125 4.125 24.375C2.375 22.625 1.5 20.5 1.5 18C1.5 15.5 2.375 13.375 4.125 11.625C5.875 9.875 8 9 10.5 9C12.15 9 13.6625 9.4125 15.0375 10.2375C16.4125 11.0625 17.5 12.15 18.3 13.5H34.5V22.5H31.5V27H22.5V22.5H18.3C17.5 23.85 16.4125 24.9375 15.0375 25.7625C13.6625 26.5875 12.15 27 10.5 27ZM10.5 24C12.15 24 13.475 23.4938 14.475 22.4813C15.475 21.4688 16.075 20.475 16.275 19.5H25.5V24H28.5V19.5H31.5V16.5H16.275C16.075 15.525 15.475 14.5312 14.475 13.5188C13.475 12.5063 12.15 12 10.5 12C8.85 12 7.4375 12.5875 6.2625 13.7625C5.0875 14.9375 4.5 16.35 4.5 18C4.5 19.65 5.0875 21.0625 6.2625 22.2375C7.4375 23.4125 8.85 24 10.5 24ZM10.5 21C11.325 21 12.0312 20.7063 12.6187 20.1187C13.2063 19.5312 13.5 18.825 13.5 18C13.5 17.175 13.2063 16.4688 12.6187 15.8813C12.0312 15.2938 11.325 15 10.5 15C9.675 15 8.96875 15.2938 8.38125 15.8813C7.79375 16.4688 7.5 17.175 7.5 18C7.5 18.825 7.79375 19.5312 8.38125 20.1187C8.96875 20.7063 9.675 21 10.5 21Z"
                fill="var(--color-text-primary)"
              />
            </g>
          </svg>
          <div class="desc">
            <div class="txt1">
              {{ this.$t("personal.userManagement.securityList.password.text") }}
            </div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.securityList.password.label") }}
            </div>
          </div>
          <div class="wrap">
            <div class="btn" @click="changePassword">{{ this.$t("personal.tool.modify") }}</div>
          </div>
        </div>
        <!--实名认证-->
        <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <mask
              id="mask0_848_11420"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <rect width="36" height="36" fill="var(--color-text-primary)" />
            </mask>
            <g mask="url(#mask0_848_11420)">
              <path
                d="M3 30V25.8C3 24.975 3.2125 24.2 3.6375 23.475C4.0625 22.75 4.65 22.2 5.4 21.825C6.675 21.175 8.1125 20.625 9.7125 20.175C11.3125 19.725 13.075 19.5 15 19.5C15.75 19.5 16.4813 19.5375 17.1938 19.6125C17.9063 19.6875 18.6 19.8 19.275 19.95L16.65 22.575C16.375 22.525 16.1062 22.5 15.8438 22.5H15C13.225 22.5 11.6313 22.7125 10.2188 23.1375C8.80625 23.5625 7.65 24.025 6.75 24.525C6.525 24.65 6.34375 24.825 6.20625 25.05C6.06875 25.275 6 25.525 6 25.8V27H15.375L18.375 30H3ZM23.325 30.6L18.15 25.425L20.25 23.325L23.325 26.4L30.9 18.825L33 20.925L23.325 30.6ZM15 18C13.35 18 11.9375 17.4125 10.7625 16.2375C9.5875 15.0625 9 13.65 9 12C9 10.35 9.5875 8.9375 10.7625 7.7625C11.9375 6.5875 13.35 6 15 6C16.65 6 18.0625 6.5875 19.2375 7.7625C20.4125 8.9375 21 10.35 21 12C21 13.65 20.4125 15.0625 19.2375 16.2375C18.0625 17.4125 16.65 18 15 18ZM15 15C15.825 15 16.5313 14.7063 17.1188 14.1187C17.7063 13.5312 18 12.825 18 12C18 11.175 17.7063 10.4688 17.1188 9.88125C16.5313 9.29375 15.825 9 15 9C14.175 9 13.4688 9.29375 12.8813 9.88125C12.2937 10.4688 12 11.175 12 12C12 12.825 12.2937 13.5312 12.8813 14.1187C13.4688 14.7063 14.175 15 15 15Z"
                fill="var(--color-text-primary)"
              />
            </g>
          </svg>
          <div class="desc">
            <div class="txt1">
              {{ this.$t("personal.userManagement.securityList.idAuth.text") }}
            </div>
            <div class="txt2" v-if="authLevel !== 1">
              {{ this.$t("personal.userManagement.securityList.idAuth.label") }}
            </div>
          </div>
          <div class="wrap">
            <div class="btn" v-if="authLevel === 0" @click="btnLink('goID')">
              {{ this.$t("personal.state.authentication") }}
            </div>
            <div class="btn" v-if="authLevel === 2 || authLevel === 3" @click="btnLink('identity')">
              {{ this.$t("personal.state.certification") }}
            </div>
            <div v-if="authLevel === 1" class="positionRight">
              {{ this.$t("personal.state.certified") }}
            </div>
          </div>
        </div>
        <!--邮箱-->
        <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="29"
            viewBox="0 0 32 29"
            fill="none"
          >
            <path
              d="M3 21V10.1625V10.9125V3V21ZM15 10.5L27 3H3L15 10.5ZM0 21V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1188 0.88125C29.7063 1.46875 30 2.175 30 3V12.4125L27 10.9125V6L15 13.5L3 6V21H16.5375C16.5875 21.5 16.65 22 16.725 22.5C16.8 23 16.925 23.5 17.1 24H3C2.175 24 1.46875 23.7063 0.88125 23.1188C0.29375 22.5312 0 21.825 0 21ZM25.5 28.5C23.775 28.075 22.3438 27.0813 21.2062 25.5188C20.0688 23.9563 19.5 22.225 19.5 20.325V16.5L25.5 13.5L31.5 16.5V20.325C31.5 22.225 30.9313 23.9563 29.7938 25.5188C28.6563 27.0813 27.225 28.075 25.5 28.5ZM25.5 25.35C26.375 24.925 27.0938 24.25 27.6562 23.325C28.2188 22.4 28.5 21.4 28.5 20.325V18.375L25.5 16.875V25.35Z"
              fill="var(--color-text-primary)"
            />
          </svg>
          <div class="desc">
            <div class="txt1">{{ this.$t("personal.userManagement.securityList.email.text") }}</div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.securityList.email.label") }}
            </div>
          </div>
          <div class="wrap">
            <div class="btnLeftTxt" v-if="email">{{ email }}</div>
            <div class="btn" v-if="email" @click="changeEmail">
              {{ this.$t("personal.tool.modify") }}
            </div>
            <div class="btn" v-else @click="btnLink('email')">
              {{ this.$t("personal.tool.bind") }}
            </div>
          </div>
        </div>
        <!--手机号-->
        <div class="m-safeSet" v-if="false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M34.1561 17.9995C34.1561 19.5028 32.9374 20.7215 31.4341 20.7215H22.039L18 12.5548L22.3596 5.00398C23.1112 3.70216 24.7758 3.25609 26.0777 4.00763L26.0782 4.00793C27.3802 4.75952 27.8263 6.42426 27.0747 7.72619L22.7151 15.2776H31.4341C32.9374 15.2776 34.1561 16.4963 34.1561 17.9995Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M26.0765 31.9912L26.076 31.9915C24.7742 32.743 23.1095 32.2969 22.3579 30.9951L17.9983 23.4443L13.6388 30.9951C12.8871 32.2969 11.2225 32.743 9.92066 31.9915L9.92015 31.9912C8.6182 31.2396 8.17206 29.5748 8.92368 28.2729L13.2832 20.7215L17.9983 20.5459L22.7135 20.7215L27.073 28.2729C27.8246 29.5748 27.3785 31.2396 26.0765 31.9912Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M17.9983 12.5548L16.7691 15.8922L13.2832 15.2776L8.92368 7.72619C8.17206 6.42426 8.61819 4.75952 9.92015 4.00793L9.92067 4.00763C11.2225 3.25609 12.8872 3.70216 13.6388 5.00398L17.9983 12.5548Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M17.2974 15.2783L14.1364 20.7222H4.5657C3.06241 20.7222 1.84375 19.5036 1.84375 18.0003C1.84375 16.497 3.06241 15.2783 4.5657 15.2783H17.2974Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M22.7154 20.7224H13.2852L18.0003 12.5557L22.7154 20.7224Z"
              fill="var(--color-text-primary)"
            />
          </svg>
          <div class="desc">
            <div class="txt1">{{ this.$t("personal.userManagement.securityList.phone.text") }}</div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.securityList.phone.label") }}
            </div>
          </div>
          <!--操作-->
          <div class="wrap">
            <div class="btn" v-if="!smsCode && mobileNumber" @click="openMobile">
              {{ this.$t("personal.state.openValidatio") }}
            </div>
            <div class="btn" v-if="!mobileNumber" @click="btnLink('phone')">
              {{ this.$t("personal.tool.bind") }}
            </div>
            <div class="btnLeftTxt" v-if="mobileNumber">{{ mobileNumber }}</div>
            <div class="btn" v-if="smsCode && googleCode" @click="btnLink2('/personal/closePhone')">
              {{ this.$t("personal.state.closeValidatio") }}
            </div>
            <div class="btn" v-if="mobileNumber" @click="btnLink2('/personal/changePhone')">
              {{ this.$t("personal.tool.modify") }}
            </div>
          </div>
        </div>
        <!--谷歌验证码-->
        <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M34.1561 17.9995C34.1561 19.5028 32.9374 20.7215 31.4341 20.7215H22.039L18 12.5548L22.3596 5.00398C23.1112 3.70216 24.7758 3.25609 26.0777 4.00763L26.0782 4.00793C27.3802 4.75952 27.8263 6.42426 27.0747 7.72619L22.7151 15.2776H31.4341C32.9374 15.2776 34.1561 16.4963 34.1561 17.9995Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M26.0765 31.9912L26.076 31.9915C24.7742 32.743 23.1095 32.2969 22.3579 30.9951L17.9983 23.4443L13.6388 30.9951C12.8871 32.2969 11.2225 32.743 9.92066 31.9915L9.92015 31.9912C8.6182 31.2396 8.17206 29.5748 8.92368 28.2729L13.2832 20.7215L17.9983 20.5459L22.7135 20.7215L27.073 28.2729C27.8246 29.5748 27.3785 31.2396 26.0765 31.9912Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M17.9983 12.5548L16.7691 15.8922L13.2832 15.2776L8.92368 7.72619C8.17206 6.42426 8.61819 4.75952 9.92015 4.00793L9.92067 4.00763C11.2225 3.25609 12.8872 3.70216 13.6388 5.00398L17.9983 12.5548Z"
              fill="var(--color-text-primary)"
            />
            <path
              d="M17.2974 15.2783L14.1364 20.7222H4.5657C3.06241 20.7222 1.84375 19.5036 1.84375 18.0003C1.84375 16.497 3.06241 15.2783 4.5657 15.2783H17.2974Z"
              fill="var(--color-text-primary)"
            />
            <path d="M22.7154 20.7224H13.2852L18.0003 12.5557L22.7154 20.7224Z" />
          </svg>
          <div class="desc">
            <div class="txt1">
              {{ this.$t("personal.userManagement.securityList.google.text") }}
            </div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.securityList.phone.label") }}
            </div>
          </div>
          <div class="wrap">
            <div class="btnLeftTxt" v-if="googleCode && !smsCode">
              {{ this.$t("personal.state.open") }}
            </div>
            <div
              class="btn"
              v-if="smsCode && googleCode"
              @click="btnLink2('/personal/closeGoogle')"
            >
              {{ this.$t("personal.state.closeValidatio") }}
            </div>
            <div class="btn" v-if="!googleCode" @click="btnLink('google')">
              {{ this.$t("personal.tool.bind") }}
            </div>
          </div>
        </div>
        <!--平台币作为手续费-->
        <!-- <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <mask
              id="mask0_848_11468"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <rect width="36" height="36" fill="var(--color-text-primary)" />
            </mask>
            <g mask="url(#mask0_848_11468)">
              <path
                d="M9 29.625C6.4 28.95 4.25 27.55 2.55 25.425C0.85 23.3 0 20.825 0 18C0 15.175 0.85 12.7 2.55 10.575C4.25 8.45 6.4 7.05 9 6.375V9.525C7.225 10.125 5.78125 11.2 4.66875 12.75C3.55625 14.3 3 16.05 3 18C3 19.95 3.55625 21.7 4.66875 23.25C5.78125 24.8 7.225 25.875 9 26.475V29.625ZM21 30C17.675 30 14.8438 28.8313 12.5063 26.4938C10.1688 24.1562 9 21.325 9 18C9 14.675 10.1688 11.8438 12.5063 9.50625C14.8438 7.16875 17.675 6 21 6C22.65 6 24.2 6.3125 25.65 6.9375C27.1 7.5625 28.375 8.425 29.475 9.525L27.375 11.625C26.55 10.8 25.5938 10.1562 24.5062 9.69375C23.4187 9.23125 22.25 9 21 9C18.5 9 16.375 9.875 14.625 11.625C12.875 13.375 12 15.5 12 18C12 20.5 12.875 22.625 14.625 24.375C16.375 26.125 18.5 27 21 27C22.25 27 23.4187 26.7688 24.5062 26.3063C25.5938 25.8438 26.55 25.2 27.375 24.375L29.475 26.475C28.375 27.575 27.1 28.4375 25.65 29.0625C24.2 29.6875 22.65 30 21 30ZM30 24L27.9 21.9L30.3 19.5H19.5V16.5H30.3L27.9 14.1L30 12L36 18L30 24Z"
                fill="var(--color-text-primary)"
              />
            </g>
          </svg>
          <div class="desc">
            <div class="txt1">{{ this.$t("personal.userManagement.otherList.poundage.text") }}</div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.otherList.poundage.label") }}
            </div>
          </div>
          <div class="wrap">
            <c-switch :value="switchValue" @click="switchChange" />
          </div>
        </div> -->
        <!--我的邀请码-->
        <div class="m-safeSet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <mask
              id="mask0_848_11454"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <rect width="36" height="36" fill="var(--color-text-primary)" />
            </mask>
            <g mask="url(#mask0_848_11454)">
              <path
                d="M18.75 17.925C19.475 17.125 20.0312 16.2125 20.4188 15.1875C20.8062 14.1625 21 13.1 21 12C21 10.9 20.8062 9.8375 20.4188 8.8125C20.0312 7.7875 19.475 6.875 18.75 6.075C20.25 6.275 21.5 6.9375 22.5 8.0625C23.5 9.1875 24 10.5 24 12C24 13.5 23.5 14.8125 22.5 15.9375C21.5 17.0625 20.25 17.725 18.75 17.925ZM27 30V25.5C27 24.6 26.8 23.7438 26.4 22.9313C26 22.1187 25.475 21.4 24.825 20.775C26.1 21.225 27.2812 21.8062 28.3688 22.5187C29.4563 23.2312 30 24.225 30 25.5V30H27ZM30 19.5V16.5H27V13.5H30V10.5H33V13.5H36V16.5H33V19.5H30ZM12 18C10.35 18 8.9375 17.4125 7.7625 16.2375C6.5875 15.0625 6 13.65 6 12C6 10.35 6.5875 8.9375 7.7625 7.7625C8.9375 6.5875 10.35 6 12 6C13.65 6 15.0625 6.5875 16.2375 7.7625C17.4125 8.9375 18 10.35 18 12C18 13.65 17.4125 15.0625 16.2375 16.2375C15.0625 17.4125 13.65 18 12 18ZM0 30V25.8C0 24.95 0.21875 24.1687 0.65625 23.4562C1.09375 22.7437 1.675 22.2 2.4 21.825C3.95 21.05 5.525 20.4688 7.125 20.0812C8.725 19.6937 10.35 19.5 12 19.5C13.65 19.5 15.275 19.6937 16.875 20.0812C18.475 20.4688 20.05 21.05 21.6 21.825C22.325 22.2 22.9062 22.7437 23.3438 23.4562C23.7812 24.1687 24 24.95 24 25.8V30H0ZM12 15C12.825 15 13.5313 14.7063 14.1188 14.1187C14.7063 13.5312 15 12.825 15 12C15 11.175 14.7063 10.4688 14.1188 9.88125C13.5313 9.29375 12.825 9 12 9C11.175 9 10.4688 9.29375 9.88125 9.88125C9.29375 10.4688 9 11.175 9 12C9 12.825 9.29375 13.5312 9.88125 14.1187C10.4688 14.7063 11.175 15 12 15ZM3 27H21V25.8C21 25.525 20.9312 25.275 20.7938 25.05C20.6562 24.825 20.475 24.65 20.25 24.525C18.9 23.85 17.5375 23.3438 16.1625 23.0063C14.7875 22.6688 13.4 22.5 12 22.5C10.6 22.5 9.2125 22.6688 7.8375 23.0063C6.4625 23.3438 5.1 23.85 3.75 24.525C3.525 24.65 3.34375 24.825 3.20625 25.05C3.06875 25.275 3 25.525 3 25.8V27Z"
                fill="var(--color-text-primary)"
              />
            </g>
          </svg>
          <div class="desc">
            <div class="txt1">
              {{ this.$t("personal.userManagement.otherList.myInviteCod.text") }}
            </div>
            <div class="txt2">
              {{ this.$t("personal.userManagement.otherList.myInviteCod.label") }}
            </div>
          </div>
          <div class="wrap">
            <div @click="modify(2)" class="btn">{{ this.$t("personal.tool.view") }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="user-management-content a-7-bd h-1-bg">-->
    <!--  <p class="title medium b-1-cl a-3-bd">-->
    <!--    {{ this.$t("personal.userManagement.securityTitle") }}-->
    <!--  </p>-->
    <!--  <div class="user-management-main clearfix">-->
    <!--    <ul class="ul">-->
    <!--      <li class="li clearfix">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_1"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl clearfix">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.securityList.password.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.securityList.password.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right clearfix">-->
    <!--            <c-button @click="changePassword" className="li-fun" type="text">-->
    <!--              {{ this.$t("personal.tool.modify") }}-->
    <!--            </c-button>-->
    <!--            &lt;!&ndash;-->
    <!--            <span class="li-fun b-4-cl clearfix" @click="changePassword">-->
    <!--            </span>-->
    <!--            &ndash;&gt;-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="li clearfix">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_2"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl clearfix">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.securityList.idAuth.text") }}-->
    <!--          </p>-->
    <!--          <p class="b-2-cl" v-if="authLevel !== 1">-->
    <!--            {{ this.$t("personal.userManagement.securityList.idAuth.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right clearfix">-->
    <!--            <c-button-->
    <!--              v-if="authLevel === 0"-->
    <!--              type="text"-->
    <!--              className="li-fun"-->
    <!--              @click="btnLink('goID')"-->
    <!--            >-->
    <!--              {{ this.$t("personal.state.authentication") }}-->
    <!--            </c-button>-->
    <!--            &lt;!&ndash;-->
    <!--            <span v-if="authLevel === 0" class="li-fun b-4-cl clearfix"-->
    <!--                  @click="btnLink('identity')">{{this.$t('personal').state.authentication}}-->
    <!--            </span>-->
    <!--            &ndash;&gt;-->
    <!--            <span v-if="authLevel === 1" class="li-fun b-2-cl clearfix li-fun-no">-->
    <!--              {{ this.$t("personal.state.certified") }}</span-->
    <!--            >-->
    <!--            <c-button-->
    <!--              v-if="authLevel === 2 || authLevel === 3"-->
    <!--              type="solid"-->
    <!--              :big="true"-->
    <!--              className="user-button"-->
    <!--              paddingW="18px"-->
    <!--              height="30px"-->
    <!--              @click="btnLink('identity')"-->
    <!--            >-->
    <!--              {{ this.$t("personal.state.certification") }}</c-button-->
    <!--            >-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="li clearfix">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_3"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl clearfix">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.securityList.email.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.securityList.email.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right clearfix">-->
    <!--            <c-button v-if="email" type="text" className="li-fun" @click="changeEmail">-->
    <!--              {{ this.$t("personal.tool.modify") }}-->
    <!--            </c-button>-->
    <!--            &lt;!&ndash;-->
    <!--            <span v-if="email"-->
    <!--                  class="li-fun b-4-cl clearfix"-->
    <!--                  @click="changeEmail">{{this.$t('personal').tool.modify}}</span>-->
    <!--                  &ndash;&gt;-->
    <!--            <c-button-->
    <!--              v-else-->
    <!--              type="solid"-->
    <!--              :big="true"-->
    <!--              className="user-button"-->
    <!--              paddingW="18px"-->
    <!--              height="30px"-->
    <!--              @click="btnLink('email')"-->
    <!--              >{{ this.$t("personal.tool.bind") }}</c-button-->
    <!--            >-->
    <!--            <p v-if="email" class="li-email b-2-cl clearfix">{{ email }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="li clearfix">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_4"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl clearfix">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.securityList.phone.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.securityList.phone.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right clearfix">-->
    <!--            <c-button v-if="smsCode && googleCode" type="text" className="li-fun li-fun1">-->
    <!--              <router-link class="b-4-cl" to="/personal/closePhone">-->
    <!--                {{ this.$t("personal.state.closeValidatio") }}</router-link-->
    <!--              >-->
    <!--            </c-button>-->
    <!--            <c-button-->
    <!--              v-if="!smsCode && mobileNumber"-->
    <!--              className="li-fun"-->
    <!--              type="text"-->
    <!--              style="margin-left: 22px"-->
    <!--              @click="openMobile"-->
    <!--            >-->
    <!--              {{ this.$t("personal.state.openValidatio") }}-->
    <!--            </c-button>-->
    <!--            <c-button v-if="mobileNumber" type="text" className="li-fun">-->
    <!--              <router-link class="b-4-cl" to="/personal/changePhone">-->
    <!--                {{ this.$t("personal.tool.modify") }}</router-link-->
    <!--              >-->
    <!--            </c-button>-->
    <!--            <c-button-->
    <!--              v-if="!mobileNumber"-->
    <!--              type="solid"-->
    <!--              :big="true"-->
    <!--              className="user-button"-->
    <!--              paddingW="18px"-->
    <!--              height="30px"-->
    <!--              @click="btnLink('phone')"-->
    <!--              >{{ this.$t("personal.tool.bind") }}</c-button-->
    <!--            >-->
    <!--            <p class="li-email b-2-cl clearfix" v-if="mobileNumber">{{ mobileNumber }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="li clearfix" style="border-bottom-width: inherit">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_5"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl clearfix">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.securityList.google.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.securityList.phone.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right clearfix">-->
    <!--            <c-button v-if="smsCode && googleCode" type="text" className="li-fun">-->
    <!--              <router-link class="b-4-cl" to="/personal/closeGoogle">-->
    <!--                {{ this.$t("personal.state.closeValidatio") }}</router-link-->
    <!--              >-->
    <!--            </c-button>-->
    <!--            &lt;!&ndash;-->
    <!--            <span v-if="smsCode&&googleCode" class="li-fun b-4-cl clearfix">-->
    <!--              <router-link class="b-4-cl" to="/personal/closeGoogle">-->
    <!--                {{this.$t('personal').state.closeValidatio}}</router-link></span>-->
    <!--                &ndash;&gt;-->
    <!--            <c-button-->
    <!--              v-if="!googleCode"-->
    <!--              type="solid"-->
    <!--              :big="true"-->
    <!--              className="user-button"-->
    <!--              paddingW="18px"-->
    <!--              height="30px"-->
    <!--              @click="btnLink('google')"-->
    <!--              >{{ this.$t("personal.tool.bind") }}</c-button-->
    <!--            >-->
    <!--            <span v-if="googleCode && !smsCode" class="li-fun b-2-cl clearfix">-->
    <!--              {{ this.$t("personal.state.open") }}</span-->
    <!--            >-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <p class="title medium b-1-cl a-3-bd clearfix title2" v-show="feeCoinOpen === '1'">-->
    <!--      {{ this.$t("personal.userManagement.otherTitle") }}-->
    <!--    </p>-->
    <!--    <ul class="ul">-->
    <!--      <li class="li">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-e_6"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.otherList.poundage.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.otherList.poundage.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right">-->
    <!--            <c-switch :value="switchValue" @click="switchChange" />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="li">-->
    <!--        &lt;!&ndash;icon占位用&ndash;&gt;-->
    <!--        <svg class="li-icon icon icon-24" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-b_11"></use>-->
    <!--        </svg>-->
    <!--        <div class="li-div a-3-bd b-1-cl">-->
    <!--          <p class="li-title">-->
    <!--            {{ this.$t("personal.userManagement.otherList.myInviteCod.text") }}-->
    <!--          </p>-->
    <!--          <p class="li-text b-2-cl">-->
    <!--            {{ this.$t("personal.userManagement.otherList.myInviteCod.label") }}-->
    <!--          </p>-->
    <!--          <div class="li-right">-->
    <!--            <c-button @click="modify(2)" type="text">-->
    <!--              {{ this.$t("personal.tool.view") }}-->
    <!--            </c-button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--  </div>-->
    <!--</div>-->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      paddingTop="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="titleText"
    >
      <!-- 验证框 -->
      <c-inputLine
        v-if="dialogType === 1"
        name="checkValue"
        maxLength="10"
        :promptText="promptText"
        :errorHave="true"
        :errorText="errorText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
        @focus="checkFocus"
      >
      </c-inputLine>
      <div class="clearfix invite-link-box">
        <c-button
          @click="goAgent"
          className="invite-link"
          v-if="userInfo && userInfo.agentStatus === 1 && dialogType === 2"
          type="text"
        >
          {{ this.$t("personal.userManagement.inviteLink") }}
        </c-button>
      </div>
      <!--查看邀请码-->
      <div class="dialog-div a-4-bg" v-if="dialogType === 2">
        <div class="dialog-div-module a-5-bd">
          <p>{{ $t("personal.label.inviteCode") }}</p>
          <p>
            <span class="b-2-cl">{{ inviteCode }}</span>
            <span
              @click="copyClick('inviteCode')"
              @mouseenter="handMouseenter('inviteCode')"
              @mouseleave="handMouseleave('inviteCode')"
            >
              <span v-if="inviteCodeShow">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
              </span>
              <span v-else>
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </span>
          </p>
        </div>
        <div class="dialog-div-module a-5-bd">
          <p>{{ $t("personal.label.inviteUrl") }}</p>
          <p>
            <span class="b-1-cl">{{ inviteUrl }}</span>
            <span
              @click="copyClick('inviteUrlShow')"
              @mouseenter="handMouseenter('inviteUrlShow')"
              @mouseleave="handMouseleave('inviteUrlShow')"
            >
              <span v-if="inviteUrlShow">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
              </span>
              <span v-else>
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </span>
          </p>
        </div>
        <div class="dialog-div-module a-5-bd">
          <p>{{ $t("personal.label.inviteQECode") }}</p>
          <div class="img-div">
            <img :src="inviteQECode" />
          </div>
        </div>
      </div>
    </c-dialog>
    <!-- 实名认证 -->
    <c-dialog
      :showFlag="kycPhoneFlag"
      paddingBottom="14px"
      :titleText="$t('personal.idAuth.title')"
      @close="kycPhoneClose"
      @confirm="kycPhoneConfirm"
      :confirmLoading="kycLoading"
    >
      <!-- 请选择您的国家或地区 -->
      <c-select
        :value="country"
        :promptText="$t('personal.kyc.area')"
        @onChanges="countryChange"
        name="certificateType"
        :imgMap="imgMap"
        :errorHave="true"
        :options="countryListMoy"
        :filterable="true"
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :buttonText="this.$t('personal').alert.button"
      imageType="1"
      :imgMap="imgMap"
      @close="alertClose"
      @confirm="alertGo"
    >
      <div class="alertTitle b-1-cl">{{ this.$t("personal.alert.title") }}</div>
      <div class="alertText">{{ this.$t("personal.alert.text") }}</div>
      <div class="alertError">
        <span class="alertError-text">{{ $t("personal.alert.alertErrorTextGoogle") }}</span>
        <svg class="icon icon-14 alertError-icon" aria-hidden="true">
          <use xlink:href="#icon-a_14"></use>
        </svg>
      </div>
      <!-- 2023.05.29 反馈文档要求去掉 -->
      <!--<div class="alertErrorr alertBot a-2-bd">-->
      <!--  <span class="alertError-text b-4-cl"> {{ $t("personal.alert.alertErrorTextPhone") }}</span>-->
      <!--  <svg class="icon icon-14 alertError-icon" aria-hidden="true">-->
      <!--    <use xlink:href="#icon-a_14"></use>-->
      <!--  </svg>-->
      <!--</div>-->
    </c-alert>
    <kycAuthselect
      :countryVal="country.split('+')[1]"
      :countryKeyCodeVal="countryKeyCode.split('+')[1]"
    />
  </div>
</template>

<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/UserManagement/UserManagement";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/personal/UserManagement/UserManagement.styl";
import kycAuthselect from "./kycAuthselect.vue";

export default {
  mixins: [mixin],
  components: { kycAuthselect },
  mounted() {
    this.init();
  },
  methods: {
    // 改，2022.11.15 新增上传完成回调
    uploadFinish() {
      this.$store.dispatch("getUserInfo");
    },
  },
};
</script>

<style scoped>
.user-management-header-img {
  cursor: pointer;
  position: relative;
}
.user-management-header-img > .user-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.m-greenDot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: gray;
}
.m-greenDot.active {
  background-color: green;
}
</style>
<style scoped>
/* 2023.03.01 样式重构 */
.user-management.m-page {
  width: calc(100% - 88px);
  padding: 66px 44px;
}
.m-page {
  background-color: var(--color-BG);
}
.m-userHeader-Box {
  width: 100%;
}
.m-userHeader {
  display: flex;
  align-items: center;
  position: relative;
  background: var(--color-BG-Light);
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--color-Toggle);
  padding: 28px 24px;
}
.m-userHeader .bg {
  width: 149px;
  height: 126px;
  position: absolute;
  top: 50%;
  right: 64px;
  transform: translateY(-50%);
  object-fit: contain;
}
.m-userHeader .avatar {
  width: 68px;
  height: 68px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}
.m-userHeader .avatar > .upload {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
/*.m-userHeader .avatar > .upload:hover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}*/
.m-userHeader .avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.m-userHeader > .info {
  height: 80px;
  margin-left: 24px;
}
.m-userHeader > .info > .userName {
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
  font-family: Outfit;
  font-weight: 700;
}
.m-userHeader > .info > .userName > .edit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
}
.m-userHeader > .info > .msg {
  display: flex;
  align-items: center;
  margin-top: 4px;
}
.m-userHeader > .info > .msg .key {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-secondary);
}
.m-userHeader > .info > .msg .val {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-1);
  margin-top: 4px;
}
.m-userHeader > .info > .msg > .userMail {
  margin-left: 40px;
}

.m-userContent > .userContent {
  font-family: Outfit;
  margin-top: 20px;
}
.m-safeSet {
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-Toggle);
}
.m-safeSet > .desc {
  margin-left: 20px;
}
.m-safeSet > .desc > .txt1 {
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: var(--color-1);
}
.m-safeSet > .desc > .txt2 {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: var(--color-text-secondary);
  margin-top: 2px;
}
.m-safeSet > .wrap > .btn {
  cursor: pointer;
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid var(--color-BTN-secondary-border);
  color: var(--color-BTN-text-secondary-revert);
}

.m-safeSet > .positionRight {
  color: var(--color-text-secondary);
  position: absolute;
  right: 36px;
}
.m-safeSet > .wrap > .btnLeftTxt {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: var(--color-text-secondary);
}
.m-safeSet > .wrap {
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}
.m-safeSet > .wrap > div:not(:last-child) {
  margin-right: 10px;
}

/deep/.switchWrap .circleChecked {
  background: #fff;
}
/deep/.switchBottomChecked {
  background: var(--mainColor);
}

/deep/.common-button.u-8-bg {
  background: var(--mainColor);
}
/deep/.common-dialog .closeBtnClass {
  color: var(--mainColor);
}

.user-management .invite-link-box {
  margin-bottom: 20px;
}
/deep/.common-button .common-button-slot.u-8-cl {
  color: var(--mainColor);
}
.user-management .dialog-div .dialog-div-module {
  /* background: var(--color-BG-Light); */
}
</style>
