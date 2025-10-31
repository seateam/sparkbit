<!-- 2023.01.07 新增verify页面 BY HFF -->
<template>
  <div class="m-page">
    <div class="m-ct" :style="`background-image: url(${ result == 'right' ? bgGreen : (result == 'error' ? bgRed : '') })`">
      <img class="logo2" :src="logoUrl">
      <div class="tips">please make sure you are visiting {{ exUrl }}</div>
      <div class="m-search">
        <input class="input" type="text">
        <div class="btn">
          <img class="img" :src="icon.search">
        </div>
      </div>
      <div v-if="result" class="result" :class="{ 's-right': result == 'right', 's-error': result == 'error' }">
        <img class="icon" :src="result == 'right' ? icon.right : (result == 'error' ? icon.error : '')">
        <div class="txt">This is the official channel of {{ companyName }}</div>
      </div>
      <div class="tips2">
        Please enter the verification relevant info (e.g. email, phone number, Telegram, Twitter or Discord to check if the person is an official
        {{ companyName }} representative. Stay safe from scammers.
      </div>
    </div>
  </div>
</template>

<script>
import { imgMap } from "@/utils";

export default {
  name: "index",
  data() {
    return {
      icon: {
        search: imgMap.icon_search,
        right: imgMap.icon_right,
        error: imgMap.icon_error,
      },
      bgGreen: imgMap.bgGreen,
      bgRed: imgMap.bgRed,
      result: 'right',
    };
  },
  computed: {
    publicInfo() {
      return this.$store.state.baseData.publicInfo;
    },
    exUrl() {
      const { publicInfo } = this;
      return publicInfo ? publicInfo.url.exUrl : "";
    },
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    logoUrl() {
      let url = "";
      const { publicInfo } = this;
      if (publicInfo && publicInfo.msg && publicInfo.msg.logoUrl) {
        url = publicInfo.msg.logoUrl || imgMap.logo;
      }
      return url;
    },
  },
};
</script>

<style scoped>
.m-page {
  display: flex;
  justify-content: center;
  height: 800px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 108px;
}
.m-ct {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: 558px 370px;
  background-position: 50% 18%;
}
.m-ct > .logo2 {
  width: 151px;
  height: 48px;
  object-fit: contain;
}
.m-ct > .tips {
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 40px;

}
.m-ct > .tips2 {
  width: 680px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 40px;
}
.m-ct > .result {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}
.m-ct > .result > .icon {
  width: 16px;
  height: 16px;
  padding-right: 8px;
}
.m-ct > .result > .txt {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}
.m-ct > .result.s-right > .txt {
  color: #37D689;
}
.m-ct > .result.s-error > .txt {
  color: #F15A5A;
}

.m-search {
  position: relative;
  width: 680px;
  height: 64px;
  background: rgba(207, 229, 255, 0.12);
  border-radius: 16px;
  margin-top: 24px;
}
.m-search > .input {
  width: 90%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}
.m-search > .btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 48px;
  background: linear-gradient(289.8deg, #0D8BFF 0%, #3DC5FF 100%);
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-search > .btn > .img {
  width: 20px;
  height: 20px;
}
</style>
