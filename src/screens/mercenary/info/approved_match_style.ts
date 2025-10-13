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
    marginBottom: spacing.spacing2,
  },

  statusTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
  },

  approvedBadge: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing4,
    gap: spacing.spacing1,
  },

  statusText: {
    fontSize: typography.fontSize.font3,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },

  approvedAt: {
    fontSize: typography.fontSize.font2,
    color: colors.text.sub,
  },

  matchCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  teamCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  opponentCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  messageCard: {
    marginBottom: spacing.spacing4,
    padding: spacing.spacing4,
  },

  cardTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
    marginBottom: spacing.spacing3,
  },

  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
    gap: spacing.spacing2,
  },

  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
    gap: spacing.spacing2,
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
    width: spacing.spacing15,
  },

  matchValue: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    fontWeight: typography.fontWeight.medium,
  },

  teamInfo: {
    gap: spacing.spacing2,
  },

  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  teamLabel: {
    fontSize: typography.fontSize.font3,
    color: colors.text.sub,
    width: spacing.spacing20,
  },

  teamValue: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    fontWeight: typography.fontWeight.medium,
  },

  teamDescription: {
    marginTop: spacing.spacing2,
    padding: spacing.spacing3,
    backgroundColor: colors.background.sub,
    borderRadius: spacing.spacing2,
  },

  descriptionText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    lineHeight: typography.lineHeight.line4,
  },

  messageText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.main,
    lineHeight: typography.lineHeight.line4,
  },

  actionSection: {
    marginBottom: spacing.spacing4,
    gap: spacing.spacing3,
  },

  startButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing3,
    gap: spacing.spacing2,
  },

  contactButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.brand.main,
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

  contactButtonText: {
    color: colors.brand.main,
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

  infoCard: {
    marginBottom: spacing.spacing8,
    padding: spacing.spacing4,
  },

  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing2,
    gap: spacing.spacing2,
  },

  infoTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.main,
  },

  infoText: {
    fontSize: typography.fontSize.font3,
    color: colors.text.sub,
    lineHeight: typography.lineHeight.line4,
  },
});
