import { memo } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/src/screens/home/home_style';

export default memo(function GreetingSection() {
  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingSubtext}>
        편리해진 <Text style={styles.highlightText}>축구 매칭</Text>을
        이용해보세요
      </Text>
    </View>
  );
});
