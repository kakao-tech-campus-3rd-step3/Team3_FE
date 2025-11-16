import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.sub,
  },
  contentContainer: {
    paddingHorizontal: spacing.spacing4,
    paddingTop: spacing.spacing2,
    paddingBottom: spacing.spacing4,
  },

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

  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  modalTitle: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    fontSize: typography.fontSize.font4,
  },
  modalCloseButton: {
    padding: 4,
    borderRadius: 4,
  },
  modalContent: {
    flex: 1,
    padding: spacing.spacing4,
  },

  requestsList: {
    gap: spacing.spacing4,
  },
  requestCard: {
    backgroundColor: colors.white,
    padding: spacing.spacing4,
    borderRadius: spacing.spacing3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.spacing3,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    marginBottom: 2,
  },
  applicantEmail: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
  },
  requestStatus: {
    marginLeft: spacing.spacing3,
  },
  statusBadge: {
    paddingHorizontal: spacing.spacing2,
    paddingVertical: 4,
    borderRadius: spacing.spacing3,
  },
  statusPending: {
    backgroundColor: colors.yellow[100],
  },
  statusApproved: {
    backgroundColor: colors.green[100],
  },
  statusRejected: {
    backgroundColor: colors.red[100],
  },
  statusText: {
    fontSize: typography.fontSize.font2,
    fontWeight: typography.fontWeight.semibold,
  },
  statusTextPending: {
    color: colors.yellow[600],
  },
  statusTextApproved: {
    color: colors.green[600],
  },
  statusTextRejected: {
    color: colors.red[600],
  },
  requestDetails: {
    flexDirection: 'row',
    gap: spacing.spacing4,
    marginBottom: spacing.spacing3,
  },
  requestDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  requestDetailLabel: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
  },
  requestDetailValue: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  requestMessage: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[700],
    lineHeight: typography.lineHeight.line5,
    marginBottom: spacing.spacing4,
  },
  requestActions: {
    flexDirection: 'row',
    gap: spacing.spacing3,
    marginBottom: spacing.spacing3,
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.green[600],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing3,
    borderRadius: spacing.spacing2,
    gap: 6,
  },
  approveButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: colors.red[600],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing3,
    borderRadius: spacing.spacing2,
    gap: 6,
  },
  rejectButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
  },
  requestDate: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[400],
  },

  emptyState: {
    alignItems: 'center',
    padding: spacing.spacing12,
    backgroundColor: colors.gray[50],
    margin: spacing.spacing4,
    borderRadius: spacing.spacing3,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderStyle: 'dashed',
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
    marginTop: spacing.spacing4,
    marginBottom: spacing.spacing2,
  },
  emptyStateText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: typography.lineHeight.line5,
  },
});
