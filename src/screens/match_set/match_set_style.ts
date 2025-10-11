import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
  // 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main, // '#f9fafb'
    padding: theme.spacing.spacing4, // 16px
  },

  // 콘텐츠 정렬 영역
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.spacing4,
  },

  // 상단 성공 메시지
  successText: {
    fontSize: theme.typography.fontSize.font5, // 18px
    fontWeight: theme.typography.fontWeight.bold, // 700
    color: theme.colors.green[600], // '#16a34a'
    marginBottom: theme.spacing.spacing6, // 24px
  },

  // 정보 박스
  infoBox: {
    backgroundColor: theme.colors.white, // '#ffffff'
    padding: theme.spacing.spacing4, // 16px
    borderRadius: theme.spacing.spacing3, // 12px
    borderWidth: 1,
    borderColor: theme.colors.gray[200], // '#e5e7eb'
    width: '100%',
  },

  // 정보 텍스트
  infoText: {
    fontSize: theme.typography.fontSize.font4, // 16px
    color: theme.colors.text.main, // '#111827'
    marginBottom: theme.spacing.spacing2, // 8px
  },

  // 하단 고정 바
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.spacing4, // 16px
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },

  // 홈 버튼
  homeButton: {
    height: theme.spacing.spacing12, // 48px
    borderRadius: theme.spacing.spacing3, // 12px
    backgroundColor: theme.colors.blue[600], // '#2563eb'
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 홈 버튼 텍스트
  homeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4, // 16px
    fontWeight: theme.typography.fontWeight.bold, // 700
  },
});
