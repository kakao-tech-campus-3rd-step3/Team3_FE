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
    if (!this.token && this.isAuthRequiredEndpoint(endpoint)) {
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

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401 && this.onTokenExpired) {
          const isTeamDeleteRequest =
            endpoint.includes('/api/teams/') && options.method === 'DELETE';
          if (!isTeamDeleteRequest) {
            this.onTokenExpired();
          } else {
            console.log(
              '[API Client] 팀 삭제 요청이므로 토큰 만료 처리 건너뜀'
            );
          }
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
