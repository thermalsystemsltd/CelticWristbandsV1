import React, { useState, useEffect } from 'react';

interface MaterialsInputProps {
  materials: string[];
  onChange: (materials: string[]) => void;
}

export const MaterialsInput = ({ materials, onChange }: MaterialsInputProps) => {
  const [currentMaterial, setCurrentMaterial] = useState('');

  const addMaterial = () => {
    if (currentMaterial.trim()) {
      onChange([...materials, currentMaterial.trim()]);
      setCurrentMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    onChange(materials.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMaterial();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-1">Materials *</label>
      
      <div className="flex gap-2 flex-wrap mb-2">
        {materials.map((material, index) => (
          <span 
            key={index}
            className="bg-celtic-green/10 px-2 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {material}
            <button
              type="button"
              onClick={() => removeMaterial(index)}
              className="text-celtic-green hover:text-celtic-brown"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={currentMaterial}
          onChange={(e) => setCurrentMaterial(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a material and press Enter"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="button"
          onClick={addMaterial}
          className="px-4 py-2 bg-celtic-green text-celtic-gold rounded hover:bg-celtic-brown transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};