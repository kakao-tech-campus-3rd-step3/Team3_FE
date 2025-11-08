import { View, Text, ViewStyle, TextStyle } from 'react-native';

interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
}

export default function InfoRow({
  label,
  value,
  containerStyle,
  labelStyle,
  valueStyle,
}: InfoRowProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 2,
        },
        containerStyle,
      ]}
    >
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value ?? ''}</Text>
    </View>
  );
}
