<template>
  <div class="noticeBoardBox" v-if="noticeInfoList.length" :class="{ isExtend: expand }">
    <div class="box_left">
      <div
        v-for="(item, index) in noticeInfoList"
        @click="linkTo(`/noticeInfo/${item.id}`)"
        class="noticeInfo"
      >
        <div class="title">
          <span>{{ item.title }}</span>
          <span>{{ calFormatter(item.timeLong) }}</span>
        </div>
      </div>
    </div>
    <div class="box_right">
      <div @click="linkTo('/noticeInfo')" :class="{ extendIcon: expand }">
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.68913 4.94466L1.28913 0.611328L0.355794 1.54466L5.68913 6.87799L11.0225 1.54466L10.0891 0.611328L5.68913 4.94466Z"
            fill="#848E9C"
          />
        </svg>
      </div>
      <div @click="$emit('close')">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.3145 9.94531C18.3145 11.1272 18.0817 12.2975 17.6294 13.3895C17.1771 14.4814 16.5141 15.4735 15.6784 16.3093C14.8427 17.145 13.8505 17.8079 12.7586 18.2602C11.6667 18.7125 10.4964 18.9453 9.31445 18.9453C8.13256 18.9453 6.96223 18.7125 5.8703 18.2602C4.77837 17.8079 3.78622 17.145 2.95049 16.3093C2.11476 15.4735 1.45183 14.4814 0.999537 13.3895C0.547245 12.2975 0.314453 11.1272 0.314453 9.94531C0.314453 7.55836 1.26266 5.26918 2.95049 3.58135C4.63832 1.89352 6.9275 0.945312 9.31445 0.945312C11.7014 0.945313 13.9906 1.89352 15.6784 3.58135C17.3662 5.26918 18.3145 7.55836 18.3145 9.94531ZM11.0815 9.94531L14.0875 12.9503L12.3195 14.7183L9.31445 11.7123L6.30945 14.7173L4.54145 12.9493L7.54645 9.94431L4.54145 6.93931L6.30945 5.17231L9.31445 8.17531L12.3195 5.17031L14.0875 6.93731L11.0815 9.94531Z"
            fill="#3D4653"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeInfoList: [],
      expand: false,
    };
  },
  mounted() {
    this.getMessage();
  },
  computed: {
    calFormatter() {
      return (ctime) => {
        const date = new Date(ctime);
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        return `(${mm}-${dd})`;
      };
    },
  },
  methods: {
    // 跳转
    linkTo(path) {
      this.$router.push(path);
    },
    // 获取Msg
    getMessage() {
      this.axios({
        url: this.$store.state.url.notice.notice_list,
        params: {
          page: 1,
          pageSize: 3,
        },
        method: "post",
      })
        .then((data) => {
          if (data.code === "0") {
            this.noticeInfoList = data.data.noticeInfoList;
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="stylus">
.box_left,.box_right {
  display flex
  justify-content space-between
  align-items center
}
.noticeBoardBox {
  display flex
  justify-content space-between
  height: 48px;
  padding 0 48px
  background: #1E2026;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 24px;
  color: #848E9C;
  transition all ease-in-out .3s
  &.isExtend {
    height 150px
  }
  .noticeInfo {
    display flex
    justify-content space-between
    align-items center
    width 30%
    cursor pointer
    .title {
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      display flex;
      align-items center;
    }
  }
  .box_left {
    width 90%;
    justify-content unset
  }
  .box_right {
    width 5%
    div {
      height 100%
      display flex
      justify-content center
      align-items center
      cursor pointer
    }
    & div:nth-child(1) {
      transition all ease-in-out .3s
    }

    .extendIcon{
      transform rotate(180deg)
    }

  }
}
</style>
<style scoped>
.noticeBoardBox .noticeInfo .title {
  overflow: visible;
}
</style>
