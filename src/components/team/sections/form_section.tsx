import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/form_section_styles';
import type { SkillLevel, TeamType } from '@/src/types/team';

interface FormSectionProps {
  formData: {
    name: string;
    description: string;
    skillLevel: SkillLevel;
    teamType: TeamType;
  };
  updateFormData: (field: string, value: string) => void;
}

export default function FormSection({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>팀 정보</Text>

      <View style={styles.formCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>팀명 *</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={value => updateFormData('name', value)}
            placeholder="팀명을 입력하세요"
            maxLength={50}
          />
          <Text style={styles.inputCounter}>{formData.name.length}/50</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>팀 설명 *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={formData.description}
            onChangeText={value => updateFormData('description', value)}
            placeholder="팀에 대한 설명을 입력하세요"
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          <Text style={styles.inputCounter}>
            {formData.description.length}/500
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>실력 수준</Text>
          <View style={styles.radioGroup}>
            {(['아마추어', '세미프로', '프로'] as SkillLevel[]).map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioOption,
                  formData.skillLevel === level && styles.radioOptionSelected,
                ]}
                onPress={() => updateFormData('skillLevel', level)}
              >
                <View style={styles.radioCircle}>
                  {formData.skillLevel === level && (
                    <View style={styles.radioCircleInner} />
                  )}
                </View>
                <Text
                  style={[
                    styles.radioText,
                    formData.skillLevel === level && styles.radioTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>팀 유형</Text>
          <View style={styles.radioGroup}>
            {(['중앙동아리', '과동아리', '기타'] as TeamType[]).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.radioOption,
                  formData.teamType === type && styles.radioOptionSelected,
                ]}
                onPress={() => updateFormData('teamType', type)}
              >
                <View style={styles.radioCircle}>
                  {formData.teamType === type && (
                    <View style={styles.radioCircleInner} />
                  )}
                </View>
                <Text
                  style={[
                    styles.radioText,
                    formData.teamType === type && styles.radioTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
