import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../match_application_style';

interface TimeFilterProps {
  onTimeChange: (time: Date | null) => void;
}

export default function TimeFilter({ onTimeChange }: TimeFilterProps) {
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selectedTime?: Date) => {
    setShow(false); // ✅ 항상 닫기
    if (selectedTime) {
      setTime(selectedTime);
      onTimeChange(selectedTime);
    }
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>시작 시간 이후</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text style={styles.dateButtonText}>
          {time.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
