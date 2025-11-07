import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dropdown from '@/src/components/dropdown';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { ModalDatePicker } from '@/src/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/src/components/ui/modal_time_picker';
import {
  POSITION_OPTIONS,
  convertKoreanToPosition,
} from '@/src/constants/positions';
import {
  useCreateMercenaryRecruitment,
  useUserProfile,
} from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { RecruitmentCreateRequest } from '@/src/types';
import { formatDateForAPI, formatTimeForAPI } from '@/src/utils/date';
import { translateErrorMessage } from '@/src/utils/error_messages';

export default function MercenaryCreateScreen() {
  const { data: userProfile } = useUserProfile();
  const { createRecruitment, isCreating } = useCreateMercenaryRecruitment();

  const [matchDate, setMatchDate] = useState<Date>(new Date());
  const [matchTime, setMatchTime] = useState<Date>(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    return now;
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [recruitmentForm, setRecruitmentForm] =
    useState<RecruitmentCreateRequest>({
      teamId: userProfile?.teamId || 0,
      matchDate: '',
      matchTime: '',
      message: '',
      position: '',
      skillLevel: '',
    });

  const SKILL_LEVEL_OPTIONS = ['아마추어', '세미프로', '프로'] as const;

  const handleCreateRecruitment = () => {
    if (
      !recruitmentForm.message ||
      !recruitmentForm.position ||
      !recruitmentForm.skillLevel
    ) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (!userProfile?.teamId) {
      Alert.alert('팀 오류', '팀에 속해있지 않습니다.');
      return;
    }

    const formattedDate = formatDateForAPI(matchDate);
    const formattedTime = formatTimeForAPI(matchTime);
    const convertedPosition = convertKoreanToPosition(recruitmentForm.position);

    const recruitmentData: RecruitmentCreateRequest = {
      ...recruitmentForm,
      teamId: userProfile.teamId!,
      matchDate: formattedDate,
      matchTime: formattedTime,
      position: convertedPosition,
      skillLevel: recruitmentForm.skillLevel,
    };

    createRecruitment(recruitmentData, {
      onSuccess: () => {
        Alert.alert('성공', '용병 모집 게시글이 생성되었습니다.', [
          {
            text: '확인',
            onPress: () => router.back(),
          },
        ]);
      },
      onError: error => {
        let errorMessage = '용병 모집 게시글 생성에 실패했습니다.';
        if (error && typeof error === 'object' && 'message' in error) {
          const message = (error as any).message;
          if (message && typeof message === 'string') {
            errorMessage = translateErrorMessage(message, {
              endpoint: '/api/mercenaries/recruitments',
              method: 'POST',
            });
          }
        }

        Alert.alert('오류', errorMessage);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <CustomHeader title="용병 모집" showBackButton={true} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={80}
        >
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>매치 정보</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>매치 날짜</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeLabel}>날짜</Text>
                <Text style={styles.dateTimeValue} numberOfLines={1}>
                  {matchDate.toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    weekday: 'short',
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>매치 시간</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeLabel}>시간</Text>
                <Text style={styles.dateTimeValue} numberOfLines={1}>
                  {matchTime.toLocaleTimeString('ko-KR', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>용병 정보</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>포지션</Text>
              <Dropdown
                items={POSITION_OPTIONS}
                value={recruitmentForm.position || null}
                onChange={value =>
                  setRecruitmentForm(prev => ({ ...prev, position: value }))
                }
                placeholder="포지션을 선택하세요"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>실력 레벨</Text>
              <Dropdown
                items={SKILL_LEVEL_OPTIONS}
                value={recruitmentForm.skillLevel || null}
                onChange={value =>
                  setRecruitmentForm(prev => ({ ...prev, skillLevel: value }))
                }
                placeholder="실력 레벨을 선택하세요"
              />
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>모집 메시지</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="용병 모집에 대한 메시지를 작성해주세요"
              placeholderTextColor={theme.colors.text.sub}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={recruitmentForm.message}
              onChangeText={text =>
                setRecruitmentForm(prev => ({ ...prev, message: text }))
              }
            />
          </View>

          <TouchableOpacity
            style={[styles.createSubmitButton, isCreating && { opacity: 0.6 }]}
            onPress={handleCreateRecruitment}
            disabled={isCreating}
          >
            <Text style={styles.createSubmitButtonText}>
              {isCreating ? '생성 중...' : '용병 모집하기'}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <ModalDatePicker
        visible={showDatePicker}
        value={matchDate}
        onDateChange={setMatchDate}
        onClose={() => setShowDatePicker(false)}
        title="매치 날짜 선택"
      />

      <ModalTimePicker
        visible={showTimePicker}
        value={matchTime}
        onTimeChange={setMatchTime}
        onClose={() => setShowTimePicker(false)}
        title="매치 시간 선택"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  formSection: {
    marginBottom: theme.spacing.spacing6,
    marginTop: theme.spacing.spacing4,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  dateTimeButton: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    alignItems: 'center',
    minHeight: 60,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: theme.colors.brand.main,
    fontWeight: '600',
    marginBottom: theme.spacing.spacing1,
  },
  dateTimeValue: {
    fontSize: 16,
    color: theme.colors.text.main,
    fontWeight: '600',
  },
  textAreaInput: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: 16,
    color: theme.colors.text.main,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    minHeight: 100,
  },
  createSubmitButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: 16,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    marginVertical: theme.spacing.spacing6,
    shadowColor: theme.colors.brand.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createSubmitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
