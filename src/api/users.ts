import { apiFetch } from './api-client';
import { UserListResponse, User, GetUsersParams } from '@/types/user';

export async function getUsers(params: GetUsersParams): Promise<UserListResponse> {
  const { limit, skip, searchTerm, genderFilter } = params;

  let endpoint: string;
  const fetchParams: Record<string, string | number> = {
    limit,
    skip,
  };

  if (searchTerm && searchTerm.trim() !== '') {
    endpoint = '/users/search';
    fetchParams.q = searchTerm.trim();
  } 
  else if (genderFilter && genderFilter !== 'All') {
    endpoint = '/users/filter';
    fetchParams.key = 'gender';
    fetchParams.value = genderFilter;
  } 
  else {
    endpoint = '/users';
  }

  const response = await apiFetch<UserListResponse>(endpoint, fetchParams);
  
  return response;
}

export async function getUserById(id: number): Promise<User> {
  return apiFetch<User>(`/users/${id}`);
}