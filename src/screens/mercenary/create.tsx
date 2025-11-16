import {
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
import { useMercenaryCreate } from '@/src/hooks/mercenary';

import { styles } from './create_styles';

export default function MercenaryCreateScreen() {
  const {
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
    handleCreateRecruitment,
    isCreating,
  } = useMercenaryCreate();

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
