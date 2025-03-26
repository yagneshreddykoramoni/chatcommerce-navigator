
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
