import { View } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';

import { styles } from '../teammate_register_style';

export default function TeammateRegisterScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title="팀원 등록" />
    </View>
  );
}
