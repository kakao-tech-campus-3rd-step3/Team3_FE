import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export default StyleSheet.create({
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
  lastUpdated: {
    fontSize: theme.typography.fontSize.font3,
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
    marginBottom: theme.spacing.spacing3,
  },
  sectionContent: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    lineHeight: theme.typography.lineHeight.line6,
    marginBottom: theme.spacing.spacing2,
  },
});
