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

import JoinConfirmationModal from '@/src/components/team/filters/join_confirmation_modal';
import TeamCard from '@/src/components/team/filters/team_card';
import TeamListHeader from '@/src/components/team/filters/team_list_header';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import {
  useTeamsByUniversityInfinite,
  useUserProfile,
  useJoinWaitingMutation,
} from '@/src/hooks/queries';
import { styles } from '@/src/screens/team/join_style';
import { theme } from '@/src/theme';
import type { TeamListItem, TeamListPageResponse } from '@/src/types';
import { handleApiError } from '@/src/utils/handle_api_error';

export default function JoinScreen() {
  const { university } = useLocalSearchParams<{ university: string }>();
  const { data: userProfile } = useUserProfile();

  const userUniversity = userProfile?.university || university;

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamListItem | null>(null);
  const joinModalAnim = useState(new Animated.Value(0))[0];

  const joinWaitingMutation = useJoinWaitingMutation();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useTeamsByUniversityInfinite(userUniversity || '', 10);

  const allTeams =
    data?.pages.flatMap((page: TeamListPageResponse) => page.content) ?? [];

  const loadMoreTeams = () => {
    if (hasNextPage && !isLoading) {
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
        await joinWaitingMutation.mutateAsync({
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
      } catch (error: unknown) {
        handleApiError(error);
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

  if (isLoading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.blue[500]} />
      </View>
    );
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
          isLoading && data ? (
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
