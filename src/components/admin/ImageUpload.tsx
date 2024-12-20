import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageSelected: (file: File) => void;
}

export const ImageUpload = ({ currentImage, onImageSelected }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-1">Product Image</label>
      
      {currentImage && (
        <img 
          src={currentImage} 
          alt="Product preview" 
          className="w-32 h-32 object-cover rounded-lg mb-2"
        />
      )}
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-celtic-green/30 rounded-lg p-4 text-center cursor-pointer hover:border-celtic-green/50 transition-colors"
      >
        <Upload className="w-6 h-6 mx-auto mb-2 text-celtic-green" />
        <p className="text-sm text-gray-600">Click to upload image</p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};