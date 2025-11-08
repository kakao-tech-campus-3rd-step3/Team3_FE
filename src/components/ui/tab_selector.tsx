import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { theme } from '@/src/theme';

interface TabContextValue {
  selectedIndex: number;
  onSelect: (index: number) => void;
  getTabStyles: () => {
    paddingHorizontal: number;
    paddingVertical: number;
    fontSize: number;
    minFontSize: number;
  };
}

const TabContext = createContext<TabContextValue | null>(null);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within TabGroup');
  }
  return context;
};

const getTabStyles = (screenWidth: number) => {
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
};

interface TabGroupProps {
  defaultIndex?: number;
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children: React.ReactNode;
}

export const TabGroup: React.FC<TabGroupProps> = ({
  defaultIndex = 0,
  selectedIndex: controlledIndex,
  onChange,
  children,
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const screenWidth = Dimensions.get('window').width;

  const selectedIndex =
    controlledIndex !== undefined ? controlledIndex : internalIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (controlledIndex === undefined) {
        setInternalIndex(index);
      }
      onChange?.(index);
    },
    [controlledIndex, onChange]
  );

  const contextValue: TabContextValue = {
    selectedIndex,
    onSelect: handleSelect,
    getTabStyles: () => getTabStyles(screenWidth),
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};

interface TabListProps {
  children: React.ReactNode;
  style?: any;
}

export const TabList: React.FC<TabListProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

interface TabProps {
  index: number;
  disabled?: boolean;
  children:
    | React.ReactNode
    | ((props: { selected: boolean; hover: boolean }) => React.ReactNode);
}

export const Tab: React.FC<TabProps> = ({
  index,
  disabled = false,
  children,
}) => {
  const { selectedIndex, onSelect, getTabStyles } = useTabContext();
  const [hover, setHover] = useState(false);
  const selected = selectedIndex === index && !disabled;
  const tabStyles = getTabStyles();

  const handlePress = () => {
    if (!disabled) {
      onSelect(index);
    }
  };

  const renderContent = () => {
    if (typeof children === 'function') {
      return children({ selected, hover });
    }
    return children;
  };

  return (
    <TouchableOpacity
      style={[
        styles.tab,
        {
          paddingHorizontal: tabStyles.paddingHorizontal,
          paddingVertical: tabStyles.paddingVertical,
        },
        selected && styles.activeTab,
        disabled && styles.disabledTab,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      onPressIn={() => setHover(true)}
      onPressOut={() => setHover(false)}
    >
      {typeof renderContent() === 'string' ? (
        <Text
          style={[
            styles.tabText,
            { fontSize: tabStyles.fontSize },
            selected && styles.activeTabText,
            disabled && styles.disabledTabText,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={tabStyles.minFontSize / tabStyles.fontSize}
        >
          {renderContent() as string}
        </Text>
      ) : (
        renderContent()
      )}
    </TouchableOpacity>
  );
};

interface TabPanelsProps {
  children: React.ReactNode;
}

export const TabPanels: React.FC<TabPanelsProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface TabPanelProps {
  index: number;
  children:
    | React.ReactNode
    | ((props: { selected: boolean }) => React.ReactNode);
  static?: boolean;
  unmount?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  index,
  children,
  static: isStatic = false,
  unmount = true,
}) => {
  const { selectedIndex } = useTabContext();
  const selected = selectedIndex === index;

  if (isStatic) {
    return (
      <>{typeof children === 'function' ? children({ selected }) : children}</>
    );
  }

  if (unmount && !selected) {
    return null;
  }

  return (
    <View style={selected ? undefined : styles.hidden}>
      {typeof children === 'function' ? children({ selected }) : children}
    </View>
  );
};

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
  const activeIndex = tabs.findIndex(tab => tab.key === activeTab);

  return (
    <TabGroup
      selectedIndex={activeIndex >= 0 ? activeIndex : 0}
      onChange={index => onTabChange(tabs[index].key)}
    >
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={tab.key} index={index}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
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
  disabledTab: {
    opacity: 0.5,
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
  disabledTabText: {
    color: theme.colors.text.sub,
  },
  hidden: {
    display: 'none',
  },
});
