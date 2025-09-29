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
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import SkillLevelRangeSelector from '@/src/screens/match_making/match_info/component/skill_level_selector';

import { style } from './match_info_style';

type Stadium = {
  id: string;
  name: string;
};

// ⚠️ 임시 Mock 데이터
const MOCK_STADIUMS: Stadium[] = [
  { id: '1', name: '서울월드컵경기장' },
  { id: '2', name: '잠실종합운동장' },
  { id: '3', name: '인천축구전용경기장' },
  { id: '4', name: '수원월드컵경기장' },
  { id: '5', name: '대전월드컵경기장' },
];

export default function MatchInfoScreen() {
  const router = useRouter();

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
  const [skillMin, setSkillMin] = useState('AMATEUR');
  const [skillMax, setSkillMax] = useState('PRO');

  const filteredStadiums = MOCK_STADIUMS.filter(s =>
    s.name.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setStadiumModalVisible(false);
  };

  const onSubmit = () => {
    console.log('매치 등록:', {
      preferredDate: date.toISOString().split('T')[0],
      preferredTimeStart: timeStart.toTimeString().slice(0, 8),
      preferredTimeEnd: timeEnd.toTimeString().slice(0, 8),
      preferredVenueId: selectedStadium?.id,
      skillLevelMin: skillMin,
      skillLevelMax: skillMax,
    });

    router.push({
      pathname: '/match_making/match_making_success',
      params: {
        stadium: JSON.stringify(selectedStadium),
        date: date.toISOString(),
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
        skillLevelMin: skillMin,
        skillLevelMax: skillMax,
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

      {/* ✅ 실력 수준 선택 */}
      <SkillLevelRangeSelector
        onChange={(min, max) => {
          setSkillMin(min);
          setSkillMax(max);
        }}
      />

      {/* 하단 바 */}
      <View style={style.bottomBar}>
        <TouchableOpacity style={style.nextButton} onPress={onSubmit}>
          <Text style={style.nextButtonText}>매치 등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* 경기장 선택 모달, DateTimePickers → 그대로 */}
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
