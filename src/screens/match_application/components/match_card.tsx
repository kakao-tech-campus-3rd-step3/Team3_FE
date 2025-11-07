import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useVenues } from '@/src/hooks/queries';
import { styles } from '@/src/screens/match_application/match_application_style';
import { theme } from '@/src/theme';
import { MatchWaitingResponseDto } from '@/src/types/match';
import { convertUTCToKSTTime } from '@/src/utils/timezone';

type MatchCardProps = {
  match: MatchWaitingResponseDto;
  onPressRequest?: () => void;
  disabled?: boolean;
  showStatus?: boolean;
  isCancellable?: boolean;
  hasRequested?: boolean;
};

export default function MatchCard({
  match,
  onPressRequest,
  disabled,
  showStatus = false,
  isCancellable = false,
  hasRequested = false,
}: MatchCardProps) {
  const router = useRouter();
  const { data: venuesData } = useVenues();
  const [venueMap, setVenueMap] = useState<Record<number, string>>({});

  useEffect(() => {
    if (venuesData) {
      const map: Record<number, string> = {};
      venuesData.forEach(venue => {
        map[venue.venueId] = venue.venueName;
      });
      setVenueMap(map);
    }
  }, [venuesData]);

  const formatTime = (timeStart: string, timeEnd: string) => {
    if (!match.preferredDate) {
      return `${timeStart.slice(0, 5)} ~ ${timeEnd.slice(0, 5)}`;
    }
    const kstStart = convertUTCToKSTTime(
      `${match.preferredDate}T${timeStart}Z`
    );
    const kstEnd = convertUTCToKSTTime(`${match.preferredDate}T${timeEnd}Z`);
    return `${kstStart} ~ ${kstEnd}`;
  };

  const getVenueName = (venueId: number) =>
    venueMap[venueId] || `경기장 #${venueId}`;

  const getTeamName = (teamName: string | { name: string } | undefined) => {
    if (!teamName) return '미정';
    if (typeof teamName === 'object') return teamName.name;
    return teamName;
  };

  const getSkillLevelColor = (level: string) => {
    const colorMap = {
      AMATEUR: theme.colors.green[500],
      SEMI_PRO: theme.colors.yellow[500],
      PRO: theme.colors.red[500],
    } as const;
    return colorMap[level as keyof typeof colorMap] || theme.colors.green[500];
  };

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case 'AMATEUR':
        return '아마추어';
      case 'SEMI_PRO':
        return '세미프로';
      case 'PRO':
        return '프로';
      default:
        return '아마추어';
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'MATCHED':
        return {
          bg: theme.colors.green[50],
          border: theme.colors.green[200],
          color: theme.colors.green[700],
          label: '매치 성사',
        };
      case 'WAITING':
        return {
          bg: theme.colors.yellow[50],
          border: theme.colors.yellow[200],
          color: theme.colors.yellow[700],
          label: '대기 중',
        };
      case 'CANCELED':
        return {
          bg: theme.colors.red[50],
          border: theme.colors.red[200],
          color: theme.colors.red[700],
          label: '취소됨',
        };
      default:
        return {
          bg: theme.colors.gray[50],
          border: theme.colors.gray[200],
          color: theme.colors.gray[600],
          label: '',
        };
    }
  };

  const status = getStatusStyle(match?.status);

  const handleViewLineup = () => {
    const lineupId = match?.lineup1Id;

    if (!lineupId) {
      alert('아직 등록된 라인업이 없습니다.');
      return;
    }

    const lineupIdNum = Number(lineupId);
    if (isNaN(lineupIdNum)) {
      alert('라인업 ID가 올바르지 않습니다.');
      return;
    }

    router.push(`/match_application/lineup?lineupId=${lineupIdNum}`);
  };

  return (
    <View style={styles.matchCard}>
      <View style={styles.matchCardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.matchCardTitle}>
            {getTeamName(match?.teamName)}
          </Text>

          {match?.universityOnly && (
            <View style={[styles.matchBadge, { marginLeft: 6 }]}>
              <Text style={styles.matchBadgeText}>대학만</Text>
            </View>
          )}

          {showStatus && status.label && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: status.bg,
                  borderColor: status.border,
                },
              ]}
            >
              <Text style={[styles.statusBadgeText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.matchContent}>
        <View style={styles.infoGrid}>
          <View style={styles.infoRowContainer}>
            <View style={styles.infoItemHalf}>
              <Text style={styles.infoLabel}>날짜</Text>
              <Text style={styles.infoValue}>{match?.preferredDate}</Text>
            </View>
            <View style={[styles.infoItemHalf, styles.infoItemHalfLast]}>
              <Text style={styles.infoLabel}>시간</Text>
              <Text style={styles.infoValue}>
                {formatTime(
                  match?.preferredTimeStart || '00:00',
                  match?.preferredTimeEnd || '00:00'
                )}
              </Text>
            </View>
          </View>

          <View style={styles.infoRowContainer}>
            <View style={styles.infoItemHalf}>
              <Text style={styles.infoLabel}>경기장</Text>
              <Text style={styles.infoValue}>
                {getVenueName(match?.preferredVenueId)}
              </Text>
            </View>
            <View style={[styles.infoItemHalf, styles.infoItemHalfLast]}>
              <Text style={styles.infoLabel}>실력</Text>
              <View style={styles.skillLevelContainer}>
                <View
                  style={[
                    styles.skillLevelBadge,
                    {
                      backgroundColor: getSkillLevelColor(
                        match?.skillLevelMin || 'AMATEUR'
                      ),
                    },
                  ]}
                >
                  <Text style={styles.skillLevelText}>
                    {getSkillLevelLabel(match?.skillLevelMin || 'AMATEUR')}
                  </Text>
                </View>
                <Text style={styles.skillLevelRange}>~</Text>
                <View
                  style={[
                    styles.skillLevelBadge,
                    {
                      backgroundColor: getSkillLevelColor(
                        match?.skillLevelMax || 'PRO'
                      ),
                    },
                  ]}
                >
                  <Text style={styles.skillLevelText}>
                    {getSkillLevelLabel(match?.skillLevelMax || 'PRO')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {match?.message && (
          <View style={styles.matchMessage}>
            <Text style={styles.matchMessageLabel}>메시지</Text>
            <Text style={styles.matchMessageText}>
              &quot;{match.message}&quot;
            </Text>
          </View>
        )}
      </View>

      <View style={styles.matchFooter}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={handleViewLineup}
            style={[
              styles.requestButton,
              {
                backgroundColor: theme.colors.white,
                borderWidth: 1.5,
                borderColor: theme.colors.brand.main,
                paddingHorizontal: theme.spacing.spacing5,
                minWidth: 120,
              },
            ]}
          >
            <Text
              style={[
                styles.requestButtonText,
                { color: theme.colors.brand.main, fontSize: 13 },
              ]}
              numberOfLines={1}
            >
              라인업 조회
            </Text>
          </TouchableOpacity>

          {!['CANCELED'].includes(match?.status?.toUpperCase?.() || '') && (
            <TouchableOpacity
              onPress={
                isCancellable
                  ? onPressRequest
                  : () =>
                      router.push({
                        pathname: ROUTES.CREATE_LINEUP,
                        params: {
                          waitingId: String(match.waitingId),
                          targetTeamId: String(match.teamId),
                        },
                      })
              }
              disabled={disabled || hasRequested}
              style={[
                styles.requestButton,
                {
                  backgroundColor: theme.colors.white,
                  borderWidth: 1.5,
                  borderColor: isCancellable
                    ? theme.colors.red[400]
                    : theme.colors.blue[600],
                  opacity: disabled || hasRequested ? 0.6 : 1,
                  paddingHorizontal: theme.spacing.spacing5,
                  minWidth: 120,
                },
              ]}
            >
              <Text
                style={[
                  styles.requestButtonText,
                  {
                    color: isCancellable
                      ? theme.colors.red[600]
                      : theme.colors.blue[600],
                    fontSize: 13,
                  },
                ]}
                numberOfLines={1}
              >
                {disabled
                  ? '요청 중...'
                  : hasRequested
                    ? '신청됨'
                    : isCancellable
                      ? '취소하기'
                      : '신청하기'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
