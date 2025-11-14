import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    title: {
      fontSize: Math.max(24, width * 0.07),
      fontWeight: 'bold',
      color: theme.colors.text.main,
      marginBottom: Math.max(8, width * 0.02),
    },
    subtitle: {
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.sub,
    },
    stepText: {
      fontSize: Math.max(12, width * 0.035),
      color: theme.colors.text.sub,
    },
    progressBar: {
      height: Math.max(6, width * 0.015),
      backgroundColor: theme.colors.gray[200],
      borderRadius: Math.max(3, width * 0.008),
      width: Math.max(280, width * 0.8),
      marginBottom: Math.max(8, width * 0.02),
    },
  });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.spacing6,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.spacing12,
    marginBottom: theme.spacing.spacing8,
  },
  title: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
  },
  progressContainer: {
    marginTop: theme.spacing.spacing4,
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    width: 320,
    marginBottom: theme.spacing.spacing2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.brand.main,
    borderRadius: 4,
  },
  stepText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
