import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import { theme } from '@/src/theme';

interface DropdownProps<T> {
  items: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

export default function Dropdown<T extends string | number>({
  items,
  value,
  onChange,
  placeholder = '선택하세요',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const getDynamicFontSize = (baseSize: number) => {
    return Math.max(baseSize, width * 0.035);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !value && styles.placeholder,
            { fontSize: getDynamicFontSize(14) },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value || placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay}>
            <View style={styles.list}>
              <FlatList
                data={items}
                keyExtractor={(item, index) => String(item) + index}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      onChange(item);
                      setIsOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        { fontSize: getDynamicFontSize(14) },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {String(item)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
    fontWeight: '500',
  },
  placeholder: {
    color: theme.colors.text.light,
    fontWeight: '400',
  },
  dropdownArrow: {
    fontSize: 18,
    color: theme.colors.text.sub,
    transform: [{ rotate: '0deg' }],
    marginTop: -6,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    maxHeight: 320,
    width: '85%',
    shadowColor: theme.colors.shadow.medium,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.border.light,
  },
  itemText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    fontWeight: '400',
  },
});
