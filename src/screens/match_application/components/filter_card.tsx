import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ModalDatePicker } from '@/src/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/src/components/ui/modal_time_picker';

import { styles } from '../match_application_style';

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
            >
              {selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
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
            >
              {selectedTime ? formatTime(selectedTime) : '시간 선택'}
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
