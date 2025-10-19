import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useRef } from 'react';
import { ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserProfile, useLogout } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import BenefitsSection from './components/benefit_section';
import EnvelopeSection from './components/envelope_section';
import GreetingSection from './components/greeting_section';
import HomeHeader from './components/home_header';
import RecommendedMatchCard from './components/recommended_match_card';
import styles from './home_style';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: userProfile, isLoading, refetch, error } = useUserProfile();
  const logoutMutation = useLogout();
  const alertShownRef = useRef(false);

  const handleLogoutAndRedirect = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    }
  }, [logoutMutation]);

  const handleErrorAlert = useCallback(() => {
    if (alertShownRef.current) {
      return;
    }

    alertShownRef.current = true;

    Alert.alert(
      '인증 오류',
      '로그인이 필요합니다. 다시 로그인해주세요.',
      [
        {
          text: '로그인 하기',
          onPress: () => {
            alertShownRef.current = false;
            handleLogoutAndRedirect();
          },
        },
      ],
      {
        cancelable: false,
        onDismiss: () => {
          alertShownRef.current = false;
        },
      }
    );
  }, [handleLogoutAndRedirect]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (error) {
      handleErrorAlert();
    }
  }, [error, handleErrorAlert]);

  useEffect(() => {
    if (!isLoading && !error) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, error]);

  const handleMatchPress = useCallback((matchDate?: string) => {
    if (matchDate) {
      router.push(`/(tabs)/match-info?date=${encodeURIComponent(matchDate)}`);
    } else {
      router.push('/(tabs)/match-info');
    }
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <HomeHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.spacing1 },
        ]}
      >
        <View style={styles.mainSection}>
          <GreetingSection />
        </View>

        <View style={styles.matchSection}>
          <RecommendedMatchCard onMatchPress={handleMatchPress} />
        </View>

        <View style={styles.serviceSection}>
          <EnvelopeSection teamId={userProfile?.teamId || null} />
          <BenefitsSection teamId={userProfile?.teamId || null} />
        </View>
      </ScrollView>
    </View>
  );
}
