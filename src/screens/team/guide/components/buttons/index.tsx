import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { memo, useState, useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { useUserProfile } from '@/src/hooks/queries';
import { useMyJoinWaitingList } from '@/src/hooks/useTeamJoinRequest';
import { colors } from '@/src/theme';

import { styles } from '../../team_guide_styles';
import JoinWaitingList from '../join_waiting_list';

export default memo(function Buttons() {
  const router = useRouter();
  const [showJoinWaitingList, setShowJoinWaitingList] = useState(false);
  const { data: userProfile } = useUserProfile();
  const { width } = useWindowDimensions();

  const {
    data: joinWaitingData,
    isLoading: isJoinWaitingLoading,
    refetch,
  } = useMyJoinWaitingList(0, 1);
  const hasJoinWaiting = joinWaitingData && !joinWaitingData.empty;

  const dynamicStyles = StyleSheet.create({
    createButton: {
      backgroundColor: colors.blue[500],
      borderRadius: Math.max(12, width * 0.03),
      paddingVertical: Math.max(12, width * 0.035),
      paddingHorizontal: Math.max(20, width * 0.05),
      flexDirection: 'row',
      marginBottom: Math.max(12, width * 0.03),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.blue[500],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    createButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: 'bold',
      color: colors.text.white,
      marginLeft: Math.max(8, width * 0.02),
      textAlign: 'center',
    },
    joinButton: {
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.blue[500],
      borderRadius: Math.max(12, width * 0.03),
      paddingVertical: Math.max(12, width * 0.035),
      paddingHorizontal: Math.max(20, width * 0.05),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: Math.max(8, width * 0.02),
    },
    joinButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: 'bold',
      color: colors.blue[500],
      marginLeft: Math.max(8, width * 0.02),
      textAlign: 'center',
    },
  });

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

  // 로딩 중일 때는 버튼들을 숨김
  if (isJoinWaitingLoading) {
    return (
      <View style={styles.buttonContainer}>
        <View style={[dynamicStyles.joinButton, { opacity: 0.5 }]}>
          <Ionicons name="people-outline" size={24} color={colors.blue[500]} />
          <Text
            style={dynamicStyles.joinButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            로딩 중...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={dynamicStyles.joinButton}
        onPress={handleJoinTeam}
      >
        <Ionicons name="people-outline" size={24} color={colors.blue[500]} />
        <Text
          style={dynamicStyles.joinButtonText}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
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

      {!hasJoinWaiting && (
        <TouchableOpacity
          style={dynamicStyles.createButton}
          onPress={() =>
            router.push({
              pathname: '/team/creation',
              params: { university: userProfile?.university || '' },
            })
          }
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.text.white}
          />
          <Text
            style={dynamicStyles.createButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            팀 생성하기
          </Text>
        </TouchableOpacity>
      )}

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
