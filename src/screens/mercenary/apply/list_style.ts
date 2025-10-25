import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  backButton: {
    padding: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing2,
  },

  headerTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    flex: 1,
  },

  placeholder: {
    width: theme.spacing.spacing10,
  },

  dateFilterContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  dateFilterContent: {
    paddingHorizontal: theme.spacing.spacing4,
    alignItems: 'center',
  },

  allViewButton: {
    backgroundColor: '#000',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing5,
    marginRight: theme.spacing.spacing3,
  },

  allViewButtonText: {
    color: '#fff',
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
  },

  selectedAllViewButton: {
    backgroundColor: '#495057',
  },

  selectedAllViewButtonText: {
    color: '#fff',
  },

  dateButton: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing5,
    marginRight: theme.spacing.spacing2,
  },

  selectedDateButton: {
    backgroundColor: '#495057',
  },

  dateButtonText: {
    color: '#495057',
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
  },

  selectedDateButtonText: {
    color: '#fff',
  },

  filterSection: {
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },

  filterScroll: {
    paddingHorizontal: theme.spacing.spacing4,
  },

  filterButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing5,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    marginRight: theme.spacing.spacing2,
  },

  filterButtonActive: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },

  filterText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.main,
  },

  filterTextActive: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.medium,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
  },

  matchCard: {
    marginBottom: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing3,
  },

  teamInfo: {
    flex: 1,
  },

  teamName: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: 2,
  },

  opponent: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },

  levelBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.brand.main,
  },

  levelText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.medium,
  },

  matchDetails: {
    gap: 6,
    marginBottom: theme.spacing.spacing3,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },

  detailText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },

  positionsSection: {
    marginBottom: theme.spacing.spacing3,
  },

  positionsLabel: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    marginBottom: 6,
  },

  positionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  positionTag: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },

  positionText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.main,
  },

  description: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    lineHeight: theme.typography.lineHeight.line5,
    marginBottom: theme.spacing.spacing4,
  },

  applyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing2,
    alignItems: 'center',
  },

  applyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing15,
  },

  emptyIcon: {
    fontSize: theme.spacing.spacing12,
    marginBottom: theme.spacing.spacing4,
  },

  emptyTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },

  emptySubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
});
