import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import { convertPositionToKorean } from '@/src/constants/positions';
import { theme } from '@/src/theme';
import { RecruitmentResponse } from '@/src/types/mercenary';

interface MercenaryApplicationModalProps {
  visible: boolean;
  recruitment: RecruitmentResponse | null;
  onClose: () => void;
  onApply: (recruitmentId: number, message: string) => void;
  isApplying?: boolean;
}

export default function MercenaryApplicationModal({
  visible,
  recruitment,
  onClose,
  onApply,
  isApplying = false,
}: MercenaryApplicationModalProps) {
  const [applicationMessage, setApplicationMessage] = useState('');

  if (!recruitment) return null;

  const handleApply = () => {
    if (isApplying) return;
    Alert.alert('용병 신청', '이 용병 모집에 신청하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '신청',
        onPress: () => {
          onApply(recruitment.recruitmentId, applicationMessage.trim() || '');
        },
      },
    ]);
  };

  const getSkillLevelBadgeStyle = (skillLevel: string) => {
    switch (skillLevel) {
      case 'PRO':
        return {
          backgroundColor: '#F4E4BC',
          color: theme.colors.text.main,
          text: '프로',
        };
      case 'SEMI_PRO':
        return {
          backgroundColor: '#E8E8E8',
          color: theme.colors.text.main,
          text: '세미프로',
        };
      case 'AMATEUR':
        return {
          backgroundColor: '#E6D2B8',
          color: theme.colors.text.main,
          text: '아마추어',
        };
      default:
        return {
          backgroundColor: '#E6D2B8',
          color: theme.colors.text.main,
          text: skillLevel,
        };
    }
  };

  const formatTime = (time: string) => time.substring(0, 5);
  const skillLevelStyle = getSkillLevelBadgeStyle(recruitment.skillLevel);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>용병 신청</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.text.main}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled" // ✅ 중요!
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.recruitmentInfo}>
                    <View style={styles.recruitmentHeader}>
                      <Text style={styles.positionTitle}>
                        {convertPositionToKorean(recruitment.position)}
                      </Text>
                      <View style={styles.badgesContainer}>
                        <View
                          style={[
                            styles.skillBadge,
                            {
                              backgroundColor: skillLevelStyle.backgroundColor,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.skillBadgeText,
                              { color: skillLevelStyle.color },
                            ]}
                          >
                            {skillLevelStyle.text}
                          </Text>
                        </View>
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusBadgeText}>
                            {recruitment.recruitmentStatus}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.matchInfo}>
                      <View style={styles.matchInfoItem}>
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color={theme.colors.text.sub}
                        />
                        <Text style={styles.matchInfoText}>
                          {recruitment.matchDate}
                        </Text>
                      </View>
                      <View style={styles.matchInfoItem}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={theme.colors.text.sub}
                        />
                        <Text style={styles.matchInfoText}>
                          {formatTime(recruitment.matchTime)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.teamInfo}>
                      <Text style={styles.teamName}>
                        {recruitment.teamName}
                      </Text>
                      <Text style={styles.universityName}>
                        {recruitment.universityName}
                      </Text>
                    </View>

                    {recruitment.message && (
                      <View style={styles.messageSection}>
                        <Text style={styles.messageTitle}>모집 메시지</Text>
                        <Text style={styles.messageText}>
                          {recruitment.message}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.kakaoIdSection}>
                    <View style={styles.infoBox}>
                      <Text style={styles.infoText}>
                        신청 시 카카오톡 아이디가 자동으로 공개됩니다.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.applicationSection}>
                    <Text style={styles.applicationTitle}>신청 메시지</Text>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="신청 메시지를 작성해주세요"
                      placeholderTextColor={theme.colors.text.sub}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      value={applicationMessage}
                      onChangeText={setApplicationMessage}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                disabled={isApplying}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  isApplying && styles.applyButtonDisabled,
                ]}
                onPress={handleApply}
                disabled={isApplying}
              >
                <Text style={styles.applyButtonText}>
                  {isApplying ? '신청 중' : '신청하기'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  closeButton: {
    padding: theme.spacing.spacing1,
  },
  content: {
    padding: theme.spacing.spacing5,
  },
  recruitmentInfo: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light + '40',
  },
  recruitmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  positionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  skillBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: 8,
  },
  skillBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: theme.colors.success + '20',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.success,
  },
  matchInfo: {
    flexDirection: 'row',
    gap: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing3,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
  },
  matchInfoText: {
    fontSize: 14,
    color: theme.colors.text.sub,
  },
  teamInfo: {
    marginBottom: theme.spacing.spacing3,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  universityName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  messageSection: {
    paddingTop: theme.spacing.spacing3,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  messageText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    lineHeight: 20,
  },
  applicationSection: {
    marginBottom: theme.spacing.spacing4,
  },
  applicationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    fontSize: 14,
    color: theme.colors.text.main,
    minHeight: 100,
    marginBottom: theme.spacing.spacing4,
  },
  kakaoIdSection: {
    marginBottom: theme.spacing.spacing4,
  },
  infoBox: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.text.sub,
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.spacing3,
    padding: theme.spacing.spacing5,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  applyButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.brand.accent,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: theme.colors.text.sub,
    opacity: 0.7,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
});
