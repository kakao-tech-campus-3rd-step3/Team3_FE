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

  const filteredStadiums = MOCK_STADIUMS.filter(s =>
    s.name.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setStadiumModalVisible(false);
  };

  const onSubmit = () => {
    // TODO: API 연동 시 이 값들을 body에 넣어 전송
    console.log('매치 등록:', {
      preferredDate: date.toISOString().split('T')[0], // YYYY-MM-DD
      preferredTimeStart: timeStart.toTimeString().slice(0, 8), // HH:mm:ss
      preferredTimeEnd: timeEnd.toTimeString().slice(0, 8),
      preferredVenueId: selectedStadium?.id,
    });

    router.push({
      pathname: '/match_making/match_making_success',
      params: {
        stadium: JSON.stringify(selectedStadium),
        date: date.toISOString(),
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString(),
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

      {/* 하단 바 */}
      <View style={style.bottomBar}>
        <TouchableOpacity style={style.nextButton} onPress={onSubmit}>
          <Text style={style.nextButtonText}>매치 등록하기</Text>
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
