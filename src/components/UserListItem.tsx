import React from 'react';
import { User } from '@/types/user';

interface UserListItemProps {
  user: User;
  onUserClick: (user: User) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user, onUserClick }) => {
  const handleClick = () => {
    onUserClick(user);
  };

  return (
    <tr 
      className="border-b hover:bg-gray-50 cursor-pointer transition duration-150" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <td className="p-3 font-medium text-gray-900">
        {user.firstName} {user.lastName}
      </td>
      <td className="p-3 text-gray-700">{user.email}</td>
      <td className="p-3 text-gray-700 hidden sm:table-cell">{user.company?.name || 'N/A'}</td>
      <td className="p-3 text-gray-700 hidden md:table-cell">{user.phone}</td>
      <td className="p-3 text-gray-700 text-center">{user.age}</td>
    </tr>
  );
};