import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.spacing3,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    alignItems: 'center',
  },
  selectedButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[500],
    borderWidth: 1,
    borderColor: theme.colors.blue[500],
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text.main,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
