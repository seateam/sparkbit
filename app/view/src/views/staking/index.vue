<template>
  <div class="m-page">
    <div class="stakingBox">
      <div class="top_box">
        <div class="top">
          <div class="top_1">
            <span>Staking - Ethereum (ETH) 2.0</span>
            <span>Passive earnings. Yesterday's APR: 4.73%</span>
            <div>
              <span class="active" @click="linkTo('/freeStaking')">Stake Now</span>
              <span>Redeem</span>
              <span>Wrap BETH</span>
            </div>
          </div>
          <div class="top_2">
            <div>
              <div class="category">
                <div>Cumulative Yield</div>
                <div>Last Day Yield</div>
              </div>
              <div class="value">
                <div>0.00000000 BETH</div>
                <div class="u-1-cl-b">0.00000000 BETH</div>
              </div>
            </div>
            <div>
              <div class="fun_1">
                <div>BETH Position</div>
                <div>Distribution Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btm_box">
        <div class="btm">
          <div class="btm_1">
            <div class="btm_1_head head">About ETH 2.0</div>
            <div class="btm_1_body">
              ETH 2.0 is a set of upgrades distributed into three phases. The goal is to make
              Ethereum more scalable, more secure, and more sustainable. An essential part of the
              upgrades is the introduction of staking, allowing users to stake their ETH, support
              the network, and earn rewards.
            </div>
          </div>
          <div class="btm_2">
            <div class="btm_2_head head">About ETH 2.0</div>
            <div class="btm_2_body">
              <div class="btm_2_body_left">
                <span>
                  <span class="num">1</span>
                  <span class="txt">Stake ETH</span>
                </span>
                <span class="splitLine"></span>
                <span>
                  <span class="num">2</span>
                  <span class="txt">Rewards Distribution</span>
                </span>
                <span class="splitLine"></span>
                <span>
                  <span class="num">3</span>
                  <span class="txt">Stake ETH</span>
                </span>
              </div>
              <div class="btm_2_body_right">
                <div>
                  Stake your ETH in one click and easily start generating yields, with token
                  quantity protection and slashing coverage. You will get BETH as the tokenized
                  representation of your staked ETH in a 1:1 ratio, allowing you to take advantage
                  of the liquidity as well as enjoying the rewards of ETH staking.
                </div>
                <div>
                  We regularly distribute on-chain rewards to all participants based on their BETH
                  position. The on-chain rewards will be distributed in the form of BETH to users'
                  Spot Accounts.
                </div>
                <div>
                  You may redeem BETH to ETH on a 1:1 basis and receive the amount equivalent to
                  your redeemed BETH balance in your Spot Wallet. Additionally, the BETH bought from
                  market and received from staking ETH will be treated equally. According to the
                  rate limit design of the Ethereum Network, only a limited quantity of ETH can be
                  redeemed daily. You should wait till the quota is refilled if you want to redeem
                  your BETH.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "staking",
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped lang="stylus">
.m-page {
  width 100%
  height 100%

  .stakingBox {
    display flex
    flex-direction column
    .top_box {
      background: #0C0E11;
    }
    & .top{
      width 1440px
      margin auto
      height 361px
      padding 59px 99px 0 155px
      display flex
      justify-content space-between
      box-sizing: border-box;


      .top_1 {
        display flex
        flex-direction column
        & > span:nth-child(1) {
          height: 75px;
          font-style: normal;
          font-weight: 700;
          font-size: 41.3415px;
          line-height: 75px;
          color: #FFFFFF;
        }

        & > span:nth-child(2) {
          font-style: normal;
          font-weight: 400;
          font-size: 27.561px;
          line-height: 39px;
          height: 39px;
          text-transform: capitalize;
          color: #FFFFFF;

        }

        & > div {
          margin-top 15.61px
          & > span {
            display inline-block
            width: 128.06px;
            height: 39.06px;
            border-radius: 7.35055px;
            line-height 39.06px
            text-align center
            font-style: normal;
            font-weight: 600;
            font-size: 12.0282px;
            background: linear-gradient(135.58deg, #474D57 3.16%, #474D57 101.3%);
            color: #FFFFFF;
            margin-right 15.61px
            cursor pointer
            &.active {
              background: #316AD5;

            }
          }
        }
      }


      .top_2 {
        width: 419px;
        height: 193px;
        background: rgba(217, 217, 217, 0.19);
        border-radius: 25px;
        padding 27px 41px 25px
        display flex
        flex-direction column
        justify-content space-between
        box-sizing border-box

        .category {
          display flex
          justify-content space-between
          height: 15px;
          font-style: normal;
          font-weight: 600;
          font-size: 12.0282px;
          line-height: 15px;
          /* identical to box height, or 122% */

          text-align: center;

          color: #B7BDC6;
          margin-bottom 9px
        }
        .value {
          display flex
          justify-content space-between
          font-style: normal;
          font-weight: 600;
          font-size: 17px;
          line-height: 15px;
          /* identical to box height, or 86% */
          text-align: center;
          color: #FFFFFF;
        }
        .u-1-cl-b {
          color: #5CEEA0;
        }
        .fun_1 {
          display flex
          justify-content space-between
          font-style: normal;
          font-weight: 600;
          font-size: 12.0282px;
          line-height: 15px;
          text-align: center;
          color: #528EFF;
          height: 15px;
          cursor pointer
        }
      }


    }

    .btm {
      padding 87px 61px 0 125px
      font-style: normal;
      width 1440px
      margin auto
      box-sizing border-box
      .head {
        margin-bottom 33px
        font-weight: 600;
        font-size: 23px;
        line-height: 26px;
        color: #FFFFFF;
      }
      .btm_1_body {
        width: 1174px;
        font-weight: 600;
        font-size: 19px;
        line-height: 26px;
        color: #B7BDC6;
      }
      .btm_2 {
        margin-top 96px
        .btm_2_body {
          display flex
          justify-content space-between
          .btm_2_body_left {
            display: flex;
            flex-direction: column;
            //justify-content: space-between;
            span {
              display: flex;
              align-items: center;
              span.num {
                display: inline-block;
                width: 76.49px;
                border-radius: 50%;
                font-style: normal;
                font-weight: 600;
                font-size: 42.4924px;
                line-height: 76.49px;
                text-align: center;

                /* 主色 */
                color: #316AD5;
                height: 76.49px;

                /* 方框底色 */
                background: rgba(49, 106, 213, 0.31);
              }

              span.txt {
                white-space nowrap
                font-style: normal;
                font-weight: 600;
                font-size: 23px;
                line-height: 26px;
                /* or 113% */

                text-align: center;

                color: #FFFFFF;
                margin-left 41px
              }

            }
            span.splitLine {
              height: 158px;
              width: 1px;
              box-sizing: border-box;
              margin: 41px 38px 41px;
              background #B8BDC5;
            }

          }
          .btm_2_body_right {
            font-style: normal;
            font-weight: 600;
            font-size: 19px;
            line-height: 26px;
            /* or 137% */
            color: #B7BDC6;
            width: 797px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top 14px
            & > div {
              height 320px
            }
          }

        }

      }
    }
  }
}
</style>
