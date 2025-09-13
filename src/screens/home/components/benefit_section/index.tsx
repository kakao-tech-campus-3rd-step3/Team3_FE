import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { serviceCards } from '@/src/constants/service_card';
import styles from '@/src/screens/home/home_style';
import { useRouter } from 'expo-router';

export default memo(function BenefitsSection() {
  const router = useRouter();
  const handleServicePress = (serviceId: number) => {
    if (serviceId === 1) {
      router.push('/tournament');
    } else if (serviceId === 2) {
      router.push('/mercenary');
    } else if (serviceId === 3) {
      router.push('/team/guide');
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
