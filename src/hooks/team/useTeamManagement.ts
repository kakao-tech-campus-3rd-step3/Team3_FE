import { Alert } from 'react-native';

import { useTeamExitMutation } from '@/src/hooks/queries';
import { handleApiError } from '@/src/utils/handle_api_error';

interface UseTeamManagementProps {
  teamId: number;
}

export function useTeamManagement({ teamId }: UseTeamManagementProps) {
  const exitTeamMutation = useTeamExitMutation();

  const handleExitTeam = () => {
    Alert.alert(
      '팀 나가기',
      '정말로 이 팀에서 나가시겠습니까?\n\n팀에서 나가면 모든 팀 관련 권한이 제거됩니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '나가기',
          style: 'destructive',
          onPress: () => {
            exitTeamMutation.mutate(teamId, {
              onError: (error: unknown) => {
                handleApiError(error);
              },
            });
          },
        },
      ]
    );
  };

  return {
    handleExitTeam,
  };
}
