import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const getDynamicStyles = (width: number) => {
  return StyleSheet.create({
    topSection: {
      flex: 1,
      paddingHorizontal: Math.max(20, width * 0.05),
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSection: {
      paddingHorizontal: Math.max(20, width * 0.05),
      paddingTop: Math.max(20, width * 0.05),
      paddingBottom: Math.max(40, width * 0.1),
      justifyContent: 'flex-start',
    },
    cardsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Math.max(40, width * 0.1),
      position: 'relative',
      height: Math.max(380, width * 0.95),
    },
  });
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: theme.spacing.spacing10,
    left: theme.spacing.spacing5,
    right: theme.spacing.spacing5,
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.red[500],
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  notificationText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
