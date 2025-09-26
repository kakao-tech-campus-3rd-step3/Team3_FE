import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import {
  useTeam,
  useTeamMembers,
  useTeamReviews,
  useHome,
} from '@/src/hooks/queries';

import TeamInfoCard from '../components/cards/team_info_card';
import TeamReviewsSection from '../components/cards/team_reviews_section';
import TeamMembersSection from '../components/sections/team_members_section';
import EmptyState from '../components/states/empty_state';
import LoadingState from '../components/states/loading_state';
import { styles } from '../styles/team_management_styles';

interface TeamManagementScreenProps {
  teamId: string | number;
}

export default function TeamManagementScreen({
  teamId,
}: TeamManagementScreenProps) {
  const numericTeamId = Number(teamId);
  const { data: homeData } = useHome();
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);
  const {
    data: teamMembers,
    isLoading: membersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useTeamMembers(numericTeamId);
  const {
    data: teamReviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useTeamReviews(numericTeamId);

  if (isLoading || membersLoading || reviewsLoading) {
    return <LoadingState />;
  }

  if (error || membersError || reviewsError) {
    return (
      <EmptyState
        icon="❌"
        title="팀 관리"
        subtitle="팀 정보를 불러올 수 없습니다"
        description="네트워크 연결을 확인하고\n다시 시도해주세요."
        showRetryButton
        onRetry={() => refetch()}
      />
    );
  }

  const currentUserName = homeData?.user?.name;
  const currentUserMember = Array.isArray(teamMembers)
    ? teamMembers.find(member => member.user?.name === currentUserName)
    : undefined;
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  if (!team || teamMembers === undefined || teamReviews === undefined) {
    return (
      <EmptyState
        icon="🔍"
        title="팀 관리"
        subtitle="팀을 찾을 수 없습니다"
        description="요청하신 팀이 존재하지 않거나\n접근 권한이 없습니다."
      />
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 정보" />

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || membersLoading || reviewsLoading}
            onRefresh={() => {
              refetch();
              refetchMembers();
              refetchReviews();
            }}
          />
        }
      >
        <View style={styles.contentContainer}>
          <TeamInfoCard team={team} canManageTeam={canManageTeam} />
          <TeamMembersSection
            teamMembers={teamMembers}
            membersLoading={membersLoading}
          />
          <TeamReviewsSection
            teamReviews={teamReviews}
            reviewsLoading={reviewsLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
