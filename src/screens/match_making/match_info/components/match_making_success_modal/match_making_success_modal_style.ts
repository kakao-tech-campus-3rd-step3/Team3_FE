import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
  },

  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 20, // ← 하드코딩 OK
    paddingVertical: theme.spacing.spacing8,
    paddingHorizontal: theme.spacing.spacing6,
    alignItems: 'center',
    width: '90%',
    maxWidth: 380,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },

  title: {
    fontSize: 20, // ← lg (font6)
    fontWeight: 'bold',
    color: theme.colors.blue[600],
    marginBottom: theme.spacing.spacing3,
  },

  message: {
    textAlign: 'center',
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.spacing6,
    lineHeight: 22,
    fontSize: 16, // ← md (font4)
  },

  infoContainer: {
    marginBottom: theme.spacing.spacing6,
    alignItems: 'center',
    gap: theme.spacing.spacing1,
  },

  infoText: {
    color: theme.colors.gray[800],
    fontSize: 14, // ← sm 정도 (font3)
  },

  button: {
    backgroundColor: theme.colors.blue[500],
    borderRadius: 12, // ← 하드코딩 OK
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing6,
  },

  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 16, // ← md (font4)
  },
});
