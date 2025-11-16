import React, { createContext, useContext } from 'react';

import { useUserProfile } from '@/src/hooks/queries';
import type { UserProfile } from '@/src/types/profile';

interface UserProfileContextType {
  userProfile: UserProfile | undefined;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userProfile, isLoading } = useUserProfile();

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        isLoading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      'useUserProfileContext는 반드시 UserProfileProvider 내부에서 사용해야 합니다.'
    );
  }
  return context;
}
