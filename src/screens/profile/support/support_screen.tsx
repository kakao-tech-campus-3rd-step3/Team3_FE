import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import { styles } from '@/src/screens/profile/support/support_style';

export default function SupportScreen() {
  const handleEmailPress = () => {
    const email = 'clf0914@naver.com';
    const subject = '슛두리 고객 지원 문의';
    const body = '문의 내용을 입력해주세요:\n\n';

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('오류', '이메일 앱을 열 수 없습니다.');
        }
      })
      .catch(() => {
        Alert.alert('오류', '이메일을 보낼 수 없습니다.');
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>고객 지원</Text>
        <Text style={styles.subtitle}>
          궁금한 점이 있으시면 언제든지 문의해주세요.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연락처 정보</Text>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>이메일</Text>
            <TouchableOpacity
              onPress={handleEmailPress}
              style={styles.contactButton}
            >
              <Text style={styles.contactValue}>clf0914@naver.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자주 묻는 질문</Text>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q. 회원가입은 어떻게 하나요?</Text>
            <Text style={styles.faqAnswer}>
              앱에서 이메일과 비밀번호를 입력하여 간단히 회원가입할 수 있습니다.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Q. 팀에 가입하려면 어떻게 해야 하나요?
            </Text>
            <Text style={styles.faqAnswer}>
              팀 가입 페이지에서 원하는 팀을 찾아 가입 신청을 하시면 됩니다.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Q. 매치에 참여하려면 어떻게 해야 하나요?
            </Text>
            <Text style={styles.faqAnswer}>
              매치 목록에서 원하는 매치를 선택하고 참여 신청을 하시면 됩니다.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>
              Q. 계정을 삭제하려면 어떻게 해야 하나요?
            </Text>
            <Text style={styles.faqAnswer}>
              설정 &gt; 데이터 삭제 요청에서 계정 삭제를 신청할 수 있습니다.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운영 시간</Text>
          <Text style={styles.operatingHours}>
            평일: 09:00 - 18:00{'\n'}
            주말 및 공휴일: 휴무
          </Text>
          <Text style={styles.note}>
            * 이메일 문의는 24시간 접수 가능하며, 평일 운영 시간 내에
            답변드립니다.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
