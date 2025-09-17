import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { serviceCards } from '@/src/constants/service_card';
import type { HomeData } from '@/src/types';

import styles from '../../home_style';

interface BenefitsSectionProps {
  homeData: HomeData;
}

export default memo(function BenefitsSection({
  homeData,
}: BenefitsSectionProps) {
  const router = useRouter();

  const handleServicePress = (serviceId: string) => {
    if (serviceId === 'team') {
      if (homeData?.user.teamId) {
        // ✅ 동적 라우트에 teamId 직접 포함
        router.push(`/team/management/${homeData.user.teamId}`);
      } else {
        router.push('/team/guide');
      }
      return;
    }

    const routeMap: Record<string, string> = {
      tournament: '/tournament',
      mercenary: '/mercenary',
    };

    const route = routeMap[serviceId];
    if (route) {
      router.push(route);
    }
  };
  return (
    <View style={styles.benefitsSection}>
      <View style={styles.benefitsHeader}>
        <Text style={styles.benefitsTitle}>축구 서비스</Text>
      </View>

      <View style={styles.benefitsGrid}>
        {serviceCards.map(service => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handleServicePress(service.id)}
            activeOpacity={0.8}
            style={[
              styles.benefitCard,
              { backgroundColor: service.backgroundColor },
            ]}
          >
            <Text style={styles.benefitTitle}>{service.title}</Text>
            <Text style={styles.benefitSubtitle}>{service.subtitle}</Text>
            {typeof service.icon === 'string' ? (
              <Text style={styles.benefitIcon}>{service.icon}</Text>
            ) : (
              <View style={styles.benefitIconContainer}>{service.icon}</View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
