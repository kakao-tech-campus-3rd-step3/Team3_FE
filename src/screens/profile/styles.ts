import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.background.sub,
  },
  profileCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
    gap: theme.spacing.spacing3,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  settingsCard: {
    margin: theme.spacing.spacing6,
    marginBottom: theme.spacing.spacing2,
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
  settingValue: {
    fontSize: 14,
    color: theme.colors.text.sub,
    marginRight: theme.spacing.spacing2,
  },
  bottomSpacer: {
    height: theme.spacing.spacing1,
  },
});
