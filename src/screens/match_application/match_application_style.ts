import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.spacing4,
    paddingBottom: 20,
  },

  filterCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },

  filterCardHeader: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing2,
  },

  filterCardTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },

  filterButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[50],
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.blue[200],
    alignItems: 'center',
  },

  filterButtonActive: {
    backgroundColor: theme.colors.blue[500],
  },

  filterButtonText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.medium,
  },

  filterButtonTextActive: {
    color: theme.colors.white,
  },

  matchCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing3,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },

  matchCardHeader: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingTop: theme.spacing.spacing3,
    paddingBottom: theme.spacing.spacing2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  teamName: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    flex: 1,
  },

  matchCardTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    flex: 1,
  },

  matchBadge: {
    backgroundColor: theme.colors.green[50],
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.green[200],
  },

  matchBadgeText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.green[600],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  infoGrid: {
    paddingVertical: theme.spacing.spacing2,
  },

  infoRowContainer: {
    flexDirection: 'row',
  },

  infoItemHalf: {
    flex: 1,
    marginBottom: theme.spacing.spacing3,
    marginRight: theme.spacing.spacing2,
  },

  infoItemHalfLast: {
    marginRight: 0,
  },

  infoSection: {
    paddingVertical: theme.spacing.spacing1,
  },

  infoItem: {
    marginBottom: theme.spacing.spacing2,
  },

  infoLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.spacing1,
  },

  infoValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[900],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  skillLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },

  skillLevelBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    minWidth: 60,
    alignItems: 'center',
  },

  skillLevelText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  skillLevelRange: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    fontWeight: theme.typography.fontWeight.medium,
  },

  matchMessageLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.spacing1,
  },

  matchContent: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingBottom: theme.spacing.spacing3,
  },

  matchInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
    gap: theme.spacing.spacing2,
  },

  matchInfoIcon: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
    width: 20,
    textAlign: 'center',
  },

  matchInfoText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[700],
    flex: 1,
  },

  matchMessage: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.spacing.spacing2,
    padding: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing2,
  },

  matchMessageText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    fontStyle: 'italic',
    lineHeight: 20,
  },

  matchFooter: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingBottom: theme.spacing.spacing3,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },

  requestButton: {
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
    minHeight: 44,
    shadowColor: theme.colors.blue[600],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  requestButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
    shadowOpacity: 0,
    elevation: 0,
  },

  requestButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
  },

  emptyStateIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.spacing4,
  },

  emptyStateIcon: {
    fontSize: 32,
    color: theme.colors.gray[400],
  },

  emptyStateText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing2,
  },

  emptyStateSubtext: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
    textAlign: 'center',
    lineHeight: 20,
  },

  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
  },

  loadingText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.spacing3,
  },

  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
    paddingHorizontal: theme.spacing.spacing4,
  },

  errorText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.red[600],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing3,
  },

  errorSubtext: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },

  selectedFilterText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.blue[600],
    marginBottom: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
  },

  bottomSpacing: {
    height: theme.spacing.spacing6,
  },

  statusBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    marginLeft: theme.spacing.spacing2,
  },
  statusBadgeText: {
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
