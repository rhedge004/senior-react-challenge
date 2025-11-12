'use client'; 

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/user';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Pagination } from '@/components/common/Pagination';
import { UserList } from '@/components/UserList';
import { UserDetailsDrawer } from '@/components/UserDetailsDrawer';


export default function UsersAdminPage() {
  const {
    data,
    isLoading,
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
    refetch,
    totalPages,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedUser(null), 300); 
  };
  

  if (isLoading && !isFetching) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <div className="loader mb-4"></div>
        <p className="text-xl text-gray-700">Loading Users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Users Admin</h1>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
          <p className="font-bold">Error fetching data:</p>
          <p>{error?.message || 'An unknown error occurred.'}</p>
          <Button onClick={refetch} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
            Retry Fetch
          </Button>
        </div>
      </div>
    );
  }

  const users = data?.users || [];
  const total = data?.total || 0;
  
  const filteredUsers = 
    genderFilter === 'All'
      ? users
      : users.filter(user => user.gender === genderFilter);

  const isSearchActive = searchTerm.trim().length > 0;
  if (filteredUsers.length === 0 && !isFetching && !isLoading && total === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Users Admin</h1>
        {isSearchActive ? (
          <div className="text-center p-10 border rounded">
            No results found for &quot;{searchTerm}&quot;. Please try a different search term.
          </div>
        ) : (
          <div className="text-center p-10 border rounded">
            No users available.
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e: { target: { value: string; }; }) => setSearchTerm(e.target.value)}
          aria-label="Search users"
          className="flex-grow"
        />
        
        <div role="group" aria-label="Gender filter">
          {['All', 'male', 'female'].map((filter) => (
            <Button
              key={filter}
              onClick={() => setGenderFilter(filter as 'All' | 'male' | 'female')}
              className={`p-2 border ${genderFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <UserList 
          users={filteredUsers} 
          onUserClick={handleUserClick} 
        />
        
        {isFetching && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center">
            <div className="loader mb-4"></div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNextPage}
          onPrev={goToPrevPage}
          totalItems={total}
        />
        <p className="text-sm text-gray-600">
            Showing page {currentPage} of {totalPages} total pages. ({total} total users)
        </p>
      </div>

      <UserDetailsDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}