import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  formSection: {
    marginBottom: theme.spacing.spacing6,
    marginTop: theme.spacing.spacing4,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
});
