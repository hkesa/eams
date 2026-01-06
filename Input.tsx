import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  boldLabel?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  boldLabel = true, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      {label && (
        <label className={`text-gray-900 ${boldLabel ? 'font-bold' : 'font-normal'}`}>
          {label}
        </label>
      )}
      <input
        className={`w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-400 text-[18px] ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};