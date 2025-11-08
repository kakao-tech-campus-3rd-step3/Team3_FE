import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ROUTES, getTeamManagementUrl } from '@/src/constants/routes';
import { serviceCards } from '@/src/constants/service_card';
import { useUserProfile } from '@/src/hooks/queries';
import { styles } from '@/src/screens/home/home_style';

interface BenefitsSectionProps {
  teamId: number | null;
}

export default memo(function BenefitsSection({ teamId }: BenefitsSectionProps) {
  const router = useRouter();
  const { data: userProfile } = useUserProfile();

  const currentTeamId = userProfile?.teamId || teamId;

  const handleServicePress = (serviceId: string) => {
    if (serviceId === 'team') {
      if (currentTeamId) {
        router.push(getTeamManagementUrl(currentTeamId));
      } else {
        router.push(ROUTES.TEAM_GUIDE);
      }
      return;
    }

    if (serviceId === 'mercenary') {
      router.push(ROUTES.MERCENARY);
      return;
    }

    const routeMap: Record<string, string> = {
      tournament: ROUTES.TOURNAMENT,
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
