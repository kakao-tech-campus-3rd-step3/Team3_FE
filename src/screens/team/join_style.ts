import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  headerSection: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing3,
  },
  title: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.line6,
    marginBottom: theme.spacing.spacing3,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamList: {
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing10,
  },
  teamCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing2,
  },
  teamName: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  teamTypeBadge: {
    backgroundColor: theme.colors.blue[50],
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  teamTypeText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.blue[500],
    fontWeight: theme.typography.fontWeight.medium,
  },
  teamDescription: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line5,
    marginBottom: theme.spacing.spacing3,
  },
  teamInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing1,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing1,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.spacing1,
    fontWeight: theme.typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  joinButton: {
    backgroundColor: theme.colors.blue[500],
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    alignItems: 'center',
    opacity: 0.8,
  },
  joinButtonText: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
  teamTitleSection: {
    flex: 1,
    marginRight: theme.spacing.spacing3,
  },
  universityName: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
