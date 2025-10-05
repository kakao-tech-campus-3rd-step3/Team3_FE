import { View, Text } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';

export default function CheckAppliedMatchesScreen() {
  return (
    <View>
      <Text>CheckAppliedMatches</Text>
      <CustomHeader title="신청한 매치 보기" />
    </View>
  );
}
