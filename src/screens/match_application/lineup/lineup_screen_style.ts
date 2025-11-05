import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '@/src/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContent: {
    paddingBottom: theme.spacing.spacing6,
  },

  // 카드 공통
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

  // 필드 카드 (축구장)
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
  field: {
    width: SCREEN_WIDTH - theme.spacing.spacing8,
    aspectRatio: 2 / 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 선수 셔츠 / 이름
  jersey: {
    width: '100%',
    height: '100%',
  },
  playerName: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    textAlign: 'center',
    color: theme.colors.white,
    fontWeight: '700',
    fontSize: theme.typography.fontSize.font3,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // 후보 라인업
  placeholderText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing3,
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
});
