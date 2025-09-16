import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './team_guide_styles';
import Header from './components/header';
import GuideImage from './components/image';
import ActionButtons from './components/buttons';

const TeamGuideScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header />
        <GuideImage />
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        <ActionButtons />
      </View>
    </View>
  );
};

export default TeamGuideScreen;
