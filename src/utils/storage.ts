import { Product } from '../types/Product';
import { products as initialProducts } from '../data/products';

const uploadImage = async (file: File): Promise<string> => {
  // In a real application, this would upload to a server/CDN
  // For now, we'll create an object URL
  return URL.createObjectURL(file);
};

export const loadProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : initialProducts.map(p => ({
    ...p,
    weight: 0,
    sizes: [
      { size: 'Small', quantity: 0 },
      { size: 'Medium', quantity: 0 },
      { size: 'Large', quantity: 0 }
    ]
  }));
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const updateProduct = async (updatedProduct: Product) => {
  if (updatedProduct.imageFile) {
    updatedProduct.image = await uploadImage(updatedProduct.imageFile);
    delete updatedProduct.imageFile;
  }

  const products = loadProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
  }
};

export const addProduct = async (product: Product) => {
  if (product.imageFile) {
    product.image = await uploadImage(product.imageFile);
    delete product.imageFile;
  }

  const products = loadProducts();
  saveProducts([...products, { ...product, id: crypto.randomUUID() }]);
};

export const deleteProduct = (id: string) => {
  const products = loadProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  saveProducts(filteredProducts);
};