import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteProduct } from '../../utils/storage';
import type { Product } from '../../types/Product';

interface ProductTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onProductDeleted: () => void;
}

export const ProductTable = ({ products, onEditProduct, onProductDeleted }: ProductTableProps) => {
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      onProductDeleted();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">£{product.price.toFixed(2)}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="p-1 hover:text-celtic-green"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};