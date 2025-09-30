import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useUserProfile } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import BenefitsSection from './components/benefit_section';
import EnvelopeSection from './components/envelope_section';
import GreetingSection from './components/greeting_section';
import HomeHeader from './components/home_header';
import RecommendedMatchCard from './components/recommended_match_card';
import styles from './home_style';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: userProfile, isLoading } = useUserProfile();

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
          { paddingBottom: insets.bottom + theme.spacing.spacing10 },
        ]}
      >
        <View style={styles.mainSection}>
          <GreetingSection />
        </View>

        <View style={styles.matchSection}>
          <RecommendedMatchCard />
        </View>

        <View style={styles.serviceSection}>
          <EnvelopeSection />
          <BenefitsSection teamId={userProfile?.teamId || null} />
        </View>
      </ScrollView>
    </View>
  );
}
