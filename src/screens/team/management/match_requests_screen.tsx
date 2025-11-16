import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import MatchRequestDetails from '@/src/components/team/sections/match_request_details';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { LoadingState } from '@/src/components/ui/loading_state';
import StatusBadge from '@/src/components/ui/status_badge';
import { useMatchRequests } from '@/src/hooks/team/useMatchRequests';
import { colors } from '@/src/theme';

import { styles } from './match_requests_screen_styles';

export default function MatchRequestsScreen() {
  const { matchRequests, isLoading, handleMatchRequest } = useMatchRequests();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 요청 관리" />
        <LoadingState message="매치 요청을 불러오는 중..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 요청 관리" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {matchRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="football-outline"
              size={48}
              color={colors.gray[400]}
            />
            <Text style={styles.emptyStateTitle}>매치 요청이 없습니다</Text>
            <Text style={styles.emptyStateText}>
              다른 팀에서 매치를 요청하면 여기에 표시됩니다.
            </Text>
          </View>
        ) : (
          <View style={styles.requestsList}>
            {matchRequests.map(request => (
              <View key={request.requestId} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.applicantInfo}>
                    <Text style={styles.requestTeamName}>
                      {typeof request.requestTeamName === 'object'
                        ? request.requestTeamName.name
                        : request.requestTeamName}
                    </Text>
                  </View>
                  <View style={styles.requestStatus}>
                    <StatusBadge status={request.status} />
                  </View>
                </View>

                <MatchRequestDetails request={request} />

                {request.status === 'PENDING' && (
                  <View style={styles.requestActions}>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'approved')
                      }
                    >
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.green[600]}
                      />
                      <Text style={styles.approveButtonText}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'rejected')
                      }
                    >
                      <Ionicons
                        name="close"
                        size={16}
                        color={colors.red[600]}
                      />
                      <Text style={styles.rejectButtonText}>거절</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
