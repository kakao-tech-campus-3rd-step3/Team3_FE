import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { getVenues } from '@/src/api/venue';
import { theme } from '@/src/theme';
import { MatchWaitingResponseDto } from '@/src/types/match';

import { styles } from '../match_application_style';

type MatchCardProps = {
  match: MatchWaitingResponseDto;
  onPressRequest?: () => void;
  disabled?: boolean;
};

export default function MatchCard({
  match,
  onPressRequest,
  disabled,
}: MatchCardProps) {
  const [venueMap, setVenueMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venuesData = await getVenues();

        const map: Record<number, string> = {};
        venuesData.forEach(venue => {
          map[venue.venueId] = venue.venueName;
        });
        setVenueMap(map);
      } catch {
        // 기본값 사용
      }
    };

    loadVenues();
  }, []);

  const formatTime = (timeStart: string, timeEnd: string) => {
    return `${timeStart.slice(0, 5)} ~ ${timeEnd.slice(0, 5)}`;
  };

  const getVenueName = (venueId: number) => {
    return venueMap[venueId] || `경기장 #${venueId}`;
  };

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

  return (
    <View style={styles.matchCard}>
      <View style={styles.matchCardHeader}>
        <Text style={styles.matchCardTitle}>
          {getTeamName(match?.teamName)}
        </Text>
        {match?.universityOnly && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>대학만</Text>
          </View>
        )}
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
        <TouchableOpacity
          onPress={onPressRequest}
          disabled={disabled}
          style={[
            styles.requestButton,
            disabled && styles.requestButtonDisabled,
          ]}
        >
          <Text style={styles.requestButtonText}>
            {disabled ? '요청 중...' : '신청하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
