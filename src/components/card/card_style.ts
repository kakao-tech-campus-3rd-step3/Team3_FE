import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    margin: spacing.spacing2,
  },

  elevated: {
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    ...typography.text.h4,
    color: colors.text.main,
    marginBottom: spacing.spacing1,
  },

  subtitle: {
    ...typography.text.bodySmall,
    color: colors.text.sub,
    marginBottom: spacing.spacing2,
  },

  content: {
    marginTop: spacing.spacing2,
  },
});
