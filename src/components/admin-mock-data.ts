import { Product, SalesReport } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Casual Shirt",
    description: "Comfortable cotton casual shirt for everyday wear",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    tags: ["casual", "men", "shirt"],
    inStock: true,
    discount: 5
  },
  {
    id: "2",
    name: "Formal Blazer",
    description: "Premium formal blazer for professional settings",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    tags: ["formal", "men", "blazer"],
    inStock: true
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable athletic sneakers for all-day wear",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    category: "Footwear",
    tags: ["casual", "shoes", "sports"],
    inStock: true,
    discount: 10
  },
  {
    id: "4",
    name: "Denim Jeans",
    description: "Classic denim jeans with modern fit",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    tags: ["casual", "men", "women", "jeans"],
    inStock: false
  },
  {
    id: "5",
    name: "Summer Dress",
    description: "Light and airy summer dress for warm weather",
    price: 45.99,
    imageUrl: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    tags: ["casual", "women", "summer"],
    inStock: true
  },
  {
    id: "6",
    name: "Leather Wallet",
    description: "Premium handcrafted leather wallet with multiple compartments",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    tags: ["leather", "men", "women", "wallet"],
    inStock: true
  },
  {
    id: "7",
    name: "Smart Watch",
    description: "Latest technology smartwatch with health monitoring features",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    tags: ["smart", "watch", "gadget", "fitness"],
    inStock: true,
    discount: 15
  },
  {
    id: "8",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with premium sound quality",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    tags: ["audio", "wireless", "headphones"],
    inStock: true
  },
  {
    id: "9",
    name: "Designer Sunglasses",
    description: "Stylish designer sunglasses with UV protection",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    tags: ["sunglasses", "fashion", "summer"],
    inStock: true,
    discount: 20
  },
  {
    id: "10",
    name: "Yoga Mat",
    description: "Eco-friendly non-slip yoga mat for indoor and outdoor use",
    price: 35.99,
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b352f6d1?auto=format&fit=crop&w=800&q=80",
    category: "Fitness",
    tags: ["yoga", "fitness", "exercise"],
    inStock: true
  },
  {
    id: "11",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    category: "Home",
    tags: ["kitchen", "appliance", "coffee"],
    inStock: true
  },
  {
    id: "12",
    name: "Leather Jacket",
    description: "Classic leather jacket with modern styling",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    tags: ["leather", "jacket", "outerwear"],
    inStock: true,
    discount: 10
  }
];

export const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", isAdmin: false, orders: 5, lastActive: "2023-07-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", isAdmin: false, orders: 12, lastActive: "2023-07-20" },
  { id: "3", name: "Admin User", email: "admin@example.com", isAdmin: true, orders: 0, lastActive: "2023-07-22" },
];

export const mockSalesReports: SalesReport[] = [
  {
    date: "2023-07-16",
    totalSales: 1250.75,
    productsSold: 18,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 5 },
      { productId: "2", productName: "Formal Blazer", quantity: 3 },
      { productId: "3", productName: "Sneakers", quantity: 4 }
    ]
  },
  {
    date: "2023-07-17",
    totalSales: 980.50,
    productsSold: 15,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 6 },
      { productId: "1", productName: "Casual Shirt", quantity: 4 },
      { productId: "2", productName: "Formal Blazer", quantity: 2 }
    ]
  },
  {
    date: "2023-07-18",
    totalSales: 1350.25,
    productsSold: 22,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 8 },
      { productId: "3", productName: "Sneakers", quantity: 7 },
      { productId: "2", productName: "Formal Blazer", quantity: 4 }
    ]
  },
  {
    date: "2023-07-19",
    totalSales: 875.60,
    productsSold: 14,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 5 },
      { productId: "2", productName: "Formal Blazer", quantity: 4 },
      { productId: "1", productName: "Casual Shirt", quantity: 3 }
    ]
  },
  {
    date: "2023-07-20",
    totalSales: 1420.30,
    productsSold: 24,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 9 },
      { productId: "3", productName: "Sneakers", quantity: 8 },
      { productId: "2", productName: "Formal Blazer", quantity: 5 }
    ]
  },
  {
    date: "2023-07-21",
    totalSales: 1050.75,
    productsSold: 17,
    topSellingProducts: [
      { productId: "3", productName: "Sneakers", quantity: 7 },
      { productId: "1", productName: "Casual Shirt", quantity: 6 },
      { productId: "2", productName: "Formal Blazer", quantity: 3 }
    ]
  },
  {
    date: "2023-07-22",
    totalSales: 1680.90,
    productsSold: 28,
    topSellingProducts: [
      { productId: "1", productName: "Casual Shirt", quantity: 11 },
      { productId: "3", productName: "Sneakers", quantity: 10 },
      { productId: "2", productName: "Formal Blazer", quantity: 6 }
    ]
  }
];
