import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    paddingHorizontal: theme.spacing.spacing4,
    paddingTop: theme.spacing.spacing5,
  },

  // ⭐ 별점 영역
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
  },

  // 옵션 버튼 그룹
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.spacing3,
  },

  // 🟩 기본 버튼 (비선택 상태)
  button: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1.2,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: theme.colors.gray[200],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  // 🟦 선택된 버튼
  selectedButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    marginHorizontal: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1.2,
    borderColor: theme.colors.blue[600],
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: theme.colors.blue[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  // 버튼 텍스트
  buttonText: {
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main, // 기본은 검정
  },

  // 선택된 버튼의 텍스트 색상은 white로 덮어씌우기
  selectedButtonText: {
    color: theme.colors.white,
  },

  // 제출 버튼
  submitButton: {
    height: 56,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.colors.blue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.spacing6,
    marginHorizontal: theme.spacing.spacing2,
    shadowColor: theme.colors.blue[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
