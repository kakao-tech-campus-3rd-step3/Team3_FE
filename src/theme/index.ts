import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export { colors } from '@/src/theme/colors';
export { spacing } from '@/src/theme/spacing';
export { typography } from '@/src/theme/typography';

export type { ColorShade, ColorVariant } from '@/src/theme/colors';
export type { SpacingSize, SpacingValue } from '@/src/theme/spacing';
export type {
  TypographySize,
  TypographyText,
  TypographyWeight,
} from '@/src/theme/typography';

export const theme = {
  colors,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;
