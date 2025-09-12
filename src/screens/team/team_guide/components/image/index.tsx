import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from '../../team_guide_styles';

const GuideImage = () => {
  const imageFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 이미지 페이드인 애니메이션
    Animated.timing(imageFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [imageFadeAnim]);

  return (
    <View style={styles.imageContainer}>
      <Animated.Image
        source={require('@/assets/images/guide_image.png')}
        style={[styles.geminiImage, { opacity: imageFadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default GuideImage;
