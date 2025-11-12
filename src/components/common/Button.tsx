import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  disabled = false, 
  ...rest 
}) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold transition duration-150 ease-in-out';
  
  const disabledClasses = disabled 
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    : 'bg-blue-500 hover:bg-blue-600 text-white';

  return (
    <button
      className={`${baseClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};