import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.spacing4,
  },
  detailModalContainer: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing4,
    width: '100%',
    maxHeight: '80%',
    padding: theme.spacing.spacing4,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  detailModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  detailModalCloseButton: {
    padding: theme.spacing.spacing1,
  },
  detailModalContent: {
    maxHeight: 400,
  },
  detailLoadingContainer: {
    padding: theme.spacing.spacing8,
    alignItems: 'center',
  },
  detailLoadingText: {
    fontSize: 16,
    color: theme.colors.text.sub,
  },
  detailErrorContainer: {
    padding: theme.spacing.spacing8,
    alignItems: 'center',
  },
  detailErrorText: {
    fontSize: 16,
    color: theme.colors.error,
  },
  detailInfoCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
  },
  detailInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  detailInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  detailHeaderBadges: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  detailSkillBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  detailSkillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailStatusBadge: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  detailInfoList: {
    marginBottom: theme.spacing.spacing4,
  },
  detailInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  detailInfoLabel: {
    fontSize: 14,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing2,
    minWidth: 80,
  },
  detailInfoValue: {
    fontSize: 14,
    color: theme.colors.text.main,
    fontWeight: '500',
    flex: 1,
  },
  detailMessageSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.medium,
    paddingTop: theme.spacing.spacing4,
  },
  detailMessageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  detailMessageText: {
    fontSize: 14,
    color: theme.colors.text.main,
    lineHeight: 20,
  },
});
