import { View, Text, StyleSheet } from 'react-native';

import { theme } from '@/src/theme';
import { getSkillLevelBadgeStyle } from '@/src/utils/skill_level';

interface SkillLevelBadgeProps {
  skillLevel: string;
  style?: any;
  textStyle?: any;
}

export default function SkillLevelBadge({
  skillLevel,
  style,
  textStyle,
}: SkillLevelBadgeProps) {
  const badgeStyle = getSkillLevelBadgeStyle(skillLevel);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: badgeStyle.backgroundColor },
        style,
      ]}
    >
      <Text
        style={[styles.badgeText, { color: badgeStyle.textColor }, textStyle]}
      >
        {skillLevel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
