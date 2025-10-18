import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';
import { typography } from '@/src/theme/typography';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },

  // 검색 영역
  searchWrap: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    marginHorizontal: theme.spacing.spacing5,
    marginTop: theme.spacing.spacing6,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  search: {
    fontSize: typography.text.body.fontSize,
    lineHeight: typography.text.body.lineHeight,
    color: theme.colors.gray[900],
    fontWeight: typography.text.body.fontWeight,
  },

  // 포지션 필터 칩
  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: theme.spacing.spacing5,
    marginTop: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 16,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    backgroundColor: theme.colors.white,
  },
  chipOn: {
    backgroundColor: theme.colors.blue[100],
    borderColor: theme.colors.blue[400],
  },
  chipText: {
    fontSize: typography.text.bodySmall.fontSize,
    lineHeight: typography.text.bodySmall.lineHeight,
    color: theme.colors.gray[700],
    fontWeight: typography.fontWeight.medium,
  },
  chipTextOn: {
    color: theme.colors.blue[700],
    fontWeight: typography.fontWeight.semibold,
  },

  // 팀원 리스트
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.spacing5,
    marginVertical: 4,
    borderRadius: 16,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rowOn: {
    backgroundColor: theme.colors.blue[50],
    borderColor: theme.colors.blue[300],
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
  },
  checkboxOn: {
    backgroundColor: theme.colors.blue[500],
    borderColor: theme.colors.blue[500],
  },
  name: {
    fontSize: typography.text.body.fontSize,
    lineHeight: typography.text.body.lineHeight,
    fontWeight: typography.fontWeight.semibold,
    color: theme.colors.gray[900],
  },
  meta: {
    fontSize: typography.text.caption.fontSize,
    lineHeight: typography.text.caption.lineHeight,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  pick: {
    fontSize: typography.text.bodySmall.fontSize,
    lineHeight: typography.text.bodySmall.lineHeight,
    color: theme.colors.blue[600],
    fontWeight: typography.fontWeight.semibold,
  },

  // 빈 리스트
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: typography.text.body.fontSize,
    lineHeight: typography.text.body.lineHeight,
    color: theme.colors.gray[500],
  },

  // 하단 고정 바
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: theme.colors.gray[200],
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  bottomText: {
    fontSize: typography.text.caption.fontSize,
    lineHeight: typography.text.caption.lineHeight,
    color: theme.colors.gray[700],
  },
  cta: {
    backgroundColor: theme.colors.blue[600],
    borderRadius: 16,
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing3,
  },
  ctaDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  ctaText: {
    color: theme.colors.white,
    fontSize: typography.text.button.fontSize,
    lineHeight: typography.text.button.lineHeight,
    fontWeight: typography.text.button.fontWeight,
  },
});
