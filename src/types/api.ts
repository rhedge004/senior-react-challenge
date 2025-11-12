export interface ApiError extends Error {
  name: string;
  message: string;
  statusCode?: number;
}

export type ApiQueryParams = Record<string, string | number>;

export type ApiFetcher = <T>(
  endpoint: string,
  params?: ApiQueryParams
) => Promise<T>;