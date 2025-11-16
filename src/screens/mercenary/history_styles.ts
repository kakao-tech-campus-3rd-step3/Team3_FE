import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing6,
  },
  listContainer: {
    paddingVertical: theme.spacing.spacing4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.sub,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing2,
  },
});
