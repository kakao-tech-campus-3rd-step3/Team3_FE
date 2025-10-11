import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContent: {
    padding: theme.spacing.spacing4,
    paddingBottom: 60,
  },

  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing2,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
  },

  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  selectButtonText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[700],
    flex: 1,
  },
  selectButtonIcon: {
    fontSize: theme.typography.fontSize.font5,
    color: theme.colors.gray[400],
    fontWeight: theme.typography.fontWeight.bold,
  },

  // 날짜/시간 컨테이너
  dateTimeContainer: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing4,
  },
  dateTimeButton: {
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[50],
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.blue[200],
    marginBottom: theme.spacing.spacing3,
  },
  dateTimeLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.spacing1,
  },
  dateTimeValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  timeRow: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  timeButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing3,
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    alignItems: 'center',
  },
  timeButtonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  timeButtonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  timeLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[600],
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.spacing1,
  },
  timeValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  optionContent: {
    flex: 1,
    marginRight: theme.spacing.spacing3,
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.spacing1,
  },
  optionDescription: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[600],
    lineHeight: 18,
  },

  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.gray[300],
    justifyContent: 'center',
    paddingHorizontal: 2,
    position: 'relative',
  },
  toggleActive: {
    backgroundColor: theme.colors.blue[500],
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    position: 'absolute',
    right: 2,
  },
  toggleThumbInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    position: 'absolute',
    left: 2,
  },

  bottomSpacing: {
    height: theme.spacing.spacing6,
  },

  fixedBottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButton: {
    height: 56,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.blue[600],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },

  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.spacing.spacing4,
    borderTopRightRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.spacing4,
    color: theme.colors.gray[900],
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
  },
  stadiumItem: {
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  closeButton: {
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    marginTop: theme.spacing.spacing4,
    alignItems: 'center',
  },

  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
  },
  successModalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing6,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  successIconContainer: {
    marginBottom: theme.spacing.spacing4,
  },
  successIcon: {
    fontSize: 48,
  },
  successTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  successMessage: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.spacing5,
  },
  successInfoContainer: {
    width: '100%',
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing5,
  },
  successInfoText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing3,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
