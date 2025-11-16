import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '@/src/components/card/card';
import ProfileHeader from '@/src/components/profile/profile_header';
import SettingCard from '@/src/components/profile/setting_card';
import { getDefaultSettingsItems } from '@/src/components/profile/setting_items';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useAuth } from '@/src/contexts/auth_context';
import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import { styles } from '@/src/screens/profile/styles';

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { token, logout } = useAuth();

  const { userProfile: userInfo, isLoading } = useUserProfileContext();

  const settingsItems = getDefaultSettingsItems(logout);

  if (!token) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로그인이 필요합니다.</Text>
      </View>
    );
  }

  if (isLoading || !userInfo) {
    return <LoadingState message="사용자 정보를 불러오는 중..." />;
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
