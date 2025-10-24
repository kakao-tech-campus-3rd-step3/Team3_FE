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

  /** ✅ 배경 필드 수정 */
  field: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.5, // 세로 길이 = 가로의 1.5배 (9:16보다 살짝 짧게)
    alignSelf: 'center',
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
    color: theme.colors.white, // ✅ 흰색으로 변경
    fontWeight: '700', // ✅ 굵게 표시
    fontSize: theme.typography.fontSize.font3,
    textShadowColor: 'rgba(0, 0, 0, 0.4)', // ✅ 가독성 향상
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nextButton: {
    backgroundColor: theme.colors.blue[600],
    margin: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
