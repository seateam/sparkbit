<!-- 币币交易 24小时行情 -->
<template>
  <!-- 改，2022.10.01，a-3-bd -> a-3-bd-c -->
  <div class="trade-box lever-tradeForm b-2-cl">
    <div class="tag_go">
      <div class="tag_left">
        <div :class="{ tag_actived: tag_active_index === 0 }" @click="handleTag(0)">
          {{ $t("lever.spot") }}
        </div>
        <div :class="{ tag_actived: tag_active_index === 1 }" @click="handleTag(1)">
          {{ $t("lever.cross") }} 3x
        </div>
        <!--<div :class="{tag_actived:tag_active_index === 2}" @click="handleTag(2)">Isolated 10x</div>-->
      </div>
      <!--<div class="tag_right">-->
      <!--  <div class="right_1">-->
      <!--    <div>Hot</div>-->
      <!--  </div>-->
      <!--  <div class="right_2">0% trading fee on this BTC pair</div>-->
      <!--  <div>-->
      <!--    <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25642 4.44516L0.663086 7.0385L1.84175 8.21649L5.61309 4.44516L4.43442 3.2665L1.84175 0.673828L0.663086 1.85249L3.25642 4.44583V4.44516Z" fill="#EAECEF"/>-->
      <!--    </svg>-->
      <!--  </div>-->
      <!--  <div>-->
      <!--    <div style="margin-right: 5px">-->
      <!--      Spot Grid-->
      <!--    </div>-->
      <!--    <span>-->

      <!--    </span>-->
      <!--    <div style="margin-left: 5px">-->
      <!--      Fee Level-->
      <!--    </div>-->
      <!--  </div>-->
      <!--  <div>-->
      <!--    <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--      <path d="M0.681641 14.1126V11.6126H3.18164V14.1126H0.681641ZM0.681641 3.2793V0.779297H3.18164V3.2793H0.681641ZM0.681641 6.19596V8.69596H3.18164V6.19596H0.681641Z" fill="#76808F"/>-->
      <!--    </svg>-->
      <!--  </div>-->
      <!--</div>-->
    </div>
    <!-- 改，2022.09.25，新增style -->
    <div
      class="title-block a-21-bg a-3-bd-c"
      style="display: flex; flex-direction: column; height: 100%; padding: 0px 20px"
      v-if="isLogin"
      v-show="false"
    >
      <!-- 改，2022.09.25，新增style -->
      <div
        class="lever-assets"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <span class="b-1-cl">
          {{ $t("lever.leverAccount") }}
          ({{ symbolCurrent | getCoinShowName(symbolAll) }})
          <svg class="sjicon icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_13"></use>
          </svg>
        </span>

        <!-- 改，2022.09.25，移位 -->
        <div class="bc-price" v-if="$i18n.locale == 'zh_CN'">
          <!-- 爆仓价 -->
          {{ $t("lever.bcj") }}
          <span class="b-1-cl">
            {{ financeData ? financeData.burstPrice : "" }}
            {{ financeData.quoteCoin | getCoinShowName(coinList) }}
          </span>
        </div>

        <div class="assets-box a-21-bg" v-if="financeData">
          <ul>
            <!-- 改，2022.09.25，拆分 -->
            <li class="list">
              <p class="item">
                <!-- 可用 -->
                {{ $t("lever.leverKy") }}
                <span class="b-1-cl">
                  {{ financeData.baseNormalBalance }}
                  {{ financeData.baseCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 可借 -->
                {{ $t("lever.leverKj") }}
                <span class="b-1-cl">
                  {{ financeData.baseCanBorrow }}
                  {{ financeData.baseCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 已借 -->
                {{ $t("lever.leverYj") }}
                <span class="b-1-cl">
                  {{ financeData.baseBorrowBalance }}
                  {{ financeData.baseCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>

            <li class="list">
              <p class="item">
                <!-- 可用 -->
                {{ $t("lever.leverKy") }}
                <span class="b-1-cl">
                  {{ financeData.quoteNormalBalance }}
                  {{ financeData.quoteCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 可借 -->
                {{ $t("lever.leverKj") }}
                <span class="b-1-cl">
                  {{ financeData.quoteCanBorrow }}
                  {{ financeData.quoteCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>
            <li class="list">
              <p class="item">
                <!-- 已借 -->
                {{ $t("lever.leverYj") }}
                <span class="b-1-cl">
                  {{ financeData.quoteBorrowBalance }}
                  {{ financeData.quoteCoin | getCoinShowName(coinList) }}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 改，2022.09.29，移位 -->
      <div class="bc-price" v-if="$i18n.locale != 'zh_CN'">
        <!-- 爆仓价 -->
        {{ $t("lever.bcj") }}
        <span class="b-1-cl" style="margin-left: 14px">
          {{ financeData ? financeData.burstPrice : "" }}
          {{ financeData.quoteCoin | getCoinShowName(coinList) }}
        </span>
      </div>

      <!-- 改，2022.09.25，新增style -->
      <div
        class="bc-infor"
        style="display: flex; align-items: center; justify-content: flex-start"
        v-if="financeData"
      >
        <div class="risk">
          <!-- 风险率 -->
          {{ $t("lever.fxl") }}
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          <div class="risk-text a-21-bg b-1-cl">
            <p>
              <!-- 总资产/借贷资产*100% -->
              {{ $t("lever.leverText1") }}
            </p>
            <p>
              <!-- 当风险率≤110%时，账户将触发爆仓以归还借贷资金 -->
              {{ $t("lever.leverText2") }}
            </p>
          </div>
        </div>

        <div class="lever-line">
          {{ financeData.riskRate ? financeData.riskRate + "%" : "--" }}
          <div class="line"></div>
        </div>

        <!-- 原爆仓价位置 -->
      </div>
    </div>
    <!-- 改，2022.09.29，新增style -->
    <div class="title-block blue_swap a-21-bg a-3-bd-c" style="padding: 0; margin: 16px 20px">
      <div>
        <span class="tab" @click="switchTradeType(1)" :class="{ active: transactionType === 1 }">
          <!-- 限价交易 -->
          {{ $t("trade.limitPriceTrade") }}
        </span>
        <span class="tab" @click="switchTradeType(2)" :class="{ active: transactionType === 2 }">
          <!-- 市价交易 -->
          {{ $t("trade.marketPriceTrade") }}
        </span>
      </div>

      <div class="title-block_right">
        <div @click="buttonsEvent('1')">
          <!-- 划转 -->
          {{ $t("lever.leverHz") }}
        </div>
        <span class="split_line"></span>
        <div @click="buttonsEvent('2')">
          <!-- 借贷 -->
          {{ $t("lever.leverJd") }}
        </div>
        <span class="split_line"></span>
        <div
          @click="
            linkTo(
              `/assets/leverageToLoan?symbol=${
                symbolCurrent ? symbolCurrent.replace('/', '').toLowerCase() : ''
              }`
            )
          "
        >
          <!-- 归还 -->
          {{ $t("assets.leverageToLoan.repayment") }}
        </div>
        <span class="split_line"></span>
        <div @click="linkTo(`/assets/recharge?symbol=${borrowCoin}`)">
          <!--充值-->
          {{ $t("assets.exchangeAccount.Recharge") }}
        </div>
        <span class="split_line"></span>
        <div @click="linkTo(`/assets/withdraw?symbol=${borrowCoin}`)">
          <!--提现-->
          {{ $t("assets.exchangeAccount.withdraw") }}
        </div>
      </div>
    </div>
    <!-- 改，2022.09.29，新增style -->
    <div class="trade-form" style="gap: 20px">
      <div class="trade-block">
        <div class="form-block">
          <trade-input
            v-model="formData_1.value"
            :fixValue="fixValue.priceFix"
            @onChanes="onChaneForm"
            name="formData_1"
            :datas="formData_1"
          />
          <trade-input
            v-model="formData_2.value"
            :fixValue="formData2Fix"
            @onChanes="onChaneForm"
            name="formData_2"
            :datas="formData_2"
          />
          <div class="m-percent">
            {{ calPercentage("buy") ? calPercentage("buy") + "%" : "0%" }}
          </div>
          <range_m
            :disabled="!formData_1.value && transactionType === 1"
            @rangeValue="(value) => setPerNumber('buy', value)"
            :range-v="calPercentage('buy')"
          ></range_m>

          <div class="volume-trade" v-if="transactionType === 1">
            <div>
              <trade-input
                name="dealMoney_1"
                :datas="{
                  title: $t('trade.number'), // '数量',
                  units: getCoinShowName_m(symbolUnit.units, coinList),
                  disabled: true,
                  disabledText: tradeVolumeBuy,
                }"
              />
            </div>
          </div>
          <!-- 改，2022.09.29，新增style -->
          <div class="top-mag" style="display: flex; align-items: center; position: relative">
            <!-- <span class="trade-type"> -->
            <!-- &lt;!&ndash; 买入 &ndash;&gt; -->
            <!-- {{ $t("trade.buy") }} -->
            <!-- {{ symbolUnit.symbol | getCoinShowName(coinList) }} -->
            <!-- </span> -->
            <span>{{ $t('futures.tradeForm.availble') }} &nbsp;&nbsp;</span>
            <span class="lov b-1-cl">
              {{ currenTaccount.unitsAccoubt }}
              {{ symbolUnit.units | getCoinShowName(coinList) }}
            </span>
            <span @click="linkTo(`/assets/recharge?symbol=${symbolUnit.units}`)" v-if="isLogin">
              <svg
                width="18"
                height="18"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.93945 4.94531C9.93945 5.53626 9.82306 6.12142 9.59691 6.66739C9.37077 7.21335 9.0393 7.70943 8.62143 8.12729C8.20357 8.54516 7.70749 8.87663 7.16153 9.10277C6.61556 9.32892 6.0304 9.44531 5.43945 9.44531C4.8485 9.44531 4.26334 9.32892 3.71738 9.10277C3.17141 8.87663 2.67534 8.54516 2.25747 8.12729C1.83961 7.70943 1.50814 7.21335 1.282 6.66739C1.05585 6.12142 0.939453 5.53626 0.939453 4.94531C0.939453 3.75184 1.41356 2.60725 2.25747 1.76333C3.10139 0.919418 4.24598 0.445312 5.43945 0.445312C6.63293 0.445313 7.77752 0.919418 8.62143 1.76333C9.46535 2.60725 9.93945 3.75184 9.93945 4.94531ZM4.81445 5.57031V7.94531H6.06445V5.57031H8.43945V4.32031H6.06445V1.94531H4.81445V4.32031H2.43945V5.57031H4.81445Z"
                  fill="#6a60ff"
                />
              </svg>
            </span>

            <div
              class="total-assets"
              style="position: absolute; right: 0; top: -38px"
              v-if="isLogin && false"
            >
              <c-button type="text" className="logBtn" @click="buttonsEvent('1')">
                <!-- 划转 -->
                {{ $t("lever.leverHz") }}
              </c-button>
              <c-button type="text" className="logBtn" @click="buttonsEvent('2')">
                <!-- 借贷 -->
                {{ $t("lever.leverJd") }}
              </c-button>
            </div>
          </div>
          <c-button
            :defaultColorClass="buttosContent.buyButton.class"
            :hoverColorClass="buttosContent.buyButton.class"
            :activeColorClass="buttosContent.buyButton.class"
            @click="submit('BUY')"
            width="100%"
            class-name="m-buyBtn"
          >
            <!-- :class-name="isLogin ? 'm-buyBtn' : 'loginBtn'" -->
            {{ buttosContent.buyButton.text }}
          </c-button>
        </div>
      </div>
      <!-- 改，2022.09.21，新增style -->
      <div class="trade-block" :style="{ marginTop: isLogin ? '18px' : '64px' }">
        <div class="form-block">
          <trade-input
            v-model="formData_3.value"
            @onChanes="onChaneForm"
            name="formData_3"
            :fixValue="fixValue.priceFix"
            :datas="formData_3"
          />
          <trade-input
            v-model="formData_4.value"
            @onChanes="onChaneForm"
            name="formData_4"
            :fixValue="fixValue.volumeFix"
            :datas="formData_4"
          />
          <div class="m-percent">
            {{ calPercentage("sell") ? calPercentage("sell") + "%" : "0%" }}
          </div>
          <range_m
            :disabled="!formData_3.value && transactionType === 1"
            @rangeValue="(value) => setPerNumber('sell', value)"
            :rangeV="calPercentage('sell')"
          ></range_m>
          <div class="volume-trade" v-if="transactionType === 1">
            <div>
              <trade-input
                name="dealMoney_2"
                :datas="{
                  title: $t('trade.number'),
                  units: getCoinShowName_m(symbolUnit.units, coinList),
                  disabled: true,
                  disabledText: tradeVolumeSell,
                }"
              />
            </div>
          </div>
          <div class="top-mag">
            <!-- <span class="trade-type"> -->
            <!-- &lt;!&ndash; 卖出 &ndash;&gt; -->
            <!-- {{ $t("trade.sell") }} -->
            <!-- {{ symbolUnit.symbol | getCoinShowName(coinList) }} -->
            <!-- </span> -->
            <span>{{ $t('futures.tradeForm.availble') }} &nbsp;&nbsp;</span>
            <span class="lov b-1-cl">
              {{ currenTaccount.symbolAccoubt }}
              {{ symbolUnit.symbol | getCoinShowName(coinList) }}
            </span>
            <span @click="linkTo(`/assets/recharge?symbol=${symbolUnit.symbol}`)" v-if="isLogin">
              <svg
                width="18"
                height="18"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.93945 4.94531C9.93945 5.53626 9.82306 6.12142 9.59691 6.66739C9.37077 7.21335 9.0393 7.70943 8.62143 8.12729C8.20357 8.54516 7.70749 8.87663 7.16153 9.10277C6.61556 9.32892 6.0304 9.44531 5.43945 9.44531C4.8485 9.44531 4.26334 9.32892 3.71738 9.10277C3.17141 8.87663 2.67534 8.54516 2.25747 8.12729C1.83961 7.70943 1.50814 7.21335 1.282 6.66739C1.05585 6.12142 0.939453 5.53626 0.939453 4.94531C0.939453 3.75184 1.41356 2.60725 2.25747 1.76333C3.10139 0.919418 4.24598 0.445312 5.43945 0.445312C6.63293 0.445313 7.77752 0.919418 8.62143 1.76333C9.46535 2.60725 9.93945 3.75184 9.93945 4.94531ZM4.81445 5.57031V7.94531H6.06445V5.57031H8.43945V4.32031H6.06445V1.94531H4.81445V4.32031H2.43945V5.57031H4.81445Z"
                  fill="#6a60ff"
                />
              </svg>
            </span>
          </div>
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="submit('SELL')"
            width="100%"
            class-name="m-sellBtn"
          >
            <!-- :class-name="isLogin ? 'm-sellBtn' : 'loginBtn'" -->
            {{ buttosContent.sellButton.text }}
          </c-button>
        </div>
      </div>
    </div>
    <!-- 借贷弹框 -->
    <c-dialog
      :showFlag="isShowDialog"
      paddingBottom="14px"
      :confirmDisabled="confirmDisabled"
      :confirmLoading="confirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="confirmFormTitle"
    >
      <div class="form-info" v-if="financeData">
        <div class="info-item a-4-bg info-radio">
          <div class="radio">
            <span class="b-1-cl" @click="setReviseType('Base', financeData.baseCoin)">
              <c-redio :value="borrowType === 'Base'" />
              {{ financeData.baseCoin | getCoinShowName(coinList) }}
            </span>
            <span class="b-1-cl" @click="setReviseType('Quote', financeData.quoteCoin)">
              <c-redio :value="borrowType === 'Quote'" />
              {{ financeData.quoteCoin | getCoinShowName(coinList) }}
            </span>
          </div>
        </div>
        <div class="info-box">
          <div class="info-item">
            <p class="text1">
              <!-- 已借 -->
              {{ $t("lever.leverYj") }}
            </p>
            <p class="text2 b-1-cl">
              <template v-if="borrowType === 'Base'">{{ financeData.baseBorrowBalance }}</template>
              <template v-else>{{ financeData.quoteBorrowBalance }}</template>
            </p>
          </div>
          <div class="info-item">
            <p class="text1">
              <!-- 最大额度 -->
              {{ $t("lever.leverZded") }}
            </p>
            <p class="text2 b-1-cl">
              <template v-if="borrowType === 'Base'">{{ financeData.baseTotalBorrow }}</template>
              <template v-else>{{ financeData.quoteTotalBorrow }}</template>
            </p>
          </div>
          <div class="info-item">
            <p class="text1">
              <!-- 利率 -->
              {{ $t("lever.leverLl") }}
              <span class="rateIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M5.97 9.6C6.18 9.6 6.3575 9.5275 6.5025 9.3825C6.6475 9.2375 6.72 9.06 6.72 8.85C6.72 8.64 6.6475 8.4625 6.5025 8.3175C6.3575 8.1725 6.18 8.1 5.97 8.1C5.76 8.1 5.5825 8.1725 5.4375 8.3175C5.2925 8.4625 5.22 8.64 5.22 8.85C5.22 9.06 5.2925 9.2375 5.4375 9.3825C5.5825 9.5275 5.76 9.6 5.97 9.6ZM5.43 7.29H6.54C6.54 6.96 6.5775 6.7 6.6525 6.51C6.7275 6.32 6.94 6.06 7.29 5.73C7.55 5.47 7.755 5.2225 7.905 4.9875C8.055 4.7525 8.13 4.47 8.13 4.14C8.13 3.58 7.925 3.15 7.515 2.85C7.105 2.55 6.62 2.4 6.06 2.4C5.49 2.4 5.0275 2.55 4.6725 2.85C4.3175 3.15 4.07 3.51 3.93 3.93L4.92 4.32C4.97 4.14 5.0825 3.945 5.2575 3.735C5.4325 3.525 5.7 3.42 6.06 3.42C6.38 3.42 6.62 3.5075 6.78 3.6825C6.94 3.8575 7.02 4.05 7.02 4.26C7.02 4.46 6.96 4.6475 6.84 4.8225C6.72 4.9975 6.57 5.16 6.39 5.31C5.95 5.7 5.68 5.995 5.58 6.195C5.48 6.395 5.43 6.76 5.43 7.29ZM6 12C5.17 12 4.39 11.8425 3.66 11.5275C2.93 11.2125 2.295 10.785 1.755 10.245C1.215 9.705 0.7875 9.07 0.4725 8.34C0.1575 7.61 0 6.83 0 6C0 5.17 0.1575 4.39 0.4725 3.66C0.7875 2.93 1.215 2.295 1.755 1.755C2.295 1.215 2.93 0.7875 3.66 0.4725C4.39 0.1575 5.17 0 6 0C6.83 0 7.61 0.1575 8.34 0.4725C9.07 0.7875 9.705 1.215 10.245 1.755C10.785 2.295 11.2125 2.93 11.5275 3.66C11.8425 4.39 12 5.17 12 6C12 6.83 11.8425 7.61 11.5275 8.34C11.2125 9.07 10.785 9.705 10.245 10.245C9.705 10.785 9.07 11.2125 8.34 11.5275C7.61 11.8425 6.83 12 6 12ZM6 10.8C7.34 10.8 8.475 10.335 9.405 9.405C10.335 8.475 10.8 7.34 10.8 6C10.8 4.66 10.335 3.525 9.405 2.595C8.475 1.665 7.34 1.2 6 1.2C4.66 1.2 3.525 1.665 2.595 2.595C1.665 3.525 1.2 4.66 1.2 6C1.2 7.34 1.665 8.475 2.595 9.405C3.525 10.335 4.66 10.8 6 10.8Z"
                    fill="#999999"
                  />
                </svg>
                <div class="iconMark a-21-bg b-1-cl">
                  <!-- 利率是申请借贷时系统收取利息的比例，利息是按照24小时计息 -->
                  {{ $t("assets.leverageToLoan.rateMark") }}
                </div>
              </span>
            </p>
            <p class="text2 b-1-cl">
              {{ financeData.rate | rateFix }}
            </p>
          </div>
        </div>
      </div>
      <div class="inline-input">
        <c-inputLine
          name="borrowValue"
          :value="borrowValue"
          :promptText="borrowPromptText"
          :errorHave="false"
          :errorText="borrowErrorText"
          :errorFlag="borrowErrorFlag"
          @onchanges="inputChanges"
        >
          <!-- 获取验证码 -->
          <c-button type="text" className="logBtn" @click="buttonsEvent('All')">
            <!-- 全部 -->
            {{ $t("lever.all") }}
          </c-button>
        </c-inputLine>
        <p class="borrow" v-if="financeData">
          <!-- 可借 -->
          {{ $t("lever.leverKj") }}
          <template v-if="borrowType === 'Base'">{{ setFex(financeData.baseCanBorrow) }}</template>
          <template v-else>{{ setFex(financeData.quoteCanBorrow) }}</template>
        </p>
      </div>
    </c-dialog>
    <!-- 划转 -->
    <leverageTransfer @success="transferSuccess" />
    <!-- 温馨提示 -->
    <c-alert
      :showFlag="alertFlag"
      @close="alertClone"
      imageType="1"
      :imgMap="imgMap"
      :colorMap="colorMap"
      :buttonText="$t('lever.hzBtntext')"
      @confirm="confirmFun"
    >
      <!-- 温馨提示 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{ $t("lever.alertTitle") }}
      </div>
      <!-- 您的BCH/USDT杠杆账户余额不足，需转入资产方可进行杠杆交易。-->
      <div class="alertText">
        {{ $t("lever.your") }}{{ symbolCurrent }}{{ $t("lever.alertTet") }}
      </div>
    </c-alert>
    <!-- 未认证 提示框 -->
    <c-alert
      :showFlag="notAuthShowDialog"
      :buttonText="$t('otcRelease.DeCertification')"
      :imgMap="imgMap"
      @close="dialogClose"
      @confirm="gotoAuth"
    >
      <div class="ts-content-text">
        <span v-if="tsTexttype === 1">{{ $t("personal.exccAuthForm.text18") }}</span>
        <span v-else>{{ $t("personal.exccAuthForm.text19") }}</span>
      </div>
    </c-alert>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/lever-tradeForm/lever-tradeForm";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/lever-tradeForm/lever-tradeForm.styl";
import leverageTransfer from "@/views/assets/leverageTransfer.vue";
import { getCoinShowName } from "@/utils";
import range_m from "@/components/modules/utiles/range_m";
import tradeInput from "./tradeInput.vue";

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    leverageTransfer,
    range_m,
  },
  data() {
    return {
      m_percentageLength: 0, // 进度条长度
      tag_active_index: 1, // 所在标签索引
    };
  },
  computed: {
    // 通过输入数量计算百分比
    calPercentage() {
      return (type) => {
        const { transactionType } = this;
        const symbolAccoubt = +this.currenTaccount.symbolAccoubt; // 可用交易币
        const unitsAccoubt = +this.currenTaccount.unitsAccoubt; // 可用标准币
        let percentage = 0;
        type = type.toLowerCase();
        if (type === "buy" && unitsAccoubt > 0) {
          // 限价单
          if (transactionType === 1) {
            percentage = ((this.formData_2.value * this.formData_1.value) / unitsAccoubt) * 100;
          }
          // 市价单
          if (transactionType === 2) {
            percentage = (this.formData_2.value / unitsAccoubt) * 100;
          }
        } else if (type === "sell" && symbolAccoubt > 0) {
          // 限价单 / 市价单
          if (transactionType === 1 || (transactionType === 2 && symbolAccoubt > 0)) {
            percentage = (this.formData_4.value / symbolAccoubt) * 100;
          }
        }
        percentage = percentage > 100 ? 100 : percentage;
        percentage = isNaN(+percentage) ? 0 : (+percentage).toFixed(2);
        return percentage;
      };
    },
  },
  mounted() {
    this.init();
    if (this.$refs.mPercentage) {
      this.m_percentageLength = this.$refs.mPercentage.offsetWidth - 50;
    }
    window.onresize = () => {
      if (this.$refs.mPercentage) {
        this.m_percentageLength = this.$refs.mPercentage.offsetWidth - 50;
      }
    };
    // 监听撤单
    this.$bus.$on("cancelOrder", () => {
      setTimeout(() => {
        this.getLeverageFinance();
      }, 1000);
    });
  },
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
    getCoinShowName_m(name, coinList) {
      return getCoinShowName(name, coinList);
    },
  },
  // filters:{
  //   getCoinShowName:(name, coinList) => getCoinShowName(name, coinList)
  // },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};
</script>
<style scoped>
/* 2022.12.30 修改样式 */
/deep/.m-sellBtn {
  background: var(--subRedColor);
  border-radius: 100px;
  margin-bottom: 10px;
}
/deep/.m-buyBtn {
  background: var(--color-Positive);
  border-radius: 100px;
  margin-bottom: 10px;
}
/deep/.loginBtn {
  background: var(--color-31);
  border-radius: 100px;
  margin-bottom: 10px;
  color: var(--mainColor);
}
/deep/.rangeBox {
  margin: 0 10px 16px;
}
/deep/.m-sellBtn,
/deep/.m-buyBtn,
.total-assets /deep/.common-button-text {
  color: var(--color-BTN-BUY-SELL-text);
}
/* 进度条 */
.m-percentage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  cursor: pointer;
  user-select: none;
  margin-top: -20px;
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
  display: inline-block;
  background: url("/static/img/zexxion_logo_x4.png") center no-repeat;
  /*border: 2px solid var(--mainColor);*/
  background-size: contain;
  z-index: 10;
  border: none;
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
  width: calc(var(--width) - 6px);
}
.trade-box.lever-tradeForm .title-block .tab {
  color: var(--color-text-secondary);
}
.trade-box.lever-tradeForm .trade-form .top-mag .lov {
  color: var(--color-1);
  margin-left: auto;
}
.trade-box.lever-tradeForm .trade-form .top-mag > span:last-child {
  display: flex;
  align-items: center;
}
</style>
<!--样式修改-->
<style lang="stylus" scoped>
.title-block {
  background-color var(--trade-color-1) !important;
}
.trade-form {
  display: flex;
  background-color var(--trade-color-1) !important;
  .trade-block {
    flex auto;
    margin-top 0 !important;
    width 50%
  }
}
.tag_go {
  display flex;
  padding 0;
  justify-content space-between;
  background var(--trade-color-1);
  border-bottom: 1px solid var(--color-Input-border);

  div.tag_left, div.tag_right {
    display flex;
    align-items center
  }

  div.tag_left div {
    position: relative;
    line-height: 44px;
    text-align: center;
    height: 44px;
    margin-left: 20px;
    cursor pointer
    box-sizing border-box
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: var(--color-text-secondary);
    border: none;
    &::after {
      content: '';
      display: flex;
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
    }
    &.tag_actived {
      color: var(--color-text-primary);
    }
    &.tag_actived::after {
      background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%);
      background-position: center bottom;
      background-size: 20px 100%;
      background-repeat: no-repeat;
    }

    &:hover {
      color: var(--color-text-primary);
    }
  }

  div.tag_right > div {
    display flex
    margin 0 10px
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    div {
      padding 4px
    }

    & span {
      display inline-block
      width 1px
      height 18px
      background-color #383c45
    }

    &.right_1 {
      background-color #316AD5
      color #FFFFFF
      border-radius: 3px;
    }

    &.right_2 {
      color: #EAECEF;
    }
  }


}

.blue_swap.title-block {
  display flex
  justify-content space-between
  border-color: var(--color-Input-border);

  .tab {
    &.active {
      color var(--color-text-primary);
    }
    &.active::after {
      background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%);
      background-position: center bottom;
      background-size: 20px 100%;
      background-repeat: no-repeat;
    }
  }

  & .title-block_right {
    display flex
    align-items center
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 36px;
    color: var(--color-text-primary);
    & > * {
      margin-left  12px
      cursor pointer
    }
    & div:nth-child(5) {
      span {
        display inline-block
        height: 16px;
        line-height 16px
        text-align center
        width: 30.81px;
        margin 0 5px
        background: rgba(49, 106, 213, 0.31);
        border-radius: 2px;
        color: #316AD5;
      }
    }
  }


  .split_line {
    display inline-block
    width 1px
    height 18px
    background-color var(--color-Divider);
  }
}


.trade-box.lever-tradeForm.b-2-cl {
  display: flex;
  flex-direction: column;
  height 100%;
}

.trade-form {
  flex: auto;
  padding-bottom: 24px;
}

.form-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  //padding 10px 15px 0 !important
  box-sizing: border-box;
  gap: 12px;
}

.trade-box.lever-tradeForm .trade-form .top-mag svg {
  padding-left 6px;
  cursor pointer;
  user-select none;
}

.m-percent {
  height: 14px;
  font-size: 14px;
  text-align: right;
  color: var(--color-1);
}
/deep/.trade-input.trade-input-china-container.disabledForm .input-item {
  display flex;
  align-items center;
  justify-content space-between;
}
/deep/.trade-input.trade-input-china-container .input-item {
  background var(--trade-color-2) !important;
}
/deep/.trade-input.trade-input-china-container .input-item .units,
/deep/.trade-input.trade-input-china-container .input-item .inputs {
  color: var(--color-1);
}
.lever-tradeForm {
  border-radius: 8px;
  background-color: var(--color-BG);
}

.trade-box.lever-tradeForm .form-info .info-radio {
  padding: 0;
  height: 30px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  color: var(--color-text-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  background: none;
}
.trade-box.lever-tradeForm .form-info .info-item,
.trade-box.lever-tradeForm .form-info .info-item .radio {
  display: flex;
}
.trade-box.lever-tradeForm .form-info .info-item .radio .b-1-cl {
  display: flex;
  align-items: center;
  height: 100%;
}
.trade-box.lever-tradeForm .form-info .info-item .radio .b-1-cl:first-child {
  margin-right: 28px;
}
.b-1-cl {
  color var(--color-text-primary);
}
.trade-box.lever-tradeForm .inline-input {
  padding 0;
}
</style>
