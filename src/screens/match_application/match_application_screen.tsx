// src/screens/match_application/match_application_screen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import DateFilter from '@/src/screens/match_application/component/data_filter';

import { styles } from './match_application_style';

export default function MatchApplicationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 참여" />

      <DateFilter onDateChange={setSelectedDate} />

      {selectedDate && (
        <Text style={styles.selectedDateText}>
          선택된 날짜: {selectedDate.toLocaleDateString('ko-KR')}
        </Text>
      )}
    </View>
  );
}
