import { ApiError, ApiFetcher, ApiQueryParams } from "@/types/api";

const BASE_URL = 'https://dummyjson.com';

export const apiFetch: ApiFetcher = async <T>(
  endpoint: string,
  params?: ApiQueryParams 
): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, String(params[key]));
    });
  }

  const response = await fetch(url.toString());

    if (!response.ok) {
    const error: ApiError = {
      name: 'ApiFetchError',
      message: `HTTP error! status: ${response.status} - ${response.statusText}`,
      statusCode: response.status,
    };
    throw error;
  }

  return response.json() as Promise<T>;
}