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
    prevButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.text.sub,
    },
    nextButtonText: {
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
  nextButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.main,
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
});
