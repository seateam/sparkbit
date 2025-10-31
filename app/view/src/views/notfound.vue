<template>
  <div class="notfound home-bg">
    <div class="no-data b-2-cl">
      <div class="code">404</div>
      <img class="dark-show" width="162px" height="240px" :src="noData" />
      <img class="light-show" width="162px" height="240px" :src="noData_1" />
      <p>
        <!-- 暂无数据 -->
        {{ $t("common.notfound") }}
      </p>
    </div>
  </div>
</template>
<script>
import { imgMap } from "@/utils";

export default {
  name: "notfound",
  data() {
    return {
      noData: imgMap.empty,
      noData_1: imgMap.empty_1,
    };
  },
};
</script>
<style scoped>
.code {
  margin-bottom: 20px;
  text-align: center;
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 13px;
  color: var(--color-BG);
  text-shadow: 0 1px var(--color-text-primary), 1px 0 var(--color-text-primary),
    -1px 0 var(--color-text-primary), 0 -1px var(--color-text-primary);
}
.notfound {
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
