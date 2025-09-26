import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

import { theme } from '@/src/theme';

interface DropdownProps<T> {
  items: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

export function Dropdown<T extends string | number>({
  items,
  value,
  onChange,
  placeholder = '선택하세요',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>⌄</Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
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
                  <Text style={styles.itemText}>{String(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  placeholder: {
    color: theme.colors.text.light,
  },
  dropdownArrow: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    maxHeight: 300,
    width: '80%',
    shadowColor: theme.colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  itemText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
  },
});
