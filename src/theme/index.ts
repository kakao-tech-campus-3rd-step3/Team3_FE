import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';

export type { ColorShade, ColorVariant } from './colors';
export type { SpacingSize, SpacingValue } from './spacing';
export type {
  TypographySize,
  TypographyText,
  TypographyWeight,
} from './typography';

export const theme = {
  colors,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;
