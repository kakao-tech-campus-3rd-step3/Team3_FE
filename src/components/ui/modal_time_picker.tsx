import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
    }
    if (selectedTime) {
      onTimeChange(selectedTime);
    }
  };

  const handleConfirm = () => {
    onClose();
  };

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
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={value}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              style={styles.picker}
              locale="ko-KR"
              textColor={theme.colors.text.main}
            />
          </View>

          {Platform.OS === 'ios' && (
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  pickerContainer: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 'auto',
  },
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
