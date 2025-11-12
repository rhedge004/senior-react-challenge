export type Gender = 'male' | 'female';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: Gender; 
  email: string;
  phone: string;
  username: string;
  image?: string;
  company?: {
    name: string; 
    department: string;
    title: string;
  };
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface UserListResponse {
  users: User[]; 
  total: number | null;
  skip: number;
  limit: number;
}

export interface GetUsersParams {
  limit: number;
  skip: number;
  searchTerm?: string;
  genderFilter?: Gender | 'All'; 
}
