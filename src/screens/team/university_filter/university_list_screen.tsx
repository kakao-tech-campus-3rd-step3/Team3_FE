import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, FlatList, StatusBar } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { UNIVERSITIES } from '@/src/constants/universities';
import ConnectButton from '@/src/screens/team/university_filter/components/connect_button';
import UniversityHeader from '@/src/screens/team/university_filter/components/university_header';
import UniversityItem from '@/src/screens/team/university_filter/components/university_item';
import { styles } from '@/src/screens/team/university_filter/university_list_style';
import { theme } from '@/src/theme';

export default function UniversityListScreen() {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
  };

  const handleConnect = () => {
    if (selectedUniversity) {
      router.push({
        pathname: ROUTES.TEAM_JOIN_LIST,
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
        data={UNIVERSITIES}
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
