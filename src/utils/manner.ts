import { theme } from '@/src/theme';

export function getMannerScoreColor(noShowCount: number) {
  if (noShowCount >= 2) return theme.colors.error;
  if (noShowCount === 1) return theme.colors.orange[500];
  return theme.colors.success;
}
