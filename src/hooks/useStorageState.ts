import * as SecureStore from 'expo-secure-store';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

export function useStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const loadStoredValue = async () => {
      try {
        const stored = await SecureStore.getItemAsync(key);
        if (stored !== null) {
          try {
            const parsed = JSON.parse(stored) as T;
            if (isMounted.current) setState(parsed);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: ${key}`);
            if (isMounted.current) setState(initialValue);
          }
        } else {
          if (isMounted.current) setState(initialValue);
        }
      } catch (error) {
        console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);
        if (isMounted.current) setState(initialValue);
      } finally {
        if (isMounted.current) setIsLoading(false);
      }
    };

    loadStoredValue();
    return () => {
      isMounted.current = false;
    };
  }, [key, initialValue]);

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
