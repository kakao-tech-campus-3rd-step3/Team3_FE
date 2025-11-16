import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  recruitmentCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  recruitmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  positionSection: {
    flex: 1,
  },
  positionLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
    fontWeight: '500',
  },
  recruitmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  recruitmentHeaderBadges: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  recruitmentInfo: {
    marginBottom: theme.spacing.spacing2,
  },
  teamInfoSection: {
    marginBottom: theme.spacing.spacing3,
    gap: theme.spacing.spacing1,
  },
  teamInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  recruitmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
