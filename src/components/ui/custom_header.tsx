import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { theme } from '@/src/theme';

import { IconSymbol } from './icon_symbol';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <IconSymbol
        size={24}
        color={theme.colors.text.main}
        name="chevron.left"
      />
    </TouchableOpacity>
  );
};

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
      headerLeft: showBackButton ? BackButton : undefined,
    });
  }, [navigation, title, showBackButton]);

  return null;
};
