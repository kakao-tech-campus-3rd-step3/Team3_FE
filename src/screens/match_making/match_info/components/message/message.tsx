import { View, Text, TextInput } from 'react-native';

import { style } from '@/src/screens/match_making/match_info/components/message/message_style';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function Message({ value, onChange }: Props) {
  return (
    <View style={style.section}>
      <Text style={style.label}>추가 메세지</Text>
      <TextInput
        style={style.input}
        placeholder="매치에 대한 설명을 입력하세요 (선택)"
        value={value}
        onChangeText={onChange}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
}
