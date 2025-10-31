<!-- 改，2022.12.20 样式重构 -->
<template>
  <!-- 改，2022.10.01，a-3-bd -> a-3-bd-c -->
  <div class="co-trade-box e-2-cl" id="coTradeBox">
    <div v-if="false" class="title-block a-3-bd-c">
      <span
        class="tab"
        :class="showClassType === 'depositDialogShow' ? 'active' : ''"
        @click="setShowDialog('depositDialogShow')"
      >
        {{ marginModelText }}
      </span>
      <span
        class="tab"
        :class="showClassType === 'leverageDialogShow' ? 'active' : ''"
        @click="setShowDialog('leverageDialogShow')"
      >
        {{ nowLevel }}X
      </span>
      <!--<div class="more">-->
      <!--  <svg width="3" height="12" viewBox="0 0 3 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <rect x="0.451172" y="0.990234" width="2.30332" height="2.29364" rx="0.0411307" fill="#78808E"/>-->
      <!--    <rect x="0.451172" y="5.08594" width="2.30332" height="2.29364" rx="0.0411307" fill="#78808E"/>-->
      <!--    <rect x="0.451172" y="9.18164" width="2.30332" height="2.29364" rx="0.0411307" fill="#78808E"/>-->
      <!--  </svg>-->
      <!--  <div class="moreTool">-->
      <!--    <div class="item" @click="showDialog('OPEN_CALCULATOR_DIALOG')">-->
      <!--      <i class="set-btn-icon">-->
      <!--        <svg class="icon icon-18 hover-show" aria-hidden="true">-->
      <!--          <use xlink:href="#icon-b_39_1"></use>-->
      <!--        </svg>-->
      <!--        <svg class="icon icon-18 hover-hide" aria-hidden="true">-->
      <!--          <use xlink:href="#icon-b_39"></use>-->
      <!--        </svg>-->
      <!--      </i>-->
      <!--      <div class="name">{{ $t('futures.calculator.text1') }}</div>-->
      <!--    </div>-->
      <!--    <div class="item" @click="showDialog('SET_FUTURE_CONFIG')">-->
      <!--      <i class="set-btn-icon" @click="showDialog('SET_FUTURE_CONFIG')">-->
      <!--        <svg class="icon icon-18 hover-show" aria-hidden="true">-->
      <!--          <use xlink:href="#icon-b_2_1"></use>-->
      <!--        </svg>-->
      <!--        <svg class="icon icon-18 hover-hide" aria-hidden="true">-->
      <!--          <use xlink:href="#icon-b_2"></use>-->
      <!--        </svg>-->
      <!--      </i>-->
      <!--      <div class="name">{{ $t('futures.setFutures.titleText') }}</div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <div class="counter-and-set">
        <!-- 合约计算器按钮 -->
        <i class="set-btn-icon" @click="showDialog('OPEN_CALCULATOR_DIALOG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_39_1"></use>
          </svg>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_39"></use>
          </svg>
        </i>
        <!-- 合约设置按钮 -->
        <i class="set-btn-icon" @click="showDialog('SET_FUTURE_CONFIG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_2_1"></use>
          </svg>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_2"></use>
          </svg>
        </i>
      </div>
    </div>
    <div class="title-block a-3-bd-c">
      <span
        class="tab"
        v-for="(item, index) in switchTradeTypeList"
        :key="index"
        @click="switchTradeType(item.id)"
        :class="{ active: transactionType === item.id }"
        >{{ item.text }}</span
      >
    </div>
    <div class="trade-form">
      <!-- 开仓 平仓 (双向持仓可开启)-->
      <!--<div class="category-select-box" v-if="positionModel === 2">-->
      <!--  <span-->
      <!--    class="tab"-->
      <!--    v-for="(item, index) in switchTradeTypeList"-->
      <!--    :key="index"-->
      <!--    @click="switchTradeType(item.id)"-->
      <!--    :class="item.classes"-->
      <!--  >-->
      <!--    <i class="h">{{ item.text }}</i>-->
      <!--    <i class="s b-1-cl">{{ item.text }}</i>-->
      <!--  </span>-->
      <!--</div>-->
      <!-- 价格类型 限价单、市价单、条件单  -->
      <!-- 改，2022.12.28 修改tab样式 -->
      <!--<div class="category-select-box">-->
      <!--  &lt;!&ndash; style="background-color: #226afd" &ndash;&gt;-->
      <!--  <span-->
      <!--    class="tab"-->
      <!--    v-for="(item, index) in categoryList"-->
      <!--    :key="index"-->
      <!--    @click="selectCategory(item.id)"-->
      <!--    :class="item.classes"-->
      <!--  >-->
      <!--    <i class="h">{{ item.text }}</i>-->
      <!--    <i class="s b-1-cl">{{ item.text }}</i>-->
      <!--  </span>-->
      <!--</div>-->
      <div class="m-tool">
        <div class="left">
          <span
            class="tab"
            :class="showClassType === 'depositDialogShow' ? 'active' : ''"
            @click="setShowDialog('depositDialogShow')"
          >
            {{ marginModelText }}
            <div class="icon-down"></div>
          </span>
          <span
            class="tab"
            :class="showClassType === 'leverageDialogShow' ? 'active' : ''"
            @click="setShowDialog('leverageDialogShow')"
          >
            {{ nowLevel }}X
            <div class="icon-down"></div>
          </span>
        </div>
        <div class="right">
          <!-- 合约计算器按钮 -->
          <i class="set-btn-icon" @click="showDialog('OPEN_CALCULATOR_DIALOG')">
            <svg aria-hidden="true" width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path
                d="M14 0C15.1046 0 16 0.895431 16 2V16C16 17.1046 15.1046 18 14 18H2C0.895431 18 8.05333e-09 17.1046 0 16V2C0 0.895431 0.895431 0 2 0H14ZM4 12C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14C4.55228 14 5 13.5523 5 13C5 12.4477 4.55228 12 4 12ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14C8.55229 14 9 13.5523 9 13C9 12.4477 8.55229 12 8 12ZM12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12ZM3 3V10H13V3H3Z"
                fill="var(--color-text-secondary)"
              />
            </svg>
          </i>
          <!-- 合约设置按钮 -->
          <i class="set-btn-icon" @click="showDialog('SET_FUTURE_CONFIG')">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M20 9L14.9961 17.5781H5.00391L0 9L5.00391 0.421875H14.9961L20 9ZM2.16406 9L6.07812 15.7109H13.9229L17.8369 9L13.9229 2.29004H6.07812L2.16406 9ZM14.0547 9L12.0234 12.4824H7.97656L5.94531 9L7.97656 5.51855H12.0234L14.0547 9ZM8.10938 9L9.05078 10.6143H10.9502L11.8916 9L10.9502 7.38574H9.05078L8.10938 9Z"
                fill="var(--color-text-secondary)"
              />
            </svg>
          </i>
        </div>
      </div>

      <div class="m-tab">
        <div
          class="item"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="selectCategory(item.id)"
          :class="{ active: item.id == currentCategory }"
        >
          {{ item.text }}
        </div>

        <!--<div class="tips">-->
        <!--  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--    <ellipse cx="5.52564" cy="5.39574" rx="4.87475" ry="4.85426" transform="rotate(180 5.52564 5.39574)" fill="#868E9B"/>-->
        <!--    <rect x="5.96875" y="8.48438" width="0.886317" height="4.41297" rx="0.0443159" transform="rotate(180 5.96875 8.48438)" fill="#1E2025"/>-->
        <!--    <rect x="5.96875" y="2.74805" width="0.886317" height="0.882593" rx="0.0443159" transform="rotate(180 5.96875 2.74805)" fill="#1E2025"/>-->
        <!--  </svg>-->
        <!--</div>-->
      </div>

      <div class="m-form">
        <div class="wrap formData_1" v-if="formData_1.isShow">
          <!-- 价格 -->
          <form-input
            :promptText="formData_1.promptText"
            v-if="formData_1.isShow"
            :fix="formData_1.fix"
            :unit="formData_1.units"
            :title="formData_1.title"
            :default="formData_1.value"
            :isPercentage="formData_1.percentageVlaue"
            :isError="formData_1.errorText"
            @clearPercentage="clearPercentage"
            @tradeChangeValue="changeInput('formData_1', $event)"
          ></form-input>
          <div v-if="formData_1.errorText" class="form-error b-6-cl">
            {{ formData_1.errorText }}
          </div>
        </div>

        <div class="wrap formData_2" v-if="formData_2.isShow">
          <!-- 数量 -->
          <form-input
            :promptText="formData_2.promptText"
            v-if="formData_2.isShow"
            :isMarket="isMarket"
            :fix="formData_2.fix"
            :unit="formData_2.units"
            :default="formData_2.value"
            :title="formData_2.title"
            :haveMarket="true"
            :isError="formData_2.errorText"
            :percentageVlaue="percentageVlaue"
            @selectMarket="selectMarket"
            @clearPercentage="clearPercentage"
            @tradeChangeValue="changeInput('formData_2', $event)"
          >
          </form-input>
          <div v-if="formData_2.errorText" class="form-error b-6-cl">
            {{ formData_2.errorText }}
          </div>
        </div>
        <div class="wrap formData_3" v-if="formData_3.isShow">
          <form-input
            :promptText="formData_3.promptText"
            v-if="formData_3.isShow"
            :fix="formData_3.fix"
            :unit="formData_3.units"
            :title="formData_3.title"
            :default="formData_3.value"
            :isError="formData_3.errorText"
            :isPercentage="formData_3.percentageVlaue"
            @clearPercentage="clearPercentage"
            @tradeChangeValue="changeInput('formData_3', $event)"
          >
          </form-input>
          <div v-if="formData_3.errorText" class="form-error b-6-cl">
            {{ formData_3.errorText }}
          </div>
        </div>
      </div>

      <!-- 仓位价值  只有 （开仓 || 非只减仓） && 市价 显示 -->
      <p class="convert b-1-cl" v-if="isOpenAndIsMarket && !percentageVlaue">
        ≈ {{ worthRate }} <span> {{ multiplierCoin }}</span>
      </p>
      <p
        class="convert b-1-cl"
        v-if="currentCategory !== 2 && !isMarket && worthValue && !percentageVlaue"
      >
        <!-- 价值 -->
        {{ lanText.textjz }}
        {{ worthValue }}
        <template v-if="contractSide === 1">{{ priceUnit }}</template>
        <template v-else>{{ baseCoin }}</template>
      </p>

      <!--      <div ref="percentage" class="m-percentage" style="margin-top: 14px;" :style="{ '&#45;&#45;width': `${ percentWidth / (percentageList.length - 1) }px` }">-->
      <!--        <span-->
      <!--          v-for="item in percentageList"-->
      <!--          :key="item"-->
      <!--          :class="{ 'active': (percentageVlaue === item || percentageVlaueHover === item), prevItem: item < percentageVlaue }"-->
      <!--          @mouseenter="evenHandMouseenter('percentageVlaueHover', item)"-->
      <!--          @mouseout="evenHandMouseenter('percentageVlaueHover', null)"-->
      <!--          @click="setPercentageVlaue(item)"-->
      <!--          class="item"-->
      <!--          :title="`${item}%`"-->
      <!--        ></span>-->
      <!--      </div>-->
      <!--      <div class="m-percent">{{ percentageVlaue }}</div>-->
      <range_m
        style="margin-top: 12px"
        @rangeValue="(value) => setPercentageVlaue(value)"
        :range-v="calPercentage"
      ></range_m>

      <!--可用-->
      <div class="m-canUse">
        <div class="name">{{ $t('futures.tradeForm.availble') }}</div>
        <div class="num">{{ thousandsComma(canUseAmount) }}</div>
        <div class="symbol">{{ marginCoin }}</div>
        <div class="add" @click="linkTo(`/assets/recharge?symbol=${marginCoin}`)">
          <svg
            data-v-aa778db0=""
            width="15"
            height="15"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              data-v-aa778db0=""
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.93945 4.94531C9.93945 5.53626 9.82306 6.12142 9.59691 6.66739C9.37077 7.21335 9.0393 7.70943 8.62143 8.12729C8.20357 8.54516 7.70749 8.87663 7.16153 9.10277C6.61556 9.32892 6.0304 9.44531 5.43945 9.44531C4.8485 9.44531 4.26334 9.32892 3.71738 9.10277C3.17141 8.87663 2.67534 8.54516 2.25747 8.12729C1.83961 7.70943 1.50814 7.21335 1.282 6.66739C1.05585 6.12142 0.939453 5.53626 0.939453 4.94531C0.939453 3.75184 1.41356 2.60725 2.25747 1.76333C3.10139 0.919418 4.24598 0.445312 5.43945 0.445312C6.63293 0.445313 7.77752 0.919418 8.62143 1.76333C9.46535 2.60725 9.93945 3.75184 9.93945 4.94531ZM4.81445 5.57031V7.94531H6.06445V5.57031H8.43945V4.32031H6.06445V1.94531H4.81445V4.32031H2.43945V5.57031H4.81445Z"
              fill="#6A60FF"
            ></path>
          </svg>
        </div>
      </div>

      <!--开空/开多数量-->
      <div class="openable">
        <div class="left">
          <label class="u-1-cl">{{ openableData.buyText }}</label>
          <span class="b-1-cl"> {{ thousandsComma(maxCanBuyNumber) }} {{ volUnit }}</span>
        </div>
        <div class="right">
          <label class="u-4-cl">{{ openableData.sellText }}</label>
          <span class="b-1-cl"> {{ thousandsComma(maxCanSellNumber) }} {{ volUnit }} </span>
        </div>
      </div>

      <!--<div class="m-option">-->
      <!--  &lt;!&ndash; 可买  可卖 &ndash;&gt;-->
      <!--  <div class="openable m-openable">-->
      <!--    <div class="left">-->
      <!--      <label class="txt">{{ openableData.buyText }}</label>-->
      <!--      <span class="num s-green"> {{ thousandsComma(maxCanBuyNumber) }} {{ volUnit }}</span>-->
      <!--    </div>-->
      <!--    <div class="right">-->
      <!--      <label class="txt">{{ openableData.sellText }}</label>-->
      <!--      <span class="num s-red"> {{ thousandsComma(maxCanSellNumber) }} {{ volUnit }} </span>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!-- 选项 -->
      <div class="m-option2">
        <div class="option" v-if="currentCategory !== 2 || positionModel === 1">
          <template v-if="currentCategory !== 2 && !isMarket">
            <div class="select-order-type">
              <c-checkBox :value="isCheckedOrdeType" @click="checkedOrdeTypeclick" />
              <label class="ac-type">
                <div class="h-show">
                  <span class="tit a-1-bd">{{ ordeType.title }}</span>
                  <span
                    @click="ordeTypePtions = !ordeTypePtions"
                    class="triangle-down b-4-bd"
                  ></span>
                </div>
                <div class="h-hide">
                  <span class="tit a-1-bd">{{ ordeType.title }}</span>
                  <span @click="ordeTypePtions = !ordeTypePtions" class="triangle-down"></span>
                </div>
                <p class="tip-text a-5-bg a-3-bd-c b-1-cl">
                  {{ ordeType.text }}
                </p>
              </label>
              <!-- @mouseout="evenHandMouseenter('ordeTypePtions', false)" -->
              <div class="orde-type-ptions" v-show="ordeTypePtions">
                <p
                  v-for="item in ordeTypeList"
                  :key="item.id"
                  :class="
                    ordeType.id === item.id || hoverOrdeType.id === item.id ? 'a-3-bg b-1-cl' : ''
                  "
                  @mouseenter.stop="evenHandMouseenter('hoverOrdeType', item)"
                  @mouseout.stop="evenHandMouseenter('hoverOrdeType', {})"
                  @click.stop="radioClick(item)"
                >
                  {{ item.title }}
                </p>
              </div>
            </div>
            <!--<div class="select-order-type">-->
            <!--  <c-checkBox></c-checkBox>-->
            <!--  <label class="ac-type newAdd">Iceberg</label>-->
            <!--</div>-->
          </template>
          <!-- 只减仓（只要单向持仓会显示只减仓） -->
          <span v-if="positionModel === 1">
            <c-checkBox :value="zhiJianCang" @click="checkoutClick" />
            <!-- 只减仓 -->
            <label class="rt-label a-1-bd"
              >{{ lanText.text6 }}
              <p class="tip-text rt-label-zjc a-5-bg a-3-bd-c b-1-cl">
                <!-- 只减仓订单只会减少仓位，不会增加仓位。 -->
                {{ lanText.text7 }}
              </p>
            </label>
          </span>
        </div>
      </div>
      <!-- 到期时间  有效期-->
      <!-- <form-select
        class="expireTime"
        v-if="currentCategory === 3"
        :label="lanText.text4"
        :list="planTypeList"
        :current="expireTime"
        @selectList="selectPlanType">
      </form-select> -->
      <!-- 买入 卖出 按钮 -->
      <div class="submit-button">
        <c-button
          v-if="!isLogin || !openContract"
          :defaultColorClass="loginButton.class"
          :hoverColorClass="loginButton.class"
          :activeColorClass="loginButton.class"
          @click="loginButtonClick()"
          width="100%"
        >
          <!-- class="loginBtn" -->
          {{ loginButton.text }}
        </c-button>
        <template v-if="isLogin && openContract">
          <c-button
            :defaultColorClass="buttosContent.buyButton.class"
            :hoverColorClass="buttosContent.buyButton.class"
            :activeColorClass="buttosContent.buyButton.class"
            @click="submitForm('BUY')"
            :disabled="isSubmitDisbled"
            paddingW="10px"
            width="140px"
          >
            {{ buttosContent.buyButton.text }}
          </c-button>
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="submitForm('SELL')"
            :disabled="isSubmitDisbled"
            paddingW="10px"
            width="140px"
          >
            {{ buttosContent.sellButton.text }}
          </c-button>
        </template>
      </div>

      <!--0% trading fee on this BTC pair-->
      <!--<div class="m-feeTips">-->
      <!--  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <rect x="0.711914" y="0.310547" width="20.4739" height="11.6502" rx="2.92485" fill="#326AD5"/>-->
      <!--    <path d="M23.1354 5.74672L21.1855 4.19336V8.07677L23.1354 6.52341V5.74672Z" fill="#326AD5" stroke="#326AD5" stroke-width="0.974949"/>-->
      <!--    <path d="M4.57358 8.76758V3.32157H5.27814V5.72086H8.49623V3.32157H9.20078V8.76758H8.49623V6.29212H5.27814V8.76758H4.57358ZM10.9374 6.75294C10.9374 7.71519 11.3373 8.19632 12.1371 8.19632C12.9368 8.19632 13.3367 7.71519 13.3367 6.75294C13.3367 5.81099 12.9368 5.34002 12.1371 5.34002C11.3373 5.34002 10.9374 5.81099 10.9374 6.75294ZM10.2329 6.76817C10.2329 5.43523 10.8676 4.76876 12.1371 4.76876C13.4065 4.76876 14.0413 5.43523 14.0413 6.76817C14.0413 8.09857 13.4065 8.76377 12.1371 8.76377C10.8727 8.76377 10.2379 8.09857 10.2329 6.76817ZM14.9934 4.12134H15.4351L15.5875 4.76876H16.669V5.34002H15.6979V7.63648C15.6979 8.00971 15.8591 8.19632 16.1816 8.19632H16.669V8.76758H15.9988C15.3285 8.76758 14.9934 8.40832 14.9934 7.6898V4.12134Z" fill="#181A1F"/>-->
      <!--  </svg>-->
      <!--  <div class="txt">0% trading fee on this BTC pair</div>-->
      <!--  <svg width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <path d="M0.352539 1.16602L2.76099 3.3463C2.83982 3.41767 2.84274 3.54053 2.76739 3.61557L0.352539 6.02026" stroke="#EAECEF" stroke-width="0.649966" stroke-linecap="round"/>-->
      <!--  </svg>-->
      <!--</div>-->
      <div class="m-cost">
        <div class="item">
          <div>
            <!-- 成本 -->
            {{ lanText.text5 }}
          </div>
          <div class="num">{{ thousandsComma(canBuyCostNumber) }} {{ marginCoin }}</div>
        </div>
        <div class="item">
          <div>
            <!-- 成本 -->
            {{ lanText.text5 }}
          </div>
          <div class="num">{{ thousandsComma(canSellCostNumber) }} {{ marginCoin }}</div>
        </div>
        <div class="item">
          <div>
            <!-- 可用 -->
            {{ lanText.text2 }}
          </div>
          <div class="num">{{ thousandsComma(canUseAmount) }} {{ marginCoin }}</div>
        </div>
      </div>
      <!-- 分割线 -->
      <!--<div class="m-line"></div>-->
      <div class="m-price" v-if="false">
        <!-- 成本 -->
        <div class="hold-position">
          <label class="txt"> {{ lanText.text5 }} </label>
          <span class="num">{{ thousandsComma(canBuyCostNumber) }} {{ marginCoin }}</span>
        </div>
        <!-- 成本 -->
        <div class="hold-position">
          <label class="txt"> {{ lanText.text5 }} </label>
          <span class="num">{{ thousandsComma(canSellCostNumber) }} {{ marginCoin }}</span>
        </div>
        <div class="available a-3-bd-c" v-if="false">
          <div class="info">
            <span class="rt-label a-1-bd">
              <!-- 可用 -->
              {{ lanText.text2 }}
              <p class="tip-text a-5-bg a-3-bd-c b-1-cl" v-html="lanText.text3">
                <!-- 可用余额为用户可自由支配的资金。可用余额会优先作为全仓保证金，当全仓仓位亏损时，可用就会减少。 -->
              </p>
            </span>
            <span class="num">{{ thousandsComma(canUseAmount) }} {{ marginCoin }}</span>
          </div>
        </div>
      </div>
      <!--Assets -->
      <!--<div class="m-assets">-->
      <!--  <div class="head">-->
      <!--    <div class="title">Assets</div>-->
      <!--  </div>-->
      <!--  <div class="btnG">-->
      <!--    <div class="btn" @click="linkTo(`/assets/recharge?symbol=${marginCoin}`)">-->
      <!--      <svg class="icon" width="16" height="16" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <path d="M2.59314 7.25452C2.69595 7.35733 2.86264 7.35733 2.96545 7.25452L4.64087 5.5791C4.74368 5.47629 4.74368 5.3096 4.64087 5.20679C4.53806 5.10397 4.37137 5.10397 4.26856 5.20679L2.7793 6.69604L1.29004 5.20678C1.18723 5.10397 1.02053 5.10397 0.917723 5.20678C0.814911 5.3096 0.814911 5.47629 0.917723 5.5791L2.59314 7.25452ZM3.04256 7.06836L3.04256 0.243715L2.51603 0.243715L2.51603 7.06836L3.04256 7.06836Z" fill="#FDFDFD"/>-->
      <!--      </svg>-->
      <!--      <span>-->
      <!--        &lt;!&ndash;充值&ndash;&gt;-->
      <!--        {{ $t("assets.exchangeAccount.Recharge") }}-->
      <!--      </span>-->
      <!--    </div>-->
      <!--    <div class="btn" @click="transferIsShow = true">-->
      <!--      <svg style="padding-right: 4px" t="1685245203622" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2617" width="16" height="16">-->
      <!--        <path d="M1002.01 295.18l-273.2-273.2c-3.16-3.16-6.95-5.67-11.15-7.4-0.17-0.07-0.35-0.09-0.53-0.16-3.85-1.51-8.02-2.41-12.41-2.42h-0.03c-4.39 0-8.56 0.9-12.42 2.42-0.17 0.07-0.35 0.09-0.52 0.16a34.146 34.146 0 0 0-18.55 18.55c-0.07 0.17-0.09 0.34-0.16 0.51-1.52 3.86-2.42 8.04-2.42 12.44V977.9c0 18.83 15.26 34.09 34.09 34.09 18.83 0 34.09-15.26 34.09-34.09V128.39l215 215c13.31 13.31 34.9 13.31 48.21 0 13.32-13.31 13.32-34.89 0-48.21zM353.38 977.91V46.09c0-18.83-15.26-34.09-34.09-34.09-18.83 0-34.09 15.26-34.09 34.09v849.52l-215-215c-13.31-13.31-34.9-13.31-48.21 0-13.31 13.31-13.31 34.9 0 48.21l273.2 273.2c3.16 3.16 6.95 5.67 11.15 7.4 0.17 0.07 0.34 0.09 0.51 0.16 3.86 1.52 8.04 2.42 12.44 2.42s8.58-0.9 12.44-2.42c0.17-0.07 0.34-0.09 0.51-0.16 8.4-3.46 15.1-10.16 18.55-18.55 0.07-0.17 0.09-0.34 0.16-0.51 1.53-3.87 2.43-8.05 2.43-12.45z" fill="#EAECEF" p-id="2618"></path>-->
      <!--      </svg>-->
      <!--      <span>-->
      <!--        &lt;!&ndash; 划转 &ndash;&gt;-->
      <!--        {{ $t("lever.leverHz") }}-->
      <!--      </span>-->
      <!--    </div>-->
      <!--    <div class="btn" @click="linkTo(`/assets/withdraw?symbol=${marginCoin}`)">-->
      <!--      <svg t="1685244925848" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1415" width="16" height="16">-->
      <!--        <path d="M507.733333 213.333333v725.333334h42.666667V204.8l145.066667 145.066667 29.866666-29.866667L533.333333 128 341.333333 320l29.866667 29.866667L507.733333 213.333333z" fill="#EAECEF" p-id="1416"></path>-->
      <!--      </svg>-->
      <!--      <span>-->
      <!--        &lt;!&ndash;提现&ndash;&gt;-->
      <!--        {{ $t("assets.exchangeAccount.withdraw") }}-->
      <!--      </span>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--  <div class="ct">-->
      <!--    <div class="info">-->
      <!--      <div class="left">-->
      <!--        <span>{{ marginCoin }}</span>-->
      <!--        <span>Available:</span>-->
      <!--      </div>-->
      <!--      <div class="right">{{ thousandsComma(canUseAmount) }}</div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
    </div>
    <!-- 强制提醒(二次确认) -->
    <forcedReminder
      :dataInfo="confirmData"
      :isShow="forcedReminderShow"
      :close="closeDialog"
      @submitOrder="submitOrder"
    />
    <!-- 设置杠杆 -->
    <lever-component v-if="leverageDialogShow" :isShow="leverageDialogShow" :close="closeDialog" />
    <!-- 切换 保证金模式 -->
    <depositMode v-if="depositDialogShow" :isShow="depositDialogShow" :close="closeDialog" />
    <!--合约->现货划转-->
    <common-transfer :symbol="marginCoin" :isShow="transferIsShow" :close="closeDialog" />
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm";
import calculateVolumeMixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/calculateVolume";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm.styl";

import Range_m from "@/components/modules/utiles/range_m";
import commonTransfer from "@/components/modules/coTrade/component/transfer";
import { fixD, nul } from "@/utils";
import assets from "@/components/modules/coTrade/assets.vue";
import formInput from "./component/form-input.vue";
import forcedReminder from "./component/forced-reminder.vue";
// 调整杠杆弹框
import leverComponent from "./component/lever.vue";
// 保证金模式 全仓 逐仓 切换
import depositMode from "./component/depositMode.vue";
// 划转

const fn = null;
export default {
  mixins: [mixin, calculateVolumeMixin],
  name: "tradeForm",
  components: {
    Range_m,
    formInput,
    forcedReminder,
    leverComponent,
    depositMode,
    commonTransfer,
    assets,
  },
  data() {
    return {
      percentWidth: 0,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    calPercentage() {
      const percentage = 0;
      const { canUseAmount } = this;
      const { value } = this.formData_3;
      const { currentCategory } = this;
      if (canUseAmount) {
        if (currentCategory == 1) {
        }
        return value / canUseAmount;
      }
      return 0;
    },
    //
    calBuySellNum() {
      return (sideType) => {
        // 百分比的数量 || 输入的数量 (张)
        const volume = this.countPercentageVlaue(sideType) || this.inputVolume;
        // 数量
        let vol = `${volume} ${this.volUnit}`;
        // 市价开仓
        if (this.orderSide === "OPEN" && (this.currentCategory === 2 || this.isMarket)) {
          // 反向
          let unit = this.contractInfo.base;
          // 正向
          if (this.contractSide === 1) {
            unit = this.priceUnit;
          }
          vol = `${volume} ${unit}`;
        } else if (this.coUnitType === 1) {
          // 如果当前单位是标的货币 就 把张 换算成 标的数量
          vol = `${fixD(nul(volume, this.multiplier), this.volfix)} ${this.volUnit}`;
        }
        return vol;
      };
    },
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
    document.addEventListener("resize", fn);
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped>
.co-trade-box .title-block .show-dialog-btn {
  width: 52px;
  height: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 25px;
  color: #ffffff;
  text-align: center;
  border-width: 0;
}
.u-8-bg {
  background-color: var(--mainColor);
}
/* 2022.12.28 样式修改 */
.m-tab {
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 36px;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--color-text-secondary);
  position: relative;
  border-bottom: 1px solid var(--color-Toggle);
  gap: 20px;
}
.m-tab > .item {
  position: relative;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-align: center;
  height: 36px;
  line-height: 36px;
}
.m-tab > .item:hover {
  color: var(--color-text-primary);
}
.m-tab > .item::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
}
.m-tab > .item.active {
  color: var(--color-text-primary);
}
.m-tab > .item.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 20px 100%
    no-repeat;
}
.m-tab > .tips {
  position: absolute;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
}

/* 进度条 */
.m-percentage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  cursor: pointer;
  user-select: none;
}
.m-percentage > .item {
  width: 8px;
  height: 8px;
  background: #2a2c31;
  border: 1px solid #202123;
  border-radius: 50%;
}
.m-percentage > .item.active {
  width: 12px;
  height: 12px;
  background: #ffffff;
  border: 2px solid var(--mainColor);
  z-index: 10;
}

.m-percentage > .item {
  position: relative;
}
/* 未选中 */
.m-percentage > .item:not(:last-child):after {
  content: "";
  width: var(--width);
  height: 5px;
  background: #2a2c31;
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
/* 选中 */
.m-percentage > .item.active:not(:last-child):after {
  left: 14px;
}
.m-percentage > .item.prevItem {
  width: 8px;
  height: 8px;
  background: #ffffff;
}
.m-percentage > .item.prevItem:not(:last-child):after {
  background: var(--mainColor);
  left: 8px;
  width: calc(var(--width) - 12px);
}

.co-trade-box .trade-form .openable {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
}
.co-trade-box .trade-form .openable {
  height: 24px;
  line-height: 24px;
}

.m-openable {
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  text-transform: uppercase;
}
.m-openable .num.s-green {
  color: var(--color-Positive);
}
.m-openable .num.s-red {
  color: var(--subRedColor);
}
.co-trade-box .trade-form .submit-button /deep/.common-button {
  border-radius: 100px;
  height: 36px !important;
}
.co-trade-box .trade-form .submit-button /deep/.common-button .common-button-slot {
  line-height: 36px !important;
}
.co-trade-box .trade-form .submit-button /deep/.buyBtn {
  background: var(--color-Positive);
}
.co-trade-box .trade-form .submit-button /deep/.sellBtn {
  background: var(--color-Negative);
}
.co-trade-box .trade-form .submit-button {
  height: 36px;
  display: flex;
  align-items: center;
}
.co-trade-box .trade-form .submit-button /deep/.common-button-slot {
  color: var(--color-BTN-BUY-SELL-text);
  line-height: 34px;
}
.co-trade-box .trade-form .submit-button .loginBtn /deep/.common-button-slot {
  color: var(--color-BTN-primary);
}
.co-trade-box .trade-form .triangle-down {
  margin: 8px 0 0 4px;
}
.co-trade-box .trade-form .option {
  margin-top: 0;
}
.co-trade-box .trade-form .select-order-type .ac-type .tit {
  color: var(--color-text-primary);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-decoration-line: underline;
  text-decoration-style: dotted;
}
.co-trade-box .trade-form .select-order-type {
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  margin: 16px 0;
}
.co-trade-box .trade-form .hold-position,
.co-trade-box .trade-form .available {
  height: 20px;
  line-height: 20px;
  margi-top: 0;
  margin-bottom: 12px;
}
.hold-position {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
}
.hold-position > .txt {
  color: #929292;
}
.hold-position > .num {
  color: #ffffff;
}
.co-trade-box .trade-form .available > .info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.co-trade-box .trade-form .available > .info > .num {
  color: #ffffff;
}
.co-trade-box .trade-form .category-select-box .tab:hover {
  color: #0c0e11;
}
.co-trade-box .trade-form .category-select-box .tab {
  color: #ffffff;
}
.co-trade-box .trade-form .category-select-box .tab.a-8-bg {
  background: rgba(255, 255, 255, 0.08);
}
</style>
<style scoped>
.co-trade-box .title-block {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--color-Toggle);
}
.title-block > .counter-and-set {
  position: absolute;
  right: 46px;
}
.title-block > .tab {
  flex: 1;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-secondary);
  position: relative;
}
.title-block > .tab::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
}
.title-block > .tab.active::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom / 18px 100%
    no-repeat;
}
.title-block > .tab.active {
  color: var(--color-text-primary);
}
/*.title-block > .tab.active::after {*/
/*  content: "";*/
/*  width: 100%;*/
/*  height: 2px;*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  background: var(--mainColor);*/
/*}*/
.m-percentage {
  height: 4px;
  margin: 20px 0;
}
.m-percentage > .item {
  width: 10px;
  height: 10px;
}
.m-price {
  display: flex;
  align-items: center;
}
.m-price > .hold-position {
  width: auto;
  margin-right: 12px;
}
.m-price > .hold-position > .txt {
  margin-right: 12px;
}
.m-price > .available .rt-label {
  margin-right: 12px;
}
.m-option {
  display: flex;
  align-items: center;
}
.m-openable {
  margin-right: 12px;
}
.trade-form {
  height: calc(100% - 78px);
}
.co-trade-box .title-block {
  position: relative;
}
.co-trade-box .title-block .tab {
  margin-right: 0;
}
.co-trade-box .title-block > .more {
  width: 38px;
  height: 100%;
  position: absolute;
  right: 10px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.co-trade-box .title-block > .more > .moreTool {
  position: absolute;
  background: #ffffff;
  width: 116px;
  right: 0;
  top: 38px;
  border-radius: 2px;
  z-index: 2;
  display: none;
}
.co-trade-box .title-block > .more:hover > .moreTool {
  display: block;
}

.co-trade-box .title-block > .more > .moreTool > .item {
  display: flex;
  align-items: center;
  user-select: none;
  box-sizing: border-box;
  padding: 0 10px;
}
.co-trade-box .title-block > .more > .moreTool > .item > .set-btn-icon {
  display: flex;
  align-items: center;
}
.co-trade-box .title-block > .more > .moreTool > .item:hover {
  color: var(--mainColor);
}
.co-trade-box .title-block > .more > .moreTool > .item > .set-btn-icon > .icon.hover-show {
  display: none;
}
.co-trade-box .title-block > .more > .moreTool > .item:hover > .set-btn-icon > .icon.hover-show {
  display: block;
}
.co-trade-box .title-block > .more > .moreTool > .item:hover > .set-btn-icon > .icon.hover-hide {
  display: none;
}
.co-trade-box .title-block > .more > .moreTool > .item > .name {
  padding-left: 6px;
}

.co-trade-box .trade-form .category-select-box .tab.u-8-bg {
  background: #5dc787;
}
.co-trade-box .trade-form .category-select-box .tab {
  position: relative;
  height: 24px;
  line-height: 24px;
}
.co-trade-box .trade-form .category-select-box .tab.u-8-bg:first-child::after {
  content: "";
  --with: 12px;
  width: 0;
  height: 0;
  border-top: var(--with) solid transparent;
  border-bottom: var(--with) solid transparent;
  border-left: var(--with) solid #5dc787;
  position: absolute;
  right: -11px;
  top: 0;
}
.co-trade-box .trade-form .category-select-box .tab.u-4-bg:last-child::after {
  content: "";
  --with: 12px;
  width: 0;
  height: 0;
  border-top: var(--with) solid transparent;
  border-bottom: var(--with) solid transparent;
  border-right: var(--with) solid #ff2500;
  position: absolute;
  left: -11px;
  top: 0;
}
.m-canUse {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  height: 26px;
  line-height: 26px;
  font-weight: 500;
  font-size: 12px;
}
.m-canUse > .name {
  color: var(--color-text-secondary);
  margin-right: 5px;
}
.m-canUse > .num {
  color: var(--color-text-primary);
  margin-left: auto;
}
.m-canUse > .symbol {
  color: var(--color-text-primary);
  margin-inline: 2px;
}
.m-canUse > .add {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.m-form > .wrap {
  width: 100%;
}
/deep/.select-price .form-control {
  background: var(--color-Input-fill);
  border-radius: 6px;
  border-color: var(--color-Input-border);
}
/deep/.select-price .form-control:hover {
  border-color: var(--color-BTN-secondary-border);
}
/deep/.select-price .form-control span.title {
  color: var(--color-text-primary);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
}
/deep/.select-price .form-control .unit {
  font-size: 14px;
}
/deep/.select-price .form-control input {
  width: 50%;
  color: var(--color-text-primary);
}
/deep/.select-price .form-control .unit {
  color: var(--color-text-primary);
}
/deep/.select-price .form-control .percentage-vol {
  width: 78% !important;
  color: var(--color-text-primary);
}

.m-option2 {
  box-sizing: border-box;
}
.m-option2 > .option {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-top: 4px;
}
.co-trade-box .trade-form .select-order-type .ac-type {
  margin-left: 8px;
}
.co-trade-box .trade-form .select-order-type .ac-type .tit,
.co-trade-box .trade-form .select-order-type .ac-type.newAdd {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-primary);
}
.m-feeTips {
  display: flex;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;
  user-select: none;
}
.m-feeTips > .txt {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  box-sizing: border-box;
  padding: 0 6px;
}

.m-assets {
  padding-top: 16px;
  margin-top: 20px;
  border-top: 1px solid #26292f;
}
.m-assets > .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.m-assets > .head > .title {
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: var(--color-1);
}
.m-assets > .head > .info {
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: 12px;
  color: var(--color-1);
}
.m-assets > .head > .info > .invest {
  font-weight: 700;
  color: var(--mainColor);
  position: relative;
}
.m-assets > .head > .info > .invest::after {
  content: "";
  background: #484d56;
  width: 1px;
  height: 12px;
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
}
.m-assets > .head > .info > .buy {
  font-weight: 400;
  color: #868e9b;
  padding-left: 10px;
  padding-right: 6px;
  text-decoration: underline;
}
.m-assets > .head > .info > .label2 {
  width: 24px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  background: #1d2c48;
  color: var(--mainColor);
}
.m-assets > .btnG {
  display: flex;
  align-items: center;
  margin-top: 18px;
}
.m-assets > .btnG > .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 20px;
  background: #2b2b39;
  border-radius: 2px;
  line-height: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #eaecef;
  cursor: pointer;
  user-select: none;
}
.m-assets > .btnG > .btn:not(:last-child) {
  margin-right: 12px;
}
.m-assets > .ct {
  margin-top: 14px;
  font-style: normal;
  font-size: 12px;
}
.m-assets > .ct > .info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-1);
  margin-bottom: 10px;
}
.m-assets > .ct > .info > .left > span:nth-child(2) {
  color: #868e9b;
  padding-left: 4px;
}
.submit-button /deep/.loginBtn {
  background: var(--color-31) !important;
  border-radius: 3px;
  color: #528eff;
}

.m-percent {
  height: 14px;
  font-size: 14px;
  text-align: right;
  color: #fff;
}

.co-trade-box .trade-form .select-order-type .orde-type-ptions {
  padding: 12px;
  border-radius: 8px;
  background: var(--color-BG-Light);
}
.co-trade-box .trade-form {
  padding-top: 16px;
}
.m-cost {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-Input-border);
}
.m-cost > .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  color: var(--color-text-secondary);
}
.m-cost > .item .num {
  color: var(--color-text-primary);
}
.co-trade-box .trade-form .tip-text {
  color: var(--color-1);
  background-color: var(--color-BG-Light);
  border-width: 0;
  border-radius: 12px;
}
.m-tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.m-tool > .left > .tab {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 20px;
  padding: 6px 12px 6px 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--color-BTN-text-secondary-revert);
  background: var(--color-Input-fill);
  cursor: pointer;
  user-select: none;
  text-align: center;
}
.m-tool > .left > .tab:first-child {
  border-radius: 100px 0 0 100px;
  margin-right: 2px;
}
.m-tool > .left > .tab:last-child {
  border-radius: 0 100px 100px 0;
}
.m-tool > .right {
  display: flex;
  align-items: center;
}
.m-tool > .right > .set-btn-icon {
  margin-left: 12px;
  cursor: pointer;
  user-select: none;
}
.icon-down {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 0;
  height: 0;
  margin-top: -2px;
  border-left: 4px solid transparent !important;
  border-right: 4px solid transparent !important;
  border-top-width: 5px;
  border-top-style: solid;
  vertical-align: middle;
  padding: 0;
  display: inline-block;
}
.convert {
  text-align: right;
}
.wrap.formData_3 /deep/.form-control .title:not(.promptText) {
  color: var(--color-text-primary);
}
/deep/.rangeBox {
  margin: 0 10px 28px;
}
</style>
