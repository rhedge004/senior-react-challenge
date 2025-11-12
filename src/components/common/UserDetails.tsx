import React from 'react';

export const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
    <div className="text-sm space-y-1">
      {children}
    </div>
  </div>
);

export const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-500">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);