import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomHeader } from '@/src/components/ui/custom_header';
import DateTimeSection from '@/src/components/ui/date_time_section';
import DropdownSection from '@/src/components/ui/dropdown_section';
import { ModalDatePicker } from '@/src/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/src/components/ui/modal_time_picker';
import TextInputSection from '@/src/components/ui/text_input_section';
import { POSITION_OPTIONS } from '@/src/constants/positions';
import { useMercenaryEdit } from '@/src/hooks/mercenary/useMercenaryEdit';

import { styles } from './edit_styles';

export default function MercenaryEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recruitmentId = id ? parseInt(id, 10) : 0;

  const {
    recruitment,
    isLoading,
    matchDate,
    setMatchDate,
    matchTime,
    setMatchTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    recruitmentForm,
    setRecruitmentForm,
    handleUpdateRecruitment,
    isUpdating,
  } = useMercenaryEdit(recruitmentId);

  if (isLoading) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <CustomHeader title="용병 모집 수정" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!recruitment) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <CustomHeader title="용병 모집 수정" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>게시글을 불러올 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <CustomHeader title="용병 모집 수정" showBackButton={true} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={80}
        >
          <DateTimeSection
            title="매치 정보"
            dateLabel="매치 날짜"
            timeLabel="매치 시간"
            date={matchDate}
            time={matchTime}
            onDatePress={() => setShowDatePicker(true)}
            onTimePress={() => setShowTimePicker(true)}
          />

          <DropdownSection
            title="용병 정보"
            fields={[
              {
                label: '포지션',
                value: recruitmentForm.position || null,
                options: POSITION_OPTIONS.map(pos => ({
                  label: pos,
                  value: pos,
                })),
                placeholder: '포지션을 선택하세요',
                onChange: value =>
                  setRecruitmentForm(prev => ({ ...prev, position: value })),
              },
              {
                label: '실력 레벨',
                value: recruitmentForm.skillLevel || null,
                options: [
                  { label: '아마추어', value: '아마추어' },
                  { label: '세미프로', value: '세미프로' },
                  { label: '프로', value: '프로' },
                ],
                placeholder: '실력 레벨을 선택하세요',
                onChange: value =>
                  setRecruitmentForm(prev => ({ ...prev, skillLevel: value })),
              },
            ]}
          />

          <TextInputSection
            title="모집 메시지"
            value={recruitmentForm.message}
            onChangeText={text =>
              setRecruitmentForm(prev => ({ ...prev, message: text }))
            }
            placeholder="용병 모집에 대한 메시지를 작성해주세요"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={[styles.updateSubmitButton, isUpdating && { opacity: 0.6 }]}
            onPress={handleUpdateRecruitment}
            disabled={isUpdating}
          >
            <Text style={styles.updateSubmitButtonText}>
              {isUpdating ? '수정 중...' : '수정하기'}
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
