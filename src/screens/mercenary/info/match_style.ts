import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing4,
    paddingVertical: spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  backButton: {
    padding: spacing.spacing2,
    marginRight: spacing.spacing2,
  },

  headerTitle: {
    fontSize: typography.fontSize.font6,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
    flex: 1,
  },

  placeholder: {
    width: spacing.spacing10,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.spacing4,
    paddingTop: spacing.spacing4,
  },

  statusCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
  },

  statusBadge: {
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing4,
  },

  statusText: {
    fontSize: typography.fontSize.font3,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },

  matchCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  roleCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  cardTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
    marginBottom: spacing.spacing3,
  },

  matchInfo: {
    gap: spacing.spacing2,
  },

  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  matchLabel: {
    fontSize: typography.fontSize.font3,
    color: colors.text.sub,
    width: spacing.spacing20,
  },

  matchValue: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    fontWeight: typography.fontWeight.medium,
  },

  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
    gap: spacing.spacing2,
  },

  roleTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
  },

  roleText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.sub,
    lineHeight: typography.lineHeight.line4,
    marginBottom: spacing.spacing1,
  },

  actionSection: {
    marginBottom: spacing.spacing4,
  },

  startButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
    marginBottom: spacing.spacing3,
  },

  completeButton: {
    backgroundColor: colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
    marginBottom: spacing.spacing3,
  },

  reviewButton: {
    backgroundColor: colors.brand.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
    marginBottom: spacing.spacing3,
  },

  leaveButton: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
  },

  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
  },

  waitingCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
    backgroundColor: colors.info + '10',
    borderWidth: 1,
    borderColor: colors.info + '30',
  },

  waitingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing2,
    gap: spacing.spacing2,
  },

  waitingTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.info,
  },

  waitingText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    marginBottom: spacing.spacing1,
  },

  waitingSubtext: {
    fontSize: typography.fontSize.font2,
    color: colors.text.sub,
    fontStyle: 'italic',
  },

  relationshipCard: {
    marginBottom: spacing.spacing8,
    padding: spacing.spacing4,
  },

  relationshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing2,
    gap: spacing.spacing2,
  },

  relationshipTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
  },

  relationshipText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.sub,
    lineHeight: typography.lineHeight.line4,
  },
});
