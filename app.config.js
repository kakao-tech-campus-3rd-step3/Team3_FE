import 'dotenv/config';

export default {
  expo: {
    name: '슛두리',
    slug: '슛두리',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo_without_background.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    scheme: 'shoot-doori-fe',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/splash.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/logo_without_background.png',
    },
    plugins: ['expo-router'],
    extra: {
      apiBaseUrl:
        process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000',
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
    },
  },
};
