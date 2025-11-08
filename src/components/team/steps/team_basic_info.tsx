import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

import { styles } from '@/src/components/team/steps/team_basic_info_styles';
import { UNIVERSITIES } from '@/src/constants/universities';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100 &&
    teamType.length > 0;

  const handleUniversitySelect = (selectedUniversity: string) => {
    onUniversityChange(selectedUniversity);
    setIsDropdownOpen(false);
  };

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
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              errors.university && styles.textInputError,
            ]}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text
              style={[
                styles.dropdownButtonText,
                !university && styles.placeholderText,
              ]}
            >
              {university || '대학교를 선택해주세요'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
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

      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>대학교 선택</Text>
              <TouchableOpacity onPress={() => setIsDropdownOpen(false)}>
                <Ionicons name="close" size={24} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={UNIVERSITIES}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    university === item.name && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleUniversitySelect(item.name)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      university === item.name &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {university === item.name && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.blue[500]}
                    />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
