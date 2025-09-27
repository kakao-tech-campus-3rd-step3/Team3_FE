import React from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';

import { colors } from '@/src/theme';

import { styles } from './card_style';

interface CardProps {
  title?: string;
  subtitle?: string;
  level?: 0 | 1 | 2;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({
  title,
  subtitle,
  level,
  children,
  style,
}: CardProps) => {
  const getBorderColor = () => {
    if (level === undefined) return undefined;

    switch (level) {
      case 0:
        return colors.green[500];
      case 1:
        return colors.orange[500];
      case 2:
        return colors.red[500];
      default:
        return undefined;
    }
  };

  return (
    <View
      style={[
        styles.container,
        styles.elevated,
        getBorderColor() && {
          borderLeftWidth: 4,
          borderLeftColor: getBorderColor(),
        },
        style,
      ]}
    >
      {(title || subtitle) && (
        <View>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
};
