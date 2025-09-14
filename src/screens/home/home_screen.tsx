import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHome, useUserInfo } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import styles from './home_style';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';

import HomeHeader from './components/home_header';
import GreetingSection from './components/greeting_section';
import EnvelopeSection from './components/envelope_section';
import BenefitsSection from './components/benefit_section';
import WeatherSection from './components/weather_card';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: homeData, isLoading, error, refetch } = useHome();
  const { data: userInfo } = useUserInfo();

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (isLoading || !homeData) {
    return (
      <View style={styles.loadingContainer}>
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
          { paddingBottom: insets.bottom + theme.spacing.spacing10 },
        ]}
      >
        <GreetingSection homeData={homeData} userInfo={userInfo!} />
        <EnvelopeSection />
        <BenefitsSection />

        <View style={styles.headerDivider} />

        <WeatherSection />
        {/* <RecommendedMatchCard onMatchPress={matchId => {}} /> */}
      </ScrollView>
    </View>
  );
}
