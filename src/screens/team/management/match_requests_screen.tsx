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
import StatusBadge from '@/src/components/ui/status_badge';
import { useMatchRequests } from '@/src/hooks/team/useMatchRequests';
import { colors } from '@/src/theme';

import { styles } from './match_requests_screen_styles';

interface MatchRequestsScreenProps {
  teamId?: string | string[];
}

export default function MatchRequestsScreen({
  teamId,
}: MatchRequestsScreenProps) {
  const {
    matchRequests,
    isLoading,
    error,
    processingRequestId,
    handleMatchRequest,
  } = useMatchRequests();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 요청 관리" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue[600]} />
          <Text style={styles.loadingText}>매치 요청을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 요청 관리" />
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={colors.red[500]}
          />
          <Text style={styles.errorText}>매치 요청을 불러올 수 없습니다.</Text>
        </View>
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
                      style={[
                        styles.approveButton,
                        processingRequestId === request.requestId &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'approved')
                      }
                      disabled={processingRequestId === request.requestId}
                    >
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.green[600]}
                      />
                      <Text style={styles.approveButtonText}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.rejectButton,
                        processingRequestId === request.requestId &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'rejected')
                      }
                      disabled={processingRequestId === request.requestId}
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
