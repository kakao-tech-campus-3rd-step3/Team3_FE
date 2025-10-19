import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, FlatList, StatusBar } from 'react-native';

import ConnectButton from '@/src/components/team/filters/connect_button';
import UniversityHeader from '@/src/components/team/filters/university_header';
import UniversityItem from '@/src/components/team/filters/university_item';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { UNIVERSITIES } from '@/src/constants/universities';
import { theme } from '@/src/theme';

import { styles } from './styles';

export default function UniversityListScreen() {
  const router = useRouter();
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');

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
