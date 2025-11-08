import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecruitmentCard } from '@/src/components/mercenary/recruitment_card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import StatusBadge from '@/src/components/ui/status_badge';
import { TabGroup, TabList, Tab } from '@/src/components/ui/tab_selector';
import { ROUTES } from '@/src/constants/routes';
import {
  useMyJoinWaitingList,
  useMyMercenaryRecruitments,
  useDeleteMercenaryRecruitment,
  useTeamJoinRequestMutation,
} from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { RecruitmentResponse } from '@/src/types/mercenary';
import {
  UserJoinWaitingItem,
  JoinWaitingCancelRequest,
} from '@/src/types/team';
import { translateErrorMessage } from '@/src/utils/error_messages';

export default function MercenaryHistoryScreen() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [recruitmentsPage, setRecruitmentsPage] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeTab: 'applications' | 'myRecruitments' =
    selectedIndex === 0 ? 'applications' : 'myRecruitments';
  const pageSize = 10;

  const { data: joinWaitingData, isLoading } = useMyJoinWaitingList(
    currentPage,
    pageSize,
    'audit.createdAt,desc',
    true
  );

  const { data: recruitmentsData, isLoading: isRecruitmentsLoading } =
    useMyMercenaryRecruitments(recruitmentsPage, pageSize, 'matchDate,asc');

  const { deleteRecruitment } = useDeleteMercenaryRecruitment();
  const { cancelJoinRequest, isCanceling } = useTeamJoinRequestMutation();

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<UserJoinWaitingItem | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  const applicationsData = joinWaitingData?.content || [];
  const myRecruitmentsData = recruitmentsData?.content || [];

  const handleEdit = (recruitmentId: number) => {
    router.push(`${ROUTES.MERCENARY_EDIT}?id=${recruitmentId}`);
  };

  const handleDelete = (recruitmentId: number) => {
    Alert.alert(
      '게시글 삭제',
      '정말로 이 용병 모집 게시글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteRecruitment(recruitmentId, {
              onSuccess: () => {
                Alert.alert('성공', '용병 모집 게시글이 삭제되었습니다.');
              },
              onError: error => {
                console.error('용병 모집 게시글 삭제 실패:', error);
                Alert.alert('오류', '게시글 삭제에 실패했습니다.');
              },
            });
          },
        },
      ]
    );
  };

  const handleCancel = (item: UserJoinWaitingItem) => {
    setSelectedApplication(item);
    setCancelReason('');
    setCancelModalVisible(true);
  };

  const confirmCancel = () => {
    if (!selectedApplication) return;

    const cancelData: JoinWaitingCancelRequest = {
      decisionReason: cancelReason.trim() || undefined,
    };

    cancelJoinRequest(
      {
        teamId: selectedApplication.teamId,
        joinWaitingId: selectedApplication.id,
        data: cancelData,
      },
      {
        onSuccess: () => {
          setCancelModalVisible(false);
          setSelectedApplication(null);
          setCancelReason('');
          Alert.alert('취소 완료', '용병 신청이 취소되었습니다.');
        },
        onError: error => {
          let errorMessage = '용병 신청 취소에 실패했습니다.';
          if (error && typeof error === 'object' && 'message' in error) {
            const message = (error as any).message;
            if (message && typeof message === 'string') {
              errorMessage = translateErrorMessage(message);
            }
          }
          Alert.alert('오류', errorMessage);
        },
      }
    );
  };

  const renderRecruitmentCard = ({ item }: { item: RecruitmentResponse }) => (
    <RecruitmentCard
      recruitment={item}
      onPress={() => {}}
      onEdit={() => handleEdit(item.recruitmentId)}
      onDelete={() => handleDelete(item.recruitmentId)}
      showApplyButton={false}
      showEditButton={true}
      showDeleteButton={true}
    />
  );

  const renderApplicationCard = ({ item }: { item: UserJoinWaitingItem }) => {
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
                <Text style={styles.infoText}>
                  신청자: {item.applicantName}
                </Text>
              </View>
              {item.decidedAt && (
                <View style={styles.teamInfoRow}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={14}
                    color={theme.colors.text.sub}
                  />
                  <Text style={styles.infoText}>
                    처리일:{' '}
                    {new Date(item.decidedAt).toLocaleDateString('ko-KR')}
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
                  <Text style={styles.infoText}>
                    사유: {item.decisionReason}
                  </Text>
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
                    handleCancel(item);
                  }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={16}
                    color="white"
                  />
                  <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <CustomHeader title="용병 기록" showBackButton={false} />

      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList>
          <Tab index={0}>신청 기록</Tab>
          <Tab index={1}>작성 기록</Tab>
        </TabList>
      </TabGroup>

      <View style={styles.content}>
        {activeTab === 'applications' ? (
          applicationsData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={64}
                color={theme.colors.text.sub + '60'}
              />
              <Text style={styles.emptyText}>신청한 용병 기록이 없습니다.</Text>
            </View>
          ) : (
            <FlatList
              data={applicationsData}
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
            />
          )
        ) : myRecruitmentsData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={64}
              color={theme.colors.text.sub + '60'}
            />
            <Text style={styles.emptyText}>
              작성한 용병 모집 게시글이 없습니다.
            </Text>
          </View>
        ) : (
          <FlatList
            data={myRecruitmentsData}
            renderItem={renderRecruitmentCard}
            keyExtractor={item => item.recruitmentId.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (recruitmentsData && !recruitmentsData.last) {
                setRecruitmentsPage(prev => prev + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            onRefresh={() => {
              setRecruitmentsPage(0);
            }}
            refreshing={isRecruitmentsLoading}
          />
        )}
      </View>

      <Modal
        visible={cancelModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setCancelModalVisible(false);
          setCancelReason('');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>용병 신청 취소</Text>
              <TouchableOpacity
                onPress={() => {
                  setCancelModalVisible(false);
                  setCancelReason('');
                }}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.text.main}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                정말로 이 용병 신청을 취소하시겠습니까?
              </Text>

              {selectedApplication && (
                <View style={styles.selectedTeamInfo}>
                  <Text style={styles.teamLabel}>신청한 팀</Text>
                  <Text style={styles.teamNameText}>
                    {selectedApplication.teamName}
                  </Text>
                </View>
              )}

              <View style={styles.reasonSection}>
                <Text style={styles.reasonLabel}>취소 사유 (선택사항)</Text>
                <TextInput
                  style={styles.reasonInput}
                  placeholder="취소 사유를 입력해주세요"
                  placeholderTextColor={theme.colors.text.sub}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={cancelReason}
                  onChangeText={setCancelReason}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setCancelModalVisible(false);
                  setCancelReason('');
                }}
                disabled={isCanceling}
              >
                <Text style={styles.modalCancelButtonText}>돌아가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalConfirmButton,
                  isCanceling && styles.buttonDisabled,
                ]}
                onPress={confirmCancel}
                disabled={isCanceling}
              >
                <Text style={styles.modalConfirmButtonText}>
                  {isCanceling ? '취소 중...' : '신청 취소'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  recruitmentCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  recruitmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  positionSection: {
    flex: 1,
  },
  positionLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
    fontWeight: '500',
  },
  recruitmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  recruitmentHeaderBadges: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recruitmentInfo: {
    marginBottom: theme.spacing.spacing2,
  },
  teamInfoSection: {
    marginBottom: theme.spacing.spacing3,
    gap: theme.spacing.spacing1,
  },
  teamInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing1,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  recruitmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    width: '90%',
    maxWidth: 400,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  modalContent: {
    padding: theme.spacing.spacing5,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
    lineHeight: 22,
  },
  selectedTeamInfo: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    marginBottom: theme.spacing.spacing4,
  },
  teamLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
  },
  teamNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  reasonSection: {
    marginBottom: theme.spacing.spacing4,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing3,
    fontSize: 14,
    color: theme.colors.text.main,
    minHeight: 100,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: theme.spacing.spacing3,
    padding: theme.spacing.spacing5,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: theme.spacing.spacing3,
    borderRadius: theme.spacing.spacing3,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
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
