import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing3,
    width: '100%',
    height: theme.spacing.spacing14,
    justifyContent: 'flex-start',
  },
  inputGroupFocused: {
    borderBottomColor: theme.colors.grass[500],
  },
  inputIcon: {
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
    height: theme.spacing.spacing5,
    width: theme.spacing.spacing5,
  },
  emailIcon: {
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
    minHeight: 50,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputError: {
    borderBottomColor: theme.colors.error,
  },
  passwordToggle: {
    padding: theme.spacing.spacing1,
    opacity: 0.7,
    marginTop: -theme.spacing.spacing1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.spacing4,
  },
  forgotPasswordText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.bodySmall.fontSize,
  },
  loginButton: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.spacing.spacing13,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
  },
  loginButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  errorText: {
    fontSize: theme.typography.text.caption.fontSize,
    color: theme.colors.error,
    marginLeft: theme.spacing.spacing1,
  },
});
