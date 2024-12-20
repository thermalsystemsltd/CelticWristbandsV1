import React from 'react';
import type { ProductSize } from '../../types/Product';

interface SizeQuantityManagerProps {
  sizes: ProductSize[];
  onChange: (sizes: ProductSize[]) => void;
}

export const SizeQuantityManager = ({ sizes, onChange }: SizeQuantityManagerProps) => {
  const updateQuantity = (size: 'Small' | 'Medium' | 'Large', quantity: number) => {
    const newSizes = sizes.map(s => 
      s.size === size ? { ...s, quantity } : s
    );
    onChange(newSizes);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-1">Size & Quantity</label>
      <div className="grid grid-cols-3 gap-4">
        {['Small', 'Medium', 'Large'].map((size) => {
          const sizeData = sizes.find(s => s.size === size) || { size, quantity: 0 };
          return (
            <div key={size} className="space-y-2">
              <label className="block text-sm text-gray-600">{size}</label>
              <input
                type="number"
                min="0"
                value={sizeData.quantity}
                onChange={(e) => updateQuantity(size as 'Small' | 'Medium' | 'Large', parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};