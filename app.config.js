import 'dotenv/config';

export default {
  expo: {
    name: '슛두리',
    slug: 'shoot-doori',
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
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.cheogo.shootdoori',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'com.cheogo.shootdoori',
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
      eas: {
        projectId: 'a6d64e9a-649c-4664-a566-e4b74376b7ea',
      },
    },
  },
};
