import { theme } from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconSymbol } from './icon_symbol';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const CustomHeader = ({
  title,
  showBackButton = true,
}: CustomHeaderProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title,
      headerStyle: {
        backgroundColor: theme.colors.background.main,
      },
      headerTintColor: theme.colors.text.main,
      headerTitleStyle: {
        fontWeight: theme.typography.fontWeight.bold,
      },
      headerLeft: showBackButton
        ? () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: theme.spacing.spacing4 }}
            >
              <IconSymbol
                size={24}
                color={theme.colors.text.main}
                name="chevron.left"
              />
            </TouchableOpacity>
          )
        : undefined,
    });
  }, [navigation, title, showBackButton]);

  return null;
};
