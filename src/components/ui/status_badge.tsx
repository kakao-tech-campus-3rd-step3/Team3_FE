import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { theme } from '@/src/theme';
import {
  EXTENDED_STATUS_LABELS,
  type ExtendedStatus,
} from '@/src/utils/status_labels';

interface StatusBadgeProps {
  status: ExtendedStatus;
  labelMap?: Partial<Record<ExtendedStatus, string>>;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

function getColors(status: ExtendedStatus) {
  switch (status) {
    case 'PENDING':
      return { base: theme.colors.warning };
    case 'APPROVED':
    case 'ACCEPTED':
      return { base: theme.colors.success };
    case 'REJECTED':
      return { base: theme.colors.error };
    case 'CANCELED':
    default:
      return { base: theme.colors.text.sub };
  }
}

const defaultLabelMap = EXTENDED_STATUS_LABELS;

export default function StatusBadge({
  status,
  labelMap,
  containerStyle,
  textStyle,
}: StatusBadgeProps) {
  const { base } = getColors(status);
  const label = (labelMap ?? defaultLabelMap)[status] ?? status;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: `${base}20`, borderColor: base },
        containerStyle,
      ]}
    >
      <Text style={[styles.text, { color: base }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
