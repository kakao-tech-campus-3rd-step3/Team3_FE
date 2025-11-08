import TeamGuard from '@/src/components/auth/team_guard';
import CheckAppliedMatchesScreen from '@/src/screens/check_applied_matches';

export default function CheckAppliedMatchesRoute() {
  return (
    <TeamGuard fallbackMessage="신청한 매치를 보려면 먼저 팀에 가입해야 합니다.">
      <CheckAppliedMatchesScreen />
    </TeamGuard>
  );
}
