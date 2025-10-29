import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MercenaryApplicationModal from '@/src/components/modals/mercenary_application_modal';
import { convertPositionToKorean } from '@/src/constants/positions';
import { UNIVERSITIES } from '@/src/constants/universities';
import {
  useMercenaryRecruitments,
  useMercenaryRecruitment,
} from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { RecruitmentResponse } from '@/src/types';

interface MercenaryProfile {
  id: number;
  name: string;
  age: number;
  position: string;
  level: string;
  region: string;
  university: string;
  experience: number;
  noShowCount: number;
  totalMatches: number;
  feeCondition: string;
  availableTime: string;
  intro: string;
  profileImage?: string;
  kakaoId: string;
  createdAt: string;
}

export default function MercenaryMainScreen() {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedMercenary] = useState<MercenaryProfile | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState<
    number | null
  >(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentResponse | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;

  const { data: recruitmentsData, isLoading } = useMercenaryRecruitments(
    currentPage,
    pageSize,
    'matchDate,asc'
  );

  const {
    data: recruitmentDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useMercenaryRecruitment(selectedRecruitmentId || 0);

  const filteredUniversities = UNIVERSITIES.filter(university =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const handleApplication = (
    recruitmentId: number,
    message: string,
    shareKakaoId: boolean
  ) => {
    console.log('용병 신청:', { recruitmentId, message, shareKakaoId });
    // TODO: 실제 용병 신청 API 호출
    Alert.alert('신청 완료', '용병 신청이 완료되었습니다.');
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

  const renderRecruitmentCard = ({ item }: { item: RecruitmentResponse }) => (
    <TouchableOpacity
      style={newStyles.recruitmentCard}
      activeOpacity={0.8}
      onPress={() => {
        setSelectedRecruitmentId(item.recruitmentId);
        setIsDetailModalOpen(true);
      }}
    >
      <View style={newStyles.cardContent}>
        <View style={newStyles.recruitmentHeader}>
          <View style={newStyles.positionSection}>
            <Text style={newStyles.positionLabel}>선호 포지션</Text>
            <Text style={newStyles.recruitmentTitle}>
              {convertPositionToKorean(item.position)}
            </Text>
          </View>
          <View style={newStyles.recruitmentHeaderBadges}>
            <View
              style={[
                newStyles.recruitmentSkillBadge,
                {
                  backgroundColor: getSkillLevelBadgeStyle(item.skillLevel)
                    .backgroundColor,
                },
              ]}
            >
              <Text
                style={[
                  newStyles.recruitmentSkillText,
                  { color: getSkillLevelBadgeStyle(item.skillLevel).textColor },
                ]}
              >
                {item.skillLevel}
              </Text>
            </View>
            <View style={newStyles.statusBadge}>
              <Text style={newStyles.statusText}>{item.recruitmentStatus}</Text>
            </View>
          </View>
        </View>

        <View style={newStyles.recruitmentInfo}>
          <View style={newStyles.matchInfoContainer}>
            <View style={newStyles.matchInfoItem}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={theme.colors.text.sub}
              />
              <Text style={newStyles.matchInfoText}>{item.matchDate}</Text>
            </View>
            <View style={newStyles.matchInfoItem}>
              <Ionicons
                name="time-outline"
                size={14}
                color={theme.colors.text.sub}
              />
              <Text style={newStyles.matchInfoText}>
                {formatTime(item.matchTime)}
              </Text>
            </View>
          </View>
        </View>

        <View style={newStyles.recruitmentFooter}>
          <Text style={newStyles.createdAt}>
            생성일:{' '}
            {new Date(item.createdAt).toLocaleDateString('ko-KR', {
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
          <TouchableOpacity
            style={newStyles.applyButton}
            onPress={() => {
              setSelectedRecruitment(item);
              setIsApplicationModalOpen(true);
            }}
          >
            <Text style={newStyles.applyButtonText}>신청하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={newStyles.container} edges={['top', 'left', 'right']}>
      <View style={newStyles.header}>
        <Text style={newStyles.headerTitle}>용병 서비스</Text>
        <TouchableOpacity
          style={newStyles.addButton}
          onPress={() => router.push('/mercenary/create')}
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
            <TouchableOpacity
              onPress={() => setIsModalOpen(false)}
              style={newStyles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
            <Text style={newStyles.modalTitle}>대학교 선택</Text>
            <View style={newStyles.modalHeaderRight} />
          </View>

          <View style={newStyles.searchInputContainer}>
            <Ionicons name="search" size={20} color={theme.colors.text.sub} />
            <TextInput
              style={newStyles.searchInput}
              placeholder="대학교명을 입력하세요"
              placeholderTextColor={theme.colors.text.sub}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={theme.colors.text.sub}
                />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={[{ id: 0, name: '전체' }, ...filteredUniversities]}
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
                  setSearchQuery('');
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
        visible={isContactModalOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsContactModalOpen(false)}
      >
        <View style={newStyles.contactModalOverlay}>
          <View style={newStyles.contactModalContainer}>
            <View style={newStyles.contactModalHeader}>
              <Text style={newStyles.contactModalTitle}>연락처 정보</Text>
              <TouchableOpacity
                onPress={() => setIsContactModalOpen(false)}
                style={newStyles.contactModalCloseButton}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.text.main}
                />
              </TouchableOpacity>
            </View>

            <View style={newStyles.contactModalContent}>
              <View style={newStyles.contactModalProfile}>
                <Text style={newStyles.contactModalName}>
                  {selectedMercenary?.name}
                </Text>
                <Text style={newStyles.contactModalPosition}>
                  {selectedMercenary?.position} • {selectedMercenary?.level}
                </Text>
              </View>

              <View style={newStyles.contactModalKakaoSection}>
                <Ionicons
                  name="chatbubble"
                  size={24}
                  color={theme.colors.brand.main}
                />
                <View style={newStyles.contactModalKakaoInfo}>
                  <Text style={newStyles.contactModalKakaoLabel}>
                    카카오톡 ID
                  </Text>
                  <Text style={newStyles.contactModalKakaoId}>
                    {selectedMercenary?.kakaoId}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={newStyles.contactModalCopyButton}
                onPress={() => {
                  setIsContactModalOpen(false);
                }}
              >
                <Ionicons name="copy" size={20} color="white" />
                <Text style={newStyles.contactModalCopyButtonText}>
                  복사하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
          data={recruitmentsData?.content || []}
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
  modalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.sub,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
  },
  modalHeaderRight: {
    width: 32,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    marginHorizontal: theme.spacing.spacing6,
    marginVertical: theme.spacing.spacing4,
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.main,
    paddingVertical: theme.spacing.spacing3,
    fontWeight: '500',
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
  contactModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing6,
  },
  contactModalContainer: {
    backgroundColor: theme.colors.background.main,
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    shadowColor: theme.colors.shadow.light,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contactModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  contactModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
  },
  contactModalCloseButton: {
    padding: 4,
  },
  contactModalContent: {
    padding: theme.spacing.spacing6,
  },
  contactModalProfile: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing6,
  },
  contactModalName: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  contactModalPosition: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  contactModalKakaoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    gap: theme.spacing.spacing3,
  },
  contactModalKakaoInfo: {
    flex: 1,
  },
  contactModalKakaoLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginBottom: theme.spacing.spacing1,
  },
  contactModalKakaoId: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  contactModalCopyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand.main,
    borderRadius: 12,
    paddingVertical: theme.spacing.spacing3,
    gap: theme.spacing.spacing2,
  },
  contactModalCopyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  mercenaryCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.brand.main + '30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '50',
    marginRight: theme.spacing.spacing4,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.brand.main,
  },
  profileInfo: {
    flex: 1,
  },
  mercenaryName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: 4,
  },
  ageText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  levelBadge: {
    backgroundColor: theme.colors.brand.main + '20',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.brand.main,
  },
  positionBadge: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  experienceSection: {
    marginBottom: theme.spacing.spacing2,
  },
  experienceText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
  },
  availableTime: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  intro: {
    fontSize: 14,
    color: theme.colors.text.sub,
    lineHeight: 20,
    marginBottom: theme.spacing.spacing4,
  },
  contactButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    marginTop: theme.spacing.spacing2,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand.main + '10',
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
    borderWidth: 1,
    borderColor: theme.colors.brand.main + '30',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.brand.main,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff444410',
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    gap: theme.spacing.spacing1,
    borderWidth: 1,
    borderColor: '#ff444430',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff4444',
  },
  detailsSection: {
    marginVertical: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  position: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  applicationCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing2,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    flex: 1,
  },
  statusBadge: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  applicationInfo: {
    marginBottom: theme.spacing.spacing2,
  },
  applicationDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing1,
  },
  applicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.spacing2,
    paddingTop: theme.spacing.spacing2,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  appliedDate: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing1,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing2,
    fontWeight: '500',
  },
  matchInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  matchInfoText: {
    fontSize: 13,
    color: theme.colors.text.main,
    marginLeft: theme.spacing.spacing1,
    fontWeight: '500',
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
  recruitmentCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  recruitmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
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
  recruitmentSkillBadge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  recruitmentSkillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recruitmentInfo: {
    marginBottom: theme.spacing.spacing2,
  },
  recruitmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing1,
  },
  recruitmentMessage: {
    fontSize: 14,
    color: theme.colors.text.sub,
    lineHeight: 20,
    marginBottom: theme.spacing.spacing4,
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
  createdAt: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  applyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
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
