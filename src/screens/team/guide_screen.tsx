import { LinearGradient } from 'expo-linear-gradient';
import { View, useWindowDimensions } from 'react-native';

import Buttons from '@/src/components/team/guide/buttons';
import Cards from '@/src/components/team/guide/cards';
import Header from '@/src/components/team/guide/header';
import { styles, getDynamicStyles } from '@/src/screens/team/guide_styles';
import { colors } from '@/src/theme';

const GuideScreen = () => {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);

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

export default GuideScreen;
