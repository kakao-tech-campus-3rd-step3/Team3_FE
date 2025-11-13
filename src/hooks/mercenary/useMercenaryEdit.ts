import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  convertKoreanToPosition,
  convertPositionToKorean,
} from '@/src/constants/positions';
import {
  useUpdateMercenaryRecruitment,
  useMercenaryRecruitment,
} from '@/src/hooks/queries';
import { useDateTimePicker } from '@/src/hooks/useDateTimePicker';
import type { RecruitmentUpdateRequest } from '@/src/types';
import {
  formatDateForAPI,
  formatTimeForAPI,
  parseDateFromAPI,
  parseTimeFromAPI,
} from '@/src/utils/date';
import { handleApiError } from '@/src/utils/handle_api_error';

const SKILL_LEVEL_MAP: { [key: string]: string } = {
  PRO: '프로',
  SEMI_PRO: '세미프로',
  AMATEUR: '아마추어',
};

export function useMercenaryEdit(recruitmentId: number) {
  const { data: recruitment, isLoading } =
    useMercenaryRecruitment(recruitmentId);
  const { updateRecruitment, isUpdating } = useUpdateMercenaryRecruitment();

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
    useState<RecruitmentUpdateRequest>({
      matchDate: '',
      matchTime: '',
      message: '',
      position: '',
      skillLevel: '',
    });

  useEffect(() => {
    if (recruitment) {
      setMatchDate(parseDateFromAPI(recruitment.matchDate));
      setMatchTime(parseTimeFromAPI(recruitment.matchTime));
      setRecruitmentForm({
        matchDate: recruitment.matchDate,
        matchTime: recruitment.matchTime,
        message: recruitment.message,
        position: convertPositionToKorean(recruitment.position),
        skillLevel:
          SKILL_LEVEL_MAP[recruitment.skillLevel] || recruitment.skillLevel,
      });
    }
  }, [recruitment]);

  const handleUpdateRecruitment = () => {
    if (
      !recruitmentForm.message ||
      !recruitmentForm.position ||
      !recruitmentForm.skillLevel
    ) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    const formattedDate = formatDateForAPI(matchDate);
    const formattedTime = formatTimeForAPI(matchTime);
    const convertedPosition = convertKoreanToPosition(recruitmentForm.position);

    const recruitmentData: RecruitmentUpdateRequest = {
      ...recruitmentForm,
      matchDate: formattedDate,
      matchTime: formattedTime,
      position: convertedPosition,
      skillLevel: recruitmentForm.skillLevel,
    };

    updateRecruitment(
      {
        id: recruitmentId,
        data: recruitmentData,
      },
      {
        onSuccess: () => {
          Alert.alert('성공', '용병 모집 게시글이 수정되었습니다.', [
            {
              text: '확인',
              onPress: () => router.back(),
            },
          ]);
        },
        onError: handleApiError,
      }
    );
  };

  return {
    recruitment,
    isLoading,
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
    handleUpdateRecruitment,
    isUpdating,
  };
}
