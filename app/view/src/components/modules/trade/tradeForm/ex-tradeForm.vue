<!-- 币币交易 下单 -->
<template>
  <!-- 改，2022.10.01，a-3-bd-c -> a-3-bd-c -->
  <div class="trade-box trade-box-ex-container b-2-cl">
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
      <div v-if="false" class="tag_right">
        <div class="right_1">
          <div>Hot</div>
        </div>
        <div class="right_2">0% trading fee on this BTC pair</div>
        <div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.25642 4.44516L0.663086 7.0385L1.84175 8.21649L5.61309 4.44516L4.43442 3.2665L1.84175 0.673828L0.663086 1.85249L3.25642 4.44583V4.44516Z"
              fill="#EAECEF"
            />
          </svg>
        </div>
        <div>
          <div style="margin-right: 5px">Spot Grid</div>
          <span> </span>
          <div style="margin-left: 5px">Fee Level</div>
        </div>
        <div>
          <svg
            width="4"
            height="15"
            viewBox="0 0 4 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.681641 14.1126V11.6126H3.18164V14.1126H0.681641ZM0.681641 3.2793V0.779297H3.18164V3.2793H0.681641ZM0.681641 6.19596V8.69596H3.18164V6.19596H0.681641Z"
              fill="#76808F"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- 交易类型 -->
    <div class="title-block a-3-bd-c">
      <div>
        <span
          v-for="item in calTradeType"
          v-if="item.isShow"
          @click="switchTradeType(item.type)"
          :class="{ 'a-12-bd b-1-cl': transactionType === item.type }"
          class="tab"
          >{{ item.name }}</span
        >
      </div>
      <div class="title-block_right" v-if="isLogin">
        <div @click="showTransfer = true" v-if="openContract">
          <!-- 划转 -->
          {{ $t("lever.leverHz") }}
        </div>
        <span class="split_line" v-if="openContract"></span>
        <div @click="linkTo(`/assets/recharge?symbol=${symbolUnit.symbol}`)">
          <!--充值-->
          {{ $t("assets.exchangeAccount.Recharge") }}
        </div>
        <span class="split_line"></span>
        <div @click="linkTo(`/assets/withdraw?symbol=${symbolUnit.symbol}`)">
          <!--提现-->
          {{ $t("assets.exchangeAccount.withdraw") }}
        </div>
      </div>
    </div>
    <!-- 解锁交易 -->
    <div class="trade-form" v-if="transactionType === 3">
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <!-- 占位 -->
          </div>
          <trade-input
            v-model="formData_5.value"
            @onChanes="onChaneForm"
            name="formData_5"
            :fixValue="fixValue.priceFix"
            :datas="formData_5"
          />
          <trade-input
            v-model="formData_6.value"
            @onChanes="onChaneForm"
            name="formData_6"
            :fixValue="fixValue.volumeFix"
            :datas="formData_6"
          />
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="unlockSell"
            width="100%"
          >
            <!-- 一键解锁卖出 -->
            {{ buttosContent.unlockSellButton.text }}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block model-info">
          <div class="tit">
            <svg class="icon icon-14 hover_show" aria-hidden="true">
              <use xlink:href="#icon-b_27"></use>
            </svg>
            <!-- 模式说明 -->
            {{ $t("trade.modelInfo") }}
          </div>
          <div class="main-text b-1-cl">
            <!-- 模式说明说明 -->
            {{ overchargeMsg }}
          </div>
        </div>
      </div>
    </div>
    <!-- 网格交易 -->
    <div class="trade-form trade-grid" style="padding: 0px" v-else-if="transactionType === 4">
      <template>
        <div class="trade-block">
          <!-- 改，2022.10.19，新增style -->
          <div
            class="form-block"
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- 自定义策略 -->
                {{ $t("gridTrade.type1") }}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{ $t("gridTrade.setText1") }}:
                <span class="lovText">
                  {{ currenTaccount.unitsAccoubt }}
                </span>
                <span class="mr-text">
                  {{ symbolUnit.units | getCoinShowName(coinList) }}
                </span>
                <span class="lovText">{{ currenTaccount.symbolAccoubt }} </span>
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
              <!-- 可用 -->
              <span class="lovText mr-text"
                >{{ $t("gridTrade.setText1") }}:
                {{ currenTaccount.unitsAccoubt }}
                {{ symbolUnit.units | getCoinShowName(coinList) }}
              </span>
              <span class="lovText"
                >{{ currenTaccount.symbolAccoubt }}
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
            </p>
            <!-- 价格区间 -->
            <p style="lineheight: 16px">{{ $t("gridTrade.setText2") }}:</p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <!-- 最低价 -->
                <grid-trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue="fixValue.priceFix"
                  :placeText="$t('gridTrade.setText3')"
                  :datas="gridSetMin"
                />
              </div>
              <b class="a-3-bd-c"></b>
              <div class="input-inline-item">
                <!-- 最高价 -->
                <grid-trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue="fixValue.priceFix"
                  :placeText="$t('gridTrade.setText4')"
                  :datas="gridSetMax"
                />
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{ $t("gridTrade.setText5") }}:</p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue="fixValue.priceFix"
                  :placeText="'2-100'"
                  :datas="gridSetNum"
                />
              </div>
              <div style="width: 28px"></div>
              <div class="input-inline-item clearfix set-type">
                <div
                  class="set-type-btn"
                  :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd-c'"
                  @click="() => (this.setType = 1)"
                >
                  <!-- 等差网格 -->
                  {{ $t("gridTrade.setText6") }}
                </div>
                <div
                  class="set-type-btn"
                  :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd-c'"
                  @click="() => (this.setType = 2)"
                >
                  <!-- 等比网格 -->
                  {{ $t("gridTrade.setText7") }}
                </div>
              </div>
            </div>
            <p>
              <!-- 每格利润 -->
              {{ $t("gridTrade.setText8") }}
              {{
                setType === 1 ? `${gridSetMinProfits}%～${gridSetMaxProfits}` : gridSetMaxProfits
              }}%({{ $t("gridTrade.setText9") }})
            </p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{ $t("gridTrade.setText10") }}</p>
                <grid-trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue="fixValue.priceFix"
                  :datas="gridSetAccount"
                />
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{ $t("gridTrade.setText12") }}({{ $t("gridTrade.optional") }})</p>
                <grid-trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue="fixValue.priceFix"
                  :datas="gridSetMinBalance"
                />
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{ $t("gridTrade.setText11") }}({{ $t("gridTrade.optional") }})</p>
                <grid-trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue="fixValue.priceFix"
                  :datas="gridSetMaxBalance"
                />
              </div>
            </div>
            <div class="set-btc">
              <!-- 使用原有 -->
              <span>
                {{ $t("gridTrade.setText13") }} {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
              <div class="switch-inline">
                <c-switch
                  :value="gridSetFormFlag"
                  @click="() => (this.gridSetFormFlag = !this.gridSetFormFlag)"
                />
              </div>
            </div>
            <c-button @click="gradSub('gradTrad')" height="35px" width="100%">
              {{ gridbuttosContent.gridButton.text }}
            </c-button>
          </div>
        </div>
        <div class="trade-block">
          <div
            class="form-block"
            style="
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- AI策略： -->
                {{ $t("gridTrade.type2") }}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{ $t("gridTrade.setText1") }}:
                <span class="lovText">
                  {{ currenTaccount.unitsAccoubt }}
                </span>
                <span class="mr-text">
                  {{ symbolUnit.units | getCoinShowName(coinList) }}
                </span>
                <span class="lovText">{{ currenTaccount.symbolAccoubt }} </span>
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
              <!-- 可用 -->
              <span class="lovText mr-text"
                >{{ $t("gridTrade.setText1") }}:
                {{ currenTaccount.unitsAccoubt }}
                {{ symbolUnit.units | getCoinShowName(coinList) }}
              </span>
              <span class="lovText"
                >{{ currenTaccount.symbolAccoubt }}
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
            </p>
            <p class="fee_love">
              <span>
                <!-- 价格区间: -->
                {{ $t("gridTrade.setText2") }}:
              </span>
              <b></b>
              <label for="">
                <b>
                  <!-- 七日年化收益率 -->
                  {{ $t("gridTrade.aiText1") }}
                </b>
                &nbsp;&nbsp;
                <span class="u-1-cl"> {{ sevenDay }} % </span>
              </label>
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue="fixValue.priceFix"
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"
                />
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{ $t("gridTrade.setText5") }}:</p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiNum.value"
                  @onChanes="onChaneForm"
                  name="gridAiNum"
                  :fixValue="fixValue.priceFix"
                  :placeholder="$t('gridTrade.setText5')"
                  :datas="gridAiNum"
                />
              </div>
            </div>
            <!-- 每格利润 {{gridAiMin}}%～{{gridAiMax}}%(已去除手续费) -->
            <p>
              {{ $t("gridTrade.setText8") }} {{ gridAiMin }}%～{{ gridAiMax }}%({{
                $t("gridTrade.setText9")
              }})
            </p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{ $t("gridTrade.setText10") }}</p>
                <grid-trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue="fixValue.priceFix"
                  :datas="gridAiAccount"
                />
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{ $t("gridTrade.setText12") }}({{ $t("gridTrade.optional") }})</p>
                <grid-trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue="fixValue.priceFix"
                  :datas="gridAiMinBalance"
                />
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{ $t("gridTrade.setText11") }}({{ $t("gridTrade.optional") }})</p>
                <grid-trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue="fixValue.priceFix"
                  :datas="gridAiMaxBalance"
                />
              </div>
            </div>
            <div class="set-btc">
              <span>
                {{ $t("gridTrade.setText13") }} {{ symbolUnit.symbol | getCoinShowName(coinList) }}
              </span>
              <div class="switch-inline">
                <c-switch
                  :value="gridAiFormFlag"
                  @click="() => (this.gridAiFormFlag = !this.gridAiFormFlag)"
                />
              </div>
            </div>
            <c-button @click="gradSub('GridAi')" height="35px" width="100%">
              {{ gridbuttosContent.gridAiButton.text }}
            </c-button>
          </div>
        </div>
      </template>
    </div>
    <!-- 条件交易 -->
    <div class="trade-form" style="padding: 0px" v-else-if="transactionType === 5 && showStopOrder">
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
              <!-- 买入 -->
              {{ $t("trade.buy") }}
              {{ symbolUnit.symbol | getCoinShowName(coinList) }}
            </span>
            <!-- 2023.01.05 修改 -->
            <span class="m-account">
              <span
                class="btnTxt u-8-cl"
                @click="goCz(symbolUnit.units)"
                v-if="isLogin && currenTaccount.unitsOpen.toString() === '1'"
                >{{ $t("manageFinances.goRecharge") }}</span
              >
              <span class="coinNum"
                >{{ currenTaccount.unitsAccoubt }}
                {{ symbolUnit.units | getCoinShowName(coinList) }}</span
              >
            </span>
          </div>
          <!-- 触发价 -->
          <form-input
            :promptText="$t('futures.tradeForm.text13')"
            v-if="formData_7.isShow"
            :fix="fixValue.priceFix"
            :unit="formData_7.units"
            :title="$t('futures.tradeForm.text12')"
            :default="formData_7.value"
            :isPercentage="formData_7.percentageValue"
            :isError="formData_7.errorText"
            @tradeChangeValue="changeInput('formData_7', $event)"
          >
          </form-input>
          <div v-if="formData_7.errorText" class="form-error b-6-cl">
            {{ formData_7.errorText }}
          </div>
          <!-- 委托价格 -->
          <form-input
            :isMarket="isMarketBuy"
            :fix="fixValue.priceFix"
            :unit="formData_8.units"
            :default="formData_8.value"
            :title="$t('futures.tradeForm.text11')"
            :haveMarket="true"
            :isError="formData_8.errorText"
            @selectMarket="selectMarket('buy')"
            @tradeChangeValue="changeInput('formData_8', $event)"
          >
          </form-input>
          <div v-if="formData_8.errorText" class="form-error b-6-cl">
            {{ formData_8.errorText }}
          </div>
          <!--委托数量-->
          <form-input
            class="inputNum"
            :promptText="formData_9.promptText"
            :fix="fixValue.priceFix"
            :unit="symbolUnit.symbol"
            :title="lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53')"
            :default="formData_9.value"
            :isError="formData_9.errorText"
            :isPercentage="formData_9.percentageValue"
            @clearPercentage="clearPercentage('buy')"
            @tradeChangeValue="changeInput('formData_9', $event)"
          >
          </form-input>
          <div v-if="formData_9.errorText" class="form-error b-6-cl">
            {{ formData_9.errorText }}
          </div>
          <!-- <div class="m-percent">{{ calPercentage('buy') ? calPercentage('buy') + '%' : '0%' }}</div> -->
          <range_m
            @rangeValue="(value) => setpercentageValue(value, 'buy')"
            :range-v="calPercentage('buy')"
          ></range_m>
          <!--交易额-->
          <div class="volume-trade">
            <trade-input
              v-model="tradeVolumeBuy"
              name="dealMoney_1"
              inputStyle=""
              :datas="{
                title: lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53'),
                units: getCoinShowName_m(symbolUnit.units, coinList),
                disabled: true,
                disabledText: tradeVolumeBuy2,
              }"
            />
          </div>
          <!--买入价格-->
          <c-button
            :defaultColorClass="buttosContent.buyButton.class"
            :hoverColorClass="buttosContent.buyButton.class"
            :activeColorClass="buttosContent.buyButton.class"
            @click="submitStopOrder('BUY')"
            width="100%"
            class-name="m-buyBtn"
          >
            <!-- :class-name="isLogin ? 'm-buyBtn' : 'loginBtn'" -->
            {{ buttosContent.buyButton.text }}
          </c-button>
        </div>
      </div>
      <!--SELL-->
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
              <!-- 卖出 -->
              {{ $t("trade.sell") }}
              {{ symbolUnit.symbol | getCoinShowName(coinList) }}
            </span>
            <!-- 2023.01.05 修改 -->
            <span class="m-account">
              <span
                class="btnTxt u-8-cl"
                @click="goCz(symbolUnit.symbol)"
                v-if="isLogin && currenTaccount.symbolOpen.toString() === '1'"
                >{{ $t("manageFinances.goRecharge") }}</span
              >
              <span class="coinNum"
                >{{ currenTaccount.symbolAccoubt }}
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}</span
              >
            </span>
          </div>
          <!-- 触发价 -->
          <form-input
            :promptText="$t('futures.tradeForm.text13')"
            v-if="formData_11.isShow"
            :fix="formData_11.fix"
            :unit="formData_11.units"
            :title="$t('futures.tradeForm.text12')"
            :default="formData_11.value"
            :isPercentage="formData_11.percentageValue"
            :isError="formData_11.errorText"
            @tradeChangeValue="changeInput('formData_11', $event)"
          >
          </form-input>
          <div v-if="formData_11.errorText" class="form-error b-6-cl">
            {{ formData_11.errorText }}
          </div>
          <!-- 委托价格 -->
          <form-input
            :promptText="formData_12.promptText"
            :isMarket="isMarketSell"
            :fix="formData_12.fix"
            :unit="formData_12.units"
            :default="formData_12.value"
            :title="$t('futures.tradeForm.text11')"
            :haveMarket="true"
            :isError="formData_12.errorText"
            @selectMarket="selectMarket('sell')"
            @tradeChangeValue="changeInput('formData_12', $event)"
          >
          </form-input>
          <div v-if="formData_12.errorText" class="form-error b-6-cl">
            {{ formData_12.errorText }}
          </div>
          <!--委托数量-->
          <form-input
            :promptText="formData_13.promptText"
            :fix="formData_13.fix"
            :unit="symbolUnit.symbol"
            :title="lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53')"
            :default="formData_13.value"
            :isError="formData_13.errorText"
            :isPercentage="formData_13.percentageValue"
            @clearPercentage="clearPercentage('sell')"
            @tradeChangeValue="changeInput('formData_13', $event)"
          >
          </form-input>
          <div v-if="formData_13.errorText" class="form-error b-6-cl">
            {{ formData_13.errorText }}
          </div>
          <!-- <div class="m-percent">{{ calPercentage('sell') ? calPercentage('sell') + '%' : '0%' }}</div> -->
          <range_m
            @rangeValue="(value) => setpercentageValue(value, 'sell')"
            :range-v="calPercentage('sell')"
          ></range_m>
          <!--交易额-->
          <div class="volume-trade">
            <!-- 交易额: -->
            <!--{{ $t("trade.dealMoney") }}-->
            <!--<span class="vol" v-if="tradeVolumeBuy !== '&#45;&#45;'">-->
            <!--  {{ tradeVolumeBuy }}-->
            <!--  {{ symbolUnit.units | getCoinShowName(coinList) }}-->
            <!--</span>-->
            <trade-input
              v-model="tradeVolumeSell"
              name="dealMoney_1"
              :datas="{
                title: lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53'),
                units: getCoinShowName_m(symbolUnit.units, coinList),
                disabled: true,
                disabledText: tradeVolumeSell2,
              }"
            />
          </div>
          <!--卖出-->
          <c-button
            :defaultColorClass="buttosContent.sellButton.class"
            :hoverColorClass="buttosContent.sellButton.class"
            :activeColorClass="buttosContent.sellButton.class"
            @click="submitStopOrder('SELL')"
            width="100%"
            class-name="m-sellBtn"
          >
            <!-- :class-name="isLogin ? 'm-sellBtn' : 'loginBtn'" -->
            {{ buttosContent.sellButton.text }}
          </c-button>
        </div>
      </div>
    </div>
    <!-- 限价交易/市价交易 -->
    <div class="trade-form" style="padding: 0px" v-else>
      <!--BUY-->
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
          <!-- <div class="m-percent">{{ calPercentage('buy') ? calPercentage('buy') + '%' : '0%' }}</div> -->
          <range_m
            :disabled="!formData_1.value && transactionType !== 2"
            @rangeValue="(value) => setPerNumber('buy', value)"
            :range-v="calPercentage('buy')"
          ></range_m>
          <div class="volume-trade" v-if="transactionType === 1">
            <trade-input
              v-model="tradeVolumeBuy"
              name="dealMoney_1"
              inputStyle=""
              :datas="{
                title: lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53'),
                units: getCoinShowName_m(symbolUnit.units, coinList),
                disabled: true,
                disabledText: tradeVolumeBuy,
              }"
            />
          </div>
          <div class="top-mag avbl">
            <span class="m-account">
              <span>{{ $t("futures.tradeForm.availble") }} &nbsp;&nbsp;</span>
              <span class="coinNum"
                >{{ currenTaccount.unitsAccoubt }}
                {{ symbolUnit.units | getCoinShowName(coinList) }}&nbsp;&nbsp;</span
              >
              <span
                class="btnTxt u-8-cl"
                @click="goCz(symbolUnit.units)"
                v-if="isLogin && currenTaccount.unitsOpen.toString() === '1'"
              >
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
                    fill="#6A60FF"
                  />
                </svg>
              </span>
            </span>
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
            <span>{{ buttosContent.buyButton.text }} </span>
          </c-button>
        </div>
      </div>
      <!--SELL-->
      <div class="trade-block">
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
          <!-- <div class="m-percent">{{ calPercentage('sell') ? calPercentage('sell') + '%' : '0%' }}</div> -->
          <range_m
            :disabled="!formData_3.value && transactionType !== 2"
            @rangeValue="(value) => setPerNumber('sell', value)"
            :range-v="calPercentage('sell')"
          ></range_m>
          <div class="volume-trade" v-if="transactionType === 1">
            <div class="volume-trade-opt">
              <trade-input
                v-model="tradeVolumeSell"
                name="dealMoney_2"
                :datas="{
                  title: lan === 'en_US' ? 'Amount' : $t('futures.tradeForm.text53'),
                  units: getCoinShowName_m(symbolUnit.units, coinList),
                  disabled: true,
                  disabledText: tradeVolumeSell,
                }"
              />
            </div>
          </div>
          <div class="top-mag avbl">
            <span class="m-account">
              <span>{{ $t("futures.tradeForm.availble") }} &nbsp;&nbsp;</span>
              <span class="coinNum"
                >{{ currenTaccount.symbolAccoubt }}
                {{ symbolUnit.symbol | getCoinShowName(coinList) }}&nbsp;&nbsp;</span
              >
              <span
                class="btnTxt u-8-cl"
                @click="goCz(symbolUnit.symbol)"
                v-if="isLogin && currenTaccount.symbolOpen.toString() === '1'"
              >
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
                    fill="#6A60FF"
                  />
                </svg>
              </span>
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
            <span>{{ buttosContent.sellButton.text }} </span>
          </c-button>
        </div>
      </div>
    </div>
    <!-- 未认证 提示框 -->
    <c-alert
      :showFlag="isShowDialog"
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

    <!-- 改，2022.11.15 新增二次确认弹窗 -->
    <c-dialog
      :titleText="`${$t('components.dialog.confirmText')}${$t('header.order')}`"
      :confirmText="$t('components.dialog.confirmText')"
      :closeText="$t('components.dialog.closeText')"
      :showFlag="isShowConfirmDialog"
      :confirmLoading="confirmLoading"
      @close="handlerClose"
      @confirm="handlerConfirm"
      class="m-confirmDialog"
      :haveOption="false"
    >
      <div class="m-info-wrap">
        <div class="m-info">
          <div class="item">{{ $t("lever.spot") }}</div>
          <div class="item">
            {{ dialogContent.symbolCurrent
            }}<span
              class="type"
              :class="{ buy: dialogContent.side == 'BUY', sell: dialogContent.side == 'SELL' }"
              >({{ dialogContent.side }})</span
            >
          </div>
        </div>
        <div class="m-info">
          <!--类型-->
          <div class="item">{{ $t("broker.type") }}</div>
          <div class="item">{{ dialogContent.type }}</div>
        </div>
        <div class="m-info">
          <!--价格-->
          <div class="item">{{ $t("trade.price") }}</div>
          <div class="item" style="color: #ff0000">
            {{
              transactionType === 2
                ? $t("trade.mPriceBuy")
                : dialogContent.price + " " + symbolUnit.units
            }}
          </div>
        </div>
        <div class="m-info" v-if="transactionType === 1">
          <!--数量-->
          <div class="item">{{ $t("futures.coFlowingWater.amount") }}</div>
          <div class="item" style="color: #ff0000">
            {{ dialogContent.volume }} {{ symbolUnit.symbol }}
          </div>
        </div>
        <!--市价-->
        <div class="m-info" v-if="transactionType === 2">
          <!--数量-->
          <div class="item">{{ $t("trade.dealMoney") }}</div>
          <div class="item" style="color: #ff0000">
            {{ dialogContent.volume }}
            {{ dialogContent.side == "BUY" ? symbolUnit.units : symbolUnit.symbol }}
          </div>
        </div>
        <div class="m-info" v-if="transactionType === 1">
          <!--金额-->
          <div class="item">{{ $t("trade.dealMoney") }}</div>
          <div class="item" style="color: #ff0000">
            {{ dialogContent.amount }} {{ symbolUnit.units }}
          </div>
        </div>
      </div>

      <div class="m-btnGroup">
        <div class="btn" style="margin-right: 20px" @click="handlerClose">
          {{ $t("components.dialog.closeText") }}
        </div>
        <div class="btn active" :class="{ confirmLoading: confirmLoading }" @click="handlerConfirm">
          {{ $t("components.dialog.confirmText") }}
        </div>
      </div>
    </c-dialog>
    <!--划转-->
    <exchange-transfer
      symbol="USDT"
      :isShow="showTransfer"
      :close="() => (showTransfer = false)"
      transferSideOutSide="2"
    >
    </exchange-transfer>
  </div>
</template>
<script>
import mixin from "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm";
import "@/components/BlockChain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm.styl";
import {
  cut,
  division,
  fixD,
  getCoinShowName,
  myStorage,
  nul,
} from "@/components/BlockChain-ui-privatization/utils";
import range_m from "@/components/modules/utiles/range_m";
import stopOrderMixin from "@/assets/js/stop-order-mixin";
import exchangeTransfer from "@/components/modules/coTrade/component/transfer.vue";
import { imgMap } from "@/utils";
import tradeInput from "./tradeInput.vue";
import tradeInput2 from "./tradeInput2.vue";
import GridTradeInput from "./GridTradeInput.vue";
import formInput from "../../coTrade/component/form-input.vue";

export default {
  mixins: [mixin, stopOrderMixin],
  components: {
    tradeInput,
    tradeInput2,
    GridTradeInput,
    range_m,
    formInput,
    exchangeTransfer,
  },
  props: {
    showStopOrder: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
    // 传入全地址，以现货请求合约数据
    this.$store.dispatch("getFutorePublicInfo");
    // this.getContractConfig();
    if (this.$refs.mPercentage) {
      this.m_percentageLength = this.$refs.mPercentage.offsetWidth - 25;
    }
    window.onresize = () => {
      if (this.$refs.mPercentage) {
        this.m_percentageLength = this.$refs.mPercentage.offsetWidth - 25;
      }
    };
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
  data() {
    return {
      imgMap,
      marketData: [],
      gridType: 1, // 专业版选择自定义或者ai
      setType: 1, // 类型1等差2 等比
      gridSetFormFlag: false,
      gridAiFormFlag: false,
      minimumOrderQuantity: 0, // 最小下单金额
      // 七日年化收益率
      sevenDay: "--",
      gridAiMin: "--", // 最大利润率
      gridAiMax: "--", // 最小利润率
      gridAiMinPrice: "--", // Ai 最小值
      gridAiMaxPrice: "--", // Ai 最大值
      fee: null, // 手续费
      // set代表自定义
      gridSetMin: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        errorHeight: "-30px",
        value: "",
      },
      gridSetMax: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        errorHeight: "-30px",
        value: "",
      },
      // 数量
      gridSetNum: {
        units: "",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        errorHeight: "-30px",
        value: "",
      },
      // 资产
      gridSetAccount: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      // 止盈价格
      gridSetMaxBalance: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      // 止损价格
      gridSetMinBalance: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      gridAiBlance: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: true,
        disabledText: "",
        errorHeight: "-30px",
        value: "",
      },
      gridAiNum: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: true,
        disabledText: "",
        errorHeight: "-30px",
        value: "",
      },
      gridAiAccount: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      gridAiMaxBalance: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      gridAiMinBalance: {
        units: myStorage.get("sSymbolName") ? myStorage.get("sSymbolName").split("/")[1] : "USDT",
        errorText: "",
        isError: false,
        disabled: false,
        disabledText: "",
        style: "width: 63%",
        errorHeight: "-30px",
        value: "",
      },
      // 改，2022.15 二次确认弹窗
      isShowConfirmDialog: false,
      // 改，2022.18 新增 dialogContent,confirmLoading 字段
      dialogContent: {},
      confirmLoading: false, // 二次确认弹窗loading
      m_percentageLength: 0,
      tag_active_index: 0,
      showTransfer: false,
      openContract: true,
    };
  },
  computed: {
    // 交易类型
    calTradeType() {
      if (!this.$t) {
        return [];
      }
      const tradeTypeList = [
        {
          name: this.$t("trade.limitPriceTrade"), // 限价交易
          type: 1,
          isShow: true,
        },
        {
          name: this.$t("trade.marketPriceTrade"), // 市价交易
          type: 2,
          isShow: true,
        },
        {
          name: this.$t("trade.unlockTrade"), // 解锁交易
          type: 3,
          isShow: this.showUnlockSell,
        },
        {
          name: this.$t("gridTrade.title"), // 网格交易
          type: 4,
          isShow: this.gridTradeFlag && this.showGridFlag,
        },
        {
          name: this.$t("futures.orderList.tabType3"), // 条件交易
          type: 5,
          isShow: this.showStopOrder,
        },
      ];
      return tradeTypeList;
    },
    // 语言
    lan() {
      return this.$store.state.baseData.lan;
    },
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 0;
      if (publicInfo && publicInfo.switch && publicInfo.switch.grid_trade_switch) {
        str = Number(publicInfo.switch.grid_trade_switch);
      }
      return str;
    },
    // 该币对是否开启网格
    showGridFlag() {
      let flag = false;
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];

        if (symbol && symbol.is_grid_open) {
          flag = true;
        }
      }
      return flag;
    },
    // 按钮信息
    gridbuttosContent() {
      return {
        gridButton: {
          // 开启网格交易
          text: this.isLogin ? this.$t("gridTrade.btn1") : this.$t("trade.loginReg4"), // '登录/注册',
          class: this.isLogin ? "u-1-bg buyBtn u-16-cl" : "u-8-bg buyBtn u-16-cl",
        },
        // 开启AI网格策略
        gridAiButton: {
          text: this.isLogin ? this.$t("gridTrade.btn2") : this.$t("trade.loginReg4"), // '登录/注册',
          class: this.isLogin ? "u-1-bg buyBtn u-16-cl" : "u-8-bg buyBtn u-16-cl",
        },
      };
    },
    // 等差网格（动态利润）： min ~ max

    // max =（（最高价-最低价）/ （网格数量 - 1）/ 最低价）  - 买入手续费率 - 卖出手续费率

    // min =（ (最高价-最低价）/ （网格数量 - 1））/ （最高价 - （ (最高价-最低价）/ （网格数量 - 1）））  - 买入手续费率 - 卖出手续费率

    // 最低利润
    gridSetMinProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value && this.gridSetMin.value && this.gridSetNum.value) {
        if (this.setType === 1) {
          const card = division(
            cut(this.gridSetMax.value, this.gridSetMin.value),
            this.gridSetNum.value - 1
          );
          val = nul(
            cut(cut(division(card, cut(this.gridSetMax.value, card)), this.fee), this.fee),
            100
          );
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || "--";
    },
    // 最高利润
    gridSetMaxProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value && this.gridSetMin.value && this.gridSetNum.value) {
        if (this.setType === 1) {
          val = nul(
            cut(
              cut(
                division(
                  division(
                    cut(this.gridSetMax.value, this.gridSetMin.value),
                    this.gridSetNum.value - 1
                  ),
                  this.gridSetMin.value
                ),
                this.fee
              ),
              this.fee
            ),
            100
          );
          // 等比网格（固定利润）=（（最高价/最低价）开（网格数量-1）次方） - 手续费率*2-1
        } else if (this.setType === 2) {
          val = nul(
            cut(
              cut(
                division(this.gridSetMax.value, this.gridSetMin.value) **
                  (1 / (this.gridSetNum.value - 1)),
                nul(this.fee, 2)
              ),
              1
            ),
            100
          );
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || "--";
    },
    setNumVal() {
      return this.gridSetNum.value;
    },
    symbolsData() {
      if (this.marketData[this.symbolCurrent]) {
        return this.marketData[this.symbolCurrent];
      }
      return {
        name: "--",
        symbol: {
          symbol: "--",
          unit: "--",
        },
        close: {
          class: "",
          data: 0,
          price: "--",
        },
        amount: "--",
        rose: {
          class: "",
          data: "--",
        },
      };
    },
    // 地址
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
    // 通过输入数量计算百分比
    calPercentage() {
      return (type) => {
        const { transactionType } = this;
        const { symbolAccoubt } = this.currenTaccount; // 可用交易币
        const { unitsAccoubt } = this.currenTaccount; // 可用标准币
        let percentage = 0;
        type = type.toLowerCase();
        if (type === "buy") {
          // 限价单
          if (transactionType === 1) {
            percentage = ((this.formData_2.value * this.formData_1.value) / unitsAccoubt) * 100;
          }
          // 市价单
          if (transactionType === 2) {
            percentage = (this.formData_2.value / unitsAccoubt) * 100;
          }
          // 条件单
          if (transactionType === 5) {
            percentage = ((this.formData_8.value * this.formData_9.value) / unitsAccoubt) * 100;
          }
        } else {
          // 限价单 / 市价单
          if (transactionType === 1 || transactionType === 2) {
            percentage = (this.formData_4.value / symbolAccoubt) * 100;
          }
          // 条件单
          if (transactionType === 5) {
            percentage = (this.formData_13.value / symbolAccoubt) * 100;
          }
        }
        percentage = percentage > 100 ? 100 : percentage;
        percentage = isNaN(+percentage) ? 0 : (+percentage).toFixed(2);
        return percentage;
      };
    },
    isLogin() {
      return this.$store.state.baseData.isLogin;
    },
  },
  watch: {
    // 切换自定义和ai
    gridType() {
      this.clearGridValue();
      this.getAiData();
    },
    // 切换 限价交易 和 市价交易
    transactionType(val) {
      // 2 市价交易
      this.$bus.$emit("tradeType", false);
      if (val === 2) {
        this.formData_1.disabled = true;
        this.formData_1.disabledText = this.$t("trade.mPriceBuy"); // 以市场最优价买入
        this.formData_2.title = this.$t("trade.dealMoney"); // '交易额';
        this.formData_2.units = this.symbolUnit.units;
        this.formData_3.disabled = true;
        this.formData_3.disabledText = this.$t("trade.mPriceSell"); // 以市场最优价卖出
      } else if (val === 1) {
        this.formData_1.disabled = false;
        this.formData_1.disabledText = "";
        this.formData_2.title = this.$t("trade.number"); // '数量';
        this.formData_2.units = this.symbolUnit.symbol;
        this.formData_3.disabled = false;
        this.formData_3.disabledText = "";
      } else if (val === 4) {
        this.clearGridValue();
        this.getAiData();
        // 改变父组件样式
        this.$bus.$emit("tradeType", "grid");
      }
    },
    setNumVal(v) {
      if (v) {
        this.$nextTick(() => {
          this.gridSetNum.value = fixD(v, 0);
        });
      }
    },
    // 各个输入框的 单位
    symbolUnit(val) {
      this.formData_1.units = this.getShowName(val.units);
      // this.formData_2.units = this.getShowName(val.symbol);
      this.formData_3.units = this.getShowName(val.units);
      this.formData_4.units = this.getShowName(val.symbol);
      this.gridSetMin.units = this.getShowName(val.units);
      this.gridSetMax.units = this.getShowName(val.units);
      this.gridSetAccount.units = this.getShowName(val.units);
      this.gridSetMaxBalance.units = this.getShowName(val.units);
      this.gridSetMinBalance.units = this.getShowName(val.units);
      this.gridAiAccount.units = this.getShowName(val.units);
      this.gridAiMaxBalance.units = this.getShowName(val.units);
      this.gridAiMinBalance.units = this.getShowName(val.units);

      if (this.transactionType === 2) {
        this.formData_2.units = this.symbolUnit.units;
      } else {
        this.formData_2.units = this.symbolUnit.symbol;
      }
    },
    isLogin(v) {
      if (v) {
        this.getContractConfig();
      }
    },
  },
  methods: {
    // 获取用户合约设置
    getContractConfig() {
      this.axios({
        url: "user/get_user_config",
        headers: {},
        params: {
          contractId: myStorage.get("contractId"),
        },
        method: "post",
        hostType: "co",
      }).then((res) => {
        this.openContract = res.data ? !!res.data.openContract : true;
      });
    },
    // 前往合约
    navToCo() {
      let path = "";
      if (process.env.NODE_ENV === "development") {
        path = `/co/${this.lan}/trade`;
      } else {
        path = this.linkurl.coUrl ? `/co/${this.lan}/trade` : "";
      }
      this.$router.push(path);
    },
    linkTo(path) {
      this.$router.push(path);
    },
    init() {
      // 两秒让报错消失
      this.$bus.$on("errorMsg", () => {
        const formKey = [
          "gridAiAccount",
          "gridAiMaxBalance",
          "gridAiMinBalance",
          "gridAiNum",
          "gridSetMin",
          "gridSetMax",
          "gridSetNum",
          "gridSetAccount",
          "gridSetMaxBalance",
          "gridSetMinBalance",
        ];
        formKey.forEach((item) => {
          this[item].isError = false;
        });
      });
      // 监听 当前货币对切换
      this.$bus.$on("SYMBOL_CURRENT", (val) => {
        this.clearValue();
        this.clearGridValue();
        this.symbolCurrent = val;
        if (this.transactionType === 3) {
          this.transactionType = 1;
        }
        if (this.transactionType === 4 && this.showGridFlag && this.gridTradeFlag) {
          this.getAiData();
        } else if (this.transactionType === 4 && (!this.showGridFlag || !this.gridTradeFlag)) {
          this.transactionType = 1;
        }
      });
      if (this.isLogin) {
        this.$store.dispatch("assetsExchangeData", {
          auto: false,
          coinSymbols: this.coinSymbols,
        });
        // clearInterval(this.assetsInter);
        // this.assetsInter = setInterval(() => {
        //   this.$store.dispatch('assetsExchangeData', {
        //     auto: true,
        //     coinSymbols: this.symbolUnit.symbol,
        //   });
        // }, 10000);
      }
      // 监听 市场（最新价格） 数据
      this.$bus.$on("MARKET_DATA", (data) => {
        this.marketData = JSON.parse(JSON.stringify(data));
      });
      // 监听 价格点击
      this.$bus.$on("HANDEL_PRICE", (data) => {
        if (data) {
          // const obj = {name: 'formData_1', data };
          const arr = ["formData_1", "formData_3"];
          arr.forEach((item) => {
            this.onChaneForm({ name: item, value: data });
          });
          // onChaneForm
          // this.formData_1.value = data;
          // this.formData_3.value = data;
        }
      });
    },
    gradSub(type) {
      // this.isShowConfirmDialog = true;
      if (!this.isLogin) {
        this.$router.push("/login");
      } else {
        const {
          formKey,
          lowestPrice,
          highestPrice,
          gridNumber,
          totalQuoteAmount,
          stopHighPrice,
          stopLowPrice,
          quantType,
          flag,
          useOwnBase,
          totalBaseAmount,
          gridLineType,
        } = this.submitGridFormKey(type);
        let fal = true;
        if (formKey.length) {
          formKey.forEach((item) => {
            const { value } = this[item];
            if (!value) {
              this[item].errorText = `${this.$t("trade.pleaseInput")}`;
              this[item].isError = true;
              fal = false;
            }
            if (parseFloat(value) <= 0) {
              // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
              this.$bus.$emit("tip", { text: `${this.$t("trade.inputError")}`, type: "error" });
              // this[item].errorHeight = "-30px";
              // this[item].errorText = `${this.$t("trade.inputError")}`; // 输入有误
              // this[item].isError = true;
              fal = false;
            }
          });
          if (this.fal && fal && flag) {
            // 单格利润过小，请重新设置ai
            if (type !== "gradTrad") {
              // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
              if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
                this.$bus.$emit("tip", {
                  text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t(
                    "gridTrade.error3"
                  )}`,
                });
                fal = false;
                return;
              }
              if (
                // 总投入资金/网格数量，不能小于当前币对的最小下单金额
                division(Number(totalQuoteAmount), gridNumber) < Number(this.minimumOrderQuantity)
              ) {
                this.$bus.$emit("tip", { text: this.$t("gridTrade.error4") });
                fal = false;
                return;
              }
              if (
                this.gridAiMax === "--" ||
                this.gridAiMax <= 0 ||
                this.gridAiMin === "--" ||
                this.gridAiMin <= 0
              ) {
                fal = false;
                this.$bus.$emit("tip", { text: this.$t("gridTrade.error9") });
                return;
              }
            } else if (type === "gradTrad") {
              // 单格利润过小，请重新设置自定义
              // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
              if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
                this.$bus.$emit("tip", {
                  text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t(
                    "gridTrade.error3"
                  )}`,
                });
                fal = false;
                return;
                // 总投入资金/网格数量，不能小于当前币对的最小下单金额
              }
              if (
                division(Number(totalQuoteAmount), gridNumber) < Number(this.minimumOrderQuantity)
              ) {
                this.$bus.$emit("tip", { text: this.$t("gridTrade.error4") });
                // 每格投入资金小于当前币对的最小下单金额
                fal = false;
                return;
              }
              if (gridLineType === 1) {
                // 等差
                if (
                  this.gridSetMinProfits === "--" ||
                  this.gridSetMinProfits <= 0 ||
                  this.gridSetMaxProfits === "--" ||
                  this.gridSetMaxProfits <= 0
                ) {
                  this.$bus.$emit("tip", { text: this.$t("gridTrade.error9") });
                  fal = false;
                  return;
                }
              } else if (gridLineType === 2) {
                // 等比只校验最大
                if (this.gridSetMaxProfits === "--" || this.gridSetMaxProfits <= 0) {
                  this.$bus.$emit("tip", { text: this.$t("gridTrade.error9") });
                  fal = false;
                  return;
                }
              }
            }
            if (Number(stopHighPrice) && Number(stopHighPrice) <= Number(highestPrice)) {
              // 止盈价格必须高于网格最高价
              this.$bus.$emit("tip", { text: this.$t("gridTrade.error5") });
              fal = false;
            } else if (
              Number(stopHighPrice) &&
              Number(stopHighPrice) <= Number(this.symbolsData.close.data)
            ) {
              this.$bus.$emit("tip", { text: this.$t("gridTrade.error7") });
              fal = false;
            } else if (Number(stopLowPrice) && Number(stopLowPrice) >= Number(lowestPrice)) {
              // 止损价格必须低于网格最低价
              this.$bus.$emit("tip", { text: this.$t("gridTrade.error6") });
              fal = false;
            } else if (
              Number(stopLowPrice) &&
              Number(stopLowPrice) >= Number(this.symbolsData.close.data)
            ) {
              this.$bus.$emit("tip", { text: this.$t("gridTrade.error8") });
              fal = false;
            }
          }
          if (this.fal && fal && flag) {
            this.fal = false;
            const submitData = {
              symbol: this.symbolCurrent,
              lowestPrice,
              highestPrice,
              gridNumber,
              totalQuoteAmount,
              stopHighPrice,
              stopLowPrice,
              quantType,
              useOwnBase,
              totalBaseAmount,
              gridLineType, // 网格类型 1:等差 2:等比
              fee: this.fee,
            };
            if (useOwnBase) {
              submitData.currentPrice = this.symbolsData.close.data;
              if (submitData.currentPrice) {
                this.gridCancelEvent(submitData);
              }
            } else {
              this.gridSubData(submitData);
            }
          }
        }
      }
    },
    submitGridFormKey(type) {
      let formKey = [];
      let lowestPrice = null;
      let highestPrice = null;
      let gridNumber = null;
      let totalQuoteAmount = null;
      let stopHighPrice = null;
      let stopLowPrice = null;
      let quantType = null;
      let flag = true;
      let gridLineType = 1;
      let useOwnBase = 0;
      const BoxHeight = document.body.clientWidth;
      if (type === "gradTrad") {
        this.gridSetAccount.errorHeight = "-30px";
        formKey = ["gridSetMin", "gridSetMax", "gridSetNum", "gridSetAccount"];
        lowestPrice = fixD(this.gridSetMin.value, this.fixValue.priceFix);
        highestPrice = fixD(this.gridSetMax.value, this.fixValue.priceFix);
        gridNumber = fixD(this.gridSetNum.value, this.fixValue.volumeFix);
        totalQuoteAmount = fixD(this.gridSetAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridSetMaxBalance.value
          ? fixD(this.gridSetMaxBalance.value, this.fixValue.priceFix)
          : 0;
        stopLowPrice = this.gridSetMinBalance.value
          ? fixD(this.gridSetMinBalance.value, this.fixValue.priceFix)
          : 0;
        quantType = 1; // 网格
        gridLineType = this.setType;
        useOwnBase = this.gridSetFormFlag ? 1 : 0;

        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
          this.$bus.$emit("tip", { text: this.$t("gridTrade.error1"), type: "error" });
          // this.gridSetMax.isError = true;
          // 价格区间过小，请重新设置
          // if (BoxHeight < 1325) {
          //   this.gridSetMax.errorHeight = "-40px";
          // }
          // this.gridSetMax.errorText = this.$t("gridTrade.error1");
          flag = false;
        }
        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
          this.$bus.$emit("tip", { text: this.$t("gridTrade.error2"), type: "error" });
          // this.gridSetNum.isError = true;
          // // 数量区间为：2-100
          // this.gridSetNum.errorText = this.$t("gridTrade.error2");
          flag = false;
        }
      } else {
        this.gridAiAccount.errorHeight = "-30px";
        formKey = ["gridAiAccount"];
        lowestPrice = this.gridAiMinPrice;
        highestPrice = this.gridAiMaxPrice;
        gridNumber = this.gridAiNum.value;
        totalQuoteAmount = fixD(this.gridAiAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridAiMaxBalance.value
          ? fixD(this.gridAiMaxBalance.value, this.fixValue.priceFix)
          : 0;
        stopLowPrice = this.gridAiMinBalance.value
          ? fixD(this.gridAiMinBalance.value, this.fixValue.priceFix)
          : 0;
        quantType = 1; // 网格
        gridLineType = 1;
        useOwnBase = this.gridAiFormFlag ? 1 : 0; // 是否使用Base资产 0:不使用 1:使用
        // 单格利润过小，请重新设置
        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
          this.$bus.$emit("tip", { text: this.$t("gridTrade.error1"), type: "error" });
          // this.gridAiMaxPrice.isError = true;
          // if (BoxHeight < 1325) {
          //   this.gridAiMaxPrice.errorHeight = "-40px";
          // }
          // // 价格区间过小，请重新设置
          // this.gridAiMaxPrice.errorText = this.$t("gridTrade.error1");
          flag = false;
        }

        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          // 改，2022.11.14 用弹窗提示替换输入框底部错误提示
          this.$bus.$emit("tip", { text: this.$t("gridTrade.error2"), type: "error" });
          // this.gridAiNum.isError = true;
          // this.gridAiNum.errorText = this.$t("gridTrade.error2");
          flag = false;
        }
      }
      return {
        formKey,
        lowestPrice,
        highestPrice,
        gridNumber,
        totalQuoteAmount,
        stopHighPrice,
        stopLowPrice,
        quantType,
        flag,
        useOwnBase,
        totalBaseAmount: useOwnBase ? this.currenTaccount.symbolAccoubt : 0,
        gridLineType,
      };
    },
    getShowName(v) {
      let str = "";
      const showNameMarket = this.$store.state.baseData.market;
      if (showNameMarket) {
        const { coinList } = showNameMarket;
        str = getCoinShowName(v, coinList);
      }
      return str;
    },
    // 清空 表单数据
    clearGridValue() {
      const formKey = [
        "gridAiAccount",
        "gridAiMaxBalance",
        "gridAiMinBalance",
        "gridAiNum",
        "gridSetMin",
        "gridSetMax",
        "gridSetNum",
        "gridSetAccount",
        "gridSetMaxBalance",
        "gridSetMinBalance",
      ];
      formKey.forEach((item) => {
        this[item].value = "";
        this[item].isError = false;
        this[item].subText = null;
      });
    },
    // 请求ai数据
    getAiData() {
      this.axios({
        url: "noToken/quant/getAIStrategyInfo",
        hostType: "quant",
        params: {
          symbol: this.symbolCurrent,
        },
        method: "post",
      }).then((data) => {
        if (data.code.toString() === "0") {
          if (data.data && data.data.configParamMap) {
            this.gridAiMinPrice = fixD(
              data.data.configParamMap.lowestPrice,
              this.fixValue.priceFix
            );
            this.gridAiMaxPrice = fixD(
              data.data.configParamMap.highestPrice,
              this.fixValue.priceFix
            );
            this.gridAiBlance.disabledText = `${this.gridAiMinPrice} ~ ${this.gridAiMaxPrice}`;
            this.gridAiNum.disabledText = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiNum.value = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiMin = fixD(data.data.everyProfitMin, 2);
            this.gridAiMax = fixD(data.data.everyProfitMax, 2);
            this.fee = data.data.makerFee;
            // 最小下单数量
            this.minimumOrderQuantity = data.data.minimumOrderQuantity;
            this.sevenDay = fixD(data.data.sevenAnnualizedYield, 2); // 7日年华收益
          }
        } else {
          this.$bus.$emit("tip", { text: data.msg, type: "error" });
        }
      });
    },
    // 给服务端传参数和当前行情用于判断是否够每格消耗
    gridCancelEvent(params) {
      this.axios({
        url: "quant/calBaseAmount",
        hostType: "quant",
        method: "post",
        params,
      }).then((req) => {
        if (req.code.toString() === "0" && req.data) {
          if (Number(req.data.baseAmount) > Number(this.currenTaccount.symbolAccoubt)) {
            this.$bus.$emit("tip", {
              text: `${this.$t("gridTrade.least")}${req.data.baseAmount}
            ${getCoinShowName(this.symbolUnit.symbol, this.coinList)}`,
              type: "error",
            });
            this.fal = true;
          } else {
            const obj = { ...params, totalBaseAmount: Number(req.data.baseAmount) };
            this.gridSubData(obj);
          }
        } else {
          this.$bus.$emit("tip", { text: req.msg, type: "error" });
          this.fal = true;
        }
      });
    },
    gridSubData(params) {
      this.axios({
        url: "quant/saveStrategy",
        hostType: "quant",
        params,
        method: "post",
      })
        .then((data) => {
          if (data.code.toString() === "0") {
            // 清空表单
            this.clearGridValue();
            // 重新请求资产
            this.$store.dispatch("assetsExchangeData", {
              auto: false,
              coinSymbols: this.coinSymbols,
            });
            this.getAiData();
            // 发送下单成功的事件
            this.$bus.$emit("ORDER_CREATE", { type: "success" });
            // 提示成功 下单成功
            this.$bus.$emit("tip", { text: this.$t("trade.dealCussess"), type: "success" });
            this.fal = true;
          } else {
            this.$bus.$emit("tip", { text: data.msg, type: "error" });
            this.fal = true;
          }
        })
        .catch(() => {
          this.fal = true;
        });
    },
    dialogClose() {
      this.isShowDialog = false;
    },
    handleTag(index) {
      this.tag_active_index = index;
      this.$bus.$emit("tag_toggle", index);
    },
    getCoinShowName_m(name, coinList) {
      return getCoinShowName(name, coinList);
    },
  },
};
</script>

<style lang="stylus">
.page-content-chain .tradeModel-exchange .title-block {
  height: 36px !important;
  line-height: 36px !important;
  margin: 16px 20px;
  .tab {
    height: 36px !important;
  }

  .total-assets {
    height 36px;
  }
}
.trade-box.trade-box-ex-container .trade_block_width {
  width 100%;
  .trade-input.trade-grid {
    margin-top 6px;
  }
}

.trade-box.trade-box-ex-container .trade-form .top-mag-line {
  height: 40px;
  line-height: 40px;
  .lov {
    line-height: 40px;
  }
}
.trade-box.trade-box-ex-container .trade-form .volume-trade-line {
      height: 44px;
    line-height: 44px;
}

.trade-box p {
  margin-bottom 0;
}
.trade-box .lov_val {
  margin-bottom: 10px;
}
.trade-box label {
  margin-bottom 0;
}
.set_grid_type {
  height 30px;
  font-size 12px;
  line-height 30px;
  padding 0 30px;
  margin-bottom 10px;
  >span {
    margin-right 30px;
    float left;
    cursor: pointer;
  }
  p {
    float right;
  }
}
  .mr-text {
    margin-right 10px;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov {
    display: flex;
    align-items: center;
    height: 42px;
    line-height: 16px;
    justify-content: center;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov .lovText {
    vertical-align: middle;
    line-height: 16px;
    display: inline-block;
    word-wrap: break-word;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag {
    height: 42px;
    line-height: 42px;
  }
  .input-inline-box {
    display flex;
    align-items: center;
    justify-content space-between;
    .input-inline-item {
      flex 1;
    }
    >b {
      display inline-block;
      width 10px;
      margin 0 9px;
      border-bottom-width 2px;
      border-bottom-style solid;
      position relative;
      top -2px;
    }
  }
  .set-type {
    margin-bottom: 6px;
  }
  .set-type-btn {
    cursor pointer;
    height 35px;
    display inline-block;
    width 45%;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    margin-right 5%;
    box-sizing border-box;
    float left;
    line-height 35px;
    text-align center;
  }
  .set-type-btn:nth-child(2) {
    float right;
    margin-right 0;
  }
  .set-num {
    margin-top 14px;
    .setn-num-list {
      width 33.33%;
      float left;
      padding-right 10px;
      box-sizing: border-box;
      .trade-input.trade-input-china-container .input-item {
        padding 8px 10px 0 15px;
        .inputs {
          width 62%;
        }
        .units {
          right 10px;
        }
      }
    }
    .setn-num-list:last-child {
      padding-right 0;
    }
  }
  .set-btc {
    margin-bottom 10px;
  }
  .switch-inline {
    margin-left 40px;
    display inline-block;
    vertical-align: middle;
  }
  .fee_love {
    display flex;
    justify-content space-between;
    align-items center;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      >span {
        font-size: 16px;
        line-height 16px;
      }
    }
  }
  .en_US .trade-box.trade-box-ex-container .trade-grid .top-mag {
    margin-bottom 2px;
  }
</style>
<style scoped>
.m-info-wrap {
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--color-BG-Light);
}
.m-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
}
.m-info > .item:last-child {
  color: var(--color-1) !important;
}
.m-info > .item > .type.sell {
  color: var(--color-Negative) !important;
}
.m-info > .item > .type.buy {
  color: var(--color-Positive) !important;
}
/* 改，2022.11.22 修改弹窗按钮样式 */
/deep/.common-dialog .closeBtnClass {
  background-color: transparent;
  color: #ffffff;
}
.trade-box.trade-box-ex-container .title-block .tab.a-12-bd {
  color: var(--mainColor);
  border-color: transparent;
}
.page-content-chain .tradeModel-exchange .title-block .tab.a-12-bd::after {
  background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom /
    calc(100% - 12px) 100% no-repeat;
}
.page-content-chain .tradeModel-exchange .title-block .tab:hover {
  color: var(--color-text-primary);
}

.trade-box.trade-box-ex-container .title-block {
  border-bottom-width: 1px;
  border-color: var(--color-Input-border);
}
/* 2023.01.03 修改样式 */
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
  width: 20px;
  height: 20px;
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
  left: 22px;
}
.m-percentage > .item.prevItem {
  width: 8px;
  height: 8px;
  background: #ffffff;
}
.m-percentage > .item.prevItem:not(:last-child):after {
  background: var(--mainColor);
  left: 8px;
  width: calc(var(--width) - 10px);
}
.m-percentage > .item::before {
  /*content: attr(title);*/
  /*position: absolute;*/
  /*bottom: -22px;*/
  /*left: -2px;*/
  /*font-size: 12px;*/
}
.m-percentage > .item:last-child::before {
  left: -16px;
}
.m-percentage > .item.prevItem::before,
.m-percentage > .item.active::before {
  color: var(--mainColor);
}
/deep/.common-button.buyBtn,
/deep/.common-button.sellBtn {
  width: 288px;
  height: 42px;
  border-radius: 100px;
}
/deep/.m-buyBtn.common-button {
  background: var(--color-Positive);
  margin-bottom: 24px;
}

/deep/.m-buyBtn.common-button.notLogin {
  /* background-color: var(--trade-color-7); */
}
/deep/.common-button.m-sellBtn {
  background: var(--subRedColor);
  margin-bottom: 10px;
}
/deep/.common-button.loginBtn {
  background: var(--trade-color-7);
  border-radius: 100px;
  margin-bottom: 10px;
  color: var(--mainColor);
}
/deep/.common-button.sellBtn.notLogin {
  /* background-color: var(--trade-color-7); */
}
/deep/.m-sellBtn,
/deep/.m-buyBtn {
  color: var(--color-BTN-BUY-SELL-text);
}
.trade-box-ex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.m-account {
  width: 100%;
  display: flex;
  align-items: center;
}
.m-account > .btnTxt {
  font-size: 12px;
  /* margin-right: 10px; */
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}
.page-content-chain .tradeModel-exchange .title-block {
  height: 36px !important;
  line-height: 36px !important;
}
.page-content-chain .tradeModel-exchange .title-block .tab {
  position: relative;
  height: 36px !important;
  color: var(--color-text-secondary);
}
.page-content-chain .tradeModel-exchange .title-block .tab::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
}
.trade-box.trade-box-ex-container .trade-form .top-mag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  line-height: 26px;
  font-weight: 500;
}
.trade-box.trade-box-ex-container .trade-form .top-mag.avbl .coinNum {
  margin-left: auto;
}
/deep/.m-confirmDialog {
  border-radius: 2px;
}
.m-btnGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px;
  padding-bottom: 44px;
}
.m-btnGroup > .btn {
  width: 202px;
  height: 50px;
  line-height: 50px;
  border: 1px solid var(--color-BTN-secondary-border);
  border-radius: 100px;
  font-weight: 600;
  font-size: 20px;
  color: var(--color-1);
  text-align: center;
  cursor: pointer;
}
.m-btnGroup > .btn.active {
  background: var(--mainColor);
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  border: 1px solid var(--mainColor);
}
.m-btnGroup > .btn.confirmLoading {
  cursor: wait;
}

.m-account > .btnTxt {
  color: var(--mainColor);
}
.m-account > .coinNum {
  color: var(--color-1);
  font-size: 12px;
}
</style>

<!--blueswap 样式修改-->
<style scoped lang="stylus">

.trade-content .transaction {
  height auto;
}
.trade-form {
  display: flex;

  .trade-block {
    flex auto;
    width 50%
  }
}
.tag_go {
  display flex;
  padding 0;
  justify-content space-between;
  background var(--trade-color-1)
  border-bottom: 1px solid var(--color-Input-border);

  div.tag_left, div.tag_right {
    display flex;
    align-items center
  }

  div.tag_left div {
    position: relative;
    line-height: 40px;
    text-align: center;
    height: 40px;
    margin-left: 20px;
    cursor: pointer;
    box-sizing border-box
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
    }

    &.tag_actived {
      color: var(--color-1);
      &::after {
        background: linear-gradient(0, var(--color-1) 0%, var(--color-1) 100%) center bottom;
        background-size: calc(100% - 8px) 100%;
        background-repeat: no-repeat;
      }
    }
    &:hover {
      color: var(--color-1);
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

.page-content-chain .tradeModel-exchange .title-block {
  display flex
  justify-content space-between


  & .title-block_right {
    display flex
    align-items center
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    user-select none;
    color var(--color-1);
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
    background-color var(--color-Input-border)
  }
}

  .t1 {
    color #528EFF
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }

    .m-percent {
      height 14px;
      font-size 14px;
      text-align right;
      color #FFFFFF;
    }
</style>
<style scoped>
/deep/.trade-input.trade-input-china-container .input-item {
  justify-content: space-between;
  background: var(--trade-color-2);
  /* border-width: 0; */
}
.trade-box.trade-box-ex-container .trade-form .top-mag.avbl,
.trade-form > .trade-block > .form-block /deep/.trade-input,
.trade-form > .trade-block > .form-block /deep/.select-price,
.m-percent,
.volume-trade {
  margin-bottom: 12px;
}
/deep/.rangeBox {
  margin: 0 10px 28px;
}

.trade-box {
  background: var(--trade-color-1);
  border-radius: 8px;
}
/deep/.trade-input.trade-input-china-container .input-item .units,
/deep/.trade-input.trade-input-china-container .input-item .inputs {
  color: var(--color-1);
}
</style>
