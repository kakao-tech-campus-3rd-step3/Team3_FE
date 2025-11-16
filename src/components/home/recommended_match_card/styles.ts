import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing3,
  },
  title: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.colors.gray[50],
  },
  moreText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.medium,
  },

  cardTouchable: {
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing3,
    minHeight: 100,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing4,
  },

  badgeText: {
    color: theme.colors.gray[700],
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.bold,
    marginLeft: theme.spacing.spacing1,
  },

  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.spacing2,
  },

  infoText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.medium,
    flex: 1,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.spacing3,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },

  footerText: {
    color: theme.colors.gray[700],
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.medium,
    marginRight: theme.spacing.spacing1,
  },

  carouselContent: {
    paddingHorizontal: theme.spacing.spacing2,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing3,
    minHeight: 120,
  },

  emptyStateCard: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  emptyStateContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyStateIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.green[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },

  emptyStateTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.green[600],
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },

  emptyStateSubtitle: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },

  emptyStateFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
    marginTop: theme.spacing.spacing4,
  },

  emptyStateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.green[500],
    opacity: 0.3,
  },
});
