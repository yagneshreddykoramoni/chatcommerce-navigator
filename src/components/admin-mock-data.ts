
import { Product, SalesReport } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Casual Shirt",
    description: "Comfortable cotton casual shirt for everyday wear",
    price: 39.99,
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
    category: "Clothing",
    tags: ["formal", "men", "blazer"],
    inStock: true
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable athletic sneakers for all-day wear",
    price: 59.99,
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
    category: "Clothing",
    tags: ["casual", "men", "women", "jeans"],
    inStock: false
  },
  {
    id: "5",
    name: "Summer Dress",
    description: "Light and airy summer dress for warm weather",
    price: 45.99,
    imageUrl: "/placeholder.svg",
    category: "Clothing",
    tags: ["casual", "women", "summer"],
    inStock: true
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
