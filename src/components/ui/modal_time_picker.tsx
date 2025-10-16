import React, { useState, useEffect } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  BackHandler,
} from 'react-native';

import { theme } from '@/src/theme';

interface ModalTimePickerProps {
  visible: boolean;
  value: Date;
  onTimeChange: (time: Date) => void;
  onClose: () => void;
  title?: string;
}

export const ModalTimePicker: React.FC<ModalTimePickerProps> = ({
  visible,
  value,
  onTimeChange,
  onClose,
  title = '시간 선택',
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(value.getHours());
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value.getMinutes()
  );

  useEffect(() => {
    if (visible) {
      setSelectedHour(value.getHours());
      setSelectedMinute(value.getMinutes());
    }
  }, [visible, value]);

  const handleConfirm = () => {
    const confirmed = new Date(value);
    confirmed.setHours(selectedHour);
    confirmed.setMinutes(selectedMinute);
    confirmed.setSeconds(0);
    onTimeChange(confirmed);
    onClose();
  };

  const handleCancel = () => {
    setSelectedHour(value.getHours());
    setSelectedMinute(value.getMinutes());
    onClose();
  };

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
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>시</Text>
                <View style={styles.timePickerContainer}>
                  <ScrollColumn
                    range={{ start: 0, end: 23 }}
                    selectedValue={selectedHour}
                    onSelect={setSelectedHour}
                  />
                </View>
              </View>
              <View style={styles.timeColumnSpacer} />
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>분</Text>
                <View style={styles.timePickerContainer}>
                  <ScrollColumn
                    range={{ start: 0, end: 59 }}
                    selectedValue={selectedMinute}
                    onSelect={setSelectedMinute}
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
  range: { start: number; end: number };
  selectedValue: number;
  onSelect: (value: number) => void;
}

const ScrollColumn: React.FC<ScrollColumnProps> = ({
  range,
  selectedValue,
  onSelect,
}) => {
  const values = Array.from(
    { length: range.end - range.start + 1 },
    (_, idx) => range.start + idx
  );

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
              {String(value).padStart(2, '0')}
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
  picker: {
    height: Platform.OS === 'ios' ? 200 : 'auto',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  timeColumn: {
    flex: 1,
    marginRight: 8,
  },
  timeColumnSpacer: {
    width: 12,
  },
  timeLabel: {
    color: theme.colors.text.sub,
    marginBottom: 8,
  },
  timePickerContainer: {
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
