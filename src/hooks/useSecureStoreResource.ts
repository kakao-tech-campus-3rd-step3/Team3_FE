import * as SecureStore from 'expo-secure-store';

interface Resource<T> {
  read(): T;
}

interface PendingResource<T> {
  status: 'pending';
  promise: Promise<T>;
}

interface ResolvedResource<T> {
  status: 'resolved';
  data: T;
}

interface RejectedResource {
  status: 'rejected';
  error: Error;
}

type ResourceState<T> =
  | PendingResource<T>
  | ResolvedResource<T>
  | RejectedResource;

const resourceCache = new Map<string, ResourceState<unknown>>();

function getResourceState<T>(key: string): ResourceState<T> | undefined {
  return resourceCache.get(key) as ResourceState<T> | undefined;
}

function setResourceState<T>(key: string, state: ResourceState<T>) {
  resourceCache.set(key, state);
}

function createSecureStoreResource<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): Resource<T> {
  const deserialize =
    options?.deserialize ?? ((value: string) => JSON.parse(value) as T);

  const cached = getResourceState<T>(key);

  if (cached) {
    if (cached.status === 'resolved') {
      return {
        read: () => cached.data,
      };
    }

    if (cached.status === 'rejected') {
      throw cached.error;
    }

    throw cached.promise;
  }

  const promise = SecureStore.getItemAsync(key)
    .then(stored => {
      let result: T;

      if (stored !== null) {
        try {
          result = deserialize(stored);
        } catch {
          console.warn(`저장된 데이터가 손상되었습니다: ${key}`);
          result = initialValue;
        }
      } else {
        result = initialValue;
      }

      setResourceState<T>(key, {
        status: 'resolved',
        data: result,
      });

      return result;
    })
    .catch(error => {
      console.error(`데이터를 불러올 수 없습니다: ${key}:`, error);

      setResourceState<T>(key, {
        status: 'rejected',
        error: new Error(`Failed to load ${key}: ${error.message}`),
      });

      throw error;
    });

  setResourceState<T>(key, {
    status: 'pending',
    promise,
  });

  return {
    read: () => {
      throw promise;
    },
  };
}

export function createTokenResource() {
  return createSecureStoreResource<string | null>('authToken', null, {
    serialize: value => value ?? '',
    deserialize: value => (value === '' ? null : value),
  });
}

export function createRefreshTokenResource() {
  return createSecureStoreResource<string | null>('refreshToken', null, {
    serialize: value => value ?? '',
    deserialize: value => (value === '' ? null : value),
  });
}

export async function updateSecureStoreResource<T>(
  key: string,
  value: T,
  serialize?: (value: T) => string
): Promise<void> {
  const cached = getResourceState<T>(key);
  if (cached) {
    setResourceState<T>(key, {
      status: 'resolved',
      data: value,
    });
  }

  const serializeFn = serialize ?? ((val: T) => JSON.stringify(val));
  try {
    await SecureStore.setItemAsync(key, serializeFn(value));
  } catch (error) {
    console.error(`데이터 저장 실패: ${key}:`, error);
    throw error;
  }
}

export async function deleteSecureStoreResource(key: string): Promise<void> {
  resourceCache.delete(key);
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`데이터 삭제 실패: ${key}:`, error);
    throw error;
  }
}
