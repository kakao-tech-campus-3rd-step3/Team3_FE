import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { TeamMemberSelectModal } from '@/src/components/ui/team_member_select_modal';
import {
  FORMATIONS,
  FormationType,
  generateFormation,
} from '@/src/constants/formations';
import { useTeamMembers } from '@/src/hooks/queries';

import { style } from './team_formation_style';

export default function TeamFormationScreen() {
  const router = useRouter();
  const { data: teamMembersResponse } = useTeamMembers(1); // TODO: 실제 팀 ID로 교체
  const teamMembers = teamMembersResponse?.content ?? [];

  const [selectedFormation, setSelectedFormation] =
    useState<FormationType>('4-3-3');
  const positions = useMemo(
    () => generateFormation(selectedFormation),
    [selectedFormation]
  );

  const [formationAssignments, setFormationAssignments] = useState<
    Record<string, string | null>
  >({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const JERSEY_SIZE = 40;

  return (
    <View style={style.container}>
      <CustomHeader title="팀 포메이션 구성" />

      {/* 포메이션 선택 */}
      <View style={style.formationSelector}>
        {(
          ['4-3-3', '4-4-2', '3-5-2', '4-1-4-1', '4-2-3-1'] as FormationType[]
        ).map(type => (
          <TouchableOpacity
            key={type}
            style={[
              style.formationButton,
              selectedFormation === type && style.formationButtonActive,
            ]}
            onPress={() => setSelectedFormation(type)}
          >
            <Text
              style={[
                style.formationButtonText,
                selectedFormation === type && style.formationButtonTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 필드 */}
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
                style.playerCircle,
                {
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: [
                    { translateX: -JERSEY_SIZE / 2 },
                    { translateY: -JERSEY_SIZE / 2 },
                  ],
                },
                isSelected && style.playerCircleSelected,
              ]}
              onPress={() => handleSelectPosition(pos.id)}
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

      <TouchableOpacity style={style.nextButton} onPress={handleNext}>
        <Text style={style.nextButtonText}>다음으로</Text>
      </TouchableOpacity>

      {showModal && (
        <TeamMemberSelectModal
          visible={showModal}
          members={teamMembers}
          position={selectedPosition}
          onClose={() => setShowModal(false)}
          onSelect={handleMemberSelect}
        />
      )}
    </View>
  );
}
