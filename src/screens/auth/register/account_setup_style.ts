import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    label: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.text.main,
      marginBottom: Math.max(8, width * 0.02),
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border.input,
      borderRadius: Math.max(8, width * 0.02),
      paddingHorizontal: Math.max(16, width * 0.04),
      paddingVertical: Math.max(12, width * 0.03),
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      backgroundColor: theme.colors.background.input,
    },
    errorText: {
      color: theme.colors.red[500],
      fontSize: Math.max(12, width * 0.035),
      marginTop: Math.max(8, width * 0.02),
    },
    checkboxText: {
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      lineHeight: Math.max(20, width * 0.05),
    },
    linkText: {
      fontSize: Math.max(12, width * 0.035),
      color: theme.colors.brand.main,
      marginTop: Math.max(4, width * 0.01),
      textDecorationLine: 'underline',
    },
    prevButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.text.sub,
    },
    submitButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.white,
    },
  });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingBottom: theme.spacing.spacing20,
    minHeight: '100%',
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing6,
  },
  inputFilled: {
    borderColor: theme.colors.brand.main,
  },
  inputError: {
    borderColor: theme.colors.red[500],
  },
  agreementContainer: {
    marginBottom: theme.spacing.spacing8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    borderRadius: 4,
    marginRight: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    textAlignVertical: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.gray[400],
    borderColor: theme.colors.gray[400],
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: theme.typography.fontSize.font3,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    gap: theme.spacing.spacing4,
  },
  prevButton: {
    flex: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.sub,
  },
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.main,
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
});
