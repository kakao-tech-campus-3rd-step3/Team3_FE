import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  formationSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.spacing4,
  },
  formationButton: {
    backgroundColor: theme.colors.gray[200],
    paddingVertical: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
  },
  formationButtonActive: {
    backgroundColor: theme.colors.blue[600],
  },
  formationButtonText: {
    color: theme.colors.gray[700],
    fontWeight: theme.typography.fontWeight.medium,
  },
  formationButtonTextActive: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  field: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.spacing3,
  },
  playerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  playerCircleSelected: {
    transform: [{ scale: 1.1 }],
  },
  jersey: {
    width: 40,
    height: 40,
  },
  playerName: {
    marginTop: 2,
    color: theme.colors.gray[900],
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: theme.colors.background.main,
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing6,
    marginVertical: theme.spacing.spacing5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.font4,
  },
});
