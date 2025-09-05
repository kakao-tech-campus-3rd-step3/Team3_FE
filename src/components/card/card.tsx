import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './card_style';

interface CardProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  children?: React.ReactNode;
  style?: any;
}

export const Card = ({
  title,
  subtitle,
  variant = 'default',
  children,
  style,
}: CardProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'outlined':
        return styles.outlined;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.container, getVariantStyle(), style]}>
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
