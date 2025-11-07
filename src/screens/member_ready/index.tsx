import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { style } from '@/src/screens/member_ready/member_ready_style';

export default function MemberReadyScreen() {
  const router = useRouter();

  const handleEnoughMembers = () => {
    router.push(ROUTES.TEAM_FORMATION);
  };

  const handleNotEnoughMembers = () => {
    router.push('/mercenary');
  };

  return (
    <View style={style.container}>
      <CustomHeader title="매치 생성" />

      <View style={style.contentContainer}>
        <Text style={style.title}>현재 인원이 11명 이상인가요?</Text>
        <Text style={style.description}>
          매치를 생성하려면 최소 11명의 인원이 필요합니다.{'\n'}
          현재 인원 상황에 맞게 선택해주세요.
        </Text>

        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={[style.actionButton, style.primaryButton]}
            onPress={handleEnoughMembers}
          >
            <Text style={style.primaryButtonText}>예, 11명 이상입니다</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.actionButton, style.secondaryButton]}
            onPress={handleNotEnoughMembers}
          >
            <Text style={style.secondaryButtonText}>
              아니요, 더 모집 중입니다
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
