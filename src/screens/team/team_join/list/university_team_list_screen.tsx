import { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { styles } from './university_team_list_style';
import { theme } from '@/src/theme';
import type { TeamListItem } from '@/src/types';
import { teamListApi } from '@/src/api/team';
import TeamCard from './components/TeamCard';
import FilterModal from './components/FilterModal';
import TeamListHeader from './components/TeamListHeader';

interface FilterOptions {
  skillLevel: string[];
  teamType: string[];
  maxMemberCount: number;
}

export default function UniversityTeamListScreen() {
  const { university } = useLocalSearchParams<{ university: string }>();
  const [teams, setTeams] = useState<TeamListItem[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    skillLevel: [],
    teamType: [],
    maxMemberCount: 50,
  });
  const slideAnim = useState(new Animated.Value(0))[0];

  const fetchTeams = useCallback(async () => {
    if (!university) return;

    setLoading(true);
    setError(null);
    try {
      const data = await teamListApi.getTeamsByUniversity(university);
      setTeams(data);
      setFilteredTeams(data);
    } catch (err) {
      console.error('팀 목록 조회 실패:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [university]);

  const refetch = () => {
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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

  const toggleSkillLevel = (level: string) => {
    setFilterOptions(prev => ({
      ...prev,
      skillLevel: prev.skillLevel.includes(level)
        ? prev.skillLevel.filter(l => l !== level)
        : [...prev.skillLevel, level],
    }));
  };

  const toggleTeamType = (type: string) => {
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
    return <GlobalErrorFallback error={error} resetError={refetch} />;
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
