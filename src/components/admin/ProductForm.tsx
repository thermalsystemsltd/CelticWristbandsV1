import React, { useState, useEffect } from 'react';
import { ImageUpload } from './ImageUpload';
import { SizeQuantityManager } from './SizeQuantityManager';
import { MaterialsInput } from './MaterialsInput';
import { PriceInput } from './PriceInput';
import type { Product, ProductSize } from '../../types/Product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
}

export const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    deity: '',
    month: '',
    description: '',
    shortDescription: '',
    price: 0,
    image: '',
    materials: [],
    dimensions: { width: 0, length: 0 },
    weight: 0,
    sizes: [
      { size: 'Small', quantity: 0 },
      { size: 'Medium', quantity: 0 },
      { size: 'Large', quantity: 0 }
    ]
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('dimensions.')) {
      const dimension = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: value === '' ? 0 : parseFloat(value)
        }
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageSelected = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ 
      ...prev, 
      image: imageUrl,
      imageFile: file
    }));
  };

  const handleSizesChange = (sizes: ProductSize[]) => {
    setFormData(prev => ({ ...prev, sizes }));
  };

  const handleMaterialsChange = (materials: string[]) => {
    setFormData(prev => ({ ...prev, materials }));
  };

  const handlePriceChange = (price: number) => {
    setFormData(prev => ({ ...prev, price }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.materials?.length) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deity</label>
        <input
          type="text"
          name="deity"
          value={formData.deity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Month</label>
        <input
          type="text"
          name="month"
          value={formData.month}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 border rounded"
        />
      </div>

      <PriceInput 
        value={formData.price || 0} 
        onChange={handlePriceChange}
      />

      <MaterialsInput
        materials={formData.materials || []}
        onChange={handleMaterialsChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width (cm)</label>
          <input
            type="number"
            name="dimensions.width"
            value={formData.dimensions?.width}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Length (cm)</label>
          <input
            type="number"
            name="dimensions.length"
            value={formData.dimensions?.length}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Weight (g)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          step="0.1"
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>

      <ImageUpload
        currentImage={formData.image}
        onImageSelected={handleImageSelected}
      />

      <SizeQuantityManager
        sizes={formData.sizes || []}
        onChange={handleSizesChange}
      />

      <button
        type="submit"
        className="w-full bg-celtic-green text-celtic-gold py-2 px-4 rounded hover:bg-celtic-brown transition-colors"
      >
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};