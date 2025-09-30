// src/screens/match_application/components/date_filter.tsx
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

import { styles } from '@/src/screens/match_application/match_application_style';

interface DateFilterProps {
  onDateChange: (date: Date) => void;
}

export default function DateFilter({ onDateChange }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>날짜 선택</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {selectedDate
            ? selectedDate.toLocaleDateString('ko-KR')
            : '날짜를 선택하세요'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
