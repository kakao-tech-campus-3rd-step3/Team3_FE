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
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing3,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1.2,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: theme.colors.gray[400],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1.2,
    borderColor: theme.colors.blue[700],
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: theme.colors.blue[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[700],
  },
  selectedButtonText: {
    color: theme.colors.white,
  },
  submitButton: {
    height: 56,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.spacing6,
    marginHorizontal: theme.spacing.spacing2,
    shadowColor: theme.colors.blue[600],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
    shadowOpacity: 0,
    elevation: 0,
  },

  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
  errorCard: {
    borderWidth: 1.5,
    borderColor: theme.colors.red[500],
    backgroundColor: theme.colors.red[50],
  },
});
