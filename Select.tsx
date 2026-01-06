import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
  boldLabel?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  placeholder = "Please Select", 
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
      <div className="relative">
        <select
          className={`w-full p-3 border-2 border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-blue-500 text-gray-900 text-[18px] ${className}`}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};