import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from '@/src/theme';
import type { MatchWaitingHistoryResponseDto } from '@/src/types/match';

interface AppliedMatchCardProps {
  match: MatchWaitingHistoryResponseDto;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
}

export default function AppliedMatchCard({
  match,
  onSelect,
  isSelected = false,
}: AppliedMatchCardProps) {
  const getName = (nameField: string | { name: string }) => {
    if (!nameField) return '알 수 없음';
    if (typeof nameField === 'object') return nameField.name;
    return nameField;
  };

  const requestTeam = getName(match.requestTeamName);
  const targetTeam = getName(match.targetTeamName);
  const date = match.requestAt?.split('T')[0] || '';
  const time = match.requestAt?.split('T')[1]?.slice(0, 5) || '';
  const status = match.status || 'PENDING';

  const getStatusColor = () => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return theme.colors.green[600];
      case 'REJECTED':
        return theme.colors.red[600];
      case 'CANCELED':
        return theme.colors.gray[600];
      default:
        return theme.colors.yellow[600];
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect?.(match.requestId)}
      style={[
        styles.card,
        isSelected && { borderColor: theme.colors.blue[500], borderWidth: 2 },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.teamTitle}>{`${requestTeam} → ${targetTeam}`}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              borderColor: getStatusColor(),
              backgroundColor: getStatusColor() + '20',
            },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status === 'PENDING'
              ? '대기 중'
              : status === 'APPROVED'
                ? '수락됨'
                : status === 'REJECTED'
                  ? '거절됨'
                  : '취소됨'}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.label}>요청 일자</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>요청 시간</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={styles.label}>요청 메시지</Text>
          <Text style={styles.message}>{match.requestMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.gray[900],
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    fontSize: 13,
    color: theme.colors.gray[600],
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.gray[800],
  },
  message: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.gray[700],
    lineHeight: 18,
  },
});
