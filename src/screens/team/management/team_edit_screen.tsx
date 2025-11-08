import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import ActionSection from '@/src/components/team/sections/action_section';
import FormSection from '@/src/components/team/sections/form_section';
import InfoSection from '@/src/components/team/sections/info_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeam, useUpdateTeamMutation } from '@/src/hooks/queries';
import { styles } from '@/src/screens/team/management/team_edit_styles';
import { colors } from '@/src/theme';
import {
  DEFAULT_SKILL_LEVEL,
  DEFAULT_TEAM_TYPE,
  SKILL_LEVELS,
  TEAM_TYPES,
} from '@/src/types/team';
import type { SkillLevel, TeamType } from '@/src/types/team';

interface TeamEditScreenProps {
  teamId: string | number;
}

export default function TeamEditScreen({ teamId }: TeamEditScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skillLevel: DEFAULT_SKILL_LEVEL,
    teamType: DEFAULT_TEAM_TYPE,
  });

  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);
  const updateTeamMutation = useUpdateTeamMutation();

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        description: team.description || '',
        skillLevel: (SKILL_LEVELS.includes(team.skillLevel as SkillLevel)
          ? team.skillLevel
          : DEFAULT_SKILL_LEVEL) as SkillLevel,
        teamType: (TEAM_TYPES.includes(team.teamType as TeamType)
          ? team.teamType
          : DEFAULT_TEAM_TYPE) as TeamType,
      });
    }
  }, [team]);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 정보 수정" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 정보 수정" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  const handleRefresh = async () => {
    await refetch();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.grass[500]} />
      </View>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!team) {
    return (
      <View style={styles.container}>
        <Text>팀 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('오류', '팀명을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert('오류', '팀 설명을 입력해주세요.');
      return;
    }

    if (!team) {
      Alert.alert('오류', '팀 정보를 불러올 수 없습니다.');
      return;
    }

    Alert.alert('팀 정보 수정', '팀 정보를 수정하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '수정',
        onPress: () => {
          updateTeamMutation.mutate(
            {
              teamId: numericTeamId,
              data: {
                name: formData.name.trim(),
                description: formData.description.trim(),
                university: team.university,
                skillLevel: formData.skillLevel,
                teamType: formData.teamType,
              },
            },
            {
              onSuccess: () => {
                Alert.alert('성공', '팀 정보가 성공적으로 수정되었습니다.', [
                  {
                    text: '확인',
                    onPress: () => {
                      router.back();
                    },
                  },
                ]);
              },
              onError: error => {
                console.error('팀 수정 실패:', error);
                Alert.alert(
                  '오류',
                  '팀 정보 수정에 실패했습니다. 다시 시도해주세요.'
                );
              },
            }
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 정보 수정" />

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.contentContainer}>
          <InfoSection />
          <FormSection formData={formData} updateFormData={updateFormData} />
          <ActionSection onSave={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}
