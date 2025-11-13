import { View, Text } from 'react-native';

import Dropdown from '@/src/components/dropdown';

import { styles } from './dropdown_section_styles';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownField {
  label: string;
  value: string | null;
  options: DropdownOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

interface DropdownSectionProps {
  title: string;
  fields: DropdownField[];
}

export default function DropdownSection({
  title,
  fields,
}: DropdownSectionProps) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.formSectionTitle}>{title}</Text>

      {fields.map((field, index) => {
        const optionLabels = field.options.map(option => option.label);
        const selectedOption = field.options.find(
          option => option.value === field.value
        );
        const displayValue = selectedOption ? selectedOption.label : null;

        return (
          <View key={index} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{field.label}</Text>
            <Dropdown
              items={optionLabels}
              value={displayValue}
              onChange={label => {
                const selectedOption = field.options.find(
                  option => option.label === label
                );
                if (selectedOption) {
                  field.onChange(selectedOption.value);
                }
              }}
              placeholder={field.placeholder}
            />
          </View>
        );
      })}
    </View>
  );
}
