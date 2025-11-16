export const getDynamicFontSize = (
  baseSize: number,
  screenWidth: number,
  multiplier: number = 0.035
): number => {
  return Math.max(baseSize, screenWidth * multiplier);
};
