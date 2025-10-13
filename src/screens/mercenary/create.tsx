import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNIVERSITIES } from '@/src/constants/universities';
import { theme } from '@/src/theme';

const MercenaryProfileCreateScreen: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [university, setUniversity] = useState('');
  const [position, setPosition] = useState('');
  const [level, setLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [feeCondition, setFeeCondition] = useState('');
  const [intro, setIntro] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const genders = ['남', '여'];
  const positions = ['FW', 'MF', 'DF', 'GK'];
  const skillLevels = ['아마추어', '세미프로', '프로'];
  const feeConditions = ['무료', '참가비 지불 가능', '교통비 지원 필요'];

  // 이미지 선택
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '사진 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 등록 버튼
  const handleSubmit = () => {
    if (!nickname || !position || !level || !region) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }
    const formData = {
      nickname,
      age,
      gender,
      region,
      position,
      level,
      experience,
      availableTime,
      feeCondition,
      intro,
      imageUri,
    };
    console.log('용병 프로필:', formData);
    Alert.alert('등록 완료', '용병 프로필이 저장되었습니다.', [
      { text: '확인', onPress: () => router.back() },
    ]);
    // 여기서 API POST 호출
  };

  // 필수 요소 검증
  const isFormValid = () => {
    return (
      nickname.trim() !== '' &&
      position.trim() !== '' &&
      level.trim() !== '' &&
      region.trim() !== '' &&
      university.trim() !== ''
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.text.main} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>용병 프로필 등록</Text>
      <View style={styles.headerRight} />
    </View>
  );

  const renderFormSection = (
    title: string,
    icon: keyof typeof Ionicons.glyphMap,
    children: React.ReactNode,
    isLast = false
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color={theme.colors.brand.main} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>{children}</View>
      {!isLast && <View style={styles.sectionDivider} />}
    </View>
  );

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    required = false,
    multiline = false,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <View
          style={[styles.inputContainer, multiline && styles.textAreaContainer]}
        >
          <TextInput
            style={[styles.input, multiline && styles.textArea]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text.sub}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    );
  };

  const renderSelectButtons = (
    label: string,
    options: string[],
    selectedValue: string,
    onSelect: (value: string) => void,
    required = false
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.buttonGroup}>
        {options.map((option: string) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectButton,
              selectedValue === option && styles.selectButtonActive,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.selectButtonText,
                selectedValue === option && styles.selectButtonTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 기본 정보 섹션 */}
        {renderFormSection(
          '기본 정보',
          'person-outline',
          <>
            {renderInput(
              '닉네임',
              nickname,
              setNickname,
              '닉네임을 입력하세요',
              true
            )}
            {renderInput(
              '나이',
              age,
              setAge,
              '나이를 입력하세요',
              false,
              false,
              'numeric'
            )}
            {renderSelectButtons('성별', genders, gender, setGender, false)}
            {renderInput('활동 지역', region, setRegion, '예: 춘천시', true)}
          </>,
          false
        )}

        {/* 축구 정보 섹션 */}
        {renderFormSection(
          '축구 정보',
          'football-outline',
          <>
            {renderSelectButtons(
              '포지션',
              positions,
              position,
              setPosition,
              true
            )}
            {renderSelectButtons(
              '실력 수준',
              skillLevels,
              level,
              setLevel,
              true
            )}
            {renderInput(
              '경력(년수)',
              experience,
              setExperience,
              '예: 5',
              false,
              false,
              'numeric'
            )}
          </>,
          false
        )}

        {/* 추가 정보 섹션 */}
        {renderFormSection(
          '추가 정보',
          'settings-outline',
          <>
            {renderSelectButtons(
              '대학교',
              UNIVERSITIES.map(u => u.name),
              university,
              setUniversity,
              true
            )}
            {renderInput(
              '가능 요일 / 시간대',
              availableTime,
              setAvailableTime,
              '예: 주말 오후',
              false
            )}
            {renderSelectButtons(
              '참가비 조건',
              feeConditions,
              feeCondition,
              setFeeCondition,
              false
            )}
            {renderInput(
              '자기소개',
              intro,
              setIntro,
              '경기 스타일, 장점 등을 입력하세요',
              false,
              true
            )}
          </>,
          false
        )}

        {/* 프로필 사진 섹션 */}
        {renderFormSection(
          '프로필 사진',
          'camera-outline',
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {imageUri ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.selectedImage}
                />
                <View style={styles.imageOverlay}>
                  <Ionicons name="camera" size={24} color="white" />
                  <Text style={styles.imageOverlayText}>변경</Text>
                </View>
              </View>
            ) : (
              <View style={styles.imagePickerContent}>
                <View style={styles.imagePickerIcon}>
                  <Ionicons
                    name="camera-outline"
                    size={32}
                    color={theme.colors.brand.main}
                  />
                </View>
                <Text style={styles.imagePickerTitle}>프로필 사진 추가</Text>
                <Text style={styles.imagePickerSubtitle}>
                  사진을 선택해주세요
                </Text>
              </View>
            )}
          </TouchableOpacity>,
          true
        )}

        {/* 제출 버튼 */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={isFormValid() ? 'white' : theme.colors.text.sub}
          />
          <Text
            style={[
              styles.submitText,
              !isFormValid() && styles.submitTextDisabled,
            ]}
          >
            용병 프로필 등록
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MercenaryProfileCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing8,
  },
  section: {
    marginBottom: theme.spacing.spacing8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginLeft: theme.spacing.spacing2,
  },
  sectionContent: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing6,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginTop: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing2,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing6,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  required: {
    color: theme.colors.error[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    paddingHorizontal: theme.spacing.spacing4,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: theme.colors.brand.main,
    borderWidth: 2,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.spacing4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.main,
    paddingVertical: theme.spacing.spacing2,
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing2,
  },
  selectButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing6,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    backgroundColor: theme.colors.background.main,
  },
  selectButtonActive: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  selectButtonTextActive: {
    color: 'white',
  },
  imagePicker: {
    borderRadius: theme.spacing.spacing4,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imagePickerContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
    paddingHorizontal: theme.spacing.spacing6,
  },
  imagePickerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.brand.main + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  imagePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  imagePickerSubtitle: {
    fontSize: 14,
    color: theme.colors.text.sub,
  },
  imageContainer: {
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlayText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginTop: theme.spacing.spacing1,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    marginTop: theme.spacing.spacing6,
    shadowColor: theme.colors.brand.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: theme.spacing.spacing2,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.border.light,
    opacity: 0.7,
    shadowOpacity: 0.1,
  },
  submitTextDisabled: {
    color: theme.colors.text.sub,
  },
});
