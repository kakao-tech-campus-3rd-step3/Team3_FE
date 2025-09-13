import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../team_creation_style';

const GANGWON_UNIVERSITIES = [
  '가톨릭관동대학교',
  '강릉원주대학교',
  '강원과학기술대학교',
  '강원관광대학교',
  '강원도립대학교',
  '강원대학교',
  '상지대학교',
  '연세대학교 원주캠퍼스',
  '춘천교육대학교',
  '한국교통대학교',
  '한국폴리텍대학 강원캠퍼스',
  '한림대학교',
  '기타',
];

interface Step1Props {
  teamName: string;
  university: string;
  onTeamNameChange: (name: string) => void;
  onUniversityChange: (university: string) => void;
  onNext: () => void;
  errors: {
    name?: string;
    university?: string;
  };
}

export default function Step1BasicInfo({
  teamName,
  university,
  onTeamNameChange,
  onUniversityChange,
  onNext,
  errors,
}: Step1Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isValid =
    teamName.trim().length > 0 &&
    teamName.length <= 100 &&
    university.trim().length > 0 &&
    university.length <= 100;

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
            placeholder="예: 축구왕팀"
            maxLength={100}
            autoFocus
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
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          {errors.university && (
            <Text style={styles.errorText}>{errors.university}</Text>
          )}
        </View>
      </View>

      <View style={styles.stepFooter}>
        <View style={styles.footerSpacer} />

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>다음</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={GANGWON_UNIVERSITIES}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    university === item && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleUniversitySelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      university === item && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {university === item && (
                    <Ionicons name="checkmark" size={20} color="#4A9EFF" />
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
