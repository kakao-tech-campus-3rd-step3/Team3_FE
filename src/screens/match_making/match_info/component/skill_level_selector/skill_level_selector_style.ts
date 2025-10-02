import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const style = StyleSheet.create({
  section: {
    // 카드 내부에서 사용되므로 패딩 제거
  },
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.spacing3,
    color: theme.colors.gray[900],
    textAlign: 'center',
    paddingTop: theme.spacing.spacing4, // 상단 여백 추가
  },
  selectedText: {
    fontSize: theme.typography.fontSize.font5,
    marginBottom: theme.spacing.spacing6,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    backgroundColor: theme.colors.blue[50],
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 2,
    borderColor: theme.colors.blue[200],
  },
  sliderContainer: {
    padding: theme.spacing.spacing4,
  },
  levelLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.spacing4,
    paddingHorizontal: 20, // 패딩 증가
  },
  levelLabelContainer: {
    alignItems: 'center',
    flex: 1,
  },
  levelLabel: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  levelDescription: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginTop: theme.spacing.spacing1,
  },
  sliderWrapper: {
    marginVertical: theme.spacing.spacing4,
    paddingHorizontal: 30, // 슬라이더 바를 오른쪽으로 이동
  },
  containerStyle: {
    height: 40,
  },
  trackStyle: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray[200],
  },
  selectedStyle: {
    backgroundColor: theme.colors.blue[500],
    height: 6,
    borderRadius: 3,
  },
  unselectedStyle: {
    backgroundColor: theme.colors.gray[200],
    height: 6,
    borderRadius: 3,
  },
  markerStyle: {
    backgroundColor: theme.colors.blue[500],
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: theme.colors.background.main,
    shadowColor: theme.colors.blue[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pressedMarkerStyle: {
    backgroundColor: theme.colors.blue[600],
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: theme.colors.background.main,
    shadowColor: theme.colors.blue[600],
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  rangeLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing3,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingHorizontal: 20, // 패딩 증가
  },
  rangeLabel: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.gray[600],
    textAlign: 'center',
  },
});
