import { View, Text, Button } from 'react-native';

type Props = {
  error: Error;
  resetError: () => void;
};

export default function GlobalErrorFallback({ error, resetError }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        예상치 못한 오류가 발생했습니다 ⚠️
      </Text>
      <Text style={{ marginBottom: 16, color: 'red' }}>{error.message}</Text>
      <Button title="다시 시도" onPress={resetError} />
    </View>
  );
}
