import { StyleSheet, Dimensions } from 'react-native';

import { colors, spacing, typography } from '@/src/theme';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    paddingTop: spacing.spacing3,
    backgroundColor: colors.gray[50],
  },
  contentContainer: {
    paddingHorizontal: spacing.spacing4,
    paddingBottom: spacing.spacing10,
  },
  membersSection: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    padding: spacing.spacing5,
    marginBottom: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: typography.fontSize.font6,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
    marginBottom: spacing.spacing4,
  },
  matchManagementList: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: screenWidth < 375 ? spacing.spacing2 : spacing.spacing3,
    justifyContent: 'space-between',
  },
  matchManagementItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: screenWidth < 375 ? spacing.spacing3 : spacing.spacing4,
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing3,
    flex: 1,
    minWidth: 0,
  },
  matchManagementInfo: {
    alignItems: 'center',
    marginTop: spacing.spacing2,
    width: '100%',
  },
  matchManagementTitle: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
    textAlign: 'center',
    flexShrink: 1,
  },
});

export const getMatchManagementTitleStyle = (screenWidth: number) => {
  if (screenWidth < 360) {
    return {
      fontSize: 11,
      minFontSize: 9,
      iconSize: 28,
    };
  } else if (screenWidth < 400) {
    return {
      fontSize: 12,
      minFontSize: 10,
      iconSize: 30,
    };
  }
  return {
    fontSize: 14,
    minFontSize: 12,
    iconSize: 32,
  };
};
