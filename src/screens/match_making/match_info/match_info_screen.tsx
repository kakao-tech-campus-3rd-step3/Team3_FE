import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  Alert,
} from 'react-native';

import { MatchCreateRequestDto } from '@/src/api/match';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { useHome } from '@/src/hooks/queries';
import { useCreateMatch } from '@/src/hooks/useCreateMatch';
import Message from '@/src/screens/match_making/match_info/component/message/message';
import SkillLevelSelector from '@/src/screens/match_making/match_info/component/skill_level_selector/skill_level_selector';

import { style } from './match_info_style';

type Stadium = {
  id: string;
  name: string;
};

// ⚠️ 임시 Mock 데이터 (서버 API 완성 시 교체 예정)
const MOCK_STADIUMS: Stadium[] = [
  { id: '1', name: '서울월드컵경기장' },
  { id: '2', name: '잠실종합운동장' },
  { id: '3', name: '인천축구전용경기장' },
  { id: '4', name: '수원월드컵경기장' },
  { id: '5', name: '대전월드컵경기장' },
];

type SkillLevel = 'AMATEUR' | 'SEMI_PRO' | 'PRO';

export default function MatchInfoScreen() {
  const router = useRouter();
  const { data: home } = useHome();
  const { mutate: createMatch, isPending } = useCreateMatch();

  const [stadiumQuery, setStadiumQuery] = useState('');
  const [stadiumModalVisible, setStadiumModalVisible] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

  // 날짜
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 시작/종료 시간
  const [timeStart, setTimeStart] = useState<Date>(new Date());
  const [timeEnd, setTimeEnd] = useState<Date>(new Date());
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  // 실력 수준
  const [skillMin, setSkillMin] = useState<SkillLevel>('AMATEUR');
  const [skillMax, setSkillMax] = useState<SkillLevel>('PRO');

  // 같은 대학 여부
  const [universityOnly, setUniversityOnly] = useState(false);

  // 추가 설명
  const [message, setMessage] = useState('');

  const filteredStadiums = MOCK_STADIUMS.filter(s =>
    s.name.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setStadiumModalVisible(false);
  };

  // 날짜/시간 포맷 함수
  const pad2 = (n: number) => String(n).padStart(2, '0');
  const fmtDate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const fmtTime = (d: Date) =>
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

  const onSubmit = () => {
    if (!selectedStadium) {
      Alert.alert('안내', '경기장을 선택해주세요.');
      return;
    }

    const teamId = 1;
    // if (!home?.user?.teamId) {
    //   Alert.alert('안내', '팀 정보가 없습니다. 다시 시도해주세요.');
    //   return;
    // }

    const payload: MatchCreateRequestDto = {
      teamId,
      preferredDate: fmtDate(date),
      preferredTimeStart: fmtTime(timeStart),
      preferredTimeEnd: fmtTime(timeEnd),
      preferredVenueId: Number(selectedStadium.id),
      skillLevelMin: skillMin ?? 'AMATEUR',
      skillLevelMax: skillMax ?? 'PRO',
      universityOnly,
      message,
    };

    createMatch(payload, {
      onSuccess: data => {
        router.push({
          pathname: '/match_making/match_making_success',
          params: {
            waitingId: String(data.waitingId),
            teamId: String(data.teamId),
            status: data.status,
            expiresAt: data.expiresAt,

            // ✅ 화면 표시용 정보도 같이 넘김
            stadium: JSON.stringify(selectedStadium),
            date: date.toISOString(),
            timeStart: timeStart.toISOString(),
            timeEnd: timeEnd.toISOString(),
            skillLevelMin: skillMin,
            skillLevelMax: skillMax,
            universityOnly: String(universityOnly),
            message,
          },
        });
      },
      onError: err => {
        Alert.alert('매치 생성 실패', err.message ?? '다시 시도해주세요.');
      },
    });
  };

  return (
    <View style={style.container}>
      <CustomHeader title="경기 정보 입력" />

      {/* 장소 선택 */}
      <View style={style.section}>
        <Text style={style.label}>경기 장소</Text>
        <TouchableOpacity
          style={style.input}
          onPress={() => setStadiumModalVisible(true)}
        >
          <Text>
            {selectedStadium ? selectedStadium.name : '경기장을 선택하세요'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 일정 선택 */}
      <View style={style.section}>
        <Text style={style.label}>경기 일정</Text>

        {/* 날짜 선택 */}
        <TouchableOpacity
          style={style.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {/* 시작 시간 */}
        <TouchableOpacity
          style={style.input}
          onPress={() => setShowTimeStartPicker(true)}
        >
          <Text>
            시작:{' '}
            {timeStart.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {/* 종료 시간 */}
        <TouchableOpacity
          style={style.input}
          onPress={() => setShowTimeEndPicker(true)}
        >
          <Text>
            종료:{' '}
            {timeEnd.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 실력 수준 선택 */}
      <SkillLevelSelector
        onChange={(min, max) => {
          setSkillMin(min);
          setSkillMax(max);
        }}
      />

      {/* 같은 대학 여부 */}
      <View style={style.section}>
        <TouchableOpacity
          style={style.checkboxRow}
          onPress={() => setUniversityOnly(prev => !prev)}
        >
          <View style={[style.checkbox, universityOnly && style.checkboxOn]} />
          <Text style={style.checkboxLabel}>같은 대학 상대만 구합니다</Text>
        </TouchableOpacity>
      </View>

      {/* 추가 설명 입력 */}
      <Message value={message} onChange={setMessage} />

      {/* 하단 바 */}
      <View style={style.bottomBar}>
        <TouchableOpacity
          style={[style.nextButton, isPending && { opacity: 0.6 }]}
          onPress={onSubmit}
          disabled={isPending}
        >
          <Text style={style.nextButtonText}>
            {isPending ? '등록 중...' : '매치 등록하기'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 경기장 선택 모달 */}
      <Modal visible={stadiumModalVisible} transparent animationType="slide">
        <View style={style.modalWrap}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>경기장 선택</Text>
            <TextInput
              style={style.searchInput}
              placeholder="경기장 검색"
              value={stadiumQuery}
              onChangeText={setStadiumQuery}
            />
            <FlatList
              data={filteredStadiums}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={style.stadiumItem}
                  onPress={() => onSelectStadium(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setStadiumModalVisible(false)}
              style={style.closeButton}
            >
              <Text style={{ color: 'white' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* 시작 시간 Picker */}
      {showTimeStartPicker && (
        <DateTimePicker
          value={timeStart}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowTimeStartPicker(false);
            if (selectedDate) setTimeStart(selectedDate);
          }}
        />
      )}

      {/* 종료 시간 Picker */}
      {showTimeEndPicker && (
        <DateTimePicker
          value={timeEnd}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowTimeEndPicker(false);
            if (selectedDate) setTimeEnd(selectedDate);
          }}
        />
      )}
    </View>
  );
}
