import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string; 
}

export const Switch: React.FC<SwitchProps> = ({ label, checked, onChange, id }) => {
  const switchId = id || `switch-${label.replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center space-x-2">
      <label 
        htmlFor={switchId} 
        className="text-gray-700 select-none font-medium cursor-pointer"
      >
        {label}
      </label>
      <div 
        className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition duration-200 ease-in-out ${
          checked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        <input
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only" 
        />
        <span
          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition duration-200 ease-in-out ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};