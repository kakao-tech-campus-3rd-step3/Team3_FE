import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, View } from 'react-native';

import Card from '@/src/components/card/card';
import { styles } from '@/src/screens/home/home_style';
import { theme } from '@/src/theme';

export default memo(function WeatherSection() {
  return (
    <View style={styles.weatherSection}>
      <View style={styles.weatherHeader}>
        <Text style={styles.weatherSectionTitle}>
          강원도 춘천시의{' '}
          <Text style={styles.weatherHighlightText}>축구 날씨</Text>
        </Text>
      </View>

      <Card style={styles.weatherCard}>
        <View style={styles.weatherCardHeader}>
          <View style={styles.weatherInfo}>
            <View style={styles.weatherMain}>
              <Ionicons
                name="sunny"
                size={32}
                color={theme.colors.orange[500]}
              />
              <View style={styles.weatherDetails}>
                <Text style={styles.temperature}>22°C</Text>
                <Text style={styles.weatherDescription}>맑음</Text>
              </View>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStatItem}>
                <Ionicons
                  name="water"
                  size={16}
                  color={theme.colors.text.sub}
                />
                <Text style={styles.weatherStatText}>습도 65%</Text>
              </View>
              <View style={styles.weatherStatItem}>
                <Ionicons name="leaf" size={16} color={theme.colors.text.sub} />
                <Text style={styles.weatherStatText}>풍속 3.2m/s</Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherBadge}>
            <View style={styles.footballBadge}>
              <Text style={styles.footballBadgeText}>축구하기 좋은 날</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
});
