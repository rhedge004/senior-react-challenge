import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers, GetUsersParams } from '@/api/users';
import { Gender, UserListResponse } from '@/types/user';

import { useDebounce } from './useDebounce'; 
import { ApiError } from 'next/dist/server/api-utils';

const PAGE_SIZE = 10;

interface UseUsersResult {
  data: UserListResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  isFetching: boolean;
  currentPage: number;
  searchTerm: string;
  genderFilter: Gender | 'All';
  setSearchTerm: (term: string) => void;
  setGenderFilter: (filter: Gender | 'All') => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  refetch: () => void; 
  totalPages: number;
}

export const useUsers = (): UseUsersResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<Gender | 'All'>('All');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const skip = (currentPage - 1) * PAGE_SIZE;
  
  const queryKey = ['users', { skip, limit: PAGE_SIZE, search: debouncedSearchTerm }];

  const params: GetUsersParams = {
    limit: PAGE_SIZE,
    skip: skip,
    searchTerm: debouncedSearchTerm,
    genderFilter: genderFilter,
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    UserListResponse,
    ApiError
  >({
    queryKey: queryKey,
    queryFn: () => getUsers(params),
    staleTime: 1000 * 60 * 5, 
    onSuccess: (responseData) => {
      if (debouncedSearchTerm) {
        if (data.skip !== skip) {
           setCurrentPage(1);
        }
      }
    }
  });

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  return {
    data,
    isLoading: isLoading && isFetching && currentPage === 1, 
    isError,
    error,
    isFetching,
    currentPage,
    searchTerm,
    genderFilter,
    setSearchTerm,
    setGenderFilter,
    goToNextPage,
    goToPrevPage,
    refetch: () => refetch(),
    totalPages,
  };
};