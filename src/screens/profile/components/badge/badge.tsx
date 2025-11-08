import { Text, View } from 'react-native';

import { BadgeStyles } from '@/src/screens/profile/components/badge/badge_style';

interface BadgeProps {
  text: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'gold'
    | 'silver'
    | 'bronze';
  size?: 'small' | 'medium' | 'large';
}

export default function Badge({
  text,
  variant = 'primary',
  size = 'medium',
}: BadgeProps) {
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return BadgeStyles.small;
      case 'large':
        return BadgeStyles.large;
      default:
        return BadgeStyles.medium;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return BadgeStyles.textSmall;
      case 'large':
        return BadgeStyles.textLarge;
      default:
        return BadgeStyles.textMedium;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return BadgeStyles.secondary;
      case 'success':
        return BadgeStyles.success;
      case 'warning':
        return BadgeStyles.warning;
      case 'danger':
        return BadgeStyles.danger;
      case 'gold':
        return BadgeStyles.gold;
      case 'silver':
        return BadgeStyles.silver;
      case 'bronze':
        return BadgeStyles.bronze;
      default:
        return BadgeStyles.primary;
    }
  };

  return (
    <View style={[BadgeStyles.container, getSizeStyle(), getVariantStyle()]}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
}
