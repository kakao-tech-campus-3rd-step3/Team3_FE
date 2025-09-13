import { useState, useEffect } from 'react';
import { View, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { styles } from './university_list_style';
import { theme } from '@/src/theme';
import { universityListApi } from '@/src/api/team';
import UniversityItem from './components/university_item';
import UniversityHeader from './components/university_header';
import ConnectButton from './components/connect_button';

export default function UniversityListScreen() {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [universities, setUniversities] = useState<
    { id: number; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await universityListApi.getUniversities();
        setUniversities(data);
      } catch (err) {
        console.error('대학교 목록 조회 실패:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const refetch = () => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await universityListApi.getUniversities();
        setUniversities(data);
      } catch (err) {
        console.error('대학교 목록 조회 실패:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversities();
  };

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
  };

  const handleConnect = () => {
    if (selectedUniversity) {
      router.push({
        pathname: '/team/join_list',
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

  if (isLoading) {
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

      <CustomHeader title="" showBackButton={true} />
      <UniversityHeader />

      <FlatList
        data={universities}
        renderItem={renderUniversityItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
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
