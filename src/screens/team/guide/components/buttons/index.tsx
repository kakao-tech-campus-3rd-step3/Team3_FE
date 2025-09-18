import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';

import { colors } from '@/src/theme';

import { styles } from '../../team_guide_styles';

const ActionButtons = () => {
  const createButtonScale = useRef(new Animated.Value(1)).current;
  const joinButtonScale = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  const handleCreateButtonPress = () => {
    Animated.sequence([
      Animated.timing(createButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(createButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    router.push('/team/creation');
  };

  const handleJoinButtonPress = () => {
    Animated.sequence([
      Animated.timing(joinButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(joinButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    router.push('/team/join_university');
  };

  return (
    <>
      <Animated.View style={{ transform: [{ scale: createButtonScale }] }}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateButtonPress}
        >
          <Ionicons name="add-circle" size={24} color={colors.white} />
          <Text style={styles.createButtonText}>팀 생성하기</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: joinButtonScale }] }}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoinButtonPress}
        >
          <Ionicons name="people" size={24} color={colors.blue[500]} />
          <Text style={styles.joinButtonText}>팀 참여하기</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ActionButtons;
