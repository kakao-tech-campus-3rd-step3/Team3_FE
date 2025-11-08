import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
  },
  loadingText: {
    fontSize: typography.fontSize.font5,
    color: colors.gray[500],
    marginTop: spacing.spacing4,
  },
});
