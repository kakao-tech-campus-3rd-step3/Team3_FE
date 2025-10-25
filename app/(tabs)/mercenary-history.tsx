import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { useMyJoinWaitingList } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { UserJoinWaitingItem } from '@/src/types/team';

export default function MercenaryHistoryScreen() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;

  const { data: joinWaitingData, isLoading } = useMyJoinWaitingList(
    currentPage,
    pageSize,
    'audit.createdAt,desc'
  );

  const applications = joinWaitingData?.content || [];

  const renderApplicationCard = ({ item }: { item: UserJoinWaitingItem }) => (
    <Card style={styles.applicationCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.teamName}>{item.teamName}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'PENDING'
                    ? theme.colors.warning + '20'
                    : item.status === 'APPROVED'
                      ? theme.colors.success + '20'
                      : theme.colors.error + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    item.status === 'PENDING'
                      ? theme.colors.warning
                      : item.status === 'APPROVED'
                        ? theme.colors.success
                        : theme.colors.error,
                },
              ]}
            >
              {item.status === 'PENDING'
                ? '대기중'
                : item.status === 'APPROVED'
                  ? '승인됨'
                  : item.status === 'REJECTED'
                    ? '거절됨'
                    : '취소됨'}
            </Text>
          </View>
        </View>

        <View style={styles.applicationInfo}>
          {item.decidedAt && (
            <View style={styles.infoRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={theme.colors.text.sub}
              />
              <Text style={styles.infoText}>
                처리일: {new Date(item.decidedAt).toLocaleDateString('ko-KR')}
              </Text>
            </View>
          )}
          {item.decisionReason && (
            <View style={styles.infoRow}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={theme.colors.text.sub}
              />
              <Text style={styles.infoText}>사유: {item.decisionReason}</Text>
            </View>
          )}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.applicationId}>신청 ID: {item.id}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text.sub}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <CustomHeader title="용병 기록" showBackButton={false} />

      <View style={styles.content}>
        <FlatList
          data={applications}
          renderItem={renderApplicationCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (joinWaitingData && !joinWaitingData.last) {
              setCurrentPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          onRefresh={() => {
            setCurrentPage(0);
          }}
          refreshing={isLoading}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={64}
                color={theme.colors.text.sub + '60'}
              />
              <Text style={styles.emptyText}>신청한 용병 기록이 없습니다.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing6,
  },
  listContainer: {
    paddingVertical: theme.spacing.spacing4,
  },
  applicationCard: {
    marginBottom: theme.spacing.spacing4,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  applicationInfo: {
    marginBottom: theme.spacing.spacing3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
    gap: theme.spacing.spacing2,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  applicationId: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.sub,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing2,
  },
});
