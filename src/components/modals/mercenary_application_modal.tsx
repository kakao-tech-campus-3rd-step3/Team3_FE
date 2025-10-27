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
} from 'react-native';

import { theme } from '@/src/theme';
import { RecruitmentResponse } from '@/src/types/mercenary';

interface MercenaryApplicationModalProps {
  visible: boolean;
  recruitment: RecruitmentResponse | null;
  onClose: () => void;
  onApply: (
    recruitmentId: number,
    message: string,
    shareKakaoId: boolean
  ) => void;
}

export default function MercenaryApplicationModal({
  visible,
  recruitment,
  onClose,
  onApply,
}: MercenaryApplicationModalProps) {
  const [applicationMessage, setApplicationMessage] = useState('');
  const [shareKakaoId, setShareKakaoId] = useState(false);

  if (!recruitment) return null;

  const handleApply = () => {
    if (!applicationMessage.trim()) {
      Alert.alert('알림', '신청 메시지를 입력해주세요.');
      return;
    }

    Alert.alert('용병 신청', '이 용병 모집에 신청하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '신청',
        onPress: () => {
          onApply(recruitment.recruitmentId, applicationMessage, shareKakaoId);
          setApplicationMessage('');
          setShareKakaoId(false);
          onClose();
        },
      },
    ]);
  };

  const convertPositionToKorean = (position: string) => {
    const positionMap: { [key: string]: string } = {
      GK: '골키퍼',
      CB: '센터백',
      LB: '레프트백',
      RB: '라이트백',
      LWB: '레프트 윙백',
      RWB: '라이트 윙백',
      CDM: '수비형 미드필더',
      CM: '중앙 미드필더',
      CAM: '공격형 미드필더',
      LM: '레프트 미드필더',
      RM: '라이트 미드필더',
      LW: '레프트 윙어',
      RW: '라이트 윙어',
      CF: '중앙 공격수',
      ST: '스트라이커',
    };
    return positionMap[position] || position;
  };

  const getSkillLevelBadgeStyle = (skillLevel: string) => {
    switch (skillLevel) {
      case 'AMATEUR':
        return {
          backgroundColor: theme.colors.success + '20',
          color: theme.colors.success,
          text: '아마추어',
        };
      case 'SEMI_PRO':
        return {
          backgroundColor: theme.colors.warning + '20',
          color: theme.colors.warning,
          text: '세미프로',
        };
      case 'PRO':
        return {
          backgroundColor: theme.colors.error + '20',
          color: theme.colors.error,
          text: '프로',
        };
      default:
        return {
          backgroundColor: theme.colors.text.sub + '20',
          color: theme.colors.text.sub,
          text: skillLevel,
        };
    }
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const skillLevelStyle = getSkillLevelBadgeStyle(recruitment.skillLevel);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>용병 신청</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.recruitmentInfo}>
              <View style={styles.recruitmentHeader}>
                <Text style={styles.positionTitle}>
                  {convertPositionToKorean(recruitment.position)}
                </Text>
                <View style={styles.badgesContainer}>
                  <View
                    style={[
                      styles.skillBadge,
                      { backgroundColor: skillLevelStyle.backgroundColor },
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
                <Text style={styles.teamName}>{recruitment.teamName}</Text>
              </View>

              {recruitment.message && (
                <View style={styles.messageSection}>
                  <Text style={styles.messageTitle}>모집 메시지</Text>
                  <Text style={styles.messageText}>{recruitment.message}</Text>
                </View>
              )}
            </View>

            <View style={styles.kakaoIdSection}>
              <Text style={styles.kakaoIdTitle}>카카오톡 아이디 공개</Text>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setShareKakaoId(!shareKakaoId)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>카카오톡 아이디 공개</Text>
                  <Text style={styles.optionDescription}>
                    팀장이 직접 연락할 수 있습니다
                  </Text>
                </View>
                <View
                  style={[styles.toggle, shareKakaoId && styles.toggleActive]}
                >
                  <View
                    style={
                      shareKakaoId
                        ? styles.toggleThumb
                        : styles.toggleThumbInactive
                    }
                  />
                </View>
              </TouchableOpacity>
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
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>신청하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '500',
    color: theme.colors.text.main,
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
  },
  kakaoIdSection: {
    marginBottom: theme.spacing.spacing4,
  },
  kakaoIdTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  optionDescription: {
    fontSize: 12,
    color: theme.colors.text.sub,
    lineHeight: 16,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.gray[300],
    justifyContent: 'center',
    paddingHorizontal: 2,
    position: 'relative',
  },
  toggleActive: {
    backgroundColor: theme.colors.blue[500],
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 0,
    position: 'absolute',
    right: 2,
  },
  toggleThumbInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    position: 'absolute',
    left: 2,
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
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
});
