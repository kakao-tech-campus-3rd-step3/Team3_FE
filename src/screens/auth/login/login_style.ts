import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing8,
    justifyContent: 'center',
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing15,
    marginTop: -theme.spacing.spacing20,
  },
  logoText: {
    fontSize: theme.typography.text.auth.logo.fontSize,
    fontWeight: theme.typography.text.auth.logo.fontWeight,
    color: theme.colors.brand.main,
    marginBottom: theme.spacing.spacing2,
  },
  tagline: {
    fontSize: theme.typography.text.auth.tagline.fontSize,
    color: theme.colors.text.sub,
    textAlign: 'center',
    fontWeight: theme.typography.text.auth.tagline.fontWeight,
  },
  formContainer: {
    alignItems: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing4,
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
  countryCode: {
    fontSize: theme.typography.text.body.fontSize,
    color: theme.colors.text.main,
    marginRight: theme.spacing.spacing2,
    fontWeight: theme.typography.fontWeight.medium,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.text.body.fontSize,
    color: theme.colors.text.main,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: theme.typography.text.body.lineHeight,
    height: theme.spacing.spacing6,
    paddingTop: 0,
    paddingBottom: 0,
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
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  helpSection: {
    marginTop: theme.spacing.spacing8,
    alignItems: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  helpText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.bodySmall.fontSize,
    marginLeft: theme.spacing.spacing1,
  },
  signupSection: {
    position: 'absolute',
    bottom: theme.spacing.spacing10,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
  },
  signupText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.body.fontSize,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.text.body.lineHeight,
  },
  signupLink: {
    color: theme.colors.brand.main,
    fontSize: theme.typography.text.body.fontSize,
    fontWeight: theme.typography.fontWeight.semibold,
    textDecorationLine: 'underline',
    lineHeight: theme.typography.text.body.lineHeight,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: theme.spacing.spacing2,
  },
  tempButton: {
    position: 'absolute',
    top: theme.spacing.spacing4,
    right: theme.spacing.spacing4,
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing3,
    zIndex: 1,
  },
  tempButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.bodySmall.fontSize,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
