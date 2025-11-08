import TeamGuard from '@/src/components/auth/team_guard';
import MatchInfoScreen from '@/src/screens/match_making/match_info/match_info_screen';

export default function MatchInfoRoute() {
  return (
    <TeamGuard fallbackMessage="매치를 생성하려면 먼저 팀에 가입해야 합니다.">
      <MatchInfoScreen />
    </TeamGuard>
  );
}
