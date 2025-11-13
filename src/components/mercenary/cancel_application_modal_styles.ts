import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    width: '90%',
    maxWidth: 400,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  modalContent: {
    padding: theme.spacing.spacing5,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
    lineHeight: 22,
  },
  selectedTeamInfo: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4,
  },
  teamLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
  },
  teamNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  reasonSection: {
    marginBottom: theme.spacing.spacing4,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    fontSize: 14,
    color: theme.colors.text.main,
    minHeight: 100,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: theme.spacing.spacing3,
    padding: theme.spacing.spacing5,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
