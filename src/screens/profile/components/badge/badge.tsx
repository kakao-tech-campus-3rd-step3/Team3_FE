import React from 'react';
import { Text, View } from 'react-native';
import { BadgeStyles } from './badge_style';

// Types
interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
}) => {
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
      default:
        return BadgeStyles.primary;
    }
  };

  return (
    <View style={[BadgeStyles.container, getSizeStyle(), getVariantStyle()]}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
};
