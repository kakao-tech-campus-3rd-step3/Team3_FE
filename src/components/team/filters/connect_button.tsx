import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/filters/connect_button_styles';

interface ConnectButtonProps {
  selectedUniversity: string;
  onConnect: () => void;
}

export default function ConnectButton({
  selectedUniversity,
  onConnect,
}: ConnectButtonProps) {
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={[
          styles.connectButton,
          selectedUniversity && styles.connectButtonActive,
        ]}
        onPress={onConnect}
        disabled={!selectedUniversity}
      >
        <Text
          style={[
            styles.connectButtonText,
            selectedUniversity && styles.connectButtonTextActive,
          ]}
        >
          연결하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
