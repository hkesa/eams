export const calculateCheckDigit = (num: number): number => {
  const lastDigit = num % 10;
  return (10 - lastDigit) % 10;
};

export const generateFileId = (sequence: number): string => {
  const checkDigit = calculateCheckDigit(sequence);
  return `A${sequence}${checkDigit}`;
};

export const formatDateForDisplay = (isoDate: string): string => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year}`;
};

export const calculateDaysDiff = (dateStr1: string, dateStr2: string): number | string => {
  if (!dateStr1 || !dateStr2) return '';
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};

export const calculateAge = (dateStr: string, birthDateStr: string): number | string => {
  if (!dateStr || !birthDateStr) return '';
  const d1 = new Date(dateStr);
  const d2 = new Date(birthDateStr);
  let age = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return parseFloat(age.toFixed(1));
};

export const exportToExcel = async (data: any[], fileName: string) => {
  const headers = Object.keys(data[0] || {}).join(",");
  const rows = data.map(obj => 
    Object.values(obj).map(val => 
      `"${String(val).replace(/"/g, '""')}"` 
    ).join(",")
  );
  
  const csvContent = "\uFEFF" + [headers, ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
