import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import InfoRow from '@/src/components/ui/info_row';
import StatusBadge from '@/src/components/ui/status_badge';
import { theme } from '@/src/theme';
import type { MatchWaitingHistoryResponseDto } from '@/src/types/match';
import { toBasicStatus } from '@/src/utils/status_labels';

interface AppliedMatchCardProps {
  match: MatchWaitingHistoryResponseDto;
  onSelect?: (id: number) => void;
  isSelected?: boolean;
  onCancel?: (id: number) => void;
  isCanceling?: boolean;
}

export default function AppliedMatchCard({
  match,
  onSelect,
  isSelected = false,
  onCancel,
  isCanceling = false,
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
  const status = toBasicStatus(match.status || 'PENDING');

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
        <StatusBadge status={status} />
      </View>

      <View style={styles.body}>
        <InfoRow
          label="요청 일자"
          value={date}
          labelStyle={styles.label}
          valueStyle={styles.value}
        />
        <InfoRow
          label="요청 시간"
          value={time}
          labelStyle={styles.label}
          valueStyle={styles.value}
        />
        <InfoRow
          label="요청 메시지"
          value={match.requestMessage}
          containerStyle={{ marginTop: 6 }}
          labelStyle={styles.label}
          valueStyle={styles.message}
        />
      </View>

      {status === 'PENDING' && onCancel && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onCancel(match.requestId)}
            disabled={isCanceling}
          >
            <Text style={styles.cancelButtonText}>
              {isCanceling ? '취소 중...' : '매치 요청 취소하기'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  cancelButton: {
    backgroundColor: theme.colors.red[600],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
