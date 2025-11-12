import React from 'react';
import { Button } from './Button'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPrev,
  onNext,
}) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex items-center space-x-4">
      <Button 
        onClick={onPrev} 
        disabled={isFirstPage}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
      >
        Previous
      </Button>
      
      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button 
        onClick={onNext} 
        disabled={isLastPage}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
      >
        Next
      </Button>
      
      <span className="text-sm text-gray-500 hidden sm:block">
        ({totalItems} total items)
      </span>
    </div>
  );
};