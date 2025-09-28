import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ImageBackground,
  useWindowDimensions,
  Alert,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';

import { style } from './team_formation_style';

const fieldImage = require('@/assets/images/field.png');

type Member = {
  id: string;
  name: string;
  position: 'FW' | 'MF' | 'DF' | 'GK';
  jerseyNumber?: number;
};

const FORMATIONS: Record<string, number[]> = {
  '4-4-2': [4, 4, 2],
  '4-3-3': [4, 3, 3],
  '3-5-2': [3, 5, 2],
};

export default function TeamFormationScreen() {
  const { members } = useLocalSearchParams<{ members: string }>();
  const parsedMembers: Member[] = members ? JSON.parse(members) : [];

  const [formationKey, setFormationKey] =
    useState<keyof typeof FORMATIONS>('4-4-2');
  const [assigned, setAssigned] = useState<(Member | null)[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const { height } = useWindowDimensions();

  const fieldHeight = height * 0.7;
  const slotSize = fieldHeight * 0.08;

  const formation = FORMATIONS[formationKey];

  const openAssign = (index: number) => {
    setTargetIndex(index);
    setModalVisible(true);
  };

  const assignMember = (member: Member) => {
    // ✅ 중복 체크
    if (assigned.some(m => m?.id === member.id)) {
      Alert.alert(
        '중복 배치 불가',
        `${member.name} 선수는 이미 다른 포지션에 배치되었습니다.`
      );
      return;
    }

    const newAssigned = [...assigned];
    newAssigned[targetIndex!] = member;
    setAssigned(newAssigned);
    setModalVisible(false);
  };

  const renderSlot = (index: number) => {
    const member = assigned[index];
    return (
      <TouchableOpacity
        key={index}
        style={[
          style.slot,
          {
            width: slotSize,
            height: slotSize,
            borderRadius: slotSize / 2,
          },
        ]}
        onPress={() => openAssign(index)}
      >
        <Text style={[style.slotText, { fontSize: slotSize * 0.25 }]}>
          {member ? member.name : '+'}
        </Text>
      </TouchableOpacity>
    );
  };

  const router = useRouter();

  return (
    <View style={style.container}>
      {/* ✅ 커스텀 헤더 */}
      <CustomHeader title="포메이션 설정" />

      {/* ✅ 포메이션 드롭다운 */}
      <View style={style.dropdownWrap}>
        <Picker
          selectedValue={formationKey}
          onValueChange={value => {
            setFormationKey(value as keyof typeof FORMATIONS);
            setAssigned([]);
          }}
          style={style.dropdown}
        >
          {Object.keys(FORMATIONS).map(key => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
        </Picker>
      </View>

      {/* 필드 */}
      <ImageBackground
        source={fieldImage}
        style={[style.field, { height: fieldHeight }]}
        resizeMode="cover"
      >
        {/* 공격수 → 미드필더 → 수비수 */}
        {formation
          .slice()
          .reverse()
          .map((count, rowIdx) => {
            const startIndex =
              1 +
              formation
                .slice(0, formation.length - rowIdx - 1)
                .reduce((a, b) => a + b, 0);
            return (
              <View key={rowIdx} style={style.row}>
                {Array.from({ length: count }).map((_, i) =>
                  renderSlot(startIndex + i)
                )}
              </View>
            );
          })}

        {/* 골키퍼 */}
        <View style={[style.row, style.gkRow]}>{renderSlot(0)}</View>
      </ImageBackground>

      {/* ✅ 하단 바 */}
      <View style={style.bottomBar}>
        <TouchableOpacity
          style={style.nextButton}
          onPress={() => {
            // ✅ match_info_screen으로 이동
            router.push('/match_making/match_info');
          }}
        >
          <Text style={style.nextButtonText}>일정 및 장소 선택</Text>
        </TouchableOpacity>
      </View>

      {/* 모달: 선수 선택 */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={style.modalWrap}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>선수 선택</Text>
            <FlatList
              data={parsedMembers}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={style.memberItem}
                  onPress={() => assignMember(item)}
                >
                  <Text>
                    {item.name} ({item.position}
                    {item.jerseyNumber ? ` · #${item.jerseyNumber}` : ''})
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={style.closeButton}
            >
              <Text style={{ color: 'white' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
