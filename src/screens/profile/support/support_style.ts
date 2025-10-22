import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    padding: theme.spacing.spacing4,
  },
  title: {
    fontSize: theme.typography.fontSize.font8,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing6,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.spacing6,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
  contactItem: {
    marginBottom: theme.spacing.spacing4,
  },
  contactLabel: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.sub,
    padding: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  contactValue: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  contactArrow: {
    fontSize: theme.typography.fontSize.font5,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing2,
  },
  faqItem: {
    marginBottom: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  faqQuestion: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  faqAnswer: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line5,
  },
  operatingHours: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
    lineHeight: theme.typography.lineHeight.line5,
  },
  note: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    fontStyle: 'italic',
    lineHeight: theme.typography.lineHeight.line4,
  },
});
