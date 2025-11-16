import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';

import { EXTERNAL_LINKS } from '@/src/constants/external_links';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/account_setup_style';

interface AgreementSectionProps {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
}

export function AgreementSection({ data, onChange }: AgreementSectionProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);

  return (
    <View style={styles.agreementContainer}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onChange('termsAgreed', !data.termsAgreed)}
      >
        <View
          style={[styles.checkbox, data.termsAgreed && styles.checkboxChecked]}
        >
          {data.termsAgreed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.checkboxTextContainer}>
          <Text style={dynamicStyles.checkboxText}>
            서비스 이용약관에 동의합니다
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(EXTERNAL_LINKS.TERMS_OF_SERVICE)}
          >
            <Text style={dynamicStyles.linkText}>약관 보기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onChange('privacyAgreed', !data.privacyAgreed)}
      >
        <View
          style={[
            styles.checkbox,
            data.privacyAgreed && styles.checkboxChecked,
          ]}
        >
          {data.privacyAgreed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.checkboxTextContainer}>
          <Text style={dynamicStyles.checkboxText}>
            개인정보 처리방침에 동의합니다
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(EXTERNAL_LINKS.PRIVACY_POLICY)}
          >
            <Text style={dynamicStyles.linkText}>정책 보기</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
