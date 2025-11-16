import { theme } from '@/src/theme';
import type { SkillLevel } from '@/src/types/team';

export interface SkillLevelBadgeStyle {
  backgroundColor: string;
  textColor: string;
}

export type ApiSkillLevel = 'AMATEUR' | 'SEMI_PRO' | 'PRO';

const SKILL_LEVEL_MAPPING: Record<ApiSkillLevel, SkillLevel> = {
  AMATEUR: '아마추어',
  SEMI_PRO: '세미프로',
  PRO: '프로',
};

const REVERSE_SKILL_LEVEL_MAPPING: Record<SkillLevel, ApiSkillLevel> = {
  아마추어: 'AMATEUR',
  세미프로: 'SEMI_PRO',
  프로: 'PRO',
};

/**
 * API의 영어 skill level을 한국어로 변환
 */
export const convertSkillLevelToKorean = (apiLevel: string): SkillLevel => {
  return SKILL_LEVEL_MAPPING[apiLevel as ApiSkillLevel] || '아마추어';
};

/**
 * 한국어 skill level을 API의 영어 형식으로 변환
 */
export const convertSkillLevelToEnglish = (
  koreanLevel: SkillLevel
): ApiSkillLevel => {
  return REVERSE_SKILL_LEVEL_MAPPING[koreanLevel] || 'AMATEUR';
};

export const getSkillLevelBadgeStyle = (
  skillLevel: string
): SkillLevelBadgeStyle => {
  switch (skillLevel) {
    case 'PRO':
      return {
        backgroundColor: '#F4E4BC',
        textColor: theme.colors.text.main,
      };
    case 'SEMI_PRO':
      return {
        backgroundColor: '#E8E8E8',
        textColor: theme.colors.text.main,
      };
    case 'AMATEUR':
      return {
        backgroundColor: '#E6D2B8',
        textColor: theme.colors.text.main,
      };
    default:
      return {
        backgroundColor: '#E6D2B8',
        textColor: theme.colors.text.main,
      };
  }
};
