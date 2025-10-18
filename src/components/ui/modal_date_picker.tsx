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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const months = Array.from({ length: 12 }, (_, i) => i);

  const daysInSelectedMonth = getDaysInMonth(currentYear, selectedMonth);
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);
  useEffect(() => {
    const daysInNewMonth = getDaysInMonth(currentYear, selectedMonth);
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  }, [selectedMonth, selectedDay, currentYear]);

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
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
      animationType="fade"
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
                    displayValue={value => value + 1}
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
  displayValue?: (value: number) => number;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  values,
  selectedValue,
  onSelect,
  displayValue = value => value,
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4,
  },
  title: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  cancelButton: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
  },
  cancelButtonText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
  },

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

  footer: {
    paddingTop: theme.spacing.spacing4,
    marginTop: theme.spacing.spacing4,
  },
  confirmButton: {
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
  },
});
