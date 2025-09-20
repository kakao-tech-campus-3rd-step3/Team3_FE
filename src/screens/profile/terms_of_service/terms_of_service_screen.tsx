import { ScrollView, Text, View } from 'react-native';

import styles from './terms_of_service_style';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>서비스 이용약관</Text>

        <Text style={styles.lastUpdated}>최종 업데이트: 2025년 9월 19일</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제1조 (목적)</Text>
          <Text style={styles.sectionContent}>
            이 약관은 슛두리(이하 &quot;회사&quot;)가 제공하는 축구팀 매칭
            서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의
            권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제2조 (정의)</Text>
          <Text style={styles.sectionContent}>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • &quot;서비스&quot;란 회사가 제공하는 축구팀 매칭, 팀 관리 제공
            등을 의미합니다.
          </Text>
          <Text style={styles.sectionContent}>
            • &quot;이용자&quot;란 서비스에 접속하여 이 약관에 따라 서비스를
            이용하는 회원 및 비회원을 말합니다.
          </Text>
          <Text style={styles.sectionContent}>
            • &quot;회원&quot;이란 서비스에 개인정보를 제공하여 회원등록을 한
            자로서, 서비스의 정보를 지속적으로 제공받으며, 서비스를 계속적으로
            이용할 수 있는 자를 말합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
          <Text style={styles.sectionContent}>
            이 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이
            발생합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 필요한 경우 관련 법령을 위반하지 않는 범위에서 이 약관을
            변경할 수 있습니다. 약관이 변경되는 경우 회사는 변경된 약관의 내용과
            시행일을 정하여, 시행일로부터 최소 7일 전에 공지합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제4조 (서비스의 제공)</Text>
          <Text style={styles.sectionContent}>
            회사는 다음과 같은 서비스를 제공합니다.
          </Text>
          <Text style={styles.sectionContent}>• 축구팀 매칭 서비스</Text>
          <Text style={styles.sectionContent}>• 용병 서비스</Text>
          <Text style={styles.sectionContent}>• 토너먼트 정보 제공</Text>
          <Text style={styles.sectionContent}>• 기타 회사가 정하는 서비스</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제5조 (서비스의 중단)</Text>
          <Text style={styles.sectionContent}>
            회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절
            등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
            있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여
            이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의
            또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제6조 (회원가입)</Text>
          <Text style={styles.sectionContent}>
            이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
            동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각
            호에 해당하지 않는 한 회원으로 등록합니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
            경우
          </Text>
          <Text style={styles.sectionContent}>
            • 등록 내용에 허위, 기재누락, 오기가 있는 경우
          </Text>
          <Text style={styles.sectionContent}>
            • 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고
            판단되는 경우
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            제7조 (회원 탈퇴 및 자격 상실 등)
          </Text>
          <Text style={styles.sectionContent}>
            회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시
            회원탈퇴를 처리합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및
            정지시킬 수 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 가입 신청 시에 허위 내용을 등록한 경우
          </Text>
          <Text style={styles.sectionContent}>
            • 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등
            전자상거래 질서를 위협하는 경우
          </Text>
          <Text style={styles.sectionContent}>
            • 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는
            행위를 하는 경우
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제8조 (회원에 대한 통지)</Text>
          <Text style={styles.sectionContent}>
            회사가 회원에 대한 통지를 하는 경우, 회원이 회사와 미리 약정하여
            지정한 전자우편 주소로 할 수 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 불특정다수 회원에 대한 통지의 경우 1주일이상 서비스 게시판에
            게시함으로서 개별 통지에 갈음할 수 있습니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제9조 (개인정보보호)</Text>
          <Text style={styles.sectionContent}>
            회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서
            최소한의 개인정보를 수집합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지
            않습니다. 다만, 관련 법령상 의무이행을 위하여 필요한 경우에는 예외로
            합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그
            목적을 고지하고 동의를 받습니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제10조 (회사의 의무)</Text>
          <Text style={styles.sectionContent}>
            회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
            않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
            제공하는데 최선을 다하여야 합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의
            개인정보(신용정보 포함)보호를 위한 보안 시스템을 구축하여야 합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제11조 (이용자의 의무)</Text>
          <Text style={styles.sectionContent}>
            이용자는 다음 행위를 하여서는 안 됩니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 신청 또는 변경시 허위 내용의 등록
          </Text>
          <Text style={styles.sectionContent}>• 타인의 정보 도용</Text>
          <Text style={styles.sectionContent}>• 회사가 게시한 정보의 변경</Text>
          <Text style={styles.sectionContent}>
            • 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는
            게시
          </Text>
          <Text style={styles.sectionContent}>
            • 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해
          </Text>
          <Text style={styles.sectionContent}>
            • 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
          </Text>
          <Text style={styles.sectionContent}>
            • 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
            정보를 서비스에 공개 또는 게시하는 행위
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제12조 (분쟁해결)</Text>
          <Text style={styles.sectionContent}>
            회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를
            보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의
            이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는
            지방법원의 전속관할로 합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>제13조 (재판권 및 준거법)</Text>
          <Text style={styles.sectionContent}>
            회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의
            이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는
            지방법원의 전속관할로 합니다.
          </Text>
          <Text style={styles.sectionContent}>
            회사와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
