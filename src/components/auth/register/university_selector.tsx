import { View, Text, useWindowDimensions } from 'react-native';

import Dropdown from '@/src/components/dropdown';
import { UNIVERSITIES } from '@/src/constants/universities';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/email_verification_style';

interface UniversitySelectorProps {
  university: string;
  onUniversityChange: (university: string) => void;
}

export function UniversitySelector({
  university,
  onUniversityChange,
}: UniversitySelectorProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);

  return (
    <View style={styles.inputGroup}>
      <Text style={dynamicStyles.label}>대학교명</Text>
      <Dropdown
        items={UNIVERSITIES.map(uni => uni.name)}
        value={university}
        onChange={onUniversityChange}
        placeholder="대학교를 선택하세요"
      />
    </View>
  );
}
