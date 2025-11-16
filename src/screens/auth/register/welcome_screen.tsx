import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
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
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/welcome_screen_style';

interface WelcomeScreenProps {
  onSwitchToLogin: () => void;
}

export default function WelcomeScreen({ onSwitchToLogin }: WelcomeScreenProps) {
  const { width } = useWindowDimensions();
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);

  const startButtonScale = useSharedValue(1);
  const startButtonShadow = useSharedValue(3);

  const dynamicStyles = getDynamicStyles(width);

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
