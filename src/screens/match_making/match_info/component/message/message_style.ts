import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  section: {
    // 카드 내부에서 사용되므로 마진 제거
  },
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.spacing3,
    color: theme.colors.gray[900],
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.sub,
    padding: theme.spacing.spacing4,
    fontSize: theme.typography.fontSize.font3,
    minHeight: 120,
    textAlignVertical: 'top',
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
});
