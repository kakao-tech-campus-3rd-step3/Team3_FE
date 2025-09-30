import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const BadgeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  small: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing3,
  },

  medium: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing3,
  },

  large: {
    paddingHorizontal: spacing.spacing4,
    paddingVertical: spacing.spacing2,
    borderRadius: spacing.spacing4,
  },

  textSmall: {
    ...typography.text.caption,
    color: colors.text.main,
    fontWeight: '600',
  },

  textMedium: {
    ...typography.text.bodySmall,
    color: colors.text.main,
    fontWeight: '600',
  },

  textLarge: {
    ...typography.text.body,
    color: colors.text.main,
    fontWeight: '600',
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

  gold: {
    backgroundColor: '#F4E4BC',
  },

  silver: {
    backgroundColor: '#E8E8E8',
  },

  bronze: {
    backgroundColor: '#E6D2B8',
  },
});
