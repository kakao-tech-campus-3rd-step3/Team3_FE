import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { FORMATION_POSITIONS, FormationType } from '@/src/constants/formations';
import {
  useLineupDetail,
  useTeamMembers,
  useUserProfile,
} from '@/src/hooks/queries';
import type { AllowedPosition, ApiLineupItem } from '@/src/types/lineup';

import { style } from './lineup_screen_style';

export default function LineupScreen() {
  const { lineupId } = useLocalSearchParams<{ lineupId?: string }>();
  const { data: userProfile } = useUserProfile();
  const teamId = userProfile?.teamId ?? 0;

  const { members: teamMembers, isLoading: membersLoading } = useTeamMembers(
    teamId,
    0,
    100
  );
  const {
    data: lineupItems,
    isLoading: lineupLoading,
    error,
  } = useLineupDetail(Number(lineupId));

  const formationType = useMemo<FormationType>(() => '4-3-3', []);
  const positions = useMemo(
    () => FORMATION_POSITIONS[formationType],
    [formationType]
  );

  if (membersLoading || lineupLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>라인업 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (error || !lineupItems) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>라인업 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  // ✅ 팀원 이름 매핑
  const memberMap = new Map<number, string>();
  teamMembers.forEach(m => {
    const key = Number(m.id);
    if (!isNaN(key)) {
      memberMap.set(key, m.name);
    }
  });

  const starters: Record<string, string> = {};
  const bench: { name: string; position: AllowedPosition }[] = [];

  lineupItems.forEach((it: ApiLineupItem) => {
    const idNum = Number(it.teamMemberId);
    const name = memberMap.get(idNum) ?? `#${idNum}`;
    if (it.isStarter) {
      starters[it.position] = name;
    } else {
      bench.push({ name, position: it.position as AllowedPosition });
    }
  });

  const JERSEY_SIZE = 50;

  return (
    <ScrollView
      style={style.scrollContainer}
      contentContainerStyle={style.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <CustomHeader title="라인업 조회" />

      {/* 📋 포메이션 카드 */}
      <View style={style.cardContainer}>
        <View style={style.card}>
          <View style={style.cardHeader}>
            <Text style={style.cardTitle}>📋 포메이션</Text>
          </View>
          <View style={style.cardContent}>
            <Text style={{ fontSize: 16, color: '#333' }}>{formationType}</Text>
          </View>
        </View>
      </View>

      {/* ⚽ 선발 라인업 카드 */}
      <View style={style.fieldCard}>
        <View style={style.cardHeader}>
          <Text style={style.cardTitle}>⚽ 선발 라인업</Text>
        </View>

        <ImageBackground
          source={require('@/assets/images/field.png')}
          style={style.field}
          resizeMode="cover"
        >
          {positions.map(pos => {
            const playerName = starters[pos.id] ?? '—';
            return (
              <View
                key={pos.id}
                style={{
                  position: 'absolute',
                  width: JERSEY_SIZE,
                  height: JERSEY_SIZE,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [
                    { translateX: -JERSEY_SIZE / 2 },
                    { translateY: -JERSEY_SIZE / 2 },
                  ],
                }}
              >
                <Image
                  source={require('@/assets/images/jersey.png')}
                  style={{ width: JERSEY_SIZE, height: JERSEY_SIZE }}
                  resizeMode="contain"
                />
                <Text style={style.playerName}>{playerName}</Text>
              </View>
            );
          })}
        </ImageBackground>
      </View>

      {/* 🧢 후보 라인업 카드 */}
      <View style={style.fieldCard}>
        <View style={style.cardHeader}>
          <Text style={style.cardTitle}>🧢 후보 라인업</Text>
        </View>

        <View style={style.cardContent}>
          {bench.length > 0 ? (
            <View style={style.benchListContainer}>
              {bench.map((b, idx) => (
                <View key={idx} style={style.benchItem}>
                  <Text style={style.benchName}>{b.name}</Text>
                  <Text style={style.benchPosition}>{b.position}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={style.placeholderText}>
              등록된 후보 선수가 없습니다.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
