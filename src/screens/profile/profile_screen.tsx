import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useAuth } from '@/src/contexts/auth_context';
import { useUserProfile } from '@/src/hooks/queries';
import ProfileHeader from '@/src/screens/profile/components/profileHeader';
import SettingCard from '@/src/screens/profile/components/settingTab/setting_card';
import { getDefaultSettingsItems } from '@/src/screens/profile/components/settingTab/setting_items';
import { styles } from '@/src/screens/profile/profile_style';
import { theme } from '@/src/theme';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { token, logout } = useAuth();

  const { data: userInfo, isLoading, error, refetch } = useUserProfile();
  const settingsItems = getDefaultSettingsItems(logout);

  if (!token) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로그인이 필요합니다.</Text>
      </View>
    );
  }

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

  if (!userInfo) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <CustomHeader title="프로필" showBackButton={false} />
          <Card style={styles.profileCard}>
            <ProfileHeader user={userInfo} />
          </Card>

          <SettingCard items={settingsItems} />

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </>
  );
}

export default ProfileScreen;
