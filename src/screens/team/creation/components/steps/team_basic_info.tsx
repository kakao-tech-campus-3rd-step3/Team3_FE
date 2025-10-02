import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { colors } from '@/src/theme';
import { TeamType, TEAM_TYPES } from '@/src/types/team';

import { styles } from '../../team_creation_style';

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
  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100 &&
    teamType.length > 0;

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>팀 기본 정보를 입력해주세요</Text>
        <Text style={styles.stepSubtitle}>
          팀의 이름과 소속 대학교를 알려주세요
        </Text>
      </View>

      <View style={styles.stepContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>팀 이름 *</Text>
          <TextInput
            style={[styles.stepTextInput, errors.name && styles.textInputError]}
            value={teamName}
            onChangeText={onTeamNameChange}
            placeholder="예: 강원대 3팀"
            maxLength={100}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>대학교 *</Text>
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
          <Text style={styles.inputLabel}>팀 유형 *</Text>
          <View style={styles.selectorContainer}>
            {TEAM_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.stepSelectorButton,
                  teamType === type && styles.stepSelectorButtonActive,
                ]}
                onPress={() => onTeamTypeChange(type)}
              >
                <Text
                  style={[
                    styles.stepSelectorButtonText,
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
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>다음</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
