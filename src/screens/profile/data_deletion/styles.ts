import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    padding: theme.spacing.spacing4,
  },
  title: {
    fontSize: theme.typography.fontSize.font8,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing6,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.line5,
  },
  warningBox: {
    backgroundColor: theme.colors.error + '10',
    borderWidth: 1,
    borderColor: theme.colors.error + '30',
    borderRadius: theme.spacing.spacing2,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  warningTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.error,
    marginBottom: theme.spacing.spacing2,
  },
  warningText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    lineHeight: theme.typography.lineHeight.line5,
  },
  submitButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
    marginTop: theme.spacing.spacing4,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.text.disabled,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
