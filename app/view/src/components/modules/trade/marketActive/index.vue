<template>
  <div class="marketActiveBox">
    <div class="head">
      <div>Market Activities</div>
    </div>
    <div class="body">
      <div class="table_box" v-for="(item, index) in activeMarket" :key="item.time + index">
        <div>
          <span>
            <span class="symbol">{{ item.coin.symbol }}</span>
            /
            <span class="unit">{{ item.coin.unit }}</span>
          </span>
          <span class="time">{{ item.time }}</span>
        </div>
        <div>
          <span class="rose" :class="[item.class]">{{ item.rose }}</span>
          <span class="status">{{ item.status }}</span>
        </div>
        <div class="trend">
          <span v-if="item.trend === 0">
            <svg
              width="55"
              height="37"
              viewBox="0 0 55 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_304_31579)">
                <path
                  d="M31.3066 20.0703H33.5566L30.1816 23.4453L26.8066 20.0703H29.3446V17.1318C29.3446 16.1373 28.4638 15.3296 27.3759 15.3296C26.2891 15.3296 25.4071 16.1373 25.4071 17.1318V24.5703H23.4316V17.1318C23.4316 15.0303 25.1968 13.3203 27.3691 13.3203C29.5426 13.3203 31.3066 15.0314 31.3066 17.1318V20.0703Z"
                  fill="#FF5F5F"
                />
              </g>
              <rect
                x="0.931641"
                y="6.94531"
                width="54"
                height="24"
                rx="4"
                fill="#FF5F5F"
                fill-opacity="0.15"
              />
              <defs>
                <clipPath id="clip0_304_31579">
                  <rect
                    width="36"
                    height="36"
                    fill="white"
                    transform="translate(9.93164 0.945312)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span v-else>
            <svg
              width="55"
              height="37"
              viewBox="0 0 55 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_304_31593)">
                <path
                  d="M31.3066 19.5703H33.5566L30.1816 16.1953L26.8066 19.5703H29.3446V20.2588C29.3446 21.2533 28.4638 22.0611 27.3759 22.0611C26.2891 22.0611 25.4071 21.2533 25.4071 20.2588V12.8203H23.4316V20.2588C23.4316 22.3603 25.1968 24.0703 27.3691 24.0703C29.5426 24.0703 31.3066 22.3592 31.3066 20.2588V19.5703Z"
                  fill="#5CEEA0"
                />
              </g>
              <rect
                x="0.931641"
                y="6.44531"
                width="54"
                height="24"
                rx="4"
                fill="#5CEEA0"
                fill-opacity="0.15"
              />
              <defs>
                <clipPath id="clip0_304_31593">
                  <rect
                    width="36"
                    height="36"
                    fill="white"
                    transform="translate(9.93164 0.445312)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMarket: [
        {
          coin: {
            symbol: "MBL",
            unit: "USDT",
          },
          rose: "-456",
          time: "18:00:00",
          status: "Pullback",
          class: "u-4-cl",
          trend: 0,
        },
        {
          coin: {
            symbol: "MBL",
            unit: "USDT",
          },
          rose: "-456",
          time: "18:00:00",
          status: "Pullback",
          class: "u-1-cl",
          trend: 1,
        },
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
.marketActiveBox {
  height: calc(100% - 25px);
  width: 100%;
  display flex
  flex-direction column
  padding 10px 16px
  box-sizing border-box
  .head {
    height 20px
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;
    color: #EAECEF;
    padding-bottom 5px
  }
  .body {

    .table_box {
      height 40px
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      display flex
      justify-content space-between
      align-items center
      padding
      & > div {
        height 40px
        display flex
        justify-content space-around

        flex-direction column
        span {
          .symbol {
            color: #EAECEF;
          }
          .unit {
            color: #848E9C;
          }
          &.status {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #EAECEF;
          }
        }
      }
      .trend {
        width: 54px;
        border-radius: 4px;
        cursor pointer
      }
    }

  }
}
</style>
