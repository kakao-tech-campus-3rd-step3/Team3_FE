import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const checkAppliedMatchesStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: theme.spacing.spacing5, // 20
    left: theme.spacing.spacing4, // 16
    right: theme.spacing.spacing4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.red[600],
    paddingVertical: theme.spacing.spacing3, // 14
    paddingHorizontal: theme.spacing.spacing8, // 32
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4, // 16
    fontWeight: theme.typography.fontWeight.semibold, // 600
  },
});
