import React from 'react';

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  boldLabel?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  boldLabel = true
}) => {
  return (
    <div className="flex flex-col gap-3 w-full mb-6">
      <label className={`text-gray-900 ${boldLabel ? 'font-bold' : 'font-normal'}`}>
        {label}
      </label>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label 
            key={option} 
            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
              value === option 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[18px] text-gray-800">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};