import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  contentContainer: {
    padding: spacing.spacing4,
  },
});
