import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.spacing6,
  },
  label: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.spacing2,
    color: theme.colors.gray[900],
  },
  selectedText: {
    fontSize: theme.typography.fontSize.font3,
    marginBottom: theme.spacing.spacing3,
    color: theme.colors.gray[700],
  },
  sliderContainer: {
    alignSelf: 'center',
  },
  selectedTrack: {
    backgroundColor: theme.colors.blue[600],
  },
  unselectedTrack: {
    backgroundColor: theme.colors.gray[300],
  },
  marker: {
    backgroundColor: theme.colors.blue[600],
    height: theme.spacing.spacing6,
    width: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing3,
  },
  levelLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing2,
  },
  levelLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[500],
  },
});
