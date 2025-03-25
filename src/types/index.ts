
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  profilePicture?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  inStock: boolean;
  discount?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface SalesReport {
  date: string;
  totalSales: number;
  productsSold: number;
  topSellingProducts: {
    productId: string;
    productName: string;
    quantity: number;
  }[];
}
