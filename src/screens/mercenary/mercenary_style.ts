import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing8,
  },

  introCard: {
    marginBottom: theme.spacing.spacing6,
    padding: theme.spacing.spacing5,
  },

  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  introIcon: {
    width: theme.spacing.spacing15,
    height: theme.spacing.spacing15,
    borderRadius: theme.spacing.spacing15 / 2,
    backgroundColor: theme.colors.background.sub,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.spacing4,
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },

  introSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line5,
  },

  applyButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    shadowColor: theme.colors.brand.main,
    shadowOffset: {
      width: 0,
      height: theme.spacing.spacing1,
    },
    shadowOpacity: 0.3,
    shadowRadius: theme.spacing.spacing2,
    elevation: 8,
  },

  applyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.spacing2,
  },

  applyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  statusButton: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  statusButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: theme.spacing.spacing12,
    height: theme.spacing.spacing12,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.background.sub,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.spacing4,
  },

  statusTextContainer: {
    flex: 1,
  },

  statusTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },

  statusSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },

  sectionTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },

  matchesSection: {
    marginBottom: theme.spacing.spacing6,
  },

  matchCard: {
    marginBottom: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
  },

  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing3,
  },

  matchInfo: {
    flex: 1,
  },

  matchTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: 2,
  },

  matchOpponent: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },

  statusBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing3,
  },

  statusText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.medium,
  },

  matchDetails: {
    gap: 6,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },

  detailText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },

  guideCard: {
    marginBottom: theme.spacing.spacing8,
    padding: theme.spacing.spacing4,
  },

  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
    gap: theme.spacing.spacing2,
  },

  guideTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
  },

  guideContent: {
    gap: theme.spacing.spacing2,
  },

  guideText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line6,
  },
});
