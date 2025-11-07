import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/src/constants/routes';
import { theme } from '@/src/theme';

interface WelcomeScreenProps {
  onSwitchToLogin: () => void;
}

export default function WelcomeScreen({ onSwitchToLogin }: WelcomeScreenProps) {
  const { width } = useWindowDimensions();
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);

  const startButtonScale = useSharedValue(1);
  const startButtonShadow = useSharedValue(3);

  const dynamicStyles = StyleSheet.create({
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

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 20, stiffness: 80 });
    logoOpacity.value = withTiming(1, { duration: 600 });
  }, [logoScale, logoOpacity]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const startButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: startButtonScale.value }],
    shadowOpacity: interpolate(
      startButtonShadow.value,
      [1, 3],
      [0.2, 0.1],
      Extrapolation.CLAMP
    ),
    elevation: startButtonShadow.value,
  }));

  const handleStartAuth = () => {
    router.push(ROUTES.REGISTER);
  };

  const handleStartButtonPressIn = () => {
    startButtonScale.value = withSpring(0.98, { damping: 20, stiffness: 200 });
    startButtonShadow.value = withSpring(2, { damping: 20, stiffness: 200 });
  };

  const handleStartButtonPressOut = () => {
    startButtonScale.value = withSpring(1, { damping: 20, stiffness: 200 });
    startButtonShadow.value = withSpring(3, { damping: 20, stiffness: 200 });
  };

  return (
    <LinearGradient
      colors={['#f8fffe', '#e8f5e8', '#f0f8ff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={dynamicStyles.welcomeContainer}>
              <Animated.Image
                source={require('@/assets/images/logo_without_background.png')}
                style={[dynamicStyles.logoImage, logoAnimatedStyle]}
                resizeMode="contain"
              />
              <Text style={dynamicStyles.welcomeTitle}>
                대학생 축구 커뮤니티에
              </Text>
              <Text style={dynamicStyles.welcomeTitle}>
                오신 것을 환영합니다!
              </Text>
              <Text
                style={dynamicStyles.welcomeSubtitle}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.6}
              >
                슛두리를 통해 안전하게 가입하고 연결하세요.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Animated.View style={startButtonAnimatedStyle}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartAuth}
                onPressIn={handleStartButtonPressIn}
                onPressOut={handleStartButtonPressOut}
                activeOpacity={1}
              >
                <Text style={dynamicStyles.startButtonText}>시작하기</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={onSwitchToLogin}
              activeOpacity={0.8}
            >
              <Text style={dynamicStyles.welcomeButtonText}>
                이미 계정이 있으신가요?{' '}
                <Text style={styles.loginLink}>로그인</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
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
