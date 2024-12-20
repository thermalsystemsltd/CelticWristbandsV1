import React from 'react';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const PriceInput = ({ value, onChange }: PriceInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Remove non-numeric characters except decimal point
    const numericValue = rawValue.replace(/[^\d.]/g, '');
    
    // Ensure only two decimal places
    const parts = numericValue.split('.');
    if (parts[1]?.length > 2) {
      parts[1] = parts[1].slice(0, 2);
      const finalValue = parts.join('.');
      onChange(parseFloat(finalValue) || 0);
      return;
    }
    
    onChange(parseFloat(numericValue) || 0);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Price *</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
        <input
          type="text"
          value={value.toFixed(2)}
          onChange={handleChange}
          className="w-full pl-8 p-2 border rounded"
          placeholder="0.00"
          required
        />
      </div>
    </div>
  );
};