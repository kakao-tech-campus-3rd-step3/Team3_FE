import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  formContainer: {
    padding: theme.spacing.spacing6,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing5,
  },
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.main,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: theme.colors.gray[100],
    color: theme.colors.text.sub,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.error,
    marginTop: theme.spacing.spacing1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
    marginVertical: theme.spacing.spacing6,
  },
  levelContainer: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  levelOption: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    alignItems: 'center',
    backgroundColor: theme.colors.background.main,
  },
  levelOptionSelected: {
    borderColor: theme.colors.grass[500],
    backgroundColor: theme.colors.grass[50],
  },
  levelOptionText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
  levelOptionTextSelected: {
    color: theme.colors.grass[700],
    fontWeight: theme.typography.fontWeight.bold,
  },
  saveButton: {
    backgroundColor: theme.colors.grass[500],
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
    marginTop: theme.spacing.spacing6,
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
