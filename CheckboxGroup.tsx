import React from 'react';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedValues?: string[];
  onChange: (values: string[]) => void;
  boldLabel?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues = [],
  onChange,
  boldLabel = true
}) => {
  const handleToggle = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

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
              selectedValues.includes(option)
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-[18px] text-gray-800">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};