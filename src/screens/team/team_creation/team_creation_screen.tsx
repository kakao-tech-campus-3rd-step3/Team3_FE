import { useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserInfo } from '@/src/hooks/queries';
import { createTeam, CreateTeamRequest } from '@/src/api/team';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { styles } from './team_creation_style';
import { theme } from '@/src/theme';

import Step1BasicInfo from './components/steps/step1_info';
import Step2TeamSettings from './components/steps/step2_team_setting';
import Step3TeamDetails from './components/steps/step3_team_detail';
import Step4Confirmation from './components/steps/step4_team_confirmation';

interface TeamFormData {
  name: string;
  university: string;
  teamType: string;
  memberCount: number;
  skillLevel: string;
  description: string;
}

export default function TeamCreationScreen() {
  const router = useRouter();
  const { data: currentUser } = useUserInfo();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    university: '',
    teamType: '중앙동아리',
    memberCount: 0,
    skillLevel: '아마추어',
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
      if (!currentUser) {
        Alert.alert('오류', '로그인 정보를 찾을 수 없습니다.');
        return;
      }

      try {
        const apiData: CreateTeamRequest = {
          name: formData.name,
          description: formData.description,
          university: formData.university,
          skillLevel: formData.skillLevel,
          teamType: formData.teamType,
          memberCount: formData.memberCount,
        };
        await createTeam(apiData);

        Alert.alert('팀 생성 완료', '팀이 성공적으로 생성되었습니다!', [
          {
            text: '확인',
            onPress: () => router.back(),
          },
        ]);
      } catch (error) {
        Alert.alert(
          '오류',
          '팀 생성 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  };

  const updateFormData = (field: keyof TeamFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: nextStep,
      onBack: prevStep,
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
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
          <Step2TeamSettings
            teamType={formData.teamType}
            memberCount={formData.memberCount}
            onTeamTypeChange={type => updateFormData('teamType', type)}
            onMemberCountChange={count => updateFormData('memberCount', count)}
            {...stepProps}
          />
        );
      case 3:
        return (
          <Step3TeamDetails
            skillLevel={formData.skillLevel}
            description={formData.description}
            onSkillLevelChange={level => updateFormData('skillLevel', level)}
            onDescriptionChange={description =>
              updateFormData('description', description)
            }
            {...stepProps}
            errors={{
              description: errors.description,
            }}
          />
        );
      case 4:
        return (
          <Step4Confirmation
            formData={formData}
            onSubmit={handleSubmit}
            onBack={prevStep}
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
              { width: `${(currentStep / 4) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{currentStep} / 4</Text>
      </View>

      {renderCurrentStep()}
    </View>
  );
}
