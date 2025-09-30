import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.spacing4,
  },
  section: {
    marginBottom: theme.spacing.spacing6,
  },
  label: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.spacing2,
    color: theme.colors.gray[900],
  },
  input: {
    padding: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.spacing3,
  },

  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: theme.spacing.spacing5,
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.spacing3,
    color: theme.colors.gray[900],
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing2,
    padding: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing3,
    backgroundColor: theme.colors.white,
  },
  stadiumItem: {
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  closeButton: {
    backgroundColor: theme.colors.red[500],
    padding: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing3,
    alignItems: 'center',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: theme.spacing.spacing1,
    borderWidth: 2,
    borderColor: theme.colors.blue[600],
    marginRight: theme.spacing.spacing2,
  },
  checkboxOn: {
    backgroundColor: theme.colors.blue[600],
  },
  checkboxLabel: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[900],
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.spacing4,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  nextButton: {
    height: 48,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
