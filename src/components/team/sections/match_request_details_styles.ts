import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  detailsContainer: {
    marginBottom: spacing.spacing3,
  },
  lineupButtonSection: {
    marginBottom: spacing.spacing4,
  },
  viewLineupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.spacing3,
    paddingHorizontal: spacing.spacing4,
    borderRadius: spacing.spacing2,
    borderWidth: 1,
    borderColor: colors.blue[200],
    gap: spacing.spacing2,
  },
  viewLineupButtonText: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.blue[600],
  },
  matchInfoCard: {
    backgroundColor: colors.blue[50],
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    marginBottom: spacing.spacing4,
  },
  matchInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing2,
    marginBottom: spacing.spacing3,
  },
  matchInfoTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  matchInfoGrid: {
    gap: spacing.spacing3,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.spacing3,
    borderRadius: spacing.spacing2,
    gap: spacing.spacing2,
  },
  matchInfoItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfoItemContent: {
    flex: 1,
  },
  matchInfoItemLabel: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[600],
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.spacing1,
  },
  matchInfoItemValue: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  messageSection: {
    marginTop: spacing.spacing2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing2,
    marginBottom: spacing.spacing2,
  },
  messageTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  messageContent: {
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing2,
    padding: spacing.spacing3,
  },
  messageText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[700],
    lineHeight: typography.lineHeight.line5,
  },
});
