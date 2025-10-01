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

import { CustomHeader } from '@/src/components/ui/custom_header';
import { useUserProfile } from '@/src/hooks/queries';
import { useCreateMatch } from '@/src/hooks/useCreateMatch';
import { useVenues } from '@/src/hooks/useVenues';
import Message from '@/src/screens/match_making/match_info/component/message/message';
import SkillLevelSelector from '@/src/screens/match_making/match_info/component/skill_level_selector/skill_level_selector';
import { MatchCreateRequestDto } from '@/src/types/match';
import type { Venue } from '@/src/types/venue';

import { style } from './match_info_style';

type SkillLevel = 'AMATEUR' | 'SEMI_PRO' | 'PRO';

export default function MatchInfoScreen() {
  const router = useRouter();
  const { data: userProfile, refetch } = useUserProfile();
  const { mutate: createMatch, isPending } = useCreateMatch();
  const { data: venues, isLoading, error } = useVenues();

  const [stadiumQuery, setStadiumQuery] = useState('');
  const [stadiumModalVisible, setStadiumModalVisible] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState<Venue | null>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [timeStart, setTimeStart] = useState<Date>(new Date());
  const [timeEnd, setTimeEnd] = useState<Date>(new Date());
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  const [skillMin, setSkillMin] = useState<SkillLevel>('AMATEUR');
  const [skillMax, setSkillMax] = useState<SkillLevel>('PRO');

  const [universityOnly, setUniversityOnly] = useState(false);
  const [message, setMessage] = useState('');

  const filteredStadiums = (venues ?? []).filter(s =>
    s.venueName.toLowerCase().includes(stadiumQuery.toLowerCase())
  );

  const onSelectStadium = (venue: Venue) => {
    setSelectedStadium(venue);
    setStadiumModalVisible(false);
  };

  const pad2 = (n: number) => String(n).padStart(2, '0');
  const fmtDate = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const fmtTime = (d: Date) =>
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

  const onSubmit = async () => {
    if (!selectedStadium) {
      Alert.alert('안내', '경기장을 선택해주세요.');
      return;
    }

    // userProfile을 먼저 새로고침
    await refetch();

    const rawTeamId = userProfile?.teamId;

    if (!rawTeamId) {
      Alert.alert('안내', '팀 정보가 없습니다. 팀을 먼저 생성해주세요.');
      return;
    }

    // teamId를 number로 변환
    const numericTeamId = Number(rawTeamId);

    if (isNaN(numericTeamId) || numericTeamId <= 0) {
      Alert.alert('안내', '유효하지 않은 팀 ID입니다. 다시 시도해주세요.');
      return;
    }

    const payload: MatchCreateRequestDto = {
      teamId: numericTeamId,
      preferredDate: fmtDate(date),
      preferredTimeStart: fmtTime(timeStart),
      preferredTimeEnd: fmtTime(timeEnd),
      preferredVenueId: selectedStadium.venueId || 1, // 기본값 설정
      skillLevelMin: skillMin,
      skillLevelMax: skillMax,
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
            {selectedStadium
              ? selectedStadium.venueName
              : '경기장을 선택하세요'}
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

      {/* 실력 수준 */}
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

      {/* 추가 설명 */}
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
            {isLoading ? (
              <Text>불러오는 중...</Text>
            ) : error ? (
              <Text>에러 발생: {error.message}</Text>
            ) : (
              <FlatList
                data={filteredStadiums}
                keyExtractor={item => String(item.venueId)} // ✅ venueId 사용
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={style.stadiumItem}
                    onPress={() => onSelectStadium(item)}
                  >
                    <Text>{item.venueName}</Text>
                    <Text style={{ color: '#555', fontSize: 12 }}>
                      {item.address}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              onPress={() => setStadiumModalVisible(false)}
              style={style.closeButton}
            >
              <Text style={{ color: 'white' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date/Time Pickers */}
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
