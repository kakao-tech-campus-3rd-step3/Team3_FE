import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from '@/src/components/team/steps/team_details_styles';
import { colors } from '@/src/theme';
import { SkillLevel, SKILL_LEVELS } from '@/src/types/team';

interface TeamDetailsProps {
  skillLevel: SkillLevel;
  description: string;
  onSkillLevelChange: (level: SkillLevel) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  errors: {
    description?: string;
  };
}

export default function TeamDetails({
  skillLevel,
  description,
  onSkillLevelChange,
  onDescriptionChange,
  onSubmit,
  onBack,
  errors,
}: TeamDetailsProps) {
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
    stepTextArea: {
      borderWidth: 1,
      borderColor: colors.border.light,
      borderRadius: Math.max(8, width * 0.02),
      paddingHorizontal: Math.max(16, width * 0.04),
      paddingVertical: Math.max(12, width * 0.03),
      fontSize: Math.max(14, width * 0.04),
      backgroundColor: colors.background.sub,
      minHeight: Math.max(120, width * 0.3),
      textAlignVertical: 'top',
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
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Math.max(12, width * 0.03),
      paddingHorizontal: Math.max(20, width * 0.05),
      borderRadius: Math.max(8, width * 0.02),
      borderWidth: 1,
      borderColor: colors.gray[300],
      backgroundColor: colors.white,
    },
    backButtonText: {
      fontSize: Math.max(16, width * 0.045),
      fontWeight: '600',
      color: colors.gray[600],
      marginLeft: Math.max(8, width * 0.02),
    },
    nextButton: {
      backgroundColor: colors.blue[500],
      borderRadius: Math.max(8, width * 0.02),
      paddingVertical: Math.max(11, width * 0.028),
      paddingHorizontal: Math.max(16, width * 0.04),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: Math.max(100, width * 0.22),
    },
    nextButtonText: {
      color: colors.white,
      fontSize: Math.max(16, width * 0.045),
      fontWeight: '600',
      marginLeft: Math.max(8, width * 0.02),
    },
    characterCount: {
      fontSize: Math.max(12, width * 0.035),
      color: colors.text.sub,
      textAlign: 'right',
      marginTop: Math.max(4, width * 0.01),
    },
  });
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <Text style={dynamicStyles.stepTitle}>
            팀 상세 정보를 입력해주세요
          </Text>
          <Text style={dynamicStyles.stepSubtitle}>
            팀의 실력 수준과 설명을 작성해주세요
          </Text>
        </View>

        <View style={styles.stepContent}>
          <View style={styles.inputContainer}>
            <Text style={dynamicStyles.inputLabel}>팀 실력 *</Text>
            <View style={styles.selectorContainer}>
              {SKILL_LEVELS.map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    dynamicStyles.stepSelectorButton,
                    skillLevel === level && styles.stepSelectorButtonActive,
                  ]}
                  onPress={() => onSkillLevelChange(level)}
                >
                  <Text
                    style={[
                      dynamicStyles.stepSelectorButtonText,
                      skillLevel === level &&
                        styles.stepSelectorButtonTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={dynamicStyles.inputLabel}>팀 설명</Text>
            <TextInput
              style={[
                dynamicStyles.stepTextArea,
                errors.description && styles.textInputError,
              ]}
              value={description}
              onChangeText={onDescriptionChange}
              placeholder="팀의 목표, 활동 내용, 모집 조건 등을 자유롭게 작성해주세요"
              multiline
              numberOfLines={4}
              maxLength={1000}
              textAlignVertical="top"
            />
            <Text style={dynamicStyles.characterCount}>
              {description.length}/1000
            </Text>
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>
        </View>

        <View style={styles.stepFooter}>
          <TouchableOpacity style={dynamicStyles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.gray[600]} />
            <Text style={dynamicStyles.backButtonText}>이전</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              dynamicStyles.nextButton,
              !description.trim() && { opacity: 0.5 },
            ]}
            onPress={onSubmit}
            disabled={!description.trim()}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            <Text style={dynamicStyles.nextButtonText}> 팀 생성</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
