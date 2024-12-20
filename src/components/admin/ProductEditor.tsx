import React from 'react';
import { ProductForm } from './ProductForm';
import { addProduct, updateProduct } from '../../utils/storage';
import type { Product } from '../../types/Product';

interface ProductEditorProps {
  product: Product | null;
  onProductSaved: () => void;
}

export const ProductEditor = ({ product, onProductSaved }: ProductEditorProps) => {
  const handleSubmit = (productData: Partial<Product>) => {
    if (product) {
      updateProduct({ ...product, ...productData } as Product);
    } else {
      addProduct(productData as Product);
    }
    onProductSaved();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>
      <ProductForm product={product} onSubmit={handleSubmit} />
    </div>
  );
};