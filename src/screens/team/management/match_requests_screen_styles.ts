import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.spacing4,
    paddingBottom: spacing.spacing20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.spacing20,
  },
  loadingText: {
    marginTop: spacing.spacing4,
    fontSize: typography.fontSize.font4,
    color: colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.spacing20,
  },
  errorText: {
    marginTop: spacing.spacing4,
    fontSize: typography.fontSize.font4,
    color: colors.red[600],
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.spacing20,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    marginTop: spacing.spacing4,
  },
  emptyStateText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: spacing.spacing2,
  },
  requestsList: {
    gap: spacing.spacing4,
  },
  requestCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    marginBottom: spacing.spacing3,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
  },
  applicantInfo: {
    flex: 1,
  },
  requestTeamName: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  requestStatus: {
    marginLeft: spacing.spacing2,
  },
  requestActions: {
    flexDirection: 'row',
    gap: spacing.spacing2,
    marginTop: spacing.spacing3,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.green[600],
    paddingVertical: spacing.spacing3,
    paddingHorizontal: spacing.spacing4,
    borderRadius: spacing.spacing2,
    gap: spacing.spacing2,
  },
  approveButtonText: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.green[600],
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.red[600],
    paddingVertical: spacing.spacing3,
    paddingHorizontal: spacing.spacing4,
    borderRadius: spacing.spacing2,
    gap: spacing.spacing2,
  },
  rejectButtonText: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.red[600],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
