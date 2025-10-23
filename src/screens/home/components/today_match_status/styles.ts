import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.spacing4,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  statusCard: {
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing3,
  },
  statusText: {
    flex: 1,
    gap: theme.spacing.spacing1,
  },
  statusTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[900],
  },
  statusSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    fontWeight: theme.typography.fontWeight.medium,
  },

  matchScheduledCard: {
    backgroundColor: theme.colors.green[50],
  },

  noMatchCard: {
    backgroundColor: theme.colors.gray[50],
  },

  noTeamCard: {
    backgroundColor: theme.colors.blue[50],
  },

  loadingCard: {
    backgroundColor: theme.colors.blue[50],
  },
});
