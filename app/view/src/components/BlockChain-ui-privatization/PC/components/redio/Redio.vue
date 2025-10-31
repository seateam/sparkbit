// Created by 任泽阳 on 18/12/17. // 复选框组件
<template>
  <section class='common-redio' @click='handClick'>
    <div v-if='value' class="checked">
      <span></span>
    </div>
    <div v-else>
      <span></span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'c-redio',
  props: {
    value: { default: false, type: Boolean },
    name: { default: '', type: String },
    // className: { default:  }
  },
  methods: {
    handClick() {
      this.$emit('click', this.name);
    },
  },
};
</script>
<style lang='stylus'>
.common-redio {
  display: inline-block;
  cursor pointer;
  overflow: hidden;
}
.common-redio div{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 2px solid var(--color-text-secondary);
}
.common-redio div.checked span{
  width: 6px;
  height: 6px;
  background-color: var(--color-Icon);
  border-radius: 100%;
}
.common-redio .checked {
  background-color: var(--color-BG);
  border: 2px solid var(--color-Icon);
}
</style>
