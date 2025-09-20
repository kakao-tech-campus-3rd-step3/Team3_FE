import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  formCard: {
    margin: theme.spacing.spacing6,
    marginTop: theme.spacing.spacing4,
  },
});
