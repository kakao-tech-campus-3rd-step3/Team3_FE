import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const checkAppliedMatchesStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.red[600],
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
