import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { ROUTES } from '@/src/constants/routes';
import {
  useTeamsByUniversityInfinite,
  useUserProfile,
  useTeamJoinRequestMutation,
} from '@/src/hooks/queries';
import JoinConfirmationModal from '@/src/screens/team/join/components/join_confirmation_modal';
import TeamCard from '@/src/screens/team/join/components/team_card';
import TeamListHeader from '@/src/screens/team/join/components/team_list_header';
import { styles } from '@/src/screens/team/join/university_team_list_style';
import { theme } from '@/src/theme';
import type { TeamListItem } from '@/src/types';

export default function UniversityTeamListScreen() {
  const { university } = useLocalSearchParams<{ university: string }>();
  const { data: userProfile } = useUserProfile();

  const userUniversity = userProfile?.university || university;

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamListItem | null>(null);
  const joinModalAnim = useState(new Animated.Value(0))[0];

  const { joinWaiting } = useTeamJoinRequestMutation();

  const {
    data,
    isLoading: loading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useTeamsByUniversityInfinite(userUniversity || '', 10);

  const allTeams = data?.pages.flatMap((page: any) => page.content) ?? [];

  const loadMoreTeams = () => {
    if (hasNextPage && !loading) {
      fetchNextPage();
    }
  };

  const handleJoinTeam = (teamId: number) => {
    const team = allTeams.find(t => t.id === teamId);
    if (team) {
      setSelectedTeam(team);
      setShowJoinModal(true);
      Animated.timing(joinModalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleConfirmJoin = async () => {
    if (selectedTeam) {
      try {
        await joinWaiting({
          teamId: selectedTeam.id,
          data: {},
        });

        Animated.timing(joinModalAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowJoinModal(false);
          setSelectedTeam(null);

          Alert.alert(
            '팀 가입 신청완료',
            `${selectedTeam.name}에 성공적으로 신청되었습니다!`,
            [
              {
                text: '확인',
                onPress: () => {
                  router.push(ROUTES.TABS);
                },
              },
            ]
          );
        });
      } catch {
        Alert.alert(
          '신청 실패',
          '팀 가입 신청에 실패했습니다. 다시 시도해주세요.',
          [{ text: '확인' }]
        );
      }
    }
  };

  const handleCancelJoin = () => {
    Animated.timing(joinModalAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowJoinModal(false);
      setSelectedTeam(null);
    });
  };

  const renderTeamItem = ({ item }: { item: TeamListItem }) => (
    <TeamCard team={item} onJoin={handleJoinTeam} />
  );

  if (loading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.blue[500]} />
      </View>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error as Error} resetError={refetch} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.main}
      />

      <CustomHeader title="팀 목록" showBackButton={true} />

      <TeamListHeader university={userUniversity || ''} />

      <FlatList
        data={allTeams}
        renderItem={renderTeamItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.teamList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreTeams}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>팀이 없습니다.</Text>
          </View>
        )}
        ListFooterComponent={
          loading && data ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={theme.colors.blue[500]} />
            </View>
          ) : null
        }
      />

      {selectedTeam && (
        <JoinConfirmationModal
          visible={showJoinModal}
          teamName={selectedTeam.name}
          teamType={selectedTeam.teamType}
          teamId={selectedTeam.id}
          onConfirm={handleConfirmJoin}
          onCancel={handleCancelJoin}
          slideAnim={joinModalAnim}
        />
      )}
    </View>
  );
}
