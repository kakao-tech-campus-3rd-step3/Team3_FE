import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { theme } from '@/src/theme';

interface TabSelectorProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const screenWidth = Dimensions.get('window').width;

  const tabStyles = useMemo(() => {
    if (screenWidth < 360) {
      return {
        paddingHorizontal: theme.spacing.spacing2,
        paddingVertical: theme.spacing.spacing2,
        fontSize: 11,
        minFontSize: 9,
      };
    } else if (screenWidth < 400) {
      return {
        paddingHorizontal: theme.spacing.spacing3,
        paddingVertical: theme.spacing.spacing2,
        fontSize: 12,
        minFontSize: 10,
      };
    }
    return {
      paddingHorizontal: theme.spacing.spacing4,
      paddingVertical: theme.spacing.spacing3,
      fontSize: 14,
      minFontSize: 12,
    };
  }, [screenWidth]);

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            {
              paddingHorizontal: tabStyles.paddingHorizontal,
              paddingVertical: tabStyles.paddingVertical,
            },
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              { fontSize: tabStyles.fontSize },
              activeTab === tab.key && styles.activeTabText,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={tabStyles.minFontSize / tabStyles.fontSize}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.sub,
    borderRadius: 8,
    padding: 4,
    marginHorizontal: theme.spacing.spacing6,
    marginVertical: theme.spacing.spacing4,
  },
  tab: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  activeTab: {
    backgroundColor: theme.colors.background.main,
    shadowColor: theme.colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  activeTabText: {
    color: theme.colors.text.main,
    fontWeight: '600',
  },
});
