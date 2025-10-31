<template>
  <div class="m-select faNumber" :style="calStyle" @mouseleave="mouseleaveHandler">
    <div class="placeholder faNumber" v-show="!showInput" @click="clickInput">
      <template v-if="activeItem[showKey]">
        <slot name="placeholder" :activeItem="activeItem">
          <div class="flex gap_8">
            <img v-if="activeItem.icon" :src="activeItem.icon" />
            {{ activeItem[showKey] }}
          </div>
        </slot>
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </div>
    <div class="inputBox" v-show="showInput">
      <input
        ref="searchInput"
        v-model="search"
        @paste="pasteHandler"
        @input="inputHandler"
        @keydown.enter="handleEnter"
        @blur="handleBlur"
        :placeholder="placeholder"
      />
    </div>
    <div class="options" :style="{ top: isH5 ? '40px' : height }">
      <div class="wrap scrollCls" v-if="calOptions.length">
        <div class="item flex gap_8 faNumber" v-for="item in calOptions" @click="select(item)">
          <img v-if="item.icon" :src="item.icon" />
          {{ item[showKey] }}
        </div>
      </div>
      <div class="noData" v-else>{{ $t("components.select.noData") }}</div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      aria-hidden="true"
      style="font-size: 8px"
    >
      <path
        data-v-1297bc35=""
        d="M4.39714 5.08317L0.230469 0.916504H8.5638L4.39714 5.08317Z"
        fill="var(--color-text-primary)"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "h-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    nameKey: {
      type: String,
      default: "",
    },
    showKey: {
      type: String,
      default: "value",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "48px",
    },
    fontSize: {
      type: String,
      default: "14px",
    },
    bodyStyle: {
      type: [String, Object],
      default: "",
    },
    // 是否可查询
    isFilter: {
      type: Boolean,
      default: true,
    },
    // 是否可新增
    canAdded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeItem: {},
      showInput: false,
      search: "",
    };
  },
  computed: {
    isH5() {
      return this.$store.state.baseData.isH5;
    },
    calStyle() {
      if (this.isH5) {
        return [
          {
            width: this.width,
            height: "40px",
            fontSize: this.fontSize,
          },
          this.bodyStyle,
        ];
      }
      return [
        {
          width: this.width,
          height: this.height,
          fontSize: this.fontSize,
        },
        this.bodyStyle,
      ];
    },
    calOptions() {
      const { isFilter, options, search, showKey } = this;
      if (isFilter && search) {
        return options.filter((item) => item[showKey].includes(search.toUpperCase()));
      }
      return options;
    },
  },
  watch: {
    options: {
      handler(val) {
        const { value, activeItem } = this;
        if (val && val.length && value && !activeItem.code) {
          this.activeItem = val.find((item) => item.code === value) || {};
        }
      },
      deep: true,
      immediate: true,
    },
    value(val) {
      const { showKey } = this;
      if (val) {
        this.activeItem = this.options.find((item) => item[showKey] === val) || {};
      } else {
        this.activeItem = {};
      }
    },
  },
  methods: {
    // 输入事件处理
    inputHandler() {
      // 实时搜索过滤，已经通过computed calOptions实现
      // 这里可以添加其他输入处理逻辑
    },
    // 回车键处理
    handleEnter() {
      const { search, calOptions, canAdded } = this;
      if (search.trim()) {
        // 如果有匹配的选项，选择第一个
        if (calOptions.length > 0) {
          this.select(calOptions[0]);
        } else if (canAdded) {
          // 如果没有匹配项且允许新增，创建新选项
          this.createNewOption(search.trim());
        }
      }
    },
    // 失焦处理
    handleBlur() {
      // 延迟隐藏，避免点击选项时立即隐藏
      setTimeout(() => {
        const { search, canAdded } = this;
        if (search.trim() && canAdded) {
          // 如果有输入内容且允许新增，创建新选项
          this.createNewOption(search.trim());
        } else {
          this.showInput = false;
          this.search = "";
        }
      }, 200);
    },
    // 创建新选项
    createNewOption(text) {
      const { options, showKey } = this;
      // 检查是否已存在
      const existing = options.find((item) => item[showKey] === text);
      if (existing) {
        this.select(existing);
        return;
      }

      // 创建新选项
      const newOption = {
        value: text,
        code: text,
        [showKey]: text,
        label: text.slice(-4), // 使用后4位作为标签
      };

      // 添加到选项列表开头
      this.options.unshift(newOption);

      // 设置为选中项
      this.activeItem = newOption;
      this.showInput = false;
      this.search = "";

      // 触发选择事件
      this.$emit("selectChange", { itemData: newOption, key: this.nameKey, val: newOption.code });
    },
    // 粘贴事件处理
    pasteHandler(e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text");
      if (text) {
        // 创建新选项
        const newOption = {
          value: text,
          code: text,
          label: text,
          [this.nameKey]: text,
        };

        // 添加到选项列表开头
        this.options.unshift(newOption);

        // 设置为当前选中项
        this.activeItem = newOption;
        this.showInput = false;
        this.search = "";

        // 触发粘贴事件
        this.$emit("selectPaste", text);
        // 触发选择事件
        this.$emit("selectChange", { itemData: newOption, key: this.nameKey, val: newOption.code });
      }
    },
    mouseleaveHandler() {
      // 延迟隐藏，避免用户正在输入时意外隐藏
      setTimeout(() => {
        if (!this.$refs.searchInput || document.activeElement !== this.$refs.searchInput) {
          this.search = "";
          this.showInput = false;
        }
      }, 100);
    },
    // 点击展示输入
    clickInput() {
      if (this.isFilter) {
        this.showInput = true;
        if (this.$refs.searchInput) {
          this.$nextTick(() => {
            this.$refs.searchInput.focus();
          });
        }
      }
    },
    select(e) {
      if (this.isFilter) {
        this.showInput = false;
      }
      this.activeItem = e;
      this.$emit("selectChange", { itemData: e, key: this.nameKey, val: e.code });
    },
  },
};
</script>

<style scoped>
.m-select {
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-radius: 8px;
  border: 1px solid var(--color-Input-border);
  cursor: text;
  user-select: none;
  position: relative;
  padding: 0 14px;
  background: var(--color-Input-fill);
  font-size: 14px;
  color: var(--color-text-primary);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
}
.m-select .placeholder {
  font-size: 14px;
  flex: 1;
  color: var(--color-text-secondary);
}
.m-select .placeholder .flex {
  color: var(--color-text-primary);
}
.m-select:hover svg {
  transform: rotate(180deg);
  transition: all 500ms ease;
}
.m-select:hover .options {
  display: block;
}
.m-select .options {
  width: 100%;
  background: var(--color-BG-Light);
  border: 1px solid var(--color-border);
  box-sizing: border-box;
  position: absolute;
  top: 44px;
  left: 0;
  border-radius: 8px;
  box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.28);
  display: none;
  z-index: 9;
}
.m-select .options .wrap {
  width: 100%;
  height: 100%;
  max-height: 400px;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;
}
.m-select .options .noData {
  color: var(--color-text-secondary);
  font-size: 14px;
  padding: 0 14px;
}
.m-select .options .wrap .item {
  font-size: 14px;
  color: var(--color-text-primary);
  box-sizing: border-box;
  padding: 12px;
  border-radius: 6px;
  line-height: 1.4;
  white-space: wrap;
  word-break: break-all;
  cursor: pointer;
}
.m-select .options .wrap .item:hover {
  background-color: var(--color-Hover);
}
.m-select .options .wrap .item img,
.m-select .placeholder img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.isH5 .m-select {
  font-size: 13px;
  line-height: 1.4;
}
.inputBox {
  width: 100%;
  flex: 1;
}
.inputBox input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  color: var(--color-text-primary);
  font-size: 14px;
  border: none;
  outline: none;
  background: transparent;
}

.flex {
  display: flex;
  align-items: center;
}

.gap_8 {
  gap: 8px;
}

.scrollCls {
  overflow-y: auto;
}
</style>
