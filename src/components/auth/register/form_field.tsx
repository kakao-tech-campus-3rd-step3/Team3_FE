import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  TextInputProps,
} from 'react-native';

import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/profile_info_style';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
}

export function FormField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  maxLength,
  secureTextEntry,
}: FormFieldProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <View style={styles.inputGroup}>
      <Text style={dynamicStyles.label}>{label}</Text>
      <TextInput
        style={[
          dynamicStyles.input,
          (focusedField === label || value) && styles.inputFilled,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        multiline={false}
        onFocus={() => setFocusedField(label)}
        onBlur={() => setFocusedField(null)}
      />
      {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
    </View>
  );
}
