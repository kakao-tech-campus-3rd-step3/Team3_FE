import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import StatusBadge from '@/src/components/ui/status_badge';
import { theme } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';

import { styles } from './application_card_styles';

interface ApplicationCardProps {
  item: UserJoinWaitingItem;
  onCancel: (item: UserJoinWaitingItem) => void;
}

export default function ApplicationCard({
  item,
  onCancel,
}: ApplicationCardProps) {
  return (
    <TouchableOpacity
      style={styles.recruitmentCard}
      activeOpacity={0.8}
      onPress={() => {}}
    >
      <View style={styles.cardContent}>
        <View style={styles.recruitmentHeader}>
          <View style={styles.positionSection}>
            <Text style={styles.positionLabel}>신청한 팀</Text>
            <Text style={styles.recruitmentTitle}>{item.teamName}</Text>
          </View>
          <View style={styles.recruitmentHeaderBadges}>
            <StatusBadge status={item.status} />
          </View>
        </View>

        <View style={styles.recruitmentInfo}>
          <View style={styles.teamInfoSection}>
            <View style={styles.teamInfoRow}>
              <Ionicons
                name="person-outline"
                size={14}
                color={theme.colors.text.sub}
              />
              <Text style={styles.infoText}>신청자: {item.applicantName}</Text>
            </View>
            {item.decidedAt && (
              <View style={styles.teamInfoRow}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={14}
                  color={theme.colors.text.sub}
                />
                <Text style={styles.infoText}>
                  처리일: {new Date(item.decidedAt).toLocaleDateString('ko-KR')}
                </Text>
              </View>
            )}
            {item.decisionReason && (
              <View style={styles.teamInfoRow}>
                <Ionicons
                  name="document-text-outline"
                  size={14}
                  color={theme.colors.text.sub}
                />
                <Text style={styles.infoText}>사유: {item.decisionReason}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.recruitmentFooter}>
          <View />
          <View style={styles.actionButtons}>
            {item.status === 'PENDING' && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={e => {
                  e.stopPropagation();
                  onCancel(item);
                }}
              >
                <Ionicons name="close-circle-outline" size={16} color="white" />
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
