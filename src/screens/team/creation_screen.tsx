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

import TeamBasicInfo from '@/src/components/team/steps/team_basic_info';
import TeamDetails from '@/src/components/team/steps/team_details';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { useCreateTeamMutation } from '@/src/hooks/queries';
import { useTeamCreationForm } from '@/src/hooks/team/useTeamCreationForm';
import { styles } from '@/src/screens/team/creation_style';
import { theme } from '@/src/theme';
import { SkillLevel } from '@/src/types/team';
import { handleApiError } from '@/src/utils/handle_api_error';

interface CreationScreenProps {
  initialUniversity?: string;
}

export default function CreationScreen({
  initialUniversity,
}: CreationScreenProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, errors, updateFormData, validateForm } =
    useTeamCreationForm(initialUniversity);

  const { mutateAsync: createTeam } = useCreateTeamMutation();

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await createTeam(formData);

        Alert.alert('팀 생성 완료', response.message, [
          {
            text: '확인',
            onPress: () => {
              router.replace(ROUTES.HOME);
            },
          },
        ]);
      } catch (error: unknown) {
        handleApiError(error);
      }
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
            onUniversityChange={() => {}}
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
