import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.text.sub,
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  updateSubmitButton: {
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
  updateSubmitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
