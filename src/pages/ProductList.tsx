import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { loadProducts } from '../utils/storage';

export const ProductList = () => {
  const products = loadProducts();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">Celtic Deity Wristbands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};