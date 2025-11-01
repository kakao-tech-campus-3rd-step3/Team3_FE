import { useRouter } from 'expo-router';
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
import { useTeamMembers, useUserProfile } from '@/src/hooks/queries';

import { style } from './team_formation_style';

export default function TeamFormationScreen() {
  const router = useRouter();
  // ✅ 현재 로그인한 유저 정보에서 teamId 가져오기
  const { data: userProfile } = useUserProfile();
  const teamId = userProfile?.teamId ?? 0; // undefined 방지 (enabled 옵션과 함께 사용)

  // ✅ teamId가 유효할 때만 쿼리 실행됨
  const { members: teamMembers, isLoading } = useTeamMembers(teamId, 0, 10);

  const [selectedFormation, setSelectedFormation] =
    useState<FormationType>('4-3-3');
  const positions = useMemo(
    () => FORMATION_POSITIONS[selectedFormation],
    [selectedFormation]
  );

  const [formationAssignments, setFormationAssignments] = useState<
    Record<string, string | null>
  >({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [benchMembers, setBenchMembers] = useState<
    { id: number; name: string }[]
  >([]);
  const [showBenchModal, setShowBenchModal] = useState(false);

  const JERSEY_SIZE = 50;

  const handleSelectPosition = (pos: string) => {
    setSelectedPosition(pos);
    setShowModal(true);
  };

  const handleMemberSelect = (memberId: number, memberName: string) => {
    if (!selectedPosition) return;

    // 이미 이 선수가 다른 포지션에 등록되어 있는지 확인
    const existingPosition = Object.keys(formationAssignments).find(
      key => formationAssignments[key] === memberName
    );

    setFormationAssignments(prev => {
      const updated = { ...prev };

      // 기존 포지션에 있던 선수면 제거
      if (existingPosition && existingPosition !== selectedPosition) {
        updated[existingPosition] = null;
        Alert.alert(
          '포지션 변경',
          `${memberName} 선수가 ${existingPosition}에서 ${selectedPosition}으로 이동되었습니다.`
        );
      }

      // 새 포지션에 등록
      updated[selectedPosition] = memberName;
      return updated;
    });

    setShowModal(false);
  };

  const handleRemoveFromBench = (name: string) => {
    setBenchMembers(prev => prev.filter(m => m.name !== name));
  };

  const filledCount = Object.values(formationAssignments).filter(
    name => name !== null
  ).length;

  const isFormationComplete = filledCount === 11;

  const handleFormationChange = (newFormation: FormationType) => {
    setSelectedFormation(newFormation);
    setFormationAssignments({});
    setSelectedPosition(null);
    setShowModal(false);
    setBenchMembers([]);
  };

  const handleNext = () => {
    if (!isFormationComplete) {
      Alert.alert(
        '라인업 미완성',
        `현재 ${filledCount}/11명만 배정되었습니다.\n모든 포지션을 채워주세요.`
      );
      return;
    }

    router.push({
      pathname: '/match_making/match_info',
      params: {
        formation: JSON.stringify(formationAssignments),
        type: selectedFormation,
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
        // ✅ Hook 순서가 바뀌지 않도록, return 대신 조건부 렌더링
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
          {/* 📋 포메이션 선택 카드 */}
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

          {/* ⚽ 선발 라인업 카드 */}
          <View style={style.fieldCard}>
            <View style={style.cardHeader}>
              <Text style={style.cardTitle}>⚽ 선발 라인업</Text>
            </View>

            {/* cardContent로 한번 더 감싸지 말고 바로 배경 이미지를 둔다 */}
            <ImageBackground
              source={require('@/assets/images/field.png')}
              style={style.field}
              resizeMode="cover"
            >
              {positions.map(pos => {
                const isSelected = selectedPosition === pos.id;
                const assigned = formationAssignments[pos.id];
                const isEmpty = !assigned;

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
                    <Text style={style.playerName}>{assigned || pos.id}</Text>
                    {isEmpty && <Text style={style.warningIcon}>❗</Text>}
                  </TouchableOpacity>
                );
              })}
            </ImageBackground>
          </View>

          {/* 🧢 후보 라인업 카드 */}
          <View style={style.fieldCard}>
            <View style={style.cardHeader}>
              <Text style={style.cardTitle}>↔️ 후보 라인업</Text>
            </View>

            <View style={style.cardContent}>
              {benchMembers.length > 0 ? (
                <View style={style.benchListContainer}>
                  {benchMembers.map(member => {
                    // teamMembers에서 상세 정보 찾아오기
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

          {/* ✅ 다음 버튼 카드 */}
          <View style={style.nextButtonCard}>
            <TouchableOpacity
              style={[
                style.nextButton,
                !isFormationComplete && style.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!isFormationComplete}
            >
              <Text style={style.nextButtonText}>
                {isFormationComplete
                  ? '다음으로'
                  : `(${filledCount}/11) 포지션 배정`}
              </Text>
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
          onRemoveFromFormation={name => {
            // 기존 포지션 비우기
            setFormationAssignments(prev => {
              const updated = { ...prev };
              Object.keys(updated).forEach(key => {
                if (updated[key] === name) updated[key] = null;
              });
              return updated;
            });
          }}
          onRemoveFromBench={handleRemoveFromBench}
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
          onRemoveFromFormation={name => {
            setFormationAssignments(prev => {
              const updated = { ...prev };
              Object.keys(updated).forEach(key => {
                if (updated[key] === name) delete updated[key];
              });
              return updated;
            });
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}
