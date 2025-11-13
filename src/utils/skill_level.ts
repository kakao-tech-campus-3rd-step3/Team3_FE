import { theme } from '@/src/theme';

export interface SkillLevelBadgeStyle {
  backgroundColor: string;
  textColor: string;
}

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
