import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.spacing4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[500],
    marginTop: spacing.spacing2,
  },

  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.spacing10,
  },
  noPermissionTitle: {
    fontSize: typography.fontSize.font7,
    fontWeight: typography.fontWeight.bold,
    color: colors.red[500],
    marginTop: spacing.spacing4,
    marginBottom: spacing.spacing2,
  },
  noPermissionText: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: typography.lineHeight.line6,
    marginBottom: spacing.spacing6,
  },
  backButton: {
    backgroundColor: colors.gray[700],
    paddingHorizontal: spacing.spacing6,
    paddingVertical: spacing.spacing3,
    borderRadius: spacing.spacing2,
  },
  backButtonText: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },

  infoSection: {
    marginBottom: spacing.spacing5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.blue[50],
    padding: spacing.spacing4,
    borderRadius: spacing.spacing3,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue[500],
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.spacing3,
  },
  infoTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.blue[800],
    marginBottom: 4,
  },
  infoText: {
    fontSize: typography.fontSize.font3,
    color: colors.blue[700],
    lineHeight: typography.lineHeight.line5,
  },

  formSection: {
    marginBottom: spacing.spacing5,
  },
  sectionTitle: {
    fontSize: typography.fontSize.font6,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
    marginBottom: spacing.spacing4,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing3,
    padding: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.gray[100],
  },

  inputGroup: {
    marginBottom: spacing.spacing6,
  },
  inputLabel: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
    marginBottom: spacing.spacing2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: spacing.spacing2,
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing3,
    fontSize: typography.fontSize.font4,
    color: colors.gray[900],
    backgroundColor: colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputCounter: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[400],
    textAlign: 'right',
    marginTop: 4,
  },

  radioGroup: {
    gap: spacing.spacing3,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.spacing3,
    paddingHorizontal: spacing.spacing4,
    borderRadius: spacing.spacing2,
    borderWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[50],
  },
  radioOptionSelected: {
    borderColor: colors.blue[500],
    backgroundColor: colors.blue[50],
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.spacing3,
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue[500],
  },
  radioText: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[700],
    fontWeight: typography.fontWeight.medium,
  },
  radioTextSelected: {
    color: colors.blue[800],
    fontWeight: typography.fontWeight.semibold,
  },

  actionSection: {
    flexDirection: 'row',
    gap: spacing.spacing3,
    marginTop: spacing.spacing5,
    marginBottom: spacing.spacing6,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray[100],
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cancelButtonText: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
    flexShrink: 1,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.blue[500],
    paddingVertical: spacing.spacing4,
    borderRadius: spacing.spacing2,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.gray[400],
  },
  saveButtonText: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    flexShrink: 1,
  },
});
