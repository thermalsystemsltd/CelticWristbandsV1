export interface ProductSize {
  size: 'Small' | 'Medium' | 'Large';
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  deity: string;
  month: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  imageFile?: File;
  materials: string[];
  dimensions: {
    width: number;
    length: number;
  };
  weight: number; // in grams
  sizes: ProductSize[];
}