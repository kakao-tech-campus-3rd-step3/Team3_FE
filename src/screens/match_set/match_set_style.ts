import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    padding: theme.spacing.spacing4,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.spacing4,
  },

  successText: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.green[600],
    marginBottom: theme.spacing.spacing6,
  },

  infoBox: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    width: '100%',
  },

  infoText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.spacing4,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },

  homeButton: {
    height: theme.spacing.spacing12,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
