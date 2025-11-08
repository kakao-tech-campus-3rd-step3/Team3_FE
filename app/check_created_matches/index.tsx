import TeamGuard from '@/src/components/auth/team_guard';
import CheckCreatedMatchesScreen from '@/src/screens/check_created_matches';

export default function CheckCreatedMatchesRoute() {
  return (
    <TeamGuard fallbackMessage="생성된 매치를 보려면 먼저 팀에 가입해야 합니다.">
      <CheckCreatedMatchesScreen />
    </TeamGuard>
  );
}
