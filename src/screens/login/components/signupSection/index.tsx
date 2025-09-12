import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../login_style';

interface SignupSectionProps {
  onSwitchToRegister: () => void;
}

export default memo(function SignupSection({
  onSwitchToRegister,
}: SignupSectionProps) {
  return (
    <View style={styles.signupSection}>
      <View style={styles.signupRow}>
        <Text style={styles.signupText}>계정이 없으신가요?</Text>
        <TouchableOpacity onPress={onSwitchToRegister}>
          <Text style={styles.signupLink}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
