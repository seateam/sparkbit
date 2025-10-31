import { imgMap } from "@/utils";

const languageObj = {
  zh_CN: {
    loading: "正在加载校验",
    finishVerify: "请完成校验",
    verifySuccess: "验证成功",
    clickVerify: "点击按钮进行验证",
    slideToComplete: "向右滑动完成验证",
    verifying: "正在验证...",
    verifyFailed: "验证失败，请重试",
    refresh: "刷新",
  },
  ko_KR: {
    loading: "검증 로딩 중",
    finishVerify: "검증을 완료해주세요",
    verifySuccess: "검증 성공",
    clickVerify: "버튼을 클릭하여 검증",
    slideToComplete: "오른쪽으로 슬라이드하여 검증 완료",
    verifying: "검증 중...",
    verifyFailed: "검증 실패, 다시 시도해주세요",
    refresh: "새로고침",
  },
  en_US: {
    loading: "Incomplete",
    finishVerify: "Please complete the verification",
    verifySuccess: "Verification Success",
    clickVerify: "Click to verify",
    slideToComplete: "Slide right to complete verification",
    verifying: "Verifying...",
    verifyFailed: "Verification failed, please try again",
    refresh: "Refresh",
  },
  el_GR: {
    loading: "正在載入驗證",
    finishVerify: "請完成驗證",
    verifySuccess: "驗證成功",
    clickVerify: "點擊按鈕進行驗證",
    slideToComplete: "向右滑動完成驗證",
    verifying: "正在驗證...",
    verifyFailed: "驗證失敗，請重試",
    refresh: "刷新",
  },
  ja_JP: {
    loading: "ロード中と検証中",
    finishVerify: "検証を完了してください",
    verifySuccess: "検証が成功しました",
    clickVerify: "ボタンをクリックして検証を行ってください",
    slideToComplete: "右にスライドして検証を完了してください",
    verifying: "検証中...",
    verifyFailed: "検証に失敗しました。もう一度お試しください",
    refresh: "更新",
  },
  ru_RU: {
    loading: "Загрузка и проверка",
    finishVerify: "Пожалуйста, завершите проверку",
    verifySuccess: "Проверка пройдена успешно",
    clickVerify: "Нажмите кнопку для проверки",
    slideToComplete: "Проведите вправо для завершения проверки",
    verifying: "Проверка...",
    verifyFailed: "Проверка не удалась, попробуйте еще раз",
    refresh: "Обновить",
  },
  vi_VN: {
    loading: "Đang tải và kiểm tra",
    finishVerify: "Vui lòng hoàn thành kiểm tra",
    verifySuccess: "Xác minh thành công",
    clickVerify: "Nhấp vào nút để xác minh",
    slideToComplete: "Vuốt sang phải để hoàn thành xác minh",
    verifying: "Đang xác minh...",
    verifyFailed: "Xác minh thất bại, vui lòng thử lại",
    refresh: "Làm mới",
  },
};

export default {
  data() {
    return {
      // 与组件交互相关的最小状态集合
      showVerify: false,
      verifyTxt: "Click to verify", // 点击按钮进行验证 | 请完成验证 | 验证成功
      verifyLoading: false, // 初始不展示按钮加载动画，点击后直接打开弹层
      verifyStatus: 0, // 0-未校验， 1-校验成功
      verifySuccess: imgMap.validation,
    };
  },
  computed: {
    // 国际化
    language() {
      const currentLang = this.$store.state.baseData.lan;
      const supportedLangs = ["zh_CN", "ko_KR", "en_US", "el_GR", "ja_JP", "ru_RU", "vi_VN"];
      const langKey = supportedLangs.includes(currentLang) ? currentLang : "en_US";
      return languageObj[langKey];
    },
  },
  watch: {
    lan: {
      immediate: true,
      handler() {
        this.verifyTxt = this.language.finishVerify;
      },
    },
  },
  methods: {
    // 打开校验弹窗（去除不必要的延时与额外状态）
    openVerify() {
      const { verifyLoading, verifyStatus } = this;
      if (verifyLoading || verifyStatus === 1) return;
      this.showVerify = true;
    },
  },
};
