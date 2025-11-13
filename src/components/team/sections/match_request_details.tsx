import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/src/theme';
import type { MatchRequestResponseDto } from '@/src/types/match';
import { convertUTCToKSTTime } from '@/src/utils/timezone';

import { styles } from './match_request_details_styles';

interface MatchRequestDetailsProps {
  request: MatchRequestResponseDto;
}

const cleanMessage = (message: string) => {
  return message.replace(/\([0-9]+\)\s*팀이/, '팀이');
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '날짜 미정';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  } catch {
    return dateString;
  }
};

const formatTime = (
  timeStart?: string,
  timeEnd?: string,
  preferredDate?: string
) => {
  if (!timeStart || !timeEnd) return '시간 미정';
  try {
    if (!preferredDate) {
      const start = timeStart.slice(0, 5);
      const end = timeEnd.slice(0, 5);
      return `${start} ~ ${end}`;
    }
    const kstStart = convertUTCToKSTTime(`${preferredDate}T${timeStart}Z`);
    const kstEnd = convertUTCToKSTTime(`${preferredDate}T${timeEnd}Z`);
    return `${kstStart} ~ ${kstEnd}`;
  } catch {
    return `${timeStart} ~ ${timeEnd}`;
  }
};

export default function MatchRequestDetails({
  request,
}: MatchRequestDetailsProps) {
  return (
    <View style={styles.detailsContainer}>
      {request.requestTeamLineupId && (
        <View style={styles.lineupButtonSection}>
          <TouchableOpacity
            style={styles.viewLineupButton}
            onPress={() => {
              router.push(
                `/match_application/lineup?lineupId=${request.requestTeamLineupId}`
              );
            }}
          >
            <Ionicons
              name="football-outline"
              size={16}
              color={colors.blue[600]}
            />
            <Text style={styles.viewLineupButtonText}>라인업 보기</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.blue[600]}
            />
          </TouchableOpacity>
        </View>
      )}

      {(request.preferredDate ||
        request.preferredTimeStart ||
        request.venueName) && (
        <View style={styles.matchInfoCard}>
          <View style={styles.matchInfoHeader}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.blue[600]}
            />
            <Text style={styles.matchInfoTitle}>매치 정보</Text>
          </View>

          <View style={styles.matchInfoGrid}>
            {request.preferredDate && (
              <View style={styles.matchInfoItem}>
                <View style={styles.matchInfoItemIcon}>
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={colors.blue[500]}
                  />
                </View>
                <View style={styles.matchInfoItemContent}>
                  <Text style={styles.matchInfoItemLabel}>경기 일정</Text>
                  <Text style={styles.matchInfoItemValue}>
                    {formatDate(request.preferredDate)}
                  </Text>
                </View>
              </View>
            )}

            {(request.preferredTimeStart || request.preferredTimeEnd) && (
              <View style={styles.matchInfoItem}>
                <View style={styles.matchInfoItemIcon}>
                  <Ionicons name="time" size={16} color={colors.purple[500]} />
                </View>
                <View style={styles.matchInfoItemContent}>
                  <Text style={styles.matchInfoItemLabel}>경기 시간</Text>
                  <Text style={styles.matchInfoItemValue}>
                    {formatTime(
                      request.preferredTimeStart,
                      request.preferredTimeEnd,
                      request.preferredDate
                    )}
                  </Text>
                </View>
              </View>
            )}

            {request.venueName && (
              <View style={styles.matchInfoItem}>
                <View style={styles.matchInfoItemIcon}>
                  <Ionicons
                    name="location"
                    size={16}
                    color={colors.green[500]}
                  />
                </View>
                <View style={styles.matchInfoItemContent}>
                  <Text style={styles.matchInfoItemLabel}>경기장</Text>
                  <Text style={styles.matchInfoItemValue}>
                    {request.venueName}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {request.requestMessage && (
        <View style={styles.messageSection}>
          <View style={styles.messageHeader}>
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={colors.gray[600]}
            />
            <Text style={styles.messageTitle}>요청 메시지</Text>
          </View>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>
              {cleanMessage(request.requestMessage)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
