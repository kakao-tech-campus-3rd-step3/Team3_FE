import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.main,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.brand.main + '20',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
});
