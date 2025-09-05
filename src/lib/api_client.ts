import config from '@/src/config/environment';
import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

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

  constructor(baseURL: string) {
    this.baseURL = baseURL;
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
          ...options.headers,
        },
      });

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
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
    return this.request<T>(endpoint, {
      method: 'POST',
      data: body,
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      data: body,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(config.API_BASE_URL);
