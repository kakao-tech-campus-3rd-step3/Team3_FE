import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: theme.colors.background.sub,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
  },
  scrollContainer: {
    flex: 1,
  },
  profileCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing6,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.grass[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.spacing6,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  profileUniversity: {
    fontSize: 16,
    color: theme.colors.grass[500],
    fontWeight: '500',
    marginBottom: theme.spacing.spacing2,
  },
  profileDetails: {
    fontSize: 14,
    color: theme.colors.text.sub,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.spacing6,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[300],
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    padding: theme.spacing.spacing2,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.spacing2,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: theme.colors.background.main,
    shadowColor: theme.colors.gray[900],
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  activeTabText: {
    color: theme.colors.text.main,
    fontWeight: '600',
  },
  warningCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
    marginLeft: theme.spacing.spacing4,
  },
  warningText: {
    fontSize: 14,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  warningSubtext: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  mannerCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  mannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  mannerScoreContainer: {
    alignItems: 'center',
  },
  mannerScore: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: theme.spacing.spacing2,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.colors.text.sub,
    textAlign: 'right',
  },
  reviewsCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  reviewsList: {
    marginTop: theme.spacing.spacing4,
  },
  reviewItem: {
    marginBottom: theme.spacing.spacing4,
  },
  reviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewLabel: {
    fontSize: 14,
    color: theme.colors.text.main,
  },
  settingsCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[300],
  },
  settingText: {
    fontSize: 16,
    color: theme.colors.text.main,
  },
  bottomSpacer: {
    height: theme.spacing.spacing8,
  },
});
