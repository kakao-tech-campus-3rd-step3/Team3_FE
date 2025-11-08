import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { styles } from '@/src/screens/team/creation/team_creation_style';
import { colors } from '@/src/theme';
import { TeamType, TEAM_TYPES } from '@/src/types/team';

interface TeamBasicInfoProps {
  teamName: string;
  university: string;
  teamType: TeamType;
  onTeamNameChange: (name: string) => void;
  onUniversityChange: (university: string) => void;
  onTeamTypeChange: (type: TeamType) => void;
  onNext: () => void;
  onBack: () => void;
  errors: {
    name?: string;
    university?: string;
    teamType?: string;
  };
}

export default function TeamBasicInfo({
  teamName,
  university,
  teamType,
  onTeamNameChange,
  onUniversityChange,
  onTeamTypeChange,
  onNext,
  onBack,
  errors,
}: TeamBasicInfoProps) {
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    stepTitle: {
      fontSize: Math.max(20, width * 0.06),
      fontWeight: 'bold',
      color: colors.text.main,
      textAlign: 'center',
      marginBottom: Math.max(8, width * 0.02),
    },
    stepSubtitle: {
      fontSize: Math.max(14, width * 0.04),
      color: colors.text.sub,
      textAlign: 'center',
      lineHeight: Math.max(20, width * 0.05),
    },
    inputLabel: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: colors.text.main,
      marginBottom: Math.max(8, width * 0.02),
    },
    stepTextInput: {
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: Math.max(8, width * 0.02),
      paddingHorizontal: Math.max(16, width * 0.04),
      paddingVertical: Math.max(12, width * 0.03),
      fontSize: Math.max(16, width * 0.045),
      backgroundColor: colors.background.sub,
    },
    stepSelectorButton: {
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: Math.max(8, width * 0.02),
      paddingVertical: Math.max(12, width * 0.03),
      paddingHorizontal: Math.max(16, width * 0.04),
      marginBottom: Math.max(12, width * 0.03),
      backgroundColor: colors.background.sub,
    },
    stepSelectorButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: colors.text.sub,
      textAlign: 'center',
    },
    nextButton: {
      backgroundColor: colors.blue[500],
      borderRadius: Math.max(8, width * 0.02),
      paddingVertical: Math.max(12, width * 0.03),
      paddingHorizontal: Math.max(20, width * 0.05),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: Math.max(100, width * 0.25),
    },
    nextButtonText: {
      color: colors.white,
      fontSize: Math.max(16, width * 0.045),
      fontWeight: '600',
      marginRight: Math.max(8, width * 0.02),
    },
  });

  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100 &&
    teamType.length > 0;

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={dynamicStyles.stepTitle}>팀 기본 정보를 입력해주세요</Text>
        <Text style={dynamicStyles.stepSubtitle}>
          팀의 이름과 소속 대학교를 알려주세요
        </Text>
      </View>

      <View style={styles.stepContent}>
        <View style={styles.inputContainer}>
          <Text style={dynamicStyles.inputLabel}>팀 이름 *</Text>
          <TextInput
            style={[
              dynamicStyles.stepTextInput,
              errors.name && styles.textInputError,
            ]}
            value={teamName}
            onChangeText={onTeamNameChange}
            placeholder="예: 강원대 3팀"
            maxLength={100}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={dynamicStyles.inputLabel}>대학교 *</Text>
          <View
            style={[
              styles.dropdownButton,
              styles.readOnlyField,
              errors.university && styles.textInputError,
            ]}
          >
            <Text
              style={[
                styles.dropdownButtonText,
                styles.readOnlyText,
                !university && styles.placeholderText,
              ]}
            >
              {university || '대학교 정보를 불러오는 중...'}
            </Text>
            <Ionicons name="lock-closed" size={20} color={colors.gray[400]} />
          </View>
          {errors.university && (
            <Text style={styles.errorText}>{errors.university}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={dynamicStyles.inputLabel}>팀 유형 *</Text>
          <View style={styles.selectorContainer}>
            {TEAM_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  dynamicStyles.stepSelectorButton,
                  teamType === type && styles.stepSelectorButtonActive,
                ]}
                onPress={() => onTeamTypeChange(type)}
              >
                <Text
                  style={[
                    dynamicStyles.stepSelectorButtonText,
                    teamType === type && styles.stepSelectorButtonTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.teamType && (
            <Text style={styles.errorText}>{errors.teamType}</Text>
          )}
        </View>
      </View>

      <View style={[styles.stepFooter, { justifyContent: 'flex-end' }]}>
        <TouchableOpacity
          style={[
            dynamicStyles.nextButton,
            !isValid && styles.nextButtonDisabled,
          ]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={dynamicStyles.nextButtonText}>다음</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
