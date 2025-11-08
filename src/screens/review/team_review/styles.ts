import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing5,
  },
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  sectionError: {
    borderColor: theme.colors.red[400],
    borderWidth: 1.5,
    backgroundColor: theme.colors.red[50],
  },
  sectionHeader: {
    marginBottom: theme.spacing.spacing5,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.spacing1,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[600],
    lineHeight: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
  },
  starButton: {
    padding: theme.spacing.spacing1,
  },
  optionRow: {
    flexDirection: 'row',
    gap: theme.spacing.spacing3,
  },
  optionButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1.5,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  optionButtonSelected: {
    borderColor: theme.colors.brand.main,
    backgroundColor: theme.colors.brand.main,
  },
  optionButtonText: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[700],
  },
  optionButtonTextSelected: {
    color: theme.colors.white,
  },
  submitButton: {
    height: 56,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.brand.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing8,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
