import { useCallback, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useUserInfo } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import ProfileHeader from './components/profileHeader';
import MannerCard from './components/reputationTab/manner_card';
import ReviewCard from './components/reputationTab/review_card';
import SettingCard from './components/settingTab/setting_card';
import { defaultSettingsItems } from './components/settingTab/setting_items';
import TabBar from './components/TabBar';
import styles from './profile_style';

function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'reputation' | 'settings'>(
    'reputation'
  );
  const insets = useSafeAreaInsets();

  const { data: userInfo, isLoading, error, refetch } = useUserInfo();

  const displayUser = userInfo;
  const handleChangeTab = useCallback(
    (t: 'reputation' | 'settings') => setActiveTab(t),
    []
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!displayUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>사용자 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.spacing7,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <CustomHeader title="프로필" showBackButton={false} />
          <Card style={styles.profileCard}>
            <ProfileHeader user={displayUser} />
          </Card>
          <TabBar active={activeTab} onChange={handleChangeTab} />

          {activeTab === 'reputation' ? (
            <>
              <MannerCard
                mannerScore={displayUser.mannerScore}
                totalReviews={displayUser.totalReviews}
                noShowCount={displayUser.noShowCount}
              />
              <ReviewCard reviews={displayUser.recentReviews} />
            </>
          ) : (
            <SettingCard items={defaultSettingsItems} />
          )}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;
