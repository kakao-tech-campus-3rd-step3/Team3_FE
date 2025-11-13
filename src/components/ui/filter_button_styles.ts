import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  filterSection: {
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    gap: theme.spacing.spacing2,
  },
  searchButtonText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.main,
  },
  clearButton: {
    padding: theme.spacing.spacing1,
  },
});
