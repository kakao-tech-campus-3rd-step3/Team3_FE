import { useLocalSearchParams, router } from 'expo-router';
import { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeamsByUniversity } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { TeamListItem } from '@/src/types';
import { SkillLevel, TeamType } from '@/src/types/team';

import FilterModal from './components/filter_modal';
import JoinConfirmationModal from './components/join_confirmation_modal';
import TeamCard from './components/team_card';
import TeamListHeader from './components/team_list_header';
import { styles } from './university_team_list_style';

interface FilterOptions {
  skillLevel: SkillLevel[];
  teamType: TeamType[];
  maxMemberCount: number;
}

export default function UniversityTeamListScreen() {
  const { university } = useLocalSearchParams<{ university: string }>();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamListItem | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    skillLevel: [],
    teamType: [],
    maxMemberCount: 50,
  });
  const slideAnim = useState(new Animated.Value(0))[0];
  const joinModalAnim = useState(new Animated.Value(0))[0];

  const {
    data: teams = [],
    isLoading: loading,
    error,
    refetch,
  } = useTeamsByUniversity(university || '');

  const filteredTeams = useMemo(() => {
    let filtered = [...teams];

    if (filterOptions.skillLevel.length > 0) {
      filtered = filtered.filter(team =>
        filterOptions.skillLevel.includes(team.skillLevel)
      );
    }

    if (filterOptions.teamType.length > 0) {
      filtered = filtered.filter(team =>
        filterOptions.teamType.includes(team.teamType)
      );
    }

    filtered = filtered.filter(
      team => team.memberCount <= filterOptions.maxMemberCount
    );

    return filtered;
  }, [teams, filterOptions]);

  const openFilterModal = () => {
    setShowFilterModal(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilterModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterModal(false);
    });
  };

  const resetFilters = () => {
    setFilterOptions({
      skillLevel: [],
      teamType: [],
      maxMemberCount: 50,
    });
  };

  const handleJoinTeam = (teamId: number) => {
    const team = filteredTeams.find(t => t.id === teamId);
    if (team) {
      setSelectedTeam(team);
      setShowJoinModal(true);
      Animated.timing(joinModalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleConfirmJoin = async () => {
    if (selectedTeam) {
      Animated.timing(joinModalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowJoinModal(false);
        setSelectedTeam(null);

        Alert.alert(
          '팀 가입 신청완료',
          `${selectedTeam.name}에 성공적으로 신청되었습니다!`,
          [
            {
              text: '확인',
              onPress: () => {
                router.push('/(tabs)');
              },
            },
          ]
        );
      });
    }
  };

  const handleCancelJoin = () => {
    Animated.timing(joinModalAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowJoinModal(false);
      setSelectedTeam(null);
    });
  };

  const renderTeamItem = ({ item }: { item: TeamListItem }) => (
    <TeamCard team={item} onJoin={handleJoinTeam} />
  );

  const toggleSkillLevel = (level: SkillLevel) => {
    setFilterOptions(prev => ({
      ...prev,
      skillLevel: prev.skillLevel.includes(level)
        ? prev.skillLevel.filter(l => l !== level)
        : [...prev.skillLevel, level],
    }));
  };

  const toggleTeamType = (type: TeamType) => {
    setFilterOptions(prev => ({
      ...prev,
      teamType: prev.teamType.includes(type)
        ? prev.teamType.filter(t => t !== type)
        : [...prev.teamType, type],
    }));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.blue[500]} />
      </View>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error as Error} resetError={refetch} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.main}
      />

      <CustomHeader title="팀 목록" showBackButton={true} />

      <TeamListHeader
        university={university || ''}
        onFilterPress={openFilterModal}
      />

      <FlatList
        data={filteredTeams}
        renderItem={renderTeamItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.teamList}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={showFilterModal}
        filterOptions={filterOptions}
        slideAnim={slideAnim}
        onClose={closeFilterModal}
        onApply={closeFilterModal}
        onReset={resetFilters}
        onToggleSkillLevel={toggleSkillLevel}
        onToggleTeamType={toggleTeamType}
        onMemberCountChange={value =>
          setFilterOptions(prev => ({
            ...prev,
            maxMemberCount: value,
          }))
        }
      />

      {selectedTeam && (
        <JoinConfirmationModal
          visible={showJoinModal}
          teamName={selectedTeam.name}
          teamType={selectedTeam.teamType}
          captainName={selectedTeam.captainName}
          onConfirm={handleConfirmJoin}
          onCancel={handleCancelJoin}
          slideAnim={joinModalAnim}
        />
      )}
    </View>
  );
}
