import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.spacing6,
  },
  label: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.spacing2,
    color: theme.colors.gray[900],
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font3,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
