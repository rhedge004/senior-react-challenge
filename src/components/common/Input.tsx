import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({ 
  className = '', 
  ...rest 
}) => {
  const baseClasses = 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150';

  return (
    <input
      className={`${baseClasses} ${className}`}
      {...rest}
    />
  );
};