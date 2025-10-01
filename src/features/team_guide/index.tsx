import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

import Buttons from '@/src/components/team/guide/buttons';
import Cards from '@/src/components/team/guide/cards';
import Header from '@/src/components/team/guide/header';
import { colors } from '@/src/theme';

import { styles } from './styles';

const TeamGuideScreen = () => {
  return (
    <LinearGradient
      colors={[colors.blue[300], colors.blue[400], colors.white]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <Header />
        <Cards />
      </View>

      <View style={styles.bottomSection}>
        <Buttons />
      </View>
    </LinearGradient>
  );
};

export default TeamGuideScreen;
