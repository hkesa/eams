export interface FileRecord {
  id: string; // The full ID like A5100
  sequence: number; // The raw sequence like 510
  [key: string]: string | number; // Allow dynamic access for the 100+ columns
}

export type TabId = 
  | 'files'
  | 'receipts'
  | 'labour'
  | 'passport'
  | 'visa'
  | 'contract'
  | 'insurance';

export interface ColumnDefinition {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select';
  options?: string[]; // For select types
  allowCustom?: boolean; // For "Other" text input
  width?: string;
}