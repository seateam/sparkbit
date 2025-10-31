<template>
  <div class="sel_warp" v-click-outside="closeOptions">
    <div class="sel_box" @click="toggleOptions">
      <div>{{ activeSel }}</div>
      <img src="@/assets/images/1/selIcon_g.svg" alt="" srcset="">
    </div>
    <ul v-show="showOptions" class="selOptions">
      <li v-for="(item,index) in selList" :key="item + index"
          :class="{selected:activeIndex == index}" @click="handleSelected(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        const handler = (e) => {
          if (!el.contains(e.target)) {
            binding.value();
          }
        };
        document.addEventListener('click', handler);
        el._clickOutsideHandler = handler;
      },
      unbind(el) {
        document.removeEventListener('click', el._clickOutsideHandler);
      },
    },
  },
  props: {
    defaultSel: {
      type: [String, Number],
      defaule: 0,
    },
    selList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeSel: this.selList[this.defaultSel].name,
      activeIndex: 0,
      showOptions: false,

    };
  },

  methods: {
    handleSelected(item) {
      this.activeIndex = item.id;
      this.activeSel = item.name;
      this.showOptions = !this.showOptions;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    closeOptions() {
      this.showOptions = false;
    },
  },
};
</script>

<style scoped>

.sel_warp {
  width: 100%;
  height: 32px;
  padding: 0 9px;
  /*background-color: rgba(17, 18, 20, 1);*/
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
}

.sel_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

}

.selOptions {
  position: absolute;
  width: 100%;
  background-color: rgba(17, 18, 20, 1);
}

li {
  height: 32px;
  line-height: 32px;
}

</style>
