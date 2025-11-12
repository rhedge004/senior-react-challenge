import React from 'react';
import { User } from '@/types/user';
import { UserListItem } from './UserListItem';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Company
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
              Phone
            </th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserListItem 
              key={user.id} 
              user={user} 
              onUserClick={onUserClick} 
            />
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No users to display.
        </div>
      )}
    </div>
  );
};