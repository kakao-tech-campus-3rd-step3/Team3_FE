import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useUserInfo } from '@/src/hooks/queries';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from './components/badge/badge';
import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';
import styles from './profile_style';

import NoShowCard from './components/reputationTab/noshow_card';
import MannerCard from './components/reputationTab/manner_card';
import { getMannerScoreColor } from '@/src/utils/manner';
import ReviewCard from './components/reputationTab/review_card';
import TabBar from './components/TabBar';
import ProfileHeader from './components/profileHeader';

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
      <View style={styles.container}>
        <Text>사용자 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const renderReputationTab = () => (
    <View>
      <NoShowCard noShowCount={displayUser.noShowCount} />

      <MannerCard
        mannerScore={displayUser.mannerScore}
        totalReviews={displayUser.totalReviews}
        noShowCount={displayUser.noShowCount}
      />

      <ReviewCard reviews={displayUser.recentReviews} />
    </View>
  );

  const renderSettingTab = () => (
    <Card style={styles.settingsCard}>
      <Text style={styles.sectionTitle}>설정</Text>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>알림 설정</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.text.sub}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>개인정보 수정</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.text.sub}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.colors.error }]}>
          로그아웃
        </Text>
      </TouchableOpacity>
    </Card>
  );

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

            <View style={styles.quickStats}>
              <View style={styles.quickStatItem}>
                <Text style={styles.quickStatValue}>
                  {displayUser.totalMatches}
                </Text>
                <Text style={styles.quickStatLabel}>총 경기</Text>
              </View>
              <View style={styles.quickStatItem}>
                <Text
                  style={[
                    styles.quickStatValue,
                    { color: getMannerScoreColor(userInfo.noShowCount) },
                  ]}
                >
                  {displayUser.mannerScore}
                </Text>
                <Text style={styles.quickStatLabel}>매너 점수</Text>
              </View>
            </View>
          </Card>

          <TabBar active={activeTab} onChange={handleChangeTab} />

          {activeTab === 'reputation' && renderReputationTab()}

          {activeTab === 'settings' && renderSettingTab()}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;
