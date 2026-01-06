import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FormData } from '../types';

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  // Initialize with empty object or load from localStorage
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem('horizon_registration_data');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load form data", e);
      return {};
    }
  });
  
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  // Save to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem('horizon_registration_data', JSON.stringify(formData));
    } catch (e) {
      console.error("Failed to save form data", e);
    }
  }, [formData]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, language, setLanguage }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};