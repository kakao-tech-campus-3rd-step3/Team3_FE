import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BenefitsSection from '@/src/components/home/benefit_section';
import HomeHeader from '@/src/components/home/home_header';
import RecommendedMatchCard from '@/src/components/home/recommended_match_card';
import TodayMatchStatus from '@/src/components/home/today_match_status';
import { ROUTES } from '@/src/constants/routes';
import { useUserProfile, useTeam } from '@/src/hooks/queries';
import { styles } from '@/src/screens/home/home_style';
import { theme } from '@/src/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: userProfile, isLoading } = useUserProfile();
  const { data: team } = useTeam(userProfile?.teamId || 0);

  const handleMatchPress = useCallback((matchDate?: string) => {
    if (matchDate) {
      router.push(
        `${ROUTES.MATCH_INFO_TAB}?date=${encodeURIComponent(matchDate)}`
      );
    } else {
      router.push(ROUTES.MATCH_INFO_TAB);
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
        <TodayMatchStatus
          teamId={userProfile?.teamId || null}
          team={team || null}
        />

        <View style={styles.matchSection}>
          <RecommendedMatchCard
            onMatchPress={handleMatchPress}
            teamId={userProfile?.teamId || null}
          />
        </View>

        <View style={styles.serviceSection}>
          <BenefitsSection teamId={userProfile?.teamId || null} />
        </View>
      </ScrollView>
    </View>
  );
}
