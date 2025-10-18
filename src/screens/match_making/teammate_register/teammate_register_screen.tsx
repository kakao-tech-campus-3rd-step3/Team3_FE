import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';

import { style } from './teammate_register_style';

type Member = {
  id: string;
  name: string;
  position: 'FW' | 'MF' | 'DF' | 'GK';
  jerseyNumber?: number;
};

//  임시 Mock
const MOCK_MEMBERS: Member[] = [
  { id: '1', name: '김스트라이커', position: 'FW', jerseyNumber: 9 },
  { id: '2', name: '박미드필더', position: 'MF', jerseyNumber: 8 },
  { id: '3', name: '이수비수', position: 'DF', jerseyNumber: 4 },
  { id: '4', name: '최골키퍼', position: 'GK', jerseyNumber: 1 },
  { id: '5', name: '정윙어', position: 'FW', jerseyNumber: 11 },
  { id: '6', name: '오미드', position: 'MF', jerseyNumber: 6 },
];

const POSITIONS: (Member['position'] | 'ALL')[] = [
  'ALL',
  'FW',
  'MF',
  'DF',
  'GK',
];

export default function TeammateRegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [q, setQ] = useState('');
  const [pos, setPos] = useState<Member['position'] | 'ALL'>('ALL');
  const [selected, setSelected] = useState<string[]>([]);

  //  검색 + 포지션 필터
  const data = useMemo(() => {
    let arr = MOCK_MEMBERS;
    if (pos !== 'ALL') arr = arr.filter(m => m.position === pos);
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      arr = arr.filter(
        m =>
          m.name.toLowerCase().includes(k) ||
          String(m.jerseyNumber ?? '').includes(k)
      );
    }
    return arr;
  }, [q, pos]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const allFilteredIds = useMemo(() => data.map(m => m.id), [data]);
  const allSelectedOnThisPage = allFilteredIds.every(id =>
    selected.includes(id)
  );
  const selectedCount = selected.length;

  const onToggleAll = () => {
    setSelected(prev => {
      if (allSelectedOnThisPage) {
        return prev.filter(id => !allFilteredIds.includes(id));
      }
      const add = allFilteredIds.filter(id => !prev.includes(id));
      return [...prev, ...add];
    });
  };

  const canSubmit = selectedCount > 0;

  const submit = () => {
    if (selected.length === 0) return;

    // 선택된 선수 정보 가져오기
    const selectedMembers = MOCK_MEMBERS.filter(m => selected.includes(m.id));

    router.push({
      pathname: ROUTES.TEAM_FORMATION,
      params: {
        members: JSON.stringify(selectedMembers),
      },
    });
  };

  const renderItem = ({ item }: { item: Member }) => {
    const isOn = selected.includes(item.id);
    return (
      <TouchableOpacity
        onPress={() => toggle(item.id)}
        style={[style.row, isOn && style.rowOn]}
      >
        <View style={style.rowLeft}>
          <View style={[style.checkbox, isOn && style.checkboxOn]} />
          <View style={{ marginLeft: 12 }}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.meta}>
              {item.position}
              {item.jerseyNumber ? ` · #${item.jerseyNumber}` : ''}
            </Text>
          </View>
        </View>
        <Text style={style.pick}>{isOn ? '선택됨' : '선택'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[style.container, { paddingTop: insets.top }]}>
      <CustomHeader title="팀원 등록" />

      {/* 검색 */}
      <View style={style.searchWrap}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="이름 또는 등번호로 검색"
          placeholderTextColor="#98A2B3"
          style={style.search}
        />
      </View>

      {/* 포지션 필터 */}
      <View style={style.filterWrap}>
        {POSITIONS.map(p => {
          const on = pos === p;
          return (
            <TouchableOpacity
              key={p}
              style={[style.chip, on && style.chipOn]}
              onPress={() => setPos(p as any)}
            >
              <Text style={[style.chipText, on && style.chipTextOn]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 리스트 */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View style={style.empty}>
            <Text style={style.emptyText}>조건에 맞는 팀원이 없어요.</Text>
          </View>
        }
      />

      {/* 하단 고정 바 */}
      <View
        style={[
          style.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity onPress={onToggleAll} style={style.bottomLeft}>
          <View
            style={[style.checkbox, allSelectedOnThisPage && style.checkboxOn]}
          />
          <Text style={style.bottomText}>
            {allSelectedOnThisPage ? '전체 해제' : '전체 선택'} (현재 목록)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={submit}
          disabled={!canSubmit}
          style={[style.cta, !canSubmit && style.ctaDisabled]}
        >
          <Text style={style.ctaText}>등록하기 · {selectedCount}명</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
