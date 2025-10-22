import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';

import { styles } from '@/src/components/team/guide/cards_styles';
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
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;

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
          styles.card,
          styles.cardFirst,
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
            style={styles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[0].text}
          </Text>
          <View
            style={[
              styles.cardButton,
              { backgroundColor: cards[0].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          styles.cardSecond,
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
            style={styles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[1].text}
          </Text>
          <View
            style={[
              styles.cardButton,
              { backgroundColor: cards[1].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          styles.cardThird,
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
            style={styles.cardText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {cards[2].text}
          </Text>
          <View
            style={[
              styles.cardButton,
              { backgroundColor: cards[2].buttonColor },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
