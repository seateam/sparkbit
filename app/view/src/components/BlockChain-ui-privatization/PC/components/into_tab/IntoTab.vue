// Created by 任泽阳 on 18/12/17. // 登录/注册/重置密码 手机/邮箱切换
<template>
  <ul class="into-tab a-2-bd" :class="`${disabled ? 'userNone' : ''} ${className}`">
    <!-- 改，2022.10.11，新增style -->
    <li
      v-for="(item, index) in list"
      :key="index"
      @click="setNowKey(item.key)"
      :class="nowKey === item.key ? 'b-1-cl' : ''"
      :style="evenStyle(nowKey === item.key)"
    >
      {{ item.name }}
    </li>
    <!-- 改，2022.10.11，注释 -->
    <!-- <span :style="barStyle" class="a-12-bg"></span> -->
  </ul>
</template>
<script>
export default {
  name: "c-intoTab",
  props: {
    className: { default: "", type: String }, // 根节点class
    list: { default: [] }, // [{name: xx, key: xx}]
    nowKey: { default: "", type: String }, // 当前值
    disabled: { default: false, type: Boolean }, // 是否可点击
  },
  computed: {
    // 下划线样式
    barStyle() {
      const area = 100 / this.list.length; // 每份占位宽度
      let ind = 0;
      this.list.forEach((item, i) => {
        if (item.key === this.nowKey) {
          ind = i;
        }
      });
      return {
        width: `${area}%`,
        left: `${ind * area}%`,
      };
    },
    // 改，2022.10.11，注释
    // 每一项样式
    // evenStyle() {
    //   const area = 100 / this.list.length; // 每份占位宽度
    //   return { width: `${area}%` };
    // },
  },
  methods: {
    setNowKey(item) {
      if (this.disabled) {
        return;
      }
      this.$emit("onchenges", item);
    },
    evenStyle(isActive) {
      if (isActive) {
        return {
          "border-bottom-color": "#226afd",
        };
      }
      return {
        "border-bottom-color": "#15181c",
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
.userNone {
  li {cursor: no-drop!important}
}
// 改，2022.10.11
.into-tab {
  width: 380px;
  height: 40px;
  // border-bottom-width: 2px;
  // border-bottom-style: solid;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    position: absolute;
    height: 2px;
    width: 50%;
    bottom: -2px;
    transition: all 0.3s!important;
    left: 0;
  }
  li {
    // float: left;
    // width: 50%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    user-select: none
    border-bottom-width: 2px;
    border-bottom-style: solid;
    margin-right: 32px;
    font-weight: 500;
    font-size: 18px;
  }
}
</style>
