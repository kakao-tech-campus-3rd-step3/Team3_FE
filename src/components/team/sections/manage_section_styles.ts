import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  manageSection: {
    padding: spacing.spacing4,
  },
  manageDescription: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[500],
    marginBottom: spacing.spacing6,
    lineHeight: typography.lineHeight.line6,
  },
  manageActions: {
    gap: spacing.spacing4,
  },
  dangerButton: {
    backgroundColor: colors.red[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    paddingHorizontal: spacing.spacing6,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    flexShrink: 1,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    paddingHorizontal: spacing.spacing6,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
  },
  secondaryButtonText: {
    color: colors.gray[700],
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    flexShrink: 1,
  },
  badgeText: {
    color: colors.red[500],
    fontWeight: typography.fontWeight.bold,
  },
});
