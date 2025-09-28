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

//  임시 Mock 데이터
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

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const filteredStadiums = MOCK_STADIUMS.filter(s =>
    s.name.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (stadium: Stadium) => {
    setSelectedStadium(stadium);
    setStadiumModalVisible(false);
  };

  const onSubmit = () => {
    router.push({
      pathname: '/match_making/match_making_success',
      params: {
        stadium: JSON.stringify(selectedStadium),
        date: date.toISOString(),
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

        <TouchableOpacity
          style={style.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>
            {date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/*  하단 바 */}
      <View style={style.bottomBar}>
        <TouchableOpacity style={style.nextButton} onPress={onSubmit}>
          <Text style={style.nextButtonText}>매치 등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* 경기장 선택 모달 */}
      {stadiumModalVisible && (
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
      )}

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

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}
