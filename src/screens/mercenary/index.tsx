import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecruitmentCard } from '@/src/components/mercenary/recruitment_card';
import MercenaryApplicationModal from '@/src/components/modals/mercenary_application_modal';
import { convertPositionToKorean } from '@/src/constants/positions';
import { ROUTES } from '@/src/constants/routes';
import { UNIVERSITIES } from '@/src/constants/universities';
import {
  useMercenaryRecruitments,
  useMercenaryRecruitment,
  useUserProfile,
  useTeamJoinRequestMutation,
  useMyJoinWaitingList,
} from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { RecruitmentResponse } from '@/src/types';
import type { JoinWaitingRequest } from '@/src/types/team';
import { translateErrorMessage } from '@/src/utils/error_messages';

export default function MercenaryMainScreen() {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState<
    number | null
  >(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentResponse | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;

  const { data: userProfile } = useUserProfile();
  const { joinWaiting, isJoining } = useTeamJoinRequestMutation();
  const { data: recruitmentsData, isLoading } = useMercenaryRecruitments(
    currentPage,
    pageSize,
    'matchDate,asc'
  );
  const { data: myJoinWaitingData } = useMyJoinWaitingList(
    0,
    1000,
    'audit.createdAt,desc',
    true
  );

  const {
    data: recruitmentDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useMercenaryRecruitment(selectedRecruitmentId || 0);

  const filteredRecruitments = useMemo(() => {
    const list = recruitmentsData?.content || [];
    if (!selectedUniversity || selectedUniversity === '전체') return list;
    return list.filter(r => r.universityName === selectedUniversity);
  }, [recruitmentsData?.content, selectedUniversity]);

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const handleApplication = (recruitmentId: number, message: string) => {
    const selectedRecruitment = recruitmentsData?.content.find(
      r => r.recruitmentId === recruitmentId
    );

    if (!selectedRecruitment) {
      Alert.alert('오류', '모집 게시글을 찾을 수 없습니다.');
      return;
    }

    const requestData: JoinWaitingRequest = {
      message: message.trim() || undefined,
      isMercenary: true,
    };

    joinWaiting(
      {
        teamId: selectedRecruitment.teamId,
        data: requestData,
      },
      {
        onSuccess: () => {
          setIsApplicationModalOpen(false);
          setSelectedRecruitment(null);
          Alert.alert('신청 완료', '용병 신청이 완료되었습니다.');
        },
        onError: error => {
          let errorMessage = '용병 신청에 실패했습니다.';
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

  const getSkillLevelBadgeStyle = (skillLevel: string) => {
    switch (skillLevel) {
      case 'PRO':
        return {
          backgroundColor: '#F4E4BC',
          textColor: theme.colors.text.main,
        };
      case 'SEMI_PRO':
        return {
          backgroundColor: '#E8E8E8',
          textColor: theme.colors.text.main,
        };
      case 'AMATEUR':
        return {
          backgroundColor: '#E6D2B8',
          textColor: theme.colors.text.main,
        };
      default:
        return {
          backgroundColor: '#E6D2B8',
          textColor: theme.colors.text.main,
        };
    }
  };

  const renderRecruitmentCard = ({ item }: { item: RecruitmentResponse }) => {
    const isMyRecruitment = userProfile?.teamId === item.teamId;
    const hasApplied = myJoinWaitingData?.content?.some(
      application =>
        application.teamId === item.teamId && application.status === 'PENDING'
    );
    return (
      <RecruitmentCard
        recruitment={item}
        onPress={() => {
          setSelectedRecruitmentId(item.recruitmentId);
          setIsDetailModalOpen(true);
        }}
        onApply={() => {
          setSelectedRecruitment(item);
          setIsApplicationModalOpen(true);
        }}
        showApplyButton={!isMyRecruitment}
        isApplyButtonDisabled={hasApplied}
      />
    );
  };

  return (
    <SafeAreaView style={newStyles.container} edges={['top', 'left', 'right']}>
      <View style={newStyles.header}>
        <Text style={newStyles.headerTitle}>용병 서비스</Text>
        <TouchableOpacity
          style={newStyles.addButton}
          onPress={() => {
            if (!userProfile?.teamId) {
              Alert.alert(
                '팀 참여 필요',
                '용병 모집을 하려면 먼저 팀에 가입해야 합니다.'
              );
              return;
            }
            router.push(ROUTES.MERCENARY_CREATE);
          }}
        >
          <Ionicons name="add" size={24} color={theme.colors.brand.main} />
        </TouchableOpacity>
      </View>

      <View style={newStyles.filterSection}>
        <TouchableOpacity
          style={newStyles.searchButton}
          onPress={() => setIsModalOpen(true)}
        >
          <Ionicons name="search" size={20} color={theme.colors.text.sub} />
          <Text style={newStyles.searchButtonText}>
            {selectedUniversity === '' ? '대학교 검색' : selectedUniversity}
          </Text>
          {selectedUniversity !== '' && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                setSelectedUniversity('');
              }}
              style={newStyles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.colors.text.sub}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={newStyles.modalContainer}>
          <View style={newStyles.modalHeader}>
            <View style={newStyles.modalHeaderLeft} />
            <Text style={newStyles.modalTitle}>대학교 선택</Text>
            <TouchableOpacity
              onPress={() => setIsModalOpen(false)}
              style={newStyles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={[{ id: 0, name: '전체' }, ...UNIVERSITIES]}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  newStyles.universityItem,
                  selectedUniversity === item.name &&
                    newStyles.universityItemActive,
                ]}
                onPress={() => {
                  setSelectedUniversity(item.name);
                  setIsModalOpen(false);
                }}
              >
                <Text
                  style={[
                    newStyles.universityItemText,
                    selectedUniversity === item.name &&
                      newStyles.universityItemTextActive,
                  ]}
                >
                  {item.name}
                </Text>
                {selectedUniversity === item.name && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={theme.colors.brand.main}
                  />
                )}
              </TouchableOpacity>
            )}
            style={newStyles.universityList}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={isDetailModalOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsDetailModalOpen(false)}
      >
        <View style={newStyles.detailModalOverlay}>
          <View style={newStyles.detailModalContainer}>
            <View style={newStyles.detailModalHeader}>
              <Text style={newStyles.detailModalTitle}>용병 모집 상세</Text>
              <TouchableOpacity
                onPress={() => setIsDetailModalOpen(false)}
                style={newStyles.detailModalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.text.main}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={newStyles.detailModalContent}
              showsVerticalScrollIndicator={false}
            >
              {isDetailLoading ? (
                <View style={newStyles.detailLoadingContainer}>
                  <Text style={newStyles.detailLoadingText}>로딩 중...</Text>
                </View>
              ) : detailError ? (
                <View style={newStyles.detailErrorContainer}>
                  <Text style={newStyles.detailErrorText}>
                    상세 정보를 불러올 수 없습니다.
                  </Text>
                </View>
              ) : recruitmentDetail ? (
                <View style={newStyles.detailInfoCard}>
                  <View style={newStyles.detailInfoHeader}>
                    <Text style={newStyles.detailInfoTitle}>
                      {convertPositionToKorean(recruitmentDetail.position)}
                    </Text>
                    <View style={newStyles.detailHeaderBadges}>
                      <View
                        style={[
                          newStyles.detailSkillBadge,
                          {
                            backgroundColor: getSkillLevelBadgeStyle(
                              recruitmentDetail.skillLevel
                            ).backgroundColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            newStyles.detailSkillText,
                            {
                              color: getSkillLevelBadgeStyle(
                                recruitmentDetail.skillLevel
                              ).textColor,
                            },
                          ]}
                        >
                          {recruitmentDetail.skillLevel}
                        </Text>
                      </View>
                      <View style={newStyles.detailStatusBadge}>
                        <Text style={newStyles.detailStatusText}>
                          {recruitmentDetail.recruitmentStatus}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={newStyles.detailInfoList}>
                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="people-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>팀명</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {recruitmentDetail.teamName}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="school-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>대학교</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {recruitmentDetail.universityName}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>매치 날짜</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {recruitmentDetail.matchDate}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>매치 시간</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {formatTime(recruitmentDetail.matchTime)}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>포지션</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {convertPositionToKorean(recruitmentDetail.position)}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="star-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>실력레벨</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {recruitmentDetail.skillLevel}
                      </Text>
                    </View>

                    <View style={newStyles.detailInfoItem}>
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color={theme.colors.text.sub}
                      />
                      <Text style={newStyles.detailInfoLabel}>생성일</Text>
                      <Text style={newStyles.detailInfoValue}>
                        {new Date(
                          recruitmentDetail.createdAt
                        ).toLocaleDateString('ko-KR')}
                      </Text>
                    </View>
                  </View>

                  <View style={newStyles.detailMessageSection}>
                    <Text style={newStyles.detailMessageLabel}>
                      모집 메시지
                    </Text>
                    <Text style={newStyles.detailMessageText}>
                      {recruitmentDetail.message}
                    </Text>
                  </View>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={newStyles.content}>
        <FlatList
          data={filteredRecruitments}
          renderItem={renderRecruitmentCard}
          keyExtractor={item => item.recruitmentId.toString()}
          contentContainerStyle={newStyles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          onEndReached={() => {
            if (recruitmentsData && !recruitmentsData.last) {
              setCurrentPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          onRefresh={() => {
            setCurrentPage(0);
          }}
          refreshing={isLoading}
          ListEmptyComponent={() => {
            return (
              <View style={newStyles.emptyContainer}>
                <Text style={newStyles.emptyText}>
                  용병 모집 게시글이 없습니다.
                </Text>
              </View>
            );
          }}
        />
      </View>

      <MercenaryApplicationModal
        visible={isApplicationModalOpen}
        recruitment={selectedRecruitment}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedRecruitment(null);
        }}
        onApply={handleApplication}
        isApplying={isJoining}
      />
    </SafeAreaView>
  );
}

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.main,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.brand.main + '20',
  },
  filterSection: {
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing2,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
    borderRadius: 16,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    gap: theme.spacing.spacing2,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  clearButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: theme.colors.brand.main + '10',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalHeaderLeft: {
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    flex: 1,
    textAlign: 'center',
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.sub,
  },
  universityList: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  universityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing4,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: theme.colors.background.sub,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  universityItemActive: {
    backgroundColor: theme.colors.brand.main + '15',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '30',
    shadowColor: theme.colors.brand.main,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  universityItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.main,
  },
  universityItemTextActive: {
    color: theme.colors.brand.main,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.spacing4,
  },
  detailModalContainer: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing4,
    width: '100%',
    maxHeight: '80%',
    padding: theme.spacing.spacing4,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  detailModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  detailModalCloseButton: {
    padding: theme.spacing.spacing1,
  },
  detailModalContent: {
    maxHeight: 400,
  },
  detailLoadingContainer: {
    padding: theme.spacing.spacing8,
    alignItems: 'center',
  },
  detailLoadingText: {
    fontSize: 16,
    color: theme.colors.text.sub,
  },
  detailErrorContainer: {
    padding: theme.spacing.spacing8,
    alignItems: 'center',
  },
  detailErrorText: {
    fontSize: 16,
    color: theme.colors.error,
  },
  detailInfoCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
  },
  detailInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  detailInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  detailHeaderBadges: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  detailSkillBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  detailSkillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailStatusBadge: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  detailInfoList: {
    marginBottom: theme.spacing.spacing4,
  },
  detailInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing3,
  },
  detailInfoLabel: {
    fontSize: 14,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing2,
    marginRight: theme.spacing.spacing2,
    minWidth: 80,
  },
  detailInfoValue: {
    fontSize: 14,
    color: theme.colors.text.main,
    fontWeight: '500',
    flex: 1,
  },
  detailMessageSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.medium,
    paddingTop: theme.spacing.spacing4,
  },
  detailMessageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  detailMessageText: {
    fontSize: 14,
    color: theme.colors.text.main,
    lineHeight: 20,
  },
});
