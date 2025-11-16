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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.sub,
  },
  contentContainer: {
    paddingHorizontal: spacing.spacing4,
    paddingTop: spacing.spacing2,
    paddingBottom: spacing.spacing4,
  },
});
