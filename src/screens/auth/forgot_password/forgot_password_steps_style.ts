import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing15,
  },
  title: {
    fontSize: theme.typography.text.auth.logo.fontSize,
    fontWeight: theme.typography.text.auth.logo.fontWeight,
    color: theme.colors.brand.main,
    marginBottom: theme.spacing.spacing4,
  },
  subtitle: {
    fontSize: theme.typography.text.auth.tagline.fontSize,
    color: theme.colors.text.sub,
    textAlign: 'center',
    fontWeight: theme.typography.text.auth.tagline.fontWeight,
    lineHeight: theme.typography.text.auth.tagline.lineHeight,
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    width: '100%',
    height: theme.spacing.spacing14,
    justifyContent: 'flex-start',
  },
  inputIcon: {
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
    height: theme.spacing.spacing5,
    width: theme.spacing.spacing5,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.text.body.fontSize,
    color: theme.colors.text.main,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.spacing.spacing13,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  backSection: {
    alignItems: 'center',
  },
  backText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.body.fontSize,
    textDecorationLine: 'underline',
  },
});
