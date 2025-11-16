import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecruitmentCard } from '@/src/components/mercenary/recruitment_card';
import MercenaryApplicationModal from '@/src/components/modals/mercenary_application_modal';
import DetailModal, {
  type DetailBadge,
  type DetailInfoItem,
} from '@/src/components/ui/detail_modal';
import { styles as detailModalStyles } from '@/src/components/ui/detail_modal_styles';
import FilterButton from '@/src/components/ui/filter_button';
import SelectionModal from '@/src/components/ui/selection_modal';
import SkillLevelBadge from '@/src/components/ui/skill_level_badge';
import { convertPositionToKorean } from '@/src/constants/positions';
import { UNIVERSITIES } from '@/src/constants/universities';
import { useMercenaryMain } from '@/src/hooks/mercenary';
import { theme } from '@/src/theme';
import type { RecruitmentResponse } from '@/src/types';

import { styles } from './index_styles';

export default function MercenaryMainScreen() {
  const {
    selectedUniversity,
    isModalOpen,
    isDetailModalOpen,
    isApplicationModalOpen,
    selectedRecruitment,
    filteredRecruitments,
    recruitmentDetail,
    isLoading,
    isDetailLoading,
    isJoining,
    detailError,
    handleApplication,
    handleRecruitmentPress,
    handleApplyPress,
    handleCreatePress,
    handleUniversitySelect,
    handleUniversityClear,
    handleCloseDetailModal,
    handleCloseApplicationModal,
    handleOpenUniversityModal,
    handleCloseUniversityModal,
    handleLoadMore,
    handleRefresh,
    formatTime,
    isMyRecruitment,
    hasApplied,
  } = useMercenaryMain();

  const renderRecruitmentCard = ({ item }: { item: RecruitmentResponse }) => {
    return (
      <RecruitmentCard
        recruitment={item}
        onPress={() => handleRecruitmentPress(item.recruitmentId)}
        onApply={() => handleApplyPress(item)}
        showApplyButton={!isMyRecruitment(item)}
        isApplyButtonDisabled={hasApplied(item)}
      />
    );
  };

  const detailModalInfo = useMemo(() => {
    if (!recruitmentDetail) {
      return {
        headerTitle: undefined,
        headerBadges: undefined,
        infoItems: [],
        messageLabel: undefined,
        messageText: undefined,
      };
    }

    const headerBadges: DetailBadge[] = [
      {
        content: (
          <SkillLevelBadge
            skillLevel={recruitmentDetail.skillLevel}
            style={detailModalStyles.detailSkillBadge}
            textStyle={detailModalStyles.detailSkillText}
          />
        ),
      },
      {
        content: recruitmentDetail.recruitmentStatus,
      },
    ];

    const infoItems: DetailInfoItem[] = [
      {
        label: '팀명',
        value: recruitmentDetail.teamName,
        iconName: 'people-outline',
      },
      {
        label: '대학교',
        value: recruitmentDetail.universityName,
        iconName: 'school-outline',
      },
      {
        label: '매치 날짜',
        value: recruitmentDetail.matchDate,
        iconName: 'calendar-outline',
      },
      {
        label: '매치 시간',
        value: formatTime(recruitmentDetail.matchTime),
        iconName: 'time-outline',
      },
      {
        label: '포지션',
        value: convertPositionToKorean(recruitmentDetail.position),
        iconName: 'person-outline',
      },
      {
        label: '실력레벨',
        value: recruitmentDetail.skillLevel,
        iconName: 'star-outline',
      },
      {
        label: '생성일',
        value: new Date(recruitmentDetail.createdAt).toLocaleDateString(
          'ko-KR'
        ),
        iconName: 'create-outline',
      },
    ];

    return {
      headerTitle: convertPositionToKorean(recruitmentDetail.position),
      headerBadges,
      infoItems,
      messageLabel: '모집 메시지',
      messageText: recruitmentDetail.message,
    };
  }, [recruitmentDetail, formatTime]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>용병 서비스</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreatePress}>
          <Ionicons name="add" size={24} color={theme.colors.brand.main} />
        </TouchableOpacity>
      </View>

      <FilterButton
        selectedValue={selectedUniversity}
        placeholder="대학교 검색"
        onPress={handleOpenUniversityModal}
        onClear={handleUniversityClear}
      />

      <SelectionModal
        visible={isModalOpen}
        title="대학교 선택"
        items={[{ id: 0, name: '전체' }, ...UNIVERSITIES]}
        selectedValue={selectedUniversity}
        onClose={handleCloseUniversityModal}
        onSelect={handleUniversitySelect}
      />

      <DetailModal
        visible={isDetailModalOpen}
        title="용병 모집 상세"
        isLoading={isDetailLoading}
        error={detailError}
        headerTitle={detailModalInfo.headerTitle}
        headerBadges={detailModalInfo.headerBadges}
        infoItems={detailModalInfo.infoItems}
        messageLabel={detailModalInfo.messageLabel}
        messageText={detailModalInfo.messageText}
        onClose={handleCloseDetailModal}
      />

      <View style={styles.content}>
        <FlatList
          data={filteredRecruitments}
          renderItem={renderRecruitmentCard}
          keyExtractor={item => item.recruitmentId.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
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
        onClose={handleCloseApplicationModal}
        onApply={handleApplication}
        isApplying={isJoining}
      />
    </SafeAreaView>
  );
}
