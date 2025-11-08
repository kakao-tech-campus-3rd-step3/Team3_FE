import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconSymbol } from '@/src/components/ui/icon_symbol';
import { theme } from '@/src/theme';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const CustomHeader = ({
  title,
  showBackButton = true,
}: CustomHeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {showBackButton ? (
          <>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <IconSymbol
                size={24}
                color={theme.colors.text.main}
                name="chevron.left"
              />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightSpacer} />
          </>
        ) : (
          <Text style={styles.titleCentered}>{title}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing5,
    paddingVertical: theme.spacing.spacing2,
    minHeight: 32,
  },
  backButton: {
    padding: theme.spacing.spacing2,
    marginLeft: -theme.spacing.spacing2,
  },
  title: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.spacing4,
  },
  titleCentered: {
    fontSize: theme.typography.fontSize.font6,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.main,
    textAlign: 'center',
    flex: 1,
  },
  rightSpacer: {
    width: 40,
  },
});
