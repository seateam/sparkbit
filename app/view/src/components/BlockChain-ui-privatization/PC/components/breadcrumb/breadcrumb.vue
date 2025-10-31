<template>
  <div
    class="breadcrumb-wrap"
    :class="breadcrumbClass"
    style="
      --breadcrumb-color: var(--color-text-primary);
      --breadcrumb-link-color: var(--color-text-secondary);
      --breadcrumb-color-hover: var(--color-text-primary);
      --breadcrumb-color-active: var(--color-text-primary);
      --breadcrumb-padding: 0;
      --breadcrumb-separator-color: var(--color-text-secondary);
    "
    :style="breadcrumbStyle"
  >
    <div class="breadcrumb-item" v-for="(route, index) in routes" :key="index">
      <component
        :is="route.path ? 'a' : 'span'"
        class="breadcrumb-link"
        :class="{
          'link-hover': route.path,
          'link-active': index === breadcrumbAmount - 1,
        }"
        :style="`max-width: ${maxWidth}px;`"
        href="#"
        @click.prevent="getTargetUrl(route)"
        :target="target"
      >
        {{ route.name }}
      </component>
      <span
        v-if="index < breadcrumbAmount - 1"
        class="breadcrumb-separator"
        :style="separatorStyle"
      >
        <slot name="separator" :route="route" :index="index">
          <span v-if="separator">{{ separator }}</span>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path d="M3.45 5L0 1.55L1.05 0.5L5.55 5L1.05 9.5L0 8.45L3.45 5Z" fill="#999999" />
          </svg>
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-Breadcrumb",
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    breadcrumbClass: { default: "", type: String },
    breadcrumbStyle: { default: () => ({}), type: Object },
    maxWidth: { default: "100%", type: String },
    separator: { default: undefined, type: String },
    separatorStyle: { default: () => ({}), type: Object },
    target: { default: "_self", type: String },
  },
  computed: {
    breadcrumbAmount() {
      return this.routes.length;
    },
  },
  methods: {
    getTargetUrl(route) {
      if (!route.path) return;
      let targetUrl = "";
      if (route.path) {
        targetUrl = route.path;
      }
      if (route.query && JSON.stringify(route.query) !== "{}") {
        const { query } = route;
        Object.keys(query).forEach((param, index) => {
          if (index === 0) {
            targetUrl = `${targetUrl}?${param}=${query[param]}`;
          } else {
            targetUrl = `${targetUrl}&${param}=${query[param]}`;
          }
        });
      }
      this.$router.push(targetUrl);
    },
  },
};
</script>
<style lang="stylus">
.breadcrumb-wrap {
  color: var(--breadcrumb-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    .breadcrumb-link {
      display: inline-block;
      color: var(--breadcrumb-link-color);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: var(--breadcrumb-padding);
      text-decoration: none;
      cursor: text;
      transition:
        color 0.2s,
        background-color 0.2s;
    }
    .link-hover {
      cursor: pointer;
      &:hover {
        color: var(--breadcrumb-color-hover);
      }
    }
    .link-active {
      color: var(--breadcrumb-color-active);
    }
    .breadcrumb-separator {
      display: inline-flex;
      align-items: center;
      margin: 0 6px;
      color: var(--breadcrumb-separator-color);
      :deep(svg) {
        fill: currentColor;
      }
    }
  }
}
</style>
<style scoped>
.breadcrumb-wrap.space-tl {
  padding: 20px 0 0 20px;
}
</style>
