import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import TeamDetails from '@/src/components/team/steps/team_details';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { useCreateTeamMutation } from '@/src/hooks/queries';
import TeamBasicInfo from '@/src/screens/team/creation/components/steps/team_basic_info';
import { styles } from '@/src/screens/team/creation/team_creation_style';
import { theme } from '@/src/theme';
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
  skillLevel: SkillLevel;
  description: string;
}

interface TeamCreationScreenProps {
  initialUniversity?: string;
}

export default function TeamCreationScreen({
  initialUniversity,
}: TeamCreationScreenProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    university: initialUniversity || '',
    teamType: DEFAULT_TEAM_TYPE,
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

    if (!formData.teamType.trim()) {
      newErrors.teamType = '팀 유형을 선택해주세요';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = '팀 설명은 1000자 이하로 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createTeamMutation = useCreateTeamMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await createTeamMutation.mutateAsync(formData);

        Alert.alert('팀 생성 완료', response.message, [
          {
            text: '확인',
            onPress: () => {
              router.replace(ROUTES.HOME);
            },
          },
        ]);
      } catch (error) {
        console.error('팀 생성 실패:', error);
        Alert.alert('오류', '팀 생성에 실패했습니다.');
      }
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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
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
            teamType={formData.teamType}
            onTeamNameChange={name => updateFormData('name', name)}
            onUniversityChange={() => {}} // 대학교는 수정 불가
            onTeamTypeChange={type => updateFormData('teamType', type)}
            {...stepProps}
            errors={{
              name: errors.name,
              university: errors.university,
              teamType: errors.teamType,
            }}
          />
        );
      case 2:
        return (
          <TeamDetails
            skillLevel={formData.skillLevel}
            description={formData.description}
            onSkillLevelChange={(level: SkillLevel) =>
              updateFormData('skillLevel', level)
            }
            onDescriptionChange={(description: string) =>
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                { width: `${(currentStep / 2) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{currentStep} / 2</Text>
        </View>

        {renderCurrentStep()}
      </View>
    </TouchableWithoutFeedback>
  );
}
