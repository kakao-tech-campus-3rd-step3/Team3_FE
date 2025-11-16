import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { theme } from '@/src/theme';

import { styles } from './filter_button_styles';

interface FilterButtonProps {
  selectedValue: string;
  placeholder: string;
  onPress: () => void;
  onClear: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export default function FilterButton({
  selectedValue,
  placeholder,
  onPress,
  onClear,
  iconName = 'search',
}: FilterButtonProps) {
  return (
    <View style={styles.filterSection}>
      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <Ionicons name={iconName} size={20} color={theme.colors.text.sub} />
        <Text style={styles.searchButtonText}>
          {selectedValue === '' ? placeholder : selectedValue}
        </Text>
        {selectedValue !== '' && (
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              onClear();
            }}
            style={styles.clearButton}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.colors.text.sub}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}
