import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '@/src/theme';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.sub,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: theme.colors.background.sub,
    paddingHorizontal: theme.spacing.spacing5,
    paddingBottom: theme.spacing.spacing4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginLeft: theme.spacing.spacing1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },

  headerIcon: {
    padding: theme.spacing.spacing2,
  },

  scrollContent: {
    paddingBottom: theme.spacing.spacing1,
  },

  mainSection: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  matchSection: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  serviceSection: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: 0,
    gap: theme.spacing.spacing4,
  },

  greetingSection: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing5,
    padding: theme.spacing.spacing7,
    alignItems: 'center',
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  greetingText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing4,
    fontWeight: theme.typography.fontWeight.medium,
  },
  greetingSubtext: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    textAlign: 'center',
  },
  highlightText: {
    color: theme.colors.grass[300],
  },

  activityStatsContainer: {
    width: '100%',
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  statsTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginLeft: theme.spacing.spacing2,
  },

  matchStatusCard: {
    width: '100%',
    marginBottom: theme.spacing.spacing4,
  },
  matchScheduledContainer: {
    backgroundColor: theme.colors.green[50],
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  matchScheduledText: {
    flex: 1,
  },
  matchScheduledTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.green[700],
    marginBottom: theme.spacing.spacing1,
  },
  matchScheduledSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.green[600],
    fontWeight: theme.typography.fontWeight.medium,
  },
  noMatchContainer: {
    backgroundColor: theme.colors.orange[50],
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
  },
  noMatchText: {
    flex: 1,
  },
  noMatchTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.orange[700],
    marginBottom: theme.spacing.spacing1,
  },
  noMatchSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.orange[600],
    fontWeight: theme.typography.fontWeight.medium,
  },

  benefitsSection: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing5,
    padding: theme.spacing.spacing6,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  benefitsTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginRight: theme.spacing.spacing2,
  },

  benefitsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: screenWidth < 375 ? theme.spacing.spacing2 : theme.spacing.spacing3,
  },
  benefitCard: {
    flex: 1,
    padding:
      screenWidth < 375 ? theme.spacing.spacing4 : theme.spacing.spacing5,
    borderRadius: theme.spacing.spacing4,
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    minHeight: screenWidth < 375 ? 110 : 120,
    justifyContent: 'center',
  },
  benefitTitle: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing1,
  },
  benefitSubtitle: {
    fontSize:
      screenWidth < 375
        ? theme.typography.fontSize.font1
        : theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing2,
    lineHeight: screenWidth < 375 ? 16 : 18,
    flexShrink: 1,
  },
  benefitIcon: {
    fontSize: theme.typography.fontSize.font7,
  },
  benefitIconContainer: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  statsCard: {
    margin: 0,
    marginTop: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4,
    padding: theme.spacing.spacing2,
    minHeight: theme.spacing.spacing15,
    width: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: theme.spacing.spacing2,
  },
  statValue: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
  additionalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.spacing5,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[300],
    paddingHorizontal: theme.spacing.spacing2,
  },
  additionalStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
    paddingVertical: theme.spacing.spacing1,
  },
  additionalStatText: {
    fontSize: theme.typography.fontSize.font1,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.regular,
  },
  footballIcon: {
    fontSize: theme.typography.fontSize.font4,
    marginRight: theme.spacing.spacing1,
  },
  locationIcon: {
    fontSize: theme.typography.fontSize.font4,
    marginRight: theme.spacing.spacing1,
  },

  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
    marginTop: theme.spacing.spacing8,
    marginBottom: theme.spacing.spacing6,
    marginHorizontal: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing1,
  },

  weatherSection: {
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  weatherHeader: {
    marginBottom: theme.spacing.spacing3,
  },
  weatherSectionTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  weatherHighlightText: {
    color: theme.colors.blue[400],
  },
  weatherCard: {
    marginBottom: theme.spacing.spacing4,
  },
  weatherCardHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
  },
  weatherInfo: {
    flex: 1,
    gap: theme.spacing.spacing2,
  },
  weatherMain: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.spacing3,
  },
  weatherDetails: {
    gap: theme.spacing.spacing1,
  },
  temperature: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
  },
  weatherDescription: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    fontWeight: theme.typography.fontWeight.medium,
  },
  weatherStats: {
    flexDirection: 'row' as const,
    gap: theme.spacing.spacing3,
  },
  weatherStatItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.spacing1,
  },
  weatherStatText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.text.sub,
  },
  weatherBadge: {
    alignItems: 'flex-end' as const,
  },
  footballBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    backgroundColor: theme.colors.green[50],
  },
  footballBadgeText: {
    fontSize: theme.typography.fontSize.font2,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.green[700],
  },
});
