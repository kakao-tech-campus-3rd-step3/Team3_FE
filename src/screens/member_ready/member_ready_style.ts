import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing6,
  },
  title: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.spacing3,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.spacing8,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.spacing4,
  },
  actionButton: {
    height: 56,
    borderRadius: theme.spacing.spacing4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: theme.colors.blue[600],
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
  secondaryButton: {
    backgroundColor: theme.colors.gray[200],
  },
  secondaryButtonText: {
    color: theme.colors.gray[700],
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
