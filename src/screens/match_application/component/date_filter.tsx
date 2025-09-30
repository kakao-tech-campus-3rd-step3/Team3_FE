import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../match_application_style';

interface DateFilterProps {
  onDateChange: (date: Date | null) => void;
}

export default function DateFilter({ onDateChange }: DateFilterProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(false); // ✅ 항상 닫기
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>날짜 선택</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text style={styles.dateButtonText}>
          {date.toLocaleDateString('ko-KR')}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
