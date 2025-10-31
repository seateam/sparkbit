<!-- 保证金模式 -->
<template>
  <c-dialog
    paddingBottom="14px"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :titleText="lanText.titleText"
    :confirmText="lanText.confirmText"
    @close="close"
    @confirm="submit">
    <div class="openFutures-box">
      <div class="text">
        <vue-scroll>
          <div class="wrap">
            <p>{{langTxt.txt1}}</p>
            <p>{{langTxt.txt2}}</p>
            <p>{{langTxt.txt3}}</p>
            <p>{{langTxt.txt4}}</p>
            <p>{{langTxt.txt5}}</p>
            <p>{{langTxt.txt6}}</p>
            <p>{{langTxt.txt7}}</p>
          </div>
        </vue-scroll>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/openFutures/openFutures';
import '@/components/BlockChain-ui-privatization/PC/common-mixin/modules/coTrade/openFutures/openFutures.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  computed: {
    companyName() {
      return this.$store.state.systemConfig.companyName;
    },
    lang() {
      return this.$store.state.baseData.lan;
    },
    langTxt() {
      const lan = this.lang;
      const { companyName } = this;
      if (lan === "zh_CN") {
        return {
          txt1: "1. 市场波动中的保证金管理:加密货币市场以其波动性而闻名。通过了解保证金要求如何随市场波动而变化来保护自己。如果您的保证金低于某个阈值，系统可能会启动强制清算命令。这是一个提醒，要仔细监控你的保证金，以避免不必要的后果。",
          txt2: `2. 遵守知情交易的商业规则:在执行任何交易之前，请花时间了解并遵循${companyName}的平台规则。了解贸易机制和运作原则至关重要。让自己掌握市场风险的知识，策略性地分配资金，以优化交易决策。`,
          txt3: "3. 应对极端市场情况:了解某些市场情况可能使平仓变得困难甚至不可能。如果你的利润在合约市场的有效PnL中排名最高，就可能发生这种情况。如果保险基金不足以弥补潜在的损失，就要做好迎接挑战的准备。",
          txt4: `4. 监管变化带来的灵活性:当地法律、法规和政策可能会影响您的交易经验。${companyName}的平台会通知您任何变化。虽然您可能需要平仓作为回应，但请放心，您的仓位保证金和盈利余额仍将被兑现。`,
          txt5: "5. 不可预见事件的应急计划:认识到不可预见的事件，如自然灾害或技术故障，可能会破坏订单的执行。在这种情况下，订单可能无法全部或部分执行，可能导致财务损失。当你从事交易活动时，请记住这一点。",
          txt6: "6. 对冲交易的计算风险:虽然对冲交易提供了一种战略方法，但它们并非没有风险。资产价格的波动会影响你的头寸。在冒险采用这种方法做出明智的决定之前，先深入研究对冲机制。",
          txt7: "7. 保护您的帐户和资金:与第三方共享您的交易帐户可能会使您的资金暴露于潜在风险之中。为了维护您的资产安全，必须对您的帐户保持独家控制。避免分享敏感的账户信息。",
        };
      } if (lan === "ko_KR") {
        return {
          txt1: "1.시장 변동성 속에서 마진 관리:암호화폐 시장은 변동성이 큰 것으로 유명합니다.시장 변동으로 인해 마진 요건이 어떻게 변할 수 있는지 이해하여 자신을 보호하십시오.마진이 특정 임계값 이하로 떨어지면 시스템은 강제 청산 주문을 시작할 수 있습니다.원치 않는 결과를 피하기 위해 여백을 주의 깊게 모니터링하라는 주의사항입니다.",
          txt2: `2.정보에 입각한 거래를 위한 비즈니스 규칙 준수:모든 거래를 실행하기 전에 ${companyName}의 플랫폼 규칙을 이해하고 준수하는 데 시간을 투자하십시오.거래 메커니즘과 운영 원칙에 대한 통찰력을 얻는 것이 무엇보다 중요합니다.시장 위험에 대한 지식을 갖추고 거래 결정을 최적화하기 위해 자금을 전략적으로 배분합니다.`,
          txt3: "3.극단적인 시장 시나리오 탐색:특정 시장 상황이 마감 포지션을 어렵게 하거나 심지어 불가능하게 만들 수 있음을 이해합니다.이는 계약 시장의 유효 PnL 전체에서 수익이 가장 높은 경우 발생할 수 있습니다.보험기금이 잠재적 손실을 보상하는 데 부족한 경우에는 도전에 직면할 준비를 해야 한다.",
          txt4: `4.규제 변화에 따른 유연성:현지 법률, 규정 및 정책이 거래 경험에 영향을 미칠 수 있습니다.${companyName}의 플랫폼은 변경 사항에 대해 알려드릴 것입니다.비록 여러분이 이에 대응하여 오픈 포지션을 마감해야 할 수도 있지만, 여러분의 포지션 마진과 수익성 있는 잔고는 여전히 존중될 것이니 안심하세요.`,
          txt5: "5.예측하지 못한 사건에 대한 비상 계획:자연 재해나 기술적 실패와 같이 예측하지 못한 사건이 주문 실행에 지장을 줄 수 있음을 인식합니다.이러한 경우, 주문이 완전히 또는 부분적으로 실행되지 않을 수 있으며, 재정적 손실로 이어질 수 있습니다.거래 활동에 참여할 때이 점을 명심하십시오.",
          txt6: "6.헤지 거래시 계산된 리스크:헤지 거래가 전략적 접근 방식을 제공하지만 리스크가 없는 것은 아닙니다.자산 가격의 변동은 당신의 포지션에 영향을 줄 수 있습니다.정보에 입각한 결정을 내리기 위해이 방법에 과감히 뛰어들기 전에 헤지의 메카닉을 철저히 조사하라.",
          txt7: "7.계정 및 자금 보호:거래 계정을 제3자와 공유하면 귀하의 자금이 잠재적 위험에 노출될 수 있습니다.자산의 보안을 유지하려면 계정에 대한 독점적인 통제권을 유지해야 합니다.중요한 계정 세부 정보를 공유하지 않도록 합니다.",
        };
      } if (lan === "el_GR") {
        return {
          txt1: "1. 市場波動中的保證金管理：加密貨幣市場以其波動性而聞名。透過了解保證金要求如何隨市場波動而變化來保護自身。若您的保證金低於特定閾值，系統可能會啟動強制清算指令。特此提醒，請仔細監控您的保證金，以避免不必要的後果。",
          txt2: `2. 遵守知情交易的商業規則：在執行任何交易前，請花時間了解並遵循${companyName}的平台規則。了解交易機制與運作原則至關重要。讓自身具備市場風險相關知識，並戰略性地分配資金，以優化交易決策。`,
          txt3: "3. 應對極端市場狀況：需了解某些市場狀況可能導致平倉困難甚至無法平倉。若您的利潤在合約市場的有效損益（PnL）中排名最高，就可能發生此情形。若保險基金不足以彌補潛在損失，請做好應對挑戰的準備。",
          txt4: `4. 監管變動帶來的靈活性：當地法律、法規及政策可能會影響您的交易體驗。${companyName}平台將通知您任何變動。儘管您可能需以平倉作為回應，但請放心，您的倉位保證金與盈利餘額仍將兌現。`,
          txt5: "5. 不可預見事件的應急計畫：需認知到自然災害或技術故障等不可預見事件，可能會影響訂單的執行。在此情形下，訂單可能無法全部或部分執行，進而可能導致財務損失。當您從事交易活動時，請牢記此點。",
          txt6: "6. 對沖交易的計算風險：儘管對沖交易提供了一種戰略性方法，但並非毫無風險。資產價格的波動會影響您的持倉。在決定採用此方法前，請深入研究對沖機制，以做出明智的決策。",
          txt7: "7. 保護您的帳戶與資金：與第三方共用您的交易帳戶，可能會使您的資金面臨潛在風險。為維護您的資產安全，必須獨家掌控您的帳戶。避免分享敏感性的帳戶資訊。",
        };
      } if (lan === "ja_JP") {
        return {
          txt1: "1. 市場変動における証拠金管理：暗号通貨市場はその変動性で知られています。市場の変動に伴う証拠金要件の変化を理解することで、自身を保護してください。証拠金が一定の閾値を下回ると、システムは強制決済命令を発動する可能性があります。不要な結果を避けるため、証拠金を注意深く監視することが重要であることを提醒します。",
          txt2: `2. 情報に基づいた取引の商業ルールの遵守：いかなる取引を実行する前に、${companyName}のプラットフォームルールを理解し、遵守する時間を費やしてください。取引メカニズムと運用原則を理解することは極めて重要です。市場リスクに関する知識を身につけ、資金を戦略的に配分して取引決定を最適化してください。`,
          txt3: "3. 極端な市場状況への対応：特定の市場状況により、建玉の決済が困難になる場合や不可能になる場合があることを理解してください。先物市場の有効PnL（損益）ランキングで自身の利益が最上位にある場合、このような事態が発生する可能性があります。保険基金が潜在的な損失を補うのに不十分な場合は、課題への対応の準備をしてください。",
          txt4: `4. 規制変更に伴う柔軟性：地域の法律、規制及び政策が您の取引体験に影響を与える可能性があります。${companyName}のプラットフォームは、いかなる変更も您に通知します。対応として建玉の決済が必要になる場合がありますが、ご安心ください。您の建玉証拠金及び利益残高は依然として払い戻されます。`,
          txt5: "5. 予期せぬ事象に対する応急計画：自然災害や技術的障害などの予期せぬ事象が注文の執行を妨げる可能性があることを認識してください。このような場合、注文は全部又は一部が執行されない可能性があり、財務損失を引き起こすことがあります。取引活動に従事する際に、この点を忘れないでください。",
          txt6: "6. ヘッジ取引の計算されたリスク：ヘッジ取引は戦略的な方法を提供しますが、リスクが伴わないわけではありません。資産価格の変動が您のポジションに影響を与えます。この方法を採用して賢明な決定を下す前に、ヘッジメカニズムを深く研究してください。",
          txt7: "7. 您のアカウントと資金の保護：第三者と取引アカウントを共有すると、您の資金が潜在的なリスクにさらされる可能性があります。資産の安全性を維持するため、アカウントの独占的な管理を行うことが必須です。機密性の高いアカウント情報の共有を避けてください。",
        };
      } if (lan === "ru_RU") {
        return {
          txt1: "1. Управление маржой при рыночных колебаниях: Рынок криптовалют известен своими колебаниями. Защитите себя, поняв, как требования к марже изменяются вместе с рыночными колебаниями. Если ваша маржа опустится ниже определенного порога, система может инициировать приказ на принудительное ликвидацию. Это напоминание о необходимости тщательного мониторинга вашей маржи, чтобы избежать ненужных последствий.",
          txt2: `2. Соблюдение деловых правил информированной торговли: Перед выполнением любой сделки уделите время изучению и соблюдению правил платформы ${companyName}. Важно понять механизмы торговли и принципы работы. Обучитесь основам рыночных рисков, стратегически распределяйте средства для оптимизации решений по торговле.`,
          txt3: "3. Реагирование на экстремальные рыночные ситуации: Понятите, что некоторые рыночные ситуации могут сделать закрытие позиций трудным или даже невозможным. Такое может произойти, если ваша прибыль занимает первое место по эффективной прибыли и убыткам (PnL) на рынке контрактов. Готовьтесь к вызовам, если страховой фонд недостаточен для покрытия потенциальных убытков.",
          txt4: `4. Гибкость при изменениях регулирования: Местные законы, правила и политики могут повлиять на ваш опыт торговли. Платформа ${companyName} уведомит вас о любых изменениях. Хотя в ответ вам может потребоваться закрыть позиции, будьте уверены — ваша маржа по позициям и остаток прибыли все равно будут выплачены.`,
          txt5: "5. План реагирования на непредвиденные события: Признайте, что непредвиденные события, такие как стихийные бедствия или технические сбои, могут нарушить исполнение ордеров. В таких случаях ордеры могут быть исполнены не полностью или не исполнены вовсе, что может привести к финансовым убыткам. Помните об этом при проведении торговых операций.",
          txt6: "6. Рассчитанные риски хеджирующей торговли: Хотя хеджирующая торговля предлагает стратегический подход, она не лишена рисков. Колебания цен на активы влияют на ваши позиции. Прежде чем рисковать, используя этот метод, и принимать взвешенные решения, тщательно изучите механизмы хеджирования.",
          txt7: "7. Защита вашего аккаунта и средств: Деление доступа к вашему торговому аккаунту с третьими лицами может подвергнуть ваши средства потенциальным рискам. Для обеспечения безопасности ваших активов необходимо сохранять эксклюзивный контроль над вашим аккаунтом. Избегайте передачи чувствительных данных аккаунта.",
        };
      } if (lan === "vi_VN") {
        return {
          txt1: "1. Quản lý tiền cọc trong biến động thị trường: Thị trường tiền điện tử nổi tiếng với tính biến động cao. Hãy bảo vệ bản thân bằng cách hiểu rõ cách yêu cầu về tiền cọc thay đổi theo biến động thị trường. Nếu tiền cọc của bạn thấp hơn một ngưỡng nhất định, hệ thống có thể kích hoạt lệnh thanh lý cưỡng chế. Đây là lời nhắc nhở để bạn giám sát tiền cọc một cách cẩn thận, tránh những hậu quả không cần thiết.",
          txt2: `2. Tuân thủ quy tắc kinh doanh giao dịch có thông tin: Trước khi thực hiện bất kỳ giao dịch nào, vui lòng dành thời gian tìm hiểu và tuân theo quy tắc nền tảng của ${companyName}. Việc hiểu rõ cơ chế giao dịch và nguyên tắc hoạt động là cực kỳ quan trọng. Nâng cao kiến thức về rủi ro thị trường, phân bổ vốn một cách chiến lược để tối ưu hóa quyết định giao dịch.`,
          txt3: "3. Đối phó với tình huống thị trường cực đoan: Hãy hiểu rằng một số tình huống thị trường có thể khiến việc đóng vị thế trở nên khó khăn thậm chí không thể thực hiện. Trường hợp này có thể xảy ra nếu lợi nhuận của bạn đứng đầu trong PnL (lợi nhuận và tổn thất) hiệu dụng trên thị trường hợp đồng. Chuẩn bị sẵn sàng đối phó với thách thức nếu quỹ bảo hiểm không đủ để bù đắp tổn thất tiềm ẩn.",
          txt4: `4. Độ linh hoạt khi có thay đổi quy định quản lý: Pháp luật, quy định và chính sách địa phương có thể ảnh hưởng đến trải nghiệm giao dịch của bạn. Nền tảng ${companyName} sẽ thông báo cho bạn mọi thay đổi. Mặc dù bạn có thể cần đóng vị thế để phản hồi, nhưng hãy yên tâm rằng tiền cọc vị thế và dư nợ lợi nhuận của bạn vẫn sẽ được thanh toán.`,
          txt5: "5. Kế hoạch ứng急事 cho sự kiện không lường trước: Nhận thức rằng những sự kiện không lường trước (như thiên tai hoặc sự cố kỹ thuật) có thể phá vỡ việc thực thi lệnh. Trong trường hợp này, lệnh có thể không được thực thi toàn bộ hoặc một phần, dẫn đến tổn thất tài chính. Hãy ghi nhớ điều này khi tham gia hoạt động giao dịch.",
          txt6: "6. Rủi ro tính toán trong giao dịch đối ứng (hedging): Mặc dù giao dịch đối ứng cung cấp phương pháp chiến lược, nhưng chúng không hoàn toàn không có rủi ro. Biến động giá tài sản sẽ ảnh hưởng đến vị thế của bạn. Trước khi mạo hiểm áp dụng phương pháp này để đưa ra quyết định sáng suốt, hãy nghiên cứu kỹ lưỡng cơ chế đối ứng.",
          txt7: "7. Bảo vệ tài khoản và vốn của bạn: Chia sẻ tài khoản giao dịch với bên thứ ba có thể khiến vốn của bạn tiếp xúc với rủi ro tiềm ẩn. Để đảm bảo an toàn tài sản, bạn phải duy trì quyền kiểm soát độc quyền над tài khoản. Tránh chia sẻ thông tin tài khoản nhạy cảm.",
        };
      }
      return {
        txt1: "1. Margin Management Amid Market Volatility: Cryptocurrency markets are renowned for their volatility. Protect yourself by understanding how margin requirements can change due to market fluctuations. If your margin falls below a certain threshold, the system might initiate a forced liquidation order. This is a reminder to carefully monitor your margin to avoid unwanted consequences.",
        txt2: `2. Adhering to Business Rules for Informed Trading: Prior to executing any trades, invest time in understanding and following ${companyName}'s platform rules. Gaining insight into trading mechanisms and operational principles is paramount. Equip yourself with knowledge about market risks and strategically allocate your funds to optimize your trading decisions.`,
        txt3: "3. Navigating Extreme Market Scenarios: Understand that certain market conditions can make closing positions difficult or even impossible. This may occur if your profits rank highest across the contract market's effective PnL. In cases where the insurance fund falls short of covering potential losses, be prepared to face challenges.",
        txt4: `4. Flexibility in Light of Regulatory Changes: Local laws, regulations, and policies can influence your trading experience. ${companyName}'s platform will inform you about any changes. Although you may need to close open positions in response, rest assured that your position margin and profitable balance will still be honored.`,
        txt5: "5. Contingency Planning for Unforeseen Events: Recognize that unforeseen events, like natural disasters or technical failures, can disrupt order execution. In such instances, orders might not be fully or partially executed, possibly leading to financial losses. Keep this in mind as you engage in trading activities.",
        txt6: "6. Calculated Risks in Hedging Transactions: While hedging transactions offer a strategic approach, they aren't without risks. Fluctuations in asset prices can impact your positions. Delve into the mechanics of hedging before venturing into this method to make informed decisions.",
        txt7: "7. Safeguarding Your Account and Funds: Sharing your trading account with third parties can expose your funds to potential risks. To maintain the security of your assets, it's imperative to maintain exclusive control over your account. Avoid sharing sensitive account details.",
      };
    },
  },
};
</script>
<style scoped>
.openFutures-box .text {
  width: 100%;
  word-break: break-word;
  height: 392px;
}
/deep/.dialog-frame-bottom {
  padding-top: 20px;
}
.openFutures-box .wrap {
  box-sizing: border-box;
  padding-right: 6px;
}
</style>
