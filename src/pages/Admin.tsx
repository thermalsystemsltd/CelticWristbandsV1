import React, { useState, useEffect } from 'react';
import { ProductEditor } from '../components/admin/ProductEditor';
import { ProductTable } from '../components/admin/ProductTable';
import { AdminAuth } from '../components/admin/AdminAuth';
import { useAuth } from '../hooks/useAuth';
import { loadProducts } from '../utils/storage';
import type { Product } from '../types/Product';

export const Admin = () => {
  const { isAuthenticated } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const loadAllProducts = () => {
    setProducts(loadProducts());
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  if (!isAuthenticated) {
    return <AdminAuth />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductTable 
          products={products}
          onEditProduct={setSelectedProduct}
          onProductDeleted={loadAllProducts}
        />
        <ProductEditor 
          product={selectedProduct}
          onProductSaved={() => {
            loadAllProducts();
            setSelectedProduct(null);
          }}
        />
      </div>
    </div>
  );
};