import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { styles } from '@/src/screens/team/management/team_management_styles';
import { theme } from '@/src/theme';

interface MatchManagementSectionProps {
  teamId: number;
}

const matchActions = [
  {
    id: 'create',
    title: '매치 생성',
    icon: 'add-circle-outline' as const,
    color: theme.colors.green[500],
    route: ROUTES.MEMBER_READY,
  },
  {
    id: 'created',
    title: '생성한 매치',
    icon: 'create-outline' as const,
    color: theme.colors.blue[500],
    route: ROUTES.CHECK_CREATED_MATCHES,
  },
  {
    id: 'applied',
    title: '신청한 매치',
    icon: 'list' as const,
    color: theme.colors.purple[500],
    route: ROUTES.CHECK_APPLIED_MATCHES,
  },
];

export default memo(function MatchManagementSection({
  teamId,
}: MatchManagementSectionProps) {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  const checkTeamMembership = () => {
    if (!isAuthenticated) {
      return false;
    }

    if (!teamId || teamId === null || teamId === undefined) {
      Alert.alert(
        '팀 참여 필요',
        '매치에 참여하려면 먼저 팀에 가입해야 합니다.',
        [
          {
            text: '확인',
            style: 'default',
          },
        ]
      );
      return false;
    }
    return true;
  };

  const handleActionPress = (route: string) => {
    if (!checkTeamMembership()) return;
    router.push(route);
  };

  return (
    <View style={styles.membersSection}>
      <Text style={styles.sectionTitle}>매치 관리</Text>
      <View style={styles.matchManagementList}>
        {matchActions.map(action => (
          <TouchableOpacity
            key={action.id}
            onPress={() => handleActionPress(action.route)}
            style={styles.matchManagementItem}
            activeOpacity={0.7}
          >
            <Ionicons name={action.icon} size={32} color={action.color} />
            <View style={styles.matchManagementInfo}>
              <Text style={styles.matchManagementTitle}>{action.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
