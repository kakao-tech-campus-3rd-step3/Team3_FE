import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ApplicationCard from '@/src/components/mercenary/application_card';
import CancelApplicationModal from '@/src/components/mercenary/cancel_application_modal';
import { RecruitmentCard } from '@/src/components/mercenary/recruitment_card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { TabGroup, TabList, Tab } from '@/src/components/ui/tab_selector';
import { useMercenaryHistory } from '@/src/hooks/mercenary';
import { theme } from '@/src/theme';
import type { RecruitmentResponse } from '@/src/types/mercenary';
import type { UserJoinWaitingItem } from '@/src/types/team';

import { styles } from './history_styles';

export default function MercenaryHistoryScreen() {
  const {
    selectedIndex,
    activeTab,
    cancelModalVisible,
    selectedApplication,
    cancelReason,
    applicationsData,
    myRecruitmentsData,
    isLoading,
    isRecruitmentsLoading,
    isCanceling,
    setSelectedIndex,
    handleEdit,
    handleDelete,
    handleCancel,
    confirmCancel,
    handleCloseCancelModal,
    setCancelReason,
    handleApplicationsLoadMore,
    handleApplicationsRefresh,
    handleRecruitmentsLoadMore,
    handleRecruitmentsRefresh,
  } = useMercenaryHistory();

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

  const renderApplicationCard = ({ item }: { item: UserJoinWaitingItem }) => (
    <ApplicationCard item={item} onCancel={handleCancel} />
  );

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
              onEndReached={handleApplicationsLoadMore}
              onEndReachedThreshold={0.5}
              onRefresh={handleApplicationsRefresh}
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
            onEndReached={handleRecruitmentsLoadMore}
            onEndReachedThreshold={0.5}
            onRefresh={handleRecruitmentsRefresh}
            refreshing={isRecruitmentsLoading}
          />
        )}
      </View>

      <CancelApplicationModal
        visible={cancelModalVisible}
        selectedApplication={selectedApplication}
        cancelReason={cancelReason}
        isCanceling={isCanceling}
        onClose={handleCloseCancelModal}
        onConfirm={confirmCancel}
        onReasonChange={setCancelReason}
      />
    </SafeAreaView>
  );
}
