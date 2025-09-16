import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeamsByUniversity } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { TeamListItem } from '@/src/types';
import { SkillLevel, TeamType } from '@/src/types/team';

import FilterModal from './components/filter_modal';
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
  const [filteredTeams, setFilteredTeams] = useState<TeamListItem[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    skillLevel: [],
    teamType: [],
    maxMemberCount: 50,
  });
  const slideAnim = useState(new Animated.Value(0))[0];

  const {
    data: teams = [],
    isLoading: loading,
    error,
    refetch,
  } = useTeamsByUniversity(university || '');

  useEffect(() => {
    setFilteredTeams(teams);
  }, [teams]);

  const applyFilters = () => {
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

    setFilteredTeams(filtered);
  };

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
    setFilteredTeams(teams);
  };

  const handleJoinTeam = async (teamId: number) => {
    // API 호출 미완성
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

      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Text style={styles.filterButtonText}>필터</Text>
        </TouchableOpacity>
      </View>

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
        onApply={applyFilters}
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
    </View>
  );
}
