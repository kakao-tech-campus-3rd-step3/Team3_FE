export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },

  fontSize: {
    font1: 10,
    font2: 12,
    font3: 14,
    font4: 16,
    font5: 18,
    font6: 20,
    font7: 24,
    font8: 28,
    font9: 32,
    font10: 36,
    font11: 48,
  },

  lineHeight: {
    line1: 14,
    line2: 16,
    line3: 18,
    line4: 20,
    line5: 22,
    line6: 24,
    line7: 26,
    line8: 28,
    line9: 32,
    line10: 36,
    line11: 40,
    line12: 44,
    line13: 56,
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  text: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
    },
    h4: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '500',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
    },
    buttonSmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
    },
    auth: {
      title: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '700',
      },
      subtitle: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
      },
      logo: {
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '800',
      },
      tagline: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
      },
    },
    banner: {
      title: {
        fontSize: 32,
        lineHeight: 36,
        fontWeight: '900',
      },
      subtitle: {
        fontSize: 22,
        lineHeight: 26,
        fontWeight: '700',
      },
      description: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '400',
      },
    },

    card: {
      title: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
      },
      subtitle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
      },
    },
  },
} as const;

export type TypographySize = keyof typeof typography.fontSize;
export type TypographyWeight = keyof typeof typography.fontWeight;
export type TypographyText = keyof typeof typography.text;
