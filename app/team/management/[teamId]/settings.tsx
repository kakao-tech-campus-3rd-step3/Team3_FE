import { useLocalSearchParams } from 'expo-router';

import TeamSettingsScreen from '@/src/screens/team_management/team_settings_screen';

export default function TeamSettingsPage() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamSettingsScreen teamId={teamId} />;
}
