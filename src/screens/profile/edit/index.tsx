import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '@/src/components/card/card';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import { useProfileEdit } from '@/src/hooks/profile';
import ProfileForm from '@/src/screens/profile/edit/form';
import { styles } from '@/src/screens/profile/edit/styles';
import { theme } from '@/src/theme';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { userProfile: userInfo } = useUserProfileContext();
  const { handleSave, isPending } = useProfileEdit();

  if (!userInfo) {
    return <LoadingState message="사용자 정보를 불러오는 중..." />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{
        paddingBottom: insets.bottom + theme.spacing.spacing7,
      }}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Card style={styles.formCard}>
          <ProfileForm
            initialData={userInfo}
            onSave={handleSave}
            isLoading={isPending}
          />
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
