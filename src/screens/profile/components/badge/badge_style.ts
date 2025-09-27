import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const BadgeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  small: {
    paddingHorizontal: spacing.spacing1,
    paddingVertical: spacing.spacing1 / 2,
    borderRadius: spacing.spacing1 / 2,
  },

  medium: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing1,
  },

  large: {
    paddingHorizontal: spacing.spacing4,
    paddingVertical: spacing.spacing2,
    borderRadius: spacing.spacing2,
  },

  textSmall: {
    ...typography.text.caption,
    color: colors.text.main,
  },

  textMedium: {
    ...typography.text.bodySmall,
    color: colors.text.main,
  },

  textLarge: {
    ...typography.text.body,
    color: colors.text.main,
  },

  primary: {
    backgroundColor: colors.grass[500],
  },

  secondary: {
    backgroundColor: colors.cream[100],
    color: colors.text.main,
  },

  success: {
    backgroundColor: colors.success,
  },

  warning: {
    backgroundColor: colors.orange[500],
  },

  danger: {
    backgroundColor: colors.error,
  },
});
