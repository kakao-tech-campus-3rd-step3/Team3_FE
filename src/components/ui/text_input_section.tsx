import { View, Text, TextInput } from 'react-native';

import { theme } from '@/src/theme';

import { styles } from './text_input_section_styles';

interface TextInputSectionProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function TextInputSection({
  title,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
}: TextInputSectionProps) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.formSectionTitle}>{title}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.textAreaInput]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.sub}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
