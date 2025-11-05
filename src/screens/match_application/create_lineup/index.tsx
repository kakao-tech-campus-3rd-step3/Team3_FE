import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Dropdown from '@/src/components/dropdown';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { TeamMemberSelectModal } from '@/src/components/ui/team_member_select_modal';
import { FORMATION_POSITIONS, FormationType } from '@/src/constants/formations';
import { ROUTES } from '@/src/constants/routes';
import {
  useCreateLineupsMutation,
  useMatchRequestMutation,
  useTeamMembersInfinite,
  useUserProfile,
} from '@/src/hooks/queries';
import { style } from '@/src/screens/match_application/create_lineup/create_lineup_style';
import { MatchRequestRequestDto } from '@/src/types';
import { AllowedPosition } from '@/src/types/lineup';
import { buildPositionMap, createLineupPayload } from '@/src/utils/lineup';

export default function CreateLineupScreen() {
  const router = useRouter();
  const { waitingId, targetTeamId } = useLocalSearchParams<{
    waitingId?: string;
    targetTeamId?: string;
  }>();
  const { mutate: requestMatch } = useMatchRequestMutation();
  const { data: userProfile } = useUserProfile();
  const teamId = userProfile?.teamId ?? 0;

  const { data, fetchNextPage, isLoading } = useTeamMembersInfinite(teamId, 50);
  const teamMembers = useMemo(
    () => (data ? data.pages.flatMap(page => page.members) : []),
    [data]
  );
  const { mutate: createLineups, isPending } = useCreateLineupsMutation();

  const [selectedFormation, setSelectedFormation] =
    useState<FormationType>('4-3-3');
  const positions = useMemo(
    () => FORMATION_POSITIONS[selectedFormation],
    [selectedFormation]
  );

  const [formationAssignments, setFormationAssignments] = useState<
    Record<string, number | null>
  >({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [benchMembers, setBenchMembers] = useState<
    { id: number; name: string; preferredPosition?: string }[]
  >([]);
  const [showBenchModal, setShowBenchModal] = useState(false);

  const JERSEY_SIZE = 50;

  const handleSelectPosition = (pos: string) => {
    setSelectedPosition(pos);
    setShowModal(true);
  };

  const handleMemberSelect = (memberId: number, memberName: string) => {
    if (!selectedPosition) return;
    const existingPosition = Object.keys(formationAssignments).find(
      key => formationAssignments[key] === memberId
    );

    setFormationAssignments(prev => {
      const updated = { ...prev };
      if (existingPosition && existingPosition !== selectedPosition) {
        updated[existingPosition] = null;
        Alert.alert(
          '포지션 변경',
          `${memberName} 선수가 ${existingPosition}에서 ${selectedPosition}으로 이동되었습니다.`
        );
      }
      updated[selectedPosition] = memberId;
      return updated;
    });
    setShowModal(false);
  };

  const handleRemoveFromBench = (name: string) => {
    setBenchMembers(prev => prev.filter(m => m.name !== name));
  };

  const filledCount = Object.values(formationAssignments).filter(
    v => v !== null
  ).length;
  const isFormationComplete = filledCount === 11;

  const handleFormationChange = (newFormation: FormationType) => {
    setSelectedFormation(newFormation);
    setFormationAssignments({});
    setSelectedPosition(null);
    setShowModal(false);
    setBenchMembers([]);
  };

  const handleConfirmLineup = () => {
    // ✅ 1. 인원수 확인
    if (filledCount !== 11) {
      Alert.alert(
        '라인업 미완성',
        `⚠️ 선발 ${filledCount}/11명만 배정되었습니다. 모든 포지션을 채워주세요.`
      );
      return;
    }

    // ✅ 2. 중복 확인
    const starterIds = new Set(
      Object.values(formationAssignments).filter((v): v is number => v !== null)
    );
    const hasDuplicate = benchMembers.some(b => starterIds.has(b.id));
    if (hasDuplicate) {
      Alert.alert(
        '중복 등록',
        '⚠️ 같은 선수가 선발과 후보에 중복되어 있습니다.'
      );
      return;
    }

    // ✅ 3. Payload 생성
    const positionMap = buildPositionMap(
      FORMATION_POSITIONS[selectedFormation]
    );
    const benchWithPos = benchMembers.map(b => ({
      id: b.id,
      preferredPosition: (b.preferredPosition ||
        userProfile?.position ||
        'FW') as AllowedPosition,
    }));

    const payload = createLineupPayload(
      formationAssignments,
      benchWithPos,
      positionMap
    );

    // ✅ 4. API 요청
    createLineups(payload, {
      onSuccess: data => {
        const createdLineupId = data[0]?.lineupId ?? null;

        if (!createdLineupId) {
          Alert.alert('오류', '생성된 라인업 ID를 확인할 수 없습니다.');
          return;
        }

        // ✅ 3️⃣ 라인업 생성 후 바로 매치 요청 전송
        if (!waitingId || !targetTeamId) {
          Alert.alert('오류', '매치 요청 대상 정보가 없습니다.');
          return;
        }

        const matchPayload: MatchRequestRequestDto = {
          requestMessage: `${userProfile?.name}(${userProfile?.teamId}) 팀이 매치 요청`,
          lineupId: createdLineupId,
        };

        requestMatch(
          { waitingId: Number(waitingId), payload: matchPayload },
          {
            onSuccess: () => {
              Alert.alert(
                '매치 요청 완료',
                '✅ 라인업이 등록되고 매치 요청이 전송되었습니다.',
                [
                  {
                    text: '확인',
                    onPress: () => router.push(ROUTES.HOME),
                  },
                ]
              );
            },
            onError: err => {
              console.error('❌ 매치 요청 실패:', err);
              Alert.alert(
                '매치 요청 실패',
                '⚠️ 라인업은 등록되었으나 매치 요청에 실패했습니다.'
              );
            },
          }
        );
      },
      onError: err => {
        console.error('❌ 라인업 생성 실패:', err);
        Alert.alert(
          '라인업 등록 실패',
          '❌ 라인업 생성 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomHeader title="라인업 구성" />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>팀 정보를 불러오는 중...</Text>
        </View>
      ) : (
        <ScrollView
          style={style.scrollContainer}
          contentContainerStyle={style.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 📋 포메이션 선택 */}
          <View style={style.cardContainer}>
            <View style={style.card}>
              <View style={style.cardHeader}>
                <Text style={style.cardTitle}>📋 포메이션 선택</Text>
              </View>
              <View style={style.cardContent}>
                <Dropdown
                  items={
                    [
                      '4-3-3',
                      '4-4-2',
                      '3-5-2',
                      '4-1-4-1',
                      '4-2-3-1',
                      '4-1-2-3',
                      '5-3-2',
                    ] as const
                  }
                  value={selectedFormation}
                  onChange={v => handleFormationChange(v as FormationType)}
                  placeholder="포메이션 선택"
                />
              </View>
            </View>
          </View>

          {/* ⚽ 선발 라인업 */}
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
                const isSelected = selectedPosition === pos.id;
                const assignedId = formationAssignments[pos.id];
                const assignedMember = teamMembers.find(
                  m => m.id === assignedId
                );
                const displayName = assignedMember
                  ? assignedMember.name
                  : pos.id;
                const isEmpty = !assignedId;

                return (
                  <TouchableOpacity
                    key={pos.id}
                    style={[
                      {
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
                          { scale: isSelected ? 1.15 : 1 },
                        ],
                      },
                      isSelected
                        ? style.playerCircleSelected
                        : style.playerCircleUnselected,
                    ]}
                    onPress={() => handleSelectPosition(pos.id)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('@/assets/images/jersey.png')}
                      style={[
                        style.jersey,
                        { width: JERSEY_SIZE, height: JERSEY_SIZE },
                      ]}
                      resizeMode="contain"
                    />
                    <Text style={style.playerName}>{displayName}</Text>
                    {isEmpty && <Text style={style.warningIcon}>❗</Text>}
                  </TouchableOpacity>
                );
              })}
            </ImageBackground>
          </View>

          {/* 🧢 후보 라인업 */}
          <View style={style.fieldCard}>
            <View style={style.cardHeader}>
              <Text style={style.cardTitle}>↔️ 후보 라인업</Text>
            </View>

            <View style={style.cardContent}>
              {benchMembers.length > 0 ? (
                <View style={style.benchListContainer}>
                  {benchMembers.map(member => {
                    const info = teamMembers.find(m => m.id === member.id);
                    return (
                      <View key={member.id} style={style.benchItem}>
                        <Text style={style.benchName}>{member.name}</Text>
                        <Text style={style.benchPosition}>
                          {info?.position || '포지션 미등록'}
                        </Text>
                      </View>
                    );
                  })}

                  <TouchableOpacity
                    style={style.addMoreButton}
                    onPress={() => setShowBenchModal(true)}
                  >
                    <Text style={style.addMoreButtonText}>＋ 추가하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text style={style.placeholderText}>
                    후보 선수를 선택해주세요
                  </Text>
                  <TouchableOpacity
                    style={style.addButton}
                    onPress={() => setShowBenchModal(true)}
                  >
                    <Text style={style.addButtonText}>＋ 후보 추가</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* ✅ 통합된 버튼 */}
          <View style={[style.nextButtonCard, { marginTop: 20 }]}>
            <TouchableOpacity
              style={[
                style.nextButton,
                (isPending || !isFormationComplete) && style.nextButtonDisabled,
              ]}
              disabled={isPending || !isFormationComplete}
              onPress={handleConfirmLineup}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={style.nextButtonText}>
                  {isFormationComplete
                    ? '✅ 라인업 확정 및 진행'
                    : `(${filledCount}/11) 포지션 배정`}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* 팀원 선택 모달 */}
      {showModal && (
        <TeamMemberSelectModal
          visible={showModal}
          members={teamMembers}
          position={selectedPosition}
          onClose={() => setShowModal(false)}
          onSelect={handleMemberSelect}
          assignedMembers={formationAssignments}
          benchMembers={benchMembers}
          onRemoveFromFormation={memberId => {
            setFormationAssignments(prev => {
              const updated = { ...prev };
              Object.keys(updated).forEach(key => {
                if (updated[key] === memberId) updated[key] = null;
              });
              return updated;
            });
          }}
          onRemoveFromBench={memberId =>
            setBenchMembers(prev => prev.filter(m => m.id !== memberId))
          }
        />
      )}

      {/* 후보선수 모달 */}
      {showBenchModal && (
        <TeamMemberSelectModal
          visible={showBenchModal}
          members={teamMembers}
          position={null}
          multiple={true}
          preselected={benchMembers}
          assignedMembers={formationAssignments}
          benchMembers={benchMembers}
          onClose={() => setShowBenchModal(false)}
          onMultiSelect={members => {
            setBenchMembers(members);
            setShowBenchModal(false);
          }}
          onRemoveFromFormation={id => {
            setFormationAssignments(prev => {
              const updated = { ...prev };
              Object.keys(updated).forEach(key => {
                if (updated[key] === id) updated[key] = null;
              });
              return updated;
            });
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}
