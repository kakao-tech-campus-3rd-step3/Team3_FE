import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ModalDatePicker } from '@/src/components/ui/modal_date_picker';
import { ModalTimePicker } from '@/src/components/ui/modal_time_picker';
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
  const [successModalVisible, setSuccessModalVisible] = useState(false);

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
        setSuccessModalVisible(true);
      },
      onError: err => {
        Alert.alert('매치 생성 실패', err.message ?? '다시 시도해주세요.');
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomHeader title="경기 정보 입력" />

      <ScrollView
        style={style.scrollContainer}
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 장소 선택 카드 */}
        <View style={style.card}>
          <View style={style.cardHeader}>
            <Text style={style.cardTitle}>📍 경기 장소</Text>
          </View>
          <TouchableOpacity
            style={style.selectButton}
            onPress={() => setStadiumModalVisible(true)}
          >
            <Text style={style.selectButtonText}>
              {selectedStadium
                ? selectedStadium.venueName
                : '경기장을 선택하세요'}
            </Text>
            <Text style={style.selectButtonIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 일정 선택 카드 */}
        <View style={style.card}>
          <View style={style.cardHeader}>
            <Text style={style.cardTitle}>📅 경기 일정</Text>
          </View>

          <View style={style.dateTimeContainer}>
            <TouchableOpacity
              style={style.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={style.dateTimeLabel}>날짜</Text>
              <Text style={style.dateTimeValue}>
                {date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </Text>
            </TouchableOpacity>

            <View style={style.timeRow}>
              <TouchableOpacity
                style={[style.timeButton, style.timeButtonLeft]}
                onPress={() => setShowTimeStartPicker(true)}
              >
                <Text style={style.timeLabel}>시작</Text>
                <Text style={style.timeValue}>
                  {timeStart.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.timeButton, style.timeButtonRight]}
                onPress={() => setShowTimeEndPicker(true)}
              >
                <Text style={style.timeLabel}>종료</Text>
                <Text style={style.timeValue}>
                  {timeEnd.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 실력 수준 카드 */}
        <View style={style.card}>
          <SkillLevelSelector
            onChange={(min, max) => {
              setSkillMin(min);
              setSkillMax(max);
            }}
          />
        </View>

        {/* 옵션 카드 */}
        <View style={style.card}>
          <View style={style.cardHeader}>
            <Text style={style.cardTitle}>⚙️ 매치 옵션</Text>
          </View>

          <TouchableOpacity
            style={style.optionRow}
            onPress={() => setUniversityOnly(prev => !prev)}
          >
            <View style={style.optionContent}>
              <Text style={style.optionTitle}>같은 대학 상대만 구하기</Text>
              <Text style={style.optionDescription}>
                같은 대학교 학생들과만 매치를 진행합니다
              </Text>
            </View>
            <View style={[style.toggle, universityOnly && style.toggleActive]}>
              <View
                style={
                  universityOnly ? style.toggleThumb : style.toggleThumbInactive
                }
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* 메시지 카드 */}
        <View style={style.card}>
          <Message value={message} onChange={setMessage} />
        </View>

        {/* 하단 여백 */}
        <View style={style.bottomSpacing} />
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={style.fixedBottomBar}>
        <TouchableOpacity
          style={[style.submitButton, isPending && style.submitButtonDisabled]}
          onPress={onSubmit}
          disabled={isPending}
        >
          <Text style={style.submitButtonText}>
            {isPending ? '등록 중...' : '매치 등록하기'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 경기장 선택 모달 */}
      <Modal visible={stadiumModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={style.modalWrap}
          activeOpacity={1}
          onPress={() => setStadiumModalVisible(false)}
        >
          <TouchableOpacity
            style={style.modalContent}
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
          >
            <Text style={style.modalTitle}>경기장 선택</Text>
            <TextInput
              style={style.searchInput}
              placeholder="경기장 검색"
              placeholderTextColor="#9CA3AF"
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Date/Time Pickers */}
      <ModalDatePicker
        visible={showDatePicker}
        value={date}
        onDateChange={setDate}
        onClose={() => setShowDatePicker(false)}
        title="경기 날짜 선택"
      />

      <ModalTimePicker
        visible={showTimeStartPicker}
        value={timeStart}
        onTimeChange={setTimeStart}
        onClose={() => setShowTimeStartPicker(false)}
        title="시작 시간 선택"
      />

      <ModalTimePicker
        visible={showTimeEndPicker}
        value={timeEnd}
        onTimeChange={setTimeEnd}
        onClose={() => setShowTimeEndPicker(false)}
        title="종료 시간 선택"
      />

      {/* 매치 등록 성공 모달 */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={style.successModalOverlay}
          activeOpacity={1}
          onPress={() => {
            setSuccessModalVisible(false);
            router.replace('/');
          }}
        >
          <TouchableOpacity
            style={style.successModalContent}
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
          >
            <Text style={style.successTitle}>매치 등록 완료!</Text>
            <Text style={style.successMessage}>
              매치가 성공적으로 등록되었습니다.{'\n'}
              상대방을 기다려주세요.
            </Text>

            <View style={style.successInfoContainer}>
              {selectedStadium && (
                <Text style={style.successInfoText}>
                  📍 {selectedStadium.venueName}
                </Text>
              )}

              <Text style={style.successInfoText}>
                🗓{' '}
                {date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </Text>

              <Text style={style.successInfoText}>
                ⏰{' '}
                {timeStart.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}{' '}
                ~{' '}
                {timeEnd.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </Text>

              <Text style={style.successInfoText}>
                💪 {skillMin} ~ {skillMax}
              </Text>
            </View>

            <TouchableOpacity
              style={style.successButton}
              onPress={() => {
                setSuccessModalVisible(false);
                router.replace('/');
              }}
            >
              <Text style={style.successButtonText}>홈으로 돌아가기</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}
