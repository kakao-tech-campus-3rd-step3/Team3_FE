import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  Userid: string;
  email: string;
  universityEmail: string;
  name: string;
  university: string;
  studentYear: string;
  phoneNumber?: string | null;
  department?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  getAuthToken: () => Promise<string | null>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const restoreUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("사용자 정보 복원 실패:", error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (userData: User) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  const getAuthToken = async (): Promise<string | null> => {
    try {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        const parsedUser = JSON.parse(stored);
        return parsedUser?.authToken || null;
      }
      return null;
    } catch (error) {
      console.error("인증 토큰을 가져오는 중 오류 발생:", error);
      return null;
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isInitialized,
    login,
    logout,
    setUser: updateUser,
    getAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내에서만 사용해야 합니다");
  }
  return context;
};
