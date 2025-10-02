import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { memo, useState, useCallback } from 'react';
import { TouchableOpacity, Text, View, Modal } from 'react-native';

import { useMyJoinWaitingList } from '@/src/hooks/useTeamJoinRequest';
import { colors } from '@/src/theme';

import { styles } from '../../team_guide_styles';
import JoinWaitingList from '../join_waiting_list';

export default memo(function Buttons() {
  const router = useRouter();
  const [showJoinWaitingList, setShowJoinWaitingList] = useState(false);

  // 사용자의 팀 가입 신청 목록을 확인하여 신청이 있는지 체크
  const { data: joinWaitingData, refetch } = useMyJoinWaitingList(0, 1);
  const hasJoinWaiting = joinWaitingData && !joinWaitingData.empty;

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleJoinTeam = () => {
    if (hasJoinWaiting) {
      setShowJoinWaitingList(true);
    } else {
      router.push('/team/join-university');
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinTeam}>
        <Ionicons name="people-outline" size={24} color={colors.blue[500]} />
        <Text style={styles.joinButtonText}>
          {hasJoinWaiting ? '팀 신청 현황' : '팀 참여하기'}
        </Text>
        {hasJoinWaiting && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>
              {joinWaitingData?.totalElements || 0}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/team/creation')}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color={colors.text.white}
        />
        <Text style={styles.createButtonText}>팀 생성하기</Text>
      </TouchableOpacity>

      <Modal
        visible={showJoinWaitingList}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <JoinWaitingList onClose={() => setShowJoinWaitingList(false)} />
      </Modal>
    </View>
  );
});
