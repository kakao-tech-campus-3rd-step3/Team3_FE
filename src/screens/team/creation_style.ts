import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  inputContainer: {
    marginBottom: theme.spacing.spacing6,
  },
  textInputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.error,
    marginTop: theme.spacing.spacing1,
  },
  selectorContainer: {
    marginBottom: theme.spacing.spacing6,
  },

  stepContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  stepHeader: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingTop: theme.spacing.spacing10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing5,
    justifyContent: 'center',
  },
  stepFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: 20,
    paddingBottom: theme.spacing.spacing12,
  },
  stepSelectorButtonActive: {
    borderColor: theme.colors.blue[500],
    backgroundColor: theme.colors.blue[50],
  },
  stepSelectorButtonTextActive: {
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.semibold,
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[200],
  },
  progressContainer: {
    paddingVertical: 8,
    backgroundColor: theme.colors.background.main,
    marginTop: -theme.spacing.spacing2,
  },
  progressBar: {
    height: theme.spacing.spacing1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.blue[500],
    borderRadius: theme.spacing.spacing1,
  },
  progressText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: theme.typography.fontSize.font5,
    color: theme.colors.text.main,
    flex: 1,
  },
  placeholderText: {
    color: theme.colors.text.light,
  },
  readOnlyField: {
    backgroundColor: theme.colors.gray[50],
    borderColor: theme.colors.gray[200],
  },
  readOnlyText: {
    color: theme.colors.text.sub,
  },
});
