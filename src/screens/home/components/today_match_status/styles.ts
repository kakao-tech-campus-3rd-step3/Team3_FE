import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '@/src/theme';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.spacing4,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  statusCard: {
    borderRadius: theme.spacing.spacing4,
    padding:
      screenWidth < 375 ? theme.spacing.spacing4 : theme.spacing.spacing5,
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
    gap: screenWidth < 375 ? theme.spacing.spacing2 : theme.spacing.spacing3,
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
    fontSize:
      screenWidth < 375
        ? theme.typography.fontSize.font2
        : theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: screenWidth < 375 ? 18 : 20,
    flexShrink: 1,
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

  errorCard: {
    backgroundColor: theme.colors.orange[50],
  },
});
