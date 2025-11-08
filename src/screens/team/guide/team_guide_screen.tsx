import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import Buttons from '@/src/screens/team/guide/components/buttons';
import Cards from '@/src/screens/team/guide/components/cards';
import Header from '@/src/screens/team/guide/components/header';
import { styles } from '@/src/screens/team/guide/team_guide_styles';
import { colors } from '@/src/theme';

const TeamGuideScreen = () => {
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    topSection: {
      flex: 1,
      paddingHorizontal: Math.max(20, width * 0.05),
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSection: {
      paddingHorizontal: Math.max(20, width * 0.05),
      paddingTop: Math.max(20, width * 0.05),
      paddingBottom: Math.max(40, width * 0.1),
      justifyContent: 'flex-start',
    },
    cardsContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Math.max(40, width * 0.1),
      position: 'relative',
      height: Math.max(380, width * 0.95),
    },
  });

  return (
    <LinearGradient
      colors={[colors.blue[300], colors.blue[400], colors.white]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={dynamicStyles.topSection}>
        <Header />
        <View style={dynamicStyles.cardsContainer}>
          <Cards />
        </View>
      </View>

      <View style={dynamicStyles.bottomSection}>
        <Buttons />
      </View>
    </LinearGradient>
  );
};

export default TeamGuideScreen;
