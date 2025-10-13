import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/src/theme';

interface MercenaryProfile {
  id: number;
  name: string;
  age: number;
  position: string;
  level: string;
  region: string;
  university: string;
  experience: number;
  noShowCount: number;
  totalMatches: number;
  feeCondition: string;
  availableTime: string;
  intro: string;
  profileImage?: string;
}

interface MercenaryDetailScreenProps {
  navigation: any;
  route: {
    params: {
      mercenary: MercenaryProfile;
    };
  };
}

export default function MercenaryDetailScreen({
  navigation,
  route,
}: MercenaryDetailScreenProps) {
  const { mercenary } = route.params;

  // mercenary가 없으면 기본값 사용 또는 에러 처리
  if (!mercenary) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>용병 프로필</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.errorText}>용병 정보를 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // const handleAction = (
  //   action: 'approve' | 'reject' | 'invite' | 'contact'
  // ) => {
  //   switch (action) {
  //     case 'invite':
  //       // 초대 로직은 MercenaryDetail 컴포넌트 내부에서 처리됨
  //       break;
  //     case 'contact':
  //       // 연락 로직은 MercenaryDetail 컴포넌트 내부에서 처리됨
  //       break;
  //   }
  // };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>용병 프로필</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.profileName}>{mercenary.name}</Text>
        <Text style={styles.profileInfo}>
          {mercenary.age}세 • {mercenary.position} • {mercenary.level}
        </Text>
        <Text style={styles.profileRegion}>{mercenary.university}</Text>
        <Text style={styles.profileExperience}>
          경력 {mercenary.experience}년
        </Text>
        <Text style={styles.profileIntro}>{mercenary.intro}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  container: {
    flex: 1,
    padding: theme.spacing.spacing6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.spacing2,
  },
  profileInfo: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.spacing1,
  },
  profileRegion: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.spacing1,
  },
  profileExperience: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.spacing1,
  },
  profileManner: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.spacing4,
  },
  profileIntro: {
    fontSize: 16,
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.spacing8,
  },
});
