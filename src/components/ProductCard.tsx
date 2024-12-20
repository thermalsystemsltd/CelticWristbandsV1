import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-celtic-gold/20">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-celtic-green">{product.name}</h3>
        <p className="text-celtic-brown mb-2">{product.deity} - {product.month}</p>
        <p className="text-gray-700 mb-4">{product.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">£{product.price.toFixed(2)}</span>
          <Link 
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-2 bg-celtic-green text-celtic-gold px-4 py-2 rounded-md hover:bg-celtic-brown transition-colors duration-300"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};