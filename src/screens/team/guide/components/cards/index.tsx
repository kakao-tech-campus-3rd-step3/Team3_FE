import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { styles } from '@/src/screens/team/guide/team_guide_styles';
import { colors } from '@/src/theme';

const cards = [
  {
    text: '함께 뛰는 즐거움을 경험해보세요',
    buttonColor: colors.red[500],
  },
  {
    text: '새로운 팀원들과 만나보세요',
    buttonColor: colors.blue[400],
  },
  {
    text: '축구로 시작하는 특별한 인연',
    buttonColor: colors.blue[800],
  },
];

export default function Cards() {
  const { width } = useWindowDimensions();
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;

  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: Math.max(16, width * 0.04),
      padding: Math.max(16, width * 0.04),
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      position: 'absolute',
    },
    cardFirst: {
      width: Math.max(240, width * 0.8),
      height: Math.max(60, width * 0.15),
      zIndex: 3,
      transform: [{ rotate: '-3deg' }, { scale: 1 }],
      left: Math.max(20, width * 0.05),
      top: Math.max(20, width * 0.05),
    },
    cardSecond: {
      width: Math.max(240, width * 0.8),
      height: Math.max(60, width * 0.15),
      zIndex: 2,
      transform: [{ rotate: '3deg' }, { scale: 0.95 }],
      left: Math.max(20, width * 0.05),
      top: Math.max(80, width * 0.2),
      opacity: 0.9,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardThird: {
      width: Math.max(240, width * 0.8),
      height: Math.max(60, width * 0.15),
      zIndex: 1,
      transform: [{ rotate: '-2deg' }, { scale: 0.9 }],
      left: Math.max(20, width * 0.05),
      top: Math.max(140, width * 0.35),
      opacity: 0.8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardText: {
      fontSize: Math.max(12, width * 0.035),
      fontWeight: '600',
      color: colors.text.main,
      flex: 1,
      lineHeight: Math.max(16, width * 0.045),
      textAlign: 'left',
    },
    cardButton: {
      width: Math.max(12, width * 0.035),
      height: Math.max(12, width * 0.035),
      borderRadius: Math.max(6, width * 0.017),
      marginLeft: Math.max(12, width * 0.03),
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
    },
  });

  useEffect(() => {
    Animated.stagger(400, [
      Animated.spring(card1Anim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(card2Anim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(card3Anim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [card1Anim, card2Anim, card3Anim]);

  return (
    <View style={styles.cardsContainer}>
      <Animated.View
        style={[
          dynamicStyles.card,
          dynamicStyles.cardFirst,
          {
            opacity: card1Anim,
            transform: [{ scale: card1Anim }, { rotate: '-3deg' }],
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={dynamicStyles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[0].text}
          </Text>
          <View
            style={[
              dynamicStyles.cardButton,
              { backgroundColor: cards[0].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          dynamicStyles.card,
          dynamicStyles.cardSecond,
          {
            opacity: card2Anim,
            transform: [{ scale: card2Anim }, { rotate: '3deg' }],
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={dynamicStyles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[1].text}
          </Text>
          <View
            style={[
              dynamicStyles.cardButton,
              { backgroundColor: cards[1].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          dynamicStyles.card,
          dynamicStyles.cardThird,
          {
            opacity: card3Anim,
            transform: [{ scale: card3Anim }, { rotate: '-2deg' }],
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={dynamicStyles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[2].text}
          </Text>
          <View
            style={[
              dynamicStyles.cardButton,
              { backgroundColor: cards[2].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
