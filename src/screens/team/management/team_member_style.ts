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
  contentContainer: {
    padding: spacing.spacing4,
  },

  infoSection: {
    marginBottom: spacing.spacing5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.blue[50],
    padding: spacing.spacing4,
    borderRadius: spacing.spacing3,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue[500],
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.spacing3,
  },
  infoTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.blue[800],
    marginBottom: 4,
  },
  infoText: {
    fontSize: typography.fontSize.font3,
    color: colors.blue[700],
    lineHeight: typography.lineHeight.line5,
  },

  membersSection: {
    marginBottom: spacing.spacing5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spacing4,
  },
  sectionTitle: {
    fontSize: typography.fontSize.font6,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
  },
  memberCount: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.spacing2,
    paddingVertical: 4,
    borderRadius: spacing.spacing3,
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.spacing10,
  },
  loadingText: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[500],
    marginTop: spacing.spacing2,
  },

  memberList: {},
  memberCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    padding: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.gray[100],
    marginBottom: spacing.spacing3,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.spacing4,
  },
  memberAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.spacing4,
    shadowColor: colors.blue[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  memberDetails: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.spacing2,
  },
  memberName: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    flex: 1,
  },
  memberEmail: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[600],
    marginBottom: spacing.spacing1,
  },
  memberUniversity: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    marginBottom: spacing.spacing2,
  },
  roleBadge: {
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing4,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  roleBadgeText: {
    fontSize: typography.fontSize.font2,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  joinDate: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    fontWeight: typography.fontWeight.medium,
  },

  memberActions: {
    flexDirection: 'row',
    gap: spacing.spacing3,
    justifyContent: 'flex-end',
    paddingTop: spacing.spacing3,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing4,
    paddingVertical: spacing.spacing3,
    borderRadius: spacing.spacing3,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
    marginLeft: spacing.spacing1,
    flexShrink: 1,
  },
  removeButton: {
    backgroundColor: colors.red[50],
    borderColor: colors.red[300],
  },
  removeButtonText: {
    color: colors.red[600],
    fontWeight: typography.fontWeight.semibold,
    flexShrink: 1,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.spacing15,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.spacing5,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    width: '100%',
    maxWidth: 400,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  modalTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    padding: spacing.spacing5,
  },
  modalMemberName: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[700],
    marginBottom: spacing.spacing5,
    textAlign: 'center',
  },
  roleOptions: {
    gap: spacing.spacing3,
  },
  roleOption: {
    padding: spacing.spacing4,
    borderRadius: spacing.spacing3,
    borderWidth: 2,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[50],
  },
  roleOptionSelected: {
    borderColor: colors.blue[500],
    backgroundColor: colors.blue[50],
  },
  roleOptionText: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    marginBottom: 4,
  },
  roleOptionDescription: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
  },
});
