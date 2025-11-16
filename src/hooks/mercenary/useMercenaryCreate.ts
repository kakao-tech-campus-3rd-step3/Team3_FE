import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { convertKoreanToPosition } from '@/src/constants/positions';
import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import { useCreateMercenaryRecruitment } from '@/src/hooks/queries';
import { useDateTimePicker } from '@/src/hooks/useDateTimePicker';
import type { RecruitmentCreateRequest } from '@/src/types';
import { formatDateForAPI, formatTimeForAPI } from '@/src/utils/date';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useMercenaryCreate() {
  const { userProfile } = useUserProfileContext();
  const { createRecruitment, isCreating } = useCreateMercenaryRecruitment();

  const {
    matchDate,
    setMatchDate,
    matchTime,
    setMatchTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
  } = useDateTimePicker();

  const [recruitmentForm, setRecruitmentForm] =
    useState<RecruitmentCreateRequest>({
      teamId: userProfile?.teamId || 0,
      matchDate: '',
      matchTime: '',
      message: '',
      position: '',
      skillLevel: '',
    });

  const handleCreateRecruitment = () => {
    if (
      !recruitmentForm.message ||
      !recruitmentForm.position ||
      !recruitmentForm.skillLevel
    ) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (!userProfile?.teamId) {
      Alert.alert('팀 오류', '팀에 속해있지 않습니다.');
      return;
    }

    const formattedDate = formatDateForAPI(matchDate);
    const formattedTime = formatTimeForAPI(matchTime);
    const convertedPosition = convertKoreanToPosition(recruitmentForm.position);

    const recruitmentData: RecruitmentCreateRequest = {
      ...recruitmentForm,
      teamId: userProfile.teamId!,
      matchDate: formattedDate,
      matchTime: formattedTime,
      position: convertedPosition,
      skillLevel: recruitmentForm.skillLevel,
    };

    createRecruitment(recruitmentData, {
      onSuccess: () => {
        Alert.alert('성공', '용병 모집 게시글이 생성되었습니다.', [
          {
            text: '확인',
            onPress: () => router.back(),
          },
        ]);
      },
      onError: handleApiError,
    });
  };

  return {
    matchDate,
    setMatchDate,
    matchTime,
    setMatchTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    recruitmentForm,
    setRecruitmentForm,
    handleCreateRecruitment,
    isCreating,
  };
}
