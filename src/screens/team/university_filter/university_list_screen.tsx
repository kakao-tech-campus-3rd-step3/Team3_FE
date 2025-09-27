import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useUniversityTeamList } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import ConnectButton from './components/connect_button';
import UniversityHeader from './components/university_header';
import UniversityItem from './components/university_item';
import { styles } from './university_list_style';

export default function UniversityListScreen() {
  const router = useRouter();

  const {
    data: universities,
    isLoading,
    error,
    refetch,
  } = useUniversityTeamList();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.blue[500]} />
      </View>
    );
  }
  if (error) {
    return <GlobalErrorFallback error={error as Error} resetError={refetch} />;
  }

  if (!universities || universities.length === 0) {
    return (
      <View style={styles.container}>
        <CustomHeader title="" showBackButton={true} />
        <UniversityHeader />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>등록된 대학교가 없습니다</Text>
        </View>
      </View>
    );
  }

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
  };

  const handleConnect = () => {
    if (selectedUniversity) {
      router.push({
        pathname: '/team/join-list',
        params: { university: selectedUniversity },
      });
    }
  };

  const renderUniversityItem = ({
    item,
  }: {
    item: { id: number; name: string };
  }) => (
    <UniversityItem
      university={item.name}
      isSelected={selectedUniversity === item.name}
      onSelect={handleUniversitySelect}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background.main}
      />

      <CustomHeader title="" showBackButton={true} />
      <UniversityHeader />

      <FlatList
        data={universities}
        renderItem={renderUniversityItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.universityList}
        showsVerticalScrollIndicator={false}
      />

      <ConnectButton
        selectedUniversity={selectedUniversity}
        onConnect={handleConnect}
      />
    </View>
  );
}
