import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ModalDatePicker } from '@/src/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/src/components/ui/modal_time_picker';
import { styles } from '@/src/screens/match_application/match_application_style';
import { formatKoreanDate, formatKoreanTime } from '@/src/utils/date';

interface FilterCardProps {
  selectedDate: Date | null;
  selectedTime: Date | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: Date | null) => void;
}

export default function FilterCard({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: FilterCardProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <View style={styles.filterCard}>
        <View style={styles.filterCardHeader}>
          <Text style={styles.filterCardTitle}>매치 필터</Text>
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedDate && styles.filterButtonActive,
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedDate && styles.filterButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              {selectedDate
                ? formatKoreanDate(selectedDate)
                : formatKoreanDate(new Date())}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedTime && styles.filterButtonActive,
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedTime && styles.filterButtonTextActive,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              {selectedTime ? formatKoreanTime(selectedTime) : '시간 선택'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalDatePicker
        visible={showDatePicker}
        value={selectedDate || new Date()}
        onDateChange={date => {
          setShowDatePicker(false);
          onDateChange(date);
        }}
        onClose={() => setShowDatePicker(false)}
        title="경기 날짜 선택"
      />

      <ModalTimePicker
        visible={showTimePicker}
        value={selectedTime || new Date()}
        onTimeChange={time => {
          setShowTimePicker(false);
          onTimeChange(time);
        }}
        onClose={() => setShowTimePicker(false)}
        title="시작 시간 이후"
      />
    </>
  );
}
