import { memo } from 'react';
import { Text, View } from 'react-native';
import { serviceCards } from '@/src/constants/serviceCards';
import styles from '../../home_style';

export default memo(function BenefitsSection() {
  return (
    <View style={styles.benefitsSection}>
      <View style={styles.benefitsHeader}>
        <Text style={styles.benefitsTitle}>축구 서비스</Text>
      </View>

      <View style={styles.benefitsGrid}>
        {serviceCards.map(service => (
          <View
            key={service.id}
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
          </View>
        ))}
      </View>
    </View>
  );
});
