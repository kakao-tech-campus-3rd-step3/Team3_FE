import { theme } from '@/src/theme';

export const styles = {
  container: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  header: {
    marginBottom: theme.spacing.spacing3,
  },
  headerDivider: {
    height: 5,
    backgroundColor: theme.colors.gray[200],
    marginTop: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing4,
    marginHorizontal: -theme.spacing.spacing4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  additionalMatches: {
    marginBottom: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing2,
  },
  horizontalScrollContainer: {
    paddingRight: theme.spacing.spacing4,
  },
  additionalMatchItem: {
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing3,
    marginRight: theme.spacing.spacing2,
    width: 130,
    minHeight: 100,
  },
  additionalMatchInfo: {
    flex: 1,
  },
  additionalLocation: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  additionalTime: {
    fontSize: 12,
    color: theme.colors.text.sub,
    fontWeight: '500' as const,
  },
  additionalMatchBadges: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing2,
  },
  smallBadge: {
    paddingHorizontal: theme.spacing.spacing1,
    paddingVertical: 2,
    borderRadius: theme.spacing.spacing1,
  },
  smallBadgeText: {
    fontSize: 10,
    fontWeight: '500' as const,
  },
  playerCountSmall: {
    fontSize: 12,
    color: theme.colors.text.sub,
    fontWeight: '500' as const,
  },
};
