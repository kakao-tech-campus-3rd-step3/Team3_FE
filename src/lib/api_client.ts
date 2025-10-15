import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  isAxiosError,
} from 'axios';

import config from '@/src/config/environment';

function extractErrorMessage(response: any): string {
  const data = response?.data ?? response;

  if (data?.data && typeof data.data === 'object' && 'message' in data.data) {
    return String(data.data.message);
  }

  if (typeof data?.message === 'string') {
    return data.message;
  }

  if (typeof data?.error === 'string') {
    return data.error;
  }

  if (typeof response?.statusText === 'string') {
    return response.statusText;
  }

  return 'Unknown error';
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private axios: AxiosInstance;
  private token: string | null = null;
  private refreshPromise: Promise<void> | null = null;
  private onTokenExpired?: () => Promise<void>;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });

    this.axios.interceptors.request.use(config => {
      if (this.token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${this.token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !original?._retry) {
          original._retry = true;

          if (!this.refreshPromise) {
            if (!this.onTokenExpired) {
              return Promise.reject(error);
            }
            this.refreshPromise = this.onTokenExpired().finally(() => {
              this.refreshPromise = null;
            });
          }

          try {
            await this.refreshPromise;
            original.headers = original.headers || {};
            if (this.token) {
              original.headers['Authorization'] = `Bearer ${this.token}`;
            }
            return this.axios(original);
          } catch (refreshError) {
            console.warn('[API Client] 토큰 갱신 실패:', refreshError);
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setOnTokenExpired(callback: () => Promise<void>) {
    this.onTokenExpired = callback;
  }

  private async request<T>(
    endpoint: string,
    options: AxiosRequestConfig & { authRequired?: boolean } = {}
  ): Promise<T> {
    const { authRequired, ...axiosOptions } = options;

    const finalHeaders: Record<string, any> = {
      'Content-Type': 'application/json',
      ...axiosOptions.headers,
    };

    if (authRequired === false) {
      delete finalHeaders['Authorization'];
    }

    try {
      const response: AxiosResponse<T> = await this.axios({
        ...axiosOptions,
        url: endpoint,
        headers: finalHeaders,
      });

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = extractErrorMessage(error.response);
        const errorData = error.response.data || {};

        throw new ApiError(errorMessage, error.response.status, errorData);
      }
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    options?: AxiosRequestConfig & { authRequired?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, options);
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options?: AxiosRequestConfig & { authRequired?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      data: body,
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    options?: AxiosRequestConfig & { authRequired?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', data: body, ...options });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: AxiosRequestConfig & { authRequired?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      data: body,
      ...options,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: AxiosRequestConfig & { authRequired?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

export const apiClient = new ApiClient(config.API_BASE_URL);
