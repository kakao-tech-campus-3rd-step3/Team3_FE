import { useLocalSearchParams } from 'expo-router';

import TeamGuard from '@/src/components/auth/team_guard';
import MatchApplicationScreen from '@/src/screens/match_application/match_application_screen';

export default function MatchApplicationRoute() {
  const { teamId } = useLocalSearchParams<{ teamId?: string }>();

  return (
    <TeamGuard fallbackMessage="매치에 참여하려면 먼저 팀에 가입해야 합니다.">
      <MatchApplicationScreen teamId={teamId ? Number(teamId) : undefined} />
    </TeamGuard>
  );
}
