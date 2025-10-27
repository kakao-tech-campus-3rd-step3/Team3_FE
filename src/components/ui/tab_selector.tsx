import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
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
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: 6,
    alignItems: 'center',
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
