import { useState } from 'react';

export function useDateTimePicker(initialDate?: Date, initialTime?: Date) {
  const [matchDate, setMatchDate] = useState<Date>(initialDate || new Date());
  const [matchTime, setMatchTime] = useState<Date>(
    initialTime ||
      (() => {
        const now = new Date();
        now.setMinutes(0, 0, 0);
        now.setHours(now.getHours() + 1);
        return now;
      })
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  return {
    matchDate,
    setMatchDate,
    matchTime,
    setMatchTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
  };
}
