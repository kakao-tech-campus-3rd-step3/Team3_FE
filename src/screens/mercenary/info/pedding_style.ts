import { StyleSheet } from 'react-native';

import { colors } from '@/src/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  backButton: {
    padding: 8,
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.main,
    flex: 1,
  },

  refreshButton: {
    padding: 8,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  applicationCard: {
    marginBottom: 16,
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  teamInfo: {
    flex: 1,
  },

  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.main,
    marginBottom: 2,
  },

  opponent: {
    fontSize: 14,
    color: colors.text.sub,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },

  matchDetails: {
    gap: 6,
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  detailText: {
    fontSize: 14,
    color: colors.text.sub,
  },

  messageSection: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: colors.background.sub,
    borderRadius: 8,
  },

  messageLabel: {
    fontSize: 12,
    color: colors.text.light,
    marginBottom: 4,
  },

  messageText: {
    fontSize: 14,
    color: colors.text.main,
    lineHeight: 20,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 12,
  },

  appliedAt: {
    fontSize: 12,
    color: colors.text.light,
    marginBottom: 4,
  },

  waitingText: {
    fontSize: 12,
    color: colors.warning,
    fontStyle: 'italic',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.main,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: colors.text.sub,
    textAlign: 'center',
    marginBottom: 24,
  },

  findButton: {
    backgroundColor: colors.brand.main,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  findButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
});
