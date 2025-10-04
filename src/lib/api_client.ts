import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

import config from '@/src/config/environment';

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
  private baseURL: string;
  private token: string | null = null;
  private onTokenExpired?: () => void;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setOnTokenExpired(callback: () => void) {
    this.onTokenExpired = callback;
  }

  private async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    console.log('🌐 ApiClient: API 요청 시작', {
      endpoint,
      method: options.method || 'GET',
      hasToken: !!this.token,
    });

    if (!this.token && this.isAuthRequiredEndpoint(endpoint)) {
      console.log('❌ ApiClient: 토큰 없음, 인증 필요', { endpoint });
      this.onTokenExpired?.();
      throw new ApiError('Authentication required', 401);
    }

    try {
      const response: AxiosResponse<T> = await axios({
        ...options,
        url: endpoint,
        baseURL: this.baseURL,
        headers: {
          'Content-Type': 'application/json',
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
          ...options.headers,
        },
      });

      console.log('✅ ApiClient: API 요청 성공', {
        endpoint,
        status: response.status,
      });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        console.log('❌ ApiClient: API 요청 실패', {
          endpoint,
          status: error.response.status,
          statusText: error.response.statusText,
        });

        if (error.response.status === 401 && this.onTokenExpired) {
          console.log('🚨 ApiClient: 401 에러 발생, 토큰 만료 처리', {
            endpoint,
          });
          this.onTokenExpired();
        }

        const errorData = error.response.data || {};

        const errorMessage =
          errorData.data &&
          typeof errorData.data === 'object' &&
          'message' in errorData.data
            ? String(errorData.data.message)
            : typeof errorData.message === 'string'
              ? errorData.message
              : error.response.statusText;

        throw new ApiError(errorMessage, error.response.status, errorData);
      }
      throw error;
    }
  }

  private isAuthRequiredEndpoint(endpoint: string): boolean {
    const authRequiredEndpoints = [
      '/api/profiles',
      '/api/teams',
      '/api/matches',
      '/recommendedMatch',
    ];

    return authRequiredEndpoints.some(path => endpoint.includes(path));
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      data: body,
      ...options,
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', data: body });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', data: body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(config.API_BASE_URL);
