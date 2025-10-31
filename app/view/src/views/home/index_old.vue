<template>
  <section>
    <c-homeDialog></c-homeDialog>
  </section>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/home/index";

export default {
  mixins: [mixin],
  components: {},
  computed: {
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
  watch: {
    lan: {
      immediate: true,
      handler() {
        const dict = {
          zh_CN: "zh-cn",
          ko_KR: "ko-kr",
          en_US: "",
        };
        const lang = dict[this.lan] || "";
        window.location.replace(`https://home.sparkbit.io/${lang}`);
        // this.$router.push('/notfound');
      },
    },
  },
};
</script>
