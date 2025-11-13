import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  createSubmitButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: 16,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    marginVertical: theme.spacing.spacing6,
    shadowColor: theme.colors.brand.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createSubmitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
