import { StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

export const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    welcomeTitle: {
      fontSize: Math.max(20, width * 0.06),
      fontWeight: '700',
      color: theme.colors.text.main,
      textAlign: 'center',
      lineHeight: Math.max(28, width * 0.08),
    },
    welcomeSubtitle: {
      fontSize: Math.max(12, width * 0.035),
      color: theme.colors.text.sub,
      textAlign: 'center',
      lineHeight: Math.max(18, width * 0.05),
      marginTop: Math.max(16, width * 0.04),
      paddingHorizontal: Math.max(20, width * 0.05),
    },
    startButtonText: {
      color: theme.colors.text.white,
      fontSize: Math.max(16, width * 0.045),
      fontWeight: '700',
    },
    welcomeButtonText: {
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.sub,
      textAlign: 'center',
      lineHeight: Math.max(20, width * 0.055),
    },
    logoImage: {
      width: Math.max(100, width * 0.25),
      height: Math.max(100, width * 0.25),
      marginBottom: Math.max(32, width * 0.08),
    },
    welcomeContainer: {
      alignItems: 'center',
      maxWidth: Math.max(300, width * 0.85),
    },
  });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingTop: theme.spacing.spacing10,
    paddingBottom: theme.spacing.spacing10,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternCircle1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.overlay.brand,
  },
  patternCircle2: {
    position: 'absolute',
    top: '60%',
    left: '5%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.grass[100],
  },
  patternCircle3: {
    position: 'absolute',
    bottom: '20%',
    right: '20%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.grass[50],
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.spacing8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.main,
    textAlign: 'center',
    lineHeight: 32,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: theme.spacing.spacing5,
  },
  startButton: {
    backgroundColor: theme.colors.brand.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 28,
    gap: theme.spacing.spacing2,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: theme.colors.text.white,
    fontSize: 18,
    fontWeight: '700',
  },
  loginButton: {
    paddingVertical: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing5,
  },
  welcomeButtonText: {
    fontSize: 16,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: 22,
  },
  loginLink: {
    color: theme.colors.brand.main,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
