import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/screens/team_creation/team_creation_style';
import { TeamType, TEAM_TYPES } from '@/src/types/team';

interface TeamSettingsProps {
  teamType: TeamType;
  memberCount: number;
  onTeamTypeChange: (type: TeamType) => void;
  onMemberCountChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TeamSettings({
  teamType,
  memberCount,
  onTeamTypeChange,
  onMemberCountChange,
  onNext,
  onBack,
}: TeamSettingsProps) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>팀 설정을 완료해주세요</Text>
        <Text style={styles.stepSubtitle}>
          팀의 유형과 현재 멤버 수를 설정해주세요
        </Text>
      </View>

      <View style={styles.stepContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>팀 유형 *</Text>
          <View style={styles.selectorContainer}>
            {TEAM_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.stepSelectorButton,
                  teamType === type && styles.stepSelectorButtonActive,
                ]}
                onPress={() => onTeamTypeChange(type)}
              >
                <Text
                  style={[
                    styles.stepSelectorButtonText,
                    teamType === type && styles.stepSelectorButtonTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>현재 멤버 수 *</Text>
          <View style={styles.memberCountStepContainer}>
            <TouchableOpacity
              style={styles.memberCountStepButton}
              onPress={() => {
                if (memberCount > 0) {
                  onMemberCountChange(memberCount - 1);
                }
              }}
            >
              <Ionicons name="remove" size={24} color="#666" />
            </TouchableOpacity>

            <View style={styles.memberCountStepDisplay}>
              <Text style={styles.memberCountStepNumber}>{memberCount}</Text>
              <Text style={styles.memberCountStepLabel}>명</Text>
            </View>

            <TouchableOpacity
              style={styles.memberCountStepButton}
              onPress={() => onMemberCountChange(memberCount + 1)}
            >
              <Ionicons name="add" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.stepFooter}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#666" />
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>다음</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
