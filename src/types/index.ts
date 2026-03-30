export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  volume: string;
  features: string[];
  gallery?: string[];
  detailedDescription?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
