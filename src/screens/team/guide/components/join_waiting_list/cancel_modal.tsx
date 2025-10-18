import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTeamJoinRequest } from '@/src/hooks/useTeamJoinRequest';
import { styles } from '@/src/screens/team/guide/components/join_waiting_list/styles';
import { colors } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';

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
  const { cancelJoinRequest, isCanceling } = useTeamJoinRequest();

  const handleCancel = () => {
    if (!joinWaitingItem) return;

    Alert.alert(
      '팀 가입 신청 취소',
      '정말로 팀 가입 신청을 취소하시겠습니까?',
      [
        {
          text: '아니오',
          style: 'destructive',
        },
        {
          text: '예',
          style: 'default',
          onPress: () => {
            cancelJoinRequest(
              {
                teamId: joinWaitingItem.teamId,
                joinWaitingId: joinWaitingItem.id,
                data: {},
              },
              {
                onSuccess: () => {
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
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
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
                <Text style={styles.teamIdLabel}>팀명</Text>
                <Text style={styles.teamIdValue}>
                  {joinWaitingItem.teamName}
                </Text>
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
      </SafeAreaView>
    </Modal>
  );
}
