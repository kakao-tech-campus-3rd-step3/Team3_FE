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
  textInput: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    fontSize: 16,
    color: theme.colors.text.main,
    minHeight: 50,
  },
  textAreaInput: {
    minHeight: 120,
    paddingTop: theme.spacing.spacing3,
  },
});
