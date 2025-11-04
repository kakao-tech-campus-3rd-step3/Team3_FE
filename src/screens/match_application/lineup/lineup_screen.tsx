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
    // 1️⃣ URL 파라미터 우선
    if (formationParam && FORMATION_POSITIONS[formationParam])
      return formationParam;

    // 2️⃣ API 응답 기반 휴리스틱 추정
    if (Array.isArray(lineupItems)) {
      const starters = lineupItems.filter(i => i.isStarter);
      if (starters.length === 0) return '4-3-3';

      const count = (p: AllowedPosition) =>
        starters.filter(s => String(s.position).toUpperCase() === p).length;

      const cb = count('CB');
      const lb = count('LB');
      const rb = count('RB');
      const dm = count('DM');
      const cm = count('CM');
      const am = count('AM');
      const lw = count('LW');
      const rw = count('RW');
      const st = count('ST');
      const fw = count('FW');

      const totalDF = cb + lb + rb;
      const totalMF = dm + cm + am;
      const totalFW = lw + rw + st + fw;

      // ──────────────── 방어 라인 분석
      if (totalDF >= 5) {
        // 윙백 존재시 5백
        if (lb >= 1 && rb >= 1 && cb >= 3) {
          return '5-3-2';
        }
        // 중앙 밀집형
        return '5-3-2';
      }
      if (cb === 3 && lb + rb <= 1) {
        // 3CB 중심 → 3백 계열
        if (lw + rw >= 1) return '3-5-2';
        return '3-5-2';
      }

      // ──────────────── 공격 라인 분석
      if (st === 2 && totalDF === 4) {
        // 투톱 + 4백 → 4-4-2 or 4-1-3-2 변형
        if (dm >= 2) return '4-4-2';
        return '4-4-2';
      }

      // ──────────────── 미드필더 구조 분석
      if (dm === 2 && am === 1 && st === 1) {
        return '4-2-3-1';
      }
      if (dm === 1 && cm >= 3 && st === 1) {
        return '4-1-4-1';
      }
      if (dm === 1 && totalFW === 3) {
        return '4-1-2-3';
      }

      // ──────────────── 기본값
      return '4-3-3';
    }

    // 3️⃣ fallback
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
  // 기존 positionToSlots 함수 전체를 이 버전으로 대체
  const positionToSlots = (ft: FormationType): Record<string, string[]> => {
    switch (ft) {
      // ① 기본형: 4-3-3
      case '4-3-3':
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

      // ② 4-4-2 (클래식)
      case '4-4-2':
        return {
          GK: ['GK'],
          LB: ['LB'],
          RB: ['RB'],
          CB: ['LCB', 'RCB'],
          LW: ['LM', 'LW'],
          RW: ['RM', 'RW'],
          DM: ['LCM', 'RCM', 'CM'],
          CM: ['LCM', 'RCM', 'CM'],
          AM: ['CAM'],
          ST: ['LS', 'RS'],
        };

      // ③ 4-2-3-1
      case '4-2-3-1':
        return {
          GK: ['GK'],
          LB: ['LB'],
          RB: ['RB'],
          CB: ['LCB', 'RCB'],
          DM: ['LDM', 'RDM', 'CDM'],
          CM: ['CDM', 'CM'],
          AM: ['LAM', 'CAM', 'RAM'],
          LW: ['LAM', 'LW'],
          RW: ['RAM', 'RW'],
          ST: ['ST'],
        };

      // ④ 4-1-4-1
      case '4-1-4-1':
        return {
          GK: ['GK'],
          LB: ['LB'],
          RB: ['RB'],
          CB: ['LCB', 'RCB'],
          DM: ['CDM'],
          CM: ['LCM', 'RCM', 'CM'],
          AM: ['LAM', 'CAM', 'RAM'],
          LW: ['LM', 'LW'],
          RW: ['RM', 'RW'],
          ST: ['ST'],
        };

      // ⑤ 4-1-2-3 (수비형 미드 1 + 중앙 2)
      case '4-1-2-3':
        return {
          GK: ['GK'],
          LB: ['LB'],
          RB: ['RB'],
          CB: ['LCB', 'RCB'],
          DM: ['CDM'],
          CM: ['LCM', 'RCM'],
          AM: ['CAM'],
          LW: ['LW'],
          RW: ['RW'],
          ST: ['ST'],
        };

      // ⑥ 3-5-2 (중앙 3백 + 윙미드)
      case '3-5-2':
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

      // ⑦ 5-3-2 (윙백 시스템)
      case '5-3-2':
        return {
          GK: ['GK'],
          LB: ['LWB'],
          RB: ['RWB'],
          CB: ['LCB', 'CB', 'RCB'],
          DM: ['CDM', 'CM'],
          CM: ['LCM', 'CM', 'RCM'],
          AM: ['CAM', 'CM'],
          ST: ['LS', 'RS'],
        };

      default:
        return {
          GK: ['GK'],
          LB: ['LB'],
          RB: ['RB'],
          CB: ['LCB', 'RCB', 'CB'],
          DM: ['CDM', 'CM'],
          CM: ['LCM', 'CM', 'RCM'],
          AM: ['LAM', 'CAM', 'RAM'],
          LW: ['LW', 'LM'],
          RW: ['RW', 'RM'],
          ST: ['ST'],
        };
    }
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
