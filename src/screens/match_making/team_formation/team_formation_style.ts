import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '@/src/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  formationSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.spacing.spacing4,
    width: '100%',
    paddingHorizontal: theme.spacing.spacing4,
  },
  formationButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
  },
  formationButtonActive: {
    backgroundColor: theme.colors.blue[600],
  },
  formationButtonText: {
    color: theme.colors.gray[800],
    fontWeight: theme.typography.fontWeight.medium,
  },
  formationButtonTextActive: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  field: {
    width: '100%',
    aspectRatio: 2 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** ✅ 선수 선택 영역 */
  playerCircleUnselected: {
    borderWidth: 0,
  },
  playerCircleSelected: {
    borderWidth: 2,
    borderColor: theme.colors.blue[500],
    borderRadius: 50,
    shadowColor: theme.colors.blue[700],
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  jersey: {
    width: '100%',
    height: '100%',
  },
  playerName: {
    position: 'absolute',
    top: '100%', // 셔츠 바로 밑
    width: '100%',
    textAlign: 'center',
    color: theme.colors.white,
    fontWeight: '700',
    fontSize: theme.typography.fontSize.font3,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nextButton: {
    backgroundColor: theme.colors.blue[600],
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing2,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
  },
  cardContent: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing4,
  },
  cardContainer: {
    marginTop: theme.spacing.spacing4,
  },
  fieldCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContent: {
    paddingBottom: theme.spacing.spacing6,
  },
  nextButtonCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing8,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    marginLeft: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing2,
  },
  memberText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.spacing2,
  },
  placeholderText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  addButton: {
    marginTop: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
  },
  benchListContainer: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing4,
  },

  benchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },

  benchName: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[900],
    fontWeight: theme.typography.fontWeight.medium,
  },

  benchPosition: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.semibold,
  },

  addMoreButton: {
    marginTop: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.blue[400],
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.blue[50],
  },

  addMoreButtonText: {
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.font3,
  },
});
