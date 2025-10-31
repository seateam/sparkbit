<template>
  <div class="m-tradeForm">
    <!--<div class="dragLine">-->
    <!--  <div>22%</div>-->
    <!--  <div class="progress"></div>-->
    <!--  <div>78%</div>-->
    <!--</div>-->
    <div class="m-coinSelect">
      <div class="name">{{ currentSymbol }}</div>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.244616 0.236323C0.401307 0.0849883 0.613597 0 0.834923 0C1.05625 0 1.26854 0.0849883 1.42523 0.236323L5.01409 3.7099L8.60295 0.236323C8.76194 0.0968461 8.97025 0.0219062 9.18474 0.027019C9.39923 0.0321319 9.60348 0.116906 9.75519 0.263789C9.9069 0.410673 9.99446 0.608416 9.99975 0.816077C10.005 1.02374 9.92762 1.22541 9.78356 1.37935L5.01409 6L0.244616 1.38036C0.0879856 1.22862 0 1.02287 0 0.808341C0 0.593814 0.0879856 0.388066 0.244616 0.236323Z"
          fill="#87909F"
        />
      </svg>
      <div class="option">
        <div class="item" v-for="item in coinList" @click="switchSymbol(item)">{{ item.name }}</div>
      </div>
    </div>
    <div class="form">
      <div class="m-formItem">
        <div class="title">
          <span>Time</span>
          <!--<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--  <path d="M8.57566 11.9695V13.532C8.57566 13.6231 8.54684 13.698 8.48921 13.7566C8.43157 13.8152 8.35793 13.8445 8.26828 13.8445H6.73135C6.64169 13.8445 6.56805 13.8152 6.51042 13.7566C6.45278 13.698 6.42396 13.6231 6.42396 13.532V11.9695C6.42396 11.8783 6.45278 11.8035 6.51042 11.7449C6.56805 11.6863 6.64169 11.657 6.73135 11.657H8.26828C8.35793 11.657 8.43157 11.6863 8.48921 11.7449C8.54684 11.8035 8.57566 11.8783 8.57566 11.9695ZM11.0347 7.12573C11.0347 7.45125 10.9867 7.74422 10.8907 8.00464C10.7946 8.26506 10.6489 8.48967 10.4536 8.67847C10.2583 8.86727 10.0918 9.0105 9.95409 9.10815C9.81641 9.20581 9.6259 9.323 9.38255 9.45972C9.17762 9.5769 9.02874 9.66805 8.93588 9.73315C8.84302 9.79826 8.75977 9.87638 8.68613 9.96753C8.61248 10.0587 8.57566 10.1531 8.57566 10.2507V10.5632C8.57566 10.6544 8.54684 10.7292 8.48921 10.7878C8.43157 10.8464 8.35793 10.8757 8.26828 10.8757H6.73135C6.64169 10.8757 6.56805 10.8464 6.51042 10.7878C6.45278 10.7292 6.42396 10.6544 6.42396 10.5632V9.89917C6.42396 9.67131 6.45758 9.46134 6.52482 9.26929C6.59206 9.07723 6.66891 8.92261 6.75536 8.80542C6.84181 8.68823 6.96669 8.57267 7.12999 8.45874C7.29329 8.34481 7.42457 8.2618 7.52383 8.20972C7.62309 8.15763 7.76557 8.08927 7.95128 8.00464C8.29069 7.84188 8.53083 7.7019 8.67172 7.58472C8.8126 7.46753 8.88305 7.30802 8.88305 7.1062C8.88305 6.83276 8.74376 6.60002 8.46519 6.40796C8.18663 6.2159 7.88084 6.11987 7.54784 6.11987C7.18922 6.11987 6.88504 6.20776 6.63529 6.38354C6.44958 6.51375 6.19342 6.78394 5.86683 7.19409C5.80919 7.27222 5.72914 7.31128 5.62668 7.31128C5.55624 7.31128 5.4954 7.29175 5.44417 7.25269L4.40674 6.4519C4.34271 6.40633 4.30428 6.34123 4.29148 6.25659C4.27867 6.17196 4.29468 6.09709 4.3395 6.03198C5.12078 4.78198 6.23825 4.15698 7.69193 4.15698C8.51803 4.15698 9.28169 4.44832 9.98291 5.03101C10.6841 5.61369 11.0347 6.31193 11.0347 7.12573ZM9.88685 3.24878C9.88685 3.24878 9.69714 3.16577 9.31771 2.99976C8.93828 2.83374 8.33231 2.75073 7.49981 2.75073C6.66731 2.75073 5.87163 2.91675 5.11277 3.24878C4.35391 3.58081 3.70072 4.02515 3.15319 4.58179C2.60566 5.13843 2.16859 5.80249 1.842 6.57397C1.5154 7.34546 1.3521 8.15438 1.3521 9.00073C1.3521 9.84709 1.5154 10.656 1.842 11.4275C2.16859 12.199 2.60566 12.863 3.15319 13.4197C3.70072 13.9763 4.35391 14.4207 5.11277 14.7527C5.87163 15.0847 6.66731 15.2507 7.49981 15.2507C8.33231 15.2507 9.128 15.0847 9.88685 14.7527C10.6457 14.4207 11.2989 13.9763 11.8464 13.4197C12.394 12.863 12.831 12.199 13.1576 11.4275C13.4842 10.656 13.6475 9.84709 13.6475 9.00073C13.6475 8.15438 13.4842 7.34546 13.1576 6.57397C12.831 5.80249 12.394 5.13843 11.8464 4.58179C11.2989 4.02515 10.6457 3.58081 9.88685 3.24878ZM13.8877 5.23608C13.8877 5.23608 14.0526 5.52336 14.3824 6.0979C14.7122 6.67244 14.8771 7.64006 14.8771 9.00073C14.8771 10.3614 14.5473 11.6163 13.8877 12.7654C13.2281 13.9145 12.3331 14.8243 11.2028 15.4949C10.0726 16.1654 8.83822 16.5007 7.49981 16.5007C6.1614 16.5007 4.92706 16.1654 3.79678 15.4949C2.66649 14.8243 1.77155 13.9145 1.11196 12.7654C0.452358 11.6163 0.122559 10.3614 0.122559 9.00073C0.122559 7.64006 0.452358 6.38517 1.11196 5.23608C1.77155 4.087 2.66649 3.17717 3.79678 2.50659C4.92706 1.83602 6.1614 1.50073 7.49981 1.50073C8.83822 1.50073 10.0726 1.83602 11.2028 2.50659C12.3331 3.17717 13.2281 4.087 13.8877 5.23608Z" fill="#989898"/>-->
          <!--</svg>-->
        </div>
        <div class="val">{{ curCoinInfo ? curCoinInfo.optionDuration : "" }}</div>
        <div class="wrap">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5606 5.00469V8.7557C8.5606 8.83384 8.53548 8.89804 8.48524 8.94827C8.43501 8.99851 8.37082 9.02363 8.29267 9.02363H5.61338C5.53524 9.02363 5.47105 8.99851 5.42081 8.94827C5.37057 8.89804 5.34545 8.83384 5.34545 8.7557V8.21984C5.34545 8.14169 5.37057 8.0775 5.42081 8.02727C5.47105 7.97703 5.53524 7.95191 5.61338 7.95191H7.48888V5.00469C7.48888 4.92655 7.514 4.86236 7.56424 4.81212C7.61448 4.76188 7.67867 4.73677 7.75681 4.73677H8.29267C8.37082 4.73677 8.43501 4.76188 8.48524 4.81212C8.53548 4.86236 8.5606 4.92655 8.5606 5.00469ZM11.4325 10.2377C11.4325 10.2377 11.5343 10.0632 11.7381 9.71438C11.9418 9.36551 12.0437 8.77803 12.0437 7.95191C12.0437 7.1258 11.8399 6.36388 11.4325 5.66614C11.025 4.96841 10.4724 4.41581 9.77465 4.00834C9.07692 3.60086 8.315 3.39712 7.48888 3.39712C6.66277 3.39712 5.90085 3.60086 5.20312 4.00834C4.50539 4.41581 3.95278 4.96841 3.54531 5.66614C3.13783 6.36388 2.9341 7.1258 2.9341 7.95191C2.9341 8.77803 3.13783 9.53995 3.54531 10.2377C3.95278 10.9354 4.50539 11.488 5.20312 11.8955C5.90085 12.303 6.66277 12.5067 7.48888 12.5067C8.315 12.5067 9.07692 12.303 9.77465 11.8955C10.4724 11.488 11.025 10.9354 11.4325 10.2377ZM13.0568 4.72421C13.0568 4.72421 13.2005 4.97051 13.488 5.4631C13.7754 5.9557 13.9192 6.78531 13.9192 7.95191C13.9192 9.11852 13.6317 10.1944 13.0568 11.1796C12.4818 12.1648 11.7018 12.9449 10.7166 13.5198C9.73139 14.0947 8.65549 14.3822 7.48888 14.3822C6.32228 14.3822 5.24638 14.0947 4.26118 13.5198C3.27598 12.9449 2.49592 12.1648 1.92099 11.1796C1.34606 10.1944 1.05859 9.11852 1.05859 7.95191C1.05859 6.78531 1.34606 5.7094 1.92099 4.72421C2.49592 3.73901 3.27598 2.95895 4.26118 2.38402C5.24638 1.80909 6.32228 1.52162 7.48888 1.52162C8.65549 1.52162 9.73139 1.80909 10.7166 2.38402C11.7018 2.95895 12.4818 3.73901 13.0568 4.72421Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div class="m-formItem">
        <div class="title">
          <span>Amount</span>
          <!--<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--  <path d="M8.57566 11.9695V13.532C8.57566 13.6231 8.54684 13.698 8.48921 13.7566C8.43157 13.8152 8.35793 13.8445 8.26828 13.8445H6.73135C6.64169 13.8445 6.56805 13.8152 6.51042 13.7566C6.45278 13.698 6.42396 13.6231 6.42396 13.532V11.9695C6.42396 11.8783 6.45278 11.8035 6.51042 11.7449C6.56805 11.6863 6.64169 11.657 6.73135 11.657H8.26828C8.35793 11.657 8.43157 11.6863 8.48921 11.7449C8.54684 11.8035 8.57566 11.8783 8.57566 11.9695ZM11.0347 7.12573C11.0347 7.45125 10.9867 7.74422 10.8907 8.00464C10.7946 8.26506 10.6489 8.48967 10.4536 8.67847C10.2583 8.86727 10.0918 9.0105 9.95409 9.10815C9.81641 9.20581 9.6259 9.323 9.38255 9.45972C9.17762 9.5769 9.02874 9.66805 8.93588 9.73315C8.84302 9.79826 8.75977 9.87638 8.68613 9.96753C8.61248 10.0587 8.57566 10.1531 8.57566 10.2507V10.5632C8.57566 10.6544 8.54684 10.7292 8.48921 10.7878C8.43157 10.8464 8.35793 10.8757 8.26828 10.8757H6.73135C6.64169 10.8757 6.56805 10.8464 6.51042 10.7878C6.45278 10.7292 6.42396 10.6544 6.42396 10.5632V9.89917C6.42396 9.67131 6.45758 9.46134 6.52482 9.26929C6.59206 9.07723 6.66891 8.92261 6.75536 8.80542C6.84181 8.68823 6.96669 8.57267 7.12999 8.45874C7.29329 8.34481 7.42457 8.2618 7.52383 8.20972C7.62309 8.15763 7.76557 8.08927 7.95128 8.00464C8.29069 7.84188 8.53083 7.7019 8.67172 7.58472C8.8126 7.46753 8.88305 7.30802 8.88305 7.1062C8.88305 6.83276 8.74376 6.60002 8.46519 6.40796C8.18663 6.2159 7.88084 6.11987 7.54784 6.11987C7.18922 6.11987 6.88504 6.20776 6.63529 6.38354C6.44958 6.51375 6.19342 6.78394 5.86683 7.19409C5.80919 7.27222 5.72914 7.31128 5.62668 7.31128C5.55624 7.31128 5.4954 7.29175 5.44417 7.25269L4.40674 6.4519C4.34271 6.40633 4.30428 6.34123 4.29148 6.25659C4.27867 6.17196 4.29468 6.09709 4.3395 6.03198C5.12078 4.78198 6.23825 4.15698 7.69193 4.15698C8.51803 4.15698 9.28169 4.44832 9.98291 5.03101C10.6841 5.61369 11.0347 6.31193 11.0347 7.12573ZM9.88685 3.24878C9.88685 3.24878 9.69714 3.16577 9.31771 2.99976C8.93828 2.83374 8.33231 2.75073 7.49981 2.75073C6.66731 2.75073 5.87163 2.91675 5.11277 3.24878C4.35391 3.58081 3.70072 4.02515 3.15319 4.58179C2.60566 5.13843 2.16859 5.80249 1.842 6.57397C1.5154 7.34546 1.3521 8.15438 1.3521 9.00073C1.3521 9.84709 1.5154 10.656 1.842 11.4275C2.16859 12.199 2.60566 12.863 3.15319 13.4197C3.70072 13.9763 4.35391 14.4207 5.11277 14.7527C5.87163 15.0847 6.66731 15.2507 7.49981 15.2507C8.33231 15.2507 9.128 15.0847 9.88685 14.7527C10.6457 14.4207 11.2989 13.9763 11.8464 13.4197C12.394 12.863 12.831 12.199 13.1576 11.4275C13.4842 10.656 13.6475 9.84709 13.6475 9.00073C13.6475 8.15438 13.4842 7.34546 13.1576 6.57397C12.831 5.80249 12.394 5.13843 11.8464 4.58179C11.2989 4.02515 10.6457 3.58081 9.88685 3.24878ZM13.8877 5.23608C13.8877 5.23608 14.0526 5.52336 14.3824 6.0979C14.7122 6.67244 14.8771 7.64006 14.8771 9.00073C14.8771 10.3614 14.5473 11.6163 13.8877 12.7654C13.2281 13.9145 12.3331 14.8243 11.2028 15.4949C10.0726 16.1654 8.83822 16.5007 7.49981 16.5007C6.1614 16.5007 4.92706 16.1654 3.79678 15.4949C2.66649 14.8243 1.77155 13.9145 1.11196 12.7654C0.452358 11.6163 0.122559 10.3614 0.122559 9.00073C0.122559 7.64006 0.452358 6.38517 1.11196 5.23608C1.77155 4.087 2.66649 3.17717 3.79678 2.50659C4.92706 1.83602 6.1614 1.50073 7.49981 1.50073C8.83822 1.50073 10.0726 1.83602 11.2028 2.50659C12.3331 3.17717 13.2281 4.087 13.8877 5.23608Z" fill="#989898"/>-->
          <!--</svg>-->
        </div>
        <div class="val" v-if="showInput">
          <input v-model="amount" type="number" @blur="changeInputShow(false)" />
        </div>
        <div class="val" v-if="!showInput" @click="changeInputShow(true)">{{ amount }}</div>
        <div class="wrap">
          <div class="btn" @click="addSub('sub')">-</div>
          <div class="btn border">$</div>
          <div class="btn" @click="addSub('add')">+</div>
        </div>
        <!--键盘-->
        <div class="m-keyboard" @mouseleave="mouseleaveFn">
          <div class="left">
            <div class="item" v-for="item in priceList" @click="changeInput(item)">{{ item }}</div>
          </div>
          <!--<div class="middle">-->
          <!--  <div class="item">$10</div>-->
          <!--</div>-->
          <div class="right">
            <div class="item" v-for="item in keyList" @click="joinStr(item)">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="m-info">
        <div class="txt">Payout</div>
        <!--<div class="txt2" v-if="curCoinInfo">+{{ curCoinInfo.rewardRatio * 100 }}<span style="font-size: 14px">%</span></div>-->
        <div class="txt3">{{ amount }}</div>
        <div class="txt">Profit</div>
        <div class="txt3" v-if="curCoinInfo">+{{ calTotal }}</div>
        <!--<div class="icon2">-->
        <!--  <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--    <path d="M8.57591 12.4685V14.031C8.57591 14.1222 8.54709 14.197 8.48945 14.2556C8.43182 14.3142 8.35817 14.3435 8.26852 14.3435H6.73159C6.64194 14.3435 6.56829 14.3142 6.51066 14.2556C6.45302 14.197 6.42421 14.1222 6.42421 14.031V12.4685C6.42421 12.3774 6.45302 12.3025 6.51066 12.2439C6.56829 12.1853 6.64194 12.156 6.73159 12.156H8.26852C8.35817 12.156 8.43182 12.1853 8.48945 12.2439C8.54709 12.3025 8.57591 12.3774 8.57591 12.4685ZM11.035 7.62476C11.035 7.95028 10.987 8.24325 10.8909 8.50366C10.7948 8.76408 10.6492 8.98869 10.4538 9.17749C10.2585 9.36629 10.092 9.50952 9.95434 9.60718C9.81666 9.70483 9.62614 9.82202 9.38279 9.95874C9.17787 10.0759 9.02898 10.1671 8.93612 10.2322C8.84327 10.2973 8.76002 10.3754 8.68637 10.4666C8.61273 10.5577 8.57591 10.6521 8.57591 10.7498V11.0623C8.57591 11.1534 8.54709 11.2283 8.48945 11.2869C8.43182 11.3455 8.35817 11.3748 8.26852 11.3748H6.73159C6.64194 11.3748 6.56829 11.3455 6.51066 11.2869C6.45302 11.2283 6.42421 11.1534 6.42421 11.0623V10.3982C6.42421 10.1703 6.45783 9.96037 6.52507 9.76831C6.59231 9.57625 6.66915 9.42163 6.75561 9.30444C6.84206 9.18726 6.96693 9.0717 7.13023 8.95776C7.29353 8.84383 7.42481 8.76082 7.52407 8.70874C7.62333 8.65666 7.76582 8.5883 7.95153 8.50366C8.29093 8.3409 8.53108 8.20093 8.67196 8.08374C8.81285 7.96655 8.88329 7.80705 8.88329 7.60522C8.88329 7.33179 8.74401 7.09904 8.46544 6.90698C8.18687 6.71492 7.88109 6.6189 7.54809 6.6189C7.18947 6.6189 6.88529 6.70679 6.63553 6.88257C6.44982 7.01278 6.19367 7.28296 5.86707 7.69312C5.80944 7.77124 5.72939 7.8103 5.62693 7.8103C5.55648 7.8103 5.49565 7.79077 5.44442 7.75171L4.40699 6.95093C4.34295 6.90535 4.30453 6.84025 4.29172 6.75562C4.27891 6.67098 4.29492 6.59611 4.33975 6.53101C5.12102 5.28101 6.23849 4.65601 7.69217 4.65601C8.51827 4.65601 9.28193 4.94735 9.98316 5.53003C10.6844 6.11271 11.035 6.81095 11.035 7.62476ZM9.8871 3.7478C9.8871 3.7478 9.69738 3.66479 9.31795 3.49878C8.93852 3.33276 8.33256 3.24976 7.50006 3.24976C6.66755 3.24976 5.87187 3.41577 5.11302 3.7478C4.35416 4.07983 3.70096 4.52417 3.15343 5.08081C2.6059 5.63745 2.16884 6.30151 1.84224 7.073C1.51564 7.84448 1.35234 8.6534 1.35234 9.49976C1.35234 10.3461 1.51564 11.155 1.84224 11.9265C2.16884 12.698 2.6059 13.3621 3.15343 13.9187C3.70096 14.4753 4.35416 14.9197 5.11302 15.2517C5.87187 15.5837 6.66755 15.7498 7.50006 15.7498C8.33256 15.7498 9.12824 15.5837 9.8871 15.2517C10.646 14.9197 11.2991 14.4753 11.8467 13.9187C12.3942 13.3621 12.8313 12.698 13.1579 11.9265C13.4845 11.155 13.6478 10.3461 13.6478 9.49976C13.6478 8.6534 13.4845 7.84448 13.1579 7.073C12.8313 6.30151 12.3942 5.63745 11.8467 5.08081C11.2991 4.52417 10.646 4.07983 9.8871 3.7478ZM13.8879 5.73511C13.8879 5.73511 14.0528 6.02238 14.3826 6.59692C14.7124 7.17147 14.8773 8.13908 14.8773 9.49976C14.8773 10.8604 14.5475 12.1153 13.8879 13.2644C13.2283 14.4135 12.3334 15.3233 11.2031 15.9939C10.0728 16.6645 8.83846 16.9998 7.50006 16.9998C6.16165 16.9998 4.9273 16.6645 3.79702 15.9939C2.66674 15.3233 1.7718 14.4135 1.1122 13.2644C0.452602 12.1153 0.122803 10.8604 0.122803 9.49976C0.122803 8.13908 0.452602 6.8842 1.1122 5.73511C1.7718 4.58602 2.66674 3.67619 3.79702 3.00562C4.9273 2.33504 6.16165 1.99976 7.50006 1.99976C8.83846 1.99976 10.0728 2.33504 11.2031 3.00562C12.3334 3.67619 13.2283 4.58602 13.8879 5.73511Z" fill="#989898"/>-->
        <!--  </svg>-->
        <!--</div>-->
      </div>
      <div class="m-btn s-green" @click="showDialog(1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="71"
          height="61"
          viewBox="0 0 71 61"
          fill="none"
        >
          <g clip-path="url(#clip0_2873_27122)">
            <path
              d="M0.00146484 49.8511V65.4901H7.02277V45.0432L5.91607 43.9365L0.00146484 49.8511ZM10.2794 65.4901H21.2779V54.1611C20.5511 54.4951 19.7608 54.6683 18.9609 54.6686C18.2273 54.6706 17.5005 54.5271 16.8228 54.2463C16.145 53.9656 15.5297 53.5531 15.0125 53.0329L10.2794 48.3006V65.4901ZM35.5342 65.4901V40.4426L24.5356 51.4412V65.4901H35.5342ZM49.7893 65.4901V26.1864L38.7908 37.1849V65.4901H49.7893ZM0.00146484 34.0724V44.9503L5.91607 39.0357L17.4629 50.5825C17.6595 50.7792 17.893 50.9352 18.1499 51.0416C18.4068 51.148 18.6822 51.2028 18.9603 51.2028C19.2384 51.2028 19.5138 51.148 19.7707 51.0416C20.0277 50.9352 20.2611 50.7792 20.4577 50.5825L21.7008 49.3394C21.7646 49.2885 21.8317 49.2432 21.8911 49.1841L50.4616 20.6132L54.9244 25.0758C55.8978 26.0494 57.5613 25.3601 57.5613 23.9839V9.61991C57.5613 9.21022 57.3985 8.81732 57.1089 8.52763C56.8192 8.23794 56.4263 8.0752 56.0166 8.0752H41.6525C40.2764 8.0752 39.5871 9.73869 40.5607 10.712L45.0232 15.1749L18.9785 41.2196L7.41404 29.6549C7.01684 29.2578 6.47816 29.0347 5.91648 29.0347C5.3548 29.0347 4.81612 29.2578 4.41893 29.6549L0.00146484 34.0724Z"
              fill="#206E23"
              fill-opacity="0.8"
            />
          </g>
          <defs>
            <clipPath id="clip0_2873_27122">
              <rect
                width="70.3891"
                height="70.3891"
                fill="white"
                transform="translate(0 -4.90186)"
              />
            </clipPath>
          </defs>
        </svg>
        <div>Call Option</div>
      </div>
      <div class="m-btn s-red" @click="showDialog(2)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="71"
          height="61"
          viewBox="0 0 71 61"
          fill="none"
        >
          <g clip-path="url(#clip0_2873_27132)">
            <path
              d="M6.79468 31.9573V65.4872H0.000488281V25.1631L6.79468 31.9573ZM10.0521 65.4872H21.0507V46.2127L10.0521 35.2147V65.4872ZM35.3061 65.4872V43.0713L30.5722 47.8045C30.0551 48.3248 29.44 48.7373 28.7624 49.018C28.0847 49.2988 27.3581 49.4423 26.6246 49.4402C25.8107 49.4402 25.026 49.2614 24.3075 48.9326V65.4872H35.3061ZM38.5635 65.4872H49.5621V49.4971H41.4244C40.3741 49.4971 39.3845 49.1682 38.5635 48.5961V65.4872ZM0.000488281 9.3833V20.2623L23.6936 43.9556C23.7529 44.0147 23.82 44.0601 23.8838 44.111L25.1269 45.354C25.3235 45.5507 25.557 45.7067 25.8139 45.8132C26.0708 45.9196 26.3462 45.9744 26.6243 45.9744C26.9024 45.9744 27.1778 45.9196 27.4347 45.8132C27.6917 45.7067 27.9251 45.5507 28.1217 45.354L39.6686 33.8072L44.7943 38.933L40.3318 43.3955C39.359 44.3683 40.0475 46.0323 41.4236 46.0323H55.7877C56.1973 46.0323 56.5902 45.8696 56.8799 45.5799C57.1696 45.2902 57.3324 44.8973 57.3324 44.4876V30.1231C57.3332 28.7474 55.6697 28.0584 54.6964 29.0309L50.2335 33.4938L41.1665 24.4265C40.7693 24.0293 40.2307 23.8062 39.669 23.8062C39.1073 23.8062 38.5686 24.0293 38.1714 24.4265L35.7273 26.8709L26.6078 35.9912L0.000488281 9.3833Z"
              fill="#A72012"
              fill-opacity="0.8"
            />
          </g>
          <defs>
            <clipPath id="clip0_2873_27132">
              <rect
                width="70.3891"
                height="70.3891"
                fill="white"
                transform="translate(0 -4.90186)"
              />
            </clipPath>
          </defs>
        </svg>
        <div>Put Option</div>
      </div>
      <div class="m-info2" style="margin-top: 15px">
        <div class="txt1">Balance</div>
        <div class="txt2">{{ normalBalance }} OUDT</div>
      </div>
      <div class="m-info2">
        <div class="txt1">Frozen</div>
        <div class="txt2">{{ lockedBalance }} OUDT</div>
      </div>
      <div class="m-info2">
        <div class="txt1">Turnover</div>
        <div class="txt2">{{ flow || "--" }} OUDT</div>
      </div>
      <div class="m-TranBtn" @click="showTransferFn(true)">Transfer</div>
      <div
        class="m-TranBtn"
        style="margin-top: 10px; background: #1058de"
        @click="navTo('/transferRecord')"
      >
        OUDT Transfer Record
      </div>
      <div class="m-info2" style="margin-top: 10px">
        <div class="txt1">HashRate</div>
        <div class="txt2">{{ hashRate }}</div>
      </div>
    </div>

    <!--划转-->
    <exchange-transfer :isShow="showTransfer" :close="closeFn"></exchange-transfer>

    <c-dialog
      titleText="Option Confirming"
      class="m-confirm"
      @close="handlerClose"
      @confirm="handlerConfirm"
      :showFlag="showFlag"
      :confirmLoading="confirmLoading"
      :haveOption="false"
    >
      <div class="m-infoBox">
        <div class="m-info2">
          <div class="left">Amount</div>
          <div class="right">{{ amount }}</div>
        </div>
        <div class="m-info2">
          <div class="left">Side</div>
          <div class="right s-green" v-if="side === 1">Call Option</div>
          <div class="right s-red" v-else>Put Option</div>
        </div>
        <div class="btnG">
          <div class="btn" @click="handlerClose">Cancel</div>
          <div class="btn active" @click="createOrder">confirm</div>
        </div>
      </div>
    </c-dialog>
  </div>
</template>

<script>
import { cutOut } from "@/utils/newUtils";
import exchangeTransfer from "./transfer/transfer.vue";

let timer = null;
export default {
  name: "tradeForm",
  components: {
    exchangeTransfer,
  },
  data() {
    return {
      keyList: [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "←"],
      priceList: [300, 250, 200, 150, 100, 10],
      amount: 0,
      normalBalance: 0,
      lockedBalance: 0,
      hashRate: 0,
      flow: 0,
      isAssets: false,
      currentSymbol: "-",
      side: "",
      coinList: [],
      showInput: 0,
      showTransfer: false,
      curCoinInfo: null,

      showFlag: false,
      confirmLoading: false,
      assetsInfo: {},
      precision: 4, // 精度
    };
  },
  created() {
    this.getCoinList();
    // 获取合约模块数据
    this.$store.dispatch("getFutorePublicInfo");
  },
  mounted() {
    this.$bus.$on("settleFinish", () => {
      this.getUserAssets();
    });
    timer = setInterval(() => {
      this.getUserAssets();
    }, 3000);
  },
  destroyed() {
    if (timer) {
      clearInterval(timer);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    opUrl() {
      return this.$store.state.systemConfig.opUrl;
    },
    calTotal() {
      const amount = +this.amount || 0;
      const curCoinInfo = this.curCoinInfo || {};
      const rewardRatio = curCoinInfo.rewardRatio || 0;
      return cutOut(amount + rewardRatio * amount, this.precision);
    },
    calEarning() {
      const curCoinInfo = this.curCoinInfo || {};
      return cutOut(curCoinInfo.rewardRatio * this.amount, this.precision);
    },
  },
  watch: {
    userInfo(val, oval) {
      if (val && val.id && !this.isAssets) {
        this.getUserAssets();
      }
    },
    currentSymbol(val) {
      this.$bus.$emit("SYMBOL_CURRENT", val);
    },
    curCoinInfo(val) {
      this.$bus.$emit("COIN_CHANGE", val);
    },
    amount(val, oval) {
      console.log(val, oval);
      if (val != oval) {
        this.amount = cutOut(val, this.precision);
      }
    },
  },
  methods: {
    handlerInput(e) {
      // this.amount = cutOut(e.target.value, this.precision);
    },
    navTo(path) {
      this.$router.push(path);
    },
    handlerConfirm() {},
    handlerClose() {
      this.showFlag = false;
    },
    showDialog(side) {
      if (!(this.userInfo && this.userInfo.id)) {
        this.$bus.$emit("tip", {
          text: "You haven't logged in yet",
          type: "error",
        });
        return;
      }
      if (this.amount <= 0) {
        this.$bus.$emit("tip", {
          text: "The amount must not be empty",
          type: "error",
        });
        return;
      }
      this.side = side;
      this.showFlag = true;
    },
    closeFn() {
      this.showTransfer = false;
      this.getUserAssets();
    },
    showTransferFn(type) {
      this.showTransfer = type;
    },
    // 用户资产
    async getUserAssets() {
      const uid = this.userInfo.id;
      const res = await this.axios({
        url: `${this.opUrl}/account/asset?uid=${uid}`,
        hostType: "def",
        method: "get",
      });
      if (res.code === "0") {
        const { locked, normal, hashRate, flow } = res.data;
        const { precision } = this;
        this.normalBalance = cutOut(normal, precision);
        this.lockedBalance = cutOut(locked, precision);
        this.hashRate = cutOut(hashRate, precision);
        this.flow = cutOut(flow, precision);
        this.assetsInfo = res.data;
        this.isAssets = true;
      }
    },
    // 创建订单
    async createOrder() {
      const uid = this.userInfo.id;
      const coinInfo = this.curCoinInfo;
      const { amount } = this;
      if (this.confirmLoading) {
        return;
      }
      if (amount > this.normalBalance) {
        this.$bus.$emit("tip", {
          text: "Exceeding Available Balance",
          type: "error",
        });
        this.handlerClose();
        return;
      }
      if (amount > coinInfo.maxAmount || amount < coinInfo.minAmount) {
        this.$bus.$emit("tip", {
          text: `Order size must be within the range of ${coinInfo.minAmount}-${coinInfo.maxAmount}.`,
          type: "error",
        });
        this.handlerClose();
        return;
      }

      const symbol = this.currentSymbol.replace("/", "").toLowerCase();
      this.confirmLoading = true;
      const res = await this.axios({
        url: `${this.opUrl}/order/create`,
        hostType: "def",
        method: "post",
        params: {
          amount,
          side: this.side,
          symbol,
          uid,
        },
      });
      this.amount = 0;
      this.confirmLoading = false;
      let type = "success";
      this.handlerClose();
      this.getUserAssets();
      if (res.code != 0) {
        type = "error";
      }
      this.$bus.$emit("tip", {
        text: res.msg,
        type,
      });
      this.$bus.$emit("orderCreate", {});
    },
    // 获取币种列表
    async getCoinList() {
      const res = await this.axios({
        url: `${this.opUrl}/symbol/list`,
        hostType: "def",
        method: "get",
      });
      if (res.code === "0") {
        const { data } = res;
        data.map((item) => {
          item.name = `${item.base}/${item.quote}`.toUpperCase();
          item.optionDuration = this.formatTime(item.optionDuration);
          return item;
        });
        if (data.length) {
          this.currentSymbol = data[0].name;
          this.curCoinInfo = data[0];
        }
        this.$bus.$emit("symbolList", data);
        this.coinList = data;
      }
    },
    //  切换币种
    switchSymbol(coin) {
      this.currentSymbol = coin.name;
      this.curCoinInfo = coin;
    },
    // 显示隐藏输入框
    changeInputShow(type) {
      this.showInput = type;
    },
    changeInput(num) {
      this.amount = num;
    },
    // 拼接数字
    joinStr(str) {
      let num = "";
      const amount = `${this.amount}`;
      if (str === "." && amount.includes(".")) {
        return;
      }
      if (amount != 0) {
        num = `${amount}${str}`;
      } else {
        num = str;
      }
      num = isNaN(num) ? 0 : num;
      this.amount = num;
    },
    // 移开键盘
    mouseleaveFn() {
      const num = parseFloat(this.amount);
      this.amount = isNaN(num) ? 0 : num;
    },
    // 数字加减
    addSub(type) {
      let { amount } = this;
      if (type === "sub") {
        amount--;
        this.amount = amount >= 0 ? amount : 0;
      } else {
        this.amount++;
      }
    },
    // 秒数换成hh:mm:ss
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      let formattedTime = "";
      if (hours < 10) {
        formattedTime += "0";
      }
      formattedTime += `${hours}:`;

      if (minutes < 10) {
        formattedTime += "0";
      }
      formattedTime += `${minutes}:`;

      if (remainingSeconds < 10) {
        formattedTime += "0";
      }
      formattedTime += remainingSeconds;

      return formattedTime;
    },
  },
};
</script>

<style scoped>
.m-tradeForm {
  width: 293px;
}
.m-tradeForm > .dragLine {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-1);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}
.m-tradeForm > .dragLine > .progress {
  width: 190px;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #a91c10 0%, #4bc247 100%);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1) inset;
  margin: 0 6px;
  box-sizing: border-box;
}
.m-formItem {
  width: 270px;
  height: 62px;
  border-radius: 4px;
  border: 1px solid rgba(68, 68, 68, 1);
  margin: 20px auto auto;
  position: relative;
}
.m-formItem > .title {
  width: 90px;
  color: #989898;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  background: var(--color-4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
}
.m-formItem > .title > span {
  padding-right: 10px;
}
.m-formItem > .val {
  color: var(--color-1);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  height: 30px;
  margin-top: 8px;
}
.m-formItem > .wrap {
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #444;
}
.m-formItem > .wrap > svg > path {
  fill: var(--color-1);
}

.m-formItem > .wrap > .btn {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.m-formItem > .wrap > .btn.border {
  border-left: 1px solid #444;
  border-right: 1px solid #444;
}
.m-info {
  border-radius: 4px;
  border: 1px dashed #444;
  background: var(--option-color-1);
  width: 273px;
  height: 110px;
  margin: 10px auto auto;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.m-info > .txt {
  color: #989898;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
}
.m-info > .txt2 {
  color: var(--color-1);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}
.m-info > .txt3 {
  color: var(--color-1);
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  margin-top: 1px;
  margin-bottom: 10px;
}
.m-info > .icon2 {
  position: absolute;
  right: 20px;
  top: 10px;
}
.m-btn {
  width: 273px;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  box-sizing: border-box;
  padding-right: 16px;
  margin: 15px auto auto;
  cursor: pointer;
  user-select: none;
}
.m-btn.s-green {
  background: #0bb875;
  color: #2e7924;
}
.m-btn.s-red {
  color: #b81900;
  background: #fd4661;
}
.m-info2 {
  width: 273px;
  height: 20px;
  line-height: 20px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-1);
}
.m-info2 > .txt1 {
  color: rgba(146, 146, 146, 1);
}
.m-TranBtn {
  width: 271px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 6px;
  background: #ff4761;
  margin: 20px auto auto;
  font-size: 13px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
}
.m-keyboard {
  width: 348px;
  height: 274px;
  border-radius: 4px;
  border: 1px solid #333;
  background: var(--option-color-1);
  position: absolute;
  left: -350px;
  top: 0;
  box-sizing: border-box;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  z-index: 9;
  display: none;
}
.m-formItem:hover .m-keyboard {
  display: flex;
}
.m-keyboard > .left > .item {
  display: flex;
  width: 118px;
  height: 32px;
  line-height: 34px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--color-1);
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  cursor: pointer;
}
.m-keyboard > .left > .item:last-child {
  margin-bottom: 0;
}
.m-keyboard > .left > .item > .it {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-keyboard > .left > .item > .it.border {
  border-left: 1px solid #444;
  border-right: 1px solid #444;
}
.m-keyboard > .middle {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  margin: 0 10px;
}
.m-keyboard > .middle > .item {
  width: 118px;
  height: 32px;
  line-height: 34px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid #444;
  cursor: pointer;
}
.m-keyboard > .right {
  width: 188px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.m-keyboard > .right > .item {
  width: 54px;
  height: 54px;
  text-align: center;
  line-height: 54px;
  border-radius: 4px;
  border: 1px solid #444;
  color: var(--color-1);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
}
.m-coinSelect {
  height: 46px;
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--option-color-1);
  color: var(--color-1);
  cursor: pointer;
  position: relative;
  margin: auto;
}
.m-coinSelect > .name {
  margin-right: 13px;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
}
.m-coinSelect > .option {
  width: 100%;
  left: 0;
  top: 46px;
  position: absolute;
  background: var(--option-color-1);
  z-index: 1;
  display: none;
}
.m-coinSelect:hover > .option {
  display: block;
}

.m-coinSelect > .option > .item {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.m-coinSelect > .option > .item:hover {
  color: var(--mainColor);
}
.m-formItem > .val > input {
  height: 100%;
  color: var(--color-1);
  text-align: center;
  font-size: 20px;
}
/deep/.m-confirm.common-dialog .dialog-frame-head {
  background-color: var(--color-20);
}
/deep/.m-confirm.common-dialog .dialog-frame.a-5-bg {
  background-color: var(--color-1);
}
.m-infoBox {
  width: 285px;
  margin: auto;
  padding-bottom: 30px;
}
.m-info2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-text-secondary);
  box-sizing: border-box;
  padding: 0 8px;
  margin-bottom: 16px;
}
.m-info2 > .right {
  color: var(--color-1);
}
.m-info2 > .right.s-green {
  color: #0bba74;
  font-weight: 700;
}
.m-info2 > .right.s-red {
  color: #ff4761;
  font-weight: 700;
}
.m-infoBox > .btnG {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}
.m-infoBox > .btnG > .btn {
  width: 132px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #1058de;
  cursor: pointer;
  user-select: none;
  color: var(--mainColor);
}
.m-infoBox > .btnG > .btn.active {
  background: #1058de;
  color: #ffffff;
}
</style>
