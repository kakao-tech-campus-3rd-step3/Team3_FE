import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '@/src/theme';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

export const style = StyleSheet.create({
  section: {},
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.spacing2,
    color: theme.colors.gray[900],
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
  },
  selectedLevelSection: {
    marginVertical: theme.spacing.spacing1,
    paddingHorizontal: theme.spacing.spacing4,
  },
  selectedText: {
    fontSize: theme.typography.fontSize.font5,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.blue[50],
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 2,
    borderColor: theme.colors.blue[200],
  },
  sliderContainer: {
    padding: theme.spacing.spacing2,
  },
  dropdownContainer: {
    marginVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing4,
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: theme.spacing.spacing4,
  },
  dropdownItem: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: isTablet
      ? theme.typography.fontSize.font4
      : theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.spacing2,
  },
  dropdown: {
    height: isTablet ? 50 : 45,
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    paddingHorizontal: theme.spacing.spacing3,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownPlaceholder: {
    fontSize: isTablet
      ? theme.typography.fontSize.font4
      : theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
  },
  dropdownSelectedText: {
    fontSize: isTablet
      ? theme.typography.fontSize.font4
      : theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
    fontWeight: theme.typography.fontWeight.medium,
  },
});
