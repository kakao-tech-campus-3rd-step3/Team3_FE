import { Ionicons } from '@expo/vector-icons';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/src/theme';

import { styles } from './selection_modal_styles';

export interface SelectionItem {
  id: number | string;
  name: string;
}

interface SelectionModalProps {
  visible: boolean;
  title: string;
  items: SelectionItem[];
  selectedValue: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export default function SelectionModal({
  visible,
  title,
  items,
  selectedValue,
  onClose,
  onSelect,
}: SelectionModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderLeft} />
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Ionicons name="close" size={24} color={theme.colors.text.main} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedValue === item.name && styles.itemActive,
              ]}
              onPress={() => onSelect(item.name)}
            >
              <Text
                style={[
                  styles.itemText,
                  selectedValue === item.name && styles.itemTextActive,
                ]}
              >
                {item.name}
              </Text>
              {selectedValue === item.name && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={theme.colors.brand.main}
                />
              )}
            </TouchableOpacity>
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  );
}
