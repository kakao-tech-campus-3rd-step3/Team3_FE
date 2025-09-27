import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import styles from './data_deletion_style';

export default function DataDeletionScreen() {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert('알림', '탈퇴 사유를 입력해주세요.');
      return;
    }

    Alert.alert(
      '계정 탈퇴 확인',
      '정말로 계정을 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '탈퇴',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              await new Promise(resolve => setTimeout(resolve, 2000)); // 임시 딜레이

              Alert.alert(
                '탈퇴 완료',
                '계정이 성공적으로 탈퇴되었습니다.\n앱을 종료합니다.',
                [
                  {
                    text: '확인',
                    onPress: () => {
                      console.log('계정 탈퇴 완료');
                    },
                  },
                ]
              );
            } catch {
              Alert.alert('오류', '계정 탈퇴 중 오류가 발생했습니다.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>계정 탈퇴</Text>
        <Text style={styles.subtitle}>
          계정을 탈퇴하면 모든 개인정보와 데이터가 영구적으로 삭제됩니다.
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ 주의사항</Text>
          <Text style={styles.warningText}>
            • 탈퇴 시 모든 개인정보, 팀 정보, 매치 기록이 삭제됩니다{'\n'}•
            삭제된 데이터는 복구할 수 없습니다{'\n'}• 탈퇴 후 동일한 이메일로
            재가입이 제한될 수 있습니다
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>탈퇴 사유</Text>
          <Text style={styles.sectionSubtitle}>
            서비스 개선을 위해 탈퇴 사유를 알려주세요. (선택사항)
          </Text>

          <TextInput
            style={styles.reasonInput}
            value={reason}
            onChangeText={setReason}
            placeholder="탈퇴 사유를 입력해주세요..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.characterCount}>{reason.length}/500</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>탈퇴 후 처리 과정</Text>
          <View style={styles.processItem}>
            <Text style={styles.processNumber}>1</Text>
            <Text style={styles.processText}>탈퇴 요청 접수 및 확인</Text>
          </View>
          <View style={styles.processItem}>
            <Text style={styles.processNumber}>2</Text>
            <Text style={styles.processText}>
              개인정보 및 서비스 데이터 삭제
            </Text>
          </View>
          <View style={styles.processItem}>
            <Text style={styles.processNumber}>3</Text>
            <Text style={styles.processText}>
              탈퇴 완료 및 확인 이메일 발송
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>문의사항</Text>
          <Text style={styles.contactText}>
            탈퇴 전에 궁금한 점이 있으시면 고객 지원으로 문의해주세요.
          </Text>
          <Text style={styles.contactEmail}>이메일: clf0914@naver.com</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '처리 중...' : '계정 탈퇴 신청'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
