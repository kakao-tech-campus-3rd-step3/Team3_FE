export const colors = {
  grass: {
    50: '#f0f7f0',
    100: '#d9e9d9',
    200: '#b8d5b8',
    300: '#8fbf8f',
    400: '#5da85d',
    500: '#3d8840',
    600: '#2f6b32',
    700: '#275529',
    800: '#1f4421',
    900: '#1a371c',
  },

  cream: {
    50: '#fefdfb',
    100: '#fdfbf7',
    200: '#faf7f3',
    300: '#f5f0e8',
    400: '#e8e0d3',
    500: '#d4c7b3',
    600: '#b8a890',
    700: '#9a8a6e',
    800: '#7c6f57',
    900: '#5f5743',
  },

  success: '#4CAF50',
  warning: '#f97316',
  error: '#ef4444',
  info: '#3b82f6',

  text: {
    main: '#2d2d2d',
    sub: '#6b6b6b',
    light: '#999999',
    disabled: '#b8a890',
    white: '#ffffff',
  },

  background: {
    main: '#ffffff',
    sub: '#f8fafc',
    card: '#f8f8f8',
    input: '#f0f0f0',
  },

  border: {
    light: '#d1d5db',
    medium: '#9ca3af',
    dark: '#6b7280',
    input: '#e0e0e0',
  },

  brand: {
    main: '#6C8E68',
    accent: '#108142',
  },

  overlay: {
    dark: 'rgba(0, 0, 0, 0.5)',
    light: 'rgba(0, 0, 0, 0.3)',
    brand: 'rgba(108, 142, 104, 0.1)',
  },

  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  yellow: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },

  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },

  transparent: 'transparent',
  placeholder: '#A9A9A9',
} as const;

export type ColorVariant = keyof typeof colors;
export type ColorShade = keyof typeof colors.grass;
