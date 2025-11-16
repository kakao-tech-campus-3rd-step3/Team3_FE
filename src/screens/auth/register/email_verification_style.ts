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
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      backgroundColor: theme.colors.background.input,
      textAlignVertical: 'center',
      minHeight: 50,
    },
    errorText: {
      color: theme.colors.red[500],
      fontSize: Math.max(12, width * 0.035),
      marginTop: Math.max(8, width * 0.02),
    },
    nextButton: {
      backgroundColor: theme.colors.brand.main,
      paddingVertical: Math.max(12, width * 0.03),
      paddingHorizontal: Math.max(20, width * 0.05),
      borderRadius: Math.max(8, width * 0.02),
      alignItems: 'center',
      marginTop: Math.max(20, width * 0.05),
    },
    nextButtonText: {
      color: theme.colors.white,
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
    },
  });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingBottom: theme.spacing.spacing20,
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
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  nextButtonTextDisabled: {
    color: theme.colors.gray[500],
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  emailInput: {
    flex: 4,
    textAlignVertical: 'center',
    minHeight: 50,
  },
  sendCodeButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  sendCodeButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  sendCodeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  sendCodeButtonTextDisabled: {
    color: theme.colors.gray[500],
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  verificationInput: {
    flex: 4,
    textAlignVertical: 'center',
    minHeight: 50,
  },
  verifyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  verifyButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  verifyButtonTextDisabled: {
    color: theme.colors.gray[500],
  },
  verifiedText: {
    color: theme.colors.green[600],
    fontSize: theme.typography.fontSize.font3,
    marginTop: theme.spacing.spacing2,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
