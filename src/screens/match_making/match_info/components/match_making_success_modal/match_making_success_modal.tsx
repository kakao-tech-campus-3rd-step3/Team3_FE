import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/src/theme';
import { formatKoreanDate } from '@/src/utils/date';

interface MatchMakingSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  stadiumName?: string;
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  skillMin: string;
  skillMax: string;
}

export default function MatchMakingSuccessModal({
  visible,
  onClose,
  stadiumName,
  date,
  timeStart,
  timeEnd,
  skillMin,
  skillMax,
}: MatchMakingSuccessModalProps) {
  const router = useRouter();

  const handleGoHome = () => {
    onClose();
    router.replace('/');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        activeOpacity={1}
        onPress={handleGoHome}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 24,
            alignItems: 'center',
            width: '90%',
            maxWidth: 400,
          }}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.blue[600],
              marginBottom: 8,
            }}
          >
            매치 등록 완료!
          </Text>

          <Text
            style={{
              textAlign: 'center',
              color: colors.gray[700],
              marginBottom: 20,
              lineHeight: 22,
            }}
          >
            매치가 성공적으로 등록되었습니다.{'\n'}상대방을 기다려주세요.
          </Text>

          <View style={{ marginBottom: 24, alignItems: 'center' }}>
            {stadiumName && (
              <Text style={{ color: colors.gray[800], marginBottom: 4 }}>
                📍 {stadiumName}
              </Text>
            )}
            <Text style={{ color: colors.gray[800], marginBottom: 4 }}>
              🗓 {formatKoreanDate(date)}
            </Text>
            <Text style={{ color: colors.gray[800], marginBottom: 4 }}>
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
            <Text style={{ color: colors.gray[800] }}>
              💪 {skillMin} ~ {skillMax}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleGoHome}
            style={{
              backgroundColor: colors.blue[500],
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              홈으로 돌아가기
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
