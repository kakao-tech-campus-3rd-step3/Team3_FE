import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  headerSection: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing6,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.line6,
  },
  universityList: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing3,
  },
  universityCard: {
    marginBottom: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.colors.text.main,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  universityCardSelected: {
    backgroundColor: theme.colors.blue[50],
    borderColor: theme.colors.blue[500],
    shadowColor: theme.colors.blue[500],
    shadowOpacity: 0.1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  universityLogo: {
    width: theme.spacing.spacing12,
    height: theme.spacing.spacing12,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.spacing4,
  },
  universityLogoSelected: {
    backgroundColor: theme.colors.blue[500],
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  universityNameSelected: {
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.bold,
  },
  selectedIndicator: {
    width: theme.spacing.spacing6,
    height: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.spacing3,
  },
  selectedIndicatorText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.bold,
  },
  bottomButtonContainer: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingTop: theme.spacing.spacing3,
    paddingBottom: theme.spacing.spacing8,
  },
  connectButton: {
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonActive: {
    backgroundColor: theme.colors.blue[500],
    opacity: 0.8,
  },
  connectButtonText: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.light,
  },
  connectButtonTextActive: {
    color: theme.colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.gray[500],
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
