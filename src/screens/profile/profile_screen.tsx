import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useUserInfo } from '@/src/hooks/queries';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
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

function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('reputation');
  const insets = useSafeAreaInsets();

  const { data: userInfo, isLoading, error, refetch } = useUserInfo();

  const displayUser = userInfo;

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

      <Card style={styles.reviewsCard}>
        <Text style={styles.sectionTitle}>받은 후기</Text>
        <View style={styles.reviewsList}>
          {displayUser.recentReviews.map((review: any, index: number) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewContent}>
                <Text style={styles.reviewLabel}>{review.label}</Text>
                <Badge
                  text={`${review.count}회`}
                  variant="secondary"
                  size="small"
                />
              </View>
            </View>
          ))}
        </View>
      </Card>
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
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Ionicons
                  name="person"
                  size={48}
                  color={theme.colors.grass[500]}
                />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{displayUser.name}</Text>
                <Text style={styles.profileUniversity}>
                  {displayUser.university}
                </Text>
                <Text style={styles.profileDetails}>
                  {displayUser.joinDate} 가입
                </Text>
              </View>
            </View>

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

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'reputation' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('reputation')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reputation' && styles.activeTabText,
                ]}
              >
                평판 정보
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
              onPress={() => setActiveTab('settings')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'settings' && styles.activeTabText,
                ]}
              >
                설정
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'reputation' && renderReputationTab()}

          {activeTab === 'settings' && renderSettingTab()}

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;
