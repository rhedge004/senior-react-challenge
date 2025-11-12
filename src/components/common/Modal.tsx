import React, { useEffect, useRef } from 'react';
import { User } from '@/types/user';
import { Button } from './Button';
import { DetailSection, DetailItem } from './UserDetails';

interface ModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ user, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 backdrop flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} 
        className={`bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        tabIndex={-1}
        aria-labelledby="user-details-title"
      >
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 id="user-details-title" className="text-2xl font-bold">
            {user.firstName} {user.lastName}&apos;s Details
          </h2>
          <Button 
            onClick={onClose} 
            className="cursor-pointer"
            aria-label="Close user details"
          >
            &times;
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          <DetailSection title="Contact Information">
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={user.phone} />
            <DetailItem label="Username" value={user.username} />
          </DetailSection>

          <DetailSection title="Personal Information">
            <DetailItem label="Age" value={String(user.age)} />
            <DetailItem label="Gender" value={user.gender} />
            {user.maidenName && <DetailItem label="Maiden Name" value={user.maidenName} />}
          </DetailSection>

          {user.company && (
            <DetailSection title="Employment">
              <DetailItem label="Company" value={user.company.name} />
              <DetailItem label="Title" value={user.company.title} />
              <DetailItem label="Department" value={user.company.department} />
            </DetailSection>
          )}

          {user.address && (
            <DetailSection title="Address">
              <p className="text-gray-700">
                {user.address.address}, {user.address.city}, {user.address.state} {user.address.postalCode}
              </p>
            </DetailSection>
          )}
        </div>
      </div>
    </div>
  );
};