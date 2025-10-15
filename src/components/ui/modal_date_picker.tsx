import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  BackHandler,
} from 'react-native';

import { theme } from '@/src/theme';

interface ModalDatePickerProps {
  visible: boolean;
  value: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
  title?: string;
}

export const ModalDatePicker: React.FC<ModalDatePickerProps> = ({
  visible,
  value,
  onDateChange,
  onClose,
  title = '날짜 선택',
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(value.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(value.getDate());

  useEffect(() => {
    if (visible) {
      setSelectedMonth(value.getMonth());
      setSelectedDay(value.getDate());
    }
  }, [visible, value]);

  const handleConfirm = () => {
    const confirmed = new Date(
      currentYear,
      selectedMonth,
      selectedDay,
      12,
      0,
      0
    );

    onDateChange(confirmed);
    onClose();
  };

  const handleCancel = () => {
    setSelectedMonth(value.getMonth());
    setSelectedDay(value.getDate());
    onClose();
  };

  // 해당 월의 일수 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 월 범위 (0-11) - JavaScript Date 객체와 일치
  const months = Array.from({ length: 12 }, (_, i) => i);

  // 일 범위 (해당 월의 일수에 따라 동적)
  const daysInSelectedMonth = getDaysInMonth(currentYear, selectedMonth);
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  // 월이 변경될 때 일이 유효하지 않으면 조정
  useEffect(() => {
    const daysInNewMonth = getDaysInMonth(currentYear, selectedMonth);
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  }, [selectedMonth, selectedDay, currentYear]);

  // 뒤로가기 버튼 활성화화
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true; // 뒤로가기 버튼 이벤트 막기
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleCancel}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <View style={styles.pickerRow}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>월</Text>
                <View style={styles.datePickerContainer}>
                  <ScrollColumn
                    values={months}
                    selectedValue={selectedMonth}
                    onSelect={setSelectedMonth}
                    displayValue={value => value + 1} // 0-11을 1-12로 표시
                  />
                </View>
              </View>
              <View style={styles.dateColumnSpacer} />
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>일</Text>
                <View style={styles.datePickerContainer}>
                  <ScrollColumn
                    values={days}
                    selectedValue={selectedDay}
                    onSelect={setSelectedDay}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

interface ScrollColumnProps {
  values: number[];
  selectedValue: number;
  onSelect: (value: number) => void;
  displayValue?: (value: number) => number; // 표시용 변환 함수
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  values,
  selectedValue,
  onSelect,
  displayValue = value => value, // 기본값: 그대로 표시
}) => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {values.map(value => {
        const isSelected = value === selectedValue;
        return (
          <TouchableOpacity
            key={value}
            onPress={() => onSelect(value)}
            style={[styles.scrollItem, isSelected && styles.scrollItemSelected]}
          >
            <Text
              style={[
                styles.scrollItemText,
                isSelected && styles.scrollItemTextSelected,
              ]}
            >
              {displayValue(value)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Modal Layout
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: theme.colors.background.main,
    borderTopLeftRadius: theme.spacing.spacing4,
    borderTopRightRadius: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing6,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
  },
  cancelButton: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
  },
  cancelButtonText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
  },

  // Picker Styles
  pickerContainer: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  dateColumn: {
    flex: 1,
    marginRight: 8,
  },
  dateColumnSpacer: {
    width: 8,
  },
  dateLabel: {
    color: theme.colors.text.sub,
    marginBottom: 8,
    textAlign: 'center',
  },
  datePickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // ScrollView Styles
  scrollView: {
    maxHeight: 200,
  },
  scrollItem: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scrollItemSelected: {
    backgroundColor: theme.colors.blue[50],
  },
  scrollItemText: {
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.regular,
    fontSize: theme.typography.fontSize.font4,
  },
  scrollItemTextSelected: {
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Footer Styles
  footer: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingTop: theme.spacing.spacing4,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  confirmButton: {
    backgroundColor: theme.colors.blue[500],
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
});
