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

export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Delivered';
  items: number;
}

export interface AuthSession {
  sessionToken: string | null;
  user: AuthUser | null;
  orders: Order[];
}

export interface LoginPayload {
  email?: string;
  phone?: string;
}
