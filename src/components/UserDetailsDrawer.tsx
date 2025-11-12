import React, { useEffect, useRef } from 'react';
import { User } from '@/types/user';
import { Button } from './common/Button';

interface UserDetailsDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({ 
  user, 
  isOpen, 
  onClose 
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();

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
  if (!isOpen) {
    return null;
  }
  
  if (!user) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      onClick={onClose} 
    >
      <div 
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()} 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl p-6 overflow-y-auto 
          transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        tabIndex={-1} 
        aria-labelledby="user-details-title"
      >
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 id="user-details-title" className="text-2xl font-bold">
            {user.firstName} {user.lastName}&apos;s Details
          </h2>
          <Button 
            onClick={onClose} 
            className="p-1 bg-transparent hover:bg-gray-100 text-gray-500"
            aria-label="Close user details"
          >
            &times;
          </Button>
        </div>

        <div className="space-y-4">
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

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
    <div className="text-sm space-y-1">
      {children}
    </div>
  </div>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-500">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);