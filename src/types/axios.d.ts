import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    authRequired?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    authRequired?: boolean;
  }
}
