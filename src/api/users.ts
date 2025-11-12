import { apiFetch } from './api-client';
import { UserListResponse, User, Gender } from '@/types/user';

export interface GetUsersParams {
  limit: number;
  skip: number;
  searchTerm?: string;
  genderFilter?: Gender | 'All'; 
}

export async function getUsers(params: GetUsersParams): Promise<UserListResponse> {
  const { limit, skip, searchTerm } = params;

  let endpoint: string;
  const fetchParams: Record<string, string | number> = {
    limit,
    skip,
  };

  if (searchTerm && searchTerm.trim() !== '') {
    endpoint = '/users/search';
    fetchParams.q = searchTerm.trim();
  } else {
    endpoint = '/users';
  }

  const response = await apiFetch<UserListResponse>(endpoint, fetchParams);
  
  return response;
}

export async function getUserById(id: number): Promise<User> {
  return apiFetch<User>(`/users/${id}`);
}