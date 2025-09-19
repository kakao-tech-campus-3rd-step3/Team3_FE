import { ScrollView, Text, View } from 'react-native';

import styles from './privacy_policy_style';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>개인정보 처리방침</Text>

        <Text style={styles.lastUpdated}>최종 업데이트: 2025년 9월 19일</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 개인정보의 처리 목적</Text>
          <Text style={styles.sectionContent}>
            슛두리는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 회원 가입 및 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별,
            불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인,
            연령확인, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부
            확인, 불만처리 등 민원처리, 고지사항 전달
          </Text>
          <Text style={styles.sectionContent}>
            • 서비스 제공: 축구팀 매칭, 팀 관리 제공, 맞춤형 서비스 제공, 서비스
            이용기록과 접속빈도 분석, 서비스 이용에 대한 통계
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. 개인정보의 처리 및 보유기간
          </Text>
          <Text style={styles.sectionContent}>
            슛두리는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 회원 정보: 회원 탈퇴 시까지 (단, 관계법령 위반에 따른 수사·조사
            등이 진행중인 경우에는 해당 수사·조사 종료 시까지)
          </Text>
          <Text style={styles.sectionContent}>
            • 서비스 이용 기록: 3년 (통신비밀보호법)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 처리하는 개인정보의 항목</Text>
          <Text style={styles.sectionContent}>
            슛두리는 다음의 개인정보 항목을 처리하고 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 필수항목: 이메일, 비밀번호, 이름, 전화번호, 대학교명, 학과, 학년
          </Text>
          <Text style={styles.sectionContent}>
            • 선택항목: 프로필 사진, 자기소개, 선호 포지션, 선호 지역
          </Text>
          <Text style={styles.sectionContent}>
            • 자동 수집 항목: IP주소, 쿠키, MAC주소, 서비스 이용 기록, 접속
            로그, 접속 IP 정보
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 개인정보의 제3자 제공</Text>
          <Text style={styles.sectionContent}>
            슛두리는 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
            내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
            개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
            제3자에게 제공합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 개인정보처리의 위탁</Text>
          <Text style={styles.sectionContent}>
            슛두리는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 위탁받는 자: AWS (Amazon Web Services)
          </Text>
          <Text style={styles.sectionContent}>
            • 위탁하는 업무의 내용: 서버 운영 및 데이터 저장
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. 정보주체의 권리·의무 및 행사방법
          </Text>
          <Text style={styles.sectionContent}>
            정보주체는 슛두리에 대해 언제든지 다음 각 호의 개인정보 보호 관련
            권리를 행사할 수 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 개인정보 처리현황 통지요구
          </Text>
          <Text style={styles.sectionContent}>
            • 오류 등이 있을 경우 정정·삭제 요구
          </Text>
          <Text style={styles.sectionContent}>• 처리정지 요구</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. 개인정보의 안전성 확보조치</Text>
          <Text style={styles.sectionContent}>
            슛두리는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
          </Text>
          <Text style={styles.sectionContent}>
            • 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템
            설치, 고유식별정보 등의 암호화, 보안프로그램 설치
          </Text>
          <Text style={styles.sectionContent}>
            • 물리적 조치: 전산실, 자료보관실 등의 접근통제
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. 개인정보 보호책임자</Text>
          <Text style={styles.sectionContent}>
            슛두리는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </Text>
          <Text style={styles.sectionContent}>
            • 개인정보 보호책임자: 슛두리 개발팀
          </Text>
          <Text style={styles.sectionContent}>• 연락처: clf0914@naver.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. 개인정보 처리방침의 변경</Text>
          <Text style={styles.sectionContent}>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
            전부터 공지사항을 통하여 고지할 것입니다.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
