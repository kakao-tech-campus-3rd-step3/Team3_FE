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
} from 'react-native';

import Dropdown from '@/src/components/dropdown';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { TeamMemberSelectModal } from '@/src/components/ui/team_member_select_modal';
import { FORMATION_POSITIONS, FormationType } from '@/src/constants/formations';
import { useTeamMembers } from '@/src/hooks/queries';

import { style } from './team_formation_style';

export default function TeamFormationScreen() {
  const router = useRouter();
  const { data: teamMembersResponse } = useTeamMembers(1);
  const teamMembers = teamMembersResponse?.content ?? [];

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

  const JERSEY_SIZE = 50;

  const handleSelectPosition = (pos: string) => {
    setSelectedPosition(pos);
    setShowModal(true);
  };

  const handleMemberSelect = (memberName: string) => {
    if (!selectedPosition) return;
    setFormationAssignments(prev => ({
      ...prev,
      [selectedPosition]: memberName,
    }));
    setShowModal(false);
  };

  const handleNext = () => {
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
      <CustomHeader title="팀 포메이션 구성" />

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
                onChange={v => setSelectedFormation(v as FormationType)}
                placeholder="포메이션 선택"
              />
            </View>
          </View>
        </View>

        {/* ⚽ 축구장 카드 */}
        <View style={style.fieldCard}>
          <ImageBackground
            source={require('@/assets/images/field.png')}
            style={style.field}
            resizeMode="cover"
          >
            {positions.map(pos => {
              const isSelected = selectedPosition === pos.id;
              const assigned = formationAssignments[pos.id];

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
                </TouchableOpacity>
              );
            })}
          </ImageBackground>
        </View>

        {/* ✅ 다음 버튼 카드 */}
        <View style={style.nextButtonCard}>
          <TouchableOpacity style={style.nextButton} onPress={handleNext}>
            <Text style={style.nextButtonText}>다음으로</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 팀원 선택 모달 */}
      {showModal && (
        <TeamMemberSelectModal
          visible={showModal}
          members={teamMembers}
          position={selectedPosition}
          onClose={() => setShowModal(false)}
          onSelect={handleMemberSelect}
        />
      )}
    </KeyboardAvoidingView>
  );
}
