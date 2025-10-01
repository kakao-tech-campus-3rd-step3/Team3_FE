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

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', data: body });
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
