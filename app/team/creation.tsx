import { useLocalSearchParams } from 'expo-router';

import CreationScreen from '@/src/screens/team/creation_screen';

export default function TeamCreationRoute() {
  const { university } = useLocalSearchParams<{ university?: string }>();

  return <CreationScreen initialUniversity={university} />;
}
