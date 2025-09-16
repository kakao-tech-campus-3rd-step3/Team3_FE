import { useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { styles } from './team_creation_style';
import { theme } from '@/src/theme';

import TeamBasicInfo from './components/steps/TeamBasicInfo';
import TeamSettings from './components/steps/TeamSettings';
import TeamDetails from './components/steps/TeamDetails';
import {
  TeamType,
  SkillLevel,
  DEFAULT_TEAM_TYPE,
  DEFAULT_SKILL_LEVEL,
} from '@/src/types/team';

interface TeamFormData {
  name: string;
  university: string;
  teamType: TeamType;
  memberCount: number;
  skillLevel: SkillLevel;
  description: string;
}

export default function TeamCreationScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    university: '',
    teamType: DEFAULT_TEAM_TYPE,
    memberCount: 0,
    skillLevel: DEFAULT_SKILL_LEVEL,
    description: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TeamFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TeamFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '팀 이름을 입력해주세요';
    } else if (formData.name.length > 100) {
      newErrors.name = '팀 이름은 100자 이하로 입력해주세요';
    }

    if (!formData.university.trim()) {
      newErrors.university = '대학교를 입력해주세요';
    } else if (formData.university.length > 100) {
      newErrors.university = '대학교명은 100자 이하로 입력해주세요';
    }

    if (formData.memberCount < 0) {
      newErrors.memberCount = '멤버 수는 0명 이상이어야 합니다';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = '팀 설명은 1000자 이하로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      Alert.alert('팀 생성 완료', '팀이 성공적으로 생성되었습니다!', [
        {
          text: '확인',
          onPress: () => router.push('/'),
        },
      ]);
    }
  };

  const updateFormData = <Key extends keyof TeamFormData>(
    field: Key,
    value: TeamFormData[Key]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: nextStep,
      onBack: prevStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <TeamBasicInfo
            teamName={formData.name}
            university={formData.university}
            onTeamNameChange={name => updateFormData('name', name)}
            onUniversityChange={university =>
              updateFormData('university', university)
            }
            {...stepProps}
            errors={{
              name: errors.name,
              university: errors.university,
            }}
          />
        );
      case 2:
        return (
          <TeamSettings
            teamType={formData.teamType}
            memberCount={formData.memberCount}
            onTeamTypeChange={type => updateFormData('teamType', type)}
            onMemberCountChange={count => updateFormData('memberCount', count)}
            {...stepProps}
          />
        );
      case 3:
        return (
          <TeamDetails
            skillLevel={formData.skillLevel}
            description={formData.description}
            onSkillLevelChange={level => updateFormData('skillLevel', level)}
            onDescriptionChange={description =>
              updateFormData('description', description)
            }
            onSubmit={handleSubmit}
            {...stepProps}
            errors={{
              description: errors.description,
            }}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.main}
      />

      <CustomHeader title="팀 생성" showBackButton={true} />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / 3) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{currentStep} / 3</Text>
      </View>

      {renderCurrentStep()}
    </View>
  );
}
