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
  dateTimeButton: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    alignItems: 'center',
    minHeight: 60,
  },
  dateTimeLabel: {
    fontSize: 14,
    color: theme.colors.brand.main,
    fontWeight: '600',
    marginBottom: theme.spacing.spacing1,
  },
  dateTimeValue: {
    fontSize: 16,
    color: theme.colors.text.main,
    fontWeight: '600',
  },
});
