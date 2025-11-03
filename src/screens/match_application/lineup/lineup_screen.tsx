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
  const { lineupId, formation: formationParam } = useLocalSearchParams<{
    lineupId?: string;
    formation?: FormationType;
  }>();
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

  // ─────────────────────────────────────────────────────────────
  // ① formationType 결정: URL 파라미터 → API 응답 → 휴리스틱
  const formationType = useMemo<FormationType>(() => {
    // URL 파라미터 우선
    if (formationParam && FORMATION_POSITIONS[formationParam])
      return formationParam;

    // API 응답 내부에 넣어두었다면 활용 (예: items[0].formationType)
    const apiFormation =
      Array.isArray(lineupItems) && lineupItems.length > 0
        ? (lineupItems[0] as any)?.formationType
        : undefined;
    if (apiFormation && FORMATION_POSITIONS[apiFormation as FormationType]) {
      return apiFormation as FormationType;
    }

    // 휴리스틱: 5-3-2 vs 3-5-2 vs 4-3-3 간단 구분
    if (Array.isArray(lineupItems)) {
      const starters = lineupItems.filter(i => i.isStarter);
      const count = (p: AllowedPosition) =>
        starters.filter(s => String(s.position).toUpperCase() === p).length;

      const cb = count('CB' as AllowedPosition);
      const lb = count('LB' as AllowedPosition);
      const rb = count('RB' as AllowedPosition);
      const lw = count('LW' as AllowedPosition);
      const rw = count('RW' as AllowedPosition);
      const st = count('ST' as AllowedPosition);

      // 두 명의 ST + CB가 3명이면 3백 계열
      if (st >= 2 && cb >= 3) {
        // 윙(좌우) 존재하면 3-5-2, 아니고 풀백 둘이면 5-3-2로
        if (lw + rw >= 1) return '3-5-2';
        if (lb + rb >= 2) return '5-3-2';
        return '5-3-2';
      }
      // 그 외는 기본 4-3-3
      return '4-3-3';
    }

    return '4-3-3';
  }, [formationParam, lineupItems]);

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

  // ─────────────────────────────────────────────────────────────
  // ② 팀원 이름 매핑
  const memberMap = new Map<number, string>();
  teamMembers.forEach(m => {
    const key = Number(m.id);
    if (!isNaN(key)) memberMap.set(key, m.name);
  });

  // ─────────────────────────────────────────────────────────────
  // ③ 포지션→슬롯 매핑 (포메이션별 후보 우선순위)
  const positionToSlots = (ft: FormationType): Record<string, string[]> => {
    if (ft === '5-3-2') {
      // 5백: LB/RB는 윙백 슬롯으로, CB는 3자리
      return {
        GK: ['GK'],
        LB: ['LWB'], // ★ 핵심: LB → LWB
        RB: ['RWB'], // ★ 핵심: RB → RWB
        CB: ['LCB', 'CB', 'RCB'],
        DM: ['CM'],
        CM: ['LCM', 'CM', 'RCM'],
        AM: ['CM', 'RCM'],
        LW: ['LS'], // 윙이 들어왔다면 최전방 보조로 억지 배치 방지
        RW: ['RS'],
        ST: ['LS', 'RS'],
      };
    }
    if (ft === '3-5-2') {
      // 3-5-2: 윙(=LM/RM)이면 LW/RW 슬롯로
      return {
        GK: ['GK'],
        LB: ['LCB'],
        RB: ['RCB'],
        CB: ['LCB', 'CB', 'RCB'],
        LW: ['LM'],
        RW: ['RM'],
        DM: ['LDM', 'RDM', 'CM'],
        CM: ['LCM', 'CM', 'RCM'],
        AM: ['CAM', 'CM', 'RCM'],
        ST: ['LS', 'RS'],
      };
    }
    // 기본(4백 계열)
    return {
      GK: ['GK'],
      LB: ['LB'],
      RB: ['RB'],
      CB: ['LCB', 'RCB', 'CB'],
      DM: ['CDM', 'CM'],
      CM: ['LCM', 'CM', 'RCM'],
      AM: ['LAM', 'CAM', 'RAM', 'CM'],
      LW: ['LW', 'LM'],
      RW: ['RW', 'RM'],
      ST: ['ST', 'LS', 'RS'],
    };
  };

  const SLOT_PREF = positionToSlots(formationType);

  const starters: Record<string, string> = {};
  const usedSlots = new Set<string>();
  const bench: { name: string; position: AllowedPosition }[] = [];

  const pickSlotFor = (pos: string): string | null => {
    const base = (pos || '').toUpperCase();
    const candidates = SLOT_PREF[base] ?? [base];

    // 1) 포메이션 내 명시 후보 우선
    for (const c of candidates) {
      if (positions.some(p => p.id === c) && !usedSlots.has(c)) return c;
    }
    // 2) 접두사(예: CB → LCB/RCB)
    const alt = positions.find(
      p => p.id.startsWith(base) && !usedSlots.has(p.id)
    );
    return alt?.id ?? null;
  };

  // ─────────────────────────────────────────────────────────────
  // ④ 매핑/배치
  lineupItems.forEach((it: ApiLineupItem) => {
    const idNum = Number(it.teamMemberId);
    const name = memberMap.get(idNum) ?? `#${idNum}`;
    const slot = it.isStarter ? pickSlotFor(String(it.position)) : null;

    if (it.isStarter && slot) {
      starters[slot] = name;
      usedSlots.add(slot);
      if (__DEV__)
        console.log(
          `✅ 배치: ${it.position} → ${slot} (${name}) [${formationType}]`
        );
    } else if (it.isStarter && !slot) {
      if (__DEV__)
        console.warn(
          `⚠️ 슬롯 없음: ${it.position} (formation=${formationType})`
        );
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
