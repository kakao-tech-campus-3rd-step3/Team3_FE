import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing5,
    padding: theme.spacing.spacing6,
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
    marginBottom: theme.spacing.spacing4,
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

  card: {
    width: '100%',
    maxWidth: 280,
    minHeight: 120,
    borderRadius: theme.spacing.spacing5,
    paddingTop: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing4,
    borderWidth: 2,
    borderColor: theme.colors.brand.main,
    shadowColor: theme.colors.brand.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  location: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.brand.main,
    marginBottom: theme.spacing.spacing1,
  },
  time: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.brand.main,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.spacing2,
  },

  carouselContent: {
    paddingHorizontal: theme.spacing.spacing2,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.spacing8,
    paddingHorizontal: theme.spacing.spacing4,
    minHeight: 160,
  },
  emptyStateContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.brand.main,
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
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray[300],
    opacity: 0.6,
  },
});
