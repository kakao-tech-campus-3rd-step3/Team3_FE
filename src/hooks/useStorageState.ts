import * as SecureStore from 'expo-secure-store';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

interface StorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export function useStorageState<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  const serialize = options?.serialize ?? ((value: T) => JSON.stringify(value));
  const deserialize =
    options?.deserialize ?? ((value: string) => JSON.parse(value) as T);

  useEffect(() => {
    isMounted.current = true;

    const loadStoredValue = async () => {
      if (!isMounted.current) {
        return;
      }

      try {
        const stored = await SecureStore.getItemAsync(key);

        if (stored !== null) {
          try {
            const parsed = deserialize(stored);
            setState(parsed);
          } catch {
            console.warn(`저장된 데이터가 손상되었습니다: ${key}`);
            setState(initialValue);
          }
        } else {
          setState(initialValue);
        }
      } catch (error) {
        console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);
        setState(initialValue);
      } finally {
        setIsLoading(false);
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
          await SecureStore.setItemAsync(key, serialize(state));
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
