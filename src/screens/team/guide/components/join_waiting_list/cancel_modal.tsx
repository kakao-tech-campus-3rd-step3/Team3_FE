import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useTeamJoinRequest } from '@/src/hooks/useTeamJoinRequest';
import { colors } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';

import { styles } from './styles';

interface CancelModalProps {
  visible: boolean;
  joinWaitingItem: UserJoinWaitingItem | null;
  onClose: () => void;
  onSuccess: () => void;
  onOuterModalClose: () => void;
}

export default function CancelModal({
  visible,
  joinWaitingItem,
  onClose,
  onSuccess,
  onOuterModalClose,
}: CancelModalProps) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const { cancelJoinRequest, isCanceling, cancelError } = useTeamJoinRequest();

  const handleCancel = () => {
    if (!joinWaitingItem) return;

    Alert.alert(
      '팀 가입 신청 취소',
      '정말로 팀 가입 신청을 취소하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '취소',
          style: 'destructive',
          onPress: () => {
            cancelJoinRequest(
              {
                teamId: joinWaitingItem.teamId,
                joinWaitingId: joinWaitingItem.id,
                data: {
                  decisionReason: reason.trim() || undefined,
                },
              },
              {
                onSuccess: () => {
                  setReason('');
                  onSuccess();
                  onClose();
                  Alert.alert('취소 완료', '팀 가입 신청이 취소되었습니다.', [
                    {
                      text: '확인',
                      onPress: () => {
                        onOuterModalClose();
                        router.push('/(tabs)');
                      },
                    },
                  ]);
                },
                onError: error => {
                  Alert.alert(
                    '취소 실패',
                    error?.message || '팀 가입 신청 취소에 실패했습니다.'
                  );
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!joinWaitingItem) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalHeader}>
          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="warning-outline"
                size={24}
                color={colors.orange[500]}
              />
            </View>
            <Text style={styles.modalTitle}>팀 가입 신청 취소</Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.warningSection}>
            <Text style={styles.warningText}>
              팀 가입 신청을 취소하면 다시 신청해야 합니다.
            </Text>
          </View>

          <View style={styles.teamInfoCard}>
            <View style={styles.teamInfoHeader}>
              <Ionicons
                name="people-outline"
                size={20}
                color={colors.blue[500]}
              />
              <Text style={styles.teamInfoTitle}>신청한 팀</Text>
            </View>
            <View style={styles.teamInfoContent}>
              <Text style={styles.teamIdLabel}>팀 ID</Text>
              <Text style={styles.teamIdValue}>{joinWaitingItem.teamId}</Text>
            </View>
          </View>

          <View style={styles.reasonSection}>
            <View style={styles.reasonHeader}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={colors.gray[600]}
              />
              <Text style={styles.reasonLabel}>취소 사유 (선택사항)</Text>
            </View>
            <Text style={styles.reasonSubtext}>
              취소 사유를 남기시면 팀 관리자에게 전달됩니다.
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.reasonInput}
                value={reason}
                onChangeText={setReason}
                placeholder="예: 개인 사정으로 인한 취소"
                placeholderTextColor={colors.gray[400]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
              />
              <View style={styles.inputFooter}>
                <Text style={styles.characterCount}>{reason.length}/200</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.modalCancelButton]}
            onPress={handleClose}
            disabled={isCanceling}
          >
            <Text style={styles.modalCancelButtonText}>돌아가기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleCancel}
            disabled={isCanceling}
          >
            {isCanceling ? (
              <ActivityIndicator size="small" color={colors.text.white} />
            ) : (
              <>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color={colors.text.white}
                />
                <Text style={styles.confirmButtonText}>신청 취소</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
