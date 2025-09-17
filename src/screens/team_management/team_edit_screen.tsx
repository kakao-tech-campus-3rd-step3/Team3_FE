import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeam } from '@/src/hooks/queries';
import { colors } from '@/src/theme';
import type { SkillLevel, TeamType } from '@/src/types/team';

import ActionSection from './components/ActionSection';
import FormSection from './components/FormSection';
import InfoSection from './components/InfoSection';
import { styles } from './team_edit_styles';

interface TeamEditScreenProps {
  teamId: string | number;
}

export default function TeamEditScreen({ teamId }: TeamEditScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skillLevel: '아마추어' as SkillLevel,
    teamType: '중앙동아리' as TeamType,
  });

  const numericTeamId = Number(teamId);
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        description: team.description || '',
        skillLevel: (team.skillLevel as SkillLevel) || '아마추어',
        teamType: (team.teamType as TeamType) || '중앙동아리',
      });
    }
  }, [team]);

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

    Alert.alert('팀 정보 수정', '팀 정보를 수정하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '수정',
        onPress: () => {
          Alert.alert('알림', '팀 정보 수정 기능은 아직 구현 중입니다.');
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
