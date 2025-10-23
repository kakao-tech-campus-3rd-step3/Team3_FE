import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing20,
  },

  successSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
    marginBottom: theme.spacing.spacing6,
  },
  successIconContainer: {
    marginBottom: theme.spacing.spacing4,
  },
  successTitle: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.green[600],
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.line6,
  },

  teamInfoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing5,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[900],
  },
  infoList: {
    gap: theme.spacing.spacing4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing3,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.spacing1,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[900],
    fontWeight: theme.typography.fontWeight.medium,
  },

  buttonContainer: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing5,
  },
  homeButton: {
    height: 48,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.spacing2,
    shadowColor: theme.colors.blue[300],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
