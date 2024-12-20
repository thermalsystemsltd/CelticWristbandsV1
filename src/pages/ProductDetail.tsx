import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { loadProducts } from '../utils/storage';
import { PayPalPayment } from '../components/payments/PayPalPayment';
import { StripePayment } from '../components/payments/StripePayment';

export const ProductDetail = () => {
  const { id } = useParams();
  const products = loadProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const handlePaymentSuccess = (details: any) => {
    console.log('Transaction completed by', details.payer.name.given_name);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-900">£{product.price.toFixed(2)}</p>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">About this piece</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Materials</h2>
            <ul className="list-disc list-inside">
              {product.materials.map(material => (
                <li key={material}>{material}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Dimensions</h2>
            <p>Width: {product.dimensions.width}cm</p>
            <p>Length: {product.dimensions.length}cm</p>
          </div>
          
          <div className="space-y-4">
            <StripePayment 
              amount={product.price} 
              onSuccess={() => console.log('Stripe payment successful')} 
            />
            <PayPalPayment 
              amount={product.price} 
              onSuccess={handlePaymentSuccess} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};