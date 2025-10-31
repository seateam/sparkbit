// Created by 任泽阳. // otc温馨提示 // *****************************
<template>
  <section class='otcReminder b-3-cl'>
    <!-- 温馨提示 -->
    <!-- <p class='otcReminder-title' @click='handClick'>
      {{ $t('components.otcReminder.title') }}
    </p> -->
    <ul class='otcReminder-list' v-if='flag'>
      <!-- 1.交易前请详细了解对方的交易信息。 -->
      <li>{{ $t('components.otcReminder.text1') }}</li>
      <!-- 2.请通过平台进行沟通约定，并保存好相关聊天记录。 -->
      <li>{{ $t('components.otcReminder.text2') }}</li>
      <!-- 3.如遇到交易纠纷，可通过申诉来解决问题。 -->
      <li>{{ $t('components.otcReminder.text3') }}</li>
      <li>{{ $t('components.otcReminder.text4') }}</li>
      <li>{{ $t('components.otcReminder.text5') }}</li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'c-otcReminder',
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    handClick() {
      this.flag = !this.flag;
    },
  },
};
</script>
<style lang='stylus' scoped>
.otcReminder {
  margin-top: 72px;
  font-size: 12px;
  .otcReminder-title {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: var(--color-1);
  }
  .otcReminder-list {
    color: var(--color-text-secondary);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;

    li {
      max-width: 680px;
    }
  }
}
</style>
