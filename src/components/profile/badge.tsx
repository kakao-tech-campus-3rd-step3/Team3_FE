import { Text, View } from 'react-native';

import { badgeStyles } from '@/src/components/profile/badge_style';

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
        return badgeStyles.small;
      case 'large':
        return badgeStyles.large;
      default:
        return badgeStyles.medium;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return badgeStyles.textSmall;
      case 'large':
        return badgeStyles.textLarge;
      default:
        return badgeStyles.textMedium;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return badgeStyles.secondary;
      case 'success':
        return badgeStyles.success;
      case 'warning':
        return badgeStyles.warning;
      case 'danger':
        return badgeStyles.danger;
      case 'gold':
        return badgeStyles.gold;
      case 'silver':
        return badgeStyles.silver;
      case 'bronze':
        return badgeStyles.bronze;
      default:
        return badgeStyles.primary;
    }
  };

  return (
    <View style={[badgeStyles.container, getSizeStyle(), getVariantStyle()]}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
}
