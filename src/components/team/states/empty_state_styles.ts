import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.spacing6,
    backgroundColor: colors.gray[50],
  },
  stateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  stateTitle: {
    fontSize: typography.fontSize.font7,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
    marginBottom: spacing.spacing3,
    textAlign: 'center',
  },
  stateSubtitle: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing.spacing2,
  },
  stateDescription: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[400],
    textAlign: 'center',
    lineHeight: typography.lineHeight.line5,
  },
  actionButton: {
    backgroundColor: colors.blue[500],
    paddingVertical: spacing.spacing4,
    paddingHorizontal: spacing.spacing6,
    borderRadius: spacing.spacing3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.spacing2,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
  },
});
