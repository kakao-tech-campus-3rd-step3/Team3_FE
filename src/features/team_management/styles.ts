import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },

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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
  },
  loadingText: {
    fontSize: typography.fontSize.font5,
    color: colors.gray[500],
    marginTop: spacing.spacing4,
  },

  scrollContainer: {
    flex: 1,
    paddingTop: spacing.spacing3,
  },
  contentContainer: {
    paddingHorizontal: spacing.spacing4,
    paddingBottom: spacing.spacing4,
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

  membersSection: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    padding: spacing.spacing5,
    marginBottom: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: typography.fontSize.font6,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
    marginBottom: spacing.spacing4,
  },
  memberList: {
    gap: spacing.spacing3,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.spacing3,
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing2,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    backgroundColor: colors.blue[500],
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.spacing3,
  },
  memberAvatarText: {
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.font4,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    marginBottom: 2,
  },
  memberRole: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
  },
  memberBadge: {
    backgroundColor: colors.yellow[400],
    paddingHorizontal: spacing.spacing2,
    paddingVertical: 4,
    borderRadius: spacing.spacing3,
  },
  memberBadgeText: {
    color: colors.white,
    fontSize: typography.fontSize.font2,
    fontWeight: typography.fontWeight.semibold,
  },

  emptyState: {
    alignItems: 'center',
    padding: spacing.spacing8,
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing3,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderStyle: 'dashed',
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
    marginBottom: spacing.spacing2,
  },
  emptyStateText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: typography.lineHeight.line5,
  },

  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing3,
    paddingHorizontal: spacing.spacing4,
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing2,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginTop: spacing.spacing2,
  },
  showMoreText: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.medium,
    color: colors.gray[600],
    marginRight: 4,
  },

  reviewsCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    marginBottom: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.gray[100],
  },
  reviewsList: {
    marginTop: spacing.spacing4,
  },
  reviewItem: {
    marginBottom: spacing.spacing4,
  },
  reviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spacing2,
  },
  reviewLabel: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[900],
    fontWeight: typography.fontWeight.medium,
  },
  reviewCount: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[500],
    textAlign: 'right',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewsSummary: {
    marginTop: spacing.spacing4,
  },
  averageRatingContainer: {
    marginBottom: spacing.spacing5,
  },
  averageRatingCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    borderWidth: 1,
    borderColor: colors.gray[200],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  averageRatingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
    gap: spacing.spacing2,
  },
  averageRatingLabel: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
  },
  averageRatingContent: {
    alignItems: 'center',
    gap: spacing.spacing2,
  },
  averageRatingText: {
    fontSize: typography.fontSize.font7,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
  },
  averageRatingSubtext: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    fontWeight: typography.fontWeight.medium,
  },
  reviewTypeSummary: {
    marginBottom: spacing.spacing4,
  },
  reviewTypeSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
    gap: spacing.spacing2,
  },
  reviewTypeSummaryLabel: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
  },
  reviewTypeSummaryList: {
    gap: spacing.spacing2,
  },
  reviewTypeSummaryItem: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing2,
    padding: spacing.spacing3,
    borderWidth: 1,
    borderColor: colors.gray[200],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewTypeSummaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewTypeSummaryText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[700],
    fontWeight: typography.fontWeight.medium,
    flex: 1,
  },
  reviewTypeCountBadge: {
    backgroundColor: colors.blue[500],
    borderRadius: spacing.spacing3,
    paddingHorizontal: spacing.spacing2,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  reviewTypeCountText: {
    fontSize: typography.fontSize.font2,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  reviewTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.spacing2,
  },
  reviewTypeBadge: {
    backgroundColor: colors.blue[50],
    paddingHorizontal: spacing.spacing2,
    paddingVertical: 4,
    borderRadius: spacing.spacing3,
    borderWidth: 1,
    borderColor: colors.blue[100],
  },
  reviewTypeText: {
    fontSize: typography.fontSize.font2,
    fontWeight: typography.fontWeight.medium,
    color: colors.blue[800],
  },
  reviewDate: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[400],
    textAlign: 'right',
  },
});
