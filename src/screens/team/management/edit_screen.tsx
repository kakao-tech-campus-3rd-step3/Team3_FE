import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';

import ActionSection from '@/src/components/team/sections/action_section';
import FormSection from '@/src/components/team/sections/form_section';
import InfoSection from '@/src/components/team/sections/info_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { useTeam, useUpdateTeamMutation } from '@/src/hooks/queries';
import { styles } from '@/src/screens/team/management/edit_styles';
import { colors } from '@/src/theme';
import {
  DEFAULT_SKILL_LEVEL,
  DEFAULT_TEAM_TYPE,
  SKILL_LEVELS,
  TEAM_TYPES,
} from '@/src/types/team';
import type { SkillLevel, TeamType } from '@/src/types/team';
import { handleApiError } from '@/src/utils/handle_api_error';

interface EditScreenProps {
  teamId: string | number;
}

export default function EditScreen({ teamId }: EditScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: team, isLoading } = useTeam(numericTeamId);
  const updateTeamMutation = useUpdateTeamMutation();

  const [formData, setFormData] = useState(() => {
    if (!team) {
      return {
        name: '',
        description: '',
        skillLevel: DEFAULT_SKILL_LEVEL as SkillLevel,
        teamType: DEFAULT_TEAM_TYPE as TeamType,
      };
    }
    return {
      name: team.name || '',
      description: team.description || '',
      skillLevel: (SKILL_LEVELS.includes(team.skillLevel as SkillLevel)
        ? team.skillLevel
        : DEFAULT_SKILL_LEVEL) as SkillLevel,
      teamType: (TEAM_TYPES.includes(team.teamType as TeamType)
        ? team.teamType
        : DEFAULT_TEAM_TYPE) as TeamType,
    };
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.grass[500]} />
      </View>
    );
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
    Alert.alert('팀 정보 수정', '팀 정보를 수정하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '수정',
        onPress: () => {
          updateTeamMutation.mutateAsync(
            {
              teamId: numericTeamId,
              data: {
                name: formData.name.trim(),
                description: formData.description.trim(),
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
                handleApiError(error);
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

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <InfoSection />
          <FormSection formData={formData} updateFormData={updateFormData} />
          <ActionSection onSave={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}
