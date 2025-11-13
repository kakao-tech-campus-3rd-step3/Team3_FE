import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './date_time_section_styles';

interface DateTimeSectionProps {
  title?: string;
  dateLabel?: string;
  timeLabel?: string;
  date: Date;
  time: Date;
  onDatePress: () => void;
  onTimePress: () => void;
  formatDate?: (date: Date) => string;
  formatTime?: (time: Date) => string;
}

export default function DateTimeSection({
  title = '날짜 및 시간',
  dateLabel = '날짜',
  timeLabel = '시간',
  date,
  time,
  onDatePress,
  onTimePress,
  formatDate,
  formatTime,
}: DateTimeSectionProps) {
  const defaultFormatDate = (date: Date) =>
    date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });

  const defaultFormatTime = (time: Date) =>
    time.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });

  return (
    <View style={styles.formSection}>
      <Text style={styles.formSectionTitle}>{title}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{dateLabel}</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={onDatePress}>
          <Text style={styles.dateTimeLabel}>날짜</Text>
          <Text style={styles.dateTimeValue} numberOfLines={1}>
            {formatDate ? formatDate(date) : defaultFormatDate(date)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{timeLabel}</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={onTimePress}>
          <Text style={styles.dateTimeLabel}>시간</Text>
          <Text style={styles.dateTimeValue} numberOfLines={1}>
            {formatTime ? formatTime(time) : defaultFormatTime(time)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
