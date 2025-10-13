import { Ionicons } from '@expo/vector-icons';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNIVERSITIES } from '@/src/constants/universities';
import { theme } from '@/src/theme';

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

interface MercenaryApplication {
  id: number;
  matchId: number;
  matchTitle: string;
  matchDate: string;
  matchTime: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  fee: string;
}

export default function MercenaryMainScreen() {
  const [activeTab, setActiveTab] = useState<
    'discover' | 'applications' | 'myMercenaries'
  >('discover');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedMercenary, setSelectedMercenary] =
    useState<MercenaryProfile | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // 검색 필터링된 대학교 목록
  const filteredUniversities = UNIVERSITIES.filter(university =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data for mercenaries
  const mockMercenaries: MercenaryProfile[] = [
    {
      id: 1,
      name: '선원준',
      age: 22,
      position: 'FW',
      level: '세미프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 4,
      noShowCount: 0,
      totalMatches: 45,
      feeCondition: '무료',
      availableTime: '주말 오후',
      intro: '빠른 스피드와 정확한 슈팅을 자랑하는 공격수입니다.',
      kakaoId: 'seonwonjun_kakao',
      createdAt: '2025-01-10',
    },
    {
      id: 2,
      name: '설유준',
      age: 24,
      position: 'MF',
      level: '프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 6,
      noShowCount: 1,
      totalMatches: 78,
      feeCondition: '참가비 지불 가능',
      availableTime: '평일 저녁, 주말',
      intro: '중앙 미드필더로 패스와 볼 배급에 자신있습니다.',
      kakaoId: 'seolyujun_kakao',
      createdAt: '2025-01-12',
    },
    {
      id: 3,
      name: '김지수',
      age: 21,
      position: 'DF',
      level: '아마추어',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 3,
      noShowCount: 0,
      totalMatches: 32,
      feeCondition: '교통비 지원 필요',
      availableTime: '주말',
      intro: '수비에 집중하고 안정적인 플레이를 추구합니다.',
      kakaoId: 'kimjisoo_kakao',
      createdAt: '2025-01-14',
    },
    {
      id: 4,
      name: '서현주',
      age: 23,
      position: 'GK',
      level: '세미프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 5,
      noShowCount: 0,
      totalMatches: 67,
      feeCondition: '무료',
      availableTime: '주말',
      intro: '반사신경이 뛰어난 골키퍼로 안정적인 수비를 제공합니다.',
      kakaoId: 'seohyunju_kakao',
      createdAt: '2025-01-16',
    },
    {
      id: 5,
      name: '이시행',
      age: 25,
      position: 'LW',
      level: '프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 7,
      noShowCount: 1,
      totalMatches: 89,
      feeCondition: '참가비 지불 가능',
      availableTime: '주말 오전',
      intro: '빠른 스피드와 정확한 크로스를 자랑하는 윙어입니다.',
      kakaoId: 'leeshihang_kakao',
      createdAt: '2025-01-18',
    },
    {
      id: 6,
      name: '박민수',
      age: 20,
      position: 'CB',
      level: '아마추어',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 2,
      noShowCount: 0,
      totalMatches: 18,
      feeCondition: '교통비 지원 필요',
      availableTime: '주말',
      intro: '강력한 헤딩과 안정적인 수비로 팀을 지킵니다.',
      kakaoId: 'parkminsu_kakao',
      createdAt: '2025-01-20',
    },
  ];

  // Mock data for mercenary applications
  const mockApplications: MercenaryApplication[] = [
    {
      id: 1,
      matchId: 101,
      matchTitle: '강원대학교 정기전',
      matchDate: '2025-01-20',
      matchTime: '17:00',
      location: '강원대학교 대운동장',
      status: 'pending',
      appliedDate: '2025-01-15',
      fee: '무료',
    },
    {
      id: 2,
      matchId: 102,
      matchTitle: '강원대학교 친선전',
      matchDate: '2025-01-22',
      matchTime: '19:00',
      location: '강원대학교 체육관',
      status: 'approved',
      appliedDate: '2025-01-14',
      fee: '15,000원',
    },
  ];

  // Mock data for my created mercenaries
  const myMercenaries: MercenaryProfile[] = [
    {
      id: 7,
      name: '설유준',
      age: 24,
      position: 'ST',
      level: '프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 6,
      noShowCount: 0,
      totalMatches: 78,
      feeCondition: '참가비 지불 가능',
      availableTime: '주말',
      intro: '강력한 득점력과 리더십을 갖춘 스트라이커입니다.',
      kakaoId: 'seolyujun_st_kakao',
      createdAt: '2025-01-08',
    },
    {
      id: 8,
      name: '설유준',
      age: 24,
      position: 'CM',
      level: '프로',
      region: '강원 춘천시',
      university: '강원대학교',
      experience: 6,
      noShowCount: 1,
      totalMatches: 56,
      feeCondition: '무료',
      availableTime: '평일 저녁, 주말',
      intro: '중앙 미드필더로 팀의 핵심 역할을 담당합니다.',
      kakaoId: 'seolyujun_cm_kakao',
      createdAt: '2025-01-22',
    },
  ];

  const renderMercenaryCard = ({ item }: { item: MercenaryProfile }) => (
    <TouchableOpacity style={newStyles.mercenaryCard} activeOpacity={0.8}>
      <View style={newStyles.cardContent}>
        {/* 프로필 정보 */}
        <View style={newStyles.profileSection}>
          <View style={newStyles.avatar}>
            <Text style={newStyles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={newStyles.profileInfo}>
            <Text style={newStyles.mercenaryName}>{item.name}</Text>
            <Text style={newStyles.ageText}>
              {item.age}세 • {item.university}
            </Text>
            <View style={newStyles.levelRow}>
              <View style={newStyles.levelBadge}>
                <Text style={newStyles.levelText}>{item.level}</Text>
              </View>
              <View style={newStyles.positionBadge}>
                <Text style={newStyles.positionText}>{item.position}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 경력 정보 */}
        <View style={newStyles.experienceSection}>
          <Text style={newStyles.experienceText}>경력 {item.experience}년</Text>
        </View>

        {/* 가능 시간 */}
        <View style={newStyles.timeSection}>
          <Ionicons
            name="time-outline"
            size={14}
            color={theme.colors.text.sub}
          />
          <Text style={newStyles.availableTime}>{item.availableTime}</Text>
        </View>

        {/* 자기소개 */}
        <Text style={newStyles.intro} numberOfLines={2}>
          {item.intro}
        </Text>

        {/* 연락하기 버튼 */}
        <TouchableOpacity
          style={newStyles.contactButton}
          onPress={() => {
            setSelectedMercenary(item);
            setIsContactModalOpen(true);
          }}
        >
          <Text style={newStyles.contactButtonText}>연락하기</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderMyMercenaryCard = ({ item }: { item: MercenaryProfile }) => (
    <TouchableOpacity style={newStyles.mercenaryCard} activeOpacity={0.8}>
      <View style={newStyles.cardContent}>
        {/* 프로필 정보 */}
        <View style={newStyles.profileSection}>
          <View style={newStyles.avatar}>
            <Text style={newStyles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={newStyles.profileInfo}>
            <Text style={newStyles.name}>{item.name}</Text>
            <Text style={newStyles.position}>
              {item.position} • {item.level}
            </Text>
          </View>
        </View>

        {/* 상세 정보 */}
        <View style={newStyles.detailsSection}>
          <View style={newStyles.detailRow}>
            <Text style={newStyles.detailLabel}>대학교</Text>
            <Text style={newStyles.detailValue}>{item.university}</Text>
          </View>
          <View style={newStyles.detailRow}>
            <Text style={newStyles.detailLabel}>경력</Text>
            <Text style={newStyles.detailValue}>{item.experience}년</Text>
          </View>
          <View style={newStyles.detailRow}>
            <Text style={newStyles.detailLabel}>가능시간</Text>
            <Text style={newStyles.detailValue}>{item.availableTime}</Text>
          </View>
          <View style={newStyles.detailRow}>
            <Text style={newStyles.detailLabel}>생성일</Text>
            <Text style={newStyles.detailValue}>{item.createdAt}</Text>
          </View>
        </View>

        {/* 자기소개 */}
        <Text style={newStyles.intro} numberOfLines={2}>
          {item.intro}
        </Text>

        {/* 액션 버튼들 */}
        <View style={newStyles.actionButtons}>
          <TouchableOpacity
            style={newStyles.editButton}
            onPress={() => {
              // 수정 기능 구현
              console.log('수정:', item.name);
            }}
          >
            <Ionicons name="create" size={16} color={theme.colors.brand.main} />
            <Text style={newStyles.editButtonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={newStyles.deleteButton}
            onPress={() => {
              // 삭제 기능 구현
              console.log('삭제:', item.name);
            }}
          >
            <Ionicons name="trash" size={16} color="#ff4444" />
            <Text style={newStyles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderApplicationCard = ({ item }: { item: MercenaryApplication }) => (
    <View style={newStyles.applicationCard}>
      <View style={newStyles.applicationHeader}>
        <Text style={newStyles.matchTitle}>{item.matchTitle}</Text>
        <View
          style={[
            newStyles.statusBadge,
            {
              backgroundColor:
                item.status === 'pending'
                  ? theme.colors.warning + '20'
                  : item.status === 'approved'
                    ? theme.colors.success + '20'
                    : theme.colors.error + '20',
            },
          ]}
        >
          <Text
            style={[
              newStyles.statusText,
              {
                color:
                  item.status === 'pending'
                    ? theme.colors.warning
                    : item.status === 'approved'
                      ? theme.colors.success
                      : theme.colors.error,
              },
            ]}
          >
            {item.status === 'pending'
              ? '대기중'
              : item.status === 'approved'
                ? '승인됨'
                : '거절됨'}
          </Text>
        </View>
      </View>

      <View style={newStyles.applicationInfo}>
        <View style={newStyles.applicationDetailRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={theme.colors.text.sub}
          />
          <Text style={newStyles.infoText}>
            {item.matchDate} {item.matchTime}
          </Text>
        </View>
        <View style={newStyles.applicationDetailRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={theme.colors.text.sub}
          />
          <Text style={newStyles.infoText}>{item.location}</Text>
        </View>
        <View style={newStyles.applicationDetailRow}>
          <Ionicons
            name="card-outline"
            size={16}
            color={theme.colors.text.sub}
          />
          <Text style={newStyles.infoText}>{item.fee}</Text>
        </View>
      </View>

      <View style={newStyles.applicationFooter}>
        <Text style={newStyles.appliedDate}>신청일: {item.appliedDate}</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.text.sub}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={newStyles.container} edges={['top', 'left', 'right']}>
      {/* 헤더 */}
      <View style={newStyles.header}>
        <Text style={newStyles.headerTitle}>용병 서비스</Text>
        <TouchableOpacity
          style={newStyles.addButton}
          onPress={() => setIsCreateModalOpen(true)}
        >
          <Ionicons name="add" size={24} color={theme.colors.brand.main} />
        </TouchableOpacity>
      </View>

      {/* 탭 네비게이션 */}
      <View style={newStyles.tabContainer}>
        <TouchableOpacity
          style={[
            newStyles.tab,
            activeTab === 'discover' && newStyles.activeTab,
          ]}
          onPress={() => setActiveTab('discover')}
        >
          <Text
            style={[
              newStyles.tabText,
              activeTab === 'discover' && newStyles.activeTabText,
            ]}
          >
            용병 찾기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            newStyles.tab,
            activeTab === 'applications' && newStyles.activeTab,
          ]}
          onPress={() => setActiveTab('applications')}
        >
          <Text
            style={[
              newStyles.tabText,
              activeTab === 'applications' && newStyles.activeTabText,
            ]}
          >
            받은 신청 목록
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            newStyles.tab,
            activeTab === 'myMercenaries' && newStyles.activeTab,
          ]}
          onPress={() => setActiveTab('myMercenaries')}
        >
          <Text
            style={[
              newStyles.tabText,
              activeTab === 'myMercenaries' && newStyles.activeTabText,
            ]}
          >
            등록 관리
          </Text>
        </TouchableOpacity>
      </View>

      {/* 대학교 필터 */}
      {activeTab === 'discover' && (
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
      )}

      {/* 대학교 선택 모달 */}
      <Modal
        visible={isModalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={newStyles.modalContainer}>
          {/* 모달 헤더 */}
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

          {/* 검색 입력 */}
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

          {/* 대학교 목록 */}
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

      {/* 카카오 ID 모달 */}
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
                  // 카카오 ID 복사 기능 (실제 구현 시 Clipboard API 사용)
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

      {/* 용병 등록 모달 */}
      <Modal
        visible={isCreateModalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={newStyles.createModalContainer}>
          {/* 모달 헤더 */}
          <View style={newStyles.createModalHeader}>
            <TouchableOpacity
              onPress={() => setIsCreateModalOpen(false)}
              style={newStyles.createModalCloseButton}
            >
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
            <Text style={newStyles.createModalTitle}>용병 등록</Text>
            <View style={newStyles.createModalHeaderRight} />
          </View>

          {/* 등록 폼 */}
          <ScrollView
            style={newStyles.createFormContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* 기본 정보 */}
            <View style={newStyles.formSection}>
              <Text style={newStyles.formSectionTitle}>기본 정보</Text>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>이름</Text>
                <TextInput
                  style={newStyles.textInput}
                  placeholder="이름을 입력하세요"
                  placeholderTextColor={theme.colors.text.sub}
                />
              </View>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>포지션</Text>
                <View style={newStyles.readOnlyField}>
                  <Text style={newStyles.readOnlyText}>FW</Text>
                </View>
              </View>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>실력 레벨</Text>
                <View style={newStyles.readOnlyField}>
                  <Text style={newStyles.readOnlyText}>프로</Text>
                </View>
              </View>
            </View>

            {/* 상세 정보 */}
            <View style={newStyles.formSection}>
              <Text style={newStyles.formSectionTitle}>상세 정보</Text>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>대학교</Text>
                <View style={newStyles.readOnlyField}>
                  <Text style={newStyles.readOnlyText}>강원대학교</Text>
                </View>
              </View>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>경력 (년)</Text>
                <TextInput
                  style={newStyles.textInput}
                  placeholder="경력을 입력하세요"
                  placeholderTextColor={theme.colors.text.sub}
                  keyboardType="numeric"
                />
              </View>

              <View style={newStyles.inputGroup}>
                <Text style={newStyles.inputLabel}>가능 시간</Text>
                <TextInput
                  style={newStyles.textInput}
                  placeholder="예: 주말 오후, 평일 저녁"
                  placeholderTextColor={theme.colors.text.sub}
                />
              </View>
            </View>

            {/* 자기소개 */}
            <View style={newStyles.formSection}>
              <Text style={newStyles.formSectionTitle}>자기소개</Text>
              <TextInput
                style={newStyles.textAreaInput}
                placeholder="자신을 소개해주세요"
                placeholderTextColor={theme.colors.text.sub}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* 등록 버튼 */}
            <TouchableOpacity
              style={newStyles.createSubmitButton}
              onPress={() => {
                // 등록 로직 구현
                setIsCreateModalOpen(false);
              }}
            >
              <Text style={newStyles.createSubmitButtonText}>
                용병 등록하기
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* 콘텐츠 */}
      <View style={newStyles.content}>
        {activeTab === 'discover' && (
          <FlatList
            data={mockMercenaries.filter(
              mercenary =>
                selectedUniversity === '' ||
                mercenary.university === selectedUniversity
            )}
            renderItem={renderMercenaryCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={newStyles.listContainer}
            showsVerticalScrollIndicator={false}
            numColumns={1}
          />
        )}
        {activeTab === 'applications' && (
          <FlatList
            data={mockApplications}
            renderItem={renderApplicationCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={newStyles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
        {activeTab === 'myMercenaries' && (
          <FlatList
            data={myMercenaries}
            renderItem={renderMyMercenaryCard}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={newStyles.listContainer}
            showsVerticalScrollIndicator={false}
            numColumns={1}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  // 헤더 스타일
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
  // 탭 네비게이션 스타일
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    backgroundColor: theme.colors.background.main,
    marginTop: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing1,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.spacing2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.brand.main,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  activeTabText: {
    color: theme.colors.brand.main,
    fontWeight: '600',
  },
  // 필터 섹션 스타일
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
  // 모달 스타일
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
  // 연락하기 모달 스타일
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
  // 콘텐츠 스타일
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: theme.spacing.spacing2,
    paddingHorizontal: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
  },
  // 용병 카드 스타일
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
  // 액션 버튼 스타일
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
  // 상세 정보 스타일
  detailsSection: {
    marginVertical: theme.spacing.spacing4,
    gap: theme.spacing.spacing2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing1,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: theme.colors.text.main,
    fontWeight: '600',
  },
  // 프로필 정보 스타일
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
  // 용병 등록 모달 스타일
  createModalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  createModalHeader: {
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
  createModalCloseButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.sub,
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
  },
  createModalHeaderRight: {
    width: 32,
  },
  createFormContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing6,
  },
  formSection: {
    marginBottom: theme.spacing.spacing6,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  textInput: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: 16,
    color: theme.colors.text.main,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
  },
  textAreaInput: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: 16,
    color: theme.colors.text.main,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
    minHeight: 100,
  },
  readOnlyField: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '10',
    opacity: 0.7,
  },
  readOnlyText: {
    fontSize: 16,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  positionSelector: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  positionButton: {
    flex: 1,
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingVertical: theme.spacing.spacing3,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
  },
  positionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  levelSelector: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
  },
  levelButton: {
    flex: 1,
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingVertical: theme.spacing.spacing3,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  feeSelector: {
    gap: theme.spacing.spacing2,
  },
  feeButton: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: 12,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.brand.main + '20',
  },
  feeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  createSubmitButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: 16,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    marginVertical: theme.spacing.spacing6,
    shadowColor: theme.colors.brand.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createSubmitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  // 빈 상태 스타일
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.spacing6,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing2,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.text.sub,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.spacing6,
  },
  createProfileButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing6,
  },
  createProfileButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  // 신청 카드 스타일 (기존 유지)
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
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    minWidth: 60,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
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
});
