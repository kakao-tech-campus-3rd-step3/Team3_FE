import * as SecureStore from 'expo-secure-store';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export function useStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const stored = await SecureStore.getItemAsync(key);
        if (stored !== null) {
          try {
            setState(JSON.parse(stored) as T);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: ${key}`);
          }
        }
      } catch (error) {
        console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  useEffect(() => {
    const saveValue = async () => {
      try {
        if (state === undefined || state === null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, JSON.stringify(state));
        }
      } catch (error) {
        console.error(`데이터 저장 실패: ${key}:`, error);
      }
    };

    if (!isLoading) {
      saveValue();
    }
  }, [key, state, isLoading]);

  return [state, setState, isLoading];
}
