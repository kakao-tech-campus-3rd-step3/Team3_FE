import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../team_creation_style';

interface TeamFormData {
  name: string;
  university: string;
  teamType: string;
  memberCount: number;
  skillLevel: string;
  description: string;
}

interface Step4Props {
  formData: TeamFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step4Confirmation({
  formData,
  onSubmit,
  onBack,
}: Step4Props) {
  const handleSubmit = () => {
    Alert.alert('팀 생성 확인', '입력하신 정보로 팀을 생성하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '생성하기',
        onPress: onSubmit,
      },
    ]);
  };

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>팀 정보를 확인해주세요</Text>
        <Text style={styles.stepSubtitle}>
          입력하신 정보가 올바른지 최종 확인해주세요
        </Text>
      </View>

      <View style={styles.stepContent}>
        <View style={styles.confirmationContainer}>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>팀 이름</Text>
            <Text style={styles.confirmationValue}>{formData.name}</Text>
          </View>

          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>대학교</Text>
            <Text style={styles.confirmationValue}>{formData.university}</Text>
          </View>

          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>팀 유형</Text>
            <Text style={styles.confirmationValue}>{formData.teamType}</Text>
          </View>

          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>멤버 수</Text>
            <Text style={styles.confirmationValue}>
              {formData.memberCount}명
            </Text>
          </View>

          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>팀 실력</Text>
            <Text style={styles.confirmationValue}>{formData.skillLevel}</Text>
          </View>

          {formData.description && (
            <View style={styles.confirmationItem}>
              <Text style={styles.confirmationLabel}>팀 설명</Text>
              <Text style={styles.confirmationValue}>
                {formData.description}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.stepFooter}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#666" />
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.createButtonText}>팀 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
