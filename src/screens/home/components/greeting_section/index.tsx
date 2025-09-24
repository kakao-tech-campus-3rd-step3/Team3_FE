import { memo } from 'react';
import { Text, View } from 'react-native';

import { HomeData } from '@/src/types/home';
import { UserProfile } from '@/src/types/profile';

import styles from '../../home_style';

interface GreetingSectionProps {
  homeData: HomeData;
  userInfo: UserProfile;
}

export default memo(function GreetingSection({
  homeData,
  userInfo,
}: GreetingSectionProps) {
  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingSubtext}>
        편리해진 <Text style={styles.highlightText}>축구 매칭</Text>을
        이용해보세요
      </Text>
    </View>
  );
});
